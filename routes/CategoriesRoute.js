var express = require('express');
var router = express.Router();

const CategoriesController = require('../controllers/CategoriesController')
const {ensureAuthenticated} = require('../extra/Authenticate')

router.get('/all', ensureAuthenticated, CategoriesController.getAllCategories)
router.get('/available', ensureAuthenticated, CategoriesController.getAllAvailableCategories)
router.get('/notavailable', ensureAuthenticated, CategoriesController.getAllNotAvailableCategories)
router.post('/add', ensureAuthenticated, CategoriesController.addNewCategory)
router.get('/:name', ensureAuthenticated, CategoriesController.getCategoryByName)
router.get('/:name/delete', ensureAuthenticated, CategoriesController.deleteCategory)
router.put('/:name/update', ensureAuthenticated, CategoriesController.updateCategory)
  
module.exports = router;