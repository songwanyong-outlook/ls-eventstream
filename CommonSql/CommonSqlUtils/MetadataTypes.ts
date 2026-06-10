// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

export type MetadataDelegate = () => ISqlMetadata;
export type GotoDefinitionDelegate = (metadataObjectName: string) => Promise<void>;

// this is the metadata format used internal
export interface ISqlMetadata {
    objects: IMetadataObject[];
    defaultSchema: string;
}

// this is the metadata format which we got via external delegation function
// convert ISqlRawMetadata to ISqlMetadata in SqlLanguageServicePipeline.metadataConverter
export type ISqlRawMetadata = [string, IMetadataObject[]];

export interface IMetadataObject {
    name: string;
    prefix: string;
    type: IMetadataType;
    alias?: string;
    children: IMetadataObject[];
    details?: string;
    doc?: string;
}

export interface IDynamicMetadata {
    databases: string[];
}

export enum IMetadataType {
    Schema = "Schema",
    Database = "Database",
    // Just a type that represents column type, real column type should be written in detail column type such as "DateTime"
    ColumnType = "Column",
    Table = "Table",
    Function = "Function",
    StoredProcedure = "StoredProcedure",
    View = "View",
    TableFunction = "TableFunction",
    User = "User",
    Type = "Type",
    Index = "Index",
    Other = "Other",
}

export function isColumnType(type: string) {
    return !!type && (type === IMetadataType.ColumnType || !Object.keys(IMetadataType).some(item => item === type));
}

export interface IColumn {
    name: string;
    alias?: string;
    type: string;
}

export interface IColumnNamePair {
    name: string;
    alias: string;
}
