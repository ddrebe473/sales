"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { loginUser, getUsers, createUsers, } = require('../controllers/usersControllers');
router.route('/').get(getUsers).post(createUsers);
router.route('/login').post(loginUser);
module.exports = router;
