const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');  // npm install validator
require('dotenv').config();

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, clave, edad, genero, rol } = req.body;

    // Validaciones básicas
    if (!nombre || !correo || !clave || !edad || !genero) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    if (!validator.isEmail(correo)) {
      return res.status(400).json({ mensaje: 'Correo no es válido.' });
    }

    if (clave.length < 6 || clave.length > 12 || !/\d/.test(clave) || !/[a-zA-Z]/.test(clave)) {
      return res.status(400).json({ mensaje: 'La clave debe tener entre 6 y 12 caracteres, con letras y números.' });
    }

    if (typeof edad !== 'number' || edad < 1 || edad > 120) {
      return res.status(400).json({ mensaje: 'Edad inválida.' });
    }

    if (!['Masculino', 'Femenino', 'Otro'].includes(genero)) {
      return res.status(400).json({ mensaje: 'Género inválido.' });
    }

    // Verificar si ya existe el correo
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    // Hash de la clave
    const claveHash = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      clave: claveHash,
      edad,
      genero,
      rol: rol === 'operador' ? 'operador' : 'invitado'  // Mantener lógica de rol
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
