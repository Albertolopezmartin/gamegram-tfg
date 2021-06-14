'use strict'

var mongoose = require('mongoose');
var app = require('./app');


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_tfg', { useUnifiedTopology : true,  useNewUrlParser : true })
    .then(() => {
        console.log('Conexión a la base de datos correcta');
    });