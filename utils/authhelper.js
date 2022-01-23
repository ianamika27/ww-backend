const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

const { signOptions,verifyOptions} = require('../utils/authOptions')

const jwtSign = (data) => {
    return jwt.sign({ id: data._id, phoneNumber: data.phoneNumber }, privateKey, signOptions);
}

const jwtDecode = (token) => {
    try {
        return jwt.verify(token, publicKey, verifyOptions);
    } catch (error) {
        return false;
    }
}


module.exports = { jwtSign, jwtDecode }