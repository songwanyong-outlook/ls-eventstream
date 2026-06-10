import { IRangeItem } from '../../../../CommonSqlUtils/Utils';

export interface ISqlCodeActionTestCase {
    script: string;
    range: IRangeItem;
    expectedResult: string[];
}

export const sqlCodeActionTestCases: ISqlCodeActionTestCase[] = [{
    script: "SELECT table1_column1 FROM tableTest1",
    range: { startLineNumber: 1, startColumn: 28, endLineNumber: 1, endColumn: 38 },
    expectedResult: [
        'Replace "tableTest1" with "table1"',
        'Replace "tableTest1" with "table2"',
        'Replace "tableTest1" with "table3"',
        'Replace "tableTest1" with "table-4"',
        'Replace "tableTest1" with "db1.schema1.table1"',
    ],
}, {    
    script: "SELECT table1_column1 FROM [tableTest1]",
    range: { startLineNumber: 1, startColumn: 29, endLineNumber: 1, endColumn: 39 },
    expectedResult: [
        'Replace "tableTest1" with "table1"',
        'Replace "tableTest1" with "table2"',
        'Replace "tableTest1" with "table3"',
        'Replace "tableTest1" with "table-4"',
        'Replace "tableTest1" with "db1.schema1.table1"',
    ],
}, {
    script: "SELECT table1_column1 INTO output1 FROM table1",
    range: { startLineNumber: 1, startColumn: 28, endLineNumber: 1, endColumn: 35 },
    expectedResult: [
        'Replace "output1" with "outputStream1"',
        'Replace "output1" with "outputStream2"',
    ],
}, {
    script: "SELECT table1_column1 INTO [output1] FROM table1",
    range: { startLineNumber: 1, startColumn: 29, endLineNumber: 1, endColumn: 36 },
    expectedResult: [
        'Replace "output1" with "outputStream1"',
        'Replace "output1" with "outputStream2"',
    ],
}];
