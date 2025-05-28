# 🚀 AI Code Reviewer - Backend

A robust Node.js/Express API server that integrates with Google's Gemini AI to provide intelligent code reviews. Features a clean architecture with proper separation of concerns and comprehensive error handling.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Configuration](#environment-configuration)
- [Google Gemini Integration](#google-gemini-integration)
- [Development Scripts](#development-scripts)
- [Error Handling](#error-handling)
- [Security](#security)
- [Performance](#performance)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## 🔍 Overview

The backend serves as the API layer between the React frontend and Google's Gemini AI service. It processes code review requests, communicates with the AI model, and returns formatted feedback to the client.

### Key Responsibilities
- **API Endpoints** - RESTful API for code review requests
- **AI Integration** - Communication with Google Gemini 2.0 Flash
- **Request Processing** - Input validation and sanitization
- **Response Formatting** - Structure AI responses for frontend consumption
- **Error Management** - Comprehensive error handling and logging
- **CORS Handling** - Cross-origin request management

## 💻 Tech Stack

### Core Framework
- **Node.js** (v18+) - JavaScript runtime environment
- **Express.js 4.21.2** - Fast, minimalist web framework
- **JavaScript (ES2022)** - Modern JavaScript with async/await

### AI Integration
- **@google/generative-ai 0.21.0** - Official Google Gemini SDK
- **Gemini 2.0 Flash Model** - Latest high-performance AI model

### Middleware & Utilities
- **CORS 2.8.5** - Cross-Origin Resource Sharing
- **dotenv 16.4.7** - Environment variable management
- **Express.json()** - Built-in JSON body parser

### Development Tools
- **Nodemon 3.1.10** - Auto-restart during development
- **npm Scripts** - Build and development automation

## ✨ Features

### API Capabilities
- 🔗 **RESTful API** - Clean, predictable endpoints
- 📝 **Code Review Processing** - Handle code analysis requests
- 🤖 **AI Integration** - Seamless Google Gemini communication
- 🔄 **Real-time Processing** - Fast response times
- 📊 **Structured Responses** - Consistent API response format

### System Features
- 🛡️ **Input Validation** - Sanitize and validate incoming requests
- 🌐 **CORS Support** - Cross-origin requests from frontend
- 📈 **Error Handling** - Comprehensive error management
- ⚡ **Performance** - Optimized for speed and efficiency
- 🔧 **Environment Config** - Flexible configuration management

### AI Review Capabilities
- 📋 **Code Quality Analysis** - Comprehensive code evaluation
- 🐛 **Bug Detection** - Identify potential issues and bugs
- 🚀 **Performance Tips** - Optimization suggestions
- 🔒 **Security Review** - Security vulnerability detection
- 📚 **Best Practices** - Industry standard recommendations
- 🔧 **Refactoring Suggestions** - Code improvement ideas

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Quick Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Google Gemini API key

# Start development server
npm run dev

# Server will run on http://localhost:5000
```

### Verify Installation
```bash
# Test server is running
curl http://localhost:5000

# Expected response: "Hello World"
```

## 📁 Project Structure

```
Backend/
├── 📂 src/                    # Source code directory
│   ├── 📂 controllers/        # Request handlers
│   │   └── ai.controller.js   # AI-related route handlers
│   ├── 📂 routes/             # API route definitions
│   │   └── ai.routes.js       # AI service routes
│   ├── 📂 services/           # Business logic layer
│   │   └── ai.service.js      # Google Gemini integration
│   └── app.js                 # Express app configuration
├── 📄 server.js               # Server entry point
├── 📄 package.json            # Dependencies and scripts
├── 📄 .env.example            # Environment variables template
├── 📄 .env                    # Environment configuration (git-ignored)
└── 📄 README.md               # This documentation
```

### Architecture Overview
```
Request Flow:
Client → Express Router → Controller → Service → Google Gemini → Response

┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Frontend  │───▶│   Express    │───▶│ Controller  │───▶│   Service    │
│   Request   │    │   Router     │    │  Layer      │    │   Layer      │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
                                                                    │
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Frontend  │◄───│   Express    │◄───│ Controller  │◄───│   Google     │
│   Response  │    │   Response   │    │  Response   │    │   Gemini     │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
"Hello World"
```

#### 2. Get Code Review
```http
POST /ai/get-review
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "function example() {\n  return 'Hello World';\n}"
}
```

**Response (Success - 200):**
```markdown
# Code Review Results

## 🔍 Analysis Overview
Your JavaScript function is simple but functional...

## ❌ Issues Found
1. **Missing Error Handling** - No try-catch blocks
2. **No Input Validation** - Function doesn't validate inputs

## ✅ Recommendations
1. Add proper error handling
2. Implement input validation
3. Add JSDoc comments

## 💡 Improved Code
```javascript
/**
 * Returns a greeting message
 * @returns {string} Greeting message
 */
function example() {
  try {
    return 'Hello World';
  } catch (error) {
    console.error('Error in example function:', error);
    return null;
  }
}
```

**Response (Error - 400):**
```json
"Code is required"
```

**Response (Error - 500):**
```json
{
  "error": "Internal server error",
  "message": "Error details..."
}
```

### Request/Response Examples

**Valid Request:**
```bash
curl -X POST http://localhost:5000/ai/get-review \
  -H "Content-Type: application/json" \
  -d '{"code": "const add = (a, b) => a + b;"}'
```

**Invalid Request (Missing Code):**
```bash
curl -X POST http://localhost:5000/ai/get-review \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 🔧 Environment Configuration

### Required Environment Variables

Create `.env` file in the Backend directory:

```bash
# Server Configuration
PORT=5000

# Google Gemini AI Configuration
GOOGLE_GEMINI_KEY=your_actual_api_key_here

# Optional Configuration
NODE_ENV=development
LOG_LEVEL=info
```

### Environment Variable Details

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | Yes | 5000 |
| `GOOGLE_GEMINI_KEY` | Google Gemini API key | Yes | None |
| `NODE_ENV` | Environment mode | No | development |
| `LOG_LEVEL` | Logging level | No | info |

### Getting Google Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

2. **Sign In**
   - Use your Google account

3. **Create API Key**
   - Click "Create API Key"
   - Select a Google Cloud project or create new

4. **Copy and Secure**
   - Copy the generated API key
   - Add to your `.env` file
   - Never commit the key to version control

## 🤖 Google Gemini Integration

### AI Service Configuration

The AI service is configured with a comprehensive system instruction that gives the model the persona of a senior developer with 7+ years of experience.

**Model Configuration:**
```javascript
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `Expert code reviewer with 7+ years experience...`
});
```

### System Instruction Details

The AI model is instructed to:
- **Analyze code quality** and structure
- **Detect bugs and issues** proactively
- **Suggest improvements** with examples
- **Follow best practices** and industry standards
- **Provide security recommendations**
- **Optimize for performance** and maintainability

### Response Format

The AI provides responses in markdown format with:
- **Overview** - General code assessment
- **Issues Found** - Specific problems identified
- **Recommendations** - Actionable improvement suggestions
- **Code Examples** - Refactored code snippets
- **Best Practices** - Industry standard advice

## 📜 Development Scripts

```bash
# Development
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server

# Package Management
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Security audit
```

### Script Details

**Development Mode (`npm run dev`):**
- Uses nodemon for auto-restart
- Watches for file changes
- Provides detailed error logging
- Suitable for active development

**Production Mode (`npm start`):**
- Runs server with standard Node.js
- Optimized for production environment
- Minimal logging for performance

## 🛡️ Error Handling

### Error Types and Handling

**1. Validation Errors (400)**
```javascript
if (!code) {
    return res.status(400).send("Code is required");
}
```

**2. AI Service Errors (500)**
```javascript
try {
    const response = await aiService(code);
    res.send(response);
} catch (error) {
    console.error('AI Service Error:', error);
    res.status(500).json({
        error: 'AI service unavailable',
        message: error.message
    });
}
```

**3. Network Errors**
- Connection timeouts
- Rate limiting
- API quota exceeded

### Error Response Format
```json
{
  "error": "Error type",
  "message": "Detailed error description",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security

### Implemented Security Measures

**1. CORS Configuration**
```javascript
app.use(cors()); // Configure for production
```

**2. Input Validation**
- Required field validation
- Input sanitization
- Request size limits

**3. Environment Security**
- API keys in environment variables
- No sensitive data in code
- .env files git-ignored

### Production Security Recommendations

**1. CORS Configuration**
```javascript
app.use(cors({
    origin: ['https://yourdomain.com'],
    credentials: true
}));
```

**2. Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));
```

**3. Input Validation**
```javascript
const { body, validationResult } = require('express-validator');
```

## ⚡ Performance

### Current Optimizations
- **Async/Await** - Non-blocking request handling
- **Efficient Routing** - Minimal middleware overhead
- **Error Caching** - Prevent repeated failed requests
- **Connection Pooling** - Reuse HTTP connections

### Performance Monitoring
```javascript
// Add timing middleware
app.use((req, res, next) => {
    req.startTime = Date.now();
    next();
});
```

### Scaling Considerations
- **Load Balancing** - Multiple server instances
- **Caching** - Redis for repeated requests
- **Database** - Add database for request logging
- **Queue System** - Handle high volume requests

## 🚀 Deployment

### Production Deployment Options

**1. Railway (Recommended)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

**2. Heroku**
```bash
# Install Heroku CLI and deploy
heroku create your-app-name
git push heroku main
```

**3. DigitalOcean App Platform**
```bash
# Use GitHub integration
# Configure environment variables in dashboard
```

**4. VPS/Cloud Server**
```bash
# Clone repository
git clone <your-repo>
cd Backend

# Install dependencies
npm install --production

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name "ai-code-reviewer"
```

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=443
GOOGLE_GEMINI_KEY=your_production_key
CORS_ORIGIN=https://yourdomain.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring

### Health Checks
```javascript
// Add health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
```

### Logging
```javascript
// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
```

### Metrics to Monitor
- **Response Times** - API endpoint performance
- **Error Rates** - Failed request percentage
- **AI API Usage** - Gemini API quota consumption
- **Memory Usage** - Server resource utilization

## 🐛 Troubleshooting

### Common Issues and Solutions

**1. Server Won't Start**
```bash
# Error: Port already in use
# Solution: Kill process or change port
lsof -ti:5000 | xargs kill -9
# Or change PORT in .env file
```

**2. Google Gemini API Errors**
```bash
# Error: Invalid API key
# Solution: Verify API key in .env file
echo $GOOGLE_GEMINI_KEY

# Error: Quota exceeded
# Solution: Check Google Cloud console for usage
```

**3. CORS Errors**
```bash
# Error: CORS policy blocks request
# Solution: Check CORS configuration
# Ensure frontend URL is allowed
```

**4. Module Not Found**
```bash
# Error: Cannot find module
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Debugging Tips

**Enable Debug Logging:**
```javascript
// Add to ai.controller.js
console.log('Received code:', code);
console.log('AI response:', response);
```

**Test API Endpoints:**
```bash
# Test health endpoint
curl http://localhost:5000

# Test code review endpoint
curl -X POST http://localhost:5000/ai/get-review \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"test\")"}'
```

**Check Environment Variables:**
```bash
# Print environment variables (be careful with sensitive data)
node -e "console.log(process.env.PORT, process.env.GOOGLE_GEMINI_KEY ? 'SET' : 'NOT SET')"
```

### Log Analysis
```bash
# Monitor server logs in real-time
npm run dev | grep ERROR

# Check specific error patterns
grep -i "error" server.log
```

## 📚 Additional Resources

- **Node.js Documentation**: https://nodejs.org/docs
- **Express.js Guide**: https://expressjs.com/guide
- **Google Gemini AI**: https://ai.google.dev/docs
- **API Best Practices**: https://restfulapi.net/
- **Node.js Security**: https://nodejs.org/en/security/

## 🤝 Contributing to Backend

### Code Style Guidelines
- Use `async/await` for asynchronous operations
- Follow RESTful API conventions
- Add proper error handling
- Use descriptive function names
- Comment complex business logic

### Adding New Features
1. Create new route in `routes/`
2. Add controller logic in `controllers/`
3. Implement business logic in `services/`
4. Add proper error handling
5. Update API documentation

### Testing
```bash
# Add tests (recommended)
npm install --save-dev jest supertest
npm test
```

---

<div align="center">
  <strong>Backend powered by 🚀 Node.js + 🤖 Google Gemini AI</strong>
</div>
