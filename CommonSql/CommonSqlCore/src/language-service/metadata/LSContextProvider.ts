// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CommonSqlCompletionItem, CommonSqlCompletionItemType } from "../../../../CommonSqlUtils/CommonSqlCompletionItem";
import { IColumn, IMetadataObject, IMetadataType, ISqlMetadata, isColumnType } from "../../../../CommonSqlUtils/MetadataTypes";
import { LSContextVisitor } from "./LSContextVisitor";
import { IParsedScript } from '../Parser/CSIncrementalParsingCache';
import { LSContextSwitch, LSFunctionSwitch } from "./LSContextSwitch";
import { ISignatureInformation } from "../../../../CommonSqlUtils/SignatureTypes";
import { buildBuiltinFunctionMap } from "../../../../CommonSqlUtils/BulitinFunctionHelpers";
import { RegularFunctions, SystemFunctions, TableValueFunctions, WindowsFunctions } from "./BuiltinFunctions";
import { notDuplicate, stringEquals } from "../../utils/SqlCoreUtils";
import { ICodeActionInfo, IErrorMarkItem, IRangeItem, Severity } from "../../../../CommonSqlUtils/Utils";
import { Parser, ParserRuleContext } from "antlr4ts";
import { SemanticErrors } from "../../language-service/ErrorDetection/SemanticErrors";

export class LSContextProvider {
    public static GetContext(
        script: string, 
        metadata: ISqlMetadata, 
        ast: Parser,
        cachedScript: IParsedScript
    ) {
        let context = new LSContext(
            script, 
            metadata, 
            ast, 
            cachedScript
        );

        context.doVisit();

        return context;
    }
}

export class LSContext {
    private outputNames: string[];
    // key is table alias
    private currentTableSources: Map<string, IMetadataObject> = new Map<string, IMetadataObject>();
    private allTableSources: Map<string, IMetadataObject>;

    // key is table name
    private currentColumnsSources: Map<string, IMetadataObject[]> = new Map<string, IMetadataObject[]>();

    private outputSchema: IMetadataObject[] = [];
    
    // table that selected from, not the table joined.
    private primaryTableSource: IMetadataObject = null;

    private semanticErrors: IErrorMarkItem[] = [];
    private codeActions: ICodeActionInfo[] = [];
    
    public contextSwitch: LSContextSwitch = null;
    public functionSwitch: LSFunctionSwitch = null;

    // When expressionPrefix is string.empty, it means that we have an empty prefix such as "SELECT a FROM " we should still provide metadata sugggestions.
    // When expressionPrefix is null, it means that we have an invalid prefix such as "SELECT a FROM bcd", in this case we should not provide metadata suggestions.
    private expressionPrefix: string = null;

    // regular built-in functions which can be Select-ed
    private static builtinRegularFunctions: IMetadataObject[] = LSContext.convertBuiltinFunctionsMap(buildBuiltinFunctionMap(RegularFunctions));

    // windows built-in functions which can be GroupBy-ed
    private static builtinWindowFunctions: IMetadataObject[] = LSContext.convertBuiltinFunctionsMap(buildBuiltinFunctionMap(WindowsFunctions));

    // TableValue built-in functions which can be CROSS_APPLY-ed
    private static builtinTableValueFunctions: IMetadataObject[] = LSContext.convertBuiltinFunctionsMap(buildBuiltinFunctionMap(TableValueFunctions));

    private static builtinSystemFunctions: IMetadataObject[]  = LSContext.convertBuiltinFunctionsMap(buildBuiltinFunctionMap(SystemFunctions));

    constructor(
        private script: string, 
        private metadata: ISqlMetadata, 
        public ast: Parser,
        private cachedScript: IParsedScript,
    ) {
        this.contextSwitch = new LSContextSwitch();
        this.functionSwitch = new LSFunctionSwitch();

        this.setExpressionPrefix(script);

        this.allTableSources = new Map<string, IMetadataObject>(this.metadata.objects.map(obj => [obj.name, obj]));
        this.outputNames = this.metadata.outputNames ?? [];
    }

    public doVisit() {
        const contextVisitor = new LSContextVisitor(this);
        contextVisitor.doVisit();
        
        this.resolveExpressionPrefix();
    }

    public GetMetadataSuggestions(): CommonSqlCompletionItem[] {
        if (this.expressionPrefix == null) {
            return [];
        }

        let suggestions: CommonSqlCompletionItem[] = [];
        if (this.expressionPrefix.length > 0 && this.expressionPrefix.endsWith(".")) {
            let prefix = this.expressionPrefix.substring(0, this.expressionPrefix.length - 1);

            let more = this.getColumnsFromInput(prefix, null)
                .map(metadata => !!metadata.alias ? metadata.alias : metadata.name)
                .map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Column));

            if (more.length > 0) {
                // Found columns under the given table (prefix)
                suggestions = suggestions.concat(more);
            } else {
                // Prefix is not a valid table name, try to find all multi-layer columns name which started with the prefix
                more = this.getAllColumns(null)
                    .map(metadata => metadata.alias ? metadata.alias : metadata.name)
                    .filter(item => item.startsWith(this.expressionPrefix))
                    .map(item => item.substring(this.expressionPrefix.length))
                    .map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Column));
                suggestions = suggestions.concat(more);
            }

            /* NO UDF/UDA
            if (this.contextSwitch.InUDAContext) {
                suggestions = suggestions.concat(this.metadataProvider.GetUDA().map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Function)));
            }

            if (this.contextSwitch.InUDFContext) {
                suggestions = suggestions.concat(this.metadataProvider.GetUDF().map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Function)));
            }
            */
        } else {
            if (this.contextSwitch.InAllColumnNamesContext) {
                let more = this.getAllColumns(null)
                    .map(metadata => metadata.alias ? metadata.alias : metadata.name)
                    .map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Column));
                suggestions = suggestions.concat(more);
            }

            if (this.contextSwitch.InColumnsOfCurrentTablesSourcesContext) {
                let more = this.getColumnsOfCurrentTableSources().map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Column));
                suggestions = suggestions.concat(more);
            }

            if (this.contextSwitch.InCurrentColumnSourcesContext) {
                let more = this.getColumnSources(this.currentColumnsSources).map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Column));
                suggestions = suggestions.concat(more);
            }

            if (this.contextSwitch.InAllTableNamesContext) {
                let more = this.getAllAvailableInputs().map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Table));
                suggestions = suggestions.concat(more);
            }

            if (this.contextSwitch.InCurrentTableSourcesContext) {
                let more = this.getCurrentTableSources().map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Table));
                suggestions = suggestions.concat(more);
            }

            if (this.contextSwitch.InOutputNamesContext) {
                let more = this.getOutputNames().map(item => new CommonSqlCompletionItem(item, item, item, CommonSqlCompletionItemType.Table));
                suggestions = suggestions.concat(more);
            }

            let builtinFunctions = this.getSuggestionsOfBuiltInFunction();
            suggestions = suggestions.concat(builtinFunctions);    
        }

        return suggestions.filter(CommonSqlCompletionItem.completionItemNotDuplicate);
    }

    public getOutputNames(): string[] {
        return this.outputNames;
    }

    public setOutputSchema(outputSchema: IMetadataObject[]) {
        this.outputSchema = outputSchema;
    }

    public getOutputSchema(): IMetadataObject[] {
        return this.outputSchema
    }

    public getSemanticErrors(): IErrorMarkItem[] {
        return this.semanticErrors;
    }

    public getQuickInfo(word: string): string {
        let table: IMetadataObject;

        if (this.allTableSources.has(word)) {
            table = this.allTableSources.get(word);
        } else if (this.currentTableSources.has(word)) {
            table = this.currentTableSources.get(word);
        }

        if (!!table) {
            let columnsString = LSContext.columns2String(table.children);
            return `**${table.type}**: ${table.name}\n\n${columnsString}`;
        }

        if (this.outputNames.some(item => item === word)) {
            return `**Output**: ${word}`;
        }

        return null;
    }

    public getCodeActions(range: IRangeItem): ICodeActionInfo[] {
        return this.codeActions.filter(
            action => action.range.startLineNumber == range.startLineNumber &&
            action.range.startColumn == range.startColumn &&
            action.range.endLineNumber == range.endLineNumber &&
            action.range.endColumn == range.endColumn);
    }

    public addSemanticError(error: IErrorMarkItem) {
        this.semanticErrors.push(error);
    }

    public addTableSource(tableName: string, columns: IMetadataObject[], type: IMetadataType, idContext: ParserRuleContext): boolean {
        if (this.allTableSources.has(tableName)) {
            let msg = SemanticErrors.getTableExistsError(tableName);
            const range = LSContext.getContextRange(idContext);

            this.addSemanticError({
                message: msg,
                line: range.startLineNumber,
                startColumn: range.startColumn,
                endColumn: range.endColumn,
                severity: Severity.Error,
            } as IErrorMarkItem);

            return false;
        }

        let newTable = {
            name: tableName,
            type: type,
            prefix: "",
            alias: tableName,
            children: columns,
        } as IMetadataObject;

        this.allTableSources.set(tableName, newTable);
        return true;
    }

    public checkTableExists(tableName: string, idContext: ParserRuleContext): boolean {
        if (this.allTableSources.has(tableName)) {
            return true;
        } else if (this.isTableValueFunction(tableName)) {
            return true; // TableValue built-in function can be used as a virtual table
        } else {
            let msg = SemanticErrors.getInputNotExistsError(tableName);
            const range = LSContext.getContextRange(idContext);

            // add related error
            this.addSemanticError({
                message: msg,
                line: range.startLineNumber,
                startColumn: range.startColumn,
                endColumn: range.endColumn,
                severity: Severity.Error,
            } as IErrorMarkItem);

            // Add related code action
            for (let tableSource of this.allTableSources.keys()) {
                const title = `Replace "${tableName}" with "${tableSource}"`;
                this.addCodeAction(title, tableSource, range.startLineNumber, range.startColumn, range.endColumn, idContext.stop.tokenIndex);
            };

            return false;
        }
    }

    public checkOutputExists(outputName: string, idContext: ParserRuleContext): boolean {
        if (this.outputNames.some(item => item === outputName)) {
            return true;
        } else {        
            let msg = SemanticErrors.getOutputNotExistsError(outputName);
            const range = LSContext.getContextRange(idContext);

            // add related error
            this.addSemanticError({
                message: msg,
                line: range.startLineNumber,
                startColumn: range.startColumn,
                endColumn: range.endColumn,
                severity: Severity.Error,
            } as IErrorMarkItem);

            // Add related code action
            for (let output of this.outputNames) {
                const title = `Replace "${outputName}" with "${output}"`;
                this.addCodeAction(title, output, range.startLineNumber, range.startColumn, range.endColumn, idContext.stop.tokenIndex);
            }

            return false;
        }
    }

    public addCurrentTableSource(tableName: string, tableAlias: string, columns: IColumn[]) {
        if (this.currentTableSources.has(tableAlias)) {
            return;
        }

        let inputTable: IMetadataObject = this.allTableSources.has(tableName)
            ? this.allTableSources.get(tableName)
            : {
                name: tableName,
                type: IMetadataType.Table,
                prefix: "",
                alias: tableAlias,
                children: !!columns ? columns.map(column => {
                    return {
                        name: column.name,
                        type: IMetadataType.ColumnType,
                        prefix: tableName,
                        alias: column.alias,
                        children: []
                    } as IMetadataObject;
                }) : [],
            };

        this.currentTableSources.set(tableAlias, inputTable);

        if (!this.primaryTableSource) {
            this.primaryTableSource = inputTable;
        }
    }

    // The table prefix(If exists) of column name is table name, not table alias
    public addColumnSource(column: IMetadataObject) {
        let tableSourceName: string = null;
        let columnNameParts = column.name.split(".").filter(item => !!item);

        let sourceTableList = Array.from(this.currentTableSources.values());
        if (sourceTableList.filter(item => item.name === columnNameParts[0]).length > 0) {
            tableSourceName = columnNameParts[0];
        } else {
            tableSourceName = this.primaryTableSource.name;
        }

        let columnNameLastPart = columnNameParts[columnNameParts.length - 1];

        if (column.name === "*" || column.name.endsWith(".*")) {
            const columnsAsStar = this.getColumnsFromInput(tableSourceName, null);
            this.currentColumnsSources = this.currentColumnsSources.set(tableSourceName, columnsAsStar);
            this.outputSchema = this.outputSchema.concat(columnsAsStar);
        } else {
            if (!this.currentColumnsSources.has(tableSourceName)) {
                this.currentColumnsSources.set(tableSourceName, []);
            }

            let columnName: string = null;

            // in case of selected built-in function without an alias, e.g. "SELECT ABS(column1) FROM table1", column name will be shown as "ABS"
            if (!column.alias && columnNameLastPart.includes("(")) {
                let functionName = columnNameLastPart.substring(0, columnNameLastPart.indexOf("(")).trim();
                let functionColumn = this.getFunctionByName(functionName);
                if (!!functionColumn) {
                    columnName = functionColumn.name;
                }
            }

            // selected columns can be an expression
            if (this.isValidName(columnNameLastPart)) {
                columnName = columnNameLastPart;
            }
            
            if (!!columnName || !!column.alias) {
                const newColumn: IMetadataObject = {                    
                    name: columnName,
                    alias: column.alias,
                    prefix: tableSourceName,
                    type: IMetadataType.ColumnType,
                    children: [],
                };

                this.currentColumnsSources.get(tableSourceName).push(newColumn);
                this.outputSchema.push(newColumn);
            }
        }
    }

    public resolveValidColumns(columns: IMetadataObject[], tableNames: string[]): IMetadataObject[] {
        let validColumns: IMetadataObject[] = [];
        for (let column of columns) {
            if (column.name === "*" || column.name.endsWith(".*")) {
                let columnPrefix = column.name === "*" ? null : column.name.substring(0, column.name.length - 1);

                for (let tableName of tableNames) {
                    validColumns = validColumns.concat(this.getColumnsFromInput(tableName, columnPrefix).filter(item => !!item && !!item.name));
                }
            } else {
                let lastPartColumnName = column.name.split(".").pop();
                let columnName = this.isValidName(lastPartColumnName) ? lastPartColumnName : column.name;

                // if either a valid column name, or an existing column alias, store them in.
                if (!!columnName || !!column.alias) {
                    column.name = columnName;
                    validColumns.push(column);
                }
            }
        }

        return validColumns;
    }

    public static reolveIdString(id: string): string {
        // identifier can be quoted by [] or ""
        if (id.startsWith("[") && id.endsWith("]")) {
            return id.substring(1, id.length - 1);
        } else if (id.startsWith("\"") && id.endsWith("\"")) {
            return id.substring(1, id.length - 1);
        } else {
            return id;
        }
    }

    private static convertBuiltinFunctionsMap(builtinFuncs: Map<string, ISignatureInformation[]>): IMetadataObject[] {
        if (!builtinFuncs) {
            return [];
        }

        const funcObjsMap: Map<String,IMetadataObject> = new Map();
        for(const entry of builtinFuncs.entries()) {
            let funcName = entry[0].toUpperCase();
            const syntaxs = entry[1].map(sig => sig.label)
            .filter(syntax => !!syntax);

            const details = syntaxs.join(' | ');
            if(funcObjsMap.has(funcName)) {
                const func = funcObjsMap.get(funcName);
                if(!!details) {
                    func.details = !!func.details ? func.details.concat(' | ', details) : details;
                }             
            } else {
                const func = {
                    name: funcName,
                    prefix: "",
                    type: IMetadataType.Function,
                    children: [],
                } as IMetadataObject;             
                func.doc = entry[1][0].documentation;
                func.details = details;
                funcObjsMap.set(funcName,func);
            }
        }
        
        return Array.from(funcObjsMap.values());
    }

    private static columns2String(columns: IMetadataObject[]): string {
        if (!columns || columns.length === 0) {
            return "";
        }
    
        const MAX_SHOW_COLUMNS: number = 15;
    
        let columnNames: string[] = columns
            .filter(item => !!item && !!item.name && item.type == IMetadataType.ColumnType)
            .map(item => item.alias?? item.name);
    
        let remainings: number = 0;
        if (columnNames.length > MAX_SHOW_COLUMNS) {
            remainings = columnNames.length - MAX_SHOW_COLUMNS;
            columnNames = columnNames.slice(0, MAX_SHOW_COLUMNS);
            columnNames.push(`(...${remainings}) columns more`);
        }
    
        // use '+ ' in Markup to render indent unorder list
        let columnsString = columnNames.map(name => ('+ ' + name)).join("\n");
        return `**Columns**:\n${columnsString}`;
    }

    private static getContextRange(context: ParserRuleContext): IRangeItem {
        let startColumn = context.start.charPositionInLine;
        let endColumn = context.stop.charPositionInLine + context.stop.text.length;

        // consider the case of quoted string
        const text = context.text;
        if (context.text?.startsWith("[") || context.text?.startsWith("\"")) {
            startColumn++;
        }

        if (context.text?.endsWith("]") || context.text?.endsWith("\"")) {
            endColumn--;
        }

        return {
            startLineNumber: context.start.line,
            startColumn: startColumn,
            endLineNumber: context.stop.line,
            endColumn: endColumn,
        } as IRangeItem;
    }

    private setExpressionPrefix(script: string) {
        if (!script || !script.endsWith(".")) {
            this.expressionPrefix = "";
            return;
        }

        let scriptLines: string[] = script.split("\n");
        let lastLineScript: string = !scriptLines ? "" : scriptLines.pop();

        let index = lastLineScript.search(/["a-zA-Z\[][a-zA-Z0-9_#@$."\[\]]*.$/);
        this.expressionPrefix = lastLineScript.substring(index);
    }

    private resolveExpressionPrefix() {
        if (!this.expressionPrefix) {
            return;
        }

        let expresionParts = this.expressionPrefix
            .split(".")
            .map(item => LSContext.reolveIdString(item));

        // alias.part1.part2 => tableName.part1.part2
        if (this.currentTableSources.has(expresionParts[0])) {
            expresionParts[0] = this.currentTableSources.get(expresionParts[0]).name;
        }

        this.expressionPrefix = expresionParts.join(".");
    }

    private getSuggestionsOfBuiltInFunction(): CommonSqlCompletionItem[] {
        if (this.expressionPrefix == null) {
            return [];
        }

        let allFunctions: IMetadataObject[];
        if (this.expressionPrefix.length > 0) { // there is a prefix existing
            return [];
        } else {
            let regularFunction = this.functionSwitch.regularFunctionsAvailable ? LSContext.builtinRegularFunctions : [];
            let windowsFunction = this.functionSwitch.windowsFunctionsAvailable ? LSContext.builtinWindowFunctions : [];
            let tableValuedFunction = this.functionSwitch.tableValuedFunctionsAvailable ? LSContext.builtinTableValueFunctions : [];
            let systemFunction = this.functionSwitch.regularFunctionsAvailable ? LSContext.builtinSystemFunctions : [];

            allFunctions = regularFunction.concat(windowsFunction).concat(tableValuedFunction).concat(systemFunction);
        }

        return allFunctions.map(func => new CommonSqlCompletionItem(func.name, func.details, func.doc, CommonSqlCompletionItemType.Function));
    }

    private getFunctionByName(functionName: string): IMetadataObject {
        if (!functionName) {
            return null;
        }

        const funcs = LSContext.builtinRegularFunctions.filter(item => stringEquals(item.name, functionName));
        if (!!funcs && funcs.length > 0) {
            return funcs.shift();
        }
        return null;
    }

    private getAllAvailableInputs(): string[] {
        return Array.from(this.allTableSources.keys());
    }

    // return a list of tables including table name and table alias
    private getCurrentTableSources(): string[] {
        let tableAliases: string[] = Array.from(this.currentTableSources.keys());
        let tableNames: string[] = Array.from(this.currentTableSources.values()).map(metadata => metadata.name);

        return tableAliases
            .concat(tableNames)
            .filter(tablename => this.isValidName(tablename))
            .filter(tablename => !this.isTableValueFunction(tablename)) // TableValue function
            .filter(notDuplicate);
    }

    private getAllColumns(columnPrefix: string): IMetadataObject[] {
        return this.getColumnsFromInput(null, columnPrefix);
    }

    private getColumnsFromInput(tableName: string, columnPrefix: string): IMetadataObject[] {
        let allTableNames: string[] = Array.from(this.allTableSources.keys());
        if (!!tableName) {
            const timestampUpper: string = "TIMESTAMP";
            // "timestamp" is pre-casted to upper case as it's a KEYWORD too,
            // when it used as a table alias, use its uppercase to compare
            if (tableName.toUpperCase() == timestampUpper) {
                tableName = timestampUpper;
            }
            allTableNames = allTableNames.filter(item => item === tableName);
        }

        allTableNames = allTableNames.filter(tableName => !!columnPrefix ? tableName.concat(".") == columnPrefix : true);
        let retColumns: IMetadataObject[] = [];
        for (let tableName of allTableNames) {
            let table = this.allTableSources.get(tableName);
            retColumns = retColumns.concat(table.children?.filter(item => isColumnType(item.type)));
        }

        return retColumns;
    }

    private getColumnsOfCurrentTableSources(): string[] {
        let availableColumns = new Map<string, IMetadataObject[]>(
            Array
                .from(this.currentTableSources.values())
                .map(item => [item.name, item.children]));

        return this.getColumnSources(availableColumns);
    }

    private getColumnSources(availableColumns: Map<string, IMetadataObject[]>): string[] {
        let allColumns: IMetadataObject[] = [];

        // flatten all columns
        let columnListList = Array.from(availableColumns.values());
        for (let _columnList of columnListList) {
            allColumns = allColumns.concat(_columnList);
        }

        let columnNames: string[] = allColumns.map(column => column.name);
        let columnAliases: string[] = allColumns.map(column => column.alias);

        return columnNames.concat(columnAliases).filter(item => !!item).filter(notDuplicate);
    }

    private isValidName(name: string) {
        return /^[a-zA-Z][a-zA-Z0-9_#@$]*$/gi.test(name);
    }

    private isTableValueFunction(name: string) {
        return (TableValueFunctions.findIndex(signature => signature.name === name.toUpperCase()) != -1);
    }

    private addCodeAction(title: string, replaceText: string, line: number, startColumn: number, endColumn: number, endTokenIndex: number) {
        const codeAction: ICodeActionInfo = {
            title: title,
            replaceText: replaceText,
            range: {
                startLineNumber: line,
                endLineNumber: line,
                startColumn: startColumn + 1, // editor column is 1-based
                endColumn: endColumn + 1, // editor column is 1-based
            },
            endTokenIndex: endTokenIndex,
        } ;

        // Avoid adding duplicate code actions.
        if (this.codeActions.findIndex(item => item.title === codeAction.title && item.endTokenIndex === codeAction.endTokenIndex) === -1) {
            this.codeActions.push(codeAction);
        }
    }
}
