import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";

import { builtinFunctions } from "@engineering/test/common/SqlFakedBuiltinFunctions";
import { testGrammarRuleNames } from '@engineering/common/SqlFakedConfig';
import { GetMockMetadata } from "@engineering/test/common/MockSqlMetadataProvider";
import { sqlQuickInfoTestCases } from './sqlQuickInfoTestCases';


describe("test SQL QuickInfo", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(sqlQuickInfoTestCases.length);
    let progressIndex = 0;
    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();

    for (let i = 0; i < sqlQuickInfoTestCases.length; i++) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();
        const script = sqlQuickInfoTestCases[i].script;
        const hoveringWord = sqlQuickInfoTestCases[i].hoveringWord;
        const cursorOffset = sqlQuickInfoTestCases[i].cursorOffset;
        const range = sqlQuickInfoTestCases[i].range;
        const expectedQuickInfo = sqlQuickInfoTestCases[i].expectedQuickInfo;
        const request = {
            code: script,
            reason: LanguageServiceFeature.QuickInfo, 
            parameter: { hoveringWord, cursorOffset, range },
            metadata,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline.instance({
            caseSensitive: false,
            grammarRuleNames: testGrammarRuleNames,
            builtinFunctions,
        }).handleServiceRequest(request, true);
        const quickInfo = result as string;

        it(`should give a correct quick info for "${hoveringWord}" in script ${i} "${script}"`, () => {
            expect(quickInfo).toEqual(expectedQuickInfo);
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }
    progressBar.stop();
});
