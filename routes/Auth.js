const express = require('express');
const router = express.Router();

const passport = require('passport');
const config = require('../config/application');
const AuthService = require('../models/Auth');
const path = require('path');

const AuthController = require('../controllers/Auth')

console.log('Auth Router Registered')

router.post('/login',AuthController.login)

router.post('/register',AuthController.register)

// router.get('/user', UserController.getUser);

router.get('/me', AuthService.authRequired, (req, res) => {
    return res.status(200).send(req.user);
});

//########### Google OAuth ###########//
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}));

router.get(config.google.callbackURL.replace('/api/v1/auth',''), 
           passport.authenticate('google',{session: false}), 
           function(req, res) {
    const accessToken = AuthService.issueToken(req.user._id);
    if(accessToken) {
        console.log(`[GoogleOAuth]: Token issued for the user: ${req.user._id}`);
    } else {
        console.error(`[GoogleOAuth]: Token has not been issued for the user: ${req.user._id}`);
    }
    res.render(path.join(__dirname + '/authenticated.html'), {
        user: JSON.stringify({user: req.user, token: accessToken}),
        targetOrigin: config.client.url
    });
})

//########### Facebook OAuth ###########//
router.get('/facebook', passport.authenticate('facebook', {
    session: false,
    scope: [ 'email']
}));

router.get(config.facebook.callbackURL.replace('/api/v1/auth', ''),
    passport.authenticate('facebook', { scope: ['email'], session: false }),
    function(req, res) {
    const accessToken = AuthService.issueToken(req.user._id);
    if(accessToken) {
        console.log(`[FacebookOAuth]: Token issued for the user: ${req.user._id}`);
    } else {
        console.error(`[FacebookOAuth]: Token has not been issued for the user: ${req.user._id}`);
    }
    res.render(path.join(__dirname + '/authenticated.html'), {
        user: JSON.stringify({user: req.user, token: accessToken}),
        targetOrigin: config.client.url
    });
});

module.exports = router;