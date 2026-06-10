import { CommonSqlCompletionItem } from "../../../CommonSqlUtils/CommonSqlCompletionItem";

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function notDuplicate(item, pos, self): boolean {
    return self.indexOf(item) === pos;
}

export function trimInputForWordCompletion(input: string): string {
    if (!input) {
        return input;
    }
    let trimEnd = input.length - 1;
    while (trimEnd >= 0 && input[trimEnd].match(/[a-zA-Z0-9_#$]/i)) {
        trimEnd--;
    }
    return input.slice(0, trimEnd + 1);
}

export function trimInputForWordCompletionParse(input: string): string {
    if (!input) {
        return input;
    }
    let trimEnd = input.length - 1;
    while (trimEnd >= 0 && input[trimEnd].match(/[a-zA-Z0-9_#$.]/i)) {
        trimEnd--;
    }
    return input.slice(0, trimEnd + 1);
}

const parameterPrefix = "@";

export function filterAndFormatParameterSuggestions(script: string, completionItems: CommonSqlCompletionItem[]): CommonSqlCompletionItem[] {
    if (!script || !script.endsWith(parameterPrefix)) {
        return completionItems;
    }

    if (script.endsWith(parameterPrefix.repeat(2))) {
        completionItems = completionItems.filter(item => item.label.startsWith(parameterPrefix.repeat(2)));
        completionItems.forEach(item => {
            item.insertText = item.insertText.startsWith(parameterPrefix.repeat(2)) ? item.insertText.substr(2) : item.insertText; 
        });
    } else if (script.endsWith(parameterPrefix)) {
        completionItems = completionItems.filter(item => item.label.startsWith(parameterPrefix));
        completionItems.forEach(item => {
            item.insertText = item.insertText.startsWith(parameterPrefix) ? item.insertText.substr(1) : item.insertText; 
        });
    }
    return completionItems;
}
