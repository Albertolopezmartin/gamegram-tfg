'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = Schema({
    name: String,
});

module.exports = mongoose.model('Company', CompanySchema);