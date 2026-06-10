declare enum LanguageServiceFeature {
    WordCompletion = 0x01,
    ErrorDetection = 0x02,
    QuickInfo = 0x04,
    SignatureHelp = 0x08,
    AutoFormat = 0x10,
    GotoDefinition = 0x20,
    all = 0xff,
}

declare enum CommonSqlCompletionItemType {
    Column,
    Table,
    View,
    Schema,
    Database,
    TableFunction,
    Function,
    StoredProcedure,
    Argument,
    DatabaseScopedCredential,
    Keyword,
    Other,
}

declare class CommonSqlCompletionItem {
    public label: string;
    public insertText: string;
    public sortText: string;
    public type: any;
    public detail: string;
    public documentation: string;

    constructor(text: string, detail: string, documentationMarkdownString: string, type: CommonSqlCompletionItemType);
    public static completionItemNotDuplicate(item: CommonSqlCompletionItem, index: number, array: CommonSqlCompletionItem[]): boolean;
}

declare interface IErrorMarkItem {
    line: number;
    column: number;
    message: string;
    severity: Severity;
}

declare enum Severity {
    Hint,
    Info,
    Warning,
    Error,
}

declare interface ISignatureHelp {
    signatures: ISignatureInformation[];
    activeParameter: number;    // current active active parameter
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

declare interface IRangeItem {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}

declare interface IHoverRequestParameter {
    hoveringWord: string;
    cursorOffset?: number;
    cursorLine?: number;
    cursorColumn?: number;
}

declare interface IFormatRequestParameter {
    tabSize: number;
    insertSpaces: boolean;
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
        Used for metadata intellisense. Will provide such kind of metadata intellisense when expecting the rule or within the rule.
    */
    metadataIntellisense?: IMetadataIntellisenseConfig;
}

declare interface IIncrementalParsingConfig {
    sqlClauseRule: string;
    goStatementRule: string;
}

declare interface IColumnNameRules {
    allColumns: string[];
    sourceColumns: string[];
    columnsFromSourceTable: string[];
}

declare interface IMetadataIntellisenseConfig {
    queryExpressionRule: string;
    /*
        require certain type of intellisense 
        ********************************
            except for column type
        ********************************
        when the context expects the rule or within the rule, language service will provide such kind of metadata intellisense.
        eg: 
            Grammar: query: SELECT select_list FROM table_source;
                     table_source: id (, id)*
            Config: tableNameRules: ['table_source']
            PartialScript1: SELECT
            PartialScript2: SELECT a, 
            PartialScript3: SELECT a, b FROM
            PartialScript4: SELECT a, b FROM table1, 
            In PartialScrip1 and PartialScript2, table name intellisense is not needed while in PartialScript3 and PartialScript4 is. 
    */
    metadataNameRules: IMetadataNameRule[];

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
    columnNameRules: IColumnNameRules;
    /* 
        limit table scope and columns scope,
        when table/columns scope are configured in some statement,
        only columns within the table are suggested inside of the statement when column intellisense needed.
    */
    tableSourceRules: ISourceTableRule[];
    columnSourceRules: ISourceColumnRule[];
    /*
        metadata creation rules.
        metadata that are created will added into memory for further metadata intellisense use.
    */
    metadataCreationRules: ICreateMetadataRule[];
    // the rule only will be used in metadata creation rules, not everty time visit column collection definition rule will trigger action.
    columnCollectionDefinitionRules: IColumnCollectionDefinitionRule[];
}

// column collection creation rule such as column_definition_list, select_criteria
declare interface IColumnCollectionDefinitionRule {
    ruleName: string;
    // if columnNameProperty is null, language service will also try to use source columns as well as source tables to generate defined column collection.
    columnNameProperty: string;
}

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

declare interface ILanguageServiceRequest {
    code: string;
    reason: LanguageServiceFeature;
    parameter?: IHoverRequestParameter | IFormatRequestParameter;
    metadata?: any;
    featureFlag?: Map<string, boolean>;
    tableNamespaces?: string[];
    builtinFunctions?: Map<string, ISignatureInformation[]>;
    caseSensitive?: boolean;
    grammarRuleNames?: ILanguageGrammarRuleName;
    timer?: any;
}

declare type LanguageServiceResponse = CommonSqlCompletionItem[] | IErrorMarkItem[] | string;

declare class CommonSqlLanguageServicePipeline {
    public static instance: CommonSqlLanguageServicePipeline;
    public getSuggestions(request: ILanguageServiceRequest): CommonSqlCompletionItem[];
    public getErrors(request: ILanguageServiceRequest): IErrorMarkItem[];
    public getHover(request: ILanguageServiceRequest): string;
    public getSignature(request: ILanguageServiceRequest): ISignatureHelp;
    public getDefinition(request: ILanguageServiceRequest): IRangeItem;
    public getFormat(request: ILanguageServiceRequest): string; 
}

export {
    LanguageServiceFeature,
    CommonSqlLanguageServicePipeline,
    CommonSqlCompletionItemType,
    CommonSqlCompletionItem,
    IErrorMarkItem,
    Severity,
    ISignatureHelp,
    ISignatureInformation,
    IParameterInformation,
    MarkupKind,
    IMarkupContent,
    IRangeItem,
    IHoverRequestParameter,
    IFormatRequestParameter,
    ILanguageGrammarRuleName,
    IIncrementalParsingConfig,
    IColumnNameRules,
    IMetadataIntellisenseConfig,
    IColumnCollectionDefinitionRule,
    IMetadataNameRule,
    ICreateMetadataRule,
    IMetadataType,
    ISourceTableRule,
    ISourceColumnRule,
    ILanguageServiceRequest,
};
