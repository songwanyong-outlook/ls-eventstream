/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICodeFormattingConfig } from "../../../../CommonSqlUtils/Utils";

export const StreamingFormatConfig: ICodeFormattingConfig = {
    /*
        Rules that will not be formatted with new lines and indentations, such as a search condition
    */
    atomRules: [
        'whereClause', 'intoClause', 'fromClause', 'groupByClause', 'orderByClause', 'havingClause',
        'scalarDataType', 'qualifiedJoinUnit',
        'booleanExpressionUnary', 'selectStarExpression',
        'selectColumn'
    ],

    /*
        Rules that will be formatted as code blocks between which empty lines will be inserted
    */
    codeBlockRules: ['statement'],

    /*
        Rules inside which no new lines and indentations will be inserted, such as expressions
    */
    flatFormatRules: ['expression', 'constant_expression', 'scalarDataType',  'qualifiedJoinUnit', 'builtInFunctionCall', 'betweenPredicate'],

    /*
        Words that are used as conjunctions in the language
    */
    conjunctionWords: ['AND', 'OR'],

    /*
        Channel for block comments defined in antlr g4 file
    */
    blockCommentChannel: 1,

    /*
        Channel for line comments defined in antlr g4 file
    */
    lineCommentChannel: 2,
};
