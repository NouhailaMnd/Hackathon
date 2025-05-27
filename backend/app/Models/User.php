<?php
// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'telephone',
        'adresse',
        'qr_code',
        'is_admin',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];

    /**
     * Hash automatique du mot de passe
     */
    public function setMotDePasseAttribute($value)
    {
        $this->attributes['mot_de_passe'] = Hash::make($value);
    }

    /**
     * Utiliser mot_de_passe au lieu de password pour l'authentification
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    /**
     * Vérifier le mot de passe
     */
    public function checkPassword($password)
    {
        return Hash::check($password, $this->mot_de_passe);
    }

    /**
     * Générer un QR Code unique
     */
    public static function generateUniqueQrCode()
    {
        do {
            $qrCode = 'QR_' . strtoupper(Str::random(10)) . '_' . time();
        } while (self::where('qr_code', $qrCode)->exists());

        return $qrCode;
    }

    /**
     * Vérifier si l'utilisateur est admin
     */
    public function isAdmin()
    {
        return $this->is_admin;
    }

    /**
     * Générer un nouveau QR Code pour cet utilisateur
     */
    public function regenerateQrCode()
    {
        $this->qr_code = self::generateUniqueQrCode();
        $this->save();
        return $this->qr_code;
    }

    /**
     * Relations
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function factures()
    {
        return $this->hasMany(Facture::class);
    }
}