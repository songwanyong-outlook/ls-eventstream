import * as monaco from 'monaco-editor';

import {
    CommonSqlLanguageServiceProvider,
    ISqlMetadata,
    LanguageServiceConfig,
} from 'event-stream-language-service-facade';
    
import { GetMockMetadata } from '../../CommonSql/engineering/test/common/MockSqlMetadataProvider';
import { StreamingHighlightConfig } from '../../CommonSql/TridentStreaming/StreamingSyntaxHighlightConfig';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';

export class LanguageServiceClient {
    private static monacoInstance: typeof monaco = monaco;

    public static RegisterErrorMarkerProvider(model: editor.ITextModel) {
        model.onDidChangeContent(async (_) => {
            CommonSqlLanguageServiceProvider.setErrorMarkerAsync(model, model.getVersionId());
        });
    }

    public static InitializeLanguageService(monacoInstance: typeof monaco, monacoEditor: monaco.editor.IStandaloneCodeEditor, languageName: string) {
        if (monacoInstance) {
            this.monacoInstance = monacoInstance;
        }

        const lsConfig: LanguageServiceConfig = {
            monacoInstance: this.monacoInstance,
            languageName: languageName,
            caseSensitive: false,
            syntaxHighlightRule: StreamingHighlightConfig,
            builtinFunctions: [],
            languageServiceWorkerConstructor: createLSWorker,
            metadataDelegate: FetchMetadata
        };

        CommonSqlLanguageServiceProvider.InitializeLanguageServiceFeatures(lsConfig);
    }

    /*
     * Must be called after InitializeLanguageService
     */
    public static async GetOutputSchemaAsync(code: string, metadata: ISqlMetadata): Promise<string[]> {
        const { CommonSqlLanguageServiceProvider } = await import('event-stream-language-service-facade');
        return await CommonSqlLanguageServiceProvider.GetOutputSchemaAsync(code, metadata);
    }

    /*
     * Must be called after InitializeLanguageService
     */
    public static async DetectErrorsAsync(code: string, metadata: ISqlMetadata): Promise<editor.IMarkerData[]> {
        const { CommonSqlLanguageServiceProvider } = await import('event-stream-language-service-facade');
        return CommonSqlLanguageServiceProvider.DetectErrorsAsync(code, metadata);
    }
}

function FetchMetadata() {
    return !userSpecifiedMetadata ? GetMockMetadata() : JSON.parse(userSpecifiedMetadata);
}

let userSpecifiedMetadata: string = null;
export function ConfigureMetadata(metadataStr: string) {
    userSpecifiedMetadata = metadataStr;
}
export function GetMetadataStr(): string {
    if (userSpecifiedMetadata) {
        return userSpecifiedMetadata;
    } else {
        return JSON.stringify(GetMockMetadata(), null, 4);
    }
}

function createLSWorker() {
    return new Worker(new URL('./language_service_worker/CommonSqlLanguageServiceWorker.js', import.meta.url));
}
