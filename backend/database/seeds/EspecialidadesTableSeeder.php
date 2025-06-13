<?php

use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;
use App\Especialidade;

class EspecialidadesTableSeeder extends Seeder
{
    public function run()
    {
        $especialidades = [
            'Clínico Geral', 'Pediatria', 'Cardiologia', 'Ginecologia',
            'Ortopedia', 'Dermatologia', 'Endocrinologia', 'Oftalmologia',
            'Psiquiatria', 'Neurologia', 'Otorrinolaringologia'
        ];

        foreach ($especialidades as $nome) {
            Especialidade::create([
                'id' => Uuid::uuid4()->toString(),
                'nome' => $nome
            ]);
        }
    }
}
