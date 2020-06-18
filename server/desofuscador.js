const { HtmlEntitiesChar, HtmlEntitiesPer, HtmlEntitiesAmp, HexaChar } = require('./decodeList.json');

const Desofuscador = {
    decode: (str) => {
        let result = "";
        let token = "";
        let strLength = str.length;
    
        for (let i = 0; i < strLength; i++) {
            token += char = str.charAt(i);

            if (char === ";") {
                char = HtmlEntitiesAmp[token] ? HtmlEntitiesAmp[token] : '';
                console.log(`Econtrou AMP ${token}`);
                token = '';
                result += char;
            }
            else if (char === ")") {
                char = HtmlEntitiesChar[token] ? HtmlEntitiesChar[token] : '';
                console.log(`Econtrou Char ${token}`);
                token = '';
                result += char;
            }
            else if (char === "%") {
                let indice = `${char}${str.charAt(i+1)}${str.charAt(i+2)}`;
                char = HtmlEntitiesPer[indice] ? HtmlEntitiesPer[indice] : '';
                console.log(`Econtrou Per ${indice}`);
                token = '';
                i += 2;
                result += char;
            }
            else if (HexaChar[`${char}${str.charAt(i+1)}`] && str.charAt(i+2) !== ")") {
                let indice = `${char}${str.charAt(i+1)}`;
                char = HexaChar[indice] ? HexaChar[indice] : '';
                console.log(`Econtrou HexaChar ${indice}`);
                token = '';
                i += 1;
                result += char;
            }
        }
        return result;
    },
};

module.exports = Desofuscador;