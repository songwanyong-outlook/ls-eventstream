export interface ISqlIncrementalParsingTestCase {
    script: string;
    positions: number[];
    expectedCachedTokenIndexes: number[];
}

export const sqlIncrementalParsingTestCases: ISqlIncrementalParsingTestCase[] = [
    {
        script: 
`SELECT a FROM t;
GO
SELECT a `,
        positions: [17, 20, 26, 28],
        expectedCachedTokenIndexes: [0, 5, 5, 5],
    } as ISqlIncrementalParsingTestCase,
    {
        script:
`SELECT a FROM t;
SELECT;
SELECT a FROM t;
SELECT a FROM t;
SELECT a `,
        positions: [17, 23, 25, 31, 42, 48, 50, 59, 65],
        expectedCachedTokenIndexes: [0, 0, 0, 0, 5, 5, 7, 7, 7],
    } as ISqlIncrementalParsingTestCase,
    {
        script: 
`SELECT a FROM t;
SELECT b FROM t;
SELECT c FROM;
SELECT d FROM t;
SELECT FROM t;
SELECT e FROM WHERE a = 1;
SELECT f FROM t;
SELECT g;`,
        positions: [33, 48, 65, 108, 125, 131],
        expectedCachedTokenIndexes: [0, 5, 5, 5, 30, 30],
    } as ISqlIncrementalParsingTestCase,
    {
        script: 
`SELECT a FROM t;
CREATE PROCEDURE [wwi].[InitialSalesDataPopulation] AS
BEGIN
    INSERT INTO [wwi].[seed_Sale] (
        [Sale Key]
    )
    SELECT
        [Sale Key]
    FROM [wwi].[seed_Sale]
    INSERT INTO [wwi].[seed_Sale] (
        [Sale Key]
    )
    SELECT
        [Sale Key]
    FROM [wwi].[seed_Sale]
    INSERT INTO [wwi].[seed_Sale] (
        [Sale Key]
    )
    SELECT
        [Sale Key]
    FROM [wwi].[seed_Sale]
END
SELECT a FROM t;
SELECT a;`,
        positions: [16, 82, 122, 143, 200, 318, 379, 436, 453, 460],
        expectedCachedTokenIndexes: [0, 5, 5, 5, 5, 5, 5, 5, 5, 55],
    } as ISqlIncrementalParsingTestCase,
];

export interface IMetadataIntellisenseTestCaseWithIncrementalParsing {
    script: string;
    expectedTokens: string[];
}

export const metadataIntellisenseTestCasesWithIncrementalParsing: IMetadataIntellisenseTestCaseWithIncrementalParsing[] = [
    { 
        script: 
`CREATE SCHEMA createdSchema1

CREATE SCHEMA createdSchema2

ALTER SCHEMA `,
        expectedTokens: ['createdSchema1', 'createdSchema2'], 
    } as IMetadataIntellisenseTestCaseWithIncrementalParsing,
];