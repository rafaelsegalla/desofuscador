const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const readline = require('readline');

const upload = multer({
    dest: 'upload_files/',
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(txt|log)$/)) {
            return cb(new Error('Formato de arquivo inválido.'));
        }
        cb(null, true);
    }
}).single('arquivo');

router.post('/', (req, res) => {
    upload(req, res, (err) =>{
        if (err) {
            console.log(err);
            res.status(422).send();
        } else {
            let file = req.file;
            processFile(file);
            res.send();
        }
    })
});

function processFile(file) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(file.path)
    })
    readInterface.on('line', (line) =>{
        console.log(line);
    })
}

module.exports = router;