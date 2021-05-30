const Router = require("express");
const {getTodo, getColeccion} = require("../controllers/busquedas");
const validarJWS = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:busqueda", validarJWS, getTodo);

router.get("/coleccion/:tipo/:busqueda", validarJWS, getColeccion);

module.exports = router;
