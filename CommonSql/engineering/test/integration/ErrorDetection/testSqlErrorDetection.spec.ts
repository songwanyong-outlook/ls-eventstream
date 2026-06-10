import { CommonSqlLanguageServicePipeline } from '@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline';
import { IErrorMarkItem, ILanguageServiceRequest, LanguageServiceFeature } from '@CommonSqlUtils/Utils';
import { brokenScripts, scriptsWithoutSyntaxError } from "@engineering/common/SampleScripts";
import { testGrammarRuleNames } from '@engineering/common/SqlFakedConfig';


describe("test scripts without syntax errors", () => {
    for (let i = 0; i < scriptsWithoutSyntaxError.length; i++) {
        it(`should not detect syntax errors in script ${i}`, async () => {
            const testGrammarRuleNamesSupportAll = { ...testGrammarRuleNames, unsupportedStatements: undefined };
            const request = {
                code: scriptsWithoutSyntaxError[i],
                reason: LanguageServiceFeature.ErrorDetection,
                featureFlag: null,
            } as ILanguageServiceRequest;

            const result = CommonSqlLanguageServicePipeline.instance({
                caseSensitive: false,
                grammarRuleNames: testGrammarRuleNamesSupportAll,
            }).handleServiceRequest(request, true);
            const syntaxErrorMarkers = result as IErrorMarkItem[];
            expect(syntaxErrorMarkers.length).toBe(0);
        });
    }
});

describe("test scripts with syntax errors", () => {
    for (let i = 0; i < brokenScripts.length; i++) {
        it(`should detect syntax errors in script ${i}`, async () => {
            const request = {
                code: brokenScripts[i],
                reason: LanguageServiceFeature.ErrorDetection,
                featureFlag: null,
            } as ILanguageServiceRequest;

            const result = CommonSqlLanguageServicePipeline.instance({
                caseSensitive: false,
                grammarRuleNames: testGrammarRuleNames,
            }).handleServiceRequest(request, true);
            const syntaxErrorMarkers = result as IErrorMarkItem[];
            expect(syntaxErrorMarkers.length).not.toBe(0);
        });
    }
});

describe("test scripts with unsupported statements", () => {
    it(`should detect unsupported statement error in script`, async () => {
        const request = {
            code: `WITH A AS (SELECT * FROM B)
SELECT * FROM A;
`,
            reason: LanguageServiceFeature.ErrorDetection,
            featureFlag: null,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline.instance({
            caseSensitive: false,
            grammarRuleNames: testGrammarRuleNames,
        }).handleServiceRequest(request, true);
        const syntaxErrorMarkers = result as IErrorMarkItem[];
        expect(syntaxErrorMarkers.length).not.toBe(0);
        expect(syntaxErrorMarkers[0].message).toBe('With is not supported');
    });
});
