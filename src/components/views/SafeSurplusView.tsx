import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  ArrowDown, 
  ShieldAlert, 
  TrendingDown, 
  HelpCircle, 
  Sparkles, 
  Sliders, 
  ArrowRight,
  Lock,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { SmeAccount } from '../../types';

interface SafeSurplusViewProps {
  activeAccount: SmeAccount;
  onOpenCopilot?: (prompt?: string) => void;
  onNavigate?: (tab: any) => void;
}

export const SafeSurplusView: React.FC<SafeSurplusViewProps> = ({
  activeAccount,
  onOpenCopilot,
  onNavigate,
}) => {
  // Interactive Simulation Controls
  const [currentCash, setCurrentCash] = useState<number>(48.9); // in Lakhs
  const [expectedExpenses, setExpectedExpenses] = useState<number>(14.2); // in Lakhs
  const [safetyBufferMonths, setSafetyBufferMonths] = useState<number>(1.2); // months
  const [volatilityFactor, setVolatilityFactor] = useState<number>(11); // % variance
  const [fraudExposureThreat, setFraudExposureThreat] = useState<'low' | 'moderate' | 'high'>('moderate');

  // Mathematical Pipeline Calculations
  // 1. Safety Buffer = Expenses * BufferMonths * 0.5 (scaled)
  const safetyBuffer = Number(((expectedExpenses * safetyBufferMonths) / 2).toFixed(1));

  // 2. Basic Surplus = Cash - Expected Expenses
  const basicSurplus = Math.max(0, Number((currentCash - expectedExpenses).toFixed(1)));

  // 3. Modeled Risk Buffer calculation:
  // Volatility contribution + Fraud threat penalty
  const volatilityPenalty = Number((basicSurplus * (volatilityFactor / 100) * 0.4).toFixed(1));
  const fraudPenalty = fraudExposureThreat === 'high' ? 2.5 : fraudExposureThreat === 'moderate' ? 1.0 : 0.2;
  const totalModeledRiskBuffer = Number((volatilityPenalty + fraudPenalty).toFixed(1));

  // 4. Potentially Available Risk-Adjusted Surplus
  const riskAdjustedSurplus = Math.max(0, Number((basicSurplus - safetyBuffer - totalModeledRiskBuffer).toFixed(1)));

  const handleResetToBaseline = () => {
    setCurrentCash(48.9);
    setExpectedExpenses(14.2);
    setSafetyBufferMonths(1.2);
    setVolatilityFactor(11);
    setFraudExposureThreat('moderate');
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
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Risk-Adjusted Safe Surplus Engine
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                Active Calculation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Deterministic capital liquidity isolation & risk-modeled surplus allocation for {activeAccount.name}
            </p>
          </div>
        </div>

        {/* Action Button to Reset or Prompt AI */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToBaseline}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          {onOpenCopilot && (
            <button
              type="button"
              onClick={() => onOpenCopilot('Explain the step-by-step calculation of our ₹26.2L Risk-Adjusted Surplus.')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Copilot</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Analytical Simulation Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block uppercase tracking-wide text-[11px]">
            Model-Generated Analytical Estimate — Not Financial Advice
          </span>
          All computed surplus figures are generated by mathematical risk-weighting algorithms. This platform provides simulation metrics based on past telemetry and does not provide personalized investment advice or guaranteed return outcomes.
        </div>
      </div>

      {/* Step-by-Step Visual Pipeline */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Capital Breakdown Pipeline
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Pipeline: Stage 1 → 5 Sequential Reduction
          </span>
        </div>

        {/* 5-Step Pipeline Cards with Connecting Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1: Current Cash */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">STEP 1</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mt-1">Current Cash</span>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
              ₹{currentCash}L
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Total liquid bank pool</span>
          </div>

          {/* Step 2: Expected Expenses */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
            <span className="text-[10px] font-mono text-rose-500 font-bold block">STEP 2 (− DEDUCT)</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mt-1">Expected 30D Ops</span>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">
              − ₹{expectedExpenses}L
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Payroll + Rent + Taxes</span>
          </div>

          {/* Step 3: Safety Buffer */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
            <span className="text-[10px] font-mono text-amber-500 font-bold block">STEP 3 (− RESERVE)</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mt-1">Safety Buffer</span>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
              − ₹{safetyBuffer}L
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">{safetyBufferMonths}x Monthly buffer</span>
          </div>

          {/* Step 4: Risk Adjustment */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative">
            <span className="text-[10px] font-mono text-indigo-500 font-bold block">STEP 4 (− ADJUST)</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mt-1">Risk Buffer</span>
            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              − ₹{totalModeledRiskBuffer}L
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">{volatilityFactor}% Var + Threat factor</span>
          </div>

          {/* Step 5: Potentially Available Surplus */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 dark:border-emerald-500/80 shadow-md relative">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">STEP 5 (= RESULT)</span>
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block mt-1">Safe Deployable</span>
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              ₹{riskAdjustedSurplus}L
            </div>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium block mt-1">Potentially Available</span>
          </div>
        </div>

        {/* Concrete Formula Banner */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex flex-wrap items-center justify-center gap-2 text-center">
          <span className="font-bold text-slate-900 dark:text-white">₹{currentCash}L Cash</span>
          <span className="text-slate-400">−</span>
          <span className="font-bold text-rose-600 dark:text-rose-400">₹{expectedExpenses}L Expected Expenses</span>
          <span className="text-slate-400">=</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">₹{basicSurplus}L Basic Surplus</span>
          <span className="text-slate-400">−</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{(safetyBuffer + totalModeledRiskBuffer).toFixed(1)}L Modeled Buffers</span>
          <span className="text-slate-400">=</span>
          <span className="font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-800">
            ₹{riskAdjustedSurplus}L Risk-Adjusted Surplus
          </span>
        </div>
      </div>

      {/* Interactive Simulation Sliders & Factor Explainability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Interactive Sliders */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Surplus Model Parameters (Live Simulation)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Adjust the sliders below to stress-test your liquidity buffer against operational shifts:
          </p>

          <div className="space-y-4">
            {/* Cash Balance Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Current Cash Pool:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">₹{currentCash} Lakhs</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="0.5"
                value={currentCash}
                onChange={(e) => setCurrentCash(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
              />
            </div>

            {/* Expected Expenses Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Expected Monthly Expenses:</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">₹{expectedExpenses} Lakhs</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="0.5"
                value={expectedExpenses}
                onChange={(e) => setExpectedExpenses(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
            </div>

            {/* Cash-Flow Volatility Factor Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Historical Inflow/Outflow Volatility:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{volatilityFactor}% Variance</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={volatilityFactor}
                onChange={(e) => setVolatilityFactor(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Fraud Threat Exposure Level */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Fraud Radar Threat Level:</span>
                <span className="font-mono font-bold uppercase text-xs text-amber-600 dark:text-amber-400">
                  {fraudExposureThreat} (+₹{fraudPenalty}L Buffer)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'moderate', 'high'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFraudExposureThreat(lvl)}
                    className={`py-2 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                      fraudExposureThreat === lvl
                        ? 'bg-blue-50 dark:bg-cyan-950 border-blue-500 dark:border-cyan-500 text-blue-700 dark:text-cyan-300 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Mathematical Explanation of Influencing Factors */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            How Volatility & Fraud Shape the Modeled Buffer
          </h3>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            {/* Factor 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                <TrendingDown className="w-4 h-4 text-indigo-500" />
                <span>Cash-Flow Volatility Factor ({volatilityFactor}%)</span>
              </div>
              <p>
                When customer payments arrive with high variance (e.g. 15-day collection lags), the algorithm automatically enlarges the modeled risk buffer by <strong className="text-slate-900 dark:text-slate-200">₹{volatilityPenalty}L</strong> to guarantee zero payroll disruption.
              </p>
            </div>

            {/* Factor 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Fraud Threat Escalation Factor</span>
              </div>
              <p>
                Active probes (such as the 3 intercepted micro-tests) trigger an automated escrow reservation of <strong className="text-slate-900 dark:text-slate-200">₹{fraudPenalty}L</strong> to shield liquid cash until suspicious dispute cycles clear.
              </p>
            </div>

            {/* Factor 3 */}
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Optimal Deployment Readiness</span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-300">
                The remaining <strong className="text-emerald-950 dark:text-emerald-100">₹{riskAdjustedSurplus}L</strong> can be safely swept into overnight institutional yield without risking operational solvency.
              </p>
            </div>
          </div>

          {/* Action Link to Investments */}
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('investments')}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
            >
              <span>Explore Yield Deployment for ₹{riskAdjustedSurplus}L Surplus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
