const { verifyToken } = require('../services/jwtService')
const AppError = require('../utils/AppError')

/**
 * Express middleware that checks for a Bearer token, verifies it, and adds
 * `req.userId` for downstream handlers.
 */
function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Missing or malformed Authorization header', 401))
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = verifyToken(token)
    // payload is whatever we signed; we expect { userId }
    req.userId = payload.userId
    next()
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401))
  }
}

module.exports = auth
