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
        script: "SELECT COUNT",
        hoveringWord: "COUNT",
        cursorOffset: 12,
        expectedQuickInfo: "**Name** &mdash; `COUNT`  \n**Type** &mdash; `Function`  \n**Details** &mdash; `COUNT ( [ALL | DISTINCT] expression) | COUNT (*)`  \n**Documentation** &mdash; `Returns the number of items in a group. COUNT always returns a bigint data type value.`  \n",
    },
    {
        script: "SELECT COUNT(*) FROM tableTest1",
        hoveringWord: "COUNT",
        cursorOffset: 12,
        expectedQuickInfo: "**Name** &mdash; `COUNT`  \n**Type** &mdash; `Function`  \n**Details** &mdash; `COUNT ( [ALL | DISTINCT] expression) | COUNT (*)`  \n**Documentation** &mdash; `Returns the number of items in a group. COUNT always returns a bigint data type value.`  \n",
    },
    // QuickInfo based on metadata
    {
        script: "SELECT * FROM defaultSchemaTest",
        hoveringWord: "defaultSchemaTest",
        cursorOffset: 31,
        expectedQuickInfo: "**Name** &mdash; `defaultSchemaTest`  \n**Type** &mdash; `Schema`  \n\n---  \n\n**Function**  \n- `functionTest1`  \n\n**Index**  \n- `indexTest1`  \n\n**StoredProcedure**  \n- `storedProcedureTest1`  \n\n**Table**  \n- `tableTest1`  \n- `tableTest3`  \n- `tableTest4`  \n\n**TableFunction**  \n- `tableFunctionTest1`  \n\n**View**  \n- `viewTest1`  \n\n",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.tableTest1",
        hoveringWord: "defaultSchemaTest",
        cursorOffset: 31,
        expectedQuickInfo: "**Name** &mdash; `defaultSchemaTest`  \n**Type** &mdash; `Schema`  \n\n---  \n\n**Function**  \n- `functionTest1`  \n\n**Index**  \n- `indexTest1`  \n\n**StoredProcedure**  \n- `storedProcedureTest1`  \n\n**Table**  \n- `tableTest1`  \n- `tableTest3`  \n- `tableTest4`  \n\n**TableFunction**  \n- `tableFunctionTest1`  \n\n**View**  \n- `viewTest1`  \n\n",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.tableTest1",
        hoveringWord: "tableTest1",
        cursorOffset: 42,
        expectedQuickInfo: "**Name** &mdash; `tableTest1`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `tableColumnTest1(DateTime)`  \n- `tableColumnTest2(int)`  \n",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.tableTest4",
        hoveringWord: "tableTest4",
        cursorOffset: 42,
        expectedQuickInfo: "**Name** &mdash; `tableTest4`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\nChild not found  \n",
    },
    {
        script: "SELECT * FROM defaultSchemaTest.viewTest1",
        hoveringWord: "viewTest1",
        cursorOffset: 41,
        expectedQuickInfo: "**Name** &mdash; `viewTest1`  \n**Type** &mdash; `View`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `viewColumnTest1(double)`  \n- `viewColumnTest2(float)`  \n",
    },
    {
        script: "SELECT functionTest1",
        hoveringWord: "functionTest1",
        cursorOffset: 20,
        expectedQuickInfo: "**Name** &mdash; `functionTest1`  \n**Type** &mdash; `Function`  \n**Scope** &mdash; `defaultSchemaTest`  \n",
    },
    // QuickInfo based on created metadata
    {
        script: "CREATE SCHEMA createdSchema; DROP SCHEMA createdSchema",
        hoveringWord: "createdSchema",
        cursorOffset: 54,
        expectedQuickInfo: "**Name** &mdash; `createdSchema`  \n**Type** &mdash; `Schema`  \n",
    },
    {
        script: "CREATE TYPE createdType FROM varchar(11) NOT NULL; DROP createdType",
        hoveringWord: "createdType",
        cursorOffset: 67,
        expectedQuickInfo: "**Name** &mdash; `createdType`  \n**Type** &mdash; `Type`  \n**Scope** &mdash; `defaultSchemaTest`  \n",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable",
        hoveringWord: "createdTable",
        cursorOffset: 71,
        expectedQuickInfo: "**Name** &mdash; `createdTable`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `c1(Column)`  \n- `c2(Column)`  \n- `c3(Column)`  \n",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable.c1 FROM createdTable",
        hoveringWord: "createdTable",
        cursorOffset: 71,
        expectedQuickInfo: "**Name** &mdash; `createdTable`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `c1(Column)`  \n- `c2(Column)`  \n- `c3(Column)`  \n",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable.c1 FROM createdTable",
        hoveringWord: "createdTable",
        cursorOffset: 92,
        expectedQuickInfo: "**Name** &mdash; `createdTable`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `c1(Column)`  \n- `c2(Column)`  \n- `c3(Column)`  \n",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1",
        hoveringWord: "c1",
        cursorOffset: 61,
        expectedQuickInfo: "**Name** &mdash; `c1`  \n**Type** &mdash; `Column`  \n**Scope** &mdash; `createdTable`  \n",
    },
    {
        script: "WITH t1 (c1, c2) AS (SELECT * FROM tableTest1) SELECT c1 FROM t1",
        hoveringWord: "c1",
        cursorOffset: 56,
        expectedQuickInfo: "**Name** &mdash; `c1`  \n**Type** &mdash; `Column`  \n**Scope** &mdash; `t1`  \n",
    },
    {
        script: "WITH t1 AS (SELECT tableColumnTest1, tableColumnTest2 FROM tableTest1) SELECT tableColumnTest1 FROM t1",
        hoveringWord: "tableColumnTest1",
        cursorOffset: 94,
        expectedQuickInfo: "**Name** &mdash; `tableColumnTest1`  \n**Type** &mdash; `DateTime`  \n**Scope** &mdash; `t1`  \n",
    },
    {
        script: "CREATE SCHEMA createdSchema; CREATE TABLE createdSchema.createdTable (c1 int, c2 int, c3 int); SELECT createdSchema",
        hoveringWord: "createdSchema",
        cursorOffset: 115,
        expectedQuickInfo: "**Name** &mdash; `createdSchema`  \n**Type** &mdash; `Schema`  \n\n---  \n\n**Table**  \n- `createdTable`  \n\n",
    },
    {
        script: "CREATE INDEX createdIndex ON tableTest1 (tableColumnTest1); DROP INDEX createdIndex",
        hoveringWord: "createdIndex",
        cursorOffset: 83,
        expectedQuickInfo: "**Name** &mdash; `createdIndex`  \n**Type** &mdash; `Index`  \n**Scope** &mdash; `defaultSchemaTest`  \n",
    },
    {
        script: "CREATE PROC createdProc AS SELECT * FROM tableTest1; GO; DROP PROC createdProc",
        hoveringWord: "createdProc",
        cursorOffset: 78,
        expectedQuickInfo: "**Name** &mdash; `createdProc`  \n**Type** &mdash; `StoredProcedure`  \n**Scope** &mdash; `defaultSchemaTest`  \n",
    },
    {
        script: "CREATE FUNCTION createdFunc () RETURNS int BEGIN RETURN 0 END; SELECT createdFunc",
        hoveringWord: "createdFunc",
        cursorOffset: 81,
        expectedQuickInfo: "**Name** &mdash; `createdFunc`  \n**Type** &mdash; `Function`  \n**Scope** &mdash; `defaultSchemaTest`  \n",
    },
    {
        script: "CREATE FUNCTION createdFunc () RETURNS int BEGIN RETURN 0 END; SELECT createdFunc() FROM",
        hoveringWord: "createdFunc",
        cursorOffset: 81,
        expectedQuickInfo: "**Name** &mdash; `createdFunc`  \n**Type** &mdash; `Function`  \n**Scope** &mdash; `defaultSchemaTest`  \n",
    },
    // QuickInfo for alias
    {
        script: "SELECT * FROM tableTest1 as aliasTable",
        hoveringWord: "aliasTable",
        cursorOffset: 38,
        expectedQuickInfo: "**Name** &mdash; `tableTest1`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `tableColumnTest1(DateTime)`  \n- `tableColumnTest2(int)`  \n",
    },
    {
        script: "SELECT tableColumnTest1 AS aliasColumn FROM tableTest1",
        hoveringWord: "aliasColumn",
        cursorOffset: 38,
        expectedQuickInfo: "**Name** &mdash; `tableColumnTest1`  \n**Type** &mdash; `DateTime`  \n**Scope** &mdash; `defaultSchemaTest.tableTest1`  \n",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1 FROM createdTable as aliasTable",
        hoveringWord: "aliasTable",
        cursorOffset: 93,
        expectedQuickInfo: "**Name** &mdash; `createdTable`  \n**Type** &mdash; `Table`  \n**Scope** &mdash; `defaultSchemaTest`  \n\n---\n**Columns**  \n- `c1(Column)`  \n- `c2(Column)`  \n- `c3(Column)`  \n",
    },
    {
        script: "CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT c1 as aliasColumn FROM createdTable",
        hoveringWord: "aliasColumn",
        cursorOffset: 76,
        expectedQuickInfo: "**Name** &mdash; `c1`  \n**Type** &mdash; `Column`  \n**Scope** &mdash; `createdTable`  \n",
    },
    {
        script: "WITH t2 AS (SELECT tableColumnTest1 AS tc1, tableColumnTest2 tc2, 1 + 1 AS tc3 FROM tableTest1) SELECT tc1 FROM t2",
        hoveringWord: "tc1",
        cursorOffset: 106,
        expectedQuickInfo: "**Name** &mdash; `tc1`  \n**Type** &mdash; `DateTime`  \n**Scope** &mdash; `t2`  \n",
    },
    {
        script: "WITH t2 AS (SELECT tableColumnTest1 AS tc1, tableColumnTest2 tc2, 1 + 1 AS tc3 FROM tableTest1) SELECT tc2 FROM t2",
        hoveringWord: "tc2",
        cursorOffset: 106,
        expectedQuickInfo: "**Name** &mdash; `tc2`  \n**Type** &mdash; `int`  \n**Scope** &mdash; `t2`  \n",
    },
    {
        script: "WITH t2 AS (SELECT tableColumnTest1 AS tc1, tableColumnTest2 tc2, 1 + 1 AS tc3 FROM tableTest1) SELECT tc3 FROM t2",
        hoveringWord: "tc3",
        cursorOffset: 106,
        expectedQuickInfo: "**Name** &mdash; `tc3`  \n**Type** &mdash; `Column`  \n**Scope** &mdash; `t2`  \n",
    },
    // QuickInfo for star
    {
        script: "SELECT * FROM tableTest1",
        hoveringWord: "*",
        cursorOffset: 7,
        range: { startLineNumber: 1, startColumn: 8, endLineNumber: 1, endColumn: 9 },
        expectedQuickInfo: "Selecting all columns from `tableTest1`  \n\n---\n**Columns**  \n- `tableColumnTest1(DateTime)`  \n- `tableColumnTest2(int)`  \n",
    },
    {
        script: "SELECT * FROM viewTest1",
        hoveringWord: "*",
        cursorOffset: 7,
        range: { startLineNumber: 1, startColumn: 8, endLineNumber: 1, endColumn: 9 },
        expectedQuickInfo: "Selecting all columns from `viewTest1`  \n\n---\n**Columns**  \n- `viewColumnTest1(double)`  \n- `viewColumnTest2(float)`  \n",
    },
    {
        script: "SELECT * FROM tableTest4",
        hoveringWord: "*",
        cursorOffset: 7,
        range: { startLineNumber: 1, startColumn: 8, endLineNumber: 1, endColumn: 9 },
        expectedQuickInfo: "Selecting all columns from `tableTest4`  \n\n---\nChild not found  \n",
    },
];
