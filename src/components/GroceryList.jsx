import React, { useState } from 'react';
import { ShoppingCart, Check, CheckSquare, Square, Info } from 'lucide-react';

export default function GroceryList({ groceryList, substitutions }) {
  const [purchasedItems, setPurchasedItems] = useState({});

  const togglePurchased = (id) => {
    setPurchasedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalGroceryBill = groceryList.reduce((sum, item) => {
    return sum + (purchasedItems[item.ingredientId] ? 0 : item.cost);
  }, 0);

  const totalOriginalBill = groceryList.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-brand-400" />
          <h3 className="text-lg font-semibold text-white tracking-tight">Grocery Shopping List</h3>
        </div>
        <span className="text-xs text-slate-400">
          {groceryList.length} {groceryList.length === 1 ? 'item' : 'items'} to buy
        </span>
      </div>

      {groceryList.length === 0 ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-emerald-300">🎉 No grocery purchases needed!</p>
          <p className="text-xs text-slate-400 mt-1">You have all required ingredients (or substitutions) available on hand.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Grocery items checklist */}
          <div className="space-y-2.5">
            {groceryList.map((item) => {
              const isBought = !!purchasedItems[item.ingredientId];

              return (
                <div
                  key={item.ingredientId}
                  onClick={() => togglePurchased(item.ingredientId)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isBought
                      ? 'bg-slate-850/40 border-slate-800/40 opacity-55'
                      : 'bg-slate-800/40 border-slate-700/30 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-brand-400 focus:outline-none shrink-0"
                    >
                      {isBought ? (
                        <CheckSquare className="h-4.5 w-4.5 fill-brand-500/20" />
                      ) : (
                        <Square className="h-4.5 w-4.5" />
                      )}
                    </button>
                    <div>
                      <p className={`text-xs font-semibold text-slate-200 ${isBought ? 'line-through text-slate-500' : ''}`}>
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Qty: {item.quantity.toFixed(1)} {item.unit}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold text-slate-300 ${isBought ? 'line-through text-slate-500' : ''}`}>
                    ${item.cost.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Aggregated Bills */}
          <div className="bg-slate-950/40 border border-slate-850/60 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span>${totalOriginalBill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Bought Items:</span>
              <span className="text-emerald-400">
                -${(totalOriginalBill - totalGroceryBill).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white border-t border-slate-800/60 pt-2">
              <span>Remaining Est. Cost:</span>
              <span className="text-brand-300">${totalGroceryBill.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Substitutions Guide Reference */}
      {substitutions.length > 0 && (
        <div className="border-t border-slate-800/80 pt-4 space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-brand-400" />
            Applied Substitutions Guide
          </h4>
          <div className="space-y-2">
            {substitutions.map((sub, idx) => (
              <div key={idx} className="bg-slate-800/20 border border-slate-800/65 rounded-lg p-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between font-semibold text-brand-300 text-[11px] mb-0.5">
                  <span>{sub.recipeName}</span>
                  <span className="text-slate-500 font-normal">Swap applied</span>
                </div>
                <p className="leading-relaxed">
                  Used <strong className="text-slate-200">{sub.substituteName}</strong> instead of {sub.originalName}.
                </p>
                {sub.note && <p className="text-[10px] text-slate-500 mt-1 italic">{sub.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
