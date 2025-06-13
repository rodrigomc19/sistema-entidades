<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

// Model que representa a tabela de especialidades médicas
class Especialidade extends Model
{
    // Desativa incremento automático da chave primária (pois usamos UUID manual)
    public $incrementing = false;

    // Informa que a chave primária é do tipo string (UUID)
    protected $keyType = 'string';

    // Define os campos que podem ser preenchidos em massa
    protected $fillable = ['id', 'nome'];
}
