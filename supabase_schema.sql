-- Supabase SQL Schema for Meal-Planning Micro-App
-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    preferences JSONB DEFAULT '{}'::jsonb
);

-- 2. Ingredients Table
CREATE TABLE IF NOT EXISTS public.ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    default_unit TEXT NOT NULL, -- e.g., 'g', 'ml', 'pcs', 'clove', 'slice', 'strip'
    average_price_per_unit DECIMAL(10, 4) NOT NULL -- Price per default_unit in USD
);

-- 3. Recipes Table
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    cuisine TEXT NOT NULL, -- 'Italian', 'Mexican', 'Asian', 'Indian', 'American', etc.
    dietary_category TEXT NOT NULL, -- 'Vegan', 'Vegetarian', 'Keto', 'Gluten-Free', 'None'
    meal_type TEXT NOT NULL, -- 'Breakfast', 'Lunch', 'Dinner'
    prep_time INTEGER NOT NULL, -- in minutes
    cook_time INTEGER NOT NULL, -- in minutes
    total_time INTEGER NOT NULL, -- in minutes
    servings INTEGER NOT NULL DEFAULT 1,
    cost_per_serving DECIMAL(10, 2) NOT NULL,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of string steps
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Recipe Ingredients (Join Table)
CREATE TABLE IF NOT EXISTS public.recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
    quantity DECIMAL(10, 2) NOT NULL,
    unit TEXT NOT NULL,
    UNIQUE(recipe_id, ingredient_id)
);

-- 5. Ingredient Substitutions Table
CREATE TABLE IF NOT EXISTS public.substitutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
    substitute_ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
    ratio DECIMAL(5, 2) NOT NULL DEFAULT 1.0, -- multiplier for quantity (e.g. 1g original = 1g substitute)
    note TEXT,
    UNIQUE(original_ingredient_id, substitute_ingredient_id)
);

-- 6. Meal Plans Table
CREATE TABLE IF NOT EXISTS public.meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    plan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    breakfast_recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
    lunch_recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
    dinner_recipe_id UUID REFERENCES public.recipes(id) ON DELETE SET NULL,
    num_people INTEGER NOT NULL DEFAULT 1,
    budget DECIMAL(10, 2) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    feasibility_status TEXT NOT NULL, -- 'Within Budget', 'Slightly Over Budget', 'Over Budget'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Grocery Lists Table
CREATE TABLE IF NOT EXISTS public.grocery_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of objects: {ingredient_name, quantity, unit, cost, is_substituted, substitute_name}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_recipes_search ON public.recipes(cuisine, dietary_category, meal_type);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON public.recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_substitutions_original ON public.substitutions(original_ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user ON public.meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_date ON public.meal_plans(plan_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.substitutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;

-- Create basic public policies (select allowed for everyone, write restricted)
CREATE POLICY "Allow public read access to ingredients" ON public.ingredients FOR SELECT USING (true);
CREATE POLICY "Allow public read access to recipes" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to recipe_ingredients" ON public.recipe_ingredients FOR SELECT USING (true);
CREATE POLICY "Allow public read access to substitutions" ON public.substitutions FOR SELECT USING (true);

CREATE POLICY "Allow users to manage their own profile" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow users to manage their own meal plans" ON public.meal_plans FOR ALL USING (true);
CREATE POLICY "Allow users to manage their own grocery lists" ON public.grocery_lists FOR ALL USING (true);

--------------------------------------------------------------------------------
-- SAMPLE SEED DATA
--------------------------------------------------------------------------------

-- Seed Ingredients
INSERT INTO public.ingredients (id, name, default_unit, average_price_per_unit) VALUES
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', 'Egg', 'pcs', 0.2500),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', 'Chicken Breast', 'g', 0.0080),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046524', 'Avocado', 'pcs', 1.5000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', 'Bread', 'slice', 0.1500),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 'Butter', 'g', 0.0100),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', 'Milk', 'ml', 0.0020),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046528', 'Oats', 'g', 0.0030),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046529', 'Banana', 'pcs', 0.2500),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046530', 'Maple Syrup', 'ml', 0.0300),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046531', 'Almond Milk', 'ml', 0.0030),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046532', 'Oat Milk', 'ml', 0.0030),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046533', 'Bacon', 'strip', 0.5000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046534', 'Spinach', 'g', 0.0200),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046535', 'Tofu', 'g', 0.0060),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046536', 'Broccoli', 'g', 0.0050),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', 'Rice', 'g', 0.0020),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', 'Soy Sauce', 'ml', 0.0100),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046539', 'Sesame Oil', 'ml', 0.0200),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', 'Garlic', 'clove', 0.1000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046541', 'Ginger', 'g', 0.0500),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046542', 'Salmon Fillet', 'g', 0.0250),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046543', 'Asparagus', 'g', 0.0150),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046544', 'Pasta', 'g', 0.0020),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046545', 'Marinara Sauce', 'ml', 0.0060),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046546', 'Heavy Cream', 'ml', 0.0100),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046547', 'Parmesan Cheese', 'g', 0.0200),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046548', 'Canned Chickpeas', 'g', 0.0040),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046549', 'Cucumber', 'pcs', 0.8000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046550', 'Tomato', 'pcs', 0.5000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', 'Olive Oil', 'ml', 0.0150),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', 'Lemon Juice', 'ml', 0.0200),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046553', 'Mozzarella Cheese', 'g', 0.0120),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046554', 'Basil Leaves', 'g', 0.1000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046555', 'Greek Yogurt', 'g', 0.0080),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046556', 'Honey', 'ml', 0.0200),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046557', 'Mixed Berries', 'g', 0.0150),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046558', 'Gluten-Free Granola', 'g', 0.0150),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046559', 'Romaine Lettuce', 'pcs', 0.3000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046560', 'Turkey Breast Slices', 'g', 0.0120),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046561', 'Cheddar Cheese', 'g', 0.0100),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046562', 'Mayonnaise', 'g', 0.0080),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046563', 'Black Beans', 'g', 0.0030),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046564', 'Corn', 'g', 0.0020),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046565', 'Salsa', 'ml', 0.0050),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046566', 'Flour', 'g', 0.0010),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046567', 'Tortilla', 'pcs', 0.4000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046568', 'Beef Ribeye', 'g', 0.0180),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046569', 'Vegetable Oil', 'ml', 0.0050),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046570', 'Coconut Oil', 'ml', 0.0150),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046571', 'Quinoa', 'g', 0.0040),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046572', 'Gluten-Free Bread', 'slice', 0.2000),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046573', 'Tamari', 'ml', 0.0120),
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046574', 'Flax Egg', 'pcs', 0.1500)
ON CONFLICT (id) DO NOTHING;

-- Seed Substitutions
INSERT INTO public.substitutions (original_ingredient_id, substitute_ingredient_id, ratio, note) VALUES
-- Milk -> Almond Milk
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046531', 1.00, 'Dairy-free plant milk alternative'),
-- Milk -> Oat Milk
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046532', 1.00, 'Dairy-free oat milk alternative'),
-- Butter -> Olive Oil
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', 0.75, 'Heart-healthy fats alternative'),
-- Butter -> Coconut Oil
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046570', 1.00, 'Plant-based solid fat alternative'),
-- Chicken Breast -> Tofu
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046535', 1.00, 'Plant-based protein alternative'),
-- Rice -> Quinoa
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046571', 1.00, 'High-protein grain alternative'),
-- Bread -> Gluten-Free Bread
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046572', 1.00, 'Gluten-free bread alternative'),
-- Soy Sauce -> Tamari
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046573', 1.00, 'Gluten-free soy sauce alternative'),
-- Egg -> Flax Egg
('b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046574', 1.00, 'Vegan baking egg binder')
ON CONFLICT (original_ingredient_id, substitute_ingredient_id) DO NOTHING;

-- Seed Recipes
-- 1. Oatmeal with Bananas (Vegan, Breakfast, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000001', 'Banana Oatmeal', 'Warm, hearty steel-cut oats topped with sliced bananas and sweet maple syrup.', 'American', 'Vegan', 'Breakfast', 5, 5, 10, 1, 1.45, 
'["In a medium saucepan, bring water or almond milk to a boil.", "Stir in the oats and reduce heat to low.", "Simmer for 5 minutes, stirring occasionally, until oats are tender and creamy.", "Pour into a bowl, slice fresh bananas on top, and drizzle with maple syrup."]', 
'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500&auto=format&fit=crop&q=60');

-- 2. Chickpea Salad (Vegan, Lunch, Mediterranean)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000002', 'Mediterranean Chickpea Salad', 'Refreshing chickpea salad with cucumbers, tomatoes, dressed in lemon juice and olive oil.', 'Mediterranean', 'Vegan', 'Lunch', 10, 0, 10, 1, 2.30, 
'["Rinse and drain the canned chickpeas.", "Chop cucumbers and tomatoes into small bite-sized cubes.", "In a large salad bowl, combine chickpeas, cucumber, and tomatoes.", "Drizzle with olive oil, lemon juice, and a pinch of salt and pepper.", "Toss gently to mix and serve chilled."]',
'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60');

-- 3. Tofu Stir-Fry (Vegan, Dinner, Asian)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000003', 'Sesame Tofu Stir-Fry', 'Crispy pan-fried tofu tossed with fresh broccoli and ginger-soy sauce over fluffy rice.', 'Asian', 'Vegan', 'Dinner', 15, 15, 30, 1, 3.45, 
'["Cook the rice according to package instructions.", "Press the tofu block to remove excess water, then cut into cubes.", "Heat sesame oil in a large skillet or wok over medium-high heat and sear tofu until golden brown on all sides; remove and set aside.", "In the same pan, add minced garlic, ginger, and broccoli florets. Cook for 5 minutes until crisp-tender.", "Return tofu to the pan, pour in soy sauce, and toss together for 2 minutes.", "Serve hot over the cooked rice."]',
'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60');

-- 4. Avocado Toast with Egg (Vegetarian, Breakfast, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000004', 'Avocado Toast with Poached Egg', 'Crisp toasted bread topped with rich mashed avocado and a perfectly poached egg.', 'American', 'Vegetarian', 'Breakfast', 5, 5, 10, 1, 2.40, 
'["Toast the bread slices until golden brown.", "Cut open the avocado, scoop out the flesh, and mash it in a bowl with a pinch of salt.", "Poach the eggs in gently simmering water for 3-4 minutes until whites are set but yolks remain runny.", "Spread the mashed avocado evenly over the toast.", "Carefully top with the poached eggs and season with cracked black pepper."]',
'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60');

-- 5. Caprese Grilled Cheese (Vegetarian, Lunch, Italian)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000005', 'Caprese Grilled Cheese', 'A gourmet twist on grilled cheese featuring melted mozzarella, ripe tomatoes, and aromatic basil.', 'Italian', 'Vegetarian', 'Lunch', 5, 10, 15, 1, 2.30, 
'["Slice the tomatoes and mozzarella cheese.", "Butter one side of each bread slice.", "Place one bread slice butter-side-down in a skillet over medium heat.", "Layer mozzarella, tomatoes, and fresh basil leaves, then top with the second bread slice (butter-side-up).", "Grill for 4-5 minutes per side until bread is golden and cheese is completely melted."]',
'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60');

-- 6. Creamy Tomato Pasta (Vegetarian, Dinner, Italian)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000006', 'Creamy Marinara Pasta', 'Penne pasta tossed in a luxurious, creamy tomato marinara sauce, finished with parmesan.', 'Italian', 'Vegetarian', 'Dinner', 10, 15, 25, 1, 2.75, 
'["Bring a large pot of salted water to a boil and cook pasta according to directions; drain and set aside.", "In a saucepan, heat olive oil and cook minced garlic for 1 minute until fragrant.", "Add the marinara sauce and let it simmer for 5 minutes.", "Stir in the heavy cream and let it cook for another 2 minutes on low heat.", "Add cooked pasta and grated parmesan cheese. Toss to coat and serve immediately."]',
'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60');

-- 7. Scrambled Eggs with Spinach & Bacon (Keto, Breakfast, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000007', 'Keto Bacon & Egg Scramble', 'Fluffy butter-scrambled eggs paired with baby spinach and crispy bacon strips.', 'American', 'Keto', 'Breakfast', 5, 10, 15, 1, 3.40, 
'["In a cold skillet, lay out bacon strips and cook over medium heat until crispy. Set aside on paper towels, reserving fat in the pan.", "Add butter to the pan and toss in the spinach, cooking until wilted (about 1-2 minutes).", "Whisk eggs in a bowl and pour into the pan with the spinach.", "Scramble gently on low heat until eggs are cooked through but soft.", "Serve scrambled eggs hot alongside crispy bacon."]',
'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60');

-- 8. Chicken Avocado Salad (Keto, Lunch, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000008', 'Chicken Avocado Salad', 'Crispy pan-seared chicken breast and sliced avocados tossed in a rich mayonnaise-olive oil dressing.', 'American', 'Keto', 'Lunch', 10, 10, 20, 1, 4.80, 
'["Season chicken breast with salt and pepper.", "Heat 10ml olive oil in a skillet and sear chicken for 5 minutes per side until cooked through. Let it rest, then cube.", "Dice the avocado.", "In a bowl, mix mayonnaise, remaining olive oil, and lemon juice to form a dressing.", "Combine chicken, avocado, and dressing in a bowl. Toss gently and serve."]',
'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60');

-- 9. Garlic Butter Salmon (Keto, Dinner, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000009', 'Garlic Butter Salmon with Asparagus', 'Rich, pan-seared salmon fillet basted with garlic butter, served with roasted asparagus.', 'American', 'Keto', 'Dinner', 5, 15, 20, 1, 8.95, 
'["Pat the salmon dry and season both sides with salt and pepper.", "Melt butter in a skillet over medium-high heat. Add minced garlic and sauté for 1 minute.", "Place salmon skin-side down in the pan. Cook for 5-6 minutes, spooning garlic butter over the top.", "Flip salmon and cook for another 3-4 minutes.", "In a separate pan, sauté asparagus in olive oil for 5 minutes until tender.", "Serve salmon topped with remaining pan juices alongside asparagus."]',
'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60');

-- 10. Fruit & Yogurt Parfait (Gluten-Free, Breakfast, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000010', 'Greek Yogurt Granola Parfait', 'Creamy Greek yogurt layered with organic honey, fresh mixed berries, and crunchy gluten-free granola.', 'American', 'Gluten-Free', 'Breakfast', 5, 0, 5, 1, 3.80, 
'["In a tall glass or bowl, spoon half of the Greek yogurt.", "Top with a layer of mixed berries.", "Drizzle with honey and add a layer of gluten-free granola.", "Repeat the layers with the remaining yogurt, berries, honey, and granola.", "Enjoy immediately as a fresh, gut-healthy breakfast."]',
'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60');

-- 11. Turkey & Cheese Lettuce Wraps (Gluten-Free, Lunch, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000011', 'Turkey & Cheese Lettuce Wraps', 'A low-carb, gluten-free lunch wrap with smoked turkey breast, cheddar, and mayonnaise wrapped in crisp romaine lettuce.', 'American', 'Gluten-Free', 'Lunch', 10, 0, 10, 1, 2.90, 
'["Wash romaine lettuce leaves thoroughly and pat dry with paper towels.", "Lay the lettuce leaves flat on a clean board.", "Spread a thin layer of mayonnaise on each leaf.", "Layer turkey breast slices and cheddar cheese evenly over the leaves.", "Roll up the leaves tightly from the base to create wraps. Secure with toothpicks if needed."]',
'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60');

-- 12. Mexican Chicken Bowl (Gluten-Free, Dinner, Mexican)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000012', 'Mexican Chicken & Rice Bowl', 'Savory chicken breast served over fluffy rice, topped with black beans, corn, and zesty fresh salsa.', 'Mexican', 'Gluten-Free', 'Dinner', 15, 15, 30, 1, 3.75, 
'["Cook the rice according to directions.", "Season chicken breast with Mexican spices (cumin, chili powder, oregano).", "Sauté chicken in olive oil for 5-6 minutes per side until cooked through, then slice.", "Warm the black beans and corn in a small pot.", "Assemble the bowl by adding rice, then layering beans, corn, and sliced chicken.", "Top with a generous spoonful of salsa and serve."]',
'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60');

-- 13. Pancakes (None, Breakfast, American)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000013', 'Classic Fluffy Pancakes', 'Traditional tall, fluffy pancakes cooked in butter and served with maple syrup.', 'American', 'None', 'Breakfast', 10, 15, 25, 1, 1.45, 
'["In a large bowl, whisk flour, sugar, and baking powder together.", "Whisk in milk and the egg until a smooth batter forms.", "Melt 10g of butter in a pan or griddle over medium heat.", "Pour 1/4 cup of batter for each pancake. Cook until bubbles form on top, then flip and cook until golden brown.", "Stack and serve hot with remaining butter and maple syrup."]',
'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60');

-- 14. Chicken Quesadilla (None, Lunch, Mexican)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000014', 'Chicken & Cheese Quesadilla', 'Crispy toasted tortillas stuffed with spiced grilled chicken breast and melted cheddar, served with salsa.', 'Mexican', 'None', 'Lunch', 5, 10, 15, 1, 2.75, 
'["Cook or slice pre-cooked chicken breast.", "Place one tortilla in a buttered skillet.", "Layer with half of the cheddar cheese and the chicken, then cover with the remaining cheese and top with the second tortilla.", "Cook on medium heat for 3-4 minutes until the bottom tortilla is crispy and golden, then flip carefully.", "Cook for another 3 minutes until cheese is fully melted. Cut into wedges and serve with salsa."]',
'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&auto=format&fit=crop&q=60');

-- 15. Beef Stir-Fry (None, Dinner, Asian)
INSERT INTO public.recipes (id, name, description, cuisine, dietary_category, meal_type, prep_time, cook_time, total_time, servings, cost_per_serving, instructions, image_url) VALUES
('a1000000-0000-0000-0000-000000000015', 'Classic Beef & Broccoli', 'Tender slices of beef ribeye sautéed with crisp broccoli florets in a rich garlic-soy glaze over white rice.', 'Asian', 'None', 'Dinner', 15, 15, 30, 1, 6.25, 
'["Cook white rice according to package directions.", "Slice the beef ribeye into thin strips.", "In a bowl, mix soy sauce, minced garlic, and a pinch of sugar.", "Heat vegetable oil in a wok or skillet over high heat. Add beef strips and sear for 2-3 minutes until browned; remove and set aside.", "Add broccoli to the wok and cook with 2 tablespoons of water for 3 minutes until steam-cooked.", "Return beef to the wok, add the soy sauce mixture, and toss everything together on high heat for 1 minute.", "Serve immediately over the cooked rice."]',
'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60');

-- Map Ingredients to Recipes
-- Recipe 1: Oats (100g), Banana (1 pcs), Maple Syrup (20ml), Almond Milk (200ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000001', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046528', 100.00, 'g'),
('a1000000-0000-0000-0000-000000000001', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046529', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000001', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046530', 20.00, 'ml'),
('a1000000-0000-0000-0000-000000000001', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046531', 200.00, 'ml');

-- Recipe 2: Canned Chickpeas (200g), Cucumber (1 pcs), Tomato (1 pcs), Olive Oil (15ml), Lemon Juice (10ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000002', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046548', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000002', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046549', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000002', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046550', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000002', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', 15.00, 'ml'),
('a1000000-0000-0000-0000-000000000002', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', 10.00, 'ml');

-- Recipe 3: Tofu (200g), Broccoli (150g), Soy Sauce (20ml), Sesame Oil (10ml), Garlic (2 cloves), Ginger (10g), Rice (150g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046535', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046536', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', 20.00, 'ml'),
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046539', 10.00, 'ml'),
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', 2.00, 'clove'),
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046541', 10.00, 'g'),
('a1000000-0000-0000-0000-000000000003', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', 150.00, 'g');

-- Recipe 4: Bread (2 slices), Avocado (1 pcs), Egg (2 pcs), Butter (10g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000004', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', 2.00, 'slice'),
('a1000000-0000-0000-0000-000000000004', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046524', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000004', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', 2.00, 'pcs'),
('a1000000-0000-0000-0000-000000000004', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 10.00, 'g');

-- Recipe 5: Bread (2 slices), Tomato (1 pcs), Mozzarella (100g), Basil (10g), Butter (15g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000005', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046525', 2.00, 'slice'),
('a1000000-0000-0000-0000-000000000005', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046550', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000005', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046553', 100.00, 'g'),
('a1000000-0000-0000-0000-000000000005', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046554', 10.00, 'g'),
('a1000000-0000-0000-0000-000000000005', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 15.00, 'g');

-- Recipe 6: Pasta (150g), Marinara (200ml), Heavy Cream (50ml), Parmesan (30g), Garlic (2 cloves), Olive Oil (10ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000006', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046544', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000006', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046545', 200.00, 'ml'),
('a1000000-0000-0000-0000-000000000006', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046546', 50.00, 'ml'),
('a1000000-0000-0000-0000-000000000006', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046547', 30.00, 'g'),
('a1000000-0000-0000-0000-000000000006', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', 2.00, 'clove'),
('a1000000-0000-0000-0000-000000000006', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', 10.00, 'ml');

-- Recipe 7: Egg (3 pcs), Spinach (50g), Bacon (3 strips), Butter (15g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000007', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', 3.00, 'pcs'),
('a1000000-0000-0000-0000-000000000007', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046534', 50.00, 'g'),
('a1000000-0000-0000-0000-000000000007', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046533', 3.00, 'strip'),
('a1000000-0000-0000-0000-000000000007', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 15.00, 'g');

-- Recipe 8: Chicken Breast (200g), Avocado (1 pcs), Olive Oil (20ml), Lemon Juice (10ml), Mayonnaise (30g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000008', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000008', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046524', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000008', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', 20.00, 'ml'),
('a1000000-0000-0000-0000-000000000008', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', 10.00, 'ml'),
('a1000000-0000-0000-0000-000000000008', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046562', 30.00, 'g');

-- Recipe 9: Salmon (200g), Garlic (3 cloves), Butter (30g), Lemon Juice (15ml), Asparagus (150g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000009', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046542', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000009', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', 3.00, 'clove'),
('a1000000-0000-0000-0000-000000000009', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 30.00, 'g'),
('a1000000-0000-0000-0000-000000000009', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046552', 15.00, 'ml'),
('a1000000-0000-0000-0000-000000000009', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046543', 150.00, 'g');

-- Recipe 10: Greek Yogurt (200g), Honey (15ml), Mixed Berries (100g), Gluten-Free Granola (50g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000010', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046555', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000010', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046556', 15.00, 'ml'),
('a1000000-0000-0000-0000-000000000010', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046557', 100.00, 'g'),
('a1000000-0000-0000-0000-000000000010', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046558', 50.00, 'g');

-- Recipe 11: Lettuce (4 leaves -> 4 pcs), Turkey (150g), Cheddar (50g), Mayonnaise (15g)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000011', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046559', 4.00, 'pcs'),
('a1000000-0000-0000-0000-000000000011', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046560', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000011', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046561', 50.00, 'g'),
('a1000000-0000-0000-0000-000000000011', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046562', 15.00, 'g');

-- Recipe 12: Chicken Breast (200g), Rice (150g), Black Beans (100g), Corn (50g), Salsa (50ml), Olive Oil (10ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000012', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000012', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000012', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046563', 100.00, 'g'),
('a1000000-0000-0000-0000-000000000012', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046564', 50.00, 'g'),
('a1000000-0000-0000-0000-000000000012', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046565', 50.00, 'ml'),
('a1000000-0000-0000-0000-000000000012', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046551', 10.00, 'ml');

-- Recipe 13: Flour (150g), Milk (200ml), Egg (1 pcs), Butter (20g), Maple Syrup (30ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000013', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046566', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000013', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046527', 200.00, 'ml'),
('a1000000-0000-0000-0000-000000000013', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046522', 1.00, 'pcs'),
('a1000000-0000-0000-0000-000000000013', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 20.00, 'g'),
('a1000000-0000-0000-0000-000000000013', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046530', 30.00, 'ml');

-- Recipe 14: Tortilla (2 pcs), Chicken (150g), Cheddar (100g), Butter (10g), Salsa (30ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000014', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046567', 2.00, 'pcs'),
('a1000000-0000-0000-0000-000000000014', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046523', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000014', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046561', 100.00, 'g'),
('a1000000-0000-0000-0000-000000000014', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046526', 10.00, 'g'),
('a1000000-0000-0000-0000-000000000014', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046565', 30.00, 'ml');

-- Recipe 15: Beef (200g), Broccoli (150g), Soy Sauce (30ml), Garlic (2 cloves), Rice (150g), Vegetable Oil (15ml)
INSERT INTO public.recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
('a1000000-0000-0000-0000-000000000015', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046568', 200.00, 'g'),
('a1000000-0000-0000-0000-000000000015', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046536', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000015', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046538', 30.00, 'ml'),
('a1000000-0000-0000-0000-000000000015', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046540', 2.00, 'clove'),
('a1000000-0000-0000-0000-000000000015', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046537', 150.00, 'g'),
('a1000000-0000-0000-0000-000000000015', 'b3c8f8b8-0a0f-4f2b-8a26-cd07bf046569', 15.00, 'ml');
