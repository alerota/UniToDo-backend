var express = require('express');
var router = express.Router();

const CategoriesController = require('../controllers/CategoriesController')

router.get('/',  CategoriesController.getAllCategories)
  
module.exports = router;