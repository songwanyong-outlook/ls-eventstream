export interface ICodeFormattingTestCase {
    script: string;
    expected: string;
}

export const codeFormattingTestCases: ICodeFormattingTestCase[] = [
    {
        script: `CREATE EXTERNAL TABLE [ext].[dimension_TransactionType](
[Transaction Type Key] [int] NOT NULL
)    
WITH ( LOCATION ='/dimension_TransactionType/',   
DATA_SOURCE = WWIStorage,  
FILE_FORMAT = TextFileFormat,
REJECT_TYPE = VALUE,
REJECT_VALUE = 0
)
CREATE EXTERNAL TABLE [ext].[fact_Movement] (
[Movement Key] [bigint] NOT NULL
)
WITH ( LOCATION ='/fact_Movement/',   
DATA_SOURCE = WWIStorage,  
FILE_FORMAT = TextFileFormat,
REJECT_TYPE = VALUE,
REJECT_VALUE = 0
);
`,
        expected: `CREATE EXTERNAL TABLE [ext].[dimension_TransactionType] (
    [Transaction Type Key][int] NOT NULL
)
WITH (
    LOCATION = '/dimension_TransactionType/',
    DATA_SOURCE = WWIStorage,
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
)

CREATE EXTERNAL TABLE [ext].[fact_Movement] (
    [Movement Key][bigint] NOT NULL
)
WITH (
    LOCATION = '/fact_Movement/',
    DATA_SOURCE = WWIStorage,
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
);
`,
    },
    {
        script: `CREATE PROCEDURE [wwi].[InitialSalesDataPopulation] AS
BEGIN
INSERT INTO [wwi].[seed_Sale] (
[Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
)
SELECT
[Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
FROM [wwi].[seed_Sale]
INSERT INTO [wwi].[seed_Sale] (
[Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
)
SELECT
[Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
FROM [wwi].[seed_Sale]
INSERT INTO [wwi].[seed_Sale] (
[Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
)
SELECT
[Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
FROM [wwi].[seed_Sale]
END
`,
        expected: `CREATE PROCEDURE [wwi].[InitialSalesDataPopulation] AS BEGIN
INSERT INTO [wwi].[seed_Sale] (
    [Sale Key],
    [City Key],
    [Customer Key],
    [Bill To Customer Key],
    [Stock Item Key],
    [Invoice Date Key],
    [Delivery Date Key],
    [Salesperson Key],
    [WWI Invoice ID],
    [Description],
    [Package],
    [Quantity],
    [Unit Price],
    [Tax Rate],
    [Total Excluding Tax],
    [Tax Amount],
    [Profit],
    [Total Including Tax],
    [Total Dry Items],
    [Total Chiller Items],
    [Lineage Key]
)
SELECT [Sale Key],
[City Key],
[Customer Key],
[Bill To Customer Key],
[Stock Item Key],
[Invoice Date Key],
[Delivery Date Key],
[Salesperson Key],
[WWI Invoice ID],
[Description],
[Package],
[Quantity],
[Unit Price],
[Tax Rate],
[Total Excluding Tax],
[Tax Amount],
[Profit],
[Total Including Tax],
[Total Dry Items],
[Total Chiller Items],
[Lineage Key] FROM [wwi].[seed_Sale]

INSERT INTO [wwi].[seed_Sale] (
    [Sale Key],
    [City Key],
    [Customer Key],
    [Bill To Customer Key],
    [Stock Item Key],
    [Invoice Date Key],
    [Delivery Date Key],
    [Salesperson Key],
    [WWI Invoice ID],
    [Description],
    [Package],
    [Quantity],
    [Unit Price],
    [Tax Rate],
    [Total Excluding Tax],
    [Tax Amount],
    [Profit],
    [Total Including Tax],
    [Total Dry Items],
    [Total Chiller Items],
    [Lineage Key]
)
SELECT [Sale Key],
[City Key],
[Customer Key],
[Bill To Customer Key],
[Stock Item Key],
[Invoice Date Key],
[Delivery Date Key],
[Salesperson Key],
[WWI Invoice ID],
[Description],
[Package],
[Quantity],
[Unit Price],
[Tax Rate],
[Total Excluding Tax],
[Tax Amount],
[Profit],
[Total Including Tax],
[Total Dry Items],
[Total Chiller Items],
[Lineage Key] FROM [wwi].[seed_Sale]

INSERT INTO [wwi].[seed_Sale] (
    [Sale Key],
    [City Key],
    [Customer Key],
    [Bill To Customer Key],
    [Stock Item Key],
    [Invoice Date Key],
    [Delivery Date Key],
    [Salesperson Key],
    [WWI Invoice ID],
    [Description],
    [Package],
    [Quantity],
    [Unit Price],
    [Tax Rate],
    [Total Excluding Tax],
    [Tax Amount],
    [Profit],
    [Total Including Tax],
    [Total Dry Items],
    [Total Chiller Items],
    [Lineage Key]
)
SELECT [Sale Key],
[City Key],
[Customer Key],
[Bill To Customer Key],
[Stock Item Key],
[Invoice Date Key],
[Delivery Date Key],
[Salesperson Key],
[WWI Invoice ID],
[Description],
[Package],
[Quantity],
[Unit Price],
[Tax Rate],
[Total Excluding Tax],
[Tax Amount],
[Profit],
[Total Including Tax],
[Total Dry Items],
[Total Chiller Items],
[Lineage Key] FROM [wwi].[seed_Sale]
END
`,
    },
    {
        script: `CREATE TABLE [dbo].[fact_Order10000]
WITH(DISTRIBUTION = HASH([Order Key]),CLUSTERED COLUMNSTORE INDEX)
AS
SELECT top 10000 * FROM [ext].[fact_Order1G]    
CREATE TABLE [dbo].[fact_Order100000]
WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
AS
SELECT top 100000 * FROM [ext].[fact_Order1G] 

CREATE TABLE [dbo].[fact_Order1005000]
WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
AS
SELECT top 1005000 * FROM [ext].[fact_Order1G]     
CREATE TABLE [dbo].[fact_Order1005000]
WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
AS
SELECT top 1005000 * FROM [ext].[fact_Order1G] 
`,
        expected: `CREATE TABLE [dbo].[fact_Order10000] WITH (
    DISTRIBUTION = HASH (
        [Order Key]
    ),
    CLUSTERED COLUMNSTORE INDEX
)
AS
    SELECT TOP 10000
        *
    FROM [ext].[fact_Order1G]

CREATE TABLE [dbo].[fact_Order100000] WITH (
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
)
AS
    SELECT TOP 100000
        *
    FROM [ext].[fact_Order1G]

CREATE TABLE [dbo].[fact_Order1005000] WITH (
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
)
AS
    SELECT TOP 1005000
        *
    FROM [ext].[fact_Order1G]

CREATE TABLE [dbo].[fact_Order1005000] WITH (
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
)
AS
    SELECT TOP 1005000
        *
    FROM [ext].[fact_Order1G]
`,
    },
    {
        script: `CREATE FUNCTION InlineFunction_1
(  
    -- Add the parameters for the function here
    @param1 int
)
/* some comment */
RETURNS TABLE 
AS
RETURN 
(
    -- Add the SELECT statement with parameter references here
    SELECT a.column_1 /* some comment */, b.column_2/* some comment */
    FROM table_1 a
    INNER JOIN table_2 b
    ON a.column_1 = b.column_1
    WHERE a.column_4 > @param1
)--some comment
GO
--some comment
`,
        expected: `CREATE FUNCTION
    InlineFunction_1 (
        -- ADD the parameters FOR the FUNCTION here
        @param1 INT
    )
/* some comment */
RETURNS TABLE AS RETURN (
    -- ADD the SELECT statement WITH parameter REFERENCES here
    SELECT
        a.column_1 /* some comment */ ,
        b.column_2 /* some comment */
        FROM
            table_1 a INNER JOIN table_2 b ON a.column_1 = b.column_1
        WHERE
            a.column_4 > @param1
) --some comment
GO
--some comment
`,
    },
    {
        script: `CREATE TABLE createdTable (c1 int, c2 int, c3 int); SELECT createdTable`,
        expected: `CREATE TABLE createdTable (
    c1 INT,
    c2 INT,
    c3 INT
);

SELECT createdTable
`,
    },
];
