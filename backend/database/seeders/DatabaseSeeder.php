<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // create dummy user
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // create dummy categories
        $categories = [
            [
                'type' => 'pemasukan',
                'name' => 'Gaji',
                'user_id' => 1,
            ],
            [
                'type' => 'pemasukan',
                'name' => 'Hadiah',
                'user_id' => 1,
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Makanan',
                'user_id' => 1,
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Pakaian',
                'user_id' => 1,
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Kesehatan',
                'user_id' => 1,
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Transportasi',
                'user_id' => 1,
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Hiburan',
                'user_id' => 1,
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Lainnya',
                'user_id' => 1,
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'type' => $category['type'],
                'name' => $category['name'],
                'user_id' => $category['user_id'],
            ]);
        }
    }
}
