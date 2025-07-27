const Horario = require('../models/horario.model');

// Obtener todos los horarios (para ESP32 y pruebas)
exports.obtenerHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los horarios.' });
  }
};

// Crear un nuevo horario
exports.crearHorario = async (req, res) => {
  try {
    const { hora, minuto } = req.body;

    if (hora === undefined || minuto === undefined) {
      return res.status(400).json({ mensaje: 'Hora y minuto son obligatorios.' });
    }

    const totalHorarios = await Horario.countDocuments();
    if (totalHorarios >= 3) {
      return res.status(400).json({ mensaje: 'Máximo de 3 horarios permitidos.' });
    }

    const nuevoHorario = new Horario({ hora, minuto });
    await nuevoHorario.save();

    res.status(201).json({ mensaje: 'Horario creado.', horario: nuevoHorario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el horario.' });
  }
};

// Eliminar un horario por ID
exports.eliminarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const horario = await Horario.findById(id);
    if (!horario) return res.status(404).json({ mensaje: 'Horario no encontrado.' });

    await horario.deleteOne();
    res.json({ mensaje: 'Horario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el horario.' });
  }
};

// Actualizar horario por ID
exports.actualizarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { hora, minuto } = req.body;

    const horario = await Horario.findById(id);
    if (!horario) return res.status(404).json({ mensaje: 'Horario no encontrado.' });

    horario.hora = hora !== undefined ? hora : horario.hora;
    horario.minuto = minuto !== undefined ? minuto : horario.minuto;

    await horario.save();
    res.json({ mensaje: 'Horario actualizado.', horario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el horario.' });
  }
};
