"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const { getUsers, createUsers, } = require('../controllers/usersControllers');
router.route('/').get(getUsers).post(createUsers);
module.exports = router;
