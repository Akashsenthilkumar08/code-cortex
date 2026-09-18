import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, CornerDownLeft, ShieldAlert, Building2, TrendingUp, FileText, Users } from 'lucide-react';
import { SuggestionChip, SearchResult } from '../types';
import { QUICK_SEARCH_DATABASE } from '../data/mockData';

interface SearchBarWithChipsProps {
  chips: SuggestionChip[];
  onSelectPrompt: (prompt: string, chip?: SuggestionChip) => void;
  onOpenCopilot: (initialPrompt?: string) => void;
}

export const SearchBarWithChips: React.FC<SearchBarWithChipsProps> = ({
  chips,
  onSelectPrompt,
  onOpenCopilot,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChipClick = (chip: SuggestionChip) => {
    setQuery(chip.label);
    onSelectPrompt(chip.prompt, chip);
    setIsFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onOpenCopilot(query);
      setIsFocused(false);
    }
  };

  const filteredResults = QUICK_SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Customers':
        return <Users className="w-3.5 h-3.5 text-cyan-500" />;
      case 'Security':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />;
      case 'Banking':
        return <Building2 className="w-3.5 h-3.5 text-blue-500" />;
      case 'Investments':
        return <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Analytics':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg lg:max-w-xl flex flex-col items-center">
      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        className={`w-full relative flex items-center transition-all duration-200 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 border ${
          isFocused
            ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-900 shadow-xs'
            : 'border-slate-200/80 dark:border-slate-700/80'
        }`}
      >
        <div className="pl-3 text-slate-400 dark:text-slate-500 flex items-center pointer-events-none">
          <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          id="main-finsafe-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="🔍 Ask FINSAFE anything..."
          className="w-full py-1.5 pl-2 pr-16 text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Shortcut badge */}
          <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-2xs">
            <span>⌘K</span>
          </div>
        </div>
      </form>

      {/* Running Marquee Suggestion Chips directly beneath */}
      <div className="w-full flex items-center gap-2 pt-1.5 overflow-hidden">
        <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0 select-none">
          <Sparkles className="w-2.5 h-2.5 text-blue-500 animate-pulse" />
          <span>SUGGESTIONS:</span>
        </div>

        <div className="flex-1 overflow-hidden mask-gradient-x relative">
          <div className="animate-marquee flex items-center gap-2 py-0.5">
            {[...chips, ...chips].map((chip, idx) => (
              <button
                key={`${chip.id}-${idx}`}
                type="button"
                id={`suggestion-chip-${chip.id}-${idx}`}
                onClick={() => handleChipClick(chip)}
                className="group shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800/95 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/90 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer"
                title={chip.prompt}
              >
                <span className="text-[10px] group-hover:scale-115 transition-transform duration-150">
                  {chip.emoji}
                </span>
                <span className="whitespace-nowrap">{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Search Dropdown / Autocomplete Results */}
      {isFocused && (
        <div className="absolute top-10 left-0 w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 pb-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Quick Intelligent Queries
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Press ↵ to ask Copilot</span>
          </div>

          <div className="p-1 max-h-64 overflow-y-auto space-y-0.5">
            {query.trim() && (
              <button
                type="button"
                onClick={() => {
                  onOpenCopilot(query);
                  setIsFocused(false);
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/50 hover:bg-blue-100/80 dark:hover:bg-blue-900/60 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs">
                    🤖
                  </div>
                  <span className="text-xs font-medium">
                    Ask FINSAFE AI: <span className="font-semibold">"{query}"</span>
                  </span>
                </div>
                <CornerDownLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </button>
            )}

            <div className="px-2 pt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Matching Records & Features
            </div>

            {filteredResults.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => {
                  onSelectPrompt(result.title);
                  setIsFocused(false);
                }}
                className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 text-left transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0">
                    {getCategoryIcon(result.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {result.title}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                      {result.subtitle}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 pl-2">
                  <span>{result.shortcut}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}

            {filteredResults.length === 0 && (
              <div className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                No direct matches found. Press Enter to search with AI Copilot.
              </div>
            )}
          </div>

          <div className="px-3 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-800/40">
            <span>Type questions, invoices, or GSTIN</span>
            <span className="font-mono text-[9px]">ESC to close</span>
          </div>
        </div>
      )}
    </div>
  );
};
