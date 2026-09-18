import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, Settings, Building2, ShieldCheck, Search, ArrowRightLeft } from 'lucide-react';
import { SmeAccount } from '../types';

interface AccountSwitcherDropdownProps {
  accounts: SmeAccount[];
  activeAccount: SmeAccount;
  onSelectAccount: (account: SmeAccount) => void;
  onOpenSettings?: () => void;
}

export const AccountSwitcherDropdown: React.FC<AccountSwitcherDropdownProps> = ({
  accounts,
  activeAccount,
  onSelectAccount,
  onOpenSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef} id="sme-account-switcher">
      {/* Trigger Button: Acme Trading Co. ⚙️ */}
      <button
        type="button"
        id="account-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100 text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-5.5 h-5.5 rounded-md ${activeAccount.color} text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs`}>
            {activeAccount.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-[13px] font-semibold text-slate-800 truncate max-w-[110px] sm:max-w-[150px] lg:max-w-[170px]">
                {activeAccount.name}
              </span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors" title="Business Settings">
                ⚙️
              </span>
            </div>
            <span className="text-[9px] text-slate-500 truncate max-w-[110px] sm:max-w-[150px] lg:max-w-[170px] hidden sm:block leading-none">
              {activeAccount.type.split('(')[0]} • {activeAccount.balanceFormatted}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="account-switcher-menu"
          className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
        >
          {/* Header */}
          <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active SME Entities ({accounts.length})
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3" /> GST Verified
            </span>
          </div>

          {/* Quick Search */}
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search registered SME businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                autoFocus
              />
            </div>
          </div>

          {/* List of Accounts */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
            {filteredAccounts.map((account) => {
              const isSelected = account.id === activeAccount.id;
              return (
                <button
                  key={account.id}
                  id={`select-account-${account.id}`}
                  type="button"
                  onClick={() => {
                    onSelectAccount(account);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors duration-150 ${
                    isSelected
                      ? 'bg-blue-50/80 border border-blue-200 text-blue-900'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg ${account.color} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {account.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {account.name}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-blue-600 text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                        <span>{account.type}</span>
                        <span>•</span>
                        <span className="font-mono text-[10px] text-slate-400">{account.gstin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className="text-xs font-semibold text-slate-800 font-mono">
                      {account.balanceFormatted}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {account.bankAccountsCount} accounts
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredAccounts.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No matching businesses found
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-2 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
            <button
              type="button"
              id="btn-add-entity"
              onClick={() => {
                alert('Add New SME Entity registration modal');
                setIsOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New SME Entity</span>
            </button>
            <button
              type="button"
              id="btn-entity-settings"
              onClick={() => {
                if (onOpenSettings) onOpenSettings();
                setIsOpen(false);
              }}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-200/60 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Entity Settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
