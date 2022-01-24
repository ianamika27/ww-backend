const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/users_controller');

router.post('/login',user_controller.login)

router.post('/register', user_controller.register);

router.get('/user', user_controller.getUser);

module.exports = router;