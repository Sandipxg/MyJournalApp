const crypto = require('crypto')
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

async function updateReminder(req, res) {
  const { reminderTime, timezone } = req.body
  const userId = req.userId

  // Validate reminderTime if provided
  if (reminderTime !== null && typeof reminderTime === 'string') {
    const timeRegex = /^\d{2}:\d{2}$/
    if (!timeRegex.test(reminderTime)) {
      throw new AppError('Invalid reminder time format. Expected HH:MM or null', 400)
    }
  }

  // Validate timezone if provided
  if (timezone && typeof timezone === 'string') {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone })
    } catch (err) {
      throw new AppError('Invalid timezone identifier', 400)
    }
  }

  const updatedUser = await authService.updateReminder(
    userId,
    reminderTime || null,
    timezone || 'UTC'
  )

  res.json(updatedUser)
}

async function googleAuth(req, res) {
  const state = crypto.randomBytes(16).toString('hex')
  res.cookie('oauth_state', state, {
    httpOnly: true,
    secure: isProd || process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000
  })

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  googleAuthUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID)
  googleAuthUrl.searchParams.set('redirect_uri', process.env.GOOGLE_CALLBACK_URL)
  googleAuthUrl.searchParams.set('response_type', 'code')
  googleAuthUrl.searchParams.set('scope', 'openid email profile')
  googleAuthUrl.searchParams.set('state', state)

  res.redirect(googleAuthUrl.toString())
}

async function googleCallback(req, res) {
  const { code, state } = req.query
  const savedState = req.cookies?.oauth_state

  res.clearCookie('oauth_state', {
    httpOnly: true,
    secure: isProd || process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax'
  })

  if (!state || !savedState || state !== savedState) {
    throw new AppError('Invalid state parameter (anti-forgery check failed)', 400)
  }

  if (!code) {
    throw new AppError('Authorization code missing', 400)
  }

  // Exchange auth code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code'
    })
  })

  if (!tokenRes.ok) {
    const errorData = await tokenRes.json().catch(() => ({}))
    console.error('Google token exchange failed:', errorData)
    throw new AppError('Failed to exchange authorization code for tokens', 500)
  }

  const tokens = await tokenRes.json()

  // Get user profile details
  const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` }
  })

  if (!userRes.ok) {
    throw new AppError('Failed to fetch user details from Google', 500)
  }

  const googleUser = await userRes.json()

  if (!googleUser.email) {
    throw new AppError('Google account email is required', 400)
  }

  // Find or create local user
  const user = await authService.findOrCreateGoogleUser(googleUser.sub, googleUser.email)

  // Sign app JWT and set cookie
  const token = sign({ userId: user.id })
  res.cookie('jwt', token, cookieOptions)

  // Redirect to frontend
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/journals`)
}

async function getMe(req, res) {
  const user = await authService.getMe(req.userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }
  res.json(user)
}

module.exports = {
  signup,
  login,
  deleteAccount,
  logout,
  updateReminder,
  googleAuth,
  googleCallback,
  getMe,
}
