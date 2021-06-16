'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nick: String,
    pass: String,
    pfp: String,
    email: String,
    idCou: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
});

module.exports = mongoose.model('User', UserSchema);
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});