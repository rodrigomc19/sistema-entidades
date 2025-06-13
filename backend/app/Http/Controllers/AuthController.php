<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Autentica o usuário e retorna um token JWT.
     */
    public function login(Request $request)
    {
        // Pega apenas os campos 'email' e 'password' da requisição
        $credentials = $request->only('email', 'password');

        try {
            // Tenta autenticar com as credenciais recebidas
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciais inválidas'], 401);
            }
        } catch (JWTException $e) {
            // Erro interno na geração do token
            return response()->json(['error' => 'Erro ao criar token'], 500);
        }

        // Retorna o token e o usuário autenticado
        return response()->json([
            'token' => $token,
            'user' => auth()->user()
        ]);
    }

    /**
     * Registra um novo usuário e já retorna um token JWT.
     */
    public function register(Request $request)
    {
        // Validação dos campos recebidos na requisição
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users', // e-mail deve ser único na tabela
            'password' => 'required|min:6'
        ]);

        // Criação do novo usuário
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password) // sempre criptografa a senha
        ]);

        // Gera um token JWT para o usuário recém-criado
        $token = JWTAuth::fromUser($user);

        // Retorna mensagem de sucesso com token e dados do usuário
        return response()->json([
            'message' => 'Usuário registrado com sucesso',
            'token' => $token,
            'user' => $user
        ], 201);
    }
}
