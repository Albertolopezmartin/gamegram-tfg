'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = Schema({
    name: String,
    description: String,
    idCom: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    idGen: {type: mongoose.Schema.Types.ObjectId, ref: 'Gen'},
});

module.exports = mongoose.model('Game', GameSchema);