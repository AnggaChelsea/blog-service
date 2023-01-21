const express = require("express");
const router = express.Router();
const userRouter = require("./user")
const jwta = require("../middleware/jwtAdmin")
const api = process.env.API_URL;
router.use(`/user`, userRouter);
const blog = require('./blog/projects/projects')

// router.use('/socialMedia', require('./socialMedia'));

router.use('/navbar', require('./nav'));
router.use('/navbar-sql', require('./service/sql/navbar'))
router.use('/team', require('./teams/teams.router'))
router.use('/lapang', require('./lapang/lapang'))
router.use('/menu', require('./menu'))
router.use('/projects', blog)
router.use('/hire', require('./blog/hire'))
router.use('/story', require('./blog/story/story'))
router.use('/work', require('./blog/work'))

router.use('/alamat', require('./service/sql/alamat'))



module.exports = router;