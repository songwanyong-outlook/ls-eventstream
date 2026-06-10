import * as monaco from "monaco-editor";
import { GotoDefinitionDelegate, IDynamicMetadata, IMetadataObject, MetadataDelegate } from "../../../CommonSqlUtils/MetadataTypes";
import { ISignatureInformation } from "../../../CommonSqlUtils/SignatureTypes";
import { ILanguageGrammarRuleName, ISnippet } from "../../../CommonSqlUtils/Utils";
import { ISyntaxHighlight } from "../SqlUtils/MonarchRuleGenerator";

export function IsInSpecialContext(text: string, languageName: string): boolean {
    const specialTokenTags = ["comment", "string", "identifier.quote"];

    try {
        const tokens = monaco.editor.tokenize(text, languageName);
        if (tokens.length > 0 && tokens[tokens.length - 1].length > 0) {
            const hoverToken = tokens.pop().pop();
            return specialTokenTags.some(specialToken => hoverToken.type.includes(specialToken));
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

export interface LanguageServiceConfig {
    /*
        Global monaco instance used. In most of scenarios monaco instance can be imported by import * as monaco from "monaco-editor"
    */
    monacoInstance: typeof monaco;

    /*
        Name of language 
    */
    languageName: string;

    /*
        Web-worker is used to run language service core. 
    */
    languageServiceWorkerConstructor: any;

    /*
        Syntax highlight rule for the language. By registering the rule to monaco, monaco can provide syntax highlight for this language.
    */
    syntaxHighlightRule: ISyntaxHighlight | monaco.languages.IMonarchLanguage;

    /*
        For sql-like language to get metadata such as shemas, tables, columns...
    */
    metadataDelegate?: MetadataDelegate;

    /*
        Dynamic load metadata by database name. Will called when user types specific database names.
    */
    dynamicMetadataLoadingConfig?: IDynamicMetadataLoadingConfig;

    /* 
        User-defined delegate. Use metadata qualified name to provide a customized definition experience.  
    */
    gotoDefinitionDelegate?: GotoDefinitionDelegate;

    /*
        Builtin functions information. Can be used in word completion, quick info and signature help.
    */
    builtinFunctions: ISignatureInformation[];

    /*
        If keyword is sensitive for the language. 
    */
    caseSensitive?: boolean;

    /*
        Rule names that defined with language grammar .g4 file.
    */
    grammarRuleNames?: ILanguageGrammarRuleName;

    /*
        Config for snippet support
    */
    snippetConfig?: ISnippetConfig;

    /*
        Config for language service telemetry.
    */
    telemetryConfig?: ITelemetryConfig;
}

export interface ISnippetConfig {
    /*
        The editor instance
    */
    editor: monaco.editor.IStandaloneCodeEditor;

    /*
        Snippet list
    */
    snippets: ISnippet[];
}

export interface ITelemetryConfig {
    /*
        Function delegate used to send processed latency data to telemetry server.
    */
    sendLatencyTelemetryFunc: LatencyTelemetryRecordFunction;

    /*
        Function delegate used to send processed suggestion acceptance data to telemetry server.
    */
    sendSuggestionAcceptanceTelemetryFunc: SuggestionAcceptanceTelemetryRecordFunction;

    /*
        Usually single telemetry contains data from multiple language service request.
        This helps to avoid frequent data sending action to telemetry server.
        The property indicates how many data one single telemetry record should contain.
    */
    maxDataCountPerRecord: number;
    /*
        Set a timeout to indicate when time is out. No matter whether the count of data collected has reached the bar of sending telemetry, just flush telemetry and send them to server.
        If clientTimeout is 0 or less than 0, then count bar is the only trigger of sending telemetry.
    */
    clientTimeout: number;
}

export type LatencyTelemetryRecordFunction = (featureName: TelemetryRecordFeature, avgLatency: number, dataCount: number) => void;

export type SuggestionAcceptanceTelemetryRecordFunction = (suggestionAcceptanceCount: number, dataCount: number) => void;

export enum TelemetryRecordFeature {
    WordCompletion,
    ErrorDetection,
    QuickInfo,
    SignatureHelp,
    GotoDefinition,
    GotoReferences,
}

export const completionItemSelectionCommandId = "accept_completion_item";

type LoadMetadata = (database: string) => Promise<IMetadataObject>;
type GetAvailableDynamicMetadata = () => Promise<IDynamicMetadata>;

export interface IDynamicMetadataLoadingConfig {
    // available metadata names. Only if the metadata is in this list, dynamic metadata loading will be triggered.
    getAvailableDynamicMetadata: GetAvailableDynamicMetadata;
    loadMetadata: LoadMetadata;
    editor: monaco.editor.IStandaloneCodeEditor;
}
