const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medicos");
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWS = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWS, getMedicos);

router.post(
  "/",
  validarJWS,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validarCampos,
  ],
  createMedico
);

router.put(
  "/:id",
  validarJWS,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validarCampos,
  ],
  updateMedico
);

router.delete("/:id", validarJWS, deleteMedico);

module.exports = router;
