// Local Mock Database replicating the Supabase SQL schema & seed data
// Used as a fallback if Supabase env parameters are not configured

export const mockIngredients = [
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', name: 'Egg', default_unit: 'pcs', average_price_per_unit: 0.2500 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', name: 'Chicken Breast', default_unit: 'g', average_price_per_unit: 0.0080 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046524', name: 'Avocado', default_unit: 'pcs', average_price_per_unit: 1.5000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', name: 'Bread', default_unit: 'slice', average_price_per_unit: 0.1500 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', name: 'Butter', default_unit: 'g', average_price_per_unit: 0.0100 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', name: 'Milk', default_unit: 'ml', average_price_per_unit: 0.0020 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046528', name: 'Oats', default_unit: 'g', average_price_per_unit: 0.0030 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046529', name: 'Banana', default_unit: 'pcs', average_price_per_unit: 0.2500 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046530', name: 'Maple Syrup', default_unit: 'ml', average_price_per_unit: 0.0300 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046531', name: 'Almond Milk', default_unit: 'ml', average_price_per_unit: 0.0030 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046532', name: 'Oat Milk', default_unit: 'ml', average_price_per_unit: 0.0030 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046533', name: 'Bacon', default_unit: 'strip', average_price_per_unit: 0.5000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046534', name: 'Spinach', default_unit: 'g', average_price_per_unit: 0.0200 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046535', name: 'Tofu', default_unit: 'g', average_price_per_unit: 0.0060 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046536', name: 'Broccoli', default_unit: 'g', average_price_per_unit: 0.0050 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', name: 'Rice', default_unit: 'g', average_price_per_unit: 0.0020 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', name: 'Soy Sauce', default_unit: 'ml', average_price_per_unit: 0.0100 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046539', name: 'Sesame Oil', default_unit: 'ml', average_price_per_unit: 0.0200 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', name: 'Garlic', default_unit: 'clove', average_price_per_unit: 0.1000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046541', name: 'Ginger', default_unit: 'g', average_price_per_unit: 0.0500 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046542', name: 'Salmon Fillet', default_unit: 'g', average_price_per_unit: 0.0250 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046543', name: 'Asparagus', default_unit: 'g', average_price_per_unit: 0.0150 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046544', name: 'Pasta', default_unit: 'g', average_price_per_unit: 0.0020 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046545', name: 'Marinara Sauce', default_unit: 'ml', average_price_per_unit: 0.0060 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046546', name: 'Heavy Cream', default_unit: 'ml', average_price_per_unit: 0.0100 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046547', name: 'Parmesan Cheese', default_unit: 'g', average_price_per_unit: 0.0200 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046548', name: 'Canned Chickpeas', default_unit: 'g', average_price_per_unit: 0.0040 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046549', name: 'Cucumber', default_unit: 'pcs', average_price_per_unit: 0.8000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046550', name: 'Tomato', default_unit: 'pcs', average_price_per_unit: 0.5000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', name: 'Olive Oil', default_unit: 'ml', average_price_per_unit: 0.0150 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', name: 'Lemon Juice', default_unit: 'ml', average_price_per_unit: 0.0200 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046553', name: 'Mozzarella Cheese', default_unit: 'g', average_price_per_unit: 0.0120 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046554', name: 'Basil Leaves', default_unit: 'g', average_price_per_unit: 0.1000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046555', name: 'Greek Yogurt', default_unit: 'g', average_price_per_unit: 0.0080 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046556', name: 'Honey', default_unit: 'ml', average_price_per_unit: 0.0200 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046557', name: 'Mixed Berries', default_unit: 'g', average_price_per_unit: 0.0150 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046558', name: 'Gluten-Free Granola', default_unit: 'g', average_price_per_unit: 0.0150 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046559', name: 'Romaine Lettuce', default_unit: 'pcs', average_price_per_unit: 0.3000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046560', name: 'Turkey Breast Slices', default_unit: 'g', average_price_per_unit: 0.0120 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046561', name: 'Cheddar Cheese', default_unit: 'g', average_price_per_unit: 0.0100 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046562', name: 'Mayonnaise', default_unit: 'g', average_price_per_unit: 0.0080 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046563', name: 'Black Beans', default_unit: 'g', average_price_per_unit: 0.0030 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046564', name: 'Corn', default_unit: 'g', average_price_per_unit: 0.0020 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046565', name: 'Salsa', default_unit: 'ml', average_price_per_unit: 0.0050 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046566', name: 'Flour', default_unit: 'g', average_price_per_unit: 0.0010 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046567', name: 'Tortilla', default_unit: 'pcs', average_price_per_unit: 0.4000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046568', name: 'Beef Ribeye', default_unit: 'g', average_price_per_unit: 0.0180 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046569', name: 'Vegetable Oil', default_unit: 'ml', average_price_per_unit: 0.0050 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046570', name: 'Coconut Oil', default_unit: 'ml', average_price_per_unit: 0.0150 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046571', name: 'Quinoa', default_unit: 'g', average_price_per_unit: 0.0040 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046572', name: 'Gluten-Free Bread', default_unit: 'slice', average_price_per_unit: 0.2000 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046573', name: 'Tamari', default_unit: 'ml', average_price_per_unit: 0.0120 },
  { id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046574', name: 'Flax Egg', default_unit: 'pcs', average_price_per_unit: 0.1500 }
];

export const mockSubstitutions = [
  { id: 's1', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046531', ratio: 1.00, note: 'Dairy-free plant milk alternative (Almond Milk)' },
  { id: 's2', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046532', ratio: 1.00, note: 'Dairy-free oat milk alternative (Oat Milk)' },
  { id: 's3', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', ratio: 0.75, note: 'Heart-healthy fats alternative (Olive Oil)' },
  { id: 's4', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046570', ratio: 1.00, note: 'Plant-based solid fat alternative (Coconut Oil)' },
  { id: 's5', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046535', ratio: 1.00, note: 'Plant-based protein alternative (Tofu)' },
  { id: 's6', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046571', ratio: 1.00, note: 'High-protein grain alternative (Quinoa)' },
  { id: 's7', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046572', ratio: 1.00, note: 'Gluten-free bread alternative' },
  { id: 's8', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046573', ratio: 1.00, note: 'Gluten-free soy sauce alternative (Tamari)' },
  { id: 's9', original_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', substitute_ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046574', ratio: 1.00, note: 'Vegan baking egg binder (Flax Egg)' }
];

export const mockRecipes = [
  {
    id: 'a1000000-0000-0000-0000-000000000001',
    name: 'Banana Oatmeal',
    description: 'Warm, hearty steel-cut oats topped with sliced bananas and sweet maple syrup.',
    cuisine: 'American',
    dietary_category: 'Vegan',
    meal_type: 'Breakfast',
    prep_time: 5,
    cook_time: 5,
    total_time: 10,
    servings: 1,
    cost_per_serving: 1.45,
    image_url: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'In a medium saucepan, bring water or almond milk to a boil.',
      'Stir in the oats and reduce heat to low.',
      'Simmer for 5 minutes, stirring occasionally, until oats are tender and creamy.',
      'Pour into a bowl, slice fresh bananas on top, and drizzle with maple syrup.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    name: 'Mediterranean Chickpea Salad',
    description: 'Refreshing chickpea salad with cucumbers, tomatoes, dressed in lemon juice and olive oil.',
    cuisine: 'Mediterranean',
    dietary_category: 'Vegan',
    meal_type: 'Lunch',
    prep_time: 10,
    cook_time: 0,
    total_time: 10,
    servings: 1,
    cost_per_serving: 2.30,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Rinse and drain the canned chickpeas.',
      'Chop cucumbers and tomatoes into small bite-sized cubes.',
      'In a large salad bowl, combine chickpeas, cucumber, and tomatoes.',
      'Drizzle with olive oil, lemon juice, and a pinch of salt and pepper.',
      'Toss gently to mix and serve chilled.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    name: 'Sesame Tofu Stir-Fry',
    description: 'Crispy pan-fried tofu tossed with fresh broccoli and ginger-soy sauce over fluffy rice.',
    cuisine: 'Asian',
    dietary_category: 'Vegan',
    meal_type: 'Dinner',
    prep_time: 15,
    cook_time: 15,
    total_time: 30,
    servings: 1,
    cost_per_serving: 3.45,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Cook the rice according to package instructions.',
      'Press the tofu block to remove excess water, then cut into cubes.',
      'Heat sesame oil in a large skillet or wok over medium-high heat and sear tofu until golden brown on all sides; remove and set aside.',
      'In the same pan, add minced garlic, ginger, and broccoli florets. Cook for 5 minutes until crisp-tender.',
      'Return tofu to the pan, pour in soy sauce, and toss together for 2 minutes.',
      'Serve hot over the cooked rice.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    name: 'Avocado Toast with Poached Egg',
    description: 'Crisp toasted bread topped with rich mashed avocado and a perfectly poached egg.',
    cuisine: 'American',
    dietary_category: 'Vegetarian',
    meal_type: 'Breakfast',
    prep_time: 5,
    cook_time: 5,
    total_time: 10,
    servings: 1,
    cost_per_serving: 2.40,
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Toast the bread slices until golden brown.',
      'Cut open the avocado, scoop out the flesh, and mash it in a bowl with a pinch of salt.',
      'Poach the eggs in gently simmering water for 3-4 minutes until whites are set but yolks remain runny.',
      'Spread the mashed avocado evenly over the toast.',
      'Carefully top with the poached eggs and season with cracked black pepper.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    name: 'Caprese Grilled Cheese',
    description: 'A gourmet twist on grilled cheese featuring melted mozzarella, ripe tomatoes, and aromatic basil.',
    cuisine: 'Italian',
    dietary_category: 'Vegetarian',
    meal_type: 'Lunch',
    prep_time: 5,
    cook_time: 10,
    total_time: 15,
    servings: 1,
    cost_per_serving: 2.30,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Slice the tomatoes and mozzarella cheese.',
      'Butter one side of each bread slice.',
      'Place one bread slice butter-side-down in a skillet over medium heat.',
      'Layer mozzarella, tomatoes, and fresh basil leaves, then top with the second bread slice (butter-side-up).',
      'Grill for 4-5 minutes per side until bread is golden and cheese is completely melted.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    name: 'Creamy Marinara Pasta',
    description: 'Penne pasta tossed in a luxurious, creamy tomato marinara sauce, finished with parmesan.',
    cuisine: 'Italian',
    dietary_category: 'Vegetarian',
    meal_type: 'Dinner',
    prep_time: 10,
    cook_time: 15,
    total_time: 25,
    servings: 1,
    cost_per_serving: 2.75,
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Bring a large pot of salted water to a boil and cook pasta according to directions; drain and set aside.',
      'In a saucepan, heat olive oil and cook minced garlic for 1 minute until fragrant.',
      'Add the marinara sauce and let it simmer for 5 minutes.',
      'Stir in the heavy cream and let it cook for another 2 minutes on low heat.',
      'Add cooked pasta and grated parmesan cheese. Toss to coat and serve immediately.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    name: 'Keto Bacon & Egg Scramble',
    description: 'Fluffy butter-scrambled eggs paired with baby spinach and crispy bacon strips.',
    cuisine: 'American',
    dietary_category: 'Keto',
    meal_type: 'Breakfast',
    prep_time: 5,
    cook_time: 10,
    total_time: 15,
    servings: 1,
    cost_per_serving: 3.40,
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'In a cold skillet, lay out bacon strips and cook over medium heat until crispy. Set aside on paper towels, reserving fat in the pan.',
      'Add butter to the pan and toss in the spinach, cooking until wilted (about 1-2 minutes).',
      'Whisk eggs in a bowl and pour into the pan with the spinach.',
      'Scramble gently on low heat until eggs are cooked through but soft.',
      'Serve scrambled eggs hot alongside crispy bacon.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000008',
    name: 'Chicken Avocado Salad',
    description: 'Crispy pan-seared chicken breast and sliced avocados tossed in a rich mayonnaise-olive oil dressing.',
    cuisine: 'American',
    dietary_category: 'Keto',
    meal_type: 'Lunch',
    prep_time: 10,
    cook_time: 10,
    total_time: 20,
    servings: 1,
    cost_per_serving: 4.80,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Season chicken breast with salt and pepper.',
      'Heat 10ml olive oil in a skillet and sear chicken for 5 minutes per side until cooked through. Let it rest, then cube.',
      'Dice the avocado.',
      'In a bowl, mix mayonnaise, remaining olive oil, and lemon juice to form a dressing.',
      'Combine chicken, avocado, and dressing in a bowl. Toss gently and serve.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000009',
    name: 'Garlic Butter Salmon with Asparagus',
    description: 'Rich, pan-seared salmon fillet basted with garlic butter, served with roasted asparagus.',
    cuisine: 'American',
    dietary_category: 'Keto',
    meal_type: 'Dinner',
    prep_time: 5,
    cook_time: 15,
    total_time: 20,
    servings: 1,
    cost_per_serving: 8.95,
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Pat the salmon dry and season both sides with salt and pepper.',
      'Melt butter in a skillet over medium-high heat. Add minced garlic and sauté for 1 minute.',
      'Place salmon skin-side down in the pan. Cook for 5-6 minutes, spooning garlic butter over the top.',
      'Flip salmon and cook for another 3-4 minutes.',
      'In a separate pan, sauté asparagus in olive oil for 5 minutes until tender.',
      'Serve salmon topped with remaining pan juices alongside asparagus.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000010',
    name: 'Greek Yogurt Granola Parfait',
    description: 'Creamy Greek yogurt layered with organic honey, fresh mixed berries, and crunchy gluten-free granola.',
    cuisine: 'American',
    dietary_category: 'Gluten-Free',
    meal_type: 'Breakfast',
    prep_time: 5,
    cook_time: 0,
    total_time: 5,
    servings: 1,
    cost_per_serving: 3.80,
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'In a tall glass or bowl, spoon half of the Greek yogurt.',
      'Top with a layer of mixed berries.',
      'Drizzle with honey and add a layer of gluten-free granola.',
      'Repeat the layers with the remaining yogurt, berries, honey, and granola.',
      'Enjoy immediately as a fresh, gut-healthy breakfast.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000011',
    name: 'Turkey & Cheese Lettuce Wraps',
    description: 'A low-carb, gluten-free lunch wrap with smoked turkey breast, cheddar, and mayonnaise wrapped in crisp romaine lettuce.',
    cuisine: 'American',
    dietary_category: 'Gluten-Free',
    meal_type: 'Lunch',
    prep_time: 10,
    cook_time: 0,
    total_time: 10,
    servings: 1,
    cost_per_serving: 2.90,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Wash romaine lettuce leaves thoroughly and pat dry with paper towels.',
      'Lay the lettuce leaves flat on a clean board.',
      'Spread a thin layer of mayonnaise on each leaf.',
      'Layer turkey breast slices and cheddar cheese evenly over the leaves.',
      'Roll up the leaves tightly from the base to create wraps. Secure with toothpicks if needed.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000012',
    name: 'Mexican Chicken & Rice Bowl',
    description: 'Savory chicken breast served over fluffy rice, topped with black beans, corn, and zesty fresh salsa.',
    cuisine: 'Mexican',
    dietary_category: 'Gluten-Free',
    meal_type: 'Dinner',
    prep_time: 15,
    cook_time: 15,
    total_time: 30,
    servings: 1,
    cost_per_serving: 3.75,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Cook the rice according to directions.',
      'Season chicken breast with Mexican spices (cumin, chili powder, oregano).',
      'Sauté chicken in olive oil for 5-6 minutes per side until cooked through, then slice.',
      'Warm the black beans and corn in a small pot.',
      'Assemble the bowl by adding rice, then layering beans, corn, and sliced chicken.',
      'Top with a generous spoonful of salsa and serve.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000013',
    name: 'Classic Fluffy Pancakes',
    description: 'Traditional tall, fluffy pancakes cooked in butter and served with maple syrup.',
    cuisine: 'American',
    dietary_category: 'None',
    meal_type: 'Breakfast',
    prep_time: 10,
    cook_time: 15,
    total_time: 25,
    servings: 1,
    cost_per_serving: 1.45,
    image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'In a large bowl, whisk flour, sugar, and baking powder together.',
      'Whisk in milk and the egg until a smooth batter forms.',
      'Melt 10g of butter in a pan or griddle over medium heat.',
      'Pour 1/4 cup of batter for each pancake. Cook until bubbles form on top, then flip and cook until golden brown.',
      'Stack and serve hot with remaining butter and maple syrup.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000014',
    name: 'Chicken & Cheese Quesadilla',
    description: 'Crispy toasted tortillas stuffed with spiced grilled chicken breast and melted cheddar, served with salsa.',
    cuisine: 'Mexican',
    dietary_category: 'None',
    meal_type: 'Lunch',
    prep_time: 5,
    cook_time: 10,
    total_time: 15,
    servings: 1,
    cost_per_serving: 2.75,
    image_url: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Cook or slice pre-cooked chicken breast.',
      'Place one tortilla in a buttered skillet.',
      'Layer with half of the cheddar cheese and the chicken, then cover with the remaining cheese and top with the second tortilla.',
      'Cook on medium heat for 3-4 minutes until the bottom tortilla is crispy and golden, then flip carefully.',
      'Cook for another 3 minutes until cheese is fully melted. Cut into wedges and serve with salsa.'
    ]
  },
  {
    id: 'a1000000-0000-0000-0000-000000000015',
    name: 'Classic Beef & Broccoli',
    description: 'Tender slices of beef ribeye sautéed with crisp broccoli florets in a rich garlic-soy glaze over white rice.',
    cuisine: 'Asian',
    dietary_category: 'None',
    meal_type: 'Dinner',
    prep_time: 15,
    cook_time: 15,
    total_time: 30,
    servings: 1,
    cost_per_serving: 6.25,
    image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60',
    instructions: [
      'Cook white rice according to package directions.',
      'Slice the beef ribeye into thin strips.',
      'In a bowl, mix soy sauce, minced garlic, and a pinch of sugar.',
      'Heat vegetable oil in a wok or skillet over high heat. Add beef strips and sear for 2-3 minutes until browned; remove and set aside.',
      'Add broccoli to the wok and cook with 2 tablespoons of water for 3 minutes until steam-cooked.',
      'Return beef to the wok, add the soy sauce mixture, and toss everything together on high heat for 1 minute.',
      'Serve immediately over the cooked rice.'
    ]
  }
];

export const mockRecipeIngredients = [
  // Recipe 1: Oatmeal with Bananas
  { id: 'ri1', recipe_id: 'a1000000-0000-0000-0000-000000000001', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046528', quantity: 100, unit: 'g' },
  { id: 'ri2', recipe_id: 'a1000000-0000-0000-0000-000000000001', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046529', quantity: 1, unit: 'pcs' },
  { id: 'ri3', recipe_id: 'a1000000-0000-0000-0000-000000000001', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046530', quantity: 20, unit: 'ml' },
  { id: 'ri4', recipe_id: 'a1000000-0000-0000-0000-000000000001', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046531', quantity: 200, unit: 'ml' },

  // Recipe 2: Chickpea Salad
  { id: 'ri5', recipe_id: 'a1000000-0000-0000-0000-000000000002', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046548', quantity: 200, unit: 'g' },
  { id: 'ri6', recipe_id: 'a1000000-0000-0000-0000-000000000002', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046549', quantity: 1, unit: 'pcs' },
  { id: 'ri7', recipe_id: 'a1000000-0000-0000-0000-000000000002', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046550', quantity: 1, unit: 'pcs' },
  { id: 'ri8', recipe_id: 'a1000000-0000-0000-0000-000000000002', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', quantity: 15, unit: 'ml' },
  { id: 'ri9', recipe_id: 'a1000000-0000-0000-0000-000000000002', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', quantity: 10, unit: 'ml' },

  // Recipe 3: Tofu Stir-fry
  { id: 'ri10', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046535', quantity: 200, unit: 'g' },
  { id: 'ri11', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046536', quantity: 150, unit: 'g' },
  { id: 'ri12', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', quantity: 20, unit: 'ml' },
  { id: 'ri13', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046539', quantity: 10, unit: 'ml' },
  { id: 'ri14', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', quantity: 2, unit: 'clove' },
  { id: 'ri15', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046541', quantity: 10, unit: 'g' },
  { id: 'ri16', recipe_id: 'a1000000-0000-0000-0000-000000000003', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', quantity: 150, unit: 'g' },

  // Recipe 4: Avocado Toast with Poached Egg
  { id: 'ri17', recipe_id: 'a1000000-0000-0000-0000-000000000004', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', quantity: 2, unit: 'slice' },
  { id: 'ri18', recipe_id: 'a1000000-0000-0000-0000-000000000004', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046524', quantity: 1, unit: 'pcs' },
  { id: 'ri19', recipe_id: 'a1000000-0000-0000-0000-000000000004', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', quantity: 2, unit: 'pcs' },
  { id: 'ri20', recipe_id: 'a1000000-0000-0000-0000-000000000004', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', quantity: 10, unit: 'g' },

  // Recipe 5: Caprese Grilled Cheese
  { id: 'ri21', recipe_id: 'a1000000-0000-0000-0000-000000000005', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', quantity: 2, unit: 'slice' },
  { id: 'ri22', recipe_id: 'a1000000-0000-0000-0000-000000000005', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046550', quantity: 1, unit: 'pcs' },
  { id: 'ri23', recipe_id: 'a1000000-0000-0000-0000-000000000005', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046553', quantity: 100, unit: 'g' },
  { id: 'ri24', recipe_id: 'a1000000-0000-0000-0000-000000000005', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046554', quantity: 10, unit: 'g' },
  { id: 'ri25', recipe_id: 'a1000000-0000-0000-0000-000000000005', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', quantity: 15, unit: 'g' },

  // Recipe 6: Creamy Marinara Pasta
  { id: 'ri26', recipe_id: 'a1000000-0000-0000-0000-000000000006', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046544', quantity: 150, unit: 'g' },
  { id: 'ri27', recipe_id: 'a1000000-0000-0000-0000-000000000006', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046545', quantity: 200, unit: 'ml' },
  { id: 'ri28', recipe_id: 'a1000000-0000-0000-0000-000000000006', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046546', quantity: 50, unit: 'ml' },
  { id: 'ri29', recipe_id: 'a1000000-0000-0000-0000-000000000006', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046547', quantity: 30, unit: 'g' },
  { id: 'ri30', recipe_id: 'a1000000-0000-0000-0000-000000000006', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', quantity: 2, unit: 'clove' },
  { id: 'ri31', recipe_id: 'a1000000-0000-0000-0000-000000000006', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', quantity: 10, unit: 'ml' },

  // Recipe 7: Scrambled Eggs with Spinach & Bacon
  { id: 'ri32', recipe_id: 'a1000000-0000-0000-0000-000000000007', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', quantity: 3, unit: 'pcs' },
  { id: 'ri33', recipe_id: 'a1000000-0000-0000-0000-000000000007', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046534', quantity: 50, unit: 'g' },
  { id: 'ri34', recipe_id: 'a1000000-0000-0000-0000-000000000007', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046533', quantity: 3, unit: 'strip' },
  { id: 'ri35', recipe_id: 'a1000000-0000-0000-0000-000000000007', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', quantity: 15, unit: 'g' },

  // Recipe 8: Chicken Avocado Salad
  { id: 'ri36', recipe_id: 'a1000000-0000-0000-0000-000000000008', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', quantity: 200, unit: 'g' },
  { id: 'ri37', recipe_id: 'a1000000-0000-0000-0000-000000000008', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046524', quantity: 1, unit: 'pcs' },
  { id: 'ri38', recipe_id: 'a1000000-0000-0000-0000-000000000008', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', quantity: 20, unit: 'ml' },
  { id: 'ri39', recipe_id: 'a1000000-0000-0000-0000-000000000008', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', quantity: 10, unit: 'ml' },
  { id: 'ri40', recipe_id: 'a1000000-0000-0000-0000-000000000008', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046562', quantity: 30, unit: 'g' },

  // Recipe 9: Garlic Butter Salmon with Asparagus
  { id: 'ri41', recipe_id: 'a1000000-0000-0000-0000-000000000009', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046542', quantity: 200, unit: 'g' },
  { id: 'ri42', recipe_id: 'a1000000-0000-0000-0000-000000000009', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', quantity: 3, unit: 'clove' },
  { id: 'ri43', recipe_id: 'a1000000-0000-0000-0000-000000000009', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', quantity: 30, unit: 'g' },
  { id: 'ri44', recipe_id: 'a1000000-0000-0000-0000-000000000009', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', quantity: 15, unit: 'ml' },
  { id: 'ri45', recipe_id: 'a1000000-0000-0000-0000-000000000009', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046543', quantity: 150, unit: 'g' },

  // Recipe 10: Fruit & Yogurt Parfait
  { id: 'ri46', recipe_id: 'a1000000-0000-0000-0000-000000000010', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046555', quantity: 200, unit: 'g' },
  { id: 'ri47', recipe_id: 'a1000000-0000-0000-0000-000000000010', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046556', quantity: 15, unit: 'ml' },
  { id: 'ri48', recipe_id: 'a1000000-0000-0000-0000-000000000010', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046557', quantity: 100, unit: 'g' },
  { id: 'ri49', recipe_id: 'a1000000-0000-0000-0000-000000000010', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046558', quantity: 50, unit: 'g' },

  // Recipe 11: Turkey & Cheese Lettuce Wraps
  { id: 'ri50', recipe_id: 'a1000000-0000-0000-0000-000000000011', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046559', quantity: 4, unit: 'pcs' },
  { id: 'ri51', recipe_id: 'a1000000-0000-0000-0000-000000000011', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046560', quantity: 150, unit: 'g' },
  { id: 'ri52', recipe_id: 'a1000000-0000-0000-0000-000000000011', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046561', quantity: 50, unit: 'g' },
  { id: 'ri53', recipe_id: 'a1000000-0000-0000-0000-000000000011', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046562', quantity: 15, unit: 'g' },

  // Recipe 12: Mexican Chicken Bowl
  { id: 'ri54', recipe_id: 'a1000000-0000-0000-0000-000000000012', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', quantity: 200, unit: 'g' },
  { id: 'ri55', recipe_id: 'a1000000-0000-0000-0000-000000000012', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', quantity: 150, unit: 'g' },
  { id: 'ri56', recipe_id: 'a1000000-0000-0000-0000-000000000012', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046563', quantity: 100, unit: 'g' },
  { id: 'ri57', recipe_id: 'a1000000-0000-0000-0000-000000000012', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046564', quantity: 50, unit: 'g' },
  { id: 'ri58', recipe_id: 'a1000000-0000-0000-0000-000000000012', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046565', quantity: 50, unit: 'ml' },
  { id: 'ri59', recipe_id: 'a1000000-0000-0000-0000-000000000012', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', quantity: 10, unit: 'ml' },

  // Recipe 13: Fluffy Pancakes
  { id: 'ri60', recipe_id: 'a1000000-0000-0000-0000-000000000013', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046566', quantity: 150, unit: 'g' },
  { id: 'ri61', recipe_id: 'a1000000-0000-0000-0000-000000000013', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', quantity: 200, unit: 'ml' },
  { id: 'ri62', recipe_id: 'a1000000-0000-0000-0000-000000000013', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', quantity: 1, unit: 'pcs' },
  { id: 'ri63', recipe_id: 'a1000000-0000-0000-0000-000000000013', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', quantity: 20, unit: 'g' },
  { id: 'ri64', recipe_id: 'a1000000-0000-0000-0000-000000000013', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046530', quantity: 30, unit: 'ml' },

  // Recipe 14: Chicken Quesadilla
  { id: 'ri65', recipe_id: 'a1000000-0000-0000-0000-000000000014', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046567', quantity: 2, unit: 'pcs' },
  { id: 'ri66', recipe_id: 'a1000000-0000-0000-0000-000000000014', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', quantity: 150, unit: 'g' },
  { id: 'ri67', recipe_id: 'a1000000-0000-0000-0000-000000000014', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046561', quantity: 100, unit: 'g' },
  { id: 'ri68', recipe_id: 'a1000000-0000-0000-0000-000000000014', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', quantity: 10, unit: 'g' },
  { id: 'ri69', recipe_id: 'a1000000-0000-0000-0000-000000000014', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046565', quantity: 30, unit: 'ml' },

  // Recipe 15: Beef Stir-fry
  { id: 'ri70', recipe_id: 'a1000000-0000-0000-0000-000000000015', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046568', quantity: 200, unit: 'g' },
  { id: 'ri71', recipe_id: 'a1000000-0000-0000-0000-000000000015', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046536', quantity: 150, unit: 'g' },
  { id: 'ri72', recipe_id: 'a1000000-0000-0000-0000-000000000015', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', quantity: 30, unit: 'ml' },
  { id: 'ri73', recipe_id: 'a1000000-0000-0000-0000-000000000015', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', quantity: 2, unit: 'clove' },
  { id: 'ri74', recipe_id: 'a1000000-0000-0000-0000-000000000015', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', quantity: 150, unit: 'g' },
  { id: 'ri75', recipe_id: 'a1000000-0000-0000-0000-000000000015', ingredient_id: 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046569', quantity: 15, unit: 'ml' }
];

// Helper functions to simulate database interactions locally
export const getLocalMealPlans = () => {
  const plans = localStorage.getItem('mp_meal_plans');
  return plans ? JSON.parse(plans) : [];
};

export const saveLocalMealPlan = (mealPlan, groceryListItems) => {
  const plans = getLocalMealPlans();
  const newPlan = {
    ...mealPlan,
    id: mealPlan.id || `plan-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  plans.push(newPlan);
  localStorage.setItem('mp_meal_plans', JSON.stringify(plans));

  const groceryLists = getLocalGroceryLists();
  const newList = {
    id: `grocery-${Date.now()}`,
    meal_plan_id: newPlan.id,
    items: groceryListItems,
    created_at: new Date().toISOString()
  };
  groceryLists.push(newList);
  localStorage.setItem('mp_grocery_lists', JSON.stringify(groceryLists));

  return { mealPlan: newPlan, groceryList: newList };
};

export const getLocalGroceryLists = () => {
  const lists = localStorage.getItem('mp_grocery_lists');
  return lists ? JSON.parse(lists) : [];
};
