import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DOT, STAR } from "../../../../CommonSqlUtils/Constants";
import { IMetadataType } from "../../../../CommonSqlUtils/MetadataTypes";
import { IColumnCollectionDefinitionRule, IRangeItem, ISourceColumnRule, ISourceTableRule } from '../../../../CommonSqlUtils/Utils';
import { SqlParserVisitor } from "../Parser/GeneratedParser/SqlParserVisitor";
import { IColumnSourceInfo, IMetadataCreated, LSContext } from "./LSContextProvider";

interface IContextVisitorStatus {
    /*
        When the rule is table/column source rule and table/column source name/alias is not directly under the context as chilren.
        Then language service begins the process of seeking table/column source. 
        It will visit all chilren of the context traversly under table/column source name/alias found.
    */
    inTableSourceSeeking: boolean;
    inColumnSourceSeeking: boolean;
    /*
        Record the table/column source information we are seeking. 
        When table/column source found.
        Clear the information.
    */
    tableSourceConfigInSeeking: ISourceTableRule;
    columnSourceConfigInSeeking: ISourceColumnRule;
    /*
        Indicate current context is under column definition/generation rule. 
        By search all the chilren we will generate a column collection, most of the cases, 
        generated columns collection will be added into created metadata as children. 
        If current context is not under metadata creation context, column collections will not be added under some metadata objects.
    */
    inColumnCollectionGeneratingRule: boolean;
    
    /*
        Record the column collection generating information we are seeking. 
        When all generated columns are found.
        Clear the information.
    */
    columnCollectionGeneratingConfigInSeeking: IColumnCollectionDefinitionRule;

    /*
        Record all the column children we found.
        Will clear this after column collection seeking.
    */
    columnChildrenFound: any[];

    inCodeActionContext: boolean;
    inStarTableSourceSeeking: boolean;
}

export class LSContextVisitor implements SqlParserVisitor<any> {
    private status: IContextVisitorStatus;

    private columnSourcesInLastQuery: Map<string, IColumnSourceInfo>;

    // use this as a buffer layer for metadata creation since when the clause of metadata creation is partial, we do not want to store this metadata.
    // eg. WITH tempTable2 (c4, c5, c6) AS ( SELECT 
    // in this context we do not want the suggestions of "tempTable2", "c4", "c5", "c5"
    private bufferedMetadata: IMetadataCreated;

    constructor(private _lsContext: LSContext) {
        this.resetStatus();
        this.columnSourcesInLastQuery = new Map();
        this.bufferedMetadata = null;
    }

    public DoVisit() {
        this.visit(this._lsContext.ast);
    }

    public visitTerminal(ctx: TerminalNode): void {
        // do nothing
    }

    public visitErrorNode(ctx: ErrorNode): void {
        // do nothing
    }

    public visit(ctx): any {
        if (ctx == null) {
            return null;
        }

        try {
            if (Array.isArray(ctx)) {
                const results = [];
                ctx.forEach(item => {
                    const result = this.visit(item);
                    if (result) {
                        results.push(result);
                    }
                });
                return results.length === 0 ? null : results.length === 1 ? results[0] : results;
            }

            const needToVisitCtx = this.processForMetadataIntellisense(ctx);
            return needToVisitCtx ? ctx.accept(this) : null;
        } catch {
            return null;
        } finally {
            if (this.isQueryExpression(ctx)) {
                this.columnSourcesInLastQuery = this._lsContext.GetGeneratedColumnDict();
                this.status.inCodeActionContext = false;
                this.status.inStarTableSourceSeeking = false;
            }
        }
    }

    public visitChildren (ctx): any {
        return ctx == null ? null : this.visit(ctx.children);
    }

    private processForMetadataIntellisense(ctx): boolean {
        let needToVisitCtxAfterProcessing = true;

        if (this.isSqlClauseContext(ctx)) {
            this.addMetadataFromBufferLayer(ctx.start.tokenIndex);
            this.startToVisitSqlClause();
        } else if (this.isQueryExpression(ctx)) {
            this.addMetadataFromBufferLayer(ctx.start.tokenIndex);
            // another query expression, clear table source and column sources in previous query expression.
            this._lsContext.clearTableSource();
            this._lsContext.clearColumnSource();
            this._lsContext.setSelectStarStmtContext(this.getContextRange(ctx), ctx.stop.tokenIndex);
        }   

        if (this.isTableSourceContext(ctx)) {
            const config = this.getTableSourceConfig(ctx);
            const tableSource = this.readTableSourceOrColumnSource(ctx, config.tableNameProperties, config.tableAliasProperties);
            if (!tableSource) {
                this.status.inTableSourceSeeking = true;
                this.status.tableSourceConfigInSeeking = config;
            } else {
                this.addTableSources(tableSource[0], tableSource[1]);
                if (this.status.inStarTableSourceSeeking) {
                    this._lsContext.processForSelectStarStmt();
                    this.status.inStarTableSourceSeeking = false;
                }
            }
        }

        if (this.status.inTableSourceSeeking) {
            const tableSource = this.readTableSourceOrColumnSource(ctx, this.status.tableSourceConfigInSeeking.tableNameProperties, this.status.tableSourceConfigInSeeking.tableAliasProperties);
            if (tableSource) {
                this.addTableSources(tableSource[0], tableSource[1]);
                this.status.inTableSourceSeeking = false;
                this.status.tableSourceConfigInSeeking = null;
            }
        }

        if (this.isColumnSourceContext(ctx)) {
            const config = this.getColumnSourceConfig(ctx);
            const columnSource = this.readTableSourceOrColumnSource(ctx, config.columnNameProperties, config.columnAliasProperties);
            if (!columnSource) {
                this.status.inColumnSourceSeeking = true;
                this.status.columnSourceConfigInSeeking = config;
            } else {
                this.addColumnSources(columnSource[0], columnSource[1], columnSource[2]);
            }
        }
        
        if (this.status.inColumnSourceSeeking) {
            const columnSource = this.readTableSourceOrColumnSource(ctx, this.status.columnSourceConfigInSeeking.columnNameProperties, this.status.columnSourceConfigInSeeking.columnAliasProperties);
            if (columnSource) {
                this.addColumnSources(columnSource[0], columnSource[1], columnSource[2]);
                this.status.inColumnSourceSeeking = false;
                this.status.columnSourceConfigInSeeking = null;
            }
        }
        
        if (this.isColumnCollectionDefinitionContext(ctx)) {
            this.processForColumnCollectionCreation(ctx);
            // already visited children in processForColumnCollectionCreation, no need to visit again.
            needToVisitCtxAfterProcessing = false;
        }

        if (this.status.inColumnCollectionGeneratingRule) {
            if (this.status.columnCollectionGeneratingConfigInSeeking.columnNameProperty) {
                const columnNameCtx = this.getContextByPropertyName(ctx, this.status.columnCollectionGeneratingConfigInSeeking.columnNameProperty); 
                if (columnNameCtx?.text?.trim()) {
                    this.status.columnChildrenFound.push(columnNameCtx);
                }
            }
        }

        if (this.isMetadataCreationContext(ctx)) {
            this.processForMetadataCreation(ctx);
        }

        // handle star expansion
        if (this.isAllColumnsContext(ctx) && this.isSingleStarContext(ctx)) {
            this.status.inStarTableSourceSeeking = true;
            this._lsContext.setSelectStarStmtStarRange(this.getContextRange(ctx));
        }
        return needToVisitCtxAfterProcessing;
    }

    private processForMetadataCreation(ctx) {
        const config = this.getMetadataCreationConfig(ctx);
        if (!config.metadataNameProperty) {
            return;
        }

        this.addMetadataFromBufferLayer(ctx.start.tokenIndex);

        const nameCtx = this.getContextByPropertyName(ctx, config.metadataNameProperty);
        const metadataName = nameCtx?.text?.trim();
        if (!metadataName) {
            return;
        }
        const range = this.getContextRange(nameCtx);

        const columnChildrenCtxs = !config.childrenPropertyNames ? [] : config.childrenPropertyNames.map(pName => this.getContextByPropertyName(ctx, pName));
        this.status.columnChildrenFound = [];
        for (const childCtx of columnChildrenCtxs) {
            this.visit(childCtx);
        }

        const columns = [];
        if (this.status.columnChildrenFound.length > 0) {
            this.status.columnChildrenFound.forEach(columnCtx => {
                const name = columnCtx?.text?.trim();
                if (name) {
                    columns.push({
                        name: metadataName + DOT + name,
                        type: IMetadataType.ColumnType,
                        createStmtEndTokenIndex: columnCtx.stop.tokenIndex,
                        range: this.getContextRange(columnCtx),
                    } as IMetadataCreated);
                }
            });
        } else {
            for (const [name, column] of this.columnSourcesInLastQuery.entries()) {
                columns.push({
                    name: metadataName + DOT + name,
                    type: column.type,
                    createStmtEndTokenIndex: 0,
                    range: column.range,
                } as IMetadataCreated);
            }
        }

        this.pushMetadataIntoBufferLayer(metadataName, config.metadataType ?? IMetadataType.Other, columns, ctx.stop.tokenIndex, range);
        this.status.columnChildrenFound = [];
    }

    private getContextRange(ctx: any): IRangeItem {
        return {
            startLineNumber: ctx.start.line,
            startColumn: ctx.start.charPositionInLine + 1,
            endLineNumber: ctx.stop.line,
            endColumn: ctx.stop.charPositionInLine + ctx.stop.stop - ctx.stop.start + 2,
        } as IRangeItem;
    }

    private addMetadataFromBufferLayer(currentCtxStartTokenIndex: number) {
        if (!this.bufferedMetadata || currentCtxStartTokenIndex <= this.bufferedMetadata.createStmtEndTokenIndex) {
            return;
        }
        this._lsContext.AddMetadataObject(this.bufferedMetadata, true);
        this.bufferedMetadata = null;
    }

    private pushMetadataIntoBufferLayer(name: string, type: IMetadataType, children: IMetadataCreated[], createStmtEndTokenIndex: number, range: IRangeItem) {
        this.bufferedMetadata = {
            name,
            type,
            children,
            createStmtEndTokenIndex,
            range,
        } as IMetadataCreated;
    }

    private processForColumnCollectionCreation(ctx) {
        this.status.inColumnCollectionGeneratingRule = true;
        this.status.columnCollectionGeneratingConfigInSeeking = this.getColumnCollectionDefinitionConfig(ctx);
        /*
            Used to check for column name in context properties here, but acturally only child nodes could have
            column name properties, so removed redundant code here.
        */
        this.visitChildren(ctx);
        this.status.inColumnCollectionGeneratingRule = false;
    }

    private startToVisitSqlClause() {
        this._lsContext.clearTableSource();
        this._lsContext.clearColumnSource();
        this.columnSourcesInLastQuery = new Map();
        this.resetStatus();
    }

    private resetStatus() {
        this.status = {
            inTableSourceSeeking: false,
            inColumnSourceSeeking: false,
            inColumnCollectionGeneratingRule: false,
            columnSourceConfigInSeeking: null,
            tableSourceConfigInSeeking: null,
            columnChildrenFound: [],
            inCodeActionContext: false,
            inStarTableSourceSeeking: false,
        } as IContextVisitorStatus;
    }

    private isSqlClauseContext(ctx) {
        return this.getRuleName(ctx) === this._lsContext.languageGrammarRuleConfig.incrementalParsing.sqlClauseRule;
    }

    private isTableSourceContext(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.tableSourceRules?.some(item => item.ruleName === this.getRuleName(ctx));
    }

    private getTableSourceConfig(ctx): ISourceTableRule {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.tableSourceRules?.find(item => item.ruleName === this.getRuleName(ctx));
    }

    private isColumnSourceContext(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.columnSourceRules?.some(item => item.ruleName === this.getRuleName(ctx));
    }

    private getColumnSourceConfig(ctx): ISourceColumnRule {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.columnSourceRules?.find(item => item.ruleName === this.getRuleName(ctx));
    }

    private isMetadataCreationContext(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.metadataCreationRules?.some(item => item.ruleName === this.getRuleName(ctx));
    }

    private getMetadataCreationConfig(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.metadataCreationRules?.find(item => item.ruleName === this.getRuleName(ctx));
    }

    private isColumnCollectionDefinitionContext(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.columnCollectionDefinitionRules?.some(item => item.ruleName === this.getRuleName(ctx));
    }

    private getColumnCollectionDefinitionConfig(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.columnCollectionDefinitionRules?.find(item => item.ruleName === this.getRuleName(ctx));
    }

    private isQueryExpression(ctx) {
        return !!ctx.text && this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.queryExpressionRule === this.getRuleName(ctx);
    }

    private isAllColumnsContext(ctx) {
        return this._lsContext.languageGrammarRuleConfig?.metadataIntellisense?.columnNameRules?.allColumns?.includes(this.getRuleName(ctx));
    }

    private isSingleStarContext(ctx: any) {
        return ctx.start === ctx.stop && ctx.text === STAR;
    }
    
    private isContextContainRange(ctx: any, range: IRangeItem) {
        const ctxRange = this.getContextRange(ctx);
        return (ctxRange.startLineNumber < range.startLineNumber || ctxRange.startLineNumber === range.startLineNumber && ctxRange.startColumn <= range.startColumn) &&
         (ctxRange.endLineNumber > range.endLineNumber || ctxRange.endLineNumber === range.endLineNumber && ctxRange.endColumn >= range.endColumn);
    }

    private addTableSources(tableName: string, tableAlias: string) {
        if(!tableName) {
            tableName = tableAlias;
        } else if(!tableAlias) {
            tableAlias = tableName;
        }
        this._lsContext.AddTableSource(tableName, tableAlias);
    }

    private addColumnSources(columnName: string, columnAlias: string, range: IRangeItem) {
        if(!columnName) {
            columnName = columnAlias;
        } else if(!columnAlias) {
            columnAlias = columnName;
        }
        this._lsContext.AddColumnSource(columnName, columnAlias, range);
    }

    private readTableSourceOrColumnSource(ctx, nameProperties: string[], aliasProperties: string[]): [string, string, IRangeItem] {
        let name: string = null;
        let alias: string = null;
        let range: IRangeItem = null;

        for(const nameProperty of nameProperties) {
            const nameCtx = this.getContextByPropertyName(ctx, nameProperty);
            if(nameCtx) {
                name = (nameCtx.text as string).trim();
            }

            if(name) {
                range = this.getContextRange(nameCtx);
                break;
            }
        }

        for (const aliasProperty of aliasProperties) {
            const aliasCtx = ctx['_'.concat(aliasProperty)];
            if(aliasCtx) {
                alias = (aliasCtx.text as string).trim();
                alias = alias.startsWith('AS') ? alias.substring(2).trim() : alias;
            }

            if(alias) {
                if (aliasCtx.children.length > 0) {
                    range = this.getContextRange(aliasCtx.children[aliasCtx.children.length - 1]);
                } else {
                    range = this.getContextRange(aliasCtx);
                }
                break;
            }
        }
        return !name && !alias ? null : [name, alias, range];
    }

    private getContextByPropertyName(ctx, propertyName: string) {
        return ctx['_'.concat(propertyName)];
    }

    private getRuleName(ctx) {
        try {
            return this._lsContext.ruleNames[ctx.ruleIndex];
        } catch {   
            return "";
        }
    }
}
