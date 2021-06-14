'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Genre', GenreSchema);