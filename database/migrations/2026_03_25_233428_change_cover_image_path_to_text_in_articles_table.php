<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeCoverImagePathToTextInArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        \Illuminate\Support\Facades\Schema::table('articles', function (\Illuminate\Database\Schema\Blueprint $table) {
            $table->text('cover_image_path')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        \Illuminate\Support\Facades\Schema::table('articles', function (\Illuminate\Database\Schema\Blueprint $table) {
            $table->string('cover_image_path', 255)->nullable()->change();
        });
    }
}
