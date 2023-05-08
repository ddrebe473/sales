const JWT = require('../jwt')

const User = require('../models/users');

const getUsers = async (req: any, res: any) => {
    const userList = await User.find({});
    return res.status(200).json(userList);
};

const loginUser = async (req: any, res: any) => {
    //recieve the credentials from the API request
    let username = req.body.userKey;
    let password = req.body.passKey;

    //search mongo for user
    const user = await User.findOne({ name: username });
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
    await user.save();

    //remove password from return object
    user.password = undefined
    delete user.password

    //return the user with new token
    return res.status(200).json(user);
};
const validateUserToken = (req:any, res:any)=>{
    const token = req.query.token;
    console.log('backend Token:', token);
    
    let isValid = JWT.ValidateToken(token)
    console.log('isValid:', isValid);

    return res.status(200).json({isValid: isValid});

}

const registerUser = async(req:any, res:any) => {
    let username = req.body.username
    let password = req.body.password

    //find user
    const user = await User.findOne({ name: username });

    if (user){
        return res.status(401).json({err:"user already exists"});
    }

    //send data to mongo
    const newUser = await User.create({name: username, password: password})

    return res.status(200).json({success:true});

}

module.exports = {
    getUsers,
    loginUser,
    validateUserToken,
    registerUser
};