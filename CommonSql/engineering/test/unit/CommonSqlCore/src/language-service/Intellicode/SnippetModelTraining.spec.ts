
import { GetModelTrainedByCodeSnippets } from "@CommonSqlCore/src/language-service/Intellicode/SnippetModelTraining";
import { CSScriptFormatter } from "@CommonSqlCore/src/language-service/Parser/CSScriptFormatter";
import { SqlParserLexer } from "@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserLexer";
import { SqlParserParser } from "@CommonSqlCore/src/language-service/Parser/GeneratedParser/SqlParserParser";
import { scriptsWithoutSyntaxError } from "@engineering/common/SampleScripts";

describe("test Intellicode Training Model", () => {
    const scriptFormatter = CSScriptFormatter.GetInstance(SqlParserLexer.VOCABULARY, SqlParserParser, false, null, "non_reserved_keywords");
    const singleStatement: string = `CREATE EXTERNAL TABLE [ext].[dimension_City](
                                    [City Key] [int] NOT NULL,
                                    [Location] [nvarchar](76) NULL
                                    )
                                    WITH (LOCATION='/dimension_City/',   
                                    DATA_SOURCE = WWIStorage,  
                                    FILE_FORMAT = TextFileFormat,
                                    REJECT_TYPE = VALUE,
                                    REJECT_VALUE = 0
                                    );`

    const testCodeSnippets = scriptsWithoutSyntaxError;
    const resultForSingleStatement = GetModelTrainedByCodeSnippets([singleStatement], scriptFormatter);
    const trainedModelForSingleStatement = resultForSingleStatement.statementResult[0][1];
    
    it(`test for intellicode in single statement scenario"`, () => {
        expect(trainedModelForSingleStatement.has('CREATE')).toBe(true);
        expect(trainedModelForSingleStatement.get('CREATE')).toContain('EXTERNAL');

        expect(trainedModelForSingleStatement.has('CREATE~EXTERNAL')).toBe(true);
        expect(trainedModelForSingleStatement.get('CREATE~EXTERNAL')).toContain('TABLE');

        expect(trainedModelForSingleStatement.has('CREATE~EXTERNAL~TABLE')).toBe(true);
        expect(trainedModelForSingleStatement.get('CREATE~EXTERNAL~TABLE')).toContain('NOT');

        expect(trainedModelForSingleStatement.has('CREATE~EXTERNAL~TABLE~NOT')).toBe(true);
        expect(trainedModelForSingleStatement.get('CREATE~EXTERNAL~TABLE~NOT')).toContain('NULL');
    });

    const singleStatement2: string = ` -- SELECT FROM
        /*
            WHERE WHERE
        */
        CREATE EXTERNAL TABLE 'SELECT'(
        [City Key] [int] NOT NULL,
        [Location] [nvarchar](76) NULL
        )
        WITH (LOCATION='/dimension_City/',   
        DATA_SOURCE = WWIStorage,  
        FILE_FORMAT = TextFileFormat,
        REJECT_TYPE = VALUE,
        REJECT_VALUE = 0
        );`

    const resultForSingleStatement2 = GetModelTrainedByCodeSnippets([singleStatement2], scriptFormatter);
    const trainedModelForSingleStatement2 = resultForSingleStatement2.statementResult[0][1]; 

    const mapEqual = (m1: Map<string, string[]>, m2: Map<string, string[]>): boolean => {
        const array1 = Array.from(m1);
        const array2 = Array.from(m2);

        if (array1.length !== array1.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            const key1 = array1[i][0];
            const values1 = array1[i][1];
            const key2 = array2[i][0];
            const values2 = array2[i][1];

            if (key1 !== key2 || values1.length !== values2.length) {
                return false;
            }

            for (let j = 0; j < values1.length; j++) {
                if (values1[j] !== values2[j]) {
                    return false;
                }
            }
        }
        return true;
    };

    it(`expect comments and strs will not affect result of training model"`, () => {
        expect(mapEqual(trainedModelForSingleStatement, trainedModelForSingleStatement2)).toBe(true);
        expect(mapEqual(resultForSingleStatement.freqResult, resultForSingleStatement2.freqResult)).toBe(true);
    });

    const resultForCodeSnippetsList = GetModelTrainedByCodeSnippets(testCodeSnippets, scriptFormatter);
    const freqMapForSnipetList = resultForCodeSnippetsList.freqResult;
    it(`test for intellicode in snippets list scenario"`, () => {
        expect(Array.from(freqMapForSnipetList).length).toBe(32);
    });
});
