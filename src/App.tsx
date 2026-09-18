/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TopNavbar } from './components/TopNavbar';
import { BottomNavbar } from './components/BottomNavbar';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { OverviewView } from './components/views/OverviewView';
import { CustomerAnalysisView } from './components/views/CustomerAnalysisView';
import { CashFlowView } from './components/views/CashFlowView';
import { FraudRadarView } from './components/views/FraudRadarView';
import { FinancialHealthView } from './components/views/FinancialHealthView';
import { LiveTelemetryView } from './components/views/LiveTelemetryView';
import { AICopilotView } from './components/views/AICopilotView';
import { SafeSurplusView } from './components/views/SafeSurplusView';
import { InvestmentsView } from './components/views/InvestmentsView';
import { TransactionsView } from './components/views/TransactionsView';
import { ModelInsightsView } from './components/views/ModelInsightsView';
import { LandingPageView } from './components/views/LandingPageView';
import { LoginPageView } from './components/views/LoginPageView';
import { SmeAccount, SuggestionChip, NotificationItem, ActiveTabKey } from './types';
import { 
  INITIAL_ACCOUNTS, 
  SUGGESTION_CHIPS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

export default function App() {
  const [accounts, setAccounts] = useState<SmeAccount[]>(INITIAL_ACCOUNTS);
  const [activeAccount, setActiveAccount] = useState<SmeAccount>(INITIAL_ACCOUNTS[0]);
  const [chips] = useState<SuggestionChip[]>(SUGGESTION_CHIPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  // Initial page: Landing Page first, then Login Page, then Main Dashboard
  const [activeTab, setActiveTab] = useState<ActiveTabKey>('landing');
  const [targetTabAfterLogin, setTargetTabAfterLogin] = useState<ActiveTabKey>('overview');
  
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('finsafe_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('finsafe_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  // AI Copilot Drawer state
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string>('');

  const handleSelectAccount = (account: SmeAccount) => {
    setActiveAccount(account);
  };

  const handleSelectPrompt = (prompt: string, chip?: SuggestionChip) => {
    if (chip && chip.category === 'Risk') {
      setActiveTab('fraud_radar');
    } else if (chip && chip.category === 'Cashflow') {
      setActiveTab('cashflow');
    }
    setCopilotInitialPrompt(prompt);
    setIsCopilotOpen(true);
  };

  const handleOpenCopilot = (initialPrompt?: string) => {
    if (initialPrompt) {
      setCopilotInitialPrompt(initialPrompt);
    }
    setIsCopilotOpen(true);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    if (notif.category === 'Fraud Radar') {
      setActiveTab('fraud_radar');
    } else if (notif.category === 'Cash Flow') {
      setActiveTab('cashflow');
    }
    // Mark this specific notification as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
  };

  // Step 1: 3D Dimensional Landing Page
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#050608] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        <LandingPageView
          activeAccount={activeAccount}
          onLaunchDashboard={(targetTab) => {
            setTargetTabAfterLogin(targetTab || 'overview');
            setActiveTab('login');
          }}
          onOpenCopilot={handleOpenCopilot}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Interactive FINSAFE AI Copilot Drawer */}
        <AICopilotDrawer
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
          activeAccount={activeAccount}
          initialPrompt={copilotInitialPrompt}
        />
      </div>
    );
  }

  // Step 2: Zero-Trust Enterprise Login Gateway
  if (activeTab === 'login') {
    return (
      <div className="min-h-screen bg-[#050608] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        <LoginPageView
          accounts={accounts}
          activeAccount={activeAccount}
          onSelectAccount={handleSelectAccount}
          onLoginSuccess={(targetTab) => {
            setActiveTab(targetTab || targetTabAfterLogin || 'overview');
          }}
          onBackToLanding={() => setActiveTab('landing')}
        />
      </div>
    );
  }

  // Step 3: Main Financial Command Center Dashboard
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* Top Navigation Bar Component (Core Financial Monitoring) */}
      <TopNavbar
        accounts={accounts}
        activeAccount={activeAccount}
        onSelectAccount={handleSelectAccount}
        chips={chips}
        onSelectPrompt={handleSelectPrompt}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
        onOpenCopilot={handleOpenCopilot}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSignOut={() => setActiveTab('landing')}
      />

      {/* Main Interactive Workspace with Fluid AnimatePresence Transitions */}
      <main className="flex-1 w-full overflow-x-hidden pb-12">
        <AnimatePresence mode="wait">
          {/* Top 5 Monitoring Workspaces */}
          {activeTab === 'overview' && (
            <OverviewView
              key="overview-view"
              activeAccount={activeAccount}
              onNavigate={setActiveTab}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {activeTab === 'customer_analysis' && (
            <CustomerAnalysisView
              key="customer-analysis-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'cashflow' && (
            <CashFlowView
              key="cashflow-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {activeTab === 'fraud_radar' && (
            <FraudRadarView
              key="fraud-radar-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {activeTab === 'financial_health' && (
            <FinancialHealthView
              key="financial-health-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {activeTab === 'telemetry' && (
            <LiveTelemetryView
              key="telemetry-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {/* Bottom 5 Deep Analysis & Copilot Workspaces */}
          {activeTab === 'copilot' && (
            <AICopilotView
              key="copilot-view"
              activeAccount={activeAccount}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'surplus' && (
            <SafeSurplusView
              key="surplus-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'investments' && (
            <InvestmentsView
              key="investments-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView
              key="transactions-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
            />
          )}

          {activeTab === 'model_insights' && (
            <ModelInsightsView
              key="model-insights-view"
              activeAccount={activeAccount}
              onOpenCopilot={handleOpenCopilot}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Fixed Bottom Interactive Navigation Bar (AI, Surplus, Investment & Deep Analysis) */}
      <BottomNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Interactive FINSAFE AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        activeAccount={activeAccount}
        initialPrompt={copilotInitialPrompt}
      />
    </div>
  );
}

