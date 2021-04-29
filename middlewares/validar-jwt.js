
const { response } = require('express');
const jws = require('jsonwebtoken');


const validarJWS = (req, res = response, next) => {

    try {

        const header = req.header('x-token');

        const token = jws.verify(header, process.env.JWT_SECRET);

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'El token no existe'
            })
        };

        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'El token no es válido'
        })
    }
}


module.exports = validarJWS;