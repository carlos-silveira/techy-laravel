<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('page_views', function (Blueprint $table) {
            if (!Schema::hasColumn('page_views', 'is_bot')) {
                $table->boolean('is_bot')->default(false)->index()->after('user_agent');
            }
            if (!Schema::hasColumn('page_views', 'engaged_at')) {
                $table->timestamp('engaged_at')->nullable()->after('is_bot');
            }
        });

        if (!Schema::hasTable('engagement_events')) {
            Schema::create('engagement_events', function (Blueprint $table) {
                $table->id();
                $table->string('type', 32)->index(); // reel_view | ad_view
                $table->foreignId('article_id')->nullable()->constrained()->nullOnDelete();
                $table->string('slot', 120)->nullable();
                $table->string('session_hash', 64)->index();
                $table->timestamps();

                $table->index(['type', 'created_at']);
                $table->index(['session_hash', 'type', 'slot']);
            });
        }

        // Reclassify the existing history with the shared BotDetector rules.
        try {
            Artisan::call('analytics:reclassify-bots');
        } catch (\Throwable $e) {
            // Ignore if in test environment or runner
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('engagement_events');

        Schema::table('page_views', function (Blueprint $table) {
            if (Schema::hasColumn('page_views', 'is_bot')) {
                $table->dropIndex(['is_bot']);
                $table->dropColumn(['is_bot']);
            }
            if (Schema::hasColumn('page_views', 'engaged_at')) {
                $table->dropColumn(['engaged_at']);
            }
        });
    }
};
