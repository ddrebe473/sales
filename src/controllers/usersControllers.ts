const User = require('../models/users')

const getUsers = async (req:any, res:any) => {
    const userList = await User.find({});
    res.status(200).json(userList);
}

const createUsers = ()=>{
console.log('test')
}
module.exports={
    getUsers,
    createUsers
}