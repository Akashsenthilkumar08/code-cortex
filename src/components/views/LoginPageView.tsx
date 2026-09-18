import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Zap,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { SmeAccount, ActiveTabKey } from '../../types';
import { DataPixelArcCanvas } from '../../shaders/data-pixel-arc/DataPixelArcCanvas';
import { FinsafeLogo } from '../FinsafeLogo';
import {
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithGithub,
} from '../../lib/firebase';

interface LoginPageViewProps {
  accounts: SmeAccount[];
  activeAccount: SmeAccount;
  onSelectAccount: (acc: SmeAccount) => void;
  onLoginSuccess: (targetTab?: ActiveTabKey) => void;
  onBackToLanding: () => void;
}

// ── Social button icon components ─────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
    <path d="M0 0h15.206v15.206H0zM16.794 0H32v15.206H16.794zM0 16.794h15.206V32H0zM16.794 16.794H32V32H16.794z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
  </svg>
);

export const LoginPageView: React.FC<LoginPageViewProps> = ({
  accounts,
  activeAccount,
  onSelectAccount,
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [username, setUsername]       = useState('akash.s@acmetrading.com');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode]         = useState('');
  const [authStep, setAuthStep]       = useState<'credentials' | 'otp'>('credentials');
  const [isLoading, setIsLoading]     = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'microsoft' | 'github' | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const [hueShift, setHueShift]       = useState(0);
  const HUE_PRESETS = [0, 160, 280, 60] as const;
  const HUE_LABELS  = ['Emerald', 'Teal', 'Violet', 'Amber'] as const;

  // ── Credential sign in ─────────────────────────────────────────
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setAuthStep('otp'); }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onLoginSuccess('overview'); }, 700);
  };

  // ── Quick demo login ───────────────────────────────────────────
  const handleQuickDemoLogin = (acc: SmeAccount) => {
    onSelectAccount(acc);
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onLoginSuccess('overview'); }, 400);
  };

  // ── Social / OAuth login ───────────────────────────────────────
  const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'github') => {
    setError(null);
    setSocialLoading(provider);
    try {
      if (provider === 'google')    await signInWithGoogle();
      if (provider === 'microsoft') await signInWithMicrosoft();
      if (provider === 'github')    await signInWithGithub();
      onLoginSuccess('overview');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      // Ignore user-cancelled popup
      if (!msg.includes('popup-closed') && !msg.includes('cancelled')) {
        setError(msg.replace('Firebase: ', '').replace(/\s*\(auth\/.*\)/, ''));
      }
    } finally {
      setSocialLoading(null);
    }
  };

  // ── Shared card wrapper ────────────────────────────────────────
  const Card = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        width: 340,
        borderRadius: '0.75rem',
        backgroundColor: 'rgba(17, 24, 39, 0.96)',
        padding: '2rem',
        color: 'rgba(243, 244, 246, 1)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(55, 65, 81, 0.8)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden select-none font-sans"
      style={{ background: '#030308', color: '#f3f4f6' }}
    >
      {/* ── Data Pixel Arc background ── */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <DataPixelArcCanvas
          mode="dark" speed={1.0} pixelSize={9}
          arcCenter={0.42} arcDrop={0.88} thickness={0.38}
          brightness={1.0} hue={hueShift} saturation={1.0}
        />
      </div>

      {/* ── Vignette ── */}
      <div className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.9) 100%)' }} />

      {/* ── Top header ── */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <button
          type="button" onClick={onBackToLanding}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer group transition-all"
          style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(55,65,81,1)', color: '#cbd5e1' }}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>

        <FinsafeLogo size="sm" showTagline={false} />

        {/* Hue cycle button */}
        <button
          type="button"
          onClick={() => setHueShift(prev => {
            const idx = HUE_PRESETS.indexOf(prev as typeof HUE_PRESETS[number]);
            return HUE_PRESETS[(idx + 1) % HUE_PRESETS.length];
          })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all"
          style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(55,65,81,1)', color: '#cbd5e1' }}
        >
          <span className="w-2 h-2 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: `hsl(${(130 + hueShift) % 360}, 80%, 55%)`,
              boxShadow: `0 0 8px hsl(${(130 + hueShift) % 360}, 80%, 55%)`,
            }} />
          <span className="font-mono text-[11px] hidden sm:inline">
            {HUE_LABELS[HUE_PRESETS.indexOf(hueShift as typeof HUE_PRESETS[number])] ?? 'Emerald'}
          </span>
        </button>
      </header>

      {/* ── Main content ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6">

        {/* ── Quick Demo Profiles (above card) ── */}
        <div style={{ width: 340 }}>
          <div className="flex items-center justify-between mb-2"
            style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(156,163,175,1)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span>Fast 1-Click Demo Profiles</span>
            <span style={{ color: '#a78bfa', fontWeight: 400 }}>Pre-authenticated</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {accounts.map((acc) => {
              const isSel = activeAccount.id === acc.id;
              return (
                <button
                  key={acc.id} type="button"
                  onClick={() => handleQuickDemoLogin(acc)}
                  className="p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between"
                  style={{
                    background: isSel ? 'rgba(109,40,217,0.25)' : 'rgba(17,24,39,0.7)',
                    border: `1px solid ${isSel ? 'rgba(167,139,250,0.6)' : 'rgba(55,65,81,1)'}`,
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold truncate" style={{ color: '#f3f4f6' }}>{acc.name}</span>
                    <Zap className="w-3 h-3 shrink-0 ml-1" style={{ color: '#a78bfa' }} />
                  </div>
                  <span className="font-mono mt-0.5" style={{ fontSize: '0.625rem', color: 'rgba(156,163,175,1)' }}>
                    {acc.type} · {acc.balanceFormatted}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Auth card ── */}
        <AnimatePresence mode="wait">
          {authStep === 'credentials' ? (
            <Card key="creds">
              {/* Title */}
              <p className="text-center font-bold" style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>Login</p>

              {/* Error banner */}
              {error && (
                <div className="mt-3 flex items-start gap-2 p-3 rounded-lg"
                  style={{ background: 'rgba(127,29,29,0.4)', border: '1px solid rgba(239,68,68,0.4)', fontSize: '0.75rem', color: '#fca5a5' }}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleCredentialsSubmit} style={{ marginTop: '1.5rem' }}>

                {/* Username */}
                <div style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                  <label htmlFor="username" style={{ display: 'block', color: 'rgba(156,163,175,1)', marginBottom: 4 }}>
                    Username
                  </label>
                  <input
                    id="username" type="text" value={username}
                    onChange={e => setUsername(e.target.value)} required
                    placeholder="name@enterprise.com"
                    style={{
                      width: '100%', borderRadius: '0.375rem',
                      border: '1px solid rgba(55,65,81,1)', outline: 0,
                      backgroundColor: 'rgba(17,24,39,1)',
                      padding: '0.75rem 1rem', color: 'rgba(243,244,246,1)',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,1)')}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(55,65,81,1)')}
                  />
                </div>

                {/* Password */}
                <div style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>
                  <label htmlFor="password" style={{ display: 'block', color: 'rgba(156,163,175,1)', marginBottom: 4 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="password" type={showPassword ? 'text' : 'password'}
                      value={password} onChange={e => setPassword(e.target.value)}
                      required placeholder="Enter your password"
                      style={{
                        width: '100%', borderRadius: '0.375rem',
                        border: '1px solid rgba(55,65,81,1)', outline: 0,
                        backgroundColor: 'rgba(17,24,39,1)',
                        padding: '0.75rem 2.5rem 0.75rem 1rem',
                        color: 'rgba(243,244,246,1)', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,1)')}
                      onBlur={e  => (e.target.style.borderColor = 'rgba(55,65,81,1)')}
                    />
                    <button type="button" onClick={() => setShowPassword(p => !p)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(156,163,175,1)', cursor: 'pointer' }}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Forgot */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <a href="#" style={{ color: 'rgba(243,244,246,1)', textDecoration: 'none', fontSize: 13 }}
                      onMouseOver={e => ((e.target as HTMLElement).style.textDecoration = 'underline')}
                      onMouseOut={e  => ((e.target as HTMLElement).style.textDecoration = 'none')}>
                      Forgot Password ?
                    </a>
                  </div>
                </div>

                {/* Sign in */}
                <button type="submit" disabled={isLoading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', marginTop: '1rem',
                    backgroundColor: 'rgba(167,139,250,1)', padding: '0.75rem',
                    textAlign: 'center', color: 'rgba(17,24,39,1)',
                    border: 'none', borderRadius: '0.375rem',
                    fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                  }}>
                  {isLoading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
                    : <><span>Proceed to 2FA</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
                <div style={{ height: 1, flex: 1, backgroundColor: 'rgba(55,65,81,1)' }} />
                <p style={{ padding: '0 0.75rem', fontSize: '0.875rem', color: 'rgba(156,163,175,1)', whiteSpace: 'nowrap' }}>
                  Login with social accounts
                </p>
                <div style={{ height: 1, flex: 1, backgroundColor: 'rgba(55,65,81,1)' }} />
              </div>

              {/* Social buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 4 }}>
                {/* Google */}
                <button aria-label="Sign in with Google"
                  onClick={() => handleSocialLogin('google')}
                  disabled={socialLoading !== null}
                  style={{ borderRadius: 4, padding: '0.75rem', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', opacity: socialLoading && socialLoading !== 'google' ? 0.4 : 1, position: 'relative' }}>
                  {socialLoading === 'google'
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : <GoogleIcon />}
                </button>

                {/* Microsoft */}
                <button aria-label="Sign in with Microsoft"
                  onClick={() => handleSocialLogin('microsoft')}
                  disabled={socialLoading !== null}
                  style={{ borderRadius: 4, padding: '0.75rem', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', opacity: socialLoading && socialLoading !== 'microsoft' ? 0.4 : 1 }}>
                  {socialLoading === 'microsoft'
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : <MicrosoftIcon />}
                </button>

                {/* GitHub */}
                <button aria-label="Sign in with GitHub"
                  onClick={() => handleSocialLogin('github')}
                  disabled={socialLoading !== null}
                  style={{ borderRadius: 4, padding: '0.75rem', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', opacity: socialLoading && socialLoading !== 'github' ? 0.4 : 1 }}>
                  {socialLoading === 'github'
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : <GitHubIcon />}
                </button>
              </div>

              {/* Sign up link */}
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(156,163,175,1)', marginTop: 8 }}>
                Don't have an account?{' '}
                <a href="#" style={{ color: 'rgba(243,244,246,1)', textDecoration: 'none', fontSize: 14 }}
                  onMouseOver={e => ((e.target as HTMLElement).style.textDecoration = 'underline')}
                  onMouseOut={e  => ((e.target as HTMLElement).style.textDecoration = 'none')}>
                  Sign up
                </a>
              </p>

              {/* Compliance */}
              <div className="pt-3 flex items-center justify-center gap-2"
                style={{ borderTop: '1px solid rgba(55,65,81,0.8)', marginTop: 12, fontSize: '0.6rem', color: 'rgba(100,116,139,1)' }}>
                <ShieldCheck className="w-3 h-3" style={{ color: '#34d399' }} />
                256-Bit Encrypted · RBI AA Compliant
              </div>
            </Card>

          ) : (
            // ── OTP step ────────────────────────────────────────
            <Card key="otp">
              <p className="text-center font-bold" style={{ fontSize: '1.5rem' }}>2FA Verification</p>

              {error && (
                <div className="mt-3 flex items-start gap-2 p-3 rounded-lg"
                  style={{ background: 'rgba(127,29,29,0.4)', border: '1px solid rgba(239,68,68,0.4)', fontSize: '0.75rem', color: '#fca5a5' }}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
                </div>
              )}

              <div style={{ marginTop: '1rem', padding: '0.875rem', borderRadius: '0.75rem', background: 'rgba(109,40,217,0.18)', border: '1px solid rgba(109,40,217,0.4)', fontSize: '0.75rem' }}>
                <div className="flex items-center gap-1.5 font-bold mb-1" style={{ color: '#c4b5fd' }}>
                  <KeyRound className="w-4 h-4" style={{ color: '#a78bfa' }} />
                  Hardware / Authenticator Token
                </div>
                <p style={{ color: '#e2e8f0', fontSize: '0.7rem', lineHeight: 1.5 }}>
                  Enter the 6-digit code from your enterprise authenticator for{' '}
                  <span style={{ fontFamily: 'monospace', color: '#c4b5fd' }}>{username}</span>.
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} style={{ marginTop: '1rem' }}>
                <label htmlFor="otp" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(156,163,175,1)', marginBottom: 6 }}>
                  6-Digit Verification Code
                </label>
                <input
                  id="otp" type="text" value={otpCode}
                  onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6} required placeholder="••••••"
                  style={{
                    width: '100%', borderRadius: '0.375rem',
                    border: '1px solid rgba(55,65,81,1)', outline: 0,
                    backgroundColor: 'rgba(17,24,39,1)', padding: '0.875rem',
                    color: '#a78bfa', fontFamily: 'monospace', fontSize: '1.5rem',
                    letterSpacing: '0.5rem', textAlign: 'center', fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,1)')}
                  onBlur={e  => (e.target.style.borderColor = 'rgba(55,65,81,1)')}
                />

                <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
                  <button type="button" onClick={() => setAuthStep('credentials')}
                    style={{ flex: '0 0 33%', padding: '0.75rem', borderRadius: '0.375rem', background: 'rgba(17,24,39,1)', border: '1px solid rgba(55,65,81,1)', color: '#cbd5e1', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>
                    Back
                  </button>
                  <button type="submit" disabled={isLoading}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '0.75rem', borderRadius: '0.375rem', border: 'none',
                      backgroundColor: 'rgba(167,139,250,1)', color: 'rgba(17,24,39,1)',
                      fontWeight: 700, fontSize: '0.85rem', cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.6 : 1,
                    }}>
                    {isLoading
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating…</>
                      : <><span>Enter Command Center</span><ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>

              <div className="pt-3 flex items-center justify-center gap-2"
                style={{ borderTop: '1px solid rgba(55,65,81,0.8)', marginTop: 16, fontSize: '0.6rem', color: 'rgba(100,116,139,1)' }}>
                <ShieldCheck className="w-3 h-3" style={{ color: '#34d399' }} />
                256-Bit Encrypted · RBI AA Compliant
              </div>
            </Card>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-4 text-center" style={{ fontSize: '0.7rem', color: 'rgba(75,85,99,1)' }}>
        FINSAFE Autonomous Financial Integrity OS © 2026
      </footer>
    </div>
  );
};
