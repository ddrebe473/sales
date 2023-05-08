"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const JWT = require('../jwt');
const User = require('../models/users');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield User.find({});
    return res.status(200).json(userList);
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //recieve the credentials from the API request
    let username = req.body.userKey;
    let password = req.body.passKey;
    //search mongo for user
    const user = yield User.findOne({ name: username });
    console.log(user);
    // if user is not found reject the login
    if (!user) {
        return res.status(404).send({ msg: 'user not found' });
    }
    // check the password
    if (password != user.password) {
        return res.status(401).send({ msg: 'password not recognize' });
    }
    //= make new token and set expiration date
    let id = (user.token = JWT.GenerateToken(username));
    // save the user with new token
    yield user.save();
    //remove password from return object
    user.password = undefined;
    delete user.password;
    //return the user with new token
    return res.status(200).json(user);
});
const validateUserToken = (req, res) => {
    const token = req.query.token;
    console.log('backend Token:', token);
    let isValid = JWT.ValidateToken(token);
    console.log('isValid:', isValid);
    return res.status(200).json({ isValid: isValid });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    //find user
    const user = yield User.findOne({ name: username });
    if (user) {
        return res.status(401).json({ err: "user already exists" });
    }
    //send data to mongo
    const newUser = yield User.create({ name: username, password: password });
    return res.status(200).json({ success: true });
});
module.exports = {
    getUsers,
    loginUser,
    validateUserToken,
    registerUser
};
