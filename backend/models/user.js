'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = Schema({
    nick: String,
    pass: String,
    pfp: String,
    email: String,
    idCou: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
});

module.exports = mongoose.model('User', UserSchema);
/*
Post.findOne({_id: 123})
.populate('postedBy')
.exec(function(err, post) {
    // do stuff with post
});*/