<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckVoucherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'flightNumber' => ['required', 'string', 'max:20'],
            'date'         => ['required', 'date_format:Y-m-d'],
        ];
    }

    public function messages(): array
    {
        return [
            'flightNumber.required' => 'Flight number is required.',
            'flightNumber.string'   => 'Flight number must be a valid string.',
            'date.required'         => 'Flight date is required.',
            'date.date_format'      => 'Flight date must be in YYYY-MM-DD format.',
        ];
    }
}
