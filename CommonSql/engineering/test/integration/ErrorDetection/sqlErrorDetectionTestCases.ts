import { IErrorMarkItem, Severity } from '@CommonSqlUtils/Utils';
import { SemanticErrors } from '@CommonSqlCore/src/language-service/ErrorDetection/SemanticErrors';

export const ScriptsWithoutSyntaxError: string[] = [
    "",
    ";",
    ";;",
    // timestamp as column alias
    "SELECT column1 AS Timestamp, 2 AS TWO, column3 AS alias3 INTO output1 FROM input1",

    // timestamp as column name
    "SELECT timestamp, timestamp AS timestamp2 INTO output1 FROM input1",

    "Select BIGINT AS bigint, Float AS float, decimal as DECIMAL, dateTime as DateTime, Bit as BIT, RECORD AS record, array as array FROM input1",

    // timestamp as input alias
    "SELECT timestamp, timestamp AS timestamp2 INTO output1 FROM input1 AS TIMESTAMP",

    " WITH tempTable AS (SELECT * INTO a FROM b TIMESTAMP BY c PARTITION BY d WHERE e > 0 GROUP BY e HAVING e> 10) ",
    "WITH tempTable AS (SELECT * INTO a FROM b TIMESTAMP BY c PARTITION BY d WHERE e > 0 GROUP BY e HAVING e> 10);;;",
    " SELECT * INTO a FROM b",
    "SELECT * INTO a FROM b;;;",
    "SELECT SYSTEM.Timestamp AS windowEnd INTO OutputBlob1 FROM EventHubs",
    "SELECT sYsTeM.TIMESTAMP AS windowEnd INTO OutputBlob1 FROM EventHubs",
    "SELECT SYSTEM.TIMESTAMP() as windowEnd INTO OutputBlob1 FROM EventHubs",
    "SELECT System.Window().Id,name,avg(value) as avg_value INTO output1 FROM input1 TIMESTAMP BY EntryTime GROUP BY name,Windows(Window('5_seconds', TumblingWindow(second, 5)),Window('10_seconds', TumblingWindow(second, 10)))",
    "SELECT NULLIF(fst + 1, snd) AS ab FROM input",
    "SELECT COUNT(*) INTO Output FROM Input1 GROUP BY HoppingWindow(DURATION(hour,1), HOP(minute,20))",
    "SELECT 1 AS alert FROM input WHERE MAX(healthy) OVER (PARTITION BY id LIMIT DURATION (hour, 1)) = 0",
    "SELECT AVG(temperature) OVER (PARTITION BY id LIMIT DURATION (minute, 5)) FROM input",
    `
        SELECT *
        INTO output FROM input TIMESTAMP BY time
            MATCH_RECOGNIZE (
                LIMIT DURATION (minute, 1)
                PARTITION BY tollBoothId
                MEASURES
                    Last(Toyota.LicensePlate) AS toyotaLicensePlate,
                    Last(Lexus.LicensePlate) AS lexusLicensePlate
                AFTER MATCH SKIP TO NEXT ROW
                PATTERN (Toyota+ Ford* Lexus+)
                DEFINE
                    Toyota AS Toyota.make = 'Toyota',
                    Ford AS Ford.make = 'Ford',
                    Lexus AS Lexus.make = 'Lexus'
            ) AS T`,
];

export const ScriptsWithSyntaxError: string[] = [
    " SELECT *",
    "SELECT * INTO a FROM b; GO",
    "SELECT AVG(temperature) OVER (PARTITION BY id LIMIT DURATION1 (minute, 5)) FROM input",
    "SELECT AVG(temperature) OVER (PARTITION BY id LIMITS DURATION (minute, 5)) FROM input",
    "CREATE TABLE wrongTblWithInvalidColumnType (column1 double, column2 bigint)",
    "CREATE TABLE wrongTblWithInvalidColumnType (column1 nvarchar(20), column2 nvarchar(max))",
];

export const ScriptsWithoutSemanticError: string[] = [
    `WITH tempTable AS (
        SELECT arrayElement.ArrayIndex,
        arrayElement.ArrayValue
    FROM table1 tableAlias

    CROSS APPLY GETARRAYELEMENTS(events.records) AS arrayElement)`,
    `WITH tempTable AS (
        SELECT arrayElement.ArrayIndex,
        arrayElement.ArrayValue
    FROM table1 tableAlias
    CROSS APPLY GetArrayElements(events.records) AS arrayElement)`,

    `SELECT outter.mid1.inner1, outter.[mid2]."inner2", [outter.mid3.inner3] FROM db1.schema1.table1`, 
];

export const ScriptsWithSemanticError: { script: string; error: IErrorMarkItem }[] = [
    {
        script: `
SELECT * INTO wrong1 FROM table1;
SELECT * INTO wrong2 FROM table2;
SELECT * INTO outputStream2 FROM table3`,
        error: {
            message: "Output 'wrong1' does not exist.",
            line: 2,
            startColumn: 14,
            endColumn: 20,
            severity: Severity.Error,
        },
    }, {
        script: `
SELECT * INTO outputStream1 FROM table1;
SELECT * INTO wrong2 FROM table2;
SELECT * INTO outputStream2 FROM table3`,
        error: {
            message: "Output 'wrong2' does not exist.",
            line: 3,
            startColumn: 14,
            endColumn: 20,
            severity: Severity.Error,
        },
    }, {
        script: `
SELECT * INTO outputStream1 FROM table1;
SELECT * INTO wrong2 FROM table2;`,
        error: {
            message: "Output 'wrong2' does not exist.",
            line: 3,
            startColumn: 14,
            endColumn: 20,
            severity: Severity.Error,
        },
    }, {
        script: `With table1 AS (SELECT * FROM table1)
SELECT * FROM table1`,
        error: {
            message: SemanticErrors.getTableExistsError("table1"),
            line: 1,
            startColumn: 5,
            endColumn: 11,
            severity: Severity.Error,
        },
    }, {
        script: `With [table1] AS (SELECT * FROM table1)
SELECT * FROM table1`,
        error: {
            message: SemanticErrors.getTableExistsError("table1"),
            line: 1,
            startColumn: 6,
            endColumn: 12,
            severity: Severity.Error,
        },
    }, {
        script: `With "table1" AS (SELECT * FROM table1)
SELECT * FROM table1`,
        error: {
            message: SemanticErrors.getTableExistsError("table1"),
            line: 1,
            startColumn: 6,
            endColumn: 12,
            severity: Severity.Error,
        },
    }, {
        script: `
SELECT * FROM (SELECT table1_column1, table1_column2 FROM table1)
AS table2`,
        error: {
            message: SemanticErrors.getTableExistsError("table2"),
            line: 3,
            startColumn: 3,
            endColumn: 9,
            severity: Severity.Error,
        },
    }, {
        script: `
SELECT * FROM (SELECT table1_column1, table1_column2 FROM table1)
AS [table2]`,
        error: {
            message: SemanticErrors.getTableExistsError("table2"),
            line: 3,
            startColumn: 4,
            endColumn: 10,
            severity: Severity.Error,
        },
    }, {
        script: `
SELECT * FROM (SELECT table1_column1, table1_column2 FROM table1)
AS "table2"`,
        error: {
            message: SemanticErrors.getTableExistsError("table2"),
            line: 3,
            startColumn: 4,
            endColumn: 10,
            severity: Severity.Error,
        },
    }, {
        script: 'SELECT * FROM [non_exist_table]',
        error: {
            message: SemanticErrors.getInputNotExistsError("non_exist_table"), // should trim the square brackets
            line: 1,
            startColumn: 15,
            endColumn: 30,
            severity: Severity.Error,
        },
    }, {
        script: `
With table1_alias AS (SELECT * FROM t1)
SELECT * FROM table1_alias`,
        error: {
            message: SemanticErrors.getInputNotExistsError("t1"),
            line: 2,
            startColumn: 36,
            endColumn: 38,
            severity: Severity.Error,
        },
    }, {
        script: `
-- not exists table
SELECT table1_column1, table2_column1
INTO [outputStream1] -- id with [] is supported
FROM "table1" -- table name with "" is supported
JOIN
table2_wrong ON table1.column1 = table2_wrong.column1`,
        error: {
            message: SemanticErrors.getInputNotExistsError("table2_wrong"),
            line: 7,
            startColumn: 0,
            endColumn: 12,
            severity: Severity.Error,
        },
    }, {
        script: `
-- with comments
SELECT table1_column1, table2_column1
INTO output1
FROM table1 JOIN table2 ON table1.column1 = table2.column1`,
        error: {
            message: SemanticErrors.getOutputNotExistsError("output1"),
            line: 4,
            startColumn: 5,
            endColumn: 12,
            severity: Severity.Error,
        },
    }, {
        script: `
-- with comments
SELECT table1_column1, table2_column1
INTO "output1"
FROM table1 JOIN table2 ON table1.column1 = table2.column1`,
        error: {
            message: SemanticErrors.getOutputNotExistsError("output1"),
            line: 4,
            startColumn: 6,
            endColumn: 13,
            severity: Severity.Error,
        },
    }, {
        script: `SELECT table1_column1 FROM [table4] AS aliasTable`,
        error: {
            message: SemanticErrors.getInputNotExistsError("table4"),
            line: 1,
            startColumn: 28,
            endColumn: 34,
            severity: Severity.Error,
        },
    },
];
