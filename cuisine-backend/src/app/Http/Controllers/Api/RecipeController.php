<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{

    // list recipes with search and category filter
public function index(Request $request) {
    $query = Recipe::query();

    // search title or category
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('title', 'ilike', "%{$search}%")
              ->orWhere('category', 'ilike', "%{$search}%");
        });
    }

    // filter by exaaact category
    if ($request->filled('category')) {
        $query->where('category', 'ilike', $request->category);
    }

    return $query->latest()->get();
}

// save new recipe from admin dashboard
public function store(Request $request) {
    // Decode ingredients if sent as JSON string (FormData)
    if ($request->has('ingredients') && is_string($request->ingredients)) {
        $request->merge(['ingredients' => json_decode($request->ingredients, true)]);
    }

    $data = $request->validate([
        'title' => 'required',
        'category' => 'required',
        'description' => 'required',
        'prep_time' => 'integer',
        'cook_time' => 'integer',
        'calories' => 'integer',
        'is_healthy' => 'boolean',
        'author_name' => 'string',
        'image_url' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        'ingredients' => 'nullable|array'
    ]);

    // Handle image upload
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('recipes', 'public');
        $data['image_url'] = Storage::url($path);
    }

    // Remove 'image' key as it's not a database field
    unset($data['image']);

    return Recipe::create($data); // create record
}

    // show one recipe details
    public function show(Recipe $recipe) {
        return $recipe;
    }

    // update recipe
    public function update(Request $request, Recipe $recipe) {
        // Decode ingredients if sent as JSON string (FormData)
        if ($request->has('ingredients') && is_string($request->ingredients)) {
            $request->merge(['ingredients' => json_decode($request->ingredients, true)]);
        }

        $data = $request->validate([
            'title' => 'sometimes|required',
            'category' => 'sometimes|required',
            'description' => 'sometimes|required',
            'prep_time' => 'integer',
            'cook_time' => 'integer',
            'calories' => 'integer',
            'is_healthy' => 'boolean',
            'author_name' => 'string',
            'image_url' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'ingredients' => 'nullable|array'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists and is a local file
            if ($recipe->image_url && str_contains($recipe->image_url, '/storage/recipes/')) {
                $oldPath = str_replace('/storage/', '', $recipe->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('recipes', 'public');
            $data['image_url'] = Storage::url($path);
        }

        // Remove 'image' key as it's not a database field
        unset($data['image']);

        $recipe->update($data);
        return $recipe;
    }

    // delete recipe (Admin only)
    public function destroy(Recipe $recipe) {
        // Delete image file if exists
        if ($recipe->image_url && str_contains($recipe->image_url, '/storage/recipes/')) {
            $oldPath = str_replace('/storage/', '', $recipe->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $recipe->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
