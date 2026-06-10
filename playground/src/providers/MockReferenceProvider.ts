// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { CancellationToken, editor, Position, languages } from 'monaco-editor';
import { IHoverRequestParameter, ILanguageServiceRequest, IRangeItem, LanguageServiceFeature } from '../../../CommonSql/CommonSqlUtils/Utils';
import { IsInSpecialContext, LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";

export class MockReferenceProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    async provideReferences(model: editor.ITextModel, position: Position, context: languages.ReferenceContext, token: CancellationToken): Promise<languages.Location[]> {
        const selectedWord: editor.IWordAtPosition = model.getWordAtPosition(position);
        if (!selectedWord || !selectedWord.word) {
            return [];
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
            return [];
        }

        let metadata = null;
        try {
            metadata = this.languageServiceConfig.metadataDelegate();
        } catch {
            metadata = null;
        }

        const hoverParam: IHoverRequestParameter = { hoveringWord: selectedWord.word, cursorOffset: partialScript.length };
        const name = await MockLanguageServiceFacade.GetResultFromPipeline({
            code: script,
            metadata,
            parameter: hoverParam,
            reason: LanguageServiceFeature.GotoReferences,
        } as ILanguageServiceRequest, this.languageServiceConfig) as string;

        if (name) {
            const findMatches = model.findMatches(name, true, false, true, ' .,;[]()', false);
            const locations = findMatches.map(match => ({ uri: model.uri, range: match.range }));
            return locations;
        }
        return null;
    }
}
