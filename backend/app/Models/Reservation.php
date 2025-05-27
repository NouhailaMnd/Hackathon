<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'local_id',
        'date_reservation',
        'heure_debut',
        'heure_fin',
        'montant_total',
        'statut',
        'confirme_at',
        'annule_at',
        'commentaire',
        'motif_annulation',
    ];

    protected $casts = [
        'date_reservation' => 'date',
        'heure_debut' => 'datetime:H:i:s',
        'heure_fin' => 'datetime:H:i:s',
        'confirme_at' => 'datetime',
        'annule_at' => 'datetime',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function local()
    {
        return $this->belongsTo(Local::class);
    }

    public function facture()
    {
        return $this->hasOne(Facture::class);
    }
}
