<?php

declare(strict_types=1);

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
        Schema::create('scouted_articles', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('source', 200)->nullable();
            $table->text('url')->nullable();
            $table->text('prompt');
            $table->string('status', 50)->default('pending')->comment('pending, generating, published, failed');
            $table->text('error_log')->nullable();
            $table->foreignId('article_id')->nullable()->constrained('articles')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scouted_articles');
    }
};
