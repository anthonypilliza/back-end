const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registrarUsuario = async (req, res) => {
  try {
    const { correo, clave, rol } = req.body;

    if (!correo || !clave) {
      return res.status(400).json({ mensaje: 'Correo y clave son obligatorios.' });
    }

    if (clave.length < 6 || !/\d/.test(clave) || !/[a-zA-Z]/.test(clave)) {
      return res.status(400).json({ mensaje: 'La clave debe tener mínimo 6 caracteres, letras y números.' });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    const claveHash = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new Usuario({
      correo,
      clave: claveHash,
      rol: rol === 'operador' ? 'operador' : 'invitado'
      //rol: 'invitado'
    });

    await nuevoUsuario.save();

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (!correo || !clave) {
      return res.status(400).json({ mensaje: 'Correo y clave son obligatorios.' });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esClaveValida = await bcrypt.compare(clave, usuario.clave);
    if (!esClaveValida) {
      return res.status(400).json({ mensaje: 'Clave incorrecta.' });
    }

    const payload = { id: usuario._id, correo: usuario.correo, rol: usuario.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ mensaje: 'Login exitoso.', token, usuario: payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
