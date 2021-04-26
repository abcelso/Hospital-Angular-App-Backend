const { response } = require("express");

const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.json({
    ok: true,
    user: usuarios,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await Usuario.findOne({ email });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe...",
      });
    }

    // Creo usuario
    const user = new Usuario(req.body);

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    // Guardar el usuario creado
    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar el log",
    });
  }
};

const updateUsuario = async (req, res = response) => {
  const uid = req.params.uid;

  try {
    const userDB = await Usuario.findById(uid);

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario con ese id no existe",
      });
    } else {
    }

    const { password, google, email, ...body } = req.body;

    if (userDB.email !== email) {
      const existEmail = await Usuario.findOne({ email });

      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "El email ya existe en otro usuario",
        });
      }
    }

    body.email = email;

    // Actualizar por id
    const updUser = await Usuario.findByIdAndUpdate(uid, body, { new: true });

    res.json({
      ok: true,
      user: updUser,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  const uid = req.params.uid;

  try {
    const userDB = await Usuario.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario con ese id no existe",
      });
    }

    // Borrar usuario por id
    await Usuario.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  updateUsuario,
  deleteUsuario,
};
