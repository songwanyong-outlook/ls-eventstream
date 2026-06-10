import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { ICodeActionInfo, ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";

import { builtinFunctions } from "@engineering/test/common/SqlFakedBuiltinFunctions";
import { testGrammarRuleNames } from '@engineering/common/SqlFakedConfig';
import { GetMockMetadata } from "@engineering/test/common/MockSqlMetadataProvider";
import { sqlCodeActionTestCases } from "./sqlCodeActionTestCases";

describe("test SQL CodeAction", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(sqlCodeActionTestCases.length);
    let progressIndex = 0;
    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();

    for (let i = 0; i < sqlCodeActionTestCases.length; i++) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();
        const script = sqlCodeActionTestCases[i].script;
        const range = sqlCodeActionTestCases[i].range;
        const expectedResult = sqlCodeActionTestCases[i].expectedResult;
        const request = {
            code: script,
            reason: LanguageServiceFeature.CodeAction, 
            parameter: { range },
            metadata,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline.instance({
            caseSensitive: false,
            grammarRuleNames: testGrammarRuleNames,
            builtinFunctions,
        }).handleServiceRequest(request, true) as ICodeActionInfo[];

        const resultTitles = result.map(r => r.title);

        it(`should give a correct code action result for script ${i} "${script}"`, () => {
            expect(resultTitles).toEqual(expectedResult);
        });
        
        progressIndex++;
        progressBar.update(progressIndex);
    }
    progressBar.stop();
});
