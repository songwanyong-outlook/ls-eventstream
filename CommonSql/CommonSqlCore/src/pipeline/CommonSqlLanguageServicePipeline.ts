// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CommonSqlCompletionItem, CommonSqlCompletionItemType } from "../../../CommonSqlUtils/CommonSqlCompletionItem";
import { ParsePartialFunctionCall } from "../../../CommonSqlUtils/SignatureHelpHelpers";
import { ISignatureHelp, ISignatureInformation } from "../../../CommonSqlUtils/SignatureTypes";
import {
    ICodeActionInfo,
    ICodeActionRequestParameter,
    IErrorMarkItem,
    IFoldingRange,
    IHoverRequestParameter,
    ILanguageServiceConfig,
    ILanguageServiceRequest,
    IUnsupportedStatementConfig,
    LanguageServiceFeature
} from "../../../CommonSqlUtils/Utils";
import {
    EnableMetadataIntellisense,
    ProvideKeywordSuggestions
} from "../../../CommonSqlUtils/LanguageFeatureFlag";
import { CSAntlrParseService } from "../language-service/Parser/CSAntlrParseService";
import { CSScriptFormatter, MapSpecialKeyword } from "../language-service/Parser/CSScriptFormatter";
import { SqlParserLexer as SqlLexer } from "../language-service/Parser/GeneratedParser/SqlParserLexer";
import { SqlParserParser as SqlParser } from "../language-service/Parser/GeneratedParser/SqlParserParser";
import { getFoldingRanges } from "../language-service/Folding/CSLSFoldingRangeGenerator";
import { StreamingFormatConfig } from "../language-service/Formatting/StreamingFormatConfig";
import { CSLSFormatService } from "../language-service/Formatting/CSLSFormatService";
import {
    AppendRecommendation,
    ModelHasBeenUpdated,
    UpdateModelByCodeSnippets
} from "../language-service/Intellicode/IntellicodeService";
import { BuiltinFunctions } from "../language-service/metadata/BuiltinFunctions";
import { LSContextProvider } from "../language-service/metadata/LSContextProvider";
import {
    filterAndFormatParameterSuggestions,
    trimInputForWordCompletion,
    trimInputForWordCompletionParse
} from "../utils/SqlCoreUtils";

export class CommonSqlLanguageServicePipeline {
    public static instance = (config: ILanguageServiceConfig) => new CommonSqlLanguageServicePipeline(config);
    private static defaultParseService = null;

    private static unsupportedStatements: IUnsupportedStatementConfig[] = [{
        ruleName: 'createTableStatement',
        customizedErrorMessage: 'CREATE TABLE is not supported',
    }];

    constructor(public config: ILanguageServiceConfig) {}

    public handleServiceRequest(request: ILanguageServiceRequest, resetParseService = false) {
        if (resetParseService) {
            CommonSqlLanguageServicePipeline.defaultParseService = null;
        }

        switch (request.reason) {
            case LanguageServiceFeature.WordCompletion:
                return this.getSuggestions(request);
            case LanguageServiceFeature.ErrorDetection:
                return this.getErrors(request);
            case LanguageServiceFeature.SignatureHelp:
                return this.getSignature(request);
            case LanguageServiceFeature.QuickInfo:
                return this.getHover(request);
            case LanguageServiceFeature.Custom:
                return this.getOutputSchema(request);
            case LanguageServiceFeature.AutoFormat:
                return this.getFormat(request);
            case LanguageServiceFeature.CodeFolding:
                return this.getFolding(request);
            case LanguageServiceFeature.CodeAction:
                return this.getCodeActions(request);
            case LanguageServiceFeature.Custom:
                return this.getOutputSchema(request);
        }

        return null;
    }

    public getSuggestions(request: ILanguageServiceRequest): CommonSqlCompletionItem[] | string {
        if (!ModelHasBeenUpdated()) {
            this.TrainIntellicodeModelBySnippets(request);
        }
        
        const input = trimInputForWordCompletion(request.code);
        let inputForParse = trimInputForWordCompletionParse(input);

        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);
        inputForParse = scriptFormatter.formatScriptByKeywords(inputForParse);

        let keywordCompletionItems: CommonSqlCompletionItem[] = [];
        let contextCompletionItems: CommonSqlCompletionItem[] = [];

        const service = this.getParserService(LanguageServiceFeature.WordCompletion, request);
        // no need to force parse. (not like in the method getCompletionWords, if cache misses, we must set forceParse to be true)
        // but isKeywordSuggestionNeeded is true and need to do parsing(ast cache miss), we must use accurateKeywordIntellisense.
        const parseResult = service.Parse(inputForParse, LanguageServiceFeature.WordCompletion, false, true);

        const isKeywordSuggestionNeeded = !input || (input.charAt(input.length - 1) !== "." && input.charAt(input.length - 1) !== "@");
        if (isKeywordSuggestionNeeded) {
            // For Sql, always use accurateKeywordIntellisense when parsing for accurate keyword completion.
            const keywords = service.getCompletionWords(inputForParse, true);
            keywordCompletionItems = keywords.map(
                keyword => {
                    var keywordShown = MapSpecialKeyword(keyword);
                    return new CommonSqlCompletionItem(keywordShown, keywordShown, null, CommonSqlCompletionItemType.Keyword);            
                });
        }

        keywordCompletionItems = AppendRecommendation(keywordCompletionItems, scriptFormatter.getKeywordTokens(inputForParse));

        let allCompletionItems = keywordCompletionItems;
        const metadata = request.metadata;
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                input,
                metadata,
                parseResult,
                service.cachedScript.get(LanguageServiceFeature.WordCompletion));

            contextCompletionItems = currentContext.GetMetadataSuggestions() ?? [];

            allCompletionItems = ProvideKeywordSuggestions ? keywordCompletionItems.concat(contextCompletionItems) : contextCompletionItems;
        }

        return filterAndFormatParameterSuggestions(input, allCompletionItems
            .filter(item => !!item && !!item.label)
            .filter(item => !input.endsWith("@") ? true : item.label.startsWith("@"))
            .filter(CommonSqlCompletionItem.completionItemNotDuplicate));
    }

    public getErrors(request: ILanguageServiceRequest): IErrorMarkItem[] {
        if (!request.code || request.code.length === 0) {
            return [];
        }

        const input = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule)
                          .formatScriptByKeywords(request.code);
        const service = this.getParserService(LanguageServiceFeature.ErrorDetection, request);

        // Don't worry about the redundant parsing here. The parser service will cache the script.
        const parseResult = service.Parse(input, LanguageServiceFeature.ErrorDetection, false, false);       
        const syntaxErrors = service.getSyntaxErrors(input, CommonSqlLanguageServicePipeline.unsupportedStatements);

        let semanticErrors: IErrorMarkItem[] = [];
        if (!!request.metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                input,
                request.metadata,
                parseResult,
                service.cachedScript.get(LanguageServiceFeature.ErrorDetection));

            semanticErrors = currentContext.getSemanticErrors();
        }

        return syntaxErrors.concat(semanticErrors);
    }

    public getCodeActions(request: ILanguageServiceRequest): ICodeActionInfo[] {
        request.parameter = request.parameter as ICodeActionRequestParameter;
        if (!request.code || !request.metadata || !request.parameter || !request.parameter.range) {
            return null;
        }

        const input = this
            .getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule)
            .formatScriptByKeywords(request.code);
        const range = request.parameter.range;

        const service = this.getParserService(LanguageServiceFeature.ErrorDetection, request); // re-use the error detection parser
        const parseResult = service.Parse(input, LanguageServiceFeature.ErrorDetection, false, false);

        if (!!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                input,
                request.metadata,
                parseResult,
                service.cachedScript.get(LanguageServiceFeature.ErrorDetection)
            );

            const actions = currentContext.getCodeActions(range);
            return actions;
        }

        return [];
    }

    public getHover(request: ILanguageServiceRequest): string {
        request.parameter = request.parameter as IHoverRequestParameter;
        if (!request.code || !request.parameter || !request.parameter.hoveringWord) {
            return null;
        }

        const word = request.parameter.hoveringWord;
        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);

        if (scriptFormatter.isReservedKeyword(request.parameter.hoveringWord)) {
            return "Reserved Keyword";
        }

        if (scriptFormatter.isNonReservedKeyword(request.parameter.hoveringWord)) {
            return "Non-Reserved Keyword";
        }

        let signature: ISignatureInformation = BuiltinFunctions.find(func => func.name.toUpperCase() == word.toUpperCase());       
        if (!!signature) {
            let documentation = signature.documentation;
            return `**Builtin Function**:\n\n${signature.label}\n\n${documentation}`;
        }

        const script = scriptFormatter.formatScriptByKeywords(request.code);
        // const partialScript = scriptFormatter.formatScriptByKeywords(request.code.slice(0, request.parameter.cursorOffset));
        const service = this.getParserService(LanguageServiceFeature.QuickInfo, request);
        const parseResult = service.Parse(script, LanguageServiceFeature.QuickInfo, false, false);

        if (!!request.metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                script, // partialScript,
                request.metadata,
                parseResult,
                service.cachedScript.get(LanguageServiceFeature.QuickInfo));

            return currentContext.getQuickInfo(request.parameter.hoveringWord)
        }

        return null;
    }

    public getOutputSchema(request: ILanguageServiceRequest): string[] {
        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);
        const script = scriptFormatter.formatScriptByKeywords(request.code);

        const service = this.getParserService(LanguageServiceFeature.Custom, request);
        const parseResult = service.Parse(script, LanguageServiceFeature.WordCompletion, false, true); // reuse the word completion parser

        const metadata = request.metadata;
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                script,
                metadata,
                parseResult,
                service.cachedScript.get(LanguageServiceFeature.WordCompletion));

            let outputSchema = currentContext.getOutputSchema();    
            return outputSchema.map(item => item.alias?? item.name); 
        }

        return null;
    }

    public getFormat(request: ILanguageServiceRequest): string {       
        const input = this
            .getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule)
            .formatScriptByKeywords(request.code);
        const service = this.getParserService(LanguageServiceFeature.AutoFormat, request);
        const ast = service.Parse(input, LanguageServiceFeature.AutoFormat, false, false);
        const allRuleNames = service.GetAllRuleNames();
        const allTokens = service.getAllTokens(input);

        return new CSLSFormatService(
            input, 
            StreamingFormatConfig,
            allRuleNames,
            (text) => this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule).isKeyword(text),
            allTokens,
        ).generateFormattedScript(ast);
    }

    public getFolding(request: ILanguageServiceRequest): IFoldingRange[] {
        const input = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule).formatScriptByKeywords(request.code);
        const service = this.getParserService(LanguageServiceFeature.AutoFormat, request);
        const ast = service.Parse(input, LanguageServiceFeature.CodeFolding, false, false);
        return getFoldingRanges(ast);
    }

    public getSignature(request: ILanguageServiceRequest): ISignatureHelp {
        if (!request.code) {
            return null;
        }

        const input = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule).formatScriptByKeywords(request.code);
        try {
            const funcNameAndParamIndex = ParsePartialFunctionCall(input, false);
            if (!funcNameAndParamIndex || !funcNameAndParamIndex.funcName) {
                return null;
            }
            const funcName: string = funcNameAndParamIndex.funcName;
            const funcSignatures: ISignatureInformation[] = BuiltinFunctions.filter(func => func.name.toUpperCase() === funcName.toUpperCase());
            if (funcSignatures.length > 0) {
                return {
                    signatures: funcSignatures,
                    activeParameter: funcNameAndParamIndex.paramIndex,
                } as ISignatureHelp;
            }
        } catch {
            // do nothing
        }
        return null;
    }

    private getParserService(_feature: LanguageServiceFeature, request: ILanguageServiceRequest): CSAntlrParseService {
        if (!CommonSqlLanguageServicePipeline.defaultParseService) {
            const scriptFormater = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);
            CommonSqlLanguageServicePipeline.defaultParseService = new CSAntlrParseService(
                SqlLexer,
                SqlParser,
                SqlParser.prototype.sql,
                scriptFormater.getStatementEndToken(),
                scriptFormater,
                this.config.grammarRuleNames?.incrementalParsing,
            );
        }

        return CommonSqlLanguageServicePipeline.defaultParseService;
    }

    private getScriptFormatter(caseSensitive: boolean, nonReservedKeywordsRuleName: string): CSScriptFormatter {
        return CSScriptFormatter.GetInstance(SqlLexer.VOCABULARY, SqlParser, caseSensitive, ";", nonReservedKeywordsRuleName);
    }

    private TrainIntellicodeModelBySnippets(request: ILanguageServiceRequest) {
        return new Promise<void>((resolve) => {
            if (!this.config.codeSnippets) {
                return;
            }

            const snippetTexts: string[] = this.config.codeSnippets.map((item) => item.text);
            UpdateModelByCodeSnippets(snippetTexts, this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule));
            resolve();
        });
    }
}
