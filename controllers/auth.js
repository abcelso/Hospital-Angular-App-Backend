
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");
const generarJWT = require('../helper/jwt');

const login = async (req, res = response) => {

    try {

        const {email, password} = req.body;

        //Validar email
        const userDB = await Usuario.findOne({ email });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'email o password incorrecto!'
            });
        }

        // Validar password
        const pass = bcrypt.compareSync( password, userDB.password);

        if (!pass) {
            return res.status(400).json({
                ok: false,
                msg: 'email o password incorrecto!'
            });
        }

        // Token - JWT
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

module.exports = login;
