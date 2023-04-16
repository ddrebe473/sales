"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: 'string',
    user: 'string'
});
module.exports = mongoose.model('user', userSchema);
