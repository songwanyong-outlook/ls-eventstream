import { BuiltinFunctions } from "@CommonSqlCore/src/language-service/metadata/BuiltinFunctions";
import { ISignatureHelp } from "@CommonSqlUtils/SignatureTypes";

export interface ISignatureHelpTestCase {
    partialScript: string;
    expected: ISignatureHelp;
}

export const signatureHelpTestCases: ISignatureHelpTestCase[] =
    BuiltinFunctions
        .filter(func => !func.name.startsWith("SYSTEM."))
        .map((builtinFunction) => {
            return {
                partialScript: builtinFunction.name + "(",
                expected: {
                    signatures: BuiltinFunctions.filter(func => func.name === builtinFunction.name),
                    activeParameter: 0,
                },
            };
        })
        .concat([{
            partialScript: "SELECT Count(*) FROM input1 GROUP BY TumblingWindow(second,",
            expected: {
                signatures: BuiltinFunctions.filter(func => func.name === "TUMBLINGWINDOW"),
                activeParameter: 1,
            }
        }, {
            partialScript: "SELECT Count(*) FROM input1 GROUP BY Tumbling(second, 15, ",
            expected: {
                signatures: BuiltinFunctions.filter(func => func.name === "TUMBLING"),
                activeParameter: 2,
            }
        }]);
