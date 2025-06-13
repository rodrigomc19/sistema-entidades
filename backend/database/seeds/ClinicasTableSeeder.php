<?php

use Illuminate\Database\Seeder;
use App\Clinica;
use App\Especialidade;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class ClinicasTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('pt_BR');
        $regionais = \App\Regional::pluck('id')->toArray();
        $especialidades = Especialidade::pluck('id')->toArray();

        foreach (range(1, 40) as $i) {
            $clinica = Clinica::create([
               'id' => (string) \Ramsey\Uuid\Uuid::uuid4(),
                'razao_social' => $faker->company,
                'nome_fantasia' => 'Clínica ' . $faker->lastName,
                'cnpj' => $this->generateCnpj(),
                'regional_id' => $faker->randomElement($regionais),
                'data_inauguracao' => $faker->date('Y-m-d'),
                'ativa' => $faker->boolean(80),
            ]);

            $clinica->especialidades()->sync(
                $faker->randomElements($especialidades, rand(1, 5))
            );
        }
    }

    private function generateCnpj()
    {
        $n = 9;
        $cnpj = '';
        for ($i = 0; $i < 14; $i++) {
            $cnpj .= mt_rand(0, $n);
        }
        return substr($cnpj, 0, 2) . '.' . substr($cnpj, 2, 3) . '.' . substr($cnpj, 5, 3) . '/' . substr($cnpj, 8, 4) . '-' . substr($cnpj, 12, 2);
    }
}
