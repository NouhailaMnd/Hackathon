<?php
// database/migrations/xxxx_xx_xx_create_reservations_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('local_id')->constrained('locaux')->onDelete('cascade');
            $table->date('date_reservation');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->decimal('montant_total', 10, 2);
            $table->enum('statut', ['en_attente', 'confirmee', 'annulee', 'terminee'])->default('en_attente');
            $table->timestamp('confirme_at')->nullable();
            $table->timestamp('annule_at')->nullable();
            $table->text('commentaire')->nullable();
            $table->text('motif_annulation')->nullable();
            $table->timestamps();
            
            // Index pour éviter les conflits et optimiser les recherches
            $table->unique(['local_id', 'date_reservation', 'heure_debut', 'heure_fin'], 'unique_reservation');
            $table->index(['user_id', 'statut']);
            $table->index(['local_id', 'date_reservation', 'statut']);
            $table->index(['date_reservation', 'statut']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};