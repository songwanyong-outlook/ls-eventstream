import * as monaco from "monaco-editor";
import { asyncSetErrorMarkerDelayTime, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";
import { CommonSqlLanguageServiceFacade }  from "../CommonSqlLanguageServiceFacade";
import { LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";

interface ISqlErrorDetectionRequst {
    _model: monaco.editor.ITextModel;
    _versionId: number;
}

export class CommonSqlErrorMarkerProvider {
    private asyncSetErrorMarkerTimer = null;
    private asyncSetErrorMarkerPendingRequest: ISqlErrorDetectionRequst = null;
    private latestContentVersionIdForErrorDetection = -1;

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

    public setErrorMarkerAsync(model: monaco.editor.ITextModel, versionId: number): void {
        if (asyncSetErrorMarkerDelayTime <= 0) {
            this.setErrorMarker(model, versionId);
            return;
        }

        this.RefreshSqlSetErrorMarkerTimer({ _model: model, _versionId: versionId } as ISqlErrorDetectionRequst);
        return;
    }

    private RefreshSqlSetErrorMarkerTimer(sqlErrorDetectionRequest: ISqlErrorDetectionRequst): void {
        if (this.asyncSetErrorMarkerTimer) {
            clearTimeout(this.asyncSetErrorMarkerTimer);
        }
        this.asyncSetErrorMarkerTimer = this.CreateSqlSetErrorMarkerTimer(sqlErrorDetectionRequest);
    }

    private CreateSqlSetErrorMarkerTimer(sqlErrorDetectionRequest: ISqlErrorDetectionRequst) {
        this.asyncSetErrorMarkerPendingRequest = sqlErrorDetectionRequest;
        return setTimeout(() => {
            this.setErrorMarker(this.asyncSetErrorMarkerPendingRequest._model, this.asyncSetErrorMarkerPendingRequest._versionId);
            this.asyncSetErrorMarkerTimer = null;
            this.asyncSetErrorMarkerPendingRequest = null;
        }, asyncSetErrorMarkerDelayTime);
    }

    private async setErrorMarker(_model: monaco.editor.ITextModel, versionId: number): Promise<void> {
        this.latestContentVersionIdForErrorDetection = versionId;
        const input = _model.getValue();

        const lsTelemetryClient = LSTelemetryClientProvider.getTelemetryClient(_model.getLanguageId());
        lsTelemetryClient?.recordLSRequest(TelemetryRecordFeature.ErrorDetection, _model.getVersionId());

        const marks = await CommonSqlLanguageServiceFacade.GetInstance(this.languageServiceConfig).GetLanguageServiceResult({ 
            code: input, 
            reason: LanguageServiceFeature.ErrorDetection,
        } as ILanguageServiceRequest);

        if (versionId === this.latestContentVersionIdForErrorDetection && !_model.isDisposed()) {
            this.languageServiceConfig.monacoInstance.editor.setModelMarkers(_model, "ErrorMarkerOwner", marks as monaco.editor.IMarkerData[]);
            lsTelemetryClient?.recordLSResponse(TelemetryRecordFeature.ErrorDetection, _model.getVersionId());
        }
    }
}
