const authService = require('../services/authService')
const AppError = require('../utils/AppError')
const { sign } = require('../services/jwtService')

const isProd = process.env.NODE_ENV === 'production'
const cookieOptions = {
  httpOnly: true,
  secure: isProd || process.env.COOKIE_SECURE === 'true',
  sameSite: process.env.COOKIE_SAME_SITE || (isProd ? 'none' : 'strict'),
  maxAge: 7 * 24 * 60 * 60 * 1000
}

async function signup(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    throw new AppError('username and password required', 400)
  }

  const user = await authService.signup(username, password)
  // Sign and set the JWT cookie so the user is auto-logged in upon signup
  const token = sign({ userId: user.id })
  res.cookie('jwt', token, cookieOptions)
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
  // Set JWT as httpOnly cookie
  res.cookie('jwt', token, cookieOptions)
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
  const { maxAge, ...clearOptions } = cookieOptions
  res.clearCookie('jwt', clearOptions)
  res.json({ message: 'Logged out successfully' })
}

module.exports = { signup, login, deleteAccount, logout }
