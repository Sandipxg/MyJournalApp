const express = require('express')
const cors = require('cors')

const authRoutes    = require('./routes/auth')
const journalRoutes = require('./routes/journals')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()
const PORT = 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/journals', journalRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Journal API running on http://localhost:${PORT}`))
