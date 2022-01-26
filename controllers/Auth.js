const express = require('express');
const router = express.Router();

const passport = require('passport');
const config = require('../config/application');
const AuthService = require('../models/Auth');
const path = require('path');


router.get('/me', AuthService.authRequired, (req, res) => {
    return res.status(200).send(req.user);
});

//########### Google OAuth ###########//
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}));

router.get(config.google.callbackURL.replace('/api/auth',''), 
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
module.exports = router;