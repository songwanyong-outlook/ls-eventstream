import { sqlStmtTerminatorRegex } from "../../../../CommonSqlUtils/Utils";
import { CSScriptFormatter } from "../Parser/CSScriptFormatter";

interface SnippetModelTrainResult {
    statementResult: [string, Map<string, string[]>][];
    freqResult: Map<string, string[]>;
}

const MaxPrecedingSequenceLength = 4;
const SequenceDelimiter = "~";
const LineCommentsHeader = "--";
const BlockCommentsStart = "/*";
const BlockCommentsEnd = "*/";
const StrCh = "'";
const NEWLINE = "\n";

//Bigger for this number, The more for data count in trained model. 
const MODEL_PARAM = 4;

export function GetModelTrainedByCodeSnippets(snippets: string[], scriptFormater: CSScriptFormatter): SnippetModelTrainResult {
    const result: SnippetModelTrainResult = {
        statementResult: [],
        freqResult: null,
    } as SnippetModelTrainResult;

    const statements = SplitSnippetsIntoStmts(snippets);
    const freqMap: Map<number, Map<string, number>> = new Map();
    for (let i = 2; i <= MaxPrecedingSequenceLength + 1; i++) {
        freqMap.set(i, new Map());
    }

    for (const stmt of statements) {
        const keywordTokens = scriptFormater.getKeywordTokens(stmt);
        const modelTrainedBySingleStmt = TrainModelPerSingleStmt(keywordTokens);
        result.statementResult.push([stmt, modelTrainedBySingleStmt]);
        UpdateFrequencyMapPerSingleStmt(keywordTokens, freqMap);
    }

    if (statements.length * MODEL_PARAM < MaxPrecedingSequenceLength) {
        return result;
    }
    
    const modelsByFreqMap = GetModelByFreqMap(freqMap, statements.length);
    result.freqResult = modelsByFreqMap;
    return result;
}


function UpdateFrequencyMapPerSingleStmt(keywordTokens: string[], freqMap: Map<number, Map<string, number>>) {
    if (keywordTokens.length < 2) {
        return;
    }

    const windowMaxLen = MaxPrecedingSequenceLength + 1;
    const tokensWindow = [keywordTokens[0], keywordTokens[1]];

    const updateFreqForSingleTokensWindow = (tokens: string[]) => {
        for (let i = 1; i < tokens.length; i++) {
            const tokensLen = i + 1;
            const tokensKey = BuildSingleKeyFromTokens(tokens.slice(0, i + 1));
            const _freqMap = freqMap.get(tokensLen);
            if (!_freqMap.has(tokensKey)) {
                _freqMap.set(tokensKey, 1);
            } else {
                _freqMap.set(tokensKey, _freqMap.get(tokensKey) + 1);
            }
        }
    };
    
    updateFreqForSingleTokensWindow(tokensWindow);
    for (let i = 2; i < keywordTokens.length; i++) {
        if (tokensWindow.length + 1 > windowMaxLen) {
            tokensWindow.shift();
        }
        tokensWindow.push(keywordTokens[i]);
        updateFreqForSingleTokensWindow(tokensWindow);
    }
    return;
}

function TrainModelPerSingleStmt(keywordTokens: string[]): Map<string, string[]> {
    const snippetModelMap: Map<string, string[]> = new Map();

    // process for first MaxPrecedingSequenceLength + 1 tokens
    const endIndex = Math.min(MaxPrecedingSequenceLength, keywordTokens.length - 1);
    let seq = "";
    for (let i = 0; i < endIndex; i++) {
        if (!seq) {
            seq = keywordTokens[i];
        } else {
            seq = seq.concat(SequenceDelimiter, keywordTokens[i]);
        }

        if (i + 1 >= keywordTokens.length) {
            continue;
        }

        // add into map
        if (snippetModelMap.has(seq)) {
            snippetModelMap.get(seq).push(keywordTokens[i + 1]);
        } else {
            snippetModelMap.set(seq, [keywordTokens[i + 1]]);
        }
    }
    return snippetModelMap;
}

function GetModelByFreqMap(freqMap: Map<number, Map<string, number>>, stmtCount: number): Map<string, string[]> {
    const modelMap: Map<string, string[]> = new Map();

    const tokensMeetBar: string[] = [];
    for (const [tokenLen, _freqMap] of freqMap) {
        const freqBar = GetFreqBarForSpecificLenKey(tokenLen, stmtCount);

        for (const [tokensKey, freq] of _freqMap) {
            if (freq > freqBar) {
                tokensMeetBar.push(tokensKey);
            }
        }
    }
    
    for (const tokensStr of tokensMeetBar) {
        const tokens = tokensStr.split(SequenceDelimiter);
        const precedingTokensStr = tokens.slice(0, tokens.length - 1).join(SequenceDelimiter);
        const suggestToken = tokens[tokens.length - 1];
        if (!modelMap.has(precedingTokensStr)) {
            modelMap.set(precedingTokensStr, [suggestToken]);
        } else {
            modelMap.get(precedingTokensStr).push(suggestToken);   
        }
    }
    return modelMap;
}


function SplitSnippetsIntoStmts(snippets: string[]): string[] {
    snippets = RemoveCommentsAndStrsInSnippets(snippets);
    let statements = [];
    
    for (const snippet of snippets) {
        statements = statements.concat(snippet.split(sqlStmtTerminatorRegex).filter(item => !!item.trim()));
    }
    return statements;
}

function RemoveCommentsAndStrsInSnippets(snippets: string[]): string[] {
    const strMatch =  (index: number, snippet: string, matchStr: string): boolean => {
        if (index + matchStr.length <= snippet.length) {
            return matchStr === snippet.substring(index, index + matchStr.length);
        }
        return false;
    };
    
    const isBlockCommentStart = (index: number, snippet: string): boolean => {
        return strMatch(index, snippet, BlockCommentsStart);
    };

    const isBlockCommentEnd = (index: number, snippet: string): boolean => {
        return strMatch(index, snippet, BlockCommentsEnd);
    };

    const isLineComment = (index: number, snippet: string): boolean => {
        return strMatch(index, snippet, LineCommentsHeader);
    };

    const isStr = (index: number, snippet: string): boolean => {
        return snippet[index] === StrCh && !(index > 0 && snippet[index - 1] === "\\");
    };

    const trimedSnippets = [];
    for (const snippet of snippets) {
        let trimedSnippet = "";
        let inLineComment = false;
        let inBlockComment = false;
        let inStr = false;

        for (let i = 0; i < snippet.length; i++) {
            const ch = snippet[i];
            // in line comments
            if (inLineComment) {
                if (ch === NEWLINE) {
                    inLineComment = false;
                }
                continue;
            }
            
            // in block comments
            if (inBlockComment) {
                if (isBlockCommentEnd(i, snippet)) {
                    inBlockComment = false;
                }
                continue;
            }

            // in str 
            if (inStr) {
                if (isStr(i, snippet)) {
                    inStr = false;
                }
                continue;
            }

            // line comment start 
            if (isLineComment(i, snippet)) {
                inLineComment = true;
                continue;
            }

            // block comment start
            if (isBlockCommentStart(i, snippet)) {
                inBlockComment = true;
                continue;
            }

            // str start
            if (isStr(i, snippet)) {
                inStr = true;
                continue;
            }
            trimedSnippet = trimedSnippet.concat(snippet[i]);
        }
        trimedSnippets.push(trimedSnippet);
    }
    return trimedSnippets;
}

function BuildSingleKeyFromTokens(tokens: string[]): string {
    return tokens.join(SequenceDelimiter);
}

function GetFreqBarForSpecificLenKey(tokensLen: number, stmtCount: number) {
    // Smaller for tokensLen, higher for freq bar
    const precedingSequenceLen = tokensLen - 1;
    if (precedingSequenceLen === 1) {
        // highest
        return Math.floor(stmtCount / MODEL_PARAM);
    } 

    const step = Math.floor(stmtCount / MaxPrecedingSequenceLength);
    return Math.floor((MaxPrecedingSequenceLength - precedingSequenceLen + 1) * step / MODEL_PARAM);
}
