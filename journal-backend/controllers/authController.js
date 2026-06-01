const authService = require('../services/authService')
const AppError = require('../utils/AppError')

function signup(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = authService.signup(username, password)
  res.status(201).json(user)
}

function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = authService.login(username, password)
  res.json(user)
}

function deleteAccount(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = authService.deleteAccount(username, password)
  res.json(user)
}

module.exports = { signup, login, deleteAccount }
