<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\TeamsController;
use App\Http\Controllers\Api\EventsController;
use App\Http\Controllers\Api\JournalController;
use App\Http\Controllers\API\PartnerController;
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
Route::apiResource('/home/hero', HomeHeroController::class);
Route::get('/home/about', [HomeAboutController::class, 'index']);
Route::post('/home/about', [HomeAboutController::class, 'store']);
Route::put('/home/about/{id}', [HomeAboutController::class, 'update']);
Route::delete('/home/about/{id}', [HomeAboutController::class, 'destroy']);
Route::get('/home/active-journals', [JournalController::class, 'activeJournals']);
Route::get('/home/featured-journals', [JournalController::class, 'featuredJournals']);
Route::put('/home/featured-journals', [JournalController::class, 'updateFeaturedJournals']);
Route::apiResource('categories', CategoryController::class);
Route::get('/events/slug/{slug}', [EventsController::class, 'showBySlug']);
Route::get('/public-events', [EventsController::class, 'publicList']);
Route::apiResource('partners', PartnerController::class);