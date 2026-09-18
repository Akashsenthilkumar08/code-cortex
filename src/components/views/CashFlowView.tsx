import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  AlertCircle,
  Clock,
  Zap,
  Sliders,
  CheckCircle2,
  DollarSign,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { SmeAccount } from '../../types';

interface CashFlowViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot: (prompt: string) => void;
}

export const CashFlowView: React.FC<CashFlowViewProps> = ({
  activeAccount,
  onOpenCopilot,
}) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('30D');

  // Multi-range dataset for cash flow visualization
  const forecastData7D = [
    { day: 'Day -6', historical: 46.2, current: null, forecast: null, riskAdjusted: null },
    { day: 'Day -4', historical: 47.0, current: null, forecast: null, riskAdjusted: null },
    { day: 'Day -2', historical: 47.8, current: null, forecast: null, riskAdjusted: null },
    { day: 'Today', historical: 48.9, current: 48.9, forecast: 48.9, riskAdjusted: 48.9 },
    { day: '+2 Days', historical: null, current: null, forecast: 50.1, riskAdjusted: 48.2 },
    { day: '+5 Days', historical: null, current: null, forecast: 51.4, riskAdjusted: 49.0 },
    { day: '+7 Days', historical: null, current: null, forecast: 52.8, riskAdjusted: 49.8 },
  ];

  const forecastData30D = [
    { day: 'W-3', historical: 41.5, current: null, forecast: null, riskAdjusted: null },
    { day: 'W-2', historical: 44.0, current: null, forecast: null, riskAdjusted: null },
    { day: 'W-1', historical: 46.8, current: null, forecast: null, riskAdjusted: null },
    { day: 'Current', historical: 48.9, current: 48.9, forecast: 48.9, riskAdjusted: 48.9 },
    { day: 'W+1', historical: null, current: null, forecast: 52.1, riskAdjusted: 49.5 },
    { day: 'W+2', historical: null, current: null, forecast: 55.4, riskAdjusted: 51.8 },
    { day: 'W+3', historical: null, current: null, forecast: 58.2, riskAdjusted: 53.0 },
    { day: 'W+4 (30D)', historical: null, current: null, forecast: 61.3, riskAdjusted: 55.1 },
  ];

  const forecastData90D = [
    { day: 'Month -2', historical: 36.0, current: null, forecast: null, riskAdjusted: null },
    { day: 'Month -1', historical: 42.4, current: null, forecast: null, riskAdjusted: null },
    { day: 'Current', historical: 48.9, current: 48.9, forecast: 48.9, riskAdjusted: 48.9 },
    { day: 'Month +1', historical: null, current: null, forecast: 61.3, riskAdjusted: 55.1 },
    { day: 'Month +2', historical: null, current: null, forecast: 74.0, riskAdjusted: 64.2 },
    { day: 'Month +3 (90D)', historical: null, current: null, forecast: 86.5, riskAdjusted: 72.8 },
  ];

  const activeData =
    timeRange === '7D'
      ? forecastData7D
      : timeRange === '90D'
      ? forecastData90D
      : forecastData30D;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8"
    >
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Cash Flow Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Cash Velocity & Liquidity Forecast Engine
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Predictive liquidity models, burn runway analysis, and automated cash buffer thresholds.
          </p>
        </div>

        {/* Time Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
          {(['7D', '30D', '90D'] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Cash Position Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Current Cash */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Current Cash</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 text-emerald-600 dark:text-emerald-400">
            ₹48.9L
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% vs last mo
          </span>
        </div>

        {/* Total Inflows */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Inflows (30D)</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹34.8L
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">142 customer receipts</span>
        </div>

        {/* Total Outflows */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Outflows (30D)</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹22.4L
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Vendor & operational dues</span>
        </div>

        {/* Expected Expenses */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Expected Expenses</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹14.2L
          </div>
          <span className="text-[11px] text-amber-500 font-medium block mt-1">Due within next 30 days</span>
        </div>

        {/* Monthly Burn Rate */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Net Burn Rate</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹4.2L <span className="text-xs font-normal text-slate-400">/mo</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">Net Cash Positive</span>
        </div>

        {/* Recurring Payments */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Recurring Payments</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ₹3.6L <span className="text-xs font-normal text-slate-400">/mo</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">SaaS, Cloud, Office Lease</span>
        </div>
      </div>

      {/* Main Interactive Cash Flow Forecast Chart */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Cash Position & Predictive Liquidity Runway ({timeRange})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Historical ledger trend vs. ML forecast models and safety threshold bounds.
            </p>
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-blue-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Historical Cash</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-500 border-b border-dashed border-emerald-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Forecast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Risk-Adjusted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-rose-500 border-b border-dotted border-rose-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Min Threshold (₹10L)</span>
            </div>
          </div>
        </div>

        {/* Responsive Area/Line Chart */}
        <div className="h-[280px] sm:h-[340px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="historicalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="L" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`₹${val}L`, '']}
              />
              <ReferenceLine y={10} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Min Liquidity Threshold (₹10L)', position: 'insideBottomRight', fill: '#f43f5e', fontSize: 10 }} />
              
              <Area type="monotone" dataKey="historical" stroke="#3b82f6" strokeWidth={2.5} fill="url(#historicalGrad)" name="Historical Cash" />
              <Area type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={2.5} strokeDasharray="4 4" fill="url(#forecastGrad)" name="Optimistic Forecast" />
              <Line type="monotone" dataKey="riskAdjusted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="3 3" name="Risk-Adjusted Buffer" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stability Metrics + AI Cash Flow Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stability Breakdown (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Cash-Flow Stability Index
            </h3>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Score: 91 / 100
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Inflow consistency */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Inflow Consistency</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">94% (High)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            {/* Outflow volatility */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Outflow Volatility</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">11% (Low Variance)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>

            {/* Expense Pressure */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Operating Expense Pressure</span>
                <span className="font-bold text-amber-500">28% of Revenue</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            {/* Recurring payment consistency */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Recurring Payment Predictability</span>
                <span className="font-bold text-blue-600 dark:text-cyan-400">98% (Automated)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Cash Flow Insight (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-slate-900/10 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-900/80 border border-emerald-200 dark:border-emerald-800/40 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">AI Cash Flow Intelligence</h4>
            </div>

            <blockquote className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              &ldquo;Cash flow is structurally stable with <strong className="font-semibold text-emerald-600 dark:text-emerald-400">94 days</strong> of continuous operating runway. However, projected vendor dues of <strong className="font-semibold text-slate-900 dark:text-white">₹14.2L</strong> next month will temporarily reduce unallocated liquidity if not offset by scheduled invoice clearances.&rdquo;
            </blockquote>
          </div>

          <div className="pt-4 border-t border-emerald-200/60 dark:border-emerald-800/40 mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenCopilot('Simulate a 90-day cash stress test under a 20% delayed customer payment scenario')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Run cash stress simulation <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400">Model: ARIMA-X + ML</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
