"use strict";
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: 'string',
    password: 'string',
    token: 'string',
    expireDate: "date"
});
module.exports = mongoose.model('user', userSchema);
