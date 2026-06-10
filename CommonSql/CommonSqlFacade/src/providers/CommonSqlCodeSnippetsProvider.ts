import * as monaco from "monaco-editor";
import { CommonSqlCompletionProvider } from "./CommonSqlCompletionProvider";

export class CommonSqlCodeSnippetsProvider {
    public static addSnippetAction(_editor: monaco.editor.IStandaloneCodeEditor, completionProvider: CommonSqlCompletionProvider) {
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
