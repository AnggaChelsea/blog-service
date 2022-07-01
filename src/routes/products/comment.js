const commentController = require('../../controllers/products/commentController');
const auth = require('../../middleware/auth');
const multer = require('multer');
const moment = require('moment');
const path = require('path');

const express = require('express');
const router = express.Router();

router.post('/comment', auth, commentController.addComment);
router.get('/comment/:id', auth, commentController.getCommentById);
router.get('/comment', auth, commentController.getAllComments);

module.exports = router;
