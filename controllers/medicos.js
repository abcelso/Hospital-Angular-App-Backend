
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {


    try {
        const medicos = await Medico.find({}, 'nombre usuario hospital')
                                    .populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre');

        if (medicos.length === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningún médico en la BD'
            });
        }

        res.json({
            ok: true,
            medicos
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const createMedico = async(req = request, res = response) => {

    // Obtenemos el uid del usuario desde el token
    const token = req.header('x-token');

    const uid = jwt.decode(token, process.env.JWT_SECRET).uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            msg: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }

}

const updateMedico = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateMedico'
    });

}

const deleteMedico = async(req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteMedico'
    });

}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}



