// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CommonSqlCompletionItem, CommonSqlCompletionItemType, intellisenseFakedPrefix } from "../../../../CommonSqlUtils/CommonSqlCompletionItem";
import { DOT, STAR } from "../../../../CommonSqlUtils/Constants";
import { IColumn, IMetadataObject, IMetadataType, isColumnType, ISqlMetadata } from "../../../../CommonSqlUtils/MetadataTypes";
import { ISignatureInformation } from "../../../../CommonSqlUtils/SignatureTypes";
import { CodeActionKind, IColumnNameRules, ILanguageGrammarRuleName, IMetadataNameRule, IRangeItem, LanguageServiceFeature, isRangeEqual } from '../../../../CommonSqlUtils/Utils';
import { generateDocumentationMarkdown } from "../CompletionItem/SqlCompletionItemGenerator";
import { LSContextSwitch } from "./LSContextSwitch";
import { LSMetadataProvider, systemSchemaNames } from "./LSMetadataProvider";
import { UseIncrementalParsing } from "../../../../CommonSqlUtils/LanguageFeatureFlag";
import { LSContextVisitor } from "./LSContextVisitor";
import { IParsedScript } from '../Parser/CSIncrementalParsingCache';

export interface IMetadataCreated {
    name: string;   // full name of the created metadata object. e.g. "s1.t1.c1"
    type: IMetadataType;
    children: IMetadataCreated[];
    createStmtEndTokenIndex: number;
    range: IRangeItem;
}

export interface IColumnSourceInfo {
    name: string;
    alias: string;
    type: string;
    range: IRangeItem;
}

interface ICodeActionInfo {
    kind: string;
    contextRange: IRangeItem;
    editRange: IRangeItem;
    replaceText: string;
    endTokenIndex: number;
}

// For not always showing system schema children. If this is true, we only provide intellisense for 'system children' when there exist expression prefix such as SELECT sys.all_views.
const deprecateMetadataUnderSystemSchemaInTopLevel = true;

export class LSContext {
    protected metadataProvider: LSMetadataProvider;
    public expressionPrefix: string;

    // expressionPrefix related
    /*
        let expressionPrefixRegex: string = '(id\\.)+$';
        let sqlIdRegex: string = '(simpleName|(\\[|\\")\\s*(simpleName\\s*)*(\\]|\\"))';
        let simpleNameRegex: string = '[a-zA-Z_#][a-zA-Z0-9_#@$]*';
        let replaceAll: (str: string, oldSubStr: string, newSubStr: string) => string = (str: string, oldSubStr: string, newSubStr: string) => str.split(oldSubStr).join(newSubStr);
        let finalExpressionPrefixRegex: string = replaceAll(this.expressionPrefixRegex, "id", replaceAll(this.sqlIdRegex, "simpleName", this.simpleNameRegex));
    */
    // private readonly finalExpressionPrefixRegex = '(([a-zA-Z_#][a-zA-Z0-9_#@$]*|(\\[|\\")\\s*([a-zA-Z_#][a-zA-Z0-9_#@$]*\\s*)*(\\]|\\"))\\.)+$';

    /*
        partial context information.
    */

    // key is table name or table alias and value is table object
    // when there is table alias for the table then the key should be alias, otherwise the key is table name.
    // when the key is table name, then it should be fullName.
    protected currentTableSourceObjectDict: Map<string, IMetadataObject> = new Map<string, IMetadataObject>();

    // key is table alias, value is table full name.
    // When the table has no alias,  then the key and the value are both table name.
    // when the key is table name, then it should be fullName.
    private currentTableSourceNameDict: Map<string, string> = new Map<string, string>();

    // the table that right after FROM token. Sometimes we have join clause in a single select statemnet, tables in join clause are not treated as primaryTableSource.
    private primaryTableSource: IMetadataObject = null;

    // key is column full name while value is column source info.
    // column alias could be null.
    private currentColumnSourceInfoDict: Map<string, IColumnSourceInfo> = new Map();

    // key is column expression while value is column source info.
    // column alias could be null.
    private currentColumnSourceExpressionDict: Map<string, IColumnSourceInfo> = new Map();

    // To indicate what context we are in .
    public contextSwitch: LSContextSwitch = null;

    // Only used when filter all columns in scenario: select {cursor position} from a,b,c.
    // In above scenario, the table namespaces are a,b,c, so in cursor position we will provide columns from a,b,c table. 
    protected tableNamespaces: string[] = [];

    // used to store all found code actions
    private codeActions: ICodeActionInfo[] = [];

    // for star expansion & hover
    private selectStarStmtStatus: {
        contextRange:  IRangeItem;
        contextEndTokenIndex:  number;
        starRange:  IRangeItem;
        targetStarRange:  IRangeItem;
        tableSource:  IMetadataObject;
    } = null;

    public createdMetadataObjects: IMetadataCreated[] = [];

    constructor(
        public script: string, 
        metadata: ISqlMetadata, 
        builtinFunctions: Map<string, ISignatureInformation[]>, 
        caseSensitive: boolean,
        public ast: any,
        public ruleNames: string[],
        public languageGrammarRuleConfig: ILanguageGrammarRuleName, 
        private ruleStack: Set<string>,
        public cachedScript: IParsedScript,
        public codeActionRange?: IRangeItem,
        private databaseToBeLoaded?: string[],
    ) {
        this.metadataProvider = new LSMetadataProvider(metadata, builtinFunctions, caseSensitive);
        this.contextSwitch = new LSContextSwitch();
        this.selectStarStmtStatus = {
            contextRange: null,
            contextEndTokenIndex: null,
            starRange: null,
            targetStarRange: null,
            tableSource: null,
        };
    }

    public GetMetadataSuggestions(): CommonSqlCompletionItem[] {
        let metadataObjects: IMetadataObject[] = [];
        
        const contextVisitor = new LSContextVisitor(this);
        contextVisitor.DoVisit();

        // After visiting contextVisitor all created metadata objects should be added into context provider.
        // Update metadata cache for the following another language service call.
        LSContextProvider.UpdateMetadataCache(this.createdMetadataObjects, LanguageServiceFeature.WordCompletion);

        const expressionPrefix: string = this.getAndResolveExpressionPrefix();
        this.SetContextSwitch();
        if (!this.idIsNull(expressionPrefix)) {
            metadataObjects = this.FilterSuggestionsByContextSwitch(this.metadataProvider.GetObjectsByPrefix(null, expressionPrefix));
        } else {
            metadataObjects = this.GetContextBasedMetadataSuggestions();
        }

        return metadataObjects.filter(item => !!item && !!item.name).map(item => this.MapToSqlCompletionItem(item));
    }

    private GetContextBasedMetadataSuggestions(): any[] {
        let metadataObjects: any[] = [];

        if (this.contextSwitch.inAllColumnNamesContext) {
            metadataObjects = metadataObjects.concat(this.FilterColumnResults(this.metadataProvider.GetAllColumns()));
        }

        if (this.contextSwitch.inAllTableNamesContext) {
            const allAvailableTables = this.metadataProvider.GetAllAvailableTables();
            const qualifiedTables = this.FilterAllTablesByTableNamespace(allAvailableTables);
            metadataObjects = metadataObjects.concat(qualifiedTables);
        }

        if (this.contextSwitch.inColumnsOfCurrentTablesSourcesContext) {
            metadataObjects = metadataObjects.concat(this.SetRecommend(this.GetColumnsOfCurrentTableSources()));
        }

        if (this.contextSwitch.inCurrentColumnSourcesContext) {
            metadataObjects = metadataObjects.concat(this.SetRecommend(this.GetCurrentColumnSources()));
        }

        if (this.contextSwitch.inCurrentTableSourcesContext) {
            metadataObjects = metadataObjects.concat(this.SetRecommend(this.GetCurrentTableSources()));
        }

        if (this.contextSwitch.inAllViewNamesContext) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllAvailableViews());
        }

        if (this.contextSwitch.inAllSchemaNamesContext) {
            metadataObjects = metadataObjects.concat(
                this.metadataProvider.GetAllAvailableSchemas(),
                this.databaseToBeLoaded?.map(db => { return {
                    name: db,
                    type: IMetadataType.Database,
                    prefix: "",
                    children: []
                 } as IMetadataObject; } ) ?? []
            );
        }

        if (this.contextSwitch.inAllProcNamesContext) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllAvailableProcs());
        }

        if (this.contextSwitch.inAllTableFunctionNamesContext) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllAvailableTableFunctions());
        }

        if (this.contextSwitch.InBuiltInFunctionsContext()) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllBuiltInFunctions());
        }

        if (this.contextSwitch.inUserNamesContext) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllUsers());
        }

        if (this.contextSwitch.inTypeNamesContext) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllTypes());
        }

        if (this.contextSwitch.inIndexNamesContext) {
            metadataObjects = metadataObjects.concat(this.metadataProvider.GetAllIndexs());
        }

        return metadataObjects;
    }

    private FilterSuggestionsByContextSwitch(metadataObjects: IMetadataObject[]): IMetadataObject[] {
        const qualifiedTypes: IMetadataType[] = [];
        if (this.contextSwitch.InColumnNamesContext()) {
            qualifiedTypes.push(IMetadataType.ColumnType);
            qualifiedTypes.push(IMetadataType.Function);
            qualifiedTypes.push(IMetadataType.TableFunction);
        }
        
        if (this.contextSwitch.inAllTableNamesContext || this.contextSwitch.inCurrentTableSourcesContext) {
            qualifiedTypes.push(IMetadataType.Table);
            qualifiedTypes.push(IMetadataType.TableFunction);
        }

        if (this.contextSwitch.inAllViewNamesContext) {
            qualifiedTypes.push(IMetadataType.View);
        }

        if (this.contextSwitch.inAllSchemaNamesContext) {
            qualifiedTypes.push(IMetadataType.Schema);
        }

        if (this.contextSwitch.inAllProcNamesContext) {
            qualifiedTypes.push(IMetadataType.StoredProcedure);
        }

        if (this.contextSwitch.inTypeNamesContext) {
            qualifiedTypes.push(IMetadataType.Type);
        }

        if (this.contextSwitch.inUserNamesContext) {
            qualifiedTypes.push(IMetadataType.User);
        }

        if (this.contextSwitch.inIndexNamesContext) {
            qualifiedTypes.push(IMetadataType.Index);
        }

        if (this.contextSwitch.inDatabaseNamesContext) {
            qualifiedTypes.push(IMetadataType.Database);
        }
        
        return metadataObjects.filter(m => qualifiedTypes.includes(m.type) || (qualifiedTypes.includes(IMetadataType.ColumnType) && isColumnType(m.type)));
    }

    private SetContextSwitch() {
        if (!this.languageGrammarRuleConfig?.metadataIntellisense) {
            return;
        }

        const columnNameRules: IColumnNameRules = this.languageGrammarRuleConfig.metadataIntellisense.columnNameRules;
        const tableNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.Table);
        const viewNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.View);
        const spNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.StoredProcedure);
        const tableFunctionNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.TableFunction);
        const schemaNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.Schema);
        const userNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.User);
        const typeNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.Type);
        const indexNameRules = this.GetMetadataNameRules(this.languageGrammarRuleConfig.metadataIntellisense.metadataNameRules, IMetadataType.Index);

        let inSourceContext = false;
        for (const rule of this.ruleStack) {
            if (columnNameRules.allColumns.includes(rule)) {
                this.contextSwitch.inAllColumnNamesContext = true;
                this.contextSwitch.inAllTableNamesContext = true;
                this.contextSwitch.inAllViewNamesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
            }

            if (columnNameRules.sourceColumns.includes(rule)) {
                this.contextSwitch.inCurrentColumnSourcesContext = true;
                this.contextSwitch.inCurrentTableSourcesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
                inSourceContext = true;
            }
            
            if (columnNameRules.columnsFromSourceTable.includes(rule)) {
                this.contextSwitch.inColumnsOfCurrentTablesSourcesContext = true;
                this.contextSwitch.inCurrentTableSourcesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
                inSourceContext = true;
            }

            if (tableNameRules.includes(rule)) {
                this.contextSwitch.inAllTableNamesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
            }

            if (viewNameRules.includes(rule)) {
                this.contextSwitch.inAllViewNamesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
            }

            if (spNameRules.includes(rule)) {
                this.contextSwitch.inAllProcNamesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
            }

            if (tableFunctionNameRules.includes(rule)) {
                this.contextSwitch.inAllTableFunctionNamesContext = true;
                this.contextSwitch.inAllSchemaNamesContext = true;
            }

            if (schemaNameRules.includes(rule)) {
                this.contextSwitch.inAllSchemaNamesContext = true;
            }

            if (userNameRules.includes(rule)) {
                this.contextSwitch.inUserNamesContext = true;
            }

            if (typeNameRules.includes(rule)) {
                this.contextSwitch.inTypeNamesContext = true;
            }

            if (indexNameRules.includes(rule)) {
                this.contextSwitch.inIndexNamesContext = true;
            }
        }

        if (inSourceContext) {
            this.contextSwitch.inAllColumnNamesContext = false;
            this.contextSwitch.inAllTableNamesContext = false;
        }
        return;
    }

    private SetRecommend(metadataObjects: any[]): any[] {
        metadataObjects.forEach(item => (item as any).isRecommended = true);
        return metadataObjects;
    }

    private GetMetadataNameRules(nameRules: IMetadataNameRule[], type: IMetadataType): string[] {
        if (!nameRules) {
            return [];
        }

        const rulesSets = nameRules.filter(item => item.metadataType === type);
        let rules: string[] = [];
        for (const rulesSet of rulesSets) {
            rules = rules.concat(rulesSet.rules ?? []);
        }
        return rules;
    }

    public GetMetadataObjectForCurrentWord(): IMetadataObject {
        if (!this.script) {
            return null;
        }

        if (!this.script.endsWith(DOT)) {
            // append dot at the end of the script to get expression prefix.
            this.script = this.script.concat(DOT);
        }

        let name: string = this.getAndResolveExpressionPrefix();
        if (!name) {
            return null;
        }

        const contextVisitor = new LSContextVisitor(this);
        contextVisitor.DoVisit();
        LSContextProvider.UpdateMetadataCache(this.createdMetadataObjects, LanguageServiceFeature.QuickInfo);

        name = name.endsWith(DOT) ? name.slice(0, name.length - 1) : name;
        let metadataObject: IMetadataObject = this.metadataProvider.GetObjectByFullName(null, name);
        if (!metadataObject) {
            // if metadataObject is null, then we can say that name is not fullName.
            const sourceTablePairs = Array.from(this.currentTableSourceObjectDict.entries());

            // If the object is one of "sourceTableName", "sourceTableAlias", "columnsInSourceTable"
            for (const pair of sourceTablePairs) {
                if (this.stringEquals(pair[0], name) || this.stringEquals(pair[1].name, name)) {
                    // if the object is source table
                    metadataObject = pair[1];
                    break;
                }

                const matchColumns = pair[1].children.filter(item => this.stringEquals(item.name, name));
                if (matchColumns.length > 0) {
                    // if the object is a column from soure table.
                    metadataObject = matchColumns[0];
                    break;
                }
            }
        }

        if (!metadataObject) {
            // if the name of the object is a column alias for a column name
            for (const column of this.currentColumnSourceInfoDict.values()) {
                const columnAlias = column.alias;
                if (!!columnAlias && this.stringEquals(columnAlias, name)) {
                    metadataObject = this.metadataProvider.GetObjectByFullName(IMetadataType.ColumnType, column.name);
                    if (metadataObject) {
                        break;
                    }
                }
            }
        }

        if (!metadataObject) {
            // if the name of the object is a column alias for a column expression
            for (const column of this.currentColumnSourceExpressionDict.values()) {
                if (!!column.alias && this.stringEquals(column.alias, name)) {
                    metadataObject = {
                        name,
                        prefix: null,
                        type: IMetadataType.ColumnType,
                        children: [],
                        details: column.name,
                    } as IMetadataObject;
                    break;
                }
            }
        }

        if (!metadataObject) {
            // just find the object in all metadatas.
            metadataObject = this.metadataProvider.GetObjectByName(null, name);
        }

        return metadataObject;
    }

    public GetTableSourceObjectForSelectStarStmt(range: IRangeItem): IMetadataObject {
        if (!this.script || !range) {
            return null;
        }
        this.selectStarStmtStatus.targetStarRange = range;

        const contextVisitor = new LSContextVisitor(this);
        contextVisitor.DoVisit();
        LSContextProvider.UpdateMetadataCache(this.createdMetadataObjects, LanguageServiceFeature.QuickInfo);

        return this.selectStarStmtStatus.tableSource;
    }

    public GetValidCodeActions(): ICodeActionInfo[] {
        if (!this.script) {
            return null;
        }

        const contextVisitor = new LSContextVisitor(this);
        contextVisitor.DoVisit();
        LSContextProvider.UpdateMetadataCache(this.createdMetadataObjects, LanguageServiceFeature.CodeAction);
        LSContextProvider.UpdateCodeActionCache(this.codeActions);

        const validCodeActions = this.codeActions.filter(action => {
            const ctxRange = action.contextRange;
            return (ctxRange.startLineNumber < this.codeActionRange.startLineNumber || ctxRange.startLineNumber === this.codeActionRange.startLineNumber && ctxRange.startColumn <= this.codeActionRange.startColumn) &&
                    (ctxRange.endLineNumber > this.codeActionRange.endLineNumber || ctxRange.endLineNumber === this.codeActionRange.endLineNumber && ctxRange.endColumn >= this.codeActionRange.endColumn);
                
        });
        return validCodeActions;
    }

    // For partial statements.
    public AddTableSource(fullTableName: string, tableAlias: string): void {
        if (this.idIsNull(fullTableName)) {
            return;
        }

        if (this.idIsNull(tableAlias)) {
            tableAlias = fullTableName;
        }

        let inputTable = this.metadataProvider.GetObjectByFullName(IMetadataType.Table, fullTableName);
        if (!inputTable) {
            inputTable = this.metadataProvider.GetObjectByFullName(IMetadataType.View, fullTableName);
        }

        // check if this table has already been added into map.
        // Use this way rather than a simple Map.has() to enable the case-insensitive key searching
        const sourceTableNamePairs = Array.from(this.currentTableSourceNameDict.entries());
        const sourceTableName = sourceTableNamePairs.find(pair => this.stringEquals(pair[0], tableAlias));
        if (sourceTableName) {
            if (sourceTableName[1] === fullTableName) {
                // same item as the already recorded one since table name and table alias are both the same. 
                return;
            }

            if (!inputTable) {
                return;
            }
        }

        if (!inputTable) {
            const nameParts: string[] = fullTableName.split(DOT).filter(item => !!item);
            const name: string = nameParts.pop();
            const prefix: string = nameParts.join(DOT);
            inputTable = { name, prefix, type: IMetadataType.Table, children: [] } as IMetadataObject;
        }

        // map table alias to table fullName for expression prefix resolving
        this.currentTableSourceNameDict.set(tableAlias, fullTableName);
        // map table alias/table name to table object
        this.currentTableSourceObjectDict.set(tableAlias, inputTable);

        // set primiary table source if it has not been set.
        if (!this.primaryTableSource) {
            this.primaryTableSource = inputTable;
        }
        this.RefindColumnSourceMapAfterAddingTableSources();
    }

    // The table prefix(If exists) of column name is table name, not table alias
    // The parameter columnAlias could be null.
    public AddColumnSource(fullColumnNameOrColumnExpression: string, columnAlias: string, range: IRangeItem): void {
        fullColumnNameOrColumnExpression = this.formatColumnName(fullColumnNameOrColumnExpression);
        if (this.idIsNull(fullColumnNameOrColumnExpression)) {
            return;
        }

        const isColumnExpression = !this.isValidNameExpression(fullColumnNameOrColumnExpression);
        if (isColumnExpression) {
            this.currentColumnSourceExpressionDict.set(fullColumnNameOrColumnExpression, {
                name: fullColumnNameOrColumnExpression,
                alias: columnAlias,
                type: IMetadataType.ColumnType,
                range,
            } as IColumnSourceInfo);
            return;
        }

        if (!this.primaryTableSource) {
            // column source is added before table source adding.
            this.currentColumnSourceInfoDict.set(fullColumnNameOrColumnExpression, {
                name: fullColumnNameOrColumnExpression,
                alias: columnAlias,
                type: IMetadataType.ColumnType,
                range,
            } as IColumnSourceInfo);
        } else {
            this.AddColumnSourceByTableSource(fullColumnNameOrColumnExpression, columnAlias, IMetadataType.ColumnType, range);
        }
        return;
    }

    private RefindColumnSourceMapAfterAddingTableSources() {
        const originalColumnSources = Array.from(this.currentColumnSourceInfoDict.values());
        this.currentColumnSourceInfoDict.clear();
        for (const column of originalColumnSources) {
            const columnName = column.name;
            const columnAlias = column.alias;
            const columnType = column.type ?? IMetadataType.ColumnType;
            const columnRange = column.range;
            this.AddColumnSourceByTableSource(columnName, columnAlias, columnType, columnRange);
        }
    }

    public AddColumnSourceByTableSource(columnName: string, columnAlias: string, columnType: string, range: IRangeItem) {
        if (!this.primaryTableSource) {
            this.currentColumnSourceInfoDict.set(columnName, {
                name: columnName,
                alias: columnAlias,
                type: columnType,
                range, 
            } as IColumnSourceInfo);
            return;
        }

        // sometimes the columnName passed in is not fullColumnName, in this scenario we concat this name to be fullColumnName
        if (!columnName.includes(DOT)) {
            columnName = this.primaryTableSource.prefix
                ? this.primaryTableSource.prefix.concat(DOT, this.primaryTableSource.name, DOT, columnName)
                : this.primaryTableSource.name.concat(DOT, columnName);
        }
        
        const columnNameParts: string[] = columnName.split(DOT).filter(item => !!item);
        const lastColumnPart = columnNameParts.pop();
        if (lastColumnPart === STAR) {
            const tableName = columnNameParts.length === 0 ? null : columnNameParts.pop();
            let tableSource: IMetadataObject = null;
            const sourceTableList = Array.from(this.currentTableSourceObjectDict.values());
        
            if (!this.idIsNull(tableName) && sourceTableList.some(item => this.stringEquals(item.name, tableName))) {
                tableSource = sourceTableList.find(item => this.stringEquals(item.name, tableName));
            } else {
                tableSource = this.primaryTableSource;
            }
        
            for (const _column of tableSource.children) {
                const fullColumnName: string = _column.prefix ? _column.prefix.concat(DOT, _column.name) : _column.name;
                this.currentColumnSourceInfoDict.set(fullColumnName, {
                    name: fullColumnName,
                    alias: null,
                    type: _column.type,
                    range, 
                } as IColumnSourceInfo);
            }
            return;
        }
        
        const _columnObject = this.primaryTableSource?.children.find(item => this.stringEquals(item.name, lastColumnPart));
        const _columnType = _columnObject ? _columnObject.type : IMetadataType.ColumnType;
        this.currentColumnSourceInfoDict.set(columnName, {
            name: columnName,
            alias: columnAlias,
            type: _columnType,
            range, 
        } as IColumnSourceInfo);
        return;
    }

    public setSelectStarStmtContext(range: IRangeItem, index: number) {
        this.selectStarStmtStatus.contextRange = range;
        this.selectStarStmtStatus.contextEndTokenIndex = index;
    }

    public setSelectStarStmtStarRange(range: IRangeItem) {
        this.selectStarStmtStatus.starRange = range;
    }

    public processForSelectStarStmt() {
        if (this.selectStarStmtStatus.targetStarRange && isRangeEqual(this.selectStarStmtStatus.starRange, this.selectStarStmtStatus.targetStarRange)) {
            this.selectStarStmtStatus.tableSource = this.primaryTableSource;
        }

        if (this.codeActionRange) {
            this.addStarExpansionCodeAction();
        }

        this.selectStarStmtStatus.contextRange = null;
        this.selectStarStmtStatus.contextEndTokenIndex = null;
        this.selectStarStmtStatus.starRange = null;
    }

    public addStarExpansionCodeAction() {
        if (this.primaryTableSource.children.length > 0) {
            const obj = {
                kind: CodeActionKind.StarExpansion,
                contextRange: this.selectStarStmtStatus.contextRange,
                editRange: this.selectStarStmtStatus.starRange,
                replaceText: this.primaryTableSource.children.map(c => c.name).join(', '),
                endTokenIndex: this.selectStarStmtStatus.contextEndTokenIndex,
            } as ICodeActionInfo;
            if(this.cachedScript) {
                obj.endTokenIndex += this.cachedScript.tokenIndex;
                this.addOffsetToRange(obj.contextRange);
                this.addOffsetToRange(obj.editRange);
            }
            this.addCodeAction(obj);
        }
    }

    public addCodeAction(codeAction: ICodeActionInfo) {
        // Avoid adding duplicate code actions.
        if (this.codeActions.findIndex(item => item.kind === codeAction.kind && item.endTokenIndex === codeAction.endTokenIndex) === -1) {
            this.codeActions.push(codeAction);
        }
    }

    public clearTableSource() {
        this.currentTableSourceNameDict.clear();
        this.currentTableSourceObjectDict.clear();
        this.primaryTableSource = null;
    }

    public clearColumnSource() {
        this.currentColumnSourceInfoDict.clear();
        this.currentColumnSourceExpressionDict.clear();
    }

    public AddMetadataObject(obj: IMetadataCreated, needToAddTokenIndexOffset: boolean) {
        const columnChildren: IColumn[] = obj.children.map(c => {
            return {
                name: c.name.split(DOT).pop(),
                type: c.type,
            } as IColumn;
        });

        if (needToAddTokenIndexOffset && this.cachedScript) {
            obj.createStmtEndTokenIndex += this.cachedScript.tokenIndex;
            this.addOffsetToRange(obj.range);
        }

        switch (obj.type) {
            case IMetadataType.Schema:
                this.AddSchema(obj.name);
                break;
            case IMetadataType.Table:
                this.AddTableOrView(obj.name, columnChildren, false, true);
                break;
            case IMetadataType.View:
                this.AddTableOrView(obj.name, columnChildren, true, true);
                break;
            case IMetadataType.StoredProcedure:
                this.AddStoredProcedure(obj.name);
                break;
            case IMetadataType.Type:
                this.AddType(obj.name);
                break;
            case IMetadataType.User:
                this.AddUser(obj.name);
                break;
            case IMetadataType.Index:
                this.AddIndex(obj.name);
                break;
            case IMetadataType.Function:
                this.AddFunction(obj.name);
                break;
        }
        this.createdMetadataObjects.push(obj);
    }

    // For complete statements.
    private AddSchema(schemaName: string): void {
        this.metadataProvider.AddSchema(schemaName);
    }

    private AddTableOrView(tableOrViewFullName: string, columns: IColumn[], isView: boolean, updateIfExist = false): void {
        this.metadataProvider.AddTableOrView(tableOrViewFullName, columns, isView, updateIfExist);
    }

    private AddStoredProcedure(fullName: string): void {
        this.metadataProvider.AddStoredProcedure(fullName);
    }

    private AddUser(fullName: string): void {
        this.metadataProvider.AddUser(fullName);
    }

    private AddType(fullName: string): void {
        this.metadataProvider.AddType(fullName);
    }

    private AddIndex(fullName: string): void {
        this.metadataProvider.AddIndex(fullName);
    }

    private AddFunction(fullName: string): void {
        this.metadataProvider.AddFunction(fullName);
    }

    public ResolveColumnNames(originColumnNames: string[], tableName: string): IColumn[] {
        if (!originColumnNames) {
            return [];
        }

        let columnNames: IColumn[] = [];
        for (const name of originColumnNames) {
            const fullName = name;
            const lastName = name.includes(DOT) ? name.substr(name.lastIndexOf(DOT) + 1) : name;
            if (lastName === STAR) {
                if (this.idIsNull(tableName)) {
                    continue;
                }

                let tableObject: IMetadataObject = this.metadataProvider.GetObjectByFullName(IMetadataType.Table, tableName);
                if (!tableObject) {
                    tableObject = this.metadataProvider.GetObjectByFullName(IMetadataType.View, tableName);
                }

                if (tableObject) {
                    columnNames = columnNames.concat(tableObject.children
                        .filter(item => !!item && isColumnType(item.type) && !this.idIsNull(item.name))
                        .map(item => {
                            return { name: item.name, type: item.type } as IColumn; 
                        }));
                }
            } else {
                // The columns returned shoule be columnNames that some table contains. Should not be column expressions.
                if (this.isValidFullName(lastName)) {
                    let columnObject: IMetadataObject = null;
                    if (this.stringEquals(fullName, lastName)) {
                        columnObject = this.metadataProvider.GetObjectByName(IMetadataType.ColumnType, lastName);
                    } else {
                        columnObject = this.metadataProvider.GetObjectByFullName(IMetadataType.ColumnType, fullName);
                    }

                    columnNames.push({ name: lastName, type: columnObject ? columnObject.type : IMetadataType.ColumnType } as IColumn);
                }
            }
        }

        return columnNames;
    }

    // Only used when filter all columns in scenario: select {cursor position} from a,b,c. In above scenario, the table namespaces are a,b,c, so in cursor position we will provide columns from a,b,c table. 
    public SetTableNamespaces(tableNamespaces: string[]) {
        this.tableNamespaces = tableNamespaces ?? [];
    }

    protected MapToSqlCompletionItem(metadataObject: any): CommonSqlCompletionItem {
        let itemType: CommonSqlCompletionItemType = null;
        switch (metadataObject.type) {
            case IMetadataType.Database:
                itemType = CommonSqlCompletionItemType.Database;
                break;
            case IMetadataType.Schema:
                itemType = CommonSqlCompletionItemType.Schema;
                break;
            case IMetadataType.Table:
                itemType = CommonSqlCompletionItemType.Table;
                break;
            case IMetadataType.Function:
                itemType = CommonSqlCompletionItemType.Function;
                break;
            case IMetadataType.StoredProcedure:
                itemType = CommonSqlCompletionItemType.StoredProcedure;
                break;
            case IMetadataType.View:
                itemType = CommonSqlCompletionItemType.View;
                break;
            case IMetadataType.TableFunction:
                itemType = CommonSqlCompletionItemType.TableFunction;
                break;
            case IMetadataType.User:
                itemType = CommonSqlCompletionItemType.User;
                break;
            case IMetadataType.Type:
                itemType = CommonSqlCompletionItemType.Type;
                break;
            case IMetadataType.Index:
                itemType = CommonSqlCompletionItemType.Index;
                break;
            default:
                itemType = CommonSqlCompletionItemType.Column;
                break;
        }
    
        if (!metadataObject.name || metadataObject.name.startsWith(intellisenseFakedPrefix)) {
            return null;
        }
    
        const completionItem = new CommonSqlCompletionItem(metadataObject.name, metadataObject.prefix, generateDocumentationMarkdown(metadataObject, false), itemType);
        if (metadataObject.isRecommended) {
            completionItem.setRecommend();
        }
        return completionItem;
    }
    
    private GetCurrentTableSources(): IMetadataObject[] {
        const results: IMetadataObject[] = Array.from(this.currentTableSourceObjectDict.values());

        for (const entries of Array.from(this.currentTableSourceObjectDict.entries())) {
            const alias = entries[0];
            const value = entries[1];
            if (!this.idIsNull(alias) && !this.stringEquals(alias, value.name)) {
                results.push({
                    name: alias,
                    prefix: value.prefix,
                    type: IMetadataType.Table,
                    children: [],
                } as IMetadataObject);
            }
        }
        return results;
    }

    private GetCurrentColumnSources(): IMetadataObject[] {
        const ret: IMetadataObject[] = [];
        const pushColumnObject = (name: string, type: string, prefix: string) => {
            ret.push({
                name,
                prefix,
                type,
                children: [],
            } as IMetadataObject);
        };

        for (const column of this.currentColumnSourceInfoDict.values()) {
            const nameParts: string[] = column.name.split(DOT);
            const columnName: string = nameParts.pop();
            const prefix: string = nameParts.join(DOT);
            const columnAlias = column.alias;
            const columnType = column.type;

            pushColumnObject(columnName, columnType, prefix);
            if (!!columnAlias && !this.stringEquals(columnAlias, columnName)) {
                pushColumnObject(columnAlias, columnType, prefix);
            }
        }

        // when alias is not null, show alias, otherwise show column expressions.
        for (const column of this.currentColumnSourceExpressionDict.values()) {
            if (column.alias) {
                pushColumnObject(column.alias, IMetadataType.ColumnType, column.name);
            } else if (column.name) {
                pushColumnObject(column.name, IMetadataType.ColumnType, null);
            }
        }

        return ret;
    }

    public GetGeneratedColumnDict(): Map<string, IColumnSourceInfo> {
        const results: Map<string, IColumnSourceInfo> = new Map();
        for (const column of this.currentColumnSourceInfoDict.values()) {
            const columnName = column.name.split(DOT).pop();
            results.set(column.alias ?? columnName, column);
        }

        for (const column of this.currentColumnSourceExpressionDict.values()) {
            if (!column.alias) {
                continue;
            }
            results.set(column.alias, column);
        }
        return results;
    }

    private GetColumnsOfCurrentTableSources(): IMetadataObject[] {
        let results: IMetadataObject[] = [];

        for (const _table of Array.from(this.currentTableSourceObjectDict.values())) {
            results = results.concat(this.metadataProvider.GetDirectChildrenObjects(IMetadataType.ColumnType, _table));
        }
        return results;
    }

    private FilterColumnResults(metadataObjects: IMetadataObject[]): IMetadataObject[] {
        let result: IMetadataObject[] = [];

        if (!!this.tableNamespaces && this.tableNamespaces.length > 0) {
            const tableObjects: IMetadataObject[] = this.tableNamespaces.map(item => this.metadataProvider.GetObjectByFullName(null, item)).filter(item => !!item);
            if (tableObjects.length > 0) {
                for (const table of tableObjects) {
                    result = result.concat(table.children);
                }
                return this.SetRecommend(result);
            } else {
                // if no table object match the table namespaces, then table namespaces become invalid, we still use alll columns as results.
            }
        }

        // remove columns from system schema
        if (deprecateMetadataUnderSystemSchemaInTopLevel && systemSchemaNames.length > 0) {
            for (const metadataObject of metadataObjects) {
                if (!metadataObject.prefix || !systemSchemaNames.includes(metadataObject.prefix.split(DOT).shift())) {
                    result.push(metadataObject);
                }
            }
        }
        return result;
    }

    private FilterAllTablesByTableNamespace(allTables: IMetadataObject[]): any[] {
        let qualifiedTables: any[] = [];

        if (this.tableNamespaces && this.tableNamespaces.length > 0) {
            qualifiedTables = allTables.filter(item => this.tableNamespaces.includes(item.name));
            return !qualifiedTables || qualifiedTables.length === 0 ? allTables : this.SetRecommend(qualifiedTables);
        }
        
        if (this.currentColumnSourceInfoDict.size > 0) {
            if (this.currentTableSourceNameDict.size === 0) {
                const columnSourceNames = Array.from(this.currentColumnSourceInfoDict.keys()).map(item => item.split(DOT).pop());
                qualifiedTables = allTables.filter(table => table.children.some(column => columnSourceNames.includes(column.name)));
                if (qualifiedTables && qualifiedTables.length > 0) {
                    return this.SetRecommend(qualifiedTables);
                }
            } else {
                const sourceTableNames = Array.from(this.currentTableSourceNameDict.values()).map(item => item.split(DOT).pop());
                qualifiedTables = allTables.filter(table => !sourceTableNames.includes(table.name));
                if (qualifiedTables && qualifiedTables.length > 0) {
                    // no need to set recommend since there maybe a lot of other tables.
                    return qualifiedTables;
                }
            }
        }
        return allTables;
    }

    private formatColumnName(columnExpression: string): string {
        if (this.idIsNull(columnExpression)) {
            return columnExpression;
        }

        if (columnExpression.startsWith("@")) {
            return columnExpression.substring(1);
        } else {
            return columnExpression;
        }
    }

    private replaceAliasWithTableName(expressionPrefix: string): string {
        if (this.idIsNull(expressionPrefix)) {
            return expressionPrefix;
        }

        const expressionParts: string[] = expressionPrefix.split(DOT);
        const possibleAliasPart: string = expressionParts[0];

        const tableSourceNamePairs = Array.from(this.currentTableSourceNameDict.entries());
        const tableSourceObjectPairs = Array.from(this.currentTableSourceObjectDict.entries());

        // case-insensitive-able Map.has and Map.get
        const tableSourceName = tableSourceNamePairs.find(pair => this.stringEquals(pair[0], possibleAliasPart));
        const tableSourceObject = tableSourceObjectPairs.find(pair => this.stringEquals(pair[0], possibleAliasPart));

        if (!!tableSourceName && !!tableSourceObject) {
            expressionParts[0] = tableSourceName[1];
            return expressionParts.join(DOT);
        } else {
            return expressionPrefix;
        }
    }

    private isValidNameExpression(nameExpression: string): boolean {
        return nameExpression.split(/[.|\s|[|\]|*]/).filter(item => !!item && !this.isValidColumnName(item)).length === 0;
    }

    private isValidFullName(fullName: string): boolean {
        return fullName.split(/[\s|[|\]]/).filter(item => !!item && !this.isValidColumnName(item)).length === 0;
    }

    // could be id , could also be [id1 id2]
    private isValidColumnName(columnName: string): boolean {
        return /^[a-zA-Z][a-zA-Z0-9_#@$]*$/gi.test(columnName);
    }

    /*
        eg. SELECT * FROM [aa bbb cccc].[dd].
        Map stage:
        <1> SELECT * FROM [aa bbb cccc].[dd]. => SELECT * FROM [11 111 1111].[11].
        <2> SELECT * FROM [11 111 1111].[11]. => SELECT * FROM 2222222222222.2222.
        Final expression prefix result after mapping: 2222222222222.2222.

        Re-Map stage:
        <1> 2222222222222.2222. => [11 111 1111].[11].
        <2> [11 111 1111].[11]. => [aa bbb cccc].[dd].
    */
    private getExpressionPrefix(lastLineScript: string): string {
        const expressionPrefixStrRegex = "(2+\\.)+$";
        const sqlIdStrRegex = '(1+|(\\[|\\")\\s*(1+\\s*)*(\\]|\\"))';
        const simpleNameStrRegex = "[a-zA-Z_#][a-zA-Z0-9_#@$]*";
        const oneStrRegex = "[1]+";
        const twoStrRegex = "[2]+";
        let oneStrCount = 0;
        let twoStrCount = 0;

        const firstMapDict: Map<string, string> = new Map<string, string>();
        const secondMapDict: Map<string, string> = new Map<string, string>();

        // Map stage

        // First map
        let matchResults: string[] = lastLineScript.match(new RegExp(simpleNameStrRegex, "g"));
        matchResults = !matchResults ? [] : matchResults;
        oneStrCount = matchResults.length;
        for (let i = 0; i < matchResults.length; i++) {
            const _oneStr = "1".repeat(matchResults[i].length);
            const _numberKey = i;

            firstMapDict.set(this.getDictKey({ oneStr: _oneStr, numberKey: _numberKey }), matchResults[i]);
            lastLineScript = lastLineScript.replace(matchResults[i], _oneStr);
        }

        // Second map
        matchResults = lastLineScript.match(new RegExp(sqlIdStrRegex, "g"));
        matchResults = !matchResults ? [] : matchResults;
        twoStrCount = matchResults.length;
        for (let i = 0; i < matchResults.length; i++) {
            const _twoStr = "2".repeat(matchResults[i].length);
            const _numberKey = i;

            secondMapDict.set(this.getDictKey({ twoStr: _twoStr, numberKey: _numberKey }), matchResults[i]);
            lastLineScript = lastLineScript.replace(matchResults[i], _twoStr);
        }

        // Get the final result (after mapping)
        const _index: number = lastLineScript.search(new RegExp(expressionPrefixStrRegex, "g"));
        let finalMatchResultString: string = lastLineScript.substring(_index);
        if (!finalMatchResultString) {
            return null;
        }

        // Re-Map stage. (Re-Map to the original string)

        // re-mapped from second dict
        let twoStrsInFinalResult = finalMatchResultString.match(new RegExp(twoStrRegex, "g"));
        const twoStrsArrayInFinalResult = !twoStrsInFinalResult ? [] : twoStrsInFinalResult;
        let numberInFinalResult = twoStrCount - twoStrsArrayInFinalResult.length;
        for (const result of twoStrsArrayInFinalResult) {
            const _key = this.getDictKey({ twoStr: result, numberKey: numberInFinalResult });

            if (secondMapDict.has(_key)) {
                const _mapedOneStr: string = secondMapDict.get(_key);
                finalMatchResultString = finalMatchResultString.replace(result, _mapedOneStr);
                numberInFinalResult++;
            } else {
                return null;
            }
        }

        // re-mapped from first dict
        let oneStrsInFinalResult = finalMatchResultString.match(new RegExp(oneStrRegex, "g"));
        const oneStrsArrayInFinalResult = !oneStrsInFinalResult ? [] : oneStrsInFinalResult;
        numberInFinalResult = oneStrCount - oneStrsArrayInFinalResult.length;
        for (const result of oneStrsArrayInFinalResult) {
            const _key = this.getDictKey({ oneStr: result, numberKey: numberInFinalResult });

            if (firstMapDict.has(_key)) {
                const _mapedOriginalStr: string = firstMapDict.get(_key);
                finalMatchResultString = finalMatchResultString.replace(result, _mapedOriginalStr);
                numberInFinalResult++;
            } else {
                return null;
            }
        }

        return finalMatchResultString;
    }

    protected getAndResolveExpressionPrefix(): string {
        if (this.expressionPrefix) {
            return this.expressionPrefix;
        }

        if (!this.script || !this.script.endsWith(DOT)) {
            this.expressionPrefix = null;
        } else {
            const scriptLines: string[] = this.script.split("\n");
            const lastLineScript: string = !scriptLines ? "" : scriptLines.pop();
            this.expressionPrefix = this.getExpressionPrefix(lastLineScript);

            // let index = lastLineScript.search(this.finalExpressionPrefixRegex);
            // expressionPrefix = lastLineScript.substring(index);
            this.expressionPrefix = this.formatColumnName(this.expressionPrefix);
            this.expressionPrefix = this.replaceAliasWithTableName(this.expressionPrefix);
        }
        return this.expressionPrefix;
    }

    private getDictKey(_key: { oneStr: string; numberKey: number } | { twoStr: string; numberKey: number }): string {
        return JSON.stringify(_key);
    }

    private idIsNull(id: string): boolean {
        return !id || !id.trim();
    }

    private stringEquals(a: string, b: string) {
        return this.metadataProvider.stringEquals(a, b);
    }

    private addOffsetToRange(range: IRangeItem) {
        range.startLineNumber += this.cachedScript.line - 1;
        if (range.startLineNumber === this.cachedScript.line) {
            range.startColumn += this.cachedScript.column;
        }
        range.endLineNumber += this.cachedScript.line - 1;
        if (range.endLineNumber === this.cachedScript.line) {
            range.endColumn += this.cachedScript.column;
        }
    }

    public getCreatedMetadataRange(metadataObject: IMetadataObject): IRangeItem {
        const fullName = this.metadataProvider.GetFullName(metadataObject);
        for (const obj of this.createdMetadataObjects) {
            if (obj.name === fullName) {
                return obj.range;
            }
            for (const child of obj.children) {
                if (child.name === fullName) {
                    return child.range;
                }
            }
        }
        return null;
    }
}

// this should only used for word completion feature.
export class LSContextProvider {
    private static metadataCache: Map<LanguageServiceFeature, IMetadataCreated[]> = new Map([
        [LanguageServiceFeature.WordCompletion, []],
        [LanguageServiceFeature.QuickInfo, []],
        [LanguageServiceFeature.CodeAction, []],
    ]);

    private static codeActionCache: ICodeActionInfo[] = []; 

    public static GetContext(
        script: string, 
        metadata: ISqlMetadata, 
        builtinFunctions: Map<string, ISignatureInformation[]>, 
        caseSensitive: boolean,
        ast: any,
        ruleNames: string[],
        languageGrammarRuleConfig: ILanguageGrammarRuleName, 
        ruleStack: Set<string>,
        cachedScript: IParsedScript,
        feature: LanguageServiceFeature,
        codeActionRange?: IRangeItem,
        databaseToBeLoaded?: string[],
    ) {
        const context = new LSContext(
            script, 
            metadata, 
            builtinFunctions, 
            caseSensitive, 
            ast, 
            ruleNames, 
            languageGrammarRuleConfig, 
            ruleStack, 
            cachedScript, 
            codeActionRange, 
            databaseToBeLoaded
        );
        if (!UseIncrementalParsing) {
            return context;
        }

        const cachedTokenIndex = cachedScript ? cachedScript.tokenIndex : 0;
        this.ReduceMetadataCache(cachedTokenIndex, feature);
        for(const createdMetadata of this.metadataCache.get(feature)) {
            context.AddMetadataObject(createdMetadata, false);
        }
        if (feature === LanguageServiceFeature.CodeAction) {
            this.ReduceCodeActionCache(cachedTokenIndex);
            for(const action of this.codeActionCache) {
                context.addCodeAction(action);
            }
        }
        return context;
    }

    private static ReduceMetadataCache(cachedTokenIndex: number, feature: LanguageServiceFeature) {
        const metadataObjects = this.metadataCache.get(feature).filter(m => m.createStmtEndTokenIndex < cachedTokenIndex);
        this.metadataCache.set(feature, metadataObjects);
    }

    public static UpdateMetadataCache(metadataObjects: IMetadataCreated[], feature: LanguageServiceFeature) {
        this.metadataCache.set(feature, metadataObjects);
    }

    private static ReduceCodeActionCache(cachedTokenIndex: number) {
        this.codeActionCache = this.codeActionCache.filter(m => m.endTokenIndex < cachedTokenIndex);
    }

    public static UpdateCodeActionCache(codeActions: ICodeActionInfo[]) {
        this.codeActionCache = codeActions;
    }
}
