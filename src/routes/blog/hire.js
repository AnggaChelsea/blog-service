const express = require('express');
const router = express.Router();
const hireController = require('../../controllers/blog/hire')

router.post('/send-hire', hireController.createHire)
router.get('/hire-get', hireController.getHireData)
router.delete('/hire-delete/:id',hireController.deleteHire)

module.exports = router;