# 🤖 AI-Code-Reviewer

A modern, full-stack web application that leverages Google's Gemini AI to provide intelligent code reviews and feedback. Get instant, expert-level code analysis with suggestions for improvements, bug detection, and best practices - all in your browser.

## 📋 Table of Contents

- [🔍 Overview](#overview)
- [✨ Features](#features)  
- [💻 Tech Stack](#tech-stack)
- [🏗️ Architecture](#architecture)
- [🚀 Getting Started](#getting-started)
- [📁 Project Structure](#project-structure)
- [📚 API Documentation](#api-documentation)
- [🔧 Environment Setup](#environment-setup)
- [🔄 Development Workflow](#development-workflow)
- [🚀 Deployment](#deployment)
- [👥 Contributing](#contributing)
- [📄 License](#license)

## Overview

AI-Code-Reviewer is designed to help developers improve their code quality by providing instant AI-powered code reviews. The application features a clean, modern interface with a split-pane design - code editor on the left and AI review results on the right. Simply paste your code, click "Review", and receive detailed feedback within seconds.

## Features

- 🖋️ **Interactive Code Editor** - Syntax highlighting with PrismJS
- 🤖 **AI-Powered Reviews** - Leverages Google Gemini 2.0 Flash model
- 📊 **Comprehensive Analysis** - Code quality, bugs, performance, security
- 🎨 **Modern UI/UX** - Responsive design with Tailwind CSS
- ⚡ **Real-time Feedback** - Instant loading states and error handling
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔄 **Scrollable Interface** - Custom scrollbars for both editor and review panes
- 🎯 **Expert-Level Reviews** - 7+ years experience equivalent feedback

## Tech Stack

### Frontend Stack
- **React 19** - Latest React with modern hooks and features
- **Vite 6** - Next-generation frontend tooling for fast development
- **Tailwind CSS 4** - Utility-first CSS framework for rapid styling
- **React Simple Code Editor** - Lightweight code editor with syntax highlighting
- **PrismJS** - Syntax highlighting for multiple programming languages
- **React Markdown** - Render markdown responses from AI
- **Rehype Highlight** - Code syntax highlighting in markdown
- **Axios** - Promise-based HTTP client for API requests

### Backend Stack
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **Google Generative AI** - Integration with Gemini 2.0 Flash model
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Auto-restart server during development
- **Git** - Version control system

## Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   React Frontend │ ◄──────────────► │  Express Backend │
│   (Port 5173)   │                  │   (Port 5000)   │
└─────────────────┘                  └─────────────────┘
         │                                     │
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│   Code Editor   │                  │  Google Gemini  │
│   + UI/UX       │                  │   AI Service    │
└─────────────────┘                  └─────────────────┘
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **Git** for version control
- **Google Gemini API Key** (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI-Code-Reviewer.git
   cd AI-Code-Reviewer
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Install backend dependencies
   cd BackEnd
   npm install
   
   # Install frontend dependencies
   cd ../Frontend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Navigate to backend directory
   cd ../BackEnd
   
   # Create environment file
   # Add your Google Gemini API key
   echo "PORT=5000" > .env
   echo "GOOGLE_GEMINI_KEY=your_api_key_here" >> .env
   ```

4. **Start the application**
   ```bash
   # Terminal 1: Start Backend Server
   cd BackEnd
   npm run dev
   
   # Terminal 2: Start Frontend Development Server
   cd Frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
AI-Code-Reviewer/
├── 📂 Frontend/                 # React application
│   ├── 📂 public/              # Static assets
│   ├── 📂 src/                 # Source code
│   │   ├── App.jsx             # Main application component
│   │   ├── main.jsx            # Application entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── index.html              # HTML template
│   └── README.md               # Frontend documentation
├── 📂 BackEnd/                 # Node.js/Express server
│   ├── 📂 src/                 # Source code
│   │   ├── 📂 controllers/     # Request handlers
│   │   │   └── ai.controller.js
│   │   ├── 📂 routes/          # API routes
│   │   │   └── ai.routes.js
│   │   ├── 📂 services/        # Business logic
│   │   │   └── ai.service.js
│   │   └── app.js              # Express app configuration
│   ├── server.js               # Server entry point
│   ├── package.json            # Backend dependencies
│   └── README.md               # Backend documentation
├── .gitignore                  # Git ignore rules
└── README.md                   # Main project documentation
```

## API Documentation

### Code Review Endpoint

**POST** `/ai/get-review`

**Request Body:**
```json
{
  "code": "function example() {\n  return 'Hello World';\n}"
}
```

**Response:**
```markdown
# Code Review Results

## 🔍 Analysis Overview
Your code is functional but could benefit from improvements...

## ❌ Issues Found
- Missing error handling
- No input validation

## ✅ Recommendations
- Add try-catch blocks
- Implement proper validation
...
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (missing code)
- `500` - Internal Server Error

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `BackEnd` directory:

```bash
# Server Configuration
PORT=5000

# Google Gemini AI Configuration
GOOGLE_GEMINI_KEY=your_api_key_here
```

### Getting Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

## Development Workflow

### Frontend Development
```bash
cd Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd BackEnd
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
```

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Deploy dist/ folder to your hosting provider
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd BackEnd
# Set environment variables on your hosting platform
# Deploy using git or platform-specific CLI
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Update CORS origins for production domains
- Use production-grade Google Gemini API limits

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Follow coding standards**
5. **Test your changes**
6. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Write clear commit messages

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 **Email**: sakshamsinghrathore1304@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/sakshamsinghrathore/AI-Code-Reviewer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/sakshamsinghrathore/AI-Code-Reviewer/discussions)

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the AI model
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Open Source Community** for the incredible tools and libraries

---

<div align="center">
  <strong>Made with ❤️ by developers, for developers</strong><br>
  <em>Created and maintained by sakshamsinghrathore1304@gmail.com</em>
</div>
