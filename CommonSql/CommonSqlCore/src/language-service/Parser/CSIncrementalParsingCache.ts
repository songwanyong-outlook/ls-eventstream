import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";

import { IErrorMarkItem, IIncrementalParsingConfig, LanguageServiceFeature } from "../../../../CommonSqlUtils/Utils";


export interface IParsedScript {
    // cached script for later parsing usage
    script: string;
    // end index of cached script
    index: number;
    // end line of cached script
    line: number;
    // end column of last line
    column: number;
    // index of end token.
    tokenIndex: number;
}

export class IncrementalParsingCache {
    private _cache: Map<LanguageServiceFeature, IParsedScript> = new Map();
    private _incrementalParsingConfig: IIncrementalParsingConfig;

    constructor(incrementalParsingConfig: IIncrementalParsingConfig) {
        this._incrementalParsingConfig = incrementalParsingConfig;
    }
    
    public saveParsedScriptByReason(parser, parseReason: LanguageServiceFeature, input: string, prevCachedScript: IParsedScript, ast: any) {
        const cachedScriptObj = { script: '', index: 0, line: 1, column: 0, tokenIndex: 0 } as IParsedScript;
        let foundError = false;
        let lastSqlClause = null;
        const stack = [];

        const check = (node: any): void => {
            if (node instanceof ErrorNode) {
                foundError = true;
                return;
            }
            if (node instanceof TerminalNode) {
                return;
            }
            if (this.getRuleNameForContext(parser, node) === this._incrementalParsingConfig?.goStatementRule) {
                cachedScriptObj.index = node.stop.stopIndex + 1;
                cachedScriptObj.line = node.stop.line;
                cachedScriptObj.column = node.stop.charPositionInLine + 2;
                cachedScriptObj.tokenIndex = node.stop.tokenIndex;
                return;
            }
            if (this.getRuleNameForContext(parser, node) === this._incrementalParsingConfig?.sqlClauseRule) {
                stack.push(node);
            }

            if (node.children) {
                for (const child of node.children) {
                    check(child);
                }
            }

            if (this.getRuleNameForContext(parser, node) === this._incrementalParsingConfig?.sqlClauseRule) {
                stack.pop();
                if(stack.length === 0 && !foundError) {
                    if (lastSqlClause) {
                        cachedScriptObj.index = lastSqlClause.start.startIndex;
                        cachedScriptObj.line = lastSqlClause.start.line;
                        cachedScriptObj.column = lastSqlClause.start.charPositionInLine;
                        cachedScriptObj.tokenIndex = lastSqlClause.start.tokenIndex;
                    }
                    lastSqlClause = node;
                }
            }
        };

        for (const child of ast.children) {
            foundError = false;
            check(child);
            if (foundError && parseReason === LanguageServiceFeature.ErrorDetection) {
                if (lastSqlClause) {
                    cachedScriptObj.index = lastSqlClause.start.startIndex;
                    cachedScriptObj.line = lastSqlClause.start.line;
                    cachedScriptObj.column = lastSqlClause.start.charPositionInLine;
                    cachedScriptObj.tokenIndex = lastSqlClause.start.tokenIndex;
                }
                break;
            }
        }

        if (prevCachedScript) {
            cachedScriptObj.index += prevCachedScript.index;
            cachedScriptObj.line += prevCachedScript.line - 1;
            cachedScriptObj.tokenIndex += prevCachedScript.tokenIndex <= 0 ? 0 : prevCachedScript.tokenIndex;
            if (cachedScriptObj.line === prevCachedScript.line) {
                cachedScriptObj.column += prevCachedScript.column;
            }
        }
        cachedScriptObj.script = input.slice(0, cachedScriptObj.index);
        this._cache.set(parseReason, cachedScriptObj);
    }
    
    // reduce input script by comparing with cached script
    public reduceScript(parseReason: LanguageServiceFeature, input: string): [string, IParsedScript] {
        if (this._cache.has(parseReason)) {
            const cachedScript = this._cache.get(parseReason);
            if (input.indexOf(cachedScript.script) === 0) {
                return [input.slice(cachedScript.script.length), cachedScript];
            }
        }
        return [input, null];
    }

    public updateSyntaxErrorsPosition(cacheScript: IParsedScript, syntaxErrors: IErrorMarkItem[]) {
        if (!cacheScript) { 
            return;
        }
        for (const syntaxError of syntaxErrors) {
            syntaxError.line += cacheScript.line - 1;
            if (syntaxError.line === cacheScript.line) {
                syntaxError.startColumn += cacheScript.column;
                syntaxError.endColumn += cacheScript.column;
            }
        }
    }

    private getRuleNameForContext(parser: any, context: any): string {
        if (!(context as ParserRuleContext)) {
            return null;
        }
        return parser.ruleNames[(context as ParserRuleContext).ruleIndex];
    }
}
