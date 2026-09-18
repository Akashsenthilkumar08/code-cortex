import React from 'react';
import { motion } from 'motion/react';
import { ActiveTabKey, BottomNavKey } from '../types';

interface BottomNavbarProps {
  activeTab: ActiveTabKey;
  onTabChange: (key: ActiveTabKey) => void;
}

interface BottomNavItem {
  key: BottomNavKey;
  label: string;
  symbol: string;
  glowColor: string;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navItems: BottomNavItem[] = [
    {
      key: 'copilot',
      label: 'AI Copilot',
      symbol: '✦',
      glowColor: 'from-blue-600 via-indigo-600 to-cyan-400 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-400',
    },
    {
      key: 'surplus',
      label: 'Safe Surplus',
      symbol: '◈',
      glowColor: 'from-emerald-600 via-teal-600 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400',
    },
    {
      key: 'investments',
      label: 'Investments',
      symbol: '◇',
      glowColor: 'from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400',
    },
    {
      key: 'transactions',
      label: 'Transactions',
      symbol: '⇄',
      glowColor: 'from-blue-600 via-sky-600 to-teal-400 dark:from-blue-400 dark:via-sky-400 dark:to-teal-300',
    },
    {
      key: 'model_insights',
      label: 'Model Insights',
      symbol: '⚙',
      glowColor: 'from-violet-600 via-fuchsia-600 to-cyan-400 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-300',
    },
  ];

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800/90 transition-colors duration-200 select-none shadow-[0_-4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
      role="navigation"
      aria-label="Deep Analysis & Intelligence Navigation"
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-4 md:gap-8 py-1 sm:py-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                id={`bottom-nav-${item.key}`}
                type="button"
                onClick={() => onTabChange(item.key)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-xs sm:text-[13px] font-medium tracking-tight rounded-lg transition-all duration-200 shrink-0 cursor-pointer group ${
                  isActive
                    ? 'text-blue-600 dark:text-cyan-400 font-semibold bg-blue-50/70 dark:bg-slate-900/80'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-900/40'
                }`}
              >
                {/* Glowing Active Top Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeBottomNavTopGlow"
                    className={`absolute -top-1 sm:-top-1.5 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r ${item.glowColor} shadow-[0_0_8px_rgba(59,130,246,0.6)] dark:shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Animated Symbol with Micro-Interactions */}
                <motion.span
                  whileHover={{ scale: 1.15, rotate: item.key === 'model_insights' ? 45 : 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`text-sm sm:text-base transition-colors duration-150 ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]'
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`}
                >
                  {item.symbol}
                </motion.span>

                {/* Label */}
                <span className="whitespace-nowrap font-medium">
                  {item.label}
                </span>

                {/* Active Pill Dot */}
                {isActive && (
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)] ml-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
