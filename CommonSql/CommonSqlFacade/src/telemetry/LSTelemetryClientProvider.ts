import { LatencyTelemetryRecordFunction, SuggestionAcceptanceTelemetryRecordFunction } from "../SqlUtils/ServiceProviderUtils";
import { LanguageServiceTelemetryClient } from "./LanguageServiceTelemetryClient";

export class LSTelemetryClientProvider {
    private static telemetryClientDict: Map<string, LanguageServiceTelemetryClient> = new Map();

    public static createTelemetryClient(
        languageName: string, 
        maxDataCountPerRecord: number, 
        clientTimeout: number, 
        latencyTelemetryRecordFunction: LatencyTelemetryRecordFunction,
        suggestionAcceptanceTelemetryRecordFunction: SuggestionAcceptanceTelemetryRecordFunction,
    ) {
        if (LSTelemetryClientProvider.telemetryClientDict.has(languageName)) {
            return;
        }

        LSTelemetryClientProvider.telemetryClientDict.set(
            languageName, 
            new LanguageServiceTelemetryClient(maxDataCountPerRecord, clientTimeout, latencyTelemetryRecordFunction, suggestionAcceptanceTelemetryRecordFunction),
        );
    }

    public static getTelemetryClient(languageName: string): LanguageServiceTelemetryClient {
        if (!this.telemetryClientDict.has(languageName)) {
            return null;
        }
        const telemetryClient = this.telemetryClientDict.get(languageName);
        telemetryClient.refreshTimer();
        return telemetryClient;
    }
}