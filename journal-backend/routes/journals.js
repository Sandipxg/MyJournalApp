const express = require('express')
const journalController = require('../controllers/journalController')

const auth = require('../middleware/auth')

const validate = require('../middleware/validate')
const { createJournalSchema, updateJournalSchema } = require('../validators/journalValidator')

const router = express.Router()

router.use(auth)

router.get('/', journalController.getByUser)
router.get('/:id', journalController.getById)
router.post('/', validate(createJournalSchema), journalController.create)
router.put('/:id', validate(updateJournalSchema), journalController.update)
router.delete('/:id', journalController.remove)

module.exports = router
