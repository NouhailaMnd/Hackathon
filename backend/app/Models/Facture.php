<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    protected $fillable = [
        'numero_facture',
        'reservation_id',
        'user_id',
        'montant_ht',
        'taux_tva',
        'montant_tva',
        'montant_ttc',
        'statut_paiement',
        'date_emission',
        'date_echeance',
        'date_paiement',
        'methode_paiement',
        'transaction_id',
        'chemin_pdf',
        'notes',
    ];

    protected $casts = [
        'date_emission' => 'datetime',
        'date_echeance' => 'datetime',
        'date_paiement' => 'datetime',
        'montant_ht' => 'decimal:2',
        'montant_tva' => 'decimal:2',
        'montant_ttc' => 'decimal:2',
    ];

    // Relations
    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
