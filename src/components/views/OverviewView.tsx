import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Zap,
  ArrowRight,
  Sparkles,
  DollarSign,
  Activity,
  CheckCircle2,
  Lock,
  Layers,
  Clock,
  ChevronRight,
  BarChart3,
  Percent,
  Wallet,
  Users,
  ArrowLeftRight,
  ShieldAlert,
  Building2
} from 'lucide-react';
import { SubNavKey, SmeAccount } from '../../types';

interface OverviewViewProps {
  activeAccount: SmeAccount;
  onNavigate: (tab: SubNavKey) => void;
  onOpenCopilot: (prompt: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  activeAccount,
  onNavigate,
  onOpenCopilot,
}) => {
  const pipelineNodes = [
    {
      id: 'cash',
      label: 'CASH',
      value: '₹48.9L',
      status: 'Current Balance',
      tab: 'cashflow' as SubNavKey,
      color: 'from-blue-500 to-cyan-500',
      glow: 'rgba(6,182,212,0.4)',
    },
    {
      id: 'cashflow',
      label: 'CASH FLOW',
      value: '+₹12.4L',
      status: 'Net Monthly Velocity',
      tab: 'cashflow' as SubNavKey,
      color: 'from-emerald-500 to-teal-500',
      glow: 'rgba(16,185,129,0.4)',
    },
    {
      id: 'fraud',
      label: 'FRAUD RISK',
      value: '3 Flagged',
      status: 'Shielded (99.8% Clean)',
      tab: 'fraud_radar' as SubNavKey,
      color: 'from-rose-500 to-amber-500',
      glow: 'rgba(244,63,94,0.4)',
    },
    {
      id: 'health',
      label: 'FINANCIAL HEALTH',
      value: '94 / 100',
      status: 'Top Tier (Grade A+)',
      tab: 'financial_health' as SubNavKey,
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(59,130,246,0.4)',
    },
    {
      id: 'surplus',
      label: 'SURPLUS',
      value: '₹26.2L',
      status: 'Risk-Adjusted Buffer',
      tab: 'cashflow' as SubNavKey,
      color: 'from-indigo-500 to-purple-600',
      glow: 'rgba(99,102,241,0.4)',
    },
    {
      id: 'investment',
      label: 'INVESTMENT',
      value: '7.4% APY',
      status: 'Overnight Auto-Sweep',
      tab: 'telemetry' as SubNavKey,
      color: 'from-purple-500 to-pink-500',
      glow: 'rgba(168,85,247,0.4)',
    },
  ];

  const recentAlerts = [
    {
      id: '1',
      title: 'Unusual transaction sequence flagged',
      time: '12 mins ago',
      desc: 'Rapid micropayments ₹2 → ₹5 → ₹10 followed by ₹25,000 spike.',
      type: 'warning',
      tab: 'fraud_radar' as SubNavKey,
    },
    {
      id: '2',
      title: 'Cash-flow volatility decreased by 14%',
      time: '1 hour ago',
      desc: 'Q3 Enterprise receivable cleared, extending runway to 94 days.',
      type: 'success',
      tab: 'cashflow' as SubNavKey,
    },
    {
      id: '3',
      title: 'Financial Health Score upgraded to 94/100',
      time: '3 hours ago',
      desc: 'Improved debt-service coverage and liquidity ratios.',
      type: 'info',
      tab: 'financial_health' as SubNavKey,
    },
    {
      id: '4',
      title: 'Real-time telemetry pulse synchronized',
      time: '5 hours ago',
      desc: 'All 5 banking API gateways streaming with 100% heartbeat.',
      type: 'telemetry',
      tab: 'telemetry' as SubNavKey,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8"
    >
      {/* Header Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Enterprise Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Financial Health Command Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time unified intelligence orchestration for {activeAccount.name}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenCopilot('Generate a comprehensive executive summary of our financial standing and risk profile')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm shadow-blue-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Executive Briefing</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {/* Score */}
        <div 
          onClick={() => onNavigate('financial_health')}
          className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Health Score</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-cyan-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800">
              Grade A+
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              94
            </span>
            <span className="text-xs font-semibold text-slate-400">/ 100</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* Current Cash */}
        <div 
          onClick={() => onNavigate('cashflow')}
          className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Current Cash</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              +18.4%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            ₹48.9L
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">Available in primary liquidity</span>
        </div>

        {/* Cash-Flow Stability */}
        <div 
          onClick={() => onNavigate('cashflow')}
          className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer group shadow-2xs"
        >
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Cash Stability</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 group-hover:text-teal-500 transition-colors">
            91 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">High predictability</span>
        </div>

        {/* Fraud Exposure */}
        <div 
          onClick={() => onNavigate('fraud_radar')}
          className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fraud Exposure</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              3 Alerts
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 group-hover:text-rose-500 transition-colors">
            14 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium block mt-1">Controlled low risk</span>
        </div>

        {/* Liquidity Condition */}
        <div className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Liquidity Coverage</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-2">
            4.2x Ratio
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">Optimal runway: 94 days</span>
        </div>

        {/* Expected Expenses */}
        <div className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Expected Expenses (30D)</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-2">
            ₹14.2L
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Payroll & scheduled vendor dues</span>
        </div>

        {/* Risk Buffer */}
        <div className="col-span-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Safety Risk Buffer</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-2">
            ₹8.5L
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Protected working capital reserve</span>
        </div>

        {/* Risk-Adjusted Surplus */}
        <div className="col-span-2 p-4 rounded-xl bg-gradient-to-br from-indigo-900/10 to-blue-900/10 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-200 dark:border-indigo-800/60 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-300">Deployable Surplus</span>
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            ₹26.2L
          </div>
          <span className="text-[11px] text-indigo-500/90 dark:text-indigo-300/80 font-medium block mt-1">Ready for high-yield auto-sweep</span>
        </div>
      </div>

      {/* 4 Core Data & Intelligence Hub Cards */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Integrated Data & Intelligence Workspaces
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live synchronized data streams powering enterprise decision intelligence
            </p>
          </div>
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-200 dark:border-cyan-800/60">
            4 Core Datasets Online
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: Customer Analysis */}
          <div
            onClick={() => onNavigate('customer_analysis')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/60 dark:hover:border-cyan-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400">
                  <Users className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  2,240 Profiles
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Customer Intelligence
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Demographic clusters, Wine & Meat spending, and RFM cohort matrix.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              <span>Explore Customers</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Fraud Detection */}
          <div
            onClick={() => onNavigate('fraud_radar')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 hover:border-rose-500/60 dark:hover:border-rose-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">
                  284.8k Audited
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Fraud Radar & PCA
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                492 confirmed anomalies, V14/V4 vector screening, and neural classifier.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-rose-600 dark:text-rose-400">
              <span>View Threat Feed</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Stocks & Investments */}
          <div
            onClick={() => onNavigate('investments')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 hover:border-indigo-500/60 dark:hover:border-indigo-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                  NIFTY 23,767
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Stocks & Surplus
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                50 NIFTY constituent stocks, sector returns, and corporate treasury simulation.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              <span>Open Stock Matrix</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4: Bank Transactions */}
          <div
            onClick={() => onNavigate('transactions')}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/60 dark:hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400">
                  <ArrowLeftRight className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase">
                  116.2k Records
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                Corporate Bank Ledger
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Federal Bank, HDFC, ICICI pools, RTGS, NEFT, and cash deposit audit trails.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-cyan-400">
              <span>Audit Ledger</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Intelligence Visualization: Interactive Flow Pipeline */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Main Intelligence Visualization & Flow Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time multi-dimensional financial state progression pipeline
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-slate-700 self-start sm:self-auto">
            <Activity className="w-3 h-3 animate-spin text-blue-500" />
            <span>Interactive Node Topology</span>
          </span>
        </div>

        {/* Connected Node Visualization */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
          {pipelineNodes.map((node, index) => (
            <motion.div
              key={node.id}
              whileHover={{ scale: 1.03, y: -2 }}
              onClick={() => onNavigate(node.tab)}
              className="relative p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-cyan-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Connector arrow on desktop */}
              {index < pipelineNodes.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center text-slate-400 dark:text-slate-600 group-hover:text-cyan-400 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  <span>STEP 0{index + 1}</span>
                  <span className="text-xs">→</span>
                </div>
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 uppercase">
                  {node.label}
                </h3>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {node.value}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {node.status}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1 mt-1 group-hover:translate-x-0.5 transition-transform">
                  View Intelligence <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Executive Summary Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-slate-900/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-slate-900/80 border border-blue-200/80 dark:border-blue-800/40 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  AI Financial Intelligence Executive Summary
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Real-time Synthesized
                </span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated 2 mins ago
              </span>
            </div>

            <blockquote className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              &ldquo;Cash position is stable at <strong className="font-semibold text-emerald-600 dark:text-emerald-400">₹48.9L</strong>, fraud exposure remains controlled with only 3 isolated anomalies under observation, and the current modeled liquidity buffer comfortably supports a conservative surplus allocation of <strong className="font-semibold text-indigo-600 dark:text-indigo-400">₹26.2L</strong> into high-yield overnight sweeps.&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => onOpenCopilot('What specific factors contributed to the ₹26.2L surplus calculation?')}
                className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Inspect surplus calculation <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Intelligence Cards & Recent Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Intelligence Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Intelligence Modules
            </h3>
            <span className="text-xs text-slate-400">Click to enter complete workspace</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: Cash Flow */}
            <div
              onClick={() => onNavigate('cashflow')}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">₹48.9L</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Cash Flow Intelligence
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                Predictive 90-day cash runway and automated inflow/outflow balance.
              </p>
            </div>

            {/* Card 2: Fraud Radar */}
            <div
              onClick={() => onNavigate('fraud_radar')}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/60 dark:hover:border-rose-500/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">3 Flagged</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Fraud Radar Engine
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                Card-testing heuristics and sequence anomaly mitigation.
              </p>
            </div>

            {/* Card 3: Financial Health */}
            <div
              onClick={() => onNavigate('financial_health')}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-cyan-500/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-cyan-950 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">94 / 100</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                Financial Health Analysis
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                Multi-vector solvency index and contribution explainability.
              </p>
            </div>

            {/* Card 4: Live Telemetry */}
            <div
              onClick={() => onNavigate('telemetry')}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">● LIVE</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Live Telemetry Streams
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                Real-time API gateway signals and transactional waveform monitors.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Alerts (5 Cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recent Alerts & Audit Stream
            </h3>
            <span className="text-xs text-blue-600 dark:text-cyan-400 font-medium">All Logged</span>
          </div>

          <div className="space-y-2.5">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onNavigate(alert.tab)}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group flex items-start gap-3 shadow-2xs"
              >
                <div className="mt-0.5">
                  {alert.type === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  {alert.type === 'success' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                  {alert.type === 'info' && (
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                  )}
                  {alert.type === 'telemetry' && (
                    <Activity className="w-4 h-4 text-emerald-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {alert.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 shrink-0">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {alert.desc}
                  </p>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
