<?php

namespace App;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
  //  use HasFactory;

    // Campos preenchíveis (para evitar mass-assignment)
    protected $fillable = [
        'name', 'email', 'password',
    ];

    // Campos que devem ser ocultados na conversão para arrays
    protected $hidden = [
        'password', 'remember_token',
    ];

    // Método necessário para implementar JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // Método necessário para implementar JWTSubject
    public function getJWTCustomClaims()
    {
        return [];
    }
}
