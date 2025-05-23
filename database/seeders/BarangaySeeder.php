<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Seeder;

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $barangays = [
            ['name' => 'Bago', 'address' => 'Bago, General Tinio, Nueva Ecija', 'barangay_captain' => 'Juan Dela Cruz', 'logo' => '/logo/default/bago.png', 'cdc_name' => 'BAGO CHILD DEVELOPMENT CENTER'],
            ['name' => 'Concepcion', 'address' => 'Concepcion, General Tinio, Nueva Ecija', 'barangay_captain' => 'Maria Santos', 'logo' => '/logo/default/concepcion.png', 'cdc_name' => 'CONCEPCION I CHILD DEVELOPMENT CENTER'],
            ['name' => 'Concepcion', 'address' => 'Concepcion, General Tinio, Nueva Ecija', 'barangay_captain' => 'Maria Santos', 'logo' => '/logo/default/concepcion.png', 'cdc_name' => 'CONCEPCION II CHILD DEVELOPMENT CENTER'],
            ['name' => 'Nazareth', 'address' => 'Nazareth, General Tinio, Nueva Ecija', 'barangay_captain' => 'Jose Ramos', 'logo' => '/logo/default/nazareth.png', 'cdc_name' => 'NAZARETH CHILD DEVELOPMENT CENTER'],
            ['name' => 'Nazareth', 'address' => 'Nazareth, General Tinio, Nueva Ecija', 'barangay_captain' => 'Jose Ramos', 'logo' => '/logo/default/nazareth.png', 'cdc_name' => 'IRENEA CHILD DEVELOPMENT CENTER'],
            ['name' => 'Padolina', 'address' => 'Padolina, General Tinio, Nueva Ecija', 'barangay_captain' => 'Ana Dela Rosa', 'logo' => '/logo/default/padolina.png', 'cdc_name' => 'PADOLINA CHILD DEVELOPMENT CENTER'],
            ['name' => 'Palale', 'address' => 'Palale, General Tinio, Nueva Ecija', 'barangay_captain' => 'Ramon Bautista', 'logo' => '/logo/default/palale.png', 'cdc_name' => 'PALALE CHILD DEVELOPMENT CENTER'],
            ['name' => 'Pias', 'address' => 'Pias, General Tinio, Nueva Ecija', 'barangay_captain' => 'Luisa Cruz', 'logo' => '/logo/default/pias.png', 'cdc_name' => 'PIAS CHILD DEVELOPMENT CENTER'],
            ['name' => 'Pias', 'address' => 'Pias, General Tinio, Nueva Ecija', 'barangay_captain' => 'Luisa Cruz', 'logo' => '/logo/default/pias.png', 'cdc_name' => 'SITIO PATINDIG ARAW CHILD DEVELOPMENT CENTER'],
            ['name' => 'Poblacion Central', 'address' => 'Poblacion Central, General Tinio, Nueva Ecija', 'barangay_captain' => 'Carlos Garcia', 'logo' => '/logo/default/pob-central.png', 'cdc_name' => 'POB. CENTRAL CHILD DEVELOPMENT CENTER'],
            ['name' => 'Poblacion East', 'address' => 'Poblacion East, General Tinio, Nueva Ecija', 'barangay_captain' => 'Andrea Lopez', 'logo' => '/logo/default/pob-east.png', 'cdc_name' => 'POB. EAST CHILD DEVELOPMENT CENTER'],
            ['name' => 'Poblacion West', 'address' => 'Poblacion West, General Tinio, Nueva Ecija', 'barangay_captain' => 'Roberto Reyes', 'logo' => '/logo/default/pob-west.png', 'cdc_name' => 'POB. WEST CHILD DEVELOPMENT CENTER'],
            ['name' => 'Pulong Matong', 'address' => 'Pulong Matong, General Tinio, Nueva Ecija', 'barangay_captain' => 'Cecilia Mendoza', 'logo' => '/logo/default/pulong-matong.png', 'cdc_name' => 'PULONG MATONG CHILD DEVELOPMENT CENTER'],
            ['name' => 'Rio Chico', 'address' => 'Rio Chico, General Tinio, Nueva Ecija', 'barangay_captain' => 'Marcelo Tan', 'logo' => '/logo/default/rio.png', 'cdc_name' => 'RIO CHICO CHILD DEVELOPMENT CENTER'],
            ['name' => 'Rio Chico', 'address' => 'Rio Chico, General Tinio, Nueva Ecija', 'barangay_captain' => 'Marcelo Tan', 'logo' => '/logo/default/rio.png', 'cdc_name' => 'CAMIA CHILD DEVELOPMENT CENTER'],
            ['name' => 'Rio Chico', 'address' => 'Rio Chico, General Tinio, Nueva Ecija', 'barangay_captain' => 'Marcelo Tan', 'logo' => '/logo/default/rio.png', 'cdc_name' => 'PANTAY CHILD DEVELOPMENT CENTER'],
            ['name' => 'Rio Chico', 'address' => 'Rio Chico, General Tinio, Nueva Ecija', 'barangay_captain' => 'Marcelo Tan', 'logo' => '/logo/default/rio.png', 'cdc_name' => 'SIBUG CHILD DEVELOPMENT CENTER'],
            ['name' => 'Sampaguita', 'address' => 'Sampaguita, General Tinio, Nueva Ecija', 'barangay_captain' => 'Elena Ramos', 'logo' => '/logo/default/sampaguita.png', 'cdc_name' => 'SAMPAGUITA CHILD DEVELOPMENT CENTER'],
            ['name' => 'San Pedro', 'address' => 'San Pedro, General Tinio, Nueva Ecija', 'barangay_captain' => 'Resty', 'logo' => '/logo/default/san pedro.png', 'cdc_name' => 'SAN PEDRO CHILD DEVELOPMENT CENTER'],
            ['name' => 'San Pedro', 'address' => 'San Pedro, General Tinio, Nueva Ecija', 'barangay_captain' => 'Resty', 'logo' => '/logo/default/san pedro.png', 'cdc_name' => 'GULOD CHILD DEVELOPMENT CENTER'],
            ['name' => 'San Pedro', 'address' => 'San Pedro, General Tinio, Nueva Ecija', 'barangay_captain' => 'Resty', 'logo' => '/logo/default/san pedro.png', 'cdc_name' => 'GAWAD KALINGA CHILD DEVELOPMENT CENTER'],
        ];

        foreach ($barangays as $barangay) {
            Barangay::create($barangay);
        }
    }
}
