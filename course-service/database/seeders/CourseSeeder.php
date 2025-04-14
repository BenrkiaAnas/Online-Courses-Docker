<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Course::insert([
            [
                'title' => 'Mastering Laravel 12',
                'description' => 'A complete guide to Laravel 12 with modern best practices.',
                'instructor' => 'Jane Dev',
                'price' => 49.99,
            ],
            [
                'title' => 'Docker Deep Dive',
                'description' => 'Containerize your apps like a pro with Docker & Docker Compose.',
                'instructor' => 'Wolf',
                'price' => 29.99,
            ],
            [
                'title' => 'React + Microservices',
                'description' => 'Build modern SPAs that talk to microservice APIs with JWT & RabbitMQ.',
                'instructor' => 'Dev Sensei',
                'price' => 39.99,
            ],
        ]);
    }
}
