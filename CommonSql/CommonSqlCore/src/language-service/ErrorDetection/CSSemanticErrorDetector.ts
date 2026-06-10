/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParserRuleContext } from "antlr4ts";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { IErrorMarkItem, Severity } from "../../../../CommonSqlUtils/Utils";
import { SqlParserVisitor } from "../Parser/GeneratedParser/SqlParserVisitor";

// this is not used currently.
export function DetectSemanticErrors(ast: any): IErrorMarkItem[] {
    const semanticVisitor = new SemanticErrorVisitor();
    semanticVisitor.visit(ast);
    return semanticVisitor.semanticErrors;
}

class SemanticErrorVisitor implements SqlParserVisitor<any> {
    public semanticErrors: IErrorMarkItem[] = [];

    constructor() {
        // do nothing
    }

    generateErrorMarker(ruleName: string, ctx: ParserRuleContext) {
        const errorMsg = "";
        this.semanticErrors.push({
            line: ctx.start.line,
            startColumn: ctx.start.startIndex,
            endColumn: ctx.stop.stopIndex,
            message: errorMsg,
            severity: Severity.Error,
        } as IErrorMarkItem);
    }

    visit(ctx): any {
        if (ctx == null) {
            return null;
        }

        try {
            if (!Array.isArray(ctx)) {
                return ctx.accept(this);
            }

            return ctx.map(function(child): any {
                if (child.accept != null) {
                    return child.accept(this);
                } else {
                    return null;
                }
            }, this).filter(result => result != null);
        } catch {
            return null;
        }
    }

    visitChildren (ctx): any {
        return ctx == null ? null : this.visit(ctx.children);
    }

    visitTerminal(node: TerminalNode) {
        // do nothing
    }

    visitErrorNode(node: ErrorNode) {
        // do nothing
    }
}
