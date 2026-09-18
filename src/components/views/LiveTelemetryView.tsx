import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Zap,
  Radio,
  Wifi,
  ShieldCheck,
  Server,
  Play,
  Pause,
  RefreshCw,
  Cpu,
  Layers,
  Terminal,
  Database,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { SmeAccount } from '../../types';

interface LiveTelemetryViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot: (prompt: string) => void;
}

interface TelemetryEvent {
  id: string;
  time: string;
  event: string;
  system: string;
  status: 'ok' | 'flagged' | 'sync';
}

export const LiveTelemetryView: React.FC<LiveTelemetryViewProps> = ({
  activeAccount,
  onOpenCopilot,
}) => {
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [events, setEvents] = useState<TelemetryEvent[]>([
    { id: '1', time: '10:44:02', event: 'Banking API gateway synchronized with HDFC Node', system: 'BANK DATA', status: 'ok' },
    { id: '2', time: '10:44:06', event: 'Real-time liquidity buffer assessed: ₹48.9L available', system: 'CASH ENGINE', status: 'ok' },
    { id: '3', time: '10:44:09', event: 'Heuristic model scanned 42 incoming ledger events', system: 'FRAUD ENGINE', status: 'ok' },
    { id: '4', time: '10:44:12', event: 'Financial health metric indexed at 94/100', system: 'HEALTH MATRIX', status: 'ok' },
    { id: '5', time: '10:44:15', event: 'Overnight auto-sweep rate matched 7.40% APY', system: 'MARKET DATA', status: 'ok' },
    { id: '6', time: '10:44:18', event: 'Suspicious card-testing probe blocked on Gateway 04', system: 'FRAUD ENGINE', status: 'flagged' },
  ]);

  // Live streaming simulation timer
  useEffect(() => {
    if (!isLiveStreaming) return;

    const streamTemplates = [
      { event: 'Transaction telemetry packet parsed (12ms latency)', system: 'BANK DATA', status: 'ok' as const },
      { event: 'Cash-flow velocity trajectory recalculated (+₹12.4L net)', system: 'CASH ENGINE', status: 'ok' as const },
      { event: 'Fraud neural classifier evaluated sequence risk (<0.02)', system: 'FRAUD ENGINE', status: 'ok' as const },
      { event: 'SHAP factor weights refreshed for Q3 audit snapshot', system: 'HEALTH MATRIX', status: 'ok' as const },
      { event: 'Treasury liquidity yields calibrated at 7.42% APY', system: 'MARKET DATA', status: 'ok' as const },
      { event: 'Autonomous reserve safety buffer locked at ₹8.5L', system: 'AI ENGINE', status: 'ok' as const },
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomTemplate = streamTemplates[Math.floor(Math.random() * streamTemplates.length)];

      setEvents((prev) => [
        {
          id: String(Date.now()),
          time: timeStr,
          event: randomTemplate.event,
          system: randomTemplate.system,
          status: randomTemplate.status,
        },
        ...prev.slice(0, 15),
      ]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8"
    >
      {/* Telemetry Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLiveStreaming ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                isLiveStreaming ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
              {isLiveStreaming ? 'LIVE TELEMETRY STREAM' : 'STREAM PAUSED'}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              DEMO TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Real-Time Financial Network Oscillator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Continuous sub-second telemetry feeds across banking pipelines, ML evaluators, and liquidity nodes.
          </p>
        </div>

        {/* Live Stream Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isLiveStreaming
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveStreaming ? 'Pause Stream' : 'Resume Stream'}</span>
          </button>
        </div>
      </div>

      {/* Real-Time Live Data Streams (5 Stream Indicators) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Cash Stream */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span className="font-mono">STREAM // 01</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mt-2">Cash Node</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            ₹48.9L
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block mt-1">Delta: +0.42 L/s</span>
        </div>

        {/* Fraud Stream */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span className="font-mono">STREAM // 02</span>
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mt-2">Fraud Shield</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
            3 Flagged
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block mt-1">Status: Shield Active</span>
        </div>

        {/* Financial Health */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span className="font-mono">STREAM // 03</span>
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mt-2">Health Matrix</span>
          <div className="text-2xl font-black text-blue-600 dark:text-cyan-300 mt-0.5">
            94 / 100
          </div>
          <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono block mt-1">Grade: A+ Resilience</span>
        </div>

        {/* Liquidity Stream */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span className="font-mono">STREAM // 04</span>
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mt-2">Liquidity Condition</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            Stable
          </div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono block mt-1">Coverage: 4.2x Ratio</span>
        </div>

        {/* Market Yield Stream */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span className="font-mono">STREAM // 05</span>
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block mt-2">Market Yield</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-300 mt-0.5">
            7.4% APY
          </div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono block mt-1">Overnight Sweeps</span>
        </div>
      </div>

      {/* Futuristic Waveform & Signal Pulse Visualization */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-white space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
              Live Signal Waveform & Network Oscillator
            </h3>
          </div>
          <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 flex items-center gap-1.5 font-semibold">
            <Wifi className="w-3.5 h-3.5 animate-pulse" /> 1000 Hz Sampling Frequency
          </span>
        </div>

        {/* Simulated Waveform Canvas/SVG */}
        <div className="w-full h-32 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden flex items-center justify-center">
          {/* Animated Background Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_1rem] opacity-40 dark:opacity-30"></div>

          {/* Glowing Animated Waveform SVG */}
          <svg className="w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="35%" stopColor="#0284c7" />
                <stop offset="70%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Primary Pulse Wave */}
            <path
              d="M0 60 Q 50 10, 100 60 T 200 60 T 300 20 T 400 90 T 500 40 T 600 80 T 700 30 T 800 65 T 900 45 T 1000 60"
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="2.5"
              className={isLiveStreaming ? 'animate-pulse' : ''}
            />

            {/* Secondary Ghost Harmonic Wave */}
            <path
              d="M0 60 Q 60 90, 120 60 T 240 60 T 360 85 T 480 35 T 600 70 T 720 40 T 840 75 T 960 50 T 1000 60"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </svg>

          {/* Center Scan Indicator Line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 dark:bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        </div>

        {/* System Monitoring Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">BANK DATA</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ● CONNECTED
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">FRAUD ENGINE</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ● ACTIVE
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">CASH ENGINE</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ● ACTIVE
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">AI ENGINE</span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1">
              ● ACTIVE
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300">MARKET DATA</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              ● CONNECTED
            </span>
          </div>
        </div>
      </div>

      {/* Live Event Feed Stream Console */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Real-Time Event Stream Log
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Auto-scrolling stream</span>
        </div>

        {/* Live event log items */}
        <div className="space-y-2 font-mono text-xs max-h-[300px] overflow-y-auto pr-1">
          {events.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 ${
                evt.status === 'flagged'
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60 text-rose-700 dark:text-rose-300'
                  : 'bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold">{evt.time}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {evt.system}
                </span>
                <span className="text-xs">{evt.event}</span>
              </div>

              <span className={`text-[10px] font-bold uppercase self-end sm:self-auto ${
                evt.status === 'flagged' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                {evt.status === 'flagged' ? 'ALERT TRIGGERED' : 'VERIFIED'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
