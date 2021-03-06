'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nick: { type: String, unique: true },
    pass: { type: String, required: true },
    pfp: String,
    email: { type: String, unique: true, required: true },
    idCou: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', UserSchema);
