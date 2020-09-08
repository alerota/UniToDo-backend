var express = require('express');
var router = express.Router();

const indexController = require('../controllers/IndexController')

const {ensureAuthenticated} = require('../extra/Authenticate')

/* GET home page. */
router.get('/', ensureAuthenticated, indexController.index)
router.get('/dashboard', ensureAuthenticated, indexController.dashboard)

module.exports = router;
