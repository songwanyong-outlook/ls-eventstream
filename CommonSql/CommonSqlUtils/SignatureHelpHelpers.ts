export interface IPartialFunctionCallParseResult {
    funcName: string;
    paramIndex: number;
    modifiedScript: string;
    namedParameters: string[];
    lastParam: string | undefined;
}

export function GetParamList(functionSignature: string): string[] {
    const openIndex = functionSignature.indexOf("(");
    const closeIndex = functionSignature.lastIndexOf(")");

    if (openIndex < 0 || closeIndex < 0 || closeIndex < openIndex) {
        return [];
    }

    // get the parameter string, without the surrounded "(" and ")""
    const paramStr: string = functionSignature.substring(openIndex + 1, closeIndex);
    if (!paramStr) {
        return [];
    }

    return splitBy(paramStr, ",").map(item => item.trim());
}

export function ParsePartialFunctionCall(script: string, checkIsFunctionDef = true, namedParamSupported = false): IPartialFunctionCallParseResult {
    const scriptLines: string[] = script.split("\n");
    const lastLineScript = scriptLines.pop();
    const modifiedLastLineScript = removeBracePair(lastLineScript, "(", ")");
    if (!modifiedLastLineScript) {
        return null;
    }

    const posLeft = modifiedLastLineScript.lastIndexOf("(");
    if (posLeft <= 0) {
        return null;
    }

    // function name is the last word before '('
    const textBefore = modifiedLastLineScript.substring(0, posLeft);
    const regexLastWord = /\w+(\.\w+)*$/g;
    const words = textBefore.match(regexLastWord);
    if (!words || words.length === 0) {
        return null;
    }

    const funcWords = words[words.length - 1].split(".");
    const funcName = funcWords[funcWords.length - 1];

    // text after the last '('
    const textAfter = modifiedLastLineScript.substring(posLeft + 1);

    // now it's time to determine the order of current parameter
    const parameters = splitBy(textAfter, ",");
    const paramIndex = parameters.length - 1;

    const namedParameters = [];
    if (namedParamSupported && parameters.length > 0) {
        for (const param of parameters) {
            const namedParamRegex = /\s*\w+\s*(=[^=].*|=$)/gm;
            if (namedParamRegex.test(param)) {
                namedParameters.push(param);
            }
        }
    }

    // get new modified script for word completion context vistor to provide suggestions
    // eg: convert "a = b + c.d.func(s)" to "a = b + c.d.""
    const posLeftFuncName = lastLineScript.lastIndexOf(funcName);
    const textBeforeFuncName = lastLineScript.substring(0, posLeftFuncName);

    // skip when it's a func def
    if (checkIsFunctionDef && textBeforeFuncName.trimRight().split(" ")
        .pop() === "def") {
        return null;
    }

    scriptLines.push(textBeforeFuncName);
    const modifiedScript: string = scriptLines.join("\n");
    return {
        funcName,
        paramIndex,
        modifiedScript,
        namedParameters,
        lastParam: parameters.length > 0 ? parameters[parameters.length - 1] : undefined,
    };
}

export function extractParamName(param: string): string {
    const searchResult = /\w+/.exec(param);
    if (searchResult) {
        return searchResult[0];
    }
    return null;
}

// parameter list can contain embedded "( )", "[ ]", " { }",
// remove them for correct "," counting
// class1.func1(funct2(1.2, (a(1,2), [(1,2), (3,4), [5,6]]), {a: 'a', {b: 1, c: true}}, (1, [2,4]),
export function removeBracePair(text: string, openChar: string, closeChar: string): string {
    let newText = "";
    if (!text || text.length === 0) {
        return newText;
    }

    let newTextIndex = 0;
    let openIndex: number;
    const stackOpenBraces: number[] = [];
    for (let index = 0; index < text.length; ++index) {
        // make a copy, if the brace is not closed yet, keep them too
        newText += text[index];

        if (openChar === text[index]) {
            stackOpenBraces.push(newTextIndex);
        } else if (closeChar === text[index] && stackOpenBraces.length > 0) {
            // found a pair, remove everything between this pair
            openIndex = stackOpenBraces.pop();
            newText = newText.substring(0, openIndex);
            newTextIndex = newText.length - 1;
        }
        newTextIndex ++; // the position to hold the next copied character
    }
    return newText;
}

/*
 split an input string (removed the outtest "(" and ")" already by delimit,
 considering the case whose delimiter is surrounded by (), [], {}, "" and '')
 e.g. :
 "op: (int, int) -> int, flag: Boolean" shall be splitted into 2 parts: "op: (int, int) -> int" and "flag: Boolean"
 "(1, [2,3]), {a: 4, b: (5,6)}" shall be splitted into 2 parts: "(1, [2,3]) and "{a: 4, b: (5,6)}"
*/
export function splitBy(input: string, delimiter: string): string[] {
    let openedParenthes = 0;    // ( )
    let openedBrackets = 0;     // [ ]
    let openedBraces = 0;       // { }
    let openedDoubleQuotes = 0; // " "
    let openedSingleQuotes = 0; // ' '

    const substrs: string[] = [];
    let lastIndex = 0;
    for (let index = 0; index < input.length; ++index) {
        const ch = input[index];

        if (ch === "(") {
            openedParenthes++;
        } else if (ch === ")" && openedParenthes > 0) {
            openedParenthes--;
        } else if (ch === "[") {
            openedBrackets++;
        } else if (ch === "]" && openedBrackets > 0) {
            openedBrackets--;
        } else if (ch === "{") {
            openedBraces++;
        } else if (ch === "}" && openedBraces > 0) {
            openedBraces--;
        } else if (ch === "\"") {
            openedDoubleQuotes = 1 - openedDoubleQuotes;
        } else if (ch === "'") {
            openedSingleQuotes = 1 - openedSingleQuotes;
        } else if (ch === delimiter &&
            (openedParenthes + openedBrackets + openedBraces + openedDoubleQuotes + openedSingleQuotes === 0)) {
            substrs.push(input.substring(lastIndex, index));
            lastIndex = index + 1;
        }
    }
    substrs.push(input.substring(lastIndex));
    return substrs;
}
