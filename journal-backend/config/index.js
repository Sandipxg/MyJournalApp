module.exports = {
  // Number of salt rounds for bcrypt (higher = more secure but slower)
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,

  // JWT secret will be added later when JWT is implemented
  // jwtSecret: process.env.JWT_SECRET || 'change-me-in-prod'
}
