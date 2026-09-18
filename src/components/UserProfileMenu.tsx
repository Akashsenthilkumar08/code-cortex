import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Shield, Key, LogOut, FileText, CheckCircle2, HelpCircle } from 'lucide-react';

interface UserProfileMenuProps {
  userName?: string;
  userRole?: string;
  userEmail?: string;
  onSignOut?: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  userName = 'Akash S.',
  userRole = 'Chief Financial Officer (CFO)',
  userEmail = 'akash.s@acmetrading.com',
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef} id="user-profile-menu">
      {/* User Profile Avatar Trigger ("👤 Akash S.") */}
      <button
        type="button"
        id="user-profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          {/* Avatar circle */}
          <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-[11px] shadow-2xs ring-1 ring-blue-100 dark:ring-blue-900">
            AS
          </div>
          {/* Active online dot */}
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-slate-800" />
        </div>

        <div className="text-left hidden md:block">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {userName}
            </span>
          </div>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 block leading-none">
            Director / CFO
          </span>
        </div>

        <ChevronDown
          className={`w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`}
        />
      </button>

      {/* Profile Dropdown Menu */}
      {isOpen && (
        <div
          id="user-profile-dropdown"
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800 dark:text-slate-200"
        >
          {/* User Details */}
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                AS
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{userName}</span>
                  <span title="KYC Verified" className="inline-flex">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {userRole}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="p-1.5 space-y-0.5 text-xs text-slate-700 dark:text-slate-300">
            <button
              type="button"
              onClick={() => {
                alert('Account Profile & Role Delegation');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left transition-colors"
            >
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Personal Profile & Credentials</span>
            </button>

            <button
              type="button"
              onClick={() => {
                alert('2FA & Enterprise Security Vault');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left transition-colors"
            >
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div className="flex-1 flex items-center justify-between">
                <span>Security & 2FA</span>
                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                  Enabled
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                alert('Banking API Tokens & Webhooks');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left transition-colors"
            >
              <Key className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Banking API Keys & Webhooks</span>
            </button>

            <button
              type="button"
              onClick={() => {
                alert('Audit Logs & Compliance Exporters');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Export Compliance Dossier</span>
            </button>
          </div>

          {/* Help & Support */}
          <div className="px-1.5 py-1 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => {
                alert('24/7 Dedicated SME Support Desk');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left text-slate-600 dark:text-slate-400 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>FINSAFE Help Center & API Docs</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="p-1.5 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              id="btn-sign-out"
              onClick={() => {
                if (onSignOut) onSignOut();
                else alert('Signed out securely');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left text-xs font-medium transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span>Sign Out of SME Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
