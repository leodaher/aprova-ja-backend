var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.post('/logout', auth.logout);

module.exports = router;