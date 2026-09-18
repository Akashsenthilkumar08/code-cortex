import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Zap,
  Globe
} from 'lucide-react';
import { SmeAccount, ActiveTabKey } from '../../types';
import { DimensionalField } from '../../shaders/DimensionalField';
import { FinsafeLogo } from '../FinsafeLogo';

interface LoginPageViewProps {
  accounts: SmeAccount[];
  activeAccount: SmeAccount;
  onSelectAccount: (acc: SmeAccount) => void;
  onLoginSuccess: (targetTab?: ActiveTabKey) => void;
  onBackToLanding: () => void;
}

export const LoginPageView: React.FC<LoginPageViewProps> = ({
  accounts,
  activeAccount,
  onSelectAccount,
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [email, setEmail] = useState<string>('akash.s@acmetrading.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('849201');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authStep, setAuthStep] = useState<'credentials' | 'otp'>('credentials');
  const [palette, setPalette] = useState<'cyan-purple' | 'aurora'>('cyan-purple');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep('otp');
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('overview');
    }, 700);
  };

  const handleQuickDemoLogin = (acc: SmeAccount) => {
    onSelectAccount(acc);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('overview');
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-slate-100 flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* 3D WebGL Dimensional Field Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <DimensionalField palette={palette} opacity={0.88} />
      </div>

      {/* Dark Vignette Overlay */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/90" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToLanding}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <FinsafeLogo size="sm" showTagline={false} />
        </div>

        {/* Atmosphere Toggle */}
        <button
          type="button"
          onClick={() => setPalette(prev => prev === 'cyan-purple' ? 'aurora' : 'cyan-purple')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 text-slate-300 transition-all cursor-pointer backdrop-blur-md"
          title="Toggle Atmosphere"
        >
          <span className={`w-2 h-2 rounded-full ${palette === 'aurora' ? 'bg-fuchsia-400 shadow-[0_0_8px_#e879f9]' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`} />
          <span className="font-mono text-[11px] hidden sm:inline">{palette === 'aurora' ? 'Aurora' : 'Void'}</span>
        </button>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-2xl backdrop-blur-2xl space-y-6"
        >
          {/* Header text */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-medium mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Zero-Trust Enterprise Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sign In to FINSAFE
            </h1>
            <p className="text-xs text-slate-400">
              Access real-time treasury surveillance and multi-vector solvency scoring
            </p>
          </div>

          {/* Quick Demo Account Selector */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Fast 1-Click Demo Profiles</span>
              <span className="text-cyan-400 font-normal">Pre-authenticated</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {accounts.map((acc) => {
                const isSelected = activeAccount.id === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickDemoLogin(acc)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-500/60 shadow-inner'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-white truncate">{acc.name}</span>
                      <Zap className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {acc.type} · {acc.balanceFormatted}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative px-3 bg-slate-950 text-[10px] font-mono uppercase text-slate-500">
              Or Enter Credentials
            </span>
          </div>

          {/* Form */}
          {authStep === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {/* Organization / Corporate Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@enterprise.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Enterprise Password
                  </label>
                  <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </span>
                ) : (
                  <>
                    <span>Proceed to 2FA Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                  <span>2FA Hardware / Authenticator Token</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Enter the 6-digit security code generated by your enterprise authenticator app for <span className="font-mono text-cyan-200">{email}</span>.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-base font-mono tracking-widest rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-center font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAuthStep('credentials')}
                  className="w-1/3 py-3 px-3 rounded-xl font-semibold text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <>
                      <span>Enter Command Center</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Security Compliance Guarantee */}
          <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>256-Bit Hardware Encrypted • RBI AA Compliant</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-[11px] text-slate-600">
        FINSAFE Autonomous Financial Integrity OS © 2026
      </footer>
    </div>
  );
};
