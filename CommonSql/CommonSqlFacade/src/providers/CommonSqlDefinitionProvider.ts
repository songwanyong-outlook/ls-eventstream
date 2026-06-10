// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { IHoverRequestParameter, ILanguageServiceRequest, IRangeItem, LanguageServiceFeature } from '../../../CommonSqlUtils/Utils';
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { IsInSpecialContext, LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlDefinitionProvider {
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

    provideDefinition(model: editor.ITextModel, position: Position, token: CancellationToken): any {
        const selectedWord: editor.IWordAtPosition = model.getWordAtPosition(position);
        if (!selectedWord || !selectedWord.word) {
            return null;
        }

        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: selectedWord.endColumn,
        } as IRangeItem;
        const partialScript = model.getValueInRange(range);     // partial script for resolving expression
        const script = model.getValue();                        // complete script for parsing

        if (IsInSpecialContext(partialScript, model.getLanguageId())) {
            return null;
        }

        const metadata: ISqlMetadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);
        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(model.getLanguageId());
        telemetryClient?.recordLSRequest(TelemetryRecordFeature.GotoDefinition, model.getVersionId());

        const hoverParam: IHoverRequestParameter = { hoveringWord: selectedWord.word, cursorOffset: partialScript.length };
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.Definition>(async (resolve) => {
            const definitionResult = await CommonSqlLanguageServiceFacade
                .GetInstance(this.languageServiceConfig)
                .GetLanguageServiceResult({
                    code: script,
                    metadata,
                    parameter: hoverParam,
                    reason: LanguageServiceFeature.GotoDefinition,
                } as ILanguageServiceRequest) as any;
            let result = null;
            if (definitionResult) {
                if (definitionResult.range) {
                    result = { uri: model.uri, range: definitionResult.range }; 
                } else if (definitionResult.metadataObjectName && this.languageServiceConfig.gotoDefinitionDelegate) {
                    this.languageServiceConfig.gotoDefinitionDelegate(definitionResult.metadataObjectName).then();
                    result = {
                        uri: model.uri,
                        range:{
                            startLineNumber: position.lineNumber,
                            startColumn: selectedWord.startColumn,
                            endLineNumber: position.lineNumber,
                            endColumn: selectedWord.endColumn,
                        }, 
                    };
                }
            }
            telemetryClient?.recordLSResponse(TelemetryRecordFeature.GotoDefinition, model.getVersionId());
            resolve(result);
        });
    }
}
