// -----------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { ATN } from "antlr4ts/atn/ATN";
import { ATNState } from "antlr4ts/atn/ATNState";
import { ATNStateType } from "antlr4ts/atn/ATNStateType";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { RuleTransition } from "antlr4ts/atn/RuleTransition";
import { TransitionType } from "antlr4ts/atn/TransitionType";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { notDuplicate, notEmpty } from "../../utils/SqlCoreUtils";
import { CSAntlrParseService, IStateWithInvokingStack } from "./CSAntlrParseService";
import { ATNStateCache, CalulatingStatesCache, ConsumingActionCache, IATNStateStat } from "./CSCacheForATNSimulator";

export class CSLSParserATNSimulator extends ParserATNSimulator {
    private _parseService: CSAntlrParseService;
    private _enableSeekingValidStates: boolean;
    private _expectedTokensSeeker: ExpectedTokensSeeker = null;

    constructor(parser: Parser, atn: ATN, parseService: CSAntlrParseService, enableSeekingValidStates: boolean) {
        super(atn, parser);
        this._enableSeekingValidStates = enableSeekingValidStates;
        this._parseService = parseService;
        this._expectedTokensSeeker = enableSeekingValidStates ? new ExpectedTokensSeeker(this._parseService.statementEndToken, parser) : null;
    }

    public adaptivePredict(input: TokenStream, decision: number, outerContext: ParserRuleContext, useContext: boolean = undefined): number {
        let tokensLeft = -1;

        try {
            this._parseService.isInPredict = true;
            this._parseService.eofReachedInPredict = false;

            if (decision >= 0) {
                return super.adaptivePredict(input, decision, outerContext, useContext);
            } else {
                return -1;
            }
        } catch (error) {
            if (error instanceof RecognitionException) {
                const ex: RecognitionException = <RecognitionException>error;
                const offendingToken = ex.getOffendingToken(ex.recognizer);
                if (!!offendingToken && offendingToken.type === Token.EOF) {
                    tokensLeft = offendingToken.tokenIndex - this.parser.currentToken.tokenIndex;
                    throw error;
                }
            }
            throw error;
        } finally {
            if (this._parseService.eofReachedInPredict && this._enableSeekingValidStates) {
                if (tokensLeft < 0) {
                    tokensLeft = 0;
                    while (input.LA(tokensLeft + 1) !== Token.EOF) {
                        tokensLeft++;
                    }
                }

                if (tokensLeft > 0 && (this._parser as any)._syntaxErrors === 0) {
                    const validStates: IStateWithInvokingStack[] = this._expectedTokensSeeker.SeekAllExpectTokens(input, tokensLeft);
                    this._parseService.RecordErrorStatesBeforeEof(validStates);
                }
            }

            this._parseService.isInPredict = false;
        }
    }

    public static ClearCache() {
        ExpectedTokensSeeker.ClearCache();
    }
}

export class ExpectedTokensSeeker {
    public static AtnStateCache: ATNStateCache = new ATNStateCache();
    private static _consumingActionCache: ConsumingActionCache = new ConsumingActionCache();

    private _intermidiateConsumingActionCache: ConsumingActionCache = new ConsumingActionCache();
    private _calculatingStatesCache: CalulatingStatesCache = new CalulatingStatesCache();
    private _statementEndToken = -1;
    private _parser: Parser = null;

    constructor(statementEndToken: number, parser: Parser) {
        this._statementEndToken = statementEndToken;
        this._parser = parser;
    }

    public SeekAllExpectTokens(input: TokenStream, lastTokenIndex: number): IStateWithInvokingStack[] {
        const startTokenIndex = this.SeekStartToken(input, lastTokenIndex);
        let states: IStateWithInvokingStack[] = [];
        if (this._calculatingStatesCache.has(this._parser.state, startTokenIndex, lastTokenIndex)) {
            states = this._calculatingStatesCache.get(this._parser.state, startTokenIndex, lastTokenIndex);
        } else {
            states = this.CalculateValidStates(input, lastTokenIndex, startTokenIndex);
            this._calculatingStatesCache.set(this._parser.state, startTokenIndex, lastTokenIndex, states);
        }
        return states;
    }

    private CalculateValidStates(input: TokenStream, tokensLeft: number, startTokenIndex: number): IStateWithInvokingStack[] {
        if (startTokenIndex > tokensLeft) {
            return [];
        }

        let states: IStateWithInvokingStack[] = [
            {
                currentStateNumber: this._parser.state,
                invokingStack : this.GetInitialInvocationStatesStack(),
            },
        ];

        // one step each time. Consume a single token each time.
        for (let index = startTokenIndex; index <= tokensLeft; index++) {
            let _states: IStateWithInvokingStack[] = [];
            const nextToken: number = input.LA(index);
            if (nextToken < 1) {
                continue;
            }

            let originalValidStates = [];
            for (const s of states) {
                // convert original states to original valid states.
                originalValidStates = originalValidStates.concat(this.SearchValidStates(s));
            }
            originalValidStates.forEach(s => {
                const validStates = this.ConsumeSingleTokenAhead(s, nextToken, false).filter(notDuplicate);
                ExpectedTokensSeeker._consumingActionCache.set(s, nextToken, validStates);
                _states = _states.concat(validStates);
            });
            states = _states.filter(notDuplicate);
        }
        this._intermidiateConsumingActionCache.clear();
        return states.filter(s => !!this.GetStateByNumber(s.currentStateNumber)).filter(notDuplicate);
    }

    private ConsumeSingleTokenAhead(stateWithInvokingStack: IStateWithInvokingStack, matchToken: number, ruleStart: boolean): IStateWithInvokingStack[] {
        if (ExpectedTokensSeeker._consumingActionCache.has(stateWithInvokingStack, matchToken)) {
            return ExpectedTokensSeeker._consumingActionCache.get(stateWithInvokingStack, matchToken);
        }

        if (this._intermidiateConsumingActionCache.has(stateWithInvokingStack, matchToken)) {
            return this._intermidiateConsumingActionCache.get(stateWithInvokingStack, matchToken);
        }

        let validStates: IStateWithInvokingStack[] = [];
        const currentStateNumber = stateWithInvokingStack.currentStateNumber;
        const currentState = this.GetStateByNumber(currentStateNumber);
        if (!currentState) {
            return [];
        }

        const nextStateWithInvokingStack: IStateWithInvokingStack = {
            currentStateNumber : -1, // Temporary null
            invokingStack : stateWithInvokingStack.invokingStack.slice(),
        };

        // if current state is rule start state. Even if the state is in the same rule with the last state in the stack we could not pop up the last state. Since we may access the same rule
        // continuously such as ruleA: TokenB ruleA;
        if (nextStateWithInvokingStack.invokingStack.length > 0 && !ruleStart) {
            const lastState = this.GetStateByNumber(nextStateWithInvokingStack.invokingStack[nextStateWithInvokingStack.invokingStack.length - 1]);
            if (!!lastState && lastState.ruleIndex === currentState.ruleIndex) {
                nextStateWithInvokingStack.invokingStack.pop();
            }
        }
        nextStateWithInvokingStack.invokingStack.push(currentState.stateNumber);

        if (currentState.stateType !== ATNStateType.RULE_STOP) {
            const trans = currentState.getTransitions();
            for (let index = 0; index < trans.length; index++) {
                const transition = trans[index];
                const destinationChildState = transition.target;
                nextStateWithInvokingStack.currentStateNumber = destinationChildState.stateNumber;

                if (!transition.isEpsilon) {
                    if (transition.label != null && transition.label.contains(matchToken)) {
                        validStates = validStates.concat(this.SearchValidStates(nextStateWithInvokingStack));
                    }
                } else {
                    if (!ConsumingActionCache.isSameAction(stateWithInvokingStack, matchToken, nextStateWithInvokingStack, matchToken)) {
                        validStates = validStates.concat(this.ConsumeSingleTokenAhead(nextStateWithInvokingStack, matchToken, transition.serializationType === TransitionType.RULE)).filter(notDuplicate);
                    }
                }
            }
            validStates = validStates.filter(notEmpty);
        }

        this._intermidiateConsumingActionCache.set(stateWithInvokingStack, matchToken, validStates);
        return validStates;
    }
    
    // valid states that can be used to get expect tokens.
    // If current state is not the last state before rule stop state then current state can be used, which means that current state is a valid state.
    // If current state is the last state before rule stop state then we must backtrace since we cannot get any expect tokens with current state.
    private SearchValidStates(stateWithInvokingStack: IStateWithInvokingStack): IStateWithInvokingStack[] {
        let validStates: IStateWithInvokingStack[] = [];
        const currentState = this.GetStateByNumber(stateWithInvokingStack.currentStateNumber);
        if (!currentState) {
            return [];
        }

        if (this.IsLastStateBeforeRuleStopState(currentState)) {
            validStates = validStates.concat(this.BackTracingAndFindActiveStates(stateWithInvokingStack).filter(notDuplicate));
            if (this.HasActiveFollowingState(currentState)) {
                validStates.push(stateWithInvokingStack);
            }
        } else {
            validStates.push(stateWithInvokingStack);
        }
        return validStates;
    }

    private BackTracingAndFindActiveStates(stateWithInvokingStack: IStateWithInvokingStack): IStateWithInvokingStack[] {
        const validStates: IStateWithInvokingStack[] = [];
        const originalState = this.GetStateByNumber(stateWithInvokingStack.currentStateNumber);
        if (!originalState) {
            return [];
        }

        let completedRuleIndex = originalState.ruleIndex;
        const statesStack: ATNState[] = this.GetStatesStack(stateWithInvokingStack.invokingStack);
        if (!!statesStack && statesStack.length > 0 && statesStack[statesStack.length - 1].ruleIndex === originalState.ruleIndex) {
            statesStack.pop();
        }
        let currentStateIndex = statesStack.length - 1;
        let keepBackTracing = true;

        while (keepBackTracing && currentStateIndex >= 0) {
            const currentState = statesStack[currentStateIndex];
            keepBackTracing = false;
            const followingStates = this.GetRuleFollowingState(currentState, completedRuleIndex);

            for (const followingState of followingStates) {
                let lastStateBeforeRuleStopState = false;
                let haveActiveChildrenStatesInCurrentRule = false;

                if (!ExpectedTokensSeeker.AtnStateCache.has(followingState.stateNumber)) {
                    ExpectedTokensSeeker.AtnStateCache.calculate(followingState);
                }

                const stateStat: IATNStateStat = ExpectedTokensSeeker.AtnStateCache.get(followingState.stateNumber);
                if (stateStat) {
                    lastStateBeforeRuleStopState = stateStat.lastStateBeforeRuleStopState;
                    haveActiveChildrenStatesInCurrentRule = stateStat.hasActiveFollowingState;
                }

                if (lastStateBeforeRuleStopState) {
                    keepBackTracing = true;
                }

                if (haveActiveChildrenStatesInCurrentRule) {
                    const newValidState: IStateWithInvokingStack = {
                        currentStateNumber : followingState.stateNumber,
                        invokingStack : statesStack.slice(0, currentStateIndex + 1).map(state => state.stateNumber),
                    };
                    validStates.push(newValidState);
                }
            }

            currentStateIndex--;
            if (keepBackTracing) {
                completedRuleIndex = followingStates[0].ruleIndex;
            }
        }

        return validStates.filter(notEmpty);
    }

    private GetStatesStack(statesStack: number[]): ATNState[] {
        return statesStack.map(item => this.GetStateByNumber(item)).filter(item => !!item);
    }

    private GetRuleFollowingState(state: ATNState, ruleIndex: number): ATNState[] {
        const followingStates: ATNState[] = [];
        if (state.stateType === ATNStateType.RULE_STOP) {
            return followingStates;
        }

        if (!ExpectedTokensSeeker.AtnStateCache.has(state.stateNumber)) {
            ExpectedTokensSeeker.AtnStateCache.calculate(state);
        }

        const stateStat: IATNStateStat = ExpectedTokensSeeker.AtnStateCache.get(state.stateNumber);
        if (!stateStat || !stateStat.ruleTransitionsWithinCurrentRule || stateStat.ruleTransitionsWithinCurrentRule.length === 0) {
            return followingStates;
        }

        return stateStat.ruleTransitionsWithinCurrentRule.map(item => {
            if (item instanceof RuleTransition && (<RuleTransition>item).ruleIndex === ruleIndex) {
                return (<RuleTransition>item).followState;
            } else {
                return null;
            }
        }).filter(notEmpty);
    }

    // Means with this state, parser can make up a complete rule.
    private IsLastStateBeforeRuleStopState(state: ATNState): boolean {
        if (!ExpectedTokensSeeker.AtnStateCache.has(state.stateNumber)) {
            ExpectedTokensSeeker.AtnStateCache.calculate(state);
        }
        const stateStat = ExpectedTokensSeeker.AtnStateCache.get(state.stateNumber);
        return stateStat ? stateStat.lastStateBeforeRuleStopState : false;
    }

    private HasActiveFollowingState(state: ATNState): boolean {
        if (!ExpectedTokensSeeker.AtnStateCache.has(state.stateNumber)) {
            ExpectedTokensSeeker.AtnStateCache.calculate(state);
        }
        const stateStat: IATNStateStat = ExpectedTokensSeeker.AtnStateCache.get(state.stateNumber);
        return stateStat ? stateStat.hasActiveFollowingState : false;
    }

    private SeekStartToken(input: TokenStream, tokenLeft: number): number {
        if (tokenLeft <= 0 || this._statementEndToken < 0) {
            return 1;
        }

        let statementEndTokenIndex = -1;
        let index = 1;
        while (input.LA(index) !== Token.EOF) {
            if (input.LA(index) === this._statementEndToken) {
                statementEndTokenIndex = index;
            }
            index++;
        }

        if (statementEndTokenIndex > 0) {
            return statementEndTokenIndex + 1;
        } else {
            return 1;
        }
    }

    private GetStateByNumber(stateNumber: number): ATNState {
        if (stateNumber < 0 || stateNumber >= this._parser.atn.states.length) {
            return null;
        }
        return this._parser.atn.states[stateNumber];
    }

    private GetInitialInvocationStatesStack(): number[] {
        let invokingStates: number[] = [];
        let ctx = this._parser.context;
        while (!!ctx && ctx.invokingState > -1) {
            invokingStates.push(ctx.invokingState);
            ctx = ctx.parent;
        }
        invokingStates = invokingStates.reverse();
        return invokingStates.filter(item => !!this.GetStateByNumber(item));
    }

    public static ClearCache() {
        ExpectedTokensSeeker.AtnStateCache = new ATNStateCache();
        ExpectedTokensSeeker._consumingActionCache = new ConsumingActionCache();
    }
}
