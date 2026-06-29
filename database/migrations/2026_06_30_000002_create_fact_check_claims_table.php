<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFactCheckClaimsTable extends Migration
{
    public function up()
    {
        Schema::create('fact_check_claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fact_check_id')->constrained()->onDelete('cascade');
            $table->text('claim_text');
            $table->enum('verdict', ['verified', 'partially_true', 'unverified', 'false', 'unverifiable']);
            $table->tinyInteger('confidence')->default(0);
            $table->json('supporting_sources')->nullable();
            $table->json('contradicting_sources')->nullable();
            $table->text('ai_explanation')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fact_check_claims');
    }
}
