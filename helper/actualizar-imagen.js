const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");

const fs = require("fs");

const updateImage = async(type, id, archiveName) => {

    let seekType={};

    // Busqueda por tipo
    switch (type) {
        case 'usuarios':
            seekType = await Usuario.findById(id);
            break;

        case 'medicos':
            seekType = await Medico.findById(id);
            break;

        case 'hospitales':
            seekType = await Hospital.findById(id);
            break;

        default:
            seekType = '';
            break;
    }

    if (!seekType) {
        return false;
    }

    // Path de la imagen guardada
    const oldPath = `./uploads/${ type }/${ seekType.img }`;

    // Si hay imagen la borro
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }

    seekType.img = archiveName;
    await seekType.save();

    return true;
}

module.exports = updateImage;

