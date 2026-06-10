import { CancellationToken, editor, languages } from "monaco-editor";
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { LanguageServiceFeature, ILanguageServiceRequest } from "../../../CommonSqlUtils/Utils";

export class CommonSqlFoldingProvider {
    private languageServiceConfig: LanguageServiceConfig = null;

    constructor(languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    provideFoldingRanges(model: editor.ITextModel, context: languages.FoldingContext, token: CancellationToken): any {        
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<languages.FoldingRange[]>(async (resolve) => {
            const results = await CommonSqlLanguageServiceFacade.GetInstance(this.languageServiceConfig).GetLanguageServiceResult({
                code: model.getValue(),
                reason: LanguageServiceFeature.CodeFolding,
            } as ILanguageServiceRequest) as languages.FoldingRange[];
            resolve(results);
        });
    }
}
