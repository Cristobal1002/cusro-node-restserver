
const { Router } = require('express');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/',  getUsuarios); //Se usa de esta manera xq no estoy ejecutando la funcion sino haciendo referencia a la misma

  router.put('/:id',  putUsuarios);

  router.post('/',postUsuarios);

  router.delete('/', deleteUsuarios );


module.exports = router;