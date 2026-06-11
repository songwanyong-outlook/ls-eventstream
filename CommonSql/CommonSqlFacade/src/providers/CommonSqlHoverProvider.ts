// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Position, Token } from "monaco-editor";
import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { IHoverRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { GetHoverWord, LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { CommonSqlMetadataProvider } from "./CommonSqlMetadataProvider";

export class CommonSqlHoverProvider {
    private tokenPostfix: string;

    constructor(private languageServiceConfig: LanguageServiceConfig) {
        const syntaxHighlightRule = this.languageServiceConfig.syntaxHighlightRule as languages.IMonarchLanguage;
        this.tokenPostfix = syntaxHighlightRule.tokenPostfix;
    }

    provideHover(model: editor.ITextModel, position: Position, token: CancellationToken): any {
        const lineText = model.getLineContent(position.lineNumber);
        const hoveringWord = GetHoverWord(position.column, lineText, model.getLanguageId(), this.tokenPostfix);
        if (!!hoveringWord) {
            const metadata: ISqlMetadata = CommonSqlMetadataProvider.getMetadata(this.languageServiceConfig);

            // eslint-disable-next-line no-async-promise-executor
            return new Promise<languages.Hover>(async (resolve) => {
                const results = await CommonSqlLanguageServiceFacade
                    .GetInstance(this.languageServiceConfig)
                    .GetLanguageServiceResult({
                        code: model.getValue(), // complete script for parsing
                        metadata,
                        parameter: { hoveringWord: hoveringWord } as IHoverRequestParameter,
                        reason: LanguageServiceFeature.QuickInfo,
                    } as ILanguageServiceRequest) as languages.Hover;

                resolve(results);
            });
        }

        return null;
    }
}
