import * as monaco from "monaco-editor";

import { CommonSqlLanguageServiceProvider } from '../../CommonSql/CommonSqlFacade/src/providers/CommonSqlLanguageServiceProvider';
import { 
    IDynamicMetadataLoadingConfig,
    ISnippetConfig, 
    ITelemetryConfig, 
    LanguageServiceConfig, 
    LatencyTelemetryRecordFunction,
    SuggestionAcceptanceTelemetryRecordFunction,
    TelemetryRecordFeature,   
} from "../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { IMetadataObject } from "../../CommonSql/CommonSqlUtils/MetadataTypes";
import { snippets, testGrammarRuleNames } from "../../CommonSql/engineering/common/SqlFakedConfig";
import { GetMockDynamicMetadata, GetMockMetadata } from "../../CommonSql/engineering/test/common/MockSqlMetadataProvider";
import { builtinFunctions } from "./configs/BuiltinFunctions";
import { sqlComputeMonarchRule } from './configs/SqlSyntaxHighlightConfig';
import CommonSqlLanguageServiceWorker from "./language_service_worker/CommonSqlLanguageServiceWorker.js";

export class LanguangeServiceClient {
    private static monacoInstance: typeof monaco = monaco;

    public static RegisterErrorMarkerProvider(editor: monaco.editor.IStandaloneCodeEditor) {
        const defaultModel = editor.getModel();
        defaultModel.onDidChangeContent(async (e: monaco.editor.IModelContentChangedEvent) => {
            CommonSqlLanguageServiceProvider.setErrorMarkerAsync(defaultModel, defaultModel.getVersionId());
        });
    }

    public static async InitializeLanguageService(monacoInstance: typeof monaco, monacoEditor: monaco.editor.IStandaloneCodeEditor, languageName: string): Promise<void> {
        if (monacoInstance) {
            this.monacoInstance = monacoInstance;
        }

        const syntaxHighlightRule = sqlComputeMonarchRule;
        const lsConfig: LanguageServiceConfig = {
            monacoInstance: this.monacoInstance,
            languageName: languageName,
            syntaxHighlightRule: syntaxHighlightRule,
            languageServiceWorkerConstructor: createLSWorker,
            metadataDelegate: FetchMetadata,
            dynamicMetadataLoadingConfig: {
                getAvailableDynamicMetadata: () => { return Promise.resolve({ databases: availableDynamicLoadDatabases }); },
                loadMetadata: DynamicLoadMetadata,
                editor: monacoEditor,
            } as IDynamicMetadataLoadingConfig,
            gotoDefinitionDelegate: MockDefinitonDelegate,
            builtinFunctions: builtinFunctions,
            caseSensitive: false,
            grammarRuleNames: testGrammarRuleNames,
            snippetConfig: {
                editor: monacoEditor,
                snippets,
            } as ISnippetConfig,
            telemetryConfig: {
                sendLatencyTelemetryFunc: sendLatencyTelemetryToConsole,
                sendSuggestionAcceptanceTelemetryFunc: sendAcceptanceTelemetryToConsole,
                maxDataCountPerRecord: 10,
                clientTimeout: 30000, 
            } as ITelemetryConfig,
        } as LanguageServiceConfig;

        CommonSqlLanguageServiceProvider.InitializeLanguageServiceFeatures(lsConfig);

        addSwitchDynamicMetadataAction(monacoEditor);
    }
}

function FetchMetadata() {
    return !userSpecifiedMetadata ? GetMockMetadata(true) : JSON.parse(userSpecifiedMetadata);
}

async function DynamicLoadMetadata(databaseName: string): Promise<IMetadataObject> {
    return new Promise<IMetadataObject>(resolve => {
        setTimeout(() => {
            console.log("successfully loaded dynamic metadata");
            const database = GetMockDynamicMetadata(databaseName);
            resolve(database);
        }, 3000)
    })
}

let availableDynamicLoadDatabases = ['database1', 'database2'];

export function switchDynamicMetadata() {
    if (availableDynamicLoadDatabases.length === 2) {
        availableDynamicLoadDatabases = ['database3'];
    } else {
        availableDynamicLoadDatabases = ['database1', 'database2'];
    }
    CommonSqlLanguageServiceProvider.resetDynamicMetadataCache();
}

let userSpecifiedMetadata: string = null;
export function ConfigureMetadata(metadataStr: string) {
    userSpecifiedMetadata = metadataStr;
}
export function GetMetadataStr(): string {
    if (userSpecifiedMetadata) {
        return userSpecifiedMetadata;
    } else {
        return JSON.stringify(GetMockMetadata(false), null, 4);
    }
}

async function MockDefinitonDelegate(metadataObjectName: string) {
    if (metadataObjectName) {
        document.getElementById('definition-span').textContent = metadataObjectName;
        document.getElementById('definition-update-time').textContent = 'Updated at ' + Date.now();
    }
}

const sendLatencyTelemetryToConsole: LatencyTelemetryRecordFunction = (featureName: TelemetryRecordFeature, avgLatency: number, dataCount: number): void => {
    let featureNameString: string;
    switch(featureName) {
        case TelemetryRecordFeature.WordCompletion:
            featureNameString = "WordCompletion";
            break;
        case TelemetryRecordFeature.ErrorDetection:
            featureNameString = "ErrorDetection";
            break;
        case TelemetryRecordFeature.QuickInfo:
            featureNameString = "QuickInfo";
            break;
        case TelemetryRecordFeature.SignatureHelp:
            featureNameString = "SignatureHelp";
            break;
    } 

    const log = `Single Latency Telemetry Record: Feature: ${featureNameString}; AvgLatency: ${avgLatency}; DataCount: ${dataCount};\n`;
    console.log(log);
};

const sendAcceptanceTelemetryToConsole: SuggestionAcceptanceTelemetryRecordFunction = (suggestionAcceptanceCount: number, dataCount: number): void => {
    const log = `Single Accuracy Telemetry Record: Acceptance Count: ${suggestionAcceptanceCount}; DataCount: ${dataCount};\n`;
    console.log(log);
};

function createLSWorker() {
    return new CommonSqlLanguageServiceWorker();
}

function addSwitchDynamicMetadataAction(_editor: monaco.editor.IStandaloneCodeEditor) {
    const switchDynamicMetadataAction = {
        id: "switch-dynamic-metadata",
        label: "Switch Dynamic Metadata",
        contextMenuOrder: 2,
        contextMenuGroupId: "1_modification",
        run: () => {
            try {
                switchDynamicMetadata();
            } catch (e) {
                // do nothing
            }
        },
    };
    _editor.addAction(switchDynamicMetadataAction);
}