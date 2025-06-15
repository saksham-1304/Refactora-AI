import { motion } from 'framer-motion';
import { HiSparkles, HiStar } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between p-6 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >      <div className="flex items-center gap-3">        <div className="p-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
          <HiSparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AI Code Reviewer
          </h1>
          <p className="text-xs text-gray-400">Powered by Google Gemini</p>
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
        
        <motion.a
          href="https://github.com/sakshamsinghrathore/AI-Code-Reviewer"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="p-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <FaGithub className="w-5 h-5 text-gray-300" />
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;