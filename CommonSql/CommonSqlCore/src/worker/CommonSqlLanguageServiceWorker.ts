// -----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// -----------------------------------------------------------------------------
import { ISignatureHelp } from "../../../CommonSqlUtils/SignatureTypes";
import { ILanguageServiceConfig, ILanguageServiceRequest, LanguageServiceFeature } from "../../../CommonSqlUtils/Utils";
import { CommonSqlLanguageServicePipeline } from "../pipeline/CommonSqlLanguageServicePipeline";

let languageServiceConfig = { caseSensitive: false };

// Respond to message from parent thread
onmessage = (event: MessageEvent) => {
    const languageServiceMsg = event.data;
    if (!languageServiceMsg?.reason) {
        if (languageServiceMsg?.caseSensitive === null) {
            return;
        }
        languageServiceConfig = languageServiceMsg as ILanguageServiceConfig;
    } else {
        const languageServiceRequest = languageServiceMsg as ILanguageServiceRequest;
        let languageServiceResults = CommonSqlLanguageServicePipeline.instance(languageServiceConfig).handleServiceRequest(languageServiceRequest);
        languageServiceResults = languageServiceResults == null ? processNullResult(languageServiceRequest) : languageServiceResults;
        postMessage(languageServiceResults, undefined);        
    }
};

function processNullResult(languageServiceRequest: ILanguageServiceRequest) {
    if (languageServiceRequest.reason === LanguageServiceFeature.WordCompletion) {
        return [];
    } else if (languageServiceRequest.reason === LanguageServiceFeature.QuickInfo || languageServiceRequest.reason === LanguageServiceFeature.ErrorDetection) {
        return "";
    } else if (languageServiceRequest.reason === LanguageServiceFeature.SignatureHelp) {
        return { signatures: [],  activeParameter: -1 } as ISignatureHelp;
    } else {
        return null;
    }
}