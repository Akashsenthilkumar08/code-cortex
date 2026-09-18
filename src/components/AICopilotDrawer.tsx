import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, ShieldCheck, ArrowRight, Zap, RefreshCw, AlertCircle, FileText, Check } from 'lucide-react';
import { SmeAccount } from '../types';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeAccount: SmeAccount;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
  metrics?: { label: string; value: string; positive?: boolean }[];
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  activeAccount,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello Akash! I'm your FINSAFE AI Financial Copilot for ${activeAccount.name}. I've synthesized real-time banking telemetry, GST filings, and Fraud Radar anomaly scores. How can I assist you today?`,
      time: 'Just now',
      suggestions: [
        'Analyze 90-day cash runway',
        'Audit 3 flagged high-risk invoices',
        'Simulate ₹15L working capital loan impact',
      ],
      metrics: [
        { label: 'Live Liquidity', value: activeAccount.balanceFormatted, positive: true },
        { label: 'Runway', value: '7.8 Months', positive: true },
        { label: 'Risk Index', value: 'Low (4%)', positive: true },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponse: Message;

      const lower = promptText.toLowerCase();
      if (lower.includes('runway') || lower.includes('cashflow') || lower.includes('cash')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Based on your recent 90-day average net burn rate of ₹6,25,000/month and current liquid cash of ${activeAccount.balanceFormatted}, ${activeAccount.name} has **7.8 months of operational runway**. Inflow velocity increased by +14.2% week-over-week due to receivables from primary retail distributors.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metrics: [
            { label: 'Monthly Burn', value: '₹6.25L / mo' },
            { label: 'Projected Zero-Date', value: 'May 2027', positive: true },
            { label: 'Safety Buffer', value: 'Healthy (2.4x)', positive: true },
          ],
          suggestions: ['Schedule payout batch for Friday', 'Explore 7.4% yield on idle surplus'],
        };
      } else if (lower.includes('fraud') || lower.includes('invoice') || lower.includes('risk')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `🚨 **Fraud Radar Flag Summary**: We detected 3 anomalous invoices:\n\n1. **Kavya Tech Solutions (₹1,85,000)** - Duplicate invoice hash matching prior cycle.\n2. **R.K. Enterprises (₹4,20,000)** - GSTIN cancelled in state portal on Sep 12.\n3. **Quick Freight Co. (₹94,500)** - 38% price inflation against standard tariff rate.\n\nRecommend withholding payment batch until manual CFO clearance.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Freeze vendor payouts', 'Download audit summary report', 'Request vendor re-verification'],
        };
      } else if (lower.includes('gst') || lower.includes('tax') || lower.includes('mismatch')) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Tax compliance scan for GSTIN \`${activeAccount.gstin}\`: GSTR-2B vs ERP auto-reconciled with **99.8% match rate**. 1 vendor (Vertex suppliers) delayed invoice upload by 4 days, holding ₹34,200 input tax credit. Auto-reminder sent.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Send automated vendor WhatsApp reminder', 'Download GSTR-3B draft'],
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `I've analyzed your query regarding "${promptText}" across ${activeAccount.name}'s integrated accounts. Everything looks stable with positive liquidity flow and zero critical compliance blockers for the upcoming billing cycle.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Check cash runway', 'Show high risk invoices', 'Export summary'],
        };
      }

      setIsThinking(false);
      setMessages((prev) => [...prev, aiResponse]);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="finsafe-copilot-drawer"
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200 text-slate-800 dark:text-slate-100"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/90 text-white flex items-center justify-center font-bold shadow-xs">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight text-white">FINSAFE AI Copilot</h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Context: <span className="text-white font-medium">{activeAccount.name}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-copilot"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {msg.sender === 'user' ? 'Akash S. (You)' : 'FINSAFE Intelligence'}
                </span>
                <span className="text-[9px] text-slate-300 dark:text-slate-600">• {msg.time}</span>
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[90%] text-xs leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs font-medium'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Metrics Cards inside AI Message */}
                {msg.metrics && (
                  <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    {msg.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-center">
                        <div className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">{m.label}</div>
                        <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 font-mono mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick AI Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                  {msg.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendPrompt(s)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/80 px-2.5 py-1 rounded-full transition-colors active:scale-95"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-spin" />
              <span>Analyzing ERP ledgers and banking statements...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about invoices, cashflow, GST..."
              className="flex-1 py-2 px-3 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white dark:focus:bg-slate-850 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Enterprise 256-bit Encrypted
            </span>
            <span>Shortcut: ⌘J to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
