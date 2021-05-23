
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWS = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWS, getHospital);

router.post('/',
    [
        validarJWS,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createHospital
);

router.put('/:id',
    [
        validarJWS,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateHospital
);

router.delete('/:id', validarJWS, deleteHospital);


module.exports = router;