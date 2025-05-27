<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Local;
use App\Models\Reservation;
use App\Models\Facture;

class DashboardController extends Controller
{
    public function stats() {
        try {
            $reservations = Reservation::count();

            $revenus = Facture::where('statut_paiement', 'paye')
                ->sum('montant_ttc');

            $locaux_actifs = Local::where('actif', 1)->count();

            $utilisateurs = User::count();

            // Factures en attente
            $factures_en_attente = Facture::where('statut_paiement', 'en_attente')->count();

            return response()->json(compact('reservations', 'revenus', 'locaux_actifs', 'utilisateurs', 'factures_en_attente'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur serveur: ' . $e->getMessage()], 500);
        }
    }

    public function utilisateurs() {
        try {
            return response()->json(User::all());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function locaux() {
        try {
            return response()->json(Local::select('id', 'nom', 'type', 'capacite', 'prix_heure', 'localisation', 'actif')->get());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function reservations() {
        try {
            $reservations = Reservation::with(['user:id,name', 'local:id,nom'])
                ->select('id', 'user_id', 'local_id', 'date_reservation', 'heure_debut', 'heure_fin', 'montant_total', 'statut')
                ->get();

            return response()->json($reservations);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

   public function factures() {
    try {
        $factures = Facture::with('user:id,name')
            ->select('id', 'numero_facture', 'user_id', 'montant_ttc', 'statut_paiement', 'date_emission', 'date_paiement')
            ->get();

        $factures->transform(function ($facture) {
            return [
                'id' => $facture->id,
                'numero_facture' => $facture->numero_facture,
                'user_name' => $facture->user ? $facture->user->name : 'N/A',
                'montant_ttc' => $facture->montant_ttc,
                'statut' => $facture->statut_paiement,
                'date_emission' => $facture->date_emission ? $facture->date_emission->format('Y-m-d') : null,
                'date_paiement' => $facture->date_paiement ? $facture->date_paiement->format('Y-m-d') : null,
            ];
        });

        return response()->json($factures);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

     public function storeLocal(Request $request) {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacite' => 'required|integer|min:1',
            'prix_heure' => 'required|numeric|min:0',
            'localisation' => 'required|string|max:255',
            'actif' => 'required|boolean',
        ]);

        $local = Local::create($validated);
        return response()->json($local, 201);
    }

    public function updateLocal(Request $request, $id) {
        $local = Local::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacite' => 'required|integer|min:1',
            'prix_heure' => 'required|numeric|min:0',
            'localisation' => 'required|string|max:255',
            'actif' => 'required|boolean',
        ]);

        $local->update($validated);
        return response()->json($local);
    }

    public function deleteLocal($id) {
        $local = Local::findOrFail($id);
        $local->delete();
        return response()->json(null, 204);
    }
}
