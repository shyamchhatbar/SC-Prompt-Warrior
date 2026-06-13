import React, { useState, useEffect } from 'react';
import { 
  fetchPlannerData, 
  saveMealPlan, 
  fetchSavedPlans, 
  isMock 
} from './supabaseClient';
import { generateMealPlan } from './utils/planner';
import InputForm from './components/InputForm';
import BudgetCard from './components/BudgetCard';
import MealCards from './components/MealCards';
import TaskList from './components/TaskList';
import GroceryList from './components/GroceryList';
import { 
  ChefHat, 
  Database, 
  Save, 
  Check, 
  History, 
  UtensilsCrossed, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

export default function App() {
  // Database datasets loaded on mount
  const [dbData, setDbData] = useState({
    recipes: [],
    ingredients: [],
    recipeIngredients: [],
    substitutions: [],
    source: 'Loading...',
    loaded: false
  });

  // User planner inputs
  const [inputs, setInputs] = useState({
    numPeople: 2,
    availableTime: 60,
    budget: 30.00,
    dietaryPreference: 'None',
    preferredCuisine: 'All',
    availableIngredients: [],
    mealsRequired: {
      breakfast: true,
      lunch: true,
      dinner: true
    }
  });

  // Generated meal plan state
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving' | 'saved' | 'error' | null

  // Past plans history list
  const [savedPlans, setSavedPlans] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load database metadata on mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchPlannerData();
      setDbData({
        ...data,
        loaded: true
      });
      
      // Auto-load past saved plans list
      const pastPlans = await fetchSavedPlans();
      setSavedPlans(pastPlans);
    }
    loadData();
  }, []);

  // Generate deterministic plan based on inputs
  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setSaveStatus(null);
    
    // Artificial small timeout to feel premium and showcase loader
    setTimeout(() => {
      const result = generateMealPlan(
        inputs,
        dbData.recipes,
        dbData.ingredients,
        dbData.recipeIngredients,
        dbData.substitutions
      );

      if (result.success) {
        setGeneratedPlan(result.plan);
        setTasks(result.tasks);
      } else {
        setGeneratedPlan(null);
        setTasks([]);
        alert('Could not find any meals matching the selected diet/cuisine criteria. Please expand your available time or change options.');
      }
      setIsGenerating(false);
    }, 600);
  };

  // Persist current plan to DB/local storage
  const handleSavePlan = async () => {
    if (!generatedPlan) return;
    setSaveStatus('saving');
    
    try {
      const res = await saveMealPlan(
        generatedPlan,
        generatedPlan.groceryList,
        inputs.numPeople,
        inputs.budget
      );

      if (res.success) {
        setSaveStatus('saved');
        // Refresh saved plans list
        const pastPlans = await fetchSavedPlans();
        setSavedPlans(pastPlans);
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  };

  // Load a historic plan summary mapping back to UI
  const handleLoadHistoricPlan = (historicPlan) => {
    // Look up recipe details
    const findRecipe = (id) => dbData.recipes.find(r => r.id === id) || null;

    const loadedB = findRecipe(historicPlan.breakfast_recipe_id);
    const loadedL = findRecipe(historicPlan.lunch_recipe_id);
    const loadedD = findRecipe(historicPlan.dinner_recipe_id);

    // Set configuration parameters
    setInputs(prev => ({
      ...prev,
      numPeople: historicPlan.num_people,
      budget: Number(historicPlan.budget),
      mealsRequired: {
        breakfast: !!historicPlan.breakfast_recipe_id,
        lunch: !!historicPlan.lunch_recipe_id,
        dinner: !!historicPlan.dinner_recipe_id
      }
    }));

    // Re-generate using the local solver based on those set ingredients and selections
    const dummyInputs = {
      numPeople: historicPlan.num_people,
      availableTime: 120, // generous time buffer to force exact loading
      budget: Number(historicPlan.budget),
      dietaryPreference: 'None',
      preferredCuisine: 'All',
      availableIngredients: inputs.availableIngredients, // preserve user's current inventory
      mealsRequired: {
        breakfast: !!historicPlan.breakfast_recipe_id,
        lunch: !!historicPlan.lunch_recipe_id,
        dinner: !!historicPlan.dinner_recipe_id
      }
    };

    const solverResult = generateMealPlan(
      dummyInputs,
      dbData.recipes,
      dbData.ingredients,
      dbData.recipeIngredients,
      dbData.substitutions
    );

    if (solverResult.success) {
      // Inject the exact historic recipes instead of optimized ones if they differ
      const customPlan = {
        ...solverResult.plan,
        breakfast: loadedB,
        lunch: loadedL,
        dinner: loadedD
      };
      setGeneratedPlan(customPlan);
      
      // Re-run tasks mapping for these exact recipes
      const customTasks = [];
      const activeMeals = [
        { type: 'Breakfast', data: loadedB },
        { type: 'Lunch', data: loadedL },
        { type: 'Dinner', data: loadedD }
      ].filter(m => m.data);

      activeMeals.forEach(meal => {
        customTasks.push({
          id: `header-${meal.data.id}`,
          type: 'header',
          mealType: meal.type,
          text: `Prepare ${meal.data.name} (${meal.data.total_time} mins total)`
        });
        meal.data.instructions.forEach((instruction, idx) => {
          customTasks.push({
            id: `step-${meal.data.id}-${idx}`,
            type: 'step',
            mealType: meal.type,
            stepNum: idx + 1,
            text: instruction
          });
        });
      });

      setTasks(customTasks);
      setShowHistory(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500/30 selection:text-brand-200">
      
      {/* Header */}
      <header className="bg-slate-900/40 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-brand-600 to-brand-400 p-2 rounded-xl shadow-md">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                ChefFlow <span className="text-xs text-brand-400 font-normal px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">Micro-App</span>
              </h1>
              <p className="text-[10px] text-slate-400 mt-0.5">Deterministic Daily Meal Solver & Tasks Checklist</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Database Connection Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <Database className="h-3.5 w-3.5 text-brand-400" />
              <span>Layer:</span>
              <strong className="text-slate-300 font-semibold">{dbData.source}</strong>
            </div>

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors"
            >
              <History className="h-4 w-4" />
              <span>{showHistory ? 'Dashboard' : 'History'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {!dbData.loaded ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-brand-500 border-t-transparent shadow-lg" />
            <p className="text-sm text-slate-400">Loading recipe directories and pantry listings...</p>
          </div>
        ) : showHistory ? (
          
          /* History View */
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="h-5 w-5 text-brand-400" />
                Plan History & Saved Runs
              </h2>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to Planner
              </button>
            </div>

            <div className="space-y-3">
              {savedPlans.length === 0 ? (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center text-slate-500 text-sm">
                  No saved meal plans found. Generate a plan and click "Save Plan" to record it.
                </div>
              ) : (
                savedPlans.map((planItem) => (
                  <div 
                    key={planItem.id}
                    className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                          {planItem.plan_date}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                          planItem.feasibility_status === 'Within Budget'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : planItem.feasibility_status === 'Slightly Over Budget'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {planItem.feasibility_status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">
                        {planItem.breakfast && <span>🍳 {planItem.breakfast.name || 'Breakfast'}</span>}
                        {planItem.lunch && <span> • 🥗 {planItem.lunch.name || 'Lunch'}</span>}
                        {planItem.dinner && <span> • 🍛 {planItem.dinner.name || 'Dinner'}</span>}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Serves {planItem.num_people} • Daily Cost: ${Number(planItem.total_cost).toFixed(2)} (Budget: ${Number(planItem.budget).toFixed(2)})
                      </div>
                    </div>

                    <button
                      onClick={() => handleLoadHistoricPlan(planItem)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs text-white font-semibold self-start sm:self-center transition-colors"
                    >
                      Load Plan <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          
          /* Dashboard / Planner View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column Config */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <InputForm
                ingredients={dbData.ingredients}
                inputs={inputs}
                onChange={setInputs}
                onGenerate={handleGeneratePlan}
                isGenerating={isGenerating}
              />
            </div>

            {/* Right Column Dashboard display */}
            <div className="lg:col-span-8 space-y-8">
              
              {!generatedPlan ? (
                /* Empty state */
                <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-2xl py-20 px-10 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="bg-slate-900 p-4 rounded-full border border-slate-800">
                    <UtensilsCrossed className="h-10 w-10 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Generate Cooking Dashboard</h3>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    Choose your meals, set your time constraint and budget limit, check off items in your fridge, and click generate to calculate your daily task and grocery routines.
                  </p>
                </div>
              ) : (
                /* Hydrated dashboard output */
                <>
                  {/* Actions Bar */}
                  <div className="flex items-center justify-between bg-slate-900/40 border border-slate-850 rounded-2xl px-6 py-3">
                    <div className="text-xs text-slate-400">
                      Recipe selection score: <strong className="text-brand-300 font-semibold">{generatedPlan.matchScore.toFixed(0)}% Match</strong>
                    </div>

                    <button
                      onClick={handleSavePlan}
                      disabled={saveStatus === 'saving'}
                      className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-500 border border-slate-700 hover:border-slate-600 text-xs font-semibold px-3 py-1.5 rounded-xl text-slate-200 transition-all"
                    >
                      {saveStatus === 'saving' ? (
                        <>
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-400 border-t-transparent" />
                          <span>Saving...</span>
                        </>
                      ) : saveStatus === 'saved' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Saved Successfully!</span>
                        </>
                      ) : saveStatus === 'error' ? (
                        <span className="text-rose-400">Save Failed.</span>
                      ) : (
                        <>
                          <Save className="h-3.5 w-3.5 text-slate-400" />
                          <span>Save Daily Plan</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Budget Status Meter */}
                  <BudgetCard
                    totalCost={generatedPlan.totalMealCost}
                    groceryCost={generatedPlan.groceryCost}
                    targetBudget={inputs.budget}
                    status={generatedPlan.budgetFeasibility}
                  />

                  {/* Generated Meal Cards */}
                  <MealCards 
                    plan={generatedPlan} 
                    numPeople={inputs.numPeople} 
                  />

                  {/* Task List & Grocery Lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TaskList tasks={tasks} />
                    <GroceryList 
                      groceryList={generatedPlan.groceryList} 
                      substitutions={generatedPlan.substitutions}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 ChefFlow Micro-App. All Rights Reserved. Built with React + Supabase + Tailwind.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="https://github.com" target="_blank" className="hover:text-slate-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
