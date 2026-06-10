import { CommonSqlCompletionItem } from "../../../../CommonSqlUtils/CommonSqlCompletionItem";
import { CSScriptFormatter } from "../Parser/CSScriptFormatter";
import { SqlModel } from "./Model/SqlProdModel";
import { GetModelTrainedByCodeSnippets } from "./SnippetModelTraining";

const MaxRecommendations = 5;
const MaxPrecedingSequenceLength = 4;
const SequenceDelimiter = "~";

const modelMap = new Map(Object.entries(SqlModel));

export function AppendRecommendation(completionItems: CommonSqlCompletionItem[], tokens: string[]): CommonSqlCompletionItem[] {
    if (completionItems.length === 0 || tokens.length === 0) {
        return completionItems;
    }
    
    const seqKeys = BuildSqlIntellicodeKeys(tokens);

    for (const seqKey of seqKeys) {
        if (!modelMap.has(seqKey)) {
            continue;
        }

        let recommendCount = 0;
        for (const value of modelMap.get(seqKey)) {
            const matchItem = completionItems.find(item => item.insertText === value);
            if (!matchItem) {
                continue;
            }
            matchItem.setRecommend();
            recommendCount++;
            if (recommendCount >= MaxRecommendations) {
                return completionItems;
            }
        }

        if (recommendCount > 0) {
            return completionItems;
        }
    }
    return completionItems;
}

let modelUpdated = false;

export function UpdateModelByCodeSnippets(snippets: string[], scriptFormater: CSScriptFormatter): void {
    if (modelUpdated || snippets.length === 0) {
        return;
    }

    modelUpdated = true;
    const trainedResult = GetModelTrainedByCodeSnippets(snippets, scriptFormater);
    for (const stmtResult of trainedResult.statementResult) {
        UpdateModel(stmtResult[1]);
    }

    if (trainedResult.freqResult) {
        UpdateModel(trainedResult.freqResult);
    }
    return;
}

export function ModelHasBeenUpdated(): boolean {
    return modelUpdated;
}

function UpdateModel(newModel: Map<string, string[]>) {
    for (const [key, values] of newModel) {
        if (!modelMap.has(key)) {
            modelMap.set(key, values);
            continue;
        }
        
        let newValues = modelMap.get(key).slice();
        for (const value of values) {
            const vIndex = newValues.findIndex(item => item === value);
            if (vIndex >= 0) {
                newValues.splice(vIndex, 1);
            }
            newValues = [value].concat(newValues);
        }
        modelMap.set(key, newValues);
    }
    return;
}

function BuildSqlIntellicodeKeys(tokens: string[]): string[] {
    if (tokens.length > MaxPrecedingSequenceLength) {
        tokens = tokens.slice(tokens.length - MaxPrecedingSequenceLength);
    }

    tokens = tokens.reverse();

    const intellicodeKeys = [];

    let sequence = tokens[0];
    intellicodeKeys.push(sequence);
    for (let i = 1; i < tokens.length; i++) {
        sequence = tokens[i] + SequenceDelimiter + sequence;
        intellicodeKeys.push(sequence);
    }
    return intellicodeKeys.reverse();
}
