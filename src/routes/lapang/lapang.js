const auth = require("../../middleware/auth");
const express = require('express')
const router = express.Router(); 
const lapangcontrollers = require('../../controllers/lapang/lapang')
const bookingController = require('../../controllers/lapang/booking')
const jadwalController = require('../../controllers/lapang/jadwal')

router.post('/get-by-pemilik', lapangcontrollers.getLapangByPemilik)
router.post('/create-katagory', lapangcontrollers.createCatagory)
router.post('/create-lapang',  lapangcontrollers.CreateLapang)
router.get('/get-lapang', auth, lapangcontrollers.getLapang)
router.post('/get-by-category', auth, lapangcontrollers.getLapangByKatagori)
router.post('/join-member', auth, lapangcontrollers.joinMember)
router.get('/get-kategory', auth, lapangcontrollers.getKategory)
router.post('/add-rating',  lapangcontrollers.addrat)

router.post('/checkout-booking', bookingController.doBooking)

router.post('/create-jadwal', jadwalController.createJadwal)
router.get('/get-jadwal', jadwalController.getJadwal)

router.post('/cari-lapang-terdekat', lapangcontrollers.filterLapangTerdekat)

module.exports = router;