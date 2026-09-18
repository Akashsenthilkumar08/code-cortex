import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Cpu, 
  TrendingUp, 
  Coins, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Server, 
  Zap, 
  FileCheck, 
  ExternalLink,
  Sliders,
  Eye,
  ArrowUpRight,
  Globe,
  Radio
} from 'lucide-react';
import { SmeAccount, ActiveTabKey } from '../../types';
import { DimensionalField } from '../../shaders/DimensionalField';
import { FinsafeLogo } from '../FinsafeLogo';

interface LandingPageViewProps {
  activeAccount: SmeAccount;
  onLaunchDashboard: (tab?: ActiveTabKey) => void;
  onOpenCopilot?: (prompt?: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const ROTATING_CAPABILITIES = [
  'Deterministic Safe Surplus Sweeps',
  'Sub-Second Card Probe Interception',
  'AI-Powered Invoice Hash Deduplication',
  '1000 Hz Continuous Bank Telemetry',
  'Predictive 30-Day Runway Solvency',
];

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  activeAccount,
  onLaunchDashboard,
  onOpenCopilot,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [bgPalette, setBgPalette] = useState<'cyan-purple' | 'aurora'>('cyan-purple');
  const [interactiveSurplus, setInteractiveSurplus] = useState<number>(2620000);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'surplus' | 'fraud' | 'telemetry' | 'ml'>('surplus');
  const [rotatingIndex, setRotatingIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_CAPABILITIES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Live Audited Inflow', value: '₹48.9L+', change: '+14.2% MoM', icon: TrendingUp },
    { label: 'Fraud Intercept Precision', value: '99.4%', change: 'Sliding-Window', icon: ShieldCheck },
    { label: 'Sequence Detection Latency', value: '< 120ms', change: 'Sub-Second', icon: Zap },
    { label: 'Safe Surplus Available', value: '₹26.2L', change: 'Yield Ready', icon: Coins },
  ];

  const features = [
    {
      id: 'surplus',
      name: 'Safe Surplus Engine',
      tagline: 'Deterministic Capital Sizing',
      desc: 'Step-down mathematical deduction guaranteeing zero operational cash disruption before yield deployment.',
      icon: Coins,
      tabTarget: 'surplus' as ActiveTabKey,
      bullets: [
        '5-step capital deduction pipeline (Operating expenses & tax reserves reserved)',
        'Configurable volatility buffer & dynamic threat penalty deduction',
        'Direct clearing route into overnight liquid sweeps (7.4% APY)',
      ],
    },
    {
      id: 'fraud',
      name: 'Real-Time Fraud Radar',
      tagline: 'Multi-Vector Threat Defense',
      desc: 'Isolation forest and sliding-window sequence tracking catching duplicate invoice hashes and micro card probes.',
      icon: ShieldCheck,
      tabTarget: 'fraud_radar' as ActiveTabKey,
      bullets: [
        'Instant interception of card-testing sequences (₹2 → ₹5 → ₹25,000)',
        'Syntactic hash deduplication across vendor invoice registers',
        'Geo-velocity and beneficiary anomaly flags with automated freezing',
      ],
    },
    {
      id: 'telemetry',
      name: '1000 Hz Live Telemetry',
      tagline: 'Sub-Second Signal Pipeline',
      desc: 'High-frequency waveform surveillance of cash streams, GST filings, and real-time bank ledger signals.',
      icon: Radio,
      tabTarget: 'telemetry' as ActiveTabKey,
      bullets: [
        'Continuous signal monitoring with sub-second sample rates',
        'Live waveform canvas with anomaly peak isolation markers',
        'Audit-ready ledger telemetry export and webhook stream integration',
      ],
    },
    {
      id: 'ml',
      name: 'AI/ML Explainability Core',
      tagline: 'Transparent Quantitative Pipeline',
      desc: 'Full visibility into 8-stage ML orchestration with SHAP mathematical point-attribution trees.',
      icon: Cpu,
      tabTarget: 'model_insights' as ActiveTabKey,
      bullets: [
        'ARIMA & LSTM time-series forecast models with 94.2% accuracy',
        '5-vector spider radar solvency score fusion (0–100 resilience)',
        'Full REAL vs DEMO technical transparency and audit disclosures',
      ],
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-slate-100 overflow-x-hidden select-none font-sans">
      {/* 3D WebGL Dimensional Field Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <DimensionalField palette={bgPalette} opacity={0.88} />
      </div>

      {/* Subtle Dark Vignette & Mesh Overlay */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Landing Page Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between backdrop-blur-md bg-slate-950/40 border-b border-white/10 rounded-b-2xl">
        <div className="flex items-center gap-3">
          <FinsafeLogo size="md" showTagline={true} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Sign In Button */}
          <button
            type="button"
            onClick={() => onLaunchDashboard('overview')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 transition-all cursor-pointer"
          >
            Sign In
          </button>

          {/* Launch Command Center Button */}
          <button
            type="button"
            onClick={() => onLaunchDashboard('overview')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 space-y-20">
        <div className="max-w-3xl space-y-6">
          {/* Hero Headline with Kinetic Stagger */}
          <div className="space-y-4">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block"
              >
                Next-Gen Financial Intelligence,
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300"
              >
                Engineered for Bulletproof Growth.
              </motion.span>
            </motion.h1>

            {/* Dynamic Kinetic Capability Cycler */}
            <div className="flex items-center gap-2.5 pt-1">
              <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider font-semibold shrink-0">
                Core Engine:
              </span>
              <div className="h-8 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingIndex}
                    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-xs sm:text-sm font-mono font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-3 py-1 rounded-lg backdrop-blur-md shadow-sm shadow-cyan-500/10"
                  >
                    {ROTATING_CAPABILITIES[rotatingIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={() => onLaunchDashboard('overview')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm text-slate-950 bg-white hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/10 cursor-pointer"
            >
              <span>Initialize Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onLaunchDashboard('surplus')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-slate-500 hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-md cursor-pointer"
            >
              <Coins className="w-4 h-4 text-cyan-400" />
              <span>Simulate Safe Surplus</span>
            </button>

            {onOpenCopilot && (
              <button
                type="button"
                onClick={() => onOpenCopilot('Summarize FINSAFE-X platform capabilities for SME cashflow protection and overnight treasury yields.')}
                className="flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/40 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Live Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-2 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">{s.label}</span>
                  <IconComp className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                    {s.value}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold mt-0.5 block">
                    {s.change}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Interactive Feature Deep Dive Tabs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block font-bold">
                PLATFORM MODULES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Zero-Trust Financial Surveillance & Yield Architecture
              </h2>
            </div>

            {/* Module Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {features.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFeatureTab(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeFeatureTab === f.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Module Content */}
          {features
            .filter((f) => f.id === activeFeatureTab)
            .map((activeModule) => {
              const IconComp = activeModule.icon;
              return (
                <div
                  key={activeModule.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2"
                >
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                          {activeModule.tagline}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {activeModule.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {activeModule.desc}
                    </p>

                    <div className="space-y-2 pt-1">
                      {activeModule.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onLaunchDashboard(activeModule.tabTarget)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors mt-2 cursor-pointer"
                    >
                      <span>Open {activeModule.name} in Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Visual Preview Container */}
                  <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-4">
                    <div className="flex items-center justify-between text-slate-400 pb-3 border-b border-slate-800">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase">
                        LIVE TELEMETRY SNAPSHOT
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {activeAccount.name}
                      </span>
                    </div>

                    {activeModule.id === 'surplus' && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Total Cash in Treasury</span>
                          <span className="font-bold text-white">₹48,90,000</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400">
                          <span>− 30D Fixed Expenses & Payroll</span>
                          <span className="text-rose-400">− ₹14,20,000</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400">
                          <span>− Volatility & Tax Buffer</span>
                          <span className="text-amber-400">− ₹8,50,000</span>
                        </div>
                        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex justify-between items-center text-cyan-300 font-bold">
                          <span>Risk-Adjusted Safe Surplus</span>
                          <span className="text-lg font-black text-cyan-200">₹26,20,000</span>
                        </div>
                      </div>
                    )}

                    {activeModule.id === 'fraud' && (
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/60 text-rose-300 text-[11px]">
                          <span className="font-bold block">🚨 Card Micro-Probe Sequence Blocked</span>
                          <span>4 consecutive ₹2 charges within 18s from IP 185.220.101.4</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                          <span className="font-bold block">Duplicate Vendor Hash Intercepted</span>
                          <span>₹1,45,000 invoice identical to INV-8921 cleared 4 days ago.</span>
                        </div>
                      </div>
                    )}

                    {activeModule.id === 'telemetry' && (
                      <div className="space-y-2">
                        <div className="h-20 w-full bg-slate-950 rounded-lg p-2 flex items-center justify-between gap-1 overflow-hidden">
                          {[35, 48, 62, 28, 90, 44, 52, 78, 30, 95, 40, 60, 85, 30, 45, 70].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t transition-all ${
                                h > 80 ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-cyan-500'
                              }`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 block text-right">
                          1000 Hz Live Waveform Stream Active
                        </span>
                      </div>
                    )}

                    {activeModule.id === 'ml' && (
                      <div className="space-y-2 text-[11px]">
                        <div className="flex justify-between items-center text-slate-300">
                          <span>LSTM Runway Forecast (30D)</span>
                          <span className="text-emerald-400 font-bold">94.2% Conf</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>Isolation Forest Syntactic Hash</span>
                          <span className="text-emerald-400 font-bold">98.4% Prec</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300">
                          <span>SHAP Feature Attribution Delta</span>
                          <span className="text-cyan-400 font-bold">+18 pts Solvency</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Enterprise Compliance & Security Badges */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">Enterprise Security Grade:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              RBI Account Aggregator (AA) Framework
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              256-Bit Bank-Grade TLS Encryption
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ISO 27001 & SOC2 Type II Certified
            </span>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center space-y-6 pt-10 pb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to secure and optimize your enterprise treasury?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Experience real-time ledger intelligence, automated risk scoring, and zero-risk safe surplus optimization.
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => onLaunchDashboard('overview')}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-cyan-500/25 cursor-pointer"
            >
              <span>Launch FINSAFE Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-8 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FinsafeLogo size="sm" showTagline={false} />
            <span>© 2026 FINSAFE Systems. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              type="button"
              onClick={() => onLaunchDashboard('overview')}
              className="hover:text-cyan-400 cursor-pointer"
            >
              Dashboard
            </button>
            <button 
              type="button"
              onClick={() => onLaunchDashboard('model_insights')}
              className="hover:text-cyan-400 cursor-pointer"
            >
              ML Intelligence
            </button>
            <button 
              type="button"
              onClick={() => onLaunchDashboard('surplus')}
              className="hover:text-cyan-400 cursor-pointer"
            >
              Safe Surplus
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
