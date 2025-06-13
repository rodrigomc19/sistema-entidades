<?php

namespace App\Http\Controllers;

use App\Especialidade;

class EspecialidadeController extends Controller
{
    public function index()
    {
        return response()->json(Especialidade::all());
    }
}
