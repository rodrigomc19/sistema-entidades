<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $this->call(RegionaisTableSeeder::class);
       $this->call(EspecialidadesTableSeeder::class);
       $this->call(ClinicasTableSeeder::class);
       $this->call(UsersTableSeeder::class);
       
    }
}
