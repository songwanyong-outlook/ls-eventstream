// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { IMetadataObject, IMetadataType } from "../../../../CommonSqlUtils/MetadataTypes";
import { IdentifierContext, SchemaObjectFourPartNameContext, SchemaObjectOrFunctionTableReferenceContext, SchemaObjectThreePartNameContext, StringOrIdentifierContext } from "../Parser/GeneratedParser/SqlParserParser";
import { SqlParserVisitor } from "../Parser/GeneratedParser/SqlParserVisitor";
import { LSContext } from "./LSContextProvider";
import { LSContextVisitorBase } from "./LSContextVisitorBase";
import { LastTokenVisitor } from "./LastTokenVisitor";

export class LSContextVisitor extends LSContextVisitorBase implements SqlParserVisitor<any> {
    private lastTokenIndex = 0;
    
    private groupByList: string[] = [];

    constructor(private context: LSContext) {
        super();
    }

    public doVisit() {
        this.visitSql(this.context.ast);
    }

    public setLastTokenIndex(lastStatementCtx) {
        const lastTokenVisitor = new LastTokenVisitor();
        const _lastTokenIndex = lastTokenVisitor.GetLastTokenIndex(lastStatementCtx);
        this.lastTokenIndex = _lastTokenIndex < 0 ? (lastStatementCtx.stop != null ? lastStatementCtx.stop.tokenIndex : 0) : _lastTokenIndex;
    }

    public visitSql(ctx) {
        // ctx is SqlContext
        let statementContexts = ctx.statement();
        statementContexts = statementContexts.filter(_ctx => this.isStatementContext(_ctx));
        if (!statementContexts || statementContexts.length === 0) {
            return;
        }

        const lastStatementCtx = statementContexts[statementContexts.length - 1];
        this.setLastTokenIndex(lastStatementCtx);

        this.visit(statementContexts);
    }

    // resultSetDefinition: identifier columnNameList? AS LeftParenthesis queryExpression RightParenthesis;
    public visitResultSetDefinition(ctx) {
        const idContext = ctx.identifier();
        const name: string = this.visitIdentifier(idContext);
        if (!name) {
            return;
        }

        const queryExpressionContext = ctx.queryExpression();
        if (!queryExpressionContext) {
            return;
        }

        const columns: IMetadataObject[] = this.visitQueryExpression(queryExpressionContext);

        if (!this.contextIsPartial(ctx)) {
            this.context.addTableSource(name, columns, IMetadataType.View, idContext);
        }
    }

    // queryExpression: queryExpressionUnit (UNION ALL? queryExpressionUnit)*;
    // return column list.
    public visitQueryExpression(ctx): IMetadataObject[] {
        // ctx is QueryExpressionContext
        let columnsDefined: IMetadataObject[] = [];

        const queryExpressionUnitContexts = ctx.queryExpressionUnit();
        if (!!queryExpressionUnitContexts && queryExpressionUnitContexts.length > 0) {
            if (!this.contextIsPartial(ctx)) {
                for (const _ctx of queryExpressionUnitContexts) {
                    const columns = this.visitQueryExpressionUnit(_ctx);
                    columnsDefined = columnsDefined.concat(columns);
                }
            } else {
                // the other query expression units in the same query expression are uselss.
                const lastUnit = queryExpressionUnitContexts[queryExpressionUnitContexts.length - 1];
                this.visitQueryExpressionUnit(lastUnit);
            }
        }
        return columnsDefined;
    }

    // queryExpressionUnit: querySpecification | queryParenthesis;
    // return column list.
    public visitQueryExpressionUnit(ctx): IMetadataObject[] {
        const querySpecificationContext = ctx.querySpecification();
        if (querySpecificationContext) {
            return this.visitQuerySpecification(querySpecificationContext);
        }

        const queryParenthesisContext = ctx.queryParenthesis();
        if (queryParenthesisContext) {
            return this.visitQueryParenthesis(queryParenthesisContext);
        }

        return [];
    }
    
    public visitQueryParenthesis(ctx): IMetadataObject[] {
        const queryExpressionContext = ctx.queryExpression();
        return queryExpressionContext ? this.visitQueryExpression(queryExpressionContext) : [];
    }

    // querySpecification: SELECT uniqueRowFilter? selectExpression (Comma selectExpression)* intoClause? fromClause whereClause? groupByClause? havingClause? matchRecognize?;
    public visitQuerySpecification(ctx): IMetadataObject[] {
        // ctx is QuerySpecificationContext
        let fromClauseContext;
        try {
            fromClauseContext = ctx.fromClause();
        } catch {
        }

        let columns: IMetadataObject[] = [];

        const selectExpressions = ctx.selectExpression();
        if (!!selectExpressions && selectExpressions.length > 0) {
            columns = this.visit(selectExpressions);
        } else {
            // if there is NO selectExpression yet, suggest all possible table and column names and stop here.
            this.context.contextSwitch.InAllTableNamesContext = true;
            this.context.contextSwitch.InAllColumnNamesContext = true;
            this.context.functionSwitch.regularFunctionsAvailable = true;
            return columns;
        }

        if (!this.contextIsPartial(ctx)) {
            const intoClauseContext = ctx.intoClause();
            if (intoClauseContext) {
                this.visit(intoClauseContext);
            }

            const tables: IMetadataObject[] = this.visitFromClause(fromClauseContext).filter(item => !!item && !!item.name);
            columns = !columns ? [] : columns.filter(item => !!item);
            columns = this.context.resolveValidColumns(columns, tables.map(item => item.name));
            this.context.setOutputSchema(columns);
            return columns;
        } else {
            const intoClauseContext = ctx.intoClause();
            if (intoClauseContext) {
                this.visit(intoClauseContext);
            }

            if (fromClauseContext) {
                const table: IMetadataObject[] = this.visitFromClause(fromClauseContext).filter(item => !!item && !!item.name);
                table.forEach(item => {
                    if (!!item && !!item.name) {
                        this.context.addCurrentTableSource(item.name, item.alias, item.children);
                    }
                });
            }

            const whereClauseContext = ctx.whereClause();
            if (whereClauseContext) {
                this.visit(whereClauseContext);
            }

            // check the GROUP BY item list first
            const groupByClauseContext = ctx.groupByClause();
            if (groupByClauseContext) {
                this.groupByList = this.visitGroupByClause(groupByClauseContext);
            }

            const havingClauseContext = ctx.havingClause();
            if (havingClauseContext) {
                // depending on having GROUP BY or not, HAVING clause can have different valid suggestions.
                this.visitHavingClause(havingClauseContext);
            }

            const matchRecognizeContext = ctx.matchRecognize();
            if (matchRecognizeContext) {
                this.visit(matchRecognizeContext);
            }

            // First add table source then can add column source
            this.context.setOutputSchema([]);
            for (const column of columns ?? []) {
                this.context.addColumnSource(column);
            }

            return [];
        }
    }

    // intoClause: INTO schemaObjectThreePartName;
    public visitIntoClause(ctx) {
        // ctx is IntoClauseContext
        if (this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InOutputNamesContext = true;
        } else {
            const outputNameContext = ctx.schemaObjectThreePartName();
            if (outputNameContext) {
                // check the output names
                const outputName = this.visitSchemaObjectThreePartName(outputNameContext);
                this.context.checkOutputExists(outputName, outputNameContext);
            }
        }
    }

    public visitSelectExpression(ctx): IMetadataObject {
        // ctx is SelectExpressionContext
        // return column name and its optional alias
        if (this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InAllTableNamesContext = true;
            this.context.contextSwitch.InAllColumnNamesContext = true;
            this.context.functionSwitch.regularFunctionsAvailable = true;
            return null;
        }
        
        const selectStarExpressionContext = ctx.selectStarExpression();
        if (selectStarExpressionContext) {
            return {
                name: this.getText(selectStarExpressionContext),
                alias: null,
                type: IMetadataType.ColumnType,
            } as IMetadataObject;
        } else {
            const column = this.visit(ctx.selectColumn());
            return column;
        }
    }

    // return the pair of ColumnExpression and its optional alias
    public visitSelectColumn(ctx): IMetadataObject {
        // ctx is SelectColumnContext
        const expression = this.getText(ctx.selectColumnExpression());
        const alias = this.visitstringOrIdentifier(ctx.stringOrIdentifier());
        return {
            name: expression,
            alias: alias,
            type: IMetadataType.ColumnType,
        } as IMetadataObject;
    }

    public visitWhereClause(ctx) {
        // ctx is WhereClauseContext
        if (this.contextIsPartial(ctx)) {
            // suggest tables
            this.context.contextSwitch.InCurrentTableSourcesContext = true;
            // suggest all columns got from current table
            this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = true;
            // suggest all regular built-in functions
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    public visitGroupByClause(ctx): string[] {
        return this.visitGroupByItemList(ctx.groupByItemList());
    }

    // Visit a parse tree produced by AsaParser#groupByItemList.
    public visitGroupByItemList(ctx): string[] {
        if (!ctx) {
            return [];
        }

        if (this.contextIsPartial(ctx)) {
            // suggest current table name
            this.context.contextSwitch.InCurrentTableSourcesContext = true;
            // suggest all columns got from current table
            this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = true;
            // suggest all regular built-in functions
            this.context.functionSwitch.regularFunctionsAvailable = true;
            // suggest all windowing built-in functions
            this.context.functionSwitch.windowsFunctionsAvailable = true;
            return [];
        }
        const groupByList: string[] = this.visit(ctx.groupByItem());
        return groupByList;
    }

    public visitGroupByItem(ctx): string {
        return this.getText(ctx);
    }

    public visitHavingClause(ctx) {
        // ctx is HavingClauseContext
        if (this.contextIsPartial(ctx)) {
            // HAVING after GROUP BY
            if (!!this.groupByList && this.groupByList.length > 0) {
                // suggest only selected columns
                this.context.contextSwitch.InCurrentColumnSourcesContext = true;
                // this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = false;

                // Group By list can show up in Having clause too besides the selected list
                for (const groupByItem of this.groupByList) {
                    this.context.addColumnSource({
                        name: groupByItem,
                        alias: null,
                        type: IMetadataType.ColumnType,
                    } as IMetadataObject);
                }
            } else { // HAVING without GROUP BY
                // suggest all columns got from current table
                this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = true;
            }

            // common for both cases
            // suggest current table name
            this.context.contextSwitch.InCurrentTableSourcesContext = true;
            // suggest all regular built-in functions
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    // Visit a parse tree produced by AsaParser#partitionByItem
    public visitPartitionByItem(ctx) {
        if (!!ctx && this.contextIsPartial(ctx)) {
            // suggest current table name
            this.context.contextSwitch.InCurrentTableSourcesContext = true;
            // suggest all columns got from current table
            this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = true;
            // suggest all regular built-in functions
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    public visitTimestampByItem(ctx) {
        if (!!ctx && this.contextIsPartial(ctx)) {
            // suggest current table name
            this.context.contextSwitch.InCurrentTableSourcesContext = true;
            // suggest all columns got from current table
            this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = true;
            // suggest all regular built-in functions
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    // return table list.
    public visitFromClause(ctx): IMetadataObject[] {
        // ctx is FromClauseContext
        const fromListContext = ctx.fromList();
        const tables = this.visitFromList(fromListContext);
    
        this.visit(ctx.nrtHint());
        return tables;
    }
    
    // return table list
    public visitFromList(ctx): IMetadataObject[] {
        // ctx is FromListContext
        let tables: IMetadataObject[] = [];
        const fromItemContexts = ctx.fromItem();
    
        for (const fromItemCtx of fromItemContexts) {
            const fromItemResult = this.visitFromItem(fromItemCtx);
            if (fromItemResult) {
                tables = tables.concat(fromItemResult.filter(item => !!item));
            }
        }
    
        return tables;
    }

    // fromItem: selectTableReferenceElement joinElement*;
    public visitFromItem(ctx): IMetadataObject[] {
        const tableReferenceElementContext = ctx.selectTableReferenceElement();
        if (!tableReferenceElementContext) {
            return [];
        }

        const primaryTable: IMetadataObject[] = this.visitSelectTableReferenceElement(tableReferenceElementContext);
        if (!primaryTable) {
            return [];
        }         

        // ctx is FromItemContext
        if (this.contextIsPartial(ctx) && this.contextIsPartial(tableReferenceElementContext)) {
            this.context.contextSwitch.InAllTableNamesContext = true;
            return primaryTable;
        }
        
        let additionalTables: IMetadataObject[] = [];
        for (const joinElementCtx of ctx.joinElement()) {
            const joinedTable = this.visitJoinElement(joinElementCtx);
            if (joinedTable) {
                additionalTables = additionalTables.concat(joinedTable.filter(item => !!item.name));
            }
        }

        return primaryTable.concat(additionalTables);            
    }

    // joinElement: qualifiedJoin | unqualifiedJoin;
    public visitJoinElement(ctx): IMetadataObject[] {
        const qualifiedJoinContext = ctx.qualifiedJoin();
        if (qualifiedJoinContext) {
            return this.visitQualifiedJoin(qualifiedJoinContext);
        }

        const unqualifiedJoinContext = ctx.unqualifiedJoin();
        if (unqualifiedJoinContext) {
            return this.visitUnqualifiedJoin(unqualifiedJoinContext);
        }

        return [];
    }

    // unqualifiedJoin: unqualifiedJoinUnit selectTableReferenceElement;
    public visitUnqualifiedJoin(ctx): IMetadataObject[] {
        if (this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InAllTableNamesContext = true;
        }

        const unqualifiedJoinUnitContext = ctx.unqualifiedJoinUnit();
        if (unqualifiedJoinUnitContext) {
            this.visitUnqualifiedJoinUnit(unqualifiedJoinUnitContext);
        }

        const selectTableReferenceElementContext = ctx.selectTableReferenceElement();
        return selectTableReferenceElementContext ? this.visitSelectTableReferenceElement(selectTableReferenceElementContext) : [];
    }

    // unqualifiedJoinUnit: CROSS (JOIN | APPLY | nonQuotedIdentifier)	| OUTER (APPLY | nonQuotedIdentifier);
    public visitUnqualifiedJoinUnit(ctx) {
        if (ctx.APPLY()) { // after ' CROSS (or OUTER) APPLY, suggest table-valued functions
            this.context.functionSwitch.tableValuedFunctionsAvailable = true;
        }
    }

    // qualifiedJoin: qualifiedJoinUnit (qualifiedJoinOnUnit)?;
    public visitQualifiedJoin(ctx): IMetadataObject[] {
        let joinedTables: IMetadataObject[] = [];

        const qualifiedJoinUnitContext = ctx.qualifiedJoinUnit();
        if (qualifiedJoinUnitContext) {
            const joinedTable = this.visitQualifiedJoinUnit(qualifiedJoinUnitContext);
            joinedTables = joinedTables.concat(joinedTable.filter(item => !!item.name));

            const qualifiedJoinOnUnitContext = ctx.qualifiedJoinOnUnit();
            if (qualifiedJoinOnUnitContext) {
                this.visitQualifiedJoinOnUnit(qualifiedJoinOnUnitContext);
            }
        }

        return joinedTables;
    }

    // qualifiedJoinUnit: (( INNER | LEFT OUTER? | RIGHT OUTER?)? JOIN) fromItem;
    public visitQualifiedJoinUnit(ctx): IMetadataObject[] {
        // ctx is QualifiedJoinUnitContext
        if (this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InAllTableNamesContext = true;
        }

        const fromItemContext = ctx.fromItem();
        return fromItemContext ? this.visitFromItem(fromItemContext) : [];
    }

    // qualifiedJoinOnUnit: ON booleanExpression;
    public visitQualifiedJoinOnUnit(ctx) {
        if (this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InColumnsOfCurrentTablesSourcesContext = true;
            this.context.contextSwitch.InCurrentTableSourcesContext = true;
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    public visitTableDefinitionCreateTable(ctx): IMetadataObject[] {
        // ctx is TableDefinitionCreateTableContext
        return this.visit(ctx.tableElementList());
    }

    public visitTableElementList(ctx): IMetadataObject[] {
        const columns: IMetadataObject[] = [];

        if (ctx.elements) {
            for (const element of ctx.elements) {
                const columnName = this.visitTableElement(element);
                if (columnName) {
                    columns.push(columnName);
                }
            }
        }

        return columns;
    }

    // tableElement : columnDefinition | tableConstraint;
    public visitTableElement(ctx): IMetadataObject {
        const columnDefinition = ctx.columnDefinition();
        if (columnDefinition) {
            return this.visitColumnDefinition(columnDefinition);
        }

        return null; // ignore tableConstraint;
    }

    // selectTableReferenceElement: derivedTable | schemaObjectOrFunctionTableReference;
    // ctx is SelectTableReferenceElementContext
    public visitSelectTableReferenceElement(ctx): IMetadataObject[] {
        const derivedTableContext = ctx.derivedTable();
        if (derivedTableContext) {
            return this.visitDerivedTable(derivedTableContext);
        } else {
            const schemaObjectOrFunctionTableReferenceContext = ctx.schemaObjectOrFunctionTableReference();
            if (schemaObjectOrFunctionTableReferenceContext) {
                return this.visitSchemaObjectOrFunctionTableReference(schemaObjectOrFunctionTableReferenceContext);
            }
        }
        return [];
    }

    // derivedTable: queryDerivedTable simpleTableReferenceAlias columnNameList?;    
    // ctx is DerivedTableContext
    public visitDerivedTable(ctx): IMetadataObject[] {
        const simpleTableReferenceAliasContext = ctx.simpleTableReferenceAlias();
        const aliasContext = simpleTableReferenceAliasContext?.identifier();

        let alias: string;
        let name: string;
        if (simpleTableReferenceAliasContext) {
            alias = this.visitSimpleTableReferenceAlias(simpleTableReferenceAliasContext);
            name = (!alias || !(alias.trim())) ? "~~IntellisenseFakedTable" : alias;
        }

        let columnDefines: IMetadataObject[];

        const comlumnNameListContext = ctx.columnNameList();
        let columnNames: string[] = [];
        if (comlumnNameListContext) {
            columnNames = this.visit(ctx.columnNameList());
        }

        // if there are columnNameList
        if (columnNames.length > 0) {
            columnDefines = columnNames.map(name => ({
                name: name,
                alias: null,
                children: [],
                type: IMetadataType.ColumnType,
            } as IMetadataObject));
        } else {
            // get the columns from derived table            
            columnDefines = this.visitQueryDerivedTable(ctx.queryDerivedTable());
        }

        this.context.addTableSource(name, columnDefines, IMetadataType.View, aliasContext);

        const table: IMetadataObject = {
            name: name,
            alias: alias,
            prefix: null,
            type: IMetadataType.View,
            children: columnDefines,
        };
        return [table];
    }

    public visitSimpleTableReferenceAlias(ctx): string {
        // when reached here (after 'AS'), it's better not suggest table-valued functions
        this.context.functionSwitch.tableValuedFunctionsAvailable = false;

        // ctx is SimpleTableReferenceAliasContext
        return this.visitIdentifier(ctx.identifier());
    }

    // schemaObjectOrFunctionTableReference: schemaObjectFourPartName (schemaObjectTableReference | schemaObjectFunctionTableReference)
    public visitSchemaObjectOrFunctionTableReference(ctx: SchemaObjectOrFunctionTableReferenceContext): IMetadataObject[] {
        const schemaObjectFourPartNameContext = ctx.schemaObjectFourPartName();
        if (schemaObjectFourPartNameContext) {
            // return table name
            const name = this.visitSchemaObjectFourPartName(schemaObjectFourPartNameContext);

            // check if the table exists in metadata and complain if it does not
            this.context.checkTableExists(name, schemaObjectFourPartNameContext);

            const tableAlias1 = this.visit(ctx.schemaObjectTableReference());
            const tableAlias2 = this.visit(ctx.schemaObjectFunctionTableReference());
            let alias = tableAlias1 ? tableAlias1 : tableAlias2;
            if (!alias) {
                alias = name;
            }

            const table: IMetadataObject = {
                name: name,
                alias: alias,
                prefix: null,
                type: IMetadataType.Table,
                children: null,
            };

            return [table];
        }

        return [];
    }

    // schemaObjectTableReference: (nonParameterTableHints | simpleTableReferenceAlias (nonParameterTableHints)?)? nrtHint*;
    public visitSchemaObjectTableReference(ctx): string {
        let result: string;

        // ctx is SchemaObjectTableReferenceContext
        const simpleTableReferenceAliasContext = ctx.simpleTableReferenceAlias();
        if (simpleTableReferenceAliasContext) {
            result = this.visitSimpleTableReferenceAlias(simpleTableReferenceAliasContext);
        } else {
            const nonParameterTableHintsContext = ctx.nonParameterTableHints();
            result = nonParameterTableHintsContext ? this.getText(nonParameterTableHintsContext, true) : null;
        }

        const nrtHintContext = ctx.nrtHint();
        if (nrtHintContext) {
            this.visit(nrtHintContext);
        }

        return result;
    }

    // schemaObjectFunctionTableReference: parenthesizedOptExpressionWithDefaultList simpleTableReferenceAlias? columnNameList?;
    public visitSchemaObjectFunctionTableReference(ctx): string {
        // ctx is SchemaObjectFunctionTableReferenceContext
        const simpleTableReferenceAliasContext = ctx.simpleTableReferenceAlias();
        return simpleTableReferenceAliasContext ? this.visitSimpleTableReferenceAlias(simpleTableReferenceAliasContext) : null;
    }

    public visitQueryDerivedTable(ctx): IMetadataObject[] {
        // ctx is QueryDerivedTableContext
        return this.visit(ctx.queryExpression());
    }

    public visitColumnNameList(ctx): IMetadataObject[] {
        // ctx is ColumnNameListContext
        const identifierContexts = ctx.identifier();

        if (!!identifierContexts && identifierContexts.length > 0) {
            return identifierContexts.map(_ctx => ({
                name: this.visitIdentifier(_ctx),
                alias: null,
                type: IMetadataType.ColumnType,
            } as IMetadataObject));
        }
        return [];
    }

    // nrtHint: partitionBy (INTO integer)? | timestampBy (OVER expressionList)?;        
    public visitNrtHint(ctx) {
        const partitionByContext = ctx.partitionBy();
        if (partitionByContext) {
            this.visitPartitionByItem(partitionByContext);
        }

        const timestampByContext = ctx.timestampBy();
        if (timestampByContext) {
            this.visitTimestampByItem(timestampByContext);
        }
    }

    public visitColumnDefinition(ctx): IMetadataObject {
        // ctx is ColumnDefinitionContext
        return {
            name: this.visitIdentifier(ctx.identifier()),
            alias: null,
            type: IMetadataType.ColumnType,
        } as IMetadataObject;
    }

    // schemaObjectFourPartName: schemaObjectThreePartName (Dot identifier)?;
    public visitSchemaObjectFourPartName(ctx: SchemaObjectFourPartNameContext): string {
        if (!ctx) {
            return null;
        }

        const schemaObjectThreePartNameContext: SchemaObjectThreePartNameContext = ctx.schemaObjectThreePartName();
        const schemaObjectThreePartName = this.visitSchemaObjectThreePartName(schemaObjectThreePartNameContext);

        const identifierContext = ctx.identifier();
        if (identifierContext) {
            return schemaObjectThreePartName + "." + this.visitIdentifier(identifierContext);
        } else {
            return schemaObjectThreePartName;
        }
    }

    // schemaObjectThreePartName: identifier (Dot identifier)? (Dot identifier)?;
    public visitSchemaObjectThreePartName(ctx: SchemaObjectThreePartNameContext): string {
        const identifierContexts = ctx.identifier();
        return identifierContexts.map(_ctx => this.visitIdentifier(_ctx)).join(".");
    }

    // stringOrIdentifier: stringLiteral | identifier;    
    public visitstringOrIdentifier(ctx: StringOrIdentifierContext): string {
        if (!ctx) {
            return null;
        }

        const stringLiteralContext = ctx.stringLiteral();
        if (stringLiteralContext) {
            return this.getText(stringLiteralContext);
        } else {
            return this.visitIdentifier(ctx.identifier());
        }
    }

    // identifier: nonQuotedIdentifier | QuotedIdentifier;
    public visitIdentifier(ctx: IdentifierContext): string {
        if (!ctx) {
            return null;
        }

        const id: string = this.getText(ctx);
        return LSContext.reolveIdString(id);
    }

    /*
    matchRecognize : MATCHRECOGNIZE matchRecognizBody;
    matchRecognizBody: LeftParenthesis limitDurationClauseUnit partitionBy measureClause afterMatch pattern patternDefines RightParenthesis AS stringOrIdentifier;
    patternDefines: DEFINE patternDefine (Comma patternDefine)*
    patternDefine: identifier AS (booleanExpressionWithFlags | expression)
    measureClause: MEASURES (measureColumnItem AS columnAlias) (Comma measureColumnItem AS columnAlias)*;
    */

    // calling from visitMatchRecognize -> visistMatchRecogizeBody -> visitPatternDefines -> here
    public visitPatternDefine(ctx) {
        if (!!ctx && !!ctx.AS() && this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InAllTableNamesContext = true;
            this.context.contextSwitch.InAllColumnNamesContext = true;
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    // calling from visitMatchRecognize -> visistMatchRecogizeBody -> visitMeasureClause -> here
    public visitMeasureColumnItem(ctx) {
        if (!!ctx && this.contextIsPartial(ctx)) {
            this.context.contextSwitch.InAllTableNamesContext = true;
            this.context.contextSwitch.InAllColumnNamesContext = true;
            this.context.functionSwitch.regularFunctionsAvailable = true;
        }
    }

    private contextIsPartial(ctx): boolean {
        return !!ctx && !!(ctx.stop) && ctx.stop.tokenIndex >= this.lastTokenIndex;
    }

    private isStatementContext(ctx): boolean {
        let contextText = this.getText(ctx, true);
        if (!contextText) {
            return false;
        }

        contextText = contextText.replace(/^\(*/, "");
        return (contextText.startsWith("CREATE") || contextText.startsWith("WITH") || contextText.startsWith("SELECT")) && ctx.start.tokenIndex <= ctx.stop.tokenIndex;
    }
}
