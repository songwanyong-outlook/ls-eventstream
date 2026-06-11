// Generated from src\language-service\Grammar\SqlParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { SqlParserVisitor } from "./SqlParserVisitor";


export class SqlParserParser extends Parser {
	public static readonly ADD = 1;
	public static readonly AFTER = 2;
	public static readonly ALL = 3;
	public static readonly ALTER = 4;
	public static readonly AND = 5;
	public static readonly ANY = 6;
	public static readonly APPLY = 7;
	public static readonly AS = 8;
	public static readonly ASC = 9;
	public static readonly AUTHORIZATION = 10;
	public static readonly BACKUP = 11;
	public static readonly BEGIN = 12;
	public static readonly BETWEEN = 13;
	public static readonly BREAK = 14;
	public static readonly BROWSE = 15;
	public static readonly BULK = 16;
	public static readonly BY = 17;
	public static readonly CASCADE = 18;
	public static readonly CASE = 19;
	public static readonly CHECK = 20;
	public static readonly CHECKPOINT = 21;
	public static readonly CLOSE = 22;
	public static readonly CLUSTERED = 23;
	public static readonly COLLATE = 24;
	public static readonly COLUMN = 25;
	public static readonly COMMIT = 26;
	public static readonly COMPUTE = 27;
	public static readonly CONSTRAINT = 28;
	public static readonly CONTAINS = 29;
	public static readonly CONTAINSTABLE = 30;
	public static readonly CONTINUE = 31;
	public static readonly CONVERT = 32;
	public static readonly CREATE = 33;
	public static readonly CROSS = 34;
	public static readonly CURRENT = 35;
	public static readonly CURRENT_DATE = 36;
	public static readonly CURRENT_TIME = 37;
	public static readonly CURRENT_TIMESTAMP = 38;
	public static readonly CURRENT_USER = 39;
	public static readonly CURSOR = 40;
	public static readonly DATABASE = 41;
	public static readonly DBCC = 42;
	public static readonly DEALLOCATE = 43;
	public static readonly DECLARE = 44;
	public static readonly DEFAULT = 45;
	public static readonly DEFINE = 46;
	public static readonly DELETE = 47;
	public static readonly DENY = 48;
	public static readonly DESC = 49;
	public static readonly DISTINCT = 50;
	public static readonly DISTRIBUTED = 51;
	public static readonly DOUBLE = 52;
	public static readonly DROP = 53;
	public static readonly DURATION = 54;
	public static readonly ELSE = 55;
	public static readonly END = 56;
	public static readonly ERRLVL = 57;
	public static readonly ESCAPE = 58;
	public static readonly EXCEPT = 59;
	public static readonly EXEC = 60;
	public static readonly EXECUTE = 61;
	public static readonly EXISTS = 62;
	public static readonly EXIT = 63;
	public static readonly FETCH = 64;
	public static readonly FILE = 65;
	public static readonly FILLFACTOR = 66;
	public static readonly FOR = 67;
	public static readonly FOREIGN = 68;
	public static readonly FREETEXT = 69;
	public static readonly FREETEXTTABLE = 70;
	public static readonly FROM = 71;
	public static readonly FULL = 72;
	public static readonly FUNCTION = 73;
	public static readonly GOTO = 74;
	public static readonly GRANT = 75;
	public static readonly GROUP = 76;
	public static readonly HAVING = 77;
	public static readonly HOLDLOCK = 78;
	public static readonly IDENTITY = 79;
	public static readonly IDENTITY_INSERT = 80;
	public static readonly IDENTITYCOL = 81;
	public static readonly IF = 82;
	public static readonly IN = 83;
	public static readonly INDEX = 84;
	public static readonly INNER = 85;
	public static readonly INSERT = 86;
	public static readonly INTERSECT = 87;
	public static readonly INTO = 88;
	public static readonly IS = 89;
	public static readonly JOIN = 90;
	public static readonly KEY = 91;
	public static readonly KILL = 92;
	public static readonly LEFT = 93;
	public static readonly LIKE = 94;
	public static readonly LIMIT = 95;
	public static readonly LINENO = 96;
	public static readonly MATCH = 97;
	public static readonly MATCH_RECOGNIZE = 98;
	public static readonly MEASURES = 99;
	public static readonly NATIONAL = 100;
	public static readonly NEXT = 101;
	public static readonly NOCHECK = 102;
	public static readonly NONCLUSTERED = 103;
	public static readonly NOT = 104;
	public static readonly NULL = 105;
	public static readonly NULLIF = 106;
	public static readonly OF = 107;
	public static readonly OFF = 108;
	public static readonly OFFSETS = 109;
	public static readonly ON = 110;
	public static readonly OPEN = 111;
	public static readonly OPENDATASOURCE = 112;
	public static readonly OPENQUERY = 113;
	public static readonly OPENROWSET = 114;
	public static readonly OPENXML = 115;
	public static readonly OPTION = 116;
	public static readonly OR = 117;
	public static readonly ORDER = 118;
	public static readonly OUTER = 119;
	public static readonly OVER = 120;
	public static readonly PARTITION = 121;
	public static readonly PATTERN = 122;
	public static readonly PERCENT = 123;
	public static readonly PLAN = 124;
	public static readonly PRIMARY = 125;
	public static readonly PRINT = 126;
	public static readonly PROC = 127;
	public static readonly PROCEDURE = 128;
	public static readonly PUBLIC = 129;
	public static readonly RAISERROR = 130;
	public static readonly READ = 131;
	public static readonly READTEXT = 132;
	public static readonly RECONFIGURE = 133;
	public static readonly REFERENCES = 134;
	public static readonly REPLICATION = 135;
	public static readonly RESTORE = 136;
	public static readonly RESTRICT = 137;
	public static readonly RETURN = 138;
	public static readonly REVOKE = 139;
	public static readonly RIGHT = 140;
	public static readonly ROLLBACK = 141;
	public static readonly ROW = 142;
	public static readonly ROWCOUNT = 143;
	public static readonly ROWGUIDCOL = 144;
	public static readonly RULE = 145;
	public static readonly SAVE = 146;
	public static readonly SCHEMA = 147;
	public static readonly SELECT = 148;
	public static readonly SESSION_USER = 149;
	public static readonly SET = 150;
	public static readonly SETUSER = 151;
	public static readonly SHUTDOWN = 152;
	public static readonly TOKENSKIP = 153;
	public static readonly SOME = 154;
	public static readonly STATISTICS = 155;
	public static readonly SYSTEM_USER = 156;
	public static readonly TABLE = 157;
	public static readonly TEXTSIZE = 158;
	public static readonly THEN = 159;
	public static readonly TIMESTAMP = 160;
	public static readonly TO = 161;
	public static readonly TOP = 162;
	public static readonly TRAN = 163;
	public static readonly TRANSACTION = 164;
	public static readonly TRIGGER = 165;
	public static readonly TRUNCATE = 166;
	public static readonly TSEQUAL = 167;
	public static readonly UNION = 168;
	public static readonly UNIQUE = 169;
	public static readonly UPDATE = 170;
	public static readonly UPDATETEXT = 171;
	public static readonly USE = 172;
	public static readonly USER = 173;
	public static readonly VALUES = 174;
	public static readonly VARYING = 175;
	public static readonly VIEW = 176;
	public static readonly WAITFOR = 177;
	public static readonly WHEN = 178;
	public static readonly WHERE = 179;
	public static readonly WHILE = 180;
	public static readonly WITH = 181;
	public static readonly WRITETEXT = 182;
	public static readonly ARRAY = 183;
	public static readonly BIGINT = 184;
	public static readonly DECIMAL = 185;
	public static readonly BIT = 186;
	public static readonly FLOAT = 187;
	public static readonly DATETIME = 188;
	public static readonly NVARCHAR = 189;
	public static readonly RECORD = 190;
	public static readonly VARBINARY = 191;
	public static readonly Bang = 192;
	public static readonly PercentSign = 193;
	public static readonly Ampersand = 194;
	public static readonly LeftParenthesis = 195;
	public static readonly RightParenthesis = 196;
	public static readonly LeftCurly = 197;
	public static readonly RightCurly = 198;
	public static readonly Star = 199;
	public static readonly MultiplyEquals = 200;
	public static readonly Plus = 201;
	public static readonly Comma = 202;
	public static readonly Minus = 203;
	public static readonly Dot = 204;
	public static readonly Divide = 205;
	public static readonly Colon = 206;
	public static readonly DoubleColon = 207;
	public static readonly LessThan = 208;
	public static readonly EqualsSign = 209;
	public static readonly RightOuterJoin = 210;
	public static readonly GreaterThan = 211;
	public static readonly Circumflex = 212;
	public static readonly VerticalLine = 213;
	public static readonly Tilde = 214;
	public static readonly AddEquals = 215;
	public static readonly SubtractEquals = 216;
	public static readonly DivideEquals = 217;
	public static readonly ModEquals = 218;
	public static readonly BitwiseAndEquals = 219;
	public static readonly BitwiseOrEquals = 220;
	public static readonly BitwiseXorEquals = 221;
	public static readonly Semicolon = 222;
	public static readonly QuestionMark = 223;
	public static readonly Integer = 224;
	public static readonly Real = 225;
	public static readonly Numeric = 226;
	public static readonly HexLiteral = 227;
	public static readonly AsciiStringLiteral = 228;
	public static readonly UnicodeStringLiteral = 229;
	public static readonly SqlCommandIdentifier = 230;
	public static readonly PseudoColumn = 231;
	public static readonly DollarPartition = 232;
	public static readonly Money = 233;
	public static readonly Label = 234;
	public static readonly QuotedIdentifier = 235;
	public static readonly Variable = 236;
	public static readonly OdbcInitiator = 237;
	public static readonly SingleLineComment = 238;
	public static readonly MultilineComment = 239;
	public static readonly WHITESPACES = 240;
	public static readonly RULE_sql = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_empty_statement = 2;
	public static readonly RULE_resultSetDefinitions = 3;
	public static readonly RULE_resultSetDefinition = 4;
	public static readonly RULE_queryExpression = 5;
	public static readonly RULE_queryExpressionUnit = 6;
	public static readonly RULE_queryParenthesis = 7;
	public static readonly RULE_querySpecification = 8;
	public static readonly RULE_columnNameList = 9;
	public static readonly RULE_orderByClauseUnit = 10;
	public static readonly RULE_expressionWithSortOrder = 11;
	public static readonly RULE_orderByOption = 12;
	public static readonly RULE_groupByClause = 13;
	public static readonly RULE_groupByItemList = 14;
	public static readonly RULE_groupByItem = 15;
	public static readonly RULE_simpleGroupByItem = 16;
	public static readonly RULE_whereClause = 17;
	public static readonly RULE_whereConditionList = 18;
	public static readonly RULE_booleanExpression = 19;
	public static readonly RULE_booleanExpressionWithFlags = 20;
	public static readonly RULE_booleanExpressionOr = 21;
	public static readonly RULE_booleanExpressionAnd = 22;
	public static readonly RULE_booleanExpressionUnary = 23;
	public static readonly RULE_booleanExpressionPrimary = 24;
	public static readonly RULE_likePredicate = 25;
	public static readonly RULE_betweenPredicate = 26;
	public static readonly RULE_inPredicate = 27;
	public static readonly RULE_expressionList = 28;
	public static readonly RULE_nullPredicate = 29;
	public static readonly RULE_comparisonPredicate = 30;
	public static readonly RULE_comparisonOperator = 31;
	public static readonly RULE_expressionWithFlags = 32;
	public static readonly RULE_expressionBinaryPri2 = 33;
	public static readonly RULE_expressionBinaryPri1 = 34;
	public static readonly RULE_expressionUnary = 35;
	public static readonly RULE_expressionWithClrElements = 36;
	public static readonly RULE_nonQuotedIdentifier = 37;
	public static readonly RULE_expressionWithClrElementsFunctionCallPart = 38;
	public static readonly RULE_parenthesizedOptExpressionWithDefaultList = 39;
	public static readonly RULE_expressionWithDefaultList = 40;
	public static readonly RULE_expressionWithDefault = 41;
	public static readonly RULE_expressionPrimary = 42;
	public static readonly RULE_parenthesisDisambiguatorForExpressions = 43;
	public static readonly RULE_expressionParenthesis = 44;
	public static readonly RULE_nullIfExpression = 45;
	public static readonly RULE_caseExpression = 46;
	public static readonly RULE_searchedCaseExpression = 47;
	public static readonly RULE_searchedWhenExpression = 48;
	public static readonly RULE_simpleCaseExpression = 49;
	public static readonly RULE_simpleWhenClauseUnit = 50;
	public static readonly RULE_columnOrFunctionCall = 51;
	public static readonly RULE_userFunctionCall = 52;
	public static readonly RULE_multiPartIdentifier = 53;
	public static readonly RULE_builtInFunctionCall = 54;
	public static readonly RULE_regularBuiltInFunctionCall = 55;
	public static readonly RULE_aggregateBuiltInFunctionCall = 56;
	public static readonly RULE_overClauseUnit = 57;
	public static readonly RULE_overClauseNoOrderBy = 58;
	public static readonly RULE_overClauseBeginning = 59;
	public static readonly RULE_partitionBy = 60;
	public static readonly RULE_partitionByItemList = 61;
	public static readonly RULE_partitionByItem = 62;
	public static readonly RULE_uniqueRowFilter = 63;
	public static readonly RULE_overWhenClauseUnit = 64;
	public static readonly RULE_limitDurationClauseUnit = 65;
	public static readonly RULE_durationClauseUnit = 66;
	public static readonly RULE_starColumnReferenceExpression = 67;
	public static readonly RULE_castCall = 68;
	public static readonly RULE_literal = 69;
	public static readonly RULE_real = 70;
	public static readonly RULE_moneyLiteral = 71;
	public static readonly RULE_binary = 72;
	public static readonly RULE_nullLiteral = 73;
	public static readonly RULE_booleanExpressionParenthesis = 74;
	public static readonly RULE_selectColumn = 75;
	public static readonly RULE_stringOrIdentifier = 76;
	public static readonly RULE_stringLiteral = 77;
	public static readonly RULE_selectColumnExpression = 78;
	public static readonly RULE_max = 79;
	public static readonly RULE_scalarDataType = 80;
	public static readonly RULE_buildinTypes = 81;
	public static readonly RULE_dataTypeSchemaObjectName = 82;
	public static readonly RULE_dataTypeParametersOpt = 83;
	public static readonly RULE_integer = 84;
	public static readonly RULE_numeric = 85;
	public static readonly RULE_matchRecognize = 86;
	public static readonly RULE_matchRecognizBody = 87;
	public static readonly RULE_measureClause = 88;
	public static readonly RULE_measureColumnItem = 89;
	public static readonly RULE_columnAlias = 90;
	public static readonly RULE_afterMatch = 91;
	public static readonly RULE_pattern = 92;
	public static readonly RULE_patternGroup = 93;
	public static readonly RULE_patternNameModifier = 94;
	public static readonly RULE_patternAtom = 95;
	public static readonly RULE_patternModifier = 96;
	public static readonly RULE_patternDefines = 97;
	public static readonly RULE_patternDefine = 98;
	public static readonly RULE_intoClause = 99;
	public static readonly RULE_havingClause = 100;
	public static readonly RULE_schemaObjectThreePartName = 101;
	public static readonly RULE_selectExpression = 102;
	public static readonly RULE_selectStarExpression = 103;
	public static readonly RULE_expression = 104;
	public static readonly RULE_optSemicolons = 105;
	public static readonly RULE_fromClause = 106;
	public static readonly RULE_fromList = 107;
	public static readonly RULE_fromItem = 108;
	public static readonly RULE_selectTableReferenceElement = 109;
	public static readonly RULE_derivedTable = 110;
	public static readonly RULE_queryDerivedTable = 111;
	public static readonly RULE_simpleTableReferenceAlias = 112;
	public static readonly RULE_schemaObjectOrFunctionTableReference = 113;
	public static readonly RULE_schemaObjectFunctionTableReference = 114;
	public static readonly RULE_schemaObjectTableReference = 115;
	public static readonly RULE_nrtHint = 116;
	public static readonly RULE_joinElement = 117;
	public static readonly RULE_qualifiedJoin = 118;
	public static readonly RULE_qualifiedJoinUnit = 119;
	public static readonly RULE_qualifiedJoinOnUnit = 120;
	public static readonly RULE_unqualifiedJoin = 121;
	public static readonly RULE_unqualifiedJoinUnit = 122;
	public static readonly RULE_timestampBy = 123;
	public static readonly RULE_nonParameterTableHints = 124;
	public static readonly RULE_schemaObjectFourPartName = 125;
	public static readonly RULE_identifierList = 126;
	public static readonly RULE_identifierListElement = 127;
	public static readonly RULE_createTableStatement = 128;
	public static readonly RULE_tableDefinitionCreateTable = 129;
	public static readonly RULE_tableElementList = 130;
	public static readonly RULE_tableElement = 131;
	public static readonly RULE_columnDefinition = 132;
	public static readonly RULE_regularColumnBody = 133;
	public static readonly RULE_identifier = 134;
	public static readonly RULE_tableConstraint = 135;
	public static readonly RULE_uniqueTableConstraint = 136;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"sql", "statement", "empty_statement", "resultSetDefinitions", "resultSetDefinition", 
		"queryExpression", "queryExpressionUnit", "queryParenthesis", "querySpecification", 
		"columnNameList", "orderByClauseUnit", "expressionWithSortOrder", "orderByOption", 
		"groupByClause", "groupByItemList", "groupByItem", "simpleGroupByItem", 
		"whereClause", "whereConditionList", "booleanExpression", "booleanExpressionWithFlags", 
		"booleanExpressionOr", "booleanExpressionAnd", "booleanExpressionUnary", 
		"booleanExpressionPrimary", "likePredicate", "betweenPredicate", "inPredicate", 
		"expressionList", "nullPredicate", "comparisonPredicate", "comparisonOperator", 
		"expressionWithFlags", "expressionBinaryPri2", "expressionBinaryPri1", 
		"expressionUnary", "expressionWithClrElements", "nonQuotedIdentifier", 
		"expressionWithClrElementsFunctionCallPart", "parenthesizedOptExpressionWithDefaultList", 
		"expressionWithDefaultList", "expressionWithDefault", "expressionPrimary", 
		"parenthesisDisambiguatorForExpressions", "expressionParenthesis", "nullIfExpression", 
		"caseExpression", "searchedCaseExpression", "searchedWhenExpression", 
		"simpleCaseExpression", "simpleWhenClauseUnit", "columnOrFunctionCall", 
		"userFunctionCall", "multiPartIdentifier", "builtInFunctionCall", "regularBuiltInFunctionCall", 
		"aggregateBuiltInFunctionCall", "overClauseUnit", "overClauseNoOrderBy", 
		"overClauseBeginning", "partitionBy", "partitionByItemList", "partitionByItem", 
		"uniqueRowFilter", "overWhenClauseUnit", "limitDurationClauseUnit", "durationClauseUnit", 
		"starColumnReferenceExpression", "castCall", "literal", "real", "moneyLiteral", 
		"binary", "nullLiteral", "booleanExpressionParenthesis", "selectColumn", 
		"stringOrIdentifier", "stringLiteral", "selectColumnExpression", "max", 
		"scalarDataType", "buildinTypes", "dataTypeSchemaObjectName", "dataTypeParametersOpt", 
		"integer", "numeric", "matchRecognize", "matchRecognizBody", "measureClause", 
		"measureColumnItem", "columnAlias", "afterMatch", "pattern", "patternGroup", 
		"patternNameModifier", "patternAtom", "patternModifier", "patternDefines", 
		"patternDefine", "intoClause", "havingClause", "schemaObjectThreePartName", 
		"selectExpression", "selectStarExpression", "expression", "optSemicolons", 
		"fromClause", "fromList", "fromItem", "selectTableReferenceElement", "derivedTable", 
		"queryDerivedTable", "simpleTableReferenceAlias", "schemaObjectOrFunctionTableReference", 
		"schemaObjectFunctionTableReference", "schemaObjectTableReference", "nrtHint", 
		"joinElement", "qualifiedJoin", "qualifiedJoinUnit", "qualifiedJoinOnUnit", 
		"unqualifiedJoin", "unqualifiedJoinUnit", "timestampBy", "nonParameterTableHints", 
		"schemaObjectFourPartName", "identifierList", "identifierListElement", 
		"createTableStatement", "tableDefinitionCreateTable", "tableElementList", 
		"tableElement", "columnDefinition", "regularColumnBody", "identifier", 
		"tableConstraint", "uniqueTableConstraint",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'ADD'", "'AFTER'", "'ALL'", "'ALTER'", "'AND'", "'ANY'", "'APPLY'", 
		"'AS'", "'ASC'", "'AUTHORIZATION'", "'BACKUP'", "'BEGIN'", "'BETWEEN'", 
		"'BREAK'", "'BROWSE'", "'BULK'", "'BY'", "'CASCADE'", "'CASE'", "'CHECK'", 
		"'CHECKPOINT'", "'CLOSE'", "'CLUSTERED'", "'COLLATE'", "'COLUMN'", "'COMMIT'", 
		"'COMPUTE'", "'CONSTRAINT'", "'CONTAINS'", "'CONTAINSTABLE'", "'CONTINUE'", 
		"'CONVERT'", "'CREATE'", "'CROSS'", "'CURRENT'", "'CURRENT_DATE'", "'CURRENT_TIME'", 
		"'CURRENT_TIMESTAMP'", "'CURRENT_USER'", "'CURSOR'", "'DATABASE'", "'DBCC'", 
		"'DEALLOCATE'", "'DECLARE'", "'DEFAULT'", "'DEFINE'", "'DELETE'", "'DENY'", 
		"'DESC'", "'DISTINCT'", "'DISTRIBUTED'", "'DOUBLE'", "'DROP'", "'DURATION'", 
		"'ELSE'", "'END'", "'ERRLVL'", "'ESCAPE'", "'EXCEPT'", "'EXEC'", "'EXECUTE'", 
		"'EXISTS'", "'EXIT'", "'FETCH'", "'FILE'", "'FILLFACTOR'", "'FOR'", "'FOREIGN'", 
		"'FREETEXT'", "'FREETEXTTABLE'", "'FROM'", "'FULL'", "'FUNCTION'", "'GOTO'", 
		"'GRANT'", "'GROUP'", "'HAVING'", "'HOLDLOCK'", "'IDENTITY'", "'IDENTITY_INSERT'", 
		"'IDENTITYCOL'", "'IF'", "'IN'", "'INDEX'", "'INNER'", "'INSERT'", "'INTERSECT'", 
		"'INTO'", "'IS'", "'JOIN'", "'KEY'", "'KILL'", "'LEFT'", "'LIKE'", "'LIMIT'", 
		"'LINENO'", "'MATCH'", "'MATCH_RECOGNIZE'", "'MEASURES'", "'NATIONAL'", 
		"'NEXT'", "'NOCHECK'", "'NONCLUSTERED'", "'NOT'", "'NULL'", "'NULLIF'", 
		"'OF'", "'OFF'", "'OFFSETS'", "'ON'", "'OPEN'", "'OPENDATASOURCE'", "'OPENQUERY'", 
		"'OPENROWSET'", "'OPENXML'", "'OPTION'", "'OR'", "'ORDER'", "'OUTER'", 
		"'OVER'", "'PARTITION'", "'PATTERN'", "'PERCENT'", "'PLAN'", "'PRIMARY'", 
		"'PRINT'", "'PROC'", "'PROCEDURE'", "'PUBLIC'", "'RAISERROR'", "'READ'", 
		"'READTEXT'", "'RECONFIGURE'", "'REFERENCES'", "'REPLICATION'", "'RESTORE'", 
		"'RESTRICT'", "'RETURN'", "'REVOKE'", "'RIGHT'", "'ROLLBACK'", "'ROW'", 
		"'ROWCOUNT'", "'ROWGUIDCOL'", "'RULE'", "'SAVE'", "'SCHEMA'", "'SELECT'", 
		"'SESSION_USER'", "'SET'", "'SETUSER'", "'SHUTDOWN'", "'SKIP'", "'SOME'", 
		"'STATISTICS'", "'SYSTEM_USER'", "'TABLE'", "'TEXTSIZE'", "'THEN'", "'TIMESTAMP'", 
		"'TO'", "'TOP'", "'TRAN'", "'TRANSACTION'", "'TRIGGER'", "'TRUNCATE'", 
		"'TSEQUAL'", "'UNION'", "'UNIQUE'", "'UPDATE'", "'UPDATETEXT'", "'USE'", 
		"'USER'", "'VALUES'", "'VARYING'", "'VIEW'", "'WAITFOR'", "'WHEN'", "'WHERE'", 
		"'WHILE'", "'WITH'", "'WRITETEXT'", undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, "'!'", "'%'", "'&'", 
		"'('", "')'", "'{'", "'}'", "'*'", "'*='", "'+'", "','", "'-'", "'.'", 
		"'/'", "':'", "'::'", "'<'", "'='", "'=*'", "'>'", "'^'", "'|'", "'~'", 
		"'+='", "'-='", "'/='", "'%='", "'&='", "'|='", "'^='", "';'", "'?'", 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "'$'", undefined, undefined, undefined, undefined, "'--(*'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ADD", "AFTER", "ALL", "ALTER", "AND", "ANY", "APPLY", "AS", 
		"ASC", "AUTHORIZATION", "BACKUP", "BEGIN", "BETWEEN", "BREAK", "BROWSE", 
		"BULK", "BY", "CASCADE", "CASE", "CHECK", "CHECKPOINT", "CLOSE", "CLUSTERED", 
		"COLLATE", "COLUMN", "COMMIT", "COMPUTE", "CONSTRAINT", "CONTAINS", "CONTAINSTABLE", 
		"CONTINUE", "CONVERT", "CREATE", "CROSS", "CURRENT", "CURRENT_DATE", "CURRENT_TIME", 
		"CURRENT_TIMESTAMP", "CURRENT_USER", "CURSOR", "DATABASE", "DBCC", "DEALLOCATE", 
		"DECLARE", "DEFAULT", "DEFINE", "DELETE", "DENY", "DESC", "DISTINCT", 
		"DISTRIBUTED", "DOUBLE", "DROP", "DURATION", "ELSE", "END", "ERRLVL", 
		"ESCAPE", "EXCEPT", "EXEC", "EXECUTE", "EXISTS", "EXIT", "FETCH", "FILE", 
		"FILLFACTOR", "FOR", "FOREIGN", "FREETEXT", "FREETEXTTABLE", "FROM", "FULL", 
		"FUNCTION", "GOTO", "GRANT", "GROUP", "HAVING", "HOLDLOCK", "IDENTITY", 
		"IDENTITY_INSERT", "IDENTITYCOL", "IF", "IN", "INDEX", "INNER", "INSERT", 
		"INTERSECT", "INTO", "IS", "JOIN", "KEY", "KILL", "LEFT", "LIKE", "LIMIT", 
		"LINENO", "MATCH", "MATCH_RECOGNIZE", "MEASURES", "NATIONAL", "NEXT", 
		"NOCHECK", "NONCLUSTERED", "NOT", "NULL", "NULLIF", "OF", "OFF", "OFFSETS", 
		"ON", "OPEN", "OPENDATASOURCE", "OPENQUERY", "OPENROWSET", "OPENXML", 
		"OPTION", "OR", "ORDER", "OUTER", "OVER", "PARTITION", "PATTERN", "PERCENT", 
		"PLAN", "PRIMARY", "PRINT", "PROC", "PROCEDURE", "PUBLIC", "RAISERROR", 
		"READ", "READTEXT", "RECONFIGURE", "REFERENCES", "REPLICATION", "RESTORE", 
		"RESTRICT", "RETURN", "REVOKE", "RIGHT", "ROLLBACK", "ROW", "ROWCOUNT", 
		"ROWGUIDCOL", "RULE", "SAVE", "SCHEMA", "SELECT", "SESSION_USER", "SET", 
		"SETUSER", "SHUTDOWN", "TOKENSKIP", "SOME", "STATISTICS", "SYSTEM_USER", 
		"TABLE", "TEXTSIZE", "THEN", "TIMESTAMP", "TO", "TOP", "TRAN", "TRANSACTION", 
		"TRIGGER", "TRUNCATE", "TSEQUAL", "UNION", "UNIQUE", "UPDATE", "UPDATETEXT", 
		"USE", "USER", "VALUES", "VARYING", "VIEW", "WAITFOR", "WHEN", "WHERE", 
		"WHILE", "WITH", "WRITETEXT", "ARRAY", "BIGINT", "DECIMAL", "BIT", "FLOAT", 
		"DATETIME", "NVARCHAR", "RECORD", "VARBINARY", "Bang", "PercentSign", 
		"Ampersand", "LeftParenthesis", "RightParenthesis", "LeftCurly", "RightCurly", 
		"Star", "MultiplyEquals", "Plus", "Comma", "Minus", "Dot", "Divide", "Colon", 
		"DoubleColon", "LessThan", "EqualsSign", "RightOuterJoin", "GreaterThan", 
		"Circumflex", "VerticalLine", "Tilde", "AddEquals", "SubtractEquals", 
		"DivideEquals", "ModEquals", "BitwiseAndEquals", "BitwiseOrEquals", "BitwiseXorEquals", 
		"Semicolon", "QuestionMark", "Integer", "Real", "Numeric", "HexLiteral", 
		"AsciiStringLiteral", "UnicodeStringLiteral", "SqlCommandIdentifier", 
		"PseudoColumn", "DollarPartition", "Money", "Label", "QuotedIdentifier", 
		"Variable", "OdbcInitiator", "SingleLineComment", "MultilineComment", 
		"WHITESPACES",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SqlParserParser._LITERAL_NAMES, SqlParserParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SqlParserParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "SqlParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return SqlParserParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return SqlParserParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(SqlParserParser._ATN, this);
	}
	// @RuleVersion(0)
	public sql(): SqlContext {
		let _localctx: SqlContext = new SqlContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, SqlParserParser.RULE_sql);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.CREATE || _la === SqlParserParser.SELECT || _la === SqlParserParser.WITH || _la === SqlParserParser.LeftParenthesis || _la === SqlParserParser.Semicolon) {
				{
				{
				this.state = 274;
				this.statement();
				}
				}
				this.state = 279;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 280;
			this.match(SqlParserParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, SqlParserParser.RULE_statement);
		try {
			this.state = 292;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.CREATE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 282;
				this.createTableStatement();
				this.state = 283;
				this.optSemicolons();
				}
				break;
			case SqlParserParser.WITH:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 285;
				this.resultSetDefinitions();
				this.state = 286;
				this.optSemicolons();
				}
				break;
			case SqlParserParser.SELECT:
			case SqlParserParser.LeftParenthesis:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 288;
				this.queryExpression();
				this.state = 289;
				this.optSemicolons();
				}
				break;
			case SqlParserParser.Semicolon:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 291;
				this.empty_statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public empty_statement(): Empty_statementContext {
		let _localctx: Empty_statementContext = new Empty_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, SqlParserParser.RULE_empty_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 294;
			this.match(SqlParserParser.Semicolon);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resultSetDefinitions(): ResultSetDefinitionsContext {
		let _localctx: ResultSetDefinitionsContext = new ResultSetDefinitionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, SqlParserParser.RULE_resultSetDefinitions);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 296;
			this.match(SqlParserParser.WITH);
			this.state = 297;
			this.resultSetDefinition();
			this.state = 302;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 298;
				this.match(SqlParserParser.Comma);
				this.state = 299;
				this.resultSetDefinition();
				}
				}
				this.state = 304;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resultSetDefinition(): ResultSetDefinitionContext {
		let _localctx: ResultSetDefinitionContext = new ResultSetDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, SqlParserParser.RULE_resultSetDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 305;
			this.identifier();
			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.LeftParenthesis) {
				{
				this.state = 306;
				this.columnNameList();
				}
			}

			this.state = 309;
			this.match(SqlParserParser.AS);
			this.state = 310;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 311;
			this.queryExpression();
			this.state = 312;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queryExpression(): QueryExpressionContext {
		let _localctx: QueryExpressionContext = new QueryExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, SqlParserParser.RULE_queryExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 314;
			this.queryExpressionUnit();
			this.state = 322;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.UNION) {
				{
				{
				this.state = 315;
				this.match(SqlParserParser.UNION);
				this.state = 317;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.ALL) {
					{
					this.state = 316;
					this.match(SqlParserParser.ALL);
					}
				}

				this.state = 319;
				this.queryExpressionUnit();
				}
				}
				this.state = 324;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queryExpressionUnit(): QueryExpressionUnitContext {
		let _localctx: QueryExpressionUnitContext = new QueryExpressionUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, SqlParserParser.RULE_queryExpressionUnit);
		try {
			this.state = 327;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.SELECT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 325;
				this.querySpecification();
				}
				break;
			case SqlParserParser.LeftParenthesis:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 326;
				this.queryParenthesis();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queryParenthesis(): QueryParenthesisContext {
		let _localctx: QueryParenthesisContext = new QueryParenthesisContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, SqlParserParser.RULE_queryParenthesis);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 329;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 330;
			this.queryExpression();
			this.state = 331;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public querySpecification(): QuerySpecificationContext {
		let _localctx: QuerySpecificationContext = new QuerySpecificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, SqlParserParser.RULE_querySpecification);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 333;
			this.match(SqlParserParser.SELECT);
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.ALL || _la === SqlParserParser.DISTINCT) {
				{
				this.state = 334;
				this.uniqueRowFilter();
				}
			}

			this.state = 337;
			this.selectExpression();
			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 338;
				this.match(SqlParserParser.Comma);
				this.state = 339;
				this.selectExpression();
				}
				}
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 346;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.INTO) {
				{
				this.state = 345;
				this.intoClause();
				}
			}

			this.state = 348;
			this.fromClause();
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.WHERE) {
				{
				this.state = 349;
				this.whereClause();
				}
			}

			this.state = 353;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.GROUP) {
				{
				this.state = 352;
				this.groupByClause();
				}
			}

			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.HAVING) {
				{
				this.state = 355;
				this.havingClause();
				}
			}

			this.state = 359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.MATCH_RECOGNIZE) {
				{
				this.state = 358;
				this.matchRecognize();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnNameList(): ColumnNameListContext {
		let _localctx: ColumnNameListContext = new ColumnNameListContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, SqlParserParser.RULE_columnNameList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 361;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 362;
			this.identifier();
			this.state = 367;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 363;
				this.match(SqlParserParser.Comma);
				this.state = 364;
				this.identifier();
				}
				}
				this.state = 369;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 370;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderByClauseUnit(): OrderByClauseUnitContext {
		let _localctx: OrderByClauseUnitContext = new OrderByClauseUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, SqlParserParser.RULE_orderByClauseUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 372;
			this.match(SqlParserParser.ORDER);
			this.state = 373;
			this.match(SqlParserParser.BY);
			this.state = 374;
			this.expressionWithSortOrder();
			this.state = 379;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 375;
				this.match(SqlParserParser.Comma);
				this.state = 376;
				this.expressionWithSortOrder();
				}
				}
				this.state = 381;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionWithSortOrder(): ExpressionWithSortOrderContext {
		let _localctx: ExpressionWithSortOrderContext = new ExpressionWithSortOrderContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, SqlParserParser.RULE_expressionWithSortOrder);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 382;
			this.expression();
			this.state = 384;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.ASC || _la === SqlParserParser.DESC) {
				{
				this.state = 383;
				this.orderByOption();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderByOption(): OrderByOptionContext {
		let _localctx: OrderByOptionContext = new OrderByOptionContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, SqlParserParser.RULE_orderByOption);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 386;
			_la = this._input.LA(1);
			if (!(_la === SqlParserParser.ASC || _la === SqlParserParser.DESC)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public groupByClause(): GroupByClauseContext {
		let _localctx: GroupByClauseContext = new GroupByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, SqlParserParser.RULE_groupByClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 388;
			this.match(SqlParserParser.GROUP);
			this.state = 389;
			this.match(SqlParserParser.BY);
			this.state = 390;
			this.groupByItemList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public groupByItemList(): GroupByItemListContext {
		let _localctx: GroupByItemListContext = new GroupByItemListContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, SqlParserParser.RULE_groupByItemList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 392;
			this.groupByItem();
			this.state = 397;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 393;
				this.match(SqlParserParser.Comma);
				this.state = 394;
				this.groupByItem();
				}
				}
				this.state = 399;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public groupByItem(): GroupByItemContext {
		let _localctx: GroupByItemContext = new GroupByItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, SqlParserParser.RULE_groupByItem);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 400;
			this.simpleGroupByItem();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleGroupByItem(): SimpleGroupByItemContext {
		let _localctx: SimpleGroupByItemContext = new SimpleGroupByItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, SqlParserParser.RULE_simpleGroupByItem);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 402;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whereClause(): WhereClauseContext {
		let _localctx: WhereClauseContext = new WhereClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, SqlParserParser.RULE_whereClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this.match(SqlParserParser.WHERE);
			this.state = 405;
			this.whereConditionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whereConditionList(): WhereConditionListContext {
		let _localctx: WhereConditionListContext = new WhereConditionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, SqlParserParser.RULE_whereConditionList);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 407;
			this.booleanExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpression(): BooleanExpressionContext {
		let _localctx: BooleanExpressionContext = new BooleanExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, SqlParserParser.RULE_booleanExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 409;
			this.booleanExpressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpressionWithFlags(): BooleanExpressionWithFlagsContext {
		let _localctx: BooleanExpressionWithFlagsContext = new BooleanExpressionWithFlagsContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, SqlParserParser.RULE_booleanExpressionWithFlags);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 411;
			this.booleanExpressionOr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpressionOr(): BooleanExpressionOrContext {
		let _localctx: BooleanExpressionOrContext = new BooleanExpressionOrContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, SqlParserParser.RULE_booleanExpressionOr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 413;
			this.booleanExpressionAnd();
			this.state = 418;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.OR) {
				{
				{
				this.state = 414;
				this.match(SqlParserParser.OR);
				this.state = 415;
				this.booleanExpressionAnd();
				}
				}
				this.state = 420;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpressionAnd(): BooleanExpressionAndContext {
		let _localctx: BooleanExpressionAndContext = new BooleanExpressionAndContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, SqlParserParser.RULE_booleanExpressionAnd);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 421;
			this.booleanExpressionUnary();
			this.state = 426;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.AND) {
				{
				{
				this.state = 422;
				this.match(SqlParserParser.AND);
				this.state = 423;
				this.booleanExpressionUnary();
				}
				}
				this.state = 428;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpressionUnary(): BooleanExpressionUnaryContext {
		let _localctx: BooleanExpressionUnaryContext = new BooleanExpressionUnaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, SqlParserParser.RULE_booleanExpressionUnary);
		try {
			this.state = 432;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.NOT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 429;
				this.match(SqlParserParser.NOT);
				this.state = 430;
				this.booleanExpressionUnary();
				}
				break;
			case SqlParserParser.CASE:
			case SqlParserParser.DURATION:
			case SqlParserParser.LEFT:
			case SqlParserParser.NULL:
			case SqlParserParser.NULLIF:
			case SqlParserParser.RIGHT:
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.LeftParenthesis:
			case SqlParserParser.Plus:
			case SqlParserParser.Minus:
			case SqlParserParser.Tilde:
			case SqlParserParser.Integer:
			case SqlParserParser.Real:
			case SqlParserParser.Numeric:
			case SqlParserParser.HexLiteral:
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 431;
				this.booleanExpressionPrimary();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpressionPrimary(): BooleanExpressionPrimaryContext {
		let _localctx: BooleanExpressionPrimaryContext = new BooleanExpressionPrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, SqlParserParser.RULE_booleanExpressionPrimary);
		let _la: number;
		try {
			this.state = 450;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 434;
				this.booleanExpressionParenthesis();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 435;
				this.expressionWithFlags();
				this.state = 448;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SqlParserParser.Bang:
				case SqlParserParser.LessThan:
				case SqlParserParser.EqualsSign:
				case SqlParserParser.GreaterThan:
					{
					this.state = 436;
					this.comparisonOperator();
					{
					this.state = 437;
					this.comparisonPredicate();
					}
					}
					break;
				case SqlParserParser.IS:
					{
					this.state = 439;
					this.nullPredicate();
					}
					break;
				case SqlParserParser.BETWEEN:
				case SqlParserParser.IN:
				case SqlParserParser.LIKE:
				case SqlParserParser.NOT:
					{
					{
					this.state = 441;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === SqlParserParser.NOT) {
						{
						this.state = 440;
						this.match(SqlParserParser.NOT);
						}
					}

					this.state = 446;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case SqlParserParser.BETWEEN:
						{
						this.state = 443;
						this.betweenPredicate();
						}
						break;
					case SqlParserParser.LIKE:
						{
						this.state = 444;
						this.likePredicate();
						}
						break;
					case SqlParserParser.IN:
						{
						this.state = 445;
						this.inPredicate();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public likePredicate(): LikePredicateContext {
		let _localctx: LikePredicateContext = new LikePredicateContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, SqlParserParser.RULE_likePredicate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 452;
			this.match(SqlParserParser.LIKE);
			this.state = 453;
			this.expressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public betweenPredicate(): BetweenPredicateContext {
		let _localctx: BetweenPredicateContext = new BetweenPredicateContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, SqlParserParser.RULE_betweenPredicate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 455;
			this.match(SqlParserParser.BETWEEN);
			this.state = 456;
			this.expressionWithFlags();
			this.state = 457;
			this.match(SqlParserParser.AND);
			this.state = 458;
			this.expressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inPredicate(): InPredicateContext {
		let _localctx: InPredicateContext = new InPredicateContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, SqlParserParser.RULE_inPredicate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 460;
			this.match(SqlParserParser.IN);
			this.state = 461;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 462;
			this.expressionList();
			this.state = 463;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, SqlParserParser.RULE_expressionList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 465;
			this.expression();
			this.state = 470;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 466;
					this.match(SqlParserParser.Comma);
					this.state = 467;
					this.expression();
					}
					}
				}
				this.state = 472;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nullPredicate(): NullPredicateContext {
		let _localctx: NullPredicateContext = new NullPredicateContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, SqlParserParser.RULE_nullPredicate);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 473;
			this.match(SqlParserParser.IS);
			this.state = 475;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.NOT) {
				{
				this.state = 474;
				this.match(SqlParserParser.NOT);
				}
			}

			this.state = 477;
			this.match(SqlParserParser.NULL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparisonPredicate(): ComparisonPredicateContext {
		let _localctx: ComparisonPredicateContext = new ComparisonPredicateContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, SqlParserParser.RULE_comparisonPredicate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 479;
			this.expressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparisonOperator(): ComparisonOperatorContext {
		let _localctx: ComparisonOperatorContext = new ComparisonOperatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, SqlParserParser.RULE_comparisonOperator);
		let _la: number;
		try {
			this.state = 492;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.EqualsSign:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 481;
				this.match(SqlParserParser.EqualsSign);
				}
				break;
			case SqlParserParser.GreaterThan:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 482;
				this.match(SqlParserParser.GreaterThan);
				this.state = 484;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.EqualsSign) {
					{
					this.state = 483;
					this.match(SqlParserParser.EqualsSign);
					}
				}

				}
				break;
			case SqlParserParser.LessThan:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 486;
				this.match(SqlParserParser.LessThan);
				this.state = 488;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.EqualsSign || _la === SqlParserParser.GreaterThan) {
					{
					this.state = 487;
					_la = this._input.LA(1);
					if (!(_la === SqlParserParser.EqualsSign || _la === SqlParserParser.GreaterThan)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
				}

				}
				break;
			case SqlParserParser.Bang:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 490;
				this.match(SqlParserParser.Bang);
				this.state = 491;
				_la = this._input.LA(1);
				if (!(((((_la - 208)) & ~0x1F) === 0 && ((1 << (_la - 208)) & ((1 << (SqlParserParser.LessThan - 208)) | (1 << (SqlParserParser.EqualsSign - 208)) | (1 << (SqlParserParser.GreaterThan - 208)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionWithFlags(): ExpressionWithFlagsContext {
		let _localctx: ExpressionWithFlagsContext = new ExpressionWithFlagsContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, SqlParserParser.RULE_expressionWithFlags);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 494;
			this.expressionBinaryPri2();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionBinaryPri2(): ExpressionBinaryPri2Context {
		let _localctx: ExpressionBinaryPri2Context = new ExpressionBinaryPri2Context(this._ctx, this.state);
		this.enterRule(_localctx, 66, SqlParserParser.RULE_expressionBinaryPri2);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 496;
			this.expressionBinaryPri1();
			this.state = 509;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 194)) & ~0x1F) === 0 && ((1 << (_la - 194)) & ((1 << (SqlParserParser.Ampersand - 194)) | (1 << (SqlParserParser.Plus - 194)) | (1 << (SqlParserParser.Minus - 194)) | (1 << (SqlParserParser.Circumflex - 194)) | (1 << (SqlParserParser.VerticalLine - 194)))) !== 0)) {
				{
				this.state = 507;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SqlParserParser.Plus:
					{
					this.state = 497;
					this.match(SqlParserParser.Plus);
					this.state = 498;
					this.expressionBinaryPri1();
					}
					break;
				case SqlParserParser.Minus:
					{
					this.state = 499;
					this.match(SqlParserParser.Minus);
					this.state = 500;
					this.expressionBinaryPri1();
					}
					break;
				case SqlParserParser.Ampersand:
					{
					this.state = 501;
					this.match(SqlParserParser.Ampersand);
					this.state = 502;
					this.expressionBinaryPri1();
					}
					break;
				case SqlParserParser.VerticalLine:
					{
					this.state = 503;
					this.match(SqlParserParser.VerticalLine);
					this.state = 504;
					this.expressionBinaryPri1();
					}
					break;
				case SqlParserParser.Circumflex:
					{
					this.state = 505;
					this.match(SqlParserParser.Circumflex);
					this.state = 506;
					this.expressionBinaryPri1();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 511;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionBinaryPri1(): ExpressionBinaryPri1Context {
		let _localctx: ExpressionBinaryPri1Context = new ExpressionBinaryPri1Context(this._ctx, this.state);
		this.enterRule(_localctx, 68, SqlParserParser.RULE_expressionBinaryPri1);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 512;
			this.expressionUnary();
			this.state = 521;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 193)) & ~0x1F) === 0 && ((1 << (_la - 193)) & ((1 << (SqlParserParser.PercentSign - 193)) | (1 << (SqlParserParser.Star - 193)) | (1 << (SqlParserParser.Divide - 193)))) !== 0)) {
				{
				this.state = 519;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SqlParserParser.Star:
					{
					this.state = 513;
					this.match(SqlParserParser.Star);
					this.state = 514;
					this.expressionUnary();
					}
					break;
				case SqlParserParser.Divide:
					{
					this.state = 515;
					this.match(SqlParserParser.Divide);
					this.state = 516;
					this.expressionUnary();
					}
					break;
				case SqlParserParser.PercentSign:
					{
					this.state = 517;
					this.match(SqlParserParser.PercentSign);
					this.state = 518;
					this.expressionUnary();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 523;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionUnary(): ExpressionUnaryContext {
		let _localctx: ExpressionUnaryContext = new ExpressionUnaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, SqlParserParser.RULE_expressionUnary);
		let _la: number;
		try {
			this.state = 527;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.Plus:
			case SqlParserParser.Minus:
			case SqlParserParser.Tilde:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 524;
				_la = this._input.LA(1);
				if (!(((((_la - 201)) & ~0x1F) === 0 && ((1 << (_la - 201)) & ((1 << (SqlParserParser.Plus - 201)) | (1 << (SqlParserParser.Minus - 201)) | (1 << (SqlParserParser.Tilde - 201)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 525;
				this.expressionUnary();
				}
				break;
			case SqlParserParser.CASE:
			case SqlParserParser.DURATION:
			case SqlParserParser.LEFT:
			case SqlParserParser.NULL:
			case SqlParserParser.NULLIF:
			case SqlParserParser.RIGHT:
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.LeftParenthesis:
			case SqlParserParser.Integer:
			case SqlParserParser.Real:
			case SqlParserParser.Numeric:
			case SqlParserParser.HexLiteral:
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 526;
				this.expressionWithClrElements();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionWithClrElements(): ExpressionWithClrElementsContext {
		let _localctx: ExpressionWithClrElementsContext = new ExpressionWithClrElementsContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, SqlParserParser.RULE_expressionWithClrElements);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 529;
			this.expressionPrimary();
			this.state = 537;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Dot) {
				{
				{
				this.state = 530;
				this.match(SqlParserParser.Dot);
				{
				this.state = 531;
				this.identifier();
				{
				this.state = 533;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
				case 1:
					{
					this.state = 532;
					this.expressionWithClrElementsFunctionCallPart();
					}
					break;
				}
				}
				}
				}
				}
				this.state = 539;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonQuotedIdentifier(): NonQuotedIdentifierContext {
		let _localctx: NonQuotedIdentifierContext = new NonQuotedIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, SqlParserParser.RULE_nonQuotedIdentifier);
		try {
			this.state = 547;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.SqlCommandIdentifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 540;
				this.match(SqlParserParser.SqlCommandIdentifier);
				}
				break;
			case SqlParserParser.PseudoColumn:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 541;
				this.match(SqlParserParser.PseudoColumn);
				}
				break;
			case SqlParserParser.DollarPartition:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 542;
				this.match(SqlParserParser.DollarPartition);
				}
				break;
			case SqlParserParser.Money:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 543;
				this.match(SqlParserParser.Money);
				}
				break;
			case SqlParserParser.Label:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 544;
				this.match(SqlParserParser.Label);
				}
				break;
			case SqlParserParser.TIMESTAMP:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 545;
				this.match(SqlParserParser.TIMESTAMP);
				}
				break;
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 546;
				this.scalarDataType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionWithClrElementsFunctionCallPart(): ExpressionWithClrElementsFunctionCallPartContext {
		let _localctx: ExpressionWithClrElementsFunctionCallPartContext = new ExpressionWithClrElementsFunctionCallPartContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, SqlParserParser.RULE_expressionWithClrElementsFunctionCallPart);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 549;
			this.parenthesizedOptExpressionWithDefaultList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parenthesizedOptExpressionWithDefaultList(): ParenthesizedOptExpressionWithDefaultListContext {
		let _localctx: ParenthesizedOptExpressionWithDefaultListContext = new ParenthesizedOptExpressionWithDefaultListContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, SqlParserParser.RULE_parenthesizedOptExpressionWithDefaultList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 551;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 553;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.CASE || _la === SqlParserParser.DURATION || ((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & ((1 << (SqlParserParser.LEFT - 93)) | (1 << (SqlParserParser.NULL - 93)) | (1 << (SqlParserParser.NULLIF - 93)))) !== 0) || _la === SqlParserParser.RIGHT || _la === SqlParserParser.TIMESTAMP || ((((_la - 183)) & ~0x1F) === 0 && ((1 << (_la - 183)) & ((1 << (SqlParserParser.ARRAY - 183)) | (1 << (SqlParserParser.BIGINT - 183)) | (1 << (SqlParserParser.DECIMAL - 183)) | (1 << (SqlParserParser.BIT - 183)) | (1 << (SqlParserParser.FLOAT - 183)) | (1 << (SqlParserParser.DATETIME - 183)) | (1 << (SqlParserParser.NVARCHAR - 183)) | (1 << (SqlParserParser.RECORD - 183)) | (1 << (SqlParserParser.VARBINARY - 183)) | (1 << (SqlParserParser.LeftParenthesis - 183)) | (1 << (SqlParserParser.Plus - 183)) | (1 << (SqlParserParser.Minus - 183)) | (1 << (SqlParserParser.Tilde - 183)))) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & ((1 << (SqlParserParser.Integer - 224)) | (1 << (SqlParserParser.Real - 224)) | (1 << (SqlParserParser.Numeric - 224)) | (1 << (SqlParserParser.HexLiteral - 224)) | (1 << (SqlParserParser.AsciiStringLiteral - 224)) | (1 << (SqlParserParser.UnicodeStringLiteral - 224)) | (1 << (SqlParserParser.SqlCommandIdentifier - 224)) | (1 << (SqlParserParser.PseudoColumn - 224)) | (1 << (SqlParserParser.DollarPartition - 224)) | (1 << (SqlParserParser.Money - 224)) | (1 << (SqlParserParser.Label - 224)) | (1 << (SqlParserParser.QuotedIdentifier - 224)))) !== 0)) {
				{
				this.state = 552;
				this.expressionWithDefaultList();
				}
			}

			this.state = 555;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionWithDefaultList(): ExpressionWithDefaultListContext {
		let _localctx: ExpressionWithDefaultListContext = new ExpressionWithDefaultListContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, SqlParserParser.RULE_expressionWithDefaultList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 557;
			this.expressionWithDefault();
			this.state = 562;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 558;
				this.match(SqlParserParser.Comma);
				this.state = 559;
				this.expressionWithDefault();
				}
				}
				this.state = 564;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionWithDefault(): ExpressionWithDefaultContext {
		let _localctx: ExpressionWithDefaultContext = new ExpressionWithDefaultContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, SqlParserParser.RULE_expressionWithDefault);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 565;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionPrimary(): ExpressionPrimaryContext {
		let _localctx: ExpressionPrimaryContext = new ExpressionPrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, SqlParserParser.RULE_expressionPrimary);
		try {
			this.state = 575;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 567;
				this.literal();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 568;
				this.castCall();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 569;
				this.builtInFunctionCall();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 570;
				this.scalarDataType();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 571;
				this.columnOrFunctionCall();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 572;
				this.nullIfExpression();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 573;
				this.caseExpression();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 574;
				this.parenthesisDisambiguatorForExpressions();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parenthesisDisambiguatorForExpressions(): ParenthesisDisambiguatorForExpressionsContext {
		let _localctx: ParenthesisDisambiguatorForExpressionsContext = new ParenthesisDisambiguatorForExpressionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, SqlParserParser.RULE_parenthesisDisambiguatorForExpressions);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 577;
			this.expressionParenthesis();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionParenthesis(): ExpressionParenthesisContext {
		let _localctx: ExpressionParenthesisContext = new ExpressionParenthesisContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, SqlParserParser.RULE_expressionParenthesis);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 579;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 580;
			this.expressionWithFlags();
			this.state = 581;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nullIfExpression(): NullIfExpressionContext {
		let _localctx: NullIfExpressionContext = new NullIfExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, SqlParserParser.RULE_nullIfExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 583;
			this.match(SqlParserParser.NULLIF);
			this.state = 584;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 585;
			this.expressionWithFlags();
			this.state = 586;
			this.match(SqlParserParser.Comma);
			this.state = 587;
			this.expressionWithFlags();
			this.state = 588;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public caseExpression(): CaseExpressionContext {
		let _localctx: CaseExpressionContext = new CaseExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, SqlParserParser.RULE_caseExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 590;
			this.match(SqlParserParser.CASE);
			this.state = 595;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.CASE:
			case SqlParserParser.DURATION:
			case SqlParserParser.LEFT:
			case SqlParserParser.NULL:
			case SqlParserParser.NULLIF:
			case SqlParserParser.RIGHT:
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.LeftParenthesis:
			case SqlParserParser.Plus:
			case SqlParserParser.Minus:
			case SqlParserParser.Tilde:
			case SqlParserParser.Integer:
			case SqlParserParser.Real:
			case SqlParserParser.Numeric:
			case SqlParserParser.HexLiteral:
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				{
				this.state = 591;
				this.expression();
				this.state = 592;
				this.simpleCaseExpression();
				}
				break;
			case SqlParserParser.WHEN:
				{
				this.state = 594;
				this.searchedCaseExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 599;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.ELSE) {
				{
				this.state = 597;
				this.match(SqlParserParser.ELSE);
				this.state = 598;
				this.expression();
				}
			}

			this.state = 601;
			this.match(SqlParserParser.END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchedCaseExpression(): SearchedCaseExpressionContext {
		let _localctx: SearchedCaseExpressionContext = new SearchedCaseExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, SqlParserParser.RULE_searchedCaseExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 604;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 603;
				this.searchedWhenExpression();
				}
				}
				this.state = 606;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === SqlParserParser.WHEN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchedWhenExpression(): SearchedWhenExpressionContext {
		let _localctx: SearchedWhenExpressionContext = new SearchedWhenExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, SqlParserParser.RULE_searchedWhenExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 608;
			this.match(SqlParserParser.WHEN);
			this.state = 609;
			this.booleanExpressionWithFlags();
			this.state = 610;
			this.match(SqlParserParser.THEN);
			this.state = 611;
			this.expressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleCaseExpression(): SimpleCaseExpressionContext {
		let _localctx: SimpleCaseExpressionContext = new SimpleCaseExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, SqlParserParser.RULE_simpleCaseExpression);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 614;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 613;
				this.simpleWhenClauseUnit();
				}
				}
				this.state = 616;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === SqlParserParser.WHEN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleWhenClauseUnit(): SimpleWhenClauseUnitContext {
		let _localctx: SimpleWhenClauseUnitContext = new SimpleWhenClauseUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, SqlParserParser.RULE_simpleWhenClauseUnit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 618;
			this.match(SqlParserParser.WHEN);
			this.state = 619;
			this.expressionWithFlags();
			this.state = 620;
			this.match(SqlParserParser.THEN);
			this.state = 621;
			this.expressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnOrFunctionCall(): ColumnOrFunctionCallContext {
		let _localctx: ColumnOrFunctionCallContext = new ColumnOrFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, SqlParserParser.RULE_columnOrFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 623;
			this.multiPartIdentifier();
			this.state = 626;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				this.state = 624;
				this.userFunctionCall();
				}
				break;

			case 2:
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public userFunctionCall(): UserFunctionCallContext {
		let _localctx: UserFunctionCallContext = new UserFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, SqlParserParser.RULE_userFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 628;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 633;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.CASE:
			case SqlParserParser.DURATION:
			case SqlParserParser.LEFT:
			case SqlParserParser.NULL:
			case SqlParserParser.NULLIF:
			case SqlParserParser.RIGHT:
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.LeftParenthesis:
			case SqlParserParser.Plus:
			case SqlParserParser.Minus:
			case SqlParserParser.Tilde:
			case SqlParserParser.Integer:
			case SqlParserParser.Real:
			case SqlParserParser.Numeric:
			case SqlParserParser.HexLiteral:
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				{
				this.state = 629;
				this.expressionWithDefaultList();
				}
				break;
			case SqlParserParser.ALL:
			case SqlParserParser.DISTINCT:
				{
				this.state = 630;
				this.uniqueRowFilter();
				this.state = 631;
				this.expressionList();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 635;
			this.match(SqlParserParser.RightParenthesis);
			this.state = 637;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				this.state = 636;
				this.overClauseNoOrderBy();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiPartIdentifier(): MultiPartIdentifierContext {
		let _localctx: MultiPartIdentifierContext = new MultiPartIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, SqlParserParser.RULE_multiPartIdentifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 639;
			this.identifierList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public builtInFunctionCall(): BuiltInFunctionCallContext {
		let _localctx: BuiltInFunctionCallContext = new BuiltInFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, SqlParserParser.RULE_builtInFunctionCall);
		let _la: number;
		try {
			this.state = 661;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 641;
				this.nonQuotedIdentifier();
				this.state = 642;
				this.match(SqlParserParser.LeftParenthesis);
				this.state = 645;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SqlParserParser.CASE:
				case SqlParserParser.DURATION:
				case SqlParserParser.LEFT:
				case SqlParserParser.NULL:
				case SqlParserParser.NULLIF:
				case SqlParserParser.RIGHT:
				case SqlParserParser.TIMESTAMP:
				case SqlParserParser.ARRAY:
				case SqlParserParser.BIGINT:
				case SqlParserParser.DECIMAL:
				case SqlParserParser.BIT:
				case SqlParserParser.FLOAT:
				case SqlParserParser.DATETIME:
				case SqlParserParser.NVARCHAR:
				case SqlParserParser.RECORD:
				case SqlParserParser.VARBINARY:
				case SqlParserParser.LeftParenthesis:
				case SqlParserParser.RightParenthesis:
				case SqlParserParser.Star:
				case SqlParserParser.Plus:
				case SqlParserParser.Minus:
				case SqlParserParser.Tilde:
				case SqlParserParser.Integer:
				case SqlParserParser.Real:
				case SqlParserParser.Numeric:
				case SqlParserParser.HexLiteral:
				case SqlParserParser.AsciiStringLiteral:
				case SqlParserParser.UnicodeStringLiteral:
				case SqlParserParser.SqlCommandIdentifier:
				case SqlParserParser.PseudoColumn:
				case SqlParserParser.DollarPartition:
				case SqlParserParser.Money:
				case SqlParserParser.Label:
				case SqlParserParser.QuotedIdentifier:
					{
					this.state = 643;
					this.regularBuiltInFunctionCall();
					}
					break;
				case SqlParserParser.ALL:
				case SqlParserParser.DISTINCT:
					{
					this.state = 644;
					this.aggregateBuiltInFunctionCall();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 647;
				this.durationClauseUnit();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 648;
				this.identifier();
				this.state = 649;
				this.match(SqlParserParser.Dot);
				this.state = 650;
				this.match(SqlParserParser.TIMESTAMP);
				this.state = 651;
				this.match(SqlParserParser.LeftParenthesis);
				this.state = 652;
				this.match(SqlParserParser.RightParenthesis);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 654;
				this.identifier();
				this.state = 655;
				this.match(SqlParserParser.Dot);
				this.state = 656;
				this.match(SqlParserParser.TIMESTAMP);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 658;
				_la = this._input.LA(1);
				if (!(_la === SqlParserParser.LEFT || _la === SqlParserParser.RIGHT)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 659;
				this.match(SqlParserParser.LeftParenthesis);
				this.state = 660;
				this.regularBuiltInFunctionCall();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public regularBuiltInFunctionCall(): RegularBuiltInFunctionCallContext {
		let _localctx: RegularBuiltInFunctionCallContext = new RegularBuiltInFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, SqlParserParser.RULE_regularBuiltInFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 665;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.CASE:
			case SqlParserParser.DURATION:
			case SqlParserParser.LEFT:
			case SqlParserParser.NULL:
			case SqlParserParser.NULLIF:
			case SqlParserParser.RIGHT:
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.LeftParenthesis:
			case SqlParserParser.Plus:
			case SqlParserParser.Minus:
			case SqlParserParser.Tilde:
			case SqlParserParser.Integer:
			case SqlParserParser.Real:
			case SqlParserParser.Numeric:
			case SqlParserParser.HexLiteral:
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				{
				this.state = 663;
				this.expressionList();
				}
				break;
			case SqlParserParser.Star:
				{
				this.state = 664;
				this.starColumnReferenceExpression();
				}
				break;
			case SqlParserParser.RightParenthesis:
				break;
			default:
				break;
			}
			this.state = 667;
			this.match(SqlParserParser.RightParenthesis);
			this.state = 669;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				{
				this.state = 668;
				this.overClauseUnit();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aggregateBuiltInFunctionCall(): AggregateBuiltInFunctionCallContext {
		let _localctx: AggregateBuiltInFunctionCallContext = new AggregateBuiltInFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, SqlParserParser.RULE_aggregateBuiltInFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 671;
			this.uniqueRowFilter();
			this.state = 672;
			this.expression();
			this.state = 673;
			this.match(SqlParserParser.RightParenthesis);
			this.state = 675;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 674;
				this.overClauseNoOrderBy();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public overClauseUnit(): OverClauseUnitContext {
		let _localctx: OverClauseUnitContext = new OverClauseUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, SqlParserParser.RULE_overClauseUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 677;
			this.overClauseBeginning();
			this.state = 679;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.ORDER) {
				{
				this.state = 678;
				this.orderByClauseUnit();
				}
			}

			this.state = 682;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.LIMIT) {
				{
				this.state = 681;
				this.limitDurationClauseUnit();
				}
			}

			this.state = 685;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.WHEN) {
				{
				this.state = 684;
				this.overWhenClauseUnit();
				}
			}

			this.state = 687;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public overClauseNoOrderBy(): OverClauseNoOrderByContext {
		let _localctx: OverClauseNoOrderByContext = new OverClauseNoOrderByContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, SqlParserParser.RULE_overClauseNoOrderBy);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 689;
			this.overClauseBeginning();
			this.state = 690;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public overClauseBeginning(): OverClauseBeginningContext {
		let _localctx: OverClauseBeginningContext = new OverClauseBeginningContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, SqlParserParser.RULE_overClauseBeginning);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 692;
			this.match(SqlParserParser.OVER);
			this.state = 693;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 695;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.PARTITION) {
				{
				this.state = 694;
				this.partitionBy();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public partitionBy(): PartitionByContext {
		let _localctx: PartitionByContext = new PartitionByContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, SqlParserParser.RULE_partitionBy);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			this.match(SqlParserParser.PARTITION);
			this.state = 698;
			this.match(SqlParserParser.BY);
			this.state = 699;
			this.partitionByItemList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public partitionByItemList(): PartitionByItemListContext {
		let _localctx: PartitionByItemListContext = new PartitionByItemListContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, SqlParserParser.RULE_partitionByItemList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 701;
			this.partitionByItem();
			this.state = 706;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 702;
					this.match(SqlParserParser.Comma);
					this.state = 703;
					this.partitionByItem();
					}
					}
				}
				this.state = 708;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public partitionByItem(): PartitionByItemContext {
		let _localctx: PartitionByItemContext = new PartitionByItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, SqlParserParser.RULE_partitionByItem);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 709;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uniqueRowFilter(): UniqueRowFilterContext {
		let _localctx: UniqueRowFilterContext = new UniqueRowFilterContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, SqlParserParser.RULE_uniqueRowFilter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 711;
			_la = this._input.LA(1);
			if (!(_la === SqlParserParser.ALL || _la === SqlParserParser.DISTINCT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public overWhenClauseUnit(): OverWhenClauseUnitContext {
		let _localctx: OverWhenClauseUnitContext = new OverWhenClauseUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, SqlParserParser.RULE_overWhenClauseUnit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 713;
			this.match(SqlParserParser.WHEN);
			this.state = 714;
			this.booleanExpressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public limitDurationClauseUnit(): LimitDurationClauseUnitContext {
		let _localctx: LimitDurationClauseUnitContext = new LimitDurationClauseUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, SqlParserParser.RULE_limitDurationClauseUnit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 716;
			this.match(SqlParserParser.LIMIT);
			this.state = 717;
			this.durationClauseUnit();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public durationClauseUnit(): DurationClauseUnitContext {
		let _localctx: DurationClauseUnitContext = new DurationClauseUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, SqlParserParser.RULE_durationClauseUnit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 719;
			this.match(SqlParserParser.DURATION);
			this.state = 720;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 721;
			this.expressionList();
			this.state = 722;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public starColumnReferenceExpression(): StarColumnReferenceExpressionContext {
		let _localctx: StarColumnReferenceExpressionContext = new StarColumnReferenceExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, SqlParserParser.RULE_starColumnReferenceExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 724;
			this.match(SqlParserParser.Star);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public castCall(): CastCallContext {
		let _localctx: CastCallContext = new CastCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, SqlParserParser.RULE_castCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 726;
			this.nonQuotedIdentifier();
			this.state = 727;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 728;
			this.expression();
			this.state = 729;
			this.match(SqlParserParser.AS);
			this.state = 730;
			this.scalarDataType();
			this.state = 731;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, SqlParserParser.RULE_literal);
		try {
			this.state = 740;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.Integer:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 733;
				this.integer();
				}
				break;
			case SqlParserParser.Numeric:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 734;
				this.numeric();
				}
				break;
			case SqlParserParser.Real:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 735;
				this.real();
				}
				break;
			case SqlParserParser.Money:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 736;
				this.moneyLiteral();
				}
				break;
			case SqlParserParser.HexLiteral:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 737;
				this.binary();
				}
				break;
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 738;
				this.stringLiteral();
				}
				break;
			case SqlParserParser.NULL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 739;
				this.nullLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public real(): RealContext {
		let _localctx: RealContext = new RealContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, SqlParserParser.RULE_real);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 742;
			this.match(SqlParserParser.Real);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public moneyLiteral(): MoneyLiteralContext {
		let _localctx: MoneyLiteralContext = new MoneyLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, SqlParserParser.RULE_moneyLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			this.match(SqlParserParser.Money);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public binary(): BinaryContext {
		let _localctx: BinaryContext = new BinaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, SqlParserParser.RULE_binary);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 746;
			this.match(SqlParserParser.HexLiteral);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nullLiteral(): NullLiteralContext {
		let _localctx: NullLiteralContext = new NullLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, SqlParserParser.RULE_nullLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 748;
			this.match(SqlParserParser.NULL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpressionParenthesis(): BooleanExpressionParenthesisContext {
		let _localctx: BooleanExpressionParenthesisContext = new BooleanExpressionParenthesisContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, SqlParserParser.RULE_booleanExpressionParenthesis);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 750;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 751;
			this.booleanExpression();
			this.state = 752;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectColumn(): SelectColumnContext {
		let _localctx: SelectColumnContext = new SelectColumnContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, SqlParserParser.RULE_selectColumn);
		let _la: number;
		try {
			this.state = 765;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 754;
				this.selectColumnExpression();
				this.state = 759;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.AS || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (SqlParserParser.TIMESTAMP - 160)) | (1 << (SqlParserParser.ARRAY - 160)) | (1 << (SqlParserParser.BIGINT - 160)) | (1 << (SqlParserParser.DECIMAL - 160)) | (1 << (SqlParserParser.BIT - 160)) | (1 << (SqlParserParser.FLOAT - 160)) | (1 << (SqlParserParser.DATETIME - 160)) | (1 << (SqlParserParser.NVARCHAR - 160)) | (1 << (SqlParserParser.RECORD - 160)) | (1 << (SqlParserParser.VARBINARY - 160)))) !== 0) || ((((_la - 228)) & ~0x1F) === 0 && ((1 << (_la - 228)) & ((1 << (SqlParserParser.AsciiStringLiteral - 228)) | (1 << (SqlParserParser.UnicodeStringLiteral - 228)) | (1 << (SqlParserParser.SqlCommandIdentifier - 228)) | (1 << (SqlParserParser.PseudoColumn - 228)) | (1 << (SqlParserParser.DollarPartition - 228)) | (1 << (SqlParserParser.Money - 228)) | (1 << (SqlParserParser.Label - 228)) | (1 << (SqlParserParser.QuotedIdentifier - 228)))) !== 0)) {
					{
					this.state = 756;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === SqlParserParser.AS) {
						{
						this.state = 755;
						this.match(SqlParserParser.AS);
						}
					}

					this.state = 758;
					this.stringOrIdentifier();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 761;
				this.stringOrIdentifier();
				this.state = 762;
				this.match(SqlParserParser.EqualsSign);
				this.state = 763;
				this.selectColumnExpression();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringOrIdentifier(): StringOrIdentifierContext {
		let _localctx: StringOrIdentifierContext = new StringOrIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, SqlParserParser.RULE_stringOrIdentifier);
		try {
			this.state = 769;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.AsciiStringLiteral:
			case SqlParserParser.UnicodeStringLiteral:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 767;
				this.stringLiteral();
				}
				break;
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 768;
				this.identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringLiteral(): StringLiteralContext {
		let _localctx: StringLiteralContext = new StringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, SqlParserParser.RULE_stringLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 771;
			_la = this._input.LA(1);
			if (!(_la === SqlParserParser.AsciiStringLiteral || _la === SqlParserParser.UnicodeStringLiteral)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectColumnExpression(): SelectColumnExpressionContext {
		let _localctx: SelectColumnExpressionContext = new SelectColumnExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, SqlParserParser.RULE_selectColumnExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 773;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public max(): MaxContext {
		let _localctx: MaxContext = new MaxContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, SqlParserParser.RULE_max);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 775;
			this.nonQuotedIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scalarDataType(): ScalarDataTypeContext {
		let _localctx: ScalarDataTypeContext = new ScalarDataTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, SqlParserParser.RULE_scalarDataType);
		try {
			this.state = 782;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.RECORD:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 777;
				this.buildinTypes();
				}
				break;
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.VARBINARY:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 778;
				this.dataTypeSchemaObjectName();
				this.state = 780;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 63, this._ctx) ) {
				case 1:
					{
					this.state = 779;
					this.dataTypeParametersOpt();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public buildinTypes(): BuildinTypesContext {
		let _localctx: BuildinTypesContext = new BuildinTypesContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, SqlParserParser.RULE_buildinTypes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 784;
			_la = this._input.LA(1);
			if (!(((((_la - 183)) & ~0x1F) === 0 && ((1 << (_la - 183)) & ((1 << (SqlParserParser.ARRAY - 183)) | (1 << (SqlParserParser.BIGINT - 183)) | (1 << (SqlParserParser.DECIMAL - 183)) | (1 << (SqlParserParser.BIT - 183)) | (1 << (SqlParserParser.FLOAT - 183)) | (1 << (SqlParserParser.DATETIME - 183)) | (1 << (SqlParserParser.RECORD - 183)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dataTypeSchemaObjectName(): DataTypeSchemaObjectNameContext {
		let _localctx: DataTypeSchemaObjectNameContext = new DataTypeSchemaObjectNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, SqlParserParser.RULE_dataTypeSchemaObjectName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 786;
			_la = this._input.LA(1);
			if (!(_la === SqlParserParser.NVARCHAR || _la === SqlParserParser.VARBINARY)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dataTypeParametersOpt(): DataTypeParametersOptContext {
		let _localctx: DataTypeParametersOptContext = new DataTypeParametersOptContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, SqlParserParser.RULE_dataTypeParametersOpt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 788;
			this.match(SqlParserParser.LeftParenthesis);
			{
			this.state = 789;
			this.max();
			}
			this.state = 790;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public integer(): IntegerContext {
		let _localctx: IntegerContext = new IntegerContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, SqlParserParser.RULE_integer);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 792;
			this.match(SqlParserParser.Integer);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numeric(): NumericContext {
		let _localctx: NumericContext = new NumericContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, SqlParserParser.RULE_numeric);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 794;
			this.match(SqlParserParser.Numeric);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchRecognize(): MatchRecognizeContext {
		let _localctx: MatchRecognizeContext = new MatchRecognizeContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, SqlParserParser.RULE_matchRecognize);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 796;
			this.match(SqlParserParser.MATCH_RECOGNIZE);
			this.state = 797;
			this.matchRecognizBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchRecognizBody(): MatchRecognizBodyContext {
		let _localctx: MatchRecognizBodyContext = new MatchRecognizBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, SqlParserParser.RULE_matchRecognizBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 799;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 800;
			this.limitDurationClauseUnit();
			this.state = 802;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.PARTITION) {
				{
				this.state = 801;
				this.partitionBy();
				}
			}

			this.state = 804;
			this.measureClause();
			this.state = 805;
			this.afterMatch();
			this.state = 806;
			this.pattern();
			this.state = 807;
			this.patternDefines();
			this.state = 808;
			this.match(SqlParserParser.RightParenthesis);
			this.state = 809;
			this.match(SqlParserParser.AS);
			this.state = 810;
			this.stringOrIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public measureClause(): MeasureClauseContext {
		let _localctx: MeasureClauseContext = new MeasureClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, SqlParserParser.RULE_measureClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 812;
			this.match(SqlParserParser.MEASURES);
			{
			this.state = 813;
			this.measureColumnItem();
			this.state = 814;
			this.match(SqlParserParser.AS);
			this.state = 815;
			this.columnAlias();
			}
			this.state = 824;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 817;
				this.match(SqlParserParser.Comma);
				this.state = 818;
				this.measureColumnItem();
				this.state = 819;
				this.match(SqlParserParser.AS);
				this.state = 820;
				this.columnAlias();
				}
				}
				this.state = 826;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public measureColumnItem(): MeasureColumnItemContext {
		let _localctx: MeasureColumnItemContext = new MeasureColumnItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, SqlParserParser.RULE_measureColumnItem);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 827;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnAlias(): ColumnAliasContext {
		let _localctx: ColumnAliasContext = new ColumnAliasContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, SqlParserParser.RULE_columnAlias);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 829;
			this.stringOrIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public afterMatch(): AfterMatchContext {
		let _localctx: AfterMatchContext = new AfterMatchContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, SqlParserParser.RULE_afterMatch);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 831;
			this.match(SqlParserParser.AFTER);
			this.state = 832;
			this.match(SqlParserParser.MATCH);
			this.state = 833;
			this.match(SqlParserParser.TOKENSKIP);
			this.state = 834;
			this.match(SqlParserParser.TO);
			this.state = 835;
			this.match(SqlParserParser.NEXT);
			this.state = 836;
			this.match(SqlParserParser.ROW);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pattern(): PatternContext {
		let _localctx: PatternContext = new PatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, SqlParserParser.RULE_pattern);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 838;
			this.match(SqlParserParser.PATTERN);
			this.state = 839;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 841;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 840;
				this.patternGroup();
				}
				}
				this.state = 843;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & ((1 << (SqlParserParser.TIMESTAMP - 160)) | (1 << (SqlParserParser.ARRAY - 160)) | (1 << (SqlParserParser.BIGINT - 160)) | (1 << (SqlParserParser.DECIMAL - 160)) | (1 << (SqlParserParser.BIT - 160)) | (1 << (SqlParserParser.FLOAT - 160)) | (1 << (SqlParserParser.DATETIME - 160)) | (1 << (SqlParserParser.NVARCHAR - 160)) | (1 << (SqlParserParser.RECORD - 160)) | (1 << (SqlParserParser.VARBINARY - 160)))) !== 0) || _la === SqlParserParser.LeftParenthesis || ((((_la - 230)) & ~0x1F) === 0 && ((1 << (_la - 230)) & ((1 << (SqlParserParser.SqlCommandIdentifier - 230)) | (1 << (SqlParserParser.PseudoColumn - 230)) | (1 << (SqlParserParser.DollarPartition - 230)) | (1 << (SqlParserParser.Money - 230)) | (1 << (SqlParserParser.Label - 230)) | (1 << (SqlParserParser.QuotedIdentifier - 230)))) !== 0));
			this.state = 845;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternGroup(): PatternGroupContext {
		let _localctx: PatternGroupContext = new PatternGroupContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, SqlParserParser.RULE_patternGroup);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 847;
			this.patternNameModifier();
			this.state = 852;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 848;
					this.match(SqlParserParser.VerticalLine);
					this.state = 849;
					this.patternGroup();
					}
					}
				}
				this.state = 854;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternNameModifier(): PatternNameModifierContext {
		let _localctx: PatternNameModifierContext = new PatternNameModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, SqlParserParser.RULE_patternNameModifier);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 856;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 855;
					this.patternAtom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 858;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 69, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternAtom(): PatternAtomContext {
		let _localctx: PatternAtomContext = new PatternAtomContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, SqlParserParser.RULE_patternAtom);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 865;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				{
				this.state = 860;
				this.identifier();
				}
				break;
			case SqlParserParser.LeftParenthesis:
				{
				this.state = 861;
				this.match(SqlParserParser.LeftParenthesis);
				this.state = 862;
				this.patternGroup();
				this.state = 863;
				this.match(SqlParserParser.RightParenthesis);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 868;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 197)) & ~0x1F) === 0 && ((1 << (_la - 197)) & ((1 << (SqlParserParser.LeftCurly - 197)) | (1 << (SqlParserParser.Star - 197)) | (1 << (SqlParserParser.Plus - 197)) | (1 << (SqlParserParser.QuestionMark - 197)))) !== 0)) {
				{
				this.state = 867;
				this.patternModifier();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternModifier(): PatternModifierContext {
		let _localctx: PatternModifierContext = new PatternModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, SqlParserParser.RULE_patternModifier);
		let _la: number;
		try {
			this.state = 882;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.Star:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 870;
				this.match(SqlParserParser.Star);
				}
				break;
			case SqlParserParser.Plus:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 871;
				this.match(SqlParserParser.Plus);
				}
				break;
			case SqlParserParser.QuestionMark:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 872;
				this.match(SqlParserParser.QuestionMark);
				}
				break;
			case SqlParserParser.LeftCurly:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 873;
				this.match(SqlParserParser.LeftCurly);
				this.state = 874;
				this.match(SqlParserParser.Integer);
				this.state = 879;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.Comma) {
					{
					this.state = 875;
					this.match(SqlParserParser.Comma);
					this.state = 877;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === SqlParserParser.Integer) {
						{
						this.state = 876;
						this.match(SqlParserParser.Integer);
						}
					}

					}
				}

				this.state = 881;
				this.match(SqlParserParser.RightCurly);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternDefines(): PatternDefinesContext {
		let _localctx: PatternDefinesContext = new PatternDefinesContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, SqlParserParser.RULE_patternDefines);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 884;
			this.match(SqlParserParser.DEFINE);
			this.state = 885;
			_localctx._patternDefine = this.patternDefine();
			_localctx._pds.push(_localctx._patternDefine);
			this.state = 890;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 886;
				this.match(SqlParserParser.Comma);
				this.state = 887;
				_localctx._patternDefine = this.patternDefine();
				_localctx._pds.push(_localctx._patternDefine);
				}
				}
				this.state = 892;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public patternDefine(): PatternDefineContext {
		let _localctx: PatternDefineContext = new PatternDefineContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, SqlParserParser.RULE_patternDefine);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 893;
			this.identifier();
			this.state = 894;
			this.match(SqlParserParser.AS);
			this.state = 897;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 76, this._ctx) ) {
			case 1:
				{
				this.state = 895;
				this.booleanExpressionWithFlags();
				}
				break;

			case 2:
				{
				this.state = 896;
				this.expression();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intoClause(): IntoClauseContext {
		let _localctx: IntoClauseContext = new IntoClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, SqlParserParser.RULE_intoClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 899;
			this.match(SqlParserParser.INTO);
			this.state = 900;
			this.schemaObjectThreePartName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public havingClause(): HavingClauseContext {
		let _localctx: HavingClauseContext = new HavingClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, SqlParserParser.RULE_havingClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 902;
			this.match(SqlParserParser.HAVING);
			this.state = 903;
			this.booleanExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaObjectThreePartName(): SchemaObjectThreePartNameContext {
		let _localctx: SchemaObjectThreePartNameContext = new SchemaObjectThreePartNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, SqlParserParser.RULE_schemaObjectThreePartName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 905;
			this.identifier();
			this.state = 908;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 77, this._ctx) ) {
			case 1:
				{
				this.state = 906;
				this.match(SqlParserParser.Dot);
				this.state = 907;
				this.identifier();
				}
				break;
			}
			this.state = 912;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 78, this._ctx) ) {
			case 1:
				{
				this.state = 910;
				this.match(SqlParserParser.Dot);
				this.state = 911;
				this.identifier();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectExpression(): SelectExpressionContext {
		let _localctx: SelectExpressionContext = new SelectExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, SqlParserParser.RULE_selectExpression);
		try {
			this.state = 916;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 79, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 914;
				this.selectStarExpression();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 915;
				this.selectColumn();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectStarExpression(): SelectStarExpressionContext {
		let _localctx: SelectStarExpressionContext = new SelectStarExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, SqlParserParser.RULE_selectStarExpression);
		try {
			let _alt: number;
			this.state = 930;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.Star:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 918;
				this.match(SqlParserParser.Star);
				}
				break;
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 919;
				this.identifier();
				this.state = 924;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 80, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 920;
						this.match(SqlParserParser.Dot);
						this.state = 921;
						this.identifier();
						}
						}
					}
					this.state = 926;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 80, this._ctx);
				}
				this.state = 927;
				this.match(SqlParserParser.Dot);
				this.state = 928;
				this.match(SqlParserParser.Star);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, SqlParserParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 932;
			this.expressionWithFlags();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optSemicolons(): OptSemicolonsContext {
		let _localctx: OptSemicolonsContext = new OptSemicolonsContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, SqlParserParser.RULE_optSemicolons);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 937;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 934;
					this.match(SqlParserParser.Semicolon);
					}
					}
				}
				this.state = 939;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromClause(): FromClauseContext {
		let _localctx: FromClauseContext = new FromClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, SqlParserParser.RULE_fromClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 940;
			this.match(SqlParserParser.FROM);
			this.state = 941;
			this.fromList();
			this.state = 945;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.PARTITION || _la === SqlParserParser.TIMESTAMP) {
				{
				{
				this.state = 942;
				this.nrtHint();
				}
				}
				this.state = 947;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromList(): FromListContext {
		let _localctx: FromListContext = new FromListContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, SqlParserParser.RULE_fromList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 948;
			this.fromItem();
			this.state = 953;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlParserParser.Comma) {
				{
				{
				this.state = 949;
				this.match(SqlParserParser.Comma);
				this.state = 950;
				this.fromItem();
				}
				}
				this.state = 955;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromItem(): FromItemContext {
		let _localctx: FromItemContext = new FromItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, SqlParserParser.RULE_fromItem);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 956;
			this.selectTableReferenceElement();
			this.state = 960;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 85, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 957;
					this.joinElement();
					}
					}
				}
				this.state = 962;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 85, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectTableReferenceElement(): SelectTableReferenceElementContext {
		let _localctx: SelectTableReferenceElementContext = new SelectTableReferenceElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, SqlParserParser.RULE_selectTableReferenceElement);
		try {
			this.state = 965;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.LeftParenthesis:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 963;
				this.derivedTable();
				}
				break;
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 964;
				this.schemaObjectOrFunctionTableReference();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public derivedTable(): DerivedTableContext {
		let _localctx: DerivedTableContext = new DerivedTableContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, SqlParserParser.RULE_derivedTable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 967;
			this.queryDerivedTable();
			this.state = 968;
			this.simpleTableReferenceAlias();
			this.state = 970;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 87, this._ctx) ) {
			case 1:
				{
				this.state = 969;
				this.columnNameList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public queryDerivedTable(): QueryDerivedTableContext {
		let _localctx: QueryDerivedTableContext = new QueryDerivedTableContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, SqlParserParser.RULE_queryDerivedTable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 972;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 973;
			this.queryExpression();
			this.state = 974;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleTableReferenceAlias(): SimpleTableReferenceAliasContext {
		let _localctx: SimpleTableReferenceAliasContext = new SimpleTableReferenceAliasContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, SqlParserParser.RULE_simpleTableReferenceAlias);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 977;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.AS) {
				{
				this.state = 976;
				this.match(SqlParserParser.AS);
				}
			}

			this.state = 979;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaObjectOrFunctionTableReference(): SchemaObjectOrFunctionTableReferenceContext {
		let _localctx: SchemaObjectOrFunctionTableReferenceContext = new SchemaObjectOrFunctionTableReferenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, SqlParserParser.RULE_schemaObjectOrFunctionTableReference);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 981;
			this.schemaObjectFourPartName();
			this.state = 984;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				{
				this.state = 982;
				this.schemaObjectTableReference();
				}
				break;

			case 2:
				{
				this.state = 983;
				this.schemaObjectFunctionTableReference();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaObjectFunctionTableReference(): SchemaObjectFunctionTableReferenceContext {
		let _localctx: SchemaObjectFunctionTableReferenceContext = new SchemaObjectFunctionTableReferenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, SqlParserParser.RULE_schemaObjectFunctionTableReference);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 986;
			this.parenthesizedOptExpressionWithDefaultList();
			this.state = 988;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 90, this._ctx) ) {
			case 1:
				{
				this.state = 987;
				this.simpleTableReferenceAlias();
				}
				break;
			}
			this.state = 991;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 91, this._ctx) ) {
			case 1:
				{
				this.state = 990;
				this.columnNameList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaObjectTableReference(): SchemaObjectTableReferenceContext {
		let _localctx: SchemaObjectTableReferenceContext = new SchemaObjectTableReferenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, SqlParserParser.RULE_schemaObjectTableReference);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 998;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 93, this._ctx) ) {
			case 1:
				{
				this.state = 993;
				this.nonParameterTableHints();
				}
				break;

			case 2:
				{
				this.state = 994;
				this.simpleTableReferenceAlias();
				this.state = 996;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 92, this._ctx) ) {
				case 1:
					{
					this.state = 995;
					this.nonParameterTableHints();
					}
					break;
				}
				}
				break;
			}
			this.state = 1003;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 94, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1000;
					this.nrtHint();
					}
					}
				}
				this.state = 1005;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 94, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nrtHint(): NrtHintContext {
		let _localctx: NrtHintContext = new NrtHintContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, SqlParserParser.RULE_nrtHint);
		let _la: number;
		try {
			this.state = 1016;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.PARTITION:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1006;
				this.partitionBy();
				this.state = 1009;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.INTO) {
					{
					this.state = 1007;
					this.match(SqlParserParser.INTO);
					this.state = 1008;
					this.integer();
					}
				}

				}
				break;
			case SqlParserParser.TIMESTAMP:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1011;
				this.timestampBy();
				this.state = 1014;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.OVER) {
					{
					this.state = 1012;
					this.match(SqlParserParser.OVER);
					this.state = 1013;
					this.expressionList();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public joinElement(): JoinElementContext {
		let _localctx: JoinElementContext = new JoinElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 234, SqlParserParser.RULE_joinElement);
		try {
			this.state = 1020;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.INNER:
			case SqlParserParser.JOIN:
			case SqlParserParser.LEFT:
			case SqlParserParser.RIGHT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1018;
				this.qualifiedJoin();
				}
				break;
			case SqlParserParser.CROSS:
			case SqlParserParser.OUTER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1019;
				this.unqualifiedJoin();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedJoin(): QualifiedJoinContext {
		let _localctx: QualifiedJoinContext = new QualifiedJoinContext(this._ctx, this.state);
		this.enterRule(_localctx, 236, SqlParserParser.RULE_qualifiedJoin);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1022;
			this.qualifiedJoinUnit();
			this.state = 1024;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 99, this._ctx) ) {
			case 1:
				{
				this.state = 1023;
				this.qualifiedJoinOnUnit();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedJoinUnit(): QualifiedJoinUnitContext {
		let _localctx: QualifiedJoinUnitContext = new QualifiedJoinUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 238, SqlParserParser.RULE_qualifiedJoinUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 1035;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.INNER:
				{
				this.state = 1026;
				this.match(SqlParserParser.INNER);
				}
				break;
			case SqlParserParser.LEFT:
				{
				this.state = 1027;
				this.match(SqlParserParser.LEFT);
				this.state = 1029;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.OUTER) {
					{
					this.state = 1028;
					this.match(SqlParserParser.OUTER);
					}
				}

				}
				break;
			case SqlParserParser.RIGHT:
				{
				this.state = 1031;
				this.match(SqlParserParser.RIGHT);
				this.state = 1033;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlParserParser.OUTER) {
					{
					this.state = 1032;
					this.match(SqlParserParser.OUTER);
					}
				}

				}
				break;
			case SqlParserParser.JOIN:
				break;
			default:
				break;
			}
			this.state = 1037;
			this.match(SqlParserParser.JOIN);
			}
			this.state = 1039;
			this.fromItem();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedJoinOnUnit(): QualifiedJoinOnUnitContext {
		let _localctx: QualifiedJoinOnUnitContext = new QualifiedJoinOnUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 240, SqlParserParser.RULE_qualifiedJoinOnUnit);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1041;
			this.match(SqlParserParser.ON);
			this.state = 1042;
			this.booleanExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unqualifiedJoin(): UnqualifiedJoinContext {
		let _localctx: UnqualifiedJoinContext = new UnqualifiedJoinContext(this._ctx, this.state);
		this.enterRule(_localctx, 242, SqlParserParser.RULE_unqualifiedJoin);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1044;
			this.unqualifiedJoinUnit();
			this.state = 1045;
			this.selectTableReferenceElement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unqualifiedJoinUnit(): UnqualifiedJoinUnitContext {
		let _localctx: UnqualifiedJoinUnitContext = new UnqualifiedJoinUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 244, SqlParserParser.RULE_unqualifiedJoinUnit);
		try {
			this.state = 1058;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.CROSS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1047;
				this.match(SqlParserParser.CROSS);
				this.state = 1051;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SqlParserParser.JOIN:
					{
					this.state = 1048;
					this.match(SqlParserParser.JOIN);
					}
					break;
				case SqlParserParser.APPLY:
					{
					this.state = 1049;
					this.match(SqlParserParser.APPLY);
					}
					break;
				case SqlParserParser.TIMESTAMP:
				case SqlParserParser.ARRAY:
				case SqlParserParser.BIGINT:
				case SqlParserParser.DECIMAL:
				case SqlParserParser.BIT:
				case SqlParserParser.FLOAT:
				case SqlParserParser.DATETIME:
				case SqlParserParser.NVARCHAR:
				case SqlParserParser.RECORD:
				case SqlParserParser.VARBINARY:
				case SqlParserParser.SqlCommandIdentifier:
				case SqlParserParser.PseudoColumn:
				case SqlParserParser.DollarPartition:
				case SqlParserParser.Money:
				case SqlParserParser.Label:
					{
					this.state = 1050;
					this.nonQuotedIdentifier();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case SqlParserParser.OUTER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1053;
				this.match(SqlParserParser.OUTER);
				this.state = 1056;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case SqlParserParser.APPLY:
					{
					this.state = 1054;
					this.match(SqlParserParser.APPLY);
					}
					break;
				case SqlParserParser.TIMESTAMP:
				case SqlParserParser.ARRAY:
				case SqlParserParser.BIGINT:
				case SqlParserParser.DECIMAL:
				case SqlParserParser.BIT:
				case SqlParserParser.FLOAT:
				case SqlParserParser.DATETIME:
				case SqlParserParser.NVARCHAR:
				case SqlParserParser.RECORD:
				case SqlParserParser.VARBINARY:
				case SqlParserParser.SqlCommandIdentifier:
				case SqlParserParser.PseudoColumn:
				case SqlParserParser.DollarPartition:
				case SqlParserParser.Money:
				case SqlParserParser.Label:
					{
					this.state = 1055;
					this.nonQuotedIdentifier();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public timestampBy(): TimestampByContext {
		let _localctx: TimestampByContext = new TimestampByContext(this._ctx, this.state);
		this.enterRule(_localctx, 246, SqlParserParser.RULE_timestampBy);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1060;
			this.match(SqlParserParser.TIMESTAMP);
			this.state = 1061;
			this.match(SqlParserParser.BY);
			this.state = 1062;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonParameterTableHints(): NonParameterTableHintsContext {
		let _localctx: NonParameterTableHintsContext = new NonParameterTableHintsContext(this._ctx, this.state);
		this.enterRule(_localctx, 248, SqlParserParser.RULE_nonParameterTableHints);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1064;
			this.nonQuotedIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public schemaObjectFourPartName(): SchemaObjectFourPartNameContext {
		let _localctx: SchemaObjectFourPartNameContext = new SchemaObjectFourPartNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 250, SqlParserParser.RULE_schemaObjectFourPartName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1066;
			this.schemaObjectThreePartName();
			this.state = 1069;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.Dot) {
				{
				this.state = 1067;
				this.match(SqlParserParser.Dot);
				this.state = 1068;
				this.identifier();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierList(): IdentifierListContext {
		let _localctx: IdentifierListContext = new IdentifierListContext(this._ctx, this.state);
		this.enterRule(_localctx, 252, SqlParserParser.RULE_identifierList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1071;
			this.identifier();
			this.state = 1075;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 107, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1072;
					this.identifierListElement();
					}
					}
				}
				this.state = 1077;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 107, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierListElement(): IdentifierListElementContext {
		let _localctx: IdentifierListElementContext = new IdentifierListElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 254, SqlParserParser.RULE_identifierListElement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1078;
			this.match(SqlParserParser.Dot);
			this.state = 1079;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createTableStatement(): CreateTableStatementContext {
		let _localctx: CreateTableStatementContext = new CreateTableStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 256, SqlParserParser.RULE_createTableStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1081;
			this.match(SqlParserParser.CREATE);
			this.state = 1082;
			this.match(SqlParserParser.TABLE);
			this.state = 1083;
			this.schemaObjectThreePartName();
			this.state = 1084;
			this.match(SqlParserParser.LeftParenthesis);
			this.state = 1085;
			this.tableDefinitionCreateTable();
			this.state = 1086;
			this.match(SqlParserParser.RightParenthesis);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableDefinitionCreateTable(): TableDefinitionCreateTableContext {
		let _localctx: TableDefinitionCreateTableContext = new TableDefinitionCreateTableContext(this._ctx, this.state);
		this.enterRule(_localctx, 258, SqlParserParser.RULE_tableDefinitionCreateTable);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1088;
			this.tableElementList();
			this.state = 1090;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlParserParser.Comma) {
				{
				this.state = 1089;
				this.match(SqlParserParser.Comma);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableElementList(): TableElementListContext {
		let _localctx: TableElementListContext = new TableElementListContext(this._ctx, this.state);
		this.enterRule(_localctx, 260, SqlParserParser.RULE_tableElementList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1092;
			_localctx._tableElement = this.tableElement();
			_localctx._elements.push(_localctx._tableElement);
			this.state = 1097;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 109, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1093;
					this.match(SqlParserParser.Comma);
					this.state = 1094;
					_localctx._tableElement = this.tableElement();
					_localctx._elements.push(_localctx._tableElement);
					}
					}
				}
				this.state = 1099;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 109, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableElement(): TableElementContext {
		let _localctx: TableElementContext = new TableElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 262, SqlParserParser.RULE_tableElement);
		try {
			this.state = 1102;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1100;
				this.columnDefinition();
				}
				break;
			case SqlParserParser.PRIMARY:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1101;
				this.tableConstraint();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnDefinition(): ColumnDefinitionContext {
		let _localctx: ColumnDefinitionContext = new ColumnDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 264, SqlParserParser.RULE_columnDefinition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1104;
			this.identifier();
			this.state = 1105;
			this.regularColumnBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public regularColumnBody(): RegularColumnBodyContext {
		let _localctx: RegularColumnBodyContext = new RegularColumnBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 266, SqlParserParser.RULE_regularColumnBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1107;
			this.scalarDataType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 268, SqlParserParser.RULE_identifier);
		try {
			this.state = 1111;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlParserParser.TIMESTAMP:
			case SqlParserParser.ARRAY:
			case SqlParserParser.BIGINT:
			case SqlParserParser.DECIMAL:
			case SqlParserParser.BIT:
			case SqlParserParser.FLOAT:
			case SqlParserParser.DATETIME:
			case SqlParserParser.NVARCHAR:
			case SqlParserParser.RECORD:
			case SqlParserParser.VARBINARY:
			case SqlParserParser.SqlCommandIdentifier:
			case SqlParserParser.PseudoColumn:
			case SqlParserParser.DollarPartition:
			case SqlParserParser.Money:
			case SqlParserParser.Label:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1109;
				this.nonQuotedIdentifier();
				}
				break;
			case SqlParserParser.QuotedIdentifier:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1110;
				this.match(SqlParserParser.QuotedIdentifier);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableConstraint(): TableConstraintContext {
		let _localctx: TableConstraintContext = new TableConstraintContext(this._ctx, this.state);
		this.enterRule(_localctx, 270, SqlParserParser.RULE_tableConstraint);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1113;
			this.uniqueTableConstraint();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uniqueTableConstraint(): UniqueTableConstraintContext {
		let _localctx: UniqueTableConstraintContext = new UniqueTableConstraintContext(this._ctx, this.state);
		this.enterRule(_localctx, 272, SqlParserParser.RULE_uniqueTableConstraint);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1115;
			this.match(SqlParserParser.PRIMARY);
			this.state = 1116;
			this.match(SqlParserParser.KEY);
			this.state = 1117;
			this.columnNameList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\xF2\u0462\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x04w\tw\x04x\tx\x04y\ty\x04z\tz\x04" +
		"{\t{\x04|\t|\x04}\t}\x04~\t~\x04\x7F\t\x7F\x04\x80\t\x80\x04\x81\t\x81" +
		"\x04\x82\t\x82\x04\x83\t\x83\x04\x84\t\x84\x04\x85\t\x85\x04\x86\t\x86" +
		"\x04\x87\t\x87\x04\x88\t\x88\x04\x89\t\x89\x04\x8A\t\x8A\x03\x02\x07\x02" +
		"\u0116\n\x02\f\x02\x0E\x02\u0119\v\x02\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03" +
		"\u0127\n\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x07\x05\u012F" +
		"\n\x05\f\x05\x0E\x05\u0132\v\x05\x03\x06\x03\x06\x05\x06\u0136\n\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x05\x07\u0140" +
		"\n\x07\x03\x07\x07\x07\u0143\n\x07\f\x07\x0E\x07\u0146\v\x07\x03\b\x03" +
		"\b\x05\b\u014A\n\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x05\n\u0152\n\n" +
		"\x03\n\x03\n\x03\n\x07\n\u0157\n\n\f\n\x0E\n\u015A\v\n\x03\n\x05\n\u015D" +
		"\n\n\x03\n\x03\n\x05\n\u0161\n\n\x03\n\x05\n\u0164\n\n\x03\n\x05\n\u0167" +
		"\n\n\x03\n\x05\n\u016A\n\n\x03\v\x03\v\x03\v\x03\v\x07\v\u0170\n\v\f\v" +
		"\x0E\v\u0173\v\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f\u017C" +
		"\n\f\f\f\x0E\f\u017F\v\f\x03\r\x03\r\x05\r\u0183\n\r\x03\x0E\x03\x0E\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x07\x10\u018E\n\x10" +
		"\f\x10\x0E\x10\u0191\v\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03" +
		"\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x17\x03" +
		"\x17\x03\x17\x07\x17\u01A3\n\x17\f\x17\x0E\x17\u01A6\v\x17\x03\x18\x03" +
		"\x18\x03\x18\x07\x18\u01AB\n\x18\f\x18\x0E\x18\u01AE\v\x18\x03\x19\x03" +
		"\x19\x03\x19\x05\x19\u01B3\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x05\x1A\u01BC\n\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u01C1" +
		"\n\x1A\x05\x1A\u01C3\n\x1A\x05\x1A\u01C5\n\x1A\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u01D7\n\x1E\f\x1E\x0E\x1E\u01DA" +
		"\v\x1E\x03\x1F\x03\x1F\x05\x1F\u01DE\n\x1F\x03\x1F\x03\x1F\x03 \x03 \x03" +
		"!\x03!\x03!\x05!\u01E7\n!\x03!\x03!\x05!\u01EB\n!\x03!\x03!\x05!\u01EF" +
		"\n!\x03\"\x03\"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x07#\u01FE\n#\f#\x0E#\u0201\v#\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x07" +
		"$\u020A\n$\f$\x0E$\u020D\v$\x03%\x03%\x03%\x05%\u0212\n%\x03&\x03&\x03" +
		"&\x03&\x05&\u0218\n&\x07&\u021A\n&\f&\x0E&\u021D\v&\x03\'\x03\'\x03\'" +
		"\x03\'\x03\'\x03\'\x03\'\x05\'\u0226\n\'\x03(\x03(\x03)\x03)\x05)\u022C" +
		"\n)\x03)\x03)\x03*\x03*\x03*\x07*\u0233\n*\f*\x0E*\u0236\v*\x03+\x03+" +
		"\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x03,\x05,\u0242\n,\x03-\x03-\x03." +
		"\x03.\x03.\x03.\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x030\x030\x030\x03" +
		"0\x030\x050\u0256\n0\x030\x030\x050\u025A\n0\x030\x030\x031\x061\u025F" +
		"\n1\r1\x0E1\u0260\x032\x032\x032\x032\x032\x033\x063\u0269\n3\r3\x0E3" +
		"\u026A\x034\x034\x034\x034\x034\x035\x035\x035\x055\u0275\n5\x036\x03" +
		"6\x036\x036\x036\x056\u027C\n6\x036\x036\x056\u0280\n6\x037\x037\x038" +
		"\x038\x038\x038\x058\u0288\n8\x038\x038\x038\x038\x038\x038\x038\x038" +
		"\x038\x038\x038\x038\x038\x038\x058\u0298\n8\x039\x039\x059\u029C\n9\x03" +
		"9\x039\x059\u02A0\n9\x03:\x03:\x03:\x03:\x05:\u02A6\n:\x03;\x03;\x05;" +
		"\u02AA\n;\x03;\x05;\u02AD\n;\x03;\x05;\u02B0\n;\x03;\x03;\x03<\x03<\x03" +
		"<\x03=\x03=\x03=\x05=\u02BA\n=\x03>\x03>\x03>\x03>\x03?\x03?\x03?\x07" +
		"?\u02C3\n?\f?\x0E?\u02C6\v?\x03@\x03@\x03A\x03A\x03B\x03B\x03B\x03C\x03" +
		"C\x03C\x03D\x03D\x03D\x03D\x03D\x03E\x03E\x03F\x03F\x03F\x03F\x03F\x03" +
		"F\x03F\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x05G\u02E7\nG\x03H\x03H\x03" +
		"I\x03I\x03J\x03J\x03K\x03K\x03L\x03L\x03L\x03L\x03M\x03M\x05M\u02F7\n" +
		"M\x03M\x05M\u02FA\nM\x03M\x03M\x03M\x03M\x05M\u0300\nM\x03N\x03N\x05N" +
		"\u0304\nN\x03O\x03O\x03P\x03P\x03Q\x03Q\x03R\x03R\x03R\x05R\u030F\nR\x05" +
		"R\u0311\nR\x03S\x03S\x03T\x03T\x03U\x03U\x03U\x03U\x03V\x03V\x03W\x03" +
		"W\x03X\x03X\x03X\x03Y\x03Y\x03Y\x05Y\u0325\nY\x03Y\x03Y\x03Y\x03Y\x03" +
		"Y\x03Y\x03Y\x03Y\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x07" +
		"Z\u0339\nZ\fZ\x0EZ\u033C\vZ\x03[\x03[\x03\\\x03\\\x03]\x03]\x03]\x03]" +
		"\x03]\x03]\x03]\x03^\x03^\x03^\x06^\u034C\n^\r^\x0E^\u034D\x03^\x03^\x03" +
		"_\x03_\x03_\x07_\u0355\n_\f_\x0E_\u0358\v_\x03`\x06`\u035B\n`\r`\x0E`" +
		"\u035C\x03a\x03a\x03a\x03a\x03a\x05a\u0364\na\x03a\x05a\u0367\na\x03b" +
		"\x03b\x03b\x03b\x03b\x03b\x03b\x05b\u0370\nb\x05b\u0372\nb\x03b\x05b\u0375" +
		"\nb\x03c\x03c\x03c\x03c\x07c\u037B\nc\fc\x0Ec\u037E\vc\x03d\x03d\x03d" +
		"\x03d\x05d\u0384\nd\x03e\x03e\x03e\x03f\x03f\x03f\x03g\x03g\x03g\x05g" +
		"\u038F\ng\x03g\x03g\x05g\u0393\ng\x03h\x03h\x05h\u0397\nh\x03i\x03i\x03" +
		"i\x03i\x07i\u039D\ni\fi\x0Ei\u03A0\vi\x03i\x03i\x03i\x05i\u03A5\ni\x03" +
		"j\x03j\x03k\x07k\u03AA\nk\fk\x0Ek\u03AD\vk\x03l\x03l\x03l\x07l\u03B2\n" +
		"l\fl\x0El\u03B5\vl\x03m\x03m\x03m\x07m\u03BA\nm\fm\x0Em\u03BD\vm\x03n" +
		"\x03n\x07n\u03C1\nn\fn\x0En\u03C4\vn\x03o\x03o\x05o\u03C8\no\x03p\x03" +
		"p\x03p\x05p\u03CD\np\x03q\x03q\x03q\x03q\x03r\x05r\u03D4\nr\x03r\x03r" +
		"\x03s\x03s\x03s\x05s\u03DB\ns\x03t\x03t\x05t\u03DF\nt\x03t\x05t\u03E2" +
		"\nt\x03u\x03u\x03u\x05u\u03E7\nu\x05u\u03E9\nu\x03u\x07u\u03EC\nu\fu\x0E" +
		"u\u03EF\vu\x03v\x03v\x03v\x05v\u03F4\nv\x03v\x03v\x03v\x05v\u03F9\nv\x05" +
		"v\u03FB\nv\x03w\x03w\x05w\u03FF\nw\x03x\x03x\x05x\u0403\nx\x03y\x03y\x03" +
		"y\x05y\u0408\ny\x03y\x03y\x05y\u040C\ny\x05y\u040E\ny\x03y\x03y\x03y\x03" +
		"y\x03z\x03z\x03z\x03{\x03{\x03{\x03|\x03|\x03|\x03|\x05|\u041E\n|\x03" +
		"|\x03|\x03|\x05|\u0423\n|\x05|\u0425\n|\x03}\x03}\x03}\x03}\x03~\x03~" +
		"\x03\x7F\x03\x7F\x03\x7F\x05\x7F\u0430\n\x7F\x03\x80\x03\x80\x07\x80\u0434" +
		"\n\x80\f\x80\x0E\x80\u0437\v\x80\x03\x81\x03\x81\x03\x81\x03\x82\x03\x82" +
		"\x03\x82\x03\x82\x03\x82\x03\x82\x03\x82\x03\x83\x03\x83\x05\x83\u0445" +
		"\n\x83\x03\x84\x03\x84\x03\x84\x07\x84\u044A\n\x84\f\x84\x0E\x84\u044D" +
		"\v\x84\x03\x85\x03\x85\x05\x85\u0451\n\x85\x03\x86\x03\x86\x03\x86\x03" +
		"\x87\x03\x87\x03\x88\x03\x88\x05\x88\u045A\n\x88\x03\x89\x03\x89\x03\x8A" +
		"\x03\x8A\x03\x8A\x03\x8A\x03\x8A\x02\x02\x02\x8B\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02" +
		"P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02" +
		"l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84" +
		"\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96" +
		"\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8" +
		"\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA" +
		"\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC" +
		"\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\xD6\x02\xD8\x02\xDA\x02\xDC\x02\xDE" +
		"\x02\xE0\x02\xE2\x02\xE4\x02\xE6\x02\xE8\x02\xEA\x02\xEC\x02\xEE\x02\xF0" +
		"\x02\xF2\x02\xF4\x02\xF6\x02\xF8\x02\xFA\x02\xFC\x02\xFE\x02\u0100\x02" +
		"\u0102\x02\u0104\x02\u0106\x02\u0108\x02\u010A\x02\u010C\x02\u010E\x02" +
		"\u0110\x02\u0112\x02\x02\v\x04\x02\v\v33\x04\x02\xD3\xD3\xD5\xD5\x04\x02" +
		"\xD2\xD3\xD5\xD5\x05\x02\xCB\xCB\xCD\xCD\xD8\xD8\x04\x02__\x8E\x8E\x04" +
		"\x02\x05\x0544\x03\x02\xE6\xE7\x04\x02\xB9\xBE\xC0\xC0\x04\x02\xBF\xBF" +
		"\xC1\xC1\x02\u046C\x02\u0117\x03\x02\x02\x02\x04\u0126\x03\x02\x02\x02" +
		"\x06\u0128\x03\x02\x02\x02\b\u012A\x03\x02\x02\x02\n\u0133\x03\x02\x02" +
		"\x02\f\u013C\x03\x02\x02\x02\x0E\u0149\x03\x02\x02\x02\x10\u014B\x03\x02" +
		"\x02\x02\x12\u014F\x03\x02\x02\x02\x14\u016B\x03\x02\x02\x02\x16\u0176" +
		"\x03\x02\x02\x02\x18\u0180\x03\x02\x02\x02\x1A\u0184\x03\x02\x02\x02\x1C" +
		"\u0186\x03\x02\x02\x02\x1E\u018A\x03\x02\x02\x02 \u0192\x03\x02\x02\x02" +
		"\"\u0194\x03\x02\x02\x02$\u0196\x03\x02\x02\x02&\u0199\x03\x02\x02\x02" +
		"(\u019B\x03\x02\x02\x02*\u019D\x03\x02\x02\x02,\u019F\x03\x02\x02\x02" +
		".\u01A7\x03\x02\x02\x020\u01B2\x03\x02\x02\x022\u01C4\x03\x02\x02\x02" +
		"4\u01C6\x03\x02\x02\x026\u01C9\x03\x02\x02\x028\u01CE\x03\x02\x02\x02" +
		":\u01D3\x03\x02\x02\x02<\u01DB\x03\x02\x02\x02>\u01E1\x03\x02\x02\x02" +
		"@\u01EE\x03\x02\x02\x02B\u01F0\x03\x02\x02\x02D\u01F2\x03\x02\x02\x02" +
		"F\u0202\x03\x02\x02\x02H\u0211\x03\x02\x02\x02J\u0213\x03\x02\x02\x02" +
		"L\u0225\x03\x02\x02\x02N\u0227\x03\x02\x02\x02P\u0229\x03\x02\x02\x02" +
		"R\u022F\x03\x02\x02\x02T\u0237\x03\x02\x02\x02V\u0241\x03\x02\x02\x02" +
		"X\u0243\x03\x02\x02\x02Z\u0245\x03\x02\x02\x02\\\u0249\x03\x02\x02\x02" +
		"^\u0250\x03\x02\x02\x02`\u025E\x03\x02\x02\x02b\u0262\x03\x02\x02\x02" +
		"d\u0268\x03\x02\x02\x02f\u026C\x03\x02\x02\x02h\u0271\x03\x02\x02\x02" +
		"j\u0276\x03\x02\x02\x02l\u0281\x03\x02\x02\x02n\u0297\x03\x02\x02\x02" +
		"p\u029B\x03\x02\x02\x02r\u02A1\x03\x02\x02\x02t\u02A7\x03\x02\x02\x02" +
		"v\u02B3\x03\x02\x02\x02x\u02B6\x03\x02\x02\x02z\u02BB\x03\x02\x02\x02" +
		"|\u02BF\x03\x02\x02\x02~\u02C7\x03\x02\x02\x02\x80\u02C9\x03\x02\x02\x02" +
		"\x82\u02CB\x03\x02\x02\x02\x84\u02CE\x03\x02\x02\x02\x86\u02D1\x03\x02" +
		"\x02\x02\x88\u02D6\x03\x02\x02\x02\x8A\u02D8\x03\x02\x02\x02\x8C\u02E6" +
		"\x03\x02\x02\x02\x8E\u02E8\x03\x02\x02\x02\x90\u02EA\x03\x02\x02\x02\x92" +
		"\u02EC\x03\x02\x02\x02\x94\u02EE\x03\x02\x02\x02\x96\u02F0\x03\x02\x02" +
		"\x02\x98\u02FF\x03\x02\x02\x02\x9A\u0303\x03\x02\x02\x02\x9C\u0305\x03" +
		"\x02\x02\x02\x9E\u0307\x03\x02\x02\x02\xA0\u0309\x03\x02\x02\x02\xA2\u0310" +
		"\x03\x02\x02\x02\xA4\u0312\x03\x02\x02\x02\xA6\u0314\x03\x02\x02\x02\xA8" +
		"\u0316\x03\x02\x02\x02\xAA\u031A\x03\x02\x02\x02\xAC\u031C\x03\x02\x02" +
		"\x02\xAE\u031E\x03\x02\x02\x02\xB0\u0321\x03\x02\x02\x02\xB2\u032E\x03" +
		"\x02\x02\x02\xB4\u033D\x03\x02\x02\x02\xB6\u033F\x03\x02\x02\x02\xB8\u0341" +
		"\x03\x02\x02\x02\xBA\u0348\x03\x02\x02\x02\xBC\u0351\x03\x02\x02\x02\xBE" +
		"\u035A\x03\x02\x02\x02\xC0\u0363\x03\x02\x02\x02\xC2\u0374\x03\x02\x02" +
		"\x02\xC4\u0376\x03\x02\x02\x02\xC6\u037F\x03\x02\x02\x02\xC8\u0385\x03" +
		"\x02\x02\x02\xCA\u0388\x03\x02\x02\x02\xCC\u038B\x03\x02\x02\x02\xCE\u0396" +
		"\x03\x02\x02\x02\xD0\u03A4\x03\x02\x02\x02\xD2\u03A6\x03\x02\x02\x02\xD4" +
		"\u03AB\x03\x02\x02\x02\xD6\u03AE\x03\x02\x02\x02\xD8\u03B6\x03\x02\x02" +
		"\x02\xDA\u03BE\x03\x02\x02\x02\xDC\u03C7\x03\x02\x02\x02\xDE\u03C9\x03" +
		"\x02\x02\x02\xE0\u03CE\x03\x02\x02\x02\xE2\u03D3\x03\x02\x02\x02\xE4\u03D7" +
		"\x03\x02\x02\x02\xE6\u03DC\x03\x02\x02\x02\xE8\u03E8\x03\x02\x02\x02\xEA" +
		"\u03FA\x03\x02\x02\x02\xEC\u03FE\x03\x02\x02\x02\xEE\u0400\x03\x02\x02" +
		"\x02\xF0\u040D\x03\x02\x02\x02\xF2\u0413\x03\x02\x02\x02\xF4\u0416\x03" +
		"\x02\x02\x02\xF6\u0424\x03\x02\x02\x02\xF8\u0426\x03\x02\x02\x02\xFA\u042A" +
		"\x03\x02\x02\x02\xFC\u042C\x03\x02\x02\x02\xFE\u0431\x03\x02\x02\x02\u0100" +
		"\u0438\x03\x02\x02\x02\u0102\u043B\x03\x02\x02\x02\u0104\u0442\x03\x02" +
		"\x02\x02\u0106\u0446\x03\x02\x02\x02\u0108\u0450\x03\x02\x02\x02\u010A" +
		"\u0452\x03\x02\x02\x02\u010C\u0455\x03\x02\x02\x02\u010E\u0459\x03\x02" +
		"\x02\x02\u0110\u045B\x03\x02\x02\x02\u0112\u045D\x03\x02\x02\x02\u0114" +
		"\u0116\x05\x04\x03\x02\u0115\u0114\x03\x02\x02\x02\u0116\u0119\x03\x02" +
		"\x02\x02\u0117\u0115\x03\x02\x02\x02\u0117\u0118\x03\x02\x02\x02\u0118" +
		"\u011A\x03\x02\x02\x02\u0119\u0117\x03\x02\x02\x02\u011A\u011B\x07\x02" +
		"\x02\x03\u011B\x03\x03\x02\x02\x02\u011C\u011D\x05\u0102\x82\x02\u011D" +
		"\u011E\x05\xD4k\x02\u011E\u0127\x03\x02\x02\x02\u011F\u0120\x05\b\x05" +
		"\x02\u0120\u0121\x05\xD4k\x02\u0121\u0127\x03\x02\x02\x02\u0122\u0123" +
		"\x05\f\x07\x02\u0123\u0124\x05\xD4k\x02\u0124\u0127\x03\x02\x02\x02\u0125" +
		"\u0127\x05\x06\x04\x02\u0126\u011C\x03\x02\x02\x02\u0126\u011F\x03\x02" +
		"\x02\x02\u0126\u0122\x03\x02\x02\x02\u0126\u0125\x03\x02\x02\x02\u0127" +
		"\x05\x03\x02\x02\x02\u0128\u0129\x07\xE0\x02\x02\u0129\x07\x03\x02\x02" +
		"\x02\u012A\u012B\x07\xB7\x02\x02\u012B\u0130\x05\n\x06\x02\u012C\u012D" +
		"\x07\xCC\x02\x02\u012D\u012F\x05\n\x06\x02\u012E\u012C\x03\x02\x02\x02" +
		"\u012F\u0132\x03\x02\x02\x02\u0130\u012E\x03\x02\x02\x02\u0130\u0131\x03" +
		"\x02\x02\x02\u0131\t\x03\x02\x02\x02\u0132\u0130\x03\x02\x02\x02\u0133" +
		"\u0135\x05\u010E\x88\x02\u0134\u0136\x05\x14\v\x02\u0135\u0134\x03\x02" +
		"\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137" +
		"\u0138\x07\n\x02\x02\u0138\u0139\x07\xC5\x02\x02\u0139\u013A\x05\f\x07" +
		"\x02\u013A\u013B\x07\xC6\x02\x02\u013B\v\x03\x02\x02\x02\u013C\u0144\x05" +
		"\x0E\b\x02\u013D\u013F\x07\xAA\x02\x02\u013E\u0140\x07\x05\x02\x02\u013F" +
		"\u013E\x03\x02\x02\x02\u013F\u0140\x03\x02\x02\x02\u0140\u0141\x03\x02" +
		"\x02\x02\u0141\u0143\x05\x0E\b\x02\u0142\u013D\x03\x02\x02\x02\u0143\u0146" +
		"\x03\x02\x02\x02\u0144\u0142\x03\x02\x02\x02\u0144\u0145\x03\x02\x02\x02" +
		"\u0145\r\x03\x02\x02\x02\u0146\u0144\x03\x02\x02\x02\u0147\u014A\x05\x12" +
		"\n\x02\u0148\u014A\x05\x10\t\x02\u0149\u0147\x03\x02\x02\x02\u0149\u0148" +
		"\x03\x02\x02\x02\u014A\x0F\x03\x02\x02\x02\u014B\u014C\x07\xC5\x02\x02" +
		"\u014C\u014D\x05\f\x07\x02\u014D\u014E\x07\xC6\x02\x02\u014E\x11\x03\x02" +
		"\x02\x02\u014F\u0151\x07\x96\x02\x02\u0150\u0152\x05\x80A\x02\u0151\u0150" +
		"\x03\x02\x02\x02\u0151\u0152\x03\x02\x02\x02\u0152\u0153\x03\x02\x02\x02" +
		"\u0153\u0158\x05\xCEh\x02\u0154\u0155\x07\xCC\x02\x02\u0155\u0157\x05" +
		"\xCEh\x02\u0156\u0154\x03\x02\x02\x02\u0157\u015A\x03\x02\x02\x02\u0158" +
		"\u0156\x03\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159\u015C\x03\x02" +
		"\x02\x02\u015A\u0158\x03\x02\x02\x02\u015B\u015D\x05\xC8e\x02\u015C\u015B" +
		"\x03\x02\x02\x02\u015C\u015D\x03\x02\x02\x02\u015D\u015E\x03\x02\x02\x02" +
		"\u015E\u0160\x05\xD6l\x02\u015F\u0161\x05$\x13\x02\u0160\u015F\x03\x02" +
		"\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\u0163\x03\x02\x02\x02\u0162" +
		"\u0164\x05\x1C\x0F\x02\u0163\u0162\x03\x02\x02\x02\u0163\u0164\x03\x02" +
		"\x02\x02\u0164\u0166\x03\x02\x02\x02\u0165\u0167\x05\xCAf\x02\u0166\u0165" +
		"\x03\x02\x02\x02\u0166\u0167\x03\x02\x02\x02\u0167\u0169\x03\x02\x02\x02" +
		"\u0168\u016A\x05\xAEX\x02\u0169\u0168\x03\x02\x02\x02\u0169\u016A\x03" +
		"\x02\x02\x02\u016A\x13\x03\x02\x02\x02\u016B\u016C\x07\xC5\x02\x02\u016C" +
		"\u0171\x05\u010E\x88\x02\u016D\u016E\x07\xCC\x02\x02\u016E\u0170\x05\u010E" +
		"\x88\x02\u016F\u016D\x03\x02\x02\x02\u0170\u0173\x03\x02\x02\x02\u0171" +
		"\u016F\x03\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172\u0174\x03\x02" +
		"\x02\x02\u0173\u0171\x03\x02\x02\x02\u0174\u0175\x07\xC6\x02\x02\u0175" +
		"\x15\x03\x02\x02\x02\u0176\u0177\x07x\x02\x02\u0177\u0178\x07\x13\x02" +
		"\x02\u0178\u017D\x05\x18\r\x02\u0179\u017A\x07\xCC\x02\x02\u017A\u017C" +
		"\x05\x18\r\x02\u017B\u0179\x03\x02\x02\x02\u017C\u017F\x03\x02\x02\x02" +
		"\u017D\u017B\x03\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\x17\x03" +
		"\x02\x02\x02\u017F\u017D\x03\x02\x02\x02\u0180\u0182\x05\xD2j\x02\u0181" +
		"\u0183\x05\x1A\x0E\x02\u0182\u0181\x03\x02\x02\x02\u0182\u0183\x03\x02" +
		"\x02\x02\u0183\x19\x03\x02\x02\x02\u0184\u0185\t\x02\x02\x02\u0185\x1B" +
		"\x03\x02\x02\x02\u0186\u0187\x07N\x02\x02\u0187\u0188\x07\x13\x02\x02" +
		"\u0188\u0189\x05\x1E\x10\x02\u0189\x1D\x03\x02\x02\x02\u018A\u018F\x05" +
		" \x11\x02\u018B\u018C\x07\xCC\x02\x02\u018C\u018E\x05 \x11\x02\u018D\u018B" +
		"\x03\x02\x02\x02\u018E\u0191\x03\x02\x02\x02\u018F\u018D\x03\x02\x02\x02" +
		"\u018F\u0190\x03\x02\x02\x02\u0190\x1F\x03\x02\x02\x02\u0191\u018F\x03" +
		"\x02\x02\x02\u0192\u0193\x05\"\x12\x02\u0193!\x03\x02\x02\x02\u0194\u0195" +
		"\x05\xD2j\x02\u0195#\x03\x02\x02\x02\u0196\u0197\x07\xB5\x02\x02\u0197" +
		"\u0198\x05&\x14\x02\u0198%\x03\x02\x02\x02\u0199\u019A\x05(\x15\x02\u019A" +
		"\'\x03\x02\x02\x02\u019B\u019C\x05*\x16\x02\u019C)\x03\x02\x02\x02\u019D" +
		"\u019E\x05,\x17\x02\u019E+\x03\x02\x02\x02\u019F\u01A4\x05.\x18\x02\u01A0" +
		"\u01A1\x07w\x02\x02\u01A1\u01A3\x05.\x18\x02\u01A2\u01A0\x03\x02\x02\x02" +
		"\u01A3\u01A6\x03\x02\x02\x02\u01A4\u01A2\x03\x02\x02\x02\u01A4\u01A5\x03" +
		"\x02\x02\x02\u01A5-\x03\x02\x02\x02\u01A6\u01A4\x03\x02\x02\x02\u01A7" +
		"\u01AC\x050\x19\x02\u01A8\u01A9\x07\x07\x02\x02\u01A9\u01AB\x050\x19\x02" +
		"\u01AA\u01A8\x03\x02\x02\x02\u01AB\u01AE\x03\x02\x02\x02\u01AC\u01AA\x03" +
		"\x02\x02\x02\u01AC\u01AD\x03\x02\x02\x02\u01AD/\x03\x02\x02\x02\u01AE" +
		"\u01AC\x03\x02\x02\x02\u01AF\u01B0\x07j\x02\x02\u01B0\u01B3\x050\x19\x02" +
		"\u01B1\u01B3\x052\x1A\x02\u01B2\u01AF\x03\x02\x02\x02\u01B2\u01B1\x03" +
		"\x02\x02\x02\u01B31\x03\x02\x02\x02\u01B4\u01C5\x05\x96L\x02\u01B5\u01C2" +
		"\x05B\"\x02\u01B6\u01B7\x05@!\x02\u01B7\u01B8\x05> \x02\u01B8\u01C3\x03" +
		"\x02\x02\x02\u01B9\u01C3\x05<\x1F\x02\u01BA\u01BC\x07j\x02\x02\u01BB\u01BA" +
		"\x03\x02\x02\x02\u01BB\u01BC\x03\x02\x02\x02\u01BC\u01C0\x03\x02\x02\x02" +
		"\u01BD\u01C1\x056\x1C\x02\u01BE\u01C1\x054\x1B\x02\u01BF\u01C1\x058\x1D" +
		"\x02\u01C0\u01BD\x03\x02\x02\x02\u01C0\u01BE\x03\x02\x02\x02\u01C0\u01BF" +
		"\x03\x02\x02\x02\u01C1\u01C3\x03\x02\x02\x02\u01C2\u01B6\x03\x02\x02\x02" +
		"\u01C2\u01B9\x03\x02\x02\x02\u01C2\u01BB\x03\x02\x02\x02\u01C3\u01C5\x03" +
		"\x02\x02\x02\u01C4\u01B4\x03\x02\x02\x02\u01C4\u01B5\x03\x02\x02\x02\u01C5" +
		"3\x03\x02\x02\x02\u01C6\u01C7\x07`\x02\x02\u01C7\u01C8\x05B\"\x02\u01C8" +
		"5\x03\x02\x02\x02\u01C9\u01CA\x07\x0F\x02\x02\u01CA\u01CB\x05B\"\x02\u01CB" +
		"\u01CC\x07\x07\x02\x02\u01CC\u01CD\x05B\"\x02\u01CD7\x03\x02\x02\x02\u01CE" +
		"\u01CF\x07U\x02\x02\u01CF\u01D0\x07\xC5\x02\x02\u01D0\u01D1\x05:\x1E\x02" +
		"\u01D1\u01D2\x07\xC6\x02\x02\u01D29\x03\x02\x02\x02\u01D3\u01D8\x05\xD2" +
		"j\x02\u01D4\u01D5\x07\xCC\x02\x02\u01D5\u01D7\x05\xD2j\x02\u01D6\u01D4" +
		"\x03\x02\x02\x02\u01D7\u01DA\x03\x02\x02\x02\u01D8\u01D6\x03\x02\x02\x02" +
		"\u01D8\u01D9\x03\x02\x02\x02\u01D9;\x03\x02\x02\x02\u01DA\u01D8\x03\x02" +
		"\x02\x02\u01DB\u01DD\x07[\x02\x02\u01DC\u01DE\x07j\x02\x02\u01DD\u01DC" +
		"\x03\x02\x02\x02\u01DD\u01DE\x03\x02\x02\x02\u01DE\u01DF\x03\x02\x02\x02" +
		"\u01DF\u01E0\x07k\x02\x02\u01E0=\x03\x02\x02\x02\u01E1\u01E2\x05B\"\x02" +
		"\u01E2?\x03\x02\x02\x02\u01E3\u01EF\x07\xD3\x02\x02\u01E4\u01E6\x07\xD5" +
		"\x02\x02\u01E5\u01E7\x07\xD3\x02\x02\u01E6\u01E5\x03\x02";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\u01E6\u01E7\x03\x02\x02\x02\u01E7\u01EF\x03\x02\x02\x02\u01E8" +
		"\u01EA\x07\xD2\x02\x02\u01E9\u01EB\t\x03\x02\x02\u01EA\u01E9\x03\x02\x02" +
		"\x02\u01EA\u01EB\x03\x02\x02\x02\u01EB\u01EF\x03\x02\x02\x02\u01EC\u01ED" +
		"\x07\xC2\x02\x02\u01ED\u01EF\t\x04\x02\x02\u01EE\u01E3\x03\x02\x02\x02" +
		"\u01EE\u01E4\x03\x02\x02\x02\u01EE\u01E8\x03\x02\x02\x02\u01EE\u01EC\x03" +
		"\x02\x02\x02\u01EFA\x03\x02\x02\x02\u01F0\u01F1\x05D#\x02\u01F1C\x03\x02" +
		"\x02\x02\u01F2\u01FF\x05F$\x02\u01F3\u01F4\x07\xCB\x02\x02\u01F4\u01FE" +
		"\x05F$\x02\u01F5\u01F6\x07\xCD\x02\x02\u01F6\u01FE\x05F$\x02\u01F7\u01F8" +
		"\x07\xC4\x02\x02\u01F8\u01FE\x05F$\x02\u01F9\u01FA\x07\xD7\x02\x02\u01FA" +
		"\u01FE\x05F$\x02\u01FB\u01FC\x07\xD6\x02\x02\u01FC\u01FE\x05F$\x02\u01FD" +
		"\u01F3\x03\x02\x02\x02\u01FD\u01F5\x03\x02\x02\x02\u01FD\u01F7\x03\x02" +
		"\x02\x02\u01FD\u01F9\x03\x02\x02\x02\u01FD\u01FB\x03\x02\x02\x02\u01FE" +
		"\u0201\x03\x02\x02\x02\u01FF\u01FD\x03\x02\x02\x02\u01FF\u0200\x03\x02" +
		"\x02\x02\u0200E\x03\x02\x02\x02\u0201\u01FF\x03\x02\x02\x02\u0202\u020B" +
		"\x05H%\x02\u0203\u0204\x07\xC9\x02\x02\u0204\u020A\x05H%\x02\u0205\u0206" +
		"\x07\xCF\x02\x02\u0206\u020A\x05H%\x02\u0207\u0208\x07\xC3\x02\x02\u0208" +
		"\u020A\x05H%\x02\u0209\u0203\x03\x02\x02\x02\u0209\u0205\x03\x02\x02\x02" +
		"\u0209\u0207\x03\x02\x02\x02\u020A\u020D\x03\x02\x02\x02\u020B\u0209\x03" +
		"\x02\x02\x02\u020B\u020C\x03\x02\x02\x02\u020CG\x03\x02\x02\x02\u020D" +
		"\u020B\x03\x02\x02\x02\u020E\u020F\t\x05\x02\x02\u020F\u0212\x05H%\x02" +
		"\u0210\u0212\x05J&\x02\u0211\u020E\x03\x02\x02\x02\u0211\u0210\x03\x02" +
		"\x02\x02\u0212I\x03\x02\x02\x02\u0213\u021B\x05V,\x02\u0214\u0215\x07" +
		"\xCE\x02\x02\u0215\u0217\x05\u010E\x88\x02\u0216\u0218\x05N(\x02\u0217" +
		"\u0216\x03\x02\x02\x02\u0217\u0218\x03\x02\x02\x02\u0218\u021A\x03\x02" +
		"\x02\x02\u0219\u0214\x03\x02\x02\x02\u021A\u021D\x03\x02\x02\x02\u021B" +
		"\u0219\x03\x02\x02\x02\u021B\u021C\x03\x02\x02\x02\u021CK\x03\x02\x02" +
		"\x02\u021D\u021B\x03\x02\x02\x02\u021E\u0226\x07\xE8\x02\x02\u021F\u0226" +
		"\x07\xE9\x02\x02\u0220\u0226\x07\xEA\x02\x02\u0221\u0226\x07\xEB\x02\x02" +
		"\u0222\u0226\x07\xEC\x02\x02\u0223\u0226\x07\xA2\x02\x02\u0224\u0226\x05" +
		"\xA2R\x02\u0225\u021E\x03\x02\x02\x02\u0225\u021F\x03\x02\x02\x02\u0225" +
		"\u0220\x03\x02\x02\x02\u0225\u0221\x03\x02\x02\x02\u0225\u0222\x03\x02" +
		"\x02\x02\u0225\u0223\x03\x02\x02\x02\u0225\u0224\x03\x02\x02\x02\u0226" +
		"M\x03\x02\x02\x02\u0227\u0228\x05P)\x02\u0228O\x03\x02\x02\x02\u0229\u022B" +
		"\x07\xC5\x02\x02\u022A\u022C\x05R*\x02\u022B\u022A\x03\x02\x02\x02\u022B" +
		"\u022C\x03\x02\x02\x02\u022C\u022D\x03\x02\x02\x02\u022D\u022E\x07\xC6" +
		"\x02\x02\u022EQ\x03\x02\x02\x02\u022F\u0234\x05T+\x02\u0230\u0231\x07" +
		"\xCC\x02\x02\u0231\u0233\x05T+\x02\u0232\u0230\x03\x02\x02\x02\u0233\u0236" +
		"\x03\x02\x02\x02\u0234\u0232\x03\x02\x02\x02\u0234\u0235\x03\x02\x02\x02" +
		"\u0235S\x03\x02\x02\x02\u0236\u0234\x03\x02\x02\x02\u0237\u0238\x05\xD2" +
		"j\x02\u0238U\x03\x02\x02\x02\u0239\u0242\x05\x8CG\x02\u023A\u0242\x05" +
		"\x8AF\x02\u023B\u0242\x05n8\x02\u023C\u0242\x05\xA2R\x02\u023D\u0242\x05" +
		"h5\x02\u023E\u0242\x05\\/\x02\u023F\u0242\x05^0\x02\u0240\u0242\x05X-" +
		"\x02\u0241\u0239\x03\x02\x02\x02\u0241\u023A\x03\x02\x02\x02\u0241\u023B" +
		"\x03\x02\x02\x02\u0241\u023C\x03\x02\x02\x02\u0241\u023D\x03\x02\x02\x02" +
		"\u0241\u023E\x03\x02\x02\x02\u0241\u023F\x03\x02\x02\x02\u0241\u0240\x03" +
		"\x02\x02\x02\u0242W\x03\x02\x02\x02\u0243\u0244\x05Z.\x02\u0244Y\x03\x02" +
		"\x02\x02\u0245\u0246\x07\xC5\x02\x02\u0246\u0247\x05B\"\x02\u0247\u0248" +
		"\x07\xC6\x02\x02\u0248[\x03\x02\x02\x02\u0249\u024A\x07l\x02\x02\u024A" +
		"\u024B\x07\xC5\x02\x02\u024B\u024C\x05B\"\x02\u024C\u024D\x07\xCC\x02" +
		"\x02\u024D\u024E\x05B\"\x02\u024E\u024F\x07\xC6\x02\x02\u024F]\x03\x02" +
		"\x02\x02\u0250\u0255\x07\x15\x02\x02\u0251\u0252\x05\xD2j\x02\u0252\u0253" +
		"\x05d3\x02\u0253\u0256\x03\x02\x02\x02\u0254\u0256\x05`1\x02\u0255\u0251" +
		"\x03\x02\x02\x02\u0255\u0254\x03\x02\x02\x02\u0256\u0259\x03\x02\x02\x02" +
		"\u0257\u0258\x079\x02\x02\u0258\u025A\x05\xD2j\x02\u0259\u0257\x03\x02" +
		"\x02\x02\u0259\u025A\x03\x02\x02\x02\u025A\u025B\x03\x02\x02\x02\u025B" +
		"\u025C\x07:\x02\x02\u025C_\x03\x02\x02\x02\u025D\u025F\x05b2\x02\u025E" +
		"\u025D\x03\x02\x02\x02\u025F\u0260\x03\x02\x02\x02\u0260\u025E\x03\x02" +
		"\x02\x02\u0260\u0261\x03\x02\x02\x02\u0261a\x03\x02\x02\x02\u0262\u0263" +
		"\x07\xB4\x02\x02\u0263\u0264\x05*\x16\x02\u0264\u0265\x07\xA1\x02\x02" +
		"\u0265\u0266\x05B\"\x02\u0266c\x03\x02\x02\x02\u0267\u0269\x05f4\x02\u0268" +
		"\u0267\x03\x02\x02\x02\u0269\u026A\x03\x02\x02\x02\u026A\u0268\x03\x02" +
		"\x02\x02\u026A\u026B\x03\x02\x02\x02\u026Be\x03\x02\x02\x02\u026C\u026D" +
		"\x07\xB4\x02\x02\u026D\u026E\x05B\"\x02\u026E\u026F\x07\xA1\x02\x02\u026F" +
		"\u0270\x05B\"\x02\u0270g\x03\x02\x02\x02\u0271\u0274\x05l7\x02\u0272\u0275" +
		"\x05j6\x02\u0273\u0275\x03\x02\x02\x02\u0274\u0272\x03\x02\x02\x02\u0274" +
		"\u0273\x03\x02\x02\x02\u0275i\x03\x02\x02\x02\u0276\u027B\x07\xC5\x02" +
		"\x02\u0277\u027C\x05R*\x02\u0278\u0279\x05\x80A\x02\u0279\u027A\x05:\x1E" +
		"\x02\u027A\u027C\x03\x02\x02\x02\u027B\u0277\x03\x02\x02\x02\u027B\u0278" +
		"\x03\x02\x02\x02\u027C\u027D\x03\x02\x02\x02\u027D\u027F\x07\xC6\x02\x02" +
		"\u027E\u0280\x05v<\x02\u027F\u027E\x03\x02\x02\x02\u027F\u0280\x03\x02" +
		"\x02\x02\u0280k\x03\x02\x02\x02\u0281\u0282\x05\xFE\x80\x02\u0282m\x03" +
		"\x02\x02\x02\u0283\u0284\x05L\'\x02\u0284\u0287\x07\xC5\x02\x02\u0285" +
		"\u0288\x05p9\x02\u0286\u0288\x05r:\x02\u0287\u0285\x03\x02\x02\x02\u0287" +
		"\u0286\x03\x02\x02\x02\u0288\u0298\x03\x02\x02\x02\u0289\u0298\x05\x86" +
		"D\x02\u028A\u028B\x05\u010E\x88\x02\u028B\u028C\x07\xCE\x02\x02\u028C" +
		"\u028D\x07\xA2\x02\x02\u028D\u028E\x07\xC5\x02\x02\u028E\u028F\x07\xC6" +
		"\x02\x02\u028F\u0298\x03\x02\x02\x02\u0290\u0291\x05\u010E\x88\x02\u0291" +
		"\u0292\x07\xCE\x02\x02\u0292\u0293\x07\xA2\x02\x02\u0293\u0298\x03\x02" +
		"\x02\x02\u0294\u0295\t\x06\x02\x02\u0295\u0296\x07\xC5\x02\x02\u0296\u0298" +
		"\x05p9\x02\u0297\u0283\x03\x02\x02\x02\u0297\u0289\x03\x02\x02\x02\u0297" +
		"\u028A\x03\x02\x02\x02\u0297\u0290\x03\x02\x02\x02\u0297\u0294\x03\x02" +
		"\x02\x02\u0298o\x03\x02\x02\x02\u0299\u029C\x05:\x1E\x02\u029A\u029C\x05" +
		"\x88E\x02\u029B\u0299\x03\x02\x02\x02\u029B\u029A\x03\x02\x02\x02\u029B" +
		"\u029C\x03\x02\x02\x02\u029C\u029D\x03\x02\x02\x02\u029D\u029F\x07\xC6" +
		"\x02\x02\u029E\u02A0\x05t;\x02\u029F\u029E\x03\x02\x02\x02\u029F\u02A0" +
		"\x03\x02\x02\x02\u02A0q\x03\x02\x02\x02\u02A1\u02A2\x05\x80A\x02\u02A2" +
		"\u02A3\x05\xD2j\x02\u02A3\u02A5\x07\xC6\x02\x02\u02A4\u02A6\x05v<\x02" +
		"\u02A5\u02A4\x03\x02\x02\x02\u02A5\u02A6\x03\x02\x02\x02\u02A6s\x03\x02" +
		"\x02\x02\u02A7\u02A9\x05x=\x02\u02A8\u02AA\x05\x16\f\x02\u02A9\u02A8\x03" +
		"\x02\x02\x02\u02A9\u02AA\x03\x02\x02\x02\u02AA\u02AC\x03\x02\x02\x02\u02AB" +
		"\u02AD\x05\x84C\x02\u02AC\u02AB\x03\x02\x02\x02\u02AC\u02AD\x03\x02\x02" +
		"\x02\u02AD\u02AF\x03\x02\x02\x02\u02AE\u02B0\x05\x82B\x02\u02AF\u02AE" +
		"\x03\x02\x02\x02\u02AF\u02B0\x03\x02\x02\x02\u02B0\u02B1\x03\x02\x02\x02" +
		"\u02B1\u02B2\x07\xC6\x02\x02\u02B2u\x03\x02\x02\x02\u02B3\u02B4\x05x=" +
		"\x02\u02B4\u02B5\x07\xC6\x02\x02\u02B5w\x03\x02\x02\x02\u02B6\u02B7\x07" +
		"z\x02\x02\u02B7\u02B9\x07\xC5\x02\x02\u02B8\u02BA\x05z>\x02\u02B9\u02B8" +
		"\x03\x02\x02\x02\u02B9\u02BA\x03\x02\x02\x02\u02BAy\x03\x02\x02\x02\u02BB" +
		"\u02BC\x07{\x02\x02\u02BC\u02BD\x07\x13\x02\x02\u02BD\u02BE\x05|?\x02" +
		"\u02BE{\x03\x02\x02\x02\u02BF\u02C4\x05~@\x02\u02C0\u02C1\x07\xCC\x02" +
		"\x02\u02C1\u02C3\x05~@\x02\u02C2\u02C0\x03\x02\x02\x02\u02C3\u02C6\x03" +
		"\x02\x02\x02\u02C4\u02C2\x03\x02\x02\x02\u02C4\u02C5\x03\x02\x02\x02\u02C5" +
		"}\x03\x02\x02\x02\u02C6\u02C4\x03\x02\x02\x02\u02C7\u02C8\x05\xD2j\x02" +
		"\u02C8\x7F\x03\x02\x02\x02\u02C9\u02CA\t\x07\x02\x02\u02CA\x81\x03\x02" +
		"\x02\x02\u02CB\u02CC\x07\xB4\x02\x02\u02CC\u02CD\x05*\x16\x02\u02CD\x83" +
		"\x03\x02\x02\x02\u02CE\u02CF\x07a\x02\x02\u02CF\u02D0\x05\x86D\x02\u02D0" +
		"\x85\x03\x02\x02\x02\u02D1\u02D2\x078\x02\x02\u02D2\u02D3\x07\xC5\x02" +
		"\x02\u02D3\u02D4\x05:\x1E\x02\u02D4\u02D5\x07\xC6\x02\x02\u02D5\x87\x03" +
		"\x02\x02\x02\u02D6\u02D7\x07\xC9\x02\x02\u02D7\x89\x03\x02\x02\x02\u02D8" +
		"\u02D9\x05L\'\x02\u02D9\u02DA\x07\xC5\x02\x02\u02DA\u02DB\x05\xD2j\x02" +
		"\u02DB\u02DC\x07\n\x02\x02\u02DC\u02DD\x05\xA2R\x02\u02DD\u02DE\x07\xC6" +
		"\x02\x02\u02DE\x8B\x03\x02\x02\x02\u02DF\u02E7\x05\xAAV\x02\u02E0\u02E7" +
		"\x05\xACW\x02\u02E1\u02E7\x05\x8EH\x02\u02E2\u02E7\x05\x90I\x02\u02E3" +
		"\u02E7\x05\x92J\x02\u02E4\u02E7\x05\x9CO\x02\u02E5\u02E7\x05\x94K\x02" +
		"\u02E6\u02DF\x03\x02\x02\x02\u02E6\u02E0\x03\x02\x02\x02\u02E6\u02E1\x03" +
		"\x02\x02\x02\u02E6\u02E2\x03\x02\x02\x02\u02E6\u02E3\x03\x02\x02\x02\u02E6" +
		"\u02E4\x03\x02\x02\x02\u02E6\u02E5\x03\x02\x02\x02\u02E7\x8D\x03\x02\x02" +
		"\x02\u02E8\u02E9\x07\xE3\x02\x02\u02E9\x8F\x03\x02\x02\x02\u02EA\u02EB" +
		"\x07\xEB\x02\x02\u02EB\x91\x03\x02\x02\x02\u02EC\u02ED\x07\xE5\x02\x02" +
		"\u02ED\x93\x03\x02\x02\x02\u02EE\u02EF\x07k\x02\x02\u02EF\x95\x03\x02" +
		"\x02\x02\u02F0\u02F1\x07\xC5\x02\x02\u02F1\u02F2\x05(\x15\x02\u02F2\u02F3" +
		"\x07\xC6\x02\x02\u02F3\x97\x03\x02\x02\x02\u02F4\u02F9\x05\x9EP\x02\u02F5" +
		"\u02F7\x07\n\x02\x02\u02F6\u02F5\x03\x02\x02\x02\u02F6\u02F7\x03\x02\x02" +
		"\x02\u02F7\u02F8\x03\x02\x02\x02\u02F8\u02FA\x05\x9AN\x02\u02F9\u02F6" +
		"\x03\x02\x02\x02\u02F9\u02FA\x03\x02\x02\x02\u02FA\u0300\x03\x02\x02\x02" +
		"\u02FB\u02FC\x05\x9AN\x02\u02FC\u02FD\x07\xD3\x02\x02\u02FD\u02FE\x05" +
		"\x9EP\x02\u02FE\u0300\x03\x02\x02\x02\u02FF\u02F4\x03\x02\x02\x02\u02FF" +
		"\u02FB\x03\x02\x02\x02\u0300\x99\x03\x02\x02\x02\u0301\u0304\x05\x9CO" +
		"\x02\u0302\u0304\x05\u010E\x88\x02\u0303\u0301\x03\x02\x02\x02\u0303\u0302" +
		"\x03\x02\x02\x02\u0304\x9B\x03\x02\x02\x02\u0305\u0306\t\b\x02\x02\u0306" +
		"\x9D\x03\x02\x02\x02\u0307\u0308\x05\xD2j\x02\u0308\x9F\x03\x02\x02\x02" +
		"\u0309\u030A\x05L\'\x02\u030A\xA1\x03\x02\x02\x02\u030B\u0311\x05\xA4" +
		"S\x02\u030C\u030E\x05\xA6T\x02\u030D\u030F\x05\xA8U\x02\u030E\u030D\x03" +
		"\x02\x02\x02\u030E\u030F\x03\x02\x02\x02\u030F\u0311\x03\x02\x02\x02\u0310" +
		"\u030B\x03\x02\x02\x02\u0310\u030C\x03\x02\x02\x02\u0311\xA3\x03\x02\x02" +
		"\x02\u0312\u0313\t\t\x02\x02\u0313\xA5\x03\x02\x02\x02\u0314\u0315\t\n" +
		"\x02\x02\u0315\xA7\x03\x02\x02\x02\u0316\u0317\x07\xC5\x02\x02\u0317\u0318" +
		"\x05\xA0Q\x02\u0318\u0319\x07\xC6\x02\x02\u0319\xA9\x03\x02\x02\x02\u031A" +
		"\u031B\x07\xE2\x02\x02\u031B\xAB\x03\x02\x02\x02\u031C\u031D\x07\xE4\x02" +
		"\x02\u031D\xAD\x03\x02\x02\x02\u031E\u031F\x07d\x02\x02\u031F\u0320\x05" +
		"\xB0Y\x02\u0320\xAF\x03\x02\x02\x02\u0321\u0322\x07\xC5\x02\x02\u0322" +
		"\u0324\x05\x84C\x02\u0323\u0325\x05z>\x02\u0324\u0323\x03\x02\x02\x02" +
		"\u0324\u0325\x03\x02\x02\x02\u0325\u0326\x03\x02\x02\x02\u0326\u0327\x05" +
		"\xB2Z\x02\u0327\u0328\x05\xB8]\x02\u0328\u0329\x05\xBA^\x02\u0329\u032A" +
		"\x05\xC4c\x02\u032A\u032B\x07\xC6\x02\x02\u032B\u032C\x07\n\x02\x02\u032C" +
		"\u032D\x05\x9AN\x02\u032D\xB1\x03\x02\x02\x02\u032E\u032F\x07e\x02\x02" +
		"\u032F\u0330\x05\xB4[\x02\u0330\u0331\x07\n\x02\x02\u0331\u0332\x05\xB6" +
		"\\\x02\u0332\u033A\x03\x02\x02\x02\u0333\u0334\x07\xCC\x02\x02\u0334\u0335" +
		"\x05\xB4[\x02\u0335\u0336\x07\n\x02\x02\u0336\u0337\x05\xB6\\\x02\u0337" +
		"\u0339\x03\x02\x02\x02\u0338\u0333\x03\x02\x02\x02\u0339\u033C\x03\x02" +
		"\x02\x02\u033A\u0338\x03\x02\x02\x02\u033A\u033B\x03\x02\x02\x02\u033B" +
		"\xB3\x03\x02\x02\x02\u033C\u033A\x03\x02\x02\x02\u033D\u033E\x05\xD2j" +
		"\x02\u033E\xB5\x03\x02\x02\x02\u033F\u0340\x05\x9AN\x02\u0340\xB7\x03" +
		"\x02\x02\x02\u0341\u0342\x07\x04\x02\x02\u0342\u0343\x07c\x02\x02\u0343" +
		"\u0344\x07\x9B\x02\x02\u0344\u0345\x07\xA3\x02\x02\u0345\u0346\x07g\x02" +
		"\x02\u0346\u0347\x07\x90\x02\x02\u0347\xB9\x03\x02\x02\x02\u0348\u0349" +
		"\x07|\x02\x02\u0349\u034B\x07\xC5\x02\x02\u034A\u034C\x05\xBC_\x02\u034B" +
		"\u034A\x03\x02\x02\x02\u034C\u034D\x03\x02\x02\x02\u034D\u034B\x03\x02" +
		"\x02\x02\u034D\u034E\x03\x02\x02\x02\u034E\u034F\x03\x02\x02\x02\u034F" +
		"\u0350\x07\xC6\x02\x02\u0350\xBB\x03\x02\x02\x02\u0351\u0356\x05\xBE`" +
		"\x02\u0352\u0353\x07\xD7\x02\x02\u0353\u0355\x05\xBC_\x02\u0354\u0352" +
		"\x03\x02\x02\x02\u0355\u0358\x03\x02\x02\x02\u0356\u0354\x03\x02\x02\x02" +
		"\u0356\u0357\x03\x02\x02\x02\u0357\xBD\x03\x02\x02\x02\u0358\u0356\x03" +
		"\x02\x02\x02\u0359\u035B\x05\xC0a\x02\u035A\u0359\x03\x02\x02\x02\u035B" +
		"\u035C\x03\x02\x02\x02\u035C\u035A\x03\x02\x02\x02\u035C\u035D\x03\x02" +
		"\x02\x02\u035D\xBF\x03\x02\x02\x02\u035E\u0364\x05\u010E\x88\x02\u035F" +
		"\u0360\x07\xC5\x02\x02\u0360\u0361\x05\xBC_\x02\u0361\u0362\x07\xC6\x02" +
		"\x02\u0362\u0364\x03\x02\x02\x02\u0363\u035E\x03\x02\x02\x02\u0363\u035F" +
		"\x03\x02\x02\x02\u0364\u0366\x03\x02\x02\x02\u0365\u0367\x05\xC2b\x02" +
		"\u0366\u0365\x03\x02\x02\x02\u0366\u0367\x03\x02\x02\x02\u0367\xC1\x03" +
		"\x02\x02\x02\u0368\u0375\x07\xC9\x02\x02\u0369\u0375\x07\xCB\x02\x02\u036A" +
		"\u0375\x07\xE1\x02\x02\u036B\u036C\x07\xC7\x02\x02\u036C\u0371\x07\xE2" +
		"\x02\x02\u036D\u036F\x07\xCC\x02\x02\u036E\u0370\x07\xE2\x02\x02\u036F" +
		"\u036E\x03\x02\x02\x02\u036F\u0370\x03\x02\x02\x02\u0370\u0372\x03\x02" +
		"\x02\x02\u0371\u036D\x03\x02\x02\x02\u0371\u0372\x03\x02\x02\x02\u0372" +
		"\u0373\x03\x02\x02\x02\u0373\u0375\x07\xC8\x02\x02\u0374\u0368\x03\x02" +
		"\x02\x02\u0374\u0369\x03\x02\x02\x02\u0374\u036A\x03\x02\x02\x02\u0374" +
		"\u036B\x03\x02\x02\x02\u0375\xC3\x03\x02\x02\x02\u0376\u0377\x070\x02" +
		"\x02\u0377\u037C\x05\xC6d\x02\u0378\u0379\x07\xCC\x02\x02\u0379\u037B" +
		"\x05\xC6d\x02\u037A\u0378\x03\x02\x02\x02\u037B\u037E\x03\x02\x02\x02" +
		"\u037C\u037A\x03\x02\x02\x02\u037C\u037D\x03\x02\x02\x02\u037D\xC5\x03" +
		"\x02\x02\x02\u037E\u037C\x03\x02\x02\x02\u037F\u0380\x05\u010E\x88\x02" +
		"\u0380\u0383\x07\n\x02\x02\u0381\u0384\x05*\x16\x02\u0382\u0384\x05\xD2" +
		"j\x02\u0383\u0381\x03\x02\x02\x02\u0383\u0382\x03\x02\x02\x02\u0384\xC7" +
		"\x03\x02\x02\x02\u0385\u0386\x07Z\x02\x02\u0386\u0387\x05\xCCg\x02\u0387" +
		"\xC9\x03\x02\x02\x02\u0388\u0389\x07O\x02\x02\u0389\u038A\x05(\x15\x02" +
		"\u038A\xCB\x03\x02\x02\x02\u038B\u038E\x05\u010E\x88\x02\u038C\u038D\x07" +
		"\xCE\x02\x02\u038D\u038F\x05\u010E\x88\x02\u038E\u038C\x03\x02\x02\x02" +
		"\u038E\u038F\x03\x02\x02\x02\u038F\u0392\x03\x02\x02\x02\u0390\u0391\x07" +
		"\xCE\x02\x02\u0391\u0393\x05\u010E\x88\x02\u0392\u0390\x03\x02\x02\x02" +
		"\u0392\u0393\x03\x02\x02\x02\u0393\xCD\x03\x02\x02\x02\u0394\u0397\x05" +
		"\xD0i\x02\u0395\u0397\x05\x98M\x02\u0396\u0394\x03\x02\x02\x02\u0396\u0395" +
		"\x03\x02\x02\x02\u0397\xCF\x03\x02\x02\x02\u0398\u03A5\x07\xC9\x02\x02" +
		"\u0399\u039E\x05\u010E\x88\x02\u039A\u039B\x07\xCE\x02\x02\u039B\u039D" +
		"\x05\u010E\x88\x02\u039C\u039A\x03\x02\x02\x02\u039D\u03A0\x03\x02\x02" +
		"\x02\u039E\u039C\x03\x02\x02\x02\u039E\u039F\x03\x02\x02\x02\u039F\u03A1" +
		"\x03\x02\x02\x02\u03A0\u039E\x03\x02\x02\x02\u03A1\u03A2\x07\xCE\x02\x02" +
		"\u03A2\u03A3\x07\xC9\x02\x02\u03A3\u03A5\x03\x02\x02\x02\u03A4\u0398\x03" +
		"\x02\x02\x02\u03A4\u0399\x03\x02\x02\x02\u03A5\xD1\x03\x02\x02\x02\u03A6" +
		"\u03A7\x05B\"\x02\u03A7\xD3\x03\x02\x02\x02\u03A8\u03AA\x07\xE0\x02\x02" +
		"\u03A9\u03A8\x03\x02\x02\x02\u03AA\u03AD\x03\x02\x02\x02\u03AB\u03A9\x03" +
		"\x02\x02\x02\u03AB\u03AC\x03\x02\x02\x02\u03AC\xD5\x03\x02\x02\x02\u03AD" +
		"\u03AB\x03\x02\x02\x02\u03AE\u03AF\x07I\x02\x02\u03AF\u03B3\x05\xD8m\x02" +
		"\u03B0\u03B2\x05\xEAv\x02\u03B1\u03B0\x03\x02\x02\x02\u03B2\u03B5\x03" +
		"\x02\x02\x02\u03B3\u03B1\x03\x02\x02\x02\u03B3\u03B4\x03\x02\x02\x02\u03B4" +
		"\xD7\x03\x02\x02\x02\u03B5\u03B3\x03\x02\x02\x02\u03B6\u03BB\x05\xDAn" +
		"\x02\u03B7\u03B8\x07\xCC\x02\x02\u03B8\u03BA\x05\xDAn\x02\u03B9\u03B7" +
		"\x03\x02\x02\x02\u03BA\u03BD\x03\x02\x02\x02\u03BB\u03B9\x03\x02\x02\x02" +
		"\u03BB\u03BC\x03\x02\x02\x02\u03BC\xD9\x03\x02\x02\x02\u03BD\u03BB\x03" +
		"\x02\x02\x02\u03BE\u03C2\x05\xDCo\x02\u03BF\u03C1\x05\xECw\x02\u03C0\u03BF" +
		"\x03\x02\x02\x02\u03C1\u03C4\x03\x02\x02\x02\u03C2\u03C0\x03\x02\x02\x02" +
		"\u03C2\u03C3\x03\x02\x02\x02\u03C3\xDB\x03\x02\x02\x02\u03C4\u03C2\x03" +
		"\x02\x02\x02\u03C5\u03C8\x05\xDEp\x02\u03C6\u03C8\x05\xE4s\x02\u03C7\u03C5" +
		"\x03\x02\x02\x02\u03C7\u03C6\x03\x02\x02\x02\u03C8\xDD\x03\x02\x02\x02" +
		"\u03C9\u03CA\x05\xE0q\x02\u03CA\u03CC\x05\xE2r\x02\u03CB\u03CD\x05\x14" +
		"\v\x02\u03CC\u03CB\x03\x02\x02\x02\u03CC\u03CD\x03\x02\x02\x02\u03CD\xDF" +
		"\x03\x02\x02\x02\u03CE\u03CF\x07\xC5\x02\x02\u03CF\u03D0\x05\f\x07\x02" +
		"\u03D0\u03D1\x07\xC6\x02\x02\u03D1\xE1\x03\x02\x02\x02\u03D2\u03D4\x07" +
		"\n\x02\x02\u03D3\u03D2\x03\x02\x02\x02\u03D3\u03D4\x03\x02\x02\x02\u03D4" +
		"\u03D5\x03\x02\x02\x02\u03D5\u03D6\x05\u010E\x88\x02\u03D6\xE3\x03\x02" +
		"\x02\x02\u03D7\u03DA\x05\xFC\x7F\x02\u03D8\u03DB\x05\xE8u\x02\u03D9\u03DB" +
		"\x05\xE6t\x02\u03DA\u03D8\x03\x02\x02\x02\u03DA\u03D9\x03\x02\x02\x02" +
		"\u03DB\xE5\x03\x02\x02\x02\u03DC\u03DE\x05P)\x02\u03DD\u03DF\x05\xE2r" +
		"\x02\u03DE\u03DD\x03\x02\x02\x02\u03DE\u03DF\x03\x02\x02\x02\u03DF\u03E1" +
		"\x03\x02\x02\x02\u03E0\u03E2\x05\x14\v\x02\u03E1\u03E0\x03\x02\x02\x02" +
		"\u03E1\u03E2\x03\x02\x02\x02\u03E2\xE7\x03\x02\x02\x02\u03E3\u03E9\x05" +
		"\xFA~\x02\u03E4\u03E6\x05\xE2r\x02\u03E5\u03E7\x05\xFA~\x02\u03E6\u03E5" +
		"\x03\x02\x02\x02\u03E6\u03E7\x03\x02\x02\x02\u03E7\u03E9\x03\x02\x02\x02" +
		"\u03E8\u03E3\x03\x02\x02\x02\u03E8\u03E4\x03\x02\x02\x02\u03E8\u03E9\x03" +
		"\x02\x02\x02\u03E9\u03ED\x03\x02\x02\x02\u03EA\u03EC\x05\xEAv\x02\u03EB" +
		"\u03EA\x03\x02\x02\x02\u03EC\u03EF\x03\x02\x02\x02\u03ED\u03EB\x03\x02" +
		"\x02\x02\u03ED\u03EE\x03\x02\x02\x02\u03EE\xE9\x03\x02\x02\x02\u03EF\u03ED" +
		"\x03\x02\x02\x02\u03F0\u03F3\x05z>\x02\u03F1\u03F2\x07Z\x02\x02\u03F2" +
		"\u03F4\x05\xAAV\x02\u03F3\u03F1\x03\x02\x02\x02\u03F3\u03F4\x03\x02\x02" +
		"\x02\u03F4\u03FB\x03\x02\x02\x02\u03F5\u03F8\x05\xF8}\x02\u03F6\u03F7" +
		"\x07z\x02\x02\u03F7\u03F9\x05:\x1E\x02\u03F8\u03F6\x03\x02\x02\x02\u03F8" +
		"\u03F9\x03\x02\x02\x02\u03F9\u03FB\x03\x02\x02\x02\u03FA\u03F0\x03\x02" +
		"\x02\x02\u03FA\u03F5\x03\x02\x02\x02\u03FB\xEB\x03\x02\x02\x02\u03FC\u03FF" +
		"\x05\xEEx\x02\u03FD\u03FF\x05\xF4{\x02\u03FE\u03FC\x03\x02\x02\x02\u03FE" +
		"\u03FD\x03\x02\x02\x02\u03FF\xED\x03\x02\x02\x02\u0400\u0402\x05\xF0y" +
		"\x02\u0401\u0403\x05\xF2z\x02\u0402\u0401\x03\x02\x02\x02\u0402\u0403" +
		"\x03\x02\x02\x02\u0403\xEF\x03\x02\x02\x02\u0404\u040E\x07W\x02\x02\u0405" +
		"\u0407\x07_\x02\x02\u0406\u0408\x07y\x02\x02\u0407\u0406\x03\x02\x02\x02" +
		"\u0407\u0408\x03\x02\x02\x02\u0408\u040E\x03\x02\x02\x02\u0409\u040B\x07" +
		"\x8E\x02\x02\u040A\u040C\x07y\x02\x02\u040B\u040A\x03\x02\x02\x02\u040B" +
		"\u040C\x03\x02\x02\x02\u040C\u040E\x03\x02\x02\x02\u040D\u0404\x03\x02" +
		"\x02\x02\u040D\u0405\x03\x02\x02\x02\u040D\u0409\x03\x02\x02\x02\u040D" +
		"\u040E\x03\x02\x02\x02\u040E\u040F\x03\x02\x02\x02\u040F\u0410\x07\\\x02" +
		"\x02\u0410\u0411\x03\x02\x02\x02\u0411\u0412\x05\xDAn\x02\u0412\xF1\x03" +
		"\x02\x02\x02\u0413\u0414\x07p\x02\x02\u0414\u0415\x05(\x15\x02\u0415\xF3" +
		"\x03\x02\x02\x02\u0416\u0417\x05\xF6|\x02\u0417\u0418\x05\xDCo\x02\u0418" +
		"\xF5\x03\x02\x02\x02\u0419\u041D\x07$\x02\x02\u041A\u041E\x07\\\x02\x02" +
		"\u041B\u041E\x07\t\x02\x02\u041C\u041E\x05L\'\x02\u041D\u041A\x03\x02" +
		"\x02\x02\u041D\u041B\x03\x02\x02\x02\u041D\u041C\x03\x02\x02\x02\u041E" +
		"\u0425\x03\x02\x02\x02\u041F\u0422\x07y\x02\x02\u0420\u0423\x07\t\x02" +
		"\x02\u0421\u0423\x05L\'\x02\u0422\u0420\x03\x02\x02\x02\u0422\u0421\x03" +
		"\x02\x02\x02\u0423\u0425\x03\x02\x02\x02\u0424\u0419\x03\x02\x02\x02\u0424" +
		"\u041F\x03\x02\x02\x02\u0425\xF7\x03\x02\x02\x02\u0426\u0427\x07\xA2\x02" +
		"\x02\u0427\u0428\x07\x13\x02\x02\u0428\u0429\x05\xD2j\x02\u0429\xF9\x03" +
		"\x02\x02\x02\u042A\u042B\x05L\'\x02\u042B\xFB\x03\x02\x02\x02\u042C\u042F" +
		"\x05\xCCg\x02\u042D\u042E\x07\xCE\x02\x02\u042E\u0430\x05\u010E\x88\x02" +
		"\u042F\u042D\x03\x02\x02\x02\u042F\u0430\x03\x02\x02\x02\u0430\xFD\x03" +
		"\x02\x02\x02\u0431\u0435\x05\u010E\x88\x02\u0432\u0434\x05\u0100\x81\x02" +
		"\u0433\u0432\x03\x02\x02\x02\u0434\u0437\x03\x02\x02\x02\u0435\u0433\x03" +
		"\x02\x02\x02\u0435\u0436\x03\x02\x02\x02\u0436\xFF\x03\x02\x02\x02\u0437" +
		"\u0435\x03\x02\x02\x02\u0438\u0439\x07\xCE\x02\x02\u0439\u043A\x05\u010E" +
		"\x88\x02\u043A\u0101\x03\x02\x02\x02\u043B\u043C\x07#\x02\x02\u043C\u043D" +
		"\x07\x9F\x02\x02\u043D\u043E\x05\xCCg\x02\u043E\u043F\x07\xC5\x02\x02" +
		"\u043F\u0440\x05\u0104\x83\x02\u0440\u0441\x07\xC6\x02\x02\u0441\u0103" +
		"\x03\x02\x02\x02\u0442\u0444\x05\u0106\x84\x02\u0443\u0445\x07\xCC\x02" +
		"\x02\u0444\u0443\x03\x02\x02\x02\u0444\u0445\x03\x02\x02\x02\u0445\u0105" +
		"\x03\x02\x02\x02\u0446\u044B\x05\u0108\x85\x02\u0447\u0448\x07\xCC\x02" +
		"\x02\u0448\u044A\x05\u0108\x85\x02\u0449\u0447\x03\x02\x02\x02\u044A\u044D" +
		"\x03\x02\x02\x02\u044B\u0449\x03\x02\x02\x02\u044B\u044C\x03\x02\x02\x02" +
		"\u044C\u0107\x03\x02\x02\x02\u044D\u044B\x03\x02\x02\x02\u044E\u0451\x05" +
		"\u010A\x86\x02\u044F\u0451\x05\u0110\x89\x02\u0450\u044E\x03\x02\x02\x02" +
		"\u0450\u044F\x03\x02\x02\x02\u0451\u0109\x03\x02\x02\x02\u0452\u0453\x05" +
		"\u010E\x88\x02\u0453\u0454\x05\u010C\x87\x02\u0454\u010B\x03\x02\x02\x02" +
		"\u0455\u0456\x05\xA2R\x02\u0456\u010D\x03\x02\x02\x02\u0457\u045A\x05" +
		"L\'\x02\u0458\u045A\x07\xED\x02\x02\u0459\u0457\x03\x02\x02\x02\u0459" +
		"\u0458\x03\x02\x02\x02\u045A\u010F\x03\x02\x02\x02\u045B\u045C\x05\u0112" +
		"\x8A\x02\u045C\u0111\x03\x02\x02\x02\u045D\u045E\x07\x7F\x02\x02\u045E" +
		"\u045F\x07]\x02\x02\u045F\u0460\x05\x14\v\x02\u0460\u0113\x03\x02\x02" +
		"\x02r\u0117\u0126\u0130\u0135\u013F\u0144\u0149\u0151\u0158\u015C\u0160" +
		"\u0163\u0166\u0169\u0171\u017D\u0182\u018F\u01A4\u01AC\u01B2\u01BB\u01C0" +
		"\u01C2\u01C4\u01D8\u01DD\u01E6\u01EA\u01EE\u01FD\u01FF\u0209\u020B\u0211" +
		"\u0217\u021B\u0225\u022B\u0234\u0241\u0255\u0259\u0260\u026A\u0274\u027B" +
		"\u027F\u0287\u0297\u029B\u029F\u02A5\u02A9\u02AC\u02AF\u02B9\u02C4\u02E6" +
		"\u02F6\u02F9\u02FF\u0303\u030E\u0310\u0324\u033A\u034D\u0356\u035C\u0363" +
		"\u0366\u036F\u0371\u0374\u037C\u0383\u038E\u0392\u0396\u039E\u03A4\u03AB" +
		"\u03B3\u03BB\u03C2\u03C7\u03CC\u03D3\u03DA\u03DE\u03E1\u03E6\u03E8\u03ED" +
		"\u03F3\u03F8\u03FA\u03FE\u0402\u0407\u040B\u040D\u041D\u0422\u0424\u042F" +
		"\u0435\u0444\u044B\u0450\u0459";
	public static readonly _serializedATN: string = Utils.join(
		[
			SqlParserParser._serializedATNSegment0,
			SqlParserParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SqlParserParser.__ATN) {
			SqlParserParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SqlParserParser._serializedATN));
		}

		return SqlParserParser.__ATN;
	}

}

export class SqlContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(SqlParserParser.EOF, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_sql; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSql) {
			return visitor.visitSql(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public createTableStatement(): CreateTableStatementContext | undefined {
		return this.tryGetRuleContext(0, CreateTableStatementContext);
	}
	public optSemicolons(): OptSemicolonsContext | undefined {
		return this.tryGetRuleContext(0, OptSemicolonsContext);
	}
	public resultSetDefinitions(): ResultSetDefinitionsContext | undefined {
		return this.tryGetRuleContext(0, ResultSetDefinitionsContext);
	}
	public queryExpression(): QueryExpressionContext | undefined {
		return this.tryGetRuleContext(0, QueryExpressionContext);
	}
	public empty_statement(): Empty_statementContext | undefined {
		return this.tryGetRuleContext(0, Empty_statementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_statement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Empty_statementContext extends ParserRuleContext {
	public Semicolon(): TerminalNode { return this.getToken(SqlParserParser.Semicolon, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_empty_statement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitEmpty_statement) {
			return visitor.visitEmpty_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResultSetDefinitionsContext extends ParserRuleContext {
	public WITH(): TerminalNode { return this.getToken(SqlParserParser.WITH, 0); }
	public resultSetDefinition(): ResultSetDefinitionContext[];
	public resultSetDefinition(i: number): ResultSetDefinitionContext;
	public resultSetDefinition(i?: number): ResultSetDefinitionContext | ResultSetDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ResultSetDefinitionContext);
		} else {
			return this.getRuleContext(i, ResultSetDefinitionContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_resultSetDefinitions; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitResultSetDefinitions) {
			return visitor.visitResultSetDefinitions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResultSetDefinitionContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public AS(): TerminalNode { return this.getToken(SqlParserParser.AS, 0); }
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public queryExpression(): QueryExpressionContext {
		return this.getRuleContext(0, QueryExpressionContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public columnNameList(): ColumnNameListContext | undefined {
		return this.tryGetRuleContext(0, ColumnNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_resultSetDefinition; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitResultSetDefinition) {
			return visitor.visitResultSetDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryExpressionContext extends ParserRuleContext {
	public queryExpressionUnit(): QueryExpressionUnitContext[];
	public queryExpressionUnit(i: number): QueryExpressionUnitContext;
	public queryExpressionUnit(i?: number): QueryExpressionUnitContext | QueryExpressionUnitContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QueryExpressionUnitContext);
		} else {
			return this.getRuleContext(i, QueryExpressionUnitContext);
		}
	}
	public UNION(): TerminalNode[];
	public UNION(i: number): TerminalNode;
	public UNION(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.UNION);
		} else {
			return this.getToken(SqlParserParser.UNION, i);
		}
	}
	public ALL(): TerminalNode[];
	public ALL(i: number): TerminalNode;
	public ALL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.ALL);
		} else {
			return this.getToken(SqlParserParser.ALL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_queryExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQueryExpression) {
			return visitor.visitQueryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryExpressionUnitContext extends ParserRuleContext {
	public querySpecification(): QuerySpecificationContext | undefined {
		return this.tryGetRuleContext(0, QuerySpecificationContext);
	}
	public queryParenthesis(): QueryParenthesisContext | undefined {
		return this.tryGetRuleContext(0, QueryParenthesisContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_queryExpressionUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQueryExpressionUnit) {
			return visitor.visitQueryExpressionUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryParenthesisContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public queryExpression(): QueryExpressionContext {
		return this.getRuleContext(0, QueryExpressionContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_queryParenthesis; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQueryParenthesis) {
			return visitor.visitQueryParenthesis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuerySpecificationContext extends ParserRuleContext {
	public SELECT(): TerminalNode { return this.getToken(SqlParserParser.SELECT, 0); }
	public selectExpression(): SelectExpressionContext[];
	public selectExpression(i: number): SelectExpressionContext;
	public selectExpression(i?: number): SelectExpressionContext | SelectExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SelectExpressionContext);
		} else {
			return this.getRuleContext(i, SelectExpressionContext);
		}
	}
	public fromClause(): FromClauseContext {
		return this.getRuleContext(0, FromClauseContext);
	}
	public uniqueRowFilter(): UniqueRowFilterContext | undefined {
		return this.tryGetRuleContext(0, UniqueRowFilterContext);
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	public intoClause(): IntoClauseContext | undefined {
		return this.tryGetRuleContext(0, IntoClauseContext);
	}
	public whereClause(): WhereClauseContext | undefined {
		return this.tryGetRuleContext(0, WhereClauseContext);
	}
	public groupByClause(): GroupByClauseContext | undefined {
		return this.tryGetRuleContext(0, GroupByClauseContext);
	}
	public havingClause(): HavingClauseContext | undefined {
		return this.tryGetRuleContext(0, HavingClauseContext);
	}
	public matchRecognize(): MatchRecognizeContext | undefined {
		return this.tryGetRuleContext(0, MatchRecognizeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_querySpecification; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQuerySpecification) {
			return visitor.visitQuerySpecification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnNameListContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_columnNameList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitColumnNameList) {
			return visitor.visitColumnNameList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrderByClauseUnitContext extends ParserRuleContext {
	public ORDER(): TerminalNode { return this.getToken(SqlParserParser.ORDER, 0); }
	public BY(): TerminalNode { return this.getToken(SqlParserParser.BY, 0); }
	public expressionWithSortOrder(): ExpressionWithSortOrderContext[];
	public expressionWithSortOrder(i: number): ExpressionWithSortOrderContext;
	public expressionWithSortOrder(i?: number): ExpressionWithSortOrderContext | ExpressionWithSortOrderContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionWithSortOrderContext);
		} else {
			return this.getRuleContext(i, ExpressionWithSortOrderContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_orderByClauseUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOrderByClauseUnit) {
			return visitor.visitOrderByClauseUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionWithSortOrderContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public orderByOption(): OrderByOptionContext | undefined {
		return this.tryGetRuleContext(0, OrderByOptionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionWithSortOrder; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionWithSortOrder) {
			return visitor.visitExpressionWithSortOrder(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrderByOptionContext extends ParserRuleContext {
	public ASC(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.ASC, 0); }
	public DESC(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.DESC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_orderByOption; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOrderByOption) {
			return visitor.visitOrderByOption(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupByClauseContext extends ParserRuleContext {
	public GROUP(): TerminalNode { return this.getToken(SqlParserParser.GROUP, 0); }
	public BY(): TerminalNode { return this.getToken(SqlParserParser.BY, 0); }
	public groupByItemList(): GroupByItemListContext {
		return this.getRuleContext(0, GroupByItemListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_groupByClause; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitGroupByClause) {
			return visitor.visitGroupByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupByItemListContext extends ParserRuleContext {
	public groupByItem(): GroupByItemContext[];
	public groupByItem(i: number): GroupByItemContext;
	public groupByItem(i?: number): GroupByItemContext | GroupByItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(GroupByItemContext);
		} else {
			return this.getRuleContext(i, GroupByItemContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_groupByItemList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitGroupByItemList) {
			return visitor.visitGroupByItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupByItemContext extends ParserRuleContext {
	public simpleGroupByItem(): SimpleGroupByItemContext {
		return this.getRuleContext(0, SimpleGroupByItemContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_groupByItem; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitGroupByItem) {
			return visitor.visitGroupByItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleGroupByItemContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_simpleGroupByItem; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSimpleGroupByItem) {
			return visitor.visitSimpleGroupByItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereClauseContext extends ParserRuleContext {
	public WHERE(): TerminalNode { return this.getToken(SqlParserParser.WHERE, 0); }
	public whereConditionList(): WhereConditionListContext {
		return this.getRuleContext(0, WhereConditionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_whereClause; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitWhereClause) {
			return visitor.visitWhereClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereConditionListContext extends ParserRuleContext {
	public booleanExpression(): BooleanExpressionContext {
		return this.getRuleContext(0, BooleanExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_whereConditionList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitWhereConditionList) {
			return visitor.visitWhereConditionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionContext extends ParserRuleContext {
	public booleanExpressionWithFlags(): BooleanExpressionWithFlagsContext {
		return this.getRuleContext(0, BooleanExpressionWithFlagsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpression) {
			return visitor.visitBooleanExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionWithFlagsContext extends ParserRuleContext {
	public booleanExpressionOr(): BooleanExpressionOrContext {
		return this.getRuleContext(0, BooleanExpressionOrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpressionWithFlags; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpressionWithFlags) {
			return visitor.visitBooleanExpressionWithFlags(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionOrContext extends ParserRuleContext {
	public booleanExpressionAnd(): BooleanExpressionAndContext[];
	public booleanExpressionAnd(i: number): BooleanExpressionAndContext;
	public booleanExpressionAnd(i?: number): BooleanExpressionAndContext | BooleanExpressionAndContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BooleanExpressionAndContext);
		} else {
			return this.getRuleContext(i, BooleanExpressionAndContext);
		}
	}
	public OR(): TerminalNode[];
	public OR(i: number): TerminalNode;
	public OR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.OR);
		} else {
			return this.getToken(SqlParserParser.OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpressionOr; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpressionOr) {
			return visitor.visitBooleanExpressionOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionAndContext extends ParserRuleContext {
	public booleanExpressionUnary(): BooleanExpressionUnaryContext[];
	public booleanExpressionUnary(i: number): BooleanExpressionUnaryContext;
	public booleanExpressionUnary(i?: number): BooleanExpressionUnaryContext | BooleanExpressionUnaryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BooleanExpressionUnaryContext);
		} else {
			return this.getRuleContext(i, BooleanExpressionUnaryContext);
		}
	}
	public AND(): TerminalNode[];
	public AND(i: number): TerminalNode;
	public AND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.AND);
		} else {
			return this.getToken(SqlParserParser.AND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpressionAnd; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpressionAnd) {
			return visitor.visitBooleanExpressionAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionUnaryContext extends ParserRuleContext {
	public NOT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.NOT, 0); }
	public booleanExpressionUnary(): BooleanExpressionUnaryContext | undefined {
		return this.tryGetRuleContext(0, BooleanExpressionUnaryContext);
	}
	public booleanExpressionPrimary(): BooleanExpressionPrimaryContext | undefined {
		return this.tryGetRuleContext(0, BooleanExpressionPrimaryContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpressionUnary; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpressionUnary) {
			return visitor.visitBooleanExpressionUnary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionPrimaryContext extends ParserRuleContext {
	public booleanExpressionParenthesis(): BooleanExpressionParenthesisContext | undefined {
		return this.tryGetRuleContext(0, BooleanExpressionParenthesisContext);
	}
	public expressionWithFlags(): ExpressionWithFlagsContext | undefined {
		return this.tryGetRuleContext(0, ExpressionWithFlagsContext);
	}
	public comparisonOperator(): ComparisonOperatorContext | undefined {
		return this.tryGetRuleContext(0, ComparisonOperatorContext);
	}
	public nullPredicate(): NullPredicateContext | undefined {
		return this.tryGetRuleContext(0, NullPredicateContext);
	}
	public comparisonPredicate(): ComparisonPredicateContext | undefined {
		return this.tryGetRuleContext(0, ComparisonPredicateContext);
	}
	public betweenPredicate(): BetweenPredicateContext | undefined {
		return this.tryGetRuleContext(0, BetweenPredicateContext);
	}
	public likePredicate(): LikePredicateContext | undefined {
		return this.tryGetRuleContext(0, LikePredicateContext);
	}
	public inPredicate(): InPredicateContext | undefined {
		return this.tryGetRuleContext(0, InPredicateContext);
	}
	public NOT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpressionPrimary; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpressionPrimary) {
			return visitor.visitBooleanExpressionPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LikePredicateContext extends ParserRuleContext {
	public LIKE(): TerminalNode { return this.getToken(SqlParserParser.LIKE, 0); }
	public expressionWithFlags(): ExpressionWithFlagsContext {
		return this.getRuleContext(0, ExpressionWithFlagsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_likePredicate; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitLikePredicate) {
			return visitor.visitLikePredicate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BetweenPredicateContext extends ParserRuleContext {
	public BETWEEN(): TerminalNode { return this.getToken(SqlParserParser.BETWEEN, 0); }
	public expressionWithFlags(): ExpressionWithFlagsContext[];
	public expressionWithFlags(i: number): ExpressionWithFlagsContext;
	public expressionWithFlags(i?: number): ExpressionWithFlagsContext | ExpressionWithFlagsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionWithFlagsContext);
		} else {
			return this.getRuleContext(i, ExpressionWithFlagsContext);
		}
	}
	public AND(): TerminalNode { return this.getToken(SqlParserParser.AND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_betweenPredicate; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBetweenPredicate) {
			return visitor.visitBetweenPredicate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InPredicateContext extends ParserRuleContext {
	public IN(): TerminalNode { return this.getToken(SqlParserParser.IN, 0); }
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_inPredicate; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitInPredicate) {
			return visitor.visitInPredicate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NullPredicateContext extends ParserRuleContext {
	public IS(): TerminalNode { return this.getToken(SqlParserParser.IS, 0); }
	public NULL(): TerminalNode { return this.getToken(SqlParserParser.NULL, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_nullPredicate; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNullPredicate) {
			return visitor.visitNullPredicate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparisonPredicateContext extends ParserRuleContext {
	public expressionWithFlags(): ExpressionWithFlagsContext {
		return this.getRuleContext(0, ExpressionWithFlagsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_comparisonPredicate; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitComparisonPredicate) {
			return visitor.visitComparisonPredicate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparisonOperatorContext extends ParserRuleContext {
	public EqualsSign(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.EqualsSign, 0); }
	public GreaterThan(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.GreaterThan, 0); }
	public LessThan(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.LessThan, 0); }
	public Bang(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Bang, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_comparisonOperator; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitComparisonOperator) {
			return visitor.visitComparisonOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionWithFlagsContext extends ParserRuleContext {
	public expressionBinaryPri2(): ExpressionBinaryPri2Context {
		return this.getRuleContext(0, ExpressionBinaryPri2Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionWithFlags; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionWithFlags) {
			return visitor.visitExpressionWithFlags(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionBinaryPri2Context extends ParserRuleContext {
	public expressionBinaryPri1(): ExpressionBinaryPri1Context[];
	public expressionBinaryPri1(i: number): ExpressionBinaryPri1Context;
	public expressionBinaryPri1(i?: number): ExpressionBinaryPri1Context | ExpressionBinaryPri1Context[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionBinaryPri1Context);
		} else {
			return this.getRuleContext(i, ExpressionBinaryPri1Context);
		}
	}
	public Plus(): TerminalNode[];
	public Plus(i: number): TerminalNode;
	public Plus(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Plus);
		} else {
			return this.getToken(SqlParserParser.Plus, i);
		}
	}
	public Minus(): TerminalNode[];
	public Minus(i: number): TerminalNode;
	public Minus(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Minus);
		} else {
			return this.getToken(SqlParserParser.Minus, i);
		}
	}
	public Ampersand(): TerminalNode[];
	public Ampersand(i: number): TerminalNode;
	public Ampersand(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Ampersand);
		} else {
			return this.getToken(SqlParserParser.Ampersand, i);
		}
	}
	public VerticalLine(): TerminalNode[];
	public VerticalLine(i: number): TerminalNode;
	public VerticalLine(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.VerticalLine);
		} else {
			return this.getToken(SqlParserParser.VerticalLine, i);
		}
	}
	public Circumflex(): TerminalNode[];
	public Circumflex(i: number): TerminalNode;
	public Circumflex(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Circumflex);
		} else {
			return this.getToken(SqlParserParser.Circumflex, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionBinaryPri2; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionBinaryPri2) {
			return visitor.visitExpressionBinaryPri2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionBinaryPri1Context extends ParserRuleContext {
	public expressionUnary(): ExpressionUnaryContext[];
	public expressionUnary(i: number): ExpressionUnaryContext;
	public expressionUnary(i?: number): ExpressionUnaryContext | ExpressionUnaryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionUnaryContext);
		} else {
			return this.getRuleContext(i, ExpressionUnaryContext);
		}
	}
	public Star(): TerminalNode[];
	public Star(i: number): TerminalNode;
	public Star(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Star);
		} else {
			return this.getToken(SqlParserParser.Star, i);
		}
	}
	public Divide(): TerminalNode[];
	public Divide(i: number): TerminalNode;
	public Divide(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Divide);
		} else {
			return this.getToken(SqlParserParser.Divide, i);
		}
	}
	public PercentSign(): TerminalNode[];
	public PercentSign(i: number): TerminalNode;
	public PercentSign(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.PercentSign);
		} else {
			return this.getToken(SqlParserParser.PercentSign, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionBinaryPri1; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionBinaryPri1) {
			return visitor.visitExpressionBinaryPri1(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionUnaryContext extends ParserRuleContext {
	public expressionUnary(): ExpressionUnaryContext | undefined {
		return this.tryGetRuleContext(0, ExpressionUnaryContext);
	}
	public Plus(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Plus, 0); }
	public Minus(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Minus, 0); }
	public Tilde(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Tilde, 0); }
	public expressionWithClrElements(): ExpressionWithClrElementsContext | undefined {
		return this.tryGetRuleContext(0, ExpressionWithClrElementsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionUnary; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionUnary) {
			return visitor.visitExpressionUnary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionWithClrElementsContext extends ParserRuleContext {
	public expressionPrimary(): ExpressionPrimaryContext {
		return this.getRuleContext(0, ExpressionPrimaryContext);
	}
	public Dot(): TerminalNode[];
	public Dot(i: number): TerminalNode;
	public Dot(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Dot);
		} else {
			return this.getToken(SqlParserParser.Dot, i);
		}
	}
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public expressionWithClrElementsFunctionCallPart(): ExpressionWithClrElementsFunctionCallPartContext[];
	public expressionWithClrElementsFunctionCallPart(i: number): ExpressionWithClrElementsFunctionCallPartContext;
	public expressionWithClrElementsFunctionCallPart(i?: number): ExpressionWithClrElementsFunctionCallPartContext | ExpressionWithClrElementsFunctionCallPartContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionWithClrElementsFunctionCallPartContext);
		} else {
			return this.getRuleContext(i, ExpressionWithClrElementsFunctionCallPartContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionWithClrElements; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionWithClrElements) {
			return visitor.visitExpressionWithClrElements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonQuotedIdentifierContext extends ParserRuleContext {
	public SqlCommandIdentifier(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.SqlCommandIdentifier, 0); }
	public PseudoColumn(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.PseudoColumn, 0); }
	public DollarPartition(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.DollarPartition, 0); }
	public Money(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Money, 0); }
	public Label(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Label, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.TIMESTAMP, 0); }
	public scalarDataType(): ScalarDataTypeContext | undefined {
		return this.tryGetRuleContext(0, ScalarDataTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_nonQuotedIdentifier; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNonQuotedIdentifier) {
			return visitor.visitNonQuotedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionWithClrElementsFunctionCallPartContext extends ParserRuleContext {
	public parenthesizedOptExpressionWithDefaultList(): ParenthesizedOptExpressionWithDefaultListContext {
		return this.getRuleContext(0, ParenthesizedOptExpressionWithDefaultListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionWithClrElementsFunctionCallPart; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionWithClrElementsFunctionCallPart) {
			return visitor.visitExpressionWithClrElementsFunctionCallPart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParenthesizedOptExpressionWithDefaultListContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public expressionWithDefaultList(): ExpressionWithDefaultListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionWithDefaultListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_parenthesizedOptExpressionWithDefaultList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitParenthesizedOptExpressionWithDefaultList) {
			return visitor.visitParenthesizedOptExpressionWithDefaultList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionWithDefaultListContext extends ParserRuleContext {
	public expressionWithDefault(): ExpressionWithDefaultContext[];
	public expressionWithDefault(i: number): ExpressionWithDefaultContext;
	public expressionWithDefault(i?: number): ExpressionWithDefaultContext | ExpressionWithDefaultContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionWithDefaultContext);
		} else {
			return this.getRuleContext(i, ExpressionWithDefaultContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionWithDefaultList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionWithDefaultList) {
			return visitor.visitExpressionWithDefaultList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionWithDefaultContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionWithDefault; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionWithDefault) {
			return visitor.visitExpressionWithDefault(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionPrimaryContext extends ParserRuleContext {
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public castCall(): CastCallContext | undefined {
		return this.tryGetRuleContext(0, CastCallContext);
	}
	public builtInFunctionCall(): BuiltInFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, BuiltInFunctionCallContext);
	}
	public scalarDataType(): ScalarDataTypeContext | undefined {
		return this.tryGetRuleContext(0, ScalarDataTypeContext);
	}
	public columnOrFunctionCall(): ColumnOrFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, ColumnOrFunctionCallContext);
	}
	public nullIfExpression(): NullIfExpressionContext | undefined {
		return this.tryGetRuleContext(0, NullIfExpressionContext);
	}
	public caseExpression(): CaseExpressionContext | undefined {
		return this.tryGetRuleContext(0, CaseExpressionContext);
	}
	public parenthesisDisambiguatorForExpressions(): ParenthesisDisambiguatorForExpressionsContext | undefined {
		return this.tryGetRuleContext(0, ParenthesisDisambiguatorForExpressionsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionPrimary; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionPrimary) {
			return visitor.visitExpressionPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParenthesisDisambiguatorForExpressionsContext extends ParserRuleContext {
	public expressionParenthesis(): ExpressionParenthesisContext {
		return this.getRuleContext(0, ExpressionParenthesisContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_parenthesisDisambiguatorForExpressions; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitParenthesisDisambiguatorForExpressions) {
			return visitor.visitParenthesisDisambiguatorForExpressions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionParenthesisContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public expressionWithFlags(): ExpressionWithFlagsContext {
		return this.getRuleContext(0, ExpressionWithFlagsContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expressionParenthesis; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpressionParenthesis) {
			return visitor.visitExpressionParenthesis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NullIfExpressionContext extends ParserRuleContext {
	public NULLIF(): TerminalNode { return this.getToken(SqlParserParser.NULLIF, 0); }
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public expressionWithFlags(): ExpressionWithFlagsContext[];
	public expressionWithFlags(i: number): ExpressionWithFlagsContext;
	public expressionWithFlags(i?: number): ExpressionWithFlagsContext | ExpressionWithFlagsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionWithFlagsContext);
		} else {
			return this.getRuleContext(i, ExpressionWithFlagsContext);
		}
	}
	public Comma(): TerminalNode { return this.getToken(SqlParserParser.Comma, 0); }
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_nullIfExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNullIfExpression) {
			return visitor.visitNullIfExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CaseExpressionContext extends ParserRuleContext {
	public CASE(): TerminalNode { return this.getToken(SqlParserParser.CASE, 0); }
	public END(): TerminalNode { return this.getToken(SqlParserParser.END, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public simpleCaseExpression(): SimpleCaseExpressionContext | undefined {
		return this.tryGetRuleContext(0, SimpleCaseExpressionContext);
	}
	public searchedCaseExpression(): SearchedCaseExpressionContext | undefined {
		return this.tryGetRuleContext(0, SearchedCaseExpressionContext);
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.ELSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_caseExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitCaseExpression) {
			return visitor.visitCaseExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchedCaseExpressionContext extends ParserRuleContext {
	public searchedWhenExpression(): SearchedWhenExpressionContext[];
	public searchedWhenExpression(i: number): SearchedWhenExpressionContext;
	public searchedWhenExpression(i?: number): SearchedWhenExpressionContext | SearchedWhenExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SearchedWhenExpressionContext);
		} else {
			return this.getRuleContext(i, SearchedWhenExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_searchedCaseExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSearchedCaseExpression) {
			return visitor.visitSearchedCaseExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchedWhenExpressionContext extends ParserRuleContext {
	public WHEN(): TerminalNode { return this.getToken(SqlParserParser.WHEN, 0); }
	public booleanExpressionWithFlags(): BooleanExpressionWithFlagsContext {
		return this.getRuleContext(0, BooleanExpressionWithFlagsContext);
	}
	public THEN(): TerminalNode { return this.getToken(SqlParserParser.THEN, 0); }
	public expressionWithFlags(): ExpressionWithFlagsContext {
		return this.getRuleContext(0, ExpressionWithFlagsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_searchedWhenExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSearchedWhenExpression) {
			return visitor.visitSearchedWhenExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleCaseExpressionContext extends ParserRuleContext {
	public simpleWhenClauseUnit(): SimpleWhenClauseUnitContext[];
	public simpleWhenClauseUnit(i: number): SimpleWhenClauseUnitContext;
	public simpleWhenClauseUnit(i?: number): SimpleWhenClauseUnitContext | SimpleWhenClauseUnitContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SimpleWhenClauseUnitContext);
		} else {
			return this.getRuleContext(i, SimpleWhenClauseUnitContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_simpleCaseExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSimpleCaseExpression) {
			return visitor.visitSimpleCaseExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleWhenClauseUnitContext extends ParserRuleContext {
	public WHEN(): TerminalNode { return this.getToken(SqlParserParser.WHEN, 0); }
	public expressionWithFlags(): ExpressionWithFlagsContext[];
	public expressionWithFlags(i: number): ExpressionWithFlagsContext;
	public expressionWithFlags(i?: number): ExpressionWithFlagsContext | ExpressionWithFlagsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionWithFlagsContext);
		} else {
			return this.getRuleContext(i, ExpressionWithFlagsContext);
		}
	}
	public THEN(): TerminalNode { return this.getToken(SqlParserParser.THEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_simpleWhenClauseUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSimpleWhenClauseUnit) {
			return visitor.visitSimpleWhenClauseUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnOrFunctionCallContext extends ParserRuleContext {
	public multiPartIdentifier(): MultiPartIdentifierContext {
		return this.getRuleContext(0, MultiPartIdentifierContext);
	}
	public userFunctionCall(): UserFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, UserFunctionCallContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_columnOrFunctionCall; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitColumnOrFunctionCall) {
			return visitor.visitColumnOrFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UserFunctionCallContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public expressionWithDefaultList(): ExpressionWithDefaultListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionWithDefaultListContext);
	}
	public uniqueRowFilter(): UniqueRowFilterContext | undefined {
		return this.tryGetRuleContext(0, UniqueRowFilterContext);
	}
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	public overClauseNoOrderBy(): OverClauseNoOrderByContext | undefined {
		return this.tryGetRuleContext(0, OverClauseNoOrderByContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_userFunctionCall; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitUserFunctionCall) {
			return visitor.visitUserFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiPartIdentifierContext extends ParserRuleContext {
	public identifierList(): IdentifierListContext {
		return this.getRuleContext(0, IdentifierListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_multiPartIdentifier; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMultiPartIdentifier) {
			return visitor.visitMultiPartIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BuiltInFunctionCallContext extends ParserRuleContext {
	public nonQuotedIdentifier(): NonQuotedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NonQuotedIdentifierContext);
	}
	public LeftParenthesis(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.LeftParenthesis, 0); }
	public regularBuiltInFunctionCall(): RegularBuiltInFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, RegularBuiltInFunctionCallContext);
	}
	public aggregateBuiltInFunctionCall(): AggregateBuiltInFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, AggregateBuiltInFunctionCallContext);
	}
	public durationClauseUnit(): DurationClauseUnitContext | undefined {
		return this.tryGetRuleContext(0, DurationClauseUnitContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public Dot(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Dot, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.TIMESTAMP, 0); }
	public RightParenthesis(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.RightParenthesis, 0); }
	public LEFT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.LEFT, 0); }
	public RIGHT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.RIGHT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_builtInFunctionCall; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBuiltInFunctionCall) {
			return visitor.visitBuiltInFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RegularBuiltInFunctionCallContext extends ParserRuleContext {
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	public starColumnReferenceExpression(): StarColumnReferenceExpressionContext | undefined {
		return this.tryGetRuleContext(0, StarColumnReferenceExpressionContext);
	}
	public overClauseUnit(): OverClauseUnitContext | undefined {
		return this.tryGetRuleContext(0, OverClauseUnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_regularBuiltInFunctionCall; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitRegularBuiltInFunctionCall) {
			return visitor.visitRegularBuiltInFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggregateBuiltInFunctionCallContext extends ParserRuleContext {
	public uniqueRowFilter(): UniqueRowFilterContext {
		return this.getRuleContext(0, UniqueRowFilterContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public overClauseNoOrderBy(): OverClauseNoOrderByContext | undefined {
		return this.tryGetRuleContext(0, OverClauseNoOrderByContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_aggregateBuiltInFunctionCall; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitAggregateBuiltInFunctionCall) {
			return visitor.visitAggregateBuiltInFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OverClauseUnitContext extends ParserRuleContext {
	public overClauseBeginning(): OverClauseBeginningContext {
		return this.getRuleContext(0, OverClauseBeginningContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public orderByClauseUnit(): OrderByClauseUnitContext | undefined {
		return this.tryGetRuleContext(0, OrderByClauseUnitContext);
	}
	public limitDurationClauseUnit(): LimitDurationClauseUnitContext | undefined {
		return this.tryGetRuleContext(0, LimitDurationClauseUnitContext);
	}
	public overWhenClauseUnit(): OverWhenClauseUnitContext | undefined {
		return this.tryGetRuleContext(0, OverWhenClauseUnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_overClauseUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOverClauseUnit) {
			return visitor.visitOverClauseUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OverClauseNoOrderByContext extends ParserRuleContext {
	public overClauseBeginning(): OverClauseBeginningContext {
		return this.getRuleContext(0, OverClauseBeginningContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_overClauseNoOrderBy; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOverClauseNoOrderBy) {
			return visitor.visitOverClauseNoOrderBy(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OverClauseBeginningContext extends ParserRuleContext {
	public OVER(): TerminalNode { return this.getToken(SqlParserParser.OVER, 0); }
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public partitionBy(): PartitionByContext | undefined {
		return this.tryGetRuleContext(0, PartitionByContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_overClauseBeginning; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOverClauseBeginning) {
			return visitor.visitOverClauseBeginning(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PartitionByContext extends ParserRuleContext {
	public PARTITION(): TerminalNode { return this.getToken(SqlParserParser.PARTITION, 0); }
	public BY(): TerminalNode { return this.getToken(SqlParserParser.BY, 0); }
	public partitionByItemList(): PartitionByItemListContext {
		return this.getRuleContext(0, PartitionByItemListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_partitionBy; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPartitionBy) {
			return visitor.visitPartitionBy(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PartitionByItemListContext extends ParserRuleContext {
	public partitionByItem(): PartitionByItemContext[];
	public partitionByItem(i: number): PartitionByItemContext;
	public partitionByItem(i?: number): PartitionByItemContext | PartitionByItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PartitionByItemContext);
		} else {
			return this.getRuleContext(i, PartitionByItemContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_partitionByItemList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPartitionByItemList) {
			return visitor.visitPartitionByItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PartitionByItemContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_partitionByItem; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPartitionByItem) {
			return visitor.visitPartitionByItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UniqueRowFilterContext extends ParserRuleContext {
	public ALL(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.ALL, 0); }
	public DISTINCT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.DISTINCT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_uniqueRowFilter; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitUniqueRowFilter) {
			return visitor.visitUniqueRowFilter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OverWhenClauseUnitContext extends ParserRuleContext {
	public WHEN(): TerminalNode { return this.getToken(SqlParserParser.WHEN, 0); }
	public booleanExpressionWithFlags(): BooleanExpressionWithFlagsContext {
		return this.getRuleContext(0, BooleanExpressionWithFlagsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_overWhenClauseUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOverWhenClauseUnit) {
			return visitor.visitOverWhenClauseUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LimitDurationClauseUnitContext extends ParserRuleContext {
	public LIMIT(): TerminalNode { return this.getToken(SqlParserParser.LIMIT, 0); }
	public durationClauseUnit(): DurationClauseUnitContext {
		return this.getRuleContext(0, DurationClauseUnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_limitDurationClauseUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitLimitDurationClauseUnit) {
			return visitor.visitLimitDurationClauseUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DurationClauseUnitContext extends ParserRuleContext {
	public DURATION(): TerminalNode { return this.getToken(SqlParserParser.DURATION, 0); }
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public expressionList(): ExpressionListContext {
		return this.getRuleContext(0, ExpressionListContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_durationClauseUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitDurationClauseUnit) {
			return visitor.visitDurationClauseUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StarColumnReferenceExpressionContext extends ParserRuleContext {
	public Star(): TerminalNode { return this.getToken(SqlParserParser.Star, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_starColumnReferenceExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitStarColumnReferenceExpression) {
			return visitor.visitStarColumnReferenceExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CastCallContext extends ParserRuleContext {
	public nonQuotedIdentifier(): NonQuotedIdentifierContext {
		return this.getRuleContext(0, NonQuotedIdentifierContext);
	}
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public AS(): TerminalNode { return this.getToken(SqlParserParser.AS, 0); }
	public scalarDataType(): ScalarDataTypeContext {
		return this.getRuleContext(0, ScalarDataTypeContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_castCall; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitCastCall) {
			return visitor.visitCastCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public integer(): IntegerContext | undefined {
		return this.tryGetRuleContext(0, IntegerContext);
	}
	public numeric(): NumericContext | undefined {
		return this.tryGetRuleContext(0, NumericContext);
	}
	public real(): RealContext | undefined {
		return this.tryGetRuleContext(0, RealContext);
	}
	public moneyLiteral(): MoneyLiteralContext | undefined {
		return this.tryGetRuleContext(0, MoneyLiteralContext);
	}
	public binary(): BinaryContext | undefined {
		return this.tryGetRuleContext(0, BinaryContext);
	}
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public nullLiteral(): NullLiteralContext | undefined {
		return this.tryGetRuleContext(0, NullLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_literal; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RealContext extends ParserRuleContext {
	public Real(): TerminalNode { return this.getToken(SqlParserParser.Real, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_real; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitReal) {
			return visitor.visitReal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MoneyLiteralContext extends ParserRuleContext {
	public Money(): TerminalNode { return this.getToken(SqlParserParser.Money, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_moneyLiteral; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMoneyLiteral) {
			return visitor.visitMoneyLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BinaryContext extends ParserRuleContext {
	public HexLiteral(): TerminalNode { return this.getToken(SqlParserParser.HexLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_binary; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBinary) {
			return visitor.visitBinary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NullLiteralContext extends ParserRuleContext {
	public NULL(): TerminalNode { return this.getToken(SqlParserParser.NULL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_nullLiteral; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionParenthesisContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public booleanExpression(): BooleanExpressionContext {
		return this.getRuleContext(0, BooleanExpressionContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_booleanExpressionParenthesis; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpressionParenthesis) {
			return visitor.visitBooleanExpressionParenthesis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectColumnContext extends ParserRuleContext {
	public selectColumnExpression(): SelectColumnExpressionContext {
		return this.getRuleContext(0, SelectColumnExpressionContext);
	}
	public stringOrIdentifier(): StringOrIdentifierContext | undefined {
		return this.tryGetRuleContext(0, StringOrIdentifierContext);
	}
	public AS(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.AS, 0); }
	public EqualsSign(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.EqualsSign, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_selectColumn; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSelectColumn) {
			return visitor.visitSelectColumn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringOrIdentifierContext extends ParserRuleContext {
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_stringOrIdentifier; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitStringOrIdentifier) {
			return visitor.visitStringOrIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringLiteralContext extends ParserRuleContext {
	public AsciiStringLiteral(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.AsciiStringLiteral, 0); }
	public UnicodeStringLiteral(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.UnicodeStringLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_stringLiteral; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectColumnExpressionContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_selectColumnExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSelectColumnExpression) {
			return visitor.visitSelectColumnExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MaxContext extends ParserRuleContext {
	public nonQuotedIdentifier(): NonQuotedIdentifierContext {
		return this.getRuleContext(0, NonQuotedIdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_max; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMax) {
			return visitor.visitMax(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScalarDataTypeContext extends ParserRuleContext {
	public buildinTypes(): BuildinTypesContext | undefined {
		return this.tryGetRuleContext(0, BuildinTypesContext);
	}
	public dataTypeSchemaObjectName(): DataTypeSchemaObjectNameContext | undefined {
		return this.tryGetRuleContext(0, DataTypeSchemaObjectNameContext);
	}
	public dataTypeParametersOpt(): DataTypeParametersOptContext | undefined {
		return this.tryGetRuleContext(0, DataTypeParametersOptContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_scalarDataType; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitScalarDataType) {
			return visitor.visitScalarDataType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BuildinTypesContext extends ParserRuleContext {
	public BIGINT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.BIGINT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.FLOAT, 0); }
	public DECIMAL(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.DECIMAL, 0); }
	public DATETIME(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.DATETIME, 0); }
	public BIT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.BIT, 0); }
	public RECORD(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.RECORD, 0); }
	public ARRAY(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.ARRAY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_buildinTypes; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitBuildinTypes) {
			return visitor.visitBuildinTypes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DataTypeSchemaObjectNameContext extends ParserRuleContext {
	public NVARCHAR(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.NVARCHAR, 0); }
	public VARBINARY(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.VARBINARY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_dataTypeSchemaObjectName; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitDataTypeSchemaObjectName) {
			return visitor.visitDataTypeSchemaObjectName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DataTypeParametersOptContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public max(): MaxContext | undefined {
		return this.tryGetRuleContext(0, MaxContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_dataTypeParametersOpt; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitDataTypeParametersOpt) {
			return visitor.visitDataTypeParametersOpt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerContext extends ParserRuleContext {
	public Integer(): TerminalNode { return this.getToken(SqlParserParser.Integer, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_integer; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitInteger) {
			return visitor.visitInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumericContext extends ParserRuleContext {
	public Numeric(): TerminalNode { return this.getToken(SqlParserParser.Numeric, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_numeric; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNumeric) {
			return visitor.visitNumeric(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchRecognizeContext extends ParserRuleContext {
	public MATCH_RECOGNIZE(): TerminalNode { return this.getToken(SqlParserParser.MATCH_RECOGNIZE, 0); }
	public matchRecognizBody(): MatchRecognizBodyContext {
		return this.getRuleContext(0, MatchRecognizBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_matchRecognize; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMatchRecognize) {
			return visitor.visitMatchRecognize(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchRecognizBodyContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public limitDurationClauseUnit(): LimitDurationClauseUnitContext {
		return this.getRuleContext(0, LimitDurationClauseUnitContext);
	}
	public measureClause(): MeasureClauseContext {
		return this.getRuleContext(0, MeasureClauseContext);
	}
	public afterMatch(): AfterMatchContext {
		return this.getRuleContext(0, AfterMatchContext);
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public patternDefines(): PatternDefinesContext {
		return this.getRuleContext(0, PatternDefinesContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public AS(): TerminalNode { return this.getToken(SqlParserParser.AS, 0); }
	public stringOrIdentifier(): StringOrIdentifierContext {
		return this.getRuleContext(0, StringOrIdentifierContext);
	}
	public partitionBy(): PartitionByContext | undefined {
		return this.tryGetRuleContext(0, PartitionByContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_matchRecognizBody; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMatchRecognizBody) {
			return visitor.visitMatchRecognizBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MeasureClauseContext extends ParserRuleContext {
	public MEASURES(): TerminalNode { return this.getToken(SqlParserParser.MEASURES, 0); }
	public measureColumnItem(): MeasureColumnItemContext[];
	public measureColumnItem(i: number): MeasureColumnItemContext;
	public measureColumnItem(i?: number): MeasureColumnItemContext | MeasureColumnItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MeasureColumnItemContext);
		} else {
			return this.getRuleContext(i, MeasureColumnItemContext);
		}
	}
	public AS(): TerminalNode[];
	public AS(i: number): TerminalNode;
	public AS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.AS);
		} else {
			return this.getToken(SqlParserParser.AS, i);
		}
	}
	public columnAlias(): ColumnAliasContext[];
	public columnAlias(i: number): ColumnAliasContext;
	public columnAlias(i?: number): ColumnAliasContext | ColumnAliasContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnAliasContext);
		} else {
			return this.getRuleContext(i, ColumnAliasContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_measureClause; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMeasureClause) {
			return visitor.visitMeasureClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MeasureColumnItemContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_measureColumnItem; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitMeasureColumnItem) {
			return visitor.visitMeasureColumnItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnAliasContext extends ParserRuleContext {
	public stringOrIdentifier(): StringOrIdentifierContext {
		return this.getRuleContext(0, StringOrIdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_columnAlias; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitColumnAlias) {
			return visitor.visitColumnAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AfterMatchContext extends ParserRuleContext {
	public AFTER(): TerminalNode { return this.getToken(SqlParserParser.AFTER, 0); }
	public MATCH(): TerminalNode { return this.getToken(SqlParserParser.MATCH, 0); }
	public TOKENSKIP(): TerminalNode { return this.getToken(SqlParserParser.TOKENSKIP, 0); }
	public TO(): TerminalNode { return this.getToken(SqlParserParser.TO, 0); }
	public NEXT(): TerminalNode { return this.getToken(SqlParserParser.NEXT, 0); }
	public ROW(): TerminalNode { return this.getToken(SqlParserParser.ROW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_afterMatch; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitAfterMatch) {
			return visitor.visitAfterMatch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternContext extends ParserRuleContext {
	public PATTERN(): TerminalNode { return this.getToken(SqlParserParser.PATTERN, 0); }
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	public patternGroup(): PatternGroupContext[];
	public patternGroup(i: number): PatternGroupContext;
	public patternGroup(i?: number): PatternGroupContext | PatternGroupContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternGroupContext);
		} else {
			return this.getRuleContext(i, PatternGroupContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_pattern; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPattern) {
			return visitor.visitPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternGroupContext extends ParserRuleContext {
	public patternNameModifier(): PatternNameModifierContext {
		return this.getRuleContext(0, PatternNameModifierContext);
	}
	public VerticalLine(): TerminalNode[];
	public VerticalLine(i: number): TerminalNode;
	public VerticalLine(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.VerticalLine);
		} else {
			return this.getToken(SqlParserParser.VerticalLine, i);
		}
	}
	public patternGroup(): PatternGroupContext[];
	public patternGroup(i: number): PatternGroupContext;
	public patternGroup(i?: number): PatternGroupContext | PatternGroupContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternGroupContext);
		} else {
			return this.getRuleContext(i, PatternGroupContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_patternGroup; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPatternGroup) {
			return visitor.visitPatternGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternNameModifierContext extends ParserRuleContext {
	public patternAtom(): PatternAtomContext[];
	public patternAtom(i: number): PatternAtomContext;
	public patternAtom(i?: number): PatternAtomContext | PatternAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternAtomContext);
		} else {
			return this.getRuleContext(i, PatternAtomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_patternNameModifier; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPatternNameModifier) {
			return visitor.visitPatternNameModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternAtomContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public LeftParenthesis(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.LeftParenthesis, 0); }
	public patternGroup(): PatternGroupContext | undefined {
		return this.tryGetRuleContext(0, PatternGroupContext);
	}
	public RightParenthesis(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.RightParenthesis, 0); }
	public patternModifier(): PatternModifierContext | undefined {
		return this.tryGetRuleContext(0, PatternModifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_patternAtom; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPatternAtom) {
			return visitor.visitPatternAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternModifierContext extends ParserRuleContext {
	public Star(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Star, 0); }
	public Plus(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Plus, 0); }
	public QuestionMark(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.QuestionMark, 0); }
	public LeftCurly(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.LeftCurly, 0); }
	public Integer(): TerminalNode[];
	public Integer(i: number): TerminalNode;
	public Integer(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Integer);
		} else {
			return this.getToken(SqlParserParser.Integer, i);
		}
	}
	public RightCurly(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.RightCurly, 0); }
	public Comma(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Comma, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_patternModifier; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPatternModifier) {
			return visitor.visitPatternModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternDefinesContext extends ParserRuleContext {
	public _patternDefine!: PatternDefineContext;
	public _pds: PatternDefineContext[] = [];
	public DEFINE(): TerminalNode { return this.getToken(SqlParserParser.DEFINE, 0); }
	public patternDefine(): PatternDefineContext[];
	public patternDefine(i: number): PatternDefineContext;
	public patternDefine(i?: number): PatternDefineContext | PatternDefineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternDefineContext);
		} else {
			return this.getRuleContext(i, PatternDefineContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_patternDefines; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPatternDefines) {
			return visitor.visitPatternDefines(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternDefineContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public AS(): TerminalNode { return this.getToken(SqlParserParser.AS, 0); }
	public booleanExpressionWithFlags(): BooleanExpressionWithFlagsContext | undefined {
		return this.tryGetRuleContext(0, BooleanExpressionWithFlagsContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_patternDefine; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitPatternDefine) {
			return visitor.visitPatternDefine(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntoClauseContext extends ParserRuleContext {
	public INTO(): TerminalNode { return this.getToken(SqlParserParser.INTO, 0); }
	public schemaObjectThreePartName(): SchemaObjectThreePartNameContext {
		return this.getRuleContext(0, SchemaObjectThreePartNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_intoClause; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitIntoClause) {
			return visitor.visitIntoClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HavingClauseContext extends ParserRuleContext {
	public HAVING(): TerminalNode { return this.getToken(SqlParserParser.HAVING, 0); }
	public booleanExpression(): BooleanExpressionContext {
		return this.getRuleContext(0, BooleanExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_havingClause; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitHavingClause) {
			return visitor.visitHavingClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SchemaObjectThreePartNameContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public Dot(): TerminalNode[];
	public Dot(i: number): TerminalNode;
	public Dot(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Dot);
		} else {
			return this.getToken(SqlParserParser.Dot, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_schemaObjectThreePartName; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSchemaObjectThreePartName) {
			return visitor.visitSchemaObjectThreePartName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectExpressionContext extends ParserRuleContext {
	public selectStarExpression(): SelectStarExpressionContext | undefined {
		return this.tryGetRuleContext(0, SelectStarExpressionContext);
	}
	public selectColumn(): SelectColumnContext | undefined {
		return this.tryGetRuleContext(0, SelectColumnContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_selectExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSelectExpression) {
			return visitor.visitSelectExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectStarExpressionContext extends ParserRuleContext {
	public Star(): TerminalNode { return this.getToken(SqlParserParser.Star, 0); }
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public Dot(): TerminalNode[];
	public Dot(i: number): TerminalNode;
	public Dot(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Dot);
		} else {
			return this.getToken(SqlParserParser.Dot, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_selectStarExpression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSelectStarExpression) {
			return visitor.visitSelectStarExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public expressionWithFlags(): ExpressionWithFlagsContext {
		return this.getRuleContext(0, ExpressionWithFlagsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_expression; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptSemicolonsContext extends ParserRuleContext {
	public Semicolon(): TerminalNode[];
	public Semicolon(i: number): TerminalNode;
	public Semicolon(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Semicolon);
		} else {
			return this.getToken(SqlParserParser.Semicolon, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_optSemicolons; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitOptSemicolons) {
			return visitor.visitOptSemicolons(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromClauseContext extends ParserRuleContext {
	public FROM(): TerminalNode { return this.getToken(SqlParserParser.FROM, 0); }
	public fromList(): FromListContext {
		return this.getRuleContext(0, FromListContext);
	}
	public nrtHint(): NrtHintContext[];
	public nrtHint(i: number): NrtHintContext;
	public nrtHint(i?: number): NrtHintContext | NrtHintContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NrtHintContext);
		} else {
			return this.getRuleContext(i, NrtHintContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_fromClause; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitFromClause) {
			return visitor.visitFromClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromListContext extends ParserRuleContext {
	public fromItem(): FromItemContext[];
	public fromItem(i: number): FromItemContext;
	public fromItem(i?: number): FromItemContext | FromItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FromItemContext);
		} else {
			return this.getRuleContext(i, FromItemContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_fromList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitFromList) {
			return visitor.visitFromList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromItemContext extends ParserRuleContext {
	public selectTableReferenceElement(): SelectTableReferenceElementContext {
		return this.getRuleContext(0, SelectTableReferenceElementContext);
	}
	public joinElement(): JoinElementContext[];
	public joinElement(i: number): JoinElementContext;
	public joinElement(i?: number): JoinElementContext | JoinElementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(JoinElementContext);
		} else {
			return this.getRuleContext(i, JoinElementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_fromItem; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitFromItem) {
			return visitor.visitFromItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectTableReferenceElementContext extends ParserRuleContext {
	public derivedTable(): DerivedTableContext | undefined {
		return this.tryGetRuleContext(0, DerivedTableContext);
	}
	public schemaObjectOrFunctionTableReference(): SchemaObjectOrFunctionTableReferenceContext | undefined {
		return this.tryGetRuleContext(0, SchemaObjectOrFunctionTableReferenceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_selectTableReferenceElement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSelectTableReferenceElement) {
			return visitor.visitSelectTableReferenceElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DerivedTableContext extends ParserRuleContext {
	public queryDerivedTable(): QueryDerivedTableContext {
		return this.getRuleContext(0, QueryDerivedTableContext);
	}
	public simpleTableReferenceAlias(): SimpleTableReferenceAliasContext {
		return this.getRuleContext(0, SimpleTableReferenceAliasContext);
	}
	public columnNameList(): ColumnNameListContext | undefined {
		return this.tryGetRuleContext(0, ColumnNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_derivedTable; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitDerivedTable) {
			return visitor.visitDerivedTable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryDerivedTableContext extends ParserRuleContext {
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public queryExpression(): QueryExpressionContext {
		return this.getRuleContext(0, QueryExpressionContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_queryDerivedTable; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQueryDerivedTable) {
			return visitor.visitQueryDerivedTable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleTableReferenceAliasContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public AS(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.AS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_simpleTableReferenceAlias; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSimpleTableReferenceAlias) {
			return visitor.visitSimpleTableReferenceAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SchemaObjectOrFunctionTableReferenceContext extends ParserRuleContext {
	public schemaObjectFourPartName(): SchemaObjectFourPartNameContext {
		return this.getRuleContext(0, SchemaObjectFourPartNameContext);
	}
	public schemaObjectTableReference(): SchemaObjectTableReferenceContext | undefined {
		return this.tryGetRuleContext(0, SchemaObjectTableReferenceContext);
	}
	public schemaObjectFunctionTableReference(): SchemaObjectFunctionTableReferenceContext | undefined {
		return this.tryGetRuleContext(0, SchemaObjectFunctionTableReferenceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_schemaObjectOrFunctionTableReference; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSchemaObjectOrFunctionTableReference) {
			return visitor.visitSchemaObjectOrFunctionTableReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SchemaObjectFunctionTableReferenceContext extends ParserRuleContext {
	public parenthesizedOptExpressionWithDefaultList(): ParenthesizedOptExpressionWithDefaultListContext {
		return this.getRuleContext(0, ParenthesizedOptExpressionWithDefaultListContext);
	}
	public simpleTableReferenceAlias(): SimpleTableReferenceAliasContext | undefined {
		return this.tryGetRuleContext(0, SimpleTableReferenceAliasContext);
	}
	public columnNameList(): ColumnNameListContext | undefined {
		return this.tryGetRuleContext(0, ColumnNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_schemaObjectFunctionTableReference; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSchemaObjectFunctionTableReference) {
			return visitor.visitSchemaObjectFunctionTableReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SchemaObjectTableReferenceContext extends ParserRuleContext {
	public nonParameterTableHints(): NonParameterTableHintsContext | undefined {
		return this.tryGetRuleContext(0, NonParameterTableHintsContext);
	}
	public simpleTableReferenceAlias(): SimpleTableReferenceAliasContext | undefined {
		return this.tryGetRuleContext(0, SimpleTableReferenceAliasContext);
	}
	public nrtHint(): NrtHintContext[];
	public nrtHint(i: number): NrtHintContext;
	public nrtHint(i?: number): NrtHintContext | NrtHintContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NrtHintContext);
		} else {
			return this.getRuleContext(i, NrtHintContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_schemaObjectTableReference; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSchemaObjectTableReference) {
			return visitor.visitSchemaObjectTableReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NrtHintContext extends ParserRuleContext {
	public partitionBy(): PartitionByContext | undefined {
		return this.tryGetRuleContext(0, PartitionByContext);
	}
	public INTO(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.INTO, 0); }
	public integer(): IntegerContext | undefined {
		return this.tryGetRuleContext(0, IntegerContext);
	}
	public timestampBy(): TimestampByContext | undefined {
		return this.tryGetRuleContext(0, TimestampByContext);
	}
	public OVER(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.OVER, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_nrtHint; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNrtHint) {
			return visitor.visitNrtHint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JoinElementContext extends ParserRuleContext {
	public qualifiedJoin(): QualifiedJoinContext | undefined {
		return this.tryGetRuleContext(0, QualifiedJoinContext);
	}
	public unqualifiedJoin(): UnqualifiedJoinContext | undefined {
		return this.tryGetRuleContext(0, UnqualifiedJoinContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_joinElement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitJoinElement) {
			return visitor.visitJoinElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedJoinContext extends ParserRuleContext {
	public qualifiedJoinUnit(): QualifiedJoinUnitContext {
		return this.getRuleContext(0, QualifiedJoinUnitContext);
	}
	public qualifiedJoinOnUnit(): QualifiedJoinOnUnitContext | undefined {
		return this.tryGetRuleContext(0, QualifiedJoinOnUnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_qualifiedJoin; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQualifiedJoin) {
			return visitor.visitQualifiedJoin(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedJoinUnitContext extends ParserRuleContext {
	public fromItem(): FromItemContext {
		return this.getRuleContext(0, FromItemContext);
	}
	public JOIN(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.JOIN, 0); }
	public INNER(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.INNER, 0); }
	public LEFT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.LEFT, 0); }
	public RIGHT(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.RIGHT, 0); }
	public OUTER(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.OUTER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_qualifiedJoinUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQualifiedJoinUnit) {
			return visitor.visitQualifiedJoinUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedJoinOnUnitContext extends ParserRuleContext {
	public ON(): TerminalNode { return this.getToken(SqlParserParser.ON, 0); }
	public booleanExpression(): BooleanExpressionContext {
		return this.getRuleContext(0, BooleanExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_qualifiedJoinOnUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitQualifiedJoinOnUnit) {
			return visitor.visitQualifiedJoinOnUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnqualifiedJoinContext extends ParserRuleContext {
	public unqualifiedJoinUnit(): UnqualifiedJoinUnitContext {
		return this.getRuleContext(0, UnqualifiedJoinUnitContext);
	}
	public selectTableReferenceElement(): SelectTableReferenceElementContext {
		return this.getRuleContext(0, SelectTableReferenceElementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_unqualifiedJoin; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitUnqualifiedJoin) {
			return visitor.visitUnqualifiedJoin(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnqualifiedJoinUnitContext extends ParserRuleContext {
	public CROSS(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.CROSS, 0); }
	public JOIN(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.JOIN, 0); }
	public APPLY(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.APPLY, 0); }
	public nonQuotedIdentifier(): NonQuotedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NonQuotedIdentifierContext);
	}
	public OUTER(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.OUTER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_unqualifiedJoinUnit; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitUnqualifiedJoinUnit) {
			return visitor.visitUnqualifiedJoinUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimestampByContext extends ParserRuleContext {
	public TIMESTAMP(): TerminalNode { return this.getToken(SqlParserParser.TIMESTAMP, 0); }
	public BY(): TerminalNode { return this.getToken(SqlParserParser.BY, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_timestampBy; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitTimestampBy) {
			return visitor.visitTimestampBy(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonParameterTableHintsContext extends ParserRuleContext {
	public nonQuotedIdentifier(): NonQuotedIdentifierContext {
		return this.getRuleContext(0, NonQuotedIdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_nonParameterTableHints; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitNonParameterTableHints) {
			return visitor.visitNonParameterTableHints(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SchemaObjectFourPartNameContext extends ParserRuleContext {
	public schemaObjectThreePartName(): SchemaObjectThreePartNameContext {
		return this.getRuleContext(0, SchemaObjectThreePartNameContext);
	}
	public Dot(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Dot, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_schemaObjectFourPartName; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitSchemaObjectFourPartName) {
			return visitor.visitSchemaObjectFourPartName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public identifierListElement(): IdentifierListElementContext[];
	public identifierListElement(i: number): IdentifierListElementContext;
	public identifierListElement(i?: number): IdentifierListElementContext | IdentifierListElementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierListElementContext);
		} else {
			return this.getRuleContext(i, IdentifierListElementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_identifierList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitIdentifierList) {
			return visitor.visitIdentifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListElementContext extends ParserRuleContext {
	public Dot(): TerminalNode { return this.getToken(SqlParserParser.Dot, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_identifierListElement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitIdentifierListElement) {
			return visitor.visitIdentifierListElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreateTableStatementContext extends ParserRuleContext {
	public CREATE(): TerminalNode { return this.getToken(SqlParserParser.CREATE, 0); }
	public TABLE(): TerminalNode { return this.getToken(SqlParserParser.TABLE, 0); }
	public schemaObjectThreePartName(): SchemaObjectThreePartNameContext {
		return this.getRuleContext(0, SchemaObjectThreePartNameContext);
	}
	public LeftParenthesis(): TerminalNode { return this.getToken(SqlParserParser.LeftParenthesis, 0); }
	public tableDefinitionCreateTable(): TableDefinitionCreateTableContext {
		return this.getRuleContext(0, TableDefinitionCreateTableContext);
	}
	public RightParenthesis(): TerminalNode { return this.getToken(SqlParserParser.RightParenthesis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_createTableStatement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitCreateTableStatement) {
			return visitor.visitCreateTableStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableDefinitionCreateTableContext extends ParserRuleContext {
	public tableElementList(): TableElementListContext {
		return this.getRuleContext(0, TableElementListContext);
	}
	public Comma(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.Comma, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_tableDefinitionCreateTable; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitTableDefinitionCreateTable) {
			return visitor.visitTableDefinitionCreateTable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableElementListContext extends ParserRuleContext {
	public _tableElement!: TableElementContext;
	public _elements: TableElementContext[] = [];
	public tableElement(): TableElementContext[];
	public tableElement(i: number): TableElementContext;
	public tableElement(i?: number): TableElementContext | TableElementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TableElementContext);
		} else {
			return this.getRuleContext(i, TableElementContext);
		}
	}
	public Comma(): TerminalNode[];
	public Comma(i: number): TerminalNode;
	public Comma(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlParserParser.Comma);
		} else {
			return this.getToken(SqlParserParser.Comma, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_tableElementList; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitTableElementList) {
			return visitor.visitTableElementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableElementContext extends ParserRuleContext {
	public columnDefinition(): ColumnDefinitionContext | undefined {
		return this.tryGetRuleContext(0, ColumnDefinitionContext);
	}
	public tableConstraint(): TableConstraintContext | undefined {
		return this.tryGetRuleContext(0, TableConstraintContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_tableElement; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitTableElement) {
			return visitor.visitTableElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColumnDefinitionContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public regularColumnBody(): RegularColumnBodyContext {
		return this.getRuleContext(0, RegularColumnBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_columnDefinition; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitColumnDefinition) {
			return visitor.visitColumnDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RegularColumnBodyContext extends ParserRuleContext {
	public scalarDataType(): ScalarDataTypeContext {
		return this.getRuleContext(0, ScalarDataTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_regularColumnBody; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitRegularColumnBody) {
			return visitor.visitRegularColumnBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public nonQuotedIdentifier(): NonQuotedIdentifierContext | undefined {
		return this.tryGetRuleContext(0, NonQuotedIdentifierContext);
	}
	public QuotedIdentifier(): TerminalNode | undefined { return this.tryGetToken(SqlParserParser.QuotedIdentifier, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_identifier; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableConstraintContext extends ParserRuleContext {
	public uniqueTableConstraint(): UniqueTableConstraintContext {
		return this.getRuleContext(0, UniqueTableConstraintContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_tableConstraint; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitTableConstraint) {
			return visitor.visitTableConstraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UniqueTableConstraintContext extends ParserRuleContext {
	public PRIMARY(): TerminalNode { return this.getToken(SqlParserParser.PRIMARY, 0); }
	public KEY(): TerminalNode { return this.getToken(SqlParserParser.KEY, 0); }
	public columnNameList(): ColumnNameListContext {
		return this.getRuleContext(0, ColumnNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlParserParser.RULE_uniqueTableConstraint; }
	// @Override
	public accept<Result>(visitor: SqlParserVisitor<Result>): Result {
		if (visitor.visitUniqueTableConstraint) {
			return visitor.visitUniqueTableConstraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


