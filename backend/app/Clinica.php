<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

// Model da entidade Clínica, representa a tabela 'clinicas' no banco
class Clinica extends Model
{
    // Define o nome da tabela explicitamente (por padrão seria 'clinicas')
    protected $table = 'clinicas';

    // Desativa incremento automático da chave primária (usamos UUID)
    public $incrementing = false;

    // Indica que o tipo da chave primária é string (UUID)
    protected $keyType = 'string';

    // Define os campos que podem ser preenchidos via mass assignment
    protected $fillable = [
        'id',
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'regional_id',
        'data_inauguracao',
        'ativa'
    ];

    /**
     * Relacionamento: uma clínica pertence a uma regional.
     */
    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }

    /**
     * Relacionamento: uma clínica pode ter várias especialidades.
     * Relação muitos para muitos através da tabela pivô 'clinica_especialidade'.
     */
    public function especialidades()
    {
        return $this->belongsToMany(Especialidade::class, 'clinica_especialidade');
    }
}
