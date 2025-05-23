<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $teachers = [
            'Maria Santos',
            'Juan Dela Cruz',
            'Ana Reyes',
            'Carlos Mendoza',
            'Liza Manalo',
            'Josefina Ramos',
            'Marco De Leon',
            'Andrea Villanueva',
            'Roberto Garcia',
            'Patricia Aquino',
        ];

        $roles = ['CDW', 'CDC', 'Head Teacher', 'Substitute'];
        
        foreach ($teachers as $name) {
            Teacher::create([
                'full_name' => $name,
                'role' => fake()->randomElement($roles),
            ]);
        }
    }
}
