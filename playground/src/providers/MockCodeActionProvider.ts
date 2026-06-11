// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, IRange, languages, Range } from "monaco-editor";
import { ICodeActionRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from '../../../CommonSql/CommonSqlUtils/Utils';
import { LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

export class MockCodeActionProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    async provideCodeActions(model: editor.ITextModel, range: Range, context: languages.CodeActionContext, token: CancellationToken)
    : Promise<languages.CodeActionList> {
        const fillinEdits = (edit: languages.IWorkspaceTextEdit): languages.IWorkspaceTextEdit => {
            return {
                resource: model.uri,
                textEdit: {
                    // property 'range' is IRange, input parameter 'range' is Range
                    range: {
                        startLineNumber: range.startLineNumber,
                        startColumn: range.startColumn,
                        endLineNumber: range.endLineNumber,
                        endColumn: range.endColumn
                    } as IRange,
                    text:  edit.textEdit.text,
                },
                versionId: model.getVersionId()
            };
        }

        if (context.markers.length > 0) {
            let metadata = null;
            try {
                metadata = this.languageServiceConfig.metadataDelegate();
            } catch {
                metadata = null;
            }

            const request: ILanguageServiceRequest = {
                code: model.getValue(),
                metadata: metadata,
                parameter: { range } as ICodeActionRequestParameter,
                reason: LanguageServiceFeature.CodeAction,
            }

            const result = await MockLanguageServiceFacade.GetResultFromPipeline(request, this.languageServiceConfig) as languages.CodeActionList;

            let newActions: languages.CodeAction[] = result.actions.map(action => {
                return {
                    title: action.title,
                    diagnostics: context.markers,
                    kind: "quickfix",
                    edit: {
                        edits: action.edit?.edits?.map(fillinEdits)
                    },
                    isPreferred: true
                } as languages.CodeAction;
            });

            return {
                actions: newActions,
                dispose: () => {}
            };
        }
    }
}
