import { editor, IMarkdownString, languages, MarkerSeverity } from "monaco-editor";
import { buildBuiltinFunctionMap } from "../../CommonSql/CommonSqlUtils/BulitinFunctionHelpers";
import { CommonSqlCompletionItem } from "../../CommonSql/CommonSqlUtils/CommonSqlCompletionItem";
import { ISignatureHelp } from "../../CommonSql/CommonSqlUtils/SignatureTypes";
import { CodeActionKind, CodeActionTitle, ICodeActionResult, IDefinitionResult, IErrorMarkItem, IFoldingRange, ILanguageServiceRequest, IRangeItem, LanguageServiceFeature, Severity } from '../../CommonSql/CommonSqlUtils/Utils';
import { CommonSqlLanguageServicePipeline } from '../../CommonSql/CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline';
import { mapToMonacoCompletionItemList } from "../../CommonSql/CommonSqlFacade/src/SqlUtils/MonacoCompletiomItemGenerator";
import { LanguageServiceConfig } from "../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";

export type ParserResult = languages.CompletionList | editor.IMarkerData[] | languages.Hover | languages.SignatureHelpResult | languages.TextEdit[] | IDefinitionResult | string | languages.FoldingRange[] | languages.CodeActionList;

export class MockLanguageServiceFacade {
    public static GetResultFromPipeline(languageServiceRequest: ILanguageServiceRequest, config: LanguageServiceConfig): Promise<ParserResult> {

        let promiseResolve: (value?: ParserResult) => void;
        const result = new Promise<ParserResult>((resolve) => {
            promiseResolve = resolve;
        });

        
        const lsResults = CommonSqlLanguageServicePipeline.instance({
            caseSensitive: config.caseSensitive ?? false,
            grammarRuleNames: config.grammarRuleNames,
            codeSnippets: config.snippetConfig?.snippets,
            builtinFunctions: buildBuiltinFunctionMap(config.builtinFunctions),
        }).handleServiceRequest(languageServiceRequest) as any;

        // promise resolve.
        if (languageServiceRequest.reason === LanguageServiceFeature.WordCompletion) {
            promiseResolve(MockLanguageServiceFacade.DecorateCompletionItems(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.ErrorDetection) {
            promiseResolve(MockLanguageServiceFacade.DecorateErrorMarkItems(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.QuickInfo) {
            promiseResolve(MockLanguageServiceFacade.DecorateHoverItem(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.SignatureHelp) {
            promiseResolve(MockLanguageServiceFacade.DecorateFunctionSignature(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.AutoFormat) {
            promiseResolve(MockLanguageServiceFacade.DecorateFormattedText(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.GotoDefinition) {
            promiseResolve(MockLanguageServiceFacade.DecorateDefinitionItem(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.GotoReferences) {
            promiseResolve(MockLanguageServiceFacade.DecorateReferenceItems(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.CodeFolding) {
            promiseResolve(MockLanguageServiceFacade.DecorateFoldingRanges(lsResults));
        } else if (languageServiceRequest.reason === LanguageServiceFeature.CodeAction) {
            promiseResolve(MockLanguageServiceFacade.DecorateCodeActions(lsResults));
        }

        return result;
    }

    protected static DecorateCompletionItems(items: CommonSqlCompletionItem[]): languages.CompletionList | string {
        if (typeof items === 'string') {
            return items;
        }
        return mapToMonacoCompletionItemList(items);
    }

    protected static DecorateFormattedText(formattedText: string): languages.TextEdit[] {
        return [{ text: formattedText, range: null } as languages.TextEdit];
    }

    protected static DecorateFoldingRanges(foldingRanges: IFoldingRange[]): languages.FoldingRange[] {
        return foldingRanges.map(foldingRange => <languages.FoldingRange> {
            start: foldingRange.start,
            end: foldingRange.end,
            kind: foldingRange.isComment ? languages.FoldingRangeKind.Comment : languages.FoldingRangeKind.Region,
        });
    }

    protected static DecorateErrorMarkItems(items: IErrorMarkItem[]): editor.IMarkerData[] {
        const markers: editor.IMarkerData[] = [];
        if (!items) {
            return markers;
        }

        for (const item of items) {
            const mark: editor.IMarkerData = {
                message : item.message,
                startColumn : item.startColumn + 1,
                endColumn : item.endColumn + 1,
                startLineNumber : item.line,
                endLineNumber : item.line,
                severity : item.severity === Severity.Error ? MarkerSeverity.Error :
                    (item.severity === Severity.Warning ? MarkerSeverity.Warning :
                        (item.severity === Severity.Hint ? MarkerSeverity.Hint : MarkerSeverity.Info)),
            };
            markers.push(mark);
        }
        return markers;
    }

    protected static DecorateHoverItem(documentationMarkdown: string): languages.Hover {
        return { contents: [{ value: documentationMarkdown } as IMarkdownString] } as languages.Hover;
    }

    protected static DecorateFunctionSignature(signatureHelp: ISignatureHelp): languages.SignatureHelpResult {
        const result = {
            dispose: () => {
                // do nothing
            },
            value: {
                signatures: [],
                activeSignature: 0,
                activeParameter: 0,
            } as languages.SignatureHelp,
        } as languages.SignatureHelpResult;

        if (!!signatureHelp && !!signatureHelp.signatures) {
            for (const sig of signatureHelp.signatures) {
                result.value.signatures.push({
                    label: sig.label,
                    documentation: { value : !sig.example ? sig.documentation : sig.documentation + "\n\nExample:\n```sql\n" + sig.example + "\n```" },
                    parameters: sig.parameters ?? [],
                } as languages.SignatureInformation);
            }
            result.value.activeParameter = signatureHelp.activeParameter;
        }
        return result;
    }
    
    protected static DecorateDefinitionItem(result: IDefinitionResult): IDefinitionResult {
        return result;
    }
    
    protected static DecorateReferenceItems(name: string): string {
        // currently just return name of the metadataObejct
        return name;
    }

    protected static DecorateCodeActions(codeActionResults: ICodeActionResult[]): languages.CodeActionList {
        const codeActions: languages.CodeAction[] = [];
        if (codeActionResults) {
            codeActionResults.forEach(r => {
                switch (r.kind) {
                    case CodeActionKind.StarExpansion:
                        codeActions.push(this.createStarExpansion(r));
                        break;
                    default:
                        codeActions.push(this.createCodeAction(r.range, r.title, r.text));
                }
            });
        }
        return {
            actions: codeActions,
            dispose() {
                // empty
            }, 
        } as languages.CodeActionList;
    }

    private static createStarExpansion(result: ICodeActionResult): languages.CodeAction {
        const range = result.range;
        const title = result.title ? result.title : CodeActionTitle.StarExpansion;
        const replaceText = result.text;
        return this.createCodeAction(range, title, replaceText);
    }

    private static createCodeAction(range: IRangeItem, title: string, replaceText: string): languages.CodeAction {
        return {
            title, edit: {
                edits: [
                    {
                        resource: null,
                        edit: { range, text: replaceText } as languages.TextEdit,
                    },
                ] as  languages.WorkspaceTextEdit[],
            } as languages.WorkspaceEdit,
        } as languages.CodeAction;
    }
}
