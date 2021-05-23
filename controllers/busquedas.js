
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    const busqRegEx = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: busqRegEx }),
        Medico.find({ nombre: busqRegEx }),
        Hospital.find({ nombre: busqRegEx })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

module.exports = getTodo;