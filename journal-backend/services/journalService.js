const journalModel = require('../models/journalModel')

async function getByUser(userId) {
  return await journalModel.getByUser(userId)
}

async function getById(id) {
  return await journalModel.getById(id)
}

async function create(userId, title, body = '') {
  return await journalModel.create(userId, title, body)
}

async function update(id, changes) {
  return await journalModel.update(id, changes)
}

async function remove(id) {
  return await journalModel.remove(id)
}

module.exports = { getByUser, getById, create, update, remove }
