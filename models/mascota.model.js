const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  especie: {
    type: String,
    default: 'Desconocida',
    trim: true
  },
  raza: {
    type: String,
    trim: true
  },
  edad: {
    type: Number,
    min: 0
  },
  peso: {
    type: Number,
    min: 0
  },
  genero: {
    type: String,
    enum: ['Macho', 'Hembra', 'Otro']
  },
  vacunado: {
    type: Boolean,
    default: false
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
