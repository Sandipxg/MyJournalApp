const journalService = require('../services/journalService')
const AppError = require('../utils/AppError')

async function getByUser(req, res) {
  const userId = req.query.userId
  if (!userId) {
    throw new AppError('userId query param required', 400)
  }

  const journals = await journalService.getByUser(userId)
  res.json(journals)
}

async function getById(req, res) {
  const journal = await journalService.getById(req.params.id)
  res.json(journal)
}

async function create(req, res) {
  const { userId, title } = req.body
  if (!userId || !title) {
    throw new AppError('userId and title required', 400)
  }

  const journal = await journalService.create(userId, title)
  res.status(201).json(journal)
}

async function update(req, res) {
  const journal = await journalService.update(req.params.id, req.body)
  res.json(journal)
}

async function remove(req, res) {
  await journalService.remove(req.params.id)
  res.json({ message: 'Deleted' })
}

module.exports = { getByUser, getById, create, update, remove }
