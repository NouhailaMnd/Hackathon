<?php
// database/migrations/xxxx_xx_xx_create_factures_table.php

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
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->string('numero_facture')->unique();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('montant_ht', 10, 2);
            $table->decimal('taux_tva', 5, 2)->default(20.00); // TVA en %
            $table->decimal('montant_tva', 10, 2);
            $table->decimal('montant_ttc', 10, 2);
            $table->enum('statut_paiement', ['en_attente', 'paye', 'echec', 'rembourse'])->default('en_attente');
            $table->timestamp('date_emission')->useCurrent();
            $table->timestamp('date_echeance')->nullable();
            $table->timestamp('date_paiement')->nullable();
            $table->string('methode_paiement')->nullable(); // stripe, paypal, especes, etc.
            $table->string('transaction_id')->nullable(); // ID de la transaction
            $table->string('chemin_pdf')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Index pour optimisation
            $table->index('numero_facture');
            $table->index(['user_id', 'statut_paiement']);
            $table->index(['reservation_id']);
            $table->index(['date_emission', 'statut_paiement']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};