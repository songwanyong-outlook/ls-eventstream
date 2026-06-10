// Generated from src\language-service\Grammar\SqlParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { CASTContext } from "./SqlParserParser";
import { CONVERTContext } from "./SqlParserParser";
import { PREDICTContext } from "./SqlParserParser";
import { SqlContext } from "./SqlParserParser";
import { BatchContext } from "./SqlParserParser";
import { Sql_clausesContext } from "./SqlParserParser";
import { Sql_clauseContext } from "./SqlParserParser";
import { Dml_clauseContext } from "./SqlParserParser";
import { Ddl_clauseContext } from "./SqlParserParser";
import { Cfl_statementContext } from "./SqlParserParser";
import { Block_statementContext } from "./SqlParserParser";
import { Break_statementContext } from "./SqlParserParser";
import { Continue_statementContext } from "./SqlParserParser";
import { If_statementContext } from "./SqlParserParser";
import { Throw_statementContext } from "./SqlParserParser";
import { Throw_error_numberContext } from "./SqlParserParser";
import { Throw_messageContext } from "./SqlParserParser";
import { Throw_stateContext } from "./SqlParserParser";
import { Try_catch_statementContext } from "./SqlParserParser";
import { While_statementContext } from "./SqlParserParser";
import { Print_statementContext } from "./SqlParserParser";
import { Raise_error_statementContext } from "./SqlParserParser";
import { Raise_error_optionContext } from "./SqlParserParser";
import { Empty_statementContext } from "./SqlParserParser";
import { Another_statementContext } from "./SqlParserParser";
import { Class_type_for_azure_dwContext } from "./SqlParserParser";
import { Authorization_granteeContext } from "./SqlParserParser";
import { Entity_toContext } from "./SqlParserParser";
import { Colon_colonContext } from "./SqlParserParser";
import { Alter_authorization_startContext } from "./SqlParserParser";
import { Alter_authorization_for_azure_dwContext } from "./SqlParserParser";
import { Alter_certificateContext } from "./SqlParserParser";
import { Drop_databaseContext } from "./SqlParserParser";
import { Drop_database_encryption_keyContext } from "./SqlParserParser";
import { Drop_external_data_sourceContext } from "./SqlParserParser";
import { Drop_external_file_formatContext } from "./SqlParserParser";
import { Drop_external_tableContext } from "./SqlParserParser";
import { Drop_functionContext } from "./SqlParserParser";
import { Drop_loginContext } from "./SqlParserParser";
import { Drop_master_keyContext } from "./SqlParserParser";
import { Drop_roleContext } from "./SqlParserParser";
import { Drop_schemaContext } from "./SqlParserParser";
import { Drop_userContext } from "./SqlParserParser";
import { Open_master_keyContext } from "./SqlParserParser";
import { Truncate_tableContext } from "./SqlParserParser";
import { Close_master_keyContext } from "./SqlParserParser";
import { Create_certificateContext } from "./SqlParserParser";
import { Generate_new_keysContext } from "./SqlParserParser";
import { Existing_keysContext } from "./SqlParserParser";
import { Create_columnstore_indexContext } from "./SqlParserParser";
import { Create_credentialContext } from "./SqlParserParser";
import { Create_external_data_sourceContext } from "./SqlParserParser";
import { External_data_source_optionsContext } from "./SqlParserParser";
import { Create_external_file_formatContext } from "./SqlParserParser";
import { File_optionContext } from "./SqlParserParser";
import { Format_optionContext } from "./SqlParserParser";
import { Create_external_tableContext } from "./SqlParserParser";
import { Create_external_table_wth_optionContext } from "./SqlParserParser";
import { Reject_optionsContext } from "./SqlParserParser";
import { Alter_login_azure_sqlContext } from "./SqlParserParser";
import { Status_optionContext } from "./SqlParserParser";
import { Set_optionContext } from "./SqlParserParser";
import { Create_login_azure_sqlContext } from "./SqlParserParser";
import { Alter_master_key_azure_sqlContext } from "./SqlParserParser";
import { Alter_optionContext } from "./SqlParserParser";
import { Regenerate_optionContext } from "./SqlParserParser";
import { Encryption_optionContext } from "./SqlParserParser";
import { Create_master_key_azure_sqlContext } from "./SqlParserParser";
import { Create_materialized_viewContext } from "./SqlParserParser";
import { Alter_db_roleContext } from "./SqlParserParser";
import { Alter_external_data_sourceContext } from "./SqlParserParser";
import { Create_db_roleContext } from "./SqlParserParser";
import { Create_database_scoped_credentialContext } from "./SqlParserParser";
import { Create_schema_azure_sql_dw_and_pdwContext } from "./SqlParserParser";
import { Alter_schema_for_azure_dwContext } from "./SqlParserParser";
import { Create_user_azure_sql_dwContext } from "./SqlParserParser";
import { Alter_user_azure_sqlContext } from "./SqlParserParser";
import { User_nameContext } from "./SqlParserParser";
import { Alter_user_set_itemContext } from "./SqlParserParser";
import { Delete_statementContext } from "./SqlParserParser";
import { Delete_objectContext } from "./SqlParserParser";
import { Insert_statementContext } from "./SqlParserParser";
import { Table_name_or_view_nameContext } from "./SqlParserParser";
import { Insert_statement_valueContext } from "./SqlParserParser";
import { Select_statementContext } from "./SqlParserParser";
import { Update_statementContext } from "./SqlParserParser";
import { Udpate_table_sourceContext } from "./SqlParserParser";
import { Output_clauseContext } from "./SqlParserParser";
import { Dml_select_listContext } from "./SqlParserParser";
import { Dml_select_itemContext } from "./SqlParserParser";
import { Dml_column_nameContext } from "./SqlParserParser";
import { Rename_statementContext } from "./SqlParserParser";
import { Create_databaseContext } from "./SqlParserParser";
import { Create_database_encryption_keyContext } from "./SqlParserParser";
import { Create_indexContext } from "./SqlParserParser";
import { Index_nameContext } from "./SqlParserParser";
import { Create_index_table_sourceContext } from "./SqlParserParser";
import { Create_index_column_nameContext } from "./SqlParserParser";
import { Create_or_alter_procedureContext } from "./SqlParserParser";
import { Create_procedureContext } from "./SqlParserParser";
import { Alter_procedureContext } from "./SqlParserParser";
import { Create_alter_proc_bodyContext } from "./SqlParserParser";
import { Proc_nameContext } from "./SqlParserParser";
import { Create_functionContext } from "./SqlParserParser";
import { Function_body_returnsContext } from "./SqlParserParser";
import { Func_body_returns_scalarContext } from "./SqlParserParser";
import { Function_body_returns_inline_tableContext } from "./SqlParserParser";
import { Function_body_returns_multi_statement_tableContext } from "./SqlParserParser";
import { Procedure_param_listContext } from "./SqlParserParser";
import { Procedure_paramContext } from "./SqlParserParser";
import { Procedure_param_suffixContext } from "./SqlParserParser";
import { Procedure_option_listContext } from "./SqlParserParser";
import { Procedure_optionContext } from "./SqlParserParser";
import { Function_optionContext } from "./SqlParserParser";
import { Create_statisticsContext } from "./SqlParserParser";
import { Create_synonymContext } from "./SqlParserParser";
import { Update_statisticsContext } from "./SqlParserParser";
import { Create_table_as_selectContext } from "./SqlParserParser";
import { Create_tableContext } from "./SqlParserParser";
import { Create_typeContext } from "./SqlParserParser";
import { Table_constraintContext } from "./SqlParserParser";
import { Table_indexContext } from "./SqlParserParser";
import { Table_option_for_as_select_listContext } from "./SqlParserParser";
import { Table_option_for_as_selectContext } from "./SqlParserParser";
import { Table_optionContext } from "./SqlParserParser";
import { Table_cluster_optionContext } from "./SqlParserParser";
import { Table_distribution_optionContext } from "./SqlParserParser";
import { Create_viewContext } from "./SqlParserParser";
import { Create_workload_classifierContext } from "./SqlParserParser";
import { Work_load_classifier_other_optionsContext } from "./SqlParserParser";
import { Alter_viewContext } from "./SqlParserParser";
import { View_nameContext } from "./SqlParserParser";
import { Alter_tableContext } from "./SqlParserParser";
import { Alter_table_alter_itemContext } from "./SqlParserParser";
import { Alter_table_sourceContext } from "./SqlParserParser";
import { Alter_table_drop_itemContext } from "./SqlParserParser";
import { Alter_column_typeContext } from "./SqlParserParser";
import { Rebuild_optionContext } from "./SqlParserParser";
import { Single_partition_rebuild_optionContext } from "./SqlParserParser";
import { Partition_number_listContext } from "./SqlParserParser";
import { Alter_databaseContext } from "./SqlParserParser";
import { Alter_database_encryption_keyContext } from "./SqlParserParser";
import { Alter_indexContext } from "./SqlParserParser";
import { Edition_optionContext } from "./SqlParserParser";
import { Database_optionspecsContext } from "./SqlParserParser";
import { Database_optionspecContext } from "./SqlParserParser";
import { TerminationContext } from "./SqlParserParser";
import { Alter_materialized_viewContext } from "./SqlParserParser";
import { Drop_indexContext } from "./SqlParserParser";
import { Drop_procedureContext } from "./SqlParserParser";
import { Drop_statisticsContext } from "./SqlParserParser";
import { Drop_tableContext } from "./SqlParserParser";
import { Drop_viewContext } from "./SqlParserParser";
import { Drop_workload_classifierContext } from "./SqlParserParser";
import { Declare_statementContext } from "./SqlParserParser";
import { Declare_cursor_statementContext } from "./SqlParserParser";
import { Declare_table_statementContext } from "./SqlParserParser";
import { Table_type_definitionContext } from "./SqlParserParser";
import { Cursor_clauseContext } from "./SqlParserParser";
import { Open_close_deallocate_cursor_statementContext } from "./SqlParserParser";
import { Fetch_cursor_statementContext } from "./SqlParserParser";
import { Execute_statementContext } from "./SqlParserParser";
import { Execute_bodyContext } from "./SqlParserParser";
import { Execute_statement_argContext } from "./SqlParserParser";
import { Execute_var_stringContext } from "./SqlParserParser";
import { Sql_server_execute_bodyContext } from "./SqlParserParser";
import { Sql_server_execute_paramContext } from "./SqlParserParser";
import { Sql_server_execute_optionContext } from "./SqlParserParser";
import { Result_sets_definitionContext } from "./SqlParserParser";
import { Result_sets_definition_elementContext } from "./SqlParserParser";
import { Security_statementContext } from "./SqlParserParser";
import { Grant_statementContext } from "./SqlParserParser";
import { Deny_statementContext } from "./SqlParserParser";
import { Revoke_statementContext } from "./SqlParserParser";
import { Security_class_typeContext } from "./SqlParserParser";
import { Security_permissionsContext } from "./SqlParserParser";
import { Security_permissionContext } from "./SqlParserParser";
import { Set_statementContext } from "./SqlParserParser";
import { Set_itemContext } from "./SqlParserParser";
import { Transaction_statementContext } from "./SqlParserParser";
import { Go_statementContext } from "./SqlParserParser";
import { Kill_statementContext } from "./SqlParserParser";
import { Explain_statementContext } from "./SqlParserParser";
import { Copy_statementContext } from "./SqlParserParser";
import { Copy_columnContext } from "./SqlParserParser";
import { Copy_into_optionsContext } from "./SqlParserParser";
import { Azure_credentialContext } from "./SqlParserParser";
import { Dbcc_clauseContext } from "./SqlParserParser";
import { Dbcc_checkindentContext } from "./SqlParserParser";
import { Dbcc_dropcleanbuffersContext } from "./SqlParserParser";
import { Dbcc_dropresultsetcacheContext } from "./SqlParserParser";
import { Dbcc_freeproccacheContext } from "./SqlParserParser";
import { Dbcc_pdw_showexecutionplanContext } from "./SqlParserParser";
import { Dbcc_pdw_showmaterializedviewoverheadContext } from "./SqlParserParser";
import { Dbcc_pdw_showpartitionstatsContext } from "./SqlParserParser";
import { Dbcc_pdw_showspaceusedContext } from "./SqlParserParser";
import { Dbcc_show_statisticsContext } from "./SqlParserParser";
import { Dbcc_showresultcachespaceusedContext } from "./SqlParserParser";
import { Execute_clauseContext } from "./SqlParserParser";
import { Declare_localContext } from "./SqlParserParser";
import { Alter_table_column_definitionContext } from "./SqlParserParser";
import { Column_definition_listContext } from "./SqlParserParser";
import { Column_definitionContext } from "./SqlParserParser";
import { Column_optionContext } from "./SqlParserParser";
import { Column_constraint_with_more_infoContext } from "./SqlParserParser";
import { Column_constraintContext } from "./SqlParserParser";
import { Index_optionContext } from "./SqlParserParser";
import { Low_priority_lock_waitContext } from "./SqlParserParser";
import { Set_specialContext } from "./SqlParserParser";
import { Constant_LOCAL_IDContext } from "./SqlParserParser";
import { ExpressionContext } from "./SqlParserParser";
import { Primitive_expressionContext } from "./SqlParserParser";
import { Case_expressionContext } from "./SqlParserParser";
import { Unary_operator_expressionContext } from "./SqlParserParser";
import { Bracket_expressionContext } from "./SqlParserParser";
import { Constant_expressionContext } from "./SqlParserParser";
import { SubqueryContext } from "./SqlParserParser";
import { With_expressionContext } from "./SqlParserParser";
import { Common_table_expressionContext } from "./SqlParserParser";
import { Update_elemContext } from "./SqlParserParser";
import { Search_conditionContext } from "./SqlParserParser";
import { PredicateContext } from "./SqlParserParser";
import { Query_expressionContext } from "./SqlParserParser";
import { Sql_unionContext } from "./SqlParserParser";
import { Select_criteriaContext } from "./SqlParserParser";
import { Where_search_conditionContext } from "./SqlParserParser";
import { Having_search_conditionContext } from "./SqlParserParser";
import { Select_top_clauseContext } from "./SqlParserParser";
import { Top_clauseContext } from "./SqlParserParser";
import { Top_countContext } from "./SqlParserParser";
import { Order_by_clauseContext } from "./SqlParserParser";
import { Order_by_expressionContext } from "./SqlParserParser";
import { Group_by_itemContext } from "./SqlParserParser";
import { Option_clauseContext } from "./SqlParserParser";
import { OptionContext } from "./SqlParserParser";
import { Query_hintContext } from "./SqlParserParser";
import { Optimize_itemContext } from "./SqlParserParser";
import { Table_hintContext } from "./SqlParserParser";
import { Select_listContext } from "./SqlParserParser";
import { Column_elemContext } from "./SqlParserParser";
import { Expression_elemContext } from "./SqlParserParser";
import { Select_list_elemContext } from "./SqlParserParser";
import { TableStarContext } from "./SqlParserParser";
import { Table_sourcesContext } from "./SqlParserParser";
import { Table_sourceContext } from "./SqlParserParser";
import { Table_source_item_joinedContext } from "./SqlParserParser";
import { Table_source_itemContext } from "./SqlParserParser";
import { Pivot_tableContext } from "./SqlParserParser";
import { Unpivot_tableContext } from "./SqlParserParser";
import { Table_sample_clauseContext } from "./SqlParserParser";
import { Join_partContext } from "./SqlParserParser";
import { Join_typeContext } from "./SqlParserParser";
import { Join_hintContext } from "./SqlParserParser";
import { Derived_tableContext } from "./SqlParserParser";
import { Function_callContext } from "./SqlParserParser";
import { Function_nameContext } from "./SqlParserParser";
import { Function_bodyContext } from "./SqlParserParser";
import { Function_suffixContext } from "./SqlParserParser";
import { Special_function_callContext } from "./SqlParserParser";
import { Model_objectContext } from "./SqlParserParser";
import { Switch_search_condition_sectionContext } from "./SqlParserParser";
import { As_column_aliasContext } from "./SqlParserParser";
import { As_table_aliasContext } from "./SqlParserParser";
import { Table_aliasContext } from "./SqlParserParser";
import { Column_alias_listContext } from "./SqlParserParser";
import { Column_aliasContext } from "./SqlParserParser";
import { Table_value_constructorContext } from "./SqlParserParser";
import { Row_value_expression_listContext } from "./SqlParserParser";
import { Expression_listContext } from "./SqlParserParser";
import { All_distinct_expressionContext } from "./SqlParserParser";
import { Over_clauseContext } from "./SqlParserParser";
import { Partition_by_clauseContext } from "./SqlParserParser";
import { Row_or_range_clauseContext } from "./SqlParserParser";
import { Window_frame_extentContext } from "./SqlParserParser";
import { Window_frame_precedingContext } from "./SqlParserParser";
import { Window_frame_betweenContext } from "./SqlParserParser";
import { Window_frame_boundContext } from "./SqlParserParser";
import { Window_frame_followingContext } from "./SqlParserParser";
import { Order_clauseContext } from "./SqlParserParser";
import { Entity_name_for_azure_dwContext } from "./SqlParserParser";
import { Create_table_nameContext } from "./SqlParserParser";
import { Table_nameContext } from "./SqlParserParser";
import { Ddl_objectContext } from "./SqlParserParser";
import { Statistics_nameContext } from "./SqlParserParser";
import { Simple_nameContext } from "./SqlParserParser";
import { Multipart_identifierContext } from "./SqlParserParser";
import { Full_column_nameContext } from "./SqlParserParser";
import { Column_name_listContext } from "./SqlParserParser";
import { Single_column_nameContext } from "./SqlParserParser";
import { On_offContext } from "./SqlParserParser";
import { Null_notnullContext } from "./SqlParserParser";
import { Data_typeContext } from "./SqlParserParser";
import { Default_valueContext } from "./SqlParserParser";
import { ConstantContext } from "./SqlParserParser";
import { Schema_nameContext } from "./SqlParserParser";
import { IdContext } from "./SqlParserParser";
import { Non_reserved_keywordsContext } from "./SqlParserParser";
import { Simple_idContext } from "./SqlParserParser";
import { Special_idContext } from "./SqlParserParser";
import { Assignment_operatorContext } from "./SqlParserParser";
import { File_sizeContext } from "./SqlParserParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SqlParserParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SqlParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `CAST`
	 * labeled alternative in `SqlParserParser.special_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCAST?: (ctx: CASTContext) => Result;

	/**
	 * Visit a parse tree produced by the `CONVERT`
	 * labeled alternative in `SqlParserParser.special_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCONVERT?: (ctx: CONVERTContext) => Result;

	/**
	 * Visit a parse tree produced by the `PREDICT`
	 * labeled alternative in `SqlParserParser.special_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPREDICT?: (ctx: PREDICTContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql?: (ctx: SqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.batch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBatch?: (ctx: BatchContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql_clauses`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_clauses?: (ctx: Sql_clausesContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_clause?: (ctx: Sql_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dml_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDml_clause?: (ctx: Dml_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.ddl_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDdl_clause?: (ctx: Ddl_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.cfl_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCfl_statement?: (ctx: Cfl_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.block_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_statement?: (ctx: Block_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.break_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak_statement?: (ctx: Break_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.continue_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinue_statement?: (ctx: Continue_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_statement?: (ctx: If_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.throw_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrow_statement?: (ctx: Throw_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.throw_error_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrow_error_number?: (ctx: Throw_error_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.throw_message`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrow_message?: (ctx: Throw_messageContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.throw_state`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrow_state?: (ctx: Throw_stateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.try_catch_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTry_catch_statement?: (ctx: Try_catch_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.while_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_statement?: (ctx: While_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.print_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrint_statement?: (ctx: Print_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.raise_error_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRaise_error_statement?: (ctx: Raise_error_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.raise_error_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRaise_error_option?: (ctx: Raise_error_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.empty_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmpty_statement?: (ctx: Empty_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.another_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnother_statement?: (ctx: Another_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.class_type_for_azure_dw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_type_for_azure_dw?: (ctx: Class_type_for_azure_dwContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.authorization_grantee`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAuthorization_grantee?: (ctx: Authorization_granteeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.entity_to`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_to?: (ctx: Entity_toContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.colon_colon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon_colon?: (ctx: Colon_colonContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_authorization_start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_authorization_start?: (ctx: Alter_authorization_startContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_authorization_for_azure_dw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_authorization_for_azure_dw?: (ctx: Alter_authorization_for_azure_dwContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_certificate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_certificate?: (ctx: Alter_certificateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_database`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_database?: (ctx: Drop_databaseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_database_encryption_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_database_encryption_key?: (ctx: Drop_database_encryption_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_external_data_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_external_data_source?: (ctx: Drop_external_data_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_external_file_format`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_external_file_format?: (ctx: Drop_external_file_formatContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_external_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_external_table?: (ctx: Drop_external_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_function?: (ctx: Drop_functionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_login`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_login?: (ctx: Drop_loginContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_master_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_master_key?: (ctx: Drop_master_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_role`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_role?: (ctx: Drop_roleContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_schema`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_schema?: (ctx: Drop_schemaContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_user`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_user?: (ctx: Drop_userContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.open_master_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpen_master_key?: (ctx: Open_master_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.truncate_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTruncate_table?: (ctx: Truncate_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.close_master_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClose_master_key?: (ctx: Close_master_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_certificate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_certificate?: (ctx: Create_certificateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.generate_new_keys`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_new_keys?: (ctx: Generate_new_keysContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.existing_keys`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExisting_keys?: (ctx: Existing_keysContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_columnstore_index`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_columnstore_index?: (ctx: Create_columnstore_indexContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_credential`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_credential?: (ctx: Create_credentialContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_external_data_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_external_data_source?: (ctx: Create_external_data_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.external_data_source_options`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternal_data_source_options?: (ctx: External_data_source_optionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_external_file_format`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_external_file_format?: (ctx: Create_external_file_formatContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.file_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_option?: (ctx: File_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.format_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormat_option?: (ctx: Format_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_external_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_external_table?: (ctx: Create_external_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_external_table_wth_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_external_table_wth_option?: (ctx: Create_external_table_wth_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.reject_options`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReject_options?: (ctx: Reject_optionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_login_azure_sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_login_azure_sql?: (ctx: Alter_login_azure_sqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.status_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatus_option?: (ctx: Status_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.set_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_option?: (ctx: Set_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_login_azure_sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_login_azure_sql?: (ctx: Create_login_azure_sqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_master_key_azure_sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_master_key_azure_sql?: (ctx: Alter_master_key_azure_sqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_option?: (ctx: Alter_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.regenerate_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegenerate_option?: (ctx: Regenerate_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.encryption_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEncryption_option?: (ctx: Encryption_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_master_key_azure_sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_master_key_azure_sql?: (ctx: Create_master_key_azure_sqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_materialized_view`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_materialized_view?: (ctx: Create_materialized_viewContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_db_role`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_db_role?: (ctx: Alter_db_roleContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_external_data_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_external_data_source?: (ctx: Alter_external_data_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_db_role`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_db_role?: (ctx: Create_db_roleContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_database_scoped_credential`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_database_scoped_credential?: (ctx: Create_database_scoped_credentialContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_schema_azure_sql_dw_and_pdw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_schema_azure_sql_dw_and_pdw?: (ctx: Create_schema_azure_sql_dw_and_pdwContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_schema_for_azure_dw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_schema_for_azure_dw?: (ctx: Alter_schema_for_azure_dwContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_user_azure_sql_dw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_user_azure_sql_dw?: (ctx: Create_user_azure_sql_dwContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_user_azure_sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_user_azure_sql?: (ctx: Alter_user_azure_sqlContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.user_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUser_name?: (ctx: User_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_user_set_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_user_set_item?: (ctx: Alter_user_set_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.delete_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelete_statement?: (ctx: Delete_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.delete_object`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelete_object?: (ctx: Delete_objectContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.insert_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsert_statement?: (ctx: Insert_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_name_or_view_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_name_or_view_name?: (ctx: Table_name_or_view_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.insert_statement_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsert_statement_value?: (ctx: Insert_statement_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.select_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_statement?: (ctx: Select_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.update_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpdate_statement?: (ctx: Update_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.udpate_table_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdpate_table_source?: (ctx: Udpate_table_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.output_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_clause?: (ctx: Output_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dml_select_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDml_select_list?: (ctx: Dml_select_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dml_select_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDml_select_item?: (ctx: Dml_select_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dml_column_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDml_column_name?: (ctx: Dml_column_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.rename_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRename_statement?: (ctx: Rename_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_database`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_database?: (ctx: Create_databaseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_database_encryption_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_database_encryption_key?: (ctx: Create_database_encryption_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_index`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_index?: (ctx: Create_indexContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.index_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_name?: (ctx: Index_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_index_table_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_index_table_source?: (ctx: Create_index_table_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_index_column_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_index_column_name?: (ctx: Create_index_column_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_or_alter_procedure`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_or_alter_procedure?: (ctx: Create_or_alter_procedureContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_procedure`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_procedure?: (ctx: Create_procedureContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_procedure`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_procedure?: (ctx: Alter_procedureContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_alter_proc_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_alter_proc_body?: (ctx: Create_alter_proc_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.proc_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProc_name?: (ctx: Proc_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_function?: (ctx: Create_functionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_body_returns`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_body_returns?: (ctx: Function_body_returnsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.func_body_returns_scalar`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunc_body_returns_scalar?: (ctx: Func_body_returns_scalarContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_body_returns_inline_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_body_returns_inline_table?: (ctx: Function_body_returns_inline_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_body_returns_multi_statement_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_body_returns_multi_statement_table?: (ctx: Function_body_returns_multi_statement_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.procedure_param_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_param_list?: (ctx: Procedure_param_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.procedure_param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_param?: (ctx: Procedure_paramContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.procedure_param_suffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_param_suffix?: (ctx: Procedure_param_suffixContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.procedure_option_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_option_list?: (ctx: Procedure_option_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.procedure_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedure_option?: (ctx: Procedure_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_option?: (ctx: Function_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_statistics`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_statistics?: (ctx: Create_statisticsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_synonym`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_synonym?: (ctx: Create_synonymContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.update_statistics`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpdate_statistics?: (ctx: Update_statisticsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_table_as_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_table_as_select?: (ctx: Create_table_as_selectContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_table?: (ctx: Create_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_type?: (ctx: Create_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_constraint?: (ctx: Table_constraintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_index`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_index?: (ctx: Table_indexContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_option_for_as_select_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_option_for_as_select_list?: (ctx: Table_option_for_as_select_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_option_for_as_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_option_for_as_select?: (ctx: Table_option_for_as_selectContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_option?: (ctx: Table_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_cluster_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_cluster_option?: (ctx: Table_cluster_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_distribution_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_distribution_option?: (ctx: Table_distribution_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_view`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_view?: (ctx: Create_viewContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_workload_classifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_workload_classifier?: (ctx: Create_workload_classifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.work_load_classifier_other_options`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWork_load_classifier_other_options?: (ctx: Work_load_classifier_other_optionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_view`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_view?: (ctx: Alter_viewContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.view_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitView_name?: (ctx: View_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_table?: (ctx: Alter_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_table_alter_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_table_alter_item?: (ctx: Alter_table_alter_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_table_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_table_source?: (ctx: Alter_table_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_table_drop_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_table_drop_item?: (ctx: Alter_table_drop_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_column_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_column_type?: (ctx: Alter_column_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.rebuild_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRebuild_option?: (ctx: Rebuild_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.single_partition_rebuild_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingle_partition_rebuild_option?: (ctx: Single_partition_rebuild_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.partition_number_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartition_number_list?: (ctx: Partition_number_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_database`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_database?: (ctx: Alter_databaseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_database_encryption_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_database_encryption_key?: (ctx: Alter_database_encryption_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_index`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_index?: (ctx: Alter_indexContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.edition_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdition_option?: (ctx: Edition_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.database_optionspecs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabase_optionspecs?: (ctx: Database_optionspecsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.database_optionspec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabase_optionspec?: (ctx: Database_optionspecContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.termination`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermination?: (ctx: TerminationContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_materialized_view`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_materialized_view?: (ctx: Alter_materialized_viewContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_index`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_index?: (ctx: Drop_indexContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_procedure`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_procedure?: (ctx: Drop_procedureContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_statistics`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_statistics?: (ctx: Drop_statisticsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_table?: (ctx: Drop_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_view`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_view?: (ctx: Drop_viewContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.drop_workload_classifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrop_workload_classifier?: (ctx: Drop_workload_classifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.declare_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclare_statement?: (ctx: Declare_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.declare_cursor_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclare_cursor_statement?: (ctx: Declare_cursor_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.declare_table_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclare_table_statement?: (ctx: Declare_table_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_type_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_type_definition?: (ctx: Table_type_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.cursor_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCursor_clause?: (ctx: Cursor_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.open_close_deallocate_cursor_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpen_close_deallocate_cursor_statement?: (ctx: Open_close_deallocate_cursor_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.fetch_cursor_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFetch_cursor_statement?: (ctx: Fetch_cursor_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.execute_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecute_statement?: (ctx: Execute_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.execute_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecute_body?: (ctx: Execute_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.execute_statement_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecute_statement_arg?: (ctx: Execute_statement_argContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.execute_var_string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecute_var_string?: (ctx: Execute_var_stringContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql_server_execute_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_server_execute_body?: (ctx: Sql_server_execute_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql_server_execute_param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_server_execute_param?: (ctx: Sql_server_execute_paramContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql_server_execute_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_server_execute_option?: (ctx: Sql_server_execute_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.result_sets_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResult_sets_definition?: (ctx: Result_sets_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.result_sets_definition_element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResult_sets_definition_element?: (ctx: Result_sets_definition_elementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.security_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSecurity_statement?: (ctx: Security_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.grant_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrant_statement?: (ctx: Grant_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.deny_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeny_statement?: (ctx: Deny_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.revoke_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRevoke_statement?: (ctx: Revoke_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.security_class_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSecurity_class_type?: (ctx: Security_class_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.security_permissions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSecurity_permissions?: (ctx: Security_permissionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.security_permission`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSecurity_permission?: (ctx: Security_permissionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.set_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_statement?: (ctx: Set_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.set_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_item?: (ctx: Set_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.transaction_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransaction_statement?: (ctx: Transaction_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.go_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGo_statement?: (ctx: Go_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.kill_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKill_statement?: (ctx: Kill_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.explain_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplain_statement?: (ctx: Explain_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.copy_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCopy_statement?: (ctx: Copy_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.copy_column`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCopy_column?: (ctx: Copy_columnContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.copy_into_options`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCopy_into_options?: (ctx: Copy_into_optionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.azure_credential`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAzure_credential?: (ctx: Azure_credentialContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_clause?: (ctx: Dbcc_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_checkindent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_checkindent?: (ctx: Dbcc_checkindentContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_dropcleanbuffers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_dropcleanbuffers?: (ctx: Dbcc_dropcleanbuffersContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_dropresultsetcache`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_dropresultsetcache?: (ctx: Dbcc_dropresultsetcacheContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_freeproccache`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_freeproccache?: (ctx: Dbcc_freeproccacheContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_pdw_showexecutionplan`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_pdw_showexecutionplan?: (ctx: Dbcc_pdw_showexecutionplanContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_pdw_showmaterializedviewoverhead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_pdw_showmaterializedviewoverhead?: (ctx: Dbcc_pdw_showmaterializedviewoverheadContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_pdw_showpartitionstats`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_pdw_showpartitionstats?: (ctx: Dbcc_pdw_showpartitionstatsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_pdw_showspaceused`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_pdw_showspaceused?: (ctx: Dbcc_pdw_showspaceusedContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_show_statistics`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_show_statistics?: (ctx: Dbcc_show_statisticsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.dbcc_showresultcachespaceused`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbcc_showresultcachespaceused?: (ctx: Dbcc_showresultcachespaceusedContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.execute_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecute_clause?: (ctx: Execute_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.declare_local`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclare_local?: (ctx: Declare_localContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.alter_table_column_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlter_table_column_definition?: (ctx: Alter_table_column_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_definition_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_definition_list?: (ctx: Column_definition_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_definition?: (ctx: Column_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_option?: (ctx: Column_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_constraint_with_more_info`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_constraint_with_more_info?: (ctx: Column_constraint_with_more_infoContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_constraint?: (ctx: Column_constraintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.index_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_option?: (ctx: Index_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.low_priority_lock_wait`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLow_priority_lock_wait?: (ctx: Low_priority_lock_waitContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.set_special`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_special?: (ctx: Set_specialContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.constant_LOCAL_ID`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_LOCAL_ID?: (ctx: Constant_LOCAL_IDContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.primitive_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitive_expression?: (ctx: Primitive_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.case_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_expression?: (ctx: Case_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.unary_operator_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_operator_expression?: (ctx: Unary_operator_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.bracket_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBracket_expression?: (ctx: Bracket_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.constant_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_expression?: (ctx: Constant_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.subquery`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubquery?: (ctx: SubqueryContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.with_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWith_expression?: (ctx: With_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.common_table_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommon_table_expression?: (ctx: Common_table_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.update_elem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpdate_elem?: (ctx: Update_elemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.search_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearch_condition?: (ctx: Search_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.predicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPredicate?: (ctx: PredicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.query_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery_expression?: (ctx: Query_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.sql_union`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_union?: (ctx: Sql_unionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.select_criteria`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_criteria?: (ctx: Select_criteriaContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.where_search_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhere_search_condition?: (ctx: Where_search_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.having_search_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHaving_search_condition?: (ctx: Having_search_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.select_top_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_top_clause?: (ctx: Select_top_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.top_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTop_clause?: (ctx: Top_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.top_count`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTop_count?: (ctx: Top_countContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.order_by_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrder_by_clause?: (ctx: Order_by_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.order_by_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrder_by_expression?: (ctx: Order_by_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.group_by_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroup_by_item?: (ctx: Group_by_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.option_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOption_clause?: (ctx: Option_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOption?: (ctx: OptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.query_hint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery_hint?: (ctx: Query_hintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.optimize_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptimize_item?: (ctx: Optimize_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_hint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_hint?: (ctx: Table_hintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.select_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_list?: (ctx: Select_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_elem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_elem?: (ctx: Column_elemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expression_elem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_elem?: (ctx: Expression_elemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.select_list_elem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_list_elem?: (ctx: Select_list_elemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.tableStar`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableStar?: (ctx: TableStarContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_sources`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_sources?: (ctx: Table_sourcesContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_source`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_source?: (ctx: Table_sourceContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_source_item_joined`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_source_item_joined?: (ctx: Table_source_item_joinedContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_source_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_source_item?: (ctx: Table_source_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.pivot_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPivot_table?: (ctx: Pivot_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.unpivot_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnpivot_table?: (ctx: Unpivot_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_sample_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_sample_clause?: (ctx: Table_sample_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.join_part`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoin_part?: (ctx: Join_partContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.join_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoin_type?: (ctx: Join_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.join_hint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoin_hint?: (ctx: Join_hintContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.derived_table`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDerived_table?: (ctx: Derived_tableContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call?: (ctx: Function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_name?: (ctx: Function_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_body?: (ctx: Function_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.function_suffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_suffix?: (ctx: Function_suffixContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.special_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecial_function_call?: (ctx: Special_function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.model_object`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModel_object?: (ctx: Model_objectContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.switch_search_condition_section`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitch_search_condition_section?: (ctx: Switch_search_condition_sectionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.as_column_alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAs_column_alias?: (ctx: As_column_aliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.as_table_alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAs_table_alias?: (ctx: As_table_aliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_alias?: (ctx: Table_aliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_alias_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_alias_list?: (ctx: Column_alias_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_alias?: (ctx: Column_aliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_value_constructor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_value_constructor?: (ctx: Table_value_constructorContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.row_value_expression_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRow_value_expression_list?: (ctx: Row_value_expression_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.expression_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_list?: (ctx: Expression_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.all_distinct_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAll_distinct_expression?: (ctx: All_distinct_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.over_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOver_clause?: (ctx: Over_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.partition_by_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartition_by_clause?: (ctx: Partition_by_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.row_or_range_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRow_or_range_clause?: (ctx: Row_or_range_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.window_frame_extent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_extent?: (ctx: Window_frame_extentContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.window_frame_preceding`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_preceding?: (ctx: Window_frame_precedingContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.window_frame_between`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_between?: (ctx: Window_frame_betweenContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.window_frame_bound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_bound?: (ctx: Window_frame_boundContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.window_frame_following`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_following?: (ctx: Window_frame_followingContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.order_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrder_clause?: (ctx: Order_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.entity_name_for_azure_dw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntity_name_for_azure_dw?: (ctx: Entity_name_for_azure_dwContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.create_table_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreate_table_name?: (ctx: Create_table_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.table_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_name?: (ctx: Table_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.ddl_object`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDdl_object?: (ctx: Ddl_objectContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.statistics_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatistics_name?: (ctx: Statistics_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.simple_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_name?: (ctx: Simple_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.multipart_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultipart_identifier?: (ctx: Multipart_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.full_column_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFull_column_name?: (ctx: Full_column_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.column_name_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_name_list?: (ctx: Column_name_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.single_column_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingle_column_name?: (ctx: Single_column_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.on_off`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOn_off?: (ctx: On_offContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.null_notnull`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNull_notnull?: (ctx: Null_notnullContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_type?: (ctx: Data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.default_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefault_value?: (ctx: Default_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.schema_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchema_name?: (ctx: Schema_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId?: (ctx: IdContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.non_reserved_keywords`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_reserved_keywords?: (ctx: Non_reserved_keywordsContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.simple_id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_id?: (ctx: Simple_idContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.special_id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecial_id?: (ctx: Special_idContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.assignment_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_operator?: (ctx: Assignment_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SqlParserParser.file_size`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFile_size?: (ctx: File_sizeContext) => Result;
}

