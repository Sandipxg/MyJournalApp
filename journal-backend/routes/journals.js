const express = require('express')
const journalService = require('../services/journalService')

const router = express.Router()

router.get('/', (req, res) => {
  const userId = Number(req.query.userId)
  if (!userId) return res.status(400).json({ error: 'userId query param required' })

  res.json(journalService.getByUser(userId))
})

router.get('/:id', (req, res) => {
  try {
    res.json(journalService.getById(Number(req.params.id)))
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

router.post('/', (req, res) => {
  const { userId, title, body } = req.body
  if (!userId || !title) return res.status(400).json({ error: 'userId and title required' })

  res.status(201).json(journalService.create(Number(userId), title, body))
})

router.put('/:id', (req, res) => {
  try {
    res.json(journalService.update(Number(req.params.id), req.body))
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

router.delete('/:id', (req, res) => {
  try {
    journalService.remove(Number(req.params.id))
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

module.exports = router
