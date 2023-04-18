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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const User = require('../models/users');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield User.find({});
    return res.status(200).json(userList);
});
const createUsers = () => {
    console.log('test');
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //2. recieve the credentials from the API request
    let username = req.body.userKey;
    let password = req.body.passKey;
    console.log('username: ', username);
    console.log('passwrod: ', password);
    //3. search mongo for user
    const user = yield User.findOne({ name: username });
    console.log(user);
    //4. if user is not found reject the login
    if (!user) {
        return res.status(404).send({ msg: 'user not found' });
    }
    //5. check the password
    if (password != user.password) {
        return res.status(401).send({ msg: 'password not recognize' });
    }
    let id = user.token = (0, uuid_1.v4)();
    yield user.save();
    console.log('token:', id);
    //remove password from return object
    user.password = null;
    return res.status(200).json(user);
});
module.exports = {
    getUsers,
    createUsers,
    loginUser,
};
