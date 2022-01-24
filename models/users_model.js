const crypto =  require('crypto')

const config = require('../config/default');

const mongoose = require('mongoose');
const moment = require('moment');
const randify = require('randify');

const {jwtSign} = require('../utils/authhelper')

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true },

    emailAddress: {
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

users_model.createAccount = async (data) => {
    
    // const generatedAt = moment().format();
    // const expiresAt = moment().add(15, 'minutes').format();
    const passwordEncrypted = crypto.createHmac("sha256", process.env.SECRET).update(data.password).digest("hex");

    return users_model.create({
        username: data.username,
        emailAddress:data.emailAddress,
        password: passwordEncrypted
        // refreshToken: randify('string', 256),
        // otpConf: [{ token: data.otpToken, expiresAt, generatedAt, isVerified: false, isActive: true }],
    });
}

users_model.login = async (data) => {
    
    let query = {emailAddress:data.emailAddress}
    
    const user = await users_model.findByQuery(query).lean()
   
    if(!user){
        return "Email Address not registered.";
    }
    
    let encrypt_password = crypto.createHmac("sha256", config['secret']).update(data['password']).digest("hex");
    
    if(encrypt_password!==user.password){
        return "Incorrect Password";
    }

    let token = jwtSign(user);
    return {
        message: "Successfully logged in",
        jT: token,
        user: {username:user.username,id:user._id}
    };
}

users_model.signup = async (data) => {
    const { emailAddress } = data;
   
    const query = {emailAddress:emailAddress}
    
    const user = await users_model.findByQuery(query).lean()

    if(user){
        return  "Email already registered";
    }

    const [newUser] = await Promise.all([users_model.createAccount(data)]);

    return {"message": "Successfully Registered",  userId: newUser._id };

}
users_model.get_user = () => {
    return users_model.findOne()
}
