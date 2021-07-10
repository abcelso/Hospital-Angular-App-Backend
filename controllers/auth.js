
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");
const generarJWT = require('../helper/jwt');
const verify = require('../helper/verify');

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

const googleSignin = async (req, res=response) => {

    const googleToken = await req.body.token;


    try {
        const {name, email, picture } = await verify(googleToken);
        const userDB = await Usuario.findOne({email});
        console.log(userDB);

        let user;

        if (userDB === null){
           user = new Usuario(
                {
                    name,
                    email,
                    img: picture,
                    password: "@@@",
                    google: true
                }
            );
        }else{
            user = userDB;
            user.img = picture;
            user.google = true;
        }

        // Token - JWT
        const token = await generarJWT(user.id);

        // Guardar datos en DB
        await user.save();

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'El token es incorrecto'
        })
    }
}

module.exports = {
    login,
    googleSignin
}
