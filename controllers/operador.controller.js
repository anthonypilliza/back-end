const Registro = require('../models/registro.model');

// Reporte texto con todos los registros (puede filtrarse por usuario, fecha, etc)
exports.obtenerReporteTexto = async (req, res) => {
  try {
    // Opcional: filtrar por rango de fechas o usuarioId si deseas
    const registros = await Registro.find().sort({ createdAt: -1 });
    res.json(registros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error obteniendo reporte.' });
  }
};

// Estadística 1: conteo de registros por usuario
exports.consulta1 = async (req, res) => {
  try {
    const conteo = await Registro.aggregate([
      { $group: { _id: "$usuarioId", total: { $sum: 1 } } }
    ]);
    res.json(conteo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en consulta 1.' });
  }
};

// Estadística 2: promedio de distancia medida (puede ser general o por usuario)
exports.consulta2 = async (req, res) => {
  try {
    const promedio = await Registro.aggregate([
      { $group: { _id: null, promedioDistancia: { $avg: "$distancia" } } }
    ]);
    res.json(promedio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en consulta 2.' });
  }
};

// Estadística 3: conteo de estados del servo abierto vs cerrado
exports.consulta3 = async (req, res) => {
  try {
    const conteoServo = await Registro.aggregate([
      { $group: { _id: "$servoEstado", total: { $sum: 1 } } }
    ]);
    res.json(conteoServo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en consulta 3.' });
  }
};
