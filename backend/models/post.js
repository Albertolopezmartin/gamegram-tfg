'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
    name: String,
    postdate: { type: Date, default: Date.now },
    photo: String,
    comment: String,
    idGam: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    idUse: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Post', PostSchema);