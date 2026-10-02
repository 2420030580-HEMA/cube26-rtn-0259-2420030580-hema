import React, { useState } from 'react';
import {
  ShieldAlert,
  Bell,
  CheckCircle2,
  AlertTriangle,
  User,
  ArrowRight,
  Sparkles,
  Layers,
  ScanBarcode,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  pendingReviewsCount: number;
  onOpenBoxSwapModal?: () => void;
  onOpenBarcodeScanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  pendingReviewsCount,
  onOpenBoxSwapModal,
  onOpenBarcodeScanner,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'new-inspection', label: 'New Inspection' },
    { id: 'returns', label: 'Returns' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'decision-rules', label: 'Decision Rules' },
    { id: 'manual-queue', label: 'Manual Queue', badge: pendingReviewsCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-indigo-500 transition-colors">
              <span className="tracking-tighter">RQ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-lg font-sans">
                  RETURN<span className="text-indigo-400">IQ</span>
                </span>
                <span className="text-[11px] text-slate-400 tracking-wide uppercase font-medium">
                  Return Intelligence
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-slate-800/80 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-800/60 rounded">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Operator Profile & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenBarcodeScanner && (
            <button
              onClick={onOpenBarcodeScanner}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-700/80 text-indigo-200 text-xs font-semibold transition-all shadow-sm"
              title="Open Optical Barcode Intake Scanner"
            >
              <ScanBarcode className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Scan Barcode</span>
            </button>
          )}

          {onOpenBoxSwapModal && (
            <button
              onClick={onOpenBoxSwapModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/80 text-amber-200 text-xs font-semibold transition-all shadow-sm"
              title="Learn how RETURNIQ solves the box-swap dilemma"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Box-Swap Solution</span>
            </button>
          )}

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors focus:outline-none"
              title="Recent alerts"
            >
              <Bell className="w-4 h-4" />
              {pendingReviewsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-2 z-50">
                <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">
                    System Alerts & Audit Feed
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {pendingReviewsCount} action items
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60 text-xs">
                  <div className="p-3 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-200">
                          Potential Product Swap Flagged
                        </p>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          ORD-10984: iPhone 15 Pro Max box returned with iPhone 12 Pro hardware inside.
                        </p>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          12 mins ago · Bay 1
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-200">
                          Restock Verified: ORD-10211
                        </p>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          Dyson Airwrap Complete approved for shelf restock.
                        </p>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          34 mins ago · Bay 3
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-200">
                          New Decision Rule Active
                        </p>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          Rule #1: Strict box-vs-device serial discrepancy hold is active.
                        </p>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          1 hour ago · System
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onSelectTab('manual-queue');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                  >
                    View Manual Review Queue <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Operator Profile */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left text-xs leading-tight">
              <div className="font-medium text-slate-200 flex items-center gap-1.5">
                <span>Taylor Kim</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Online" />
              </div>
              <div className="text-[10px] text-slate-400">Station B4 · Lead Tech</div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => onSelectTab('new-inspection')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">Inspect Return</span>
            <span className="sm:hidden">Inspect</span>
          </button>
        </div>
      </div>
    </header>
  );
};
