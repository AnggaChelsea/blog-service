const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const auth = require("../middleware/auth");

router.get('/categoryList', CategoryController.getAllCategories);
router.post('/addcategory', auth, CategoryController.addCategory);
router.delete('/delete_category/:id', auth, CategoryController.deleteCategory);
router.get('/find_category_by_id/:id', auth, CategoryController.findCategoryById);
router.put('/updateCategory/:id', auth, CategoryController.updateCategory);
module.exports = router;