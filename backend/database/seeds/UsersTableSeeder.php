<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Administrador',
            'email' => 'admin@teste.com',
            'password' => Hash::make('123456'), // ou bcrypt('123456') em versões antigas
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
