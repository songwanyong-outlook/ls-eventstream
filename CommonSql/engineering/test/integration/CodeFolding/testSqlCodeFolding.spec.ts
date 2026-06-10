import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { IFoldingRange, ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";

import { codeFoldingTestCases } from "./sqlCodeFoldingTestCases";

describe("test SQL CodeFolding", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(codeFoldingTestCases.length, 0);
    let progressIndex = 0;

    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();

    for (let i = 0; i < codeFoldingTestCases.length; i++) {
        const testCase = codeFoldingTestCases[i];
        const script = codeFoldingTestCases[i].script;
        const request = {
            code: script,
            reason: LanguageServiceFeature.CodeFolding,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline.instance({ caseSensitive: false }).handleServiceRequest(request, true) as IFoldingRange[];

        it(`should fold script ${i} "${script}" correctly`, () => {
            // Seems that result string returned from pipeline has a different form of whitespace which needs replacement
            expect(result).toEqual(testCase.expected);
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }
    progressBar.stop();
});
