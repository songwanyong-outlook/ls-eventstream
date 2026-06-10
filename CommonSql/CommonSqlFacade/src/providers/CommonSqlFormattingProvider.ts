import { CancellationToken, editor, languages } from "monaco-editor";
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { LanguageServiceFeature, ILanguageServiceRequest } from "../../../CommonSqlUtils/Utils";

export class CommonSqlFormattingProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    provideDocumentFormattingEdits(model: editor.ITextModel, options: languages.FormattingOptions, token: CancellationToken): any {        
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.TextEdit[]>(async (resolve) => {
            const results = await CommonSqlLanguageServiceFacade.GetInstance(this.languageServiceConfig).GetLanguageServiceResult({
                code: model.getValue(),
                reason: LanguageServiceFeature.AutoFormat,
                parameter: options,
            } as ILanguageServiceRequest) as languages.TextEdit[];
            results[0].range = model.getFullModelRange();
            resolve(results);
        });
    }
}
