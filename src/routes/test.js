var express = require('express');
var router = express.Router();
var test = require('../controllers/test');
var isAuthenticated = require('../middleware/auth');

router.post('/test', isAuthenticated, test.main);

module.exports = router;