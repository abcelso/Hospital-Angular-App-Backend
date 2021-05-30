
const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const fileUpload = require('../controllers/uploads');
const validarJWS = require('../middlewares/validar-jwt');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWS, fileUpload);


module.exports = router;


