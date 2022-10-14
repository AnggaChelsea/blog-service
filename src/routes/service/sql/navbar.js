const express = require('express');
const router = express.Router();
const navbar = require('../../../services/navbar');

router.get('/', async function(req, res, next) {
  try {
    res.json(await navbar.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;