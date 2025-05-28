# 🎨 AI Code Reviewer - Frontend

A modern React application built with Vite that provides an intuitive interface for AI-powered code reviews. Features a split-pane design with a code editor and markdown review display.

## 📋 Table of Contents

- [🔍 Overview](#overview)
- [💻 Tech Stack](#tech-stack)
- [✨ Features](#features)
- [🚀 Getting Started](#getting-started)
- [📁 Project Structure](#project-structure)
- [🏗️ Component Architecture](#component-architecture)
- [🎨 Styling Guide](#styling-guide)
- [📜 Development Scripts](#development-scripts)
- [🚀 Build & Deployment](#build--deployment)
- [⚡ Performance Optimization](#performance-optimization)
- [🐛 Troubleshooting](#troubleshooting)

## 🔍 Overview

The frontend is a single-page React application that provides:
- **Code Editor**: Syntax-highlighted code input with PrismJS
- **Review Display**: Markdown-rendered AI feedback with syntax highlighting
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Live preview and instant feedback

## 💻 Tech Stack

### Core Framework
- **React 19.0.0** - Latest React with concurrent features
- **Vite 6.1.0** - Next-generation frontend build tool
- **JavaScript (ES2022)** - Modern JavaScript features

### Styling & UI
- **Tailwind CSS 4.1.7** - Utility-first CSS framework
- **@tailwindcss/vite** - Vite integration for Tailwind
- **Custom CSS** - Additional styling for specific components

### Code Editor & Highlighting
- **react-simple-code-editor 0.14.1** - Lightweight code editor
- **PrismJS 1.29.0** - Syntax highlighting engine
- **prismjs/themes/prism-tomorrow.css** - Dark theme for code

### Markdown & Content
- **react-markdown 9.0.3** - Render markdown content
- **rehype-highlight 7.0.2** - Syntax highlighting in markdown
- **highlight.js 11.11.1** - Additional syntax highlighting
- **highlight.js/styles/github-dark.css** - Dark theme for markdown code

### HTTP Client
- **Axios 1.7.9** - Promise-based HTTP client for API calls

### Development Tools
- **ESLint** - Code linting with React-specific rules
- **Vite DevTools** - Fast HMR and development experience

## ✨ Features

### User Interface
- 🎨 **Split-Pane Layout** - Code editor and review side-by-side
- 🌙 **Dark Theme** - Professional dark color scheme
- 📱 **Responsive Design** - Adapts to different screen sizes
- 🔄 **Custom Scrollbars** - Styled scrollbars for better UX

### Code Editor
- 🖋️ **Syntax Highlighting** - JavaScript syntax highlighting with PrismJS
- ⌨️ **Code Editing** - Full code editing capabilities
- 📝 **Fira Code Font** - Monospace font for better readability
- 🎯 **Live Updates** - Real-time syntax highlighting

### Review Display
- 📄 **Markdown Rendering** - Rich text display of AI reviews
- 🎯 **Code Highlighting** - Syntax highlighting in code blocks
- 📏 **Readable Typography** - Optimized text size and spacing
- 🔄 **Scrollable Content** - Handle long reviews gracefully

### Interactions
- ⏳ **Loading States** - Visual feedback during API calls
- 🚨 **Error Handling** - Graceful error messages
- 🎯 **One-Click Review** - Simple review trigger button
- ✨ **Smooth Animations** - Loading spinners and transitions

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)

### Installation
```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Environment Setup
The frontend automatically connects to the backend at `http://localhost:5000`. If your backend runs on a different port, update the API URL in `App.jsx`:

```javascript
const response = await axios.post('http://localhost:YOUR_PORT/ai/get-review', {
  code: content
});
```

## 📁 Project Structure

```
Frontend/
├── 📂 public/                  # Static assets
├── 📂 src/                    # Source code
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # React DOM entry point
│   └── index.css              # Global styles and Tailwind imports
├── 📄 index.html              # HTML template
├── 📄 package.json            # Dependencies and scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 eslint.config.js        # ESLint configuration
├── 📄 .gitignore              # Git ignore patterns
└── 📄 README.md               # This file
```

## 🏗️ Component Architecture

### App.jsx - Main Component
```javascript
// State Management
const [content, setContent] = useState()      // Code editor content
const [review, setReview] = useState()        # AI review response
const [isLoading, setIsLoading] = useState()  // Loading state

// Core Functions
updateContent()    // Handle code editor changes
reviewCode()       // Send code to backend API

// Render Structure
├── Editor Container (Left Pane)
│   ├── Code Editor (react-simple-code-editor)
│   └── Review Button
└── Review Container (Right Pane)
    ├── Loading Spinner (when isLoading)
    └── Markdown Content (react-markdown)
```

### Key Components Integration

**Code Editor Setup:**
```javascript
<Editor
  value={content}
  onValueChange={updateContent}
  highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
  style={{
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 16,
    backgroundColor: "#0c0c0c",
    // ... styling options
  }}
/>
```

**Markdown Rendering:**
```javascript
<Markdown rehypePlugins={[rehypeHighlight]}>
  {review}
</Markdown>
```

## 🎨 Styling Guide

### Tailwind CSS Classes Used

**Layout Classes:**
- `h-dvh` - Full viewport height
- `flex`, `flex-col` - Flexbox layouts
- `gap-4` - Spacing between elements
- `p-4`, `px-8` - Padding utilities

**Background Colors:**
- `bg-black` - Editor background (#000000)
- `bg-[#343434]` - Review panel background
- `bg-violet-100` - Button background

**Scrollbar Styling:**
```css
scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700
```

**Text Colors:**
- `text-gray-100` - Main text color
- `text-violet-100` - Loading text
- `text-black` - Button text

### Custom Styles
Additional styles are defined inline for:
- Code editor background (`#0c0c0c`) and text colors
- Font family for monospace display
- Scrollbar behavior and appearance
- Loading spinner animations

## 📜 Development Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint on all files
```

### Script Details

**Development Server:**
- Runs on `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Fast refresh for React components

**Build Process:**
- Optimizes assets for production
- Generates static files in `dist/` directory
- Tree-shaking for smaller bundle size

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

**Build Output:**
- `dist/` directory contains all production files
- Assets are optimized and minified
- Source maps available for debugging

### Deployment Options

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Netlify:**
```bash
# Build locally
npm run build

# Upload dist/ folder to Netlify
```

**Static Hosting:**
- Upload `dist/` folder to any static hosting service
- Configure server to serve `index.html` for all routes

## ⚡ Performance Optimization

### Implemented Optimizations
- **Vite HMR** - Fast development experience
- **Code Splitting** - Automatic bundle optimization
- **Tree Shaking** - Remove unused code
- **Asset Optimization** - Compressed images and fonts

### Performance Best Practices
- **Efficient Re-renders** - Optimized state updates
- **CSS-in-JS Avoidance** - Using Tailwind for better performance
- **Bundle Size Monitoring** - Keep dependencies minimal

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Error: Port 5173 is already in use
# Solution: Kill process or use different port
npm run dev -- --port 3000
```

**2. API Connection Failed**
```bash
# Error: Network Error
# Solution: Ensure backend is running on port 5000
cd ../BackEnd && npm run dev
```

**3. Styling Issues**
```bash
# Error: Tailwind classes not working
# Solution: Restart development server
npm run dev
```

**4. Code Highlighting Not Working**
```bash
# Error: No syntax highlighting
# Solution: Check PrismJS configuration
# Verify useEffect is triggering prism.highlightAll()
```

### Development Tips

**Hot Reload Issues:**
- Restart development server
- Clear browser cache
- Check for syntax errors in console

**Styling Problems:**
- Verify Tailwind CSS installation
- Check for conflicting CSS
- Use browser dev tools for debugging

**API Integration:**
- Check network tab for failed requests
- Verify backend is running
- Confirm API endpoint URLs

### Debug Mode
Enable additional logging:
```javascript
// Add to App.jsx for debugging
console.log('Code content:', content);
console.log('Review response:', review);
console.log('Loading state:', isLoading);
```

## 📚 Additional Resources

- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **PrismJS**: https://prismjs.com
- **React Markdown**: https://github.com/remarkjs/react-markdown

## 🤝 Contributing to Frontend

### Code Style Guidelines
- Use functional components with hooks
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Write descriptive variable names
- Add comments for complex logic

### Pull Request Process
1. Create feature branch
2. Make changes to frontend code
3. Test locally with backend
4. Ensure ESLint passes
5. Submit pull request

## 📧 Contact & Support

For questions, suggestions, or support:
- 📧 **Email**: sakshamsinghrathore1304@gmail.com
- 🐛 **Issues**: Use GitHub Issues for bug reports and feature requests
- 💬 **Discussions**: Join our community discussions for help and ideas

---

<div align="center">
  <strong>Frontend built with ⚛️ React + ⚡ Vite</strong><br>
  <em>Maintained by sakshamsinghrathore1304@gmail.com</em>
</div>
