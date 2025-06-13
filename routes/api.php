<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\TeamsController;
use App\Http\Controllers\Api\EventsController;
use App\Http\Controllers\Api\JournalController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\HomeHeroController;
use App\Http\Controllers\Api\HomeAboutController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('journals', JournalController::class);
Route::apiResource('teams', TeamsController::class);
Route::apiResource('abouts', AboutController::class);
Route::apiResource('events', EventsController::class);
Route::get('/home/hero', [HomeHeroController::class, 'show']);
Route::put('/home/hero', [HomeHeroController::class, 'update']);
Route::get('/home/about', [HomeAboutController::class, 'show']);
Route::put('/home/about', [HomeAboutController::class, 'update']);
Route::get('/home/active-journals', [JournalController::class, 'activeJournals']);
Route::get('/home/featured-journals', [JournalController::class, 'featuredJournals']);
Route::put('/home/featured-journals', [JournalController::class, 'updateFeaturedJournals']);
Route::apiResource('categories', CategoryController::class);