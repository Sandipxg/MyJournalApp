const authService = require('../services/authService')
const AppError = require('../utils/AppError')
const { sign } = require('../services/jwtService')

async function signup(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.signup(username, password)
  // Sign and set the JWT cookie so the user is auto-logged in upon signup
  const token = sign({ userId: user.id })
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })
  res.status(201).json(user)
}

async function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.login(username, password)
  // sign a JWT containing the user's id
  const token = sign({ userId: user.id })
  // Set JWT as httpOnly cookie (dev: not secure, adjust in prod)
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })
  res.json({ token, user })
}

async function deleteAccount(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.deleteAccount(username, password)
  res.json(user)
}

async function logout(req, res) {
  // Clear the httpOnly JWT cookie set during login
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict' })
  res.json({ message: 'Logged out successfully' })
}

module.exports = { signup, login, deleteAccount, logout }
