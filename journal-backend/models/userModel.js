const fs = require('fs/promises')
const path = require('path')

const USERS_PATH = path.join(__dirname, '..', 'db', 'users.json')

async function readAll() {
  const data = await fs.readFile(USERS_PATH, 'utf-8')
  return JSON.parse(data)
}

async function writeAll(users) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2))
}

async function findByUsername(username) {
  const users = await readAll()
  return users.find(u => u.username === username)
}

async function findByCredentials(username, password) {
  const users = await readAll()
  return users.find(u => u.username === username && u.password === password)
}

async function create(username, password) {
  const users = await readAll()
  const user = { id: Date.now(), username, password }
  users.push(user)
  await writeAll(users)
  return user
}

async function removeById(userId) {
  const users = await readAll()
  const updated = users.filter(u => u.id !== userId)
  await writeAll(updated)
}

module.exports = { findByUsername, findByCredentials, create, removeById }
