
import { CommonSqlCompletionItem, CommonSqlCompletionItemType } from "@CommonSqlUtils/CommonSqlCompletionItem";

describe("test Completion Item", () => {
    const testStr = "test";
    const testItem = new CommonSqlCompletionItem(testStr, testStr, testStr, CommonSqlCompletionItemType.StoredProcedure) as any;

    const getPriority = (item: CommonSqlCompletionItem): string => {
        return item.sortText.split((item as any).prioritySuffix).shift();
    };

    it(`expect Store Procedure priority to be I: "`, () => {
        const priority = getPriority(testItem);
        expect(priority).toEqual("I");
    });

    it(`expect recommended Store Procedure priority to be AA: "`, () => {
        testItem.setRecommend();
        const priority = getPriority(testItem);
        expect(priority).toEqual(testItem.metadataRecommendationPriority);
    });

    it(`expect recommended keyword priority to be AB: "`, () => {
        testItem.type = CommonSqlCompletionItemType.Keyword;
        testItem.setRecommend();
        const priority = getPriority(testItem);
        expect(priority).toEqual(testItem.keywordRecommendationPriority);
    });

    it(`test GetPriority Function in CommonSqlCompletionItem "`, () => {
        expect(testItem.getPriority(49)).toEqual("ZZ");
        expect(testItem.getPriority(50)).toEqual("ZZB");
        expect(testItem.getPriority(49) + testItem.prioritySuffix + testItem.label < testItem.getPriority(50) + testItem.prioritySuffix + testItem.label).toBe(true);
    });
});
