/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorMarkItem, IUnsupportedStatementConfig, Severity } from "../../../../CommonSqlUtils/Utils";

export class CSLSUnsupportedError {
    private addToResult: (r: IErrorMarkItem) => void;
    constructor(private unsupportedStatements: IUnsupportedStatementConfig[], private ruleNames: string[]) {}

    public getUnsupportedErrors(ast: any) {
        const unsupportedErrors: IErrorMarkItem[] = [];
        this.addToResult = (r) => {
            unsupportedErrors.push(r); 
        };
        try {
            this.visitAST(ast);
        } catch (e) {
            // do nothing
        }
        return unsupportedErrors;
    }

    private visitAST(node: any) {
        if (!node.children) {
            return;
        }
    
        this.unsupportedStatements.forEach((unsupportedStatement) => {
            if (node.ruleIndex && this.ruleNames[node.ruleIndex] === unsupportedStatement.ruleName) {
                this.addToResult({
                    line: node.start.line,
                    startColumn: node.start.charPositionInLine,
                    endColumn: node.start.charPositionInLine + node.start.stop - node.start.start + 1,
                    message: unsupportedStatement.customizedErrorMessage ?? unsupportedStatement.ruleName + ' is not supported',
                    severity: unsupportedStatement.severity ?? Severity.Error,
                });
            }
        });
        node.children.forEach((child: any) => {
            this.visitAST(child);
        });
    }
}
