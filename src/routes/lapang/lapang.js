const express = require('express')
const router = express.Router();
const lapangcontrollers = require('../../controllers/lapang/lapang')

router.post('/create-katagory', lapangcontrollers.createCatagory)
router.post('/create-lapang', lapangcontrollers.CreateLapang)

module.exports = router