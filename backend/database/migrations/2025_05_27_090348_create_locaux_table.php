<?php
// database/migrations/xxxx_xx_xx_create_locaux_table.php

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
        Schema::create('locaux', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('type', ['terrain_sport', 'salle_conference', 'salle_fete']);
            $table->integer('capacite');
            $table->decimal('prix_heure', 8, 2);
            $table->string('localisation');
            $table->json('equipements')->nullable();
            $table->boolean('actif')->default(true);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('contact_responsable')->nullable();
            $table->string('horaires_ouverture')->default('08:00-22:00');
            $table->decimal('surface', 8, 2)->nullable(); // en m²
            $table->timestamps();
            
            // Index pour optimisation des recherches
            $table->index(['type', 'actif']);
            $table->index(['localisation', 'actif']);
            $table->index(['prix_heure', 'actif']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locaux');
    }
};