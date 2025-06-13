<?php

class Especialidade extends Model
{
    public $incrementing = false;
    protected $keyType = 'uuid';

    public function clinicas()
    {
        return $this->belongsToMany(Clinica::class);
    }
}
