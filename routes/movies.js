const express = require('express');
const router = express.Router();

const movies_controller = require('../controllers/movies');

router.get('/workspace',movies_controller.search_moviename)

module.exports = router;