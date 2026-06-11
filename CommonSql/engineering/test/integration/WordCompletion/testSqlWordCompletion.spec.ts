import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CSScriptFormatter } from "@CommonSqlCore/src/language-service/Parser/CSScriptFormatter";
import { SqlParserLexer } from "@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserLexer";
import { SqlParserParser } from "@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserParser";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { CommonSqlCompletionItem } from "@CommonSqlUtils/CommonSqlCompletionItem";
import { ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";
import { GetMockMetadata } from "@engineering/test/common/MockSqlMetadataProvider";
import { sqlWordCompletionTestCases } from "./sqlWordCompletionTestCases";

describe("test TridentStreaming WordCompletion ", () => {
    const scriptFormatter = CSScriptFormatter.GetInstance(SqlParserLexer.VOCABULARY, SqlParserParser, false, null, "non_reserved_keywords");

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(sqlWordCompletionTestCases.length, 0);
    let progressIndex = 0;

    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();

    for (let i = 0; i < sqlWordCompletionTestCases.length; i++) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();
        const script = sqlWordCompletionTestCases[i].partialScript;
    
        const request = {
            code: script,
            metadata,
            reason: LanguageServiceFeature.WordCompletion, 
        } as ILanguageServiceRequest;
            
        const suggestions = CommonSqlLanguageServicePipeline
            .instance({ caseSensitive: false, })
            .handleServiceRequest(request, true) as CommonSqlCompletionItem[];
        const textSuggestions: string[] = !suggestions ? [] : suggestions.map(item => item.label);
    
        it(`should include expected suggestions for partial script ${i} "${script}"`, () => {
            if (!!sqlWordCompletionTestCases[i].expectedSuggestions && sqlWordCompletionTestCases[i].expectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.arrayContaining(sqlWordCompletionTestCases[i].expectedSuggestions));
            }
        });
    
        it(`should not include unexpected suggestions for partial script ${i} "${script}"`, () => {
            if (!!sqlWordCompletionTestCases[i].unexpectedSuggestions && sqlWordCompletionTestCases[i].unexpectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.not.arrayContaining(sqlWordCompletionTestCases[i].unexpectedSuggestions));
            }
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }

    progressBar.stop();
});
