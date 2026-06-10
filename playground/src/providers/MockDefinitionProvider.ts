// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, Position } from "monaco-editor";
import { IHoverRequestParameter, ILanguageServiceRequest, IRangeItem, LanguageServiceFeature } from '../../../CommonSql/CommonSqlUtils/Utils';
import { IsInSpecialContext, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

export class MockDefinitionProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    async provideDefinition(model: editor.ITextModel, position: Position, token: CancellationToken): Promise<any> {
        const selectedWord: editor.IWordAtPosition = model.getWordAtPosition(position);
        if (!selectedWord || !selectedWord.word) {
            return null;
        }

        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: selectedWord.endColumn,
        } as IRangeItem;
        const partialScript = model.getValueInRange(range);     // partial script for resolving expression
        const script = model.getValue();                        // complete script for parsing

        if (IsInSpecialContext(partialScript, model.getLanguageId())) {
            return null;
        }

        let metadata = null;
        try {
            metadata = this.languageServiceConfig.metadataDelegate();
        } catch {
            metadata = null;
        }

        const hoverParam: IHoverRequestParameter = { hoveringWord: selectedWord.word, cursorOffset: partialScript.length };
        const definitionResult = await MockLanguageServiceFacade.GetResultFromPipeline({
            code: script,
            metadata,
            parameter: hoverParam,
            reason: LanguageServiceFeature.GotoDefinition,
        } as ILanguageServiceRequest, this.languageServiceConfig) as any;

        if (definitionResult) {
            if (definitionResult.range) {
                return { uri: model.uri, range: definitionResult.range }; 
            } else if (definitionResult.metadataObjectName && this.languageServiceConfig.gotoDefinitionDelegate) {
                this.languageServiceConfig.gotoDefinitionDelegate(definitionResult.metadataObjectName).then();
                return {
                    uri: model.uri,
                    range:{
                        startLineNumber: position.lineNumber,
                        startColumn: selectedWord.startColumn,
                        endLineNumber: position.lineNumber,
                        endColumn: selectedWord.endColumn,
                    }, 
                }; 
            }
        }
        return null;
    }
}
