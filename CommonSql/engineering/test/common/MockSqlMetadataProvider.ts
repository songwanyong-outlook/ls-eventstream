import { IMetadataType, ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";

let commonMetadata: ISqlMetadata = {
    defaultSchema: "", // "defaultSchemaTest",
    outputNames: ["outputStream1", "outputStream2"],
    objects: [{
        name: "table1",
        prefix: "",
        type: IMetadataType.Table,
        children: [{
            name: "table1_column1",
            prefix: "table1",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "table1_column2",
            prefix: "table1",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "table1_column3",
            prefix: "table1",
            type: IMetadataType.ColumnType,
            children: [],
        }],
    }, {
        name: "table2",
        prefix: "",
        type: IMetadataType.Table,
        children: [{
            name: "table2_column1",
            prefix: "table2",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "table2_column2",
            prefix: "table2",
            type: IMetadataType.ColumnType,
            children: [],
        }],
    }, {
        name: "table3",
        prefix: "",
        type: IMetadataType.Table,
        children: [{
            name: "table3_column1",
            prefix: "table3",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "table3_column2",
            prefix: "table3",
            type: IMetadataType.ColumnType,
            children: [],
        }],
    }, {  // Same column schema with table1
        name: "table-4",
        prefix: "",
        type: IMetadataType.Table,
        children: [{
            name: "table1_column1",
            prefix: "table-4",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "table1_column2",
            prefix: "table-4",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "table1_column3",
            prefix: "table-4",
            type: IMetadataType.ColumnType,
            children: [],
        }],
    }, {
        name: "db1.schema1.table1",
        prefix: "",
        type: IMetadataType.Table,
        children: [{
            name: "outter.mid1.inner1",
            prefix: "",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "outter.mid2.inner2",
            prefix: "",
            type: IMetadataType.ColumnType,
            children: [],
        }, {
            name: "outter.mid3.inner3",
            prefix: "",
            type: IMetadataType.ColumnType,
            children: [],
        }],
    }]
};

export function GetMockMetadata(): ISqlMetadata {
    return CloneJsonObject(commonMetadata);
}

function CloneJsonObject(jsonObject: any) {
    return JSON.parse(JSON.stringify(jsonObject));
}
