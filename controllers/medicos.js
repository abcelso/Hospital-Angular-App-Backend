
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {


    try {
        const medicos = await Medico.find({}, 'nombre usuario hospital img')
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

const getMedicoById = async(req, res = response) => {

    const medicoId = req.params.text;

    try {
        const medico = await Medico.findById(medicoId)
                                    .populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre');

        if (medico.length === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningún médico en la BD'
            });
        }

        res.json({
            ok: true,
            medico
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
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }

}

const updateMedico = async(req, res = response) => {

    const id = req.params.id;

    // Obtenemos el uid del usuario desde el token
    const token = req.header('x-token');
    const uid = jwt.decode(token, process.env.JWT_SECRET).uid;

    try {

        const medicoDB = await Medico.findById(id);

        if (!medicoDB){
            return res.status(401).json({
                ok: false,
                msg: 'El médico con ese id no existe'
            });
        }

        const medicoChange = {
            ...req.body,
            usuario: uid
        }

        const medicoUpdated = await Medico.findByIdAndUpdate(id, medicoChange, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            medico: medicoUpdated
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const deleteMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);

        if (!medicoDB){
            return res.status(401).json({
                ok: false,
                msg: 'El medico con ese id no existe'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico deleted'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    getMedicos,
    getMedicoById,
    createMedico,
    updateMedico,
    deleteMedico
}



