export interface ISqlGotoDefinitionTestCase {
    script: string;
    selectedWord: string;
    cursorOffset: number;
    expectedResult: any;
}

export const sqlGotoDefinitionTestCases: ISqlGotoDefinitionTestCase[] = [
    // GotoDefinition should return null for keywords
    {
        script: "SELECT",
        selectedWord: "SELECT",
        cursorOffset: 6,
        expectedResult: null,
    },
    {
        script: "SELECT * FROM",
        selectedWord: "FROM",
        cursorOffset: 13,
        expectedResult: null,
    },
    // GotoDefinition should return null for bulitin functions
    {
        script: "SELECT COUNT",
        selectedWord: "COUNT",
        cursorOffset: 12,
        expectedResult: { range: null, metadataObjectName: "COUNT" },
    },
    {
        script: "SELECT COUNT(*) FROM tableTest1",
        selectedWord: "COUNT",
        cursorOffset: 12,
        expectedResult: { range: null, metadataObjectName: "COUNT" },
    },
    // GotoDefinition should return null for provided metadata
    {
        script: "SELECT * FROM defaultSchemaTest",
        selectedWord: "defaultSchemaTest",
        cursorOffset: 31,
        expectedResult: { range: null, metadataObjectName: "defaultSchemaTest" },
    },
    // GotoDefinition based on created metadata
    {
        script: "CREATE SCHEMA createdSchema; DROP SCHEMA createdSchema",
        selectedWord: "createdSchema",
        cursorOffset: 54,
        expectedResult: { range: { startLineNumber: 1, startColumn: 15, endLineNumber: 1, endColumn: 28 }, metadataObjectName: "createdSchema" },
    },
    {
        script: "CREATE TYPE createdType FROM varchar(11) NOT NULL; DROP createdType",
        selectedWord: "createdType",
        cursorOffset: 67,
        expectedResult: { range: { startLineNumber: 1, startColumn: 13, endLineNumber: 1, endColumn: 24 }, metadataObjectName: "defaultSchemaTest.createdType" },
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable.c1 FROM createdTable",
        selectedWord: "createdTable",
        cursorOffset: 71,
        expectedResult: { range: { startLineNumber: 1, startColumn: 14, endLineNumber: 1, endColumn: 26 }, metadataObjectName: "defaultSchemaTest.createdTable" },
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable.c1 FROM createdTable",
        selectedWord: "createdTable",
        cursorOffset: 92,
        expectedResult: { range: { startLineNumber: 1, startColumn: 14, endLineNumber: 1, endColumn: 26 }, metadataObjectName: "defaultSchemaTest.createdTable" },
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1",
        selectedWord: "c1",
        cursorOffset: 61,
        expectedResult: { range: { startLineNumber: 1, startColumn: 28, endLineNumber: 1, endColumn: 30 }, metadataObjectName: "createdTable.c1" },
    },
    {
        script: "WITH t1 (c1, c2) AS (SELECT * FROM tableTest1) SELECT c1 FROM t1",
        selectedWord: "c1",
        cursorOffset: 56,
        expectedResult: { range: { startLineNumber: 1, startColumn: 10, endLineNumber: 1, endColumn: 12 }, metadataObjectName: "t1.c1" },
    },
    {
        script: "WITH t1 AS (SELECT tableColumnTest1, tableColumnTest2 FROM tableTest1) SELECT tableColumnTest1 FROM t1",
        selectedWord: "tableColumnTest1",
        cursorOffset: 94,
        expectedResult: { range: { startLineNumber: 1, startColumn: 20, endLineNumber: 1, endColumn: 36 }, metadataObjectName: "t1.tableColumnTest1" },
    },
    {
        script: "CREATE SCHEMA createdSchema; CREATE TABLE createdSchema.createdTable (c1 int, c2 int, c3 int); SELECT createdSchema",
        selectedWord: "createdSchema",
        cursorOffset: 115,
        expectedResult: { range: { startLineNumber: 1, startColumn: 15, endLineNumber: 1, endColumn: 28 }, metadataObjectName: "createdSchema" },
    },
    {
        script: "CREATE INDEX createdIndex ON tableTest1 (tableColumnTest1); DROP INDEX createdIndex",
        selectedWord: "createdIndex",
        cursorOffset: 83,
        expectedResult: { range: { startLineNumber: 1, startColumn: 14, endLineNumber: 1, endColumn: 26 }, metadataObjectName: "defaultSchemaTest.createdIndex" },
    },
    {
        script: "CREATE PROC createdProc AS SELECT * FROM tableTest1; GO; DROP PROC createdProc",
        selectedWord: "createdProc",
        cursorOffset: 78,
        expectedResult: { range: { startLineNumber: 1, startColumn: 13, endLineNumber: 1, endColumn: 24 }, metadataObjectName: "defaultSchemaTest.createdProc" },
    },
    {
        script: "CREATE FUNCTION createdFunc () RETURNS int BEGIN RETURN 0 END; SELECT createdFunc() FROM",
        selectedWord: "createdFunc",
        cursorOffset: 81,
        expectedResult: { range: { startLineNumber: 1, startColumn: 17, endLineNumber: 1, endColumn: 28 }, metadataObjectName: "defaultSchemaTest.createdFunc" },
    },
    // GotoDefinition for alias
    {
        script: "SELECT * FROM tableTest1 as aliasTable",
        selectedWord: "aliasTable",
        cursorOffset: 38,
        expectedResult: { range: null, metadataObjectName: "defaultSchemaTest.tableTest1" },
    },
    {
        script: "SELECT tableColumnTest1 AS aliasColumn FROM tableTest1",
        selectedWord: "aliasColumn",
        cursorOffset: 38,
        expectedResult: { range: null, metadataObjectName: "defaultSchemaTest.tableTest1.tableColumnTest1" },
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1 FROM createdTable as aliasTable",
        selectedWord: "aliasTable",
        cursorOffset: 93,
        expectedResult: { range: { startLineNumber: 1, startColumn: 14, endLineNumber: 1, endColumn: 26 }, metadataObjectName: "defaultSchemaTest.createdTable" },
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1 as aliasColumn FROM createdTable",
        selectedWord: "aliasColumn",
        cursorOffset: 76,
        expectedResult: { range: { startLineNumber: 1, startColumn: 28, endLineNumber: 1, endColumn: 30 }, metadataObjectName: "createdTable.c1" },
    },
    {
        script: "WITH t2 AS (SELECT tableColumnTest1 AS tc1, tableColumnTest2 tc2, 1 + 1 AS tc3 FROM tableTest1) SELECT tc1 FROM t2",
        selectedWord: "tc1",
        cursorOffset: 106,
        expectedResult: { range: { startLineNumber: 1, startColumn: 40, endLineNumber: 1, endColumn: 43 }, metadataObjectName: "t2.tc1" },
    },
    {
        script: "WITH t2 AS (SELECT tableColumnTest1 AS tc1, tableColumnTest2 tc2, 1 + 1 AS tc3 FROM tableTest1) SELECT tc2 FROM t2",
        selectedWord: "tc2",
        cursorOffset: 106,
        expectedResult: { range: { startLineNumber: 1, startColumn: 62, endLineNumber: 1, endColumn: 65 }, metadataObjectName: "t2.tc2" },
    },
    {
        script: "WITH t2 AS (SELECT tableColumnTest1 AS tc1, tableColumnTest2 tc2, 1 + 1 AS tc3 FROM tableTest1) SELECT tc3 FROM t2",
        selectedWord: "tc3",
        cursorOffset: 106,
        expectedResult: { range: { startLineNumber: 1, startColumn: 76, endLineNumber: 1, endColumn: 79 }, metadataObjectName: "t2.tc3" },
    },
];
