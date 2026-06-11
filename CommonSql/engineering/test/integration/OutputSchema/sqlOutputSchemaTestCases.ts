export interface ISqlOutputSchemaTestCase {
    script: string;
    schema: string[];
}

export const sqlOutputSchemaTestCases: ISqlOutputSchemaTestCase[] = [{
    script: "SELECT table1_column2 FROM table1",
    schema: [ "table1_column2" ],
}, {
    script: "SELECT table1_column1, table1.table1_column2 FROM table1",
    schema: [ "table1_column1", "table1_column2" ],
}, {
    script: "SELECT * FROM table1",
    schema: [ "table1_column1", "table1_column2", "table1_column3" ],
}, {
    script: "SELECT table1_column1 as column1, table2_column2 as column2 FROM table1",
    schema: [ "column1", "column2"],
}, {
    script: "SELECT ABS(table1_column1) as abs_1, log_2 = log(table1_column2), table1_column2 FROM table1",
    schema: [ "abs_1", "log_2", "table1_column2" ],
}, {
    script: "SELECT ABS(table1_column1), log(table1_column2), table1_column2 FROM table1",
    schema: [ "ABS", "LOG", "table1_column2"],
}, {
    // Test UNION
    script: "SELECT 1 AS one, table1_column1, table1_column3 FROM table1 UNION SELECT 2 AS one, table1_column1, table1_column3 FROM [table-4]",
    schema: [ "one", "table1_column1", "table1_column3" ],
}, {
    script: "select 1 as table1_column1 from table1 timestamp by _timestamp union select table1_column1 from table1 timestamp by _timestamp",
    schema: [ "table1_column1" ],
}, {
    script: "select max(system.timestamp()) as _timestamp from table1 group by tumblingwindow(ss, 10)",
    schema: [ "_timestamp" ],
}, {
    script: "select datepart(second, System.TimeStamp()) AS t, table2_column1, count(*) as c from table2 group by table2_column1, table2_column1, tumblingwindow(ss, 5)",
    schema: [ "t", "table2_column1", "c"],
}, {
    script: "select 1 as table1_column1 from table1 timestamp by _timestamp union select table1_column1 from table1 timestamp by _timestamp",
    schema: [ "table1_column1" ],
}, {
    // test JOIN
    script:
    `select table1.table1_column1, table2.table2_column2
     FROM table1
     JOIN table2
     ON datediff(ms, table1, table2) < 5000 and table1.table1_column1 = table2.table2_column1`,
    schema: [ "table1_column1", "table2_column2" ],
}, {
    // test select * in JOIN
    script:
    `select table1.*, table2.*, table3.*
     FROM table1
     JOIN table2
     JOIN table3
     ON datediff(ms, table1, table2) < 5000 and table1.table1_column1 = table3.table3_column1`,
    schema: [ "table1_column1", "table1_column2", "table1_column3", "table2_column1", "table2_column2", "table3_column1", "table3_column2" ],
}, {
    // test multiple WITH
    script:
    `WITH
     step1 as (Select table1_column1, table1_column2, table1_column3 from table1 where  table1_column3 > 10),
     step2 as (SELECT table1_column1, table1_column2, AVG(table1_column3) AS avg_3 from step1 GROUP BY table1_column1, TUMBLING(ss, 10) Having table1_column1 > 0,
     step3 as (SELECT table1_column2, avg_3 FROM step2 WHERE avg_3 > 10)
     SELECT * FROM step3`,
    schema: [ "table1_column2", "avg_3" ],
}, {
    script:
    `WITH
     step1 as (Select table1_column1, table1_column2, table1_column3 from table1 where  table1_column3 > 10),
     step2 AS (SELECT * FROM table2),
     step3 AS (SELECT table3_column1 FROM table3),
     step4 AS (
        SELECT step1.table1_column1, step1.table1_column3, step2.*, step3.*, 'whatever' AS str 
        FROM step1 JOIN step2 JOIN step3
        ON step1.table1_column1 = step3.table3_column1 AND datediff(ss, step1, step2) < 10)
     SELECT * FROM step4`,
    schema: [ "table1_column1", "table1_column3", "table2_column1", "table2_column2", "table3_column1", "str" ],
}, {
    script: "SELECT * FROM (SELECT table1_column1, table1_column2 FROM table1) AS temp_table1 WHERE table1_column1 > 10",
    schema: [ "table1_column1", "table1_column2" ],
}];
