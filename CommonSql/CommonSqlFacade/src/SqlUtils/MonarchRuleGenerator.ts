/* tslint:disable */ 
import * as monaco from 'monaco-editor';

export interface ISyntaxHighlight {
    postfix?: string;
    keywords: string[];
    operators: string[];
    builtinFunctions: string[];
    builtinVariables: string[];
    commentTokenizer?: ICommentTokenizer;
    stringTokenizer?: IStringTokenizer;
}

export interface ICommentTokenizer {
    lineCommentsTokenizer: ITokenizer;
    blockCommentsTokenizer: ITokenizer;
}
export interface IStringTokenizer {
    singleLineStringTokenizer: ITokenizer;
    multiLineStringTokenizer: ITokenizer;
}
export interface ITokenizer {
    start: string;
    end?: string;
}

export const getHighlightRule = (syntax: ISyntaxHighlight | monaco.languages.IMonarchLanguage) => instanceOfISyntaxHighlight(syntax) ? <monaco.languages.IMonarchLanguage>{
    defaultToken: '',
    tokenPostfix: syntax.postfix,
    ignoreCase: true,

    brackets: [
        { open: '[', close: ']', token: 'delimiter.square' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' },
    ],
    
    keywords: syntax.keywords,
    operators: syntax.operators,
    builtinFunctions: syntax.builtinFunctions,
    builtinVariables: syntax.builtinVariables,

    tokenizer: {
        root: [
            { include: '@comments' },
            { include: '@whitespace' },
            { include: '@pseudoColumns' },
            { include: '@numbers' },
            { include: '@strings' },
            { include: '@complexIdentifiers' },
            { include: '@scopes' },
            [/[;,.]/, 'delimiter'],
            [/[()]/, '@brackets'],
            [
                /[\w@#$]+/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@operators': 'keyword',
                        '@builtinVariables': 'variable.predefined',
                        '@builtinFunctions': 'key',
                        '@default': 'identifier',
                    },
                },
            ],
            [/[<>=!%&+\-*/|~^]/, 'operator'],
        ],
        whitespace: [[/\s+/, 'white']],
        comments: [
            [syntax.commentTokenizer ? new RegExp(escapeForRegex(syntax.commentTokenizer.lineCommentsTokenizer.start) + '.*') : /--+.*/, 'comment'],
            [syntax.commentTokenizer ? new RegExp(escapeForRegex(syntax.commentTokenizer.blockCommentsTokenizer.start)) : /\/\*/, { token: 'comment.quote', next: '@comment' }],
        ],
        comment: [
            // Not supporting nested comments, as nested comments seem to not be standard?
            // i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
            // [/\/\*/, { token: 'comment.quote', next: '@push' }],    // nested comment not allowed :-(
            [syntax.commentTokenizer ? new RegExp(escapeForRegex(syntax.commentTokenizer.blockCommentsTokenizer.end)) : /\*\//, { token: 'comment.quote', next: '@pop' }],
            [/./, 'comment'],
        ],
        pseudoColumns: [[/[$][A-Za-z_][\w@#$]*/, { cases: { '@default': 'identifier' } }]],
        numbers: [
            [/0[xX][0-9a-fA-F]*/, 'number'],
            [/[$][+-]*\d*(\.\d*)?/, 'number'],
            [/((\d+(\.\d*)?)|(\.\d+))([eE][-+]?\d+)?/, 'number'],
        ],
        strings: syntax.stringTokenizer ? [
            [new RegExp(escapeForRegex(syntax.stringTokenizer.multiLineStringTokenizer.start)), { token: 'string', next: '@mutiLineString' }],
            [
                new RegExp(escapeForRegex(syntax.stringTokenizer.singleLineStringTokenizer.start) + '[^'
                        + escapeForRegex(syntax.stringTokenizer.singleLineStringTokenizer.end) + ']*'
                        + escapeForRegex(syntax.stringTokenizer.singleLineStringTokenizer.end) + '?'), 'string',
            ],
        ] : [
            [/N'/, { token: 'string', next: '@mutiLineString' }],
            [/'[^']*'?/, 'string'],
        ],
        mutiLineString: syntax.stringTokenizer ? [
            [new RegExp('[^' + escapeForRegex(syntax.stringTokenizer.singleLineStringTokenizer.end) + ']+'), 'string'],
            [new RegExp(escapeForRegex(syntax.stringTokenizer.singleLineStringTokenizer.end)), { token: 'string', next: '@pop' }],
        ] : [
            [/[^']+/, 'string'],
            [/'/, { token: 'string', next: '@pop' }],
        ],
        complexIdentifiers: [
            [/\[/, { token: 'identifier.quote', next: '@bracketedIdentifier' }],
            [/"/, { token: 'identifier.quote', next: '@quotedIdentifier' }],
        ],
        bracketedIdentifier: [
            [/[^\]]+/, 'identifier.quote'],
            [/]]/, 'identifier.quote'],
            [/]/, { token: 'identifier.quote', next: '@pop' }],
        ],
        quotedIdentifier: [
            [/[^"]+/, 'identifier.quote'],
            [/""/, 'identifier.quote'],
            [/"/, { token: 'identifier.quote', next: '@pop' }],
        ],
        scopes: [
            [/BEGIN\s+(DISTRIBUTED\s+)?TRAN(SACTION)?\b/i, 'keyword'],
            [/BEGIN\s+TRY\b/i, { token: 'keyword.try' }],
            [/END\s+TRY\b/i, { token: 'keyword.try' }],
            [/BEGIN\s+CATCH\b/i, { token: 'keyword.catch' }],
            [/END\s+CATCH\b/i, { token: 'keyword.catch' }],
            [/(BEGIN|CASE)\b/i, { token: 'keyword.block' }],
            [/END\b/i, { token: 'keyword.block' }],
            [/WHEN\b/i, { token: 'keyword.choice' }],
            [/THEN\b/i, { token: 'keyword.choice' }],
        ],
    },
} : syntax;

function instanceOfISyntaxHighlight(object: any): object is ISyntaxHighlight {
    return 'keywords' in object;
}

// Adding escapse before all reserved characters in RegExp
// e.x. replacing '*' by '\*'
function escapeForRegex(str: string): string {
    const specialChars = ['\\\\', '\\^', '\\.', '\\[', '\\]', '\\$', '\\(', '\\)', '\\/', '\\{', '\\}', '\\*', '\\?', '\\+', '\\|'];
    specialChars.forEach((char: string) => {
        const regex = new RegExp(char, 'g');
        str = str.replace(regex, char);
    });
    return str;
}
