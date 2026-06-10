import { ATNState } from "antlr4ts/atn/ATNState";
import { ATNStateType } from "antlr4ts/atn/ATNStateType";
import { Transition } from "antlr4ts/atn/Transition";
import { TransitionType } from "antlr4ts/atn/TransitionType";
import { IStateWithInvokingStack } from "./CSAntlrParseService";

export interface IATNStateStat {
    lastStateBeforeRuleStopState: boolean;
    hasActiveFollowingState: boolean;
    ruleTransitionsWithinCurrentRule: Transition[];
}

export class ATNStateCache {
    private _stateDict: Map<number, IATNStateStat> = new Map();

    public has(stateNumber: number): boolean {
        return this._stateDict.has(stateNumber);
    }

    public calculate(state: ATNState): void {
        const newStateStat: IATNStateStat = { lastStateBeforeRuleStopState: false, hasActiveFollowingState: false, ruleTransitionsWithinCurrentRule: [] } as IATNStateStat;

        let transitions = state.getTransitions();
        while (transitions.length > 0) {
            let epsilonTrans = [];
            for (let index = 0; index < transitions.length; index++) {
                if (transitions[index].isEpsilon) {
                    if (transitions[index].target.stateType === ATNStateType.RULE_STOP) {
                        newStateStat.lastStateBeforeRuleStopState = true;
                    } else if (transitions[index].serializationType === TransitionType.RULE) {
                        newStateStat.ruleTransitionsWithinCurrentRule.push(transitions[index]);
                        newStateStat.hasActiveFollowingState = true;
                    } else {
                        epsilonTrans = epsilonTrans.concat(transitions[index].target.getTransitions());
                    }
                } else {
                    newStateStat.hasActiveFollowingState = true;
                }
            }

            transitions = epsilonTrans;
        }
        this._stateDict.set(state.stateNumber, newStateStat);
        return;
    }

    public get(stateNumber: number): IATNStateStat {
        return this._stateDict.get(stateNumber);
    }
}

export class ConsumingActionCache {
    private _consumingActionDcit: Map<string, IStateWithInvokingStack[]> = new Map();

    public has(stateWithInvokingStack: IStateWithInvokingStack, matchToken: number): boolean {
        const actionKey: string = ConsumingActionCache.generateActionKey(stateWithInvokingStack, matchToken);
        return this._consumingActionDcit.has(actionKey);
    }

    public get(stateWithInvokingStack: IStateWithInvokingStack, matchToken: number): IStateWithInvokingStack[] {
        const actionKey: string = ConsumingActionCache.generateActionKey(stateWithInvokingStack, matchToken);
        return this._consumingActionDcit.get(actionKey);
    }

    public set(stateWithInvokingStack: IStateWithInvokingStack, matchToken: number, validStates: IStateWithInvokingStack[]): void {
        const actionKey: string = ConsumingActionCache.generateActionKey(stateWithInvokingStack, matchToken);
        this._consumingActionDcit.set(actionKey, validStates);
        return;
    }

    public clear(): void {
        this._consumingActionDcit.clear();
    }

    public static isSameAction(state1: IStateWithInvokingStack, matchToken1: number, state2: IStateWithInvokingStack, matchToken2: number): boolean {
        return ConsumingActionCache.generateActionKey(state1, matchToken1) === ConsumingActionCache.generateActionKey(state2, matchToken2);
    }

    private static generateActionKey(stateWithInvokingStack: IStateWithInvokingStack, matchToken: number): string {
        return [].concat(stateWithInvokingStack.currentStateNumber, stateWithInvokingStack.invokingStack, matchToken).join(",");
    }
}

export class CalulatingStatesCache {
    private _calculatingStatesDict: Map<string, IStateWithInvokingStack[]> = new Map();

    public has(startState: number, startTokenIndex: number, lastTokenIndex: number): boolean {
        const key: string = this.generateKey(startState, startTokenIndex, lastTokenIndex);
        return this._calculatingStatesDict.has(key);
    }

    public get(startState: number, startTokenIndex: number, lastTokenIndex: number): IStateWithInvokingStack[] {
        const key: string = this.generateKey(startState, startTokenIndex, lastTokenIndex);
        return this._calculatingStatesDict.get(key);
    }

    public set(startState: number, startTokenIndex: number, lastTokenIndex: number, validStates: IStateWithInvokingStack[]): void {
        const key: string = this.generateKey(startState, startTokenIndex, lastTokenIndex);
        this._calculatingStatesDict.set(key, validStates);
        return;
    }

    private generateKey(startState: number, startTokenIndex: number, lastTokenIndex: number): string {
        return [].concat(startState, startTokenIndex, lastTokenIndex).join(",");
    }
}
