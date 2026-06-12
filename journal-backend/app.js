const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')

const authRoutes = require('./routes/auth')
const journalRoutes = require('./routes/journals')
const { notFound, errorHandler } = require('./middleware/errorHandler')

// Global limiter — all routes: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,   // sends RateLimit-* headers to client
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
})

// Auth limiter — login/signup only: 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again in 15 minutes.' }
})

const app = express()

// Security headers — must be first
app.use(helmet())
app.use(globalLimiter)
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(cors({ origin: allowedOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Serve interactive Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/journals', journalRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
