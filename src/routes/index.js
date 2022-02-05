const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const categoryRouter = require("./category")
const products = require("./products")
const home = require('./home')
const order =  require("./order")
const api = process.env.API_URL;

router.use(`/`, home)
router.use(`${api}user`, userRouter);
router.use(`${api}category`, categoryRouter);
router.use(`${api}products`, products);
router.use(`${api}roles`, require("./roles"));
router.use(`${api}orders`, order);
router.use(`${api}chat`, require("./chat"));

module.exports = router;