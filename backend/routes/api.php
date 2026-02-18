<?php

use App\Http\Controllers\VoucherController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within the "api"
| middleware group. Every route is prefixed with /api automatically.
|
*/

Route::post('/check',    [VoucherController::class, 'check']);
Route::post('/generate', [VoucherController::class, 'generate']);
