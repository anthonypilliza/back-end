const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verificarToken = require('../middleware/auth.middleware');

router.use(verificarToken);

router.get('/me', usuarioController.obtenerDatosUsuario);
router.delete('/eliminar', usuarioController.eliminarCuenta);
router.put('/cambiar-clave', usuarioController.cambiarClave);

module.exports = router;
