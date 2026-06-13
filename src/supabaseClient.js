import { createClient } from '@supabase/supabase-js';
import { 
  mockIngredients, 
  mockRecipes, 
  mockRecipeIngredients, 
  mockSubstitutions,
  saveLocalMealPlan,
  getLocalMealPlans
} from './data/mockDatabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are set
export const isMock = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL';

if (isMock) {
  console.warn(
    'Supabase connection details are missing or set to placeholder values. Falling back to the local, offline-capable mock database.'
  );
}

export const supabase = isMock ? null : createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all recipes, ingredients, relations, and substitutions.
 * Falls back to local mock arrays if in mock mode.
 */
export async function fetchPlannerData() {
  if (isMock) {
    return {
      recipes: mockRecipes,
      ingredients: mockIngredients,
      recipeIngredients: mockRecipeIngredients,
      substitutions: mockSubstitutions,
      source: 'Local Mock Database'
    };
  }

  try {
    const [
      { data: recipes, error: errRecipes },
      { data: ingredients, error: errIngredients },
      { data: recipeIngredients, error: errRecipeIngredients },
      { data: substitutions, error: errSubstitutions }
    ] = await Promise.all([
      supabase.from('recipes').select('*'),
      supabase.from('ingredients').select('*'),
      supabase.from('recipe_ingredients').select('*'),
      supabase.from('substitutions').select('*')
    ]);

    if (errRecipes || errIngredients || errRecipeIngredients || errSubstitutions) {
      throw new Error('Error fetching data from Supabase, reverting to mock data.');
    }

    return {
      recipes,
      ingredients,
      recipeIngredients,
      substitutions,
      source: 'Supabase Database'
    };
  } catch (error) {
    console.error(error.message);
    return {
      recipes: mockRecipes,
      ingredients: mockIngredients,
      recipeIngredients: mockRecipeIngredients,
      substitutions: mockSubstitutions,
      source: 'Local Mock Database (Reverted)'
    };
  }
}

/**
 * Persist the generated meal plan and grocery list.
 * Saves to local storage or Supabase.
 */
export async function saveMealPlan(planData, groceryItems, numPeople, budget) {
  const mealPlanPayload = {
    breakfast_recipe_id: planData.breakfast ? planData.breakfast.id : null,
    lunch_recipe_id: planData.lunch ? planData.lunch.id : null,
    dinner_recipe_id: planData.dinner ? planData.dinner.id : null,
    num_people: numPeople,
    budget: budget,
    total_cost: planData.totalMealCost,
    feasibility_status: planData.budgetFeasibility,
    plan_date: new Date().toISOString().split('T')[0]
  };

  if (isMock) {
    const result = saveLocalMealPlan(mealPlanPayload, groceryItems);
    return { success: true, data: result, source: 'localStorage' };
  }

  try {
    // 1. Insert meal plan
    const { data: plan, error: planError } = await supabase
      .from('meal_plans')
      .insert(mealPlanPayload)
      .select()
      .single();

    if (planError) throw planError;

    // 2. Insert grocery list connected to plan
    const groceryPayload = {
      meal_plan_id: plan.id,
      items: groceryItems
    };

    const { data: grocery, error: groceryError } = await supabase
      .from('grocery_lists')
      .insert(groceryPayload)
      .select()
      .single();

    if (groceryError) throw groceryError;

    return {
      success: true,
      data: { mealPlan: plan, groceryList: grocery },
      source: 'Supabase Database'
    };
  } catch (error) {
    console.error('Failed to save meal plan to Supabase:', error);
    // Silent fallback save to local storage
    const result = saveLocalMealPlan(mealPlanPayload, groceryItems);
    return { success: true, data: result, source: 'localStorage (Fallback)' };
  }
}

/**
 * Fetch past meal plans
 */
export async function fetchSavedPlans() {
  if (isMock) {
    return getLocalMealPlans();
  }
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*, breakfast:recipes!breakfast_recipe_id(name), lunch:recipes!lunch_recipe_id(name), dinner:recipes!dinner_recipe_id(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch from Supabase, pulling local:', error);
    return getLocalMealPlans();
  }
}
