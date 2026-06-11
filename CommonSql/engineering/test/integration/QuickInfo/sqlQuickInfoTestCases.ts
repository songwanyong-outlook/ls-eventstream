import { IRangeItem } from '../../../../CommonSqlUtils/Utils';

export interface ISqlQuickInfoTestCase {
    script: string;
    hoveringWord: string;
    cursorOffset: number;
    expectedQuickInfo: string;
    range?: IRangeItem;
}

export const sqlQuickInfoTestCases: ISqlQuickInfoTestCase[] = [
    // QuickInfo based on keywords
    {
        script: "SELECT",
        hoveringWord: "SELECT",
        cursorOffset: 6,
        expectedQuickInfo: "Reserved Keyword",
    },
    {
        script: "SELECT * FROM",
        hoveringWord: "FROM",
        cursorOffset: 13,
        expectedQuickInfo: "Reserved Keyword",
    },
    // QuickInfo based on bulitin functions
    {
        script: "SELECT AVG",
        hoveringWord: "AVG",
        cursorOffset: 12,
        expectedQuickInfo: "**Builtin Function**:\n\nAVG (expression)\n\nReturns the average of the values in a group. Null values are ignored.",
    },
    {
        script: "SELECT AVG(*) FROM table1",
        hoveringWord: "AVG",
        cursorOffset: 12,
        expectedQuickInfo: "**Builtin Function**:\n\nAVG (expression)\n\nReturns the average of the values in a group. Null values are ignored.",
    },
    // QuickInfo based on metadata
    {
        script: "SELECT * FROM table1",
        hoveringWord: "table1",
        cursorOffset: 22,
        expectedQuickInfo: "**Table**: table1\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
    // QuickInfo based on metadata
    {
        script: "SELECT * FROM \"table1\"",
        hoveringWord: "table1",
        cursorOffset: 22,
        expectedQuickInfo: "**Table**: table1\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
    // QuickInfo based on created metadata
    {
        script: "WITH temp_table AS (SELECT * FROM table1) SELECT temp_table.",
        hoveringWord: "temp_table",
        cursorOffset: 8,
        expectedQuickInfo: "**TempTable**: temp_table\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
    // QuickInfo for alias
    {
        script: "SELECT * FROM table1 AS aliasTable ",
        hoveringWord: "aliasTable",
        cursorOffset: 38,
        expectedQuickInfo: "**Table**: table1\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
    // QuickInfo for alias
    {
        script: "SELECT * FROM [table1] AS aliasTable ",
        hoveringWord: "aliasTable",
        cursorOffset: 38,
        expectedQuickInfo: "**Table**: table1\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
    {
        script: "SELECT * FROM (SELECT * FROM table1) AS aliasTable WHERE table1_column1 = 1",
        hoveringWord: "aliasTable",
        cursorOffset: 43,
        expectedQuickInfo: "**TempTable**: aliasTable\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
    // column alias won't impact input table from metadata
    {
        script: "SELECT table1_column1 AS column1, column2 = table1_column2, 1 AS One FROM table1 AS aliasTable",
        hoveringWord: "table1",
        cursorOffset: 75,
        expectedQuickInfo: "**Table**: table1\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",        
    },
    // Column alias in temp table
    {
        script: "WITH t1 AS (SELECT table1_column1 AS column1, column2 = table1_column2, 1 AS One FROM table1) SELECT * FROM t1",
        hoveringWord: "t1",
        cursorOffset: 6,
        expectedQuickInfo: "**TempTable**: t1\n\n**Columns**:\n+ column1\n+ column2\n+ One",        
    },
    // Output
    {
        script: "SELECT * INTO outputStream1",
        hoveringWord: "outputStream1",
        cursorOffset: 14,
        expectedQuickInfo: "**Output**: outputStream1",
    },
    // Output with []
    {
        script: "SELECT * INTO [outputStream1]",
        hoveringWord: "outputStream1",
        cursorOffset: 14,
        expectedQuickInfo: "**Output**: outputStream1",
    },
    {
        script: "SELECT * FROM [table-4] AS aliasTable ",
        hoveringWord: "table-4",
        cursorOffset: 17,
        expectedQuickInfo: "**Table**: table-4\n\n**Columns**:\n+ table1_column1\n+ table1_column2\n+ table1_column3",
    },
];
