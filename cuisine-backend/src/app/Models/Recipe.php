<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'author_name', 'description', 'image_url',
        'prep_time', 'cook_time', 'calories', 'category', 'is_healthy', 'ingredients'
    ];

    protected $casts = [
        'ingredients' => 'array',
        'is_healthy' => 'boolean',
    ];
}
