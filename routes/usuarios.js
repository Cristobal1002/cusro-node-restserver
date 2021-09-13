
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');
const { validarRol, validarEmail, validarUsuarioPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsuarios); //Se usa de esta manera xq no estoy ejecutando la funcion sino haciendo referencia a la misma

router.put('/:id', [

  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(validarUsuarioPorId),
  check('rol').custom(validarRol),
  validarCampos

], putUsuarios);

router.post('/', [

  check('nombre', 'El nombre no puede estar vacio').notEmpty(),
  check('password', 'El password debe tener mínimo 6 caracteres').notEmpty().isLength({ min: 6 }),
  check('correo', 'El correo no puede estar vacio').notEmpty(),
  check('correo').custom(validarEmail),
  //check('rol','Ingrese un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(validarRol),
  validarCampos

], postUsuarios);

router.delete('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(validarUsuarioPorId),
  validarCampos
], deleteUsuarios);


module.exports = router;