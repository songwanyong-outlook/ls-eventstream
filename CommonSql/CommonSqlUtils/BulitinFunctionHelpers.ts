import { ISignatureInformation } from './SignatureTypes';

export function buildBuiltinFunctionMap(builtinFunctions: ISignatureInformation[]): Map<string, ISignatureInformation[]> {
    const resultMap: Map<string, ISignatureInformation[]> = new Map();
    if (!builtinFunctions) {
        return resultMap;
    }

    for (const builtinFunction of builtinFunctions) {
        const name = builtinFunction.name;
        if (!resultMap.has(name)) {
            resultMap.set(name, []);
        }

        resultMap.get(name).push(builtinFunction);
    }
    return resultMap;
}
