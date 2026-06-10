// https://github.com/Azure/ProjectArcadia
const sampleScriptsUnderProjectArcadia: string[] = [
    `CREATE MASTER KEY;`
    ,
    `CREATE DATABASE SCOPED CREDENTIAL arcadiadataset   
    WITH 
    IDENTITY = 'whatever',  SECRET = '-----';  
    `
    ,
    `CREATE EXTERNAL DATA SOURCE WWIStorage
    WITH
    (
    TYPE = Hadoop,
    LOCATION = 'wasbs://wideworldimporters@datasetarcadia.blob.core.windows.net',
    CREDENTIAL = arcadiadataset
    );`
    ,
    `CREATE EXTERNAL FILE FORMAT TextFileFormat 
    WITH 
    (   
    FORMAT_TYPE = DELIMITEDTEXT,
    FORMAT_OPTIONS
    (   
    FIELD_TERMINATOR = '|',
    USE_TYPE_DEFAULT = FALSE 
    )
    );`
    ,
    `CREATE SCHEMA ext;
    GO
    CREATE SCHEMA wwi;`
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_City](
    [City Key] [int] NOT NULL,
    [Location] [nvarchar](76) NULL
    )
    WITH (LOCATION='/dimension_City/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );  
    CREATE EXTERNAL TABLE [ext].[dimension_Customer] (
    [Customer Key] [int] NOT NULL
    )
    WITH (LOCATION='/dimension_Customer/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );  `
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_Employee] (
    [Employee Key] [int] NOT NULL,
    [Photo] [varbinary](300) NULL
    )
    WITH ( LOCATION='/dimension_Employee/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[dimension_PaymentMethod] (
    [Payment Method Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/dimension_PaymentMethod/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_StockItem](
    [Stock Item Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/dimension_StockItem/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[dimension_Supplier](
    [Supplier Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/dimension_Supplier/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_TransactionType](
    [Transaction Type Key] [int] NOT NULL
    )    
    WITH ( LOCATION ='/dimension_TransactionType/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_Movement] (
    [Movement Key] [bigint] NOT NULL
    )
    WITH ( LOCATION ='/fact_Movement/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[fact_Order] (
    [Order Key] [bigint] NOT NULL,
    [Order Date Key] [date] NOT NULL,
    [WWI Backorder ID] [int] NULL
    )
    WITH ( LOCATION ='/fact_Order/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_Purchase] (
    [Purchase Key] [bigint] NOT NULL,
    [WWI Purchase Order ID] [int] NULL
    )
    WITH ( LOCATION ='/fact_Purchase/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[fact_Sale] (
    [Sale Key] [bigint] NOT NULL,
    [City Key] [int] NOT NULL,
    [Delivery Date Key] [date] NULL,
    [Description] [nvarchar](100) NOT NULL,
    [Total Including Tax] [decimal](18, 2) NOT NULL
    )
    WITH ( LOCATION ='/fact_Sale/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_StockHolding] (
    [Stock Holding Key] [bigint] NOT NULL,
    [Stock Item Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/fact_StockHolding/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_Transaction] (
    [Transaction Key] [bigint] NOT NULL,
    [Date Key] [date] NOT NULL,
    [Customer Key] [int] NULL
    )
    WITH ( LOCATION ='/fact_Transaction/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE TABLE [wwi].[dimension_City]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_City]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_City]')
    ;
    
    CREATE TABLE [wwi].[dimension_Customer]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_Customer]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_Customer]')
    ;
    
    CREATE TABLE [wwi].[dimension_Employee]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_Employee]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_Employee]')
    ;
    
    CREATE TABLE [wwi].[dimension_PaymentMethod]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_PaymentMethod]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_PaymentMethod]')
    ;
    
    CREATE TABLE [wwi].[dimension_StockItem]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_StockItem]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_StockItem]')
    ;`
    ,
    `CREATE TABLE [wwi].[dimension_Supplier]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_Supplier]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_Supplier]')
    ;
    
    CREATE TABLE [wwi].[dimension_TransactionType]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_TransactionType]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_TransactionType]')
    ;
    
    CREATE TABLE [wwi].[fact_Movement]
    WITH
    ( 
    DISTRIBUTION = HASH([Movement Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Movement]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Movement]')
    ;
    
    CREATE TABLE [wwi].[fact_Order]
    WITH
    ( 
    DISTRIBUTION = HASH([Order Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Order]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Order]')
    ;
    
    CREATE TABLE [wwi].[fact_Purchase]
    WITH
    ( 
    DISTRIBUTION = HASH([Purchase Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Purchase]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Purchase]')
    ;
    
    CREATE TABLE [wwi].[seed_Sale]
    WITH
    ( 
    DISTRIBUTION = HASH([WWI Invoice ID]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Sale]
    OPTION (LABEL = 'CTAS : Load [wwi].[seed_Sale]')
    ;
    
    CREATE TABLE [wwi].[fact_StockHolding]
    WITH
    ( 
    DISTRIBUTION = HASH([Stock Holding Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_StockHolding]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_StockHolding]')
    ;
    
    CREATE TABLE [wwi].[fact_Transaction]
    WITH
    ( 
    DISTRIBUTION = HASH([Transaction Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Transaction]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Transaction]')
    ;`
    ,
    `SELECT * FROM sys.dm_pdw_exec_requests;`
    ,
    `CREATE TABLE [wwi].[dimension_Date]
    (
    [Date] [datetime] NOT NULL,
    [Day Number] [int] NOT NULL,
    [Day] [nvarchar](10) NOT NULL,
    [Short Month] [nvarchar](3) NOT NULL
    )
    WITH 
    (
    DISTRIBUTION = REPLICATE,
    CLUSTERED INDEX ([Date])
    );
    CREATE TABLE [wwi].[fact_Sale]
    (
    [Sale Key] [bigint] IDENTITY(1,1) NOT NULL,
    [Quantity] [int] NOT NULL,
    [Unit Price] [decimal](18, 2) NOT NULL
    )
    WITH
    (
    DISTRIBUTION = HASH ( [WWI Invoice ID] ),
    CLUSTERED COLUMNSTORE INDEX
    )`
    ,
    `CREATE PROCEDURE [wwi].[InitialSalesDataPopulation] AS
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
    END`
    ,
    `EXEC [wwi].[InitialSalesDataPopulation]
    EXEC [wwi].[Configuration_PopulateLargeSaleTable] 100000, 2000`
    ,
    `EXEC sp_spaceused N'wwi.fact_Sale';`
    ,
    `CREATE PROCEDURE    [dbo].[prc_sqlcompute_create_stats]
    (   @create_type    tinyint
    ,   @sample_pct     tinyint
    )
    AS
    
    IF @create_type IS NULL
    BEGIN
    SET @create_type = 1;
    END;
    
    IF @create_type NOT IN (1,2,3)
    BEGIN
    THROW 151000,'Invalid value for @stats_type parameter. Valid range 1 (default), 2 (fullscan) or 3 (sample).',1;
    END;
    
    IF @sample_pct IS NULL
    BEGIN;
    SET @sample_pct = 20;
    END;
    
    IF OBJECT_ID('tempdb..#stats_ddl') IS NOT NULL
    BEGIN;
    DROP TABLE #stats_ddl;
    END;
    
    CREATE TABLE #stats_ddl
    WITH    (   DISTRIBUTION    = HASH([seq_nmbr])
    ,   LOCATION        = USER_DB
    )
    AS
    WITH T
    AS
    (
    SELECT      t.[name]                        AS [table_name]
    ,           ROW_NUMBER()
    OVER(ORDER BY (SELECT NULL))    AS [seq_nmbr]
    FROM        sys.[tables] t
    JOIN        sys.[schemas] s         ON  t.[schema_id]       = s.[schema_id]
    JOIN        sys.[columns] c         ON  t.[object_id]       = c.[object_id]
    LEFT JOIN   sys.[stats_columns] l   ON  l.[object_id]       = c.[object_id]
    AND l.[column_id]       = c.[column_id]
    AND l.[stats_column_id] = 1
    LEFT JOIN    sys.[external_tables] e    ON    e.[object_id]        = t.[object_id]
    WHERE       l.[object_id] IS NULL
    AND            e.[object_id] IS NULL 
    )
    SELECT  [table_schema_name]
    ,       CASE @create_type
    WHEN 1
    THEN    CAST('CREATE STATISTICS '+QUOTENAME('stat_'+table_schema_name+ '_' + table_name + '_'+column_name)+' ON '+QUOTENAME(table_schema_name)+'.'+QUOTENAME(table_name)+'('+QUOTENAME(column_name)+')' AS VARCHAR(8000))
    WHEN 2
    THEN    CAST('CREATE STATISTICS '+QUOTENAME('stat_'+table_schema_name+ '_' + table_name + '_'+column_name)+' ON '+QUOTENAME(table_schema_name)+'.'+QUOTENAME(table_name)+'('+QUOTENAME(column_name)+') WITH FULLSCAN' AS VARCHAR(8000))
    WHEN 3
    THEN    CAST('CREATE STATISTICS '+QUOTENAME('stat_'+table_schema_name+ '_' + table_name + '_'+column_name)+' ON '+QUOTENAME(table_schema_name)+'.'+QUOTENAME(table_name)+'('+QUOTENAME(column_name)+') WITH SAMPLE '+CONVERT(varchar(4),@sample_pct)+' PERCENT' AS VARCHAR(8000))
    END AS create_stat_ddl
    FROM T
    ;
    
    DECLARE @i INT              = 1
    ,       @t INT              = (SELECT COUNT(*) FROM #stats_ddl)
    ,       @s NVARCHAR(4000)   = N''
    ;
    
    WHILE @i <= @t
    BEGIN
    SET @s=(SELECT create_stat_ddl FROM #stats_ddl WHERE seq_nmbr = @i);
    PRINT @s
    EXEC sp_executesql @s
    SET @i+=1;
    END
    
    DROP TABLE #stats_ddl;`
    ,
    `EXEC [dbo].[prc_sqlcompute_create_stats] 1, NULL;`
    ,
    `CREATE TABLE department (
    DepartmentID INT NULL,
    DepartmentName VARCHAR(20) );
    
    CREATE TABLE employee (
    LastName VARCHAR(20),
    DepartmentID INT NULL );
    
    INSERT INTO department VALUES(31, 'Sales');
    INSERT INTO employee VALUES('Williams', NULL);`
    ,
    `SELECT *
    FROM employee CROSS JOIN department;`,
];

const otherSampleScripts: string[] = [
    `CREATE USER [xxxw@microsoft.com] FROM EXTERNAL PROVIDER;`
    ,
    `EXEC sp_addrolemember 'db_owner', 'xxx@microsoft.com'`
    ,
    `CREATEUSER [yuwwang@microsoft.com] FROMEXTERNALPROVIDER;
    CREATE CREDENTIAL [https://pierowebtooling1.dfs.core.windows.net]
    WITH IDENTITY='User Identity'`
    ,
    `CREATE TABLE #Fhvtemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT  PickupDate, count([dispatchBaseNum]) as fhvrides
    FROM [dbo].[Fhv]
    group by [PickupDate]
    )
    ;
    
    CREATE TABLE #Yellowtemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT  PickupDate as PickupDateYellow, count([vendorID]) as Yellowrides
    FROM [dbo].[YellowCab]
    group by [PickupDate]
    )
    ;
    
    CREATE TABLE #Greentemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT  PickupDate as PickupDateGreen, count([vendorID]) as Greenrides
    FROM [dbo].[GreenCab]
    group by [PickupDate]
    )
    ;
    
    Select CONVERT(varchar(10), PickupDate, 112) as PickupDate,fhvrides,Yellowrides, Greenrides from #Fhvtemp
    INNER JOIN #Yellowtemp ON #Yellowtemp.PickupDateYellow = #Fhvtemp.PickupDate
    INNER JOIN #Greentemp ON #Greentemp.PickupDateGreen = #Fhvtemp.PickupDate
    ORDER BY PickupDate ASC
    `
    ,
    `Select top 100 t2.[City],
    Count(t1.OrderKey) as OrderCount, 
    Sum(TotalIncludingTax) as TotalIncludingTax, 
    AVG(UnitPrice) as AvgUnitPrice, 
    case when Sum(TotalIncludingTax)<20000 then '0~20000' else '>20000' end as TotalRank
    from Fact_Order t1 left join Dimension_City t2 on t1.[CityKey]=t2.[CityKey]
    Group by t2.[City]
    order by Sum(TotalIncludingTax) desc`
    ,
    `CREATE CREDENTIAL [https://pierowebtooling1.dfs.core.windows.net]
    WITH IDENTITY='User Identity'`
    ,
    `CREATE DATABASE TestDW COLLATE Latin1_General_100_CI_AS_KS_WS
    (MAXSIZE = 10240 GB, EDITION = 'datawarehouse', SERVICE_OBJECTIVE = 'DW1000');`
    ,
    `DROP EXTERNAL DATA SOURCE [CabAAD]
    GO
    `
    ,
    `SELECT * FROM [VeryImportantView]`
    ,
    `CREATE EXTERNAL DATA SOURCE [CabAAD] WITH 
    (	TYPE = HADOOP,
    LOCATION = N'wasbs://nyctlc@azureopendatastorage.blob.core.windows.net/'
    );
    GO`
    ,
    `CREATE EXTERNAL FILE FORMAT [parquetfile] 
    WITH (
    FORMAT_TYPE = PARQUET, 
    DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec'
    )
    GO`
    ,
    `create table timetest2 (dt datetime)
    while 1=1
    BEGIN
    insert into timetest1 select getdate()
    end
    `
    ,
    `create table timetest (dt datetime)
    while 1=1
    BEGIN
    insert into timetest select getdate()
    end
    `
    ,
    `exec dbo.LoadDataFHV`
    ,
    `CREATE TABLE [dbo].[fact_Order10000]
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
    `
    ,
    `drop TABLE [dbo].[dimension_City]
    CREATE TABLE [dbo].[dimension_City]
    (
    [CityKey] [int] NOT NULL,
    [Location] [nvarchar](176) NULL,
    [LatestRecordedPopulation] [bigint] NOT NULL
    )
    WITH
    (
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )`
    ,
    `CREATE TABLE [dbo].[fact_Order1000000]
    WITH
    ( 
        DISTRIBUTION = HASH([Order Key]),
        CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT top 1000000 * FROM [ext].[fact_Order1G]
    
    CREATE TABLE [dbo].[fact_Order100000]
    WITH
    ( 
        DISTRIBUTION = HASH([Order Key]),
        CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT top 100000 * FROM [ext].[fact_Order1G]`
    ,
    `select * from [dbo].[fact_Order] t1 left join [dbo].[dimension_City] t2 on t1.[CityKey]=t2.[CityKey]`
    ,
    `select City, [StateProvince],  cast([OrderDateKey] as varchar(10)) as [Date], sum([TotalIncludingTax]) as [TotalwithTax], TaxAmount
    from [dbo].[fact_Order] t1 
    left join [dbo].[dimension_City] t2 on t1.[CityKey]=t2.[CityKey]
    where [StateProvince] IS NOT NULL
    group by City, [StateProvince],  cast([OrderDateKey] as varchar(10)), TaxAmount
    Order by [TotalwithTax]`
    ,
    `SELECT 1 as aaaa`
    ,
    `select City, [StateProvince],  cast([OrderDateKey] as varchar(10)) as [Date], sum([TotalIncludingTax]) as [Total Including Tax] 
    from Fact_Order t1 
    left join [dbo].[dimension_City] t2 on t1.[CityKey]=t2.[CityKey]
    group by City, [StateProvince],  cast([OrderDateKey] as varchar(10))
    Order by [Total Including Tax]
    
    select Top 100 * from dbo.factYellowCab`
    ,
    `Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select distinct top 1000 * from wwi.fact_Sale`
    ,
    `CREATE TABLE [dbo].[factYellowCabTest99]
    WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
    AS
    SELECT * FROM [dbo].[factYellowCab] 
    
    SELECT Count(*) from [dbo].[factYellowCabTest99]`
    ,
    `
    CREATE MASTER KEY;
    
    CREATE DATABASE SCOPED CREDENTIAL pierowebtooling1 
    WITH IDENTITY = 'whatever',SECRET = '-----';
    
    
    CREATE EXTERNAL FILE FORMAT [parquetFileFormat]  
    WITH (  
    FORMAT_TYPE = PARQUET,  
    DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec'  
    );
    
    CREATE EXTERNAL DATA SOURCE [pierowebtooling1DS] WITH (TYPE = HADOOP, LOCATION = N'abfss://competitor-analysis@pierowebtooling1.dfs.core.windows.net', CREDENTIAL = [pierowebtooling1])
    GO
    
    drop EXTERNAL TABLE [ext].[fact_Order1G]
    CREATE EXTERNAL TABLE [ext].[fact_Order1G]
    (
    [Order Key] [nvarchar](50)  NULL,
    [Description] [nvarchar](100)  NULL
    )
    WITH (DATA_SOURCE = [pierowebtooling1DS],LOCATION = N'/Shuai/fact_Order1Gparquet/',FILE_FORMAT = [parquetFileFormat],REJECT_TYPE = VALUE,REJECT_VALUE = 0)
    GO
    
    CREATE TABLE [dbo].[fact_Order]
    WITH
    ( 
        DISTRIBUTION = HASH([Order Key]),
        CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT top 1000 * FROM [ext].[fact_Order1G]
    
    `
    ,
    `drop EXTERNAL TABLE	[ext].dimension_City`
    ,
    `CREATE MASTER KEY;
    CREATE DATABASE SCOPED CREDENTIAL arcadiadataset WITH IDENTITY = 'whatever',SECRET = '-----'; 
    
    GO
    CREATE EXTERNAL DATA SOURCE WWIStorage 
    WITH (
    TYPE = Hadoop,
    LOCATION = 'wasbs://wideworldimporters@datasetarcadia.blob.core.windows.net',
    CREDENTIAL = arcadiadataset);
    
    GO
    CREATE EXTERNAL FILE FORMAT [TextFileFormat] 
    WITH (
    FORMAT_TYPE = DELIMITEDTEXT, 
    FORMAT_OPTIONS (FIELD_TERMINATOR = N'|', 
    USE_TYPE_DEFAULT = False))
    GO
    
    CREATE SCHEMA ext;
    GO
    CREATE SCHEMA wwi;
    
    GO`
    ,
    `DECLARE tables_cursor CURSOR  
    FOR  
    SELECT s.name, t.name   
    FROM sys.objects AS t  
    JOIN sys.schemas AS s ON s.schema_id = t.schema_id  
    WHERE t.type = 'U';  
    OPEN tables_cursor;  
    DECLARE @schemaname sysname;  
    DECLARE @tablename sysname;  
    FETCH NEXT FROM tables_cursor INTO @schemaname, @tablename;  
    WHILE (@@FETCH_STATUS <> -1)  
    BEGIN;  
    EXECUTE ('ALTER INDEX ALL ON ' + @schemaname + '.' + @tablename + ' REBUILD;');  
    FETCH NEXT FROM tables_cursor INTO @schemaname, @tablename;  
    END;  
    PRINT 'The indexes on all tables have been rebuilt.';  
    CLOSE tables_cursor;  
    DEALLOCATE tables_cursor;  
    GO  `,
];

const longScripts = [
    `Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc;
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc;
    
    Select distinct top 1000 * from wwi.fact_Sale
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc;
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select distinct top 1000 * from wwi.fact_Sale
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select distinct top 1000 * from wwi.fact_Sale
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select distinct top 1000 * from wwi.fact_Sale
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc;
    
    Select distinct top 1000 * from wwi.fact_Sale`,
];

const brokenScripts = [
    `CREATE MASTER KE;`
    ,
    `CREATE DATABASE SCOPED CREDENIAL arcadiadataset   
    WITH 
    IDENTITY = 'whatever',  SECRET = '-----';  
    `
    ,
    `CREATE EXTERNAL DATA SOURCE WWIStorage
    WITH
    (
    TYPE = Hadoop,
    LOCATION = 'wasbs://wideworldimporters@datasetarcadia.blob.core.windows.net',
    CREDENTIAL = arcadiadataset
    SELECT
    );`
    ,
    `CREATE EXT=RNAL FILE FORMAT TextFileFormat 
    WITH 
    (   
    FORMAT_TYPE = DELIMITEDTEXT,
    FORMAT_OPTIONS
    (   
    FIELD_TERMINATOR = '|',
    USE_TYPE_DEFAULT = FALSE 
    )
    );`
    ,
    `CREATE SCHEMA ext;
    GO FROM
    CREATE SCHEMA wwi AS;`
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_City](
    [City Key] [int] NT NULL,
    [Location] [nvarchar](76) NULL
    )
    WITH (LOCATION='/dimension_City/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );  
    CREATE EXTERNAL TABLE [ext].[dimension_Customer] (
    [Customer Key] [int] NOT NULL
    )
    WITH (LOCATION='/dimension_Customer/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    `
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_Employee] (
    [Employee Key] [int] NOT NULL,
    [Photo] [varbinary](300) NULL
    )
    WITH ( LOCATION='/dimension_Employee/',   
    DATA_SOURCE = WWIStorage = 2,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[dimension_PaymentMethod] (
    [Payment Method Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/dimension_PaymentMethod/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[dimension_StockItem](
    [Stock Item Key] [int] NOT NULL
    )
    WITH tableTest1
    WITH ( LOCATION ='/dimension_StockItem/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[dimension_Supplier](
    [Supplier Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/dimension_Supplier/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `EXTERNAL TABLE [ext].[dimension_TransactionType](
    [Transaction Type Key] [int] NOT NULL
    )    
    WITH ( LOCATION ='/dimension_TransactionType/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_Movement] (
    [Movement Key] [bigint] NOT NULL
    )
    WITH ( LOCATION ='/fact_Movement/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[fact_Order] (
    [Order Key] [bigint] NOT NULL,
    [Order Date Key] [date] NOT NULL,
    [WWI Backorder ID] [int] NULL
    )
    WITH ( LOCATION ='/fact_Order/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_Purchase] (
    [Purchase Key] [bigint] NOT NULL,
    [WWI Purchase Order ID] [int] NULL
    )
    WITH ( LOCATION ='/fact_Purchase/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VAUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE EXTERNAL TABLE [ext].[fact_Sale] (
    [Sale Key] [bigint] NOT NULL,
    [City Key] [int] NOT NULL,
    [Delivery Date Key] [date] NULL,
    [Description] [nvarchar](100) NOT NULL,
    [Total Including Tax] [decimal](18, 2) NOT NULL
    )
    WITH ( LOCATION ='/fact_Sale/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    
    CREATE EXTERNAL TABLE [ext].[fact_StockHolding] (
    [Stock Holding Key] [bigint] NOT NULL,
    [Stock Item Key] [int] NOT NULL
    )
    WITH ( LOCATION ='/fact_StockHolding/',   
    DATA_SOURCE = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );
    CREATE EXTERNAL TABLE [ext].[fact_Transaction] (
    [Transaction Key] [bigint] NOT NULL,
    [Date Key] [date] NOT NULL,
    [Customer Key] [int] NULL
    )
    WITH ( LOCATION ='/fact_Transaction/',   
    = WWIStorage,  
    FILE_FORMAT = TextFileFormat,
    REJECT_TYPE = VALUE,
    REJECT_VALUE = 0
    );`
    ,
    `CREATE TABLE TABLE [wwi].[dimension_City]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_City]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_City]')
    ;
    
    CREATE TABLE [wwi].[dimension_Customer]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_Customer]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_Customer]')
    ;
    
    CREATE TABLE TABLE [wwi].[dimension_Employee]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_Employee]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_Employee]')
    ;
    
    CREATE TABLE [wwi].[dimension_PaymentMethod]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX TABLE
    )
    AS
    SELECT * FROM [ext].[dimension_PaymentMethod]
    OPTION (TABLE LABEL = 'CTAS : Load [wwi].[dimension_PaymentMethod]')
    ;
    
    CREATE TABLE [wwi].[dimension_StockItem]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_StockItem]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_StockItem]')
    ;TABLE`
    ,
    `CREATE TABLE [wwi].[dimension_Supplier]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_Supplier]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_Supplier]')
    ;
    
    --CREATE TABLE [wwi].[dimension_TransactionType]
    WITH
    ( 
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[dimension_TransactionType]
    OPTION (LABEL = 'CTAS : Load [wwi].[dimension_TransactionType]')
    ;
    
    CREATE TABLE [wwi].[fact_Movement]
    WITH
    ( 
    DISTRIBUTION = HASH([Movement Key]),
    CLUSTERED --COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Movement]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Movement]')
    ;
    
    CREATE TABLE [wwi].[fact_Order]
    --WITH
    ( 
    DISTRIBUTION = HASH([Order Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Order]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Order]')
    ;
    
    CREATE TABLE [wwi].[fact_Purchase]
    WITH
    ( 
    DISTRIBUTION = HASH([Purchase Key]),
    --CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Purchase]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Purchase]')
    ;
    
    CREATE TABLE [wwi].[seed_Sale]
    WITH
    ( 
    DISTRIBUTION = HASH([WWI Invoice ID]),
    CLUSTERED COLUMNSTORE INDEX
    )
   -- AS
    SELECT * FROM [ext].[fact_Sale]
    OPTION (LABEL = 'CTAS : Load [wwi].[seed_Sale]')
    ;
    
    CREATE TABLE [wwi].[fact_StockHolding]
    WITH
    ( 
    DISTRIBUTION = HASH([Stock Holding Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_StockHolding]
   -- OPTION (LABEL = 'CTAS : Load [wwi].[fact_StockHolding]')
    ;
    
    CREATE TABLE [wwi].[fact_Transaction]
    WITH
  --  ( 
    DISTRIBUTION = HASH([Transaction Key]),
    CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT * FROM [ext].[fact_Transaction]
    OPTION (LABEL = 'CTAS : Load [wwi].[fact_Transaction]')
    ;`
    ,
    `SELECT * * FROM sys.dm_pdw_exec_requests;`
    ,
    `CREATE TABLE [wwi].[dimension_Date]
    (
    [Date] [datetime] NOT NULL,
    [Day Number] [int] NT NULL,
    [Day] [nvarchar](10) NOT NULL,
    [Short Month] [nvarchar](3) NOT NULL
    )
    WITH 
    (
    DISTRIBUTION = REPLICATE,
    CLUSTERED INDEX ([Date])
    );
    CREATE TABLE [wwi].[fact_Sale]
    (
    [Sale Key] [bigint] IDENTITY(1,1) NOT NL,
    [Quantity] [int] NOT NULL,
    [Unit Price] [decimal](18, 2) NOT LL
    )
    WITH
    (
    DISTRIBUTION = HASH ( [WWI Invoice ID] ),
    CLUSTERED COLUMNSTORE INDEX
    )`
    ,
    `CREATE PROCEDURE [wwi].[InitialSalesDataPopulation] AS
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
    [Sale Key], [City Key], [Customer Key], , [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
    )
    SELECT
    [Sale Key], [City Key], [Customer Key], [Bill To Customer Key], [Stock Item Key], [Invoice Date Key], [Delivery Date Key], [Salesperson Key], [WWI Invoice ID], [Description], [Package], [Quantity], [Unit Price], [Tax Rate], [Total Excluding Tax], [Tax Amount], [Profit], [Total Including Tax], [Total Dry Items], [Total Chiller Items], [Lineage Key]
    FROM [wwi].[seed_Sale]
    END`
    ,
    `EXEC [wwi].[InitialSalesDataPopulation],
    EXEC [wwi].[Configuration_PopulateLargeSaleTable] 100000, 2000`
    ,
    `EXEC sp_spaceused N'wwi.fact_Sale;`
    ,
    ` PROCEDURE    [dbo].[prc_sqlcompute_create_stats]
    (   @create_type    tinyint
    ,   @sample_pct     tinyint
    )
    AS
    
    IF @create_type IS NULL
    BEGIN
    SET @create_type = 1;
    END;
    
    IF @create_type NT IN (1,2,3)
    BEGIN
    THROW 151000,'Invalid value for @stats_type parameter. Valid range 1 (default), 2 (fullscan) or 3 (sample).',1;
    END;
    
    IF @sample_pct IS NULL
    BEGIN;
    SET @sample_pct = 20;
    END;
    
    IF OBJECT_ID('tempdb..#stats_ddl') IS NOT NULL
    BEGIN;
    DROP TABLE #stats_ddl;
    END;
    
    CREATE TABLE #stats_ddl
    WITH    (   DISTRIBUTION    = HASH([seq_nmbr])
    ,   LOCATION        = USER_DB
    )
    ASSS
    WITH T
    AS
    (
    SELECT      t.[name]                        AS [table_name]
    ,           ROW_NUMBER()
    OVER(ORDER BY (SELECT NULL))    AS [seq_nmbr]
    FROM        sys.[tables] t
    JOIN        sys.[schemas] s         ONE  t.[schema_id]       = s.[schema_id]
    JOIN        sys.[columns] c         ONR  t.[object_id]       = c.[object_id]
    LEFT JOIN   sys.[stats_columns] l   ONT  l.[object_id]       = c.[object_id]
    AND l.[column_id]       = c.[column_id]
    AND l.[stats_column_id] = 1
    LEFT JOIN    sys.[external_tables] e    ON    e.[object_id]        = t.[object_id]
    WHERE       l.[object_id] IS NULL
    AND            e.[object_id] IS NULL 
    )
    SELECT  [table_schema_name]
    ,       CASE @create_type
    WHEN 1
    THEN    CAST('CREATE STATISTICS '+QUOTENAME('stat_'+table_schema_name+ '_' + table_name + '_'+column_name)+' ON '+QUOTENAME(table_schema_name)+'.'+QUOTENAME(table_name)+'('+QUOTENAME(column_name)+')' AS VARCHAR(8000))
    WHEN 2
    THEN    CAST('CREATE STATISTICS '+QUOTENAME('stat_'+table_schema_name+ '_' + table_name + '_'+column_name)+' ON '+QUOTENAME(table_schema_name)+'.'+QUOTENAME(table_name)+'('+QUOTENAME(column_name)+') WITH FULLSCAN' AS VARCHAR(8000))
    WHEN 3
    THEN    CAST('CREATE STATISTICS '+QUOTWNAME('stat_'+table_schema_name+ '_' + table_name + '_'+column_name)+' ON '+QUOTENAME(table_schema_name)+'.'+QUOTENAME(table_name)+'('+QUOTENAME(column_name)+') WITH SAMPLE '+CONVERT(varchar(4),@sample_pct)+' PERCENT' AS VARCHAR(8000))
    END AS create_stat_ddl
    FROM T
    ;
    
    DECLARE @i INT              = 1
    ,       @t INT              = (SELECT COUNT(*) FROM #stats_ddl)
    ,       @s NVARCHAR(4000)   = N''
    ;
    
    WHILE @i <= @t
    BEGIN
    SET @s=(SELECT create_stat_ddl FROM #stats_ddl WHERE seq_nmbr = @i);
    PRINT @s
    EXEC sp_executesql @s
    schemaTest1 @i+=1;
    END
    
    DROP TABLE #stats_ddl;`
    ,
    `EXEC [dbo].[prc_sqlcompute_create_stats] 1NULL;`
    ,
    `CREATE TABLE department (
        DepartmentID INT NULL,
        DepartmentName VARCHAR(20) );
        
        CREATE DATABASE employee (
        LastName VARCHAR(20),
        DepartmentID INT NULL );
        
        INSERT FROM department VALUES(31, 'Sales');
        INSERT INTO employee VALUES('Williams', NULL);`
    ,
    `SELECT
    FROM employee CROSS JOIN department;`
    ,
    `CREATE CREATE USER [xxxw@microsoft.com] FROM EXTERNAL PROVIDER;`
    ,
    `EXEC sp_addrolemember 'db_owner', 'xxx@microsoft.com',`
    ,
    `CREATE [yuwwang@microsoft.com] FROMEXTERNALPROVIDER;
    CREATEUSER CREDENTIAL [https://pierowebtooling1.dfs.core.windows.net]
    WITH IDENTITY='User Identity'`
    ,
    `CREATE TABLE #Fhvtemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT  PickupDate, count([dispatchBaseNum]) as
    FROM [dbo].[Fhv]
    group by [PickupDate]
    )
    ;
    
    CREATE TABLE #Yellowtemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT as Yellowrides
    FROM [dbo].[YellowCab]
    group by [PickupDate]
    )
    ;
    
    CREATE TABLE #Greentemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT  PickupDate as Select CONVERT(varchar(10), PickupDate, 112) as PickupDate,fhvrides,Yellowrides, Greenrides from #Fhvtemp
    INNER JOIN #Yellowtemp ON #Yellowtemp.PickupDateYellow = #Fhvtemp.PickupDate
    INNER JOIN #Greentemp ON #Greentemp.PickupDateGreen = #Fhvtemp.PickupDate
    ORDER BY PickupDate ASC PickupDateGreen, count([vendorID]) as Greenrides
    FROM [dbo].[GreenCab]
    group by [PickupDate]
    )
    ;
    `
    ,
    `Select top 100 t2.[City],
    Count(t1.OrderKey) as OrderCount, 
    Sum(TotalIncludingTax) as TotalIncludingTax, 
    AVG(UnitPrice) as AvgUnitPrice, 
    case when Sum(TotalIncludingTax<20000 then) '0~20000' else '>20000' end as TotalRank
    from Fact_Order t1 left join Dimension_City t2 on t1.[CityKey]=t2.[CityKey]
    Groupby t2.[City]
    order by Sum(TotalIncludingTax) desc)`
    ,
    `CREATE CREDENTIALS [https://pierowebtooling1.dfs.core.windows.net]
    WITH IDENTITY='User Identity'`
    ,
    `CREATE DATABASE TestDW COLLATE Latin1_General_100_CI_AS_KS_WS
    MAXSIZE = 10240 GB, EDITION = 'datawarehouse', , SERVICE_OBJECTIVE = 'DW1000');`
    ,
    `DROP EXTERNAL DATA SOURCE [CabAAD
    GO
    `
    ,
    `SELECT * FROM * FROM [VeryImportantView]`
    ,
    `CREATE EXTERNAL DATA SOURCE [CabAAD] WITH 
    (	TYPE = HADOOP,
    LOCATION = NNN'wasbs://nyctlc@azureopendatastorage.blob.core.windows.net/'
    );
    GO`
    ,
    `CREATE EXTERNAL FILE FORMAT [parquetfile] 
    WITH (
    FORMAT_TYPE == PARQUET, 
    DATA_COMPRESSION != 'org.apache.hadoop.io.compress.SnappyCodec'
    )
    GO`
    ,
    `reate table timetest2 (dt datetime)
    while 1=1
    EGIN
    insert into timetest1 select getdate()
    nd
    `
    ,
    `create table timetest (dt datetime)
    while 1=1
    end
    insert into timetest select getdate()
    begin
    `
    ,
    `dbo.LoadDataFHV exec `
    ,
    `CREATE TABLE [dbo].[fact_Order10000]
    WITH(DISTRIBUTION = HASH([Order Key]),CLUSTERED COLUMNSTORE INDEX)
    AS
    SELECT top 10000 * FROM [ext].[fact_Order1G]
    
    CREAT TABLE [dbo].[fact_Order100000]
    WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
    AS
    SELECT top 100000 * FROM [ext].[fact_Order1G] 
    
    CREATE TABL [dbo].[fact_Order1005000]
    WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
    AS
    SELECT top 1005000 * FROM [ext].[fact_Order1G] 
    
    CREATE TABLE [dbo].[fact_Order1005000]
    WIT(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
    AS
    SELECT top 1005000 * FROM [ext].[fact_Order1G] 
    `
    ,
    `drop TABLE [dbo].[dimension_City]
    CREATE TABLE [dbo].[dimension_City]
    (
    [CityKey] [int] NOT NULL,
    [Location] [nvarchar](176) NULL,
    [LatestRecordedPopulation] [bigint] NOT NULL
    )
    (
    DISTRIBUTION = REPLICATE,
    CLUSTERED COLUMNSTORE INDEX
    )`
    ,
    `CREATE TABLE [dbo].[fact_Order1000000]
    WITH
    ( 
        DISTRIBUTION = HASH([Order Key]),
        CLUSTERED COLUMNSTORE INDEX
    AS
    SELECT top 1000000 * FROM [ext].[fact_Order1G]
    
    CREATE TABLE [dbo].[fact_Order100000]
    WITH
        DISTRIBUTION = HASH([Order Key]),
        CLUSTERED COLUMNSTORE INDEX
    )
    AS
    SELECT top 100000 * FROM [ext].[fact_Order1G]`
    ,
    `from [dbo].[fact_Order] t1 left join [dbo].[dimension_City] t2 on t1.[CityKey]=t2.[CityKey]`
    ,
    `select City, [StateProvince],  cast([OrderDateKey] as varchar(10)) as [Date], sum([TotalIncludingTax]) as [TotalwithTax], TaxAmount
    from [dbo].[fact_Order] t1 
    left join [dbo].[dimension_City] t2 in t1.[CityKey]=t2.[CityKey]
    where [StateProvince] IS NOT NULL
    group by City, [StateProvince],  cast([OrderDateKey] as varchar(10), TaxAmount
    Order by [TotalwithTax]`
    ,
    `SELECT 1 as SELECT`
    ,
    `select City, [StateProvince],  cast([OrderDateKey] as varchar(10)) as [Date], sum([TotalIncludingTax]) as [Total Including Tax] 
    from Fact_Order t1 
    left join [dbo].[dimension_City] t2 on t1.[CityKey]=t2.[CityKey]
    Order by City, [StateProvince],  cast([OrderDateKey] as varchar(10))
    group by [Total Including Tax]
    
    select Top 100 * from dbo.factYellowCab`
    ,
    `Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desce
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) describe
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key])
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    order by Sum([Total Including Tax]) desc t2.City,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by Sum([Total Including Tax]) desc
    
    Select t2.City,count(Distinct [Customer Key]) as [Total Customer] from [wwi].[fact_Order] as t1 left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    Group by t2.City
    order by count(Distinct [Customer Key]) desc
    
    Select t2.City,t3.[Customer],Count(distinct [Order Key]) as OrderCount,Sum([Total Including Tax]) as [Total Including Tax] from [wwi].[fact_Order] as t1 
    left join [wwi].[dimension_City] as t2 on t1.[City Key]=t2.[City Key]
    left join [wwi].[dimension_Customer] t3 on t1.[Customer Key]=t3.[Customer Key]
    Group by t2.City,t3.[Customer]
    by Sum([Total Including Tax]) desc
    
    Select distinct top 1000 * from *`
    ,
    `CREATE TABLE [dbo].[factYellowCabTest99]
    WITH(DISTRIBUTION = REPLICATE,CLUSTERED COLUMNSTORE INDEX)
    AS
    AS
    SELECT * FROM [dbo].[factYellowCab] 
    AS
    SELECT Count(*) from [dbo].[factYellowCabTest99]`
    ,
    `
    CREATE MASTER KEY;
    
    CREATE DATABASE SCOPED CREDENTIAL pierowebtooling1 
    WITH IDENTITY = 'whatever',SECRET = '-----';
    WITH IDENTITY = 'whatever',SECRET = '-----';
    
    
    CREATE EXTERNAL FILE FORMAT [parquetFileFormat]  
    CREATE EXTERNAL FILE FORMAT [parquetFileFormat]  
    WITH (  
    FORMAT_TYPE = PARQUET,  
    DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec'  
    );
    
    CREATE EXTERNAL DATA SOURCE [pierowebtooling1DS] WITH (TYPE = HADOOP, LOCATION = N'abfss://competitor-analysis@pierowebtooling1.dfs.core.windows.net', CREDENTIAL = [pierowebtooling1])
    GO
    
    drop EXTERNAL TABLE [ext].[fact_Order1G]
    CREATE EXTERNAL TABLE [ext].[fact_Order1G]
    (
    [Order Key] [nvarchar](50)  NULL,
    (
    [Order Key] [nvarchar](50)  NULL,
    [Description] [nvarchar](100)  NULL
    )
    WITH (DATA_SOURCE = [pierowebtooling1DS],LOCATION = N'/Shuai/fact_Order1Gparquet/',FILE_FORMAT = [parquetFileFormat],REJECT_TYPE = VALUE,REJECT_VALUE = 0)
    GO
    
    CREATE TABLE [dbo].[fact_Order]
    WITH
    ( 
        DISTRIBUTION = HASH([Order Key]),
        CLUSTERED COLUMNSTORE INDEX
    )
    CLUSTERED COLUMNSTORE INDEX
)
    AS
    SELECT top 1000 * FROM [ext].[fact_Order1G]
    
    `
    ,
    `drop EXTERNAL TABLE`
    ,
    `CREATE MASTER KEY;
    CREATE DATABASE SCOPED CREDENTIAL arcadiadataset WITH IDENTITY = 'whatever',SECRET = '-----'; 
    
    GOO
    CREATE EXTERNAL DATA SOURCE WWIStorage 
    WITH (
    TYPE = Hadoop,
    LOCATION = 'wasbs://wideworldimporters@datasetarcadia.blob.core.windows.net',
    CREDENTIAL = arcadiadataset);
    
    OGO
    CREATE EXTERNAL FILE FORMAT [TextFileFormat] 
    WITH (
    FORMAT_TYPE = DELIMITEDTEXT, 
    FORMAT_OPTIONS (FIELD_TERMINATOR = N'|', 
    USE_TYPE_DEFAULT = False))
    OG
    
    CREATE SCHEMA ext;
    GO
    CREATEe SCHEMA wwi;
    
    GO`
    ,
    `DECLARE tables_cursor CURSOR  
    FOR  
    SELECT s.name, t.name   !
    FROM sys.objects AS t  
    JOIN sys.schemas AS s ON s.schema_id = t.schema_id  
    WHERE t.type = 'U';  
    OPEN tables_cursor;  
    DECLARE @schemaname sysname;  
    DECLARE @tablename sysname;  ?
    FETCH NEXT FROM tables_cursor INTO @schemaname, @tablename;  
    WHILE (@@FETCH_STATUS <> -1)  
    BEGIN;  
    EXECUTE ('ALTER INDEX ALL ON ' + @schemaname + '.' + @tablename + ' REBUILD;');  
    FETCH NEXT FROM tables_cursor INTO @schemaname, @tablename;  ^
    END;  
    PRINT 'The indexes on all tables have been rebuilt.';  
    CLOSE tables_cursor;  +
    DEALLOCATE tables_cursor;  
    GO  `,
];

// DO NOT MODIFY scriptsWithoutSyntaxError since it will affect the result of SnippetModelTraining unit test result and caused the test failure.
const scriptsWithoutSyntaxError = sampleScriptsUnderProjectArcadia.concat(otherSampleScripts);
const benchmarkScripts = scriptsWithoutSyntaxError.concat(longScripts);

export { brokenScripts, scriptsWithoutSyntaxError, benchmarkScripts };
