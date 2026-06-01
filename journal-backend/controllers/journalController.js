const journalService = require('../services/journalService')
const AppError = require('../utils/AppError')

function getByUser(req, res) {
  const userId = Number(req.query.userId)
  if (!userId) {
    throw new AppError('userId query param required', 400)
  }

  res.json(journalService.getByUser(userId))
}

function getById(req, res) {
  res.json(journalService.getById(Number(req.params.id)))
}

function create(req, res) {
  const { userId, title, body } = req.body
  if (!userId || !title) {
    throw new AppError('userId and title required', 400)
  }

  res.status(201).json(journalService.create(Number(userId), title, body))
}

function update(req, res) {
  res.json(journalService.update(Number(req.params.id), req.body))
}

function remove(req, res) {
  journalService.remove(Number(req.params.id))
  res.json({ message: 'Deleted' })
}

module.exports = { getByUser, getById, create, update, remove }
