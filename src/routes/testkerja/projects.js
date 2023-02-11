const express = require('express')
const router = express.Router()
const projectController = require('../../controllers/blog/testkerja/projects')

router.post('/create-project', projectController.createProject)
router.post('/get-project-paginate', projectController.getDataPaginate)
router.post('/get-project', projectController.getProject)
router.get('/list-projects', projectController.getProjectAll)
router.get('/projects/:id', projectController.getProjectDetail)
router.get('/get-promo', projectController.getPromo)

module.exports = router