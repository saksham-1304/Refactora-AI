import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";

import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import ReviewPanel from './components/ReviewPanel';
import StatsPanel from './components/StatsPanel';

function App() {
  const [content, setContent] = useState(`function calculateFactorial(n) {
  if (n <= 1) return 1;
  return n * calculateFactorial(n - 1);
}

// Example usage
console.log(calculateFactorial(5)); // Output: 120`);
  
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalReviews: 0,
    avgTime: '0s',
    issuesFound: 0,
    improvements: 0
  });

  // Load stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem('aiCodeReviewerStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('aiCodeReviewerStats', JSON.stringify(stats));
  }, [stats]);

  const reviewCode = async () => {
    if (!content.trim()) {
      setReview('Please enter some code to review.');
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      const response = await axios.post('http://localhost:5000/ai/get-review', {
        code: content
      });
      
      const endTime = Date.now();
      const reviewTime = ((endTime - startTime) / 1000).toFixed(1);
      
      setReview(response.data);
      
      // Update stats
      const issuesCount = (response.data.match(/❌|⚠️|🐛/g) || []).length;
      const improvementsCount = (response.data.match(/✅|💡|🚀/g) || []).length;
      
      setStats(prevStats => ({
        totalReviews: prevStats.totalReviews + 1,
        avgTime: `${reviewTime}s`,
        issuesFound: prevStats.issuesFound + issuesCount,
        improvements: prevStats.improvements + improvementsCount
      }));
      
    } catch (error) {
      console.error('Error getting review:', error);
      setReview('❌ **Error**: Unable to get review. Please check if the backend server is running and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateReview = () => {
    reviewCode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Stats Panel */}
          <StatsPanel stats={stats} />
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <CodeEditor
              content={content}
              setContent={setContent}
              onReview={reviewCode}
              isLoading={isLoading}
            />
            
            <ReviewPanel
              review={review}
              isLoading={isLoading}
              onRegenerate={regenerateReview}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;