<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeHeroController;
use App\Http\Controllers\EmailCampaignController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/journal', function () {
    return Inertia::render('User/Journal/Index');
})->name('journal');

Route::get('/categories', function () {
    return Inertia::render('Admin/Category/Index');
})->name('dashboard.categories.index');

Route::get('/about-us', function () {
    return Inertia::render('User/About/Index');
})->name('user.about.index');

Route::get('/team', function () {
    return Inertia::render('User/Team/Index');
})->name('user.team.index');

Route::get('/events', function () {
    return Inertia::render('User/Event/Index');
})->name('user.event.index');

Route::get('/events/{slug}', function ($slug) {
    return Inertia::render('User/Event/DetailEvent', [
        'slug' => $slug
    ]);
});

Route::get('/dashboard/partners', function () {
    return Inertia::render('Admin/MOU/Index');
})->name('dashboard.partners.index');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard/journals', [JournalController::class, 'index'])->name('dashboard.journals.index');
    Route::get('/dashboard/teams', [TeamsController::class, 'index'])->name('dashboard.teams.index');
    Route::get('/dashboard/abouts', [AboutController::class, 'index'])->name('dashboard.abouts.index');
    Route::get('/dashboard/events', [EventsController::class, 'index'])->name('dashboard.events.index');
    Route::get('/dashboard/home', [HomeHeroController::class, 'index'])->name('dashboard.home.index');
});

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

Route::get('/storage-link', function () {
    Artisan::call('storage:link');
    return "Storage link created";
});

Route::get('/lang/{locale}', function ($locale, Request $request) {
    if (!in_array($locale, ['en', 'id'])) {
        abort(400);
    }

    Session::put('locale', $locale);
    App::setLocale($locale);

    return redirect($request->query('redirect', '/'));
});



require __DIR__ . '/auth.php';
