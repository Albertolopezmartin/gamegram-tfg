'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var GameSchema = Schema({
    name: String,
    description: String,
    idCom: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
});

module.exports = mongoose.model('Game', GameSchema);