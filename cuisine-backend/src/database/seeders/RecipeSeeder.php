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
            ],
            [
                'title' => 'Fresh Lime Roasted Salmon with Ginger Sauce',
                'category' => 'Fish',
                'image_url' => 'https://example.com/salmon.jpg',
                'prep_time' => 30,
                'cook_time' => 20,
                'is_healthy' => true,
                'description' => 'Healthy and delicious salmon recipe.',
            ],
            [
                'title' => 'Strawberry Oatmeal Pancake with Honey Syrup',
                'category' => 'Breakfast',
                'image_url' => 'https://example.com/pancakes.jpg',
                'prep_time' => 30,
                'cook_time' => 10,
                'is_healthy' => false,
                'description' => 'Sweet breakfast pancakes.',
            ],
            [
                'title' => 'Fresh and Healthy Mixed Mayonnaise Salad',
                'category' => 'Healthy',
                'image_url' => 'https://example.com/salad.jpg',
                'prep_time' => 30,
                'cook_time' => 0,
                'is_healthy' => true,
                'description' => 'A very healthy vegetable mix.',
            ],
        ];

        foreach ($recipes as $recipe) {
            Recipe::create($recipe);
        }
    }
}
