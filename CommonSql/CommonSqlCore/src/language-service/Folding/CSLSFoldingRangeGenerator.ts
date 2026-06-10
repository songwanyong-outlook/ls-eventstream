/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFoldingRange } from "../../../../CommonSqlUtils/Utils";

export const getFoldingRanges = (ast: any) => {
    const foldingRanges: IFoldingRange[] = [];
    try {
        visitAST(ast, (r) => { 
            foldingRanges.push(r); 
        });
    } catch (e) {
        // do nothing
    }
    const filteredFoldingRanges: IFoldingRange[] = [];
    foldingRanges.sort((a, b) => (a.start === b.start ? a.end - b.end : a.start - b.start));
    foldingRanges.forEach((v, i) => {
        if (i === 0 || foldingRanges[i].start !== foldingRanges[i - 1].start) {
            filteredFoldingRanges.push(v);
        }
    });
    return filteredFoldingRanges;
};

function visitAST(node: any, addToResult: (r: IFoldingRange) => void) {
    if (!node.children) {
        return;
    }

    if (node.children.length > 1 && node.start.line !== node.stop.line) {
        addToResult({ start: node.start.line, end: node.stop.line });
    }
    node.children.forEach((child: any) => {
        visitAST(child, addToResult);
    });
}
