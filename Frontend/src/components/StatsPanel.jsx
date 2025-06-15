import { motion } from 'framer-motion';
import { BarChart3, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import GlassCard from './GlassCard';

const StatsPanel = ({ stats }) => {
  const defaultStats = {
    totalReviews: 0,
    avgTime: '0s',
    issuesFound: 0,
    improvements: 0
  };

  const currentStats = stats || defaultStats;

  const statItems = [
    {
      icon: BarChart3,
      label: 'Total Reviews',
      value: currentStats.totalReviews,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Clock,
      label: 'Avg Time',
      value: currentStats.avgTime,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      icon: AlertTriangle,
      label: 'Issues Found',
      value: currentStats.issuesFound,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30'
    },
    {
      icon: CheckCircle,
      label: 'Improvements',
      value: currentStats.improvements,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
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
                <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
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