import { IFoldingRange } from "@CommonSqlUtils/Utils";

export interface ICodeFoldingTestCase {
    script: string;
    expected: IFoldingRange[];
}

export const codeFoldingTestCases: ICodeFoldingTestCase[] = [
    {
        script: `CREATE EXTERNAL FILE FORMAT TextFileFormat WITH (
    FORMAT_TYPE = DELIMITEDTEXT,
    FORMAT_OPTIONS (
        FIELD_TERMINATOR = '|',
        USE_TYPE_DEFAULT = FALSE
    )
);
`,
        expected: [
            {
                start: 1,
                end: 7,
            },
            {
                start: 3,
                end: 6,
            },
        ],
    },
    {
        script: `CREATE EXTERNAL TABLE [ext].[dimension_City] (
    [City Key][int] NOT NULL,
    [Location]
        [nvarchar] (
            76
        )
    NULL
)
WITH (
    LOCATION = '/dimension_City/',
    DATA_SOURCE = WWIStorage,
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
);

CREATE EXTERNAL TABLE [ext].[dimension_Customer] (
    [Customer Key][int] NOT NULL
)
WITH (
    LOCATION = '/dimension_Customer/',
    DATA_SOURCE = WWIStorage,
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
);
`,
        expected: [
            {
                start: 1, 
                end: 15,
            },
            { 
                start: 2,
                end: 7,
            },
            { 
                start: 3,
                end: 7,
            },
            {
                start: 4,
                end: 6,
            },
            { 
                start: 17, 
                end: 26, 
            },
        ],
    },
];
