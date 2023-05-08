const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: 'string',
    password:'string',
    token:'string',
});

module.exports = mongoose.model('user', userSchema);