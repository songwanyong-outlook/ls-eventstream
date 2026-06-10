grammar SqlParser;

// lexer rules

// Basic keywords (from https://msdn.microsoft.com/en-us/library/ms189822.aspx)
ADD:                                   'ADD';
ALL:                                   'ALL';
ALTER:                                 'ALTER';
AND:                                   'AND';
ANY:                                   'ANY';
AS:                                    'AS';
ASC:                                   'ASC';
AUTHORIZATION:                         'AUTHORIZATION';
BACKUP:                                'BACKUP';
BEGIN:                                 'BEGIN';
BETWEEN:                               'BETWEEN';
BREAK:                                 'BREAK';
BY:                                    'BY';
BULK:                                  'BULK';
CASCADE:                               'CASCADE';
CASE:                                  'CASE';
CHECK:                                 'CHECK';
CLOSE:                                 'CLOSE';
CLUSTERED:                             'CLUSTERED';
COLLATE:                               'COLLATE';
COLUMN:                                'COLUMN';
COMMIT:                                'COMMIT';
COMPUTE:                               'COMPUTE';
CONSTRAINT:                            'CONSTRAINT';
CONTINUE:                              'CONTINUE';
CONVERT:                               'TRY_'? 'CONVERT';
CREATE:                                'CREATE';
CROSS:                                 'CROSS';
CURRENT:                               'CURRENT';
DATABASE:                              'DATABASE';
DBCC:                                  'DBCC';
DECLARE:                               'DECLARE';
DEFAULT:                               'DEFAULT';
DELETE:                                'DELETE';
DENY:                                  'DENY';
DESC:                                  'DESC';
DISTINCT:                              'DISTINCT';
DROP:                                  'DROP';
ELSE:                                  'ELSE';
END:                                   'END';
EXCEPT:                                'EXCEPT';
EXEC:                                  'EXEC';
EXECUTE:                               'EXECUTE';
EXPLAIN:                               'EXPLAIN';
EXISTS:                                'EXISTS';
EXTERNAL:                              'EXTERNAL';
FETCH:                                 'FETCH';
FILE:                                  'FILE';
FOR:                                   'FOR';
FROM:                                  'FROM';
FULL:                                  'FULL';
FUNCTION:                              'FUNCTION';
GRANT:                                 'GRANT';
GROUP:                                 'GROUP';
HAVING:                                'HAVING';
IDENTITY:                              'IDENTITY';
IF:                                    'IF';
IN:                                    'IN';
INDEX:                                 'INDEX';
INNER:                                 'INNER';
INSERT:                                'INSERT';
INTERSECT:                             'INTERSECT';
INTO:                                  'INTO';
IS:                                    'IS';
JOIN:                                  'JOIN';
KEY:                                   'KEY';
KILL:                                  'KILL';
LEFT:                                  'LEFT';
LIKE:                                  'LIKE';
MERGE:                                 'MERGE';
NONCLUSTERED:                          'NONCLUSTERED';
NOT:                                   'NOT';
NULL:                                  'NULL';
OF:                                    'OF';
OFF:                                   'OFF';
ON:                                    'ON';
OPEN:                                  'OPEN';
OPTION:                                'OPTION';
OR:                                    'OR';
ORDER:                                 'ORDER';
OUTER:                                 'OUTER';
OUTPUT:                                'OUTPUT';
OVER:                                  'OVER';
PERCENT:                               'PERCENT';
PIVOT:                                 'PIVOT';
PRIMARY:                               'PRIMARY';
PRINT:                                 'PRINT';
PROC:                                  'PROC';
PROCEDURE:                             'PROCEDURE';
RAISERROR:                             'RAISERROR';
READ:                                  'READ';
REFERENCES:                            'REFERENCES';
RENAME:                                'RENAME';
REPLICATION:                           'REPLICATION';
RETURN:                                'RETURN';
REVOKE:                                'REVOKE';
RIGHT:                                 'RIGHT';
ROLLBACK:                              'ROLLBACK';
ROWGUIDCOL:                            'ROWGUIDCOL';
SCHEMA:                                'SCHEMA';
SELECT:                                'SELECT';
SET:                                   'SET';
STATISTICS:                            'STATISTICS';
TABLE:                                 'TABLE';
TABLESAMPLE:                           'TABLESAMPLE';
TEXTSIZE:                              'TEXTSIZE';
THEN:                                  'THEN';
TO:                                    'TO';
TOP:                                   'TOP';
TRAN:                                  'TRAN';
TRANSACTION:                           'TRANSACTION';
TRUNCATE:                              'TRUNCATE';
UNION:                                 'UNION';
UNIQUE:                                'UNIQUE';
UNPIVOT:                               'UNPIVOT';
UPDATE:                                'UPDATE';
USER:                                  'USER';
VALUES:                                'VALUES';
VARYING:                               'VARYING';
VIEW:                                  'VIEW';
WHEN:                                  'WHEN';
WHERE:                                 'WHERE';
WHILE:                                 'WHILE';
WITH:                                  'WITH';

// non-reserved keywords
ABORT_AFTER_WAIT:                      'ABORT_AFTER_WAIT';
ABOVE_NORMAL:                          'ABOVE_NORMAL';
ABSOLUTE:                              'ABSOLUTE';
ACTION:                                'ACTION';
ADMINISTER:                            'ADMINISTER';
AFTER:                                 'AFTER';
ALGORITHM:                             'ALGORITHM';
ALLOW_PAGE_LOCKS:                      'ALLOW_PAGE_LOCKS';
ALLOW_ROW_LOCKS:                       'ALLOW_ROW_LOCKS';
ANSI_DEFAULTS:                         'ANSI_DEFAULTS';
ANSI_NULLS:                            'ANSI_NULLS';
ANSI_NULL_DFLT_OFF:                    'ANSI_NULL_DFLT_OFF';
ANSI_NULL_DFLT_ON:                     'ANSI_NULL_DFLT_ON';
ANSI_PADDING:                          'ANSI_PADDING';
ANSI_WARNINGS:                         'ANSI_WARNINGS';
APPLY:                                 'APPLY';
ARITHABORT:                            'ARITHABORT';
ARITHIGNORE:                           'ARITHIGNORE';
AUTOCOMMIT:                            'AUTOCOMMIT';
AUTO_CREATE_STATISTICS:                'AUTO_CREATE_STATISTICS';
BELOW_NORMAL:                          'BELOW_NORMAL';
BIGINT:                                'BIGINT';
BINARY:                                'BINARY';
BIT:                                   'BIT';
BLOB_STORAGE:                          'BLOB_STORAGE';
BLOCKERS:                              'BLOCKERS';
CALLED:                                'CALLED';
CALLER:                                'CALLER';
CAST:                                  'CAST';
CATCH:                                 'CATCH';
CERTIFICATE:                           'CERTIFICATE';
CHAR:                                  'CHAR';
CHECKIDENT:                            'CHECKIDENT';
CLASSIFIER:                            'CLASSIFIER';
COLUMNSTORE:                           'COLUMNSTORE';
COLUMNSTORE_ARCHIVE:                   'COLUMNSTORE_ARCHIVE';
COLUMN_ENCRYPTION_KEY:                 'COLUMN_ENCRYPTION_KEY';
COMMITTED:                             'COMMITTED';
COMPATIBILITY_LEVEL:                   'COMPATIBILITY_LEVEL';
COMPRESSION:                           'COMPRESSION';
CONCAT:                                'CONCAT';
CONCAT_NULL_YIELDS_NULL:               'CONCAT_NULL_YIELDS_NULL';
CONNECT:                               'CONNECT';
CONNECTION:                            'CONNECTION';
CONTROL:                               'CONTROL';
COPY:                                  'COPY';
CREDENTIAL:                            'CREDENTIAL';
CURSOR:                                'CURSOR';
DATA:                                  'DATA';
DATASPACE:                             'DATASPACE';
DATA_COMPRESSION:                      'DATA_COMPRESSION';
DATA_SOURCE:                           'DATA_SOURCE';
DATE:                                  'DATE';
DATEFIRST:                             'DATEFIRST';
DATEFORMAT:                            'DATEFORMAT';
DATETIME:                              'DATETIME';
DATETIME2:                             'DATETIME2';
DATETIMEOFFSET:                        'DATETIMEOFFSET';
DATE_FORMAT:                           'DATE_FORMAT';
DEADLOCK_PRIORITY:                     'DEADLOCK_PRIORITY';
DEALLOCATE:                            'DEALLOCATE';
DECIMAL:                               'DECIMAL';
DECRYPTION:                            'DECRYPTION';
DEFAULT_SCHEMA:                        'DEFAULT_SCHEMA';
DEFINITION:                            'DEFINITION';
DELETED:                               'DELETED';
DELIMITEDTEXT:                         'DELIMITEDTEXT';
DENSITY_VECTOR:                        'DENSITY_VECTOR';
DETERMINISTIC:                         'DETERMINISTIC';
DISABLE:                               'DISABLE';
DISTRIBUTION:                          'DISTRIBUTION';
DROPCLEANBUFFERS:                      'DROPCLEANBUFFERS';
DROPRESULTSETCACHE:                    'DROPRESULTSETCACHE';
DROP_EXISITING:                        'DROP_EXISITING';
DYNAMIC:                               'DYNAMIC';
EDITION:                               'EDITION';
ENABLE:                                'ENABLE';
ENCODING:                              'ENCODING';
ENCRYPTED:                             'ENCRYPTED';
ENCRYPTION:                            'ENCRYPTION';
ENCRYPTION_TYPE:                       'ENCRYPTION_TYPE';
END_TIME:                              'END_TIME';
ERRORFILE_CREDENTIAL:                  'ERRORFILE_CREDENTIAL';
EXPAND:                                'EXPAND';
EXPIRY_DATE:                           'EXPIRY_DATE';
EXTERNALPUSHDOWN:                      'EXTERNALPUSHDOWN';
FALSE:                                 'FALSE';
FAST:                                  'FAST';
FAST_FORWARD:                          'FAST_FORWARD';
FIELDQUOTE:                            'FIELDQUOTE';
FIELDTERMINATOR:                       'FIELDTERMINATOR';
FIELD_TERMINATOR:                      'FIELD_TERMINATOR';
FILESTREAM:                            'FILESTREAM';
FILE_FORMAT:                           'FILE_FORMAT';
FILE_TYPE:                             'FILE_TYPE';
FILLFACTOR:                            'FILLFACTOR';
FIRST:                                 'FIRST';
FIRSTROW:                              'FIRSTROW';
FIRST_ROW:                             'FIRST_ROW';
FLOAT:                                 'FLOAT';
FMTONLY:                               'FMTONLY';
FOLLOWING:                             'FOLLOWING';
FORCE:                                 'FORCE';
FORCED:                                'FORCED';
FORCESCAN:                             'FORCESCAN';
FORCESEEK:                             'FORCESEEK';
FOREIGN:                               'FOREIGN';
FORMAT:                                'FORMAT';
FORMAT_OPTIONS:                        'FORMAT_OPTIONS';
FORMAT_TYPE:                           'FORMAT_TYPE';
FORWARD_ONLY:                          'FORWARD_ONLY';
FOR_APPEND:                            'FOR_APPEND';
FREEPROCCACHE:                         'FREEPROCCACHE';
FROCE:                                 'FROCE';
FULLSCAN:                              'FULLSCAN';
GB:                                    'GB';
GLOBAL:                                'GLOBAL';
GO:                                    'GO';
HADOOP:                                'HADOOP';
HASH:                                  'HASH';
HEAP:                                  'HEAP';
HIGH:                                  'HIGH';
HINT:                                  'HINT';
HISTOGRAM:                             'HISTOGRAM';
HOLDLOCK:                              'HOLDLOCK';
IDENTITY_INSERT:                       'IDENTITY_INSERT';
IGNORE_DUP_KEY:                        'IGNORE_DUP_KEY';
IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX: 'IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX';
IMMEDIATE:                             'IMMEDIATE';
IMPERSONATE:                           'IMPERSONATE';
IMPLICIT_TRANSACTIONS:                 'IMPLICIT_TRANSACTIONS';
IMPORTANCE:                            'IMPORTANCE';
INPUT:                                 'INPUT';
INSERTED:                              'INSERTED';
INT:                                   'INT';
ISOLATION:                             'ISOLATION';
JSON:                                  'JSON';
KB:                                    'KB';
KEEP:                                  'KEEP';
KEEPFIXED:                             'KEEPFIXED';
KEYSET:                                'KEYSET';
LABEL:                                 'LABEL';
LANGUAGE:                              'LANGUAGE';
LAST:                                  'LAST';
LEVEL:                                 'LEVEL';
LOCAL:                                 'LOCAL';
LOCATION:                              'LOCATION';
LOCK_TIMEOUT:                          'LOCK_TIMEOUT';
LOG:                                   'LOG';
LOGIN:                                 'LOGIN';
LOOP:                                  'LOOP';
LOW:                                   'LOW';
MASKED:                                'MASKED';
MASTER:                                'MASTER';
MATERIALIZED:                          'MATERIALIZED';
MAX:                                   'MAX';
MAXDOP:                                'MAXDOP';
MAXERRORS:                             'MAXERRORS';
MAXRECURSION:                          'MAXRECURSION';
MAXSIZE:                               'MAXSIZE';
MAX_DURATION:                          'MAX_DURATION';
MAX_GRANT_PERCENT:                     'MAX_GRANT_PERCENT';
MB:                                    'MB';
MEMBER:                                'MEMBER';
MEMBERNAME:                            'MEMBERNAME';
MINUTES:                               'MINUTES';
MIN_GRANT_PERCENT:                     'MIN_GRANT_PERCENT';
MODEL:                                 'MODEL';
MODIFY:                                'MODIFY';
MONEY:                                 'MONEY';
NCHAR:                                 'NCHAR';
NEXT:                                  'NEXT';
NO:                                    'NO';
NOCOUNT:                               'NOCOUNT';
NOEXPAND:                              'NOEXPAND';
NOLOCK:                                'NOLOCK';
NONE:                                  'NONE';
NORESEED:                              'NORESEED';
NORMAL:                                'NORMAL';
NOWAIT:                                'NOWAIT';
NO_INFOMSGS:                           'NO_INFOMSGS';
NO_PERFORMANCE_SPOOL:                  'NO_PERFORMANCE_SPOOL';
NO_WAIT:                               'NO_WAIT';
NUMERIC:                               'NUMERIC';
NUMERIC_ROUNDABORT:                    'NUMERIC_ROUNDABORT';
NVARCHAR:                              'NVARCHAR';
OBJECT:                                'OBJECT';
OFFSET:                                'OFFSET';
OLD_PASSWORD:                          'OLD_PASSWORD';
ONLINE:                                'ONLINE';
ONLY:                                  'ONLY';
ONNX:                                  'ONNX';
OPERATIONS:                            'OPERATIONS';
OPTIMISTIC:                            'OPTIMISTIC';
OPTIMIZE:                              'OPTIMIZE';
OPTIMIZE_FOR_SEQUENTIAL_KEY:           'OPTIMIZE_FOR_SEQUENTIAL_KEY';
ORC:                                   'ORC';
OUT:                                   'OUT';
OWNER:                                 'OWNER';
OWNERSHIP:                             'OWNERSHIP';
PAD_INDEX:                             'PAD_INDEX';
PAGE:                                  'PAGE';
PAGLOCK:                               'PAGLOCK';
PARAMETERIZATION:                      'PARAMETERIZATION';
PARQUET:                               'PARQUET';
PARSEONLY:                             'PARSEONLY';
PARTITION:                             'PARTITION';
PARTITIONS:                            'PARTITIONS';
PASSWORD:                              'PASSWORD';
PDW_SHOWEXECUTIONPLAN:                 'PDW_SHOWEXECUTIONPLAN';
PDW_SHOWMATERIALIZEDVIEWOVERHEAD:      'PDW_SHOWMATERIALIZEDVIEWOVERHEAD';
PDW_SHOWPARTITIONSTATS:                'PDW_SHOWPARTITIONSTATS';
PDW_SHOWSPACEUSED:                     'PDW_SHOWSPACEUSED';
PERCENTAGE:                            'PERCENTAGE';
PLAN:                                  'PLAN';
PRECEDING:                             'PRECEDING';
PREDICT:                               'PREDICT';
PRIOR:                                 'PRIOR';
PRIVATE:                               'PRIVATE';
PROVIDER:                              'PROVIDER';
QUERYTRACEON:                          'QUERYTRACEON';
QUERY_STORE:                           'QUERY_STORE';
QUOTED_IDENTIFIER:                     'QUOTED_IDENTIFIER';
RANDOMIZED:                            'RANDOMIZED';
RANGE:                                 'RANGE';
RCFILE:                                'RCFILE';
READCOMMITTED:                         'READCOMMITTED';
READCOMMITTEDLOCK:                     'READCOMMITTEDLOCK';
READONLY:                              'READONLY';
READPAST:                              'READPAST';
READUNCOMMITTED:                       'READUNCOMMITTED';
READ_COMMITTED_SNAPSHOT:               'READ_COMMITTED_SNAPSHOT';
READ_ONLY:                             'READ_ONLY';
REAL:                                  'REAL';
REBUILD:                               'REBUILD';
RECOMPILE:                             'RECOMPILE';
REDISTRIBUTE:                          'REDISTRIBUTE';
REDUCE:                                'REDUCE';
REGENERATE:                            'REGENERATE';
REJECTED_ROW_LOCATION:                 'REJECTED_ROW_LOCATION';
REJECT_SAMPLE_VALUE:                   'REJECT_SAMPLE_VALUE';
REJECT_TYPE:                           'REJECT_TYPE';
REJECT_VALUE:                          'REJECT_VALUE';
RELATIVE:                              'RELATIVE';
REMOVE:                                'REMOVE';
REORGANIZE:                            'REORGANIZE';
REPEATABLE:                            'REPEATABLE';
REPEATABLEREAD:                        'REPEATABLEREAD';
REPLICATE:                             'REPLICATE';
RESAMPLE:                              'RESAMPLE';
RESEED:                                'RESEED';
RESOURCE_MANAGER_LOCATION:             'RESOURCE_MANAGER_LOCATION';
RESULT:                                'RESULT';
RESULT_SET_CACHING:                    'RESULT_SET_CACHING';
RETURNS:                               'RETURNS';
ROBUST:                                'ROBUST';
ROLE:                                  'ROLE';
ROLLUP:                                'ROLLUP';
ROUND_ROBIN:                           'ROUND_ROBIN';
ROW:                                   'ROW';
ROWCOUNT:                              'ROWCOUNT';
ROWLOCK:                               'ROWLOCK';
ROWS:                                  'ROWS';
ROWTERMINATOR:                         'ROWTERMINATOR';
RUNTIME:                               'RUNTIME';
SAMPLE:                                'SAMPLE';
SCALEOUTEXECUTION:                     'SCALEOUTEXECUTION';
SCHEMABINDING:                         'SCHEMABINDING';
SCOPED:                                'SCOPED';
SCROLL:                                'SCROLL';
SCROLL_LOCKS:                          'SCROLL_LOCKS';
SECRET:                                'SECRET';
SELF:                                  'SELF';
SERDE_METHOD:                          'SERDE_METHOD';
SERIALIZABLE:                          'SERIALIZABLE';
SERVER:                                'SERVER';
SERVICE:                               'SERVICE';
SERVICE_OBJECTIVE:                     'SERVICE_OBJECTIVE';
SETERROR:                              'SETERROR';
SETS:                                  'SETS';
SHOWPLAN:                              'SHOWPLAN';
SHOWPLAN_XML:                          'SHOWPLAN_XML';
SHOWRESULTCACHESPACEUSED:              'SHOWRESULTCACHESPACEUSED';
SHOW_STATISTICS:                       'SHOW_STATISTICS';
SID:                                   'SID';
SIMPLE:                                'SIMPLE';
SMALLDATETIME:                         'SMALLDATETIME';
SMALLINT:                              'SMALLINT';
SMALLMONEY:                            'SMALLMONEY';
SNAPSHOT:                              'SNAPSHOT';
SORT_IN_TEMPDB:                        'SORT_IN_TEMPDB';
SOURCE:                                'SOURCE';
SPARSE:                                'SPARSE';
SPATIAL_WINDOW_MAX_CELLS:              'SPATIAL_WINDOW_MAX_CELLS';
SPLIT:                                 'SPLIT';
SQL:                                   'SQL';
START_DATE:                            'START_DATE';
START_TIME:                            'START_TIME';
STATE:                                 'STATE';
STATIC:                                'STATIC';
STATISTICS_NORECOMPUTE:                'STATISTICS_NORECOMPUTE';
STATUS:                                'STATUS';
STATUSONLY:                            'STATUSONLY';
STAT_HEADER:                           'STAT_HEADER';
STRING_DELIMITER:                      'STRING_DELIMITER';
SUBJECT:                               'SUBJECT';
SWITCH:                                'SWITCH';
SYMMETRIC:                             'SYMMETRIC';
SYNONYM:                               'SYNONYM';
TABLOCK:                               'TABLOCK';
TABLOCKX:                              'TABLOCKX';
TAKE:                                  'TAKE';
TB:                                    'TB';
THROW:                                 'THROW';
TIES:                                  'TIES';
TIME:                                  'TIME';
TINYINT:                               'TINYINT';
TRANSFER:                              'TRANSFER';
TRUE:                                  'TRUE';
TRUNCATE_TARGET:                       'TRUNCATE_TARGET';
TRY:                                   'TRY';
TYPE:                                  'TYPE';
TYPE_WARNING:                          'TYPE_WARNING';
UNBOUNDED:                             'UNBOUNDED';
UNCOMMITTED:                           'UNCOMMITTED';
UNDEFINED:                             'UNDEFINED';
UNIQUEIDENTIFIER:                      'UNIQUEIDENTIFIER';
UNKNOWN:                               'UNKNOWN';
UPDLOCK:                               'UPDLOCK';
USE:                                   'USE';
USE_TYPE_DEFAULT:                      'USE_TYPE_DEFAULT';
VALUE:                                 'VALUE';
VARBINARY:                             'VARBINARY';
VARCHAR:                               'VARCHAR';
VIEWS:                                 'VIEWS';
WAIT_AT_LOW_PRIORITY:                  'WAIT_AT_LOW_PRIORITY';
WITHIN:                                'WITHIN';
WITHOUT:                               'WITHOUT';
WITH_RECOMMENDATIONS:                  'WITH_RECOMMENDATIONS';
WLM_CONTEXT:                           'WLM_CONTEXT';
WLM_LABEL:                             'WLM_LABEL';
WORK:                                  'WORK';
WORKLOAD:                              'WORKLOAD';
WORKLOAD_GROUP:                        'WORKLOAD_GROUP';
XACT_ABORT:                            'XACT_ABORT';
XLOCK:                                 'XLOCK';
XML:                                   'XML';

SPACE:              [ \t\r\n]+    -> skip;
// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/slash-star-comment-transact-sql
COMMENT:            '/*' (COMMENT | .)*? '*/' -> channel(1);    // Block Comment Channel is set to be 1
LINE_COMMENT:       '--' ~[\r\n]* -> channel(2);    // Line Comment Channel is set to be 2

// TODO: ID can be not only Latin.
DOUBLE_QUOTE_ID:    '"' ~'"'+ '"';
DOUBLE_QOUTE:       '"';
SINGLE_QUOTE:       '\'';
SQUARE_BRACKET_LEFT:     '[';
SQUARE_BRACKET_RIGHT:    ']';
SQUARE_BRACKET_ID:  '[' ~']'+ ']';
LOCAL_ID:           '@' ([a-zA-Z_$@#0-9] | FullWidthLetter)+;
ID:                  ( [a-zA-Z_#] | FullWidthLetter) ( [a-zA-Z_#$@0-9] | FullWidthLetter )*;
UPPERCASEID:         ( [A-Z_#] | FullWidthLetter) ( [A-Z_#$@0-9] | FullWidthLetter )*;
IPV4_ADDR:           [']? IPV4_OCTECT DOT IPV4_OCTECT DOT IPV4_OCTECT DOT IPV4_OCTECT [']?;
QUOTED_URL:          '\''([a-zA-Z][a-zA-Z]+[:]) '//'(([a-zA-Z]+[.]|[a-zA-Z]+)|IPV4_ADDR) [:] DECIMAL_TYPE '\'';
QUOTED_HOST_AND_PORT:'\''(([a-zA-Z]+[.]|[a-zA-Z]+)|IPV4_ADDR) ([:] DECIMAL_TYPE) '\'';

// resolve confilict with keyword,eg "10" is DECIMAL_TYPE,"DECIMAL" is "DECIMAL",related to word completion.
DECIMAL_TYPE:        SIGN? DEC_DIGIT+;
STRING_TYPE:         'N'? '\'' (~'\'' | '\'\'')* '\'';
BINARY_TYPE:         '0' ('X' | 'x') HEX_DIGIT*;
FLOAT_TYPE:          SIGN? DEC_DOT_DEC;
REAL_TYPE:           SIGN? (DECIMAL_TYPE | DEC_DOT_DEC) (('E' | 'e') [+-]? DEC_DIGIT+);

EQUAL:               '=';

GREATER:             '>';
LESS:                '<';
EXCLAMATION:         '!';

PLUS_ASSIGN:         '+=';
MINUS_ASSIGN:        '-=';
MULT_ASSIGN:         '*=';
DIV_ASSIGN:          '/=';
MOD_ASSIGN:          '%=';
AND_ASSIGN:          '&=';
XOR_ASSIGN:          '^=';
OR_ASSIGN:           '|=';

DOUBLE_BAR:          '||';
DOT:                 '.';
UNDERLINE:           '_';
AT:                  '@';
SHARP:               '#';
DOLLAR:              '$';
LR_BRACKET:          '(';
RR_BRACKET:          ')';
COMMA:               ',';
SEMI:                ';';
COLON:               ':';
STAR:                '*';
DIVIDE:              '/';
MODULE:              '%';
PLUS:                '+';
MINUS:               '-';
SIGN:                '+' | '-';
BIT_NOT:             '~';
BIT_OR:              '|';
BIT_AND:             '&';
BIT_XOR:             '^';

IPV4_OCTECT:           [0-9]?[0-9]?[0-9];
fragment DEC_DOT_DEC:  (DEC_DIGIT+ '.' DEC_DIGIT+ |  DEC_DIGIT+ '.' | '.' DEC_DIGIT+);
fragment HEX_DIGIT:    [0-9A-Fa-f];
fragment DEC_DIGIT:    [0-9];

fragment FullWidthLetter
    : '\u00c0'..'\u00d6'
    | '\u00d8'..'\u00f6'
    | '\u00f8'..'\u00ff'
    | '\u0100'..'\u1fff'
    | '\u2c00'..'\u2fff'
    | '\u3040'..'\u318f'
    | '\u3300'..'\u337f'
    | '\u3400'..'\u3fff'
    | '\u4e00'..'\u9fff'
    | '\ua000'..'\ud7ff'
    | '\uf900'..'\ufaff'
    | '\uff00'..'\ufff0'
    // | '\u10000'..'\u1F9FF'  //not support four bytes chars
    // | '\u20000'..'\u2FA1F'
    ;

// parser rules

sql
    : batch* EOF
    ;

batch
    : (execute_body | sql_server_execute_body) go_statement*
    | (execute_body | sql_server_execute_body)? sql_clauses go_statement*
    ;

sql_clauses
    : (sql_clause SEMI?)+
    ;

sql_clause
    : dml_clause

    | ddl_clause

    | cfl_statement

    | dbcc_clause

    | empty_statement

    | another_statement
    ;

// Data Manipulation Language: https://docs.microsoft.com/en-us/sql/t-sql/queries/queries?view=azure-sqldw-latest
dml_clause
    : delete_statement
    | insert_statement
    | select_statement
    | update_statement
    | rename_statement
    ;

// Data Definition Language: https://docs.microsoft.com/en-us/sql/t-sql/statements/statements?view=azure-sqldw-latest
ddl_clause
    : 
      alter_authorization_for_azure_dw
    | alter_certificate
    | alter_database
    | alter_database_encryption_key
    | alter_db_role
    | alter_external_data_source
    | alter_index
    | alter_login_azure_sql
    | alter_master_key_azure_sql
    | alter_materialized_view
    | alter_schema_for_azure_dw
    | alter_table
    | alter_user_azure_sql
    | alter_view
    | close_master_key
    | create_certificate
    | create_columnstore_index
    | create_credential
    | create_database
    | create_database_encryption_key
    | create_db_role
    | create_database_scoped_credential
    | create_external_data_source
    | create_external_file_format
    | create_external_table
    | create_index
    | create_login_azure_sql
    | create_master_key_azure_sql
    | create_materialized_view
    | create_function
    | create_or_alter_procedure
    | create_schema_azure_sql_dw_and_pdw
    | create_statistics
    | create_synonym
    | create_table
    | create_table_as_select
    | create_type
    | create_user_azure_sql_dw
    | create_view
    | create_workload_classifier
    | drop_database
    | drop_database_encryption_key
    | drop_external_data_source
    | drop_external_file_format
    | drop_external_table
    | drop_function
    | drop_index
    | drop_login
    | drop_master_key
    | drop_procedure
    | drop_role
    | drop_schema
    | drop_statistics
    | drop_table
    | drop_user
    | drop_view
    | drop_workload_classifier
    | open_master_key
    | truncate_table
    | update_statistics
    ;

// Control-of-Flow Language: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/begin-end-transact-sql?view=azure-sqldw-latest
cfl_statement
    : block_statement
    | break_statement
    | continue_statement
    | if_statement
    | throw_statement
    | try_catch_statement
    | while_statement
    | print_statement
    | raise_error_statement
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/begin-end-transact-sql
block_statement
    : BEGIN ';'? sql_clauses? END ';'?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/break-transact-sql
break_statement
    : BREAK ';'?
    ;

continue_statement
    : CONTINUE ';'?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/if-else-transact-sql
if_statement
    : IF search_condition sql_clause  (ELSE sql_clause)? ';'?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/throw-transact-sql
throw_statement
    : THROW (throw_error_number ',' throw_message ',' throw_state)? ';'?
    ;

throw_error_number
    : DECIMAL_TYPE | LOCAL_ID
    ;

throw_message
    : STRING_TYPE | LOCAL_ID
    ;

throw_state
    : DECIMAL_TYPE | LOCAL_ID
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql
try_catch_statement
    : BEGIN TRY ';'? try_clauses=sql_clauses? END TRY ';'? BEGIN CATCH ';'? catch_clauses=sql_clauses? END CATCH ';'?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/while-transact-sql
while_statement
    : WHILE LR_BRACKET? search_condition RR_BRACKET? sql_clause
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/print-transact-sql
print_statement
    : PRINT (expression | DOUBLE_QUOTE_ID) (',' LOCAL_ID)* ';'?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/raiserror-transact-sql
raise_error_statement
    : RAISERROR 
      '(' 
        msg= (DECIMAL_TYPE | STRING_TYPE | LOCAL_ID) ',' 
        severity=constant_LOCAL_ID ','
        state=constant_LOCAL_ID 
        (',' constant_LOCAL_ID)* 
      ')' 
      ( WITH raise_error_option (',' raise_error_option)* )? ';'?
    | RAISERROR DECIMAL_TYPE formatstring=(STRING_TYPE | LOCAL_ID | DOUBLE_QUOTE_ID) (',' argument=(DECIMAL_TYPE | STRING_TYPE | LOCAL_ID))*
    ;

raise_error_option
    : LOG
    | NOWAIT
    | SETERROR
    ;

empty_statement
    : ';'
    ;

another_statement
    : declare_statement
    | declare_cursor_statement
    | declare_table_statement
    | open_close_deallocate_cursor_statement
    | fetch_cursor_statement
    | execute_statement
    | security_statement
    | set_statement
    | transaction_statement
    | kill_statement
    | explain_statement
    | copy_statement
    ;

class_type_for_azure_dw
    : SCHEMA
    | OBJECT
    ;

authorization_grantee
    : principal_name=id
    | SCHEMA OWNER
    ;

entity_to
    : TO
    ;

colon_colon
    : COLON COLON
    ;

alter_authorization_start
    : ALTER AUTHORIZATION ON
    ;

alter_authorization_for_azure_dw
    : alter_authorization_start (class_type_for_azure_dw colon_colon)? entity=entity_name_for_azure_dw entity_to authorization_grantee
    ;

alter_certificate
    : ALTER CERTIFICATE name=multipart_identifier (REMOVE PRIVATE KEY | WITH PRIVATE KEY '(' FILE EQUAL STRING_TYPE ',' DECRYPTION BY PASSWORD EQUAL STRING_TYPE ')')
    ; 

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-database-transact-sql
drop_database
    : DROP DATABASE database_name=id
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-database-encryption-key-transact-sql?view=azure-sqldw-latest
drop_database_encryption_key
    : DROP DATABASE ENCRYPTION KEY
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-data-source-transact-sql
drop_external_data_source
    : DROP EXTERNAL DATA source=SOURCE external_data_source_name=id
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-file-format-transact-sql
drop_external_file_format
    : DROP EXTERNAL FILE format=FORMAT external_file_format_name=id
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-external-table-transact-sql
drop_external_table
    : DROP EXTERNAL TABLE table_name
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-function-transact-sql?view=azure-sqldw-latest
drop_function
    : DROP FUNCTION simple_name
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-login-transact-sql
drop_login
     : DROP LOGIN login_name=id
     ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-master-key-transact-sql
drop_master_key
     : DROP MASTER KEY
     ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-role-transact-sql
drop_role
     : DROP ROLE role_name=id
     ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-schema-transact-sql
drop_schema
     :  DROP SCHEMA schema_name
     ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-user-transact-sql
drop_user
     : DROP USER user_name
     ;

open_master_key
    : OPEN MASTER KEY DECRYPTION BY PASSWORD EQUAL STRING_TYPE
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql
truncate_table
     : TRUNCATE TABLE table_name
     ;

close_master_key
    : CLOSE MASTER KEY 
    ;

create_certificate
    : CREATE CERTIFICATE ddl_object (generate_new_keys | FROM existing_keys)
    ;

generate_new_keys
    : WITH SUBJECT EQUAL STRING_TYPE (',' (START_DATE | EXPIRY_DATE) EQUAL STRING_TYPE)*
    ;

existing_keys
    : FILE EQUAL STRING_TYPE WITH PRIVATE KEY '(' FILE EQUAL STRING_TYPE ',' DECRYPTION BY PASSWORD EQUAL STRING_TYPE ')'
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-columnstore-index-transact-sql?view=sql-server-2017
create_columnstore_index
    : CREATE CLUSTERED COLUMNSTORE INDEX table_name
        ON table_name (ORDER '(' column_name_list ')')?
        (WITH '(' DROP_EXISITING EQUAL (ON|OFF) ')' )?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-credential-transact-sql
create_credential
    : CREATE CREDENTIAL credential_name=id
        WITH azure_credential
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-data-source-transact-sql?view=sql-server-2017
create_external_data_source
    : CREATE EXTERNAL DATA SOURCE data_source_name=id 
        WITH '(' external_data_source_options (',' external_data_source_options)* ')'
    ;

external_data_source_options
    : LOCATION EQUAL STRING_TYPE
    | cre=CREDENTIAL EQUAL credential_name=id
    | TYPE EQUAL (HADOOP | BLOB_STORAGE)
    | RESOURCE_MANAGER_LOCATION EQUAL STRING_TYPE
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-file-format-transact-sql?view=sql-server-2017
create_external_file_format
    : CREATE EXTERNAL FILE 'FORMAT' file_format_name=id
        WITH '(' file_option ( COMMA file_option)* ')'
    ;

file_option
    : FORMAT_TYPE EQUAL ( PARQUET | ORC | RCFILE | DELIMITEDTEXT | JSON)
    | DATA_COMPRESSION EQUAL STRING_TYPE
    | SERDE_METHOD EQUAL STRING_TYPE 
    | FORMAT_OPTIONS '(' format_option (COMMA format_option)* ')'
    ;

format_option
    : FIELD_TERMINATOR EQUAL STRING_TYPE
    | STRING_DELIMITER EQUAL STRING_TYPE
    | FIRST_ROW EQUAL DECIMAL_TYPE
    | DATE_FORMAT EQUAL STRING_TYPE
    | USE_TYPE_DEFAULT EQUAL ( TRUE | FALSE)
    | ENCODING EQUAL STRING_TYPE
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-table-transact-sql?view=azure-sqldw-latest
// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-external-table-as-select-transact-sql?view=azure-sqldw-latest
create_external_table
    : CREATE EXTERNAL TABLE name=table_name ( '(' column_children=column_definition_list ')')?
        WITH '(' create_external_table_wth_option (',' create_external_table_wth_option)* ')'
        (AS column_children2=select_statement)?
    ;

create_external_table_wth_option
    : LOCATION EQUAL STRING_TYPE
    | data_source=DATA_SOURCE EQUAL external_data_source_name=id
    | file_format=FILE_FORMAT EQUAL external_file_format_name=id
    | file_option
    | reject_options;

reject_options
    : REJECT_TYPE EQUAL (VALUE | PERCENTAGE)  
    | REJECT_VALUE EQUAL (DECIMAL_TYPE | FLOAT_TYPE)  
    | REJECT_SAMPLE_VALUE EQUAL DECIMAL_TYPE
    | REJECTED_ROW_LOCATION EQUAL STRING_TYPE
    ;
// https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-login-transact-sql
alter_login_azure_sql
    : ALTER LOGIN login_name=id (status_option | WITH set_option (',' set_option)*)
    ;

status_option
    : ENABLE | DISABLE
    ;

set_option
    : PASSWORD EQUAL password=STRING_TYPE 
      (OLD_PASSWORD EQUAL old_password=STRING_TYPE)?
    | id EQUAL login_name=id
    ;

create_login_azure_sql
    : CREATE LOGIN login_name=id
       WITH PASSWORD EQUAL STRING_TYPE (',' SID EQUAL sid=BINARY_TYPE)?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-master-key-transact-sql
alter_master_key_azure_sql
    : ALTER MASTER KEY alter_option
    ;

alter_option
    : regenerate_option
    | encryption_option
    ;

regenerate_option
    : (FORCE)? REGENERATE WITH ENCRYPTION BY PASSWORD EQUAL password=STRING_TYPE
    ;

encryption_option
    : (ADD | DROP) ENCRYPTION BY SERVICE MASTER KEY
    ;

create_master_key_azure_sql
    : CREATE MASTER KEY (ENCRYPTION BY PASSWORD EQUAL password=STRING_TYPE)?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-materialized-view-as-select-transact-sql?view=azure-sqldw-latest
create_materialized_view
    : CREATE MATERIALIZED VIEW (id '.')? materialized_view_name=id
        WITH '('( DISTRIBUTION EQUAL HASH '(' distribution_column_name=id ')'| DISTRIBUTION EQUAL ROUND_ROBIN ) (',' FOR_APPEND)? ')'
        AS select_statement
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-role-transact-sql
alter_db_role
    : ALTER ROLE role_name=id
        ( (ADD|DROP) MEMBER database_principal=id
        | WITH id EQUAL new_role_name=id )
    ;

alter_external_data_source
    : ALTER EXTERNAL data=DATA source=SOURCE id SET external_data_source_options (',' external_data_source_options)*
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-role-transact-sql
create_db_role
    : CREATE ROLE role_name=id (AUTHORIZATION owner_name=id)?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-database-scoped-credential-transact-sql
create_database_scoped_credential
    : CREATE DATABASE SCOPED CREDENTIAL credential_name=id
        WITH azure_credential
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-schema-transact-sql
create_schema_azure_sql_dw_and_pdw
    : CREATE SCHEMA created_schema_name=id (AUTHORIZATION owner_name=id )?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-schema-transact-sql?view=azure-sqldw-latest
alter_schema_for_azure_dw
    : ALTER SCHEMA schema_name TRANSFER (OBJECT COLON COLON )? id (DOT ID)?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-user-transact-sql
create_user_azure_sql_dw
    : CREATE USER created_user=id
        ( (FOR|FROM) LOGIN login_name=id
        | WITHOUT LOGIN
        )?

        ( WITH DEFAULT_SCHEMA EQUAL id)?
    | CREATE USER created_user=id
        FROM EXTERNAL PROVIDER
        ( WITH DEFAULT_SCHEMA EQUAL id)?
    ;

alter_user_azure_sql
    : ALTER USER user_name WITH alter_user_set_item (',' alter_user_set_item)*
    ;

user_name: id;

alter_user_set_item
    : id EQUAL newusername=id
    | LOGIN EQUAL loginame=id
    | DEFAULT_SCHEMA EQUAL id
    ;

// DML

// https://docs.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql?view=azure-sqldw-latest
delete_statement
    : DELETE (TOP '(' expression ')' PERCENT?)? delete_object? output_clause? (FROM table_sources)?
      (WHERE (where_search_condition | CURRENT OF GLOBAL? ddl_object))?
      option_clause? ';'?
    ;

delete_object
    : multipart_identifier | LOCAL_ID | function_call (WITH table_hint (',' table_hint)*)? 
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql?view=azure-sqldw-latest
insert_statement
    : INSERT ( TOP '(' expression ')' PERCENT? )?   
      INTO? table_name_or_view_name 
      ('(' column_name_list ')')?
      output_clause?
      insert_statement_value
      option_clause? ';'?
    ;

table_name_or_view_name: table_name | view_name;

insert_statement_value
    : table_value_constructor
    | derived_table
    | execute_statement
    | DEFAULT VALUES
    ;

// https://msdn.microsoft.com/en-us/library/ms189499.aspx
select_statement
    : with_expression? query_expression ';'?
    ;

// https://msdn.microsoft.com/en-us/library/ms177523.aspx
update_statement
    : UPDATE (TOP '(' expression ')' PERCENT?)? udpate_table_source 
      SET update_elem (',' update_elem)*
      output_clause?
      (FROM table_sources)?
      (WHERE where_search_condition)?
      (OPTION '(' LABEL EQUAL (label_name=id | STRING_TYPE) ')')?
    ;

udpate_table_source
    : source_table_name=table_name_or_view_name
    ;

output_clause
    : OUTPUT dml_select_list (INTO table_name ('(' column_name_list ')')? )?
    ;

dml_select_list
    : dml_select_item (',' dml_select_list)*  
    ;

dml_select_item
    : (dml_column_name | expression) as_column_alias?
    ;  

dml_column_name
    : (DELETED | INSERTED | table_name) DOT (STAR | id)
    | DOLLAR action=id
    ;      

// https://docs.microsoft.com/en-us/sql/t-sql/statements/rename-transact-sql?view=azure-sqldw-latest
rename_statement
    : RENAME OBJECT colon_colon? table_name TO new_table_name=table_name
    ;
    
// DDL

// https://msdn.microsoft.com/en-ie/library/ms176061.aspx
create_database
    : CREATE DATABASE id (COLLATE id)? '('
        (MAXSIZE EQUAL DECIMAL_TYPE GB ',' )? 
        EDITION EQUAL STRING_TYPE ','
        SERVICE_OBJECTIVE EQUAL STRING_TYPE
    ')'
    ;

create_database_encryption_key
    : CREATE DATABASE ENCRYPTION KEY WITH ALGORITHM EQUAL id ENCRYPTION BY SERVER CERTIFICATE ddl_object   
    ;    

// https://msdn.microsoft.com/en-us/library/ms188783.aspx
create_index
    : CREATE (CLUSTERED | NONCLUSTERED)? INDEX created_index_name=id
        ON create_index_table_source '(' create_index_column_name (ASC|DESC)? (',' create_index_column_name (ASC|DESC)?)* ')'
        (WITH '(' DROP_EXISITING EQUAL (ON|OFF) ')')?
    ;

index_name: id;

create_index_table_source
    : source_table_name=table_name
    ;

create_index_column_name
    : single_column_name
    ;

// https://msdn.microsoft.com/en-us/library/ms187926(v=sql.120).aspx
create_or_alter_procedure
    : create_procedure
    | alter_procedure
    ;

create_procedure
    : CREATE ( PROC | PROCEDURE ) created_proc_name=simple_name create_alter_proc_body
    ;

alter_procedure
    : ( CREATE OR ALTER ( PROC | PROCEDURE ) created_proc_name=proc_name
    | ALTER ( PROC | PROCEDURE ) proc_name ) create_alter_proc_body
    ;

create_alter_proc_body
    : procedure_param_list? (WITH procedure_option_list)? (FOR REPLICATION)? AS BEGIN? sql_clauses END?
    ;

proc_name: simple_name;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-function-sql-data-warehouse?view=azure-sqldw-latest
create_function
    : CREATE FUNCTION created_func_name=multipart_identifier
        (('(' procedure_param (',' procedure_param)* ')') | '(' ')') //must have (), but can be empty
        function_body_returns ';'?
    ;

function_body_returns
    : func_body_returns_scalar
    | function_body_returns_inline_table
    | function_body_returns_multi_statement_table
    ;

func_body_returns_scalar
  :RETURNS data_type
       (WITH function_option (',' function_option)*)?
       AS?
       BEGIN
           sql_clause*
           RETURN ret=expression ';'?
       END
       ;

function_body_returns_inline_table
    : RETURNS TABLE
      (WITH function_option (',' function_option)*)?
      AS?
      RETURN '('?  select_statement ')'?
    ;

function_body_returns_multi_statement_table
    : RETURNS ddl_object TABLE 
      '(' column_definition_list ')'
      (WITH function_option (',' function_option)*)?
      AS?
      BEGIN
        sql_clause*
        RETURN ';'?
      END
    ;

procedure_param_list
    : '('? procedure_param  (',' procedure_param)* ')'?
    ;

procedure_param
    : LOCAL_ID AS? (data_type | multipart_identifier) procedure_param_suffix*
    ;

procedure_param_suffix
    : OUT
    | OUTPUT
    | READONLY
    | EQUAL default_value
    | VARYING
    | null_notnull
    ;

procedure_option_list
    : procedure_option (',' procedure_option)*
    ;

procedure_option
    : ENCRYPTION
    | RECOMPILE
    | execute_clause
    ;

function_option
    : ENCRYPTION
    | SCHEMABINDING
    | RETURNS NULL ON NULL INPUT
    | CALLED ON NULL INPUT
    | execute_clause
    ;

// https://msdn.microsoft.com/en-us/library/ms188038.aspx
create_statistics
    : CREATE STATISTICS id ON table_name '(' column_name_list ')'
      (WHERE where_search_condition)? 
      (WITH (FULLSCAN | SAMPLE DECIMAL_TYPE PERCENT ))? 
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-synonym-transact-sql?view=sql-server-ver15
create_synonym
    : CREATE SYNONYM ddl_object FOR ddl_object
    ;

update_statistics
    : UPDATE STATISTICS table_name id?  ('(' statistics=id ')')?
        (WITH (FULLSCAN | SAMPLE DECIMAL_TYPE PERCENT | RESAMPLE))?
    ;

create_table_as_select
    : CREATE TABLE name=create_table_name ( '(' column_children=column_name_list ')' )?
      WITH 
      '(' 
            (table_option_for_as_select_list ',')* table_distribution_option (',' table_option_for_as_select_list)*
      ')'
      AS column_children2=select_statement
      option_clause?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=azure-sqldw-latest
create_table
    : CREATE TABLE name=create_table_name '(' column_children=column_definition_list ')'
        ( WITH '(' table_option ( ',' table_option )* ')' )?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-type-transact-sql?view=sql-server-ver15 
create_type
    : CREATE TYPE created_type_name=simple_name 
        (
            (FROM data_type null_notnull?)?
            | EXTERNAL name=id multipart_identifier
            | AS TABLE 
                '(' 
                    column_definition_list
                    (table_constraint (',' table_constraint)*)?
                    (table_index (',' table_index)*)?
                ')'
        )
    ;    

table_constraint
    : column_constraint_with_more_info
    ;

table_index
    : INDEX index_name (CLUSTERED | NONCLUSTERED)? '(' id (ASC | DESC)? (',' id (ASC | DESC)?)* ')'
    ; 

table_option_for_as_select_list
    : table_option_for_as_select (',' table_option_for_as_select)*
    ;

table_option_for_as_select
    : ( 
        CLUSTERED COLUMNSTORE INDEX  ( ORDER '(' column_name_list ')' )? 
        | HEAP
        | CLUSTERED INDEX '(' table_name (ASC | DESC)? (',' table_name (ASC|DESC)?)* ')' 
      )
      | PARTITION '(' partition_column_name=column_name_list RANGE ( LEFT | RIGHT )? FOR VALUES '(' (constant_expression (',' constant_expression)*)? ')' ')'
      | LOCATION EQUAL ID
    ;

table_option
    : table_cluster_option 
      | table_distribution_option 
      | PARTITION
        '(' 
            partition_column_name=column_name_list RANGE (LEFT| RIGHT)? FOR VALUES '(' constant_expression (',' constant_expression)* ')' 
        ')'
    ;

table_cluster_option
    : CLUSTERED COLUMNSTORE INDEX  (ORDER '(' column_name_list ')')?
        | HEAP
        | CLUSTERED INDEX '(' table_name (ASC | DESC)? (',' table_name (ASC|DESC)?)* ')'
    ;

table_distribution_option
    : DISTRIBUTION EQUAL ( HASH '(' table_name ')' | ROUND_ROBIN | REPLICATE )
    ;

// https://msdn.microsoft.com/en-us/library/ms187956.aspx
create_view
    : CREATE VIEW simple_name ('(' column_name_list ')')?
      AS select_statement (WITH CHECK OPTION)? ';'?
    ;

create_workload_classifier
    : CREATE WORKLOAD CLASSIFIER classifier_name=id WITH '(' (
        WORKLOAD_GROUP EQUAL STRING_TYPE
        ',' MEMBERNAME EQUAL STRING_TYPE
        work_load_classifier_other_options*
        ) ')' 
        ';'?
    ;

work_load_classifier_other_options
    : ','? WLM_LABEL EQUAL STRING_TYPE
    | ','? WLM_CONTEXT EQUAL STRING_TYPE
    | ','? START_TIME EQUAL STRING_TYPE
    | ','? END_TIME EQUAL STRING_TYPE
    | ','? IMPORTANCE EQUAL (LOW | BELOW_NORMAL | NORMAL | ABOVE_NORMAL | HIGH)
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-view-transact-sql?view=sql-server-2017
alter_view
    : ALTER VIEW view_name ('(' column_name_list ')')?
      AS select_statement (WITH CHECK OPTION)? ';'?
    ;

view_name: simple_name;

// https://msdn.microsoft.com/en-us/library/ms190273.aspx
alter_table
    : ALTER TABLE alter_table_source   
      (
          ADD alter_table_column_definition (',' alter_table_column_definition)*
          | ALTER COLUMN  alter_table_alter_item alter_column_type
          | DROP alter_table_drop_item (',' alter_table_drop_item)*
          | REBUILD (
                (PARTITION EQUAL ALL (WITH '(' rebuild_option ')')?)? 
                | (PARTITION EQUAL partition_number=DECIMAL_TYPE (WITH '(' single_partition_rebuild_option ')')?)?
              )
          | (SPLIT | MERGE) RANGE '('constant_expression')'
          | SWITCH (PARTITION source_partition_number=DECIMAL_TYPE TO table_name (PARTITION target_partition_number=DECIMAL_TYPE)?)? (WITH '(' TRUNCATE_TARGET EQUAL on_off ')')?
          | WITH (CHECK | nocheck=id)
      )
      ';'?
    ;

alter_table_alter_item
    : ddl_object;

alter_table_source
    : source_table_name=table_name;

alter_table_drop_item
    : COLUMN ddl_object 
    | CONSTRAINT? id
    ;

alter_column_type
    : data_type (DECIMAL_TYPE (',' DECIMAL_TYPE)? )? (COLLATE id)? null_notnull?
    | (ADD | DROP) (ROWGUIDCOL | NOT FOR REPLICATION | SPARSE | id | MASKED (WITH '(' FUNCTION EQUAL STRING_TYPE ')')?)
    ;

rebuild_option
    : DATA_COMPRESSION EQUAL (NONE | ROW | PAGE | COLUMNSTORE | COLUMNSTORE_ARCHIVE) (ON PARTITIONS '(' partition_number_list ')')?
    ;

single_partition_rebuild_option
    : DATA_COMPRESSION EQUAL (NONE | ROW | PAGE | COLUMNSTORE | COLUMNSTORE_ARCHIVE)
    ;

partition_number_list
    : (partition_number=DECIMAL_TYPE (TO partition_number=DECIMAL_TYPE)?) (',' partition_number=DECIMAL_TYPE (TO partition_number=DECIMAL_TYPE)?)*
    ;

// https://msdn.microsoft.com/en-us/library/ms174269.aspx
alter_database
    : ALTER DATABASE (database=id | CURRENT)
      (
          MODIFY id '=' new_name=id 
          | MODIFY '(' edition_option (',' edition_option)* ')'
          | SET database_optionspecs (WITH termination)? 
      ) ';'?
    ;

alter_database_encryption_key
    : ALTER DATABASE ENCRYPTION KEY 
        ( REGENERATE WITH ALGORITHM EQUAL id (ENCRYPTION BY SERVER CERTIFICATE ddl_object)?
        | ENCRYPTION BY SERVER CERTIFICATE ddl_object
        )
    ;

alter_index
    : ALTER INDEX (index_name | ALL) ON multipart_identifier
    (
        REBUILD
        (
            (PARTITION EQUAL ALL (WITH '(' rebuild_option (',' rebuild_option )* ')' )? )?
            | (PARTITION EQUAL DECIMAL_TYPE (WITH '(' single_partition_rebuild_option ')' )?  )?
        )
        | DISABLE
        | REORGANIZE (PARTITION EQUAL DECIMAL_TYPE)?
    ) ';'?
    ;

edition_option
    : MAXSIZE EQUAL DECIMAL_TYPE GB
    | SERVICE_OBJECTIVE EQUAL STRING_TYPE
    ;

database_optionspecs
    : database_optionspec (EQUAL? (on_off | constant | id)) (',' database_optionspec (EQUAL? (on_off | constant | id)) )*
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-set-options?view=azure-sqldw-latest
database_optionspec
    :  AUTO_CREATE_STATISTICS
    |  ENCRYPTION
    |  QUERY_STORE
    |  RESULT_SET_CACHING
    |  READ_COMMITTED_SNAPSHOT
    | id
    ;

termination:
    ROLLBACK AFTER DECIMAL_TYPE seconds=id?
    | ROLLBACK IMMEDIATE
    | NO_WAIT
    ;

alter_materialized_view
    : ALTER MATERIALIZED VIEW view_name (REBUILD | DISABLE) ';'?
    ;

// https://msdn.microsoft.com/en-us/library/ms176118.aspx
drop_index
    : DROP INDEX index_name ON table_name (',' index_name ON table_name)*
    ;

// https://msdn.microsoft.com/en-us/library/ms174969.aspx
drop_procedure
    : DROP (PROC | PROCEDURE) proc_name
    ;

// https://msdn.microsoft.com/en-us/library/ms175075.aspx
drop_statistics
    : DROP STATISTICS statistics_name 
    ;

// https://msdn.microsoft.com/en-us/library/ms173790.aspx
drop_table
    : DROP TABLE (IF EXISTS)? table_name (',' table_name)*
    ;

// https://msdn.microsoft.com/en-us/library/ms173492.aspx
drop_view
    : DROP VIEW view_name
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/drop-workload-classifier-transact-sql?view=azure-sqldw-latest
drop_workload_classifier
    : DROP WORKLOAD CLASSIFIER classifier_name=id
    ;

// Other statements.

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/declare-local-variable-transact-sql?view=azure-sqldw-latest
declare_statement
    : DECLARE declare_local (',' declare_local)* ';'?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/declare-cursor-transact-sql?view=sql-server-ver15
declare_cursor_statement
    : DECLARE ddl_object cursor_clause
    ;

declare_table_statement
    : DECLARE LOCAL_ID AS? table_type_definition
    ; 

table_type_definition
    : TABLE '(' (column_definition | table_constraint) (',' (column_definition | table_constraint))* ')'
    ;

cursor_clause
    : CURSOR (LOCAL | GLOBAL)?
     (FORWARD_ONLY | SCROLL)?   
     (STATIC | KEYSET | DYNAMIC | FAST_FORWARD)?
     (READ_ONLY | SCROLL_LOCKS | OPTIMISTIC)?
     TYPE_WARNING? 
     FOR select_statement   
     (FOR ( READ only=id | UPDATE (OF ddl_object (',' ddl_object)*)? ) )?
    ;

open_close_deallocate_cursor_statement
    : (OPEN | CLOSE | DEALLOCATE) GLOBAL? ddl_object;

fetch_cursor_statement
    : FETCH ( (NEXT | PRIOR | FIRST | LAST | ABSOLUTE DECIMAL_TYPE | RELATIVE DECIMAL_TYPE )? FROM)? 
     GLOBAL? ddl_object (INTO ddl_object (',' ddl_object)*)?
    ;   

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=azure-sqldw-latest
execute_statement
    : (EXEC |EXECUTE) (execute_body | sql_server_execute_body)
    ;

execute_body
    :  procedure_name=proc_name ( execute_statement_arg ( ',' execute_statement_arg)* )?
    | '(' execute_var_string ('+' execute_var_string)* (',' DECIMAL_TYPE)? ')'  (AT id)?
    ;

execute_statement_arg
    : ((constant_LOCAL_ID | id | null_notnull) (OUTPUT | 'OUT')? )
    ;

execute_var_string
    : LOCAL_ID
    | STRING_TYPE
    ;

sql_server_execute_body
    : (ddl_object EQUAL)? ddl_object sql_server_execute_param? (',' sql_server_execute_param)* (WITH sql_server_execute_option (',' sql_server_execute_option)*)?
    | '(' STRING_TYPE (',' STRING_TYPE)* ')' (AS USER EQUAL STRING_TYPE)?
    | AS USER EQUAL STRING_TYPE
    ;
    
sql_server_execute_param
    : (ddl_object EQUAL)? (ddl_object | constant | NULL | DEFAULT)
    ;

sql_server_execute_option
    : 
     | RESULT SETS UNDEFINED
     | RESULT SETS NONE
     | RESULT SETS '(' result_sets_definition (',' result_sets_definition)* ')'
     ;

result_sets_definition
    : '(' result_sets_definition_element (',' result_sets_definition_element)* ')'
    | AS OBJECT multipart_identifier
    | AS TYPE multipart_identifier
    | AS FOR XML
    ;

result_sets_definition_element
    : id data_type (COLLATE id)? null_notnull?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/permissions-grant-deny-revoke-azure-sql-data-warehouse-parallel-data-warehouse?view=azure-sqldw-latest
security_statement
    : grant_statement
    | deny_statement
    | revoke_statement
    ;

grant_statement
    : GRANT security_permissions (ON (security_class_type colon_colon)? securable=multipart_identifier)? TO (to_principal=id) (',' to_principal=id)* (WITH GRANT OPTION)? (AS multipart_identifier)? ';'?
    ;

deny_statement
    : DENY security_permissions (ON (security_class_type colon_colon)? securable=multipart_identifier)? TO (to_principal=id) (',' to_principal=id)* (CASCADE)? (AS multipart_identifier)? ';'?
    ;

revoke_statement
    : REVOKE security_permissions (ON (security_class_type colon_colon)? securable=multipart_identifier)? (FROM|TO)? (to_principal=id) (',' to_principal=id)* (CASCADE)?  ';'?
    ;

security_class_type
    : LOGIN | DATABASE | OBJECT  | ROLE  | SCHEMA  | USER | SYMMETRIC KEY | id GROUP | XML SCHEMA collection=id | SERVER ROLE
    ;

security_permissions
    : security_permission function_body? ( ',' security_permission function_body?)*
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/permissions-grant-deny-revoke-azure-sql-data-warehouse-parallel-data-warehouse?view=azure-sqldw-latest#general-remarks
// may need specialize for three different kinds.
security_permission
    : // Permissions that apply to servers
      CONTROL SERVER
    | ADMINISTER BULK OPERATIONS
    | ALTER ANY CONNECTION
    | ALTER ANY DATABASE
    | CREATE ANY DATABASE
    | ALTER ANY EXTERNAL DATA SOURCE
    | ALTER ANY EXTERNAL FILE FORMAT
    | ALTER ANY LOGIN
    | ALTER SERVER STATE
    | CONNECT SQL
    | VIEW ANY DEFINITION
    | VIEW ANY DATABASE
    | VIEW SERVER STATE
    // Permissions that apply to logins
    | CONTROL ON LOGIN
    | ALTER ON LOGIN
    | IMPERSONATE ON LOGIN
    | VIEW DEFINITION
    // Permissions that apply to all database classes
    | CONTROL
    | ALTER
    | VIEW DEFINITION
    // Permissions that apply to all database classes except users
    | TAKE OWNERSHIP
    // Permissions that apply only to databases
    | ALTER ON DATABASE
    | ALTER ANY DATASPACE
    | ALTER ANY ROLE
    | ALTER ANY SCHEMA
    | ALTER ANY USER
    | BACKUP DATABASE
    | CONNECT ON DATABASE
    | CREATE PROCEDURE
    | CREATE ROLE
    | CREATE SCHEMA
    | CREATE TABLE
    | CREATE VIEW
    | SHOWPLAN
    // Permissions that apply only to users
    | IMPERSONATE
    // Permissions that apply to databases, schemas, and objects
    | DELETE
    | EXECUTE
    | INSERT
    | SELECT
    | UPDATE
    | REFERENCES
    // extra added
    | ALTER ANY id id
    | GRANT OPTION FOR CONTROL
    | GRANT OPTION FOR CONNECT SQL
    ;

// https://msdn.microsoft.com/en-us/library/ms190356.aspx
set_statement
    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-local-variable-transact-sql?view=azure-sqldw-latest
    : SET LOCAL_ID ( assignment_operator | '=' ) set_item ';'?
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/set-statements-transact-sql?view=azure-sqldw-latest
    | set_special
    ;

set_item
    : expression
    | '(' select_statement ')'
    | cursor_clause
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/transactions-sql-data-warehouse?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json&view=azure-sqldw-latest
transaction_statement  
    : 
     BEGIN TRANSACTION
    | COMMIT (TRAN | TRANSACTION | WORK)? 
    | ROLLBACK (TRAN | TRANSACTION | WORK)?
    | SET AUTOCOMMIT (ON | OFF)
    | SET IMPLICIT_TRANSACTIONS (ON | OFF)
    ;

// https://msdn.microsoft.com/en-us/library/ms188037.aspx
go_statement
    : GO (count=DECIMAL_TYPE)?
    ;

kill_statement
    : KILL DECIMAL_TYPE (WITH STATUSONLY)?
    | KILL STRING_TYPE
    ;

explain_statement
    : EXPLAIN WITH_RECOMMENDATIONS? sql_clause
    ;

copy_statement
    : COPY INTO table_name ('(' copy_column (',' copy_column)* ')')? FROM STRING_TYPE (',' STRING_TYPE)* ( WITH '(' copy_into_options (',' copy_into_options)* ')')?
    ;    

copy_column
    : id default_value? STRING_TYPE? DECIMAL_TYPE*
    ;

copy_into_options
    : (FILE_TYPE | COMPRESSION | FIELDQUOTE | FIELDTERMINATOR | ROWTERMINATOR | DATEFORMAT | ENCODING | IDENTITY_INSERT) EQUAL STRING_TYPE
    | FILE_FORMAT EQUAL ddl_object
    | CREDENTIAL EQUAL '(' azure_credential ')'
    | ERRORFILE_CREDENTIAL EQUAL '(' azure_credential ')'
    | (MAXERRORS | FIRSTROW) EQUAL DECIMAL_TYPE
    ;

azure_credential
    : IDENTITY EQUAL STRING_TYPE (',' SECRET EQUAL STRING_TYPE)?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=azure-sqldw-latest
dbcc_clause
    : dbcc_checkindent
    | dbcc_dropcleanbuffers
    | dbcc_dropresultsetcache
    | dbcc_freeproccache
    | dbcc_pdw_showexecutionplan
    | dbcc_pdw_showmaterializedviewoverhead
    | dbcc_pdw_showpartitionstats
    | dbcc_pdw_showspaceused
    | dbcc_show_statistics
    | dbcc_showresultcachespaceused
    ;

dbcc_checkindent
    : DBCC CHECKIDENT (table_name(',' (NORESEED | RESEED (','(constant|LOCAL_ID))?)?))
    ;

dbcc_dropcleanbuffers
    : DBCC DROPCLEANBUFFERS '(' ( COMPUTE | ALL ) ')' (WITH NO_INFOMSGS)? 
    ;

dbcc_dropresultsetcache
    : DBCC DROPRESULTSETCACHE
    ;

dbcc_freeproccache
    : DBCC FREEPROCCACHE ('(' ( COMPUTE | ALL ) ')')? (WITH NO_INFOMSGS)?
    ;

dbcc_pdw_showexecutionplan
    : DBCC PDW_SHOWEXECUTIONPLAN '(' DECIMAL_TYPE ',' DECIMAL_TYPE ')'
    ; 

dbcc_pdw_showmaterializedviewoverhead
    : DBCC PDW_SHOWMATERIALIZEDVIEWOVERHEAD '(' (DOUBLE_QUOTE_ID | id) ')'
    ;

dbcc_pdw_showpartitionstats
    : DBCC PDW_SHOWPARTITIONSTATS '(' (DOUBLE_QUOTE_ID | id) ')'
    ;

dbcc_pdw_showspaceused
    : DBCC PDW_SHOWSPACEUSED ('(' (DOUBLE_QUOTE_ID | id)')')?
    ;

dbcc_show_statistics
    : DBCC SHOW_STATISTICS '(' table_name ',' target=id ')' 
        (WITH (STAT_HEADER | DENSITY_VECTOR | HISTOGRAM ) (',' (STAT_HEADER | DENSITY_VECTOR | HISTOGRAM ))*)?  
    ;

dbcc_showresultcachespaceused
    : DBCC SHOWRESULTCACHESPACEUSED
    ;

execute_clause
    : (EXEC | EXECUTE) AS clause=(CALLER | SELF | OWNER | STRING_TYPE)
    ;

declare_local
    : LOCAL_ID AS? data_type ('=' expression)?
    ;    

alter_table_column_definition
    : column_definition
    | column_constraint FOR id
    ;


column_definition_list
    : column_definition (',' column_definition)*
    ;

// https://msdn.microsoft.com/en-us/library/ms187742.aspx
column_definition
    : column_definition_name=id (data_type | AS expression) (DECIMAL_TYPE (',' DECIMAL_TYPE)?)? column_option*
    | column_option+
    ;

column_option
    : FILESTREAM
    | COLLATE id DECIMAL_TYPE?
    | null_notnull
    | column_constraint
    | IDENTITY ('(' seed=DECIMAL_TYPE ',' increment=DECIMAL_TYPE ')')? (NOT FOR REPLICATION)?
    | ROWGUIDCOL
    | SPARSE
    | ENCRYPTED WITH 
        '(' 
            COLUMN_ENCRYPTION_KEY EQUAL id ',' 
            ENCRYPTION_TYPE EQUAL (DETERMINISTIC | RANDOMIZED) ','
            ALGORITHM EQUAL STRING_TYPE
        ')'
    | MASKED WITH '(' FUNCTION EQUAL STRING_TYPE ')'
    | column_constraint_with_more_info
; 

column_constraint_with_more_info
    : (CONSTRAINT constraint=id)?
        (
            (PRIMARY KEY | UNIQUE) 
            (CLUSTERED | NONCLUSTERED)? ('(' multipart_identifier (ASC | DESC)? (',' multipart_identifier (ASC | DESC)?)* ')')?
            (
                WITH FILLFACTOR EQUAL fillfactor=DECIMAL_TYPE
                | WITH index_option (',' index_option)*
            )?
            (ON (partition_scheme_name=id '(' partition_column_name=full_column_name ')' | id | DEFAULT | STRING_TYPE))?
            | (FOREIGN KEY)? REFERENCES full_column_name ('(' full_column_name ')')?
              (ON DELETE (NO ACTION | CASCADE | SET NULL | SET DEFAULT))?
              (ON UPDATE (NO ACTION | CASCADE | SET NULL | SET DEFAULT))?
              (NOT FOR REPLICATION)?
            | CHECK (NOT FOR REPLICATION)? '(' expression_list ')'
        )
    ;

column_constraint
    : (CONSTRAINT constraint=id)? DEFAULT constant_expression (WITH VALUES)?
    ;    

// sql server syntax
// https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-index-option-transact-sql?view=sql-server-ver15
index_option
    : PAD_INDEX EQUAL on_off
    | FILLFACTOR EQUAL fillfactor=DECIMAL_TYPE
    | IGNORE_DUP_KEY EQUAL on_off
    | STATISTICS_NORECOMPUTE EQUAL on_off
    | ALLOW_ROW_LOCKS EQUAL on_off
    | ALLOW_PAGE_LOCKS EQUAL on_off
    | OPTIMIZE_FOR_SEQUENTIAL_KEY EQUAL on_off
    | SORT_IN_TEMPDB EQUAL on_off
    | ONLINE EQUAL on_off
    | MAXDOP EQUAL DECIMAL_TYPE
    | rebuild_option
    | ONLINE EQUAL (ON ('(' low_priority_lock_wait ')')? | OFF)
    ;

low_priority_lock_wait
    : WAIT_AT_LOW_PRIORITY 
        '(' 
            MAX_DURATION EQUAL DECIMAL_TYPE MINUTES ','
            ABORT_AFTER_WAIT EQUAL (NONE | SELF | BLOCKERS)
        ')'
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/set-statements-transact-sql?view=azure-sqldw-latest
// SET id (id | constant_LOCAL_ID | on_off) ';'?
// Runtime check.
set_special
    : SET ANSI_DEFAULTS on_off
    | SET ANSI_NULL_DFLT_OFF on_off
    | SET ANSI_NULL_DFLT_ON on_off
    | SET ANSI_NULLS on_off
    | SET ANSI_PADDING on_off
    | SET ANSI_WARNINGS on_off
    | SET ARITHABORT on_off
    | SET ARITHIGNORE on_off
    | SET CONCAT_NULL_YIELDS_NULL on_off
    | SET DATEFIRST DECIMAL_TYPE
    | SET DATEFORMAT (format=STRING_TYPE|format_string=LOCAL_ID)
    | SET DEADLOCK_PRIORITY (LOW | NORMAL | HIGH | DECIMAL_TYPE | deadlock_var=LOCAL_ID | deadlock_intvar=LOCAL_ID )  
    | SET FMTONLY on_off
    | SET IMPLICIT_TRANSACTIONS on_off
    | SET IDENTITY_INSERT multipart_identifier on_off
    | SET LANGUAGE ( STRING_TYPE | LOCAL_ID )
    | SET LOCK_TIMEOUT timeout_period=DECIMAL_TYPE
    | SET NOCOUNT on_off
    | SET NUMERIC_ROUNDABORT on_off
    | SET PARSEONLY on_off
    | SET QUOTED_IDENTIFIER on_off
    | SET RESULT_SET_CACHING on_off
    | SET ROWCOUNT (DECIMAL_TYPE|LOCAL_ID)
    | SET SHOWPLAN_XML on_off
    | SET TEXTSIZE DECIMAL_TYPE
    | SET TRANSACTION ISOLATION LEVEL (READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SNAPSHOT | SERIALIZABLE)
    | SET XACT_ABORT on_off
    ;

constant_LOCAL_ID
    : constant
    | LOCAL_ID
    ;

// Expression.

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/expressions-transact-sql
// Operator precendence: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/operator-precedence-transact-sql
expression
    : primitive_expression
    | function_call
    | expression COLLATE id
    | case_expression
    | full_column_name
    | bracket_expression
    | unary_operator_expression
    | expression ('*' | '/' | '%' | '+' | '-' | '&' | '^' | '|' | '||' | '=' | '>' | '<' | '<' '=' | '>' '=' | '<' '>' | '!' '=' | assignment_operator) expression
    | expression (DECIMAL_TYPE | FLOAT_TYPE | REAL_TYPE) // a+1 will be lexed into expression DECIMAL_TYPE instead of expression '+' DECIMAL_TYPE, while a+ 1 will be lexed into expression '+' DECIMAL_TYPE
    | over_clause
    ;

primitive_expression
    : DEFAULT | NULL | LOCAL_ID | constant
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql
case_expression
    : CASE expression? switch_search_condition_section+ (ELSE elseExpr=expression)? END
    ;

unary_operator_expression
    : '~' expression
    | op=('+' | '-') expression
    ;

bracket_expression
    : '(' expression ')' | '(' subquery ')'
    ;

constant_expression
    : NULL
    | constant
    | function_call
    | '(' constant_expression ')'
    ;

subquery
    : select_statement
    ;

// https://msdn.microsoft.com/en-us/library/ms175972.aspx
with_expression
    : WITH common_table_expression (',' common_table_expression)*
    ;

common_table_expression
    : common_table_name=id ('(' column_children=column_name_list ')')? AS '(' column_children2=select_statement ')'
    ;

update_elem
    : full_column_name ('=' | assignment_operator) (NULL | DEFAULT | expression)
    ;

search_condition
    : (NOT? predicate | '('search_condition')')
      ((AND | OR ) NOT? (predicate| search_condition))?
    ;

predicate: 
      expression
    | (expression)? NOT? EXISTS? '(' subquery ')'
    | expression NOT? BETWEEN expression AND expression
    | expression NOT? IN '(' (subquery | expression_list) ')'
    | expression NOT? LIKE expression 
    | expression IS null_notnull
    ;

query_expression
    : (select_criteria | '(' query_expression ')') sql_union*
    ;

sql_union
    : (UNION ALL? | EXCEPT | INTERSECT) (select_criteria | ('(' query_expression ')'))
    ;

select_criteria
    : SELECT select_top_clause?
      select_list
      // https://docs.microsoft.com/en-us/sql/t-sql/queries/select-into-clause-transact-sql?view=azure-sqldw-latest#syntax
      (INTO table_name)?
      (FROM table_sources)?
      (WHERE where_search_condition)?
      // https://msdn.microsoft.com/en-us/library/ms177673.aspx
      (GROUP BY (ALL)? group_by_item (',' group_by_item)*)?
      (HAVING having_search_condition)?
      order_by_clause?
      option_clause? 
    ;

where_search_condition: search_condition;

having_search_condition: search_condition;

select_top_clause
    : (ALL | DISTINCT)? top_clause
    | top_clause? (ALL | DISTINCT)
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql?view=azure-sqldw-latest
top_clause
    : TOP (top_count) (WITH TIES)?
    ;

top_count
    : DECIMAL_TYPE
    | '(' expression ')'
    ;

// https://msdn.microsoft.com/en-us/library/ms188385.aspx
order_by_clause
    : ORDER BY order_by_expression (',' order_by_expression)*
      (OFFSET expression (ROW | ROWS) (FETCH (FIRST | NEXT) expression (ROW | ROWS) ONLY)?)?
    ;

order_by_expression
    : expression (ASC | DESC)?
    ;

group_by_item
    : expression (WITH '(' id ')' )?
    | ROLLUP '(' expression (',' expression )* ')'
    ;

option_clause
    // https://docs.microsoft.com/en-us/sql/t-sql/queries/option-clause-transact-sql?view=azure-sqldw-latest
    : OPTION '(' option (',' option)* ')'
    ;

option
    : LABEL EQUAL (id | STRING_TYPE) | query_hint
    ;

query_hint
    : HASH JOIN | LOOP JOIN | MERGE JOIN | FORCE ORDER | (FORCE|DISABLE) (EXTERNALPUSHDOWN | SCALEOUTEXECUTION)
       | MAXDOP DECIMAL_TYPE
       | (HASH | ORDER) GROUP
       | (CONCAT| HASH | MERGE) UNION
       | EXPAND VIEWS
       | (FAST | MAXRECURSION | QUERYTRACEON) DECIMAL_TYPE
       | FROCE ORDER
       | (FORCE | DISABLE) (EXTERNALPUSHDOWN | SCALEOUTEXECUTION)
       | IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX
       | (KEEP | KEEPFIXED) PLAN
       | (MAX_GRANT_PERCENT| MIN_GRANT_PERCENT ) EQUAL (DECIMAL_TYPE | FLOAT_TYPE )
       | NO_PERFORMANCE_SPOOL
       | OPTIMIZE FOR '(' optimize_item (',' optimize_item)* ')'
       | OPTIMIZE FOR UNKNOWN
       | PARAMETERIZATION (SIMPLE | FORCED)
       | RECOMPILE
       | ROBUST PLAN
       | USE HINT '(' STRING_TYPE (',' STRING_TYPE)* ')'
       | USE PLAN STRING_TYPE
       | TABLE HINT '(' id (',' NOEXPAND? table_hint)* ')'
    ;

optimize_item
    : LOCAL_ID UNKNOWN
    | LOCAL_ID EQUAL (multipart_identifier | constant)
    ;

table_hint
    : INDEX EQUAL? '(' multipart_identifier (',' multipart_identifier)* ')'    
    | FORCESEEK ('(' multipart_identifier '(' id (',' id)* ')' ')')?
    | FORCESCAN
    | HOLDLOCK 
    | NOLOCK 
    | NOWAIT 
    | PAGLOCK 
    | READCOMMITTED
    | READCOMMITTEDLOCK
    | READPAST 
    | READUNCOMMITTED  
    | REPEATABLEREAD  
    | ROWLOCK  
    | SERIALIZABLE  
    | SNAPSHOT
    | SPATIAL_WINDOW_MAX_CELLS EQUAL DECIMAL_TYPE  
    | TABLOCK 
    | TABLOCKX   
    | UPDLOCK  
    | XLOCK
    ;

// https://msdn.microsoft.com/en-us/library/ms176104.aspx
select_list
    : select_list_elem (',' select_list_elem)*
    ;

column_elem
    : (table_name '.')? source_column_name=id source_column_alias1=as_column_alias?
    ;

expression_elem
    : source_column_alias1=column_alias eq='=' expression
    | source_column_expression=expression source_column_alias2=as_column_alias?
    ;

select_list_elem
    : source_column_name=tableStar 
    | column_elem
    | expression_elem
    ;

tableStar
    : (table_name '.')? '*'
    ;

table_sources
    : table_source (',' table_source)*
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=azure-sqldw-latest
table_source
    : table_source_item_joined (pivot_table | unpivot_table)?
    | '(' table_source_item_joined ')' (pivot_table | unpivot_table)?
    ;

table_source_item_joined
    : table_source_item join_part*
    ;

table_source_item:
     source_table_name=table_name_or_view_name source_table_alias=as_table_alias? table_sample_clause?
    | derived_table (source_table_alias=as_table_alias column_alias_list?)? 
    | function_call source_table_alias=as_table_alias?
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/queries/from-using-pivot-and-unpivot?toc=/azure/synapse-analytics/sql-data-warehouse/toc.json&bc=/azure/synapse-analytics/sql-data-warehouse/breadcrumb/toc.json&view=azure-sqldw-latest
pivot_table
    : PIVOT '(' function_call  FOR column=id? IN '(' column_name_list ')' ')' as_table_alias? order_by_clause? 
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=sql-server-ver15
unpivot_table
    : UNPIVOT '(' id FOR id IN '(' column_name_list ')' ')' as_table_alias? order_by_clause? 
    ;

table_sample_clause: 
    TABLESAMPLE '(' (DECIMAL_TYPE | FLOAT_TYPE) PERCENT ')';

// https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql?view=azure-sqldw-latest#syntax
join_part
    : join_type table_source ON LR_BRACKET? where_search_condition RR_BRACKET?
    | CROSS JOIN table_source
    | CROSS APPLY table_source
    | OUTER APPLY table_source
    ;

join_type
    : INNER? join_hint? JOIN
    | LEFT OUTER? JOIN
    | RIGHT OUTER? JOIN
    | FULL OUTER? JOIN
    ;

join_hint
    : REDUCE
    | REPLICATE
    | REDISTRIBUTE
    ;

derived_table
    : subquery
    | '(' subquery ')'
    | table_value_constructor
    | '(' table_value_constructor ')'
    ;

function_call
    : fn=id? function_name function_body? function_suffix?
    | special_function_call
    ;

function_name
    : id
    | multipart_identifier
    | RIGHT
    | LEFT
    | MAX
    | CHAR
    | LOG
    | TRUNCATE
    | REPLICATE
    | USER
    ;

function_body
    : '(' expression_list? ')'
    | '(' ('*' | all_distinct_expression) ')'
    ;

function_suffix
    : order_clause
    | over_clause
    | order_clause over_clause
    ;

special_function_call
    : TRY? CAST '(' expression AS data_type ')'    #CAST
    | CONVERT '(' convert_data_type=data_type ','convert_expression=expression (',' style=expression)? ')' #CONVERT
    | PREDICT '(' MODEL EQUAL model_object ',' DATA EQUAL ddl_object (AS table_alias)? (',' RUNTIME EQUAL ONNX)? ')' 
       WITH result_sets_definition #PREDICT
    ;

model_object
    : ddl_object
    | '(' query_expression ')'
    ;

switch_search_condition_section
    : WHEN (expression | having_search_condition) THEN expression
    ;

as_column_alias
    : AS? column_alias
    ;

as_table_alias
    : AS? table_alias
    ;

table_alias
    : id 
    ;

column_alias_list
    : '(' column_alias (',' column_alias)* ')'
    ;

column_alias
    : id
    | STRING_TYPE
    ;

table_value_constructor
    : VALUES '(' row_value_expression_list ')' (',' '(' row_value_expression_list ')')*
    ;

row_value_expression_list
    : (DEFAULT | NULL | expression) (',' (DEFAULT | NULL | expression))*
    ;

expression_list
    : expression (',' expression)*
    ;

all_distinct_expression
    : (ALL | DISTINCT)? expression
    ;

// https://msdn.microsoft.com/en-us/library/ms189461.aspx
over_clause
    : OVER '(' partition_by_clause? order_by_clause? row_or_range_clause? ')'
    ;

partition_by_clause
    : PARTITION BY expression_list
    ;

row_or_range_clause
    : (ROWS | RANGE) window_frame_extent
    ;

window_frame_extent
    : window_frame_preceding
    | window_frame_between
    ;

window_frame_preceding
    : UNBOUNDED PRECEDING
    | DECIMAL_TYPE FOLLOWING
    | CURRENT ROW
    ;

window_frame_between
    : BETWEEN window_frame_bound AND window_frame_bound 
    ;

window_frame_bound
    : window_frame_preceding
    | window_frame_following
    ;

window_frame_following
    : UNBOUNDED FOLLOWING
    | DECIMAL_TYPE FOLLOWING
    | CURRENT ROW
    ;

order_clause
    : WITHIN GROUP '(' order_by_clause ')'
    ;    

// Primitive.

entity_name_for_azure_dw
      : schema=id
      | schema=id '.' object_name=id
      ;

create_table_name:
    (id? '.')* id '.'?
    | LOCAL_ID
    ;

// this rule name will be used for intellisense.
table_name
    : (id? '.')* id '.'?
    | LOCAL_ID
    ;

// share same content with table name but will not be used for intellisense.
ddl_object
    : (id? '.')* id '.'?
    | LOCAL_ID
    ;

statistics_name
    : (id '.')* id '.'?
    ;

simple_name
    : (schema=id '.')? name=id
    ;

multipart_identifier:
    (id '.')* id;

/*  There are some RESERVED WORDS that can be column names */
full_column_name
    : (table_name '.')? column_name=id
    | (table_name '.')? COMPATIBILITY_LEVEL
    | (table_name '.')? STATUS
    | (table_name '.')? QUOTED_IDENTIFIER
    | (table_name '.')? ARITHABORT
    | (table_name '.')? ANSI_WARNINGS
    | (table_name '.')? ANSI_PADDING
    | (table_name '.')? ANSI_NULLS
    ;

column_name_list
    : single_column_name (',' single_column_name)*
    ;

single_column_name: column_name=id;

on_off
    : ON
    | OFF
    ;

null_notnull
    : NOT? NULL
    ;

// https://docs.microsoft.com/en-us/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=azure-sqldw-latestx
// change to implement in lexer to solve the conflict with id
 
data_type
    : DATETIMEOFFSET ('(' DECIMAL_TYPE ')')? 
    | DATETIME2 ('(' DECIMAL_TYPE ')')? 
    | DATETIME 
    | SMALLDATETIME
    | DATE
    | TIME ('(' DECIMAL_TYPE ')')? 
    | FLOAT ('('DECIMAL_TYPE')')? 
    | REAL ('('DECIMAL_TYPE')')? 
    | DECIMAL ('('DECIMAL_TYPE ',' DECIMAL_TYPE')')?
    | NUMERIC
    | MONEY
    | SMALLMONEY
    | BIGINT
    | INT
    | SMALLINT
    | TINYINT
    | BIT
    | NVARCHAR ('('(DECIMAL_TYPE|MAX) ')')? 
    | NCHAR ('('DECIMAL_TYPE')')?
    | VARCHAR ('(' (DECIMAL_TYPE|MAX) ')')?
    | CHAR ('(' DECIMAL_TYPE ')')?
    | VARBINARY ('('(DECIMAL_TYPE|MAX) ')')?
    | BINARY ('('DECIMAL_TYPE')')?
    | UNIQUEIDENTIFIER
    | id IDENTITY? ('(' (DECIMAL_TYPE | MAX) (',' DECIMAL_TYPE)? ')')?
    ;

default_value
    : NULL
    | DEFAULT
    | constant
    ;

// https://msdn.microsoft.com/en-us/library/ms179899.aspx
constant
    : STRING_TYPE // STRING_TYPE, datetime or uniqueidentifier
    | BINARY_TYPE
    | DECIMAL_TYPE
    | (REAL_TYPE | FLOAT_TYPE)  // FLOAT_TYPE or DECIMAL_TYPE
    | dollar='$' (DECIMAL_TYPE | FLOAT_TYPE | IDENTITY)       // money
    ;

schema_name
    : id
    ;

// https://msdn.microsoft.com/en-us/library/ms175874.aspx
id
    : simple_id
    | special_id
    | DOUBLE_QUOTE_ID
    | SQUARE_BRACKET_ID
    | non_reserved_keywords
    ;

non_reserved_keywords
    : ABORT_AFTER_WAIT
	| ABOVE_NORMAL
	| ABSOLUTE
	| ACTION
	| ADMINISTER
	| AFTER
	| ALGORITHM
	| ALLOW_PAGE_LOCKS
	| ALLOW_ROW_LOCKS
	| ANSI_DEFAULTS
	| ANSI_NULLS
	| ANSI_NULL_DFLT_OFF
	| ANSI_NULL_DFLT_ON
	| ANSI_PADDING
	| ANSI_WARNINGS
	| APPLY
	| ARITHABORT
	| ARITHIGNORE
	| AUTOCOMMIT
	| AUTO_CREATE_STATISTICS
	| BELOW_NORMAL
	| BIGINT
	| BINARY
	| BIT
	| BLOB_STORAGE
	| BLOCKERS
	| CALLED
	| CALLER
	| CAST
	| CATCH
	| CERTIFICATE
	| CHAR
	| CHECKIDENT
	| CLASSIFIER
	| COLUMNSTORE
	| COLUMNSTORE_ARCHIVE
	| COLUMN_ENCRYPTION_KEY
	| COMMITTED
	| COMPATIBILITY_LEVEL
	| COMPRESSION
	| CONCAT
	| CONCAT_NULL_YIELDS_NULL
	| CONNECT
	| CONNECTION
	| CONTROL
	| COPY
	| CREDENTIAL
	| CURSOR
	| DATA
	| DATASPACE
	| DATA_COMPRESSION
	| DATA_SOURCE
	| DATE
	| DATEFIRST
	| DATEFORMAT
	| DATETIME
	| DATETIME2
	| DATETIMEOFFSET
	| DATE_FORMAT
	| DEADLOCK_PRIORITY
	| DEALLOCATE
	| DECIMAL
	| DECRYPTION
	| DEFAULT_SCHEMA
	| DEFINITION
	| DELETED
	| DELIMITEDTEXT
	| DENSITY_VECTOR
	| DETERMINISTIC
	| DISABLE
	| DISTRIBUTION
	| DROPCLEANBUFFERS
	| DROPRESULTSETCACHE
	| DROP_EXISITING
	| DYNAMIC
	| EDITION
	| ENABLE
	| ENCODING
	| ENCRYPTED
	| ENCRYPTION
	| ENCRYPTION_TYPE
	| END_TIME
	| ERRORFILE_CREDENTIAL
	| EXPAND
	| EXPIRY_DATE
	| EXTERNALPUSHDOWN
	| FALSE
	| FAST
	| FAST_FORWARD
	| FIELDQUOTE
	| FIELDTERMINATOR
	| FIELD_TERMINATOR
	| FILESTREAM
	| FILE_FORMAT
	| FILE_TYPE
	| FILLFACTOR
	| FIRST
	| FIRSTROW
	| FIRST_ROW
	| FLOAT
	| FMTONLY
	| FOLLOWING
	| FORCE
	| FORCED
	| FORCESCAN
	| FORCESEEK
	| FOREIGN
	| FORMAT
	| FORMAT_OPTIONS
	| FORMAT_TYPE
	| FORWARD_ONLY
	| FOR_APPEND
	| FREEPROCCACHE
	| FROCE
	| FULLSCAN
	| GB
	| GLOBAL
	| GO
	| HADOOP
	| HASH
	| HEAP
	| HIGH
	| HINT
	| HISTOGRAM
	| HOLDLOCK
	| IDENTITY_INSERT
	| IGNORE_DUP_KEY
	| IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX
	| IMMEDIATE
	| IMPERSONATE
	| IMPLICIT_TRANSACTIONS
	| IMPORTANCE
	| INPUT
	| INSERTED
	| INT
	| ISOLATION
	| JSON
	| KB
	| KEEP
	| KEEPFIXED
	| KEYSET
	| LABEL
	| LANGUAGE
	| LAST
	| LEVEL
	| LOCAL
	| LOCATION
	| LOCK_TIMEOUT
	| LOG
	| LOGIN
	| LOOP
	| LOW
	| MASKED
	| MASTER
	| MATERIALIZED
	| MAX
	| MAXDOP
	| MAXERRORS
	| MAXRECURSION
	| MAXSIZE
	| MAX_DURATION
	| MAX_GRANT_PERCENT
	| MB
	| MEMBER
	| MEMBERNAME
	| MINUTES
	| MIN_GRANT_PERCENT
	| MODEL
	| MODIFY
	| MONEY
	| NCHAR
	| NEXT
	| NO
	| NOCOUNT
	| NOEXPAND
	| NOLOCK
	| NONE
	| NORESEED
	| NORMAL
	| NOWAIT
	| NO_INFOMSGS
	| NO_PERFORMANCE_SPOOL
	| NO_WAIT
	| NUMERIC
	| NUMERIC_ROUNDABORT
	| NVARCHAR
	| OBJECT
	| OFFSET
	| OLD_PASSWORD
	| ONLINE
	| ONLY
	| ONNX
	| OPERATIONS
	| OPTIMISTIC
	| OPTIMIZE
	| OPTIMIZE_FOR_SEQUENTIAL_KEY
	| ORC
	| OUT
	| OWNER
	| OWNERSHIP
	| PAD_INDEX
	| PAGE
	| PAGLOCK
	| PARAMETERIZATION
	| PARQUET
	| PARSEONLY
	| PARTITION
	| PARTITIONS
	| PASSWORD
	| PDW_SHOWEXECUTIONPLAN
	| PDW_SHOWMATERIALIZEDVIEWOVERHEAD
	| PDW_SHOWPARTITIONSTATS
	| PDW_SHOWSPACEUSED
	| PERCENTAGE
	| PLAN
	| PRECEDING
	| PREDICT
	| PRIOR
	| PRIVATE
	| PROVIDER
	| QUERYTRACEON
	| QUERY_STORE
	| QUOTED_IDENTIFIER
	| RANDOMIZED
	| RANGE
	| RCFILE
	| READCOMMITTED
	| READCOMMITTEDLOCK
	| READONLY
	| READPAST
	| READUNCOMMITTED
	| READ_COMMITTED_SNAPSHOT
	| READ_ONLY
	| REAL
	| REBUILD
	| RECOMPILE
	| REDISTRIBUTE
	| REDUCE
	| REGENERATE
	| REJECTED_ROW_LOCATION
	| REJECT_SAMPLE_VALUE
	| REJECT_TYPE
	| REJECT_VALUE
	| RELATIVE
	| REMOVE
	| REORGANIZE
	| REPEATABLE
	| REPEATABLEREAD
	| REPLICATE
	| RESAMPLE
	| RESEED
	| RESOURCE_MANAGER_LOCATION
	| RESULT
	| RESULT_SET_CACHING
	| RETURNS
	| ROBUST
	| ROLE
	| ROLLUP
	| ROUND_ROBIN
	| ROW
	| ROWCOUNT
	| ROWLOCK
	| ROWS
	| ROWTERMINATOR
	| RUNTIME
	| SAMPLE
	| SCALEOUTEXECUTION
	| SCHEMABINDING
	| SCOPED
	| SCROLL
	| SCROLL_LOCKS
	| SECRET
	| SELF
	| SERDE_METHOD
	| SERIALIZABLE
	| SERVER
	| SERVICE
	| SERVICE_OBJECTIVE
	| SETERROR
	| SETS
	| SHOWPLAN
	| SHOWPLAN_XML
	| SHOWRESULTCACHESPACEUSED
	| SHOW_STATISTICS
	| SID
	| SIMPLE
	| SMALLDATETIME
	| SMALLINT
	| SMALLMONEY
	| SNAPSHOT
	| SORT_IN_TEMPDB
	| SOURCE
	| SPARSE
	| SPATIAL_WINDOW_MAX_CELLS
	| SPLIT
	| SQL
	| START_DATE
	| START_TIME
	| STATE
	| STATIC
	| STATISTICS_NORECOMPUTE
	| STATUS
	| STATUSONLY
	| STAT_HEADER
	| STRING_DELIMITER
	| SUBJECT
	| SWITCH
	| SYMMETRIC
	| SYNONYM
	| TABLOCK
	| TABLOCKX
	| TAKE
	| TB
	| THROW
	| TIES
	| TIME
	| TINYINT
	| TRANSFER
	| TRUE
	| TRUNCATE_TARGET
	| TRY
	| TYPE
	| TYPE_WARNING
	| UNBOUNDED
	| UNCOMMITTED
	| UNDEFINED
	| UNIQUEIDENTIFIER
	| UNKNOWN
	| UPDLOCK
	| USE
	| USE_TYPE_DEFAULT
	| VALUE
	| VARBINARY
	| VARCHAR
	| VIEWS
	| WAIT_AT_LOW_PRIORITY
	| WITHIN
	| WITHOUT
	| WITH_RECOMMENDATIONS
	| WLM_CONTEXT
	| WLM_LABEL
	| WORK
	| WORKLOAD
	| WORKLOAD_GROUP
	| XACT_ABORT
	| XLOCK
	| XML
    ;

simple_id
    : ID
    ;

special_id
    : '$' IDENTITY
    ;

assignment_operator
    : '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '^=' | '|='
    ;

file_size
    : DECIMAL_TYPE( KB | MB | GB | TB | '%' )?
    ;
