export interface ICodeFormattingTestCase {
    script: string;
    expected: string;
}

export const codeFormattingTestCases: ICodeFormattingTestCase[] = [
    // top level statements should be separated by new lines
    {
        script: "WITH temp1 AS (SELECT table1_column1,table1_column2,table1_column3 FROM table1),temp2 AS (SELECT table1_column1,table1_column2,table1_column3 FROM table1); SELECT * FROM temp1",
        expected: `WITH
    temp1 AS (
        SELECT table1_column1,
        table1_column2,
        table1_column3 FROM table1 
    ),
    temp2 AS (
        SELECT table1_column1,
        table1_column2,
        table1_column3 FROM table1 
    );

SELECT * FROM temp1 
`,
    },

    // expression should not be splited out
    {
        script: `SELECT table1_column1,table1_column2,table1_column3 INTO 
outputStream1
FROM
table1 WHERE NOT
table1_column1
 > 0 AND (table1_column2 = 1 OR table_column1 IS NOT NULL OR table1_column1 IN ('a', 'b', 'c')) AND table1_column3 BETWEEN 1 AND
  10
`,
        expected: `SELECT table1_column1,
table1_column2,
table1_column3 INTO outputStream1
FROM table1 
WHERE NOT table1_column1 > 0
AND (
    table1_column2 = 1
    OR
        table_column1 IS NOT NULL
        OR
            table1_column1 IN (
                'a',
                'b',
                'c'
            )
)
AND table1_column3 BETWEEN 1 AND 10
`,
},

// built-in function call should not be splited out
{
    script: `SELECT table1_column1,SUBSTRING
(table1.table1_column2,
 1, 10) INTO outputStream1 FROM table1`,
    expected: `SELECT table1_column1,
SUBSTRING (table1.table1_column2 , 1 , 10) INTO outputStream1
FROM table1 
`,
},

// comments should be preserved
{
    script: `
-- line comment
SELECT /*keyword*/ table1_column1 /*column1*/,table1_column2,table1_column3 /*last column*/ INTO
-- output
 outputStream1 FROM -- input
 table1`,
    expected: `-- line comment
SELECT /*keyword*/ table1_column1 /*column1*/ ,
table1_column2,
table1_column3 /*last COLUMN*/ INTO
    -- output
    outputStream1
FROM -- input
table1 
`,
}];
