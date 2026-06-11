import { SqlParserVisitor } from "../Parser/GeneratedParser/SqlParserVisitor";
import { LSContextVisitorBase } from "./LSContextVisitorBase";

export class LastTokenVisitor extends LSContextVisitorBase implements SqlParserVisitor<any>{
    private lastTokenIndex: number = -1;

    constructor() {
        super();
    }

    public GetLastTokenIndex(lastStatementCtx) {
        this.visit(lastStatementCtx);
        return this.lastTokenIndex;
    }

    public visitErrorNode(node) {
        if (this.lastTokenIndex > -1) {
            // error node already been set. The inner most error node is first set and that is what we want.
            return;
        }

        let _lastTokenIndex = node.parentCtx.start.tokenIndex - 1;
        for (let child of node.parentCtx.children) {
            if (child.isErrorNode != null && child.isErrorNode()) {
                break;
            } else {
                _lastTokenIndex = !!child.stop ? child.stop.tokenIndex : (!!child.symbol ? child.symbol.tokenIndex : -1);
            }
        }

        this.lastTokenIndex = _lastTokenIndex;
    }
}
