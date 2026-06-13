// Rule-based meal planner engine
import { mockIngredients, mockRecipes, mockRecipeIngredients, mockSubstitutions } from '../data/mockDatabase';

/**
 * Deterministic planning function
 * @param {Object} inputs
 * @param {number} inputs.numPeople - Number of people to scale recipes for
 * @param {number} inputs.availableTime - Available cooking time in minutes
 * @param {number} inputs.budget - Daily food budget in USD
 * @param {string} inputs.dietaryPreference - Vegan, Vegetarian, Keto, Gluten-Free, None
 * @param {string} inputs.preferredCuisine - Italian, Mexican, Asian, Indian, American, All
 * @param {string[]} inputs.availableIngredients - Array of ingredient IDs the user already has
 * @param {Object} inputs.mealsRequired - { breakfast: boolean, lunch: boolean, dinner: boolean }
 * @param {Array} dbRecipes - Optional recipes from Supabase
 * @param {Array} dbIngredients - Optional ingredients from Supabase
 * @param {Array} dbRecipeIngredients - Optional recipe_ingredients from Supabase
 * @param {Array} dbSubstitutions - Optional substitutions from Supabase
 */
export function generateMealPlan(inputs, dbRecipes, dbIngredients, dbRecipeIngredients, dbSubstitutions) {
  // Use DB data if provided, else fallback to mock data
  const recipes = dbRecipes || mockRecipes;
  const ingredients = dbIngredients || mockIngredients;
  const recipeIngredients = dbRecipeIngredients || mockRecipeIngredients;
  const substitutions = dbSubstitutions || mockSubstitutions;

  const {
    numPeople,
    availableTime,
    budget,
    dietaryPreference,
    preferredCuisine,
    availableIngredients,
    mealsRequired
  } = inputs;

  const ingredientMap = new Map(ingredients.map(i => [i.id, i]));
  const substitutionMap = new Map(); // original -> array of substitutions
  substitutions.forEach(sub => {
    if (!substitutionMap.has(sub.original_ingredient_id)) {
      substitutionMap.set(sub.original_ingredient_id, []);
    }
    substitutionMap.get(sub.original_ingredient_id).push(sub);
  });

  // 1. Filter recipes by dietary category and meal type
  const filterRecipesByDiet = (recipe) => {
    if (dietaryPreference === 'None' || !dietaryPreference) return true;
    
    const rDiet = recipe.dietary_category;
    if (dietaryPreference === 'Vegan') {
      return rDiet === 'Vegan';
    }
    if (dietaryPreference === 'Vegetarian') {
      return rDiet === 'Vegan' || rDiet === 'Vegetarian';
    }
    // For other diets (Keto, Gluten-Free), match exactly
    return rDiet === dietaryPreference;
  };

  // Cuisine filter with fallback:
  // If we filter strictly by preferredCuisine and get empty lists, we fallback to 'All'
  const getCuisineFilteredRecipes = (mealType) => {
    let list = recipes.filter(r => r.meal_type === mealType && filterRecipesByDiet(r));
    
    if (preferredCuisine && preferredCuisine !== 'All') {
      const filtered = list.filter(r => r.cuisine === preferredCuisine);
      if (filtered.length > 0) {
        list = filtered;
      }
      // If zero recipes match the cuisine + dietary constraint, we degrade gracefully by ignoring the cuisine filter
    }
    return list;
  };

  const breakfastCandidates = mealsRequired.breakfast ? getCuisineFilteredRecipes('Breakfast') : [null];
  const lunchCandidates = mealsRequired.lunch ? getCuisineFilteredRecipes('Lunch') : [null];
  const dinnerCandidates = mealsRequired.dinner ? getCuisineFilteredRecipes('Dinner') : [null];

  // 2. Generate all combinations
  const combinations = [];
  
  for (const b of breakfastCandidates) {
    for (const l of lunchCandidates) {
      for (const d of dinnerCandidates) {
        // Calculate total time
        const totalTime = (b ? b.total_time : 0) + (l ? l.total_time : 0) + (d ? d.total_time : 0);
        combinations.push({ breakfast: b, lunch: l, dinner: d, totalTime });
      }
    }
  }

  // 3. Score each combination to find the optimal plan
  let bestPlan = null;
  let highestScore = -1;
  let lowestCost = Infinity;

  // Let's filter combinations by time first, but if none fit, we keep all of them (relax constraint)
  let validCombinations = combinations.filter(c => c.totalTime <= availableTime);
  let timeConstraintRelaxed = false;

  if (validCombinations.length === 0) {
    validCombinations = combinations;
    timeConstraintRelaxed = true;
  }

  for (const combo of validCombinations) {
    const activeMeals = [combo.breakfast, combo.lunch, combo.dinner].filter(Boolean);
    if (activeMeals.length === 0) continue;

    // Evaluate ingredients needed for these meals
    let totalIngredientsCount = 0;
    let availableIngredientsCount = 0;
    let substitutedIngredientsCount = 0;
    
    const groceryMap = new Map(); // name -> { ingredientId, quantity, unit, cost, isSubstituted, substituteName }
    const appliedSubstitutions = []; // { recipeName, originalName, substituteName, note }

    let totalMealCost = 0; // Cost of ALL ingredients
    let groceryCost = 0;    // Cost of items that MUST be bought

    for (const meal of activeMeals) {
      const mealIngs = recipeIngredients.filter(ri => ri.recipe_id === meal.id);
      
      for (const ri of mealIngs) {
        totalIngredientsCount++;
        const ing = ingredientMap.get(ri.ingredient_id);
        if (!ing) continue;

        const baseQty = Number(ri.quantity);
        const scaledQty = baseQty * numPeople;
        const baseCost = scaledQty * Number(ing.average_price_per_unit);
        totalMealCost += baseCost;

        // Check availability
        const isAvailable = availableIngredients.includes(ing.id);
        
        if (isAvailable) {
          availableIngredientsCount++;
          // No grocery cost, no substitution needed
        } else {
          // Check if a substitution is possible
          const possibleSubs = substitutionMap.get(ing.id) || [];
          const availableSub = possibleSubs.find(sub => availableIngredients.includes(sub.substitute_ingredient_id));

          if (availableSub) {
            substitutedIngredientsCount++;
            const subIng = ingredientMap.get(availableSub.substitute_ingredient_id);
            appliedSubstitutions.push({
              recipeName: meal.name,
              originalName: ing.name,
              substituteName: subIng ? subIng.name : 'Substitute',
              note: availableSub.note || `Replaced ${ing.name} with ${subIng ? subIng.name : 'substitute'}`
            });
            // Substituted item is already available, so 0 grocery cost
          } else {
            // Must buy!
            groceryCost += baseCost;
            
            // Add to grocery list (aggregate duplicates)
            if (groceryMap.has(ing.id)) {
              const existing = groceryMap.get(ing.id);
              existing.quantity += scaledQty;
              existing.cost += baseCost;
            } else {
              groceryMap.set(ing.id, {
                ingredientId: ing.id,
                name: ing.name,
                quantity: scaledQty,
                unit: ri.unit,
                cost: baseCost
              });
            }
          }
        }
      }
    }

    // Match Score = percentage of ingredients either available or substituted
    const matchScore = totalIngredientsCount > 0 
      ? ((availableIngredientsCount + substitutedIngredientsCount) / totalIngredientsCount) * 100 
      : 100;

    // Deterministic selection:
    // 1. Maximize matchScore (minimize grocery trips)
    // 2. Minimize groceryCost (minimize immediate expenditure)
    // 3. Minimize totalTime
    let isBetter = false;
    if (matchScore > highestScore) {
      isBetter = true;
    } else if (matchScore === highestScore) {
      if (groceryCost < lowestCost) {
        isBetter = true;
      } else if (groceryCost === lowestCost) {
        if (combo.totalTime < (bestPlan ? bestPlan.totalTime : Infinity)) {
          isBetter = true;
        }
      }
    }

    if (isBetter) {
      highestScore = matchScore;
      lowestCost = groceryCost;
      
      // Calculate feasibility based on Total Recipe Cost (as per specification)
      let budgetFeasibility = 'Within Budget';
      if (totalMealCost > budget * 1.25) {
        budgetFeasibility = 'Over Budget';
      } else if (totalMealCost > budget) {
        budgetFeasibility = 'Slightly Over Budget';
      }

      bestPlan = {
        breakfast: combo.breakfast,
        lunch: combo.lunch,
        dinner: combo.dinner,
        totalTime: combo.totalTime,
        totalMealCost,
        groceryCost,
        matchScore,
        budgetFeasibility,
        substitutions: appliedSubstitutions,
        groceryList: Array.from(groceryMap.values()),
        timeConstraintRelaxed
      };
    }
  }

  // Generate a consolidated step-by-step cooking task list
  const tasks = [];
  if (bestPlan) {
    const activeMeals = [
      { type: 'Breakfast', data: bestPlan.breakfast },
      { type: 'Lunch', data: bestPlan.lunch },
      { type: 'Dinner', data: bestPlan.dinner }
    ].filter(m => m.data);

    activeMeals.forEach(meal => {
      // Add a header for the meal
      tasks.push({
        id: `header-${meal.data.id}`,
        type: 'header',
        mealType: meal.type,
        text: `Prepare ${meal.data.name} (${meal.data.total_time} mins total)`
      });

      // Add each step
      meal.data.instructions.forEach((instruction, idx) => {
        tasks.push({
          id: `step-${meal.data.id}-${idx}`,
          type: 'step',
          mealType: meal.type,
          stepNum: idx + 1,
          text: instruction
        });
      });
    });
  }

  return {
    success: !!bestPlan,
    plan: bestPlan,
    tasks
  };
}
