<?php
// routes/api.php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocalController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\LocalCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes - Personne 1 : Espace Client + Auth
|--------------------------------------------------------------------------
*/

// Routes publiques (non authentifiées)
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/qr-login', [AuthController::class, 'qrLogin']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Routes publiques pour les locaux (consultation libre)
Route::prefix('locaux')->group(function () {
    Route::get('/', [LocalController::class, 'index']);
    Route::get('/categories', [LocalController::class, 'categories']);
    Route::get('/equipements', [LocalController::class, 'equipements']);
    Route::get('/stats', [LocalController::class, 'stats']);
    Route::get('/{id}', [LocalController::class, 'show']);
});

// Routes protégées (authentification requise)
Route::middleware('auth:sanctum')->group(function () {
    
    // Authentification
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/generate-qr', [AuthController::class, 'generateQrCode']);
    });
    
    // Routes utilisateur connecté (pour les prochaines étapes)
    // Route::prefix('reservations')->group(function () {
    //     Route::post('/', [ReservationController::class, 'store']);
    //     Route::get('/mes-reservations', [ReservationController::class, 'mesReservations']);
    // });
    
});

// Route de test
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API Location de Locaux - Personne 1',
        'timestamp' => now(),
        'endpoints' => [
            'POST /api/auth/login' => 'Connexion email/mot de passe',
            'POST /api/auth/qr-login' => 'Connexion QR Code',
            'POST /api/auth/register' => 'Inscription',
            'GET /api/locaux' => 'Liste des locaux avec filtres',
            'GET /api/locaux/categories' => 'Catégories disponibles',
            'GET /api/locaux/equipements' => 'Équipements disponibles'
        ]
    ]);
});

Route::post('/qrcode/generate', [QRCodeController::class, 'generate']);
Route::post('/qrcode/validate', [QRCodeController::class, 'validate']);
Route::get('/local-categories', [LocalCategoryController::class, 'index']);