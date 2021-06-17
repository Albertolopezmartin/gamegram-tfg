const config = require('../config.json');
const jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = {
    authenticate,
};

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && password) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}