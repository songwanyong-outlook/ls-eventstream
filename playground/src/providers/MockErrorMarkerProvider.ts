import * as monaco from "monaco-editor";
import { asyncSetErrorMarkerDelayTime, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSql/CommonSqlUtils/Utils";
import { LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

interface ISqlErrorDetectionRequst {
    _model: monaco.editor.ITextModel;
    _versionId: number;
}

export class MockErrorMarkerProvider {
    private asyncSetErrorMarkerTimer = null;
    private asyncSetErrorMarkerPendingRequest: ISqlErrorDetectionRequst = null;
    private latestContentVersionIdForErrorDetection = -1;

    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
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
        const textLines = _model.getLinesContent();
        const input = textLines.join("\n");

        const marks = await MockLanguageServiceFacade.GetResultFromPipeline({ 
            code: input, 
            reason: LanguageServiceFeature.ErrorDetection,
        } as ILanguageServiceRequest, this.languageServiceConfig);

        if (versionId === this.latestContentVersionIdForErrorDetection) {
            this.languageServiceConfig.monacoInstance.editor.setModelMarkers(_model, "ErrorMarkerOwner", marks as monaco.editor.IMarkerData[]);
        }
    }
}
