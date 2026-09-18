import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Info, 
  ExternalLink,
  ChevronRight,
  Clock,
  MapPin,
  Globe,
  CreditCard,
  Building,
  ArrowUpRight,
  ArrowDownLeft,
  Layers,
  Download,
  Building2
} from 'lucide-react';
import { SmeAccount } from '../../types';
import {
  BANK_ACCOUNTS_METADATA,
  REAL_BANK_TRANSACTIONS,
  BANK_LEDGER_STATS,
  RealBankTransaction
} from '../../data/bankTransactionsData';

interface TransactionsViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot?: (prompt?: string) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  activeAccount,
  onOpenCopilot,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccountFilter, setSelectedAccountFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'amount' | 'runningBalance' | 'risk' | 'date'>('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTx, setSelectedTx] = useState<RealBankTransaction | null>(REAL_BANK_TRANSACTIONS[0]);

  // Unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    REAL_BANK_TRANSACTIONS.forEach((tx) => cats.add(tx.category));
    return Array.from(cats);
  }, []);

  // Filtered & Sorted Transactions
  const filteredTransactions = useMemo(() => {
    return REAL_BANK_TRANSACTIONS.filter((tx) => {
      const searchMatch = 
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.accountNo.includes(searchTerm) ||
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!searchMatch) return false;

      // Account filter
      if (selectedAccountFilter !== 'all' && tx.accountNo !== selectedAccountFilter) {
        return false;
      }

      // Type Filter
      if (selectedTypeFilter !== 'all' && tx.type.toLowerCase() !== selectedTypeFilter.toLowerCase()) {
        return false;
      }

      // Category Filter
      if (selectedCategoryFilter !== 'all' && tx.category !== selectedCategoryFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'amount') {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      if (sortBy === 'runningBalance') {
        return sortOrder === 'desc' ? b.runningBalance - a.runningBalance : a.runningBalance - b.runningBalance;
      }
      if (sortBy === 'risk') {
        return sortOrder === 'desc' ? b.riskScore - a.riskScore : a.riskScore - b.riskScore;
      }
      return 0;
    });
  }, [searchTerm, selectedAccountFilter, selectedTypeFilter, selectedCategoryFilter, sortBy, sortOrder]);

  const toggleSort = (field: 'amount' | 'runningBalance' | 'risk' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Account No', 'Date', 'Description', 'Cheque No', 'Amount', 'Type', 'Running Balance', 'Category', 'Location', 'Status'];
    const rows = filteredTransactions.map(tx => [
      tx.id,
      tx.accountNo,
      tx.date,
      `"${tx.description.replace(/"/g, '""')}"`,
      tx.chequeNo,
      tx.amount,
      tx.type,
      tx.runningBalance,
      tx.category,
      `"${tx.location}"`,
      tx.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bank_ledger_export_${activeAccount.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-28 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Corporate Bank Ledger & Transaction Matrix
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-cyan-950/80 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-800/60">
                116,201 Ledger Records Audited
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-account Federal & HDFC banking ledgers, cash deposits, RTGS transfers, and automated reconciliation for {activeAccount.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {onOpenCopilot && (
            <button
              type="button"
              onClick={() => onOpenCopilot('Audit high-value RTGS and Federal Bank internal transfers in the corporate ledger.')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Audit with Copilot</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Top Ledger KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Recorded</span>
            <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
              <Layers className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            {BANK_LEDGER_STATS.totalRecordedTransactions.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            5 tracked enterprise accounts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Bank Pools</span>
            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Building2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            {BANK_LEDGER_STATS.activeTrackedAccounts} Nodes
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
            Federal, HDFC, ICICI, SBI
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Deposits</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Inflow</span>
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            ₹15.78 Cr
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            RTGS, NEFT & Branch Cash
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audit Confidence</span>
            <span className="p-1 rounded-md bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 mt-1 font-mono">
            {BANK_LEDGER_STATS.ledgerAuditConfidence}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
            Zero reconciliation mismatch
          </span>
        </div>
      </div>

      {/* Account Selector Pill Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setSelectedAccountFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            selectedAccountFilter === 'all'
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          All Accounts (116.2k)
        </button>

        {BANK_ACCOUNTS_METADATA.map((acc) => (
          <button
            key={acc.accountNo}
            type="button"
            onClick={() => setSelectedAccountFilter(acc.accountNo)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              selectedAccountFilter === acc.accountNo
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: acc.color }} />
            <span>A/c ..{acc.accountNo.slice(-6)} ({acc.totalTransactions.toLocaleString('en-IN')})</span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by transaction description, branch (Gurgaon/Karol Bagh), account no..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-[11px] font-bold text-slate-400 px-1.5">Category:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-2 py-1 text-xs font-bold rounded-lg bg-transparent text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-[11px] font-bold text-slate-400 px-1.5">Type:</span>
            {(['all', 'inflow', 'outflow'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTypeFilter(t)}
                className={`px-2 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                  selectedTypeFilter === t
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Table (Left 7 Cols) + Inspection Drawer (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Container */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Showing {filteredTransactions.length} Verified Ledger Entries
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Click row to inspect ledger details
            </span>
          </div>

          <div className="overflow-x-auto flex-1 max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3.5">Date & Account</th>
                  <th className="py-3 px-3.5">Transaction Details</th>
                  <th 
                    className="py-3 px-3.5 text-right cursor-pointer hover:text-blue-600"
                    onClick={() => toggleSort('amount')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="py-3 px-3.5 text-right cursor-pointer hover:text-blue-600"
                    onClick={() => toggleSort('runningBalance')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span>Balance</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredTransactions.map((tx) => {
                  const isSelected = selectedTx?.id === tx.id;
                  const isInflow = tx.type === 'Inflow';

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className={`hover:bg-blue-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/80 dark:bg-slate-800/90 font-semibold' : ''
                      }`}
                    >
                      {/* Date & Account */}
                      <td className="py-3.5 px-3.5 whitespace-nowrap">
                        <span className="text-slate-900 dark:text-white font-bold block">{tx.date}</span>
                        <span className="text-[10px] text-slate-400 font-mono">A/c ..{tx.accountNo.slice(-6)}</span>
                      </td>

                      {/* Description & Category */}
                      <td className="py-3.5 px-3.5">
                        <span className="text-slate-900 dark:text-white font-bold block line-clamp-1">{tx.description}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{tx.category} · {tx.location}</span>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-3.5 text-right font-mono font-bold whitespace-nowrap">
                        <span className={isInflow ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}>
                          {isInflow ? '+' : '−'}₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                      </td>

                      {/* Running Balance */}
                      <td className="py-3.5 px-3.5 text-right font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap text-[11px]">
                        ₹{tx.runningBalance.toLocaleString('en-IN')}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          tx.status === 'Flagged'
                            ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400'
                            : tx.status === 'Under Review'
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 5 Cols: Selected Transaction Detailed Inspection Panel */}
        <div className="lg:col-span-5">
          {selectedTx ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5 sticky top-20">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Ledger Audit #{selectedTx.id} (Row #{selectedTx.rawIndex})
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedTx.description}
                  </h3>
                  <span className="text-xs text-slate-500">{selectedTx.accountName} · A/c {selectedTx.accountNo}</span>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  selectedTx.status === 'Flagged'
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
                    : selectedTx.status === 'Under Review'
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                    : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                }`}>
                  {selectedTx.status}
                </span>
              </div>

              {/* Amount & Balance Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">TRANSACTION AMOUNT</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                    {selectedTx.type === 'Inflow' ? '+' : '−'}₹{selectedTx.amount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-slate-500">{selectedTx.type} via {selectedTx.category}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block">POST-TRANSACTION BALANCE</span>
                  <div className="text-2xl font-black font-mono text-blue-600 dark:text-cyan-400 mt-0.5">
                    ₹{selectedTx.runningBalance.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    Cheque/Ref: {selectedTx.chequeNo}
                  </span>
                </div>
              </div>

              {/* Transaction Intelligence & Routing */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Value Date / Posting Date:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{selectedTx.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clearing Node / Location:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedTx.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reconciliation Risk Score:</span>
                  <span className={`font-bold font-mono ${
                    selectedTx.riskScore > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {selectedTx.riskScore}/100
                  </span>
                </div>
              </div>

              {/* AI Copilot Explanation */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-cyan-950/30 border border-blue-200 dark:border-cyan-800/60 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-900 dark:text-cyan-300 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>AI Bank Ledger Reconciliation Note</span>
                </div>
                <p className="text-xs text-blue-950 dark:text-cyan-100 leading-relaxed">
                  Transaction #{selectedTx.id} verified against Federal/HDFC corporate banking statements. Cleanly matches {selectedTx.category} batch reconciliation rules with 99.98% certainty.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-slate-400">
              Select a transaction to inspect ledger audit trail.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
