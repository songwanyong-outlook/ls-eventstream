// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------

import { ISqlMetadata } from "../../../CommonSqlUtils/MetadataTypes";
import { CommonSqlLanguageServiceFacade } from "../CommonSqlLanguageServiceFacade";
import { LanguageServiceConfig } from "../SqlUtils/ServiceProviderUtils";
import { ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";

export class CommonSqlOutputSchemaProvider {
    constructor(private languageServiceConfig: LanguageServiceConfig) {
        this.languageServiceConfig = languageServiceConfig;
    }

    public async GetOutputSchemaAsync(code: string, metadata: ISqlMetadata): Promise<string[]> {
        const request: ILanguageServiceRequest = {
            code: code,
            metadata: metadata,
            reason: LanguageServiceFeature.Custom,
        };

        let output = await CommonSqlLanguageServiceFacade
            .GetInstance(this.languageServiceConfig)
            .GetLanguageServiceResult(request)
        
        return output as string[];
    }
}
