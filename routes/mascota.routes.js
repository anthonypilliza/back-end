const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');
const verificarToken = require('../middleware/auth.middleware');

router.use(verificarToken);

router.post('/', mascotaController.crearMascota);
router.get('/', mascotaController.listarMascotasUsuario);
router.delete('/:id', mascotaController.eliminarMascota);
router.put('/:id', verificarToken, mascotaController.actualizarMascota);

module.exports = router;
