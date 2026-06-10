import * as cliProgress from "cli-progress";

import { CommonSqlLanguageServicePipeline } from '../../CommonSqlCore/src/pipeline/CommonSqlLanguageServicePipeline';
import { CSAntlrParseService } from '../../CommonSqlCore/src/language-service/Parser/CSAntlrParseService';
import { ILanguageServiceRequest } from '../../CommonSqlUtils/Utils';
import { benchmarkScripts, brokenScripts } from '../common/SampleScripts';
import { testGrammarRuleNames } from '../common/SqlFakedConfig';
import { drawBarChartForLatency } from './drawer/drawer';

const instance = CommonSqlLanguageServicePipeline.instance;
const feature = process.argv[2];
benchmarkScripts.sort((a, b) => a.length - b.length);
brokenScripts.sort((a, b) => a.length - b.length);

if (feature === 'wordCompletion' || feature === 'all') {
    benchmark(benchmarkScripts, 'Word Completion', (request: ILanguageServiceRequest) => instance.getSuggestions(request));
}

if (feature === 'errorDetectionBroken' || feature === 'all') {
    benchmark(brokenScripts, 'Error Detection (broken scripts)', (request: ILanguageServiceRequest) => instance.getErrors(request), false);
}

if (feature === 'errorDetectionNormal' || feature === 'all') {
    benchmark(benchmarkScripts, 'Error Detection (normal scripts)', (request: ILanguageServiceRequest) => instance.getErrors(request));
}

function benchmark(scripts: string[], title: string, parseFc: any, split: boolean = true) {
    const results = [];
    let maxTime = 0
    let slowest = 0;
    const repeat = 3;
    const progressBar = new cliProgress.SingleBar(
        { format: `${title}:\t{bar} {percentage}% | ETA: {eta}s | {value}/{total}` },
        cliProgress.Presets.shades_classic
    );
    const totalLength = scripts.reduce((len, script) => len + script.length, 0);
    progressBar.start(totalLength, 0);
    let progress = 0;
    const getAvgTime = (script: string) => {
        let ellapsed = 0;
        for (let i = 0; i < repeat; i++) {
            const start = Date.now();
            CSAntlrParseService.clearATNCache();
            instance.getSuggestions({
                code: script,
                grammarRuleNames: testGrammarRuleNames
            } as ILanguageServiceRequest)
            const end = Date.now();
            ellapsed += end - start;
        }
        return ellapsed / repeat;
    };

    if (split) {
        scripts.forEach((script, i) => {
            const partialScripts = script.split(/\s+/);
            let partialScript = '';
            let totalEllapsed = 0;
            partialScripts.forEach((s) => {
                partialScript += s + ' ';
                totalEllapsed += getAvgTime(partialScript);
                progress += s.length + 1;
                progressBar.update(progress);
            })
            totalEllapsed /= partialScripts.length;
            if (totalEllapsed > maxTime) {
                maxTime = totalEllapsed;
                slowest = i;
            }
            results.push(totalEllapsed);
            progress += script.length - partialScript.length + 1;
            progressBar.update(progress);
        });
    } else {
        scripts.forEach((script, i) => {
            let totalEllapsed = getAvgTime(script);
            if (totalEllapsed > maxTime) {
                maxTime = totalEllapsed;
                slowest = i;
            }
            results.push(totalEllapsed);
            progress += script.length;
            progressBar.update(progress);
        });
    }
    progressBar.stop();
    drawBarChartForLatency(results, title, scripts[slowest], slowest);
}
