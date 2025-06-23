import { motion } from 'framer-motion';
import { HiSparkles, HiStar, HiSun, HiMoon } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center justify-between p-6 backdrop-blur-xl border-b transition-colors duration-300 ${isDark
        ? 'bg-white/5 border-white/10'
        : 'bg-black/5 border-black/10'
        }`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
          <HiSparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${isDark
            ? 'from-white to-gray-300'
            : 'from-gray-900 to-gray-600'
            }`}>
            Refactora AI
          </h1>
          <p className={`text-xs transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
            Powered by Google Gemini
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
        >
          <HiStar className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-yellow-300 font-medium">Pro</span>
        </motion.div>

        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-xl backdrop-blur-sm border transition-colors duration-300 ${isDark
            ? 'bg-white/5 border-white/10 hover:bg-white/10'
            : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <HiSun className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-yellow-400' : 'text-gray-700'
              }`} />
          ) : (
            <HiMoon className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-700'
              }`} />
          )}
        </motion.button>

        <motion.a
          href="https://github.com/saksham-1304/Refactora-AI"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className={`p-2 rounded-xl backdrop-blur-sm border transition-colors duration-300 ${isDark
            ? 'bg-white/5 border-white/10 hover:bg-white/10'
            : 'bg-black/5 border-black/10 hover:bg-black/10'
            }`}
        >
          <FaGithub className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'
            }`} />
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;