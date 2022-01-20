const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/users_controller');

console.log('in users router')

router.post('/login',user_controller.login)

router.post('/register', user_controller.register);

module.exports = router;