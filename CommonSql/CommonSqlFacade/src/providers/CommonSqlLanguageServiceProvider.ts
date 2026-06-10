import * as monaco from "monaco-editor";
import { 
    EnableFolding, 
    EnableGotoDefinition, 
    EnableGotoReference, 
    EnableCodeLens,
} from "../../../CommonSqlUtils/LanguageFeatureFlag";
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { getHighlightRule } from "../SqlUtils/MonarchRuleGenerator";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { CommonSqlCompletionProvider } from "./CommonSqlCompletionProvider";
import { CommonSqlErrorMarkerProvider } from "./CommonSqlErrorMarkProvider";
import { CommonSqlFormattingProvider } from "./CommonSqlFormattingProvider";
import { CommonSqlHoverProvider } from "./CommonSqlHoverProvider";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";
import { CommonSqlSignatureHelpProvider } from "./CommonSqlSignatureHelpProvider";
import { CommonSqlDefinitionProvider } from "./CommonSqlDefinitionProvider";
import { CommonSqlReferenceProvider } from "./CommonSqlReferenceProvider";
import { CommonSqlFoldingProvider } from "./CommonSqlFoldingProvider";
import { CommonSqlCodeActionProvider } from "./CommonSqlCodeActionProvider";
import { CommonSqlCodeSnippetsProvider } from "./CommonSqlCodeSnippetsProvider";
import { CommonSqlCodeLensProvider } from "./CommonSqlCodeLensProvider";
import { CommonSqlOutputSchemaProvider } from "./CommonSqlOutputSchemaProvider";

export class CommonSqlLanguageServiceProvider {
    private static errorMarkerProviders: Map<string, CommonSqlErrorMarkerProvider> = new Map();
    private static outputSchemaProvider: CommonSqlOutputSchemaProvider = null;
    private static errorMarkerProvider: CommonSqlErrorMarkerProvider = null;

    public static InitializeLanguageServiceFeatures(config: LanguageServiceConfig): void {
        const _monaco = config.monacoInstance;
        const _lName = config.languageName;
        const _highlightRule = getHighlightRule(config.syntaxHighlightRule);

        if (!_monaco.languages.getLanguages().some(item => item.id === _lName)) {
            _monaco.languages.register({ id: _lName });
        }
        
        if (!_highlightRule.tokenPostfix) {
            _highlightRule.tokenPostfix = "." + _lName.toLocaleLowerCase();
        }
        _monaco.languages.setMonarchTokensProvider(_lName, _highlightRule);

        CommonSqlLanguageServiceProvider.outputSchemaProvider = new CommonSqlOutputSchemaProvider(config);

        const completionProvider = new CommonSqlCompletionProvider(config);
        _monaco.languages.registerCompletionItemProvider(_lName, completionProvider);
        _monaco.languages.registerHoverProvider(_lName, new CommonSqlHoverProvider(config));
        _monaco.languages.registerSignatureHelpProvider(_lName, new CommonSqlSignatureHelpProvider(config));
        _monaco.languages.registerDocumentFormattingEditProvider(_lName, new CommonSqlFormattingProvider(config));

        // function registerCodeActionProvider(languageSelector: LanguageSelector, provider: CodeActionProvider, metadata?: CodeActionProviderMetadata): IDisposable;        
        _monaco.languages.registerCodeActionProvider(_lName, new CommonSqlCodeActionProvider(config));

        if (CommonSqlLanguageServiceProvider.errorMarkerProviders.has(_lName)) {
            CommonSqlLanguageServiceProvider.errorMarkerProvider = CommonSqlLanguageServiceProvider.errorMarkerProviders.get(_lName);
        } else {
            CommonSqlLanguageServiceProvider.errorMarkerProvider = new CommonSqlErrorMarkerProvider(config);
            CommonSqlLanguageServiceProvider.errorMarkerProviders.set(_lName, CommonSqlLanguageServiceProvider.errorMarkerProvider);
        }
 
        if (EnableGotoDefinition) {
            _monaco.languages.registerDefinitionProvider(_lName, new CommonSqlDefinitionProvider(config));
        }
        if (EnableGotoReference) {
            _monaco.languages.registerReferenceProvider(_lName, new CommonSqlReferenceProvider(config));
        }
        if (EnableFolding) {
            _monaco.languages.registerFoldingRangeProvider(_lName, new CommonSqlFoldingProvider(config));
        }
        if (EnableCodeLens) {
            _monaco.languages.registerCodeLensProvider(_lName, new CommonSqlCodeLensProvider(config));
        }
        
        const EnableCodeSnippets = config.snippetConfig?.editor && config.snippetConfig?.snippets?.length > 0;
        if (EnableCodeSnippets) {
            CommonSqlCodeSnippetsProvider.addSnippetAction(config.snippetConfig.editor, completionProvider);
        }
    }

    /*
     * This functions is used to provide output schema based on query langauge and input metadata
     * It is NOT a standard language service feature, so have to provide a separate API outside InitializeLanguageServiceFeatures()
     */ 
    public static async GetOutputSchemaAsync(code: string, metadata: ISqlMetadata): Promise<string[]> {       
        return CommonSqlLanguageServiceProvider.outputSchemaProvider.GetOutputSchemaAsync(code, metadata);
    }

    /*
     * This functions is another API to detect errors directly but not via monaco editor
     */ 
    public static async DetectErrorsAsync(code: string, metadata: ISqlMetadata): Promise<monaco.editor.IMarkerData[]> {
        return CommonSqlLanguageServiceProvider.errorMarkerProvider.DetectErrorsAsync(code, metadata);
    }

    public static setErrorMarkerAsync(model: monaco.editor.ITextModel, versionId: number): void {
        const languageName = model.getLanguageId();
        if (!languageName || !CommonSqlLanguageServiceProvider.errorMarkerProviders.has(languageName)) {
            return;
        }
        CommonSqlLanguageServiceProvider.errorMarkerProviders.get(languageName).setErrorMarkerAsync(model, versionId);
    }

    public static resetDynamicMetadataCache(): void {
        CommonSqlMetadataProvider.resetDynamicMetadataCache();
    }
}
