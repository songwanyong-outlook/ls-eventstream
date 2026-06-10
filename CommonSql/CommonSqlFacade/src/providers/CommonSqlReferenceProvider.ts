// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { buildBuiltinFunctionMap } from '../../../CommonSqlUtils/BulitinFunctionHelpers';
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { ISignatureInformation } from "../../../CommonSqlUtils/SignatureTypes";
import { IHoverRequestParameter, ILanguageServiceRequest, IRangeItem, LanguageServiceFeature } from '../../../CommonSqlUtils/Utils';
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { IsInSpecialContext, LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlReferenceProvider {
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

    provideReferences(model: editor.ITextModel, position: Position, context: languages.ReferenceContext, token: CancellationToken): any {
        const selectedWord: editor.IWordAtPosition = model.getWordAtPosition(position);
        if (!selectedWord || !selectedWord.word) {
            return [];
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
            return [];
        }

        const metadata: ISqlMetadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);
        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(model.getLanguageId());
        telemetryClient?.recordLSRequest(TelemetryRecordFeature.GotoReferences, model.getVersionId());

        const hoverParam: IHoverRequestParameter = { hoveringWord: selectedWord.word, cursorOffset: partialScript.length };
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.Definition>(async (resolve) => {
            const name = await CommonSqlLanguageServiceFacade
                .GetInstance(this.languageServiceConfig)
                .GetLanguageServiceResult({
                    code: script,
                    metadata,
                    parameter: hoverParam,
                    reason: LanguageServiceFeature.GotoReferences,
                } as ILanguageServiceRequest) as string;
            
            const results = [];
            if (name) {
                const findMatches = model.findMatches(name, true, false, true, ' .;[]()', false);
                results.push(...findMatches.map(match => ({ uri: model.uri, range: match.range })));
            }
        
            telemetryClient?.recordLSResponse(TelemetryRecordFeature.GotoReferences, model.getVersionId());
            resolve(results);
        });
    }
}
