// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Range } from "monaco-editor";
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { ICodeActionRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from '../../../CommonSqlUtils/Utils';
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { IsInSpecialContext, LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlCodeActionProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
        if (this.languageServiceConfig.telemetryConfig) {
            LSTelemetryClientProvider.createTelemetryClient(
                this.languageServiceConfig.languageName, 
                this.languageServiceConfig.telemetryConfig.maxDataCountPerRecord,
                this.languageServiceConfig.telemetryConfig.clientTimeout,
                this.languageServiceConfig.telemetryConfig.sendLatencyTelemetryFunc,
                this.languageServiceConfig.telemetryConfig.sendSuggestionAcceptanceTelemetryFunc,
            );
        }
    }

    provideCodeActions(model: editor.ITextModel, range: Range, context: languages.CodeActionContext, token: CancellationToken): Promise<languages.CodeActionList> {
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

        const metadata: ISqlMetadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);
        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(model.getLanguageId());
        telemetryClient?.recordLSRequest(TelemetryRecordFeature.GotoReferences, model.getVersionId());

        const codeActionParam: ICodeActionRequestParameter = { range } as ICodeActionRequestParameter;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.CodeActionList>(async (resolve) => {
            const result = await CommonSqlLanguageServiceFacade
                .GetInstance(this.languageServiceConfig)
                .GetLanguageServiceResult({
                    code: script,
                    metadata,
                    parameter: codeActionParam,
                    reason: LanguageServiceFeature.CodeAction,
                } as ILanguageServiceRequest) as languages.CodeActionList;
            
            result.actions.forEach(a => {
                a.edit?.edits?.forEach(e => {
                    (e as languages.WorkspaceTextEdit).resource = model.uri;
                });
            });

            telemetryClient?.recordLSResponse(TelemetryRecordFeature.GotoReferences, model.getVersionId());
            resolve(result);
        });
    }
}
