const auth = require("../../middleware/auth");
const express = require('express')
const router = express.Router(); 
const lapangcontrollers = require('../../controllers/lapang/lapang')

router.post('/create-katagory', lapangcontrollers.createCatagory)
router.post('/create-lapang', auth, lapangcontrollers.CreateLapang)
router.get('/get-lapang', auth, lapangcontrollers.getLapang)
router.post('/get-by-pemilik', auth, lapangcontrollers.getLapangByPemilik)
router.post('/get-by-category', auth, lapangcontrollers.getLapangByKatagori)

module.exports = router;