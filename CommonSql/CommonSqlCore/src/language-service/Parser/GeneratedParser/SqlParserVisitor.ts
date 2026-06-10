// Generated from src\language-service\Grammar\SqlParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { SqlContext } from "./SqlParserParser";
import { StatementContext } from "./SqlParserParser";
import { Empty_statementContext } from "./SqlParserParser";
import { ResultSetDefinitionsContext } from "./SqlParserParser";
import { ResultSetDefinitionContext } from "./SqlParserParser";
import { QueryExpressionContext } from "./SqlParserParser";
import { QueryExpressionUnitContext } from "./SqlParserParser";
import { QueryParenthesisContext } from "./SqlParserParser";
import { QuerySpecificationContext } from "./SqlParserParser";
import { ColumnNameListContext } from "./SqlParserParser";
import { OrderByClauseUnitContext } from "./SqlParserParser";
import { ExpressionWithSortOrderContext } from "./SqlParserParser";
import { OrderByOptionContext } from "./SqlParserParser";
import { GroupByClauseContext } from "./SqlParserParser";
import { GroupByItemListContext } from "./SqlParserParser";
import { GroupByItemContext } from "./SqlParserParser";
import { SimpleGroupByItemContext } from "./SqlParserParser";
import { WhereClauseContext } from "./SqlParserParser";
import { WhereConditionListContext } from "./SqlParserParser";
import { BooleanExpressionContext } from "./SqlParserParser";
import { BooleanExpressionWithFlagsContext } from "./SqlParserParser";
import { BooleanExpressionOrContext } from "./SqlParserParser";
import { BooleanExpressionAndContext } from "./SqlParserParser";
import { BooleanExpressionUnaryContext } from "./SqlParserParser";
import { BooleanExpressionPrimaryContext } from "./SqlParserParser";
import { LikePredicateContext } from "./SqlParserParser";
import { BetweenPredicateContext } from "./SqlParserParser";
import { InPredicateContext } from "./SqlParserParser";
import { ExpressionListContext } from "./SqlParserParser";
import { NullPredicateContext } from "./SqlParserParser";
import { ComparisonPredicateContext } from "./SqlParserParser";
import { ComparisonOperatorContext } from "./SqlParserParser";
import { ExpressionWithFlagsContext } from "./SqlParserParser";
import { ExpressionBinaryPri2Context } from "./SqlParserParser";
import { ExpressionBinaryPri1Context } from "./SqlParserParser";
import { ExpressionUnaryContext } from "./SqlParserParser";
import { ExpressionWithClrElementsContext } from "./SqlParserParser";
import { NonQuotedIdentifierContext } from "./SqlParserParser";
import { ExpressionWithClrElementsFunctionCallPartContext } from "./SqlParserParser";
import { ParenthesizedOptExpressionWithDefaultListContext } from "./SqlParserParser";
import { ExpressionWithDefaultListContext } from "./SqlParserParser";
import { ExpressionWithDefaultContext } from "./SqlParserParser";
import { ExpressionPrimaryContext } from "./SqlParserParser";
import { ParenthesisDisambiguatorForExpressionsContext } from "./SqlParserParser";
import { ExpressionParenthesisContext } from "./SqlParserParser";
import { NullIfExpressionContext } from "./SqlParserParser";
import { CaseExpressionContext } from "./SqlParserParser";
import { SearchedCaseExpressionContext } from "./SqlParserParser";
import { SearchedWhenExpressionContext } from "./SqlParserParser";
import { SimpleCaseExpressionContext } from "./SqlParserParser";
import { SimpleWhenClauseUnitContext } from "./SqlParserParser";
import { ColumnOrFunctionCallContext } from "./SqlParserParser";
import { UserFunctionCallContext } from "./SqlParserParser";
import { MultiPartIdentifierContext } from "./SqlParserParser";
import { BuiltInFunctionCallContext } from "./SqlParserParser";
import { RegularBuiltInFunctionCallContext } from "./SqlParserParser";
import { AggregateBuiltInFunctionCallContext } from "./SqlParserParser";
import { OverClauseUnitContext } from "./SqlParserParser";
import { OverClauseNoOrderByContext } from "./SqlParserParser";
import { OverClauseBeginningContext } from "./SqlParserParser";
import { PartitionByContext } from "./SqlParserParser";
import { PartitionByItemListContext } from "./SqlParserParser";
import { PartitionByItemContext } from "./SqlParserParser";
import { UniqueRowFilterContext } from "./SqlParserParser";
import { OverWhenClauseUnitContext } from "./SqlParserParser";
import { LimitDurationClauseUnitContext } from "./SqlParserParser";
import { DurationClauseUnitContext } from "./SqlParserParser";
import { StarColumnReferenceExpressionContext } from "./SqlParserParser";
import { CastCallContext } from "./SqlParserParser";
import { LiteralContext } from "./SqlParserParser";
import { RealContext } from "./SqlParserParser";
import { MoneyLiteralContext } from "./SqlParserParser";
import { BinaryContext } from "./SqlParserParser";
import { NullLiteralContext } from "./SqlParserParser";
import { BooleanExpressionParenthesisContext } from "./SqlParserParser";
import { SelectColumnContext } from "./SqlParserParser";
import { StringOrIdentifierContext } from "./SqlParserParser";
import { StringLiteralContext } from "./SqlParserParser";
import { SelectColumnExpressionContext } from "./SqlParserParser";
import { MaxContext } from "./SqlParserParser";
import { ScalarDataTypeContext } from "./SqlParserParser";
import { BuildinTypesContext } from "./SqlParserParser";
import { DataTypeSchemaObjectNameContext } from "./SqlParserParser";
import { DataTypeParametersOptContext } from "./SqlParserParser";
import { IntegerContext } from "./SqlParserParser";
import { NumericContext } from "./SqlParserParser";
import { MatchRecognizeContext } from "./SqlParserParser";
import { MatchRecognizBodyContext } from "./SqlParserParser";
import { MeasureClauseContext } from "./SqlParserParser";
import { MeasureColumnItemContext } from "./SqlParserParser";
import { ColumnAliasContext } from "./SqlParserParser";
import { AfterMatchContext } from "./SqlParserParser";
import { PatternContext } from "./SqlParserParser";
import { PatternGroupContext } from "./SqlParserParser";
import { PatternNameModifierContext } from "./SqlParserParser";
import { PatternAtomContext } from "./SqlParserParser";
import { PatternModifierContext } from "./SqlParserParser";
import { PatternDefinesContext } from "./SqlParserParser";
import { PatternDefineContext } from "./SqlParserParser";
import { IntoClauseContext } from "./SqlParserParser";
import { HavingClauseContext } from "./SqlParserParser";
import { SchemaObjectThreePartNameContext } from "./SqlParserParser";
import { SelectExpressionContext } from "./SqlParserParser";
import { SelectStarExpressionContext } from "./SqlParserParser";
import { ExpressionContext } from "./SqlParserParser";
import { OptSemicolonsContext } from "./SqlParserParser";
import { FromClauseContext } from "./SqlParserParser";
import { FromListContext } from "./SqlParserParser";
import { FromItemContext } from "./SqlParserParser";
import { SelectTableReferenceElementContext } from "./SqlParserParser";
import { DerivedTableContext } from "./SqlParserParser";
import { QueryDerivedTableContext } from "./SqlParserParser";
import { SimpleTableReferenceAliasContext } from "./SqlParserParser";
import { SchemaObjectOrFunctionTableReferenceContext } from "./SqlParserParser";
import { SchemaObjectFunctionTableReferenceContext } from "./SqlParserParser";
import { SchemaObjectTableReferenceContext } from "./SqlParserParser";
import { NrtHintContext } from "./SqlParserParser";
import { JoinElementContext } from "./SqlParserParser";
import { QualifiedJoinContext } from "./SqlParserParser";
import { QualifiedJoinUnitContext } from "./SqlParserParser";
import { QualifiedJoinOnUnitContext } from "./SqlParserParser";
import { UnqualifiedJoinContext } from "./SqlParserParser";
import { UnqualifiedJoinUnitContext } from "./SqlParserParser";
import { TimestampByContext } from "./SqlParserParser";
import { NonParameterTableHintsContext } from "./SqlParserParser";
import { SchemaObjectFourPartNameContext } from "./SqlParserParser";
import { IdentifierListContext } from "./SqlParserParser";
import { IdentifierListElementContext } from "./SqlParserParser";
import { CreateTableStatementContext } from "./SqlParserParser";
import { TableDefinitionCreateTableContext } from "./SqlParserParser";
import { TableElementListContext } from "./SqlParserParser";
import { TableElementContext } from "./SqlParserParser";
import { ColumnDefinitionContext } from "./SqlParserParser";
import { RegularColumnBodyContext } from "./SqlParserParser";
import { IdentifierContext } from "./SqlParserParser";
import { TableConstraintContext } from "./SqlParserParser";
import { UniqueTableConstraintContext } from "./SqlParserParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SqlParserParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SqlParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `SqlParserParser.sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql?: (ctx: SqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.empty_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmpty_statement?: (ctx: Empty_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.resultSetDefinitions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResultSetDefinitions?: (ctx: ResultSetDefinitionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.resultSetDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResultSetDefinition?: (ctx: ResultSetDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.queryExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryExpression?: (ctx: QueryExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.queryExpressionUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryExpressionUnit?: (ctx: QueryExpressionUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.queryParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryParenthesis?: (ctx: QueryParenthesisContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.querySpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuerySpecification?: (ctx: QuerySpecificationContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.columnNameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameList?: (ctx: ColumnNameListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.orderByClauseUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderByClauseUnit?: (ctx: OrderByClauseUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionWithSortOrder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithSortOrder?: (ctx: ExpressionWithSortOrderContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.orderByOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderByOption?: (ctx: OrderByOptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.groupByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByClause?: (ctx: GroupByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.groupByItemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByItemList?: (ctx: GroupByItemListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.groupByItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByItem?: (ctx: GroupByItemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.simpleGroupByItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleGroupByItem?: (ctx: SimpleGroupByItemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.whereClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereClause?: (ctx: WhereClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.whereConditionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereConditionList?: (ctx: WhereConditionListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpression?: (ctx: BooleanExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpressionWithFlags`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpressionWithFlags?: (ctx: BooleanExpressionWithFlagsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpressionOr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpressionOr?: (ctx: BooleanExpressionOrContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpressionAnd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpressionAnd?: (ctx: BooleanExpressionAndContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpressionUnary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpressionUnary?: (ctx: BooleanExpressionUnaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpressionPrimary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpressionPrimary?: (ctx: BooleanExpressionPrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.likePredicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLikePredicate?: (ctx: LikePredicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.betweenPredicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBetweenPredicate?: (ctx: BetweenPredicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.inPredicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInPredicate?: (ctx: InPredicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.nullPredicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullPredicate?: (ctx: NullPredicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.comparisonPredicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonPredicate?: (ctx: ComparisonPredicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.comparisonOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonOperator?: (ctx: ComparisonOperatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionWithFlags`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithFlags?: (ctx: ExpressionWithFlagsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionBinaryPri2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionBinaryPri2?: (ctx: ExpressionBinaryPri2Context) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionBinaryPri1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionBinaryPri1?: (ctx: ExpressionBinaryPri1Context) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionUnary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionUnary?: (ctx: ExpressionUnaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionWithClrElements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithClrElements?: (ctx: ExpressionWithClrElementsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.nonQuotedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonQuotedIdentifier?: (ctx: NonQuotedIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionWithClrElementsFunctionCallPart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithClrElementsFunctionCallPart?: (ctx: ExpressionWithClrElementsFunctionCallPartContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.parenthesizedOptExpressionWithDefaultList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedOptExpressionWithDefaultList?: (ctx: ParenthesizedOptExpressionWithDefaultListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionWithDefaultList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithDefaultList?: (ctx: ExpressionWithDefaultListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionWithDefault`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithDefault?: (ctx: ExpressionWithDefaultContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionPrimary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionPrimary?: (ctx: ExpressionPrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.parenthesisDisambiguatorForExpressions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesisDisambiguatorForExpressions?: (ctx: ParenthesisDisambiguatorForExpressionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expressionParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionParenthesis?: (ctx: ExpressionParenthesisContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.nullIfExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullIfExpression?: (ctx: NullIfExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.caseExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaseExpression?: (ctx: CaseExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.searchedCaseExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchedCaseExpression?: (ctx: SearchedCaseExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.searchedWhenExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchedWhenExpression?: (ctx: SearchedWhenExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.simpleCaseExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleCaseExpression?: (ctx: SimpleCaseExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.simpleWhenClauseUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleWhenClauseUnit?: (ctx: SimpleWhenClauseUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.columnOrFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnOrFunctionCall?: (ctx: ColumnOrFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.userFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUserFunctionCall?: (ctx: UserFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.multiPartIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiPartIdentifier?: (ctx: MultiPartIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.builtInFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBuiltInFunctionCall?: (ctx: BuiltInFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.regularBuiltInFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegularBuiltInFunctionCall?: (ctx: RegularBuiltInFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.aggregateBuiltInFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggregateBuiltInFunctionCall?: (ctx: AggregateBuiltInFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.overClauseUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOverClauseUnit?: (ctx: OverClauseUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.overClauseNoOrderBy`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOverClauseNoOrderBy?: (ctx: OverClauseNoOrderByContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.overClauseBeginning`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOverClauseBeginning?: (ctx: OverClauseBeginningContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.partitionBy`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionBy?: (ctx: PartitionByContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.partitionByItemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionByItemList?: (ctx: PartitionByItemListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.partitionByItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionByItem?: (ctx: PartitionByItemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.uniqueRowFilter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueRowFilter?: (ctx: UniqueRowFilterContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.overWhenClauseUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOverWhenClauseUnit?: (ctx: OverWhenClauseUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.limitDurationClauseUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimitDurationClauseUnit?: (ctx: LimitDurationClauseUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.durationClauseUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDurationClauseUnit?: (ctx: DurationClauseUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.starColumnReferenceExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStarColumnReferenceExpression?: (ctx: StarColumnReferenceExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.castCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCastCall?: (ctx: CastCallContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.real`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReal?: (ctx: RealContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.moneyLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMoneyLiteral?: (ctx: MoneyLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.binary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary?: (ctx: BinaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.nullLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullLiteral?: (ctx: NullLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.booleanExpressionParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpressionParenthesis?: (ctx: BooleanExpressionParenthesisContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.selectColumn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectColumn?: (ctx: SelectColumnContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.stringOrIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringOrIdentifier?: (ctx: StringOrIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.stringLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.selectColumnExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectColumnExpression?: (ctx: SelectColumnExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.max`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMax?: (ctx: MaxContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.scalarDataType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalarDataType?: (ctx: ScalarDataTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.buildinTypes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBuildinTypes?: (ctx: BuildinTypesContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dataTypeSchemaObjectName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataTypeSchemaObjectName?: (ctx: DataTypeSchemaObjectNameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dataTypeParametersOpt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataTypeParametersOpt?: (ctx: DataTypeParametersOptContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.integer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger?: (ctx: IntegerContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.numeric`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumeric?: (ctx: NumericContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.matchRecognize`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchRecognize?: (ctx: MatchRecognizeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.matchRecognizBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchRecognizBody?: (ctx: MatchRecognizBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.measureClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeasureClause?: (ctx: MeasureClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.measureColumnItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeasureColumnItem?: (ctx: MeasureColumnItemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.columnAlias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnAlias?: (ctx: ColumnAliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.afterMatch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAfterMatch?: (ctx: AfterMatchContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.pattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPattern?: (ctx: PatternContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.patternGroup`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternGroup?: (ctx: PatternGroupContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.patternNameModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternNameModifier?: (ctx: PatternNameModifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.patternAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternAtom?: (ctx: PatternAtomContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.patternModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternModifier?: (ctx: PatternModifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.patternDefines`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternDefines?: (ctx: PatternDefinesContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.patternDefine`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPatternDefine?: (ctx: PatternDefineContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.intoClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntoClause?: (ctx: IntoClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.havingClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHavingClause?: (ctx: HavingClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.schemaObjectThreePartName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaObjectThreePartName?: (ctx: SchemaObjectThreePartNameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.selectExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectExpression?: (ctx: SelectExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.selectStarExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectStarExpression?: (ctx: SelectStarExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.optSemicolons`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptSemicolons?: (ctx: OptSemicolonsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.fromClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromClause?: (ctx: FromClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.fromList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromList?: (ctx: FromListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.fromItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromItem?: (ctx: FromItemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.selectTableReferenceElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectTableReferenceElement?: (ctx: SelectTableReferenceElementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.derivedTable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDerivedTable?: (ctx: DerivedTableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.queryDerivedTable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryDerivedTable?: (ctx: QueryDerivedTableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.simpleTableReferenceAlias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleTableReferenceAlias?: (ctx: SimpleTableReferenceAliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.schemaObjectOrFunctionTableReference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaObjectOrFunctionTableReference?: (ctx: SchemaObjectOrFunctionTableReferenceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.schemaObjectFunctionTableReference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaObjectFunctionTableReference?: (ctx: SchemaObjectFunctionTableReferenceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.schemaObjectTableReference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaObjectTableReference?: (ctx: SchemaObjectTableReferenceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.nrtHint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNrtHint?: (ctx: NrtHintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.joinElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinElement?: (ctx: JoinElementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.qualifiedJoin`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedJoin?: (ctx: QualifiedJoinContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.qualifiedJoinUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedJoinUnit?: (ctx: QualifiedJoinUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.qualifiedJoinOnUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedJoinOnUnit?: (ctx: QualifiedJoinOnUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.unqualifiedJoin`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnqualifiedJoin?: (ctx: UnqualifiedJoinContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.unqualifiedJoinUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnqualifiedJoinUnit?: (ctx: UnqualifiedJoinUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.timestampBy`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimestampBy?: (ctx: TimestampByContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.nonParameterTableHints`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonParameterTableHints?: (ctx: NonParameterTableHintsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.schemaObjectFourPartName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaObjectFourPartName?: (ctx: SchemaObjectFourPartNameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.identifierList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierList?: (ctx: IdentifierListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.identifierListElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierListElement?: (ctx: IdentifierListElementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.createTableStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTableStatement?: (ctx: CreateTableStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.tableDefinitionCreateTable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableDefinitionCreateTable?: (ctx: TableDefinitionCreateTableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.tableElementList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElementList?: (ctx: TableElementListContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.tableElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElement?: (ctx: TableElementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.columnDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnDefinition?: (ctx: ColumnDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.regularColumnBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegularColumnBody?: (ctx: RegularColumnBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.tableConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableConstraint?: (ctx: TableConstraintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.uniqueTableConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueTableConstraint?: (ctx: UniqueTableConstraintContext) => Result;
}

