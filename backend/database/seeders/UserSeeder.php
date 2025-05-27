<?php
// database/seeders/UserSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Créer un admin
        User::create([
            'nom' => 'Administrateur',
            'email' => 'admin@example.com',
            'mot_de_passe' => 'password123',
            'qr_code' => User::generateUniqueQrCode(),
            'telephone' => '0661234567',
            'adresse' => 'Casablanca, Maroc',
            'is_admin' => true,
        ]);

        // Créer un utilisateur normal
        User::create([
            'nom' => 'Utilisateur Test',
            'email' => 'user@example.com',
            'mot_de_passe' => 'password123',
            'qr_code' => User::generateUniqueQrCode(),
            'telephone' => '0662345678',
            'adresse' => 'Rabat, Maroc',
            'is_admin' => false,
        ]);

        // Créer quelques utilisateurs supplémentaires
        User::create([
            'nom' => 'Mohammed Alami',
            'email' => 'mohammed@example.com',
            'mot_de_passe' => 'password123',
            'qr_code' => User::generateUniqueQrCode(),
            'telephone' => '0663456789',
            'adresse' => 'Fès, Maroc',
            'is_admin' => false,
        ]);

        User::create([
            'nom' => 'Fatima Benali',
            'email' => 'fatima@example.com',
            'mot_de_passe' => 'password123',
            'qr_code' => User::generateUniqueQrCode(),
            'telephone' => '0664567890',
            'adresse' => 'Marrakech, Maroc',
            'is_admin' => false,
        ]);
    }
}