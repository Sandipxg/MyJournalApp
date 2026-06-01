const authService = require('../services/authService')

function signup(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }

  try {
    const user = authService.signup(username, password)
    res.status(201).json(user)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }

  try {
    const user = authService.login(username, password)
    res.json(user)
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

function deleteAccount(req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }

  try {
    const user = authService.deleteAccount(username, password)
    res.json(user)
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

module.exports = { signup, login, deleteAccount }
