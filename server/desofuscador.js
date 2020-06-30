const { HtmlEntitiesChar, HtmlEntitiesPer, HtmlEntitiesAmp, HexaChar } = require('./decodeList.json');
/*
 HtmlEntitiesChar: char(32)
 HtmlEntitiesPer: %20
 HtmlEntitiesAmp: &lt;
 HexaChar: 20
*/
const Desofuscador = {
    /**
     * Está função é responsável por decodificar uma string
     * 
     * @example 
     *   //Ampersan
     *   Desofuscador.decode("&lt;&nbsp;&gt;"); 
     *   // "< >"
     *   
     *   //Percent
     *   Desofuscador.decode("%41%6c%6f%5b%5d"); 
     *   // "Alo[]"
     * 
     *   //Char
     *   Desofuscador.decode("char(65)char(108)char(111)"); 
     *   // "Alo"
     * 
     *   //Misturado
     *   Desofuscador.decode("&lt;char(65)char(108)char(111)&gt; %5btexto%5d delta"); 
     *   //"<Alo> [texto] delta"
     * 
     * @param   {String} str Parametro obrigatório, texto a ser decodificado
     * @returns {String}
     */
    decode: (str) => {
        // Utilizado para identificar palavras reservadas no alfabeto
        let token = "";
        
        // Substitui comentários por vazio
        str = str.replace(/\/\*.*?\*\//g, '');
        // Substitui "+" por espaço
        str = str.replace(/\+/g, ' ');
        // Substitui espaços extras por um único espaço
        str = str.replace(/\s+/g, ' ');

        // Converte a string em um array
        let arrayString = str.split("");
    
        /**
         * Está função é responsável por substituir, no arrayString, todos os caracteres 
         * que formam um token quando o mesmo é válido
         * 
         * @example
         *   // str = "delta &Delta;"
         *   
         *   // arrayString = ['d', 'e', 'l', 't', 'a', ' ', '&', 'D', 'e', 'l', 't', 'a', ';'];
         * 
         *   // identificou que existe um token que termina no indice 13 da str
         *   var index = 13;
         *   var token = "&Delta;"; // Token encontrado
         *   var replace = "Δ";
         * 
         *   replaceTokenAt(index, token, replace); 
         *   // arrayString = ['d', 'e', 'l', 't', 'a', ' ', '', '', '', '', '', '', 'Δ'];
         * 
         * @param   {Number} index Parametro obrigatório, indice em que terminou o token
         * @param   {String} token Parametro obrigatório, o token completo
         * @param   {String} replace Parametro obrigatório, o valor a ser substituido 
         * @returns {void}
         */
        const replaceTokenAt = (index, token, replace) => {
            // Calcula o indice inicial do token
            let calc = (index - (token.length-1));
            
            // Caso não resulte em um numero negativo, o sistema irá substituir por vazio até o penúltimo indice
            if (calc >= 0) {
                for(let ii = calc; ii < index; ii++) {
                    arrayString[ii] = "";
                }
            }
            // Substitui o ultimo indice pelo valor que o token corresponde
            arrayString[index] = replace;
        };

        // Percorre o array da string a ser desofuscada
        for (let i = 0; i < arrayString.length; i++) {
            // A cada iteração, soma o caracter atual com a variavel token
            token += char = arrayString[i];

            // Se o caracter for um espaço ou uma virgula, significa que é um novo token
            if(char === " " || char === ",") {
                token = "";
            } // Se o caracter for um ampersan, significa que os proximos caracteres podem representar um token Ampersan
            else if (char === "&") {
                token = "&";
            } // Se o caracter for ponto e virgula, ira validar se o token existe no objeto HtmlEntitiesAmp e tentará substituir
            else if (char === ";") {
                char = HtmlEntitiesAmp[token] ? HtmlEntitiesAmp[token] : '';
                replaceTokenAt(i, token, char);
                token = '';
            } // Se o token identificado até então representar um char, ira validar o se o token existe no objeto HtmlEntitiesChar e tentará substituir
            else if (token.toLowerCase() === "char(") {
                for(var ii = 1; ii < 5; ii++) {
                    let s = arrayString[i+ii];
                    token += s;
                    if(s === ")") break;
                }
                i += ii;
                char = HtmlEntitiesChar[token] ? HtmlEntitiesChar[token] : '';
                replaceTokenAt(i, token, char);
                token = '';
            } // Se o caracter for porcentagem, significa que os proximos caracteres podem representar um token Percent
            else if (char === "%") {
                token = `${char}${(arrayString[i+1]).toLowerCase()}${(arrayString[i+2]).toLowerCase()}`;
                char = HtmlEntitiesPer[token] ? HtmlEntitiesPer[token] : '';
                i += 2;
                replaceTokenAt(i, token, char);
                token = '';
            } // Se o token identificado até então um hexadecimal, ira validar o valor entre parenteses se existe no array HexaChar e tentará substituir
            else if (token.toLowerCase() === "cast(") {
                let closeParentesis = false;
                for(var ii = (i+1); ii < arrayString.length; ii++) {
                    let s = arrayString[ii];
                    token += s.toLowerCase();
                    if(s === ")") {
                        closeParentesis = true;
                        break;
                    }
                }
                // Caso não tenha fechado os parenteses do Cast, o sistema irá ignorar
                if(closeParentesis) { 
                    i = ii;
                    let arr = token.split("(");
                    arr = arr[1].split(" ");
                    char = "";
                    let str = arr[0] === "" ? arr[1] : arr[0];
                    for(let j = 0; j < str.length; j += 2) {
                        if(`${str[j]}${str[j+1]}` === "0X") continue;

                        s = `${str[j]}${str[j+1]}`;
                        char += HexaChar[s] ? HexaChar[s] : '';
                    }
                    replaceTokenAt(i, token, char);
                    token = '';
                }
            }
        }
        
        return arrayString.join("").trim();
    },
};

module.exports = Desofuscador;