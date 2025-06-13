<?php

namespace App\Http\Controllers;

use App\Regional;

class RegionalController extends Controller
{
    public function index()
    {
        return response()->json(Regional::all());
    }
}
