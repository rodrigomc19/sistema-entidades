<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClinicsTable extends Migration
{
    public function up()
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->increments('id');
            $table->string('razao_social');
            $table->string('nome_fantasia');
            $table->string('cnpj')->unique();
            $table->enum('regional', [
                'Alto tietê', 'Interior', 'ES', 'SP Interior', 'SP', 'SP2', 'MG', 'Nacional',
                'SP CAV', 'RJ', 'NE1', 'NE2', 'SUL', 'Norte'
            ]);
            $table->date('data_inauguracao');
            $table->boolean('ativa')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clinics');
    }
}
