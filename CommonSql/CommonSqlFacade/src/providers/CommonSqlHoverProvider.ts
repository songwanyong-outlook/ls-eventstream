// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { buildBuiltinFunctionMap } from '../../../CommonSqlUtils/BulitinFunctionHelpers';
import { STAR } from "../../../CommonSqlUtils/Constants";
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { ISignatureInformation } from "../../../CommonSqlUtils/SignatureTypes";
import { IHoverRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { IsInSpecialContext, LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlHoverProvider {
    private languageServiceConfig: LanguageServiceConfig = null;
    private builtinFunctions: Map<string, ISignatureInformation[]>;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
        this.builtinFunctions = buildBuiltinFunctionMap(languageServiceConfig.builtinFunctions);
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

    provideHover(model: editor.ITextModel, position: Position, token: CancellationToken): any {
        const wordAtPosition: editor.IWordAtPosition = model.getWordAtPosition(position);
        const endColumn = wordAtPosition ? wordAtPosition.endColumn : position.column + 1;

        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn,
        };
        const partialScript = model.getValueInRange(range);     // partial script for resolving expression
        if (IsInSpecialContext(partialScript, model.getLanguageId())) {
            return null;
        }
        let hoveringWord = null;
        let wordRange = null;
        if (wordAtPosition) {
            hoveringWord = wordAtPosition.word;
            wordRange = {
                startLineNumber: position.lineNumber,
                startColumn: endColumn - 1,
                endLineNumber: position.lineNumber,
                endColumn,
            };
        } else if (partialScript.endsWith(STAR)) {
            hoveringWord = STAR;
            wordRange = { startLineNumber: position.lineNumber, startColumn: endColumn - 1, endLineNumber: position.lineNumber, endColumn };
        } else {
            return null;
        }

        const script = model.getValue();    // complete script for parsing

        const metadata: ISqlMetadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);
        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(model.getLanguageId());
        telemetryClient?.recordLSRequest(TelemetryRecordFeature.QuickInfo, model.getVersionId());

        const hoverParam: IHoverRequestParameter = { hoveringWord, cursorOffset: partialScript.length, range: wordRange };
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.Hover>(async (resolve) => {
            const results = await CommonSqlLanguageServiceFacade.GetInstance(this.languageServiceConfig).GetLanguageServiceResult({
                code: script,
                metadata,
                parameter: hoverParam,
                reason: LanguageServiceFeature.QuickInfo,
            } as ILanguageServiceRequest) as languages.Hover;
            telemetryClient?.recordLSResponse(TelemetryRecordFeature.QuickInfo, model.getVersionId());
            resolve(results);
        });
    }
}
