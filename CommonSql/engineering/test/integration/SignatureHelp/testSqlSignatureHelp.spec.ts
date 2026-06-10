import * as cliProgress from "cli-progress";

import { CSAntlrParseService } from "@CommonSqlCore/src/language-service/Parser/CSAntlrParseService";
import { CommonSqlLanguageServicePipeline } from "@CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline";
import { ILanguageServiceRequest, LanguageServiceFeature } from "@CommonSqlUtils/Utils";

import { signatureHelpTestCases } from './sqlSignatureHelpTestCases';

describe("test SQL SignatureHelp", () => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(signatureHelpTestCases.length);
    let progressIndex = 0;
    // Must be called. Since in client mode (UT or vscode extension), the static ATN cache is shared across differenct languages.
    // So their may be confusion because of the cache. Production web environment will not have this problem since each language has
    // its own web worker and static atn cache is not shared.
    CSAntlrParseService.clearATNCache();

    for (let i = 0; i < signatureHelpTestCases.length; i++) {
        const testCase = signatureHelpTestCases[i];
        const script = signatureHelpTestCases[i].partialScript;
        const request = {
            code: script,
            reason: LanguageServiceFeature.SignatureHelp,
        } as ILanguageServiceRequest;

        const result = CommonSqlLanguageServicePipeline.instance({
            caseSensitive: false,
        }).handleServiceRequest(request, true);
        const signatureHelp = result as string;

        it(`should give a correct signature help for script ${i} "${script}"`, () => {
            expect(signatureHelp).toEqual(testCase.expected);
        });
        progressIndex++;
        progressBar.update(progressIndex);
    }
    progressBar.stop();
});
