const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
  getMedicoById,
} = require("../controllers/medicos");
const { validarCampos } = require("../middlewares/validar-campos");

const validarJWS = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWS);

router.get("/", getMedicos);

// router.get("/:id", getMedicoById);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validarCampos,
  ],
  createMedico
);

router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validarCampos,
  ],
  updateMedico
);

router.delete("/:id", deleteMedico);

module.exports = router;
