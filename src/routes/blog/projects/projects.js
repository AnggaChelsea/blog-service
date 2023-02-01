const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const projectController = require('../../../controllers/blog/projects/projects')

router.post('/get-project', projectController.getData)
router.use(auth)
router.post('/add-project', projectController.createProject);
router.delete('/project-delete/:id',  projectController.deleteProject)
router.get('/project/:id', projectController.getDetail)
router.put('/project-edit/:id', projectController.edit)

module.exports = router