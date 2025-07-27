const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  especie: {
    type: String,
    default: 'Desconocida'
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mascota', MascotaSchema);
