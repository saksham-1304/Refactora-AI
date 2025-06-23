const express = require('express');
const path = require('path');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

// Configure CORS for production and development


app.use(cors())
app.use(express.json())

// Serve static files from the Frontend dist directory
app.use(express.static(path.join(__dirname, '../../Frontend/dist')))

app.get('/', (req, res) => {
    res.json({ message: 'AI Code Reviewer API is running!' })
})

app.use('/ai', aiRoutes)

// Serve the frontend for any non-API routes (for SPA routing)
app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/ai')) {
        return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(__dirname, '../../Frontend/dist/index.html'))
})

module.exports = app