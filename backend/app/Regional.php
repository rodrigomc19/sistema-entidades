<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

// Model que representa a tabela 'regionais' no banco
class Regional extends Model
{
    // Corrige o nome da tabela (Laravel assumiria 'regionals' por padrão)
    protected $table = 'regionais'; // <-- aqui está a correção

    // Desativa o incremento automático da chave primária (estamos usando UUID)
    public $incrementing = false;

    // Define o tipo da chave primária como string (UUID)
    protected $keyType = 'string';

    // Campos que podem ser preenchidos via mass assignment
    protected $fillable = ['id', 'nome'];
}
