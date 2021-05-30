const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const updateImage = require('../helper/actualizar-imagen');


const fileUpload = (req, res = response) => {
    const VALID_TYPE = ['usuarios', 'medicos', 'hospitales'];

    const type = req.params.tipo;
    const id = req.params.id;

    // Valida tipo
    if (!VALID_TYPE.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo debe ser usuarios, medicos u hospitales',
        });
    }

    // Verifica si existe la imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo',
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nameSplit = file.name.split('.');
    const extensionArchive = nameSplit[nameSplit.length - 1];

    // Validar extension
    const EXTENSION_FILE = ['jpg', 'gif', 'jpeg', 'png'];
    if (!EXTENSION_FILE.includes(extensionArchive)) {
        return res.status(400).json({
            ok: false,
            msg: `Extension not valid, only ${EXTENSION_FILE}`,
        });
    }

    // Generar el nombre de la imagen
    const archiveName = `${uuidv4()}.${extensionArchive}`;


    // Path para guardar la imagen
    const path = `${__dirname}/../uploads/${ type }/${ archiveName }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: err
            });
        }
        
        // Actualizar imagen en la base de datos
        updateImage(type, id, archiveName);

        res.json({
            ok: true,
            msg: 'file Uploaded',
            archiveName,
        });
    });

};

module.exports = fileUpload;
