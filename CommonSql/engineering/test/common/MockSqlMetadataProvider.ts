import { IMetadataType, IMetadataObject, ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";

const MockSqlMetadata: ISqlMetadata = {
    defaultSchema: "defaultSchemaTest",
    objects: [
        {
            name: "defaultSchemaTest",
            prefix: "",
            type: "Schema",
            children: [
                {
                    name: "tableTest1",
                    prefix: "defaultSchemaTest",
                    type: "Table",
                    children: [
                        {
                            name: "tableColumnTest1",
                            prefix: "defaultSchemaTest.tableTest1",
                            type: "DateTime",
                            children: [],
                        },
                        {
                            name: "tableColumnTest2",
                            prefix: "defaultSchemaTest.tableTest1",
                            type: "int",
                            children: [],
                        },
                    ],
                },
                {
                    name: "tableTest3",
                    prefix: "defaultSchemaTest",
                    type: "Table",
                    children: [
                        {
                            name: "tableColumnTest5",
                            prefix: "defaultSchemaTest.tableTest3",
                            type: "string",
                            children: [],
                        },
                        {
                            name: "tableColumnTest6",
                            prefix: "defaultSchemaTest.tableTest3",
                            type: "bool",
                            children: [],
                        },
                    ],
                },
                {
                    name: "tableTest4",
                    prefix: "defaultSchemaTest",
                    type: "Table",
                    children: [],
                },
                {
                    name: "viewTest1",
                    prefix: "defaultSchemaTest",
                    type: "View",
                    children:[
                        {
                            name: "viewColumnTest1",
                            prefix: "defaultSchemaTest.viewTest1",
                            type: "double",
                            children: [],
                        },
                        {
                            name: "viewColumnTest2",
                            prefix: "defaultSchemaTest.viewTest1",
                            type: "float",
                            children: [],
                        },
                    ],
                },
                {
                    name: "storedProcedureTest1",
                    prefix: "defaultSchemaTest",
                    type: "StoredProcedure",
                    children: [],
                },
                {
                    name: "tableFunctionTest1",
                    prefix: "defaultSchemaTest",
                    type: "TableFunction",
                    children: [],
                },
                {
                    name: "functionTest1",
                    prefix: "defaultSchemaTest",
                    type: "Function",
                    children: [],
                },
                {
                    name: "indexTest1",
                    prefix: "defaultSchemaTest",
                    type: "Index",
                    children: [],
                },
            ],
        },
        {
            name: "schemaTest1",
            prefix: "",
            type: "Schema",
            children: [
                {
                    name: "tableTest2",
                    prefix: "schemaTest1",
                    type: "Table",
                    children: [
                        {
                            name: "tableColumnTest3",
                            prefix: "schemaTest1.tableTest2",
                            type: "tuple",
                            children: [],
                        },
                        {
                            name: "tableColumnTest4",
                            prefix: "schemaTest1.tableTest2",
                            type: "dict",
                            children: [],
                        },
                    ],
                },
                {
                    name: "viewTest2",
                    prefix: "schemaTest1",
                    type: "View",
                    children: [
                        {
                            name: "viewColumnTest3",
                            prefix: "schemaTest1.viewTest2",
                            type: "Column",
                            children: [],
                        },
                        {
                            name: "viewColumnTest4",
                            prefix: "schemaTest1.viewTest2",
                            type: "Column",
                            children: [],
                        },
                    ],
                },
                {
                    name: "storedProcedureTest2",
                    prefix: "schemaTest1",
                    type: "StoredProcedure",
                    children: [],
                },
                {
                    name: "tableFunctionTest2",
                    prefix: "schemaTest1",
                    type: "TableFunction",
                    children: [],
                },
                {
                    name: "functionTest2",
                    prefix: "schemaTest1",
                    type: "Function",
                    children: [],
                },
                {
                    name: "indexTest2",
                    prefix: "schemaTest1",
                    type: "Index",
                    children: [],
                },
            ],
        },
    ],
} as ISqlMetadata;

const MockSqlDynamicMetadataDatabase1: IMetadataObject = {
    name: "database1",
    prefix: "",
    type: IMetadataType.Database,
    children: [
        {
            name: "schema1",
            prefix: "database1",
            type: IMetadataType.Schema,
            children: [
                {
                    name: "tableTest1",
                    prefix: "database1.schema1",
                    type: IMetadataType.Table,
                    children: [
                        {
                            name: "tableColumnTest1",
                            prefix: "database1.schema1.tableTest1",
                            type: "DateTime" as any,
                            children: [],
                        },
                        {
                            name: "tableColumnTest2",
                            prefix: "database1.schema1.tableTest1",
                            type: "int",
                            children: [],
                        },
                    ],
                },
            ]
        },
        {
            name: "schema2",
            prefix: "database1",
            type: IMetadataType.Schema,
            children: [
                {
                    name: "tableTest3",
                    prefix: "database1.schema2",
                    type: IMetadataType.Table,
                    children: [
                        {
                            name: "tableColumnTest5",
                            prefix: "database1.schema2.tableTest3",
                            type: "string" as any,
                            children: [],
                        },
                        {
                            name: "tableColumnTest6",
                            prefix: "database1.schema2.tableTest3",
                            type: "bool",
                            children: [],
                        },
                    ],
                },
                {
                    name: "tableTest4",
                    prefix: "database1.schema2",
                    type: IMetadataType.Table,
                    children: [],
                },
                {
                    name: "viewTest1",
                    prefix: "database1.schema2",
                    type: IMetadataType.View,
                    children: [
                        {
                            name: "viewColumnTest1",
                            prefix: "database1.schema2.viewTest1",
                            type: "double" as any,
                            children: [],
                        },
                        {
                            name: "viewColumnTest2",
                            prefix: "database1.schema2.viewTest1",
                            type: "float",
                            children: [],
                        },
                    ],
                },
                {
                    name: "storedProcedureTest1",
                    prefix: "database1.schema2",
                    type: IMetadataType.StoredProcedure,
                    children: [],
                },
                {
                    name: "tableFunctionTest1",
                    prefix: "database1.schema2",
                    type: IMetadataType.TableFunction,
                    children: [],
                },
                {
                    name: "functionTest1",
                    prefix: "database1.schema2",
                    type: IMetadataType.Function,
                    children: [],
                },
                {
                    name: "indexTest1",
                    prefix: "database1.schema2",
                    type: IMetadataType.Index,
                    children: [],
                },
            ]
        },
    ],
};

const MockSqlDynamicMetadataDatabase2: IMetadataObject = {
    name: "database2",
    prefix: "",
    type: IMetadataType.Database,
    children: [
        {
            name: "schema3",
            prefix: "database2",
            type: IMetadataType.Schema,
            children: [
                {
                    name: "tableInDatabase2",
                    prefix: "database2.schema3",
                    type: IMetadataType.Table,
                    children: [
                        {
                            name: "column1",
                            prefix: "database2.schema3.tableInDatabase2",
                            type: "DateTime" as any,
                            children: [],
                        },
                        {
                            name: "column2",
                            prefix: "database2.schema3.tableInDatabase2",
                            type: "int",
                            children: [],
                        },
                    ],
                },
            ]
        }
    ],
};

const MockSqlDynamicMetadataDatabase3: IMetadataObject = {
    name: "database3",
    prefix: "",
    type: IMetadataType.Database,
    children: [
        {
            name: "schema4",
            prefix: "database3",
            type: IMetadataType.Schema,
            children: [
                {
                    name: "tableInDatabase3",
                    prefix: "database3.schema4",
                    type: IMetadataType.Table,
                    children: [
                        {
                            name: "column1",
                            prefix: "database3.schema4.tableInDatabase3",
                            type: "DateTime" as any,
                            children: [],
                        },
                        {
                            name: "column2",
                            prefix: "database3.schema4.tableInDatabase3",
                            type: "int",
                            children: [],
                        },
                    ],
                },
            ]
        }
    ],
};

const MockSqlMetadataWithoutSchema: ISqlMetadata = {
    defaultSchema: "",
    objects: [
        {
            name: "tableTest1",
            prefix: "",
            type: "Table",
            children: [
                {
                    name: "tableColumnTest1",
                    prefix: "tableTest1",
                    type: "DateTime",
                    children: [],
                },
                {
                    name: "tableColumnTest2",
                    prefix: "tableTest1",
                    type: "int",
                    children: [],
                },
            ],
        },
        {
            name: "tableTest3",
            prefix: "",
            type: "Table",
            children: [
                {
                    name: "tableColumnTest5",
                    prefix: "tableTest3",
                    type: "string",
                    children: [],
                },
                {
                    name: "tableColumnTest6",
                    prefix: "tableTest3",
                    type: "bool",
                    children: [],
                },
            ],
        },
        {
            name: "tableTest4",
            prefix: "",
            type: "Table",
            children: [],
        },
        {
            name: "viewTest1",
            prefix: "",
            type: "View",
            children: [
                {
                    name: "viewColumnTest1",
                    prefix: "viewTest1",
                    type: "double",
                    children: [],
                },
                {
                    name: "viewColumnTest2",
                    prefix: "viewTest1",
                    type: "float",
                    children: [],
                },
            ],
        },
        {
            name: "storedProcedureTest1",
            prefix: "",
            type: "StoredProcedure",
            children: [],
        },
        {
            name: "tableFunctionTest1",
            prefix: "",
            type: "TableFunction",
            children: [],
        },
        {
            name: "functionTest1",
            prefix: "",
            type: "Function",
            children: [],
        },
        {
            name: "indexTest1",
            prefix: "",
            type: "Index",
            children: [],
        },
    ],
} as ISqlMetadata;

export function GetMockMetadata(withSchema = true): ISqlMetadata {
    return withSchema ? CloneJsonObject(MockSqlMetadata) : CloneJsonObject(MockSqlMetadataWithoutSchema);
}

export function GetMockDynamicMetadata(databaseName: string): IMetadataObject {
    if (databaseName === MockSqlDynamicMetadataDatabase1.name) {
        return CloneJsonObject(MockSqlDynamicMetadataDatabase1);
    } else if (databaseName === MockSqlDynamicMetadataDatabase2.name) {
        return CloneJsonObject(MockSqlDynamicMetadataDatabase2);
    } else if (databaseName === MockSqlDynamicMetadataDatabase3.name) {
        return CloneJsonObject(MockSqlDynamicMetadataDatabase3);
    } else {
        return null;
    }
}

function CloneJsonObject(jsonObject: any) {
    return JSON.parse(JSON.stringify(jsonObject));
}