const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('server/models/user.js');

require('dotenv').config();

router.port('/', [
        check('usuario', 'Informe seu usuário')
            .trim()
            .escape()
            .notEmpty(),
        check('senha', 'Informe sua senha')
            .trim()
            .escape()
            .notEmpty(),
    ], (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            User.findOne({
                where: {
                    email: req.body.username
                }
            }).then(user => {
                bcrypt.compare(req.body.senha, user.senha)
                    .then(result => {
                    if (result) {
                        const token = jwt.sign({
                            name: user.nome_proprio,
                            email: user.usuario,
                        }, process.env.SECRET);
                    } else {
                        return res.status(404).json({
                            error: [{
                                value: '',
                                msg: 'Usuário e senha incorretos',
                            }]
                        })
                    }
                })
            }).catch(error => {
                return res.status(500).json({
                    error: [{
                        value: '',
                        msg: 'Falha ao comunicar com o SGBD'
                    }]
                })
            })
        } else {
            return res.status(422).json(errors);
        }
    }
)

module.exports = router;