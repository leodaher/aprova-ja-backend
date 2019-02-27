var express = require('express');
var router = express.Router();
var alunos = require('../controllers/alunos');
var isAuthenticated = require('../middleware/auth');

router.post('/', isAuthenticated, alunos.create);
router.get('/:id', isAuthenticated, alunos.show);
