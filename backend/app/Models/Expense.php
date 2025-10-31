<?php

namespace App\Models;

use App\Enum\ExpenseCategory;
use Database\Factories\ExpenseFactory;
use Illuminate\Database\Eloquent\Attributes\UseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[UseFactory(ExpenseFactory::class)]
class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'description',
        'category',
    ];

    protected function casts(): array
    {
        return [
            'category' => ExpenseCategory::class,
            'amount' => 'decimal:2',
        ];
    }
}
