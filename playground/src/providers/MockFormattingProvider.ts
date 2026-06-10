import { CancellationToken, editor, languages } from "monaco-editor";
import { MockLanguageServiceFacade } from "../MockLanguageServiceFacade";
import { LanguageServiceConfig } from "../../../CommonSql/CommonSqlFacade/src/SqlUtils/ServiceProviderUtils";
import { LanguageServiceFeature, ILanguageServiceRequest } from "../../../CommonSql/CommonSqlUtils/Utils";

export class MockFormattingProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    async provideDocumentFormattingEdits(model: editor.ITextModel, options: languages.FormattingOptions, token: CancellationToken): Promise<any> {
        const results = (await MockLanguageServiceFacade.GetResultFromPipeline({
            code: model.getValue(),
            reason: LanguageServiceFeature.AutoFormat,
            parameter: options,
        } as ILanguageServiceRequest, this.languageServiceConfig)) as languages.TextEdit[];

        results[0].range = model.getFullModelRange();
        return results;
    }
}
