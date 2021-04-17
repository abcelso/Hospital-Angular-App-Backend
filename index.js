
const express = require('express');
const { connectionDB } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT;

const app = express();

// Configuración CORS
app.use( cors() );

connectionDB();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Hola Mundo"
    });
})

app.listen(port, () => console.log('Escuchando el puerto', port));


// user: alrobotic
// password: M6eFFEu2iDA8BBJF
