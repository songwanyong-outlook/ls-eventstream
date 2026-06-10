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
        const languageServiceResults = CommonSqlLanguageServicePipeline.instance(languageServiceConfig)
            .handleServiceRequest(languageServiceRequest);

        postMessage(languageServiceResults ?? processNullResult(languageServiceRequest.reason), undefined);        
    }
};

function processNullResult(reason: LanguageServiceFeature) {
    switch (reason) {
        case LanguageServiceFeature.WordCompletion:
        case LanguageServiceFeature.ErrorDetection:
        case LanguageServiceFeature.AutoFormat:
        case LanguageServiceFeature.CodeFolding:
        case LanguageServiceFeature.CodeAction:
        case LanguageServiceFeature.Custom:
            return [];
        case LanguageServiceFeature.QuickInfo:
            return "";
        case LanguageServiceFeature.SignatureHelp:
            return { signatures: [],  activeParameter: -1 } as ISignatureHelp;
        default:
            return null;
    }
}