<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{

    // list recipes with search and category filter
public function index(Request $request) {
    $query = Recipe::query();

    // search by title
    if ($request->search) {
        $query->where('title', 'like', "%{$request->search}%");
    }

    // filter by category (
    if ($request->category) {
        $query->where('category', $request->category);
    }

    return $query->latest()->get(); // return all matching
}

// save new recipe from admin dashboard
public function store(Request $request) {
    $data = $request->validate([
        'title' => 'required',
        'category' => 'required',
        'description' => 'required',
        'prep_time' => 'integer',
        'cook_time' => 'integer',
        'calories' => 'integer',
        'is_healthy' => 'boolean'
    ]);

    return Recipe::create($data); // create record
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
