import Intellisense from '../assets/Intellisense.gif';
import CodeFormatting from '../assets/CodeFormatting.gif';

interface IPresentation {
    gif: any;
    description: string;
    sampleCode: string;
}

interface IPresentationMap {
    [key: string]: IPresentation;
}

export const Presentations: IPresentationMap = {
    Intellisense: {
        gif: Intellisense,
        description: 'Language service provides intellisense (auto completion) base on keywords and metadata. ',
        sampleCode: `CREATE TABLE fooTable (
    fooInt INT,
    fooDate DATE
)

`,
    },
    CodeFormatting: {
        gif: CodeFormatting,
        description: 'Code formatting allows users to conveniently format SQL script into a more standard-looking style with indentations and newlines. It can be accessed in the right-click menu. ',
        sampleCode: `CREATE EXTERNAL 
TABLE [ext]. [dimension_TransactionType](
[Transaction Type Key] [int] NOT NULL     )    WITH
    ( LOCATION ='/dimension_TransactionType/',   
DATA_SOURCE= WWIStorage,  
    FILE_FORMAT =TextFileFormat,
REJECT_TYPE = VALUE,REJECT_VALUE = 0



)
`,
    },
};
