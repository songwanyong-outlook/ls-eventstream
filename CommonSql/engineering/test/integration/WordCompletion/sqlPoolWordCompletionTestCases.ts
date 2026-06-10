import { ISqlWordCompletionTestCase } from "./sqlWordCompletionTestCaseGenerator";

const sqlPoolWordCompletionSelectQueryTestCases: ISqlWordCompletionTestCase[] = [
    {
        partialScript: "",
        expectedSuggestions: ["SELECT", "CREATE", "ALTER", "DROP", "DBCC"],
        unexpectedSuggestions: ["FROM"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT ",
        expectedSuggestions: ["DISTINCT", "TOP", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6", "viewColumnTest1", "viewColumnTest2"],
        unexpectedSuggestions: ["SELECT", "FROM", "tableTest2", "ABORT_AFTER_WAIT", "ABOVE_NORMAL"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tempColumnA, ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6", "viewColumnTest1", "viewColumnTest2"],
        unexpectedSuggestions: ["SELECT", "FROM", "tableTest2", "ABORT_AFTER_WAIT", "ABOVE_NORMAL", "tempColumnA"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT * FROM ",
        expectedSuggestions: ["SELECT", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["FROM", "tableTest2", "viewTest2", "tableColumnTest1", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT * FROM tempTableA, ",
        expectedSuggestions: ["SELECT", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["FROM", "tableTest2", "viewTest2", "tableColumnTest1", "viewColumnTest1", "tempTableA"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT * FROM schemaTest1.",
        expectedSuggestions: ["tableTest2", "viewTest2"],
        unexpectedSuggestions: ["defaultSchemaTest", "tableTest1", "tableColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM ",
        expectedSuggestions: ["defaultSchemaTest", "tableTest1"],
        unexpectedSuggestions: ["tableTest2", "viewTest1", "viewTest2", "tableTest3",  "tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 WHERE ",
        expectedSuggestions: ["tableTest1", "tableColumnTest1", "tableColumnTest2", "defaultSchemaTest", "schemaTest1"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE ",
        expectedSuggestions: ["tableTest1Alias", "tableTest1", "tableColumnTest1", "tableColumnTest2", "defaultSchemaTest", "schemaTest1"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE tableTest1.",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1Alias", "tableTest1", "tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1Alias", "tableTest1", "tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY ",
        expectedSuggestions: ["ALL", "tableColumnTest1", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableTest1.tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY ",
        expectedSuggestions: ["tableColumnTest1", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 AS columnAlias FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY ",
        expectedSuggestions: ["tableColumnTest1", "columnAlias", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY tableColumnTest1 HAVING ",
        expectedSuggestions: ["tableColumnTest1", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableColumnTest2", "tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableTest1.tableColumnTest1 FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY tableColumnTest1 HAVING ",
        expectedSuggestions: ["tableColumnTest1", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableColumnTest2", "tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 AS columnAlias FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY tableColumnTest1 HAVING ",
        expectedSuggestions: ["columnAlias", "tableColumnTest1", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableColumnTest2", "tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 AS columnAlias FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 HAVING tableTest1Alias.",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 AS columnAlias FROM tableTest1 AS tableTest1Alias WHERE tableTest1Alias.tableColumnTest2 > 10 GROUP BY tableColumnTest1 HAVING tableColumnTest1 > 10 ORDER BY ",
        expectedSuggestions: ["tableColumnTest1", "columnAlias", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest1Alias"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    // multiple types of table sources
    // <1> multiple table sources
    {
        partialScript: "SELECT * FROM tableTest1, schemaTest1.tableTest2 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest2", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tableTest3", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableTest1.tableColumnTest1, schemaTest1.tableTest2.tableColumnTest3 FROM tableTest1, schemaTest1.tableTest2 WHERE tableTest1.tableColumnTest1 > 10 HAVING ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest2", "tableColumnTest1", "tableColumnTest3"],
        unexpectedSuggestions: ["tableTest3", "tableColumnTest2", "tableColumnTest4",  "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase
    ,
    // <2> with join part
    {
        partialScript: "SELECT * FROM tableTest1 RIGHT JOIN  ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["tableTest2", "viewTest2", "tableTest1",  "tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableTest1.tableColumnTest1, schemaTest1.tableTest2.tableColumnTest3 FROM tableTest1 RIGHT JOIN schemaTest1.tableTest2 ON ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest2", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tableTest3", "tableColumnTest5"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT * FROM tableTest1 INNER JOIN schemaTest1.tableTest2 AS t2 ON ",
        expectedSuggestions: ["tableTest1", "t2", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest3"],
        unexpectedSuggestions: ["tableTest3", "tableColumnTest5"],
    } as ISqlWordCompletionTestCase
    ,
    // <3> from derived table
    {
        partialScript: "SELECT * FROM ( SELECT tableColumnTest3 FROM schemaTest1.tableTest2 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tableTest1", "tableTest3", "viewTest2", "tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT * FROM ( SELECT tableColumnTest3 FROM schemaTest1.tableTest2) WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableColumnTest3"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest2", "tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    // {
    //     partialScript: "SELECT * FROM ( SELECT tableColumnTest3 FROM schemaTest1.tableTest2) AS tableAlias WHERE ",
    //     expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableAlias", "tableColumnTest3"],
    //     unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest2", "tableColumnTest1", "tableColumnTest2"],
    // } as ISqlWordCompletionTestCase
    // ,
    // {
    //     partialScript: "SELECT * FROM ( SELECT tableColumnTest3 FROM schemaTest1.tableTest2) AS tableAlias WHERE tableAlias.",
    //     expectedSuggestions: ["tableColumnTest3"],
    //     unexpectedSuggestions: ["tableAlias", "tableTest1", "tableTest2", "tableTest3", "viewTest2", "tableColumnTest1", "tableColumnTest2"],
    // } as ISqlWordCompletionTestCase
    // ,
    // {
    //     partialScript: "SELECT * FROM ( SELECT tableColumnTest3 FROM schemaTest1.tableTest2) AS tempTable (c1) WHERE ",
    //     expectedSuggestions: ["tempTable", "c1"],
    //     unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "tableColumnTest1", "tableColumnTest2"],
    // } as ISqlWordCompletionTestCase
    // ,
    // column name, column expression, column alias
    {
        partialScript: "SELECT tableColumnTest1 AS tc1 FROM tableTest1 WHERE ",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tc1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT SUM(tableColumnTest1) AS tc1 FROM tableTest1 WHERE ",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tc1", "SUM(tableColumnTest1)"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT tableColumnTest1 AS tc1 FROM tableTest1 WHERE tableColumnTest1 > 10 HAVING ",
        expectedSuggestions: ["tableColumnTest1", "tc1"],
        unexpectedSuggestions: ["tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT SUM(tableColumnTest1) AS tc1 FROM tableTest1 WHERE tableColumnTest1 > 10 HAVING ",
        expectedSuggestions: ["tc1"],
        unexpectedSuggestions: ["SUM(tableColumnTest1)", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT SUM(tableColumnTest1) FROM tableTest1 WHERE tableColumnTest1 > 10 HAVING ",
        expectedSuggestions: ["SUM(tableColumnTest1)"],
        unexpectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT [p1 p2 p3] AS tc1 FROM tableTest1 WHERE tableColumnTest1 > 10 HAVING ",
        expectedSuggestions: ["tc1", "[p1 p2 p3]"],
        unexpectedSuggestions: ["tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "SELECT [p1 p2 p3] FROM tableTest1 WHERE tableColumnTest1 > 10 HAVING ",
        expectedSuggestions: ["[p1 p2 p3]"],
        unexpectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase,
];

const sqlPoolWordCompletionWithExpressionTestCases: ISqlWordCompletionTestCase[] = [
    {
        partialScript: "WITH tempTable (c1, c2, c3) AS ( SELECT * FROM ",
        expectedSuggestions: ["SELECT", "defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["tempTable", "c1", "tableTest2", "tableColumnTest1", "tableColumnTest3"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "WITH tempTable (c1, c2, c3) AS ( SELECT * FROM tableTest3 WHERE tableColumnTest5 > 10 ) SELECT  ",
        expectedSuggestions: ["tempTable", "c1", "c2", "c3"],
        unexpectedSuggestions: ["SELECT", "FROM", "tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH 
                        tempTable1 (c1, c2, c3) AS ( SELECT * FROM tableTest3 WHERE tableColumnTest5 > 10 ),
                        tempTable2 (c4, c5, c6) AS ( SELECT `,
        expectedSuggestions: ["tempTable1", "c1", "c2", "c3"],
        unexpectedSuggestions: ["tempTable2", "c4", "c5", "c6"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH
                        tempTable1 (c1, c2, c3) AS ( SELECT * FROM tableTest3 WHERE tableColumnTest5 > 10 ),
                        tempTable2 AS ( SELECT * FROM schemaTest1.tableTest2 )
                        SELECT `,
        expectedSuggestions: ["tempTable1", "tempTable2", "c1", "c2", "c3", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6"],
        unexpectedSuggestions: ["tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH
                        tempTable1 (c1, c2, c3) AS ( SELECT * FROM tableTest3 WHERE tableColumnTest5 > 10 ),
                        tempTable2 AS ( SELECT * FROM schemaTest1.tableTest2 )
                        SELECT * FROM tempTable2 WHERE `,
        expectedSuggestions: ["tempTable2",  "tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tempTable1", "tableTest1", "c1", "c2", "c3", "tableColumnTest1", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6", "tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH taxi_rides AS
        (
            SELECT CAST([tpepPickupDateTime] AS date) AS [current_day], COUNT(*) as rides_per_day FROM a
        ),
        public_holidays AS
        (
            SELECT holidayname as holiday, h_date FROM a
        )
        SELECT
        *
        FROM taxi_rides t
        LEFT OUTER JOIN `,
        expectedSuggestions: ["public_holidays"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH taxi_rides AS
        (
            SELECT CAST([tpepPickupDateTime] AS date) AS [current_day], COUNT(*) as rides_per_day FROM a
        ),
        public_holidays AS
        (
            SELECT holidayname as holiday, h_date FROM a
        )
        SELECT
        *
        FROM taxi_rides t
        LEFT OUTER JOIN public_holidays p ON `,
        expectedSuggestions: ["taxi_rides", "public_holidays", "t", "p", "[current_day]", "rides_per_day", "holiday", "h_date"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH taxi_rides AS
        (
            SELECT CAST([tpepPickupDateTime] AS date) AS [current_day], COUNT(*) as rides_per_day FROM a
        ),
        public_holidays AS
        (
            SELECT holidayname as holiday, h_date FROM a
        )
        SELECT
        *
        FROM taxi_rides t
        LEFT OUTER JOIN public_holidays p ON t.`,
        expectedSuggestions: ["[current_day]", "rides_per_day"],
        unexpectedSuggestions: ["taxi_rides", "public_holidays", "t", "p", "holiday", "h_date"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH taxi_rides AS
        (
            SELECT CAST([tpepPickupDateTime] AS date) AS [current_day], COUNT(*) as rides_per_day FROM a
        ),
        public_holidays AS
        (
            SELECT holidayname as holiday, h_date FROM a
        )
        SELECT
        *
        FROM taxi_rides t
        LEFT OUTER JOIN public_holidays p ON t.[current_day] = `,
        expectedSuggestions: ["public_holidays", "p", "holiday", "h_date"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `WITH taxi_rides AS
        (
            SELECT CAST([tpepPickupDateTime] AS date) AS [current_day], COUNT(*) as rides_per_day FROM a
        ),
        public_holidays AS
        (
            SELECT holidayname as holiday, h_date FROM a
        )
        SELECT
        *
        FROM taxi_rides t
        LEFT OUTER JOIN public_holidays p ON t.[current_day] = p.`,
        expectedSuggestions: ["holiday", "h_date"],
        unexpectedSuggestions: ["public_holidays", "p", "[current_day]", "rides_per_day"],
    } as ISqlWordCompletionTestCase,
];

const sqlPoolWordCompletionDmlStatementsTestCases: ISqlWordCompletionTestCase[] = [
    // DELETE statement
    {
        partialScript: "DELETE FROM ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["FROM", "tableTest2", "viewTest2", "tableColumnTest1", "tableColumnTest3", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "DELETE FROM tableTest1 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tableTest2", "viewTest2", "tableColumnTest3", "tableColumnTest4", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    // INSERT statement
    {
        partialScript: "INSERT INTO ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["FROM", "tableTest2", "viewTest2", "tableColumnTest1", "tableColumnTest3", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "INSERT INTO tableTest1 (SELECT tableColumnTest3 FROM ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["FROM", "tableTest2", "viewTest2", "tableColumnTest1", "tableColumnTest3", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "INSERT INTO tableTest1 (SELECT tableColumnTest3 FROM schemaTest1.tableTest2 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tableTest1", "tableTest3", "tableColumnTest1", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "INSERT INTO tableTest1 (SELECT tableColumnTest3 FROM schemaTest1.tableTest2) ",
        expectedSuggestions: ["OPTION"],
        unexpectedSuggestions: ["WHERE"],
    } as ISqlWordCompletionTestCase
    // ,
    // {
    //     partialScript: "INSERT INTO tableTest1 (SELECT tableColumnTest3 FROM schemaTest1.tableTest2) 
    //                     SELECT * FROM tableTest1 WHERE ",
    //     expectedSuggestions: ["tableColumnTest3"],
    //     unexpectedSuggestions: ["tableColumnTest4"]
    // } as ISqlWordCompletionTestCase
    ,
    // {
    //     partialScript: "INSERT INTO tableTest1 (SELECT tableColumnTest3 FROM schemaTest1.tableTest2) 
    //                     SELECT * FROM tableTest1 WHERE tableTest1.",
    //     expectedSuggestions: ["tableColumnTest1", "tableColumnTest2", "tableColumnTest3"],
    //     unexpectedSuggestions: ["tableColumnTest4"]
    // } as ISqlWordCompletionTestCase
    // ,
    // UPDATE statement
    {
        partialScript: "UPDATE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["FROM", "tableTest2", "viewTest2", "tableColumnTest1", "tableColumnTest3", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE schemaTest1.tableTest2 SET ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tableTest1", "tableTest3", "viewTest2", "tableColumnTest1", "tableColumnTest2", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE schemaTest1.tableTest2 SET tableColumnTest3 = \"t3\" FROM  ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["tableTest2", "viewTest2", "tableColumnTest1", "tableColumnTest3", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE schemaTest1.tableTest2 SET tableColumnTest3 = \"t3\" FROM schemaTest1.tableTest2 JOIN ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["tableTest2", "viewTest2", "tableColumnTest1", "tableColumnTest3", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE schemaTest1.tableTest2 SET tableColumnTest3 = \"t3\" FROM schemaTest1.tableTest2 JOIN tableTest3 ON ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6"],
        unexpectedSuggestions: ["tableTest1", "viewTest1", "tableColumnTest1", "tableColumnTest2", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE t2 SET tableColumnTest3 = \"t3\" FROM schemaTest1.tableTest2 AS t2 JOIN tableTest3 AS t3 ON ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableTest3", "t2", "t3", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6"],
        unexpectedSuggestions: ["tableTest1", "viewTest1", "tableColumnTest1", "tableColumnTest2", "viewColumnTest1"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE t2 SET tableColumnTest3 = \"t3\" FROM schemaTest1.tableTest2 AS t2 JOIN tableTest3 AS t3 ON t2.",
        expectedSuggestions: ["tableColumnTest3", "tableColumnTest4"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "viewTest1", "tableColumnTest1", "tableColumnTest2", "viewColumnTest5"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE schemaTest1.tableTest2 SET tableColumnTest3 = \"t3\" FROM schemaTest1.tableTest2 JOIN tableTest3 ON tableColumnTest3 > tableColumnTest5 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6"],
        unexpectedSuggestions: ["tableTest1", "viewTest1", "tableColumnTest1", "tableColumnTest2", "viewColumnTest5"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "UPDATE t2 SET tableColumnTest3 = \"t3\" FROM schemaTest1.tableTest2 AS t2 JOIN tableTest3 AS t3 ON tableColumnTest3 > tableColumnTest5 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest2", "tableTest3", "t2", "t3", "tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6"],
        unexpectedSuggestions: ["tableTest1", "viewTest1", "tableColumnTest1", "tableColumnTest2", "viewColumnTest5"],
    } as ISqlWordCompletionTestCase
    ,
    // RENAME statement
    {
        partialScript: "RENAME OBJECT ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "viewTest1", "viewTest2", "tableColumnTest1", "tableColumnTest2", "viewColumnTest5"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "RENAME OBJECT :: ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "viewTest1", "viewTest2", "tableColumnTest1", "tableColumnTest2", "viewColumnTest5"],
    } as ISqlWordCompletionTestCase,
];

const sqlPoolWordCompletionDdlStatementsTestCases: ISqlWordCompletionTestCase[] = [
    // alter schema
    {
        partialScript: "ALTER SCHEMA ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "tableColumnTest1", "tableColumnTest2", "tableTest3"],
    } as ISqlWordCompletionTestCase
    ,
    // alter table
    {
        partialScript: "ALTER TABLE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "ALTER TABLE tableTest1 ALTER COLUMN ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4", "tableTest3"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "ALTER TABLE tableTest1 DROP COLUMN ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4", "tableTest3"],
    } as ISqlWordCompletionTestCase
    ,
    // alter view
    {
        partialScript: "ALTER VIEW ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "viewTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4", "viewTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "ALTER VIEW viewTest1 AS SELECT * FROM ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3", "viewTest1"],
        unexpectedSuggestions: ["tableTest2", "tableColumnTest3", "tableColumnTest4", "viewTest2"],
    } as ISqlWordCompletionTestCase
    ,
    // {
    //     partialScript: "ALTER VIEW viewTest1 AS SELECT * FROM tableTest1 WHERE ",
    //     expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableColumnTest1", "tableColumnTest2"],
    //     unexpectedSuggestions: ["tableTest2", "tableColumnTest3", "tableColumnTest4", "viewTest1"]
    // } as ISqlWordCompletionTestCase
    // ,
    // create_columnstore_index
    {
        partialScript: "CREATE CLUSTERED COLUMNSTORE INDEX ON ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "tableColumnTest3", "tableColumnTest4", "viewTest1"],
    } as ISqlWordCompletionTestCase
    ,
    // create table
    {
        partialScript: `CREATE TABLE tempCreatedTable (c1 int, c2 int, c3 int)
                        SELECT `,
        expectedSuggestions: ["tempCreatedTable", "c1", "c2", "c3"],
        unexpectedSuggestions: ["tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE tempCreatedTable (c1 int, c2 int, c3 int)
                        SELECT tempCreatedTable.`,
        expectedSuggestions: ["c1", "c2", "c3"],
        unexpectedSuggestions: ["tempCreatedTable", "tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE tempCreatedSchema.tempCreatedTable (c1 int, c2 int, c3 int)
                        SELECT `,
        expectedSuggestions: ["tempCreatedSchema", "c1", "c2", "c3"],
        unexpectedSuggestions: ["tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE tempCreatedSchema.tempCreatedTable (c1 int, c2 int, c3 int)
                        SELECT tempCreatedSchema.`,
        expectedSuggestions: ["tempCreatedTable"],
        unexpectedSuggestions: ["tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE [tempCreatedSchema  secondPart].[tempCreatedTable] (c1 int, c2 int, c3 int)
                        SELECT `,
        expectedSuggestions: ["[tempCreatedSchema  secondPart]", "c1", "c2", "c3"],
        unexpectedSuggestions: ["tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE [tempCreatedSchema  secondPart].[tempCreatedTable] (c1 int, c2 int, c3 int)
                        SELECT [tempCreatedSchema  secondPart].`,
        expectedSuggestions: ["[tempCreatedTable]"],
        unexpectedSuggestions: ["[tempCreatedSchema  secondPart]", "tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    // create_table_as_select skip create external table, create external table with select, create view, since they both share the similar logic.
    {
        partialScript: "CREATE TABLE tempCreatedTable WITH ( DISTRIBUTION = REPLICATE) AS SELECT * FROM ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tempCreatedTable", "tableTest2"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "CREATE TABLE tempCreatedTable WITH ( DISTRIBUTION = REPLICATE) AS SELECT * FROM tableTest1 WHERE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tempCreatedTable", "tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE tempCreatedTable WITH ( DISTRIBUTION = REPLICATE) AS SELECT * FROM tableTest1
                        SELECT * FROM tempCreatedTable WHERE `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tempCreatedTable", "tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE tempCreatedTable (c1, c2) WITH ( DISTRIBUTION = REPLICATE) AS SELECT * FROM tableTest1
                        SELECT * FROM tempCreatedTable WHERE `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tempCreatedTable", "c1", "c2"],
        unexpectedSuggestions: ["tableTest2", "tableTest3", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE TABLE tempCreatedTable (c1, c2) WITH ( DISTRIBUTION = REPLICATE) AS SELECT * FROM tableTest1
                        SELECT * FROM tempCreatedTable WHERE tempCreatedTable.`,
        expectedSuggestions: ["c1", "c2"],
        unexpectedSuggestions: ["tempCreatedTable", "tableTest2", "tableTest3", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // CREATE SCHEMA
    {
        partialScript: `CREATE SCHEMA createdSchema
                        DROP SCHEMA `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "createdSchema"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // DROP SCHEMA
    {
        partialScript: "DROP SCHEMA ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "tableColumnTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // DROP TABLE
    {
        partialScript: "DROP TABLE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "viewTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // DROP EXTERNAL TABLE
    {
        partialScript: "DROP EXTERNAL TABLE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "viewTest1", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // DROP VIEW
    {
        partialScript: "DROP VIEW ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "viewTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // DROP PROCEDURE
    {
        partialScript: "DROP PROCEDURE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: "DROP PROC ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // TRUNCATE TABLE
    {
        partialScript: "TRUNCATE TABLE ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest1", "tableTest3"],
        unexpectedSuggestions: ["tableTest2", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // CREATE PROCEDURE
    {
        partialScript: `CREATE PROC createdProc AS SELECT * FROM tableTest1 
                        DROP PROCEDURE `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1", "createdProc"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    {
        partialScript: `CREATE OR ALTER PROC createdProc AS SELECT * FROM tableTest1 
                        DROP PROCEDURE `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1", "createdProc"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase
    ,
    // ALTER PROCEDURE
    {
        partialScript: "ALTER PROC ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE OR ALTER PROC ",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1"],
        unexpectedSuggestions: ["tableTest1", "tableTest2", "tableTest3", "viewTest1", "viewTest2", "tableColumnTest2", "tableColumnTest3", "tableColumnTest4"],
    } as ISqlWordCompletionTestCase,
    // CREATE FUNCTION
    {
        partialScript: `CREATE FUNCTION createdFunc () RETURNS int BEGIN RETURN 0 END;
                        SELECT `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "createdFunc"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: `CREATE FUNCTION schemaTest1.createdFunc () RETURNS int BEGIN RETURN 0 END;
                        SELECT `,
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1"],
        unexpectedSuggestions: ["createdFunc"],
    } as ISqlWordCompletionTestCase,
    // add context analysis for treeview based intellisense
    {
        partialScript: "SELECT schemaTest1.",
        expectedSuggestions: ["tableTest2", "viewTest2", "tableFunctionTest2"],
        unexpectedSuggestions: ["storedProcedureTest2"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * FROM schemaTest1.",
        expectedSuggestions: ["tableTest2", "viewTest2"],
        unexpectedSuggestions: ["tableFunctionTest2", "storedProcedureTest2"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE INDEX index1 ON ",
        expectedSuggestions: ["tableTest1", "tableTest3", "tableTest4", "defaultSchemaTest", "schemaTest1"],
        unexpectedSuggestions: ["tableTest2"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE INDEX index1 ON tableTest1 (",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2", "tableTest1", "defaultSchemaTest", "schemaTest1", "functionTest1"],
        unexpectedSuggestions: ["tableColumnTest3", "tableColumnTest4", "tableColumnTest5", "tableColumnTest6", "tableTest2"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE INDEX index1 ON schemaTest1.tableTest2 (",
        expectedSuggestions: ["tableColumnTest3", "tableColumnTest4", "tableTest2", "schemaTest1", "functionTest1"],
        unexpectedSuggestions: ["tableColumnTest1", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6", "tableTest1"],
    } as ISqlWordCompletionTestCase,
    // should not give suggestions
    {
        partialScript: "CREATE SCHEMA ",
        expectedSuggestions: [],
        unexpectedSuggestions: ["schemaTest1"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE TABLE ",
        expectedSuggestions: [],
        unexpectedSuggestions: ["schemaTest1", "tableTest1"],
    } as ISqlWordCompletionTestCase,
];

const sqlPoolNonReservedKeywordsTestCases: ISqlWordCompletionTestCase[] = [
    {
        partialScript: "SELECT  ",
        expectedSuggestions: [],
        unexpectedSuggestions: ["ABORT_AFTER_WAIT", "ABOVE_NORMAL"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "",
        expectedSuggestions: ["COPY"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
];

const intellicodeTestCases: ISqlWordCompletionTestCase[] = [
    {
        partialScript: "SELECT ",
        expectedSuggestions: ["TOP", "DISTINCT"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * ",
        expectedSuggestions: ["FROM", "AS"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * FROM tableTest1 ",
        expectedSuggestions: ["WHERE", "AS"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE ",
        expectedSuggestions: ["FUNCTION", "PROC", "PROCEDURE", "TABLE", "VIEW"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT tableColumnTest1 FROM ",
        expectedSuggestions: ["tableTest1"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT tableColumnTest1 FROM tableTest1 AS t1 WHERE ",
        expectedSuggestions: ["tableTest1", "tableColumnTest1", "tableColumnTest2", "t1"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT tableColumnTest1 AS tc1 FROM tableTest1 AS t1 HAVING ",
        expectedSuggestions: ["tc1", "tableColumnTest1", "tableTest1", "t1"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
];

const otherTestCases: ISqlWordCompletionTestCase[] = [
    {
        partialScript: "",
        expectedSuggestions: ["defaultSchemaTest", "schemaTest1", "storedProcedureTest1"],
        unexpectedSuggestions: ["tableTest1", "viewTest1", "tableFunctionTest1"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "CREATE TABLE tTable (c1 ",
        expectedSuggestions: ["AS", "DATETIME"],
        unexpectedSuggestions: ["ALTER", "SELECT"],
    } as ISqlWordCompletionTestCase,
    // builtin functions
    {
        partialScript: "SELECT ",
        expectedSuggestions: ["COUNT"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * FROM ",
        expectedSuggestions: [],
        unexpectedSuggestions: ["COUNT"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * FROM tableTest1.",
        expectedSuggestions: [],
        unexpectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * FROM tableTest1 WHERE tableTest1.",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: [],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT * FROM tableTest1 WHERE ",
        expectedSuggestions: [],
        unexpectedSuggestions: ["tableTest3"],
    } as ISqlWordCompletionTestCase,
];

const noSchemaSupportTestCases: ISqlWordCompletionTestCase[] = [
    {
        partialScript: "SELECT ",
        expectedSuggestions: ["tableTest1", "tableTest3", "tableTest4", "tableTest4", "tableColumnTest1", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6"],
        unexpectedSuggestions: ["defaultSchemaTest", "schemaTest1"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "SELECT tableColumnTest1 FROM ",
        expectedSuggestions: ["tableTest1"],
        unexpectedSuggestions: ["defaultSchemaTest", "schemaTest1", "tableTest3", "tableTest4", "tableTest4", "tableColumnTest1", "tableColumnTest2", "tableColumnTest5", "tableColumnTest6"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "WITH createdTable AS (SELECT * FROM tableTest1) SELECT ",
        expectedSuggestions: ["createdTable"],
        unexpectedSuggestions: ["defaultSchemaTest", "schemaTest1"],
    } as ISqlWordCompletionTestCase,
    {
        partialScript: "WITH createdTable AS (SELECT * FROM tableTest1) SELECT createdTable.",
        expectedSuggestions: ["tableColumnTest1", "tableColumnTest2"],
        unexpectedSuggestions: ["defaultSchemaTest", "schemaTest1"],
    } as ISqlWordCompletionTestCase,
];

const sqlPoolWordCompletionTestCases = sqlPoolWordCompletionSelectQueryTestCases
    .concat(sqlPoolWordCompletionWithExpressionTestCases)
    .concat(sqlPoolWordCompletionDmlStatementsTestCases)
    .concat(sqlPoolWordCompletionDdlStatementsTestCases)
    .concat(sqlPoolNonReservedKeywordsTestCases)
    .concat(otherTestCases);

export { sqlPoolWordCompletionTestCases, intellicodeTestCases, noSchemaSupportTestCases };
