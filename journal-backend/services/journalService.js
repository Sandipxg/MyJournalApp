const fs = require('fs')
const path = require('path')

const JOURNALS_PATH = path.join(__dirname, '..', 'db', 'data.json')

function readJournals()      { return JSON.parse(fs.readFileSync(JOURNALS_PATH, 'utf-8')) }
function writeJournals(data) { fs.writeFileSync(JOURNALS_PATH, JSON.stringify(data, null, 2)) }

function getByUser(userId) {
  return readJournals().filter(j => j.userId === userId)
}

function getById(id) {
  const journal = readJournals().find(j => j.id === id)
  if (!journal) throw new Error('Journal not found')
  return journal
}

function create(userId, title, body = '') {
  const journals = readJournals()
  const journal = {
    id: Date.now(),
    userId,
    title,
    body,
    date: new Date().toISOString().split('T')[0],
  }
  journals.push(journal)
  writeJournals(journals)
  return journal
}

function update(id, changes) {
  const journals = readJournals()
  const index = journals.findIndex(j => j.id === id)
  if (index === -1) throw new Error('Journal not found')

  journals[index] = { ...journals[index], ...changes, id: journals[index].id, userId: journals[index].userId }
  writeJournals(journals)
  return journals[index]
}

function remove(id) {
  const journals = readJournals()
  const index = journals.findIndex(j => j.id === id)
  if (index === -1) throw new Error('Journal not found')

  journals.splice(index, 1)
  writeJournals(journals)
}

module.exports = { getByUser, getById, create, update, remove }
