import React from 'react';
import { QrCode, Sparkles, LayoutGrid, Palette, ScanLine, History, RotateCcw } from 'lucide-react';

export type ActiveTab = 'generator' | 'designer' | 'templates' | 'scanner' | 'history';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onReset: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  historyCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('generator')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                  QRCraft
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full border border-purple-200">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Professional QR Code Studio
              </p>
            </div>
          </div>

          {/* Nav Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'generator'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>QR Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('designer')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'designer'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Design Studio</span>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full">
                New
              </span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'templates'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'scanner'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ScanLine className="w-4 h-4" />
              <span>Scan & Test</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'history'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onReset}
              title="Reset all settings to default"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setActiveTab('designer')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Launch Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => setActiveTab('designer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'designer'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Design Studio
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'scanner'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Scan & Test
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            History {historyCount > 0 ? `(${historyCount})` : ''}
          </button>
        </div>
      </div>
    </header>
  );
};
