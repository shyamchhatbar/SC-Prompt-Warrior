import React from 'react';
import { DollarSign, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

export default function BudgetCard({ totalCost, groceryCost, targetBudget, status }) {
  const percentUsed = Math.min(100, Math.round((totalCost / targetBudget) * 100));
  
  // Calculate total savings from available ingredients
  const savings = Math.max(0, totalCost - groceryCost);

  // Status mapping
  const statusConfig = {
    'Within Budget': {
      colorClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      barColor: 'bg-emerald-500',
      description: 'The selected meals fit comfortably inside your daily budget.'
    },
    'Slightly Over Budget': {
      colorClass: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      barColor: 'bg-amber-500',
      description: 'Slightly above budget limit. Adjust portion sizes or swap ingredients.'
    },
    'Over Budget': {
      colorClass: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
      barColor: 'bg-rose-500',
      description: 'Significantly over budget limit. Consider removing meals or modifying ingredients.'
    }
  };

  const currentStatus = statusConfig[status] || statusConfig['Within Budget'];

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Budget Feasibility</h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStatus.colorClass}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 py-2">
        <div>
          <p className="text-xs text-slate-400">Total Recipe Cost</p>
          <p className="text-lg font-bold text-white mt-0.5">${totalCost.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Target Budget</p>
          <p className="text-lg font-bold text-slate-300 mt-0.5">${targetBudget.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Grocery Bill</p>
          <p className="text-lg font-bold text-brand-300 mt-0.5">${groceryCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500">
          <span>0%</span>
          <span>{percentUsed}% Used</span>
          <span>100%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${currentStatus.barColor}`} 
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      {/* Savings & Advice */}
      <div className="bg-slate-800/40 rounded-xl p-3 flex items-start gap-3 border border-slate-800">
        {savings > 0 ? (
          <>
            <TrendingDown className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3 inline" /> Saved ${savings.toFixed(2)}
              </span>{' '}
              by prioritizing ingredients already available in your pantry!
            </div>
          </>
        ) : (
          <>
            <ShieldAlert className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              {currentStatus.description} Add pantry items under 'Ingredients on Hand' to minimize grocery bill and discover savings.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
