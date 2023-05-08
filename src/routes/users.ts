const express = require('express');
const router = express.Router();

const {
    loginUser,
    getUsers,
    validateUserToken,
    registerUser
} = require('../controllers/usersControllers');

router.route('/').get(getUsers);
router.route('/login').post(loginUser);
router.route('/validate').get(validateUserToken);
router.route('/register').post(registerUser);
module.exports = router;
export{}