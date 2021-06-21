'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamreSchema = Schema({
    idGam: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    idGen: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
});

module.exports = mongoose.model('Gamre', GamreSchema);