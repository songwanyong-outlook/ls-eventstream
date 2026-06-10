declare type MarkupKind = "plaintext" | "markdown";

export interface IMarkupContent {
    // The type of the Markup
    kind: MarkupKind;

    // The content itself
    value: string;
}

export interface ISignatureHelp {
    signatures: ISignatureInformation[];
    activeParameter: number;    // current active active parameter
}

export interface ISignatureInformation {
    // The name of this function.
    name: string;
    
    // The label of this signature. Will be shown in the UI.
    label: string;

    // The human-readable doc-comment of this signature. Will be shown in the UI but can be omitted.
    documentation?: string;

    // The parameters of this signature.
    parameters?: IParameterInformation[];

    example?: string;
}

export interface IParameterInformation {
    // The label of this parameter information.
    // Either a string or inclusive start and exclusive end offsets within its containing
    // [signature label](#SignatureInformation.label).
    label: string;

    // The human-readable doc-comment of this signature. Will be shown in the UI but can be omitted.
    documentation?: string | IMarkupContent;
}
