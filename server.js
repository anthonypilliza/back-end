require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const dotenv = require('dotenv');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/mascotas', require('./routes/mascota.routes'));
app.use('/api/horarios', require('./routes/horario.routes'));
app.use('/api/registros', require('./routes/registro.routes'));
app.use('/api/dashboard', require('./routes/operador.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
