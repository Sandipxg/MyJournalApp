const { z } = require('zod')

const signupSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores')
    .trim(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
})

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(1, 'Password is required')
})

module.exports = {
  signupSchema,
  loginSchema
}
