import React from 'react';
import { motion } from 'motion/react';
import { SubNavKey } from '../types';

interface SubNavbarProps {
  activeTab: SubNavKey;
  onTabChange: (key: SubNavKey) => void;
}

interface NavItem {
  key: SubNavKey;
  label: string;
  symbol: string;
  shortDesc: string;
}

export const SubNavbar: React.FC<SubNavbarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navItems: NavItem[] = [
    {
      key: 'overview',
      label: 'Overview',
      symbol: '▦',
      shortDesc: 'Command Center',
    },
    {
      key: 'customer_analysis',
      label: 'Customers',
      symbol: '👥',
      shortDesc: 'Cohort & RFM Matrix',
    },
    {
      key: 'cashflow',
      label: 'Cash Flow',
      symbol: '⇅',
      shortDesc: 'Velocity & Forecast',
    },
    {
      key: 'fraud_radar',
      label: 'Fraud Radar',
      symbol: '♢',
      shortDesc: 'Threat Detection',
    },
    {
      key: 'financial_health',
      label: 'Financial Health',
      symbol: '〽',
      shortDesc: 'Solvency & Matrix',
    },
    {
      key: 'telemetry',
      label: 'Live Telemetry',
      symbol: '⌁',
      shortDesc: 'Oscillator & Feeds',
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-30 transition-colors duration-200 backdrop-blur-md bg-white/95 dark:bg-slate-950/90">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-1">
          {/* Main 5 Clean Navigation Items */}
          <nav
            className="flex items-center gap-1.5 sm:gap-3 md:gap-6 shrink-0"
            aria-label="FINSAFE Intelligence Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  id={`subnav-tab-${item.key}`}
                  type="button"
                  onClick={() => onTabChange(item.key)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-[13px] font-semibold transition-all duration-200 shrink-0 select-none cursor-pointer group ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/60 rounded-lg'
                  }`}
                >
                  {/* Category Symbol (▦, ⇅, ♢, 〽, ⌁) */}
                  <span
                    className={`text-sm sm:text-base font-bold transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? 'text-blue-600 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {item.symbol}
                  </span>

                  {/* Label */}
                  <span className="tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>

                  {/* Active Indicator Underline with subtle glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSubNavUnderline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
