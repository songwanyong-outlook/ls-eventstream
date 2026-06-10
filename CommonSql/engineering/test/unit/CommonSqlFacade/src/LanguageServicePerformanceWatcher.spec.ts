
import { LSPerformanceWatcher, MaxPrecedingRequestsCount, MinimumLinesToTriggerReducing } from "@CommonSqlFacade/src/LanguageServicePerformanceWatcher";
import { LanguageServiceFeature } from "@CommonSqlUtils/Utils";
import { benchmarkScripts } from "@engineering/common/SampleScripts";


describe("test language service performance watcher", () => {
    const longScript1 = benchmarkScripts.pop();
    const normalScript = `
    SELECT * FROM tableTest1 WHERE a > 20 HAVING b < 30;
    CREATE USER [xxxw@microsoft.com] FROM EXTERNAL PROVIDER;
    CREATE TABLE #Yellowtemp
    WITH
    (DISTRIBUTION = ROUND_ROBIN
    )
    AS
    (
    SELECT  PickupDate as PickupDateYellow, count([vendorID]) as Yellowrides
    FROM [dbo].[YellowCab]
    group by [PickupDate]
    )
    ;`;
    const longScript2 = longScript1.concat(normalScript);

    it(`test stringHighlyMatch function"`, () => {
        const performanceWatcher = new LSPerformanceWatcher();
        expect((performanceWatcher as any).stringHighlyMatch(longScript1, longScript2)).toBe(true);
    });
    
    it(`test entering script reducing mode"`, () => {
        const performanceWatcher = new LSPerformanceWatcher();
        let reducedScript: string = null;
        for (let i = 0; i < MaxPrecedingRequestsCount; i++) {
            reducedScript = performanceWatcher.reduceScript(longScript1, LanguageServiceFeature.WordCompletion);
            expect(reducedScript === longScript1).toBe(true);
            performanceWatcher.reportTimeout(reducedScript, LanguageServiceFeature.WordCompletion);
        }

        reducedScript = performanceWatcher.reduceScript(longScript1, LanguageServiceFeature.WordCompletion);
        expect(reducedScript.length < longScript1.length && reducedScript.length < 100).toBe(true);
    });

    it(`test script with not many lines cannot enter reducing mode"`, () => {
        const performanceWatcher = new LSPerformanceWatcher();
        let reducedScript: string = null;
        for (let i = 0; i < MaxPrecedingRequestsCount; i++) {
            reducedScript = performanceWatcher.reduceScript(normalScript, LanguageServiceFeature.WordCompletion);
            expect(reducedScript === normalScript).toBe(true);
            performanceWatcher.reportTimeout(reducedScript, LanguageServiceFeature.WordCompletion);
        }

        reducedScript = performanceWatcher.reduceScript(normalScript, LanguageServiceFeature.WordCompletion);
        expect(reducedScript === normalScript).toBe(true);
    });

    it(`test exiting reducing mode"`, () => {
        const performanceWatcher = new LSPerformanceWatcher();
        let reducedScript: string = null;
        for (let i = 0; i < MaxPrecedingRequestsCount; i++) {
            reducedScript = performanceWatcher.reduceScript(longScript1, LanguageServiceFeature.WordCompletion);
            expect(reducedScript === longScript1).toBe(true);
            performanceWatcher.reportTimeout(reducedScript, LanguageServiceFeature.WordCompletion);
        }

        expect((performanceWatcher as any).inScriptReducingMode).toBe(true);
        reducedScript = performanceWatcher.reduceScript(normalScript, LanguageServiceFeature.WordCompletion);
        expect(reducedScript === normalScript).toBe(true);
        expect((performanceWatcher as any).inScriptReducingMode).toBe(false);
    });
});
