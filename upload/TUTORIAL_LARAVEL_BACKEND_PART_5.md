# 🚀 TUTORIAL LENGKAP BACKEND LARAVEL KNMP
## Sistem Pendaftaran Pengurus 7 Tier - Part 5: Deployment & Admin Panel

---

## 📋 DAFTAR ISI PART 5

1. [cPanel Deployment (Tanpa SSH)](#1-cpanel-deployment-tanpa-ssh)
2. [Database Seeder Wilayah Indonesia](#2-database-seeder-wilayah-indonesia)
3. [Admin Panel Dashboard](#3-admin-panel-dashboard)
4. [Email Templates](#4-email-templates)
5. [Testing & Debugging](#5-testing--debugging)

---

## 1. CPANEL DEPLOYMENT (TANPA SSH)

### 📋 Persiapan Sebelum Upload

#### A. Konfigurasi Environment

```env
# .env (untuk production)
APP_NAME=KNMP
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.knmp.or.id

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knmp_db
DB_USERNAME=knmp_user
DB_PASSWORD=your_secure_password

# Midtrans
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_SERVER_KEY=Mid-server-xxxxx
MIDTRANS_CLIENT_KEY=Mid-client-xxxxx

# Mail (gunakan SMTP atau layanan email)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@knmp.or.id"
MAIL_FROM_NAME="${APP_NAME}"

# CORS
SANCTUM_STATEFUL_DOMAINS=knmp.or.id,www.knmp.or.id
```

#### B. Optimasi Laravel

```bash
# Di local, jalankan perintah berikut:
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### 📁 Langkah Upload ke cPanel

#### Langkah 1: Backup Database Local

```bash
# Export database dari local
mysqldump -u root -p knmp_db > knmp_backup.sql
```

#### Langkah 2: Zip Project Laravel

Buat file `deploy.bat` (Windows) atau `deploy.sh` (Linux/Mac):

```bash
# deploy.bat
@echo off
echo Preparing Laravel for deployment...

REM Clear cache
php artisan clear-compiled
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

REM Create deployment folder
if exist deployment rmdir /s /q deployment
mkdir deployment

REM Copy files (exclude unnecessary folders)
xcopy /E /I /Y app deployment\app
xcopy /E /I /Y bootstrap deployment\bootstrap
xcopy /E /I /Y config deployment\config
xcopy /E /I /Y database deployment\database
xcopy /E /I /Y public deployment\public
xcopy /E /I /Y resources deployment\resources
xcopy /E /I /Y routes deployment\routes
xcopy /E /I /Y storage deployment\storage
xcopy /Y artisan deployment\
xcopy /Y composer.json deployment\
xcopy /Y composer.lock deployment\

echo Creating zip file...
powershell Compress-Archive -Path deployment\* -DestinationPath knmp-backend.zip

echo Done! Upload knmp-backend.zip to cPanel
pause
```

#### Langkah 3: Upload via cPanel File Manager

1. Login ke cPanel hosting Anda
2. Buka **File Manager**
3. Navigate ke `public_html` (atau subdomain folder)
4. Upload file `knmp-backend.zip`
5. Extract file zip tersebut
6. Pindahkan semua file dari folder hasil extract ke root `public_html`

#### Langkah 4: Set Folder Permissions

Via File Manager, klik kanan dan set permission:
- `storage` → **775**
- `storage/logs` → **775**
- `storage/framework` → **775**
- `storage/framework/cache` → **775**
- `storage/framework/sessions` → **775**
- `storage/framework/views` → **775**
- `bootstrap` → **775**
- `bootstrap/cache` → **775**

#### Langkah 5: Buat Database di cPanel

1. Buka **MySQL Databases** di cPanel
2. Buat database baru: `knmp_db`
3. Buat user database: `knmp_user`
4. Set password yang kuat
5. Add user to database dengan **ALL PRIVILEGES**
6. Catat nama database, username, dan password

#### Langkah 6: Import Database

1. Buka **phpMyAdmin** di cPanel
2. Pilih database yang baru dibuat
3. Klik tab **Import**
4. Pilih file `knmp_backup.sql`
5. Klik **Go**

#### Langkah 7: Edit .env

1. Di File Manager, buat file `.env` di root folder
2. Copy isi dari `.env.example` atau template di atas
3. Sesuaikan konfigurasi database dengan yang dibuat di langkah 5

#### Langkah 8: Migrasi Database (Tanpa SSH)

Buat file `migrate.php` di folder `public`:

```php
<?php
// public/migrate.php
// DELETE THIS FILE AFTER RUNNING!

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// Run migrations
try {
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    echo "Migrations completed successfully!<br>";
    echo \Illuminate\Support\Facades\Artisan::output();
} catch (\Exception $e) {
    echo "Migration error: " . $e->getMessage();
}

// Run seeders
try {
    \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
    echo "<br>Seeders completed successfully!<br>";
    echo \Illuminate\Support\Facades\Artisan::output();
} catch (\Exception $e) {
    echo "Seeder error: " . $e->getMessage();
}
```

Kemudian akses: `https://yourdomain.com/migrate.php`
**PENTING: Hapus file ini setelah selesai!**

#### Langkah 9: Point Domain ke Public Folder

Buat file `.htaccess` di root:

```apache
# .htaccess di root folder
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^public
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

#### Langkah 10: SSL Certificate

1. Di cPanel, buka **SSL/TLS Status**
2. Klik **Run AutoSSL**
3. Tunggu hingga SSL terinstall

### 🔧 Troubleshooting cPanel

#### Error: 500 Internal Server Error

```apache
# Tambahkan di public/.htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    
    # Redirect Trailing Slashes
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]
    
    # Send Requests To Front Controller
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.php [L]
</IfModule>
```

#### Error: Storage Not Writable

Via File Manager:
1. Klik kanan folder `storage`
2. Pilih **Change Permissions**
3. Set ke **775**
4. Centang **Recursive**

---

## 2. DATABASE SEEDER WILAYAH INDONESIA

### 📄 ProvinceSeeder

```php
<?php
// database/seeders/ProvinceSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ProvinceSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Seeding provinces...');
        
        // Data provinsi Indonesia lengkap
        $provinces = [
            ['code' => '11', 'name' => 'Aceh'],
            ['code' => '12', 'name' => 'Sumatera Utara'],
            ['code' => '13', 'name' => 'Sumatera Barat'],
            ['code' => '14', 'name' => 'Riau'],
            ['code' => '15', 'name' => 'Jambi'],
            ['code' => '16', 'name' => 'Sumatera Selatan'],
            ['code' => '17', 'name' => 'Bengkulu'],
            ['code' => '18', 'name' => 'Lampung'],
            ['code' => '19', 'name' => 'Kepulauan Bangka Belitung'],
            ['code' => '21', 'name' => 'Kepulauan Riau'],
            ['code' => '31', 'name' => 'DKI Jakarta'],
            ['code' => '32', 'name' => 'Jawa Barat'],
            ['code' => '33', 'name' => 'Jawa Tengah'],
            ['code' => '34', 'name' => 'DI Yogyakarta'],
            ['code' => '35', 'name' => 'Jawa Timur'],
            ['code' => '36', 'name' => 'Banten'],
            ['code' => '51', 'name' => 'Bali'],
            ['code' => '52', 'name' => 'Nusa Tenggara Barat'],
            ['code' => '53', 'name' => 'Nusa Tenggara Timur'],
            ['code' => '61', 'name' => 'Kalimantan Barat'],
            ['code' => '62', 'name' => 'Kalimantan Tengah'],
            ['code' => '63', 'name' => 'Kalimantan Selatan'],
            ['code' => '64', 'name' => 'Kalimantan Timur'],
            ['code' => '65', 'name' => 'Kalimantan Utara'],
            ['code' => '71', 'name' => 'Sulawesi Utara'],
            ['code' => '72', 'name' => 'Sulawesi Tengah'],
            ['code' => '73', 'name' => 'Sulawesi Selatan'],
            ['code' => '74', 'name' => 'Sulawesi Tenggara'],
            ['code' => '75', 'name' => 'Gorontalo'],
            ['code' => '76', 'name' => 'Sulawesi Barat'],
            ['code' => '81', 'name' => 'Maluku'],
            ['code' => '82', 'name' => 'Maluku Utara'],
            ['code' => '91', 'name' => 'Papua'],
            ['code' => '92', 'name' => 'Papua Barat'],
            ['code' => '93', 'name' => 'Papua Selatan'],
            ['code' => '94', 'name' => 'Papua Tengah'],
            ['code' => '95', 'name' => 'Papua Pegunungan'],
            ['code' => '96', 'name' => 'Papua Barat Daya'],
        ];

        foreach ($provinces as $province) {
            DB::table('provinces')->updateOrInsert(
                ['code' => $province['code']],
                array_merge($province, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        $this->command->info('Provinces seeded successfully!');
    }
}
```

### 📄 PositionSeeder (Generate Positions)

```php
<?php
// database/seeders/PositionSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Province;
use App\Models\Regency;
use App\Models\District;
use App\Models\Village;
use App\Models\Tier;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Generating positions...');
        
        // Get tiers
        $tierKorwil = Tier::where('level', 2)->first();
        $tierKorda = Tier::where('level', 3)->first();
        $tierKorcam = Tier::where('level', 4)->first();
        $tierKordes = Tier::where('level', 5)->first();

        // Generate KORWIL positions (per province)
        $this->command->info('Generating KORWIL positions...');
        $provinces = Province::all();
        foreach ($provinces as $province) {
            DB::table('positions')->insert([
                'tier_id' => $tierKorwil->id,
                'position_name' => 'Panglima KORWIL ' . $province->name,
                'position_code' => 'KORWIL-' . $province->code,
                'province_id' => $province->id,
                'status' => 'vacant',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Generate KORDA positions (per regency)
        $this->command->info('Generating KORDA positions...');
        $regencies = Regency::all();
        foreach ($regencies as $regency) {
            DB::table('positions')->insert([
                'tier_id' => $tierKorda->id,
                'position_name' => 'Panglima KORDA ' . $regency->name,
                'position_code' => 'KORDA-' . $regency->code,
                'province_id' => $regency->province_id,
                'regency_id' => $regency->id,
                'status' => 'vacant',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Generate KORCAM positions (per district)
        $this->command->info('Generating KORCAM positions (this may take a while)...');
        $districts = District::with('regency')->chunk(100, function($districts) use ($tierKorcam) {
            foreach ($districts as $district) {
                DB::table('positions')->insert([
                    'tier_id' => $tierKorcam->id,
                    'position_name' => 'Panglima KORCAM ' . $district->name,
                    'position_code' => 'KORCAM-' . $district->code,
                    'province_id' => $district->regency->province_id,
                    'regency_id' => $district->regency_id,
                    'district_id' => $district->id,
                    'status' => 'vacant',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });

        // Generate KORDES positions (per village)
        // WARNING: This will create 83,763 records!
        $this->command->info('Generating KORDES positions (this will take a LONG time)...');
        $tierKordes = Tier::where('level', 5)->first();
        
        // Process in chunks to avoid memory issues
        Village::with(['district.regency'])->chunk(500, function($villages) use ($tierKordes) {
            $insertData = [];
            foreach ($villages as $village) {
                $insertData[] = [
                    'tier_id' => $tierKordes->id,
                    'position_name' => 'Panglima KORDES ' . $village->name,
                    'position_code' => 'KORDES-' . $village->code,
                    'province_id' => $village->district->regency->province_id,
                    'regency_id' => $village->district->regency_id,
                    'district_id' => $village->district_id,
                    'village_id' => $village->id,
                    'status' => 'vacant',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            DB::table('positions')->insert($insertData);
            $this->command->info('Processed ' . count($insertData) . ' villages...');
        });

        $this->command->info('All positions generated successfully!');
    }
}
```

### 📄 Master Database Seeder

```php
<?php
// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            TierSeeder::class,
            ProvinceSeeder::class,
            // Regencies, Districts, Villages seeders here
            // PositionSeeder::class, // Run after location data is seeded
        ]);
    }
}
```

---

## 3. ADMIN PANEL DASHBOARD

### 📄 Admin Dashboard View (Frontend)

```typescript
// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  MapPin,
  Building,
  Crown,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface DashboardStats {
  total_members: number;
  active_members: number;
  pending_registrations: number;
  total_mitra: number;
  active_mitra: number;
  by_tier: Array<{
    tier_id: number;
    total: number;
    tier: { name: string };
  }>;
  by_province: Array<{
    province_id: number;
    total: number;
    province: { name: string };
  }>;
  vacant_positions: number;
  filled_positions: number;
}

export default function AdminDashboardPage() {
  const { token, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500">Selamat datang di panel admin KNMP</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Anggota</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats?.total_members.toLocaleString() || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Anggota Aktif</p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats?.active_members.toLocaleString() || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Approval</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats?.pending_registrations || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Mitra</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats?.total_mitra || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Anggota per Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.by_tier.map((item) => (
                <div key={item.tier_id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.tier?.name}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#008F3D] h-2 rounded-full"
                        style={{
                          width: `${(item.total / (stats?.total_members || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {item.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Positions Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status Posisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600">
                  {stats?.filled_positions.toLocaleString() || 0}
                </p>
                <p className="text-sm text-green-600 mt-1">Terisi</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-4xl font-bold text-gray-600">
                  {stats?.vacant_positions.toLocaleString() || 0}
                </p>
                <p className="text-sm text-gray-600 mt-1">Kosong</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Fill Rate</span>
                <span>
                  {((stats?.filled_positions || 0) / 
                    ((stats?.filled_positions || 0) + (stats?.vacant_positions || 1)) * 100
                  ).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${((stats?.filled_positions || 0) / 
                      ((stats?.filled_positions || 0) + (stats?.vacant_positions || 1)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#008F3D] hover:bg-[#00702E]">
              <UserCheck className="w-4 h-4 mr-2" />
              Approval Pending ({stats?.pending_registrations || 0})
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Lihat Anggota
            </Button>
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Lihat Posisi
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Laporan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 4. EMAIL TEMPLATES

### 📄 resources/views/emails/registration-confirmation.blade.php

```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Konfirmasi Pendaftaran KNMP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #008F3D 0%, #006B2D 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">KNMP</h1>
            <p style="color: #a5d6a7; margin: 10px 0 0;">Koperasi Nusantara Merah Putih</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
            <h2 style="color: #333; margin-top: 0;">Konfirmasi Pendaftaran</h2>
            
            <p style="color: #666; line-height: 1.6;">
                Yth. Bapak/Ibu <strong>{{ $name }}</strong>,
            </p>

            <p style="color: #666; line-height: 1.6;">
                Terima kasih telah mendaftar sebagai <strong>{{ $tier }}</strong> di Koperasi Nusantara Merah Putih.
            </p>

            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Detail Pendaftaran</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #666;">Paket</td>
                        <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">{{ $tier }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;">Total Pembayaran</td>
                        <td style="padding: 8px 0; color: #008F3D; font-weight: bold; text-align: right;">Rp {{ $amount }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;">Order ID</td>
                        <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">{{ $order_id }}</td>
                    </tr>
                </table>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ $payment_url }}" 
                   style="background-color: #008F3D; color: #ffffff; padding: 14px 28px; 
                          text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                    Selesaikan Pembayaran
                </a>
            </div>

            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #856404;">
                    <strong>Penting:</strong> Batas waktu pembayaran adalah 24 jam. 
                    Jika tidak dibayar dalam waktu tersebut, pendaftaran akan dibatalkan.
                </p>
            </div>

            <p style="color: #666; line-height: 1.6;">
                Jika Anda memiliki pertanyaan, silakan hubungi kami melalui:
                <br>Email: info@knmp.or.id
                <br>WhatsApp: 0812-3456-7890
            </p>

            <p style="color: #666; line-height: 1.6; margin-bottom: 0;">
                Hormat kami,<br>
                <strong>Tim KNMP</strong>
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #999; font-size: 12px; margin: 0;">
                © {{ date('Y') }} Koperasi Nusantara Merah Putih. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
```

### 📄 resources/views/emails/registration-approved.blade.php

```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pendaftaran Disetujui - KNMP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #008F3D 0%, #006B2D 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">SELAMAT!</h1>
            <p style="color: #a5d6a7; margin: 10px 0 0;">Pendaftaran Anda Telah Disetujui</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
            <p style="color: #666; line-height: 1.6;">
                Yth. Bapak/Ibu <strong>{{ $name }}</strong>,
            </p>

            <p style="color: #666; line-height: 1.6;">
                Dengan ini kami sampaikan bahwa pendaftaran Anda sebagai 
                <strong>{{ $tier }}</strong> telah <strong style="color: #008F3D;">DISETUJUI</strong>.
            </p>

            @if($position)
            <div style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-top: 0;">Jabatan Anda</h3>
                <p style="font-size: 18px; color: #333; margin: 0;">
                    <strong>{{ $position }}</strong>
                </p>
                @if($location)
                <p style="color: #666; margin: 5px 0 0;">{{ $location }}</p>
                @endif
            </div>
            @endif

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ $login_url }}" 
                   style="background-color: #008F3D; color: #ffffff; padding: 14px 28px; 
                          text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                    Login ke Dashboard
                </a>
            </div>

            <p style="color: #666; line-height: 1.6;">
                Anda dapat mengakses dashboard anggota untuk melihat profil, 
                kartu anggota digital, dan informasi kegiatan KNMP.
            </p>

            <p style="color: #666; line-height: 1.6; margin-bottom: 0;">
                Hormat kami,<br>
                <strong>Tim KNMP</strong>
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #999; font-size: 12px; margin: 0;">
                © {{ date('Y') }} Koperasi Nusantara Merah Putih. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 5. TESTING & DEBUGGING

### 📄 API Testing dengan Postman

#### Collection untuk Testing:

```
📁 KNMP API Tests
├── 📁 Auth
│   ├── POST /register
│   ├── POST /login
│   ├── GET /me
│   └── POST /logout
├── 📁 Registration
│   ├── GET /tiers
│   ├── GET /positions/available
│   └── POST /registration/submit
├── 📁 Payment
│   └── POST /payment/callback/midtrans
└── 📁 Admin
    ├── GET /admin/statistics
    ├── GET /admin/registrations/pending
    ├── POST /admin/registrations/{id}/approve
    └── POST /admin/registrations/{id}/reject
```

### 📄 Test Script Example

```javascript
// tests/api/registration.test.js

const baseUrl = 'http://localhost:8000/api';

describe('Registration API', () => {
  
  test('Get available tiers', async () => {
    const response = await fetch(`${baseUrl}/tiers`);
    const result = await response.json();
    
    expect(result.success).toBe(true);
    expect(result.data).toBeInstanceOf(Array);
    expect(result.data.length).toBeGreaterThan(0);
  });

  test('Submit registration', async () => {
    const formData = new FormData();
    formData.append('tier_id', '6');
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('phone', '081234567890');
    formData.append('password', 'password123');
    formData.append('password_confirmation', 'password123');
    formData.append('nik', '1234567890123456');
    formData.append('tempat_lahir', 'Jakarta');
    formData.append('tanggal_lahir', '1990-01-01');
    formData.append('jenis_kelamin', 'L');
    formData.append('alamat', 'Jl. Test No. 123');
    formData.append('payment_method', 'va_bca');
    
    // Add test files
    // formData.append('photo', testPhotoFile);
    // formData.append('ktp_photo', testKtpFile);
    
    const response = await fetch(`${baseUrl}/registration/submit`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    expect(result.success).toBe(true);
    expect(result.data.payment).toBeDefined();
    expect(result.data.payment.order_id).toBeDefined();
  });
});
```

### 📄 Debugging Tips

1. **Enable Debug Mode (Development Only)**
   ```env
   APP_DEBUG=true
   ```

2. **Check Laravel Logs**
   ```
   storage/logs/laravel.log
   ```

3. **Enable Query Log**
   ```php
   // In AppServiceProvider::boot()
   DB::listen(function($query) {
       Log::info($query->sql, $query->bindings);
   });
   ```

4. **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| CORS Error | Add frontend URL to `config/cors.php` |
| 419 CSRF Token Mismatch | Ensure Sanctum is configured for SPA |
| Storage Not Writable | `chmod -R 775 storage` |
| Mail Not Sending | Check MAIL_ config & use app password for Gmail |

---

## ✅ FINAL CHECKLIST

- [ ] Laravel backend deployed to cPanel
- [ ] Database migrated and seeded
- [ ] Midtrans integration tested
- [ ] Email sending works
- [ ] Frontend connected to API
- [ ] Admin panel accessible
- [ ] All CRUD operations working
- [ ] SSL certificate installed
- [ ] Error logging enabled

---

## 🎉 SELAMAT!

Anda telah menyelesaikan tutorial lengkap pembuatan sistem pendaftaran KNMP dengan:
- ✅ Backend Laravel lengkap dengan API
- ✅ Database schema dan migration
- ✅ Frontend Next.js dengan form pendaftaran multi-step
- ✅ Integrasi Midtrans untuk pembayaran
- ✅ Admin panel untuk approval
- ✅ Email notification
- ✅ Deployment ke cPanel

---

*Dokumen ini adalah bagian terakhir dari Tutorial Backend Laravel KNMP*
*Total Parts: 5 Dokumen*
*Total Halaman: ~150+ halaman*
