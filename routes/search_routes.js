const express = require('express');
const router = express.Router();

const search_controller = require('../controllers/search_controller');

router.post('/search_moviename',search_controller.search_moviename)

module.exports = router;