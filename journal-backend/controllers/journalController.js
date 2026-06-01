const journalService = require('../services/journalService')

function getByUser(req, res) {
  const userId = Number(req.query.userId)
  if (!userId) {
    return res.status(400).json({ error: 'userId query param required' })
  }

  res.json(journalService.getByUser(userId))
}

function getById(req, res) {
  try {
    res.json(journalService.getById(Number(req.params.id)))
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

function create(req, res) {
  const { userId, title, body } = req.body
  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title required' })
  }

  res.status(201).json(journalService.create(Number(userId), title, body))
}

function update(req, res) {
  try {
    res.json(journalService.update(Number(req.params.id), req.body))
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

function remove(req, res) {
  try {
    journalService.remove(Number(req.params.id))
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = { getByUser, getById, create, update, remove }
