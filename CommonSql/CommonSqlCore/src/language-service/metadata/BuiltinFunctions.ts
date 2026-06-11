// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import {
    IParameterInformation,
    ISignatureInformation,
} from '../../../../CommonSqlUtils/SignatureTypes';

// Some common parameter information
const paramInfoDate: IParameterInformation = {
    label: "date",
    documentation: "Is an expression that can be resolved to a datetime. date can be an expression, column expression, or string literal",
};

const paramInfoDatePart: IParameterInformation = {
    label: "datepart",
    documentation: "Is the part of startdate and enddate that specifies the type boundary crossed. The following table lists all valid datepart arguments.",
};

const paramInfoNumberExpression: IParameterInformation = {
    label: "expression",
    documentation: "Is an expression of the exact numeric or approximate numeric data type category.",
};

const paramInfoFloatExpression: IParameterInformation = {
    label: "float_expression",
    documentation: "Is an expression of type float or of a type that can be implicitly converted to float.",
};

/*
* re-usable windows function signatures, each set has a full name and a short-name version
*/
const sigShortNameWindow: ISignatureInformation[] = [{
    name: "HOPPING",
    label: "{HOPPINGWINDOW | HOPPING} (timeunit, windowsize, hopsize, [offsetsize])",
    documentation: "hopping windows model scheduled overlapping windows.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }, {
        label: "hopsize",
        documentation: "A big integer which describes the size of the Hop.",
    }, {
        label: "offsetsize",
        documentation: "By default, hopping windows are inclusive in the end of the window and exclusive in the beginning – for example 12:05 PM – 1:05 PM window will include events that happened exactly at 1:05 PM, but will not include events that happened at 12:05:PM (these event will be part of 12:00 PM – 01:00 PM window). The Offset parameter can be used to change behavior and include the events in the beginning of the window and exclude the ones that happened in the end.",
    }],
    example: 'HoppingWindow(minute, 60, 5)',
}, {
    name: "HOPPING",
    label: "{HOPPINGWINDOW | HOPPING} (Duration(timeunit, windowsize), Hop (timeunit, windowsize), [Offset (timeunit, offsetsize)])",
    documentation: "hopping windows model scheduled overlapping windows.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }, {
        label: "hopsize",
        documentation: "A big integer which describes the size of the Hop.",
    }, {
        label: "offsetsize",
        documentation: "By default, hopping windows are inclusive in the end of the window and exclusive in the beginning – for example 12:05 PM – 1:05 PM window will include events that happened exactly at 1:05 PM, but will not include events that happened at 12:05:PM (these event will be part of 12:00 PM – 01:00 PM window). The Offset parameter can be used to change behavior and include the events in the beginning of the window and exclude the ones that happened in the end.",
    }],
    example: 'HoppingWindow(Duration(hour, 1), Hop(minute, 5), Offset(millisecond, -1))',
}, {
    name: "SESSION",
    label: "{SESSIONWINDOW | SESSION} (timeunit, timeoutSize, maxDurationSize) [OVER (PARTITION BY partitionKey)]",
    documentation: "Session windows group events that arrive at similar times, filtering out periods of time where there is no data.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "timeoutSize",
        documentation: "A big integer that describes the gap size of the session window. Data that occur within the gap size are grouped together in the same window.",
    }, {
        label: "maxDurationSize",
        documentation: "If the total window size exceeds the specified maxDurationSize at a checking point, then the window is closed and a new window is opened at the same point. Currently, the size of the checking interval is equal to maxDurationSize.",
    }, {
        label: "partitionKey",
        documentation: "An optional parameter that specifies the key that the session window operates over. If specified, the window will only group together events of the same key.",
    }],
    example: 'SessionWindow(minute, 2, 60)',
}, {
    name: "SESSION",
    label: "{SESSIONWINDOW | SESSION} (Timeout(timeunit, timeoutSize), MaxDuration(timeunit, maxDurationSize)) [OVER (PARTITION BY partitionKey)]",
    documentation: "Session windows group events that arrive at similar times, filtering out periods of time where there is no data.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "timeoutSize",
        documentation: "A big integer that describes the gap size of the session window. Data that occur within the gap size are grouped together in the same window.",
    }, {
        label: "maxDurationSize",
        documentation: "If the total window size exceeds the specified maxDurationSize at a checking point, then the window is closed and a new window is opened at the same point. Currently, the size of the checking interval is equal to maxDurationSize.",
    }, {
        label: "partitionKey",
        documentation: "An optional parameter that specifies the key that the session window operates over. If specified, the window will only group together events of the same key.",
    }],
    example: 'SessionWindow(Timeout(minute, 2), MaxDuration((minute, 60))',
}, {
    name: "SLIDING",
    label: "{SLIDINGWINDOW | SLIDING} (timeunit, windowsize)",
    documentation: "When using a sliding window, the system is asked to logically consider all possible windows of a given length. ",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }],
    example: 'SlidingWindow(minute, 5)',
}, {
    name: "SLIDING",
    label: "{SLIDINGWINDOW | SLIDING} (Duration (timeunit, windowsize) )",
    documentation: "When using a sliding window, the system is asked to logically consider all possible windows of a given length.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }],
    example: 'SlidingWindow(Duration(minute, 5))',
}, {
    name: "TUMBLING",
    label: "{TUMBLINGWINDOW | TUMBLING} (timeunit, windowsize, [offsetsize])",
    documentation: "Tumbling windows are a series of fixed-sized, non-overlapping and contiguous time intervals.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }, {
        label: "offsetsize",
        documentation: "By default, hopping windows are inclusive in the end of the window and exclusive in the beginning – for example 12:05 PM – 1:05 PM window will include events that happened exactly at 1:05 PM, but will not include events that happened at 12:05:PM (these event will be part of 12:00 PM – 01:00 PM window). The Offset parameter can be used to change behavior and include the events in the beginning of the window and exclude the ones that happened in the end.",
    }],
    example: 'TumblingWindow(second,15)',
}, {
    name: "TUMBLING",
    label: "{TUMBLINGWINDOW | TUMBLING} ( Duration (timeunit, windowsize), [Offset(timeunit, offsetsize)] )",
    documentation: "Tumbling windows are a series of fixed-sized, non-overlapping and contiguous time intervals.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }, {
        label: "offsetsize",
        documentation: "By default, hopping windows are inclusive in the end of the window and exclusive in the beginning – for example 12:05 PM – 1:05 PM window will include events that happened exactly at 1:05 PM, but will not include events that happened at 12:05:PM (these event will be part of 12:00 PM – 01:00 PM window). The Offset parameter can be used to change behavior and include the events in the beginning of the window and exclude the ones that happened in the end.",
    }],
    example: 'TumblingWindow(Duration(hour, 1), Offset(millisecond, -1))',
}];

const sigLongNameWindow: ISignatureInformation[] = sigShortNameWindow.map(sig => ({
    name: sig.name + "WINDOW",
    label: sig.label,
    documentation: sig.documentation,
    parameters: sig.parameters,
    example: sig.example
}));

const sigWindows: ISignatureInformation[] = [{
    name: "WINDOW",
    label: "Window (ID, window_definition)",
    documentation: "Assign unique identities to window",
    parameters: [{
        label: "ID",
        documentation: "Is an identity of window_definition and is a unique varchar(max) value within the Windows construct.",
    }],
}, {
    name: "WINDOWS",
    label: "Windows (window_definition, … )",
    documentation: "Simultaneously compute results of multiple different window definitions. The query logic is computed for each of these window definitions, and the result is a union of all window results.",
    example: `Windows(TumblingWindow(minute, 10), TumblingWindow(minute, 20))`,
}, {
    name: "WINDOWS",
    label: "Windows (Window (id, window_definition), … )",
    documentation: "Simultaneously compute results of multiple different window definitions. The query logic is computed for each of these window definitions, and the result is a union of all window results.",
    example: `Windows(Window('1 min', TumblingWindow(minute, 1)), Window('60 min', HoppingWindow(minute, 60, 1)))`,
}];

export const WindowsFunctions = sigShortNameWindow.concat(sigLongNameWindow).concat(sigWindows);

export const TableValueFunctions: ISignatureInformation[] = [{
    name: "GETARRAYELEMENTS",
    label: "GetArrayElements (column_reference)",
    documentation: "Returns a dataset with array values and indexes. The result of the GetArrayElements function must be used with CROSS APPLY operator only. This function is useful for parsing arrays and nested objects in JSON and AVRO formatted input event data.",
    parameters: [{
        label: "column_reference",
        documentation: "Is the column reference expression to be evaluated. Column must be of type Array.",
    }],
    example: "GetArrayElements(event.arrayField)",
}, {
    name: "GETRECORDPROPERTIES",
    label: "GetRecordProperties (column_reference)",
    documentation: "Returns a dataset with record property names and values. The result of the GetRecordProperties function must be used with the CROSS APPLY operator.",
    parameters: [{
        label: "column_reference",
        documentation: "Is the column reference expression to be evaluated. Column must be of type Record",
    }],
    example: "GetRecordProperties(event.recordField)",
}];

export const SystemFunctions: ISignatureInformation[] = [{
    name: "SYSTEM.TIMESTAMP",
    label: "System.Timestamp()",
    documentation: "Every event at every stage of the query in Azure Stream Analytics has a timestamp associated with it. System.Timestamp() is a system property that can be used to retrieve the event’s timestamp.",
}, {
    name: "SYSTEM.WINDOW",
    label: "System.Window()",
    documentation: "Can only be used in the SELECT clause of the GROUP BY statement to retrieve metadata about the grouping time window, this function returns a value of type Record containing a single field Id, which holds the identity of the window the event belongs to.",
}];

export const RegularFunctions: ISignatureInformation[] = [
// Aggregate Functions
{
    name: "AVG",
    label: "AVG (expression)",
    documentation: "Returns the average of the values in a group. Null values are ignored.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of the exact numeric or approximate numeric data type category. AVG can be used with bigint, decimal and float columns. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'AVG(Toll)',
},  {
    name: "COALESCE",
    label: "COALESCE (expression1, expression2, [, ...expressionN])",
    documentation: "Evaluates the arguments in order and returns the value of the first expression that initially does not evaluate to NULL.",
    parameters: [{
        label: "expression",
        documentation: "An expression of any type.",
    }],
}, {
    name: "COUNT",
    label: "COUNT ( * | [ALL | DISTINCT] expression)",
    documentation: "Returns the number of items in a group. COUNT always returns a bigint data type value.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of any type or a column name. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'COUNT (DISTINCT TollId)',
}, {
    name: "COUNT_BIG",
    label: "COUNT_BIG ( * | [ALL | DISTINCT] expression)",
    documentation: "This function returns the number of items found in a group. COUNT_BIG operates like the COUNT function",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of any type or a column name. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'COUNT_BIG (DISTINCT TollId)',
}, {
    name: "COLLECT",
    label: "COLLECT()",
    documentation: "Returns an array with all record values from the window.",
    example: 'COLLECT()',
},  {
    name: "CollectTop",
    label: "CollectTop (number)",
    documentation: "Returns an array of ranked records, where rank defines the ranking position of the event in the window according to the specified ordering. Ordering/ranking is based on event columns and can be specified in ORDER BY clause.",
    parameters: [{
        label: "number",
        documentation: "The number of top events the user wants to collect from the window.",
    }],
    example: 'CollectTop(2) OVER (ORDER BY value2 ASC, value3 DESC)',
}, {
    name: "MAX",
    label: "MAX (expression)",
    documentation: "Returns the maximum value in the expression.",
    parameters: [{
        label: "expression",
        documentation: "Is a constant, column name, or function, and any combination of arithmetic operators. MAX can be used with bigint, decimal and float columns, but not with bit columns. Aggregate functions and subqueries are not permitted.",
    }],
    example: 'MAX(Toll)',
}, {
    name: "MIN",
    label: "MIN (expression)",
    documentation: "Returns the minimum value in the expression.",
    parameters: [{
        label: "expression",
        documentation: "Is a constant, column name, or function, and any combination of arithmetic operators. MIN can be used with bigint, decimal and float columns. Aggregate functions and subqueries are not permitted.",
    }],
    example: 'MIN(Toll)',
}, {
    name: "PERCENTILE_CONT",
    label: "PERCENTILE_CONT (numeric_literal)",
    documentation: "Calculates a percentile based on a continuous distribution of the entire data set. The result is interpolated and might not be equal to any of the specific values from the input set.",
    parameters: [{
        label: "numeric_literal",
        documentation: "The percentile to compute. The value must range between 0 and 1.",
    }],
    example: 'PERCENTILE_CONT(0.95) OVER (ORDER BY serviceAvailability)',
}, {
    name: "PERCENTILE_DISC",
    label: "PERCENTILE_DISC (numeric_literal)",
    documentation: "Calculates a percentile based on entire data set. For a given percentile value P, PERCENTILE_DISC sorts the values of the expression in the ORDER BY clause and returns the value within the smallest cumulative distance that is greater than or equal to P. For example, PERCENTILE_DISC (0.5) will compute the 50th percentile (that is, the median) of an expression. PERCENTILE_DISC calculates the percentile based on a discrete distribution of the data values; the result is equal to a specific value from the input data.",
    parameters: [{
        label: "numeric_literal",
        documentation: "The percentile to compute. The value must range between 0 and 1.",
    }],
    example: 'PERCENTILE_DISC(0.95) OVER (ORDER BY serviceAvailability)',
}, {
    name: "STDEV",
    label: "STDEV (expression)",
    documentation: "Returns the statistical standard deviation of all values in a group. Null values are ignored.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of the exact numeric or approximate numeric data type category. STDEV can be used with bigint, decimal and float columns. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'STDEV(Toll)',
}, {
    name: "STDEVP",
    label: "STDEVP (expression)",
    documentation: "Returns the statistical standard deviation for the population for all values in a group. Null values are ignored.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of the exact numeric or approximate numeric data type category. STDEVP can be used with bigint, decimal and float columns. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'STDEVP(Toll)',
}, {
    name: "STRING_AGG", 
    label: "STRING_AGG (expression, separator)",
    documentation: "Concatenates the values of string expressions and places separator values between them. The separator is not added at the end of string.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of any type. Expressions are converted to NVARCHAR or VARCHAR types during concatenation. Non-string types are converted to NVARCHAR type.",
    }, {
            label: "separator",
            documentation: "Is an expression of NVARCHAR or VARCHAR type that is used as separator for concatenated strings. It can be literal or variable.",
        }],
    example: "STRING_AGG(field, ';')",
}, {
    name: "SUM",
    label: "SUM (expression)",
    documentation: "Returns the sum of all the values in the expression. SUM can be used with numeric columns only. Null values are ignored.",
    parameters: [{
        label: "expression",
        documentation: "Is a constant, column, or function, and any combination of arithmetic operators. SUM can be used with bigint, decimal and float columns.",
    }],
    example: 'SUM(Toll)',
}, {
    name: "TOPONE",
    label: "TopOne()",
    documentation: "Returns the top-rank record, where rank defines the ranking position of the event in the window according to the specified ordering. Ordering/ranking is based on event columns and can be specified in ORDER BY clause.",
    example: 'TopOne() OVER (ORDER BY value DESC) as topEvent',
}, {
    name: "VAR", 
    label: "VAR (expression)",
    documentation: "Returns the statistical variance of all values in a group. Null values are ignored.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of the exact numeric or approximate numeric data type category. VAR can be used with bigint, decimal and float columns. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'VAR(Toll)',
}, {
    name: "VARP", 
    label: "VAR (expression)",
    documentation: "Returns the statistical variance for the population for all values in a group. Null values are ignored.",
    parameters: [{
        label: "expression",
        documentation: "Is an expression of the exact numeric or approximate numeric data type category. VARP can be used with bigint, decimal and float columns. Aggregate functions and sub queries are not permitted.",
    }],
    example: 'VARP (Toll)',
}, 
    
// Analytic Functions
{
    name: "ISFIRST",
    label: "ISFIRST (timeunit, duration)",
    documentation: "Returns 1 if the event is the first event within a given fixed interval, or 0 otherwise. The intervals are aligned the same way as tumbling windows (see Tumbling Window). ISFIRST is not affected by predicates in WHERE clause, join conditions in JOIN clause, or grouping expressions in GROUP BY clause of the current query. ).",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the duration. The following table lists all valid time unit values --- both full names and abbreviations may be used in the query.",
    }, {
        label: "duration",
        documentation: "A big integer which specifies the number of timeunits in the interval. For instance, ISFIRST(minute, 15) will look at 15-minute intervals. The start times of the intervals are aligned in the same way as in tumbling windows",
    }],
    example: 'ISFIRST(mi, 10)',
}, {
    name: "LAG",
    label: "LAG (scalar_expression, [offset], [default])",
    documentation: "The LAG analytic operator allows one to look up a “previous” event in an event stream, within certain constraints. It is very useful for computing the rate of growth of a variable, detecting when a variable crosses a threshold, or when a condition starts or stops being true.",
    parameters: [{
        label: "scalar_expression",
        documentation: "The value to be returned based on the specified offset. It is either an expression of any type that returns a single (scalar) value or the wildcard expression ‘*’. For ‘*’ the entire event according to the specified offset will be returned and will be contained in the result event (nested record).",
    }, {
        label: "offset",
        documentation: "The number of events back from the current event from which to obtain a value. If not specified, the default is 1, which means it returns the previous event. Offset must be an integer greater than or equal to 1. Events are processed in temporal order. If there are several events with the same time stamp events are processed in the order of arrival.",
    }, {
        label: "default",
        documentation: "The value to return when there is no event at the specified offset. If a default value is not specified, NULL is returned.",
    }],
    example: 'LAG(reading) OVER (PARTITION BY sensorId LIMIT DURATION(hour, 1) WHEN reading IS NOT NULL)',
}, {
    name: "LAST",
    label: "LAST (scalar_expression, [default])",
    documentation: "The LAST analytic operator allows one to look up the most recent event in an event stream within defined constraints. It is useful in the scenarios like computing last known good value (e.g. not null), finding last time when event matched certain criteria, etc.",
    parameters: [{
        label: "scalar_expression",
        documentation: "The value to be returned. It is either an expression of any type that returns a single (scalar) value or the wildcard expression ‘*’. For ‘*’ the entire event will be returned and will be contained in the result event (nested record). scalar_expression cannot contain other analytic functions or external functions.",
    }, {
        label: "default",
        documentation: "The value to return when there is no event matching criteria. If a default value is not specified, NULL is returned. ‘No event’ can be the case if there are no prior events within the time interval specified in the limit_duration_clause or the event exists but does not match condition specified in the when_clause. If the event exists and the value of scalar_expression is NULL then NULL is returned. default can be a column, subquery, or other expression, but it cannot contain other analytic functions or external functions. default must have the exact same type as scalar_expression.",
    }],
    example: 'LAST(reading) OVER (PARTITION BY sensorId LIMIT DURATION(hour, 1) WHEN reading IS NOT NULL)',
}, {
    name: "ANOMALYDETECTION_SPIKEANDDIP",
    label: "AnomalyDetection_SpikeAndDip (scalar_expression, confidence, historySize, mode)",
    documentation: "Detects temporary anomalies in a time series event.The underlying machine learning model uses the adaptive kernel density estimation algorithm.",
    parameters: [{
        label: "scalar_expression",
        documentation: "The event column or computed field over which the model performs anomaly detection. Allowed values for this parameter include FLOAT or BIGINT data types that return a single (scalar) value.",
    }, {
        label: "confidence",
        documentation: "A percentage number from 1.00 to 100 (inclusive) that sets the sensitivity of the machine learning model. The lower the confidence, the higher the number of anomalies detected, and vice versa. Start from an arbitrary number between 70 and 90 and adjust this based on the results observed in development or testing.",
    }, {
        label: "historySize",
        documentation: "The number of events in a sliding window that the model continuously learns from and uses for scoring the next event for anomalousness. Typically, this should represent the period of time of normal behavior to enable the model to flag a subsequent anomaly. Start with an educated guess using historical logs, and adjust based on the results observed in development or test.",
    }, {
        label: "mode",
        documentation: "A string parameter whose value is 'spikes', 'dips', or 'spikesanddips', to detect only spikes, only dips, or both spikes and dips, respectively.",
    }],
    example: "AnomalyDetection_SpikeAndDip (CAST(temperature AS FLOAT), 95, 120, 'spikesanddips') OVER (LIMIT DURATION (second, 120))",
}, {
    name: "ANOMALYDETECTION_CHANGEPOINT",
    label: "AnomalyDetection_ChangePoint (scalar_expression, confidence, historySize)",
    documentation: "Detects persistent anomalies in a time series event stream. The underlying machine learning model uses the Exchangeability Martingales algorithm.",
    parameters: [{
        label: "scalar_expression",
        documentation: "The event column or computed field over which the model performs anomaly detection. Allowed values for this parameter include FLOAT or BIGINT data types that return a single (scalar) value.",
    }, {
        label: "confidence",
        documentation: "A percentage number from 1.00 to 100 (inclusive) that sets the sensitivity of the machine learning model. The lower the confidence, the higher the number of anomalies detected, and vice versa. Start from an arbitrary number between 70 and 90 and adjust this based on the results observed in development or testing.",
    }, {
        label: "historySize",
        documentation: "The number of events in a sliding window that the model continuously learns from and uses for scoring the next event for anomalousness. Typically, this should represent the period of time of normal behavior to enable the model to flag a subsequent anomaly. Start with an educated guess using historical logs, and adjust based on the results observed in development or test.",
    }],
    example: "AnomalyDetection_ChangePoint (CAST(temperature as float), 80, 1200) OVER (LIMIT DURATION (minute, 20))",
}, 

// Array Functions
{
    name: "GETARRAYELEMENT",
    label: "GetArrayElement (array_expression, bigint_expression)",
    documentation: "Returns the array element at the specified index. This function is useful for parsing arrays and nested objects in JSON and AVRO formatted input event data.",
    parameters: [{
        label: "array_expression",
        documentation: "Is the array expression to be evaluated as a source array. array_expression can be a column of type Array or result of another function call.",
    }, {
        label: "bigint_expression",
        documentation: "Is the bigint expression to be evaluated as array index. The ordinal position in the array of elements, starting at 0.",
    }],
    example: "GetArrayElement(i.SensorReadings.CustomSensor, 0)",
}, {
    name: "GETARRAYLENGTH",
    label: "GetArrayLength (array_expression)",
    documentation: "Returns the length of the specified array.",
    parameters: [{
    label: "array_expression",
        documentation: "Is the array expression to be evaluated as a source array. array_expression can be a column of type Array or result of another function call.",
    }],
    example: 'GetArrayLength(arrayField)',
},
    
// GeoSpatial Functions
{
    name: "CREATELINESTRING",
    label: "CreateLineString (points)",
    documentation: "Returns a GeoJSON LineString record. The result of a CreateLineString can be used as input to other Geospatial functions.",
    parameters: [{
        label: "points",
        documentation: "A list of GeoJSON record points.",
    }],
    example: "CreateLineString(CreatePoint(input.latitude, input.longitude), CreatePoint(10.0, 10.0), CreatePoint(10.5, 10.5))",
}, {
    name: "CREATEPOINT",
    label: "CreatePoint (latitude, longitude)",
    documentation: "Returns a GeoJSON Point record. The result of a CreatePoint can be used as input to other Geospatial functions.",
    parameters: [{
        label: "latitude",
        documentation: "Is the latitude of a geographic point, value must be float.",
    }, {
        label: "longitude",
        documentation: "Is the longitude of a geographic point, value must be float.",
    }],
    example: "CreatePoint(input.latitude, input.longitude)",
}, {
    name: "CREATEPOLYGON",
    label: "CreatePolygon (points)",
    documentation: "Returns a GeoJSON Polygon record. The result of a CreatePolygon can be used as input to other Geospatial functions. The order of points must follow right-hand ring orientation, an easy way to check if the polygon orientation is correct is to imagine yourself walking from one point to the other in order of declaration, the inside of the polygon needs to be on your left side all the time.",
    parameters: [{
        label: "points",
        documentation: "A list of GeoJSON record points.",
    }],
    example: "CreatePolygon(CreatePoint(input.latitude, input.longitude), CreatePoint(10.0, 10.0), CreatePoint(10.5, 10.5)",
}, {
    name: "ST_DISTANCE",
    label: "ST_DISTANCE (pointA, pointB)",
    documentation: "Returns the geodesic distance between two points in meters. Cartesian distances require projection calculations and are not supported, but they can be implemented in user defined functions. If used with Polygons will return 0.",
    parameters: [{
        label: "pointA",
        documentation: "The point to measure distance from.",
    }, {
        label: "pointB",
        documentation: "The point to measure distance to.",
    }],
    example: "ST_DISTANCE(input.carPosition, input.warehouse)",
}, {
    name: "ST_OVERLAPS",
    label: "ST_OVERLAPS (polygonA, polygonB)",
    documentation: "Returns 1 if a geography overlaps with another. If geographies do not overlap or one is within another, it will return 0.",
    parameters: [{
        label: "polygonA",
        documentation: "The polygon that could overlap with polygonB.",
    }, {
        label: "polygonB",
        documentation: "The polygon that could overlap with polygonA.",
    }],
    example: "ST_OVERLAPS(input.datacenterArea, input.stormArea)",
}, {
    name: "ST_INTERSECTS",
    label: "ST_INTERSECTS (lineStringA, lineStringB)",
    documentation: "Returns 1 if a geography intersects with another. If geographies do not intersect it will return 0.",
    parameters: [{
        label: "lineStringA",
        documentation: "The LineString that could intersect with LineStringB.",
    }, {
        label: "lineStringB",
        documentation: "The LineString that could intersect with LineStringA.",
    }],
    example: "ST_INTERSECTS(input.pavedRoad, input.dirtRoad)",
}, {
    name: "ST_WITHIN",
    label: "ST_WITHIN (geography, polygon)",
    documentation: "Returns 1 if a geography is within another, if not it will return 0.",
    parameters: [{
        label: "geography",
        documentation: "The geography that could be inside the polygon. Can be either a point or a polygon.",
    }, {
        label: "polygon",
        documentation: "The polygon that could contain the geography.",
    }],
    example: "ST_WITHIN(input.deliveryDestination, input.warehouse)",
},
    
// Input Metadata Functions
{
    name: "GETMETADATAPROPERTYVALUE",
    label: "GetMetadataPropertyValue",
    documentation: "Queries input data for specific properties. There are three types of properties: Adapter, User, and Unique EventId.",
    example: "GetMetadataPropertyValue(ehInput, 'EventId')",
},

// Record Functions
{
    name: "GETRECORDPROPERTYVALUE",
    label: "GetRecordPropertyValue (record_expression, string_expression)",
    documentation: "Returns the record value associated with the specified property.",
    parameters: [{
        label: "record_expression",
        documentation: "Is the record expression to be evaluated as a source record. record_expression can be a column of type Record or result of another function call.",
    }, {
        label: "string_expression",
        documentation: "Is the string expression to be evaluated as a record property name.",
    }],
    example: "GetRecordPropertyValue(input.SensorReadings, thresholds.SensorName)",
},

// below 3 are not list in the built-in functions, but can be used within Window serials functions and look like function
{
    name: "DURATION",
    label: "Duration (timeunit, windowsize)",
    documentation: "Return a big integer which describes the size of the window",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "windowsize",
        documentation: "A big integer which describes the size of the window. The windowsize is static and cannot be changed dynamically at runtime.",
    }],
}, {
    name: "HOP",
    label: "Hop (timeunit, hopsize)",
    documentation: "Return a big integer which describes the size of the Hop.",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "hopsize",
        documentation: "A big integer which describes the size of the Hop.",
    }],
}, {
    name: "OFFSET",
    label: "Offset (timeunit, offsetsize)",
    documentation: "Return a big interger which describes the size of Offset",
    parameters: [{
        label: "timeunit",
        documentation: "Is the unit of time for the windowsize or the hopsize.",
    }, {
        label: "offsetsize",
        documentation: "By default, hopping windows are inclusive in the end of the window and exclusive in the beginning – for example 12:05 PM – 1:05 PM window will include events that happened exactly at 1:05 PM, but will not include events that happened at 12:05:PM (these event will be part of 12:00 PM – 01:00 PM window). The Offset parameter can be used to change behavior and include the events in the beginning of the window and exclude the ones that happened in the end.",
    }],
},

// Scalar Functions, including:
// Conversion Functions
{       
    name: "CAST",
    label: "CAST (expression AS data_type)",
    documentation: "Converts an expression of one data type to another within the supported data types in Stream Analytics Query Language.",
    parameters: [{
        label: "expression",
        documentation: "Is any valid expression.",
    }, {
        label: "data_type",
        documentation: "Is the target data type supported by Stream Analytics Query Language",
    }],
    example: "CAST(TollId AS bigint)",
}, {
    name: "GETTYPE",
    label: "GetType (expression) ",
    documentation: "Returns a data type name of the value.",
    parameters: [{
        label: "expression",
        documentation: "Is any valid expression.",
    }],
    example: "GetType(EntryTime)",
}, {
    name: "TRY_CAST",
    label: "TRY_CAST (expression AS data_type)",
    documentation: "Returns a value cast to the specified data type if the cast succeeds; otherwise, returns NULL. Supports the data types in the Stream Analytics Query Language.",
    parameters: [{
        label: "expression",
        documentation: "Is any valid expression.",
    }, {
        label: "data_type",
        documentation: "Is the target data type supported by Stream Analytics Query Language",
    }],
    example: "TRY_CAST(EntryTime AS datetime)",
},
// Date and Time Functions
{
    name: "DATEADD",
    label: "DATEADD (datepart, number, date)",
    documentation: "Returns a specified date with the specified number interval (signed integer) added to a specified datepart of that date.",
    parameters: [paramInfoDatePart, {
        label: "number",
        documentation: "Is an expression that can be resolved to a bigint that is added to a datepart of date. If you specify a value with a decimal fraction, the fraction is truncated and not rounded",
    }, paramInfoDate],
    example: "DATEADD(hour, 2, EntryTime)",
}, {
    name: "DATEDIFF",
    label: "DATEDIFF (datepart, startdate, enddate)",
    documentation: "Returns the count (signed integer) of the specified datepart boundaries crossed between the specified startdate and enddate.",
    parameters: [paramInfoDatePart, {
        label: "startdate",
        documentation: "Is an expression that can be resolved to a datetime. date can be an expression, column expression, or string literal. Startdate is substructed from enddate",
    }, {
        label: "enddate",
        documentation: "Is an expression that can be resolved to a datetime. date can be an expression, column expression, or string literal. Startdate is substructed from enddate",
    }],
    example: "DATEDIFF(minute, EntryTime, CAST(’2014-09-10 12:00:00’ AS datetime))",
}, {
    name: "DATEDIFF_BIG",
    label: "DATEDIFF_BIG (datepart, startdate, enddate)",
    documentation: "Returns the count (as a signed big integer value) of the specified datepart boundaries crossed between the specified startdate and enddate.",
    parameters: [
        paramInfoDatePart,
    {
        label: "startdate",
        documentation: "Is an expression that can be resolved to a datetime. date can be an expression, column expression, or string literal. Startdate is substructed from enddate",
    }, {
        label: "enddate",
        documentation: "Is an expression that can be resolved to a datetime. date can be an expression, column expression, or string literal. Startdate is substructed from enddate",
    }],
    example: "DATEDIFF(minute, EntryTime, CAST(’2014-09-10 12:00:00’ AS datetime))",
}, {
    name: "DATENAME",
    label: "DATENAME (datepart, date)",
    documentation: "Returns a character string that represents the specified datepart of the specified date.",
    parameters: [paramInfoDatePart, paramInfoDate],
    example: "DATENAME(month, EntryTime)",
}, {
    name: "DATEPART",
    label: "DATEPART (datepart, date)",
    documentation: "Returns an integer that represents the specified datepart of the specified date.",
    parameters: [paramInfoDatePart, paramInfoDate],
    example: "DATEPART(weekday, EntryTime)",
}, {
    name: "DATETIMEFROMPARTS",
    label: "DATETIMEFROMPARTS (year, month, day, hour, minute, seconds, milliseconds)",
    documentation: "Returns a datetime value for the specified date and time.",
    example: "DATETIMEFROMPARTS (2014,9,10,12,DATEPART(minute,EntryTime)+10,00,00)",
}, {
    name: "EOMONTH",
    label: "EOMONTH (start_date [, month_to_add])",
    documentation: "Returns the last day of the month containing a specified date, with an optional offset.",
    parameters: [{
        label: "start_date",
        documentation: "A date expression that specifies the date for which to return the last day of the month.",
    }, {
        label: "month_to_add",
        documentation: "An optional integer expression that specifies the number of months to add to start_date.",
    }],
    example: "EOMONTH (EntryTime, -1)",
}, {
    name: "ISDATE",
    label: "ISDATE (expression)",
    documentation: "Returns 1 if the expression is a valid datetime value; otherwise, 0.",
    parameters: [{
        label: "expression",
        documentation: "Is a character string or expression that can be converted to a character string.",
    }],
    example: "ISDATE('15/2008/04')",
}, {
    name: "DAY",
    label: "DAY (date)",
    documentation: "Returns an integer representing the day (day of the month) of the specified date.",
    parameters: [paramInfoDate],
    example: "DAY (EntryTime)",
}, {
    name: "MONTH",
    label: "MONTH (date)",
    documentation: "Returns an integer that represents the month of the specified date.",
    parameters: [paramInfoDate],
    example: "MONTH (EntryTime)",
}, {
    name: "YEAR",
    label: "YEAR (date)",
    documentation: "Returns an integer that represents the year of the specified date",
    parameters: [paramInfoDate],
    example: "YEAR (EntryTime)",
},
// Mathematical Functions
{
    name: "ACOS",
    label: "ACOS (float_expression)",
    documentation: "A function that returns the angle, in radians, whose cosine is the specified float expression.",
    parameters: [paramInfoFloatExpression],
    example: 'ACOS(input.x)',
}, {
    name: "ASIN",
    label: "ASIN (float_expression)",
    documentation: "A function that returns the angle, in radians, whose sine is the specified float expression. This is also called arcsine.",
    parameters: [paramInfoFloatExpression],
    example: 'ASIN(input.x)',
}, {
    name: "ATAN",
    label: "ATAN (float_expression)",
    documentation: "A function that returns the angle, in radians, whose tangent is a specified float expression. This is also called arctangent.",
    parameters: [paramInfoFloatExpression],
    example: 'ATAN(input.x)',
}, {
    name: "ATN2",
    label: "ATN2 (float_expression, float_expression)",
    documentation: "Returns the angle, in radians, between the positive x-axis and the ray from the origin to the point (y, x), where x and y are the values of the two specified float expressions.",
    parameters: [paramInfoFloatExpression, paramInfoFloatExpression],
    example: 'ATN2(input.y, input.x)',
}, {
    name: "COS",
    label: "COS (float_expression)",
    documentation: "A function that returns the trigonometric cosine of the specified angle - in radians.",
    parameters: [paramInfoFloatExpression],
    example: 'COS(input.x)',
}, {
    name: "COT",
    label: "COT (float_expression)",
    documentation: "A function that returns the trigonometric cotangent of the specified angle - in radians.",
    parameters: [paramInfoFloatExpression],
    example: 'COT(input.x)',
}, {
    name: "SIN",
    label: "SIN (float_expression)",
    documentation: "Returns the trigonometric sine of the specified angle, in radians.",
    parameters: [paramInfoFloatExpression],
    example: 'SIN(input.x)',
}, {
    name: "TAN",
    label: "TAN (float_expression)",
    documentation: "Returns the tangent of the input expression.",
    parameters: [paramInfoFloatExpression],
    example: 'TAN(input.x)',
}, {
    name: "DEGREES",
    label: "DEGREES (expression)",
    documentation: "This function returns the corresponding angle, in degrees, for an angle specified in radians.",
    parameters: [paramInfoNumberExpression],
    example: 'DEGREES((PI()/2)',
}, {
    name: "RADIANS",
    label: "RADIANS (expression)",
    documentation: "This function returns radians when a numeric expression, in degrees, is entered.",
    parameters: [paramInfoNumberExpression],
    example: 'RADIANS (input.x)',
}, {
    name: "PI",
    label: "PI()",
    documentation: "This function returns the constant value of PI.",
    parameters: [],
    example: 'PI()',
}, {
    name: "LOG",
    label: "LOG (float_expression)",
    documentation: "Returns the natural logarithm of the specified float expression.",
    parameters: [paramInfoFloatExpression],
    example: 'LOG(10)',
}, {
    name: "LOG10",
    label: "LOG10 (float_expression)",
    documentation: "Returns the base-10 logarithm of the specified float expression.",
    parameters: [paramInfoFloatExpression],
    example: 'LOG10(10)',
}, {
    name: "ABS",
    label: "ABS (expression)",
    documentation: "A mathematical function that returns the absolute (positive) value of the specified numeric expression.",
    parameters: [paramInfoNumberExpression],
    example: 'ABS(input.x)',
}, {
    name: "CEILING",
    label: "CEILING (expression)",
    documentation: "A mathematical function that returns the smallest integer greater than or equal to the specified numeric expression.",
    parameters: [paramInfoNumberExpression],
    example: 'CEILING(input.x)',
}, {
    name: "EXP",
    label: "EXP (float_expression)",
    documentation: "A mathematical function that returns the exponential value of the specified float expression.",
    parameters: [paramInfoFloatExpression],
    example: 'EXP(input.x)',
}, {
    name: "FLOOR",
    label: "FLOOR (expression)",
    documentation: "A mathematical function that returns the largest integer less than or equal to the specified numeric expression.",
    parameters: [paramInfoNumberExpression],
    example: 'FLOOR(input.x)',
}, {
    name: "POWER",
    label: "POWER (float_expression, y)",
    documentation: "A mathematical function that returns the value of the specified expression to the specified power.",
    parameters: [paramInfoFloatExpression, {
        label: "y",
        documentation: "The power to which to raise float_expression. y can be an expression of the exact numeric or approximate numeric data type category.",
    }],
    example: 'POWER(input.x, 3)',
}, {
    name: "ROUND",
    label: "ROUND (numericExpression, length)",
    documentation: "Returns a numeric value, rounded to the specified length or precision.",
    parameters: [{
        label: "numericExpression",
        documentation: "The numeric expression to be rounded. Must be bigint or float.",
    }, {
        label: "length",
        documentation: "The precision to which numericExpression is to be rounded. length must be an expression of typ*e bigint. ",
    }],
    example: 'ROUND(a, b)',
}, {
    name: "SIGN",
    label: "SIGN (expression)",
    documentation: "A mathematical function that returns the positive (+1), zero (0), or negative (-1) sign of the specified expression.",
    parameters: [paramInfoNumberExpression],
    example: 'SIGN(input.x)',
}, {
    name: "SQUARE",
    label: "SQUARE (float_expression)",
    documentation: "A mathematical function that returns the square of the specified float value.",
    parameters: [paramInfoFloatExpression],
    example: 'SQUARE(input.x)',
}, {
    name: "SQRT",
    label: "SQRT (float_expression)",
    documentation: "A mathematical function that returns the square root of the specified float value.",
    parameters: [paramInfoFloatExpression],
    example: 'SQRT(input.x)',
},

// String Functions
{
    name: "CHARINDEX",
    label: "CHARINDEX (expressionToFind, expressionToSearch [, start_location] )",
    documentation: "Searches an expression for another expression and returns its starting position if found.",
    parameters: [{
        label: "expressionToFind",
        documentation: "Is a character expression that contains the sequence to be found.",
    }, {
        label: "expressionToSearch",
        documentation: "Is a character expression to be searched.",
    }, {
        label: "start_location",
        documentation: "Is a bigint expression at which the search starts. If start_location is not specified, is a negative number, or is 0, the search starts at the beginning of expressionToSearch.",
    }],
    example: "CHARINDEX('us', Model)",
}, {
    name: "CONCAT",
    label: "CONCAT (string_value1, string_value2 [, string_valueN] )",
    documentation: "Returns a string that is the result of concatenating two or more string values.",
    parameters: [{
        label: "string_value1",
        documentation: "A string value to concatenate to the other values.",
    }],
    example: "CONCAT('Make:', Make, ' And Model:', Model)",
}, {
    name: "CONCAT_WS",
    label: "CONCAT_WS ( separator, argument1, argument2 [, argumentN]... )",
    documentation: "This function returns a string resulting from the concatenation, or joining, of two or more string values in an end-to-end manner. It separates those concatenated string values with the delimiter specified in the first function argument.",
    parameters: [{
        label: "separator",
        documentation: "An expression of any character type (char, nchar, nvarchar, or varchar).",
    }, {
        label: "argumentN",
        documentation: "An expression of any type.",
    }],
    example: "CONCAT_WS(',','1 Microsoft Way', NULL, NULL, 'Redmond', 'WA', 98052)",
}, {
    name: "LEN",
    label: "LEN (string_expression)",
    documentation: "Returns the number of characters of the specified string expression, excluding trailing blanks.",
    parameters: [{
        label: "string_expression",
        documentation: "Is the string expression to be evaluated. string_expression can be a constant or column of type nvarchar(max)",
    }],
    example: "LEN(LicensePlate)",
}, {
    name: "LOWER",
    label: "LOWER (string_expression)",
    documentation: "Returns a character expression after converting uppercase character data to lowercase.",
    parameters: [{
        label: "string_expression",
        documentation: "Is the string expression to be evaluated. string_expression can be a constant or column of type nvarchar(max)",
    }],
    example: 'LOWER(LicensePlate)',
}, {
    name: "LTRIM",
    label: "LTRIM (string_expression)",
    documentation: "Returns a character expression after it removes leading blanks.",
    parameters: [{
        label: "string_expression",
        documentation: "Is the string expression to be evaluated. string_expression can be a constant or column of type nvarchar(max)",
    }],
    example: "LTRIM('     Five spaces are at the beginning of this string.')",
}, {
    name: "RTRIM",
    label: "RTRIM (string_expression)",
    documentation: "Returns a character string after truncating all trailing spaces.",
    parameters: [{
        label: "string_expression",
        documentation: "Is the string expression to be evaluated. string_expression can be a constant or column of type nvarchar(max)",
    }],
    example: "RTRIM('Removes trailing spaces.   ')",
}, {
    name: "TRIM",
    label: "TRIM (string_expression)",
    documentation: "Removes the space character char(32) or other specified characters from the start and end of a string.",
    parameters: [{
        label: "string_expression",
        documentation: "Is the string expression to be evaluated. string_expression can be a constant or column of type nvarchar(max)",
    }],
    example: "TRIM( '     test    ')",
}, {
    name: "NCHAR",
    label: "NCHAR (integer_expression)",
    documentation: "Returns the Unicode character with the specified integer code, as defined by the Unicode standard.",
    parameters: [{
        label: "integer_expression",
        documentation: "Positive integer from 0 through 1114111 (0 through 0x10FFFF). If a value outside this range is specified, NULL is returned.",
    }],
    example: 'NCHAR(33590)',
}, {
    name: "PATINDEX",
    label: "PATINDEX ('%pattern%', expression)",
    documentation: "Returns the starting position of the first occurrence of a pattern in a specified expression, or 0 if the pattern is not found, on all valid nvarchar(max) data types.",
    parameters: [{
        label: "pattern",
        documentation: "A character expression that contains the sequence to be found",
    }, {
        label: "expression",
        documentation: "An expression, typically a column that is searched for the specified pattern. Where the expression is of the nvarchar(max) data type.",
    }],
    example: "PATINDEX('%100%', LicensePlate)",
}, {
    name: "REGEXMATCH",
    label: "REGEXMATCH (expression, pattern)",
    documentation: "Returns the starting position of the first occurrence of a pattern in a specified expression, or 0 if the pattern is not found, on all valid nvarchar(max) data types. Pattern is interpreted as single-line, case-insensitive, ECMAScript compatible regular expression.",
    parameters: [{
        label: "expression",
        documentation: "An expression, typically a column that is searched for the specified pattern. Where the expression is of the nvarchar(max) data type.",
    }, {
        label: "pattern",
        documentation: "A character expression that contains the regular expression to be found.",
    }],
    example: "REGEXMATCH(LicensePlate, '[0-9][0-9][0-9]')",
}, {
    name: "REPLACE",
    label: "REPLACE (stringExpression, stringPattern, stringReplacement)",
    documentation: "Replaces all occurrences of a specified string value with another string value.",
    parameters: [{
        label: "stringExpression",
        documentation: "The string expression to be searched.",
    }, {
        label: "stringPattern",
        documentation: "The substring to be found. If stringPattern is an empty string, then stringExpression is returned.",
    }, {
        label: "stringReplacement",
        documentation: "The replacement string.",
    }],
    example: "REPLACE(value, pattern, replacement)",
}, {
    name: "UNICODE",
    label: "UNICODE (character_expression)",
    documentation: "Returns the integer value, as defined by the Unicode standard, for the first character of the input expression.",
    parameters: [{
        label: "character_expression",
        documentation: "Is a nvarchar expression to be evaluated. If more than one character is provided, only the first one is considered.",
    }],
    example: 'UNICODE(\'茶\')',
}, {
    name: "UPPER",
    label: "UPPER (string_expression)",
    documentation: "Returns a character expression with lowercase character data converted to uppercase.",
    parameters: [{
        label: "string_expression",
        documentation: "Is the string expression to be evaluated. string_expression can be a constant or column of type nvarchar(max)",
    }],
    example: 'UPPER(LicensePlate)',
}, {
    name: "SUBSTRING",
    label: "SUBSTRING (expression, start, length)",
    documentation: "Returns part of a character or a text.",
    parameters: [{
        label: "expression",
        documentation: "Is a character expression or a column of type nvarchar(max).",
    }, {
        label: "start",
        documentation: "Is a bigint expression that specifies where the returned characters start. If start is less than 1, the returned expression will begin at the first character that is specified in expression. In this case, the number of characters that are returned is the largest value of either the sum of start + length- 1 or 0. If start is greater than the number of characters in the value expression, a zero-length expression is returned.",
    }, {
        label: "length",
        documentation: "Is a positive bigint expression that specifies how many characters of the expression will be returned. If length is negative, an error is generated and the statement is terminated. If the sum of start and length is greater than the number of characters in expression, the whole value expression beginning at start is returned",
    }],
    example: "SUBSTRING (LicensePlate, 1, 3)",
}, {
    name: "REPLICATE",
    label: "REPLICATE ( string_expression , integer_expression )",
    documentation: "Repeats a string value a specified number of times.",
    parameters: [{
        label: "string_expression",
        documentation: "Is an expression of a character string or binary data type.",
    }, {
        label: "integer_expression",
        documentation: "Is an expression of any integer type, including bigint. If integer_expression is negative, NULL is returned",
    }],
    example: "REPLICATE('0', 4)",
}, {
    name: "REVERSE",
    label: "REVERSE ( string_expression )",
    documentation: "Returns the reverse order of a string value.",
    parameters: [{
        label: "string_expression",
        documentation: "string_expression is an expression of a string or binary data type. string_expression can be a constant, variable, or column of either character or binary data.",
    }],
    example: "REVERSE('FirstName')",
}, {
    name: "SPACE",
    label: "SPACE ( integer_expression )",
    documentation: "Returns a string of repeated spaces.",
    parameters: [{
        label: "integer_expression",
        documentation: "Is a positive integer that indicates the number of spaces. If integer_expression is negative, a null string is returned.",
    }],
    example: "SPACE(2)",
}, {
    name: "STUFF",
    label: "STUFF ( character_expression , start , length , replaceWith_expression )",
    documentation: "The STUFF function inserts a string into another string. It deletes a specified length of characters in the first string at the start position and then inserts the second string into the first string at the start position.",
    parameters: [{
        label: "character_expression",
        documentation: "Is an expression of character data. character_expression can be a constant, variable, or column of either character or binary data",
    }, {
        label: "start",
        documentation: "Is an integer value that specifies the location to start deletion and insertion.",
    }, {
        label: "length",
        documentation: "Is an integer that specifies the number of characters to delete.",
    }, {
        label: "replaceWith_expression",
        documentation: "Is an expression of character data. character_expression can be a constant, variable, or column of either character or binary data. This expression replaces length characters of character_expression beginning at start.",
    }],
    example: "STUFF('abcdef', 2, 3, 'ijklmn')",
}, {
    name: "TRANSLATE",
    label: "TRANSLATE ( inputString, characters, translations)",
    documentation: "Returns the string provided as a first argument after some characters specified in the second argument are translated into a destination set of characters specified in the third argument.",
    parameters: [{
        label: "inputString",
        documentation: "Is the string expression to be searched. inputString can be any character data type (nvarchar, varchar, nchar, char).",
    }, {
        label: "characters",
        documentation: "Is a string expression containing characters that should be replaced. characters can be any character data type.",
    }, {
        label: "translations",
        documentation: " Is a string expression containing the replacement characters. translations must be the same data type and length as characters.",
    }],
    example: "TRANSLATE('2*[3+4]/{7-2}', '[]{}', '()()')",
}, {
    name: "LEFT",
    label: "LEFT ( character_expression , integer_expression )",
    documentation: "Returns the left part of a character string with the specified number of characters.",
    parameters: [{
        label: "character_expression",
        documentation: "Is an expression of character or binary data. character_expression can be a constant, variable, or column. character_expression can be of any data type, except text or ntext, that can be implicitly converted to varchar or nvarchar.",
    }, {
        label: "integer_expression",
        documentation: "Is a positive integer that specifies how many characters of the character_expression will be returned.",
    }],
    example: "LEFT('abcdefg',2)",
}, {
    name: "RIGHT",
    label: "RIGHT ( character_expression , integer_expression )",
    documentation: "Returns the right part of a character string with the specified number of characters.",
    parameters: [{
        label: "character_expression",
        documentation: "Is an expression of character or binary data. character_expression can be a constant, variable, or column. character_expression can be of any data type, except text or ntext, that can be implicitly converted to varchar or nvarchar.",
    }, {
        label: "integer_expression",
        documentation: "Is a positive integer that specifies how many characters of the character_expression will be returned.",
    }],
    example: "RIGHT('abcdefg',2)",
},

// JSON related functions
{
    name: "ISJSON",
    label: "ISJSON (expression)",
    documentation: "Tests whether a string contains valid JSON. Returns 1 if the string contains valid JSON; otherwise, returns 0. Returns null if expression is null.",
    parameters: [{
        label: "expression",
        documentation: "Is a character expression.",
    }],
    example: "ISJSON(json_col)",
}, {
    name: "JSON_VALUE",
    label: "JSON_VALUE (expression, path)",
    documentation: "Extracts a scalar value from a JSON string.",
    parameters: [{
        label: "expression",
        documentation: "An expression. Typically the name of a variable or a column that contains JSON text.",
    }, {
        label: "path",
        documentation: "A JSON path that specifies the property to extract. If the format of path isn't valid, JSON_VALUE returns an error.",
    }],
    example: "JSON_VALUE(jsonInfo,'$.info.address[0].town')",
}, {
    name: "JSON_PARSE",
    label: "JSON_PARSE (expression [, options)",
    documentation:  "Converts a JSON strings into a json object.",
    parameters: [{
        label: "expression",
        documentation: "The string in the form of a JSON-formatted value or a property bag to parse as JSON.",
    }, {
        label: "options",
        documentation: "Optional configuration for users to choose what happens when the fails to convert string into an object.",
    }],
    example: "JSON_PARSE(event.old, FailOnError)",
}, {
    name: "JSON_QUERY",
    label: "JSON_QUERY (expression [, path])",
    documentation: "Extracts an object or an array from a JSON string.",
    parameters: [{
        label: "expression",
        documentation: "An expression. Typically the name of a variable or a column that contains JSON text.",
    }, {
        label: "path",
        documentation: "A JSON path that specifies the property to extract. If the format of path isn't valid, JSON_VALUE returns an error.",
    }],
    example: "JSON_QUERY(CustomFields,'$.OtherLanguages')",
}, {
    name: "JSON_MODIFY",
    label: "JSON_MODIFY (expression, path, newValue)",
    documentation: "Updates the value of a property in a JSON string and returns the updated JSON string.",
    parameters: [{
        label: "expression",
        documentation: "An expression. Typically the name of a variable or a column that contains JSON text.",
    }, {
        label: "path",
        documentation: "A JSON path expression that specifies the property to update. path has the following syntax: [append] [lax | strict] $.<json path>",
    }, {
        label: "newValue",
        documentation: "The new value for the property specified by path",
    }],
    example: "JSON_MODIFY(@info,'append $.skills','Azure')",
}, {
    name: "JSON_STRINGIFY",
    label: "JSON_STRINGIFY (expression)",
    documentation: "Convert a Record specified by the expression to json string.",
    parameters: [{
        label: "expression",
        documentation: "An expression. Typically the name of a variable or a column that contains JSON text.",
    }],
    example: "JSON_STRINGIFY(CustomFields)",
}];

export const BuiltinFunctions = RegularFunctions.concat(WindowsFunctions).concat(TableValueFunctions).concat(SystemFunctions);
