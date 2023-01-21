const express = require('express');
const routes = express.Router()
const storyController = require('../../../controllers/blog/story/story')

routes.post('/create-story', storyController.createStory)
routes.get('/story', storyController.getStory)

module.exports = routes