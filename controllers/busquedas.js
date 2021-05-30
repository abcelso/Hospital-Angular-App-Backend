const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;

  const busqRegEx = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: busqRegEx }),
    Medico.find({ nombre: busqRegEx }),
    Hospital.find({ nombre: busqRegEx }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getColeccion = async (req, res = response) => {
  const tipo = req.params.tipo;

  const busqueda = req.params.busqueda;

  const busqRegEx = new RegExp(busqueda, "i");

  let data = [];

  switch (tipo) {
    case "usuarios":
      data = await Usuario.find({ nombre: busqRegEx });
      break;

    case "medicos":
      data = await Medico.find({ nombre: busqRegEx })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: busqRegEx }).populate(
        "usuario",
        "nombre img"
      );
      break;

    default:
      res.json({
        ok: false,
        msg: "El tipo de colección debe ser usuarios/medicos/hospitales",
      });
      break;
  }

  res.json({
    ok: true,
    data,
  });
};

module.exports = {
  getTodo,
  getColeccion,
};
