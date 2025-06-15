import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const GlassCard = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        backdrop-blur-xl border rounded-2xl shadow-2xl transition-colors duration-300
        ${isDark
          ? 'bg-white/5 border-white/10 shadow-black/20'
          : 'bg-black/5 border-black/10 shadow-black/10'
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;