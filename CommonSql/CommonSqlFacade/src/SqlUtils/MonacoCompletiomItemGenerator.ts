import { IMarkdownString, languages } from "monaco-editor";
import { CommonSqlCompletionItem, CommonSqlCompletionItemType } from "../../../CommonSqlUtils/CommonSqlCompletionItem";
import { completionItemSelectionCommandId } from "./ServiceProviderUtils";

export const mapToMonacoCompletionItemList = (items: CommonSqlCompletionItem[]): languages.CompletionList => {
    if (!items) {
        return { suggestions: [] } as languages.CompletionList;
    }
    
    items = items.filter(item => !!item && !!item.label && !!item.insertText).filter(CommonSqlCompletionItem.completionItemNotDuplicate);
    const completionItems = items.map(item => mapToMonacoCompletionItem(item)).filter(item => !!item && !!item.label && !!item.insertText);

    return { suggestions: completionItems } as languages.CompletionList;
};

export const mapToMonacoCompletionItem = (item: CommonSqlCompletionItem): languages.CompletionItem => {
    if (!item || !item.label || !item.insertText) {
        return null;
    }

    let _type: languages.CompletionItemKind = null;
    switch (item.type) {
        case CommonSqlCompletionItemType.Schema:
        case CommonSqlCompletionItemType.Database:
            _type = languages.CompletionItemKind.Module;
            break;
        case CommonSqlCompletionItemType.Table:
            _type = languages.CompletionItemKind.Class;
            break;
        case CommonSqlCompletionItemType.View:
            _type = languages.CompletionItemKind.Struct;
            break;
        case CommonSqlCompletionItemType.Keyword:
            _type = languages.CompletionItemKind.Keyword;
            break;
        case CommonSqlCompletionItemType.TableFunction:
            _type = languages.CompletionItemKind.Method;
            break;
        case CommonSqlCompletionItemType.Function:
            _type = languages.CompletionItemKind.Function;
            break;
        case CommonSqlCompletionItemType.StoredProcedure:
            _type = languages.CompletionItemKind.Event;
            break;
        case CommonSqlCompletionItemType.Column:
            _type = languages.CompletionItemKind.Field;
            break;
        case CommonSqlCompletionItemType.User:
            _type = languages.CompletionItemKind.User;
            break;
        case CommonSqlCompletionItemType.Type:
            _type = languages.CompletionItemKind.TypeParameter;
            break;
        case CommonSqlCompletionItemType.Index:
            _type = languages.CompletionItemKind.Constant;
            break;
        case CommonSqlCompletionItemType.Snippet:
            _type = languages.CompletionItemKind.Snippet;
            break;
        default:
            _type = languages.CompletionItemKind.Value;
            break;
    }

    return {
        label: item.isRecommended ? String.fromCharCode(9733).concat(" ", item.label) : item.label,
        kind: _type,
        sortText: item.sortText,
        insertText: item.insertText,
        detail: item.detail,
        filterText: item.label.replace(/'|"|\[|\]|\s/g, ""),
        range: null,
        documentation: !item.documentation ? item.detail : { value: item.documentation } as IMarkdownString,
        command: { id: completionItemSelectionCommandId, title: completionItemSelectionCommandId, arguments: [item.label] } as languages.Command,
    } as languages.CompletionItem;
};

export const loadingCompletionItem = {
    label: 'loading...',
    kind: languages.CompletionItemKind.Module,
    sortText: '',
    insertText: '',
    detail: '',
    filterText: '',
} as languages.CompletionItem;
