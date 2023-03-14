const express = require('express')
const router = express.Router()
const auth = require('../../../middleware/auth')
const adminAuth = require('../../../middleware/admin')
const projectController = require('../../../controllers/blog/projects/projects')

router.use(adminAuth)
router.use(auth) 
router.post('/get-project', projectController.getData)
router.get('/project/:id', projectController.getDetail)
router.post('/add-project', projectController.createProject);
router.delete('/project-delete/:id',  projectController.deleteProject)
router.put('/project-edit/:id', projectController.edit)

//service
router.post('/service-project', projectController.createService)
router.get('/service-project', projectController.getService)


module.exports = router