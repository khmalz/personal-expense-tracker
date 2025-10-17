<?php

namespace App\Http\Requests;

use App\Enum\ExpenseCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => [
                'required',
                'string',
                'max:255'
            ],
            'amount' => [
                'required',
                'numeric',
                'min:0.01'
            ],
            'category' => ['required', 'string', Rule::in(array_column(ExpenseCategory::cases(), 'value'))],
        ];
    }
}
