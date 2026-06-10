import * as monaco from "monaco-editor";
import { getHighlightRule } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/MonarchRuleGenerator";
import { LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { CommonSqlInlayHintsProvider } from "../../../CommonSql/CommonSqlFacade/src/providers/CommonSqlInlayHintsProvider";
import { MockCompletionProvider } from "./MockCompletionProvider";
import { MockErrorMarkerProvider } from "./MockErrorMarkerProvider";
import { MockHoverProvider } from "./MockHoverProvider";
import { MockSignatureHelpProvider } from "./MockSignatureHelpProvider";
import { MockFormattingProvider } from "./MockFormattingProvider";
import { MockDefinitionProvider } from "./MockDefinitionProvider";
import { MockReferenceProvider } from "./MockReferenceProvider";
import { MockFoldingProvider } from "./MockFoldingProvider";
import { MockCodeActionProvider } from "./MockCodeActionProvider";

export class CommonSqlLanguageServiceProvider {
    private static errorMarkerProvides: Map<string, MockErrorMarkerProvider> = new Map();

    public static InitializeLanguageServiceFeatures(config: LanguageServiceConfig) {
        const _monaco = config.monacoInstance;
        const _lName = config.languageName;
        const _highlightRule = getHighlightRule(config.syntaxHighlightRule);

        if (!_monaco.languages.getLanguages().some(item => item.id === _lName)) {
            _monaco.languages.register({ id: _lName });
        }

        const completionProvider = new MockCompletionProvider(config);
        _monaco.languages.setMonarchTokensProvider(_lName, _highlightRule);
        _monaco.languages.registerCompletionItemProvider(_lName, completionProvider);
        _monaco.languages.registerHoverProvider(_lName, new MockHoverProvider(config));
        _monaco.languages.registerSignatureHelpProvider(_lName, new MockSignatureHelpProvider(config));
        if (!CommonSqlLanguageServiceProvider.errorMarkerProvides.has(_lName)) {
            CommonSqlLanguageServiceProvider.errorMarkerProvides.set(_lName, new MockErrorMarkerProvider(config));
        }
        _monaco.languages.registerDocumentFormattingEditProvider(_lName, new MockFormattingProvider(config));
        _monaco.languages.registerDefinitionProvider(_lName, new MockDefinitionProvider(config));
        _monaco.languages.registerReferenceProvider(_lName, new MockReferenceProvider(config));
        _monaco.languages.registerFoldingRangeProvider(_lName, new MockFoldingProvider(config));
        _monaco.languages.registerCodeActionProvider(_lName, new MockCodeActionProvider(config));
        _monaco.languages.registerInlayHintsProvider(_lName, new CommonSqlInlayHintsProvider(config));

        if (config.snippetConfig?.editor && config.snippetConfig?.snippets?.length > 0) {
            this.addSnippetAction(config.snippetConfig?.editor, completionProvider);
        }
    }

    public static setErrorMarkerAsync(model: monaco.editor.ITextModel, versionId: number) {
        const languageName = model.getLanguageId();
        if (!languageName || !CommonSqlLanguageServiceProvider.errorMarkerProvides.has(languageName)) {
            return;
        }
        CommonSqlLanguageServiceProvider.errorMarkerProvides.get(languageName).setErrorMarkerAsync(model, versionId);
    }

    private static addSnippetAction(_editor: monaco.editor.IStandaloneCodeEditor, completionProvider: MockCompletionProvider) {
        const snippetAction = {
            id: "insert-code-snippet",
            label: "Insert Code Snippet",
            contextMenuOrder: 1,
            contextMenuGroupId: "1_modification",
            run: () => {
                try {
                    const cur = _editor.getSelection();
                    const line = _editor.getModel().getLineContent(cur.endLineNumber);
                    // the index of last character in line is number of the column on its right side minus 2
                    const lastChar = cur.endColumn > 1 ? line[cur.endColumn - 2] : ' ';
                    if (lastChar !== ' ') {
                        const op = { identifier: { major: 1, minor: 1 }, range: cur, text: ' ', forceMoveMarkers: true };
                        _editor.executeEdits('language service facade', [op]);
                    }
                    completionProvider.snippetMode();
                    _editor.trigger('language service facade', 'editor.action.triggerSuggest', null);
                } catch (e) {
                    // do nothing
                }
            },
        };
        _editor.addAction(snippetAction);
    }
}
