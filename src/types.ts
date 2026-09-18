export interface SmeAccount {
  id: string;
  name: string;
  type: string;
  gstin: string;
  status: 'Active' | 'Pending Audit' | 'Review Required';
  bankAccountsCount: number;
  balanceFormatted: string;
  color: string;
}

export interface SuggestionChip {
  id: string;
  label: string;
  emoji?: string;
  category: 'Risk' | 'Cashflow' | 'Tax' | 'Reports' | 'Action';
  prompt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: 'Fraud Radar' | 'Cash Flow' | 'Compliance' | 'AI Insights';
  timestamp: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
}

export type TopNavKey = 'overview' | 'customer_analysis' | 'cashflow' | 'fraud_radar' | 'financial_health' | 'telemetry';
export type BottomNavKey = 'copilot' | 'surplus' | 'investments' | 'transactions' | 'model_insights';
export type ActiveTabKey = TopNavKey | BottomNavKey | 'landing' | 'login';

// Backward-compatibility alias
export type SubNavKey = ActiveTabKey;

export interface SubNavItem {
  key: SubNavKey;
  label: string;
  badge?: string;
  badgeVariant?: 'danger' | 'success' | 'info' | 'neutral';
  description: string;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconType: string;
  shortcut?: string;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  title: string;
  merchant: string;
  merchantCategory: string;
  amount: number;
  type: 'Inflow' | 'Outflow' | 'Card' | 'Transfer' | 'Escrow';
  riskScore: number;
  status: 'Completed' | 'Flagged' | 'Under Review' | 'Blocked' | 'Pending';
  suspiciousIndicators: string[];
  aiExplanation: string;
  accountReference: string;
  location?: string;
  ipAddress?: string;
  sequenceId?: string;
  relatedSequence?: {
    id: string;
    description: string;
    transactions: { step: number; amount: number; time: string; status: string }[];
  };
}

export interface MarketContext {
  niftyCurrent: number;
  niftyChange: number;
  niftyChangePercent: number;
  regime: 'Steady Growth' | 'Bullish Expansion' | 'Volatile Consolidation' | 'Risk-Off Correction';
  volatilityIndex: number;
  maxDrawdown30D: number;
  yieldOvernight: number;
  yieldShortDuration: number;
  yieldBroadIndex: number;
}


