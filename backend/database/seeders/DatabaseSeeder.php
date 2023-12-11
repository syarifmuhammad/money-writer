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
            ],
            [
                'type' => 'pemasukan',
                'name' => 'Hadiah',
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Makanan',
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Pakaian',
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Kesehatan',
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Transportasi',
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Hiburan',
            ],
            [
                'type' => 'pengeluaran',
                'name' => 'Lainnya',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'type' => $category['type'],
                'name' => $category['name'],
            ]);
        }
    }
}
