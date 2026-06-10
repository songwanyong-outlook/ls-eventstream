import { DefaultErrorStrategy, Parser } from "antlr4ts";
import { ATN } from "antlr4ts/atn/ATN";
import { ATNState } from "antlr4ts/atn/ATNState";
import { ATNStateType } from "antlr4ts/atn/ATNStateType";
import { BasicState } from "antlr4ts/atn/BasicState";
import { BlockEndState } from "antlr4ts/atn/BlockEndState";
import { LoopEndState } from "antlr4ts/atn/LoopEndState";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { PlusBlockStartState } from "antlr4ts/atn/PlusBlockStartState";
import { PlusLoopbackState } from "antlr4ts/atn/PlusLoopbackState";
import { RuleStartState } from "antlr4ts/atn/RuleStartState";
import { RuleStopState } from "antlr4ts/atn/RuleStopState";
import { RuleTransition } from "antlr4ts/atn/RuleTransition";
import { StarBlockStartState } from "antlr4ts/atn/StarBlockStartState";
import { StarLoopbackState } from "antlr4ts/atn/StarLoopbackState";
import { StarLoopEntryState } from "antlr4ts/atn/StarLoopEntryState";
import { TokensStartState } from "antlr4ts/atn/TokensStartState";
import { TransitionType } from "antlr4ts/atn/TransitionType";
import { Interval } from "antlr4ts/misc/Interval";
import { IntervalSet } from "antlr4ts/misc/IntervalSet";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { notDuplicate } from "../../utils/SqlCoreUtils";
import { CSAntlrParseService, IStateWithInvokingStack } from "../Parser/CSAntlrParseService";
import { ExpectedTokensSeeker } from "../Parser/CSLSParserATNSimulator";
import { CSScriptFormatter } from "../Parser/CSScriptFormatter";

// only used for sql word completion feature.
export class SilentErrorHandler extends DefaultErrorStrategy {
    constructor(private scriptFormater: CSScriptFormatter) {
        super();
    }

    sync(recognizer) {
        try {
            super.sync(recognizer);
        } catch {
            // silent
        }
    }

    reportUnwantedToken(recognizer: Parser): void {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.currentToken;
        let tokenName = this.getTokenErrorDisplay(t);
        if (tokenName.startsWith("'") && tokenName.endsWith("'") && tokenName.length > 2) {
            tokenName = tokenName.slice(1, tokenName.length - 1);
        }

        if (this.scriptFormater.isNonReservedKeyword(tokenName)) {
            return;
        }
        super.reportUnwantedToken(recognizer);
    }

}

export class SqlCustomizedErrorHandler extends DefaultErrorStrategy {
    private _parseService: CSAntlrParseService = null;
    private _nonReservedKeywordInterval: IntervalSet = null;

    constructor(parseService: CSAntlrParseService, nonReservedKeywordInterval?: Interval) {
        super();
        this._parseService = parseService;
        if (nonReservedKeywordInterval) {
            this._nonReservedKeywordInterval = new IntervalSet([nonReservedKeywordInterval]);
        }
    }

    reportInputMismatch(recognizer: Parser, e) {
        let expected: IntervalSet = e.expectedTokens;
        if (expected && this._nonReservedKeywordInterval) {
            expected = expected.subtract(this._nonReservedKeywordInterval);
        }
        const expectedString = expected ? expected.toStringVocabulary(recognizer.vocabulary) : "";
        const msg = "mismatched input " + this.getTokenErrorDisplay(e.getOffendingToken(recognizer)) +
            " expecting " + expectedString;
        this.notifyErrorListeners(recognizer, msg, e);
    }
    reportUnwantedToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.currentToken;
        const tokenName = this.getTokenErrorDisplay(t);
        let expecting = this.getExpectedTokens(recognizer);
        if (this._nonReservedKeywordInterval) {
            expecting = expecting.subtract(this._nonReservedKeywordInterval);
        }
        const msg = "extraneous input " + tokenName + " expecting " +
            expecting.toStringVocabulary(recognizer.vocabulary);
        recognizer.notifyErrorListeners(msg, t, undefined);
    }
    
    reportMissingToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.currentToken;
        let expecting = this.getExpectedTokens(recognizer);
        if (this._nonReservedKeywordInterval) {
            expecting = expecting.subtract(this._nonReservedKeywordInterval);
        }
        const msg = "missing " + expecting.toStringVocabulary(recognizer.vocabulary) +
            " at " + this.getTokenErrorDisplay(t);
        recognizer.notifyErrorListeners(msg, t, undefined);
    }

    getExpectedTokens(recognizer) {
        const expected = recognizer.getExpectedTokens();
        return expected;
    }


    notifyErrorListeners(recognizer: Parser, message, e) {
        if (e instanceof NoViableAltException) {
            const expectedTokenSeeker = new ExpectedTokensSeeker(this._parseService.statementEndToken, recognizer);
            const offendingToken = e.getOffendingToken();
            const tokensLeft = offendingToken.tokenIndex - recognizer.currentToken.tokenIndex;
            const states: IStateWithInvokingStack[] = expectedTokenSeeker.SeekAllExpectTokens(recognizer.inputStream, tokensLeft);
            let validStates = [];

            for (const s of states) {
                const atnState = this._parseService.GetStateByNumber(s.currentStateNumber);
                if (!atnState) {
                    continue;
                }
                validStates = validStates.concat(this.searchValidStatesForExpectedStrings(atnState, []));
            }

            const offendingTokenText = this.getSymbolText(offendingToken);
            const expectedTokens = this.getExpectedStringsFromStates(recognizer, validStates).filter(notDuplicate);
            const expectedStr = !expectedTokens ? null : expectedTokens.join(", ");
            message = "incorrect token " + offendingTokenText + (expectedStr ? " expecting " + expectedStr : "");
        }
        super.notifyErrorListeners(recognizer, message, e);
    }

    private searchValidStatesForExpectedStrings(state: ATNState, invocationStack: number[]): ATNState[] {
        if (invocationStack.some(item => item === state.stateNumber)) {
            // avoid loop
            return [];
        }
        
        let result: ATNState[] = [];
        invocationStack.push(state.stateNumber);

        const trans = state.getTransitions();
        for (const _tran of trans) {
            if (_tran.serializationType === TransitionType.ATOM || _tran.serializationType === TransitionType.RULE) {
                result.push(state);
            } else if (_tran.serializationType === TransitionType.EPSILON) {
                result = result.concat(this.searchValidStatesForExpectedStrings(_tran.target, invocationStack));
            } else {
                continue;
            }
        }
        return result;
    }

    private getExpectedStringsFromStates(_parser: Parser, states: ATNState[]): string[] {
        let result: string[] = [];
        for (const _state of states) {
            const copiedState = this.copyState(_state);
            const trans = copiedState.getTransitions();
            for (let i = 0; i < trans.length; i++) {
                const tran = trans[i];
                if (tran.serializationType !== TransitionType.ATOM) {
                    copiedState.removeTransition(i);
                }

                if (tran.serializationType === TransitionType.RULE) {
                    result.push(_parser.ruleNames[(<RuleTransition>tran).ruleIndex]);
                }
            }
            result = result.concat(this._parseService.GetExpectedTokensByStates([copiedState]));
        }
        return result.sort();
    }

    private copyState(state: ATNState): ATNState {
        let copiedState: ATNState = null;
        switch (state.stateType) {
            case ATNStateType.BASIC:
                copiedState = new BasicState();
                break;
            case ATNStateType.BLOCK_END:
                copiedState = new BlockEndState();
                break;
            case ATNStateType.LOOP_END:
                copiedState = new LoopEndState();
                break;
            case ATNStateType.PLUS_BLOCK_START:
                copiedState = new PlusBlockStartState();
                break;
            case ATNStateType.PLUS_LOOP_BACK:
                copiedState = new PlusLoopbackState();
                break;
            case ATNStateType.RULE_START:
                copiedState = new RuleStartState();
                break;
            case ATNStateType.RULE_STOP:
                copiedState = new RuleStopState();
                break;
            case ATNStateType.STAR_BLOCK_START:
                copiedState = new StarBlockStartState();
                break;
            case ATNStateType.STAR_LOOP_BACK:
                copiedState = new StarLoopbackState();
                break;  
            case ATNStateType.STAR_LOOP_ENTRY:
                copiedState = new StarLoopEntryState();
                break;  
            case ATNStateType.TOKEN_START:
                copiedState = new TokensStartState();
                break;  
        }

        if (!copiedState) {
            return null;
        }

        copiedState.stateNumber = state.stateNumber;
        copiedState.ruleIndex = state.ruleIndex;
        copiedState.atn = state.atn;
        for (let i = 0; i < state.getTransitions().length; i++) {
            copiedState.setTransition(i, state.transition(i));
        }
        return copiedState;
    }
}

export class ErrorParserATNSimulator extends ParserATNSimulator {
    constructor(parser: Parser, atn: ATN) {
        super(atn, parser);
    }

    handleNoViableAlt(input, startIndex, previous) {
        const offendingTokenIndex = !!input.p && input.p > -1 ? input.p : startIndex;
        const outerContext = previous ? previous.outerContext : null;
        const configs = previous ? previous.s0.configs : null;
        throw this.noViableAlt(input, outerContext, configs, offendingTokenIndex);
        return -1;
    }
}
