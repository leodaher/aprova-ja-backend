var express = require('express');
var router = express.Router();
var instrutores = require('../controllers/instrutores');
var isAuthenticated = require('../middleware/auth');

router.post('/', instrutores.create);
router.get('/:id', isAuthenticated, instrutores.show);

module.exports = router;