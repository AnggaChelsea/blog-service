const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/blog/member')

router.post('/register',memberController.register)
router.get('/get-member', memberController.getMember)

module.exports = router