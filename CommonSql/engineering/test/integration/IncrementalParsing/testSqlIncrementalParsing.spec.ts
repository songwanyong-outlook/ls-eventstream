import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { ILanguageServiceConfig, ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";

import { testGrammarRuleNames } from '@engineering/common/SqlFakedConfig';
import { GetMockMetadata } from "@engineering/test/common/MockSqlMetadataProvider";
import { sqlIncrementalParsingTestCases, metadataIntellisenseTestCasesWithIncrementalParsing } from "./sqlIncrementalParsingTestCases";
import { CommonSqlCompletionItem } from "@CommonSqlUtils/CommonSqlCompletionItem";

describe("test SQL IncrementalParsing", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(sqlIncrementalParsingTestCases.length + metadataIntellisenseTestCasesWithIncrementalParsing.length, 0);
    let progressIndex = 0;

    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();
    
    const config: ILanguageServiceConfig = {
        caseSensitive: false,
        grammarRuleNames: testGrammarRuleNames,
    };

    for (const [i, testCase] of sqlIncrementalParsingTestCases.entries()) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();

        for (let j = 0; j < testCase.positions.length; j++) {
            const position = testCase.positions[j];
            const expectedCachedTokenIndex = testCase.expectedCachedTokenIndexes[j];

            const script = testCase.script.slice(0, position);
            const parseReason = LanguageServiceFeature.WordCompletion;
            const request = {
                code: script,
                metadata,
                reason: parseReason,
                parameter: { tableNamespaces: [] },
            } as ILanguageServiceRequest;
            
            CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request);
            const service = CommonSqlLanguageServicePipeline.instance(config).getParserService(LanguageServiceFeature.WordCompletion, request);
            const cachedTokenIndex = (service as any)._incrementalParsingCache._cache.get(parseReason).tokenIndex;
    
            it(`should cache expected token index for test case ${i} at position ${position}, `, () => {
                expect(cachedTokenIndex).toBe(expectedCachedTokenIndex);
            });
        }
        progressIndex++;
        progressBar.update(progressIndex);
    }

    for (const testCase of metadataIntellisenseTestCasesWithIncrementalParsing) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();

        const request = {
            code: testCase.script,
            metadata,
            reason: LanguageServiceFeature.WordCompletion,
            parameter: { tableNamespaces: [] },
            featureFlag: null,
        } as ILanguageServiceRequest;

        // execute twice to use incremental parsing.
        CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request);

        request.code = request.code.concat(" ");
        request.metadata = GetMockMetadata();
        const result = CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request);
        const suggestions = result as CommonSqlCompletionItem[];
        const textSuggestions: string[] = !suggestions ? [] : suggestions.map(item => item.label);

        it(`should include expected suggestions for partial script "${testCase.script}" in incremental parsing scenario`, () => {
            expect(textSuggestions).toEqual(expect.arrayContaining(testCase.expectedTokens));
        });

        progressIndex++;
        progressBar.update(progressIndex);
    }
    progressBar.stop();
});
