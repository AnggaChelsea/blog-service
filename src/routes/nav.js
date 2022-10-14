const express = require('express');
const route = express.Router();
const nav = require('../controllers/navbar')


route.post('/createnav', nav.create)
route.get('/getNav', nav.getNav)

module.exports = route