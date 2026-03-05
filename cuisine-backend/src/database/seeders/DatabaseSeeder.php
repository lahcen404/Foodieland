<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

    $this->call([
        RecipeSeeder::class,
    ]);

    
       User::factory()->create([
        'name' => 'Lahcen Admin',
        'email' => 'lahcen.maskour2003@gmail.com',
        'password' => bcrypt('lahcen123'),
        'role' => UserRole::Admin,
    ]);

    }
}
