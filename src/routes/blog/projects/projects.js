const express = require('express')
const router = express.Router()
const projectController = require('../../../controllers/blog/projects/projects')

router.post('/add-project', projectController.createProject);
router.get('/get-project', projectController.getData)
router.delete('/project-delete/:id', projectController.deleteProject)
router.get('/project/:id', projectController.getDetail)
router.put('/project-edit/:id', projectController.edit)

module.exports = router