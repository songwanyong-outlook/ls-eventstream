import { Vocabulary } from "antlr4ts/Vocabulary";

export interface ITokenInfo {
    tokenNumber: number;
    tokenString: string;
}

interface INonReservedKeywordInfo {
    nonReservedKeywordsStateIndex: number;
    nonReservedKeywordTopIndex: number;
    nonReservedKeywordBottomIndex: number;
}

export class CSScriptFormatter {
    private static _instance = null;

    private caseSensitive = false;

    private reservedKeywordsSet: Set<string> = new Set();
    private nonReservedKeywordsSet: Set<string> = new Set();

    private statementEndTokenText = "";
    private statementEndToken = -1;

    private nonReservedKeywordInfo: INonReservedKeywordInfo = null;

    // reference: https://stackoverflow.com/a/23667311
    // \\": match and ignore \"
    // "(?:\\"|[^"])*": match and ignore anything in quotes ""
    // \\': match and ignore \'
    // '(?:\\'|[^'])*': match and ignore anything in single quotes ''
    // \\\[: match and ignore \[
    // \\\]: match and ignore \]
    // \[(?:[^\[\]])*\]: match and ignore anything in brackets []
    // ([a-zA-Z0-9_]+)： match words, capture them and handle
    private readonly wordRegex = /\\"|"(?:\\"|[^"])*"|\\'|'(?:\\'|[^'])*'|\\\[|\\\]|\[(?:\\\[|\\\]|[^[\]])*\]|([a-zA-Z0-9_]+)/g;

    public static GetInstance(originalVocabulary: Vocabulary, parser: any, caseSensitive: boolean, statementEndTokenText: string, nonReservedKeywordsRuleName: string): CSScriptFormatter {
        if (!CSScriptFormatter._instance) {
            CSScriptFormatter._instance = new CSScriptFormatter(originalVocabulary, parser, caseSensitive, statementEndTokenText, nonReservedKeywordsRuleName);
        }
        return CSScriptFormatter._instance;
    }

    private constructor(originalVocabulary: Vocabulary, parser: any, caseSensitive: boolean, statementEndTokenText: string, nonReservedKeywordsRuleName: string) {
        this.caseSensitive = caseSensitive;
        this.statementEndTokenText = statementEndTokenText;
        this.initializeKeywordTextList(originalVocabulary, parser, nonReservedKeywordsRuleName);
    }

    // If caseSentive, then return the original script. If not, uppercase keywords and keep others original format.
    public formatScriptByKeywords(script: string): string {
        if (this.caseSensitive) {
            return script;
        }

        return script.replace(this.wordRegex, (word, group1) => {
            if (!group1) {
                return word; 
            }
            return this.isKeyword(word) ? word.toUpperCase() : word;
        });
    }

    private initializeKeywordTextList(originalVocabulary: Vocabulary, parser: any, nonReservedKeywordsRuleName: string): void {
        if (nonReservedKeywordsRuleName) {
            const atn = parser._ATN;
            for (let i = 0; i < atn.states.length; i++) {
                if (!atn.states[i].transition(0) || !atn.states[i].transition(0).label || atn.states[i].transition(0).label.intervals.length === 0) {
                    continue;
                }
    
                if (parser.ruleNames[atn.states[i].ruleIndex] === nonReservedKeywordsRuleName) {
                    const firstLabel = atn.states[i].transition(0).label.intervals[0];
                    this.nonReservedKeywordInfo = { nonReservedKeywordsStateIndex: i, nonReservedKeywordTopIndex: firstLabel.b, nonReservedKeywordBottomIndex: firstLabel.a } as INonReservedKeywordInfo;
                }
            }
        }
        
        
        if (this.nonReservedKeywordInfo) {
            for (let i = this.nonReservedKeywordInfo.nonReservedKeywordBottomIndex; i <= this.nonReservedKeywordInfo.nonReservedKeywordTopIndex; i++) {
                if (!originalVocabulary.getLiteralName(i)) {
                    continue;
                }
    
                const originLiteralName: string = originalVocabulary.getLiteralName(i);
                const literalName: string = originLiteralName.substring(1, originLiteralName.length - 1);
                const symbolicName: string = originalVocabulary.getSymbolicName(i);
    
                if (!!this.statementEndTokenText && literalName === this.statementEndTokenText) {
                    this.statementEndToken = i;
                }
    
                if (literalName === symbolicName) {
                    this.nonReservedKeywordsSet.add(literalName);
                }
            }
        }

        for (let i = 0; i < originalVocabulary.maxTokenType; i++) {
            if (!originalVocabulary.getLiteralName(i)) {
                continue;
            }

            const originLiteralName: string = originalVocabulary.getLiteralName(i);
            const literalName: string = originLiteralName.substring(1, originLiteralName.length - 1);
            const symbolicName: string = originalVocabulary.getSymbolicName(i);

            if (!!this.statementEndTokenText && literalName === this.statementEndTokenText) {
                this.statementEndToken = i;
            }

            if (literalName === symbolicName && !this.nonReservedKeywordsSet.has(literalName)) {
                this.reservedKeywordsSet.add(literalName);
            }
        }
    }

    public isKeyword(text: string): boolean {
        return this.reservedKeywordsSet.has(text.toUpperCase()) || this.nonReservedKeywordsSet.has(text.toUpperCase());
    }

    public isReservedKeyword(text: string): boolean {
        return this.reservedKeywordsSet.has(text.toUpperCase());
    }

    public isNonReservedKeyword(text: string): boolean {
        return this.nonReservedKeywordsSet.has(text.toUpperCase());
    }

    public getStatementEndToken(): number {
        return this.statementEndToken;
    }

    public hasNonReservedKeywords(): boolean {
        return !!this.nonReservedKeywordInfo;
    }

    public getNonReservedKeywordsInfo(): INonReservedKeywordInfo {
        return this.nonReservedKeywordInfo;
    }

    public getKeywordTokens(script: string): string[] {
        const words: string[] = script.match(this.wordRegex);
        const keywords = words?.filter(w => this.isKeyword(w));
        return keywords ?? [];
    }
}
