
const express = require('express');
const { connectionDB } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT;

const app = express();

// Configuración CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Conexion a la DB
connectionDB();


// Rutas
app.use('/api/usuarios', require('./routers/usuarios'));



app.listen(port, () => console.log('Escuchando el puerto', port));


// user: alrobotic
// password: M6eFFEu2iDA8BBJF
