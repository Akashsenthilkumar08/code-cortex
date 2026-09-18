import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Search,
  Filter,
  TrendingUp,
  Award,
  Sparkles,
  ShoppingBag,
  Wine,
  Flame,
  Fish,
  Coins,
  Smile,
  Apple,
  Store,
  Globe,
  BookOpen,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  X,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  GraduationCap,
  HeartHandshake,
  Activity
} from 'lucide-react';
import { SmeAccount } from '../../types';
import {
  CUSTOMER_ANALYSIS_SUMMARY,
  CURATED_CUSTOMERS,
  CustomerProfile
} from '../../data/customerData';

interface CustomerAnalysisViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot?: (prompt?: string) => void;
  onNavigate?: (tab: any) => void;
}

export const CustomerAnalysisView: React.FC<CustomerAnalysisViewProps> = ({
  activeAccount,
  onOpenCopilot,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState<string>('all');
  const [selectedEduFilter, setSelectedEduFilter] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(CURATED_CUSTOMERS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'segments' | 'campaigns' | 'directory'>('overview');

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return CURATED_CUSTOMERS.filter((c) => {
      const matchesSearch =
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.rawId.includes(searchTerm) ||
        c.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.maritalStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.segment.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedSegmentFilter !== 'all' && c.segment !== selectedSegmentFilter) {
        return false;
      }

      if (selectedEduFilter !== 'all' && c.education !== selectedEduFilter) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedSegmentFilter, selectedEduFilter]);

  const summary = CUSTOMER_ANALYSIS_SUMMARY;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-28 space-y-6"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Customer Intelligence & Lifetime Value Matrix
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60">
                2,240 Profiles Synced
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Demographic clustering, category spending allocations, and RFM cohort behavioral scoring for {activeAccount.name}
            </p>
          </div>
        </div>

        {onOpenCopilot && (
          <button
            type="button"
            onClick={() => onOpenCopilot('Analyze top customer segments and recommend upsell opportunities for Wine and Meat categories.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze with Copilot</span>
          </button>
        )}
      </div>

      {/* 5 Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Customers */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Base</span>
            <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
              <Users className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {summary.totalCustomers.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-0.5">
            +12.4% YoY Active
          </span>
        </div>

        {/* Avg Annual Income */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Income</span>
            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            ₹{summary.averageIncome.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            Range: ₹1.7k – ₹6.6L
          </span>
        </div>

        {/* Avg Basket Spend */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Basket Spend</span>
            <span className="p-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <ShoppingBag className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 font-mono">
            ₹{summary.averageSpend.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            Total GMV: ₹{(summary.totalSpend / 100000).toFixed(2)}L
          </span>
        </div>

        {/* Campaign Conversion */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campaign Conv.</span>
            <span className="p-1 rounded-md bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <Award className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1 font-mono">
            {summary.campaignConversionRate}%
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            334 direct responders
          </span>
        </div>

        {/* Retention & Health */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Retention Index</span>
            <span className="p-1 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 font-mono">
            {summary.retentionScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
            Low Churn Risk
          </span>
        </div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
        {[
          { id: 'overview', label: 'Spending & Channels' },
          { id: 'segments', label: 'RFM Cohort Clusters' },
          { id: 'campaigns', label: 'Campaign Conversions' },
          { id: 'directory', label: 'Customer Directory (2,240)' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Category Spending & Channels */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Category Spending Breakdown (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Category Spending Allocations
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cumulative gross merchandise volume across all product lines
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">
                  Total ₹{(summary.totalSpend / 100000).toFixed(2)}L
                </span>
              </div>

              <div className="space-y-3.5">
                {summary.categorySpendBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 dark:text-slate-400 font-normal">
                          Avg: ₹{item.avgPerCustomer} / user
                        </span>
                        <span className="font-mono text-slate-900 dark:text-white">
                          ₹{item.total.toLocaleString('en-IN')} ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Channels Distribution (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Purchase Channels & Touchpoints
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Channel engagement volume across 2,240 active customer touchpoints
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {summary.channelBreakdown.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {ch.channel}
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-2 font-mono">
                      {ch.totalPurchases.toLocaleString('en-IN')}
                    </div>
                    <span
                      className="text-[11px] font-bold mt-0.5"
                      style={{ color: ch.color }}
                    >
                      {ch.percentage}% of all orders
                    </span>
                  </div>
                ))}
              </div>

              {/* Education & Marital Breakdown preview */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Demographic Footprint
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {summary.educationBreakdown.map((edu, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {edu.label}: <strong className="font-mono">{edu.count}</strong> ({edu.percentage}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RFM Cohort Clusters */}
      {activeTab === 'segments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.rfmSegments.map((seg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-cyan-600 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedSegmentFilter(seg.segment);
                  setActiveTab('directory');
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${seg.color}20`,
                        color: seg.color,
                        borderColor: `${seg.color}40`,
                        borderWidth: 1
                      }}
                    >
                      {seg.segment}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {seg.count} Users ({seg.percentage}%)
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {seg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">AVG BASKET SPEND</span>
                    <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                      ₹{seg.avgSpend.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">AVG RECENCY</span>
                    <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                      {seg.avgRecency} days ago
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center justify-between pt-1 hover:underline cursor-pointer"
                >
                  <span>View Segment Cohort Profiles</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Age Cohorts Overview */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Age Cohort Income & Spending Comparison
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {summary.ageCohorts.map((age, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {age.cohort}
                  </span>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Cohort Size:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{age.count} ({age.percentage}%)</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Avg Spend:</span>
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400">₹{age.avgSpend}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Avg Income:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹{age.avgIncome.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Campaign Conversions Funnel */}
      {activeTab === 'campaigns' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Multi-Channel Marketing Campaign Conversion Funnel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Performance across 5 specialized product campaigns and final marketing response
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Cumulative Responders: 334 (14.9%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.campaignFunnel.map((cmp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-400">
                    {cmp.campaign}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    {cmp.conversionRate}% Conversion
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {cmp.name}
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    {cmp.accepted} of 2,240 Customers Accepted
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cmp.conversionRate * 5}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Customer Directory & Inspector */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          {/* Search and Filters Bar */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by customer ID, education, marital status, or segment..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Segment Filter */}
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[11px] font-bold text-slate-400 px-1.5">Segment:</span>
                {(['all', 'Champions', 'Loyal Customers', 'At Risk', 'Hibernating'] as const).map((seg) => (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => setSelectedSegmentFilter(seg)}
                    className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedSegmentFilter === seg
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {seg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Table + Detail Drawer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Showing {filteredCustomers.length} Customer Records
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Click row to inspect full profile
                </span>
              </div>

              <div className="overflow-x-auto flex-1 max-h-[600px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-3.5">Customer ID</th>
                      <th className="py-3 px-3.5">Demographics</th>
                      <th className="py-3 px-3.5 text-right">Income</th>
                      <th className="py-3 px-3.5 text-right">Total Spend</th>
                      <th className="py-3 px-3.5 text-center">Segment</th>
                      <th className="py-3 px-3.5 text-right">Recency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {filteredCustomers.map((cust) => {
                      const isSelected = selectedCustomer?.id === cust.id;

                      return (
                        <tr
                          key={cust.id}
                          onClick={() => setSelectedCustomer(cust)}
                          className={`hover:bg-blue-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/80 dark:bg-slate-800/90 font-semibold' : ''
                          }`}
                        >
                          {/* ID */}
                          <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900 dark:text-white">
                            {cust.id}
                          </td>

                          {/* Demographics */}
                          <td className="py-3.5 px-3.5">
                            <span className="text-slate-900 dark:text-white font-bold block">
                              {cust.education} · {cust.maritalStatus}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Age {cust.age} ({cust.birthYear}) · {cust.kids + cust.teens} dependents
                            </span>
                          </td>

                          {/* Income */}
                          <td className="py-3.5 px-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                            ₹{cust.income.toLocaleString('en-IN')}
                          </td>

                          {/* Total Spend */}
                          <td className="py-3.5 px-3.5 text-right font-mono font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
                            ₹{cust.totalSpend.toLocaleString('en-IN')}
                          </td>

                          {/* Segment */}
                          <td className="py-3.5 px-3.5 text-center whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              cust.segment === 'Champions'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : cust.segment === 'Loyal Customers'
                                ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                                : cust.segment === 'At Risk'
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                              {cust.segment}
                            </span>
                          </td>

                          {/* Recency */}
                          <td className="py-3.5 px-3.5 text-right text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            {cust.recency}d ago
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 5 cols: Selected Customer Inspector */}
            <div className="lg:col-span-5">
              {selectedCustomer ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5 sticky top-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Customer Forensic Profile
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {selectedCustomer.id}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Enrolled {selectedCustomer.customerSince} · Recency {selectedCustomer.recency} days
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-800/60">
                      {selectedCustomer.segment}
                    </span>
                  </div>

                  {/* Financial Metrics Box */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">ANNUAL INCOME</span>
                      <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                        ₹{selectedCustomer.income.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">LIFETIME SPEND</span>
                      <div className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono mt-0.5">
                        ₹{selectedCustomer.totalSpend.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Product Category Breakdown */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Category Spend Allocation
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Wines</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">₹{selectedCustomer.wines}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Meat</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">₹{selectedCustomer.meat}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Gold</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">₹{selectedCustomer.gold}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Fish</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">₹{selectedCustomer.fish}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Sweets</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">₹{selectedCustomer.sweets}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Fruits</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">₹{selectedCustomer.fruits}</span>
                      </div>
                    </div>
                  </div>

                  {/* Channel Purchases */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Purchasing Channels
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Store</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedCustomer.storePurchases}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Web</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedCustomer.webPurchases}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Catalog</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedCustomer.catalogPurchases}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Deals</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedCustomer.dealsPurchases}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Copilot Recommendation */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-cyan-950/30 border border-blue-200 dark:border-cyan-800/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Lifetime Value Strategy</span>
                    </div>
                    <p className="text-xs text-blue-950 dark:text-cyan-100 leading-relaxed">
                      Customer has accepted {selectedCustomer.totalCampaignsAccepted} campaigns. Target with premium curated Wine & Meat bundle via direct catalog to increase repeat frequency.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-slate-400">
                  Select a customer to inspect profile intelligence.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
