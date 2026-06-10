export function isInId(partialScript: string): boolean {
    const singleQuote: string = "\'";
    const doubleQuote: string = "\"";
    const squareQuoteStart: string = "[";
    const squareQuoteEnd: string = "]";
    let previousSlash: boolean = false;
    let singleQuoteOpen: boolean = false;
    let doubleQuoteOpen: boolean = false;
    let squareQuoteOpen: boolean = false;

    const notQuote = (ch: string): boolean => {return ch !== singleQuote && ch !== doubleQuote && ch !== squareQuoteStart && ch !== squareQuoteEnd; };
    for (let ch of partialScript) {
        if (notQuote(ch) || previousSlash) {
            previousSlash = ch === "\\";
            continue;
        } else if (ch === singleQuote) {
            if (!doubleQuoteOpen) {
                singleQuoteOpen = !singleQuoteOpen;
            }
        } else if (ch === doubleQuote) {
            if (!singleQuoteOpen) {
                doubleQuoteOpen = !doubleQuoteOpen;
            }
        } else if (ch === squareQuoteStart) {
            if (!singleQuoteOpen && !doubleQuoteOpen) {
                squareQuoteOpen = true;
            }
        } else if (ch === squareQuoteEnd) {
            if (!singleQuoteOpen && !doubleQuoteOpen) {
                squareQuoteOpen = false;
            }
        }
        previousSlash = ch === "\\";
    }

    return singleQuoteOpen || doubleQuoteOpen || squareQuoteOpen;
}
