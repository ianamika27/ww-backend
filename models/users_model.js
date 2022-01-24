const crypto =  require('crypto')

const config = require('../config/default');

const mongoose = require('mongoose');
const moment = require('moment');
const randify = require('randify');

const {jwtSign} = require('../utils/authhelper')

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true },

    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim: true,
        index: 1
    },
    // This filed also contains numbers previously used
    phoneNumber: { type: String, trim: true },

    password: { required: true, type: String, },

    googleSignin: { type: String, default: false },

    facebookSignin: { type: String, default: false },

    refreshToken: String,

    isPhoneVerified: { type: Boolean, default: false },

    isEmailVerified: { type: Boolean, default: false },

    otpConf: [{
        token: Number,
        expiresAt: Date,
        generatedAt: { default: Date.now(), type: Date, },
        isActive: Boolean,
        verifiedAt: Date
    }],

    emailConf: [{
        token: String,
        generatedAt: { default: Date.now(), type: Date },
        expiresAt: { default: Date.now(), type: Date },
        isActive: Boolean,
        verifiedAt: Date
    }],

    resetConf: { token: String, generatedAt: Date, expiresAt: Date },

    active: { type: Boolean, default: true },

    profileImage: String,

}, { timestamps: true });

const users_model = module.exports = mongoose.model('User', userSchema);

users_model.findByQuery = (query) => {
    return users_model.findOne({ ...query, active: true })
}


users_model.login = async (data) => {
    
    let query = {phoneNumber:data.phoneNumber}
    
    const user = await users_model.findOne({ ...query, active: true })
   
    if(!user){
        return "Invalid email address";
    }
    
    let encrypt_password = crypto.createHmac("sha256", config['secret']).update(data['password']).digest("hex");
    
    if(encrypt_password!==user.password){
        return "Incorrect Password";
    }

    let token = jwtSign(user);
    return {
        message: "Successfully logged in",
        jT: token,
        user: user
    };
}

users_model.signup = (data) => {
    const { phoneNumber, password } = data;
    const generatedAt = moment().format();
    const expiresAt = moment().add(15, 'minutes').format();
    const hash = crypto.createHmac("sha256", config['secret']).update(password).digest("hex");

    const query ={phoneNumber:phoneNumber}
    const user = users_model.findOne({ ...query, active: true }).lean();

    if(user){
        console.log(user.phoneNumber)
        return  "Phone number already registered";
    }
    return users_model.create({
        name: data.name,
        phoneNumber: data.phoneNumber,
        isPhoneVerified: false,
        password: hash,
        refreshToken: randify('string', 256),
        otpConf: [{ token: data.otpToken, expiresAt, generatedAt, isVerified: false, isActive: true }],
    });
    //return Created(res, "Successfully signed up, please verify otp", { userId: newUser._id });
}
users_model.get_user = () => {
    return users_model.findOne()
}
