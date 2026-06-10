import * as monaco from "monaco-editor";
import { 
    EnableFolding, 
    EnableFormatting, 
    EnableGotoDefinition, 
    EnableGotoReference, 
    EnableCodeAction, 
    EnableCodeLens,
} from "../../../CommonSqlUtils/LanguageFeatureFlag";
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

export class CommonSqlLanguageServiceProvider {
    private static errorMarkerProvides: Map<string, CommonSqlErrorMarkerProvider> = new Map();

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

        const completionProvider = new CommonSqlCompletionProvider(config);
        _monaco.languages.registerCompletionItemProvider(_lName, completionProvider);
        _monaco.languages.registerHoverProvider(_lName, new CommonSqlHoverProvider(config));
        _monaco.languages.registerSignatureHelpProvider(_lName, new CommonSqlSignatureHelpProvider(config));
        if (!CommonSqlLanguageServiceProvider.errorMarkerProvides.has(_lName)) {
            CommonSqlLanguageServiceProvider.errorMarkerProvides.set(_lName, new CommonSqlErrorMarkerProvider(config));
        }
        if (EnableFormatting) {
            _monaco.languages.registerDocumentFormattingEditProvider(_lName, new CommonSqlFormattingProvider(config));
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
        if (EnableCodeAction) {
            _monaco.languages.registerCodeActionProvider(_lName, new CommonSqlCodeActionProvider(config));
        }
        if (EnableCodeLens) {
            _monaco.languages.registerCodeLensProvider(_lName, new CommonSqlCodeLensProvider(config));
        }
        
        const EnableCodeSnippets = config.snippetConfig?.editor && config.snippetConfig?.snippets?.length > 0;
        if (EnableCodeSnippets) {
            CommonSqlCodeSnippetsProvider.addSnippetAction(config.snippetConfig.editor, completionProvider);
        }
    }

    public static setErrorMarkerAsync(model: monaco.editor.ITextModel, versionId: number): void {
        const languageName = model.getLanguageId();
        if (!languageName || !CommonSqlLanguageServiceProvider.errorMarkerProvides.has(languageName)) {
            return;
        }
        CommonSqlLanguageServiceProvider.errorMarkerProvides.get(languageName).setErrorMarkerAsync(model, versionId);
    }

    public static resetDynamicMetadataCache(): void {
        CommonSqlMetadataProvider.resetDynamicMetadataCache();
    }
}
