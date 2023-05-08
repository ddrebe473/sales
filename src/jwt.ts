require('dotenv').config();
const jwt = require('jsonwebtoken');

const options = {
    header: {
        alg: 'HS256',
        typ: 'JWT',
    },
};
function GenerateToken(name:any) {
    console.log('makin token');
    const JWTsecret = process.env.JWTTOKEN;

    const Data = {
        name: name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    const Token = jwt.sign(Data, JWTsecret, options);
    return Token;
}

function ValidateToken(Token:any) {
    let JWTsecret = process.env.JWTTOKEN;
    try {
        //console.log(req.header)
        const verified = jwt.verify(Token, JWTsecret, options);

        if (verified) {
            console.log('Access granite');
            return true;
        } else {
            console.log('access failure');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = { GenerateToken, ValidateToken };

// let token = GenerateToken('dylan');
// let validated = ValidateToken(token);
// console.log(token);
// console.log(validated);
