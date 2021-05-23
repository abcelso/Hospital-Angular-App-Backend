

const Router = require('express');
const getTodo = require('../controllers/busquedas');
const validarJWS = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWS, getTodo);

module.exports = router;