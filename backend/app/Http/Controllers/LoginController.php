<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    /**
     * Autentica um usuário com e-mail e senha e retorna o token JWT.
     */
    public function login(Request $request)
    {
        // Pega apenas os campos necessários da requisição
        $credentials = $request->only('email', 'password');

        try {
            // Tenta autenticar com JWTAuth usando as credenciais
            if (!$token = JWTAuth::attempt($credentials)) {
                // Credenciais incorretas (usuário não encontrado ou senha errada)
                return response()->json(['error' => 'Credenciais inválidas'], 401);
            }
        } catch (JWTException $e) {
            // Erro ao tentar gerar o token (problema interno no JWT)
            return response()->json(['error' => 'Não foi possível criar o token'], 500);
        }

        // Retorna o token e o usuário autenticado
        return response()->json([
            'token' => $token,
            'user' => auth()->user()
        ]);
    }
}
