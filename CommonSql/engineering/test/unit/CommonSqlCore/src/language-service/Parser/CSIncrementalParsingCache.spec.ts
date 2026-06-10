import { jest } from '@jest/globals';
import { ErrorNode } from "@CommonSqlCore/node_modules/antlr4ts/tree/ErrorNode";
import { TerminalNode } from "@CommonSqlCore/node_modules/antlr4ts/tree/TerminalNode";
import { IncrementalParsingCache } from '@CommonSqlCore/src/language-service/Parser/CSIncrementalParsingCache';
import { IIncrementalParsingConfig } from '@CommonSqlUtils/Utils';

describe('test IncrementalParsingCache', () => {
    
    const incrementalParsingConfig: IIncrementalParsingConfig = {
        sqlClauseRule: 'sql_clause',
        goStatementRule: 'go_statement',
    };
    const incrementalParsingCache = new IncrementalParsingCache(incrementalParsingConfig);

    it('reduceScript should return partial script', () => {
        jest.spyOn((incrementalParsingCache as any)._cache, 'has')
            .mockImplementationOnce(() => true);
        jest.spyOn((incrementalParsingCache as any)._cache, 'get')
            .mockImplementationOnce(() => ({ script: 'foo' }));

        expect(incrementalParsingCache.reduceScript(1, 'foo bar')).toEqual([' bar', { script: 'foo' }]);
    });

    it('reduceScript should return original script', () => {
        jest.spyOn((incrementalParsingCache as any)._cache, 'has')
            .mockImplementationOnce(() => false)
            .mockImplementationOnce(() => true);
        jest.spyOn((incrementalParsingCache as any)._cache, 'get')
            .mockImplementationOnce(() => ({ script: 'fooo' }));

        expect(incrementalParsingCache.reduceScript(1, 'foo bar')).toEqual(['foo bar', null]);
        expect(incrementalParsingCache.reduceScript(1, 'foo bar')).toEqual(['foo bar', null]);
    });

    it('updateSyntaxErrorsPosition should modify syntaxErrors correctlly', () => {
        const cachedScript = { script: 'foo\r\nbar', index: 8, line: 2, column: 3, tokenIndex: 0 };
        const syntaxErrors = [
            { line: 1, startColumn: 1, endColumn: 2, message: '', severity: null },
            { line: 2, startColumn: 3, endColumn: 5, message: '', severity: null },
        ];

        incrementalParsingCache.updateSyntaxErrorsPosition(null, syntaxErrors);
        expect(syntaxErrors).toEqual([
            { line: 1, startColumn: 1, endColumn: 2, message: '', severity: null },
            { line: 2, startColumn: 3, endColumn: 5, message: '', severity: null },
        ]);

        incrementalParsingCache.updateSyntaxErrorsPosition(cachedScript, syntaxErrors);
        expect(syntaxErrors).toEqual([
            { line: 2, startColumn: 4, endColumn: 5, message: '', severity: null },
            { line: 3, startColumn: 3, endColumn: 5, message: '', severity: null },
        ]);
    });

    it('getRuleNameForContext should return null', () => {
        expect((incrementalParsingCache as any).getRuleNameForContext({}, null)).toBeNull();
    });

    it('getRuleNameForContext should return right rule name', () => {
        const parser = { ruleNames: ['foo', 'bar', 'baz'] };
        const context = { ruleIndex: 1 };
        expect((incrementalParsingCache as any).getRuleNameForContext(parser, context)).toBe('bar');
    });

    const parser = { ruleNames: ['', 'sql_clause', 'go_statement'] };
    const errorNode = new ErrorNode(null);
    const terminalNode = new TerminalNode(null);

    it('saveParsedScriptByReason should cache the partial script before end of the go statement', () => {
        const input = 'SELECT a FROM t;\nGO\nSELECT a ';
        const ast = {
            // SqlContext
            children: [
                {
                    // BatchContext
                    children: [
                        {
                            // Sql_clauseContext
                            start: { startIndex: 0, line: 1, charPositionInLine: 0, tokenIndex: 0 },
                            children: [terminalNode, terminalNode, terminalNode, terminalNode],
                            ruleIndex: 1,
                        },
                        {
                            // Go_statementContext
                            stop: { stopIndex: 18, line: 2, charPositionInLine: 2, tokenIndex: 5 },
                            children: [terminalNode],
                            ruleIndex: 2,
                        },
                        
                    ],
                    ruleIndex: 0,
                },
                {
                    // BatchContext
                    children: [
                        {
                            // Sql_clauseContext
                            start: { startIndex: 20, line: 3, charPositionInLine: 0, tokenIndex: 7 },
                            children: [terminalNode, terminalNode, errorNode],
                            ruleIndex: 1,
                        },
                    ],
                    ruleIndex: 0,
                },
                terminalNode,
            ],
            ruleIndex: 0,
        };


        incrementalParsingCache.saveParsedScriptByReason(parser, 1, input, null, ast);
        expect((incrementalParsingCache as any)._cache.get(1)).toEqual({
            script: 'SELECT a FROM t;\nGO',
            index: 19,
            line: 2,
            column: 4,
            tokenIndex: 5,
        });
    });
    
    it('saveParsedScriptByReason should cache the partial script before start of the sql clause', () => {
        const input = 'SELECT a FROM t;\nSELECT;\nSELECT a FROM t;\nSELECT a FROM t;\nSELECT a ';
        const ast = {
            // SqlContext
            children: [
                {
                    // BatchContext
                    children: [
                        {
                            // Sql_clauseContext
                            start: { startIndex: 0, line: 1, charPositionInLine: 0, tokenIndex: 0 },
                            children: [terminalNode, terminalNode, terminalNode, terminalNode],
                            ruleIndex: 1,
                        },
                        {
                            // Sql_clauseContext
                            start: { startIndex: 17, line: 2, charPositionInLine: 0, tokenIndex: 5 },
                            children: [terminalNode, terminalNode, errorNode],
                            ruleIndex: 1,
                        },
                        
                    ],
                    ruleIndex: 0,
                },
                {
                    // BatchContext
                    children: [
                        {
                            // Sql_clauseContext
                            start: { startIndex: 25, line: 3, charPositionInLine: 0, tokenIndex: 7 },
                            children: [terminalNode, terminalNode, terminalNode, terminalNode],
                            ruleIndex: 1,
                        },
                        {
                            // Sql_clauseContext
                            start: { startIndex: 42, line: 4, charPositionInLine: 0, tokenIndex: 12 },
                            children: [terminalNode, terminalNode, terminalNode, terminalNode],
                            ruleIndex: 1,
                        },
                    ],
                    ruleIndex: 0,
                },
                {
                    // BatchContext
                    children: [
                        {
                            // Sql_clauseContext
                            start: { startIndex: 59, line: 5, charPositionInLine: 0, tokenaIndex: 17 },
                            children: [terminalNode, terminalNode, errorNode],
                            ruleIndex: 1,
                        },
                        
                    ],
                    ruleIndex: 0,
                },
                terminalNode,
            ],
            ruleIndex: 0,
        };


        incrementalParsingCache.saveParsedScriptByReason(parser, 1, input, null, ast);
        expect((incrementalParsingCache as any)._cache.get(1)).toEqual({
            script: 'SELECT a FROM t;\nSELECT;\n',
            index: 25,
            line: 3,
            column: 0,
            tokenIndex: 7,
        });

        incrementalParsingCache.saveParsedScriptByReason(parser, 2, input, null, ast);
        expect((incrementalParsingCache as any)._cache.get(2)).toEqual({
            script: '',
            index: 0,
            line: 1,
            column: 0,
            tokenIndex: 0,
        });
    });
});
