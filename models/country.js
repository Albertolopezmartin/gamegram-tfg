'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = Schema({
    name: String
});

module.exports = mongoose.model('Country', CountrySchema);