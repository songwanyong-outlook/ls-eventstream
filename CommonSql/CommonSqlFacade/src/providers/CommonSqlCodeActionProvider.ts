// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, IRange, languages, Range } from "monaco-editor";
import { ICodeActionRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from '../../../CommonSqlUtils/Utils';
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlCodeActionProvider implements languages.CodeActionProvider {
    constructor(private languageServiceConfig: LanguageServiceConfig) {
    }

    provideCodeActions(model: editor.ITextModel, range: Range, context: languages.CodeActionContext, token: CancellationToken)
    : languages.ProviderResult<languages.CodeActionList> {
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

        return new Promise<languages.CodeActionList>(async (resolve) => {
            let newActions: languages.CodeAction[] = [];

            if (context.markers.length > 0) {
                const request: ILanguageServiceRequest = {
                    code: model.getValue(),
                    metadata: CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig),
                    parameter: { range } as ICodeActionRequestParameter,
                    reason: LanguageServiceFeature.CodeAction,
                }

                const rawActionList = await CommonSqlLanguageServiceFacade
                    .GetInstance(this.languageServiceConfig)
                    .GetLanguageServiceResult(request) as languages.CodeActionList;
  
                newActions = rawActionList.actions.map(action => {
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
            }

            resolve({
                actions: newActions,
                dispose: () => {}
            });
        });
    }
}
