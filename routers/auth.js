
const { check } = require('express-validator');
const { Router } = require('express');
const { login, googleSignin, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWS = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignin
);

router.get('/renew',
    validarJWS,
    renewToken
);

module.exports = router;