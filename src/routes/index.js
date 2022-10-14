const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const categoryRouter = require("./category")
const products = require("./products")
const home = require('./home')
const order =  require("./order")
const jwta = require("../middleware/jwtAdmin")
const api = process.env.API_URL;
const followers = require("./followers")
const productR = require("./products/getproducts")
router.use(`/user`, userRouter);
router.use(`/`, home)

router.use(`/category`,  categoryRouter);
router.use(`/products`, products);
router.use(`/roles`, require("./roles"));
router.use(`/orders`, order);
router.use(`/chat`, require("./chat"));
router.use(`/inbox`, require("./inbox"));
router.use(`/cart`, require("./cart"));
router.use(`/followers`, followers);
router.use(`/product`, productR);
// router.use('/socialMedia', require('./socialMedia'));
router.use('/comment', require('./products/comment'));

router.use('/post-product', require('./products/postProduct'));
router.use('/navbar', require('./nav'));
router.use('/navbar-sql', require('./service/sql/navbar'))


module.exports = router;