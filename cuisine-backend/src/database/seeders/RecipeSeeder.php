<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Recipe::create([
            'title' => 'Fresh Lime Roasted Salmon',
            'description' => 'A delicious and healthy salmon dish.',
            'image_url' => 'assets/images/salmon.jpg',
            'prep_time' => 15,
            'cook_time' => 20,
            'category' => 'Fish',
            'is_healthy' => true,
        ]);

        Recipe::create([
            'title' => 'Atay & Bread',
            'description' => 'Perfect breakfast for a sunny morning.',
            'image_url' => 'assets/images/pancake.jpg',
            'prep_time' => 10,
            'cook_time' => 15,
            'category' => 'Breakfast',
            'is_healthy' => true,
        ]);
    }
}
