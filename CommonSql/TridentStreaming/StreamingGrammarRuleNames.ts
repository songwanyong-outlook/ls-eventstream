import { IMetadataType } from '../CommonSqlUtils/MetadataTypes';

export const StreamingGrammarRuleNames = {
    nonReservedKeywordsRule: "",
    incrementalParsing: {
        sqlClauseRule: 'statement',
        goStatementRule: '',
    },
    unsupportedStatements: [],
    codeFormatting: { 
        atomRules: ['whereConditionList', 'scalarDataType', 'qualifiedJoinUnit', 'booleanExpressionUnary', 'selectColumn'],
        codeBlockRules: ['statement'],
        flatFormatRules: ['expression', 'statement', 'constant_expression', 'scalarDataType',  'qualifiedJoinUnit', 'builtInFunctionCall'],
        conjunctionWords: ['AND'],
        blockCommentChannel: 1,
        lineCommentChannel: 2,
    },

    metadataIntellisense: { 
        queryExpressionRule: 'queryExpression',
        metadataNameRules: [{
            metadataType: IMetadataType.Table,
            rules: ['fromList', 'selectExpression']
        }, {
            metadataType: IMetadataType.View,
            rules: ['fromList', 'selectExpression']
        }],
        columnNameRules: { 
            allColumns: ['selectList'], 
            columnsFromSourceTable: ['whereConditionList', 'havingConditionList', 'groupByItemList', 'timestampByItem', 'partitionByItemList', 'expressionWithSortOrder', 'qualifiedJoinOnUnit'], 
            sourceColumns: ['whereConditionList', 'havingConditionList', 'groupByItemList', 'timestampByItem', 'partitionByItemList', 'expressionWithSortOrder'], 
        },
        columnSourceRules: [{
            ruleName: 'selectList', 
            columnNameProperties: ['selectColumnExpression'], 
            columnAliasProperties: ['columnAlias'], 
        }],
        tableSourceRules: [{
            // ruleName: 'fromList',
            ruleName: 'selectTableReference',
            tableNameProperties: ['schemaObjectFourPartName'],
            tableAliasProperties: ['simpleTableReferenceAlias']
        }],
        metadataCreationRules: [{
            ruleName: 'resultSetDefinition',
            metadataNameProperty: 'resultSetName',
            metadataType: IMetadataType.View,
            childrenPropertyNames: ['columnNameList']
        }, {
            ruleName: 'createTableStatement',
            metadataNameProperty: 'schemaObjectThreePartName',
            metadataType: IMetadataType.Table,
            childrenPropertyNames: ['elements']
        }],
        columnCollectionDefinitionRules: [{
            ruleName: 'queryExpressionUnit',
            columnNameProperty: ''
        }],
    },
};
