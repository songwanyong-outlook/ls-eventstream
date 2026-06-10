// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { buildBuiltinFunctionMap } from '../../../CommonSqlUtils/BulitinFunctionHelpers';
import { ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";
import { ISignatureInformation } from '../../../CommonSqlUtils/SignatureTypes';
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { IsInSpecialContext, LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";

export class CommonSqlSignatureHelpProvider {
    readonly signatureHelpTriggerCharacters?: ReadonlyArray<string> = ["(", ",", ")"];
    readonly signatureHelpRetriggerCharacters?: ReadonlyArray<string> = [];

    private builtinFunctions: Map<string, ISignatureInformation[]>;

    private lsWorker: any;

    constructor(private config: LanguageServiceConfig) {
        this.builtinFunctions = buildBuiltinFunctionMap(config.builtinFunctions);
        this.lsWorker = config.languageServiceWorkerConstructor;
        if (config.telemetryConfig) {
            LSTelemetryClientProvider.createTelemetryClient(
                config.languageName, 
                config.telemetryConfig.maxDataCountPerRecord,
                config.telemetryConfig.clientTimeout,
                config.telemetryConfig.sendLatencyTelemetryFunc,
                config.telemetryConfig.sendSuggestionAcceptanceTelemetryFunc,
            );
        }
    }

    provideSignatureHelp(
        model: editor.ITextModel,
        position: Position,
        token: CancellationToken,
        context: languages.SignatureHelpContext,
    ): any {
        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
        };
        const text = model.getValueInRange(range);

        if (IsInSpecialContext(text, model.getLanguageId())) {
            return null;
        }

        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(model.getLanguageId());
        telemetryClient?.recordLSRequest(TelemetryRecordFeature.SignatureHelp, model.getVersionId());

        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.SignatureHelpResult>(async (resolve) => {
            const results = await CommonSqlLanguageServiceFacade.GetInstance(this.lsWorker).GetLanguageServiceResult({
                code: text,            
                reason: LanguageServiceFeature.SignatureHelp,
            } as ILanguageServiceRequest) as languages.SignatureHelpResult;
            telemetryClient?.recordLSResponse(TelemetryRecordFeature.SignatureHelp, model.getVersionId());
            resolve(results);
        });
    }
}
