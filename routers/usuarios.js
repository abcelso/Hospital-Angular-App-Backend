const { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } = require("../controllers/usuarios");
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearUsuario
);

router.put('/:uid',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateUsuario
);

router.delete('/:uid', deleteUsuario);



module.exports = router;