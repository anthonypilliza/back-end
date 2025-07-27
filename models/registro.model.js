const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  mascotaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota'
  },
  distancia: {
    type: Number
  },
  servoEstado: {
    type: Boolean
  },
  mensaje: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registro', RegistroSchema);
