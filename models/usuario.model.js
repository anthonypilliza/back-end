const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, // obligatorio para registro
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo inválido']  // validación básica formato email
  },
  clave: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    min: 1,
    max: 120,
    required: true
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: true
  },
  rol: {
    type: String,
    enum: ['invitado', 'operador'],
    default: 'invitado'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);