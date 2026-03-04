<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{


    Schema::create('recipes', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('author_name')->default('John Smith');
        $table->text('description')->nullable();
        $table->string('image_url')->nullable();
        $table->integer('prep_time')->default(0);
        $table->integer('cook_time')->default(0);
        $table->integer('calories')->default(0);
        $table->string('category');
        $table->boolean('is_healthy')->default(false);
        $table->timestamps();
    });

}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
