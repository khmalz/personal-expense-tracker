<?php

namespace App\Enum;

enum ExpenseCategory: string
{
    case FOOD = 'Food';
    case TRANSPORT = 'Transport';
    case SHOPPING = 'Shopping';
    case OTHER = 'Other';
}
