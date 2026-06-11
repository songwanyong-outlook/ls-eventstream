import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";
import { GetMockMetadata } from "@engineering/test/common/MockSqlMetadataProvider";
import { sqlOutputSchemaTestCases } from './sqlOutputSchemaTestCases';

describe("test SQL Output Schema", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(sqlOutputSchemaTestCases.length);

    CSAntlrParseService.clearATNCache();
    const metadata = GetMockMetadata();
    for (let i = 0, progressIndex = 0; i < sqlOutputSchemaTestCases.length; i++, progressIndex++) {
        const script = sqlOutputSchemaTestCases[i].script;

        const request = {
            code: script,
            reason: LanguageServiceFeature.Custom, 
            metadata,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline
            .instance({ caseSensitive: false })
            .handleServiceRequest(request, true) as string[];

        it(`should give correct output schema in script ${i} "${script}"`, () => {
            expect(result).toEqual(sqlOutputSchemaTestCases[i].schema);
        });

        progressBar.update(progressIndex);
    }

    progressBar.stop();
});
