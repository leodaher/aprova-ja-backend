var express = require('express');
var router = express.Router();
var alunos = require('../controllers/alunos');
var isAuthenticated = require('../middleware/auth');

router.post('/', alunos.create);
router.get('/:id', isAuthenticated, alunos.show);

module.exports = router;
