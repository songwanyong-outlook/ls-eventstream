import { jest } from '@jest/globals';
import { CSScriptFormatter } from '@CommonSqlCore/src/language-service/Parser/CSScriptFormatter';
import { SqlParserLexer } from '@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserLexer';
import { SqlParserParser } from '@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserParser';

describe('test CSScriptFormatter', () => {
    // cast prototype to any to spy on private method initializeKeywordTextList before constructor is called
    const spy = jest.spyOn(CSScriptFormatter.prototype as any, 'initializeKeywordTextList');
    const formatter = CSScriptFormatter.GetInstance(SqlParserLexer.VOCABULARY, SqlParserParser, false, '', "non_reserved_keywords");
    
    it('should call initializeKeywordTextList once', () => {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('isKeyword should return true for keywords', () => {
        jest.spyOn((formatter as any).reservedKeywordsSet, 'has')
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => false)
            .mockImplementationOnce(() => false);

        jest.spyOn((formatter as any).nonReservedKeywordsSet, 'has')
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => false)
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => false);

        expect(formatter.isKeyword('foo')).toBe(true);
        expect(formatter.isKeyword('foo')).toBe(true);
        expect(formatter.isKeyword('foo')).toBe(true);
        expect(formatter.isKeyword('foo')).toBe(false);
    });

    it('isReservedKeyword should return true for reserved keywords', () => {
        jest.spyOn((formatter as any).reservedKeywordsSet, 'has')
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => false);

        expect(formatter.isReservedKeyword('foo')).toBe(true);
        expect(formatter.isReservedKeyword('foo')).toBe(false);
    });

    it('should convert keywords to upper case', () => {
        const spy = jest.spyOn(formatter, 'isKeyword');
        
        spy.mockImplementation(() => true);
        expect(formatter.formatScriptByKeywords('foo Bar baZ')).toBe('FOO BAR BAZ');
        
        spy.mockImplementation(() => false);
        expect(formatter.formatScriptByKeywords('foo Bar baZ')).toBe('foo Bar baZ');
        
        spy.mockImplementation(word => word.toUpperCase() === 'BAR');
        expect(formatter.formatScriptByKeywords('foo Bar baZ')).toBe('foo BAR baZ');

        spy.mockRestore();
    });

    it('should not convert keywords if caseSensitive is true', () => {
        (formatter as any).caseSensitive = true;
        const spy = jest.spyOn(formatter, 'isKeyword');
        
        spy.mockImplementation(() => true);
        expect(formatter.formatScriptByKeywords('foo Bar baZ')).toBe('foo Bar baZ');
        
        spy.mockImplementation(() => false);
        expect(formatter.formatScriptByKeywords('foo Bar baZ')).toBe('foo Bar baZ');
        
        spy.mockImplementation(word => word === 'BAR');
        expect(formatter.formatScriptByKeywords('foo Bar baZ')).toBe('foo Bar baZ');

        spy.mockRestore();
        (formatter as any).caseSensitive = false;
    });
});
