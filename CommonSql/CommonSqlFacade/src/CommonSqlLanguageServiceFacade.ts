import { editor, IMarkdownString, languages, MarkerSeverity } from "monaco-editor";
import { buildBuiltinFunctionMap } from "../../CommonSqlUtils/BulitinFunctionHelpers";
import { CommonSqlCompletionItem } from "../../CommonSqlUtils/CommonSqlCompletionItem";
import { ISignatureHelp } from "../../CommonSqlUtils/SignatureTypes";
import { 
    CodeActionKind, 
    CodeActionTitle, 
    ICodeActionResult, 
    IDefinitionResult, 
    IErrorMarkItem, 
    IFoldingRange, 
    ILanguageServiceConfig, 
    ILanguageServiceRequest, 
    languageServiceFacadeInstanceExpireTime, 
    LanguageServiceFeature, 
    Severity, 
    Timeout 
} from '../../CommonSqlUtils/Utils';
import { mapToMonacoCompletionItemList } from "./SqlUtils/MonacoCompletiomItemGenerator";
import { UseSingleWorkerForAllLanguageServiceFeatures } from "../../CommonSqlUtils/LanguageFeatureFlag";
import { LSPerformanceWatcher } from "./LanguageServicePerformanceWatcher";
import { LanguageServiceConfig } from "./SqlUtils/ServiceProviderUtils";

export type ParserResult = languages.CompletionList | editor.IMarkerData[] | languages.Hover | languages.SignatureHelpResult | languages.TextEdit[] | IDefinitionResult | string | languages.FoldingRange[] | languages.CodeActionList;

interface ILanguageServiceResource {
    worker: Worker;
    pendingRequest: ILanguageServiceRequest;
    processingRequest: ILanguageServiceRequest;
}

export class CommonSqlLanguageServiceFacade {
    protected languageServiceResourceManagementPool: LanguageServiceResourceManagementPool = null;
    protected workingWorker: Worker = null;

    private performanceWatcher: LSPerformanceWatcher = null;

    private static createWorker: any = null;
    private static instance: CommonSqlLanguageServiceFacade = null;
    private static instanceTimer = null;

    public static GetInstance(config: LanguageServiceConfig): CommonSqlLanguageServiceFacade {
        CommonSqlLanguageServiceFacade.createWorker = config.languageServiceWorkerConstructor;
        CommonSqlLanguageServiceFacade.RefreshInstance();
        if (!CommonSqlLanguageServiceFacade.instance) {
            CommonSqlLanguageServiceFacade.instance = new CommonSqlLanguageServiceFacade({
                caseSensitive: config.caseSensitive ?? false,
                grammarRuleNames: config.grammarRuleNames,
                codeSnippets: config.snippetConfig?.snippets,
                builtinFunctions: buildBuiltinFunctionMap(config.builtinFunctions),
            });
        }
        return CommonSqlLanguageServiceFacade.instance;
    }

    private constructor(config: ILanguageServiceConfig) {
        this.languageServiceResourceManagementPool = new LanguageServiceResourceManagementPool(CommonSqlLanguageServiceFacade.createWorker);
        this.InitializeLanguageServiceResource(config);
        this.performanceWatcher = new LSPerformanceWatcher();
    }

    private InitializeLanguageServiceResource(config: ILanguageServiceConfig): void {
        for (const feature in LanguageServiceFeature) {
            if (!isNaN(Number(feature))) {
                const resourceId = this.GetResourceGroupId(Number(feature));
                this.languageServiceResourceManagementPool.createLSResource(resourceId, config);
            }
        }
    }

    public GetLanguageServiceResult(languageServiceRequest: ILanguageServiceRequest): Promise<ParserResult> {
        let isTimeout = false;
        let timer: any = null;

        const timeExceeded = new Promise<ParserResult>((resolve) => {
            timer = setTimeout(() => {
                isTimeout = true;
                resolve([]);
            }, Timeout.GetTimeout(languageServiceRequest.reason), {});
            languageServiceRequest.timer = timer;
        });
        const result = this.GetResultFromLSWorker(languageServiceRequest);

        return Promise.race([timeExceeded, result]).then((result) => {
            if (isTimeout) {
                this.performanceWatcher.reportTimeout(languageServiceRequest.code, languageServiceRequest.reason);

                const resourceId = this.GetResourceGroupId(languageServiceRequest.reason);
                const resourceCurrentInUse: ILanguageServiceResource = this.languageServiceResourceManagementPool.getResource(resourceId);
                resourceCurrentInUse.worker.terminate();
                resourceCurrentInUse.worker = CommonSqlLanguageServiceFacade.createWorker();

                resourceCurrentInUse.processingRequest = null;
                if (!!resourceCurrentInUse.pendingRequest && timer === resourceCurrentInUse.pendingRequest.timer) {
                    // if pending request timeout. Set null to avoid sending a timeout pending request.
                    resourceCurrentInUse.pendingRequest = null;
                }
                this.SendPendingRequest(languageServiceRequest.reason);
            }
            return result;
        });
    }

    protected GetResourceGroupId(feature: LanguageServiceFeature): number {
        switch (feature) {
            case LanguageServiceFeature.WordCompletion:
                return 1;
            case LanguageServiceFeature.ErrorDetection:
                return UseSingleWorkerForAllLanguageServiceFeatures ? 1 : 2;
            case LanguageServiceFeature.QuickInfo:
                return 1;
            case LanguageServiceFeature.SignatureHelp:
                return 1;
            case LanguageServiceFeature.AutoFormat:
                return 1;
            case LanguageServiceFeature.GotoDefinition:
                return 1;
            case LanguageServiceFeature.GotoReferences:
                return 1;
            case LanguageServiceFeature.CodeFolding:
                return 1;
            case LanguageServiceFeature.CodeAction:
                return 1;
            default:
                return -1;
        }
    }

    protected DisposeLanguageServiceResource(): void {
        this.languageServiceResourceManagementPool.disposeResource();
    }

    protected GetResultFromLSWorker(languageServiceRequest: ILanguageServiceRequest): Promise<ParserResult> {
        const resourceId = this.GetResourceGroupId(languageServiceRequest.reason);
        const lsResource = this.languageServiceResourceManagementPool.getResource(resourceId);
        if (!lsResource) {
            return null;
        }

        this.workingWorker = lsResource.worker;
        let promiseResolve: (value?: ParserResult) => void;
        const result = new Promise<ParserResult>((resolve) => {
            promiseResolve = resolve;
        });

        this.workingWorker.onmessage = (ev: MessageEvent) => {
            const parseResults: any = ev.data;

            // Result returned from worker. Set processingRequest to be null. Clear corresponding timeout.
            const resourceId = this.GetResourceGroupId(languageServiceRequest.reason);
            const processingRequest = this.languageServiceResourceManagementPool.getResource(resourceId).processingRequest;
            if (processingRequest) {
                clearTimeout(processingRequest.timer);
            }
            this.languageServiceResourceManagementPool.getResource(resourceId).processingRequest = null;
            this.SendPendingRequest(languageServiceRequest.reason);

            // promise resolve.
            if (languageServiceRequest.reason === LanguageServiceFeature.WordCompletion) {
                promiseResolve(this.DecorateCompletionItems(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.ErrorDetection) {
                promiseResolve(this.DecorateErrorMarkItems(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.QuickInfo) {
                promiseResolve(this.DecorateHoverItem(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.SignatureHelp) {
                promiseResolve(this.DecorateFunctionSignature(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.AutoFormat) {
                promiseResolve(this.DecorateFormattedText(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.GotoDefinition) {
                promiseResolve(this.DecorateDefinitionItem(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.GotoReferences) {
                promiseResolve(this.DecorateReferenceItems(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.CodeFolding) {
                promiseResolve(this.DecorateFoldingRanges(parseResults));
            } else if (languageServiceRequest.reason === LanguageServiceFeature.CodeAction) {
                promiseResolve(this.DecorateCodeActions(parseResults));
            }
        };

        this.ProcessIncomingRequest(languageServiceRequest, languageServiceRequest.reason);
        return result;
    }

    protected DecorateErrorMarkItems(items: IErrorMarkItem[]): editor.IMarkerData[] {
        const markers: editor.IMarkerData[] = [];
        if (!items) {
            return markers;
        }

        for (const item of items) {
            const mark: editor.IMarkerData = {
                message : item.message,
                startColumn : item.startColumn + 1,
                endColumn : item.endColumn + 1,
                startLineNumber : item.line,
                endLineNumber : item.line,
                severity : item.severity === Severity.Error ? MarkerSeverity.Error :
                    (item.severity === Severity.Warning ? MarkerSeverity.Warning :
                        (item.severity === Severity.Hint ? MarkerSeverity.Hint : MarkerSeverity.Info)),
            };
            markers.push(mark);
        }
        return markers;
    }

    protected DecorateHoverItem(documentationMarkdown: string): languages.Hover {
        return { contents: [{ value: documentationMarkdown } as IMarkdownString] } as languages.Hover;
    }

    protected DecorateFormattedText(formattedText: string): languages.TextEdit[] {
        return [{ text: formattedText, range: null } as languages.TextEdit];
    }

    protected DecorateFoldingRanges(foldingRanges: IFoldingRange[]): languages.FoldingRange[] {
        return foldingRanges.map(foldingRange => <languages.FoldingRange> {
            start: foldingRange.start,
            end: foldingRange.end,
            kind: foldingRange.isComment ? languages.FoldingRangeKind.Comment : languages.FoldingRangeKind.Region,
        });
    }

    protected DecorateFunctionSignature(signatureHelp: ISignatureHelp): languages.SignatureHelpResult {
        const result = {
            dispose: () => {
                // empty
            },
            value: {
                signatures: [],
                activeSignature: 0,
                activeParameter: 0,
            } as languages.SignatureHelp,
        } as languages.SignatureHelpResult;

        if (!!signatureHelp && !!signatureHelp.signatures) {
            for (const sig of signatureHelp.signatures) {
                result.value.signatures.push({
                    label: sig.label,
                    documentation: { value : !sig.example ? sig.documentation : sig.documentation + "\n\nExample:\n```sql\n" + sig.example + "\n```" },
                    parameters: sig.parameters ?? [],
                } as languages.SignatureInformation);
            }
            result.value.activeParameter = signatureHelp.activeParameter;
        }
        return result;
    }

    protected ProcessIncomingRequest(source: ILanguageServiceRequest, feature: LanguageServiceFeature): void {
        const resourceId = this.GetResourceGroupId(feature);
        source.code = this.performanceWatcher.reduceScript(source.code, feature);

        if (this.workingWorker === null) {
            const lsResource = this.languageServiceResourceManagementPool.getResource(resourceId);
            if (!lsResource) {
                return;
            }
            this.workingWorker = lsResource.worker;
        }

        const currentResourceInUse = this.languageServiceResourceManagementPool.getResource(resourceId);
        if (currentResourceInUse.processingRequest === null) {
            // If there is no processing request, could post message and start a new request right now.
            currentResourceInUse.processingRequest = source;
            this.workingWorker.postMessage(source);
        } else {
            // If there is some request that is being processed, make the coming request to be the pending request since it is the latest request.
            if (currentResourceInUse.pendingRequest) {
                // if there exist a pendingRequest, first clear the timeout of the pending request.
                clearTimeout(currentResourceInUse.pendingRequest.timer);
            }
            currentResourceInUse.pendingRequest = source;
        }
    }

    protected SendPendingRequest(feature: LanguageServiceFeature): void {
        const resourceId = this.GetResourceGroupId(feature);

        if (this.workingWorker === null) {
            const lsResource = this.languageServiceResourceManagementPool.getResource(resourceId);
            if (!lsResource) {
                return;
            }
            this.workingWorker = lsResource.worker;
        }

        const currentResourceInUse = this.languageServiceResourceManagementPool.getResource(resourceId);
        if (currentResourceInUse.pendingRequest !== null) {
            currentResourceInUse.processingRequest = currentResourceInUse.pendingRequest;
            currentResourceInUse.pendingRequest = null;
            this.workingWorker.postMessage(currentResourceInUse.processingRequest);
        }
        return;
    }

    public static RefreshInstance(): any {
        if (CommonSqlLanguageServiceFacade.instanceTimer) {
            clearTimeout(CommonSqlLanguageServiceFacade.instanceTimer);
        }
        CommonSqlLanguageServiceFacade.instanceTimer = CommonSqlLanguageServiceFacade.CreateNewTimer();
    }

    private static CreateNewTimer(): any {
        return setTimeout(() => {
            CommonSqlLanguageServiceFacade.instance.DisposeLanguageServiceResource();
            CommonSqlLanguageServiceFacade.instance = null;
            CommonSqlLanguageServiceFacade.instanceTimer = null;
        }, languageServiceFacadeInstanceExpireTime);
    }

    protected DecorateCompletionItems(items: CommonSqlCompletionItem[]): languages.CompletionList | string {
        if (typeof items === 'string') {
            return items;
        }
        return mapToMonacoCompletionItemList(items);
    }
    
    protected DecorateDefinitionItem(result: IDefinitionResult): IDefinitionResult {
        return result;
    }
    
    protected DecorateReferenceItems(name: string): string {
        // currently just return name of the metadataObejct
        return name;
    }

    protected DecorateCodeActions(codeActionResults: ICodeActionResult[]): languages.CodeActionList {
        const codeActions: languages.CodeAction[] = [];
        codeActionResults?.forEach(r => {
            switch (r.kind) {
                case CodeActionKind.StarExpansion:
                    codeActions.push(this.createStarExpansionCodeAction(r));
                    break;
            }
        });

        return {
            actions: codeActions,
            dispose() {
                // empty
            }, 
        } as languages.CodeActionList;
    }

    private createStarExpansionCodeAction(result: ICodeActionResult): languages.CodeAction {
        const workspaceTextEdit = {
            resource: null, // fullfill in provider
            edit: { 
                range: result.range, 
                text: result.text 
            } as languages.TextEdit,
        } as languages.WorkspaceTextEdit;

        return {
            title: result.title ? result.title : CodeActionTitle.StarExpansion, 
            edit: { 
                edits: [workspaceTextEdit],
            } as languages.WorkspaceEdit,
        } as languages.CodeAction;
    }
}

class LanguageServiceResourceManagementPool {
    private _createLSWorker: () => Worker = null;
    // key is resource group id.
    private languageServiceResourcePool: Map<number, ILanguageServiceResource> = new Map();

    constructor(createLSWorker: () => Worker) {
        this._createLSWorker = createLSWorker;
    }

    public createLSResource(resourceId: number, config: ILanguageServiceConfig) {
        if (resourceId < 0 || this.languageServiceResourcePool.has(resourceId)) {
            return;
        }
        const newLanguageServiceResource = this.createEmptyLanguageServiceResource();
        this.languageServiceResourcePool.set(resourceId, newLanguageServiceResource);
        if (config) {
            newLanguageServiceResource.worker.postMessage(config);
        }
    }

    public getResource(resourceId: number): ILanguageServiceResource {
        if (this.languageServiceResourcePool.has(resourceId)) {
            return this.languageServiceResourcePool.get(resourceId);
        }
        return null;
    }

    public disposeResource() {
        for (const resource of Array.from(this.languageServiceResourcePool.values())) {
            if (!!resource && !!resource.worker) {
                resource.worker.terminate();
            }
        }
    }

    private createEmptyLanguageServiceResource() {
        return {
            worker: this._createLSWorker(),
            pendingRequest: null,
            processingRequest: null,
        } as ILanguageServiceResource;
    }
}
