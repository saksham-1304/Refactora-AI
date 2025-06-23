const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

// Configure CORS for production and development


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'AI Code Reviewer API is running!' })
})

app.use('/ai', aiRoutes)

module.exports = app