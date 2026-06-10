import * as monaco from "monaco-editor";

declare interface LanguageServiceConfig {
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

declare interface ISyntaxHighlight {
    postfix?: string;
    keywords: string[];
    operators: string[];
    builtinFunctions: string[];
    builtinVariables: string[];
    commentTokenizer?: ICommentTokenizer;
    stringTokenizer?: IStringTokenizer;
}

declare interface ICommentTokenizer {
    lineCommentsTokenizer: ITokenizer;
    blockCommentsTokenizer: ITokenizer;
}
declare interface IStringTokenizer {
    singleLineStringTokenizer: ITokenizer;
    multiLineStringTokenizer: ITokenizer;
}
declare interface ITokenizer {
    start: string;
    end?: string;
}

declare interface ILanguageGrammarRuleName {
    /*
        non_reserved_keywords rule name.
    */
    nonReservedKeywordsRule?: string;

    /*
        Grammar nodes information for incremental parsing
    */
    incrementalParsing?: IIncrementalParsingConfig;

    /*
        Unsupported statements which will be marked as error
    */
    unsupportedStatements?: IUnsupportedStatementConfig[];

    /*
        Used for metadata intellisense. Will provide such kind of metadata intellisense when expecting the rule or within the rule.
    */
    metadataIntellisense?: IMetadataIntellisenseConfig;

    /*
        Grammar nodes information for code formatting
    */
    codeFormatting?: ICodeFormattingConfig;
}

declare interface IUnsupportedStatementConfig {
    ruleName: string;
    customizedErrorMessage?: string;
    // Default to be Severity.Error
    severity?: Severity;
}

declare enum Severity {
    Hint,
    Info,
    Warning,
    Error,
}

declare interface IIncrementalParsingConfig {
    sqlClauseRule: string;
    goStatementRule: string;
}

declare interface ICodeFormattingConfig {
    /*
        Rules that will not be formatted with new lines and indentations, such as a search condition
    */
    atomRules?: string[];
    
    /*
        Rules that will be formatted as code blocks between which empty lines will be inserted
    */
    codeBlockRules?: string[];
    
    /*
        Rules inside which no new lines and indentations will be inserted, such as expressions
    */
    flatFormatRules?: string[];
    
    /*
        Channel for block comments defined in antlr g4 file
    */
    blockCommentChannel?: number;
    
    /*
        Channel for line comments defined in antlr g4 file
    */
    lineCommentChannel?: number;
}

declare interface IMetadataIntellisenseConfig {
    queryExpressionRule?: string;
    /*
        require certain type of intellisense 
        ********************************
            except for column type
        ********************************
        when the context expects the rule or within the rule, language service will provide such kind of metadata intellisense.
        eg: 
            Grammar: query: SELECT select_list FROM table_source;
                     table_source: id (, id)*
            Config: metadataNameRules: [{metadataType: IMetadataType.Table, rules: ['table_source']} as IMetadataNameRule]
            PartialScript1: SELECT
            PartialScript2: SELECT a, 
            PartialScript3: SELECT a, b FROM
            PartialScript4: SELECT a, b FROM table1, 
            In PartialScrip1 and PartialScript2, table name intellisense is not needed while in PartialScript3 and PartialScript4 is. 
    */
    metadataNameRules?: IMetadataNameRule[];

    /*
        require column type of intellisense 
        ********************************
            only for column type
        ********************************
        eg: 
            Grammar: query: SELECT select_list FROM table_source WHERE where_search_condition HAVING having_search_condition;
            Config: columnNameRules: {allColumns: ['select_list'], sourceColumns: ['having_search_condition'], columnsFromSoureTable: ['where_search_condition']}
            PartialScript1: SELECT 
            PartialScript2: SELECT a FROM tableA WHERE
            PartialScript3: SELECT a FROM tableA WHERE a > 10 HAVING
            In PartialScript1, all columns are needed as suggestions. 
            In PartialScript2, columns from tableA are needed as suggestions.
            In PartialScript3, a is needed as suggestion.
    */
    columnNameRules?: IColumnNameRules;
    /* 
        limit table scope and columns scope,
        when table/columns scope are configured in some statement,
        only columns within the table are suggested inside of the statement when column intellisense needed.
    */
    tableSourceRules?: ISourceTableRule[];
    columnSourceRules?: ISourceColumnRule[];
    /*
        metadata creation rules.
        metadata that are created will added into memory for further metadata intellisense use.
    */
    metadataCreationRules?: ICreateMetadataRule[];
    // the rule only will be used in metadata creation rules, not everty time visit column collection definition rule will trigger action.
    columnCollectionDefinitionRules?: IColumnCollectionDefinitionRule[];
}

// column collection creation rule such as column_definition_list, select_criteria
declare interface IColumnCollectionDefinitionRule {
    ruleName: string;
    // if columnNameProperty is null, language service will also try to use source columns as well as source tables to generate defined column collection.
    columnNameProperty: string;
}

// when context is expecting the rule or within the rule, then will provide this type of metadata intellisense.
declare interface IMetadataNameRule {
    metadataType: IMetadataType;
    rules: string[];
}

declare interface ICreateMetadataRule {
    ruleName: string;
    metadataType: IMetadataType;
    metadataNameProperty: string;
    // if some metadata(except database and schema) has children, then the children should be of column type.
    childrenPropertyNames: string[];
}

declare interface ISourceTableRule {
    ruleName: string;
    tableNameProperties: string[];
    tableAliasProperties: string[];
}

declare interface ISourceColumnRule {
    ruleName: string;
    columnNameProperties: string[];
    columnAliasProperties: string[];
}

declare interface IColumnNameRules {
    allColumns: string[];
    sourceColumns: string[];
    columnsFromSourceTable: string[];
}

declare interface ISnippetConfig {
    /*
        The editor instance
    */
    editor: monaco.editor.IStandaloneCodeEditor;

    /*
        Snippet list
    */
    snippets: ISnippet[];
}

declare interface ISnippet {
    /*
        Label of a snippet
    */
    label: string;
    
    /*
        text of a snippet
    */
    text: string;
}

declare type MetadataDelegate = () => ISqlMetadata;

declare type LoadMetadata = (database: string) => Promise<IMetadataObject>;

declare type GetAvailableDynamicMetadata = () => Promise<IDynamicMetadata>;

declare interface IDynamicMetadataLoadingConfig {
    // available metadata names. Only if the metadata is in this list, dynamic metadata loading will be triggered.
    getAvailableDynamicMetadata: GetAvailableDynamicMetadata;
    loadMetadata: LoadMetadata;
    editor: monaco.editor.IStandaloneCodeEditor;
}

declare type GotoDefinitionDelegate = (metadataObjectName: string) => Promise<void>;

// this is the metadata format used internal
declare interface ISqlMetadata {
    objects: IMetadataObject[];
    defaultSchema: string;
}

declare interface ISignatureInformation {
    // The name of this function.
    name: string;
    
    // The label of this signature. Will be shown in the UI.
    label: string;

    // The human-readable doc-comment of this signature. Will be shown in the UI but can be omitted.
    documentation?: string | IMarkupContent;

    // The parameters of this signature.
    parameters?: IParameterInformation[];

    example?: string;
}

declare interface IParameterInformation {
    // The label of this parameter information.
    // Either a string or inclusive start and exclusive end offsets within its containing
    // [signature label](#SignatureInformation.label).
    label: string;

    // The human-readable doc-comment of this signature. Will be shown in the UI but can be omitted.
    documentation?: string | IMarkupContent;
}

declare type MarkupKind = "plaintext" | "markdown";

declare interface IMarkupContent {
    // The type of the Markup
    kind: MarkupKind;

    // The content itself
    value: string;
}

declare interface IMetadataObject {
    name: string;
    prefix: string;
    type: IMetadataType;
    children: IMetadataObject[];
    details?: string;
    doc?: string;
}

export interface IDynamicMetadata {
    databases: string[];
}

declare enum IMetadataType {
    Schema = "Schema",
    Database = "Database",
    // Just a type that represents column type, real column type should be written in detail column type such as "DateTime"
    ColumnType = "Column",
    Table = "Table",
    Function = "Function",
    StoredProcedure = "StoredProcedure",
    View = "View",
    TableFunction = "TableFunction",
    User = "User",
    Type = "Type",
    Index = "Index",
    Other = "Other",
}

declare interface ITelemetryConfig {
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

declare type LatencyTelemetryRecordFunction = (featureName: TelemetryRecordFeature, avgLatency: number, dataCount: number) => void;

declare type SuggestionAcceptanceTelemetryRecordFunction = (suggestionAcceptanceCount: number, dataCount: number) => void;

declare enum TelemetryRecordFeature {
    WordCompletion,
    ErrorDetection,
    QuickInfo,
    SignatureHelp,
}

declare class CommonSqlLanguageServiceProvider {
    public static InitializeLanguageServiceFeatures(config: LanguageServiceConfig): void;
    public static setErrorMarkerAsync(model: monaco.editor.ITextModel, versionId: number): void;
}
