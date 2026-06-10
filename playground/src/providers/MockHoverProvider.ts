// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, Position } from "monaco-editor";
import { buildBuiltinFunctionMap } from '../../../CommonSql/CommonSqlUtils/BulitinFunctionHelpers';
import { STAR } from "../../../CommonSql/CommonSqlUtils/Constants";
import { ISignatureInformation } from "../../../CommonSql/CommonSqlUtils/SignatureTypes";
import { IHoverRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSql/CommonSqlUtils/Utils";
import { IsInSpecialContext, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

export class MockHoverProvider {
    private languageServiceConfig: LanguageServiceConfig = null;
    private builtinFunctions: Map<string, ISignatureInformation[]>;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
        this.builtinFunctions = buildBuiltinFunctionMap(languageServiceConfig.builtinFunctions);
    }

    provideHover(model: editor.ITextModel, position: Position, token: CancellationToken): any {
        const wordAtPosition: editor.IWordAtPosition = model.getWordAtPosition(position);
        const endColumn = wordAtPosition ? wordAtPosition.endColumn : position.column + 1;

        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn,
        };
        const partialScript = model.getValueInRange(range);     // partial script for resolving expression
        if (IsInSpecialContext(partialScript, model.getLanguageId())) {
            return null;
        }
        let hoveringWord = null;
        let wordRange = null;
        if (wordAtPosition) {
            hoveringWord = wordAtPosition.word;
            wordRange = {
                startLineNumber: position.lineNumber,
                startColumn: endColumn - 1,
                endLineNumber: position.lineNumber,
                endColumn,
            };
        } else if (partialScript.endsWith(STAR)) {
            hoveringWord = STAR;
            wordRange = { startLineNumber: position.lineNumber, startColumn: endColumn - 1, endLineNumber: position.lineNumber, endColumn };
        } else {
            return null;
        }

        const script = model.getValue();    // complete script for parsing

        let metadata = null;
        try {
            metadata = this.languageServiceConfig.metadataDelegate();
        } catch {
            metadata = null;
        }

        const hoverParam: IHoverRequestParameter = { hoveringWord, cursorOffset: partialScript.length, range: wordRange };
        return MockLanguageServiceFacade.GetResultFromPipeline({
            code: script,
            metadata,
            parameter: hoverParam,
            reason: LanguageServiceFeature.QuickInfo,
        } as ILanguageServiceRequest, this.languageServiceConfig);
    }
}
