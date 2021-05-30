
const { response, request } = require('express');
const Hospital = require('../models/hospital');
const jwt = require('jsonwebtoken');


const getHospital = async(req, res = response) => {

    try {

        const hospitales = await Hospital.find({}, 'nombre usuario img')
                                            .populate('usuario', 'nombre');

        if (hospitales.length === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningun hospital en la BD'
            });
        }

        res.json({
            ok: true,
            hospitales
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });
    }
};

const createHospital = async(req = request, res = response) => {

    // Obtener el uid del usuario desde el token
    const token = req.header('x-token');

    const uid = jwt.decode(token, process.env.JWT_SECRET).uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error desconocido'
        });
    }


};

const updateHospital = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateHospital'
    })

};

const deleteHospital = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteHospital'
    });

};

module.exports = {
    getHospital,
    createHospital,
    updateHospital,
    deleteHospital
};

