<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Clinica;
use Illuminate\Support\Str;
use App\Especialidade;

class ClinicController extends Controller
{
    /**
     * Retorna uma lista paginada de clínicas com suporte a busca por nome ou razão social.
     */
    public function index(Request $request)
    {
        $query = Clinica::with(['regional', 'especialidades']); // já traz os relacionamentos

        // Filtro de busca (nome fantasia ou razão social)
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('nome_fantasia', 'like', "%$search%")
                  ->orWhere('razao_social', 'like', "%$search%");
            });
        }

        $perPage = $request->input('per_page', 10); // fallback: 10 registros por página
        return response()->json($query->paginate($perPage));
    }

    /**
     * Cadastra uma nova clínica com validação e associação de especialidades.
     */
    public function store(Request $request)
    {
        // Valida os dados de entrada
        $validator = Validator::make($request->all(), [
            'razao_social' => 'required|string',
            'nome_fantasia' => 'required|string',
            'cnpj' => 'required|string|max:18|unique:clinicas,cnpj',
            'regional_id' => 'required|exists:regionais,id',
            'data_inauguracao' => 'required|date',
            'especialidades' => 'required|array|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Cria a clínica com UUID
        $clinica = Clinica::create([
            'id' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
            'razao_social' => $request->razao_social,
            'nome_fantasia' => $request->nome_fantasia,
            'cnpj' => $request->cnpj,
            'regional_id' => $request->regional_id,
            'data_inauguracao' => $request->data_inauguracao,
            'ativa' => $request->has('ativa') && $request->ativa ? true : false,
        ]);

        // Associa as especialidades selecionadas
        $clinica->especialidades()->sync($request->especialidades);

        return response()->json([
            'message' => 'Clínica cadastrada com sucesso',
            'id' => $clinica->id // importante para redirecionamento no frontend
        ], 201);
    }

    /**
     * Retorna os dados completos de uma clínica específica.
     */
    public function show($id)
    {
        $clinica = Clinica::with(['regional', 'especialidades'])->findOrFail($id);
        return response()->json($clinica);
    }

    /**
     * Atualiza os dados de uma clínica já existente.
     */
    public function update(Request $request, $id)
    {
        // Validação dos campos com exceção do próprio CNPJ
        $validator = Validator::make($request->all(), [
            'razao_social' => 'required|string',
            'nome_fantasia' => 'required|string',
            'cnpj' => 'required|string|max:18|unique:clinicas,cnpj,' . $id,
            'regional_id' => 'required|exists:regionais,id',
            'data_inauguracao' => 'required|date',
            'especialidades' => 'required|array|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clinica = Clinica::findOrFail($id);

        // Atualiza os campos principais
        $clinica->update([
            'razao_social' => $request->razao_social,
            'nome_fantasia' => $request->nome_fantasia,
            'cnpj' => $request->cnpj,
            'regional_id' => $request->regional_id,
            'data_inauguracao' => $request->data_inauguracao,
            'ativa' => $request->has('ativa') && $request->ativa ? true : false,
        ]);

        // Atualiza as especialidades associadas
        $clinica->especialidades()->sync($request->especialidades);

        return response()->json(['message' => 'Clínica atualizada com sucesso']);
    }

    /**
     * Exclui uma clínica e desassocia as especialidades.
     */
    public function destroy($id)
    {
        $clinica = Clinica::findOrFail($id);

        // Remove vínculos com especialidades antes de deletar
        $clinica->especialidades()->detach();
        $clinica->delete();

        return response()->json(['message' => 'Clínica excluída com sucesso']);
    }
}
