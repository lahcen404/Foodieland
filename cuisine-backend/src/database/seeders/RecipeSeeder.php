<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $recipes = [
            [
                'title' => 'Spicy delicious chicken wings',
                'category' => 'Meat',
                'image_url' => 'https://example.com/wings.jpg',
                'prep_time' => 30,
                'cook_time' => 15,
                'is_healthy' => false,
                'description' => 'Great spicy wings for the whole family.',
                'ingredients' => [
                    ['name' => 'Chicken wings', 'quantity' => '2 lbs'],
                    ['name' => 'Spicy sauce', 'quantity' => '1 cup'],
                    ['name' => 'Garlic', 'quantity' => '4 cloves'],
                    ['name' => 'Hot pepper', 'quantity' => '2 pieces'],
                ],
            ],
            [
                'title' => 'Fresh Lime Roasted Salmon with Ginger Sauce',
                'category' => 'Fish',
                'image_url' => 'https://example.com/salmon.jpg',
                'prep_time' => 30,
                'cook_time' => 20,
                'is_healthy' => true,
                'description' => 'Healthy and delicious salmon recipe.',
                'ingredients' => [
                    ['name' => 'Salmon fillet', 'quantity' => '2 fillets'],
                    ['name' => 'Lime', 'quantity' => '2 pieces'],
                    ['name' => 'Ginger', 'quantity' => '1 tbsp'],
                    ['name' => 'Olive oil', 'quantity' => '3 tbsp'],
                    ['name' => 'Salt and pepper', 'quantity' => 'to taste'],
                ],
            ],
            [
                'title' => 'Strawberry Oatmeal Pancake with Honey Syrup',
                'category' => 'Breakfast',
                'image_url' => 'https://example.com/pancakes.jpg',
                'prep_time' => 30,
                'cook_time' => 10,
                'is_healthy' => false,
                'description' => 'Sweet breakfast pancakes.',
                'ingredients' => [
                    ['name' => 'Oatmeal', 'quantity' => '1 cup'],
                    ['name' => 'Strawberries', 'quantity' => '1 cup'],
                    ['name' => 'Eggs', 'quantity' => '2'],
                    ['name' => 'Milk', 'quantity' => '1 cup'],
                    ['name' => 'Honey syrup', 'quantity' => '1/2 cup'],
                ],
            ],
            [
                'title' => 'Fresh and Healthy Mixed Mayonnaise Salad',
                'category' => 'Healthy',
                'image_url' => 'https://example.com/salad.jpg',
                'prep_time' => 30,
                'cook_time' => 0,
                'is_healthy' => true,
                'description' => 'A very healthy vegetable mix.',
                'ingredients' => [
                    ['name' => 'Mixed greens', 'quantity' => '2 cups'],
                    ['name' => 'Cherry tomatoes', 'quantity' => '1 cup'],
                    ['name' => 'Cucumber', 'quantity' => '1 piece'],
                    ['name' => 'Carrot', 'quantity' => '1 piece'],
                    ['name' => 'Mayonnaise', 'quantity' => '3 tbsp'],
                ],
            ],
        ];

        foreach ($recipes as $recipe) {
            Recipe::create($recipe);
        }
    }
}
