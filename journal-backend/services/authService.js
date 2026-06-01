const fs = require('fs')
const path = require('path')
const AppError = require('../utils/AppError')

const USERS_PATH = path.join(__dirname, '..', 'db', 'users.json')
const JOURNALS_PATH = path.join(__dirname, '..', 'db', 'data.json')

function readUsers()      { return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8')) }
function writeUsers(data) { fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2)) }
function readJournals()      { return JSON.parse(fs.readFileSync(JOURNALS_PATH, 'utf-8')) }
function writeJournals(data) { fs.writeFileSync(JOURNALS_PATH, JSON.stringify(data, null, 2)) }

function signup(username, password) {
  const users = readUsers()
  if (users.find(u => u.username === username)) {
    throw new AppError('Username already taken', 409)
  }
  const user = { id: Date.now(), username, password }
  users.push(user)
  writeUsers(users)
  return { id: user.id, username: user.username }
}

function login(username, password) {
  const users = readUsers()
  const user = users.find(u => u.username === username && u.password === password)
  if (!user) throw new AppError('Invalid username or password', 401)
  return { id: user.id, username: user.username }
}

function deleteAccount(username, password) {
  const users = readUsers()
  const user = users.find(u => u.username === username && u.password === password)
  
  if (!user) throw new AppError('Invalid username or password', 401)

  const updatedUsers = users.filter(u => u.id !== user.id)
  const updatedJournals = readJournals().filter(j => j.userId !== user.id)

  writeUsers(updatedUsers)
  writeJournals(updatedJournals)

  return { message: 'Account deleted'  }
}

module.exports = { signup, login , deleteAccount }
