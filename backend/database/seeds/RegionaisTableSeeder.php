<?php

use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;
use App\Regional;

class RegionaisTableSeeder extends Seeder
{
    public function run()
    {
        $nomes = [
            'Alto tietê', 'Interior', 'ES', 'SP Interior', 'SP', 'SP2', 'MG',
            'Nacional', 'SP CAV', 'RJ', 'SP1', 'NE1', 'NE2', 'SUL', 'Norte'
        ];

        foreach ($nomes as $nome) {
            Regional::create([
                'id' => Uuid::uuid4()->toString(),
                'nome' => $nome
            ]);
        }
    }
}
