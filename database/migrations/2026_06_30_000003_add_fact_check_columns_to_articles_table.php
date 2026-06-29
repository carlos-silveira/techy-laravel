<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFactCheckColumnsToArticlesTable extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->tinyInteger('fact_check_score')->nullable()->after('ai_summary');
            $table->string('fact_check_status')->nullable()->after('fact_check_score');
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['fact_check_score', 'fact_check_status']);
        });
    }
}
