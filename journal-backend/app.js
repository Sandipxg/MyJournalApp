const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')

const authRoutes = require('./routes/auth')
const journalRoutes = require('./routes/journals')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Serve interactive Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/auth', authRoutes)
app.use('/api/journals', journalRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
