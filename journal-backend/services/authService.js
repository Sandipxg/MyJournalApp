const AppError = require('../utils/AppError')
const userModel = require('../models/userModel')
const journalModel = require('../models/journalModel')

async function signup(username, password) {
  if (await userModel.findByUsername(username)) {
    throw new AppError('Username already taken', 409)
  }
  const user = await userModel.create(username, password)
  return { id: user.id, username: user.username }
}

async function login(username, password) {
  const user = await userModel.findByCredentials(username, password)
  if (!user) throw new AppError('Invalid username or password', 401)
  return { id: user.id, username: user.username }
}

async function deleteAccount(username, password) {
  const user = await userModel.findByCredentials(username, password)
  if (!user) throw new AppError('Invalid username or password', 401)

  await userModel.removeById(user.id)
  await journalModel.removeByUser(user.id)

  return { message: 'Account deleted'  }
}

module.exports = { signup, login , deleteAccount }
