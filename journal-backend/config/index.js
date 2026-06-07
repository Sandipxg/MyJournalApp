module.exports = {
  // Number of salt rounds for bcrypt (higher = more secure but slower)
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,

  // JWT secret for signing tokens
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-prod'
}
