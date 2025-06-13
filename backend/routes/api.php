<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClinicController;

// Rota pública de login
Route::post('login', 'LoginController@login');

// Rota de registro (comente se não estiver usando)
// Route::post('register', 'AuthController@register');

// Rota protegida: dados do usuário autenticado
Route::middleware('auth:api')->get('user', function (Request $request) {
    return $request->user();
});

// Rotas protegidas de clínicas
Route::middleware('auth:api')->group(function () {
    Route::get('clinics', 'ClinicController@index');
    Route::post('clinics', 'ClinicController@store');
    Route::get('clinics/{id}', 'ClinicController@show');
    Route::put('clinics/{id}', 'ClinicController@update');
    Route::delete('clinics/{id}', 'ClinicController@destroy');
    Route::get('regionais', 'RegionalController@index');
    Route::get('especialidades', 'EspecialidadeController@index');
});

// Liberar requisições OPTIONS para CORS
Route::options('/{any}', function () {
    return response('', 200);
})->where('any', '.*');
