<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Article;

return new class extends Migration
{
    public function up(): void
    {
        Article::where('id', 1210)
            ->where('status', 'draft')
            ->update([
                'status' => 'published',
                'fact_check_status' => 'verified'
            ]);
    }

    public function down(): void
    {
        //
    }
};
