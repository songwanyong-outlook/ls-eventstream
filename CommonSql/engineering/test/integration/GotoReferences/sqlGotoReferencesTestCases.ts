export interface ISqlGotoReferencesTestCase {
    script: string;
    selectedWord: string;
    cursorOffset: number;
    expectedName: string;
}

export const sqlGotoReferencesTestCases: ISqlGotoReferencesTestCase[] = [
    // GotoReferences should return null for keywords
    {
        script: "SELECT",
        selectedWord: "SELECT",
        cursorOffset: 6,
        expectedName: null,
    },
    {
        script: "SELECT * FROM",
        selectedWord: "FROM",
        cursorOffset: 13,
        expectedName: null,
    },
    // GotoReferences based on bulitin functions
    {
        script: "SELECT COUNT",
        selectedWord: "COUNT",
        cursorOffset: 12,
        expectedName: "COUNT",
    },
    {
        script: "SELECT COUNT(*) FROM tableTest1",
        selectedWord: "COUNT",
        cursorOffset: 12,
        expectedName: "COUNT",
    },
    // GotoReferences based on metadata
    {
        script: "SELECT * FROM defaultSchemaTest",
        selectedWord: "defaultSchemaTest",
        cursorOffset: 31,
        expectedName: "defaultSchemaTest",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.tableTest1",
        selectedWord: "defaultSchemaTest",
        cursorOffset: 31,
        expectedName: "defaultSchemaTest",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.tableTest1",
        selectedWord: "tableTest1",
        cursorOffset: 42,
        expectedName: "tableTest1",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.tableTest4",
        selectedWord: "tableTest4",
        cursorOffset: 42,
        expectedName: "tableTest4",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.viewTest1",
        selectedWord: "viewTest1",
        cursorOffset: 41,
        expectedName: "viewTest1",
    },
    {
        script: "SELECT functionTest1",
        selectedWord: "functionTest1",
        cursorOffset: 20,
        expectedName: "functionTest1",
    },
    // GotoReferences based on created metadata
    {
        script: "CREATE SCHEMA createdSchema; DROP SCHEMA createdSchema",
        selectedWord: "createdSchema",
        cursorOffset: 54,
        expectedName: "createdSchema",
    },
    {
        script: "CREATE TYPE createdType FROM varchar(11) NOT NULL; DROP createdType",
        selectedWord: "createdType",
        cursorOffset: 67,
        expectedName: "createdType",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable.c1 FROM createdTable",
        selectedWord: "createdTable",
        cursorOffset: 71,
        expectedName: "createdTable",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable.c1 FROM createdTable",
        selectedWord: "createdTable",
        cursorOffset: 92,
        expectedName: "createdTable",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1",
        selectedWord: "c1",
        cursorOffset: 61,
        expectedName: "c1",
    },
    {
        script: "WITH t1 (c1, c2) AS (SELECT * FROM tableTest1) SELECT c1 FROM t1",
        selectedWord: "c1",
        cursorOffset: 56,
        expectedName: "c1",
    },
    {
        script: "CREATE SCHEMA createdSchema; CREATE TABLE createdSchema.createdTable (c1 int, c2 int, c3 int); SELECT createdSchema",
        selectedWord: "createdSchema",
        cursorOffset: 115,
        expectedName: "createdSchema",
    },
    {
        script: "CREATE INDEX createdIndex ON tableTest1 (tableColumnTest1); DROP INDEX createdIndex",
        selectedWord: "createdIndex",
        cursorOffset: 83,
        expectedName: "createdIndex",
    },
    {
        script: "CREATE PROC createdProc AS SELECT * FROM tableTest1; GO; DROP PROC createdProc",
        selectedWord: "createdProc",
        cursorOffset: 78,
        expectedName: "createdProc",
    },
    {
        script: "CREATE FUNCTION createdFunc () RETURNS int BEGIN RETURN 0 END; SELECT createdFunc() FROM",
        selectedWord: "createdFunc",
        cursorOffset: 81,
        expectedName: "createdFunc",
    },
    // GotoReferences for alias
    {
        script: "SELECT * FROM tableTest1 as aliasTable",
        selectedWord: "aliasTable",
        cursorOffset: 38,
        expectedName: "tableTest1",
    },
    {
        script: "SELECT tableColumnTest1 AS aliasColumn FROM tableTest1",
        selectedWord: "aliasColumn",
        cursorOffset: 38,
        expectedName: "tableColumnTest1",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1 FROM createdTable as aliasTable",
        selectedWord: "aliasTable",
        cursorOffset: 93,
        expectedName: "createdTable",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1 as aliasColumn FROM createdTable",
        selectedWord: "aliasColumn",
        cursorOffset: 76,
        expectedName: "c1",
    },
];
