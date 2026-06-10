// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CommonSqlCompletionItem, CommonSqlCompletionItemType, intellisenseFakedPrefix } from "../../../CommonSqlUtils/CommonSqlCompletionItem";
import { DOT, STAR } from "../../../CommonSqlUtils/Constants";
import { IMetadataObject, IMetadataType, ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { ParsePartialFunctionCall } from "../../../CommonSqlUtils/SignatureHelpHelpers";
import { ISignatureHelp, ISignatureInformation } from "../../../CommonSqlUtils/SignatureTypes";
import { 
    ICodeActionRequestParameter, 
    ICodeActionResult, 
    ICompletionRequestParamter, 
    IDefinitionResult, 
    IErrorMarkItem, 
    IFoldingRange, 
    IHoverRequestParameter, 
    ILanguageServiceConfig, 
    ILanguageServiceRequest, 
    LanguageServiceFeature 
} from "../../../CommonSqlUtils/Utils";
import { generateDocumentationMarkdown } from "../language-service/CompletionItem/SqlCompletionItemGenerator";
import { LSContextProvider } from "../language-service/metadata/LSContextProvider";
import { CSAntlrParseService } from "../language-service/Parser/CSAntlrParseService";
import { CSScriptFormatter } from "../language-service/Parser/CSScriptFormatter";
import { SqlParserLexer as SqlLexer } from "../language-service/Parser/GeneratedParser/SqlParserLexer";
import { SqlParserParser as SqlParser } from "../language-service/Parser/GeneratedParser/SqlParserParser";
import { EnableMetadataIntellisense, ProvideKeywordSuggestions } from "../../../CommonSqlUtils/LanguageFeatureFlag";
import { filterAndFormatParameterSuggestions, trimInputForWordCompletion, trimInputForWordCompletionParse } from "../utils/SqlCoreUtils";
import { CSLSFormatService } from "../language-service/Formatting/CSLSFormatService";
import { AppendRecommendation } from "../language-service/Intellicode/IntellicodeService";
import { getFoldingRanges } from "../language-service/Folding/CSLSFoldingRangeGenerator";
import { ModelHasBeenUpdated, UpdateModelByCodeSnippets } from "../language-service/Intellicode/IntellicodeService";

type UnloadDatabaseName = string;

export class CommonSqlLanguageServicePipeline {
    public static instance = (config: ILanguageServiceConfig) => new CommonSqlLanguageServicePipeline(config);
    private static defaultParseService = null;

    constructor(public config: ILanguageServiceConfig) {}

    public getSuggestions(request: ILanguageServiceRequest): CommonSqlCompletionItem[] | UnloadDatabaseName {
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
            keywordCompletionItems = keywords.map(keyword => new CommonSqlCompletionItem(keyword, null, null, CommonSqlCompletionItemType.Keyword));
        }

        keywordCompletionItems = AppendRecommendation(keywordCompletionItems, scriptFormatter.getKeywordTokens(inputForParse));

        let allCompletionItems = keywordCompletionItems;
        const metadata = request.metadata ?? this.GetIntellisenseFakedMetadata();
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                input,
                metadata,
                this.config.builtinFunctions,
                this.config.caseSensitive, 
                parseResult,
                service.GetAllRuleNames(),
                this.config.grammarRuleNames,
                service.GetRuleStack(),
                service.cachedScript.get(LanguageServiceFeature.WordCompletion),
                LanguageServiceFeature.WordCompletion,
                null,
                request.databaseToBeLoaded
            );
            currentContext.SetTableNamespaces((request.parameter as ICompletionRequestParamter)?.tableNamespaces);
            contextCompletionItems = currentContext.GetMetadataSuggestions() ?? [];

            // check if necessary to dynamic load metadata
            if (contextCompletionItems.length === 0 && currentContext.expressionPrefix) {
                const prefix = currentContext.expressionPrefix.endsWith(DOT) 
                    ? currentContext.expressionPrefix.substring(0, currentContext.expressionPrefix.length - 1)
                    : currentContext.expressionPrefix;
                if (request.databaseToBeLoaded?.includes(prefix)) {
                    return prefix;
                }
            }
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

        const input = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule).formatScriptByKeywords(request.code);
        const service = this.getParserService(LanguageServiceFeature.ErrorDetection, request);
        return service.getSyntaxErrors(input, this.config.grammarRuleNames.unsupportedStatements);
    }

    public getHover(request: ILanguageServiceRequest): string {
        request.parameter = request.parameter as IHoverRequestParameter;
        if (!request.code || !request.parameter || !request.parameter.hoveringWord) {
            return null;
        }

        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);

        if (scriptFormatter.isReservedKeyword(request.parameter.hoveringWord)) {
            return "Reserved Keyword";
        }

        if (scriptFormatter.isNonReservedKeyword(request.parameter.hoveringWord)) {
            return "Non-Reserved Keyword";
        }

        const script = scriptFormatter.formatScriptByKeywords(request.code);
        const partialScript = scriptFormatter.formatScriptByKeywords(request.code.slice(0, request.parameter.cursorOffset));
        const service = this.getParserService(LanguageServiceFeature.QuickInfo, request);
        const parseResult = service.Parse(script, LanguageServiceFeature.QuickInfo, false, false);
        const metadata = request.metadata ?? this.GetIntellisenseFakedMetadata();
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                partialScript,
                metadata,
                this.config.builtinFunctions,
                this.config.caseSensitive,
                parseResult,
                service.GetAllRuleNames(),
                this.config.grammarRuleNames,
                service.GetRuleStack(),
                service.cachedScript.get(LanguageServiceFeature.QuickInfo),
                LanguageServiceFeature.QuickInfo,
            );
            if (!currentContext) {
                return null;
            }
            if (request.parameter.hoveringWord === STAR) {
                const tableSourceObject = currentContext.GetTableSourceObjectForSelectStarStmt(request.parameter?.range);
                if (tableSourceObject) {
                    return generateDocumentationMarkdown(tableSourceObject, true);
                }
            } else {
                const metadataObject = currentContext.GetMetadataObjectForCurrentWord();
                if (metadataObject) {
                    return generateDocumentationMarkdown(metadataObject, false);
                }
            }
        }
        return null;
    }

    public getParserService(_feature: LanguageServiceFeature, request: ILanguageServiceRequest): CSAntlrParseService {
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

    public getScriptFormatter(caseSensitive: boolean, nonReservedKeywordsRuleName: string): CSScriptFormatter {
        return CSScriptFormatter.GetInstance(SqlLexer.VOCABULARY, SqlParser, caseSensitive, ";", nonReservedKeywordsRuleName);
    }

    public handleServiceRequest(request: ILanguageServiceRequest, resetParseService = false) {
        if (resetParseService) {
            CommonSqlLanguageServicePipeline.defaultParseService = null;
        }

        switch (request.reason) {
            case LanguageServiceFeature.WordCompletion:
                return this.getSuggestions(request);
            case LanguageServiceFeature.ErrorDetection:
                return this.getErrors(request);
            case LanguageServiceFeature.QuickInfo:
                return this.getHover(request);
            case LanguageServiceFeature.SignatureHelp:
                return this.getSignature(request);
            case LanguageServiceFeature.AutoFormat:
                return this.getFormat(request);
            case LanguageServiceFeature.GotoDefinition:
                return this.getDefinition(request);
            case LanguageServiceFeature.GotoReferences:
                return this.getReferences(request);
            case LanguageServiceFeature.CodeFolding:
                return this.getFolding(request);
            case LanguageServiceFeature.CodeAction:
                return this.getCodeActions(request);
        }
        return null;
    }

    public getCodeActions(request: ILanguageServiceRequest): ICodeActionResult[] {
        request.parameter = request.parameter as ICodeActionRequestParameter;
        if (!request.code || !request.parameter || !request.parameter.range) {
            return null;
        }

        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);

        const script = scriptFormatter.formatScriptByKeywords(request.code);
        const service = this.getParserService(LanguageServiceFeature.CodeAction, request);
        const parseResult = service.Parse(script, LanguageServiceFeature.CodeAction, false, false);
        const metadata = request.metadata ?? this.GetIntellisenseFakedMetadata();
        const results: ICodeActionResult[] = [];
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                script,
                metadata,
                this.config.builtinFunctions,
                this.config.caseSensitive,
                parseResult,
                service.GetAllRuleNames(),
                this.config.grammarRuleNames,
                service.GetRuleStack(),
                service.cachedScript.get(LanguageServiceFeature.CodeAction),
                LanguageServiceFeature.CodeAction,
                request.parameter.range,
            );
            if (!currentContext) {
                return null;
            }

            // add star expansion action
            const codeActions = currentContext.GetValidCodeActions();
            codeActions.forEach(action => {
                results.push({
                    kind: action.kind,
                    range: action.editRange,
                    text: action.replaceText,
                } as ICodeActionResult);
            });
        }
        return results;
    }
    
    public getReferences(request: ILanguageServiceRequest): string {
        request.parameter = request.parameter as IHoverRequestParameter;
        if (!request.code || !request.parameter || !request.parameter.hoveringWord) {
            return null;
        }

        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);

        if (scriptFormatter.isReservedKeyword(request.parameter.hoveringWord)) {
            return null;
        }

        if (scriptFormatter.isNonReservedKeyword(request.parameter.hoveringWord)) {
            return null;
        }

        const script = scriptFormatter.formatScriptByKeywords(request.code);
        const partialScript = scriptFormatter.formatScriptByKeywords(request.code.slice(0, request.parameter.cursorOffset));
        const service = this.getParserService(LanguageServiceFeature.QuickInfo, request);
        const parseResult = service.Parse(script, LanguageServiceFeature.QuickInfo, false, false);
        const metadata = request.metadata ?? this.GetIntellisenseFakedMetadata();
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                partialScript,
                metadata,
                this.config.builtinFunctions,
                this.config.caseSensitive,
                parseResult,
                service.GetAllRuleNames(),
                this.config.grammarRuleNames,
                service.GetRuleStack(),
                service.cachedScript.get(LanguageServiceFeature.QuickInfo),
                LanguageServiceFeature.QuickInfo,
            );
            if (!currentContext) {
                return null;
            }
            const metadataObject = currentContext.GetMetadataObjectForCurrentWord();
            if (metadataObject) {
                return metadataObject.name;
            }
        }
        return null;
    }

    public getDefinition(request: ILanguageServiceRequest): IDefinitionResult {
        request.parameter = request.parameter as IHoverRequestParameter;
        if (!request.code || !request.parameter || !request.parameter.hoveringWord) {
            return null;
        }

        const scriptFormatter = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule);

        if (scriptFormatter.isReservedKeyword(request.parameter.hoveringWord)) {
            return null;
        }

        if (scriptFormatter.isNonReservedKeyword(request.parameter.hoveringWord)) {
            return null;
        }

        const script = scriptFormatter.formatScriptByKeywords(request.code);
        const partialScript = scriptFormatter.formatScriptByKeywords(request.code.slice(0, request.parameter.cursorOffset));
        const service = this.getParserService(LanguageServiceFeature.QuickInfo, request);
        const parseResult = service.Parse(script, LanguageServiceFeature.QuickInfo, false, false);
        const metadata = request.metadata ?? this.GetIntellisenseFakedMetadata();
        if (!!metadata && !!parseResult && EnableMetadataIntellisense) {
            const currentContext = LSContextProvider.GetContext(
                partialScript,
                metadata,
                this.config.builtinFunctions,
                this.config.caseSensitive,
                parseResult,
                service.GetAllRuleNames(),
                this.config.grammarRuleNames,
                service.GetRuleStack(),
                service.cachedScript.get(LanguageServiceFeature.QuickInfo),
                LanguageServiceFeature.QuickInfo,
            );
            if (!currentContext) {
                return null;
            }
            const metadataObject = currentContext.GetMetadataObjectForCurrentWord();
            if (metadataObject) {
                const range = currentContext.getCreatedMetadataRange(metadataObject);
                return {
                    range,
                    metadataObjectName: metadataObject.prefix ? metadataObject.prefix + '.' + metadataObject.name : metadataObject.name,
                } as IDefinitionResult;
            }
        }
        return null;
    }

    public getFormat(request: ILanguageServiceRequest): string {
        const input = this.getScriptFormatter(this.config.caseSensitive, this.config.grammarRuleNames?.nonReservedKeywordsRule).formatScriptByKeywords(request.code);
        const service = this.getParserService(LanguageServiceFeature.AutoFormat, request);
        const ast = service.Parse(input, LanguageServiceFeature.AutoFormat, false, false);
        const allRuleNames = service.GetAllRuleNames();
        const allTokens = service.getAllTokens(input);
        return new CSLSFormatService(
            input, 
            this.config.grammarRuleNames?.codeFormatting,
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
            const funcSignatures: ISignatureInformation[] = [];

            if(this.config.caseSensitive) {
                if(this.config.builtinFunctions.has(funcName)) {
                    funcSignatures.push(...this.config.builtinFunctions.get(funcName));
                }
            } else {
                Array.from(this.config.builtinFunctions.keys()).filter(k => k.toUpperCase() === funcName.toUpperCase())
                    .forEach(matchedKey => {
                        if(this.config.builtinFunctions.has(matchedKey)) {
                            funcSignatures.push(...this.config.builtinFunctions.get(matchedKey));
                        }
                    });
            }

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

    private GetIntellisenseFakedMetadata(): ISqlMetadata {
        return {
            defaultSchema: intellisenseFakedPrefix + "Schema",
            objects: [{ name: intellisenseFakedPrefix + "Schema", prefix: null, type: IMetadataType.Schema, children: [] } as IMetadataObject],
        } as unknown as ISqlMetadata;
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
