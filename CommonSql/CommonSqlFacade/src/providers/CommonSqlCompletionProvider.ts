import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { DOT } from "../../../CommonSqlUtils/Constants";
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { loadingCompletionItem } from "../SqlUtils/MonacoCompletiomItemGenerator";
import { completionItemSelectionCommandId, LanguageServiceConfig, TelemetryRecordFeature } from "../SqlUtils/ServiceProviderUtils";
import { LSTelemetryClientProvider } from "../telemetry/LSTelemetryClientProvider";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlCompletionProvider {
    public triggerCharacters: string[] = [".", "@"];

    private languageServiceConfig: LanguageServiceConfig = null;
    private showSnippets = false;

    private acceptedSuggestion: string = null;

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

        this.registerCompletionItemSelectionCommand(this.languageServiceConfig.monacoInstance);
    }

    async provideCompletionItems(model: editor.ITextModel, position: Position, context: languages.CompletionContext, token: CancellationToken): Promise<languages.CompletionList> {
        if (this.showSnippets) {
            this.showSnippets = false;
            return Promise.resolve(this.getSnippets());
        }

        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
        };

        const metadata: ISqlMetadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);
        const text = model.getValueInRange(range);
        const tableNamespaces = getTableNamespaces(model, position);

        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(model.getLanguageId());
        telemetryClient?.recordLSRequest(TelemetryRecordFeature.WordCompletion, model.getVersionId());

        const availableDatabases = this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata 
            ? ((await this.languageServiceConfig.dynamicMetadataLoadingConfig?.getAvailableDynamicMetadata())?.databases ?? [])
            : [];

        let databaseToBeLoaded = [];
        if (availableDatabases.length > 0) {
            const loadedDatabases = CommonSqlMetadataProvider.getLoadedDynamicMetadata();
            databaseToBeLoaded = availableDatabases.filter(
                db => loadedDatabases.indexOf(db) < 0
            );
        }

        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.CompletionList>(async (resolve) => {
            let completionList: languages.CompletionList;
            const result = await CommonSqlLanguageServiceFacade.GetInstance(this.languageServiceConfig).GetLanguageServiceResult({
                code: text, 
                metadata, 
                databaseToBeLoaded,
                reason: LanguageServiceFeature.WordCompletion,
                parameter: { tableNamespaces },
            } as ILanguageServiceRequest) as languages.CompletionList;

            if (typeof result === 'string') {
                completionList = {
                    suggestions: [loadingCompletionItem],
                } as languages.CompletionList;
                this.dynmaicLoadMetadata(result, text, model);
            } else {
                completionList = result;
            }
            completionList.dispose = this.disposeCompletionList.bind(this);
            telemetryClient?.recordLSResponse(TelemetryRecordFeature.WordCompletion, model.getVersionId());
            resolve(completionList);
        });
    }

    public snippetMode() {
        this.showSnippets = true;
    }

    // A new instance of snippet list must be created every time to avoid being cached
    private getSnippets(): languages.CompletionList {
        return { 
            suggestions: this.languageServiceConfig.snippetConfig.snippets.map((snippet) => <languages.CompletionItem> {
                label: snippet.label,
                kind: languages.CompletionItemKind.Snippet,
                insertText: snippet.text,
            }),
        };
    }

    private registerCompletionItemSelectionCommand(_monacoInstance) {
        _monacoInstance.editor.registerCommand(completionItemSelectionCommandId, (accessor, label) => {
            this.acceptedSuggestion = label;
        });
    }

    private dynmaicLoadMetadata(database: string, originalScript: string, textModel: editor.ITextModel) {
        if (!this.languageServiceConfig.dynamicMetadataLoadingConfig?.loadMetadata) {
            return;
        }

        const loadingConfig = this.languageServiceConfig.dynamicMetadataLoadingConfig;
        loadingConfig.loadMetadata(database).then(metadataObject => {
            if(!metadataObject) {
                return;
            }
            CommonSqlMetadataProvider.addDynamicMetadata(metadataObject);
            // script not changed
            if (originalScript === textModel.getValue() && originalScript.endsWith(DOT)) {
                loadingConfig.editor.trigger('dynamic load metadata succeeded', 'editor.action.triggerSuggest', null);
            }
        });
    }

    private disposeCompletionList() {
        const telemetryClient = LSTelemetryClientProvider.getTelemetryClient(this.languageServiceConfig.languageName);

        if (this.acceptedSuggestion) {
            telemetryClient?.recordAcceptance(true);
            this.acceptedSuggestion = null;
        } else {
            telemetryClient?.recordAcceptance(false);
        }
    }
}

function getTableNamespaces(model: editor.IReadOnlyModel, position: Position): string[] {
    try {
        const lastline = model.getLineCount();
        const lastColumnInLastLine = model.getLineMaxColumn(lastline);
        
        if (lastline === position.lineNumber && lastColumnInLastLine === position.column) {
            return [];
        }

        const range = {
            startLineNumber: model.getLineMaxColumn(position.lineNumber) === position.column ? position.lineNumber + 1 : position.lineNumber,
            startColumn: model.getLineMaxColumn(position.lineNumber) === position.column ? 0 : position.column + 1,
            endLineNumber: lastline,
            endColumn: lastColumnInLastLine,
        };
    
        let scriptAfterCursor = model.getValueInRange(range);
        if (!scriptAfterCursor || !scriptAfterCursor.trim().toLowerCase()
            .startsWith("from")) {
            return [];
        }
    
        scriptAfterCursor = scriptAfterCursor.trim();
        const re = /\s*FROM\s+([\w.]+(?:\s+[\w.]+)?(?:\s*,\s*[\w.]+(?:\s+[\w.]+)?)*)/im;
        const result = scriptAfterCursor.match(re);
        if (result.length > 1 && !!result[1]) {
            let tableSources = result[1].split(",").map(item => item.split(/\s+/).shift()
                .trim());
            tableSources = tableSources.filter(item => !!item);
            return tableSources;
        }
        return [];
    } catch {
        return [];
    }
}
