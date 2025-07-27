const Usuario = require('../models/usuario.model');
const Mascota = require('../models/mascota.model');
const Horario = require('../models/horario.model');
const Registro = require('../models/registro.model');
const bcrypt = require('bcryptjs');

exports.obtenerDatosUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-clave');
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.eliminarCuenta = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    // Eliminar registros relacionados
    await Mascota.deleteMany({ usuarioId });
    await Horario.deleteMany({ usuarioId });
    await Registro.deleteMany({ usuarioId });
    await Usuario.findByIdAndDelete(usuarioId);

    res.json({ mensaje: 'Cuenta y todos sus datos eliminados.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.cambiarClave = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { claveActual, nuevaClave } = req.body;

    if (!claveActual || !nuevaClave) {
      return res.status(400).json({ mensaje: 'Debe ingresar la clave actual y la nueva.' });
    }

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });

    const esClaveValida = await bcrypt.compare(claveActual, usuario.clave);
    if (!esClaveValida) return res.status(400).json({ mensaje: 'Clave actual incorrecta.' });

    if (nuevaClave.length < 6 || !/\d/.test(nuevaClave) || !/[a-zA-Z]/.test(nuevaClave)) {
      return res.status(400).json({ mensaje: 'La nueva clave debe tener mínimo 6 caracteres, letras y números.' });
    }

    usuario.clave = await bcrypt.hash(nuevaClave, 10);
    await usuario.save();

    res.json({ mensaje: 'Clave actualizada correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
