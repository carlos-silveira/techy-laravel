<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->timestamp('facebook_posted_at')->nullable()->after('is_social_published');
            $table->timestamp('twitter_posted_at')->nullable()->after('facebook_posted_at');
        });

        // Backfill: mark articles that were already posted (is_social_published = true)
        // so they aren't re-posted on the next cycle.
        DB::statement("
            UPDATE articles
            SET facebook_posted_at = updated_at,
                twitter_posted_at  = updated_at
            WHERE is_social_published = 1
        ");
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['facebook_posted_at', 'twitter_posted_at']);
        });
    }
};
