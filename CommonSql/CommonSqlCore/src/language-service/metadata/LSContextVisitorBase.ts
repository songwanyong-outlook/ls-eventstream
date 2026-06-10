// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { SqlParserVisitor } from "../Parser/GeneratedParser/SqlParserVisitor";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";

export class LSContextVisitorBase implements SqlParserVisitor<any> {

    public visitTerminal(ctx: TerminalNode): void {
        // do nothing
    }

    public visitErrorNode(ctx: ErrorNode): void {
        // do nothing
    }

    public visit(ctx) {
        if (!ctx) {
            return null;
        }

        try {
            if (Array.isArray(ctx)) {
                return ctx
                    .map(child => child.accept != null ? child.accept(this) : null)
                    .filter(result => !!result);
            } else {
                return ctx.accept(this);
            }
        } catch {
            return null;
        }
    }

    public visitChildren(ctx): any {
        return ctx == null ? null : this.visit(ctx.children);
    }

    protected getText(ctx, trimWhiteSpace: boolean = false): string {
        let ret: string = null;

        if (!ctx) {
            return ret;
        }
        if (ctx instanceof TerminalNode) {
            ret = ctx.symbol.text;
        }
        else if (ctx.childCount === 0) {
            ret = " ";
        } else {
            ret = ctx.children.map(child => this.getText(child)).join(" ");
        }

        // To transfrom expression from a . b to a.b
        ret = ret.replace(/(\s+\.\s+)/g, ".");
        return trimWhiteSpace ? ret.replace(/\s/g, "") : ret;
    }
}
