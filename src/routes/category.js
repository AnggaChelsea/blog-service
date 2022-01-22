const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/categoryList', CategoryController.getAllCategories);
router.post('/addCategory', CategoryController.addCategory);
router.delete('/delete_category/:id', CategoryController.deleteCategory);
module.exports = router;