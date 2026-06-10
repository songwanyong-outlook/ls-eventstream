// -----------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CommonTokenStream } from "antlr4ts/CommonTokenStream";
import { Lexer } from "antlr4ts/Lexer";
import { Token } from "antlr4ts/Token";

export class CSLSCommonTokenStream extends CommonTokenStream {
    public eofListener = null;

    constructor(tokenSource: Lexer) {
        super(tokenSource);
    }

    public LA(i: number): number {
        const token: number = super.LA(i);

        if (token != null && token === Token.EOF && !!this.eofListener) {
            this.eofListener();
        }
        return token;
    }

    public LT(i: number): any {
        const token = super.LT(i);

        if (token != null && token.type === Token.EOF && !!this.eofListener) {
            this.eofListener();
        }
        return token;
    }
}
