<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    // list all recipess + search logic
    public function index(Request $request) {
        $query = Recipe::query();

        // filter by title or category
        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%")
                  ->orWhere('category', 'like', "%{$request->search}%");
        }

        return $query->latest()->get();
    }

    // create new recipe
    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'prep_time' => 'integer',
            'cook_time' => 'integer',
            'category' => 'required|string',
            'is_healthy' => 'boolean'
        ]);

        return Recipe::create($data);
    }

    // show one recipe details
    public function show(Recipe $recipe) {
        return $recipe;
    }

    // update recipe 
    public function update(Request $request, Recipe $recipe) {
        $recipe->update($request->all());
        return $recipe;
    }

    // delete recipe (Admin only)
    public function destroy(Recipe $recipe) {
        $recipe->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
