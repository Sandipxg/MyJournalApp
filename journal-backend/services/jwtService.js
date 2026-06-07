const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

/**
 * Generate a signed JWT containing the given payload.
 * @param {Object} payload - e.g. { userId: 'abc123' }
 * @param {string|number} [expiresIn='7d'] - token lifetime
 * @returns {string} signed token
 */
function sign(payload, expiresIn = '7d') {
  return jwt.sign(payload, jwtSecret, { expiresIn })
}

/**
 * Verify a token and return its decoded payload.
 * Throws an error if verification fails.
 * @param {string} token
 * @returns {Object} decoded payload
 */
function verify(token) {
  return jwt.verify(token, jwtSecret)
}

module.exports = { sign, verify }
