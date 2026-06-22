require('dotenv').config()

const app = require('./app')
const PORT = process.env.PORT || 3000
const connectDb = require('./config/db')
const { initScheduler } = require('./services/cronService')

async function startServer() {
    await connectDb()

    // Initialize the daily reminder scheduled cron service
    initScheduler()

    app.listen(PORT, () => console.log(`Journal API running on http://localhost:${PORT}`))
}

startServer().catch((error) => {
    console.error('Failed to start Journal API')
    console.error(error.message)

    if (error.code === 'ECONNREFUSED' && error.syscall === 'querySrv') {
        console.error('MongoDB Atlas SRV DNS lookup was refused.')
        console.error('Try adding MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1 to backend/.env, or switch your network DNS to Google/Cloudflare.')
    }

    process.exit(1)
})
