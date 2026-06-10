import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CSScriptFormatter } from "@CommonSqlCore/src/language-service/Parser/CSScriptFormatter";
import { SqlParserLexer } from "@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserLexer";
import { SqlParserParser } from "@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserParser";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { CommonSqlCompletionItem } from "@CommonSqlUtils/CommonSqlCompletionItem";
import { ILanguageServiceConfig, ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";

import { scriptsWithoutSyntaxError } from "@engineering/common/SampleScripts";
import { testGrammarRuleNames } from '@engineering/common/SqlFakedConfig';
import { GetMockMetadata } from "@engineering/test/common/MockSqlMetadataProvider";
import { builtinFunctions } from "@engineering/test/common/SqlFakedBuiltinFunctions";
import { generateSqlWordCompletionTestCase, ISqlWordCompletionTestCase } from "./sqlWordCompletionTestCaseGenerator";
import { intellicodeTestCases, noSchemaSupportTestCases, sqlPoolWordCompletionTestCases } from "./sqlPoolWordCompletionTestCases";

describe("test SQL WordCompletion ", () => {
    const scriptFormatter = CSScriptFormatter.GetInstance(SqlParserLexer.VOCABULARY, SqlParserParser, false, null, "non_reserved_keywords");
    const keywordCompletionTestCases: ISqlWordCompletionTestCase[] = generateSqlWordCompletionTestCase(scriptsWithoutSyntaxError, scriptFormatter);

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(keywordCompletionTestCases.length + sqlPoolWordCompletionTestCases.length, 0);
    let progressIndex = 0;

    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();
    const config: ILanguageServiceConfig = ({
        caseSensitive: false,
        grammarRuleNames: testGrammarRuleNames,
        builtinFunctions,
    });

    for (let i = 0; i < sqlPoolWordCompletionTestCases.length; i++) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();
        const script = sqlPoolWordCompletionTestCases[i].partialScript;
    
        const request = {
            code: script,
            metadata,
            reason: LanguageServiceFeature.WordCompletion, 
            parameter: { tableNamespaces: [] },
            featureFlag: null,
        } as ILanguageServiceRequest;
            
        const result = CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request, true);
        const suggestions = result as CommonSqlCompletionItem[];
        const textSuggestions: string[] = !suggestions ? [] : suggestions.map(item => item.label);
    
        it(`should include expected suggestions for partial script ${i} "${script}"`, () => {
            if (!!sqlPoolWordCompletionTestCases[i].expectedSuggestions && sqlPoolWordCompletionTestCases[i].expectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.arrayContaining(sqlPoolWordCompletionTestCases[i].expectedSuggestions));
            }
        });
    
        it(`should not include unexpected suggestions for partial script ${i} "${script}"`, () => {
            if (!!sqlPoolWordCompletionTestCases[i].unexpectedSuggestions && sqlPoolWordCompletionTestCases[i].unexpectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.not.arrayContaining(sqlPoolWordCompletionTestCases[i].unexpectedSuggestions));
            }
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }
    
    for (const keywordCompletionTestCase of keywordCompletionTestCases) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();
        const script = keywordCompletionTestCase.partialScript;

        const request = {
            code: script,
            metadata,
            reason: LanguageServiceFeature.WordCompletion,
            parameter: { tableNamespaces: [] },
            featureFlag: null,
        } as ILanguageServiceRequest;
        
        const result = CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request, true);
        const suggestions = result as CommonSqlCompletionItem[];
        const textSuggestions: string[] = !suggestions ? [] : suggestions.map(item => item.label);

        it(`should include expected suggestions for partial script "${script}"`, () => {
            if (!!keywordCompletionTestCase.expectedSuggestions && keywordCompletionTestCase.expectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.arrayContaining(keywordCompletionTestCase.expectedSuggestions));
            }
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }

    for (let i = 0; i < intellicodeTestCases.length; i++) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata();
        const script = intellicodeTestCases[i].partialScript;
    
        const request = {
            code: script,
            metadata,
            reason: LanguageServiceFeature.WordCompletion, 
            parameter: { tableNamespaces: [] },
            featureFlag: null,
        } as ILanguageServiceRequest;
            
        const result = CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request, true);
        const suggestions = result as CommonSqlCompletionItem[];
        const textSuggestions: string[] = !suggestions ? [] : suggestions.map(item => item.label);
    
        it(`should recommend expected suggestions for partial script ${i} "${script}"`, () => {
            if (!!intellicodeTestCases[i].expectedSuggestions && intellicodeTestCases[i].expectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.arrayContaining(intellicodeTestCases[i].expectedSuggestions));
                const expectedSuggestions = suggestions.filter(item => intellicodeTestCases[i].expectedSuggestions.includes(item.label));
                let recommended = true;
                expectedSuggestions.forEach(item => {
                    recommended = recommended && item.isRecommended;
                });
                expect(recommended).toBe(true);
            }
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }

    for (let i = 0; i < noSchemaSupportTestCases.length; i++) {
        // call the function of getMockMetadata for each case since we may add new created objects into metadata. We must use initial unchanged metadata for each test case.
        const metadata = GetMockMetadata(false);
        const script = noSchemaSupportTestCases[i].partialScript;
    
        const request = {
            code: script,
            metadata,
            reason: LanguageServiceFeature.WordCompletion, 
            parameter: { tableNamespaces: [] },
            featureFlag: null,
            grammarRuleNames: testGrammarRuleNames,
        } as ILanguageServiceRequest;
            
        const result = CommonSqlLanguageServicePipeline.instance(config).handleServiceRequest(request, true);
        const suggestions = result as CommonSqlCompletionItem[];
        const textSuggestions: string[] = !suggestions ? [] : suggestions.map(item => item.label);
    
        it(`should include expected suggestions for partial script ${i} "${script}"`, () => {
            if (!!noSchemaSupportTestCases[i].expectedSuggestions && noSchemaSupportTestCases[i].expectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.arrayContaining(noSchemaSupportTestCases[i].expectedSuggestions));
            }
        });
    
        it(`should not include unexpected suggestions for partial script ${i} "${script}"`, () => {
            if (!!noSchemaSupportTestCases[i].unexpectedSuggestions && noSchemaSupportTestCases[i].unexpectedSuggestions.length > 0) {
                expect(textSuggestions).toEqual(expect.not.arrayContaining(noSchemaSupportTestCases[i].unexpectedSuggestions));
            }
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }
    progressBar.stop();
});
