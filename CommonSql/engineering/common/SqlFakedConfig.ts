import { IMetadataType } from '../../CommonSqlUtils/MetadataTypes';
import { ICodeFormattingConfig, IColumnCollectionDefinitionRule, IColumnNameRules, ICreateMetadataRule, IIncrementalParsingConfig, ILanguageGrammarRuleName, IMetadataIntellisenseConfig, IMetadataNameRule, ISnippet, ISourceColumnRule, ISourceTableRule, Severity } from '../../CommonSqlUtils/Utils';
import { scriptsWithoutSyntaxError } from "./SampleScripts";

export const testGrammarRuleNames = {
    nonReservedKeywordsRule: "non_reserved_keywords",
    incrementalParsing: {
        sqlClauseRule: 'sql_clause',
        goStatementRule: 'go_statement',
    } as IIncrementalParsingConfig,
    unsupportedStatements: [
        {
            ruleName: 'with_expression',
            customizedErrorMessage: 'With is not supported',
        },
        {
            ruleName: 'create_table',
            customizedErrorMessage: 'create table is not supported',
            severity: Severity.Warning
        },
    ],
    codeFormatting: { 
        atomRules: ['search_condition', 'data_type', 'column_option', 'join_part', 'predicate', 'as_column_alias'],
        codeBlockRules: ['sql_clause'],
        flatFormatRules: ['expression', 'predicate', 'constant_expression', 'data_type', 'declare_local', 'set_statement', 'join_part', 'table_source_item', 'execute_body', 'function_call'],
        conjunctionWords: ['AND'],
        blockCommentChannel: 1,
        lineCommentChannel: 2,
    } as ICodeFormattingConfig,
    metadataIntellisense: { 
        queryExpressionRule: 'query_expression',
        metadataNameRules: [
            { metadataType: IMetadataType.Table, rules: ['table_name', 'table_name_or_view_name'] } as IMetadataNameRule,
            { metadataType: IMetadataType.View, rules: ['select_list', 'view_name', 'table_name_or_view_name'] } as IMetadataNameRule,
            { metadataType: IMetadataType.Schema, rules: ['schema_name'] } as IMetadataNameRule,
        ],
        columnNameRules: { 
            allColumns: ['select_list'], 
            columnsFromSourceTable: ['where_search_condition', 'update_elem', 'alter_table_alter_item', 'alter_table_drop_item', 'create_index_column_name'], 
            sourceColumns: ['having_search_condition', 'group_by_item', 'order_by_expression'], 
        } as IColumnNameRules,
        tableSourceRules: [
            { ruleName: 'table_source_item', tableNameProperties: ['source_table_name'], tableAliasProperties: ['source_table_alias'] } as ISourceTableRule,
            { ruleName: 'udpate_table_source', tableNameProperties: ['source_table_name'], tableAliasProperties: [] } as ISourceTableRule,
            { ruleName: 'alter_table_source', tableNameProperties: ['source_table_name'], tableAliasProperties: [] } as ISourceTableRule,
            { ruleName: 'create_index_table_source', tableNameProperties: ['source_table_name'], tableAliasProperties: [] } as ISourceTableRule,
        ],
        columnSourceRules: [
            { 
                ruleName: 'select_list_elem', 
                columnNameProperties: ['source_column_name', 'source_column_expression'], 
                columnAliasProperties: ['source_column_alias1', 'source_column_alias2'], 
            } as ISourceColumnRule,
        ],
        metadataCreationRules: [
            { ruleName: 'create_table', metadataNameProperty: 'name', metadataType: IMetadataType.Table, childrenPropertyNames: ['column_children'] } as ICreateMetadataRule,
            { ruleName: 'create_table_as_select', metadataNameProperty: 'name', metadataType: IMetadataType.Table, childrenPropertyNames: ['column_children', 'column_children2'] } as ICreateMetadataRule,
            { ruleName: 'common_table_expression', metadataNameProperty: 'common_table_name', metadataType: IMetadataType.Table, childrenPropertyNames: ['column_children', 'column_children2'] } as ICreateMetadataRule,
            { ruleName: 'create_external_table', metadataNameProperty: 'name', metadataType: IMetadataType.Table, childrenPropertyNames: ['column_children', 'column_children2'] } as ICreateMetadataRule,
            { ruleName: 'create_schema_azure_sql_dw_and_pdw', metadataNameProperty: 'created_schema_name', metadataType: IMetadataType.Schema, childrenPropertyNames: [] } as ICreateMetadataRule,
            { ruleName: 'create_function', metadataNameProperty: 'created_func_name', metadataType: IMetadataType.Function, childrenPropertyNames: [] } as ICreateMetadataRule,
        ],
        columnCollectionDefinitionRules: [
            { ruleName: 'column_definition_list', columnNameProperty: 'column_definition_name' } as IColumnCollectionDefinitionRule,
            { ruleName: 'column_name_list', columnNameProperty: 'column_name' } as IColumnCollectionDefinitionRule,
            { ruleName: 'select_criteria', columnNameProperty: null } as IColumnCollectionDefinitionRule,
        ],
    } as IMetadataIntellisenseConfig,
} as ILanguageGrammarRuleName;

export const snippets: ISnippet[] = scriptsWithoutSyntaxError.map((item, index) => {
    return {
        label: `Script Snippet #${index}`,
        text: item,
    } as ISnippet;
});
