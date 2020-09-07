var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController')

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
  
module.exports = router;