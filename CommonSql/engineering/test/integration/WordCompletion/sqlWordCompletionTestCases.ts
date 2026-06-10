export interface ISqlWordCompletionTestCase {
    partialScript: string;
    expectedSuggestions: string[];
    unexpectedSuggestions: string[];
};

/// Meta data for the test cases are located at CommonSql/engineering/test/common/MockSqlMetadataProvider.ts
let sqlWordCompletionTestCases: ISqlWordCompletionTestCase[] = [
/* No need for this
{
    partialScript: " SELECT System.",
    expectedSuggestions: ["Timestamp", "Window"],
    unexpectedSuggestions: [],
},
*/
/* NO UDA 
{
    partialScript: " SELECT  UDA.",
    expectedSuggestions: ["uda1"],
    unexpectedSuggestions: [],
},
*/
/* No need to suggest parameters within Windows, as there is signature help
{
    partialScript: " SELECT System.Timestamp,name,AVG(value) as avg_value INTO output1 FROM input1 TIMESTAMP BY EntryTime GROUP BY name,Windows(",
    expectedSuggestions: ["TumblingWindow", "Window"],
    unexpectedSuggestions: [],
},
{
    partialScript: " SELECT COUNT(*) FROM eventhub1 GROUP BY Windows(HoppingWindow(minute,10,5), ",
    expectedSuggestions: ["Hopping"],
    unexpectedSuggestions: [],
},
*/
/* NO CREATE TABLE
{
    partialScript: " CREATE TABLE mytable (mycolumn nvarchar(max));SELECT ",
    expectedSuggestions: ["mytable", "mycolumn", "table1", "table2", "table1_column1", "table1_column2", "table2_column1", "table2_column2"],
    unexpectedSuggestions: [],
},
{
    partialScript: " CREATE TABLE mytable (mycolumn nvarchar(max));SELECT mytable.",
    expectedSuggestions: ["mycolumn"],
    unexpectedSuggestions: ["table1_column1", "table1_column2", "table2_column1", "table2_column2"],
},
*/
/* No snippet
{
    partialScript: " ",
    expectedSuggestions: ["Snippet:Convert data types(SELECT Query)"],
    unexpectedSuggestions: [],
},
*/
{
    partialScript: " SELECT  ",
    expectedSuggestions: ["table1", "table2", "table1_column1", "table1_column2"],
    unexpectedSuggestions: [],
}, {
    partialScript: `
;;;;SELECT  `,
    expectedSuggestions: ["table1", "table2", "table1_column1", "table1_column2"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT ",
    expectedSuggestions: ["GETARRAYELEMENT", "GETARRAYLENGTH"],
    unexpectedSuggestions: ["GETARRAYELEMENTS", "GETRECORDPROPERTIES"], // No TableValue functions here
}, {
    partialScript: " SELECT ",
    expectedSuggestions: ["COALESCE"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT  table1.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT [table1].",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT \"table1\".",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM ",
    expectedSuggestions: ["table1", ],
    unexpectedSuggestions: ["table1_column1", "table1_column2", "table2_column1", "table2_column2", "table2"],
}, {
    partialScript: " SELECT * FROM DefaultLocalStream TIMESTAMP BY ",
    expectedSuggestions: ["DATEADD"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT table1_column1 INTO output1 FROM table1 TIMESTAMP BY  ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: "SELECT table1_column1 INTO output1 FROM table1 TIMESTAMP BY table1.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: "SELECT table1_column1 INTO output1 FROM table1 PARTITION BY  ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: "SELECT table1_column1 INTO output1 FROM [table1] PARTITION BY  ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: "SELECT table1_column1 INTO output1 FROM table1 PARTITION BY table1.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: "SELECT table1_column1 INTO output1 FROM table1 WHERE ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: "SELECT table1_column1, [table1_column2] INTO output1 FROM [table1] WHERE ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM table1 WHERE table1.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM table1 AS table1_alias WHERE table1_alias.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM [table1] AS table1_alias WHERE table1_alias.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM table1 WHERE table1.table1_column1 > 10 GROUP BY ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2", "STRING_AGG", "SUM", "AVG", "COUNT", "MAX", "MIN"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM table1 WHERE table1.table1_column1 >0 HAVING ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 INTO output1 FROM [table1] WHERE table1.[table1_column1] > 0 HAVING ",
    expectedSuggestions: ["table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1, table2_column1 INTO output1 FROM table1 JOIN ",
    expectedSuggestions: ["table2", "table1"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT table1_column1, table2_column1 INTO output1 FROM table1 JOIN table2 ON ",
    expectedSuggestions: ["table1", "table2", "table1_column1", "table1_column2", "table2_column1", "table2_column2"],
    unexpectedSuggestions: [],
},
{
    partialScript: " SELECT ",
    expectedSuggestions: ["AVG", "COLLECTTOP", "PERCENTILE_CONT", "STDEVP", "VAR", "COUNT", "MAX", "PERCENTILE_DISC", "SUM", "VARP", "COLLECT", "MIN", "STDEV", "TOPONE"],
    unexpectedSuggestions: [],
},
{
    partialScript: " SELECT ",
    expectedSuggestions: [],
    unexpectedSuggestions: ["HOPPING", "HOPPINGWINDOW", "TUMBLING", "TUMBLINGWINDOW", "SESSION", "SESSIONWINDOW", "SLIDING", "SLIDINGWINDOW", "WINDOW", "WINDOWS"],
},
{
    partialScript: "  WITH temp_table AS (SELECT * FROM ",
    expectedSuggestions: ["table1", "table2"],
    unexpectedSuggestions: ["table1_column1", "table1_column2"],
},
{
    partialScript: "  WITH temp_table AS (SELECT * FROM table1) SELECT ",
    expectedSuggestions: ["temp_table", "table1_column1", "table1_column2"],
    unexpectedSuggestions: [],
},
{
    partialScript: "  WITH temp_table AS (SELECT * FROM table1) SELECT temp_table.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: [],
},
{
    partialScript: "  WITH temp_table AS (SELECT * FROM table1), temp_table2 AS (SELECT ",
    expectedSuggestions: ["temp_table"],
    unexpectedSuggestions: [],
}, {
    partialScript: "  CREATE ",
    expectedSuggestions: ["TABLE"],
    unexpectedSuggestions: ["MAX"],
}, {
    partialScript: " SELECT * FROM a GROUP BY  ",
    expectedSuggestions: [],
    unexpectedSuggestions: ["COUNT(*)"],
}, {
    partialScript: " SELECT table1_column1, COUNT(*) AS temp FROM table1 GROUP BY table1.",
    expectedSuggestions: [],
    unexpectedSuggestions: ["temp"],
}, {
    partialScript: " SELECT table1_column1, COUNT(*) AS temp FROM [table1] GROUP BY table1.",
    expectedSuggestions: [],
    unexpectedSuggestions: ["temp"],
}, {
    partialScript: " SELECT SUM(",
    expectedSuggestions: ["table1", "table2", "table1_column1", "table1_column2", "table2_column1", "table2_column2"],
    unexpectedSuggestions: [],
}, {
    partialScript: " WITH mytable AS (SELECT SUM(table1.",
    expectedSuggestions: ["table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT CAST(GetRecordPropertyValue(",
    expectedSuggestions: ["ABS"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT AVG(a) ",
    expectedSuggestions: ["OVER"],
    unexpectedSuggestions: [],
}, {
    partialScript: "  SELECT * FROM (SELECT table1_column1 FROM table1) AS table1_alias WHERE ",
    expectedSuggestions: ["table1_column1", "table1_alias"],
    unexpectedSuggestions: ["table1_column2", "table1"],
}, {
    partialScript: "SELECT * FROM (SELECT table1_column1 AS column1Alias, System.Timestamp() AS TIMESTAMP FROM table1) AS table1_alias WHERE ",
    expectedSuggestions: ["table1_column1", "column1Alias", "TIMESTAMP", "table1_alias"],
    unexpectedSuggestions: ["table1_column2", "table1"],
}, {
    partialScript: "SELECT * FROM (SELECT table1_column1 FROM table1) AS table1_alias WHERE table1_alias.",
    expectedSuggestions: ["table1_column1"],
    unexpectedSuggestions: ["table1_column2"],
},  {
    partialScript: "SELECT * FROM (SELECT table1_column1 AS timestamp, timestamp AS timestamp2 FROM table1) AS TIMESTAMP WHERE TIMESTAMP.",
    expectedSuggestions: ["TIMESTAMP", "timestamp2"],
    unexpectedSuggestions: ["table1_column1"], // pseduo table TIMESTAMP doesn't have a column called "table1_column1"
}, {
    partialScript: `
    WITH timestamp AS (
        SELECT table1_column1 AS timestamp FROM table1)
    SELECT timestamp.`,
    expectedSuggestions: ["TIMESTAMP"], // 'timestamp' as a column alias from result set
    unexpectedSuggestions: ["table1_column1"],
}, {
    partialScript: `
    WITH timestamp AS (
        SELECT table1_column1 AS timestamp1 FROM table1)
    SELECT `,
    expectedSuggestions: ["table1_column1", "TIMESTAMP", "timestamp1"],
    unexpectedSuggestions: [],
}, {
    partialScript: "  SELECT * FROM (SELECT table1_column1 FROM table1) AS table1_alias WHERE table1_alias.",
    expectedSuggestions: ["table1_column1"],
    unexpectedSuggestions: ["table1_column2"],
}, {
    partialScript: " SELECT table1_column1 AS column_alias INTO output1 FROM table1 AS table1_alias WHERE ",
    expectedSuggestions: ["table1_alias", "table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2", "column_alias"],
}, {
    partialScript: " SELECT table1_column1 AS column_alias INTO output1 FROM table1 AS table1_alias HAVING ",
    expectedSuggestions: ["table1_alias", "table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2", "column_alias"],
}, {
    partialScript: " SELECT table1_column1 AS column_alias INTO output1 FROM table1 AS table1_alias HAVING ",
    expectedSuggestions: ["table1_alias", "table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2", "column_alias"],
}, {
    partialScript: " SELECT * FROM mytable HAVING ",
    expectedSuggestions: ["AVG", "COLLECTTOP", "PERCENTILE_CONT", "STDEVP", "VAR", "COUNT", "MAX", "PERCENTILE_DISC", "SUM", "VARP", "COLLECT", "MIN", "STDEV", "TOPONE"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT table1_column1 AS column_alias INTO output1 FROM table1 AS table1_alias HAVING ",
    expectedSuggestions: ["table1_alias", "table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2", "column_alias"],
}, {
    partialScript: " SELECT table1_column1 AS column_alias INTO output1 FROM table1 AS table1_alias GROUP BY table1_column2 HAVING ",
    expectedSuggestions: ["table1_alias", "table1", "table1_column1", "table1_column2", "column_alias"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2"],
}, {
    partialScript: " SELECT table1_column1 AS column_alias INTO output1 FROM table1 AS table1_alias GROUP BY ",
    expectedSuggestions: ["table1_alias", "table1", "table1_column1", "table1_column2"],
    unexpectedSuggestions: ["table2", "table2_column1", "table2_column2", "column_alias"],
}, {
    partialScript: "SELECT e.TollId FROM input1 CROSS APPLY ",
    expectedSuggestions: ["GETARRAYELEMENTS", "GETRECORDPROPERTIES"],
    unexpectedSuggestions: [],
}, {
    partialScript: "",
    expectedSuggestions: ["SELECT", "CREATE", "WITH"],
    unexpectedSuggestions: ["FROM", "GO"],
}, {
    partialScript: "SELECT * FROM input1 AS a; ",
    expectedSuggestions: ["SELECT", "CREATE", "WITH"],
    unexpectedSuggestions: ["FROM", "GO"],
}, {
    partialScript: " SELECT ",
    expectedSuggestions: ["ALL", "CASE", "DISTINCT", "NULL"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT * ",
    expectedSuggestions: ["FROM", "INTO"],
    unexpectedSuggestions: ["WHERE", "HAVING"],
}, {
    partialScript: "SELECT * FROM a ",
    expectedSuggestions: ["AS", "WHERE", "HAVING", "GROUP", "INNER", "JOIN", "LEFT", "OUTER", "RIGHT", "UNION", "TIMESTAMP BY", "PARTITION BY", "CROSS", "MATCH_RECOGNIZE", "OUTER"],
    unexpectedSuggestions: [],
}, {
    partialScript: "WITH firstQuery AS ( SELECT input.TollId, input.EntryTime,flat.ArrayIndex AS i1, flat.ArrayValue AS licenses FROM input ",
    expectedSuggestions: ["WHERE", "HAVING", "AS", "GROUP", "JOIN", "INNER", "OUTER", "LEFT", "RIGHT", "UNION", "TIMESTAMP BY", "PARTITION BY", "CROSS", "MATCH_RECOGNIZE", "OUTER"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT * FROM A CROSS ",
    expectedSuggestions: ["APPLY"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT * FROM A OUTER ",
    expectedSuggestions: ["APPLY"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT * FROM A OUTER ",
    expectedSuggestions: ["APPLY"],
    unexpectedSuggestions: [],
}, {
    partialScript: "WITH tempTable AS (",
    expectedSuggestions: ["SELECT"],
    unexpectedSuggestions: [],
}, {
    partialScript: "WITH tempTable ",
    expectedSuggestions: ["AS"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT CASE ",
    expectedSuggestions: ["WHEN"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT CASE a ",
    expectedSuggestions: ["WHEN"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT CASE a WHEN b ",
    expectedSuggestions: ["THEN"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT CASE a WHEN b THEN c ",
    expectedSuggestions: ["ELSE", "WHEN"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT CASE a WHEN b THEN c ELSE NULL ",
    expectedSuggestions: ["END"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT AVG(temperature) OVER ( ",
    expectedSuggestions: ["PARTITION BY", "LIMIT DURATION"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT AVG(temperature) OVER (PARTITION BY c ",
    expectedSuggestions: ["LIMIT DURATION"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT AVG(temperature) OVER (PARTITION BY c LIMIT DURATION (minute,5) ",
    expectedSuggestions: ["WHEN"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT a FROM b ",
    expectedSuggestions: ["UNION"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT TollId, System.Timestamp() AS WinEndTime, COUNT(*) FROM TollTagEntry TIMESTAMP BY EntryTime ",
    expectedSuggestions: ["GROUP"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT TollId, System.Timestamp() AS WinEndTime, COUNT(*) FROM TollTagEntry TIMESTAMP BY EntryTime GROUP ",
    expectedSuggestions: ["BY"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT TollId, System.Timestamp() AS WinEndTime, COUNT(*) FROM TollTagEntry TIMESTAMP BY EntryTime GROUP BY ",
    expectedSuggestions: ["TUMBLING", "TUMBLINGWINDOW", "HOPPING", "HOPPINGWINDOW", "SESSION", "SESSIONWINDOW", "SLIDING", "SLIDINGWINDOW", "WINDOW", "WINDOWS"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT TollId, System.Timestamp() AS WinEndTime, COUNT(*) FROM TollTagEntry TIMESTAMP BY EntryTime GROUP BY TumblingWindow( minute , 3 ) , TollId HAVING ",
    expectedSuggestions: ["TollId", "WinEndTime", "COUNT", "ABS", "AVG"],
    unexpectedSuggestions: [],
}, {
    partialScript: `WITH WAVehicle AS (
        SELECT TollId, EntryTime AS VehicleEntryTime, LicensePlate, State, Make, Model, VehicleType,    VehicleWeight, Toll, Tag
        FROM TollTagEntry TIMESTAMP BY EntryTime
        WHERE State = "WA"
    )
    SELECT * `,
    expectedSuggestions: ["INTO", "FROM"],
    unexpectedSuggestions: [],
}, {
    partialScript: `WITH Step1 AS (
        SELECT *
        FROM input
        PARTITION BY DeviceId `,
    expectedSuggestions: ["INTO"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT I1.TollId, I1.EntryTime,I2.ExitTime, I1.LicensePlate, DATEDIFF(minute,I1.EntryTime,I2.ExitTime) AS DurationInMinutes
    FROM Input1 I1 TIMESTAMP BY EntryTime
    JOIN Input2 I2 TIMESTAMP BY ExitTime
    ON `,
    expectedSuggestions: ["DATEDIFF"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT *
    INTO output FROM input TIMESTAMP BY time
        MATCH_RECOGNIZE (`,
    expectedSuggestions: ["LIMIT DURATION"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT *
    INTO output FROM input TIMESTAMP BY time
        MATCH_RECOGNIZE (
            LIMIT DURATION (minute, 1) `,
    expectedSuggestions: ["PARTITION BY"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT *
    INTO output FROM input TIMESTAMP BY time
        MATCH_RECOGNIZE (
            LIMIT DURATION (minute, 1)
            PARTITION BY tollBoothId `,
    expectedSuggestions: ["MEASURES"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT *
    INTO output FROM input TIMESTAMP BY time
        MATCH_RECOGNIZE (
            LIMIT DURATION (minute, 1)
            PARTITION BY tollBoothId
            MEASURES
                Last(Toyota.LicensePlate) AS toyotaLicensePlate,
                Last(Lexus.LicensePlate) AS lexusLicensePlate `,
    expectedSuggestions: ["AFTER MATCH SKIP TO NEXT ROW"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT *
    INTO output FROM input TIMESTAMP BY time
        MATCH_RECOGNIZE (
            LIMIT DURATION (minute, 1)
            PARTITION BY tollBoothId
            MEASURES
                Last(Toyota.LicensePlate) AS toyotaLicensePlate,
                Last(Lexus.LicensePlate) AS lexusLicensePlate
            AFTER MATCH SKIP TO NEXT ROW `,
    expectedSuggestions: ["PATTERN"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT *
    INTO output FROM input TIMESTAMP BY time
        MATCH_RECOGNIZE (
            LIMIT DURATION (minute, 1)
            PARTITION BY tollBoothId
            MEASURES
                Last(Toyota.LicensePlate) AS toyotaLicensePlate,
                Last(Lexus.LicensePlate) AS lexusLicensePlate
            AFTER MATCH SKIP TO NEXT ROW
            PATTERN (Toyota+ Ford* Lexus+) `,
    expectedSuggestions: ["DEFINE"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT 1 AS alert
    FROM input
    WHERE MAX(healthy) `,
    expectedSuggestions: ["OVER"],
    unexpectedSuggestions: [],
}, {
    partialScript: `SELECT 1 AS alert
    FROM input
    WHERE MAX(healthy) OVER ( `,
    expectedSuggestions: ["PARTITION BY"],
    unexpectedSuggestions: [],
}, {
    partialScript: `WITH
    NormalReadings AS
    (
      SELECT *
      FROM Sensor
      WHERE Reading < 100 AND Reading > 0
    ),
    Averages AS
    (
      SELECT SensorId, AVG(Reading) as AvgNormalReading
      FROM NormalReadings
      GROUP BY SensorId, TumblingWindow(minute, 1)
    ),
    BadAverages AS
    (
      SELECT *
      FROM Averages
      WHERE AvgNormalReadings < 10
    )
    SELECT * INTO outputAlerts FROM `,
    expectedSuggestions: ["NormalReadings", "BadAverages", "Averages"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT table1_column1 INTO ",
    expectedSuggestions: ["outputStream1", "outputStream2"],
    unexpectedSuggestions: ["table1", "table2", "table3"],
}, {
    partialScript: " SELECT outter.mid1.inner1, outter.mid2.inner2 FROM ",
    expectedSuggestions: ["db1.schema1.table1"],
    unexpectedSuggestions: [],
}, {
    partialScript: " SELECT db1.schema1.table1.",
    expectedSuggestions: ["outter.mid1.inner1", "outter.mid2.inner2", "outter.mid3.inner3"],
    unexpectedSuggestions: ["table1_column1", "table1_column2"],
}, {
    partialScript: " SELECT [db1].schema1.\"table1\".",
    expectedSuggestions: ["outter.mid1.inner1", "outter.mid2.inner2", "outter.mid3.inner3"],
    unexpectedSuggestions: ["table1_column1", "table1_column2"],
}, {
    partialScript: " SELECT * FROM [db1].schema1.\"table1\" WHERE ",
    expectedSuggestions: ["outter.mid1.inner1", "outter.mid2.inner2", "outter.mid3.inner3"],
    unexpectedSuggestions: ["table1_column1", "table1_column2"],
}, {
    partialScript: " SELECT * FROM [db1].schema1.\"table1\" WHERE outter.mid1.",
    expectedSuggestions: ["inner1"],
    unexpectedSuggestions: ["inner2", "inner3", "table1", "table1_column1", "db1.schema1.table1"],
}, {
    partialScript: " SELECT COUNT(*) FROM [db1].schema1.\"table1\" GROUP BY ",
    expectedSuggestions: ["outter.mid1.inner1", "outter.mid2.inner2", "outter.mid3.inner3"],
    unexpectedSuggestions: ["table1_column1", "table1_column2"],
}, {
    partialScript: "SELECT outter.",
    expectedSuggestions: ["mid1.inner1", "mid2.inner2", "mid3.inner3"],
    unexpectedSuggestions: [],
}, {
    partialScript: "SELECT outter",
    expectedSuggestions: [],
    unexpectedSuggestions: ["mid1.inner1", "mid2.inner2", "mid3.inner3"],
}, {
    partialScript: "SELECT outter.mid2.",
    expectedSuggestions: ["inner2"],
    unexpectedSuggestions: ["inner1", "mid2.inner2", "inner3"],
}, {
    partialScript: `SELECT arrayElement.ArrayIndex,
        arrayElement.ArrayValue
    FROM table1 tableAlias
    CROSS APPLY GETARRAYELEMENTS(events.records) AS arrayElement
    WHERE `,
    expectedSuggestions: ["table1", "tableAlias", "arrayElement"],
    unexpectedSuggestions: ["GETARRAYELEMENTS"]
}];

export { sqlWordCompletionTestCases };
