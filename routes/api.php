<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\TeamsController;
use App\Http\Controllers\Api\JournalController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('journals', JournalController::class);
Route::apiResource('teams', TeamsController::class);
Route::apiResource('abouts', AboutController::class);
