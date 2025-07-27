const Registro = require('../models/registro.model');

exports.crearRegistro = async (req, res) => {
  try {
    const { usuarioId, mascotaId, distancia, servoEstado, mensaje } = req.body;

    if (!usuarioId) return res.status(400).json({ mensaje: 'Falta el usuarioId.' });

    const nuevoRegistro = new Registro({
      usuarioId,
      mascotaId,
      distancia,
      servoEstado,
      mensaje
    });

    await nuevoRegistro.save();
    res.status(201).json({ mensaje: 'Registro guardado.', registro: nuevoRegistro });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.listarRegistrosUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const registros = await Registro.find({ usuarioId }).sort({ timestamp: -1 });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.eliminarRegistro = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;
    console.log('Eliminar registro llamado con id:', req.params.id);
    const registro = await Registro.findOne({ _id: id, usuarioId });
    if (!registro) return res.status(404).json({ mensaje: 'Registro no encontrado.' });

    await registro.deleteOne();
    res.json({ mensaje: 'Registro eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar registro.' });
  }
};
