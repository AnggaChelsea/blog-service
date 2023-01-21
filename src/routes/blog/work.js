const express = require('express');
const router = express.Router();
const workController = require('../../controllers/blog/work')

router.post('/add-experience', workController.createWork)
router.get('/get-experience', workController.getWork)

module.exports = router