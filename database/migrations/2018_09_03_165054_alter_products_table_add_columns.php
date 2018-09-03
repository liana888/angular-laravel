<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProductsTableAddColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('name', 60);
            $table->longText('description');
            $table->text('short_description');
            $table->float('price');
            $table->integer('views')->default(0);
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('name');
            $table->dropForeign('products_user_id_foreign');
            $table->dropColumn('name');
            $table->dropColumn('description');
            $table->dropColumn('short_description');
            $table->dropColumn('price');
            $table->dropColumn('views');
        });
    }
}
