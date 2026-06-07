const express = require('express')
const journalController = require('../controllers/journalController')

const auth = require('../middleware/auth')

const router = express.Router()

router.use(auth)

router.get('/', journalController.getByUser)
router.get('/:id', journalController.getById)
router.post('/', journalController.create)
router.put('/:id', journalController.update)
router.delete('/:id', journalController.remove)

module.exports = router
