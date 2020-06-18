const Desofuscador = require("../desofuscador");

const AmpersanTest = () => {
    let origem = "&lt;&nbsp;&gt;";
    let resultadoEsperado = "< >";

    let timeLabel = "AmpersanTest";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");
    
    return (resultadoEsperado === result);
};

const PercentTest = () => {
    let origem = "%41%6c%6f%5b%5d";
    let resultadoEsperado = "Alo[]";

    let timeLabel = "PercentTest";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
};

const charTest = () => {
    let origem = "char(65)char(108)char(111)";
    let resultadoEsperado = "Alo";

    let timeLabel = "charTest";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");
    
    return (resultadoEsperado === result);
};

const misturadoTest = () => {
    let origem = "alfa beta &lt;char(65)char(108)char(111)&gt; celta %5btexto%5d delta";
    let resultadoEsperado = "alfa beta <Alo> celta [texto] delta";

    let timeLabel = "misturadoTest";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
};

const convertCast = () => {
    let origem = "Este e o CaSt(  0X746578746f206f726967696e616c as CHAR ) que foi decodificado";
    let resultadoEsperado = "Este e o texto original que foi decodificado";

    let timeLabel = "convertCast";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
};

const test = () => {
    let totalErros = 0;
    let totalAcertos = 0;
    let timeLabel = "Tempo de execução";
    
    console.log("\n\nIniciando testes\n==============================\n");
    console.time(timeLabel);
    AmpersanTest() ? totalAcertos++ : totalErros++;
    PercentTest() ? totalAcertos++ : totalErros++;
    charTest() ? totalAcertos++ : totalErros++;
    misturadoTest() ? totalAcertos++ : totalErros++;
    convertCast() ? totalAcertos++ : totalErros++;
    console.log('\x1b[34m', `Testes executados: ${totalErros + totalAcertos}`);
    console.log('\x1b[32m', `Acertos: ${totalAcertos}`);
    console.log('\x1b[31m', `Erros: ${totalErros}`);
    console.log('\x1b[0m', '');
    console.timeEnd(timeLabel);
}
test();