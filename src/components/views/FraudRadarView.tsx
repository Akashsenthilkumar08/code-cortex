import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Lock,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  ChevronRight,
  Zap,
  Info,
  Activity,
  Cpu,
  Fingerprint,
  Layers,
  BarChart2
} from 'lucide-react';
import { SmeAccount } from '../../types';
import {
  FRAUD_DATASET_SUMMARY,
  AUTHENTIC_FRAUD_CASES,
  FraudCaseRecord
} from '../../data/fraudData';

interface FraudRadarViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot: (prompt: string) => void;
}

export const FraudRadarView: React.FC<FraudRadarViewProps> = ({
  activeAccount,
  onOpenCopilot,
}) => {
  const [fraudTrendRange, setFraudTrendRange] = useState<'24H' | '7D' | '30D'>('24H');
  const [selectedCase, setSelectedCase] = useState<FraudCaseRecord>(AUTHENTIC_FRAUD_CASES[0]);
  const [activeTab, setActiveTab] = useState<'live_feed' | 'pca_vectors' | 'models' | 'simulator'>('live_feed');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'Critical' | 'High'>('all');

  // Interactive Anomaly Simulator state
  const [simV14, setSimV14] = useState<number>(-4.2);
  const [simV4, setSimV4] = useState<number>(3.8);
  const [simAmount, setSimAmount] = useState<number>(185.0);

  // Compute simulated anomaly score dynamically
  const simulatedAnomalyScore = useMemo(() => {
    const rawScore = 50 + Math.abs(simV14) * 6.5 + Math.abs(simV4) * 4.2 + (simAmount > 500 ? 10 : 0);
    return Math.min(99.4, Math.max(12.0, Math.round(rawScore * 10) / 10));
  }, [simV14, simV4, simAmount]);

  const summary = FRAUD_DATASET_SUMMARY;

  const filteredCases = useMemo(() => {
    return AUTHENTIC_FRAUD_CASES.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.anomalyCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.timeFormatted.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;
      if (severityFilter !== 'all' && item.severity !== severityFilter) return false;

      return true;
    });
  }, [searchTerm, severityFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6"
    >
      {/* Header Banner & Trend Time Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Autonomous Fraud & Threat Detection Radar
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Real-Time Credit Card Anomaly & PCA Neural Screening
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Trained on 284,807 audited transactions with 492 confirmed fraud signatures for {activeAccount.name}
          </p>
        </div>

        {/* Time Filters & Copilot Trigger */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {(['24H', '7D', '30D'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setFraudTrendRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  fraudTrendRange === range
                    ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenCopilot('Summarize high-risk PCA anomalies and recommend autonomous card-locking rules.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Threat Copilot</span>
          </button>
        </div>
      </div>

      {/* Main Fraud Exposure KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Screened */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Screened</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Audited
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            284.8k
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">284,807 transactions</span>
        </div>

        {/* Confirmed Frauds */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Confirmed Frauds</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">
            {summary.fraudTransactions} <span className="text-xs font-normal text-slate-400">cases</span>
          </div>
          <span className="text-[11px] text-rose-500 font-medium block mt-1">
            {summary.fraudRatePercentage}% base anomaly rate
          </span>
        </div>

        {/* Avg Fraud Amount */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Avg Fraud Amount</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
            ₹{Math.round(summary.averageFraudAmount * 84).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            vs ₹{Math.round(summary.averageNormalAmount * 84)} normal avg
          </span>
        </div>

        {/* Model Precision */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Neural Precision</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            96.1%
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">
            98.8% ROC-AUC score
          </span>
        </div>

        {/* Total Intercepted Value */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Retained in Escrow</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            ₹50.50L
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">100% pre-auth blocked</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
        {[
          { id: 'live_feed', label: 'Authentic Fraud Feed (492 Cases)' },
          { id: 'pca_vectors', label: 'PCA Vector Telemetry (V1-V28)' },
          { id: 'models', label: 'Detection ML Model Benchmarks' },
          { id: 'simulator', label: 'Neural Anomaly Simulator' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Live Authentic Fraud Feed */}
      {activeTab === 'live_feed' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by case ID, anomaly category, or timestamp..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Severity:</span>
              {(['all', 'Critical', 'High'] as const).map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    severityFilter === sev
                      ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Grid: Cases Table (7 cols) + Detail Panel (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Showing {filteredCases.length} Real Fraud Telemetry Records
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Extracted from creditcard.csv
                </span>
              </div>

              <div className="overflow-x-auto flex-1 max-h-[550px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-3.5">Case ID</th>
                      <th className="py-3 px-3.5">Timestamp</th>
                      <th className="py-3 px-3.5 text-right">Amount</th>
                      <th className="py-3 px-3.5 text-center">Risk Score</th>
                      <th className="py-3 px-3.5">Anomaly Category</th>
                      <th className="py-3 px-3.5 text-right">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {filteredCases.map((fc) => {
                      const isSelected = selectedCase?.id === fc.id;

                      return (
                        <tr
                          key={fc.id}
                          onClick={() => setSelectedCase(fc)}
                          className={`hover:bg-rose-50/50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors ${
                            isSelected ? 'bg-rose-50/80 dark:bg-rose-950/40 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900 dark:text-white">
                            {fc.id}
                          </td>
                          <td className="py-3.5 px-3.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            {fc.timeFormatted}
                          </td>
                          <td className="py-3.5 px-3.5 text-right font-mono font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">
                            {fc.amountFormatted}
                          </td>
                          <td className="py-3.5 px-3.5 text-center font-mono">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800">
                              {fc.riskScore}
                            </span>
                          </td>
                          <td className="py-3.5 px-3.5 text-slate-700 dark:text-slate-300 text-xs">
                            {fc.anomalyCategory}
                          </td>
                          <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              fc.severity === 'Critical'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            }`}>
                              {fc.severity}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail Panel (5 cols) */}
            <div className="lg:col-span-5">
              {selectedCase ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5 sticky top-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                        Fraud Telemetry #{selectedCase.id}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                        {selectedCase.anomalyCategory}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono">
                        {selectedCase.timeFormatted} · Isolation Score: {selectedCase.isolationForestScore}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white">
                      {selectedCase.severity}
                    </span>
                  </div>

                  {/* Value & Risk */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">THREAT AMOUNT</span>
                      <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5">
                        {selectedCase.amountFormatted}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">USD ${selectedCase.usdAmount.toFixed(2)}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block">NEURAL RISK SCORE</span>
                      <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5">
                        {selectedCase.riskScore} <span className="text-xs text-slate-400">/ 100</span>
                      </div>
                      <span className="text-[11px] text-rose-500 font-bold">Confirmed Anomaly</span>
                    </div>
                  </div>

                  {/* PCA Telemetry Vector Grid */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      PCA Feature Vector Displacements (Trained Model Signatures)
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                      {Object.entries(selectedCase.pcaVector).map(([k, v]) => (
                        <div
                          key={k}
                          className={`p-2 rounded-lg border text-center ${
                            Math.abs(v as number) > 2.0
                              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-700 dark:text-rose-300 font-bold'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 block">{k}</span>
                          <span>{v as number}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Forensic Explanation */}
                  <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>AI Forensic Anomaly Explainer</span>
                    </div>
                    <p className="text-xs text-rose-950 dark:text-rose-100 leading-relaxed">
                      "{selectedCase.aiForensicSummary}"
                    </p>
                  </div>

                  {/* Suggested Autonomous Action */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Autonomous Mitigation Policy
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {selectedCase.suggestedAction}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PCA Vector Telemetry */}
      {activeTab === 'pca_vectors' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Principal Component Analysis (PCA) Discriminative Telemetry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparison between normal transaction distributions (284,315 records) and confirmed fraud distributions (492 records)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.pcaAnomalies.map((pca, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                    Feature {pca.feature}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800">
                    {pca.anomalyDirection}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Fraud Mean</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">{pca.fraudMean}</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Normal Mean</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{pca.normalMean}</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Separation Delta</span>
                    <span className="font-bold text-blue-600 dark:text-cyan-400">Δ {pca.deviationScore}</span>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-rose-500"
                    style={{ width: `${Math.min(100, pca.deviationScore * 14)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Model Benchmarks */}
      {activeTab === 'models' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Supervised & Unsupervised Machine Learning Model Benchmarks
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cross-validated performance on the complete 284,807 transaction credit card dataset
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.modelMetrics.map((mod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {mod.modelName}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    {mod.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Precision</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{mod.precision}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Recall</span>
                    <span className="font-black text-blue-600 dark:text-cyan-400">{mod.recall}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">F1 Score</span>
                    <span className="font-black text-purple-600 dark:text-purple-400">{mod.f1Score}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Latency</span>
                    <span className="font-black text-slate-900 dark:text-white">{mod.inferenceLatencyMs}ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Neural Anomaly Simulator */}
      {activeTab === 'simulator' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive Neural Anomaly Classifier Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Adjust PCA feature vectors and transaction amounts to observe the model's live threat score evaluation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              {/* Slider 1: V14 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>V14 Component (Key Negative Surge Indicator):</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">{simV14}</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="5"
                  step="0.1"
                  value={simV14}
                  onChange={(e) => setSimV14(parseFloat(e.target.value))}
                  className="w-full cursor-pointer accent-rose-500"
                />
                <span className="text-[11px] text-slate-400 block">
                  Negative displacement below -3.0 indicates severe fraud probability.
                </span>
              </div>

              {/* Slider 2: V4 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>V4 Component (Positive Spike Indicator):</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">{simV4}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="15"
                  step="0.1"
                  value={simV4}
                  onChange={(e) => setSimV4(parseFloat(e.target.value))}
                  className="w-full cursor-pointer accent-rose-500"
                />
                <span className="text-[11px] text-slate-400 block">
                  Positive spikes above +3.0 match rapid token test patterns.
                </span>
              </div>

              {/* Slider 3: Amount */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Simulated Transaction Amount:</span>
                  <span className="font-mono text-slate-900 dark:text-white">₹{Math.round(simAmount * 84).toLocaleString('en-IN')} (${simAmount})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={simAmount}
                  onChange={(e) => setSimAmount(parseFloat(e.target.value))}
                  className="w-full cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Right Output Score Box */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-rose-950/20 to-slate-950 border border-rose-300 dark:border-rose-900/60 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  Real-Time Model Classification
                </span>
                <div className={`text-4xl font-black font-mono mt-2 ${
                  simulatedAnomalyScore >= 75 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  {simulatedAnomalyScore}% <span className="text-xs font-normal text-slate-400">Risk</span>
                </div>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mt-2 ${
                  simulatedAnomalyScore >= 75
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {simulatedAnomalyScore >= 75 ? 'CRITICAL ANOMALY DETECTED' : 'NOMINAL SAFE TRANSACTION'}
                </span>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                  {simulatedAnomalyScore >= 75
                    ? 'Vectors represent severe divergence from baseline centroid. Isolation Forest triggers automated transaction quarantine.'
                    : 'Vectors remain within the 99% nominal confidence boundary. Transaction approved.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSimV14(-4.2);
                  setSimV4(3.8);
                  setSimAmount(185);
                }}
                className="text-xs font-bold text-rose-400 hover:underline text-left cursor-pointer"
              >
                Reset to Benchmark Fraud Signature ↺
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
