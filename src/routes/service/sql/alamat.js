const express = require('express')
const app = express()
const router = express.Router();
const alamatC = require('../../../controllers/alamat')

router.get('/provinsi', alamatC.getProv)

module.exports = router