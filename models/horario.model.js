const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
  hora: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  minuto: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Horario', HorarioSchema);
