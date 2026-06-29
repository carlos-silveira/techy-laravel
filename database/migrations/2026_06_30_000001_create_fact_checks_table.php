<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFactChecksTable extends Migration
{
    public function up()
    {
        Schema::create('fact_checks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->tinyInteger('overall_score')->nullable();
            $table->enum('status', ['pending', 'checking', 'passed', 'failed', 'needs_review'])->default('pending');
            $table->unsignedInteger('claims_count')->default(0);
            $table->unsignedInteger('verified_count')->default(0);
            $table->unsignedInteger('failed_count')->default(0);
            $table->json('sources_checked')->nullable();
            $table->string('checker_model')->nullable();
            $table->json('raw_ai_response')->nullable();
            $table->timestamp('checked_at')->nullable();
            $table->text('error_log')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fact_checks');
    }
}
