const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

router.post('/', [
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
                    usuario: req.body.usuario
                }
            }).then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: [{
                            value: '',
                            msg: 'Usuário não encontrado!',
                        }]
                    }) 
                }
                bcrypt.compare(req.body.senha, user.senha)
                    .then(result => {
                    if (result) {
                        const token = jwt.sign({
                            nome_proprio: user.nome_proprio,
                            usuario: user.usuario,
                        }, process.env.SECRET);

                        return res.json({token: token})
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
                console.log(error)
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