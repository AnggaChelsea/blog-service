const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/categoryList', CategoryController.getAllCategories);
router.post('/addCategory', CategoryController.addCategory);
router.delete('/delete_category/:id', CategoryController.deleteCategory);
router.get('/find_category_by_id/:id', CategoryController.findCategoryById);
router.put('/updateCategory/:id', CategoryController.updateCategory);
module.exports = router;