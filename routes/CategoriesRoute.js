var express = require('express');
var router = express.Router();

const CategoriesController = require('../controllers/CategoriesController')
const {ensureAuthenticated} = require('../extra/Authenticate')

router.get('/', ensureAuthenticated, CategoriesController.getAllCategories)
router.post('/add', ensureAuthenticated, CategoriesController.addNewCategory)
  
module.exports = router;