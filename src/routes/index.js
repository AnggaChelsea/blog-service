const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const jwta = require("../middleware/jwtAdmin")
const api = process.env.API_URL;
router.use(`/user`, userRouter);

// router.use('/socialMedia', require('./socialMedia'));

router.use('/navbar', require('./nav'));
router.use('/navbar-sql', require('./service/sql/navbar'))
router.use('/team', require('./teams/teams.router'))
router.use('/lapang', require('./lapang/lapang'))


module.exports = router;