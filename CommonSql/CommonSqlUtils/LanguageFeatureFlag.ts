
/*
    Feature flag for metadata intellisense such as column intellisense, table intellisense..
*/
export const EnableMetadataIntellisense = true;

/*
    Indicate if we are using single worker for all language service features.
    If false, then error detection will use different worker from other fetures.
    Before error detection latency is optimized, turn it off.
*/
export const UseSingleWorkerForAllLanguageServiceFeatures = false;

/*
    Feature Flag for incremental parsing.
    Current supported features are word completion and error detection.
*/
export const UseIncrementalParsing = true;

/*
    Default to be true. Provide keyword suggestions in default scenario.
*/
export const ProvideKeywordSuggestions = true;

/*
    Feature flag for auto formatting before the feature is completely done.
*/
export const EnableFormatting = true;

/*
    Feature flag for goto definition before the feature is completely done.
*/
export const EnableGotoDefinition = true;

/*
    Feature flag for goto reference before the feature is completely done.
*/
export const EnableGotoReference = true;

/*
    Feature flag for code folding before the feature is completely done.
*/
export const EnableFolding = true;

/*
    Feature flag for code action before the feature is completely done.
*/
export const EnableCodeAction = false;

/*
    Feature flag for code lens before the feature is completely done.
*/
export const EnableCodeLens = true;