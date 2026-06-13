import React, { useState, useMemo } from 'react';
import { Users, Clock, DollarSign, Leaf, Utensils, Check, Plus, X, Search } from 'lucide-react';

export default function InputForm({
  ingredients,
  inputs,
  onChange,
  onGenerate,
  isGenerating
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter ingredients for search list
  const filteredIngredients = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return ingredients
      .filter(ing => 
        ing.name.toLowerCase().includes(term) && 
        !inputs.availableIngredients.includes(ing.id)
      )
      .slice(0, 5); // Limit search results to 5
  }, [searchTerm, ingredients, inputs.availableIngredients]);

  const addIngredient = (id) => {
    onChange({
      ...inputs,
      availableIngredients: [...inputs.availableIngredients, id]
    });
    setSearchTerm('');
  };

  const removeIngredient = (id) => {
    onChange({
      ...inputs,
      availableIngredients: inputs.availableIngredients.filter(item => item !== id)
    });
  };

  // Map IDs to ingredient names for badge list
  const activeIngredients = useMemo(() => {
    const ingMap = new Map(ingredients.map(i => [i.id, i.name]));
    return inputs.availableIngredients.map(id => ({
      id,
      name: ingMap.get(id) || 'Unknown'
    }));
  }, [inputs.availableIngredients, ingredients]);

  const toggleMeal = (meal) => {
    onChange({
      ...inputs,
      mealsRequired: {
        ...inputs.mealsRequired,
        [meal]: !inputs.mealsRequired[meal]
      }
    });
  };

  const hasAtLeastOneMeal = inputs.mealsRequired.breakfast || inputs.mealsRequired.lunch || inputs.mealsRequired.dinner;

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-6">
      <div className="border-b border-slate-800/80 pb-4">
        <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
          <Utensils className="h-5 w-5 text-brand-400" />
          Meal Planner Setup
        </h2>
        <p className="text-xs text-slate-400 mt-1">Configure your constraints and ingredients below.</p>
      </div>

      {/* Meals Required */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200">Meals Needed Today</label>
        <div className="grid grid-cols-3 gap-2">
          {['breakfast', 'lunch', 'dinner'].map((meal) => (
            <button
              key={meal}
              type="button"
              onClick={() => toggleMeal(meal)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize border transition-all duration-200 ${
                inputs.mealsRequired[meal]
                  ? 'bg-brand-500/10 border-brand-500/80 text-brand-300 shadow-sm shadow-brand-500/10'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>
        {!hasAtLeastOneMeal && (
          <p className="text-xs text-rose-400 italic">Please select at least one meal to plan.</p>
        )}
      </div>

      {/* Number of People */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-slate-200">
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-brand-400" /> People</span>
          <span className="text-brand-300 font-bold">{inputs.numPeople} {inputs.numPeople === 1 ? 'Person' : 'People'}</span>
        </div>
        <input
          type="range"
          min="1"
          max="8"
          value={inputs.numPeople}
          onChange={(e) => onChange({ ...inputs, numPeople: parseInt(e.target.value) })}
          className="w-full accent-brand-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Available Cooking Time */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-slate-200">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-400" /> Max Cook Time</span>
          <span className="text-brand-300 font-bold">{inputs.availableTime} mins</span>
        </div>
        <input
          type="range"
          min="10"
          max="120"
          step="5"
          value={inputs.availableTime}
          onChange={(e) => onChange({ ...inputs, availableTime: parseInt(e.target.value) })}
          className="w-full accent-brand-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Daily Budget */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-brand-400" /> Daily Food Budget ($)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
          <input
            type="number"
            min="1"
            max="200"
            value={inputs.budget}
            onChange={(e) => onChange({ ...inputs, budget: Math.max(1, parseFloat(e.target.value) || 0) })}
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2 pl-8 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Dietary Preference */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
          <Leaf className="h-4 w-4 text-brand-400" /> Dietary Preference
        </label>
        <select
          value={inputs.dietaryPreference}
          onChange={(e) => onChange({ ...inputs, dietaryPreference: e.target.value })}
          className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="None">None (Standard Diet)</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Keto">Keto</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>

      {/* Cuisine Style */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
          <Utensils className="h-4 w-4 text-brand-400" /> Preferred Cuisine
        </label>
        <select
          value={inputs.preferredCuisine}
          onChange={(e) => onChange({ ...inputs, preferredCuisine: e.target.value })}
          className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
        >
          <option value="All">All Cuisines</option>
          <option value="American">American</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          <option value="Mediterranean">Mediterranean</option>
        </select>
      </div>

      {/* Ingredients Already Available */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
          Ingredients on Hand
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search ingredients to add..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
          />
          {searchTerm && (
            <button 
              type="button" 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown list for matching search */}
        {filteredIngredients.length > 0 && (
          <ul className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg max-h-40 overflow-y-auto divide-y divide-slate-700 mt-1">
            {filteredIngredients.map(ing => (
              <li key={ing.id}>
                <button
                  type="button"
                  onClick={() => addIngredient(ing.id)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-white flex items-center justify-between"
                >
                  <span>{ing.name}</span>
                  <Plus className="h-4 w-4 text-brand-400" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Active badges */}
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          {activeIngredients.map(ing => (
            <span
              key={ing.id}
              className="inline-flex items-center gap-1 bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs px-2 py-0.5 rounded-full"
            >
              {ing.name}
              <button
                type="button"
                onClick={() => removeIngredient(ing.id)}
                className="text-brand-400 hover:text-brand-200 focus:outline-none"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {activeIngredients.length === 0 && (
            <p className="text-xs text-slate-500 italic">None selected. We will generate groceries for all recipe requirements.</p>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="button"
        disabled={isGenerating || !hasAtLeastOneMeal}
        onClick={onGenerate}
        className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
          isGenerating || !hasAtLeastOneMeal
            ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/20 active:scale-[0.98]'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Optimizing Plan...
          </>
        ) : (
          'Generate Meal Plan'
        )}
      </button>
    </div>
  );
}
