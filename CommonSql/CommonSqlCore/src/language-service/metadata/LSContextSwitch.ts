// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

export class LSContextSwitch {
    InAllTableNamesContext: boolean = false;
    InCurrentTableSourcesContext: boolean = false;

    InAllColumnNamesContext: boolean = false;
    InCurrentColumnSourcesContext: boolean = false;
    InColumnsOfCurrentTablesSourcesContext: boolean = false;

    InOutputNamesContext: boolean = false;

    InMatchRecognizeMeasures: boolean = false;

    InUDAContext: boolean = false;
    InUDFContext: boolean = false;

    public reset() {
        this.InAllTableNamesContext = false;
        this.InCurrentTableSourcesContext = false;
        this.InAllColumnNamesContext = false;
        this.InCurrentColumnSourcesContext = false;
        this.InColumnsOfCurrentTablesSourcesContext = false;
        this.InOutputNamesContext = false;
        this.InMatchRecognizeMeasures = false;
        this.InUDAContext = false;
        this.InUDFContext = false;
    }
}

export class LSFunctionSwitch {
    public regularFunctionsAvailable: boolean = false;
    public windowsFunctionsAvailable: boolean = false;
    public tableValuedFunctionsAvailable: boolean = false;
}
