const fs = require('fs')
const path = require('path')

const USERS_PATH = path.join(__dirname, '..', 'db', 'users.json')

function readAll() {
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'))
}

function writeAll(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2))
}

function findByUsername(username) {
  return readAll().find(u => u.username === username)
}

function findByCredentials(username, password) {
  return readAll().find(u => u.username === username && u.password === password)
}

function create(username, password) {
  const users = readAll()
  const user = { id: Date.now(), username, password }
  users.push(user)
  writeAll(users)
  return user
}

function removeById(userId) {
  const users = readAll()
  const updated = users.filter(u => u.id !== userId)
  writeAll(updated)
}

module.exports = { findByUsername, findByCredentials, create, removeById }
