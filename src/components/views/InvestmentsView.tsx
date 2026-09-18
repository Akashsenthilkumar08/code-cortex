import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  PieChart as PieIcon, 
  HelpCircle, 
  ArrowUpRight, 
  Zap, 
  Info, 
  BarChart3, 
  Clock, 
  Sparkles,
  Building,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  Layers,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  Flame,
  Activity
} from 'lucide-react';
import { SmeAccount } from '../../types';
import {
  NIFTY_INDEX_SUMMARY,
  NIFTY_STOCKS,
  SECTOR_SUMMARIES,
  TOP_GAINERS,
  TOP_LOSERS,
  StockRecord
} from '../../data/stocksData';

interface InvestmentsViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot?: (prompt?: string) => void;
  onNavigate?: (tab: any) => void;
}

export const InvestmentsView: React.FC<InvestmentsViewProps> = ({
  activeAccount,
  onOpenCopilot,
  onNavigate,
}) => {
  const [allocationMode, setAllocationMode] = useState<'CONSERVATIVE' | 'BALANCED' | 'GROWTH-ORIENTED'>('CONSERVATIVE');
  const [activeTab, setActiveTab] = useState<'matrix' | 'strategy' | 'sectors'>('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'pChange' | 'ltp' | 'proximity' | 'volume'>('pChange');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedStock, setSelectedStock] = useState<StockRecord | null>(NIFTY_STOCKS[0]);

  // Business surplus
  const potentiallyAvailableSurplus = 26.2; // Lakhs

  // Allocation Profiles
  const profiles = {
    CONSERVATIVE: {
      title: 'Capital Preservation & Overnight Liquidity',
      overnightPercent: 75,
      shortDurationPercent: 20,
      growthPercent: 5,
      estimatedApy: '7.4% – 7.8%',
      liquiditySpeed: 'Instant (T+0 Daily Auto-Sweep)',
      riskLevel: 'Very Low',
      rationale: 'Prioritizes operational safety and instant capital recall if working capital requirements spike.',
    },
    BALANCED: {
      title: 'Target Yield Optimization & Short Duration',
      overnightPercent: 50,
      shortDurationPercent: 40,
      growthPercent: 10,
      estimatedApy: '7.9% – 8.3%',
      liquiditySpeed: 'T+1 Settlement',
      riskLevel: 'Low-to-Moderate',
      rationale: 'Blends daily overnight treasury sweeps with high-grade 90-day sovereign commercial paper for yield enhancement.',
    },
    'GROWTH-ORIENTED': {
      title: 'Extended Horizon Index Participation',
      overnightPercent: 35,
      shortDurationPercent: 35,
      growthPercent: 30,
      estimatedApy: '9.2% – 11.5%',
      liquiditySpeed: 'T+2 Equity / T+1 Debt',
      riskLevel: 'Moderate',
      rationale: 'Appropriate only during prolonged periods of high cash buffer coverage (>5.0x monthly fixed burn).',
    },
  };

  const activeProfile = profiles[allocationMode];
  const overnightAmount = ((potentiallyAvailableSurplus * activeProfile.overnightPercent) / 100).toFixed(2);
  const shortDurationAmount = ((potentiallyAvailableSurplus * activeProfile.shortDurationPercent) / 100).toFixed(2);
  const growthAmount = ((potentiallyAvailableSurplus * activeProfile.growthPercent) / 100).toFixed(2);

  // Filtered and Sorted Stocks
  const filteredStocks = useMemo(() => {
    return NIFTY_STOCKS.filter((stock) => {
      const matchSearch =
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.sector.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchSearch) return false;
      if (selectedSector !== 'all' && stock.sector !== selectedSector) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'pChange') {
        return sortOrder === 'desc' ? b.pChange - a.pChange : a.pChange - b.pChange;
      }
      if (sortBy === 'ltp') {
        return sortOrder === 'desc' ? b.ltp - a.ltp : a.ltp - b.ltp;
      }
      if (sortBy === 'proximity') {
        return sortOrder === 'desc' ? b.highProximity - a.highProximity : a.highProximity - b.highProximity;
      }
      if (sortBy === 'volume') {
        return sortOrder === 'desc' ? b.volume - a.volume : a.volume - b.volume;
      }
      return 0;
    });
  }, [searchTerm, selectedSector, sortBy, sortOrder]);

  const toggleSort = (field: 'pChange' | 'ltp' | 'proximity' | 'volume') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const index = NIFTY_INDEX_SUMMARY;

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
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                NIFTY 50 Stocks & Treasury Surplus Intelligence
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                50 Constituent Tickers Synced
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live enterprise stock prices, sector rotations, and risk-calibrated treasury deployment for {activeAccount.name}
            </p>
          </div>
        </div>

        {onOpenCopilot && (
          <button
            type="button"
            onClick={() => onOpenCopilot('Analyze NIFTY 50 top gainers and suggest overnight treasury yield allocation.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Copilot</span>
          </button>
        )}
      </div>

      {/* NIFTY 50 Index Real-Time Bar & Top Gainers/Losers Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* NIFTY 50 Index */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NIFTY 50 Index</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              index.pChange >= 0
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
            }`}>
              {index.pChange >= 0 ? '+' : ''}{index.pChange}%
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            {index.ltp.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            52W: {index.week52Low.toLocaleString('en-IN')} – {index.week52High.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Deployable Surplus */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deployable Surplus</span>
            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            ₹{potentiallyAvailableSurplus}L
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            7.4% – 11.5% simulated yield
          </span>
        </div>

        {/* Top Gainer */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Gainer Today</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              +{TOP_GAINERS[0]?.pChange}%
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {TOP_GAINERS[0]?.symbol}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-mono">
            ₹{TOP_GAINERS[0]?.ltp.toLocaleString('en-IN')} · {TOP_GAINERS[0]?.sector}
          </span>
        </div>

        {/* Market Turnover */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Market Turnover</span>
            <span className="p-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <BarChart3 className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            ₹{index.valueCrores.toLocaleString('en-IN')} Cr
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            33.38 Cr shares traded
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
        {[
          { id: 'matrix', label: 'NIFTY 50 Stocks Matrix (50 Tickers)' },
          { id: 'strategy', label: 'Treasury Surplus Yield Simulator' },
          { id: 'sectors', label: 'Sectoral Performance Breakdown' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: 50 Stocks Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          {/* Search & Sector Filters */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ticker symbol (e.g. INFY, RELIANCE, HDFCBANK), company, or sector..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Sector:</span>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">All Sectors (50)</option>
                {SECTOR_SUMMARIES.map((s) => (
                  <option key={s.sector} value={s.sector}>
                    {s.sector} ({s.stockCount})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table (7 cols) + Detail Drawer (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Showing {filteredStocks.length} Verified NIFTY 50 Stocks
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Click ticker to inspect performance
                </span>
              </div>

              <div className="overflow-x-auto flex-1 max-h-[550px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-3.5">Symbol & Company</th>
                      <th 
                        className="py-3 px-3.5 text-right cursor-pointer hover:text-indigo-600"
                        onClick={() => toggleSort('ltp')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>LTP (₹)</span>
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th 
                        className="py-3 px-3.5 text-right cursor-pointer hover:text-indigo-600"
                        onClick={() => toggleSort('pChange')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>% Change</span>
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th 
                        className="py-3 px-3.5 text-right cursor-pointer hover:text-indigo-600"
                        onClick={() => toggleSort('proximity')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>52W High Prox.</span>
                          <ArrowUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="py-3 px-3.5 text-right">365D %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {filteredStocks.map((stock) => {
                      const isSelected = selectedStock?.symbol === stock.symbol;
                      const isGain = stock.pChange >= 0;

                      return (
                        <tr
                          key={stock.symbol}
                          onClick={() => setSelectedStock(stock)}
                          className={`hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors ${
                            isSelected ? 'bg-indigo-50/80 dark:bg-indigo-950/40 font-semibold' : ''
                          }`}
                        >
                          {/* Symbol & Name */}
                          <td className="py-3.5 px-3.5">
                            <span className="text-slate-900 dark:text-white font-bold block font-mono">
                              {stock.symbol}
                            </span>
                            <span className="text-[10px] text-slate-400 line-clamp-1">
                              {stock.name}
                            </span>
                          </td>

                          {/* LTP */}
                          <td className="py-3.5 px-3.5 text-right font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            ₹{stock.ltp.toLocaleString('en-IN')}
                          </td>

                          {/* % Change */}
                          <td className="py-3.5 px-3.5 text-right font-mono font-bold whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                              isGain
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                                : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400'
                            }`}>
                              {isGain ? '+' : ''}{stock.pChange}%
                            </span>
                          </td>

                          {/* 52W High Proximity */}
                          <td className="py-3.5 px-3.5 text-right font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                            {stock.highProximity}%
                          </td>

                          {/* 365D Return */}
                          <td className="py-3.5 px-3.5 text-right font-mono text-[11px] whitespace-nowrap">
                            <span className={stock.change365D >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                              {stock.change365D >= 0 ? '+' : ''}{stock.change365D}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Stock Detailed Inspection */}
            <div className="lg:col-span-5">
              {selectedStock ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5 sticky top-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                        Ticker Intelligence
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                        {selectedStock.symbol}
                      </h3>
                      <span className="text-xs text-slate-500">{selectedStock.name}</span>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                      selectedStock.pChange >= 0
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {selectedStock.pChange >= 0 ? '+' : ''}{selectedStock.pChange}%
                    </span>
                  </div>

                  {/* Price Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">LAST TRADED PRICE</span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                        ₹{selectedStock.ltp.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Day Change: {selectedStock.change >= 0 ? '+' : ''}₹{selectedStock.change}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">52-WEEK HIGH / LOW</span>
                      <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-1">
                        ₹{selectedStock.week52High.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        Low: ₹{selectedStock.week52Low.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Range & Valuation */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Day High</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{selectedStock.high}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Day Low</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{selectedStock.low}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Turnover</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{selectedStock.valueCrores} Cr</span>
                    </div>
                  </div>

                  {/* 52W Proximity Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Proximity to 52-Week High:</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{selectedStock.highProximity}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${selectedStock.highProximity}%` }}
                      />
                    </div>
                  </div>

                  {/* Sector & Treasury Linking */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Treasury Allocation Insight</span>
                    </div>
                    <p className="text-xs text-indigo-950 dark:text-indigo-100 leading-relaxed">
                      {selectedStock.symbol} represents a blue-chip enterprise component within {selectedStock.sector}. Included in the simulated 30% Growth Index sleeve for surplus optimization.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Treasury Simulator */}
      {activeTab === 'strategy' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Corporate Surplus Deployment Allocation Profiles
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Surplus allocation calibrated against your ₹{potentiallyAvailableSurplus}L risk-modeled liquid reserve:
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
              {(['CONSERVATIVE', 'BALANCED', 'GROWTH-ORIENTED'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setAllocationMode(mode)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    allocationMode === mode
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Asset Allocation Distribution:</span>
                  <span className="font-mono">Total 100% (₹{potentiallyAvailableSurplus}L)</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-slate-100 dark:bg-slate-800">
                  <div
                    style={{ width: `${activeProfile.overnightPercent}%` }}
                    className="bg-emerald-500 h-full transition-all duration-500"
                  />
                  <div
                    style={{ width: `${activeProfile.shortDurationPercent}%` }}
                    className="bg-blue-500 h-full transition-all duration-500"
                  />
                  <div
                    style={{ width: `${activeProfile.growthPercent}%` }}
                    className="bg-purple-500 h-full transition-all duration-500"
                  />
                </div>
                <div className="flex flex-wrap gap-4 text-xs pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-600 dark:text-slate-400">Overnight Sweep ({activeProfile.overnightPercent}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-slate-600 dark:text-slate-400">Short Duration ({activeProfile.shortDurationPercent}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-slate-600 dark:text-slate-400">NIFTY 50 Index ({activeProfile.growthPercent}%)</span>
                  </div>
                </div>
              </div>

              {/* 3 Asset Vehicles */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        Overnight Institutional Liquid Sweep (T+0)
                      </span>
                      <span className="text-[11px] text-slate-500">Sovereign Repo instruments</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      ₹{overnightAmount}L
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">7.4% p.a.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        AAA Short-Duration Commercial Paper (T+1)
                      </span>
                      <span className="text-[11px] text-slate-500">90-Day Bank Certificates of Deposit</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                      ₹{shortDurationAmount}L
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">8.1% p.a.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        NIFTY 50 Top-50 Large Cap Index ETF (T+2)
                      </span>
                      <span className="text-[11px] text-slate-500">Passive diversified equity tracking</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-purple-600 dark:text-purple-400 font-mono">
                      ₹{growthAmount}L
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">12.4% 3Y CAGR Sim</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Profile Strategy
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeProfile.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeProfile.rationale}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Liquidity Horizon:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeProfile.liquiditySpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Simulated Target Yield:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{activeProfile.estimatedApy}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                Analytical scenario simulation. All surplus movements comply with corporate bank sweep mandates.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sector Summaries */}
      {activeTab === 'sectors' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              NIFTY 50 Sectoral Performance & Weightings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Aggregated trading volume and day returns grouped across 9 enterprise sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTOR_SUMMARIES.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 cursor-pointer hover:border-indigo-400 transition-all"
                onClick={() => {
                  setSelectedSector(sec.sector);
                  setActiveTab('matrix');
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {sec.sector}
                  </h4>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {sec.stockCount} Tickers
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                  <span className="text-slate-500">Avg Return:</span>
                  <span className={`font-bold ${
                    sec.avgChangePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {sec.avgChangePercent >= 0 ? '+' : ''}{sec.avgChangePercent}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">Turnover:</span>
                  <span className="text-slate-900 dark:text-white font-bold">₹{sec.totalValueCrores.toLocaleString('en-IN')} Cr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
