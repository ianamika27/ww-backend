const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/users_controller');

const userController = require('../controllers/User')

router.post('/login',user_controller.login)

router.post('/register', userController.register);

router.get('/user', user_controller.getUser);

module.exports = router;