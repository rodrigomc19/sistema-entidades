<?php

class Clinica extends Model
{
    public $incrementing = false;
    protected $keyType = 'uuid';
    protected $fillable = [
        'razao_social', 'nome_fantasia', 'cnpj', 'regional_id', 'data_inauguracao', 'ativa'
    ];

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }

    public function especialidades()
    {
        return $this->belongsToMany(Especialidade::class);
    }
}
