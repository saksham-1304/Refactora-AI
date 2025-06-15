import { motion } from 'framer-motion';
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { HiDocumentText, HiArrowDownTray, HiShare, HiHandThumbUp, HiHandThumbDown, HiArrowPath } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from './GlassCard';

const ReviewPanel = ({ review, isLoading, onRegenerate }) => {
  const { isDark } = useTheme();

  const downloadReview = () => {
    const blob = new Blob([review], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-review.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareReview = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'AI Code Review',
        text: review,
      });
    } else {
      await navigator.clipboard.writeText(review);
    }
  };

  return (
    <GlassCard className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b transition-colors duration-300 ${isDark ? 'border-white/10' : 'border-black/10'
        }`}>
        <div className="flex items-center gap-3">
          <HiDocumentText className="w-5 h-5 text-emerald-400" />
          <h2 className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>AI Review</h2>
        </div>

        {review && !isLoading && (
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegenerate}
              className={`p-2 rounded-lg border transition-colors duration-300 ${isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}
              title="Regenerate review"
            >
              <HiArrowPath className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadReview}
              className={`p-2 rounded-lg border transition-colors duration-300 ${isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}
              title="Download review"
            >
              <HiArrowDownTray className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareReview}
              className={`p-2 rounded-lg border transition-colors duration-300 ${isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}
              title="Share review"
            >
              <HiShare className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className={`h-full overflow-y-auto pr-2 transition-colors duration-300 ${isDark
          ? 'scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50'
          : 'scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent hover:scrollbar-thumb-black/50'
          }`}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 w-12 h-12 border-4 border-purple-500/30 border-b-purple-500 rounded-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                    }`}>Analyzing Your Code</h3>
                  <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>Our AI is reviewing your code for quality, bugs, and improvements...</p>
                </div>
              </motion.div>
            </div>
          ) : review ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className={`prose prose-sm max-w-none transition-colors duration-300  ${isDark ? 'prose-invert text-gray-100' : 'prose-light text-gray-900'
                }`}>
                <Markdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    p: ({ children }) => <p className={`mb-4 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}>{children}</p>,
                    h1: ({ children }) => <h1 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                      }`}>{children}</h1>,
                    h2: ({ children }) => <h2 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                      }`}>{children}</h2>,
                    h3: ({ children }) => <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                      }`}>{children}</h3>,
                    h4: ({ children }) => <h4 className={`text-base font-medium mb-2 transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-800'
                      }`}>{children}</h4>,
                    li: ({ children }) => <li className={`mb-1 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}>{children}</li>,
                    ul: ({ children }) => <ul className={`mb-4 pl-6 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}>{children}</ul>,
                    ol: ({ children }) => <ol className={`mb-4 pl-6 transition-colors duration-300 ${isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}>{children}</ol>,
                    strong: ({ children }) => <strong className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                      }`}>{children}</strong>,
                    em: ({ children }) => <em className={`transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>{children}</em>,
                    blockquote: ({ children }) => <blockquote className={`border-l-4 border-violet-500 pl-4 my-4 italic transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>{children}</blockquote>,
                  }}
                >
                  {review}
                </Markdown>
              </div>

            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                  <HiDocumentText className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>Ready for Review</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  Paste your code in the editor and click "Review Code" to get instant AI-powered feedback on quality, bugs, performance, and best practices.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ReviewPanel;