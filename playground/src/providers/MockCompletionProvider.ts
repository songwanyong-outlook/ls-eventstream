import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSql/CommonSqlUtils/Utils";
import { DOT } from "../../../CommonSql/CommonSqlUtils/Constants";
import { completionItemSelectionCommandId, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { CommonSqlMetadataProvider } from "../../../CommonSql/CommonSqlFacade/src/providers/CommonSqlMetadataProvider";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";
import { loadingCompletionItem } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/MonacoCompletiomItemGenerator";

export class MockCompletionProvider {
    public triggerCharacters: string[] = [".", "@", " "];

    private languageServiceConfig: LanguageServiceConfig = null;
    private showSnippets = false;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
        this.registerCompletionItemSelectionCommand(this.languageServiceConfig.monacoInstance);
    }

    async provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): Promise<languages.CompletionList> {
        if (this.showSnippets) {
            this.showSnippets = false;            
            return Promise.resolve(this.getSnippets());
        }

        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
        };

        const metadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);
        const availableDatabases = this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata 
            ? ((await this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata())?.databases ?? [])
            : [];

        let databaseToBeLoaded = [];
        if (availableDatabases.length > 0) {
            const loadedDatabases = CommonSqlMetadataProvider.getLoadedDynamicMetadata();
            databaseToBeLoaded = availableDatabases.filter(
                db => !loadedDatabases.includes(db)
            );
        }

        const text = model.getValueInRange(range);
        const tableNamespaces = getTableNamespaces(model, position);
        const result = MockLanguageServiceFacade.GetResultFromPipeline({
            code: text, 
            metadata, 
            databaseToBeLoaded,
            reason: LanguageServiceFeature.WordCompletion, 
            parameter: { tableNamespaces },
        } as ILanguageServiceRequest, this.languageServiceConfig) as Promise<languages.CompletionList | string>;
        return result.then(val => {
            let completionList: languages.CompletionList;
            if (typeof val === 'string') {
                completionList = {
                    suggestions: [loadingCompletionItem],
                } as languages.CompletionList;
                this.dynmaicLoadMetadata(val, text, model);
            } else {
                completionList = val;
            }
            return completionList;
        })
    }

    public snippetMode() {
        this.showSnippets = true;
    }

    // A new instance of snippet list must be created every time to avoid being cached
    private getSnippets(): languages.CompletionList {
        return { 
            suggestions: this.languageServiceConfig.snippetConfig.snippets.map((snippet) => <languages.CompletionItem> {
                label: snippet.label,
                kind: languages.CompletionItemKind.Snippet,
                insertText: snippet.text,
            }),
        };
    }

    private dynmaicLoadMetadata(database: string, originalScript: string, textModel: editor.ITextModel) {
        if (!this.languageServiceConfig.dynamicMetadataLoadingConfig?.loadMetadata) {
            return;
        }

        const loadingConfig = this.languageServiceConfig.dynamicMetadataLoadingConfig;
        loadingConfig.loadMetadata(database).then(metadataObject => {
            if(!metadataObject) {
                return;
            }
            CommonSqlMetadataProvider.addDynamicMetadata(metadataObject);
            // script not changed
            if (originalScript === textModel.getValue() && originalScript.endsWith(DOT)) {
                loadingConfig.editor.trigger('dynamic load metadata succeeded', 'editor.action.triggerSuggest', null);
            }
        });
    }

    private registerCompletionItemSelectionCommand(_monacoInstance) {
        _monacoInstance.editor.registerCommand(completionItemSelectionCommandId, (accessor, label) => {
            // Just mock. Do nothing
        });
    }
}

function getTableNamespaces(model: editor.IReadOnlyModel, position: Position): string[] {
    try {
        const lastline = model.getLineCount();
        const lastColumnInLastLine = model.getLineMaxColumn(lastline);
        
        if (lastline === position.lineNumber && lastColumnInLastLine === position.column) {
            return [];
        }

        const range = {
            startLineNumber: model.getLineMaxColumn(position.lineNumber) === position.column ? position.lineNumber + 1 : position.lineNumber,
            startColumn: model.getLineMaxColumn(position.lineNumber) === position.column ? 0 : position.column + 1,
            endLineNumber: lastline,
            endColumn: lastColumnInLastLine,
        };
    
        let scriptAfterCursor = model.getValueInRange(range);
        if (!scriptAfterCursor || !scriptAfterCursor.trim().toLowerCase()
            .startsWith("from")) {
            return [];
        }
    
        scriptAfterCursor = scriptAfterCursor.trim();
        const re = /\s*FROM\s+([\w.]+(?:\s+[\w.]+)?(?:\s*,\s*[\w.]+(?:\s+[\w.]+)?)*)/im;
        const result = scriptAfterCursor.match(re);
        if (result.length > 1 && !!result[1]) {
            let tableSources = result[1].split(",").map(item => item.split(/\s+/).shift()
                .trim());
            tableSources = tableSources.filter(item => !!item);
            return tableSources;
        }
        return [];
    } catch {
        return [];
    }
}
