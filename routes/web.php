<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NetisController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    Route::get('/netis', [NetisController::class, 'index'])->name('/netis');
    Route::post('/child-profiles', [NetisController::class, 'store']);
    Route::delete('/child-profiles/{id}', [NetisController::class, 'destroy']);

    Route::get('/settings', [SettingsController::class, 'index'])->name('/settings');
    Route::post('/storeTeacher', [SettingsController::class, 'storeTeacher'])->name('/storeTeacher');
    Route::post('/storeBarangay', [SettingsController::class, 'storeBarangay'])->name('/storeBarangay');
    Route::delete('/deleteTeacher/{id}', [SettingsController::class, 'destroyTeacher']);
    Route::delete('/deleteBarangay/{id}', [SettingsController::class, 'destroyBarangay']);


    Route::delete('/api/barangays/{id}', [YourController::class, 'destroyBarangay']);
Route::delete('/api/teachers/{id}', [YourController::class, 'destroyTeacher']);


    
});

require __DIR__.'/auth.php';
