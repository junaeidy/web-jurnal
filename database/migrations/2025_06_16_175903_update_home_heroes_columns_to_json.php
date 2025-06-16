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
        Schema::table('home_heroes', function (Blueprint $table) {
            $table->json('title')->change();
            $table->json('subtitle')->nullable()->change();
            $table->json('cta_text')->nullable()->change();
        });
    }

    public function down(): void {}
};
