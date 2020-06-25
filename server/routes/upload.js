const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const readline = require('readline');
const {once} = require('events');
const Desofuscador = require('../desofuscador');

//verifica o formato de arquivo enviado
const upload = multer({
    dest: 'upload_files/',
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(txt|log)$/)) {
            return cb(new Error('Formato de arquivo inválido.'));
        }
        cb(null, true);
    }
}).single('arquivo');

//se houver um erro o status é 442, senao o arquivo é processado e é feito o download
// de um arquivo com o mesmo nome do enviado
router.post('/', (req, res) => {
    upload(req, res, async (err) =>{
        let result = {
            status: "",
            filePath: "",
            message: "",
            txt: ""
        }

        let txt = req.body.desofusca_texto ? req.body.desofusca_texto : '';
        if(txt !== "") {
            result.status = 200;
            result.message = "Desofuscamento concluido com sucesso!";
            result.txt = Desofuscador.decode(txt);
        } else {
            result.status = 442;
            result.message = "Nada informado";
        }

        if (err) {
            console.log(err);
            result.status = 422;
            result.message = "Formato invalido";
        } else {
            let file = req.file ? req.file : false;
            if(file) {
                const path = await processFile(file);
                if (path) {
                    result.status = 200;
                    result.filePath = path;
                    result.message = "Desofuscamento concluido com sucesso!";
                } else {
                    result.status = 500;
                    result.message = "Ocorreu um erro ao encontrar o arquivo!";
                }
            }
        }
        console.log(result);
        res.status(result.status).send(JSON.stringify(result));
    });
});

//funcao processa o arquivo, lendo linha a linha,
// chamando a função do desofuscador e escrevendo o arquivo de saída
async function processFile(file) {
    const outpath = `${process.env.OUTDIR}/${file.filename}`;
    const writeStream = fs.createWriteStream(outpath, {
        flags: 'a'
    });
    writeStream.on('error', (err) => {
        consol.log(err);
        throw err;
    })

    const readInterface = readline.createInterface({
        input: fs.createReadStream(file.path)
    })
    readInterface.on('line', (line) =>{
        writeStream.write(`${Desofuscador.decode(line)}\n`);
    })
    readInterface.on('close', () => {
        writeStream.end();
    });

    await once(writeStream, 'finish');

    return outpath;
}

module.exports = router;