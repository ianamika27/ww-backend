const passport = require('passport');

const User = require('../models/User')
const AuthService = require('../models/Auth');

module.exports.register = async (req, res) => {
    req.body = req.body.name
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.createdAt = new Date();
    try {
        await user.save();
        const accessToken = AuthService.issueToken(user.toProfileJSON()._id);
        res.status(201).json({status: 201, data: user.toProfileJSON(), token: accessToken, message: 'User successfully created'});
    } catch (e) {
        console.error(`[error] user registration ${user.email} error = ${e}`);
        if(e.errors && e.errors.email && e.errors.email.kind === 'unique') {
            res.status(409).json({status: 409, message: e.toString()});
        }
        res.status(400).json({status: 400, message: e.toString()});
    }
}

module.exports.login = async  (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
        req.logIn(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = AuthService.issueToken(user._id);
            return res.status(200).send({user, token});
        });
    })(req, res);
}
