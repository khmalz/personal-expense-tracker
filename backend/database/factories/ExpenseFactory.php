<?php

namespace Database\Factories;

use App\Enum\ExpenseCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => $this->faker->sentence(3),
            'amount' => $this->faker->randomFloat(2, 1, 100),
            'category' => $this->faker->randomElement(ExpenseCategory::cases()),
        ];
    }
}
