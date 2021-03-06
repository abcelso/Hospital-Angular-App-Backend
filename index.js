
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

// ruta public
app.use( express.static('public') );

// Rutas
app.use('/api/usuarios', require('./routers/usuarios'));
app.use('/api/login', require('./routers/auth'));
app.use('/api/hospitales', require('./routers/hospitales'));
app.use('/api/medicos', require('./routers/medicos'));
app.use('/api/medico', require('./routers/medico'));
app.use('/api/todo', require('./routers/busquedas'));
app.use('/api/upload', require('./routers/uploads'));


app.listen(port, () => console.log('Escuchando el puerto', port));


// user: alrobotic
// password: M6eFFEu2iDA8BBJF
