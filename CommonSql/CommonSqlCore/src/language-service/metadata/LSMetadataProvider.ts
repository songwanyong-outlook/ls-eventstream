// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { IColumn, IMetadataObject, IMetadataType, isColumnType, ISqlMetadata } from "../../../../CommonSqlUtils/MetadataTypes";
import { ISignatureInformation } from "../../../../CommonSqlUtils/SignatureTypes";

export const systemSchemaNames: string[] = ["sys", "sysdiag", "INFORMATION_SCHEMA"];

export class LSMetadataProvider {
    private metadata: ISqlMetadata = null;
    
    private builtinObjects: IMetadataObject[] = [];

    private caseSensitive: boolean;

    private disableSchema = false;

    constructor(metadata: ISqlMetadata, builtinFunctions: Map<string, ISignatureInformation[]>, caseSensitive: boolean) {
        this.metadata = metadata;
        this.disableSchema = !metadata.defaultSchema;
        this.caseSensitive = caseSensitive;
        this.builtinObjects = this.ConvertBuiltinFunctionsMap(builtinFunctions);
    }

    public AddSchema(schemaName: string): void {
        if (this.IdIsNull(schemaName) || this.disableSchema) {
            return;
        }

        const nameParts = schemaName.split(".");
        schemaName = nameParts[nameParts.length - 1];

        this.metadata.objects.push({
            name: schemaName,
            prefix: null,
            type: IMetadataType.Schema,
            children: [],
        } as IMetadataObject);

        return;
    }

    public AddTableOrView(tableOrViewFullName: string, columns: IColumn[], isView: boolean, updateIfExist = false): void {
        const columnObjects: IMetadataObject[] = [];
        columns = !columns ? [] : columns;
        for (const column of columns) {
            if (this.IdIsNull(column.name)) {
                continue;
            }

            if (column.name.includes(".")) {
                column.name = column.name.substr(column.name.lastIndexOf(".") + 1);
            }

            columnObjects.push({
                name: column.name,
                prefix: tableOrViewFullName,
                type: column.type ? column.type : "Column",
                children: [],
            } as IMetadataObject);
        }

        this.AddSingleItemUnderSchema(tableOrViewFullName, isView ? IMetadataType.View : IMetadataType.Table, columnObjects, updateIfExist);
        return;
    }

    public AddStoredProcedure(fullName: string): void {
        this.AddSingleItemUnderSchema(fullName, IMetadataType.StoredProcedure, []);
    }

    public AddUser(fullName: string): void {
        this.AddSingleItemUnderSchema(fullName, IMetadataType.User, []);
    }

    public AddType(fullName: string): void {
        this.AddSingleItemUnderSchema(fullName, IMetadataType.Type, []);
    }

    public AddIndex(fullName: string): void {
        this.AddSingleItemUnderSchema(fullName, IMetadataType.Index, []);
    }

    public AddFunction(fullName: string): void {
        this.AddSingleItemUnderSchema(fullName, IMetadataType.Function, []);
    }

    private AddSingleItemUnderSchema(fullName: string, objectType: IMetadataType, children: IMetadataObject[], updateIfExist = false): void {
        if (this.IdIsNull(fullName)) {
            return;
        }

        let objectName: string = null;
        let schemaName: string = null;

        const nameParts: string[] = fullName.split(".");
        objectName = nameParts[nameParts.length - 1];
        schemaName = nameParts.length > 1 ? nameParts[nameParts.length - 2] : null;

        let objects: IMetadataObject[] = [];
        let prefix: string = null;

        let SetObjects = null;

        if (!this.disableSchema) {
            let schemaObject = this.GetSchemaByName(schemaName);
            if (!schemaObject) {
                this.AddSchema(schemaName);
                schemaObject = this.GetSchemaByName(schemaName);
            }
    
            if (!schemaObject.children) {
                schemaObject.children = [];
            }
            schemaObject.children = schemaObject.children.filter(item => !!item);
            objects = schemaObject.children;
            prefix = !schemaObject.prefix ? schemaObject.name : schemaObject.prefix.concat(".").concat(schemaObject.name);

            SetObjects = () => {
                schemaObject.children = objects;
            };
        } else {
            objects = this.metadata.objects;
            SetObjects = () => {
                this.metadata.objects = objects;
            };
            prefix = null;
        }


        if (updateIfExist) {
            const existedObject = objects.filter(item => this.stringEquals(item.name, objectName) && item.type === objectType);
            if (existedObject.length > 0 && !!existedObject[0].children && existedObject[0].children.length > 0) {
                const ob = existedObject[0];
                if (children) {
                    ob.children = ob.children.concat(children);
                }
                return;
            }
        }

        // remove the original one if the item already exists.
        objects = objects.filter(item => !(item.name === objectName && item.type === objectType));
        objects.push({
            name: objectName,
            prefix: prefix,
            type: objectType,
            children,
        } as IMetadataObject);
        SetObjects();
    }

    public GetTopLevelObjects(): IMetadataObject[] {
        let ret: IMetadataObject[] = [];
        if (!this.metadata.objects) {
            return ret;
        }

        if (this.disableSchema) {
            return this.metadata.objects;
        }

        // schemas
        ret = ret.concat(this.metadata.objects);

        const defaultSchemaObject: IMetadataObject = this.GetSchemaByName(this.metadata.defaultSchema);

        // views under default schema
        const views = this.GetDirectChildrenObjects(IMetadataType.View, defaultSchemaObject);
        ret = views ? ret.concat(views) : ret;

        // tables under default schema
        const tables = this.GetDirectChildrenObjects(IMetadataType.Table, defaultSchemaObject);
        ret = tables ? ret.concat(tables) : ret;

        // storedProcedures under default schema
        const storedProcedures = this.GetDirectChildrenObjects(IMetadataType.StoredProcedure, defaultSchemaObject);
        ret = storedProcedures ? ret.concat(storedProcedures) : ret;
        return ret;
    }

    public GetObjectByFullName(targetType: IMetadataType, fullName: string): IMetadataObject {
        if (this.IdIsNull(fullName)) {
            return null;
        }

        if (targetType === IMetadataType.Function || !targetType) {
            const builtinFunc = this.GetFunctionByName(fullName);
            if (builtinFunc) {
                return builtinFunc;
            }
        }

        const nameParts: string[] = fullName.split(".").filter(item => !this.IdIsNull(item));
        const name = nameParts.pop();
        const prefix = nameParts.length === 0 ? null : nameParts.join(".");

        const prefixMatchedObjects: IMetadataObject[] = this.GetObjectsByPrefix(targetType, prefix);
        const nameMatchedObjects: IMetadataObject[] = prefixMatchedObjects.filter(item => this.stringEquals(item.name, name));
        return nameMatchedObjects.length === 0 ? null : nameMatchedObjects[0];
    }

    public GetObjectByName(targetType: IMetadataType, name: string): IMetadataObject {
        if (this.IdIsNull(name)) {
            return null;
        }

        let ret: IMetadataObject = null;

        for (const schemaObject of this.metadata.objects) {
            ret = this.GetChildByName(targetType, name, schemaObject);
            if (ret) {
                return ret;
            }
        }
        return null;
    }

    public GetObjectsByPrefix(targetType: IMetadataType, expressionPrefix: string): IMetadataObject[] {
        const topLevelObjects = this.GetTopLevelObjects();

        if (this.IdIsNull(expressionPrefix)) {
            return targetType ? this.FilterMetadataObjectsByType(topLevelObjects, targetType) : topLevelObjects;
        }

        const prefixParts = expressionPrefix.split(".").filter(item => !this.IdIsNull(item));
        let matchObjects: IMetadataObject[] = topLevelObjects;
                
        for (const prefixPart of prefixParts) {
            const _matchObjects = matchObjects.filter(item => this.stringEquals(item.name, prefixPart));
            if (!!_matchObjects && _matchObjects.length > 0 && !!_matchObjects[0].children && _matchObjects[0].children.length > 0) {
                matchObjects = _matchObjects[0].children;
            } else {
                return [];
            }
        }

        return matchObjects
            ? (targetType ? this.FilterMetadataObjectsByType(matchObjects, targetType) : matchObjects)
            : [];
    }

    public GetSchemaByName(name: string): IMetadataObject {
        if (!this.metadata || !this.metadata.objects || this.metadata.objects.length === 0 || this.disableSchema) {
            return null;
        }

        if (this.IdIsNull(name)) {
            name = this.metadata.defaultSchema;
        }

        for (const schema of this.metadata.objects) {
            if (this.stringEquals(schema.name, name)) {
                return schema;
            }
        }

        return null;
    }

    public GetAllAvailableSchemas(): IMetadataObject[] {
        return this.disableSchema ? [] : this.metadata.objects;
    }

    // Only tables under default schema.
    // Other tables can only be accessed with schema prefix.
    public GetAllAvailableTables(): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.Table);
    }

    // Only views under default schema.
    // Other views can only be accessed with schema prefix.
    public GetAllAvailableViews(): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.View);
    }

    public GetAllAvailableProcs(): IMetadataObject[] {
        let allProcs = this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.StoredProcedure);
        allProcs = allProcs.concat(this.GetCertainTypeObjectsUnderSysSchema(IMetadataType.StoredProcedure));
        return allProcs;
    }

    public GetAllAvailableTableFunctions(): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.TableFunction);
    }

    public GetAllBuiltInFunctions(): IMetadataObject[] {
        const functionsUnderSchema = this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.Function);
        return functionsUnderSchema.concat(this.builtinObjects);
    }

    public GetAllColumns(): IMetadataObject[] {
        let results: IMetadataObject[] = [];

        for (const object of this.metadata.objects) {
            results = results.concat(this.GetAllChildrenObjects(IMetadataType.ColumnType, object));
        }
        return results;
    }

    public GetAllUsers(): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.User);
    }

    public GetAllTypes(): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.Type);
    }
    public GetAllIndexs(): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderDefaultSchema(IMetadataType.Index);
    }

    // Including view, table, Function, StoredProcedure
    public GetDirectChildrenObjects(type: IMetadataType, parent: IMetadataObject): IMetadataObject[] {
        if (!type || !parent || !parent.children) {
            return [];
        }

        const matchedObjects = this.FilterMetadataObjectsByType(parent.children, type);
        return matchedObjects;
    }

    public stringEquals(a: string, b: string) {
        if (!a || !b) {
            return false;
        }
        return this.caseSensitive ? (a === b) : (a.toUpperCase() === b.toUpperCase());
    }

    private GetAllChildrenObjects(type: IMetadataType, parent: IMetadataObject): IMetadataObject[] {
        let ret: IMetadataObject[] = [];
        if (!type || !parent || !parent.children) {
            return ret;
        }

        for (const child of parent.children) {
            if (this.isSameType(child.type, type)) {
                ret.push(child);
            }
            
            ret = ret.concat(this.GetAllChildrenObjects(type, child));
        }
        return ret;
    }

    private GetChildByName(type: IMetadataType, name: string, parent: IMetadataObject): IMetadataObject {
        if (this.IdIsNull(name) || !parent || !parent.children || parent.children.length === 0) {
            return null;
        }

        for (const child of parent.children) {
            if (this.stringEquals(name, child.name) && (!type || this.isSameType(child.type, type))) {
                return child;
            } else {
                const ret = this.GetChildByName(type, name, child);
                if (ret) {
                    return ret;
                }
            }
        }
        return null;
    }

    private GetFunctionByName(functionName: string): IMetadataObject {
        if (!functionName) {
            return null;
        }

        const funcs = this.builtinObjects.filter(item => this.stringEquals(item.name, functionName));
        if (!!funcs && funcs.length > 0) {
            return funcs.shift();
        }
        return null;
    }
    
    private ConvertBuiltinFunctionsMap(builtinFuncs: Map<string, ISignatureInformation[]>): IMetadataObject[] {
        if (!builtinFuncs) {
            return [];
        }

        const funcObjsMap: Map<String,IMetadataObject> = new Map();
        for(const entry of builtinFuncs.entries()) {
            let funcName = entry[0];
            if(!this.caseSensitive) {
                funcName = funcName.toUpperCase();
            }
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

    private GetCertainTypeObjectsUnderDefaultSchema(type: IMetadataType): IMetadataObject[] {
        return this.GetCertainTypeObjectsUnderSchema(type, this.metadata.defaultSchema);
    }

    private GetCertainTypeObjectsUnderSysSchema(type: IMetadataType): IMetadataObject[] {
        let results = [];
        for (const schemaName of systemSchemaNames) {
            results = results.concat(this.GetCertainTypeObjectsUnderSchema(type, schemaName));
        }
        return results;
    }

    private GetCertainTypeObjectsUnderSchema(type: IMetadataType, schemaName: string): IMetadataObject[] {
        let schemaObject: IMetadataObject = null;
        if (!this.disableSchema) {
            schemaObject = this.GetSchemaByName(schemaName);
        } else {
            schemaObject = { name: "fakedSchema", type: IMetadataType.Schema, prefix: null, children : this.metadata.objects };
        }

        return this.GetDirectChildrenObjects(type, schemaObject);
    }

    private FilterMetadataObjectsByType(metadataObjects: IMetadataObject[], type: IMetadataType): IMetadataObject[] {
        return type !== IMetadataType.ColumnType 
            ? metadataObjects.filter(item => item.type === type)
            : metadataObjects.filter(item => isColumnType(item.type));
    }

    private isSameType(typeA: string, typeB: IMetadataType) {
        return typeB !== IMetadataType.ColumnType && typeA === typeB || typeB === IMetadataType.ColumnType && isColumnType(typeA);
    }

    private IdIsNull(id: string): boolean {
        return !id || !id.trim();
    }

    public GetFullName(metadataObject: IMetadataObject): string {
        if (!metadataObject.prefix || metadataObject.prefix === this.metadata.defaultSchema) {
            return metadataObject.name;
        }
        return metadataObject.prefix + '.' + metadataObject.name;
    }
}
