const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horario.controller');

// No usamos verificarToken

router.get('/', horarioController.obtenerHorarios);         // GET todos
router.post('/', horarioController.crearHorario);           // POST uno nuevo
router.delete('/:id', horarioController.eliminarHorario);   // DELETE uno
router.put('/:id', horarioController.actualizarHorario);    // PUT uno

module.exports = router;
