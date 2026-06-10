import { CommonSqlLanguageServicePipeline } from '@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline';
import { IErrorMarkItem, ILanguageServiceRequest, LanguageServiceFeature, Severity } from '@CommonSqlUtils/Utils';
import { GetMockMetadata } from '@engineering/test/common/MockSqlMetadataProvider';
import {
    ScriptsWithoutSemanticError,
    ScriptsWithoutSyntaxError,
    ScriptsWithSemanticError,
    ScriptsWithSyntaxError,
} from './sqlErrorDetectionTestCases';

describe("test scripts without syntax errors", () => {
    for (let i = 0; i < ScriptsWithoutSyntaxError.length; i++) {
        it(`should detect no syntax errors in script ${i}`, async () => {
            const request = {
                code: ScriptsWithoutSyntaxError[i],
                reason: LanguageServiceFeature.ErrorDetection,
                featureFlag: null,
            } as ILanguageServiceRequest;

            const result = CommonSqlLanguageServicePipeline
                .instance({ caseSensitive: false })
                .handleServiceRequest(request, true) as IErrorMarkItem[];

            expect(result.length).toBe(0);
        });
    }
});

describe("test scripts with syntax errors", () => {
    for (let i = 0; i < ScriptsWithSyntaxError.length; i++) {
        it(`should detect syntax errors in script ${i}`, async () => {
            const request = {
                code: ScriptsWithSyntaxError[i],
                reason: LanguageServiceFeature.ErrorDetection,
                featureFlag: null,
            } as ILanguageServiceRequest;

            const result = CommonSqlLanguageServicePipeline
                .instance({ caseSensitive: false })
                .handleServiceRequest(request, true) as IErrorMarkItem[];

            expect(result.length).not.toBe(0);
        });
    }
});

describe("test scripts without semantic errors", () => {
    const metadata = GetMockMetadata();

    for (let i = 0; i < ScriptsWithoutSemanticError.length; i++) {
        const request = {
            code: ScriptsWithoutSemanticError[i],
            metadata: metadata,
            reason: LanguageServiceFeature.ErrorDetection,
            featureFlag: null,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline
            .instance({ caseSensitive: false })
            .handleServiceRequest(request, true) as IErrorMarkItem[];

        it(`should detect no semantic errors in script ${i}`, () => {
            expect(result.length).toBe(0);
        });
    }
});

describe("test scripts with semantic errors", () => {
    const metadata = GetMockMetadata();

    for (let i = 0; i < ScriptsWithSemanticError.length; i++) {
        const request = {
            code: ScriptsWithSemanticError[i].script,
            metadata: metadata,
            reason: LanguageServiceFeature.ErrorDetection,
            featureFlag: null,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline
            .instance({ caseSensitive: false })
            .handleServiceRequest(request, true) as IErrorMarkItem[];

        it(`should detect semantic errors in script ${i}`, () => {
            expect(result[0]).toEqual(ScriptsWithSemanticError[i].error);
        });
    }
});
