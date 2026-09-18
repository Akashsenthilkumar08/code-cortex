import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  AlertTriangle, 
  Cpu, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { SmeAccount } from '../../types';

interface AICopilotViewProps {
  activeAccount: SmeAccount;
  onNavigate?: (tab: any) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  factors?: string[];
  suggestedAction?: { label: string; tab: string };
}

export const AICopilotView: React.FC<AICopilotViewProps> = ({
  activeAccount,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I am FINSAFE-X Copilot, your dedicated real-time financial intelligence assistant for ${activeAccount.name}. I analyze your banking telemetry, cash velocity, fraud indicators, and risk-adjusted surplus every sub-second.`,
      timestamp: '10:45 AM',
      factors: [
        'Health Score: 94/100 (A+ Resilience)',
        'Deployable Surplus: ₹26.2L modeled',
        'Fraud Shield: Active (3 Probes Isolated)',
      ],
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'Why did my Financial Health Score change from 88 to 94?',
      timestamp: '10:46 AM',
    },
    {
      id: 'm-3',
      sender: 'ai',
      text: 'Your Financial Health Score gained +6 points over the last 14 days due to three primary drivers detected by our multi-vector fusion model:',
      timestamp: '10:46 AM',
      factors: [
        '+18 pts: Consistent ₹12.4L client receivables cleared with zero overdue lag.',
        '+14 pts: Zero successful fraud penetrations; isolated duplicate claim KV-8902 before ledger settlement.',
        '+12 pts: Liquidity coverage ratio expanded from 3.6x to 4.2x monthly fixed requirements.',
        '-6 pts (Offset): Slight rise in irregular off-hours vendor disbursements.',
      ],
      suggestedAction: {
        label: 'Inspect SHAP Explainability in Financial Health',
        tab: 'financial_health',
      },
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePrompts = [
    {
      category: 'Financial Health',
      icon: ShieldCheck,
      prompt: 'Why did my Financial Health Score change?',
      color: 'text-blue-600 dark:text-cyan-400',
    },
    {
      category: 'Cash Flow',
      icon: TrendingUp,
      prompt: 'What is our 90-day cash runway forecast and burn rate?',
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      category: 'Fraud Detection',
      icon: AlertTriangle,
      prompt: 'Explain the duplicate invoice alert for Kavya Tech Solutions.',
      color: 'text-rose-600 dark:text-rose-400',
    },
    {
      category: 'Safe Surplus',
      icon: Coins,
      prompt: 'How is our ₹26.2L Risk-Adjusted Surplus calculated?',
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      category: 'Investment Strategy',
      icon: Cpu,
      prompt: 'What is the optimal overnight treasury yield strategy today?',
      color: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    setTimeout(() => {
      let replyText = '';
      let replyFactors: string[] | undefined;
      let action: { label: string; tab: string } | undefined;

      const qLower = query.toLowerCase();

      if (qLower.includes('health') || qLower.includes('score')) {
        replyText = `Based on our latest fusion model assessment for ${activeAccount.name}, your score sits at 94/100 (A+ Tier). Cash stability and prompt reconciliation are the top positive drivers.`;
        replyFactors = [
          'Liquidity Coverage: 4.2x monthly requirements (+12 contribution)',
          'Cash Flow Stability: 91/100 (+18 contribution)',
          'Escrow & Fraud Shield: 0 breaches (+14 contribution)',
        ];
        action = { label: 'View Health Radar & SHAP Matrix', tab: 'financial_health' };
      } else if (qLower.includes('cash') || qLower.includes('runway') || qLower.includes('burn')) {
        replyText = `Your current balance is ${activeAccount.balanceFormatted} with an estimated net monthly burn rate of ₹6.4L. At this velocity, your projected runway is 7.6 months under conservative conditions.`;
        replyFactors = [
          'Average 30D Inflow: ₹32.8L',
          'Average 30D Outflow: ₹21.6L',
          'Minimum Liquidity Guard: ₹10.0L',
        ];
        action = { label: 'Open Cash Flow Velocity & Forecast', tab: 'cashflow' };
      } else if (qLower.includes('fraud') || qLower.includes('kavya') || qLower.includes('invoice')) {
        replyText = `Fraud Radar flagged invoice #KV-8902 (₹1,85,000) from Kavya Tech Solutions because it matched an identical purchase ledger submission from Aug 29. Furthermore, beneficiary IFSC was updated 48h prior.`;
        replyFactors = [
          'Confidence Score: 98.4% anomaly match',
          'Status: Payment held in escrow pending managerial audit',
          'Action: Disputed in compliance ledger',
        ];
        action = { label: 'Inspect Threat in Fraud Radar', tab: 'fraud_radar' };
      } else if (qLower.includes('surplus') || qLower.includes('risk-adjusted')) {
        replyText = `From your total cash of ₹48.9L, we deduct ₹14.2L in upcoming 30D operational commitments and an ₹8.5L safety buffer. After a modeled ₹2.0L risk adjustment (accounting for 11% outflow variance and active fraud probes), your Safe Deployable Surplus is ₹26.2L.`;
        replyFactors = [
          'Current Cash: ₹48.9L',
          'Expected 30D Expenses: ₹14.2L',
          'Safety Buffer: ₹8.5L',
          'Risk Adjustment: -₹2.0L (Volatility + Threat index)',
          'Potentially Available Surplus: ₹26.2L',
        ];
        action = { label: 'Open Safe Surplus Engine', tab: 'surplus' };
      } else if (qLower.includes('invest') || qLower.includes('yield') || qLower.includes('treasury')) {
        replyText = `With NIFTY-50 in a Steady Growth regime (VIX 12.8) and your business risk classified as 'Resilient', our engine suggests allocating surplus across Overnight Treasury (7.4% APY, daily liquidity) and Short Duration Corporate Debt (8.1% APY).`;
        replyFactors = [
          'Overnight Treasury Sweep: 60% (₹15.7L)',
          'Short Duration High-Grade: 30% (₹7.8L)',
          'Dynamic Growth Index ETF: 10% (₹2.6L)',
          'Disclaimer: Analytical simulation only, not financial advice.',
        ];
        action = { label: 'Open Investment Intelligence', tab: 'investments' };
      } else {
        replyText = `I have analyzed your query against ${activeAccount.name}'s real-time financial telemetry. Everything across cash velocity, compliance reconciliations, and threat shields remains synchronized.`;
        replyFactors = [
          'Account Status: Active & Fully Reconciled',
          'Telemetry Sampling: 1000 Hz Live Stream Active',
          'Open Anomaly Alerts: 1 Pending Review',
        ];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        factors: replyFactors,
        suggestedAction: action,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 600);
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
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                FINSAFE-X AI Financial Copilot
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-cyan-950/80 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-800/60">
                Active Intelligence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Instant explainability, conversational factor attribution, and surplus simulation for {activeAccount.name}
            </p>
          </div>
        </div>

        {/* Live Model Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Engine: Gemini / SHAP Fusion v4.2</span>
        </div>
      </div>

      {/* Main Grid: Chat Workspace + Quick Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Chat Area */}
        <div className="lg:col-span-2 flex flex-col h-[580px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800/80 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Factor Breakdown Chips */}
                  {msg.factors && msg.factors.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Underlying Factor Attribution:
                      </span>
                      {msg.factors.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono bg-white dark:bg-slate-900/90 p-2 rounded-lg border border-slate-200 dark:border-slate-800/80"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Navigation Action */}
                  {msg.suggestedAction && onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate(msg.suggestedAction?.tab)}
                      className="mt-3 w-full flex items-center justify-between px-3 py-2 rounded-xl bg-blue-50 dark:bg-cyan-950/60 hover:bg-blue-100 dark:hover:bg-cyan-900/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800 text-xs font-semibold transition-colors cursor-pointer group"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}

                  <span className="block text-[10px] text-right mt-1 opacity-70">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Thinking Animation */}
            {isProcessing && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-cyan-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="font-mono text-[11px]">Synthesizing multi-vector model reasoning...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask FINSAFE-X anything (e.g., 'Explain our surplus calculation', 'Why is Kavya Tech flagged?')..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isProcessing}
                className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Quick Question Topics & Knowledge Base */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Suggested Financial Inquiries
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Tap any inquiry to instantly prompt FINSAFE Copilot with the live project data:
            </p>

            <div className="space-y-2.5">
              {samplePrompts.map((sp, idx) => {
                const IconComponent = sp.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(sp.prompt)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 dark:bg-slate-950 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className={`w-3.5 h-3.5 ${sp.color}`} />
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {sp.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 font-medium line-clamp-2">
                      "{sp.prompt}"
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copilot Assurance Notice */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-slate-200 block">
                Deterministic Model Explainability
              </span>
              FINSAFE-X Copilot links all generative language explanations directly to quantitative SHAP factor trees and mathematical ledger balances.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
