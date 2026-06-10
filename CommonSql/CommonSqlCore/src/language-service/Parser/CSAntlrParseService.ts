// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CharStreams } from "antlr4ts";
import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { ATNState } from "antlr4ts/atn/ATNState";
import { Lexer } from "antlr4ts/Lexer";
import { IntervalSet } from "antlr4ts/misc/IntervalSet";
import { Parser } from "antlr4ts/Parser";
import { IErrorMarkItem, IIncrementalParsingConfig, IUnsupportedStatementConfig, LanguageServiceFeature, Severity } from "../../../../CommonSqlUtils/Utils";
import { CSLSErrorListener } from "../ErrorDetection/CSLSErrorListener";
import { ErrorParserATNSimulator, SilentErrorHandler, SqlCustomizedErrorHandler } from "../ErrorDetection/CSLSErrorStrategy";
import { CSLSCommonTokenStream } from "./CSLSCommonTokenStream";
import { CSLSParserATNSimulator, ExpectedTokensSeeker } from "./CSLSParserATNSimulator";
import * as Utils from "antlr4ts/misc/Utils";
import { CSScriptFormatter } from "./CSScriptFormatter";
import { Interval } from "antlr4ts/misc/Interval";
import { IATNStateStat } from "./CSCacheForATNSimulator";
import { RuleTransition } from "antlr4ts/atn/RuleTransition";
import { IncrementalParsingCache, IParsedScript } from "./CSIncrementalParsingCache";
import { UseIncrementalParsing } from "../../../../CommonSqlUtils/LanguageFeatureFlag";
import { notDuplicate } from "../../utils/SqlCoreUtils";
import { CSLSUnsupportedError } from "../ErrorDetection/CSLSUnsupportedError";

export type lexerCtrType = new (input) => Lexer;
export type parserCtrType = new (lexer) => Parser;

class StateContext {
    public state: number;

    public expectedTokens: IntervalSet;

    public statesInvocationStack: number[];

    public rulesInvocationStack: string[];

    constructor(state: number, expectedTokens: IntervalSet, statesInvocationStack: number[], rulesInvocationStack: string[]) {
        this.state = state;
        this.expectedTokens = expectedTokens;
        this.statesInvocationStack = statesInvocationStack;
        this.rulesInvocationStack = rulesInvocationStack;
    }
}

export interface IStateWithInvokingStack {
    currentStateNumber: number;
    invokingStack: number[];
}

export class CSAntlrParseService {
    protected _lexerCtr: any;
    protected _parserCtr: any;
    protected _lexer: Lexer = null;
    protected _parser: Parser = null;
    protected _beginParse: any = null;
    protected _antlrParseCache: AntlrParseCache = null;

    protected eofReached = false;

    protected exThrownAfterEofReached = false;

    public statesBeforeEof: Map<number, StateContext> = new Map();

    public errorStatesBeforeEof: Map<number, StateContext> = new Map();

    public syntaxErrors: IErrorMarkItem[] = [];

    public eofReachedInPredict = false;

    public isInPredict = false;

    public statementEndToken = -1;

    private _scriptFormater: CSScriptFormatter = null;

    private _incrementalParsingConfig: IIncrementalParsingConfig;
    private _incrementalParsingCache: IncrementalParsingCache;

    public cachedScript = new Map<number, IParsedScript>();

    // only used for debugging syntax error features.
    private static readonly _inSyntaxErrorDebuggingMode = false;
    private static readonly _enableCustomizedErrorStrategy = true;

    private static _originalATNNexTokens = null;

    private static _ATNUsedForWordCompletion: ATN = null;

    constructor(lexerCtr: lexerCtrType, parserCtr: parserCtrType, grammarRootNode: any, statementEndToken: number, scriptFormater: CSScriptFormatter, incrementalParsingConfig: IIncrementalParsingConfig) {
        this._lexerCtr = lexerCtr;
        this._parserCtr = parserCtr;
        this._beginParse = grammarRootNode;
        this._antlrParseCache = new AntlrParseCache();
        this.statementEndToken = statementEndToken;
        this._scriptFormater = scriptFormater;
        this._incrementalParsingConfig = incrementalParsingConfig;
        this._incrementalParsingCache = new IncrementalParsingCache(incrementalParsingConfig);
        if (CSAntlrParseService._inSyntaxErrorDebuggingMode) {
            this._antlrParseCache.disableParseCache = true;
        }
    }

    public Parse(input: string, parseReason: LanguageServiceFeature, forceParse: boolean, accurateKeywordIntellisense: boolean): Parser {
        if (CSAntlrParseService._inSyntaxErrorDebuggingMode && parseReason !== LanguageServiceFeature.ErrorDetection) {
            return null;
        }

        try {
            let ast = null;
            if (forceParse || !this._antlrParseCache.hasAst(parseReason, input)) {
                const [reducedInput, cachedScript] = UseIncrementalParsing && !!this._incrementalParsingConfig ? this._incrementalParsingCache.reduceScript(parseReason, input) : [input, null];
                this.cachedScript.set(parseReason, cachedScript);

                ast = this._parse(reducedInput, this._beginParse, parseReason, accurateKeywordIntellisense);
                
                this._antlrParseCache.setAst(parseReason, input, ast);
                if (parseReason & (LanguageServiceFeature.WordCompletion | LanguageServiceFeature.ErrorDetection | LanguageServiceFeature.QuickInfo | LanguageServiceFeature.CodeAction)) {
                    if (parseReason === LanguageServiceFeature.WordCompletion) {
                        this._antlrParseCache.setResult(LanguageServiceFeature.WordCompletion, input, this.GetExpectedTokenStrs());
                    } else if (parseReason === LanguageServiceFeature.ErrorDetection) {
                        this._antlrParseCache.setResult(LanguageServiceFeature.ErrorDetection, input, this.syntaxErrors);
                    }
                    if (UseIncrementalParsing && !!this._incrementalParsingConfig) {
                        this._incrementalParsingCache.saveParsedScriptByReason(this._parser, parseReason, input, cachedScript, ast);
                    }
                }
            } else  {
                ast = this._antlrParseCache.getAst(parseReason, input);
            }
            return ast;
        } catch(e) {
            console.log(e);
            return null;
        }
    }


    public getCompletionWords(input: string, accurateKeywordIntellisense: boolean): string[] {
        if (this._antlrParseCache.hasResult(LanguageServiceFeature.WordCompletion, input)) {
            return this._antlrParseCache.getResult(LanguageServiceFeature.WordCompletion, input);
        }

        this.Parse(input, LanguageServiceFeature.WordCompletion, true, accurateKeywordIntellisense);
        const result = this.GetExpectedTokenStrs();
        return result;
    }

    public getSyntaxErrors(input: string, unsupportedStatements: IUnsupportedStatementConfig[]): IErrorMarkItem[] {
        const key = input;
        if (this._antlrParseCache.hasResult(LanguageServiceFeature.ErrorDetection, key)) {
            return this._antlrParseCache.getResult(LanguageServiceFeature.ErrorDetection, key);
        }

        const ast = this.Parse(input, LanguageServiceFeature.ErrorDetection, false, false);
        this.syntaxErrors.push(...(new CSLSUnsupportedError(unsupportedStatements, this.GetAllRuleNames())).getUnsupportedErrors(ast));
        this._incrementalParsingCache.updateSyntaxErrorsPosition(this.cachedScript.get(LanguageServiceFeature.ErrorDetection), this.syntaxErrors);
        return this.syntaxErrors;
    }

    private GetExpectedTokenStrs(): string[] {
        const statesUsed = this.errorStatesBeforeEof.size > 0 ? Array.from(this.errorStatesBeforeEof.values()) : Array.from(this.statesBeforeEof.values());
        return this.GetExpectedTokensByStateContext(statesUsed);
    }

    private GetExpectedTokensByStateContext(states: StateContext[]): string[] {
        if (!states) {
            return [];
        }

        const intervalSets = new IntervalSet();
        for (const state of states) {
            intervalSets.addAll(state.expectedTokens);
        }

        const expectedStrings = [];
        if (intervalSets.intervals === null) {
            return expectedStrings;
        }

        for (let i = 0; i < intervalSets.intervals.length; i++) {
            const v = intervalSets.intervals[i];
            if (v.a < 0) {
                continue;
            }

            for (let j = v.a; j <= v.b; j++) {
                let tokenString = this._lexer.vocabulary.getSymbolicName(j);
                tokenString = tokenString != null ? tokenString.replace(/^'|'$/gi, "") : tokenString;

                let literalString = this._lexer.vocabulary.getLiteralName(j);
                literalString = literalString != null ? literalString.replace(/^'|'$/gi, "") : literalString;

                if (literalString) {
                    if (!tokenString || tokenString.toUpperCase() === literalString.toUpperCase()) {
                        expectedStrings.push(literalString);
                    }
                }
            }
        }
        return expectedStrings.filter(notDuplicate);
    }

    public GetExpectedTokensByStates(states: ATNState[]): string[] {
        const stateContexts = states.map(state => new StateContext(state.stateNumber, this._parser.interpreter.atn.nextTokens(state), [], []));
        return this.GetExpectedTokensByStateContext(stateContexts);
    }

    public GetRuleStack(): Set<string> {
        const invokedRules = this.GetInvokedRules();
        const expectedRules = this.GetExpectedRules();
        return new Set([...invokedRules, ...expectedRules]);
    }

    public GetAllRuleNames(): string[] {
        return this._parser.ruleNames;
    }

    private GetInvokedRules(): Set<string> {
        const rules: Set<string> = new Set();
        const statesUsed = Array.from(this.errorStatesBeforeEof.values()).concat(Array.from(this.statesBeforeEof.values()));
        for (const state of statesUsed) {
            for (const r of state.rulesInvocationStack) {
                if (rules.has(r)) {
                    continue;
                } else {
                    rules.add(r);
                }
            }
        }
        return rules;
    }

    private GetExpectedRules(): Set<string> {
        const rules: Set<string> = new Set();
        // only need to seek expected rules within current rule. No need to trackback to previous parent rule since 
        // errorStatesBeforeEof contains all valid cases.
        const stateNumbers = this.errorStatesBeforeEof.size > 0 ? Array.from(this.errorStatesBeforeEof.keys()) : Array.from(this.statesBeforeEof.keys());
        const statesResolved: Set<number> = new Set();
        
        // <1> find all valid states
        while(stateNumbers.length > 0) {
            const stateNum = stateNumbers.shift();
            if (statesResolved.has(stateNum)) {
                continue;
            }

            statesResolved.add(stateNum);
            if (!ExpectedTokensSeeker.AtnStateCache.has(stateNum)) {
                const state = this.GetStateByNumber(stateNum);
                if (!state) {
                    continue;
                }
                ExpectedTokensSeeker.AtnStateCache.calculate(state);
            }

            const stateStatus: IATNStateStat = ExpectedTokensSeeker.AtnStateCache.get(stateNum);
            for (const ruleTran of stateStatus.ruleTransitionsWithinCurrentRule) {
                if (!(ruleTran as RuleTransition).ruleIndex) {
                    continue;
                }

                // go deep into child rules and find all rules we are expecting.
                stateNumbers.push((ruleTran as RuleTransition).target.stateNumber);
            }
        }
        
        // <2> find all expecting rules by states
        for (const stateNumber of statesResolved) {
            const stateStatus: IATNStateStat = ExpectedTokensSeeker.AtnStateCache.get(stateNumber);
            for (const ruleTran of stateStatus.ruleTransitionsWithinCurrentRule) {
                if (!(ruleTran as RuleTransition).ruleIndex) {
                    continue;
                }

                const ruleName = this._parser.ruleNames[(ruleTran as RuleTransition).ruleIndex];
                if (!rules.has(ruleName)) {
                    rules.add(ruleName);
                }
            }
        }
        return rules;
    }

    private _parse(input: string, beginParse: any, parseReason: LanguageServiceFeature, accurateKeywordIntellisense: boolean): Parser {
        this.PrepareParse();

        if (this._scriptFormater.hasNonReservedKeywords() && !CSAntlrParseService._ATNUsedForWordCompletion) {
            // if there are non-reserved keywords defined, then need to modify ATN.
            // Need to modify ATN for word completion.
            const originalATN = new ATNDeserializer().deserialize(Utils.toCharArray(this._parserCtr._serializedATN));
            CSAntlrParseService._originalATNNexTokens = originalATN.nextTokens;
            CSAntlrParseService._ATNUsedForWordCompletion = this.ModifyATNOnce(originalATN);
        }

        this._lexer = new this._lexerCtr(CharStreams.fromString(input));
        this._parser = new this._parserCtr(new CSLSCommonTokenStream(this._lexer));

        const commonTokenStream: CSLSCommonTokenStream = this._parser.inputStream as CSLSCommonTokenStream;
        commonTokenStream.eofListener = () => {
            this.RecordStateBeforeEof();
        };

        this._lexer.removeErrorListeners();
        this._parser.removeErrorListeners();
        this._parser.removeParseListeners();
        this._parser.addErrorListener(new CSLSErrorListener(
            (msg, line, startColumn, endColumn, severity) => {
                this.AddSyntaxError(msg, line, startColumn, endColumn, severity);
            },
            null,
        ));

        if (parseReason === LanguageServiceFeature.WordCompletion) {
            if (this._scriptFormater.hasNonReservedKeywords()) {
                this._parser.errorHandler = new SilentErrorHandler(this._scriptFormater);
            }
            this._parser.interpreter = new CSLSParserATNSimulator(this._parser, CSAntlrParseService._ATNUsedForWordCompletion ?? this._parser.atn, this, accurateKeywordIntellisense);
        } else {
            if (CSAntlrParseService._enableCustomizedErrorStrategy && parseReason === LanguageServiceFeature.ErrorDetection) {
                const nonReservedKeywordsInfo = this._scriptFormater.getNonReservedKeywordsInfo();
                const nonReservedKeywordInterval = nonReservedKeywordsInfo 
                    ? new Interval(nonReservedKeywordsInfo.nonReservedKeywordBottomIndex, nonReservedKeywordsInfo.nonReservedKeywordTopIndex) 
                    : null;
                
                this._parser.errorHandler = new SqlCustomizedErrorHandler(this, nonReservedKeywordInterval);
                this._parser.interpreter = new ErrorParserATNSimulator(this._parser, this._parser.atn);
            }
        }

        return beginParse.apply(this._parser);
    }

    private RecordStateBeforeEof(): void {
        if (!this.isInPredict) {
            this.eofReached = true;
            if (!this.exThrownAfterEofReached) {
                if (!this.statesBeforeEof.has(this._parser.state)) {
                    this.statesBeforeEof.set(this._parser.state, new StateContext(this._parser.state, this._parser.getExpectedTokens(), [], this._parser.getRuleInvocationStack()));
                }
            }
        } else {
            this.eofReachedInPredict = true;
        }
    }

    public RecordErrorStatesBeforeEof(states: IStateWithInvokingStack[]): void {
        if (!states) {
            return;
        }

        for (const state of states) {
            if (!state || state.currentStateNumber < 0 || state.currentStateNumber >= this._parser.atn.states.length) {
                continue;
            }

            if (!this.errorStatesBeforeEof.has(state.currentStateNumber)) {
                const atnState: ATNState = this.GetStateByNumber(state.currentStateNumber);
                const rulesInvocationStack = state.invokingStack.map(item => this._parser.ruleNames[this.GetStateByNumber(item).ruleIndex]);
                const stateContext = new StateContext(state.currentStateNumber, this._parser.interpreter.atn.nextTokens(atnState), state.invokingStack, rulesInvocationStack);
                this.errorStatesBeforeEof.set(state.currentStateNumber, stateContext);
            }
        }
    }

    /* 
        Only used for language that has non_reserved keywords defined. Only used for word completion.
        ATN is static. So only need to modify once.
        Language Service for non-reserved keywords:
        1. Word Completion will treat non-reserved keywords as reserved keywords but will not provide non-reserved keywords as suggestions when ID is needed. 
        2. There will be no error marker when using non-reserved keywords as ID.
        3. In error message, will show: "expecting ID...." instead of "expecting ABORT_AFTER_WAIT(and other non-reserved keywords)."
    */
    private ModifyATNOnce(atn: ATN): ATN {
        if (!this._scriptFormater.hasNonReservedKeywords()) {
            return atn;
        }

        // Though ModifyATNOnce will called only once, nextTokens delegate will called multiple times.
        atn.nextTokens = (s: ATNState, ctx = null): IntervalSet => {
            return this.GetNextTokensForWordCompletion(atn, s, ctx);
        };
        return atn;
    }

    private GetNextTokensForWordCompletion(atn: ATN, s: ATNState, ctx = null): IntervalSet {
        const nonReservedKeywordInfo = this._scriptFormater.getNonReservedKeywordsInfo();
        if (nonReservedKeywordInfo) {
            atn.states[nonReservedKeywordInfo.nonReservedKeywordsStateIndex].transition(0).label.clear();
            const result = CSAntlrParseService._originalATNNexTokens.apply(atn, [s, ctx]);
            atn.states[nonReservedKeywordInfo.nonReservedKeywordsStateIndex].transition(0).label.add(nonReservedKeywordInfo.nonReservedKeywordBottomIndex, nonReservedKeywordInfo.nonReservedKeywordTopIndex);
            return result;
        } else {
            return CSAntlrParseService._originalATNNexTokens.apply(atn, [s, ctx]);
        }
    }

    private AddSyntaxError(msg: string, line: number, startColumn: number, endColumn: number, severity: Severity): any {
        const error: IErrorMarkItem = {
            line,
            startColumn,
            endColumn,
            message : msg,
            severity,
        };

        this.syntaxErrors.push(error);

        if (this.eofReached) {
            this.exThrownAfterEofReached = true;
        }
    }

    public GetStateByNumber(stateNumber: number): ATNState {
        if (stateNumber < 0 || stateNumber >= this._parser.atn.states.length) {
            return null;
        }
        return this._parser.atn.states[stateNumber];
    }

    private PrepareParse() {
        this.eofReached = false;
        this.eofReachedInPredict = false;
        this.exThrownAfterEofReached = false;
        this.statesBeforeEof.clear();
        this.errorStatesBeforeEof.clear();
        this.syntaxErrors = [];
    }

    // Should only be called in client mode such as vscode extension or UT.
    // In production web environment we need not to clear cache since each language has its own web worker. They will not mix with each other.
    public static clearATNCache() {
        CSLSParserATNSimulator.ClearCache();
    }

    public getAllTokens(input: string) {
        const tokenStream = new CSLSCommonTokenStream(new this._lexerCtr(CharStreams.fromString(input)));
        tokenStream.fill();
        return tokenStream.getTokens();
    }
}

class AntlrParseCache {
    private _resultCache: Map<LanguageServiceFeature, { lastInput: string; lastResult: any }> = new Map();
    private _astCache: Map<LanguageServiceFeature, { lastScript: string; lastAst: any }> = new Map();

    public disableParseCache = false;

    constructor() {
        this._resultCache.set(LanguageServiceFeature.WordCompletion, { lastInput: null, lastResult: null });
        this._resultCache.set(LanguageServiceFeature.ErrorDetection, { lastInput: null, lastResult: null });
    }

    public hasResult(parseReason: LanguageServiceFeature, input: string): boolean {
        if (this.disableParseCache) {
            return false;
        }
        
        input = input == null ? "" : input;
        if (!this._resultCache.has(parseReason) || this._resultCache.get(parseReason).lastInput == null || this._resultCache.get(parseReason).lastInput !== input) {
            return false;
        } else {
            return true;
        }
    }

    public getResult(parseReason: LanguageServiceFeature, input: string): any {
        if (this.disableParseCache) {
            return null;
        }

        if (!this.hasResult(parseReason, input)) {
            return null;
        } else {
            return this._resultCache.get(parseReason).lastResult;
        }
    }

    public setResult(parseReason: LanguageServiceFeature, input: string, result: any): void {
        if (this.disableParseCache) {
            return;
        }
        
        this._resultCache.set(parseReason, { lastInput: input, lastResult: result });
    }

    public hasAst(parseReason: LanguageServiceFeature, script: string): boolean {
        if (this.disableParseCache) {
            return false;
        }

        return this._astCache.has(parseReason) && this._astCache.get(parseReason).lastScript === script;
    }

    public getAst(parseReason: LanguageServiceFeature, script: string): any {
        if (this.disableParseCache) {
            return null;
        }

        if (this.hasAst(parseReason, script)) {
            return this._astCache.get(parseReason).lastAst;
        } else {
            return null;
        }
    }

    public setAst(parseReason: LanguageServiceFeature, script: string, ast: any): void {
        if (this.disableParseCache) {
            return;
        }

        this._astCache.set(parseReason, { lastScript: script, lastAst: ast });
    }
}
