// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

export class LSContextSwitch {
    inAllSchemaNamesContext = false;

    // If in AllTableNamesContext then we should give all the table names under default schema.
    // Since other tables can only be accessed with shema prefix.
    // Include only tables, not include views
    inAllTableNamesContext = false;

    // Include only views.
    inAllViewNamesContext = false;

    // Include only procs.
    inAllProcNamesContext = false;

    // Include only table functions.
    inAllTableFunctionNamesContext = false;

    // Include both tables and views
    inCurrentTableSourcesContext = false;

    // If in AllColumnNamesContext then we should give all the columns under all schemas.
    inAllColumnNamesContext = false;
    inCurrentColumnSourcesContext = false;
    inColumnsOfCurrentTablesSourcesContext = false;
    
    inTypeNamesContext = false;
    inUserNamesContext = false;
    inIndexNamesContext = false;
    inDatabaseNamesContext = false;

    public reset() {
        this.inAllSchemaNamesContext = false;
        this.inAllTableNamesContext = false;
        this.inAllViewNamesContext = false;
        this.inAllProcNamesContext = false;
        this.inAllTableFunctionNamesContext = false;
        this.inCurrentTableSourcesContext = false;
        this.inAllColumnNamesContext = false;
        this.inCurrentColumnSourcesContext = false;
        this.inColumnsOfCurrentTablesSourcesContext = false;
        this.inTypeNamesContext = false;
        this.inUserNamesContext = false;
        this.inIndexNamesContext = false;
        this.inDatabaseNamesContext = false;
    }

    public InColumnNamesContext(): boolean {
        return this.inAllColumnNamesContext || this.inCurrentColumnSourcesContext || this.inColumnsOfCurrentTablesSourcesContext;
    }

    public InTableNamesContext(): boolean {
        return this.inAllTableNamesContext || this.inAllViewNamesContext || this.inCurrentTableSourcesContext;
    }

    public InBuiltInFunctionsContext(): boolean {
        return this.InColumnNamesContext();
    }

    public InAllSwitchesOffContext(): boolean {
        return (
            !this.inAllSchemaNamesContext &&
            !this.inAllTableNamesContext &&
            !this.inAllViewNamesContext &&
            !this.inAllProcNamesContext &&
            !this.inCurrentTableSourcesContext &&
            !this.inAllColumnNamesContext &&
            !this.inCurrentColumnSourcesContext &&
            !this.inColumnsOfCurrentTablesSourcesContext &&
            !this.inUserNamesContext &&
            !this.inTypeNamesContext &&
            !this.inIndexNamesContext &&
            !this.inDatabaseNamesContext);
    }
}
