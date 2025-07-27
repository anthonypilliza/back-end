const Mascota = require('../models/mascota.model');

exports.crearMascota = async (req, res) => {
  try {
    const { nombre, especie } = req.body;
    const usuarioId = req.usuario.id;

    if (!nombre) return res.status(400).json({ mensaje: 'El nombre de la mascota es obligatorio.' });

    const nuevaMascota = new Mascota({ nombre, especie, usuarioId });
    await nuevaMascota.save();

    res.status(201).json({ mensaje: 'Mascota registrada.', mascota: nuevaMascota });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.listarMascotasUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const mascotas = await Mascota.find({ usuarioId });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.eliminarMascota = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;

    const mascota = await Mascota.findOne({ _id: id, usuarioId });
    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada.' });

    await mascota.deleteOne();
    res.json({ mensaje: 'Mascota eliminada.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
exports.actualizarMascota = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;
    const { nombre, especie, edad, peso } = req.body;

    const mascota = await Mascota.findOne({ _id: id, usuarioId });
    if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada.' });

    // Actualizar campos permitidos si están presentes
    if (nombre !== undefined) mascota.nombre = nombre;
    if (especie !== undefined) mascota.especie = especie;
    if (edad !== undefined) mascota.edad = edad;
    if (peso !== undefined) mascota.peso = peso;

    await mascota.save();
    res.json({ mensaje: 'Mascota actualizada.', mascota });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};