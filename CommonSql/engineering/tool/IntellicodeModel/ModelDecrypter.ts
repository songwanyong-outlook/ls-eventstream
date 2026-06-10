const fs = require('fs');
const Decrypter = require('aes-decrypter').Decrypter;
const { ungzip } = require('node-gzip');

const inputModelBinaryPath = "\\SqlModel.dat";
const outputModelJsonPath = "\\SqlProdModel.ts";
const NEWLINE = "\n";
const SequenceDelimiter = "~";
const NullSeq = "N";

const encryptedBytes = fs.readFileSync(__dirname + inputModelBinaryPath);
const key = [214, 105, 172, 23, 156, 35, 36, 45, 137, 37, 195, 176, 189, 110, 127, 78, 69, 171, 205, 160, 3, 202, 114, 220, 252, 109, 233, 221, 252, 181, 45, 47];
const iv = [60, 12, 128, 217, 163, 220, 176, 146, 213, 18, 190, 59, 212, 88, 192, 21];

const key_int = [];
for (let i = 0; i < 8; i++) {
    let _key = 0;
    for (let j = 0; j < 4; j++) {
        _key = _key * 256 + key[i * 4 + j];
    }
    key_int.push(_key);
}

const iv_int = [];
for (let i = 0; i < 4; i++) {
    let _iv = 0;
    for (let j = 0; j < 4; j++) {
        _iv = _iv * 256 + iv[i * 4 + j];
    }
    iv_int.push(_iv);
}

function ExtractRecommendationDictFromModel(decodedModel) {
    const result = {};
    for (const p of Object.keys(decodedModel["model"]["global"])) {
        let key = p;
        // remove newline character in values
        const values = decodedModel["model"]["global"][p][0].filter(v => v !== NEWLINE);
        if (values.length === 0) {
            continue;
        }
        // remove newline character in key
        // remove \n~ if key starts with this string.
        if (key.startsWith(NEWLINE + SequenceDelimiter)) {
            key = key.substring(2);
        }
        // remove all ~\n substrings in key
        key = key.split(SequenceDelimiter + NEWLINE).join("");

        // remove N~ if key starts with this string
        if (key.startsWith(NullSeq + SequenceDelimiter)) {
            key = key.substring(2);
        }

        if (key.length === 0) {
            continue;
        }

        if (!result[key]) {
            result[key] = values;
        } else {
            const newValues = values.filter(v => !result[key].includes(v));
            result[key] = result[key].concat(newValues);
        }
    }
    return result;
}

new Decrypter(
    encryptedBytes,
    key_int,
    iv_int,
    async function(err, decryptedBytes) {
        const unZippedArray = await ungzip(decryptedBytes);
        const resultStr = new TextDecoder().decode(unZippedArray);

        const recommendationDict = ExtractRecommendationDictFromModel(JSON.parse(resultStr));

        const modelFileHeader = "export const SqlModel = ";
        fs.writeFileSync(__dirname + outputModelJsonPath, modelFileHeader + JSON.stringify(recommendationDict, null, 4));
    },
);
