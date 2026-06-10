export enum CommonSqlCompletionItemType {
    Column,
    Table,
    View,
    Schema,
    Database,
    TableFunction,
    Function,
    StoredProcedure,
    Type,
    User,
    Index,
    Keyword,
    Snippet,
    Other,
}

export const intellisenseFakedPrefix = "IntellisenseFaked";

export class CommonSqlCompletionItem {
    public label: string;
    public insertText: string;
    public sortText: string;
    public type: any;
    public detail: string;
    public documentation: string;
    public isRecommended = false;
    private readonly keywordRecommendationPriority = "AB";
    private readonly metadataRecommendationPriority = "AA";
    private readonly prioritySuffix = "-";

    constructor(text: string, detail: string, documentationMarkdownString: string, type: CommonSqlCompletionItemType) {
        this.label = text;
        this.insertText = text;
        this.type = type;
        this.sortText = this.getPriority(type).concat(this.prioritySuffix, this.label);
        this.detail = detail ? (detail.includes(intellisenseFakedPrefix) ? text : detail) : CommonSqlCompletionItemType[type];
        this.documentation = documentationMarkdownString;
    }

    public setRecommend() {
        this.isRecommended = true;
        const recommendationPriority = this.type === CommonSqlCompletionItemType.Keyword ? this.keywordRecommendationPriority : this.metadataRecommendationPriority;
        this.sortText = recommendationPriority.concat(this.prioritySuffix, this.label);
    }

    private getPriority(type: CommonSqlCompletionItemType) {
        const prefix = 'Z'.repeat(Math.floor(type / 25));
        const index = type % 25;
        const priority = String.fromCharCode('B'.charCodeAt(0) + index);
        return !prefix ? priority : prefix + priority;
    }

    public static completionItemNotDuplicate(item: CommonSqlCompletionItem, index: number, array: CommonSqlCompletionItem[]): boolean {
        return !!item && !! item.label && index === array.findIndex((t) => t.insertText === item.insertText && t.type === item.type);
    }
}
