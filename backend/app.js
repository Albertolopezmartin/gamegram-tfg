'use strict'

// Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');
const { restart } = require('nodemon');


// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
var routes = require('./routes/routes');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// CORS

// Añadir prefijos a rutas / Cargar rutas

app.use('/api', routes);

// Exportar modulo

module.exports = app;