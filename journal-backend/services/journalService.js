const journalModel = require('../models/journalModel')

function getByUser(userId) {
  return journalModel.getByUser(userId)
}

function getById(id) {
  return journalModel.getById(id)
}

function create(userId, title, body = '') {
  return journalModel.create(userId, title, body)
}

function update(id, changes) {
  return journalModel.update(id, changes)
}

function remove(id) {
  return journalModel.remove(id)
}

module.exports = { getByUser, getById, create, update, remove }
