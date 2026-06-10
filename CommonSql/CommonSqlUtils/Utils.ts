
// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CommonSqlCompletionItem } from "./CommonSqlCompletionItem";
import { IMetadataType, ISqlMetadata } from "./MetadataTypes";
import { ISignatureInformation } from './SignatureTypes';

export enum LanguageServiceFeature {
    WordCompletion = 0x01,
    ErrorDetection = 0x02,
    QuickInfo = 0x04,
    SignatureHelp = 0x08,
    AutoFormat = 0x10,
    GotoDefinition = 0x20,
    GotoReferences = 0x40,
    CodeFolding = 0x80,
    CodeAction = 0x100,
    Custom = 0x200,
    all = 0xffff,
}

export interface IErrorMarkItem {
    line: number;
    startColumn: number;
    endColumn: number;
    message: string;
    severity: Severity;
}

export interface IRangeItem {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
}

export function isRangeEqual(a: IRangeItem, b: IRangeItem) {
    return a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn &&
        a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
}

export enum Severity {
    Hint,
    Info,
    Warning,
    Error,
}

export function IsFeatureEnabled(feature: LanguageServiceFeature, flag: number): boolean {
    return (feature & flag) !== 0;
}

export const sqlStmtTerminatorRegex = /\sGO\s|;/gi;

// in milliseconds
// 30 mins
export const languageServiceFacadeInstanceExpireTime = 1800000;

export const asyncSetErrorMarkerDelayTime = 1500;

export class Timeout {
    private static readonly wordCompletion = 2000;
    private static readonly errorDetection = 5000;
    private static readonly quickInfo = 3000;
    private static readonly signatureHelp = 3000;

    public static GetTimeout(feature: LanguageServiceFeature): number {
        switch (feature) {
            case LanguageServiceFeature.WordCompletion:
                return Timeout.wordCompletion;
            case LanguageServiceFeature.ErrorDetection:
                return Timeout.errorDetection;
            case LanguageServiceFeature.QuickInfo:
                return Timeout.quickInfo;
            case LanguageServiceFeature.SignatureHelp:
                return Timeout.signatureHelp;
            default:
                return Timeout.wordCompletion;
        }
    }
}

export interface ICompletionRequestParamter {
    tableNamespaces?: string[];
}

export interface IHoverRequestParameter {
    hoveringWord: string;
    cursorOffset?: number;
    cursorLine?: number;
    cursorColumn?: number;
    range?: IRangeItem; 
}

export interface IFormatRequestParameter {
    tabSize: number;
    insertSpaces: boolean;
}

export interface ICodeActionRequestParameter {
    range: IRangeItem;
}

export interface IDefinitionResult {
    range: IRangeItem;
    metadataObjectName: string;
}

export interface ICodeActionResult {
    kind: CodeActionKind;
    range: IRangeItem;
    text: string;
    title?: string;
}

export enum CodeActionKind {
    StarExpansion = 'starExpansion',
}

export enum CodeActionTitle {
    StarExpansion = 'Expand * to columns',
}

export const LoadMetadataCommand = {
    id: 'LoadMetadata',
    title: 'Dynamic Load Metadata'
}

export interface ILanguageGrammarRuleName {
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

export interface IUnsupportedStatementConfig {
    ruleName: string;
    customizedErrorMessage?: string;
    // Default to be Severity.Error
    severity?: Severity;
}

export interface IIncrementalParsingConfig {
    sqlClauseRule: string;
    goStatementRule: string;
}

export interface ICodeFormattingConfig {
    atomRules?: string[];
    codeBlockRules?: string[];
    flatFormatRules?: string[];
    conjunctionWords?: string[];
    blockCommentChannel?: number;
    lineCommentChannel?: number;
}

export interface IColumnNameRules {
    allColumns: string[];
    sourceColumns: string[];
    columnsFromSourceTable: string[];
}
export interface IMetadataIntellisenseConfig {
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
            Config: tableNameRules: ['table_source']
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
export interface IColumnCollectionDefinitionRule {
    ruleName: string;
    // if columnNameProperty is null, language service will also try to use source columns as well as source tables to generate defined column collection.
    columnNameProperty: string;
}

// when context is expecting the rule or within the rule, then will provide this type of metadata intellisense.
export interface IMetadataNameRule {
    metadataType: IMetadataType;
    rules: string[];
}

export interface ICreateMetadataRule {
    ruleName: string;
    metadataType: IMetadataType;
    metadataNameProperty: string;
    // if some metadata(except database and schema) has children, then the children should be of column type.
    childrenPropertyNames: string[];
}

export interface ISourceTableRule {
    ruleName: string;
    tableNameProperties: string[];
    tableAliasProperties: string[];
}

export interface ISourceColumnRule {
    ruleName: string;
    columnNameProperties: string[];
    columnAliasProperties: string[];
}

export interface ILanguageServiceConfig {
    caseSensitive: boolean;
    builtinFunctions?: Map<string, ISignatureInformation[]>;
    codeSnippets?: ISnippet[];
    grammarRuleNames?: ILanguageGrammarRuleName;
}

export interface ILanguageServiceRequest {
    code: string;
    reason: LanguageServiceFeature;
    parameter?: ICompletionRequestParamter | IHoverRequestParameter | IFormatRequestParameter | ICodeActionRequestParameter;
    metadata?: ISqlMetadata;
    databaseToBeLoaded?: string[];
    timer?: any;
}

export type LanguageServiceResponse = CommonSqlCompletionItem[] | IErrorMarkItem[] | string;

export interface IFoldingRange {
    start: number;
    end: number;
    isComment?: boolean;
}

export interface ISnippet {
    /*
        Label of a snippet
    */
    label: string;
    
    /*
        text of a snippet
    */
    text: string;
}
