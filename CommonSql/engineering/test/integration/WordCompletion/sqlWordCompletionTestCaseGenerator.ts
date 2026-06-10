import { CSScriptFormatter } from "@CommonSqlCore/src/language-service/Parser/CSScriptFormatter";
import { isInId } from "@engineering/test/common/Utils";

export interface ISqlWordCompletionTestCase {
    partialScript: string;
    expectedSuggestions: string[];
    unexpectedSuggestions: string[];
}

export function generateSqlWordCompletionTestCase(scripts: string[], scriptFormatterInstance: CSScriptFormatter): ISqlWordCompletionTestCase[] {
    // key is partialScript while value is expected words.
    const testCaseDict: Map<string, string[]> = new Map();

    for (const script of scripts) {
        const testCasesFromSingleScript: ISqlWordCompletionTestCase[] = generateTestCaseFromSingleScript(script, scriptFormatterInstance);
        for (const testCase of testCasesFromSingleScript) {
            if (!testCaseDict.has(testCase.partialScript)) {
                testCaseDict.set(testCase.partialScript, []);
            }
            // only one expected word suggestion for a test case.
            if (!testCaseDict.get(testCase.partialScript).includes(testCase.expectedSuggestions[0])) {
                testCaseDict.get(testCase.partialScript).push(testCase.expectedSuggestions[0]);
            }
        }
    }
    return Array.from(testCaseDict.entries()).map(pair => {
        return {
            partialScript: pair[0],
            expectedSuggestions: pair[1],
            unexpectedSuggestions: [],
        } as ISqlWordCompletionTestCase;
    });
}

function generateTestCaseFromSingleScript(script: string, scriptFormatterInstance: CSScriptFormatter): ISqlWordCompletionTestCase[] {
    const testCases: ISqlWordCompletionTestCase[] = [];
    const words: string[] = script.split(new RegExp("[^0-9a-zA-Z_]")).filter(str => str !== "");
    let splitters = script.split(new RegExp("[0-9a-zA-Z_]")).filter(str => str !== "");
    let index = 0;
    let partialScript: string = (splitters.length > 0 && script.indexOf(splitters[0]) === 0) ? splitters[0] : "";
    splitters = (partialScript === "") ? splitters : (splitters.length > 1 ? splitters.slice(1) : []);

    let lastScriptBlockIsInId = false;

    while (index < words.length) {
        lastScriptBlockIsInId = isInId(partialScript);
        if (!lastScriptBlockIsInId && scriptFormatterInstance.isKeyword(words[index]) && !partialScript.endsWith(".")) {
            testCases.push({ partialScript, expectedSuggestions: [words[index].toUpperCase()], unexpectedSuggestions: [] } as ISqlWordCompletionTestCase);
        }
        partialScript = partialScript.concat(words[index]);

        if (index < splitters.length) {
            const splitter = splitters[index];
            partialScript = partialScript.concat(splitter);
        }
        index++;
    }
    return testCases;
}
