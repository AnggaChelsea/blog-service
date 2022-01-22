const express = require("express");
const router = express.Router();
const rolesController = require('../controllers/roles');


router.get('/getroles', rolesController.getRoles)
router.post('/addrole', rolesController.addRole)

module.exports = router;