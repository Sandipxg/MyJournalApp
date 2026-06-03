const authService = require('../services/authService')
const AppError = require('../utils/AppError')

async function signup(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.signup(username, password)
  res.status(201).json(user)
}

async function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.login(username, password)
  res.json(user)
}

async function deleteAccount(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.deleteAccount(username, password)
  res.json(user)
}

module.exports = { signup, login, deleteAccount }
