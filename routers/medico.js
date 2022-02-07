const {Router} = require('express');
const { getMedicoById } = require('../controllers/medicos');
const validarJWS = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWS);

router.get('/:text', getMedicoById);

module.exports = router;