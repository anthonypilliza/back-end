const express = require('express');
const router = express.Router();
const operadorController = require('../controllers/operador.controller');
const verificarToken = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/rol.middleware');

router.use(verificarToken);
router.use(verificarRol('operador'));  // Solo operadores pueden acceder

router.get('/reporte-texto', operadorController.obtenerReporteTexto);
router.get('/consulta1', operadorController.consulta1);
router.get('/consulta2', operadorController.consulta2);
router.get('/consulta3', operadorController.consulta3);

module.exports = router;
