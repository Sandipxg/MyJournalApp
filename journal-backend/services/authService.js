const AppError = require('../utils/AppError')
const userModel = require('../models/userModel')
const journalModel = require('../models/journalModel')

function signup(username, password) {
  if (userModel.findByUsername(username)) {
    throw new AppError('Username already taken', 409)
  }
  const user = userModel.create(username, password)
  return { id: user.id, username: user.username }
}

function login(username, password) {
  const user = userModel.findByCredentials(username, password)
  if (!user) throw new AppError('Invalid username or password', 401)
  return { id: user.id, username: user.username }
}

function deleteAccount(username, password) {
  const user = userModel.findByCredentials(username, password)
  if (!user) throw new AppError('Invalid username or password', 401)

  userModel.removeById(user.id)
  journalModel.removeByUser(user.id)

  return { message: 'Account deleted'  }
}

module.exports = { signup, login , deleteAccount }
