const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const adminAuth = require('../../../middleware/admin')
const projectController = require('../../../controllers/blog/projects/projects')

router.post('/get-project', projectController.getData)
router.use(adminAuth)
router.get('/project/:id', projectController.getDetail)
router.post('/add-project', projectController.createProject);
router.delete('/project-delete/:id',  projectController.deleteProject)
router.put('/project-edit/:id', projectController.edit)

module.exports = router