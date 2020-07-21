const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/user');

router.get('/', (req, res) => {
    User.findAll().then(users => {
        if (users.length > 0) {
            return res.json({
                data: users
            });
        } else {
            return res.status(404).json({
                error: [{
                    value: ' ',
                    msg: 'Nenhum usuário encontrado. '
                }]
            });
        }
    });
});

router.get('/:idusuario', [
    check('idusuario', 'id deve ser um número inteiro.')
        .trim()
        .escape()
        .isInt()
        .toInt()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        User.findByPk(req.params.idusuario).then(user => {
            if(user) {
                return res.json({
                    data: [user]
                });
            } else {
                return res.status(404).json({
                    error: [{
                        value: '',
                        msg: 'Usuário não encontrado.'
                    }]
                })
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.post('/', [
    check('nome_proprio', 'Nome é campo obrigatório.')
        .trim()
        .escape()
        .notEmpty()
],
    [
        check('senha', 'Senha é campo obrigatório')
            .trim()
            .escape()
            .notEmpty()
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        User.create({
            nome_proprio: req.body.nome_proprio,
            usuario: req.body.usuario,
            senha: req.body.senha
        }).then(user => {
            return res.json({
                data: [user]
            });
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.put('/:idusuario', [
    check('nome_proprio', 'Nome é campo obrigatório.')
        .trim()
        .escape()
        .notEmpty(),
    check('idusuario', 'id deve ser um número inteiro.')
        .trim()
        .escape()
        .isInt()
        .toInt()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        User.update({
            nome_proprio: req.body.nome_proprio,
            senha: req.body.senha
        }, {
            where:{
                idusuario: req.params.idusuario
                }
            }).then(rows => {
                if (rows[0] === 1) {
                    return res.json({
                        data: rows[0]
                    });
                } else if (rows[0] === 0) {
                    return res.status(404).json({
                        error: [{
                            value: ' ',
                            msg: 'Usuário não encontrado.'
                        }]
                    });
                }
            }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});

router.delete('/:idusuario', [
    check('idusuario', 'id deve ser um número inteiro.')
        .trim()
        .escape()
        .isInt()
        .toInt()
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        User.destroy({
            where:{
                idusuario: req.params.idusuario
            }
        }).then(rows => {
            if (rows === 1) {
                return res.json({
                    data: [{
                        rows: rows
                    }]
                });
            } else if (rows === 0) {
                return res.status(404).json({
                    error: [{
                        value: ' ',
                        msg: 'Usuário não encontrado.'
                    }]
                });
            } else  {
                console.log(error);
                return res.status(500).json({
                    error: [{
                        value: ' ',
                        msg: 'Usuário não encontrado.'
                    }]
                });
            }
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: [{
                    value: ' ',
                    msg: 'Falha ao comunicar com o SGBD.'
                }]
            });
        });
    } else {
        return res.status(422).json(errors);
    }
});


module.exports = router;