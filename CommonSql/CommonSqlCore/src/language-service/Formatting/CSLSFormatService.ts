/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from "antlr4ts";
import { ICodeFormattingConfig } from "../../../../CommonSqlUtils/Utils";

const NEWLINE = '\r\n';
const WHITESPACE = ' ';
const COMMA = ';';

type INode = ICommonNode | ICommentNode;

interface ICommentToken {
    token: Token;
    before: Token;
    after: Token;
}

interface ICommonNode {
    children: INode[];
    nodeType: NodeType;
    text?: string;
    ruleName?: string;
}

interface ICommentNode {
    content: string;
    type: ICommentNodeType;
    startWithNewLine: boolean;
    endWithNewLine: boolean;
}

enum ICommentNodeType {
    LINE_COMMENT,
    BLOCK_COMMENT,
}

const enum NodeType {
    TerminalIsolated = 0,
    TerminalConnected,
    TerminalConnector,
    TerminalGroupStart,
    TerminalGroupClose,
    TerminalEnd,
    Group,
    TerminalGroup,
}

const enum splitType {
    None,
    Whitespace,
    Newline,
    NewlineWithInd,
    NewlineWithBackInd,
    DoubleNewlines,
}

/*
    A map of format rules between two types of nodes based on index of NodeType
    e.g. An isolated terminal node followed by a group node should be inserted a new line with indentation
    after its text, and thus formatRules[0][6] is set as splitType.NewlineWithInd
*/
const formatRules: splitType[][] = [
    [splitType.Whitespace, splitType.Whitespace, splitType.None, splitType.Whitespace, splitType.NewlineWithBackInd, splitType.None, splitType.NewlineWithInd, splitType.Whitespace],
    [splitType.Whitespace, splitType.None, splitType.None, splitType.Whitespace, splitType.NewlineWithBackInd, splitType.None, splitType.NewlineWithInd, splitType.Whitespace],
    [splitType.None, splitType.None, splitType.None, splitType.None, splitType.None, splitType.None, splitType.None, splitType.None],
    [splitType.NewlineWithInd, splitType.NewlineWithInd, splitType.NewlineWithInd, splitType.NewlineWithInd, splitType.Newline, splitType.None, splitType.NewlineWithInd, splitType.NewlineWithInd],
    [splitType.NewlineWithBackInd, splitType.NewlineWithBackInd, splitType.NewlineWithBackInd, splitType.Whitespace, splitType.NewlineWithBackInd, splitType.None, splitType.Newline, splitType.Newline],
    [splitType.Newline, splitType.Newline, splitType.Newline, splitType.Newline, splitType.Newline, splitType.None, splitType.Newline, splitType.Newline],
    [splitType.NewlineWithBackInd, splitType.NewlineWithBackInd, splitType.None, splitType.Whitespace, splitType.NewlineWithBackInd, splitType.None, splitType.Newline, splitType.Whitespace],
    [splitType.Whitespace, splitType.None, splitType.None, splitType.Whitespace, splitType.NewlineWithBackInd, splitType.None, splitType.Newline, splitType.Newline],
];

const specialNodes: Map<NodeType, RegExp> = new Map([
    /*  Regex recognizing nodes such as dot on either side of which no whitespace or newline is needed. e.g. [DB].[table] */
    [NodeType.TerminalConnector, /^(\.|;)$/],

    /*  
        Regex recognizing nodes such as left parenthesis from which all nodes are treated as a group node till TerminalGroupClose.
        e.g.someFunction (
                ...
            )
    */
    [NodeType.TerminalGroupStart, /^(\()$/],

    /*  Regex recognizing nodes such as right parenthesis till which all nodes are treated as a group node from TerminalGroupStart. */
    [NodeType.TerminalGroupClose, /^(\))$/],

    /*  Regex recognizing nodes such as id inside square brackets which should stay together with other connected terminal nodes. e.g. [DB][table] */
    [NodeType.TerminalConnected, /^(\[.+\])$/],

    /*  Regex recognizing nodes such as comma that splits a series of nodes and implies a new line.
        e.g.WHERE (
                condition A,
                condition B,
                ...
            )
    */
    [NodeType.TerminalEnd, /^(,)$/],

    /*  Regex recognizing nodes such as NOT NULL not naturally regarded as isolated terminal nodes, which are separated by whitespaces. e.g. SELECT TOP 100 ...*/
    [NodeType.TerminalIsolated, /^(NULL|NOTNULL|TOP[0-9]+)$/i],

    /*  Regex recognizing nodes such as star not naturally regarded as group nodes, which needs newline and indentations.
        e.g.SELECT
                *
            FROM
                ...
    */    
    [NodeType.Group, /^(\*)$/i],
]);

interface IndentationInterface {
    forwardIndentation: () => void;
    backIndentation: () => void;
    getIndentation: () => string;
}

export class CSLSFormatService {
    private readonly indentCount: number;
    private comments: ICommentToken[];
    private commentIndex: number;
    private blockCommentChannel: number;
    private lineCommentChannel: number;

    private get singleIndentation(): string {
        return ' '.repeat(this.indentCount);
    }

    constructor(
        private script: string,
        private config: ICodeFormattingConfig,
        private ruleNames: string[],
        private isKeyword: (text: string) => boolean,
        tokens: Token[], indentCount = 4,
    ) {
        this.blockCommentChannel = this.config.blockCommentChannel ?? 1; // block comment is set to channel 1 by default
        this.lineCommentChannel = this.config.lineCommentChannel ?? 2; // block comment is set to channel 2 by default
        this.comments = this.preProcessTokens(tokens);
        this.indentCount = indentCount;
    }

    public generateFormattedScript(node: any) {
        try {
            if (!this.script) {
                return '';
            }
            this.commentIndex = 0;
            const formatTree = this.generateFormatTree(node);
            let result = this.formatAST(formatTree);

            if (result.endsWith(NEWLINE)) {
                result = result.slice(0, -NEWLINE.length);
            }

            return result;
        } catch (e) {
            return this.script;
        }
    }

    private formatAST(node: INode, indentation = ''): string {
        if ((node as ICommentNode).content || (node as ICommonNode).text !== undefined) {
            return (node as ICommentNode).content ?? (node as ICommonNode).text;
        }
        node = node as ICommonNode;
        if (this.config.flatFormatRules?.includes(node.ruleName)) {
            return this.getFlattenedText(node, indentation);
        }
    
        let formattedScript = '';
        let prev: INode;
        let currentIndentation = indentation;
        const indentationInterface: IndentationInterface = {
            forwardIndentation: () => {
                currentIndentation += this.singleIndentation;
            },
            backIndentation: () => {
                if (currentIndentation.length - this.singleIndentation.length >= indentation.length) {
                    currentIndentation = currentIndentation.slice(0, -this.singleIndentation.length);
                }
            },
            getIndentation: () => {
                return currentIndentation;
            },
        };
        for (let child of node.children) {
            if (prev) {                
                if (!this.isCommonNode(prev)) {
                    prev = prev as ICommentNode;
                    if (prev.type === ICommentNodeType.LINE_COMMENT || prev.endWithNewLine) {
                        formattedScript += NEWLINE + currentIndentation;
                    } else {
                        formattedScript += WHITESPACE;
                    }
                } else {
                    prev = prev as ICommonNode;
                    if (this.isCommonNode(child)) {
                        child = child as ICommonNode;
                        if (this.isCodeBlock(child) && (this.isCodeBlock(prev) || this.isBlockEnd(prev))) {
                            formattedScript += NEWLINE + NEWLINE + currentIndentation;
                        } else if (this.isConjunction(child)) {
                            formattedScript += NEWLINE + currentIndentation;
                        } else {
                            formattedScript += this.getFormatInterval(prev.nodeType, child.nodeType, indentationInterface);
                        }
                    } else {
                        child = child as ICommentNode;
                        if (child.startWithNewLine) {
                            const type = child.type === ICommentNodeType.LINE_COMMENT ? NodeType.Group : NodeType.TerminalIsolated;
                            formattedScript += this.getFormatInterval(prev.nodeType, type, indentationInterface);
                        } else {
                            formattedScript += WHITESPACE;
                        }
                    }
                }
            }
            formattedScript += this.formatAST(child, currentIndentation);
            prev = child;
        }
        return formattedScript;
    }


    private getFormatInterval(prev: NodeType, cur: NodeType, indentation: IndentationInterface): string {
        switch (formatRules[prev][cur]) {
            case splitType.None: {
                return '';
            }
            case splitType.Whitespace: {
                return WHITESPACE;
            }
            case splitType.Newline: {
                return NEWLINE + indentation.getIndentation();
            }
            case splitType.NewlineWithInd: {
                indentation.forwardIndentation();
                return NEWLINE + indentation.getIndentation();
            }
            case splitType.NewlineWithBackInd: {
                indentation.backIndentation();
                return NEWLINE + indentation.getIndentation();
            }
            case splitType.DoubleNewlines: {
                return NEWLINE + NEWLINE + indentation.getIndentation();
            }
            default: {
                return '';
            }
        }
    }

    // format text under a node with only whitespace (except special case for line comments)
    private getFlattenedText(node: INode, indentation: string) {
        let flattenedText = '';
        const flattenedTokens = this.getFlattenedTokens(node);
        flattenedTokens.forEach((cur, i) => {
            const prev = flattenedTokens[i - 1];
            const curText = (cur as ICommonNode).text ?? (cur as ICommentNode).content;
            if (i !== 0) {
                if ((prev as ICommentNode).type === ICommentNodeType.LINE_COMMENT) {
                    flattenedText += NEWLINE + indentation;
                } else {
                    const prevText = (prev as ICommonNode).text ?? (prev as ICommentNode).content;
                    if (curText !== ')' && curText !== '.' && (curText[0] !== '[' || prevText[prevText.length - 1] !== ']') &&
                        prevText !== '(' && prevText !== '.' && (curText !== '(' || !this.isID(prevText))) {
                        flattenedText += WHITESPACE;
                    }
                }
            }
            flattenedText += curText;
        });
        return flattenedText;
    }

    private getFlattenedTokens(node: INode): INode[] {
        if (!this.isCommonNode(node)) {
            return [node];
        }

        node = node as ICommonNode;
        if (!node.children) {
            return [node];
        }
    
        const flattenedTokens = [];
        node.children.forEach((child: INode) => {
            this.getFlattenedTokens(child).forEach((token) => {
                flattenedTokens.push(token);
            });
        });
        return flattenedTokens;
    }

    private generateFormatTree(node: any, trimming = false, hadGroup = false): INode {
        let nodeType = this.getNodeType(node, hadGroup);
        const ruleName = this.ruleNames[node.ruleIndex];

        // terminal node
        if (!node.children) {
            return { 
                children: null,
                nodeType,
                text: this.getNodeText(node),
            };
        }

        // trim the tree by compressing single-child nodes
        if (node.children.length === 1) {
            const child = this.generateFormatTree(node.children[0], true);
            if (!trimming && nodeType === NodeType.Group && ((child as ICommentNode).content || !(child as ICommonNode).children)) {
                nodeType = NodeType.TerminalIsolated;
            }
            return trimming ? child : { children: [child], nodeType, ruleName };
        }

        const children: INode[] = [];
        hadGroup = false;
        node.children.forEach((childNode: any) => {   
            if (this.commentIndex < this.comments.length) {
                const commentToken = this.comments[this.commentIndex];         
                const start = childNode.children ? childNode.start.start : childNode.symbol.start;
                if (start === commentToken.after.startIndex) {
                    const token = commentToken.token;
                    children.push({
                        content: this.script.slice(token.startIndex, token.stopIndex + 1),
                        type: token.channel === this.blockCommentChannel ? ICommentNodeType.BLOCK_COMMENT : ICommentNodeType.LINE_COMMENT,
                        startWithNewLine: !!commentToken.before && commentToken.before.line != token.line,
                        endWithNewLine: commentToken.after.line != token.line,
                    });
                    this.commentIndex++;
                }
            }

            const child = this.generateFormatTree(childNode, false, hadGroup);
            children.push(child);
            if ((child as ICommonNode).nodeType === NodeType.Group) {
                hadGroup = true;
            }
        });
        return { children, nodeType, ruleName };
    }

    private preProcessTokens(tokens: Token[]): ICommentToken[] {
        const result: ICommentToken[] = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.channel === this.blockCommentChannel || token.channel === this.lineCommentChannel) {
                result.push({
                    token: token,
                    before: i > 0 ? tokens[i - 1] : null,
                    after: i < tokens.length - 1 ? tokens[i + 1] : null,
                });
            }
        }
        return result;
    }

    private getNodeType(node: any, hadGroup = false): NodeType {
        for (const [k, v] of specialNodes) {
            if (node.text.match(v)) {
                return k;
            }
        }
        if (this.isAtomRule(node)) {
            return NodeType.TerminalGroup;
        }
        // If the text does not map customized rules, nodes are classified to basic types based on whether they are terminal.
        // Note that a group node will be formatted as terminal if it is the only group node in current context and appears in the end.
        return node.children && (node.parent?.children[node.parent.childCount - 1] !== node || hadGroup) ? NodeType.Group : NodeType.TerminalIsolated;
    }
    
    private getNodeText(node: any): string {
        // Antlr will return '<EOF>' for text of eof token
        return node.text === '<EOF>' ? '' : node.text;
    }

    private isAtomRule(node: any) {
        return node?.ruleIndex && this.config?.atomRules?.includes(this.ruleNames[node.ruleIndex]);
    }

    private isCodeBlock(node: INode) {
        return this.config?.codeBlockRules?.includes((node as ICommonNode).ruleName);
    }

    private isBlockEnd(node: INode) {
        return (node as ICommonNode).text === COMMA;
    }

    private isConjunction(node: ICommonNode) {
        return this.config?.conjunctionWords?.includes(node.text);
    }

    private isCommonNode(node: INode): boolean {
        return (node as ICommonNode).nodeType !== undefined;
    }

    private isID(text: string) {
        if(this.isKeyword(text) || !text.match(/'[a-zA-Z0-9_]+'/)) {
            return false;
        }
        return true;
    }
}
