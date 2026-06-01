const express = require('express')
const cors = require('cors')

const authRoutes    = require('./routes/auth')
const journalRoutes = require('./routes/journals')

const app = express()
const PORT = 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/journals', journalRoutes)

app.listen(PORT, () => console.log(`Journal API running on http://localhost:${PORT}`))
