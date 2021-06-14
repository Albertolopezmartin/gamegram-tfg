'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CompanySchema = Schema({
    name: String,
});

module.exports = mongoose.model('Company', CompanySchema);