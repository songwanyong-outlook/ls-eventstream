import { LanguageServiceFeature, Timeout } from "../../../CommonSqlUtils/Utils";
import { LatencyTelemetryRecordFunction, SuggestionAcceptanceTelemetryRecordFunction, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";

interface ILSTimestampInfo {
    scriptVersionID: number;
    timestamp: number;
}

interface ILSTelemetryRecord {
    // Language service latency. In milliseconds.
    data: number[];
    unfinishedRequestBufferQueue: ILSTimestampInfo[];
}

export class LanguageServiceTelemetryClient {
    //How many language service data one telemetry record contains
    private maxDataCountPerRecord: number;

    //In milliseconds. If there are no fresh data recorded, will flush telemetry after timeout.
    private clientTimeout: number;
    
    private timerHandle: number;

    //Maintain a queue for request with no response currently. There should exist max length for such queue.
    private readonly maxUnfinishedRequestBufferQueueLength = 15;

    // key is feature name while value is telemetry to be sent.
    private latencyTelemetryDict: Map<TelemetryRecordFeature, ILSTelemetryRecord> = new Map();

    private suggestionAcceptedCount = 0;
    
    private suggestionUnAcceptedCount = 0;

    private latencyTelemetryRecordFunction: LatencyTelemetryRecordFunction;

    private suggestionAcceptanceTelemetryRecordFunction: SuggestionAcceptanceTelemetryRecordFunction;

    constructor(
        maxDataCountPerRecord: number, 
        clientTimeout: number, 
        latencyTelemetryRecordFunction: LatencyTelemetryRecordFunction, 
        suggestionAcceptanceTelemetryRecordFunction: SuggestionAcceptanceTelemetryRecordFunction,
    ) {
        this.maxDataCountPerRecord = maxDataCountPerRecord;
        this.clientTimeout = clientTimeout;
        this.timerHandle = -1;
        this.latencyTelemetryRecordFunction = latencyTelemetryRecordFunction;
        this.suggestionAcceptanceTelemetryRecordFunction = suggestionAcceptanceTelemetryRecordFunction;
    }

    public recordLSRequest(featureName: TelemetryRecordFeature, scriptVersionID: number): void {
        if (!this.latencyTelemetryDict.has(featureName)) {
            this.latencyTelemetryDict.set(featureName, { data: [], unfinishedRequestBufferQueue: [] } as ILSTelemetryRecord);
        }

        const telemeryRecord: ILSTelemetryRecord = this.latencyTelemetryDict.get(featureName);
        if (telemeryRecord.unfinishedRequestBufferQueue.length === this.maxUnfinishedRequestBufferQueueLength) {
            telemeryRecord.unfinishedRequestBufferQueue.shift();
        }

        telemeryRecord.unfinishedRequestBufferQueue.push({ scriptVersionID, timestamp: Date.now() } as ILSTimestampInfo);
    }

    public recordLSResponse(featureName: TelemetryRecordFeature, scriptVersionID: number): void {
        if (!this.latencyTelemetryDict.has(featureName)) {
            this.latencyTelemetryDict.set(featureName, { data: [], unfinishedRequestBufferQueue: [] } as ILSTelemetryRecord);
        }

        const telemeryRecord: ILSTelemetryRecord = this.latencyTelemetryDict.get(featureName);
        const currentTime = Date.now();

        const matchedRequestIndex = telemeryRecord.unfinishedRequestBufferQueue.findIndex(e => e.scriptVersionID === scriptVersionID);
        if (matchedRequestIndex > -1 && matchedRequestIndex < telemeryRecord.unfinishedRequestBufferQueue.length) {
            const latency = currentTime - telemeryRecord.unfinishedRequestBufferQueue[matchedRequestIndex].timestamp;
            if (this.isValidData(featureName, latency)) {
                telemeryRecord.data.push(latency);
            }

            // remove this element and previous elements
            telemeryRecord.unfinishedRequestBufferQueue = telemeryRecord.unfinishedRequestBufferQueue.slice(matchedRequestIndex + 1);
        } else {
            telemeryRecord.unfinishedRequestBufferQueue = [];
        }

        if (telemeryRecord.data.length >= this.maxDataCountPerRecord) {
            this.sendLatencyTelemetry(featureName, telemeryRecord.data);
            telemeryRecord.data = [];
        }
    }

    public recordAcceptance(accepted: boolean): void {
        if (accepted) {
            this.suggestionAcceptedCount++;
        } else {
            this.suggestionUnAcceptedCount++;
        }

        if (this.suggestionAcceptedCount + this.suggestionUnAcceptedCount >= this.maxDataCountPerRecord) {
            this.sendSuggestionAcceptanceTelemetry(this.suggestionAcceptedCount, this.suggestionUnAcceptedCount);
            this.suggestionAcceptedCount = 0;
            this.suggestionUnAcceptedCount = 0;
        }
    }

    public refreshTimer() {
        if (this.clientTimeout <= 0) {
            return;
        }

        if (this.timerHandle >= 0) {
            window.clearTimeout(this.timerHandle);
        }
        this.timerHandle = this.CreateNewTelemetryClientTimer();
    }

    private CreateNewTelemetryClientTimer(): number {
        return window.setTimeout(() => {
            this.flushTelemetry();
            this.timerHandle = -1;
        }, this.clientTimeout);
    }

    public flushTelemetry(): void {
        for (const featureName of this.latencyTelemetryDict.keys()) {
            this.sendLatencyTelemetry(featureName, this.latencyTelemetryDict.get(featureName).data);
            this.latencyTelemetryDict.get(featureName).data = [];
        }
        this.sendSuggestionAcceptanceTelemetry(this.suggestionAcceptedCount, this.suggestionUnAcceptedCount);
        this.suggestionAcceptedCount = 0;
        this.suggestionUnAcceptedCount = 0;
    }

    private sendLatencyTelemetry(featureName: TelemetryRecordFeature, data: number[]): void {
        if (!data || data.length === 0) {
            return;
        }
        
        const dataCount = data.length;
        if (data.length > 2) {
            // remove the minimum and the maximum
            data.sort();
            data.pop();
            data.shift();
        }

        const averageLatency = data.reduce((a, c) => {
            return a + c; 
        }) / data.length;

        try {
            this.latencyTelemetryRecordFunction(featureName, averageLatency, dataCount);
        } catch {
            // keep silent for temporary.
        }
    }

    private sendSuggestionAcceptanceTelemetry(acceptedCount: number, unAcceptedCount: number) {
        if (acceptedCount === 0 && unAcceptedCount === 0) {
            return;
        }

        try {
            this.suggestionAcceptanceTelemetryRecordFunction(acceptedCount, acceptedCount + unAcceptedCount);
        } catch {
            // keep silent for temporary.
        }
    }

    private isValidData(featureName: TelemetryRecordFeature, latency: number): boolean {
        let featureTimeout: number;
        switch (featureName) {
            case TelemetryRecordFeature.WordCompletion:
                featureTimeout = Timeout.GetTimeout(LanguageServiceFeature.WordCompletion);
                break;
            case TelemetryRecordFeature.ErrorDetection:
                featureTimeout = Timeout.GetTimeout(LanguageServiceFeature.ErrorDetection);
                break;
            case TelemetryRecordFeature.QuickInfo:
                featureTimeout = Timeout.GetTimeout(LanguageServiceFeature.QuickInfo);
                break;
            case TelemetryRecordFeature.SignatureHelp:
                featureTimeout = Timeout.GetTimeout(LanguageServiceFeature.SignatureHelp);
                break;
            default:
                return false;
        }

        return latency > 0 && latency < featureTimeout;
    }
}