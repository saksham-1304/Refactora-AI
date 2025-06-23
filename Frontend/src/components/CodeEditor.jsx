import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import { HiClipboardDocument, HiArrowDownTray, HiArrowUpTray, HiCodeBracket, HiSparkles } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from './GlassCard';

const CodeEditor = ({ content, setContent, onReview, isLoading }) => {
  const { isDark } = useTheme();
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [content, language]);

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  return (
    <GlassCard className="h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b transition-colors duration-300 ${isDark ? 'border-white/10' : 'border-black/10'
        }`}>
        <div className="flex items-center gap-3">
          <HiCodeBracket className="w-5 h-5 text-violet-400" />
          <h2 className={`font-semibold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>Code Editor</h2>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-colors duration-300 ${isDark
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-black/5 border-black/10 text-gray-900'
              }`}
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                {lang.label}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className={`p-2 rounded-lg border transition-colors duration-300 ${isDark
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-black/5 border-black/10 hover:bg-black/10'
              }`}
            title="Copy code"
          >
            <HiClipboardDocument className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCode}
            className={`p-2 rounded-lg border transition-colors duration-300 ${isDark
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-black/5 border-black/10 hover:bg-black/10'
              }`}
            title="Download code"
          >
            <HiArrowDownTray className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
          </motion.button>

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg border transition-colors duration-300 cursor-pointer ${isDark
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-black/5 border-black/10 hover:bg-black/10'
              }`}
            title="Upload file"
          >
            <HiArrowUpTray className={`w-4 h-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
              }`} />
            <input
              type="file"
              accept=".js,.py,.java,.cpp,.ts,.jsx,.tsx"
              onChange={uploadFile}
              className="hidden"
            />
          </motion.label>
        </div>
      </div>

      {/* Editor Container - Fixed height and scrolling */}
      <div className="flex-1 relative min-h-0">
        <div className={`absolute inset-0 overflow-auto transition-colors duration-300 ${isDark
          ? 'scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40'
          : 'scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent hover:scrollbar-thumb-black/40'
          }`}>
          <Editor
            value={content}
            onValueChange={updateContent}
            highlight={code => {
              const grammar = prism.languages[language] || prism.languages.javascript;
              return prism.highlight(code, grammar, language);
            }}
            padding={20}
            style={{
              fontFamily: '"Fira Code", "JetBrains Mono", monospace',
              fontSize: 14,
              lineHeight: 1.6,
              minHeight: "100%",
              width: "100%",
              backgroundColor: "transparent",
              caretColor: "#a855f7",
              color: isDark ? "#e5e7eb" : "#374151",
              outline: "none",
              border: "none",
              resize: "none",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word"
            }}
            textareaProps={{
              style: {
                outline: "none",
                border: "none",
                resize: "none",
                backgroundColor: "transparent",
                color: isDark ? "#e5e7eb" : "#374151",
                fontSize: 14,
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                lineHeight: 1.6,
                padding: "20px",
                minHeight: "calc(100vh - 300px)",
                width: "100%",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word"
              }
            }}
            placeholder={`// Paste your ${language} code here for AI review...\n// The editor supports full scrolling and editing\n\nfunction example() {\n  console.log("Your code here...");\n}`}
          />
        </div>
      </div>

      {/* Review Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={!isLoading ? onReview : undefined}
        disabled={isLoading}
        className={`
          absolute bottom-6 right-6 px-6 py-3 rounded-xl font-medium
          flex items-center gap-2 shadow-lg transition-all duration-300 z-10
          ${isLoading
            ? 'bg-violet-500/50 text-white/60 cursor-not-allowed'
            : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-violet-500/25'
          }
        `}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Analyzing...
          </>
        ) : (
          <>
            <HiSparkles className="w-4 h-4" />
            Review Code
          </>
        )}
      </motion.button>

      {/* Copy notification */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 right-4 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm z-10"
        >
          Code copied!
        </motion.div>
      )}
    </GlassCard>
  );
};

export default CodeEditor;