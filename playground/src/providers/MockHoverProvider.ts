// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, Position } from "monaco-editor";
import { STAR } from "../../../CommonSql/CommonSqlUtils/Constants";
import { IHoverRequestParameter, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSql/CommonSqlUtils/Utils";
import { IsInSpecialContext, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

export class MockHoverProvider {
    constructor(private languageServiceConfig: LanguageServiceConfig) {
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
        if (IsInSpecialContext(partialScript, model.getLanguageId(), false/* quoted id is not special context in this case*/)) {
            return null;
        }

        let hoveringWord = null;
        if (wordAtPosition) {
            hoveringWord = wordAtPosition.word;
        } else if (partialScript.endsWith(STAR)) {
            hoveringWord = STAR;
        } else {
            return null;
        }

        let metadata = null;
        try {
            metadata = this.languageServiceConfig.metadataDelegate();
        } catch {
            metadata = null;
        }

        const hoverParam: IHoverRequestParameter = {
            hoveringWord,
            cursorOffset: partialScript.length,
            range: {
                startLineNumber: position.lineNumber,
                startColumn: endColumn - 1,
                endLineNumber: position.lineNumber,
                endColumn,
            },
        };

        return MockLanguageServiceFacade.GetResultFromPipeline({
            code: model.getValue(), // complete script for parsing
            metadata,
            parameter: hoverParam,
            reason: LanguageServiceFeature.QuickInfo,
        } as ILanguageServiceRequest, this.languageServiceConfig);
    }
}
