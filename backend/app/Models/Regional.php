<?php

class Regional extends Model
{
    public $incrementing = false;
    protected $keyType = 'uuid';

    public function clinicas()
    {
        return $this->hasMany(Clinica::class);
    }
}
