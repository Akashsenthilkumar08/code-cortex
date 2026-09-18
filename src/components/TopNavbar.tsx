import React from 'react';
import { Sparkles, Bot, Command, Globe } from 'lucide-react';
import { SmeAccount, SuggestionChip, NotificationItem, SubNavKey } from '../types';
import { FinsafeLogo } from './FinsafeLogo';
import { SearchBarWithChips } from './SearchBarWithChips';
import { NotificationCenter } from './NotificationCenter';
import { UserProfileMenu } from './UserProfileMenu';
import { ThemeToggle } from './ThemeToggle';
import { SubNavbar } from './SubNavbar';

interface TopNavbarProps {
  accounts: SmeAccount[];
  activeAccount: SmeAccount;
  onSelectAccount: (acc: SmeAccount) => void;
  chips: SuggestionChip[];
  onSelectPrompt: (prompt: string, chip?: SuggestionChip) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onOpenCopilot: (initialPrompt?: string) => void;
  activeTab: SubNavKey;
  onTabChange: (tab: SubNavKey) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onSignOut?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  accounts,
  activeAccount,
  onSelectAccount,
  chips,
  onSelectPrompt,
  notifications,
  onMarkAllNotificationsRead,
  onSelectNotification,
  onOpenCopilot,
  activeTab,
  onTabChange,
  theme = 'light',
  onToggleTheme = () => {},
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xs select-none transition-colors duration-200">
      {/* Top Header Row */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 py-2 min-h-[58px]">
          {/* ================= LEFT SECTION ================= */}
          {/* Futuristic Gradient FINSAFE Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <div 
              className="flex items-center group cursor-pointer" 
              onClick={() => onTabChange('overview')}
              title="FINSAFE - Financial Integrity OS"
            >
              <FinsafeLogo size="md" showTagline={true} />
            </div>
          </div>

          {/* ================= CENTER SECTION ================= */}
          {/* Interactive Search Bar ("🔍 Ask FINSAFE anything...") with floating suggestion chips */}
          <div className="flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-2 hidden md:flex justify-center">
            <SearchBarWithChips
              chips={chips}
              onSelectPrompt={onSelectPrompt}
              onOpenCopilot={onOpenCopilot}
            />
          </div>

          {/* ================= RIGHT SECTION ================= */}
          {/* Theme toggle button, Notifications bell icon, User Profile Avatar */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button (Light/Dark Mode) */}
            <ThemeToggle
              theme={theme}
              onToggle={onToggleTheme}
            />

            {/* Notifications Bell icon (with alert dot) */}
            <NotificationCenter
              notifications={notifications}
              onMarkAllRead={onMarkAllNotificationsRead}
              onSelectNotification={onSelectNotification}
            />

            {/* User Profile Avatar ("👤 Akash S.") */}
            <UserProfileMenu
              userName="Akash S."
              userRole="CFO & Director"
              userEmail="akash.s@acmetrading.com"
              onSignOut={onSignOut}
            />
          </div>
        </div>

        {/* Mobile Search Bar row (shown on smaller screens where center is hidden) */}
        <div className="md:hidden py-1.5 pb-2.5 border-t border-slate-100 dark:border-slate-800">
          <SearchBarWithChips
            chips={chips}
            onSelectPrompt={onSelectPrompt}
            onOpenCopilot={onOpenCopilot}
          />
        </div>
      </div>

      {/* ================= SUB-NAV SECTION ================= */}
      {/* Sub-nav: Links for Overview, Cash Flow, Fraud Radar, Financial Health, Investments */}
      <SubNavbar
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </header>
  );
};
