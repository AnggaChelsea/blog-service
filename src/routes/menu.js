const menuController = require('../controllers/menuController')
const express = require('express')
const router = express.Router();

router.post('/create-menu', menuController.createMenu)

module.exports = router;  