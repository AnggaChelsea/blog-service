const auth = require("../../middleware/auth");
const express = require('express')
const router = express.Router(); 
const lapangcontrollers = require('../../controllers/lapang/lapang')

router.post('/create-katagory', lapangcontrollers.createCatagory)
router.post('/create-lapang', auth, lapangcontrollers.CreateLapang)
router.get('/get-lapang', auth, lapangcontrollers.getLapang)
router.post('/get-by-pemilik', auth, lapangcontrollers.getLapangByPemilik)
router.post('/get-by-category', auth, lapangcontrollers.getLapangByKatagori)
router.post('/join-member', auth, lapangcontrollers.joinMember)
router.get('/get-kategory', auth, lapangcontrollers.getKategory)

module.exports = router;