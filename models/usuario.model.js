const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  clave: {
    type: String,
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
