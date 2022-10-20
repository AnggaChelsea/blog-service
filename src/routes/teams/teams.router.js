const express = require('express');
const router = express.Router();
const teamsController = require('../../controllers/teams/teams');

router.post('/team-new', teamsController.createTeam)
router.get('/teams' , teamsController.getTeams)
router.patch('/gabung', teamsController.gabungTeam)

module.exports = router;