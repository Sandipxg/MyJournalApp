const fs = require('fs')
const path = require('path')
const AppError = require('../utils/AppError')

const JOURNALS_PATH = path.join(__dirname, '..', 'db', 'data.json')

function readAll() {
  return JSON.parse(fs.readFileSync(JOURNALS_PATH, 'utf-8'))
}

function writeAll(journals) {
  fs.writeFileSync(JOURNALS_PATH, JSON.stringify(journals, null, 2))
}

function getByUser(userId) {
  return readAll().filter(j => j.userId === userId)
}

function getById(id) {
  const journal = readAll().find(j => j.id === id)
  if (!journal) throw new AppError('Journal not found', 404)
  return journal
}

function create(userId, title, body = '') {
  const journals = readAll()
  const journal = {
    id: Date.now(),
    userId,
    title,
    body,
    date: new Date().toISOString().split('T')[0],
  }
  journals.push(journal)
  writeAll(journals)
  return journal
}

function update(id, changes) {
  const journals = readAll()
  const index = journals.findIndex(j => j.id === id)
  if (index === -1) throw new AppError('Journal not found', 404)

  journals[index] = { ...journals[index], ...changes, id: journals[index].id, userId: journals[index].userId }
  writeAll(journals)
  return journals[index]
}

function remove(id) {
  const journals = readAll()
  const index = journals.findIndex(j => j.id === id)
  if (index === -1) throw new AppError('Journal not found', 404)

  journals.splice(index, 1)
  writeAll(journals)
}

function removeByUser(userId) {
  const journals = readAll()
  const updated = journals.filter(j => j.userId !== userId)
  writeAll(updated)
}

module.exports = { getByUser, getById, create, update, remove, removeByUser }
