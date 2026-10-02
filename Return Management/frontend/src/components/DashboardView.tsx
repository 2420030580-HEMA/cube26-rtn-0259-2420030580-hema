import React from 'react';
import {
  PackageCheck,
  RotateCcw,
  AlertTriangle,
  Clock,
  CheckCircle,
  Wrench,
  DollarSign,
  Trash2,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Search,
  FileText,
  ScanLine,
  Eye,
  Sparkles,
} from 'lucide-react';
import { ReturnInspectionRecord, OrderRecord } from '../types';

interface DashboardViewProps {
  inspections: ReturnInspectionRecord[];
  onStartInspection: (order?: OrderRecord) => void;
  onViewInspection: (inspection: ReturnInspectionRecord) => void;
  onOpenManualQueue: () => void;
  orders: OrderRecord[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  inspections,
  onStartInspection,
  onViewInspection,
  onOpenManualQueue,
  orders,
}) => {
  // Aggregate KPI metrics
  const totalReturnsCount = 1284;
  const pendingCount = 31;
  const flaggedCount = 18;
  const avgInspectionTime = '1m 58s';

  const dispositionCounts = {
    RESTOCK: 682,
    REFURBISH: 341,
    LIQUIDATE: 198,
    DISPOSE: 63,
  };

  const commonReasons = [
    { reason: 'Customer Changed Mind', count: 480, pct: 37 },
    { reason: 'Claimed Defective / Malfunction', count: 320, pct: 25 },
    { reason: 'Missing Component / Cables', count: 215, pct: 17 },
    { reason: 'Suspected Product Swap / Conflict', count: 142, pct: 11 },
    { reason: 'Transit Packaging Damage', count: 127, pct: 10 },
  ];

  const commonMissingComponents = [
    { component: 'Aux Audio Cable (3.5mm)', count: 94, category: 'Audio' },
    { component: 'USB-C Charging Lead', count: 78, category: 'General' },
    { component: 'AC Wall Adapter Plug', count: 52, category: 'Power' },
    { component: 'Quick Setup Manual / Booklet', count: 41, category: 'Paper' },
    { component: 'Remote / Controller', count: 19, category: 'Gaming/TV' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
            Returns Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor, inspect and resolve returned products with AI-assisted physical verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onStartInspection()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <ScanLine className="w-4 h-4 text-indigo-200" />
            <span>New Return Inspection</span>
          </button>
        </div>
      </div>

      {/* Featured Innovation Solution Card: Solving the Box-Swap Dilemma */}
      <div className="relative overflow-hidden rounded-xl border border-indigo-900/60 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950 border border-indigo-800/80 rounded">
                Core Innovation
              </span>
              <span className="text-xs font-semibold text-slate-200">
                Solving the "Identical Box · Substituted Product" Dilemma
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When product identifiers are on the outer box, fraudulent returns return the authentic box with an older model or dummy unit inside. RETURNIQ cross-analyzes <span className="text-white font-medium">Box Label OCR</span> against <span className="text-white font-medium">Physical Device Hardware Signatures</span> (micro-laser chassis seriation, earcup hinge geometry, camera array diameter, and physical connector architecture).
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onStartInspection(orders.find((o) => o.orderId === 'ORD-10984'))}
              className="px-3.5 py-2 text-xs font-semibold text-amber-200 bg-amber-950/80 hover:bg-amber-900/80 border border-amber-800/80 rounded flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Box Swap Demo (ORD-10984)</span>
            </button>
            <button
              onClick={() => onStartInspection(orders.find((o) => o.orderId === 'ORD-10452'))}
              className="px-3.5 py-2 text-xs font-semibold text-indigo-200 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800/80 rounded flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Test Standard Demo (ORD-10452)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {/* Total Returns */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Returns</span>
            <RotateCcw className="w-4 h-4 text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              {totalReturnsCount.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center font-medium">
              <TrendingUp className="w-3 h-3 mr-0.5 inline" /> +12.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Processed this calendar month</p>
        </div>

        {/* Pending Inspections */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Pending Inspections</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              {pendingCount}
            </span>
            <span className="text-[11px] text-sky-400 font-medium">Queue active</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Awaiting physical imaging</p>
        </div>

        {/* Flagged Returns */}
        <div
          onClick={onOpenManualQueue}
          className="bg-slate-900 border border-amber-900/60 hover:border-amber-700 rounded-lg p-4 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 font-medium">Flagged Returns</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-amber-200 font-mono tabular-nums">
              {flaggedCount}
            </span>
            <span className="text-[11px] text-amber-400 font-medium">Review required</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Box swaps & serial conflicts</p>
        </div>

        {/* Average Inspection Time */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Avg Inspection Time</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
              {avgInspectionTime}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">-42s vs manual</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">From scan to final disposition</p>
        </div>
      </div>

      {/* Dispositions Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Restock */}
        <div className="bg-slate-900/80 border border-emerald-900/40 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-emerald-300">Restocked</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              {dispositionCounts.RESTOCK}
            </span>
            <span className="text-xs text-slate-400">53.1%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Returned directly to active stock</p>
        </div>

        {/* Refurbish */}
        <div className="bg-slate-900/80 border border-sky-900/40 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-sky-300">Refurbished</span>
            <Wrench className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              {dispositionCounts.REFURBISH}
            </span>
            <span className="text-xs text-slate-400">26.5%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Repackaged or accessory added</p>
        </div>

        {/* Liquidate */}
        <div className="bg-slate-900/80 border border-amber-900/40 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-amber-300">Liquidated</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              {dispositionCounts.LIQUIDATE}
            </span>
            <span className="text-xs text-slate-400">15.4%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Sold on B-stock secondary sales</p>
        </div>

        {/* Dispose */}
        <div className="bg-slate-900/80 border border-rose-900/40 rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-rose-300">Disposed</span>
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              {dispositionCounts.DISPOSE}
            </span>
            <span className="text-xs text-slate-400">4.9%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">No recoverable value / recycled</p>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Returns by Disposition Bar Chart Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Returns by Disposition
            </h3>
            <span className="text-[11px] text-slate-500">Last 30 Days</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Restock (Full Shelf Value)</span>
                <span className="font-mono text-emerald-400 tabular-nums font-medium">
                  682 (53.1%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '53.1%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Refurbish (Repack & Kitting)</span>
                <span className="font-mono text-sky-400 tabular-nums font-medium">
                  341 (26.5%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-sky-500 h-2 rounded-full" style={{ width: '26.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Liquidate (B-Stock / Secondary)</span>
                <span className="font-mono text-amber-400 tabular-nums font-medium">
                  198 (15.4%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Dispose (Recycle / Unusable)</span>
                <span className="font-mono text-rose-400 tabular-nums font-medium">
                  63 (4.9%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '4.9%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Recovery Rate</span>
            <span className="text-emerald-400 font-bold font-mono">79.6% Value Recovered</span>
          </div>
        </div>

        {/* Common Return Reasons */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Common Return Reasons
            </h3>
            <span className="text-[11px] text-slate-500">Volume</span>
          </div>

          <div className="space-y-3">
            {commonReasons.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 truncate pr-2">{item.reason}</span>
                  <span className="font-mono text-slate-400 tabular-nums">{item.count}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      item.reason.includes('Swap')
                        ? 'bg-amber-500'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-amber-400 flex items-center gap-1 font-medium">
              <AlertTriangle className="w-3 h-3" />
              11% flagged for integrity mismatch
            </span>
          </div>
        </div>

        {/* Missing Component Frequency */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Missing Component Frequency
            </h3>
            <span className="text-[11px] text-slate-500">Incidents</span>
          </div>

          <div className="space-y-3">
            {commonMissingComponents.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-slate-800/40 border border-slate-800"
              >
                <div>
                  <div className="text-xs font-medium text-slate-200">{item.component}</div>
                  <div className="text-[10px] text-slate-400">{item.category} Accessory</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                    {item.count}
                  </div>
                  <div className="text-[10px] text-slate-500">missing</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
            <span>Re-kitting Cost Saved</span>
            <span className="font-mono text-emerald-400 font-semibold">$14,280 / mo</span>
          </div>
        </div>
      </div>

      {/* Recent Inspections Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">Recent Return Inspections</h2>
            <p className="text-[11px] text-slate-400">
              Live inspection records audited by RETURNIQ Vision & Decision Engine.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartInspection()}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Start New Inspection <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Return ID</th>
                <th className="py-2.5 px-4 font-medium">Order ID</th>
                <th className="py-2.5 px-4 font-medium">Product Name</th>
                <th className="py-2.5 px-4 font-medium">Identity Result</th>
                <th className="py-2.5 px-4 font-medium">Completeness</th>
                <th className="py-2.5 px-4 font-medium">Condition Result</th>
                <th className="py-2.5 px-4 font-medium">Return Integrity</th>
                <th className="py-2.5 px-4 font-medium">Disposition</th>
                <th className="py-2.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {inspections.map((insp) => (
                <tr
                  key={insp.id}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => onViewInspection(insp)}
                >
                  <td className="py-3 px-4 font-mono font-medium text-indigo-300 tabular-nums">
                    {insp.returnId}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 tabular-nums">
                    {insp.orderId}
                  </td>
                  <td className="py-3 px-4 max-w-[200px] truncate font-medium text-slate-200">
                    {insp.product.name}
                  </td>
                  <td className="py-3 px-4">
                    {insp.aiAnalysis.identity.status === 'MATCH' ? (
                      <span className="text-emerald-400 font-medium">✓ Product Match</span>
                    ) : insp.aiAnalysis.identity.status === 'POTENTIAL_MISMATCH' ? (
                      <span className="text-amber-400 font-medium">⚠ Potential Mismatch</span>
                    ) : (
                      <span className="text-slate-400 font-medium">Unverified</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {insp.aiAnalysis.completeness.status === 'COMPLETE' ? (
                      <span className="text-slate-300 font-mono">
                        {insp.aiAnalysis.completeness.detectedCount}/{insp.aiAnalysis.completeness.expectedCount} (100%)
                      </span>
                    ) : (
                      <span className="text-amber-400 font-mono font-medium">
                        {insp.aiAnalysis.completeness.detectedCount}/{insp.aiAnalysis.completeness.expectedCount} (Missing)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-[160px]">
                    {insp.aiAnalysis.condition.result}
                  </td>
                  <td className="py-3 px-4">
                    {insp.aiAnalysis.integrity.status === 'LOW_CONCERN' ? (
                      <span className="text-emerald-400 text-[11px] font-medium">Low Concern</span>
                    ) : insp.aiAnalysis.integrity.status === 'POTENTIAL_PRODUCT_SWAP' ? (
                      <span className="text-amber-300 text-[11px] font-semibold bg-amber-950/60 px-1.5 py-0.5 border border-amber-800/80 rounded">
                        ⚠ Product Swap Alert
                      </span>
                    ) : (
                      <span className="text-sky-400 text-[11px] font-medium">Manual Review</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold text-[11px] px-2 py-0.5 rounded ${
                        insp.finalDecision === 'RESTOCK'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                          : insp.finalDecision === 'REFURBISH'
                          ? 'bg-sky-950/80 text-sky-300 border border-sky-800'
                          : insp.finalDecision === 'LIQUIDATE'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                          : insp.finalDecision === 'DISPOSE'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                          : 'bg-purple-950/80 text-purple-300 border border-purple-800'
                      }`}
                    >
                      {insp.finalDecision}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewInspection(insp);
                      }}
                      className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
