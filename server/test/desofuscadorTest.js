const Desofuscador = require("../desofuscador");

const AmpersanTest = () => {
    let origem = "&lt;&nbsp;&gt;";
    let resultadoEsperado = "< >";

    let timeLabel = "AmpersanTest";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
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
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
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
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
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
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
};

const convertCast = () => {
    let origem = "   Este e o CaSt(  0X746578746f206f726967696e616c as CHAR ) que foi decodificado";
    let resultadoEsperado = "Este e o texto original que foi decodificado";

    let timeLabel = "convertCast";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
};

const convertCast2 = () => {
    let origem = "Este /**/ e o CaSt(  0X746578746f206f726967696e616c as CHAR ) que /**/foi decodificado";
    let resultadoEsperado = "Este e o texto original que foi decodificado";

    let timeLabel = "convertCast2";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
}

const convertCast3 = () => {
    let origem = "Este +e+o+CaSt(  0X746578746f206f726967696e616c as CHAR ) que foi+decodificado";
    let resultadoEsperado = "Este e o texto original que foi decodificado";

    let timeLabel = "convertCast3";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
}

const convertCast4 = () => {
    let origem = "Este+e+o/**/ CaSt(  0X746578746f206f726967696e616c as CHAR )+que+foi /**/decodificado";
    let resultadoEsperado = "Este e o texto original que foi decodificado";

    let timeLabel = "convertCast4";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
}

const convertCast5 = () => {
    let origem = "2018-05-30 18:08:45 177.191.150.231 get /fornecedores/licitacoes/licita/licita_c.asp gisup=po999999.9'+/**/union/**/all+/**/select+/**/cast(0x393133353134353632312e39+as+char),/**/cast(0x393133353134353632322e39+as+char),/**/cast(0x393133353134353632332e39+as+char),/**/cast(0x393133353134353632342e39+as+char),/**/cast(0x393133353134353632352e39+as+char),/**/cast(0x393133353134353632362e39+as+char),/**/cast(0x393133353134353632372e39+as+char),/**/cast(0x393133353134353632382e39+as+char),/**/cast(0x393133353134353632392e39+as+char)+and+'0'='0+|499|80040e14|[microsoft][odbc_sql_server_driver][sql_server]incorrect_syntax_near_the_keyword_'and'. 500 0 78 www5.caixa.gov.br mozilla/5.0+(windows;+u;+windows+nt+5.1;+pt-pt;+rv:1.9.1.2)+gecko/20090729+firefox/3.5.2+(.net+clr+3.5.30729)";
    let resultadoEsperado = "2018-05-30 18:08:45 177.191.150.231 get /fornecedores/licitacoes/licita/licita_c.asp gisup=po999999.9' union all select 9135145621.9, 9135145622.9, 9135145623.9, 9135145624.9, 9135145625.9, 9135145626.9, 9135145627.9, 9135145628.9, 9135145629.9 and '0'='0 |499|80040e14|[microsoft][odbc_sql_server_driver][sql_server]incorrect_syntax_near_the_keyword_'and'. 500 0 78 www5.caixa.gov.br mozilla/5.0 windows nt rv:1.9.1.2) gecko/20090729 firefox/3.5.2 (.net clr 3.5.30729)";
    
    let timeLabel = "convertCast5";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log((resultadoEsperado === result ? "\x1b[32m" : "\x1b[31m"), `\nResultado esperado: ${resultadoEsperado}\n\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return (resultadoEsperado === result);
}
const convertCast6 = () => {
    let origem = "Materializa%20Produ%E7%C3%A3o%20e%20Qualidade%20(dia)";
    
    let timeLabel = "convertCast6";
    console.time(timeLabel);
    let result = Desofuscador.decode(origem);
    console.timeEnd(timeLabel);
    console.log("\x1b[32m", `\nResultado Obtido: ${result}`);
    console.log('\x1b[0m', '');
    console.log("______________________________\n");

    return true;
}

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
    convertCast2() ? totalAcertos++ : totalErros++;
    convertCast3() ? totalAcertos++ : totalErros++;
    convertCast4() ? totalAcertos++ : totalErros++;
    convertCast5() ? totalAcertos++ : totalErros++;
    convertCast6() ? totalAcertos++ : totalErros++;
    console.log('\x1b[34m', `Testes executados: ${totalErros + totalAcertos}`);
    console.log('\x1b[32m', `Acertos: ${totalAcertos}`);
    console.log('\x1b[31m', `Erros: ${totalErros}`);
    console.log('\x1b[0m', '');
    console.timeEnd(timeLabel);
}
test();