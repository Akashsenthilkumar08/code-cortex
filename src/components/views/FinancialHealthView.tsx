import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart2,
  PieChart,
  Layers,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { SmeAccount } from '../../types';

interface FinancialHealthViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot: (prompt: string) => void;
}

export const FinancialHealthView: React.FC<FinancialHealthViewProps> = ({
  activeAccount,
  onOpenCopilot,
}) => {
  const radarData = [
    { subject: 'Cash Stability', A: 91, fullMark: 100 },
    { subject: 'Fraud Shield', A: 86, fullMark: 100 },
    { subject: 'Liquidity Coverage', A: 96, fullMark: 100 },
    { subject: 'Expense Control', A: 78, fullMark: 100 },
    { subject: 'Transaction Predictability', A: 95, fullMark: 100 },
  ];

  const shapContributions = [
    { factor: 'Cash Stability & Runway', value: +18, type: 'positive', desc: 'Predictable recurring enterprise revenue' },
    { factor: 'Low Fraud Exposure', value: +14, type: 'positive', desc: 'Zero unmitigated fraud losses this quarter' },
    { factor: 'Liquidity Coverage (4.2x)', value: +12, type: 'positive', desc: 'Over 90 days operating cash in primary account' },
    { factor: 'Operating Expense Pressure', value: -6, type: 'negative', desc: 'Upcoming Q4 expansion and cloud infrastructure dues' },
    { factor: 'Transaction Anomaly Risk', value: -4, type: 'negative', desc: 'Active observation on card-testing cluster' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              Financial Health Analysis
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Solvency & Risk-Adjusted Health Matrix
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent algorithmic explainability, factor attribution (SHAP values), and score progression.
          </p>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-cyan-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800/80 self-start md:self-auto shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold">Top 5% SME Health Tier</span>
        </div>
      </div>

      {/* Main Score Hero & Radar Dimension Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Score Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Composite Health Rating
              </span>
              <span className="px-2 py-0.5 text-xs font-extrabold rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Grade A+
              </span>
            </div>

            {/* Huge Animated Score Display */}
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="relative flex items-center justify-center w-40 h-40">
                {/* SVG Radial Gauge */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="none"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="text-blue-600 dark:text-cyan-400"
                    strokeWidth="10"
                    strokeDasharray={314}
                    strokeDashoffset={314 * (1 - 0.94)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    initial={{ strokeDashoffset: 314 }}
                    animate={{ strokeDashoffset: 314 * (1 - 0.94) }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    94
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    / 100
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">
                Financial Health Score
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[260px]">
                High capital resilience with strong liquidity coverage and low default risk.
              </p>
            </div>
          </div>

          {/* Historical Score Comparison */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous Cycle</span>
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">88 / 100</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/80">
                <ArrowUpRight className="w-4 h-4" />
                <span>+6 Points Improvement</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Cycle</span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-cyan-400">94 / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Radar Dimension Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Multi-Vector Health Radar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  5 core quantitative dimensions weighted against industry benchmarks.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400">Balanced Vector</span>
            </div>

            {/* Radar Spider Visualization */}
            <div className="h-[260px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#64748b" opacity={0.2} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" opacity={0.3} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#22d3ee"
                    fill="#06b6d4"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val} / 100`, 'Score']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Component Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {radarData.map((item) => (
              <div key={item.subject} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">{item.subject}</span>
                <span className="text-xs font-black text-slate-900 dark:text-white">{item.A} <span className="text-[9px] font-normal text-slate-400">/100</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "WHY THIS SCORE?" SHAP Contribution Explainability */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              Why This Score? (Algorithmic Attribution & SHAP Contribution)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Exact mathematical weights driving the positive and negative deltas for your score.
            </p>
          </div>

          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> Baseline: 60 / 100
          </span>
        </div>

        {/* Contribution Bars */}
        <div className="space-y-3 pt-2">
          {shapContributions.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.factor}</span>
                <span className={`font-mono font-extrabold ${
                  item.value > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {item.value > 0 ? `+${item.value}` : item.value} pts
                </span>
              </div>

              {/* Bar Visualizer */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                {item.value > 0 ? (
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(item.value / 20) * 100}%` }}
                  ></div>
                ) : (
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${(Math.abs(item.value) / 20) * 100}%` }}
                  ></div>
                )}
              </div>

              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1.5">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Financial Analyst Commentary */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-indigo-900/10 dark:from-cyan-950/30 dark:via-blue-950/20 dark:to-indigo-950/30 border border-cyan-200 dark:border-cyan-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              AI Financial Analyst Assessment
            </h4>
            <blockquote className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              &ldquo;Your score increased from <strong>88 → 94</strong> primarily because cash-flow volatility decreased by 14% following enterprise invoice settlements, and suspicious transaction exposure remained insulated within active rate-limiting buffers.&rdquo;
            </blockquote>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenCopilot('What specific actions can increase our score from 94 to 98?')}
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-blue-500 dark:hover:bg-cyan-400 transition-colors shadow-sm cursor-pointer"
        >
          Get Score Optimization Steps
        </button>
      </div>
    </motion.div>
  );
};
