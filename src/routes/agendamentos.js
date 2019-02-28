var express = require('express');
var router = express.Router();
var agendamentos = require('../controllers/agendamentos');
var isAuthenticated = require('../middleware/auth');

router.post('/', isAuthenticated, agendamentos.create);
router.get('/', isAuthenticated, agendamentos.index);
router.get('/:id', isAuthenticated, agendamentos.show);

module.exports = router;