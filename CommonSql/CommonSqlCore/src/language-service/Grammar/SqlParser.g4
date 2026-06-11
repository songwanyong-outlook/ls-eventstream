grammar SqlParser;

// ****************************************************************
// Force keywords case-insensitive
// ****************************************************************
fragment A:('a'|'A');
fragment B:('b'|'B');
fragment C:('c'|'C');
fragment D:('d'|'D');
fragment E:('e'|'E');
fragment F:('f'|'F');
fragment G:('g'|'G');
fragment H:('h'|'H');
fragment I:('i'|'I');
fragment J:('j'|'J');
fragment K:('k'|'K');
fragment L:('l'|'L');
fragment M:('m'|'M');
fragment N:('n'|'N');
fragment O:('o'|'O');
fragment P:('p'|'P');
fragment Q:('q'|'Q');
fragment R:('r'|'R');
fragment S:('s'|'S');
fragment T:('t'|'T');
fragment U:('u'|'U');
fragment V:('v'|'V');
fragment W:('w'|'W');
fragment X:('x'|'X');
fragment Y:('y'|'Y');
fragment Z:('z'|'Z');

// lexer rules

ADD : 'ADD';
AFTER : 'AFTER';
ALL : 'ALL';
ALTER : 'ALTER';
AND : 'AND';
ANY : 'ANY';
APPLY : 'APPLY';
AS : 'AS';
ASC : 'ASC';
AUTHORIZATION : 'AUTHORIZATION';
BACKUP : 'BACKUP';
BEGIN : 'BEGIN';
BETWEEN : 'BETWEEN';
BREAK : 'BREAK';
BROWSE : 'BROWSE';
BULK : 'BULK';
BY : 'BY';
CASCADE : 'CASCADE';
CASE : 'CASE';
CHECK : 'CHECK';
CHECKPOINT : 'CHECKPOINT';
CLOSE : 'CLOSE';
CLUSTERED : 'CLUSTERED';
COLLATE : 'COLLATE';
COLUMN : 'COLUMN';
COMMIT : 'COMMIT';
COMPUTE : 'COMPUTE';
CONSTRAINT : 'CONSTRAINT';
CONTAINS : 'CONTAINS';
CONTAINSTABLE : 'CONTAINSTABLE';
CONTINUE : 'CONTINUE';
CONVERT : 'CONVERT';
CREATE : 'CREATE' ;
CROSS : 'CROSS';
CURRENT : 'CURRENT';
CURRENT_DATE : 'CURRENT_DATE';
CURRENT_TIME : 'CURRENT_TIME';
CURRENT_TIMESTAMP : 'CURRENT_TIMESTAMP';
CURRENT_USER : 'CURRENT_USER';
CURSOR : 'CURSOR';
DATABASE : 'DATABASE';
DBCC : 'DBCC';
DEALLOCATE : 'DEALLOCATE';
DECLARE : 'DECLARE';
DEFAULT : 'DEFAULT';
DEFINE : 'DEFINE';
DELETE : 'DELETE';
DENY : 'DENY';
DESC : 'DESC';
DISTINCT : 'DISTINCT';
DISTRIBUTED : 'DISTRIBUTED';
DOUBLE : 'DOUBLE';
DROP : 'DROP';
DURATION : 'DURATION';
ELSE : 'ELSE';
END : 'END';
ERRLVL : 'ERRLVL';
ESCAPE : 'ESCAPE';
EXCEPT : 'EXCEPT';
EXEC : 'EXEC';
EXECUTE : 'EXECUTE';
EXISTS : 'EXISTS';
EXIT : 'EXIT';
FETCH : 'FETCH';
FILE : 'FILE';
FILLFACTOR : 'FILLFACTOR';
FOR : 'FOR';
FOREIGN : 'FOREIGN';
FREETEXT : 'FREETEXT';
FREETEXTTABLE : 'FREETEXTTABLE';
FROM : 'FROM';
FULL : 'FULL';
FUNCTION : 'FUNCTION';
GOTO : 'GOTO';
GRANT : 'GRANT';
GROUP : 'GROUP';
HAVING : 'HAVING';
HOLDLOCK : 'HOLDLOCK';
IDENTITY : 'IDENTITY';
IDENTITY_INSERT : 'IDENTITY_INSERT';
IDENTITYCOL : 'IDENTITYCOL';
IF : 'IF';
IN : 'IN';
INDEX : 'INDEX';
INNER : 'INNER';
INSERT : 'INSERT';
INTERSECT : 'INTERSECT';
INTO : 'INTO';
IS : 'IS';
JOIN : 'JOIN';
KEY : 'KEY';
KILL : 'KILL';
LEFT : 'LEFT';
LIKE : 'LIKE';
LIMIT : 'LIMIT';
LINENO : 'LINENO';
MATCH : 'MATCH';
MATCH_RECOGNIZE : 'MATCH_RECOGNIZE';
MEASURES : 'MEASURES';
NATIONAL : 'NATIONAL';
NEXT : 'NEXT';
NOCHECK : 'NOCHECK';
NONCLUSTERED : 'NONCLUSTERED';
NOT : 'NOT';
NULL : 'NULL';
NULLIF : 'NULLIF';
OF : 'OF';
OFF : 'OFF';
OFFSETS : 'OFFSETS';
ON : 'ON';
OPEN : 'OPEN';
OPENDATASOURCE : 'OPENDATASOURCE';
OPENQUERY : 'OPENQUERY';
OPENROWSET : 'OPENROWSET';
OPENXML : 'OPENXML';
OPTION : 'OPTION';
OR : 'OR';
ORDER : 'ORDER';
OUTER : 'OUTER';
OVER : 'OVER';
PARTITION : 'PARTITION';
PATTERN : 'PATTERN';
PERCENT : 'PERCENT';
PLAN : 'PLAN';
PRIMARY : 'PRIMARY';
PRINT : 'PRINT';
PROC : 'PROC';
PROCEDURE : 'PROCEDURE';
PUBLIC : 'PUBLIC';
RAISERROR : 'RAISERROR';
READ : 'READ';
READTEXT : 'READTEXT';
RECONFIGURE : 'RECONFIGURE';
REFERENCES : 'REFERENCES';
REPLICATION : 'REPLICATION';
RESTORE : 'RESTORE';
RESTRICT : 'RESTRICT';
RETURN : 'RETURN';
REVOKE : 'REVOKE';
RIGHT : 'RIGHT';
ROLLBACK : 'ROLLBACK';
ROW : 'ROW';
ROWCOUNT : 'ROWCOUNT';
ROWGUIDCOL : 'ROWGUIDCOL';
RULE : 'RULE';
SAVE : 'SAVE';
SCHEMA : 'SCHEMA';
SELECT :  'SELECT';
SESSION_USER : 'SESSION_USER';
SET : 'SET';
SETUSER : 'SETUSER';
SHUTDOWN : 'SHUTDOWN';
TOKENSKIP : 'SKIP';  // cannot declare a rule with reserved name SKIP
SOME : 'SOME';
STATISTICS : 'STATISTICS';
SYSTEM_USER : 'SYSTEM_USER';
TABLE : 'TABLE';
TEXTSIZE : 'TEXTSIZE';
THEN : 'THEN';
TIMESTAMP : 'TIMESTAMP';
TO : 'TO';
TOP : 'TOP';
TRAN : 'TRAN';
TRANSACTION : 'TRANSACTION';
TRIGGER : 'TRIGGER';
TRUNCATE : 'TRUNCATE';
TSEQUAL : 'TSEQUAL';
UNION : 'UNION';
UNIQUE : 'UNIQUE';
UPDATE : 'UPDATE';
UPDATETEXT : 'UPDATETEXT';
USE : 'USE';
USER : 'USER';
VALUES : 'VALUES';
VARYING : 'VARYING';
VIEW : 'VIEW';
WAITFOR : 'WAITFOR';
WHEN : 'WHEN';
WHERE : 'WHERE';
WHILE : 'WHILE';
WITH : 'WITH';
WRITETEXT : 'WRITETEXT';

// built-in data types
ARRAY    : A R R A Y;
BIGINT   : B I G I N T;
DECIMAL  : D E C I M A L;
BIT      : B I T;
FLOAT    : F L O A T;
DATETIME : D A T E T I M E;
NVARCHAR : N V A R C H A R;
RECORD   : R E C O R D;
VARBINARY: V A R B I N A R Y;

Bang            : '!' ;
PercentSign     : '%' ;
Ampersand       : '&' ;
LeftParenthesis : '(' ;
RightParenthesis: ')' ;
LeftCurly       : '{' ;
RightCurly      : '}' ;
Star            : '*' ;
MultiplyEquals  : '*=';
Plus            : '+' ;
Comma           : ',' ;
Minus           : '-' ;
Dot             : '.' ;
Divide          : '/' ;
Colon           : ':' ;
DoubleColon     : '::';
LessThan        : '<' ;
EqualsSign      : '=' ;
RightOuterJoin  : '=*';
GreaterThan     : '>' ;
Circumflex      : '^' ;
VerticalLine    : '|' ;
Tilde           : '~' ;
AddEquals       : '+=';
SubtractEquals  : '-=';
DivideEquals    : '/=';
ModEquals       : '%=';
BitwiseAndEquals: '&=';
BitwiseOrEquals : '|=';
BitwiseXorEquals: '^=';
Semicolon       : ';' ;
QuestionMark    : '?' ;

fragment
Digit
    :    '0'..'9'
    ;

fragment
FirstLetter
    :    'a'..'z'
    |    'A'..'Z'
    |    '_'
    |    '#'
    |    CharHighNotWhitespace
    ;

fragment
Letter
    :    'a'..'z'
    |    'A'..'Z'
    |    '_'
    |    '#'
    |    '@'
    |    '$'
    |    CharHighNotWhitespace
    ;

fragment
CharHighNotWhitespace
    // !! Note that the lexer has a very simplified and incorrect understanding of what T-SQL
    // !! identifier is. It simply accepts all characters between 0x0080 and 0xfffe, while the
    // !! engine lexer accepts characters basing on Unicode classes (i.e. Lu, as Ll, Lt, Lm,
    // !! Lo and Nl as the first character). In particular, this simplification leads to a
    // !! conflict with the WS_CHAR_WO_NEWLINE rule, which we temporary resolve by excluding
    // !! the corresponding characters from the 0x0080..0xfffe range. Please see VSTS#710711
    // !! for details.
    :    '\u0080'..'\u0084'
    //   '\u0085'               // Cc: NEL, NExt Line
    |    '\u0086'..'\u009f'
    //   '\u00a0'               // Zs: No-Break Space
    |    '\u00a1'..'\u1679'
    //   '\u1680'               // Zs: Ogham Space Mark
    |    '\u1681'..'\u1fff'
    //   '\u2000'..'\u200a'     // Zs: En Quad .. Hair Space
    //     '\u200b'               // Cf: Zero Width Space
    |    '\u200c'..'\u2027'
    //   '\u2028'               // Zs: Line Separator
    //   '\u2029'               // Zs: Paragraph Separator
    |    '\u202a'..'\u202e'
    //   '\u202f'               // Zs: Narrow No-Break Space
    |    '\u2030'..'\u205e'
    //   '\u205f'               // Zs: Medium Mathematical Space
    |    '\u2060'..'\u2fff'
    //   '\u3000'               // Zs: Ideographic Space
    |    '\u3001'..'\ufffe'
    ;

fragment
MoneySign
    :    '\u0024' // Dollar sign
    |    '\u00A3' // Pound sign
    |    '\u00A4' // Currency sign
    |    '\u00A5' // Yen sign
    |    '\u09F2' // Bengali Rupee mark
    |    '\u09F3' // Bengali Rupee sign
    |    '\u0E3F' // Thai Baht symbol
    |    '\u20AC' // Euro-currency Sign
    |    '\u20A1' // Colon sign
    |    '\u20A2' // Cruzeiro sign
    |    '\u20A3' // French Franc sign
    |    '\u20A4' // Lira sign
    |    '\u20A6' // Naira sign
    |    '\u20A7' // Peseta sign
    |    '\u20A8' // Rupee sign
    |    '\u20A9' // Won sign
    |    '\u20AA' // New Sheqel sign
    |    '\u20AB' // Dong sign
    ;

fragment
WS_CHAR_WO_NEWLINE
    // The low range characters (i.e. < 0x80),
    // see "CharTab" in "sql/ntdbms/msql/parser/parslex.cpp".
    :    '\u0000'..'\u0008'     // Cc: Null character .. Backspace
    |    '\u0009'               // Cc: HT, Horizontal tab
    //   '\u000a'               // Cc: LF, Line Feed       => handled by EndOfLine
    |    '\u000b'               // Cc: VT, Vertical tab
    |    '\u000c'               // Cc: FF, Form Feed
    //   '\u000d'               // Cc: CR, Carriage Return => handled by EndOfLine
    |    '\u000e'..'\u001f'     // Cc: Shift Out .. Unit Separator
    |    '\u0020'               // Zs: Space
    // The high range characters (i.e. >= 0x80),
    // see "categorySql32Whitespace" in "sql/common/regext/regext.cpp".
    |    '\u0085'               // Cc: NEL, NExt Line
    |    '\u00a0'               // Zs: No-Break Space
    |    '\u1680'               // Zs: Ogham Space Mark
    |    '\u2000'..'\u200a'     // Zs: En Quad .. Hair Space
    |    '\u200b'               // Cf: Zero Width Space
    |    '\u2028'               // Zs: Line Separator
    |    '\u2029'               // Zs: Paragraph Separator
    |    '\u202f'               // Zs: Narrow No-Break Space
    |    '\u205f'               // Zs: Medium Mathematical Space
    |    '\u3000'               // Zs: Ideographic Space
    ;


// If there is only white space since the last newline, then update the _acceptableGoOffset
// so that Go is parsed when it is not only the first column, but also if there is only
// white space between the first column and "go".
fragment Whitespace
	: UnicodeClassZS //'<Any Character With Unicode Class Zs>'
	| '\u0009' //'<Horizontal Tab Character (U+0009)>'
	| '\u000B' //'<Vertical Tab Character (U+000B)>'
	| '\u000C' //'<Form Feed Character (U+000C)>'
	;

fragment UnicodeClassZS
	: '\u0020' // SPACE
	| '\u00A0' // NO_BREAK SPACE
	| '\u1680' // OGHAM SPACE MARK
	| '\u180E' // MONGOLIAN VOWEL SEPARATOR
	| '\u2000' // EN QUAD
	| '\u2001' // EM QUAD
	| '\u2002' // EN SPACE
	| '\u2003' // EM SPACE
	| '\u2004' // THREE_PER_EM SPACE
	| '\u2005' // FOUR_PER_EM SPACE
	| '\u2006' // SIX_PER_EM SPACE
	| '\u2008' // PUNCTUATION SPACE
	| '\u2009' // THIN SPACE
	| '\u200A' // HAIR SPACE
	| '\u202F' // NARROW NO_BREAK SPACE
	| '\u3000' // IDEOGRAPHIC SPACE
	| '\u205F' // MEDIUM MATHEMATICAL SPACE
	;

fragment LETTER:       [A-Z_];
fragment IPV6_OCTECT:  [0-9A-F][0-9A-F][0-9A-F][0-9A-F];
fragment IPV4_OCTECT:  [0-9]?[0-9]?[0-9];
fragment DEC_DOT_DEC:  (DEC_DIGIT+ '.' DEC_DIGIT+ |  DEC_DIGIT+ '.' | '.' DEC_DIGIT+);
fragment HEX_DIGIT:    [0-9A-F];
fragment DEC_DIGIT:    [0-9];
fragment DECIMAL_DIGIT: DEC_DIGIT+;

Integer : DECIMAL_DIGIT;

Real :(DECIMAL_DIGIT | DEC_DOT_DEC) Exponent;

Numeric :DEC_DOT_DEC;

HexLiteral:'0X'DECIMAL_DIGIT;

fragment
Exponent
    :    'E' ( '+' | '-' )? (Digit)*  // try  'e' ( '+' | '-' )? (Digit)?
    ;

fragment
EndOfLine
    /*  '\r' '\n' can be matched in one alternative or by matching
        '\r' in one iteration and '\n' in another.  I am trying to
        handle any flavor of newline that comes in, but the language
        that allows both "\r\n" and "\r" and "\n" to all be valid
        newline is ambiguous.  Consequently, the resulting grammar
        must be ambiguous.  I'm shutting this warning off.
     */
	// options { generateAmbigWarnings=false; } :
    : '\r\n'  // DOS
    | '\r'    // Unix
    | '\n'    // Macintosh
    ;

AsciiStringLiteral
    :    '\''
        (
            ~('\'' | '\n' | '\r')
        |
            EndOfLine
        |
            '\'' '\''
        )*
        '\''
    ;

UnicodeStringLiteral
    :   'N' '\''
        (
            ~('\'' | '\n' | '\r')
        |
            EndOfLine
        |
            '\'' '\''
        )*
        '\''
    ;

fragment
SqlCommandIdentifier_f
    :   '$' LeftParenthesis
        (
            ~(')' | '\n' | '\r')
        |
            EndOfLine
        )+
        RightParenthesis
    ;

SqlCommandIdentifier: SqlCommandIdentifier_f;

PseudoColumn: DollarPartition ('@' | FirstLetter) (Letter | Digit)*;

DollarPartition: '$';

Money: MoneySign (' ')* (Minus | Plus)? (Digit)+ ( '.' (Digit)* (Exponent)? | Exponent)?;

Label: FirstLetter (Letter | Digit)* (Colon ~':' | /*empty*/);

QuotedIdentifier
    :  '['
        (
            ~(']' | '\n' | '\r')
        |
            EndOfLine
        |
            ']' ']'
        )+
        ']'
    |   '"'
        (
            ~ ('"' | '\n' | '\r')
        |
            EndOfLine
        |
            '"' '"'
        )*
        '"'
    ;

Variable
    :   '@' (Letter | Digit)*
    ;

OdbcInitiator : '--(*';

SingleLineComment:   '--' ~[\r\n]*                      -> channel(2);

MultilineComment:'/*' (MultilineComment | .)*? '*/'     -> channel(1);

WHITESPACES:    [ \t\r\n]+                              -> skip;

// parser rules

sql: statement* EOF;

statement
	: createTableStatement optSemicolons
    | resultSetDefinitions optSemicolons
	| queryExpression optSemicolons
    | empty_statement
    ;

empty_statement: ';';

resultSetDefinitions
    : WITH resultSetDefinition (Comma resultSetDefinition)*
    ;

resultSetDefinition
    : identifier columnNameList? AS LeftParenthesis queryExpression RightParenthesis
    ;

queryExpression
    : queryExpressionUnit (UNION ALL? queryExpressionUnit)*
    ;

queryExpressionUnit
    : querySpecification | queryParenthesis
    ;

queryParenthesis
    : LeftParenthesis queryExpression RightParenthesis
    ;

querySpecification
    : SELECT
	  uniqueRowFilter?
	  selectExpression (Comma selectExpression)*
      intoClause?
      fromClause
      whereClause?
      groupByClause?
      havingClause?
      matchRecognize?
    ;

columnNameList
    : LeftParenthesis identifier (Comma identifier)* RightParenthesis
    ;

orderByClauseUnit
    : ORDER BY expressionWithSortOrder (Comma expressionWithSortOrder)*
    ;

expressionWithSortOrder: expression orderByOption?;

orderByOption:  ASC | DESC;

groupByClause: GROUP BY groupByItemList;

groupByItemList: groupByItem (Comma groupByItem)*;

groupByItem: simpleGroupByItem;

simpleGroupByItem: expression;

whereClause: WHERE whereConditionList;

whereConditionList: booleanExpression;

booleanExpression: booleanExpressionWithFlags;

booleanExpressionWithFlags: booleanExpressionOr;

booleanExpressionOr
    : booleanExpressionAnd (OR booleanExpressionAnd)*
    ;

booleanExpressionAnd
    : booleanExpressionUnary (AND booleanExpressionUnary)*
    ;

booleanExpressionUnary
    : NOT booleanExpressionUnary
	| booleanExpressionPrimary
    ;

booleanExpressionPrimary
    : booleanExpressionParenthesis
	| expressionWithFlags (
		comparisonOperator (comparisonPredicate)
		| nullPredicate
		| (NOT? (betweenPredicate | likePredicate | inPredicate))
	);

likePredicate
    : LIKE expressionWithFlags
    ;

betweenPredicate
    : BETWEEN expressionWithFlags AND expressionWithFlags
    ;

inPredicate
    : IN LeftParenthesis expressionList RightParenthesis
	;

expressionList
    : expression (Comma expression)*
    ;

nullPredicate: IS NOT? NULL;

comparisonPredicate: expressionWithFlags;

comparisonOperator
    : EqualsSign
	| GreaterThan (EqualsSign)?
	| LessThan ( EqualsSign | GreaterThan)?
	| Bang ( EqualsSign | LessThan | GreaterThan)
    ;

expressionWithFlags: expressionBinaryPri2;

expressionBinaryPri2
    : expressionBinaryPri1
		( Plus expressionBinaryPri1
		| Minus expressionBinaryPri1
		| Ampersand expressionBinaryPri1
		| VerticalLine expressionBinaryPri1
		| Circumflex expressionBinaryPri1)*
    ;

expressionBinaryPri1
    : expressionUnary
        ( Star expressionUnary
		| Divide expressionUnary
		| PercentSign expressionUnary)*
    ;

expressionUnary
    : (Plus | Minus | Tilde) expressionUnary
	| expressionWithClrElements;

expressionWithClrElements
    : expressionPrimary (
		Dot (
			identifier (
				expressionWithClrElementsFunctionCallPart?
			)
		)
	)*;

nonQuotedIdentifier
    : SqlCommandIdentifier
	| PseudoColumn
	| DollarPartition
	| Money
	| Label
    | TIMESTAMP // "timestamp" can be used as a valid id
    | scalarDataType
    ;

expressionWithClrElementsFunctionCallPart: parenthesizedOptExpressionWithDefaultList;

parenthesizedOptExpressionWithDefaultList: LeftParenthesis expressionWithDefaultList? RightParenthesis;

expressionWithDefaultList: expressionWithDefault (Comma expressionWithDefault)*;

expressionWithDefault: expression;

expressionPrimary
    : literal
    | castCall
    | builtInFunctionCall
    | scalarDataType
    | columnOrFunctionCall
	| nullIfExpression
    | caseExpression
    | parenthesisDisambiguatorForExpressions
	;

parenthesisDisambiguatorForExpressions: expressionParenthesis;

expressionParenthesis
    : LeftParenthesis expressionWithFlags RightParenthesis
    ;

nullIfExpression
    : NULLIF LeftParenthesis expressionWithFlags Comma expressionWithFlags RightParenthesis
	;

caseExpression
    : CASE (expression simpleCaseExpression	| searchedCaseExpression)
      (ELSE expression)?
      END
    ;

searchedCaseExpression: searchedWhenExpression+;

searchedWhenExpression
    : WHEN booleanExpressionWithFlags THEN expressionWithFlags
    ;

simpleCaseExpression: simpleWhenClauseUnit+;

simpleWhenClauseUnit
    : WHEN expressionWithFlags THEN expressionWithFlags
    ;

columnOrFunctionCall:
	multiPartIdentifier (userFunctionCall | /* empty*/);

userFunctionCall:
	LeftParenthesis (
		expressionWithDefaultList
		| uniqueRowFilter expressionList
	) RightParenthesis overClauseNoOrderBy?;

multiPartIdentifier: identifierList;

builtInFunctionCall
    : nonQuotedIdentifier LeftParenthesis (regularBuiltInFunctionCall | aggregateBuiltInFunctionCall)
	| durationClauseUnit
    // TIMESTAMP is an ASA keyword, but System.Timestamp() is a built-in function too.
    // we have to handle System.Timestamp() specially, to avoid Timestamp() here be regonized as keyword token
    | identifier Dot TIMESTAMP LeftParenthesis RightParenthesis
    | identifier Dot TIMESTAMP
	| (LEFT | RIGHT) LeftParenthesis regularBuiltInFunctionCall  // LEFT and RIGHT are keywords, but they are also built-in functions
    ;

regularBuiltInFunctionCall
    : (expressionList | starColumnReferenceExpression)? RightParenthesis overClauseUnit?
    ;

aggregateBuiltInFunctionCall
    : uniqueRowFilter expression RightParenthesis overClauseNoOrderBy?
    ;

overClauseUnit
    : overClauseBeginning orderByClauseUnit? limitDurationClauseUnit? overWhenClauseUnit? RightParenthesis;

overClauseNoOrderBy: overClauseBeginning RightParenthesis;

overClauseBeginning
	: OVER LeftParenthesis partitionBy?
	;

partitionBy
    : PARTITION BY partitionByItemList
	;

partitionByItemList
    : partitionByItem (Comma partitionByItem)*
	;

partitionByItem
    : expression
	;

uniqueRowFilter: ALL | DISTINCT;

overWhenClauseUnit: WHEN booleanExpressionWithFlags;

limitDurationClauseUnit: LIMIT durationClauseUnit;
durationClauseUnit : DURATION LeftParenthesis expressionList RightParenthesis;

starColumnReferenceExpression: Star;

castCall:
	nonQuotedIdentifier LeftParenthesis expression AS scalarDataType RightParenthesis;

literal
    : integer
	| numeric
	| real
	| moneyLiteral
	| binary
	| stringLiteral
	| nullLiteral
    ;

real: Real;

moneyLiteral: Money;
binary: HexLiteral;
nullLiteral: NULL;

booleanExpressionParenthesis
    : LeftParenthesis booleanExpression RightParenthesis
    ;

selectColumn
    : selectColumnExpression (AS? stringOrIdentifier)?
	| stringOrIdentifier EqualsSign selectColumnExpression
    ;

stringOrIdentifier: stringLiteral | identifier;
stringLiteral: AsciiStringLiteral | UnicodeStringLiteral;
selectColumnExpression:	expression ; //| identityFunction

max: nonQuotedIdentifier;

scalarDataType
    : buildinTypes
    | dataTypeSchemaObjectName (dataTypeParametersOpt)?
    ;

buildinTypes
    : BIGINT | FLOAT | DECIMAL | DATETIME | BIT | RECORD | ARRAY
	;

dataTypeSchemaObjectName
    : NVARCHAR
	| VARBINARY
    // | identifier (Dot identifier)?
	;

dataTypeParametersOpt
	// we currently support (max) only
    // : LeftParenthesis (max | integer ( Comma integer)?) RightParenthesis
    : LeftParenthesis (max) RightParenthesis
    ;

integer: Integer;
numeric: Numeric;

matchRecognize
    : MATCH_RECOGNIZE matchRecognizBody
	;

matchRecognizBody
    : LeftParenthesis limitDurationClauseUnit partitionBy? measureClause afterMatch pattern patternDefines RightParenthesis AS stringOrIdentifier
	;

measureClause
    : MEASURES (measureColumnItem AS columnAlias) (Comma measureColumnItem AS columnAlias)*
	;

measureColumnItem
    : expression
	;

columnAlias
    : stringOrIdentifier
	;

afterMatch
    : AFTER MATCH TOKENSKIP TO NEXT ROW
	;

pattern
	: PATTERN LeftParenthesis patternGroup+ RightParenthesis
	;

patternGroup // e.g: (A+ (B | C) D? E*)
    : patternNameModifier (VerticalLine patternGroup)*
	;

patternNameModifier
    : patternAtom+
	;

patternAtom
    : (identifier | LeftParenthesis patternGroup RightParenthesis) patternModifier?
	;

patternModifier
    : Star | Plus | QuestionMark | LeftCurly Integer (Comma Integer?)? RightCurly
	;

patternDefines
    : DEFINE pds+=patternDefine (Comma pds+=patternDefine)*
 	;

patternDefine
    : identifier AS (booleanExpressionWithFlags | expression)
	;

intoClause
    : INTO schemaObjectThreePartName
    ;

havingClause
    : HAVING booleanExpression
    ;

schemaObjectThreePartName
    : identifier (Dot identifier)? (Dot identifier)?;

selectExpression: selectStarExpression | selectColumn;

selectStarExpression
    : Star
    | identifier (Dot identifier)* Dot Star
    ;

expression: expressionWithFlags;

optSemicolons: Semicolon*;

fromClause
    : FROM fromList nrtHint*
    ;

fromList
    : fromItem (Comma fromItem)*
    ;

fromItem 
    : selectTableReferenceElement joinElement*
    ;

selectTableReferenceElement
    : derivedTable
	| schemaObjectOrFunctionTableReference
    ;

derivedTable
    : queryDerivedTable simpleTableReferenceAlias columnNameList?
    ;

queryDerivedTable
    : LeftParenthesis queryExpression RightParenthesis
    ;

simpleTableReferenceAlias: AS? identifier;

schemaObjectOrFunctionTableReference
    : schemaObjectFourPartName (schemaObjectTableReference | schemaObjectFunctionTableReference)
    ;

schemaObjectFunctionTableReference
    : parenthesizedOptExpressionWithDefaultList simpleTableReferenceAlias? columnNameList?
    ;

schemaObjectTableReference
    : (
		nonParameterTableHints
		| simpleTableReferenceAlias //tableSampleClause?
		(nonParameterTableHints)?
      )? 
      nrtHint*
    ;

nrtHint
    : partitionBy (INTO integer)?
	| timestampBy (OVER expressionList)?
	;

joinElement
    : qualifiedJoin | unqualifiedJoin
    ;

qualifiedJoin
    : qualifiedJoinUnit (qualifiedJoinOnUnit)?
    ;

qualifiedJoinUnit
    : (( INNER | LEFT OUTER? | RIGHT OUTER?)? JOIN) fromItem
    ;

qualifiedJoinOnUnit: ON booleanExpression;

// not sure if there exists other identifiers that can be here. So instead of OUTER APPLY, make it OUTER (APPLY | nonQuotedIdentifier) here.
unqualifiedJoin: unqualifiedJoinUnit selectTableReferenceElement;

unqualifiedJoinUnit
    : CROSS (JOIN | APPLY | nonQuotedIdentifier)
	| OUTER (APPLY | nonQuotedIdentifier);

timestampBy
    : TIMESTAMP BY expression
	;

nonParameterTableHints
    : nonQuotedIdentifier
    ;

schemaObjectFourPartName // max count = four
	: schemaObjectThreePartName (Dot identifier)?
    ;

identifierList: identifier (identifierListElement)*;

identifierListElement: Dot identifier;

createTableStatement
    : CREATE TABLE schemaObjectThreePartName LeftParenthesis tableDefinitionCreateTable	RightParenthesis
    ;

tableDefinitionCreateTable
    : tableElementList Comma?
    ;

tableElementList
    : elements+=tableElement (Comma elements+=tableElement)*
    ;

tableElement
    : columnDefinition
	| tableConstraint
	;

columnDefinition: identifier regularColumnBody;

regularColumnBody: scalarDataType;

identifier: nonQuotedIdentifier | QuotedIdentifier;

tableConstraint
    : uniqueTableConstraint; // current we support only this kind of table constraint

uniqueTableConstraint
    : PRIMARY KEY columnNameList
	;
