const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller');
const verificarToken = require('../middleware/auth.middleware');

router.post('/', registroController.crearRegistro);
router.get('/', verificarToken, registroController.listarRegistrosUsuario);
router.delete('/:id', verificarToken, registroController.eliminarRegistro);

module.exports = router;
