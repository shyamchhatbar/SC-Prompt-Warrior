import React from 'react';
import { Clock, ChefHat, Sparkles } from 'lucide-react';

export default function MealCards({ plan, numPeople }) {
  if (!plan) return null;

  const meals = [
    { label: 'Breakfast', recipe: plan.breakfast },
    { label: 'Lunch', recipe: plan.lunch },
    { label: 'Dinner', planLabel: 'Dinner', recipe: plan.dinner }
  ].filter(m => m.recipe);

  // Filter substitutions applied to a specific recipe
  const getSubstitutionsForRecipe = (recipeName) => {
    return plan.substitutions.filter(sub => sub.recipeName === recipeName);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
        <ChefHat className="h-5 w-5 text-brand-400" />
        Your Daily Meal Plan
      </h3>
      {plan.timeConstraintRelaxed && (
        <div className="bg-amber-500/10 border border-amber-500/35 rounded-xl p-3 text-xs text-amber-300">
          ⚠️ <strong>Time limit exceeded:</strong> No recipe combinations fit under your exact time limit. The optimizer has suggested the fastest available combination.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map(({ label, recipe }) => {
          const recipeSubs = getSubstitutionsForRecipe(recipe.name);

          return (
            <div 
              key={recipe.id} 
              className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl flex flex-col group hover:border-slate-700 transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img 
                  src={recipe.image_url} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=60';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                  {label}
                </span>
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {recipe.cuisine}
                </span>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-md font-bold text-white leading-tight drop-shadow-md">{recipe.name}</h4>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 drop-shadow-sm">{recipe.description}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-850 pb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-400" />
                    <span>Total: {recipe.total_time} mins</span>
                  </span>
                  <span className="bg-brand-500/10 text-brand-300 font-semibold px-2 py-0.5 rounded-md text-[10px]">
                    {recipe.dietary_category}
                  </span>
                  <span>
                    Cost: ${(recipe.cost_per_serving * numPeople).toFixed(2)}
                  </span>
                </div>

                {/* Applied Substitutions (if any) */}
                {recipeSubs.length > 0 && (
                  <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-2.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-300 font-semibold">
                      <Sparkles className="h-3.5 w-3.5 text-brand-400" />
                      <span>Substitution Applied</span>
                    </div>
                    {recipeSubs.map((sub, i) => (
                      <p key={i} className="text-[11px] text-slate-300 leading-normal">
                        Used <strong className="text-brand-300">{sub.substituteName}</strong> instead of {sub.originalName}.
                      </p>
                    ))}
                  </div>
                )}

                {/* Ingredients snippet */}
                <div>
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Key instructions:</h5>
                  <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside pl-1">
                    {recipe.instructions.slice(0, 2).map((inst, idx) => (
                      <li key={idx} className="line-clamp-1 leading-relaxed">{inst}</li>
                    ))}
                    {recipe.instructions.length > 2 && (
                      <li className="text-[10px] text-slate-500 list-none mt-1">
                        + {recipe.instructions.length - 2} more steps in tasks list
                      </li>
                    )}
                  </ol>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
