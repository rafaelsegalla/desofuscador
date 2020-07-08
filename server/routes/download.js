const router = require('express').Router();
const fs = require('fs');

router.get('/', async(req, res) => {
    const filePath = req.query.filePath;
    const originalName = req.query.originalName ? req.query.originalName : 'generated.txt';

    fs.access(filePath, error => {
        if (!error) {
            res.download(filePath, originalName);
        } else {
            res.status(400).send('Arquivo não existe!');
        }
    });
});

module.exports = router;