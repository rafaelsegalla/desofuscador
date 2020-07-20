const express = require('express');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const taskRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');
const auth = require('./auth');

const app = express();

require('dotenv').config();

const port = process.env.PORTSERVER;

app.use(express.json());
app.use(cors());
app.use(`/user`, auth, taskRouter);
app.use(`/upload`, auth, uploadRouter);
app.use(`/download`, auth, downloadRouter);

//cria o diretorio OUTDIR se ele não existir
fs.access(process.env.OUTDIR, fs.constants.F_OK, (err) => {
    if(err){
        fs.mkdir(process.env.OUTDIR, (err) => {
            if(err) throw err;
            console.log(`${process.env.OUTDIR} criado com sucesso.`);
        });
    } else {
        fs.stat(process.env.OUTDIR, (err, stats) => {
            if (err) throw err;
            if(!stats.isDirectory()) {
                throw new Error (`${process.env.OUTDIR} existe e não é diretório.`);
            }
        });
    }
});

app.listen(port, () => console.log('app running on port ' + port));
