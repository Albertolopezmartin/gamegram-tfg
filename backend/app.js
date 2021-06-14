'use strict'

// Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');
const { restart } = require('nodemon');


// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// CORS

// Añadir prefijos a rutas
app.get('/probando', (req, res) => {
    return res.status(200).send({
        
    });
});
// Exportar modulo

module.exports = app;