require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const mongoString = process.env.DATABASE_URL;

// Conexión a MongoDB
mongoose.connect(mongoString);
const database = mongoose.connection;

// Error de conexión
database.on('error', (error) => {
  console.log(error);
});

// Conexión exitosa 
database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();
app.use(express.json());
app.use('/api', routes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(3000, () => {
  console.log(`Server Started at 3000`);
});

// Puerto
const PORT = 3000;

// Ejecutar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});