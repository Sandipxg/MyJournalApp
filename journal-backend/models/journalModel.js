const fs = require('fs/promises')
const path = require('path')
const AppError = require('../utils/AppError')

const JOURNALS_PATH = path.join(__dirname, '..', 'db', 'data.json')

async function readAll() {
  const data = await fs.readFile(JOURNALS_PATH, 'utf-8')
  return JSON.parse(data)
}

async function writeAll(journals) {
  await fs.writeFile(JOURNALS_PATH, JSON.stringify(journals, null, 2))
}

async function getByUser(userId) {
  const journals = await readAll()
  return journals.filter(j => j.userId === userId)
}

async function getById(id) {
  const journals = await readAll()
  const journal = journals.find(j => j.id === id)
  if (!journal) throw new AppError('Journal not found', 404)
  return journal
}

async function create(userId, title, body = '') {
  const journals = await readAll()
  const journal = {
    id: Date.now(),
    userId,
    title,
    body,
    date: new Date().toISOString().split('T')[0],
  }
  journals.push(journal)
  await writeAll(journals)
  return journal
}

async function update(id, changes) {
  const journals = await readAll()
  const index = journals.findIndex(j => j.id === id)
  if (index === -1) throw new AppError('Journal not found', 404)

  journals[index] = { ...journals[index], ...changes, id: journals[index].id, userId: journals[index].userId }
  await writeAll(journals)
  return journals[index]
}

async function remove(id) {
  const journals = await readAll()
  const index = journals.findIndex(j => j.id === id)
  if (index === -1) throw new AppError('Journal not found', 404)

  journals.splice(index, 1)
  await writeAll(journals)
}

async function removeByUser(userId) {
  const journals = await readAll()
  const updated = journals.filter(j => j.userId !== userId)
  await writeAll(updated)
}

module.exports = { getByUser, getById, create, update, remove, removeByUser }
