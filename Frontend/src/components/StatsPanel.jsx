import { motion } from 'framer-motion';
import { HiChartBar, HiClock, HiCheckCircle, HiExclamationTriangle } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from './GlassCard';

const StatsPanel = ({ stats }) => {
  const { isDark } = useTheme();

  const defaultStats = {
    totalReviews: 0,
    avgTime: '0s',
    issuesFound: 0,
    improvements: 0
  };

  const currentStats = stats || defaultStats;
  const statItems = [
    {
      icon: HiChartBar,
      label: 'Total Reviews',
      value: currentStats.totalReviews,
      color: isDark ? 'text-blue-400' : 'text-blue-600',
      bgColor: 'bg-blue-500/20',
      borderColor: isDark ? 'border-blue-500/30' : 'border-blue-500/40'
    },
    {
      icon: HiClock,
      label: 'Avg Time',
      value: currentStats.avgTime,
      color: isDark ? 'text-green-400' : 'text-green-600',
      bgColor: 'bg-green-500/20',
      borderColor: isDark ? 'border-green-500/30' : 'border-green-500/40'
    },
    {
      icon: HiExclamationTriangle,
      label: 'Issues Found',
      value: currentStats.issuesFound,
      color: isDark ? 'text-orange-400' : 'text-orange-600',
      bgColor: 'bg-orange-500/20',
      borderColor: isDark ? 'border-orange-500/30' : 'border-orange-500/40'
    },
    {
      icon: HiCheckCircle,
      label: 'Improvements',
      value: currentStats.improvements,
      color: isDark ? 'text-purple-400' : 'text-purple-600',
      bgColor: 'bg-purple-500/20',
      borderColor: isDark ? 'border-purple-500/30' : 'border-purple-500/40'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <GlassCard className={`p-4 ${item.bgColor} border ${item.borderColor}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wide transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</p>
                <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsPanel;