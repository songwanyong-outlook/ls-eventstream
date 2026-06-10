import { CodeActionKind, ICodeActionResult, IRangeItem } from '../../../../CommonSqlUtils/Utils';

export interface ISqlCodeActionTestCase {
    script: string;
    range: IRangeItem;
    expectedResult: ICodeActionResult[];
}

export const sqlCodeActionTestCases: ISqlCodeActionTestCase[] = [
    {
        script: "SELECT * FROM tableTest1;",
        range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 },
        expectedResult: [
            {
                kind: CodeActionKind.StarExpansion,
                range: { startLineNumber: 1, startColumn: 8, endLineNumber: 1, endColumn: 9 },
                text: "tableColumnTest1, tableColumnTest2",
            },
        ],
    },
    {
        script: "SELECT * FROM tableTest2;",
        range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 },
        expectedResult: [],
    },
    {
        script: `SELECT * FROM tableTest1;
SELECT * FROM tableTest3;`,
        range: { startLineNumber: 2, startColumn: 10, endLineNumber: 2, endColumn: 14 },
        expectedResult: [
            {
                kind: CodeActionKind.StarExpansion,
                range: { startLineNumber: 2, startColumn: 8, endLineNumber: 2, endColumn: 9 },
                text: "tableColumnTest5, tableColumnTest6",
            },
        ],
    },
    {
        script: "SELECT * FROM tableTest1;",
        range: { startLineNumber: 1, startColumn: 20, endLineNumber: 1, endColumn: 25 },
        expectedResult: [
            {
                kind: CodeActionKind.StarExpansion,
                range: { startLineNumber: 1, startColumn: 8, endLineNumber: 1, endColumn: 9 },
                text: "tableColumnTest1, tableColumnTest2",
            },
        ],
    },
    {
        script: "SELECT * FROM tableTest1;",
        range: { startLineNumber: 1, startColumn: 26, endLineNumber: 1, endColumn: 26 },
        expectedResult: [],
    },
    {
        script: `WITH t1 AS (SELECT * FROM tableTest1)
SELECT * FROM t1;`,
        range: { startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 },
        expectedResult: [],
    },
    {
        script: `WITH t1 AS (SELECT * FROM tableTest1)
SELECT * FROM t1;`,
        range: { startLineNumber: 1, startColumn: 20, endLineNumber: 1, endColumn: 21 },
        expectedResult: [
            {
                kind: CodeActionKind.StarExpansion,
                range:  { startLineNumber: 1, startColumn: 20, endLineNumber: 1, endColumn: 21 },
                text: "tableColumnTest1, tableColumnTest2",
            },
        ],
    },
    {
        script: `WITH t1 AS (SELECT * FROM tableTest1)
SELECT * FROM t1;`,
        range: { startLineNumber: 2, startColumn: 9, endLineNumber: 2, endColumn: 9 },
        expectedResult: [
            {
                kind: CodeActionKind.StarExpansion,
                range: { startLineNumber: 2, startColumn: 8, endLineNumber: 2, endColumn: 9 },
                text: "tableColumnTest1, tableColumnTest2",
            },
        ],
    },
];
