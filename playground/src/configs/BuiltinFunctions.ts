// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { ISignatureInformation } from "../../../CommonSql/CommonSqlUtils/SignatureTypes";

export const builtinFunctions: ISignatureInformation[] = [{
    name: "COUNT",
    label: "COUNT ( [ALL | DISTINCT] expression)",
    documentation: "Returns the number of items in a group. COUNT always returns a bigint data type value.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of any type or a column name. Aggregate functions and sub queries are not permitted."
    }],
    example: "COUNT (1)"
}, {
    name: "count",
    label: "COUNT (*)",
    documentation: "Returns the number of items in a group. COUNT always returns a bigint data type value.",
    parameters: [{
        label: "*",
        documentation: "Specifies that all events should be counted to return the total number of events in a group. COUNT(*) takes no parameters. COUNT(*) does not require an expression parameter because, by definition, it does not use information about any particular column. COUNT(*) returns the number of events without getting rid of duplicates. It counts each event separately. This includes events that contain null values."
    }],
    example: "COUNT (*)"
}];
