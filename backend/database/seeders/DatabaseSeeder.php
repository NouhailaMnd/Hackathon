<?php
// database/seeders/DatabaseSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            LocalSeeder::class,
        ]);
        
        $this->command->info('✅ Base de données peuplée avec succès !');
        $this->command->info('📧 Admin: admin@example.com / password123');
        $this->command->info('👤 User: user@example.com / password123');
    }
}