import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";
import { testGrammarRuleNames } from '@engineering/common/SqlFakedConfig';
import { codeFormattingTestCases } from "./codeFormattingTestCases";

describe("test CodeFormatting", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(codeFormattingTestCases.length, 0);
    let progressIndex = 0;

    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();

    for (let i = 0; i < codeFormattingTestCases.length; i++) {
        const testCase = codeFormattingTestCases[i];
        const script = codeFormattingTestCases[i].script;
        const request = {
            code: script,
            reason: LanguageServiceFeature.AutoFormat,
            parameter: { tabSize: 4, insertSpaces: true },
        } as ILanguageServiceRequest;

        const result: string = CommonSqlLanguageServicePipeline
            .instance({
                caseSensitive: false,
                grammarRuleNames: testGrammarRuleNames,
            })
            .handleServiceRequest(request, true) as string;

        it(`should format script ${i} "${script}" correctly`, () => {
            // Seems that result string returned from pipeline has a different form of whitespace which needs replacement
            let expected = testCase.expected.replace(/\n/g, "\r\n");
            expect(result).toEqual(expected);
            // expect(result.replace(/\s+/g, " ")).toEqual(expected);
        });

        progressIndex++;
        progressBar.update(progressIndex);
    }

    progressBar.stop();
});