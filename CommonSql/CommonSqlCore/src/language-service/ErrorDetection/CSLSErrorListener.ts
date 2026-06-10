// -----------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { ANTLRErrorListener } from "antlr4ts/ANTLRErrorListener";
import { Token } from "antlr4ts/Token";
import { Severity } from "../../../../CommonSqlUtils/Utils";

export class CSLSErrorListener implements ANTLRErrorListener<Token> {
    private addSyntaxError: (msg: string, line: number, startColumn: number, endColumn: number, severity: Severity) => any;
    private syntaxErrorDecorator: any;

    constructor(addSyntaxError: (msg: string, line: number, startColumn: number, endColumn: number, severity: Severity) => any, syntaxErrorDecorator: any) {
        this.addSyntaxError = addSyntaxError;
        this.syntaxErrorDecorator = syntaxErrorDecorator;
    }

    public syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: any): void {
        let errorMessage: string = msg;
        let severity: Severity = Severity.Error;
        if (!!this.syntaxErrorDecorator && !!this.syntaxErrorDecorator.decorate) {
            const ret: { message: string; severity: Severity } = this.syntaxErrorDecorator.decorate(offendingSymbol, msg, e);
            errorMessage = ret.message;
            severity = ret.severity;
        }

        const len = !!offendingSymbol && !!offendingSymbol.stop && !!offendingSymbol.start && offendingSymbol.stop >= offendingSymbol.start 
            ? offendingSymbol.stop - offendingSymbol.start + 1
            : 0;
        this.addSyntaxError(errorMessage, line, column, column + len, severity);
    }
}
