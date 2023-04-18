import { v4 as uuidv4 } from 'uuid';

const User = require('../models/users');

const getUsers = async (req: any, res: any) => {
    const userList = await User.find({});
    return res.status(200).json(userList);
};

const createUsers = () => {
    console.log('test');
};

const loginUser = async (req: any, res: any) => {
    //2. recieve the credentials from the API request
    let username = req.body.userKey;
    let password = req.body.passKey;
    console.log('username: ', username);
    console.log('passwrod: ', password);

    //3. search mongo for user
    const user = await User.findOne({ name: username });
    console.log(user);

    //4. if user is not found reject the login
    if (!user) {
        return res.status(404).send({ msg: 'user not found' });
    }

    //5. check the password
    if (password != user.password) {
        return res.status(401).send({ msg: 'password not recognize' });
    }

    let id = user.token = uuidv4();
    await user.save();
    console.log('token:', id);

    //remove password from return object
    user.password = null;
    return res.status(200).json(user);
};

module.exports = {
    getUsers,
    createUsers,
    loginUser,
};