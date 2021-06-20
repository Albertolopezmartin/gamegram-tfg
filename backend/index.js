'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

var MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017/api_rest_tfg";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { useUnifiedTopology : true,  useNewUrlParser : true, useCreateIndex: true })
    .then(() => {
        console.log('Conexión a la base de datos correcta');

        // Crear servidor y escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:'+ port);
        });
    });