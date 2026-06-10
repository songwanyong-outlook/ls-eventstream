import * as monaco from "monaco-editor";
import { getHighlightRule, ISyntaxHighlight } from "@CommonSqlFacade/src/SqlUtils/MonarchRuleGenerator";
import { scriptsWithoutSyntaxError } from '@engineering/common/SampleScripts';
import { sqlComputeMonarchRule } from "@engineering/test/common/SqlSampleHightlightConfig"

test("test sql syntax highlight", () => {
    const syntaxHighlightRule = getHighlightRule(syntaxHighlight);
    if (!syntaxHighlightRule.tokenPostfix) {
        syntaxHighlightRule.tokenPostfix = "." + "sqlCompute".toLocaleLowerCase();
    }

    monaco.languages.register({ id: "sqlPool" });
    monaco.languages.register({ id: "sqlTest" });
    monaco.languages.setMonarchTokensProvider("sqlPool", sqlComputeMonarchRule)
    monaco.languages.setMonarchTokensProvider("sqlTest", syntaxHighlightRule)

    scriptsWithoutSyntaxError.forEach((script: string) => {
        const tokens = monaco.editor.tokenize(script, "sqlTest");
        const expectTokens = monaco.editor.tokenize(script, "sqlPool");
        expect(tokens.every((v1, i1) => v1.every((v2, i2) => v2.offset === expectTokens[i1][i2].offset && v2.type === expectTokens[i1][i2].type))).toBe(true);
    });
});

const customizedMonarchRule = sqlComputeMonarchRule as any;

const syntaxHighlight: ISyntaxHighlight = {
    keywords: customizedMonarchRule.ReservedKeywords.concat(customizedMonarchRule.ODBCReservedKeywords).concat(customizedMonarchRule.FutureKeywords),
    operators: customizedMonarchRule.operators,
    builtinFunctions: customizedMonarchRule.builtinFunctions,
    builtinVariables: customizedMonarchRule.builtinVariables,
    commentTokenizer: {
        lineCommentsTokenizer: { start: "--" },
        blockCommentsTokenizer: { start: "/*", end: "*/" }
    },
    stringTokenizer: {
        singleLineStringTokenizer: { start: "'", end: "'" },
        multiLineStringTokenizer: { start: "N'", end: "'" }
    }
};
