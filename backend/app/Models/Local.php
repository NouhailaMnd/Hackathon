<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Local extends Model
{
    protected $table = 'locaux'; // nom de table non standard

    protected $fillable = [
        'nom',
        'type',
        'capacite',
        'prix_heure',
        'localisation',
        'equipements',
        'actif',
        'description',
        'image',
        'contact_responsable',
        'horaires_ouverture',
        'surface',
    ];

    protected $casts = [
        'equipements' => 'array',
        'actif' => 'boolean',
        'surface' => 'decimal:2',
        'prix_heure' => 'decimal:2',
    ];

    // Relations
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
