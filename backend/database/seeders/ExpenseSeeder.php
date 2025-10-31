<?php

namespace Database\Seeders;

use App\Enum\ExpenseCategory;
use App\Models\Expense;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::create([
            'amount' => 25.50,
            'description' => 'Lunch at cafe',
            'category' => ExpenseCategory::FOOD,
        ]);

        Expense::create([
            'amount' => 15.00,
            'description' => 'Bus fare',
            'category' => ExpenseCategory::TRANSPORT,
        ]);

        Expense::create([
            'amount' => 89.99,
            'description' => 'New headphones',
            'category' => ExpenseCategory::SHOPPING,
        ]);

        Expense::create([
            'amount' => 12.00,
            'description' => 'Coffee',
            'category' => ExpenseCategory::FOOD,
        ]);
    }
}
