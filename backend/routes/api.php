<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;


Route::prefix('dashboard')->group(function () {
    Route::get('/stats', [DashboardController::class, 'stats']);
    Route::get('/utilisateurs', [DashboardController::class, 'utilisateurs']);
    Route::get('/locaux', [DashboardController::class, 'locaux']);
    Route::post('/locaux', [DashboardController::class, 'storeLocal']);       // ajouter
    Route::put('/locaux/{id}', [DashboardController::class, 'updateLocal']);  // modifier
    Route::delete('/locaux/{id}', [DashboardController::class, 'deleteLocal']); // supprimer
    Route::get('/factures', [DashboardController::class, 'factures']);

    // autres routes...
});

