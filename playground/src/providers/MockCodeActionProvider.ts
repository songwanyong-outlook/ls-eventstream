// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Range } from "monaco-editor";
import { ICodeActionRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from '../../../CommonSql/CommonSqlUtils/Utils';
import { IsInSpecialContext, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";


export class MockCodeActionProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    async provideCodeActions(model: editor.ITextModel, range: Range, context: languages.CodeActionContext, token: CancellationToken): Promise<languages.CodeActionList> {
        const partialRange = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn,
        };
        const partialScript = model.getValueInRange(partialRange);     // partial script for resolving expression
        const script = model.getValue();                        // complete script for parsing

        if (IsInSpecialContext(partialScript, model.getLanguageId())) {
            return null;
        }

        let metadata = null;
        try {
            metadata = this.languageServiceConfig.metadataDelegate();
        } catch {
            metadata = null;
        }

        const codeActionParam: ICodeActionRequestParameter = { range };
        const result = await MockLanguageServiceFacade.GetResultFromPipeline({
            code: script,
            metadata,
            parameter: codeActionParam,
            reason: LanguageServiceFeature.CodeAction,
        } as ILanguageServiceRequest, this.languageServiceConfig) as languages.CodeActionList;

        result.actions.forEach(a => {
            a.edit.edits.forEach(e => {
                (e as languages.WorkspaceTextEdit).resource = model.uri;
            });
        });
        return result;
    }
}
