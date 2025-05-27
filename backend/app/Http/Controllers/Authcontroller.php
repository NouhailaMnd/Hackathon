<?php
// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Connexion via QR Code
     */
    public function qrLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'qr_code' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'QR Code requis',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('qr_code', $request->qr_code)->first();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'QR Code invalide ou utilisateur introuvable'
            ], 401);
        }

        // Générer le token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
                'qr_code' => $user->qr_code
            ],
            'token' => $token
        ]);
    }

    /**
     * Connexion classique email/mot de passe
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $validator->errors()
            ], 400);
        }

        // Trouver l'utilisateur
        $user = User::where('email', $request->email)->first();

        if (!$user || !$user->checkPassword($request->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Identifiants incorrects'
            ], 401);
        }

        // Générer le token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
                'qr_code' => $user->qr_code
            ],
            'token' => $token
        ]);
    }

    /**
     * Inscription
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => $request->password, // Le mutateur va hasher automatiquement
            'qr_code' => User::generateUniqueQrCode(),
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'is_admin' => false
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Inscription réussie',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'qr_code' => $user->qr_code
            ],
            'token' => $token
        ], 201);
    }

    /**
     * Générer un nouveau QR Code pour un utilisateur
     */
    public function generateQrCode(Request $request)
    {
        $user = $request->user();
        $newQrCode = User::generateUniqueQrCode();
        
        $user->update(['qr_code' => $newQrCode]);

        return response()->json([
            'success' => true,
            'message' => 'Nouveau QR Code généré',
            'qr_code' => $newQrCode
        ]);
    }

    /**
     * Déconnexion
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * Informations utilisateur connecté
     */
    public function me(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'telephone' => $user->telephone,
                'adresse' => $user->adresse,
                'is_admin' => $user->is_admin,
                'qr_code' => $user->qr_code
            ]
        ]);
    }

    /**
     * Obtenir tous les utilisateurs (Admin seulement)
     */
    public function getAllUsers(Request $request)
    {
        $users = User::select('id', 'nom', 'email', 'telephone', 'is_admin', 'created_at')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }

    /**
     * Modifier un utilisateur (Admin seulement)
     */
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'telephone' => 'nullable|string',
            'adresse' => 'nullable|string',
            'is_admin' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $validator->errors()
            ], 400);
        }

        $user->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur mis à jour',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'is_admin' => $user->is_admin
            ]
        ]);
    }

    /**
     * Supprimer un utilisateur (Admin seulement)
     */
    public function deleteUser($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non trouvé'
            ], 404);
        }

        // Empêcher la suppression du dernier admin
        if ($user->is_admin && User::where('is_admin', true)->count() <= 1) {
            return response()->json([
                'success' => false,
                'message' => 'Impossible de supprimer le dernier administrateur'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur supprimé'
        ]);
    }
}