<?php

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
        Schema::table('articles', function (Blueprint $table) {
            $table->integer('viral_score')->default(0)->after('likes_count')->comment('1-100 score of viral potential');
            $table->boolean('is_quality_upgraded')->default(false)->after('viral_score')->comment('True if upgraded by legacy quality command');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['viral_score', 'is_quality_upgraded']);
        });
    }
};
