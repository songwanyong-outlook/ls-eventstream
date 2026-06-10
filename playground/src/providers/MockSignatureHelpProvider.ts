// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, languages, Position } from "monaco-editor";
import { ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSql/CommonSqlUtils/Utils";
import { IsInSpecialContext, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

export class MockSignatureHelpProvider {
    readonly signatureHelpTriggerCharacters?: ReadonlyArray<string> = ["(", ",", ")"];
    readonly signatureHelpRetriggerCharacters?: ReadonlyArray<string> = [];


    constructor(private config: LanguageServiceConfig) {
    }

    provideSignatureHelp(
        model: editor.ITextModel,
        position: Position,
        token: CancellationToken,
        context: languages.SignatureHelpContext,
    ): any {
        const range = {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
        };
        const text = model.getValueInRange(range);

        if (IsInSpecialContext(text, model.getLanguageId())) {
            return null;
        }

        const signatureHelpResult = MockLanguageServiceFacade.GetResultFromPipeline({
            code: text,            
            reason: LanguageServiceFeature.SignatureHelp,
        } as ILanguageServiceRequest, this.config);
        return signatureHelpResult;
    }
}
