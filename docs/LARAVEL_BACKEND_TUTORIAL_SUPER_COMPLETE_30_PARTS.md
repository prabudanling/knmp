# 🚀 SUPER TUTORIAL LARAVEL BACKEND KNMP
## Dari Hulu ke Hilir - 30 Part Complete Guide
### Untuk Domain: kopnusa.id

---

# 📋 MASTER PLAN ARSITEKTUR

## 🌐 SUBDOMAIN YANG DIBUTUHKAN

### Rekomendasi Subdomain (Pilih salah satu opsi):

#### OPSI A: Minimal Setup (3 Subdomain)
```
1. kopnusa.id          → Frontend Next.js (Sudah ada)
2. api.kopnusa.id      → Laravel API Backend
3. admin.kopnusa.id    → Laravel Admin Panel (Optional, bisa digabung dengan api)
```

#### OPSI B: Recommended Setup (5 Subdomain) ⭐ RECOMMENDED
```
1. kopnusa.id          → Frontend Next.js (Public Website)
2. api.kopnusa.id      → Laravel REST API (Backend Logic)
3. admin.kopnusa.id    → Laravel Admin Panel (Dashboard Admin)
4. storage.kopnusa.id  → File Storage Server (Foto KTP, Bukti Bayar, dll)
5. ws.kopnusa.id       → WebSocket Server (Real-time Notification)
```

#### OPSI C: Full Enterprise (7 Subdomain)
```
1. kopnusa.id          → Frontend Next.js
2. api.kopnusa.id      → Laravel REST API
3. admin.kopnusa.id    → Laravel Admin Panel
4. storage.kopnusa.id  → File Storage
5. ws.kopnusa.id       → WebSocket Real-time
6. mail.kopnusa.id     → Mail Server (Email Notification)
7. cdn.kopnusa.id      → Content Delivery Network
```

### 🎯 SARAN KUAT: PILIH OPSI B (5 SUBDOMAIN)

**Alasan:**
1. **api.kopnusa.id** - Semua logic backend terpusat di sini
2. **admin.kopnusa.id** - Panel khusus untuk admin/pimpinan
3. **storage.kopnusa.id** - Aman untuk file sensitif (KTP, bukti bayar)
4. **ws.kopnusa.id** - Real-time notification saat ada pendaftaran
5. **kopnusa.id** - Frontend yang sudah ada

---

# 📚 TUTORIAL 30 PART

## ═══════════════════════════════════════════════════════════
## PHASE 1: SETUP LARAVEL LOCALHOST (PART 1-10)
## ═══════════════════════════════════════════════════════════

---

# PART 1: Persiapan Environment & Tools

## 1.1 Tools yang Harus Diinstall

### A. XAMPP (Untuk PHP & MySQL)
```
Download: https://www.apachefriends.org/
Versi: XAMPP dengan PHP 8.2+

Setelah install, pastikan aktifkan:
- Apache
- MySQL
```

### B. Composer (PHP Package Manager)
```
Download: https://getcomposer.org/
Cara cek: buka CMD, ketik: composer --version
```

### C. Git
```
Download: https://git-scm.com/
Cara cek: buka CMD, ketik: git --version
```

### D. VS Code (Editor)
```
Download: https://code.visualstudio.com/

Extensions yang wajib diinstall:
- PHP Intelephense
- Laravel Extra Intellisense
- Laravel Blade Snippets
- Thunder Client (untuk test API)
```

### E. Postman (API Testing)
```
Download: https://www.postman.com/downloads/
Alternatif: Thunder Client di VS Code
```

## 1.2 Struktur Folder Kerja

Buat folder kerja:
```
C:\xampp\htdocs\
├── kopnusa-api\           ← Laravel Backend (api.kopnusa.id)
├── kopnusa-admin\         ← Laravel Admin (admin.kopnusa.id)
└── kopnusa-storage\       ← Laravel Storage (storage.kopnusa.id)
```

---

# PART 2: Install Laravel API Backend

## 2.1 Buat Project Laravel Baru

Buka CMD/PowerShell, masuk ke folder htdocs:
```bash
cd C:\xampp\htdocs
```

Install Laravel via Composer:
```bash
composer create-project laravel/laravel kopnusa-api
```

Tunggu proses download (5-10 menit tergantung koneksi).

## 2.2 Masuk ke Project

```bash
cd kopnusa-api
```

## 2.3 Jalankan Laravel di Localhost

```bash
php artisan serve
```

Buka browser: `http://localhost:8000`

Jika muncul halaman Laravel berarti SUKSES! ✅

## 2.4 Setting Database di .env

Buka file `.env` di folder project, edit:
```env
APP_NAME=KNMP_API
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knmp_database
DB_USERNAME=root
DB_PASSWORD=
```

## 2.5 Buat Database di phpMyAdmin

1. Buka browser: `http://localhost/phpmyadmin`
2. Klik "New" di sidebar kiri
3. Buat database dengan nama: `knmp_database`
4. Collation: `utf8mb4_unicode_ci`
5. Klik "Create"

## 2.6 Test Koneksi Database

```bash
php artisan migrate
```

Jika tidak ada error, koneksi database SUKSES! ✅

---

# PART 3: Install Package-Package Penting

## 3.1 Package yang Akan Diinstall

```bash
# Authentication & Authorization
composer require laravel/sanctum
composer require spatie/laravel-permission

# API Documentation
composer require darkaonline/l5-swagger

# File Upload & Storage
composer require intervention/image
composer require league/flysystem-aws-s3-v3

# Helper & Utilities
composer require laravel/helpers

# Development Tools
composer require --dev barryvdh/laravel-debugbar

# QR Code Generator
composer require simplesoftwareio/simple-qrcode

# PDF Generator
composer require barryvdh/laravel-dompdf

# Excel Export/Import
composer require maatwebsite/excel

# UUID Support
composer require ramsey/uuid
```

## 3.2 Install Semua Package Sekaligus

Copy-paste command ini di CMD:
```bash
composer require laravel/sanctum spatie/laravel-permission darkaonline/l5-swagger intervention/image simplesoftwareio/simple-qrcode barryvdh/laravel-dompdf maatwebsite/excel ramsey/uuid && composer require --dev barryvdh/laravel-debugbar
```

## 3.3 Publish Configuration

```bash
# Sanctum (API Authentication)
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Spatie Permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

# Swagger API Docs
php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"
```

---

# PART 4: Setup Database Migrations

## 4.1 Buat Migration untuk Tabel Users (Extended)

```bash
php artisan make:migration add_fields_to_users_table --table=users
```

Edit file di `database/migrations/xxxx_add_fields_to_users_table.php`:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Data Pribadi
            $table->string('nik', 16)->unique()->after('id');
            $table->string('tempat_lahir')->nullable()->after('nik');
            $table->date('tanggal_lahir')->nullable()->after('tempat_lahir');
            $table->enum('jenis_kelamin', ['L', 'P'])->after('tanggal_lahir');
            $table->text('alamat')->nullable()->after('jenis_kelamin');
            $table->string('provinsi_id')->nullable()->after('alamat');
            $table->string('kabupaten_id')->nullable()->after('provinsi_id');
            $table->string('kecamatan_id')->nullable()->after('kabupaten_id');
            $table->string('kelurahan_id')->nullable()->after('kecamatan_id');
            $table->string('kode_pos', 10)->nullable()->after('kelurahan_id');
            $table->string('no_hp', 15)->nullable()->after('kode_pos');
            $table->string('no_wa', 15)->nullable()->after('no_hp');
            $table->string('pekerjaan')->nullable()->after('no_wa');
            
            // Data Keanggotaan
            $table->string('no_anggota')->unique()->nullable()->after('pekerjaan');
            $table->foreignId('tier_id')->nullable()->after('no_anggota');
            $table->foreignId('referrer_id')->nullable()->after('tier_id');
            $table->string('kode_unik', 6)->unique()->nullable()->after('referrer_id');
            $table->string('qr_code')->nullable()->after('kode_unik');
            
            // Status
            $table->enum('status_keanggotaan', ['pending', 'aktif', 'nonaktif', 'ditolak'])->default('pending')->after('qr_code');
            $table->timestamp('tanggal_daftar')->nullable()->after('status_keanggotaan');
            $table->timestamp('tanggal_aktif')->nullable()->after('tanggal_daftar');
            $table->timestamp('tanggal_expired')->nullable()->after('tanggal_aktif');
            
            // Dokumen
            $table->string('foto_ktp')->nullable()->after('tanggal_expired');
            $table->string('foto_kebun')->nullable()->after('foto_ktp');
            $table->string('foto_diri')->nullable()->after('foto_kebun');
            $table->string('bukti_pembayaran')->nullable()->after('foto_diri');
            
            // Data Tambahan
            $table->decimal('total_komisi', 15, 2)->default(0)->after('bukti_pembayaran');
            $table->integer('total_referral')->default(0)->after('total_komisi');
            $table->text('catatan_admin')->nullable()->after('total_referral');
            $table->json('metadata')->nullable()->after('catatan_admin');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'nik', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin',
                'alamat', 'provinsi_id', 'kabupaten_id', 'kecamatan_id', 
                'kelurahan_id', 'kode_pos', 'no_hp', 'no_wa', 'pekerjaan',
                'no_anggota', 'tier_id', 'referrer_id', 'kode_unik', 'qr_code',
                'status_keanggotaan', 'tanggal_daftar', 'tanggal_aktif', 'tanggal_expired',
                'foto_ktp', 'foto_kebun', 'foto_diri', 'bukti_pembayaran',
                'total_komisi', 'total_referral', 'catatan_admin', 'metadata'
            ]);
        });
    }
};
```

## 4.2 Buat Migration untuk Tabel Tiers

```bash
php artisan make:migration create_tiers_table
```

Edit file:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tiers', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tier');
            $table->string('kode_tier', 10)->unique();
            $table->integer('level')->unique(); // 1-7
            $table->text('deskripsi')->nullable();
            $table->decimal('harga_normal', 15, 2);
            $table->decimal('harga_early_bird', 15, 2);
            $table->decimal('harga_promo', 15, 2);
            $table->decimal('komisi_referensi', 15, 2)->default(0);
            $table->decimal('komisi_level_1', 15, 2)->default(0);
            $table->decimal('komisi_level_2', 15, 2)->default(0);
            $table->integer('kuota')->nullable(); // null = unlimited
            $table->integer('terisi')->default(0);
            $table->string('warna', 7)->default('#000000');
            $table->string('icon')->nullable();
            $table->json('benefits')->nullable();
            $table->json('requirements')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tiers');
    }
};
```

## 4.3 Buat Migration untuk Tabel Pendaftaran

```bash
php artisan make:migration create_pendaftaran_table
```

Edit file:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->string('no_pendaftaran', 20)->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('tier_id')->constrained();
            
            // Data Pemohon
            $table->string('nama_lengkap');
            $table->string('nik', 16);
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->text('alamat');
            $table->string('provinsi_id');
            $table->string('kabupaten_id');
            $table->string('kecamatan_id');
            $table->string('kelurahan_id')->nullable();
            $table->string('kode_pos', 10)->nullable();
            $table->string('no_hp', 15);
            $table->string('no_wa', 15);
            $table->string('email');
            $table->string('pekerjaan')->nullable();
            
            // Data Referral
            $table->string('kode_referensi', 10)->nullable();
            $table->foreignId('referrer_id')->nullable();
            
            // Dokumen
            $table->string('foto_ktp')->nullable();
            $table->string('foto_kebun')->nullable();
            $table->string('foto_diri')->nullable();
            $table->string('bukti_pembayaran')->nullable();
            
            // Status
            $table->enum('status', ['draft', 'pending', 'verifikasi', 'disetujui', 'ditolak'])->default('draft');
            $table->decimal('nominal_bayar', 15, 2)->default(0);
            $table->string('metode_pembayaran', 50)->nullable();
            $table->timestamp('tanggal_bayar')->nullable();
            $table->foreignId('verified_by')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->text('catatan')->nullable();
            
            // Log
            $table->json('log_history')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
```

## 4.4 Buat Migration untuk Tabel Notifications

```bash
php artisan make:migration create_notifications_table
```

Edit file:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->morphs('notifiable');
            $table->text('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });

        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('email_notification')->default(true);
            $table->boolean('whatsapp_notification')->default(true);
            $table->boolean('push_notification')->default(true);
            $table->boolean('new_member_alert')->default(true);
            $table->boolean('payment_alert')->default(true);
            $table->boolean('referral_alert')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
        Schema::dropIfExists('notifications');
    }
};
```

## 4.5 Buat Migration untuk Struktur Organisasi

```bash
php artisan make:migration create_struktur_organisasi_table
```

Edit file:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jabatan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jabatan');
            $table->string('kode_jabatan', 10)->unique();
            $table->integer('level')->unique();
            $table->foreignId('tier_id')->nullable(); // jabatan untuk tier tertentu
            $table->text('deskripsi')->nullable();
            $table->integer('kuota')->default(1);
            $table->integer('terisi')->default(0);
            $table->boolean('is_struktural')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('struktur_organisasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('jabatan_id')->constrained('jabatan');
            $table->foreignId('parent_id')->nullable(); // atasan langsung
            $table->foreignId('wilayah_id')->nullable();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });

        Schema::create('wilayah', function (Blueprint $table) {
            $table->id();
            $table->string('nama_wilayah');
            $table->string('kode_wilayah', 10)->unique();
            $table->enum('level', ['pusat', 'provinsi', 'kabupaten', 'kecamatan', 'kelurahan']);
            $table->foreignId('parent_id')->nullable();
            $table->string('provinsi_id')->nullable();
            $table->string('kabupaten_id')->nullable();
            $table->string('kecamatan_id')->nullable();
            $table->string('kelurahan_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('struktur_organisasi');
        Schema::dropIfExists('jabatan');
        Schema::dropIfExists('wilayah');
    }
};
```

## 4.6 Buat Migration untuk Pembayaran & Komisi

```bash
php artisan make:migration create_pembayaran_komisi_table
```

Edit file:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->string('no_transaksi', 30)->unique();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('pendaftaran_id')->nullable();
            $table->enum('jenis', ['pendaftaran', 'perpanjangan', 'lainnya']);
            $table->decimal('nominal', 15, 2);
            $table->decimal('diskon', 15, 2)->default(0);
            $table->decimal('total_bayar', 15, 2);
            $table->string('metode_pembayaran', 50);
            $table->string('bukti_pembayaran')->nullable();
            $table->enum('status', ['pending', 'verifikasi', 'sukses', 'gagal', 'expired'])->default('pending');
            $table->timestamp('tanggal_bayar')->nullable();
            $table->timestamp('tanggal_verifikasi')->nullable();
            $table->foreignId('verified_by')->nullable();
            $table->text('catatan')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('komisi', function (Blueprint $table) {
            $table->id();
            $table->string('no_komisi', 30)->unique();
            $table->foreignId('user_id')->constrained(); // penerima komisi
            $table->foreignId('dari_user_id')->constrained('users'); // dari siapa
            $table->foreignId('pembayaran_id')->constrained('pembayaran');
            $table->enum('level', ['1', '2', '3']);
            $table->decimal('persentase', 5, 2);
            $table->decimal('nominal', 15, 2);
            $table->enum('status', ['pending', 'dicairkan', 'dibatalkan'])->default('pending');
            $table->timestamp('tanggal_cair')->nullable();
            $table->timestamps();
        });

        Schema::create('pencairan_komisi', function (Blueprint $table) {
            $table->id();
            $table->string('no_pencairan', 30)->unique();
            $table->foreignId('user_id')->constrained();
            $table->decimal('total_nominal', 15, 2);
            $table->string('bank_tujuan', 50);
            $table->string('no_rekening', 50);
            $table->string('atas_nama', 100);
            $table->enum('status', ['pending', 'proses', 'sukses', 'gagal'])->default('pending');
            $table->timestamp('tanggal_proses')->nullable();
            $table->foreignId('processed_by')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pencairan_komisi');
        Schema::dropIfExists('komisi');
        Schema::dropIfExists('pembayaran');
    }
};
```

## 4.7 Buat Migration untuk Aktivitas Log

```bash
php artisan make:migration create_activity_logs_table
```

Edit file:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('log_type', 50);
            $table->string('description');
            $table->foreignId('user_id')->nullable();
            $table->string('model_type')->nullable();
            $table->unsignedBigInteger('model_id')->nullable();
            $table->json('old_data')->nullable();
            $table->json('new_data')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index(['log_type', 'created_at']);
            $table->index(['user_id', 'created_at']);
            $table->index(['model_type', 'model_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
```

## 4.8 Jalankan Semua Migration

```bash
php artisan migrate
```

---

# PART 5: Setup Models

## 5.1 Buat Model User (Update)

Edit `app/Models/User.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name', 'email', 'password',
        'nik', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin',
        'alamat', 'provinsi_id', 'kabupaten_id', 'kecamatan_id', 'kelurahan_id', 'kode_pos',
        'no_hp', 'no_wa', 'pekerjaan',
        'no_anggota', 'tier_id', 'referrer_id', 'kode_unik', 'qr_code',
        'status_keanggotaan', 'tanggal_daftar', 'tanggal_aktif', 'tanggal_expired',
        'foto_ktp', 'foto_kebun', 'foto_diri', 'bukti_pembayaran',
        'total_komisi', 'total_referral', 'catatan_admin', 'metadata',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'tanggal_lahir' => 'date',
        'tanggal_daftar' => 'datetime',
        'tanggal_aktif' => 'datetime',
        'tanggal_expired' => 'datetime',
        'total_komisi' => 'decimal:2',
        'metadata' => 'array',
    ];

    // Relasi
    public function tier()
    {
        return $this->belongsTo(Tier::class);
    }

    public function referrer()
    {
        return $this->belongsTo(User::class, 'referrer_id');
    }

    public function referrals()
    {
        return $this->hasMany(User::class, 'referrer_id');
    }

    public function pendaftaran()
    {
        return $this->hasMany(Pendaftaran::class);
    }

    public function struktur()
    {
        return $this->hasOne(StrukturOrganisasi::class);
    }

    public function jabatan()
    {
        return $this->belongsToMany(Jabatan::class, 'struktur_organisasi')
            ->withPivot(['parent_id', 'wilayah_id', 'status', 'tanggal_mulai', 'tanggal_selesai'])
            ->withTimestamps();
    }

    // Scopes
    public function scopeAktif($query)
    {
        return $query->where('status_keanggotaan', 'aktif');
    }

    public function scopePending($query)
    {
        return $query->where('status_keanggotaan', 'pending');
    }

    public function scopeByTier($query, $tierId)
    {
        return $query->where('tier_id', $tierId);
    }

    // Helper Methods
    public function generateNoAnggota()
    {
        $prefix = 'KNMP';
        $year = date('Y');
        $tierCode = $this->tier ? str_pad($this->tier->level, 2, '0', STR_PAD_LEFT) : '00';
        $lastMember = User::whereNotNull('no_anggota')
            ->whereYear('tanggal_daftar', $year)
            ->orderBy('id', 'desc')
            ->first();

        if ($lastMember) {
            $lastNumber = (int) substr($lastMember->no_anggota, -5);
            $newNumber = str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '00001';
        }

        $this->no_anggota = "{$prefix}-{$year}-{$tierCode}-{$newNumber}";
        return $this->no_anggota;
    }

    public function generateKodeUnik()
    {
        $this->kode_unik = strtoupper(substr(md5($this->id . time()), 0, 6));
        return $this->kode_unik;
    }
}
```

## 5.2 Buat Model Tier

```bash
php artisan make:model Tier
```

Edit `app/Models/Tier.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tier extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_tier', 'kode_tier', 'level', 'deskripsi',
        'harga_normal', 'harga_early_bird', 'harga_promo',
        'komisi_referensi', 'komisi_level_1', 'komisi_level_2',
        'kuota', 'terisi', 'warna', 'icon', 'benefits', 'requirements',
        'is_active',
    ];

    protected $casts = [
        'benefits' => 'array',
        'requirements' => 'array',
        'harga_normal' => 'decimal:2',
        'harga_early_bird' => 'decimal:2',
        'harga_promo' => 'decimal:2',
        'komisi_referensi' => 'decimal:2',
        'komisi_level_1' => 'decimal:2',
        'komisi_level_2' => 'decimal:2',
    ];

    // Relasi
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function jabatan()
    {
        return $this->hasMany(Jabatan::class);
    }

    // Helper Methods
    public function isFull()
    {
        if ($this->kuota === null) {
            return false;
        }
        return $this->terisi >= $this->kuota;
    }

    public function sisaKuota()
    {
        if ($this->kuota === null) {
            return 'Unlimited';
        }
        return max(0, $this->kuota - $this->terisi);
    }

    public function incrementTerisi()
    {
        $this->increment('terisi');
    }

    // Data Tier Default
    public static function getDefaultTiers()
    {
        return [
            [
                'nama_tier' => 'Panglima Besar',
                'kode_tier' => 'PB',
                'level' => 1,
                'deskripsi' => 'Pimpinan Tertinggi KNMP',
                'harga_normal' => 1000000000,
                'harga_early_bird' => 250000000,
                'harga_promo' => 50000000,
                'kuota' => 1,
                'warna' => '#FF0000',
            ],
            [
                'nama_tier' => 'Panglima Wilayah',
                'kode_tier' => 'PW',
                'level' => 2,
                'deskripsi' => 'Pimpinan Tingkat Provinsi',
                'harga_normal' => 500000000,
                'harga_early_bird' => 125000000,
                'harga_promo' => 25000000,
                'kuota' => 34,
                'warna' => '#FF6600',
            ],
            [
                'nama_tier' => 'Panglima Distrik',
                'kode_tier' => 'PD',
                'level' => 3,
                'deskripsi' => 'Pimpinan Tingkat Kabupaten/Kota',
                'harga_normal' => 100000000,
                'harga_early_bird' => 25000000,
                'harga_promo' => 5000000,
                'kuota' => 514,
                'warna' => '#FFCC00',
            ],
            [
                'nama_tier' => 'Panglima Camat',
                'kode_tier' => 'PC',
                'level' => 4,
                'deskripsi' => 'Pimpinan Tingkat Kecamatan',
                'harga_normal' => 50000000,
                'harga_early_bird' => 12500000,
                'harga_promo' => 2500000,
                'kuota' => 7000,
                'warna' => '#0066FF',
            ],
            [
                'nama_tier' => 'Panglima Desa',
                'kode_tier' => 'PDES',
                'level' => 5,
                'deskripsi' => 'Pimpinan Tingkat Desa/Kelurahan',
                'harga_normal' => 10000000,
                'harga_early_bird' => 2500000,
                'harga_promo' => 500000,
                'kuota' => 80000,
                'warna' => '#00CC00',
            ],
            [
                'nama_tier' => 'Dewan Pimpinan',
                'kode_tier' => 'DP',
                'level' => 6,
                'deskripsi' => 'Anggota Dewan Pimpinan',
                'harga_normal' => 5000000,
                'harga_early_bird' => 1250000,
                'harga_promo' => 250000,
                'kuota' => null,
                'warna' => '#9900FF',
            ],
            [
                'nama_tier' => 'Petani',
                'kode_tier' => 'PTN',
                'level' => 7,
                'deskripsi' => 'Anggota Petani (Gratis)',
                'harga_normal' => 0,
                'harga_early_bird' => 0,
                'harga_promo' => 0,
                'kuota' => null,
                'warna' => '#666666',
            ],
        ];
    }
}
```

## 5.3 Buat Model Pendaftaran

```bash
php artisan make:model Pendaftaran
```

Edit `app/Models/Pendaftaran.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pendaftaran extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'no_pendaftaran', 'user_id', 'tier_id',
        'nama_lengkap', 'nik', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin',
        'alamat', 'provinsi_id', 'kabupaten_id', 'kecamatan_id', 'kelurahan_id', 'kode_pos',
        'no_hp', 'no_wa', 'email', 'pekerjaan',
        'kode_referensi', 'referrer_id',
        'foto_ktp', 'foto_kebun', 'foto_diri', 'bukti_pembayaran',
        'status', 'nominal_bayar', 'metode_pembayaran', 'tanggal_bayar',
        'verified_by', 'verified_at', 'catatan', 'log_history',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_bayar' => 'datetime',
        'verified_at' => 'datetime',
        'nominal_bayar' => 'decimal:2',
        'log_history' => 'array',
    ];

    // Relasi
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tier()
    {
        return $this->belongsTo(Tier::class);
    }

    public function referrer()
    {
        return $this->belongsTo(User::class, 'referrer_id');
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    // Helper Methods
    public function generateNoPendaftaran()
    {
        $prefix = 'REG';
        $date = date('Ymd');
        $lastReg = self::withTrashed()
            ->whereDate('created_at', today())
            ->orderBy('id', 'desc')
            ->first();

        if ($lastReg) {
            $lastNumber = (int) substr($lastReg->no_pendaftaran, -4);
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        $this->no_pendaftaran = "{$prefix}-{$date}-{$newNumber}";
        return $this->no_pendaftaran;
    }

    public function addLog($message, $data = [])
    {
        $logs = $this->log_history ?? [];
        $logs[] = [
            'timestamp' => now()->toDateTimeString(),
            'message' => $message,
            'data' => $data,
        ];
        $this->log_history = $logs;
        $this->save();
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeVerified($query)
    {
        return $query->where('status', 'disetujui');
    }
}
```

## 5.4 Buat Model Lainnya

```bash
php artisan make:model Jabatan
php artisan make:model StrukturOrganisasi
php artisan make:model Wilayah
php artisan make:model Pembayaran
php artisan make:model Komisi
php artisan make:model PencairanKomisi
php artisan make:model ActivityLog
```

---

# PART 6: Setup Controllers

## 6.1 Buat Controller untuk API

```bash
# Auth Controllers
php artisan make:controller API/AuthController --api
php artisan make:controller API/RegisterController --api

# Master Controllers
php artisan make:controller API/TierController --api
php artisan make:controller API/UserController --api

# Pendaftaran Controllers
php artisan make:controller API/PendaftaranController --api
php artisan make:controller API/VerifikasiController --api

# Struktur Controllers
php artisan make:controller API/StrukturController --api
php artisan make:controller API/JabatanController --api

# Pembayaran Controllers
php artisan make:controller API/PembayaranController --api
php artisan make:controller API/KomisiController --api

# Dashboard Controllers
php artisan make:controller API/DashboardController
php artisan make:controller API/NotificationController --api

# Setting Controllers
php artisan make:controller API/SettingController --api
```

---

# PART 7: Setup API Routes

Edit `routes/api.php`:
```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\TierController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PendaftaranController;
use App\Http\Controllers\API\VerifikasiController;
use App\Http\Controllers\API\StrukturController;
use App\Http\Controllers\API\JabatanController;
use App\Http\Controllers\API\PembayaranController;
use App\Http\Controllers\API\KomisiController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\SettingController;

/*
|--------------------------------------------------------------------------
| API Routes - KNMP Backend
|--------------------------------------------------------------------------
*/

// ================================
// PUBLIC ROUTES (No Auth Required)
// ================================

// Health Check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'KNMP API is running',
        'timestamp' => now()->toDateTimeString(),
    ]);
});

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Tier Routes (Public - untuk halaman pendaftaran)
Route::get('/tiers', [TierController::class, 'index']);
Route::get('/tiers/{id}', [TierController::class, 'show']);
Route::get('/tiers/check-availability/{id}', [TierController::class, 'checkAvailability']);

// Pendaftaran Routes (Public)
Route::post('/pendaftaran/submit', [PendaftaranController::class, 'submit']);
Route::get('/pendaftaran/check-nik/{nik}', [PendaftaranController::class, 'checkNik']);
Route::get('/pendaftaran/check-email/{email}', [PendaftaranController::class, 'checkEmail']);
Route::get('/pendaftaran/check-kode-referral/{kode}', [PendaftaranController::class, 'checkKodeReferral']);
Route::get('/pendaftaran/track/{no_pendaftaran}', [PendaftaranController::class, 'track']);

// Wilayah Routes (Public)
Route::get('/wilayah/provinsi', [SettingController::class, 'getProvinsi']);
Route::get('/wilayah/kabupaten/{provinsi_id}', [SettingController::class, 'getKabupaten']);
Route::get('/wilayah/kecamatan/{kabupaten_id}', [SettingController::class, 'getKecamatan']);
Route::get('/wilayah/kelurahan/{kecamatan_id}', [SettingController::class, 'getKelurahan']);

// Public Stats
Route::get('/stats', [DashboardController::class, 'publicStats']);

// ================================
// PROTECTED ROUTES (Auth Required)
// ================================
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Auth Routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    
    // User Routes
    Route::apiResource('users', UserController::class);
    Route::get('/users/by-tier/{tierId}', [UserController::class, 'byTier']);
    Route::get('/users/by-status/{status}', [UserController::class, 'byStatus']);
    Route::get('/users/search', [UserController::class, 'search']);
    
    // Pendaftaran Routes (Protected)
    Route::get('/pendaftaran', [PendaftaranController::class, 'index']);
    Route::get('/pendaftaran/{id}', [PendaftaranController::class, 'show']);
    Route::put('/pendaftaran/{id}', [PendaftaranController::class, 'update']);
    Route::delete('/pendaftaran/{id}', [PendaftaranController::class, 'destroy']);
    
    // Verifikasi Routes (Admin/Staff Only)
    Route::middleware(['role:admin|superadmin|verifikator'])->group(function () {
        Route::get('/verifikasi/pending', [VerifikasiController::class, 'pending']);
        Route::post('/verifikasi/{id}/approve', [VerifikasiController::class, 'approve']);
        Route::post('/verifikasi/{id}/reject', [VerifikasiController::class, 'reject']);
        Route::post('/verifikasi/bulk-approve', [VerifikasiController::class, 'bulkApprove']);
    });
    
    // Struktur Organisasi Routes
    Route::apiResource('struktur', StrukturController::class);
    Route::apiResource('jabatan', JabatanController::class);
    Route::get('/struktur/tree', [StrukturController::class, 'tree']);
    Route::get('/struktur/by-jabatan/{jabatanId}', [StrukturController::class, 'byJabatan']);
    
    // Pembayaran Routes
    Route::apiResource('pembayaran', PembayaranController::class);
    Route::post('/pembayaran/{id}/upload-bukti', [PembayaranController::class, 'uploadBukti']);
    Route::post('/pembayaran/{id}/verify', [PembayaranController::class, 'verify']);
    
    // Komisi Routes
    Route::get('/komisi/my', [KomisiController::class, 'myKomisi']);
    Route::get('/komisi/summary', [KomisiController::class, 'summary']);
    Route::post('/komisi/pencairan', [KomisiController::class, 'requestPencairan']);
    
    // Dashboard Routes
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/charts', [DashboardController::class, 'charts']);
    Route::get('/dashboard/recent-activities', [DashboardController::class, 'recentActivities']);
    
    // Notification Routes
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    
    // Settings Routes (Admin Only)
    Route::middleware(['role:admin|superadmin'])->group(function () {
        Route::get('/settings', [SettingController::class, 'index']);
        Route::post('/settings', [SettingController::class, 'update']);
        Route::post('/tiers', [TierController::class, 'store']);
        Route::put('/tiers/{id}', [TierController::class, 'update']);
        Route::delete('/tiers/{id}', [TierController::class, 'destroy']);
    });
});

// ================================
// ADMIN ONLY ROUTES
// ================================
Route::middleware(['auth:sanctum', 'role:superadmin'])->group(function () {
    Route::post('/admin/seed-tiers', [SettingController::class, 'seedTiers']);
    Route::post('/admin/seed-jabatan', [SettingController::class, 'seedJabatan']);
    Route::post('/admin/seed-wilayah', [SettingController::class, 'seedWilayah']);
    Route::get('/admin/logs', [SettingController::class, 'logs']);
    Route::post('/admin/backup', [SettingController::class, 'backup']);
});
```

---

# PART 8: Buat Request Validation

## 8.1 Buat Form Request

```bash
php artisan make:request PendaftaranRequest
php artisan make:request UpdateUserRequest
php artisan make:request PembayaranRequest
php artisan make:request LoginRequest
```

## 8.2 Edit PendaftaranRequest

Edit `app/Http/Requests/PendaftaranRequest.php`:
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class PendaftaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Data Tier
            'tier_id' => ['required', 'exists:tiers,id'],
            'kode_referensi' => ['nullable', 'string', 'max:10'],
            
            // Data Pribadi
            'nama_lengkap' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'string', 'size:16', 'unique:users,nik', 'unique:pendaftaran,nik'],
            'tempat_lahir' => ['required', 'string', 'max:100'],
            'tanggal_lahir' => ['required', 'date', 'before:today'],
            'jenis_kelamin' => ['required', 'in:L,P'],
            
            // Alamat
            'alamat' => ['required', 'string', 'max:500'],
            'provinsi_id' => ['required', 'string'],
            'kabupaten_id' => ['required', 'string'],
            'kecamatan_id' => ['required', 'string'],
            'kelurahan_id' => ['nullable', 'string'],
            'kode_pos' => ['nullable', 'string', 'max:10'],
            
            // Kontak
            'no_hp' => ['required', 'string', 'max:15', 'regex:/^08[0-9]{8,13}$/'],
            'no_wa' => ['required', 'string', 'max:15', 'regex:/^08[0-9]{8,13}$/'],
            'email' => ['required', 'email', 'unique:users,email', 'unique:pendaftaran,email'],
            'pekerjaan' => ['nullable', 'string', 'max:100'],
            
            // Dokumen
            'foto_ktp' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'foto_kebun' => ['required_if:tier_id,7', 'nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'foto_diri' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            
            // Pembayaran (untuk non-petani)
            'bukti_pembayaran' => ['required_unless:tier_id,7', 'nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'metode_pembayaran' => ['required_unless:tier_id,7', 'nullable', 'string'],
            
            // Password
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()],
        ];
    }

    public function messages(): array
    {
        return [
            'tier_id.required' => 'Pilih tier keanggotaan terlebih dahulu',
            'tier_id.exists' => 'Tier keanggotaan tidak valid',
            
            'nama_lengkap.required' => 'Nama lengkap wajib diisi',
            'nik.required' => 'NIK wajib diisi',
            'nik.size' => 'NIK harus 16 digit',
            'nik.unique' => 'NIK sudah terdaftar',
            
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            
            'no_hp.required' => 'Nomor HP wajib diisi',
            'no_hp.regex' => 'Format nomor HP tidak valid',
            
            'foto_ktp.required' => 'Foto KTP wajib diupload',
            'foto_ktp.image' => 'File harus berupa gambar',
            'foto_ktp.max' => 'Ukuran file maksimal 2MB',
            
            'foto_kebun.required_if' => 'Foto kebun wajib untuk tier Petani',
            
            'bukti_pembayaran.required_unless' => 'Bukti pembayaran wajib diupload',
        ];
    }
}
```

---

# PART 9: Buat Service Classes

## 9.1 Buat Service untuk Pendaftaran

```bash
mkdir -p app/Services
```

Buat `app/Services/PendaftaranService.php`:
```php
<?php

namespace App\Services;

use App\Models\Pendaftaran;
use App\Models\Tier;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class PendaftaranService
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Submit pendaftaran baru
     */
    public function submit(array $data, ?UploadedFile $fotoKtp = null, ?UploadedFile $fotoKebun = null, ?UploadedFile $buktiBayar = null): Pendaftaran
    {
        return DB::transaction(function () use ($data, $fotoKtp, $fotoKebun, $buktiBayar) {
            // Cek kuota tier
            $tier = Tier::findOrFail($data['tier_id']);
            if ($tier->isFull()) {
                throw new \Exception("Maaf, kuota untuk {$tier->nama_tier} sudah penuh.");
            }

            // Cek kode referral
            $referrer = null;
            if (!empty($data['kode_referensi'])) {
                $referrer = User::where('kode_unik', $data['kode_referensi'])->first();
                if (!$referrer) {
                    throw new \Exception("Kode referensi tidak valid.");
                }
            }

            // Upload dokumen
            $pathKtp = $fotoKtp ? $this->uploadFile($fotoKtp, 'ktp') : null;
            $pathKebun = $fotoKebun ? $this->uploadFile($fotoKebun, 'kebun') : null;
            $pathBuktiBayar = $buktiBayar ? $this->uploadFile($buktiBayar, 'bukti-bayar') : null;

            // Buat pendaftaran
            $pendaftaran = Pendaftaran::create([
                'no_pendaftaran' => (new Pendaftaran())->generateNoPendaftaran(),
                'tier_id' => $data['tier_id'],
                'referrer_id' => $referrer?->id,
                'kode_referensi' => $data['kode_referensi'] ?? null,
                'nama_lengkap' => $data['nama_lengkap'],
                'nik' => $data['nik'],
                'tempat_lahir' => $data['tempat_lahir'],
                'tanggal_lahir' => $data['tanggal_lahir'],
                'jenis_kelamin' => $data['jenis_kelamin'],
                'alamat' => $data['alamat'],
                'provinsi_id' => $data['provinsi_id'],
                'kabupaten_id' => $data['kabupaten_id'],
                'kecamatan_id' => $data['kecamatan_id'],
                'kelurahan_id' => $data['kelurahan_id'] ?? null,
                'kode_pos' => $data['kode_pos'] ?? null,
                'no_hp' => $data['no_hp'],
                'no_wa' => $data['no_wa'],
                'email' => $data['email'],
                'pekerjaan' => $data['pekerjaan'] ?? null,
                'foto_ktp' => $pathKtp,
                'foto_kebun' => $pathKebun,
                'bukti_pembayaran' => $pathBuktiBayar,
                'status' => $tier->level == 7 ? 'pending' : 'pending', // Petani juga perlu verifikasi
                'nominal_bayar' => $tier->harga_promo, // Harga promo
                'metode_pembayaran' => $data['metode_pembayaran'] ?? null,
            ]);

            // Buat user dengan status pending
            $user = User::create([
                'name' => $data['nama_lengkap'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'nik' => $data['nik'],
                'tempat_lahir' => $data['tempat_lahir'],
                'tanggal_lahir' => $data['tanggal_lahir'],
                'jenis_kelamin' => $data['jenis_kelamin'],
                'alamat' => $data['alamat'],
                'provinsi_id' => $data['provinsi_id'],
                'kabupaten_id' => $data['kabupaten_id'],
                'kecamatan_id' => $data['kecamatan_id'],
                'kelurahan_id' => $data['kelurahan_id'] ?? null,
                'kode_pos' => $data['kode_pos'] ?? null,
                'no_hp' => $data['no_hp'],
                'no_wa' => $data['no_wa'],
                'pekerjaan' => $data['pekerjaan'] ?? null,
                'tier_id' => $data['tier_id'],
                'referrer_id' => $referrer?->id,
                'status_keanggotaan' => 'pending',
                'tanggal_daftar' => now(),
                'foto_ktp' => $pathKtp,
                'foto_kebun' => $pathKebun,
            ]);

            // Generate kode unik
            $user->generateKodeUnik();
            $user->save();

            $pendaftaran->user_id = $user->id;
            $pendaftaran->save();

            // Log aktivitas
            $pendaftaran->addLog('Pendaftaran dibuat', ['user_id' => $user->id]);

            // Kirim notifikasi ke admin
            $this->notificationService->notifyNewRegistration($pendaftaran);

            return $pendaftaran;
        });
    }

    /**
     * Approve pendaftaran
     */
    public function approve(Pendaftaran $pendaftaran, int $verifierId): User
    {
        return DB::transaction(function () use ($pendaftaran, $verifierId) {
            $tier = $pendaftaran->tier;

            // Update pendaftaran
            $pendaftaran->update([
                'status' => 'disetujui',
                'verified_by' => $verifierId,
                'verified_at' => now(),
            ]);

            // Update user
            $user = $pendaftaran->user;
            $user->update([
                'status_keanggotaan' => 'aktif',
                'tanggal_aktif' => now(),
                'tanggal_expired' => now()->addYear(),
            ]);

            // Generate nomor anggota
            $user->generateNoAnggota();
            $user->save();

            // Generate QR Code
            $this->generateQrCode($user);

            // Increment tier counter
            $tier->incrementTerisi();

            // Log
            $pendaftaran->addLog('Pendaftaran disetujui', ['verifier_id' => $verifierId]);

            // Proses komisi jika ada referrer
            if ($user->referrer_id) {
                $this->processKomisi($user);
            }

            // Kirim notifikasi ke user
            $this->notificationService->notifyApproval($user);

            return $user;
        });
    }

    /**
     * Reject pendaftaran
     */
    public function reject(Pendaftaran $pendaftaran, int $verifierId, string $reason): void
    {
        DB::transaction(function () use ($pendaftaran, $verifierId, $reason) {
            $pendaftaran->update([
                'status' => 'ditolak',
                'verified_by' => $verifierId,
                'verified_at' => now(),
                'catatan' => $reason,
            ]);

            $user = $pendaftaran->user;
            $user->update([
                'status_keanggotaan' => 'ditolak',
                'catatan_admin' => $reason,
            ]);

            $pendaftaran->addLog('Pendaftaran ditolak', ['verifier_id' => $verifierId, 'reason' => $reason]);

            $this->notificationService->notifyRejection($user, $reason);
        });
    }

    /**
     * Upload file
     */
    protected function uploadFile(UploadedFile $file, string $type): string
    {
        $filename = $type . '_' . date('YmdHis') . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        return $file->storeAs("documents/{$type}", $filename, 'public');
    }

    /**
     * Generate QR Code
     */
    protected function generateQrCode(User $user): void
    {
        $qrData = json_encode([
            'no_anggota' => $user->no_anggota,
            'nama' => $user->name,
            'tier' => $user->tier->nama_tier,
            'expired' => $user->tanggal_expired->format('Y-m-d'),
        ]);

        $qrImage = QrCode::format('png')->size(300)->generate($qrData);
        $qrPath = "qr-codes/{$user->no_anggota}.png";
        Storage::disk('public')->put($qrPath, $qrImage);

        $user->qr_code = $qrPath;
        $user->save();
    }

    /**
     * Process komisi untuk referrer
     */
    protected function processKomisi(User $user): void
    {
        $tier = $user->tier;
        
        // Komisi Level 1 (Referral langsung)
        if ($user->referrer) {
            Komisi::create([
                'no_komisi' => 'KOM-' . date('YmdHis') . '-' . Str::random(4),
                'user_id' => $user->referrer_id,
                'dari_user_id' => $user->id,
                'pembayaran_id' => $user->pendaftaran->first()->pembayaran->id ?? null,
                'level' => '1',
                'persentase' => 10, // 10% dari harga promo
                'nominal' => $tier->harga_promo * 0.10,
                'status' => 'pending',
            ]);

            // Update total komisi user
            $user->referrer->increment('total_komisi', $tier->harga_promo * 0.10);
            $user->referrer->increment('total_referral');
        }
    }
}
```

## 9.2 Buat NotificationService

Buat `app/Services/NotificationService.php`:
```php
<?php

namespace App\Services;

use App\Models\User;
use App\Models\Pendaftaran;
use App\Models\Jabatan;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewRegistrationNotification;
use App\Notifications\ApprovalNotification;
use App\Notifications\RejectionNotification;

class NotificationService
{
    /**
     * Notify admins about new registration
     */
    public function notifyNewRegistration(Pendaftaran $pendaftaran): void
    {
        // Get all admins and verifikators
        $admins = User::role(['admin', 'superadmin', 'verifikator'])->get();

        // Send notification to each admin
        foreach ($admins as $admin) {
            $admin->notify(new NewRegistrationNotification($pendaftaran));
        }

        // Also send to related pimpinan based on tier
        $this->notifyRelatedPimpinan($pendaftaran);
    }

    /**
     * Notify related pimpinan (upline)
     */
    protected function notifyRelatedPimpinan(Pendaftaran $pendaftaran): void
    {
        // Get pimpinan for the tier level
        $tier = $pendaftaran->tier;
        
        // Find pimpinan in the same area
        $pimpinanList = User::where('tier_id', '<=', $tier->id)
            ->where('status_keanggotaan', 'aktif')
            ->where(function ($query) use ($pendaftaran) {
                $query->where('kabupaten_id', $pendaftaran->kabupaten_id)
                    ->orWhere('provinsi_id', $pendaftaran->provinsi_id);
            })
            ->get();

        foreach ($pimpinanList as $pimpinan) {
            $pimpinan->notify(new NewRegistrationNotification($pendaftaran));
        }
    }

    /**
     * Notify user about approval
     */
    public function notifyApproval(User $user): void
    {
        $user->notify(new ApprovalNotification($user));
    }

    /**
     * Notify user about rejection
     */
    public function notifyRejection(User $user, string $reason): void
    {
        $user->notify(new RejectionNotification($user, $reason));
    }

    /**
     * Notify when position is filled
     */
    public function notifyPositionFilled(Jabatan $jabatan, User $newUser): void
    {
        // Notify all admins
        $admins = User::role(['admin', 'superadmin'])->get();
        
        foreach ($admins as $admin) {
            $admin->notify(new \App\Notifications\PositionFilledNotification($jabatan, $newUser));
        }
    }
}
```

---

# PART 10: Buat Notifications

```bash
php artisan make:notification NewRegistrationNotification
php artisan make:notification ApprovalNotification
php artisan make:notification RejectionNotification
php artisan make:notification PositionFilledNotification
```

Edit `app/Notifications/NewRegistrationNotification.php`:
```php
<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Pendaftaran;

class NewRegistrationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $pendaftaran;

    public function __construct(Pendaftaran $pendaftaran)
    {
        $this->pendaftaran = $pendaftaran;
    }

    public function via($notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Pendaftaran Baru - KNMP')
            ->greeting('Halo ' . $notifiable->name . '!')
            ->line('Ada pendaftaran baru yang membutuhkan verifikasi:')
            ->line('Nama: ' . $this->pendaftaran->nama_lengkap)
            ->line('Tier: ' . $this->pendaftaran->tier->nama_tier)
            ->line('No. Pendaftaran: ' . $this->pendaftaran->no_pendaftaran)
            ->action('Lihat Detail', url('/admin/pendaftaran/' . $this->pendaftaran->id))
            ->line('Segera lakukan verifikasi!');
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'new_registration',
            'title' => 'Pendaftaran Baru',
            'message' => $this->pendaftaran->nama_lengkap . ' mendaftar sebagai ' . $this->pendaftaran->tier->nama_tier,
            'pendaftaran_id' => $this->pendaftaran->id,
            'no_pendaftaran' => $this->pendaftaran->no_pendaftaran,
            'tier' => $this->pendaftaran->tier->nama_tier,
        ];
    }
}
```

---

## ═══════════════════════════════════════════════════════════
## PHASE 2: API IMPLEMENTATION (PART 11-20)
## ═══════════════════════════════════════════════════════════

---

# PART 11: Implementasi AuthController

Edit `app/Http/Controllers/API/AuthController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    /**
     * Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        // Cek status keanggotaan
        if ($user->status_keanggotaan === 'pending') {
            return response()->json([
                'message' => 'Akun Anda masih dalam proses verifikasi.',
                'status' => 'pending',
            ], 403);
        }

        if ($user->status_keanggotaan === 'ditolak') {
            return response()->json([
                'message' => 'Pendaftaran Anda ditolak. Hubungi admin untuk informasi lebih lanjut.',
                'status' => 'rejected',
            ], 403);
        }

        if ($user->status_keanggotaan === 'nonaktif') {
            return response()->json([
                'message' => 'Akun Anda tidak aktif. Hubungi admin.',
                'status' => 'inactive',
            ], 403);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user->load(['tier', 'roles', 'jabatan']),
            'token' => $token,
        ]);
    }

    /**
     * Register (untuk pendaftaran publik)
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
            'nik' => 'required|string|size:16|unique:users,nik',
            'no_hp' => 'required|string|max:15',
            'no_wa' => 'required|string|max:15',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'nik' => $validated['nik'],
            'no_hp' => $validated['no_hp'],
            'no_wa' => $validated['no_wa'],
            'status_keanggotaan' => 'pending',
            'tanggal_daftar' => now(),
        ]);

        $user->generateKodeUnik();
        $user->save();

        // Assign role member
        $user->assignRole('member');

        return response()->json([
            'message' => 'Registrasi berhasil. Silakan lengkapi pendaftaran.',
            'user' => $user,
        ], 201);
    }

    /**
     * Get current user
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load(['tier', 'roles', 'jabatan', 'referrer', 'struktur']),
        ]);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    /**
     * Forgot Password
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Implement password reset logic here
        // ...

        return response()->json([
            'message' => 'Link reset password telah dikirim ke email Anda.',
        ]);
    }

    /**
     * Change Password
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|confirmed|min:8',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Password lama tidak sesuai.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return response()->json([
            'message' => 'Password berhasil diubah.',
        ]);
    }

    /**
     * Update Profile
     */
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'no_hp' => 'sometimes|string|max:15',
            'no_wa' => 'sometimes|string|max:15',
            'alamat' => 'sometimes|string|max:500',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'message' => 'Profil berhasil diperbarui.',
            'user' => $request->user()->fresh(),
        ]);
    }
}
```

---

# PART 12: Implementasi PendaftaranController

Edit `app/Http/Controllers/API/PendaftaranController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PendaftaranRequest;
use App\Models\Pendaftaran;
use App\Models\Tier;
use App\Models\User;
use App\Services\PendaftaranService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PendaftaranController extends Controller
{
    protected $pendaftaranService;

    public function __construct(PendaftaranService $pendaftaranService)
    {
        $this->pendaftaranService = $pendaftaranService;
    }

    /**
     * Submit pendaftaran baru
     */
    public function submit(PendaftaranRequest $request): JsonResponse
    {
        try {
            $pendaftaran = $this->pendaftaranService->submit(
                $request->validated(),
                $request->file('foto_ktp'),
                $request->file('foto_kebun'),
                $request->file('bukti_pembayaran')
            );

            return response()->json([
                'message' => 'Pendaftaran berhasil dikirim. Silakan tunggu verifikasi.',
                'data' => $pendaftaran->load(['tier']),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Check if NIK already registered
     */
    public function checkNik(string $nik): JsonResponse
    {
        $exists = User::where('nik', $nik)->exists() || Pendaftaran::where('nik', $nik)->exists();

        return response()->json([
            'available' => !$exists,
            'message' => $exists ? 'NIK sudah terdaftar.' : 'NIK tersedia.',
        ]);
    }

    /**
     * Check if email already registered
     */
    public function checkEmail(string $email): JsonResponse
    {
        $exists = User::where('email', $email)->exists() || Pendaftaran::where('email', $email)->exists();

        return response()->json([
            'available' => !$exists,
            'message' => $exists ? 'Email sudah terdaftar.' : 'Email tersedia.',
        ]);
    }

    /**
     * Check kode referral
     */
    public function checkKodeReferral(string $kode): JsonResponse
    {
        $user = User::where('kode_unik', strtoupper($kode))->first();

        if (!$user) {
            return response()->json([
                'valid' => false,
                'message' => 'Kode referensi tidak valid.',
            ]);
        }

        return response()->json([
            'valid' => true,
            'message' => 'Kode referensi valid.',
            'data' => [
                'nama' => $user->name,
                'tier' => $user->tier->nama_tier ?? '-',
            ],
        ]);
    }

    /**
     * Track pendaftaran status
     */
    public function track(string $noPendaftaran): JsonResponse
    {
        $pendaftaran = Pendaftaran::where('no_pendaftaran', $noPendaftaran)
            ->with(['tier', 'verifier'])
            ->first();

        if (!$pendaftaran) {
            return response()->json([
                'message' => 'Data pendaftaran tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'data' => $pendaftaran,
        ]);
    }

    /**
     * Get all pendaftaran (for admin)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Pendaftaran::with(['tier', 'user', 'verifier'])
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by tier
        if ($request->has('tier_id')) {
            $query->where('tier_id', $request->tier_id);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%")
                    ->orWhere('no_pendaftaran', 'like', "%{$search}%");
            });
        }

        $pendaftaran = $query->paginate($request->per_page ?? 15);

        return response()->json($pendaftaran);
    }

    /**
     * Get pendaftaran detail
     */
    public function show(int $id): JsonResponse
    {
        $pendaftaran = Pendaftaran::with(['tier', 'user', 'verifier', 'referrer'])
            ->findOrFail($id);

        return response()->json([
            'data' => $pendaftaran,
        ]);
    }

    /**
     * Update pendaftaran
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $pendaftaran = Pendaftaran::findOrFail($id);

        // Only allow update if status is draft or pending
        if (!in_array($pendaftaran->status, ['draft', 'pending'])) {
            return response()->json([
                'message' => 'Pendaftaran tidak dapat diubah karena sudah diproses.',
            ], 400);
        }

        $pendaftaran->update($request->only([
            'alamat', 'no_hp', 'no_wa', 'pekerjaan',
        ]));

        return response()->json([
            'message' => 'Data pendaftaran berhasil diperbarui.',
            'data' => $pendaftaran->fresh(),
        ]);
    }

    /**
     * Delete pendaftaran (soft delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $pendaftaran = Pendaftaran::findOrFail($id);

        if (!in_array($pendaftaran->status, ['draft', 'ditolak'])) {
            return response()->json([
                'message' => 'Pendaftaran tidak dapat dihapus.',
            ], 400);
        }

        $pendaftaran->delete();

        return response()->json([
            'message' => 'Data pendaftaran berhasil dihapus.',
        ]);
    }
}
```

---

# PART 13: Implementasi TierController

Edit `app/Http/Controllers/API/TierController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TierController extends Controller
{
    /**
     * Get all tiers
     */
    public function index(): JsonResponse
    {
        $tiers = Tier::where('is_active', true)
            ->orderBy('level')
            ->get()
            ->map(function ($tier) {
                return [
                    'id' => $tier->id,
                    'nama_tier' => $tier->nama_tier,
                    'kode_tier' => $tier->kode_tier,
                    'level' => $tier->level,
                    'deskripsi' => $tier->deskripsi,
                    'harga' => [
                        'normal' => $tier->harga_normal,
                        'early_bird' => $tier->harga_early_bird,
                        'promo' => $tier->harga_promo,
                        'diskon_early_bird' => $tier->harga_normal > 0 ? round((1 - $tier->harga_early_bird / $tier->harga_normal) * 100) : 0,
                        'diskon_promo' => $tier->harga_normal > 0 ? round((1 - $tier->harga_promo / $tier->harga_normal) * 100) : 0,
                    ],
                    'kuota' => [
                        'total' => $tier->kuota,
                        'terisi' => $tier->terisi,
                        'sisa' => $tier->sisaKuota(),
                        'is_full' => $tier->isFull(),
                    ],
                    'warna' => $tier->warna,
                    'icon' => $tier->icon,
                    'benefits' => $tier->benefits,
                    'requirements' => $tier->requirements,
                ];
            });

        return response()->json([
            'data' => $tiers,
        ]);
    }

    /**
     * Get tier detail
     */
    public function show(int $id): JsonResponse
    {
        $tier = Tier::withCount(['users as total_anggota' => function ($query) {
            $query->where('status_keanggotaan', 'aktif');
        }])->findOrFail($id);

        return response()->json([
            'data' => $tier,
        ]);
    }

    /**
     * Check tier availability
     */
    public function checkAvailability(int $id): JsonResponse
    {
        $tier = Tier::findOrFail($id);

        return response()->json([
            'tier' => $tier->nama_tier,
            'available' => !$tier->isFull(),
            'kuota' => [
                'total' => $tier->kuota,
                'terisi' => $tier->terisi,
                'sisa' => $tier->sisaKuota(),
            ],
            'message' => $tier->isFull() 
                ? "Maaf, kuota {$tier->nama_tier} sudah penuh." 
                : "Kuota tersedia.",
        ]);
    }

    /**
     * Store new tier (admin only)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama_tier' => 'required|string|max:255',
            'kode_tier' => 'required|string|max:10|unique:tiers',
            'level' => 'required|integer|unique:tiers',
            'deskripsi' => 'nullable|string',
            'harga_normal' => 'required|numeric|min:0',
            'harga_early_bird' => 'required|numeric|min:0',
            'harga_promo' => 'required|numeric|min:0',
            'kuota' => 'nullable|integer|min:0',
            'warna' => 'required|string|max:7',
            'benefits' => 'nullable|array',
            'requirements' => 'nullable|array',
        ]);

        $tier = Tier::create($validated);

        return response()->json([
            'message' => 'Tier berhasil dibuat.',
            'data' => $tier,
        ], 201);
    }

    /**
     * Update tier (admin only)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $tier = Tier::findOrFail($id);

        $validated = $request->validate([
            'nama_tier' => 'sometimes|string|max:255',
            'kode_tier' => 'sometimes|string|max:10|unique:tiers,kode_tier,' . $id,
            'level' => 'sometimes|integer|unique:tiers,level,' . $id,
            'deskripsi' => 'nullable|string',
            'harga_normal' => 'sometimes|numeric|min:0',
            'harga_early_bird' => 'sometimes|numeric|min:0',
            'harga_promo' => 'sometimes|numeric|min:0',
            'kuota' => 'nullable|integer|min:0',
            'warna' => 'sometimes|string|max:7',
            'benefits' => 'nullable|array',
            'requirements' => 'nullable|array',
            'is_active' => 'sometimes|boolean',
        ]);

        $tier->update($validated);

        return response()->json([
            'message' => 'Tier berhasil diperbarui.',
            'data' => $tier->fresh(),
        ]);
    }

    /**
     * Delete tier (admin only)
     */
    public function destroy(int $id): JsonResponse
    {
        $tier = Tier::findOrFail($id);

        // Check if tier has members
        if ($tier->terisi > 0) {
            return response()->json([
                'message' => 'Tier tidak dapat dihapus karena sudah ada anggota.',
            ], 400);
        }

        $tier->delete();

        return response()->json([
            'message' => 'Tier berhasil dihapus.',
        ]);
    }
}
```

---

# PART 14: Implementasi VerifikasiController

Edit `app/Http/Controllers/API/VerifikasiController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use App\Services\PendaftaranService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VerifikasiController extends Controller
{
    protected $pendaftaranService;

    public function __construct(PendaftaranService $pendaftaranService)
    {
        $this->pendaftaranService = $pendaftaranService;
    }

    /**
     * Get pending verifications
     */
    public function pending(Request $request): JsonResponse
    {
        $query = Pendaftaran::with(['tier', 'user'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc'); // FIFO - first in first out

        // Filter by tier
        if ($request->has('tier_id')) {
            $query->where('tier_id', $request->tier_id);
        }

        $pendaftaran = $query->paginate($request->per_page ?? 20);

        return response()->json($pendaftaran);
    }

    /**
     * Approve pendaftaran
     */
    public function approve(Request $request, int $id): JsonResponse
    {
        $pendaftaran = Pendaftaran::findOrFail($id);

        if ($pendaftaran->status !== 'pending') {
            return response()->json([
                'message' => 'Pendaftaran sudah diproses.',
            ], 400);
        }

        // Check tier availability
        if ($pendaftaran->tier->isFull()) {
            return response()->json([
                'message' => "Maaf, kuota {$pendaftaran->tier->nama_tier} sudah penuh.",
            ], 400);
        }

        try {
            $user = $this->pendaftaranService->approve($pendaftaran, $request->user()->id);

            return response()->json([
                'message' => 'Pendaftaran berhasil disetujui.',
                'data' => [
                    'user' => $user->load(['tier']),
                    'pendaftaran' => $pendaftaran->fresh(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Reject pendaftaran
     */
    public function reject(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $pendaftaran = Pendaftaran::findOrFail($id);

        if ($pendaftaran->status !== 'pending') {
            return response()->json([
                'message' => 'Pendaftaran sudah diproses.',
            ], 400);
        }

        $this->pendaftaranService->reject($pendaftaran, $request->user()->id, $request->reason);

        return response()->json([
            'message' => 'Pendaftaran ditolak.',
            'data' => $pendaftaran->fresh(),
        ]);
    }

    /**
     * Bulk approve
     */
    public function bulkApprove(Request $request): JsonResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:pendaftaran,id',
        ]);

        $approved = [];
        $failed = [];

        foreach ($request->ids as $id) {
            $pendaftaran = Pendaftaran::find($id);

            if (!$pendaftaran || $pendaftaran->status !== 'pending') {
                $failed[] = ['id' => $id, 'reason' => 'Tidak ditemukan atau sudah diproses'];
                continue;
            }

            if ($pendaftaran->tier->isFull()) {
                $failed[] = ['id' => $id, 'reason' => 'Kuota tier penuh'];
                continue;
            }

            try {
                $this->pendaftaranService->approve($pendaftaran, $request->user()->id);
                $approved[] = $id;
            } catch (\Exception $e) {
                $failed[] = ['id' => $id, 'reason' => $e->getMessage()];
            }
        }

        return response()->json([
            'message' => count($approved) . ' pendaftaran berhasil disetujui.',
            'approved' => $approved,
            'failed' => $failed,
        ]);
    }
}
```

---

# PART 15: Implementasi StrukturController

Edit `app/Http/Controllers/API/StrukturController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\StrukturOrganisasi;
use App\Models\Jabatan;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StrukturController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Get organisational structure tree
     */
    public function tree(): JsonResponse
    {
        // Get all active struktur
        $struktur = StrukturOrganisasi::with(['user', 'jabatan', 'wilayah'])
            ->where('status', 'aktif')
            ->orderBy('jabatan_id')
            ->get();

        // Build tree structure
        $tree = $this->buildTree($struktur);

        return response()->json([
            'data' => $tree,
        ]);
    }

    /**
     * Build hierarchical tree
     */
    protected function buildTree($struktur, $parentId = null): array
    {
        $tree = [];

        foreach ($struktur->where('parent_id', $parentId) as $item) {
            $node = [
                'id' => $item->id,
                'user' => $item->user,
                'jabatan' => $item->jabatan,
                'wilayah' => $item->wilayah,
                'tanggal_mulai' => $item->tanggal_mulai,
                'children' => $this->buildTree($struktur, $item->id),
            ];
            $tree[] = $node;
        }

        return $tree;
    }

    /**
     * Get struktur by jabatan
     */
    public function byJabatan(int $jabatanId): JsonResponse
    {
        $jabatan = Jabatan::findOrFail($jabatanId);

        $struktur = StrukturOrganisasi::with(['user.tier', 'wilayah'])
            ->where('jabatan_id', $jabatanId)
            ->where('status', 'aktif')
            ->get();

        return response()->json([
            'jabatan' => $jabatan,
            'data' => $struktur,
            'kuota' => [
                'total' => $jabatan->kuota,
                'terisi' => $struktur->count(),
                'sisa' => max(0, $jabatan->kuota - $struktur->count()),
                'is_full' => $struktur->count() >= $jabatan->kuota,
            ],
        ]);
    }

    /**
     * Assign user to jabatan
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'jabatan_id' => 'required|exists:jabatan,id',
            'parent_id' => 'nullable|exists:struktur_organisasi,id',
            'wilayah_id' => 'nullable|exists:wilayah,id',
            'tanggal_mulai' => 'required|date',
        ]);

        $jabatan = Jabatan::findOrFail($request->jabatan_id);
        $user = User::findOrFail($request->user_id);

        // Check if jabatan is full
        $currentCount = StrukturOrganisasi::where('jabatan_id', $request->jabatan_id)
            ->where('status', 'aktif')
            ->count();

        if ($currentCount >= $jabatan->kuota) {
            return response()->json([
                'message' => "Maaf, kuota untuk {$jabatan->nama_jabatan} sudah penuh.",
            ], 400);
        }

        // Check if user already has position
        $existingPosition = StrukturOrganisasi::where('user_id', $request->user_id)
            ->where('status', 'aktif')
            ->first();

        if ($existingPosition) {
            return response()->json([
                'message' => "User sudah menjabat sebagai {$existingPosition->jabatan->nama_jabatan}.",
            ], 400);
        }

        $struktur = StrukturOrganisasi::create([
            'user_id' => $request->user_id,
            'jabatan_id' => $request->jabatan_id,
            'parent_id' => $request->parent_id,
            'wilayah_id' => $request->wilayah_id,
            'tanggal_mulai' => $request->tanggal_mulai,
            'status' => 'aktif',
        ]);

        // Update jabatan terisi counter
        $jabatan->increment('terisi');

        // Notify if position is filled
        if ($jabatan->kuota > 0 && $currentCount + 1 >= $jabatan->kuota) {
            $this->notificationService->notifyPositionFilled($jabatan, $user);
        }

        return response()->json([
            'message' => "User berhasil diangkat sebagai {$jabatan->nama_jabatan}.",
            'data' => $struktur->load(['user', 'jabatan', 'wilayah']),
        ], 201);
    }

    /**
     * Remove user from jabatan
     */
    public function destroy(int $id): JsonResponse
    {
        $struktur = StrukturOrganisasi::findOrFail($id);

        $struktur->update([
            'status' => 'nonaktif',
            'tanggal_selesai' => now(),
        ]);

        $struktur->jabatan->decrement('terisi');

        return response()->json([
            'message' => 'User berhasil dicabut dari jabatan.',
        ]);
    }
}
```

---

# PART 16: Implementasi DashboardController

Edit `app/Http/Controllers/API/DashboardController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Pendaftaran;
use App\Models\Tier;
use App\Models\Pembayaran;
use App\Models\Komisi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;

class DashboardController extends Controller
{
    /**
     * Public statistics
     */
    public function publicStats(): JsonResponse
    {
        $stats = [
            'total_anggota' => User::where('status_keanggotaan', 'aktif')->count(),
            'total_provinsi' => User::where('status_keanggotaan', 'aktif')
                ->distinct('provinsi_id')->count('provinsi_id'),
            'total_kabupaten' => User::where('status_keanggotaan', 'aktif')
                ->distinct('kabupaten_id')->count('kabupaten_id'),
            'tier_stats' => Tier::withCount(['users as anggota_aktif' => function ($q) {
                $q->where('status_keanggotaan', 'aktif');
            }])->orderBy('level')->get(['id', 'nama_tier', 'kode_tier', 'kuota', 'terisi', 'warna']),
        ];

        return response()->json($stats);
    }

    /**
     * Admin dashboard statistics
     */
    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        // Base stats
        $stats = [
            'pendaftaran_pending' => Pendaftaran::where('status', 'pending')->count(),
            'pendaftaran_hari_ini' => Pendaftaran::whereDate('created_at', today())->count(),
            'anggota_aktif' => User::where('status_keanggotaan', 'aktif')->count(),
            'anggota_baru_bulan_ini' => User::where('status_keanggotaan', 'aktif')
                ->whereMonth('tanggal_aktif', now()->month)
                ->whereYear('tanggal_aktif', now()->year)
                ->count(),
        ];

        // Finance stats (for admin/treasurer)
        if ($user->hasRole(['admin', 'superadmin', 'bendahara'])) {
            $stats['pembayaran'] = [
                'total_bulan_ini' => Pembayaran::where('status', 'sukses')
                    ->whereMonth('created_at', now()->month)
                    ->sum('total_bayar'),
                'pending_verifikasi' => Pembayaran::where('status', 'pending')->count(),
            ];

            $stats['komisi'] = [
                'total_pending' => Komisi::where('status', 'pending')->sum('nominal'),
                'total_dicairkan' => Komisi::where('status', 'dicairkan')
                    ->whereMonth('tanggal_cair', now()->month)
                    ->sum('nominal'),
            ];
        }

        // My stats (for member)
        if ($user->hasRole('member')) {
            $stats['my_stats'] = [
                'total_referral' => $user->total_referral,
                'total_komisi' => $user->total_komisi,
                'komisi_pending' => Komisi::where('user_id', $user->id)
                    ->where('status', 'pending')->sum('nominal'),
            ];
        }

        return response()->json($stats);
    }

    /**
     * Chart data
     */
    public function charts(Request $request): JsonResponse
    {
        $user = $request->user();

        // Pendaftaran per bulan (12 bulan terakhir)
        $pendaftaranChart = Pendaftaran::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('YEAR(created_at) as year'),
            DB::raw('COUNT(*) as total')
        )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        // Anggota per tier
        $tierChart = Tier::withCount(['users as total' => function ($q) {
            $q->where('status_keanggotaan', 'aktif');
        }])->orderBy('level')->get(['id', 'nama_tier', 'warna']);

        // Anggota per provinsi (top 10)
        $provinsiChart = User::select('provinsi_id', DB::raw('COUNT(*) as total'))
            ->where('status_keanggotaan', 'aktif')
            ->whereNotNull('provinsi_id')
            ->groupBy('provinsi_id')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return response()->json([
            'pendaftaran_per_bulan' => $pendaftaranChart,
            'anggota_per_tier' => $tierChart,
            'anggota_per_provinsi' => $provinsiChart,
        ]);
    }

    /**
     * Recent activities
     */
    public function recentActivities(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 20);

        $activities = [];

        // Recent registrations
        $recentRegs = Pendaftaran::with(['user', 'tier'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'type' => 'registration',
                    'title' => 'Pendaftaran Baru',
                    'description' => "{$item->nama_lengkap} mendaftar sebagai {$item->tier->nama_tier}",
                    'timestamp' => $item->created_at,
                    'data' => $item,
                ];
            });

        // Recent approvals
        $recentApprovals = Pendaftaran::with(['user', 'tier', 'verifier'])
            ->where('status', 'disetujui')
            ->orderBy('verified_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'type' => 'approval',
                    'title' => 'Pendaftaran Disetujui',
                    'description' => "{$item->nama_lengkap} disetujui sebagai {$item->tier->nama_tier}",
                    'timestamp' => $item->verified_at,
                    'data' => $item,
                ];
            });

        // Merge and sort
        $activities = $recentRegs->merge($recentApprovals)
            ->sortByDesc('timestamp')
            ->take($limit)
            ->values();

        return response()->json([
            'data' => $activities,
        ]);
    }
}
```

---

# PART 17: Implementasi NotificationController

Edit `app/Http/Controllers/API/NotificationController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    /**
     * Get user notifications
     */
    public function index(Request $request): JsonResponse
    {
        $notifications = $request->user()
            ->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 20);

        return response()->json($notifications);
    }

    /**
     * Get unread count
     */
    public function unreadCount(Request $request): JsonResponse
    {
        $count = $request->user()->unreadNotifications()->count();

        return response()->json([
            'unread_count' => $count,
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Request $request, string $id): JsonResponse
    {
        $notification = $request->user()
            ->notifications()
            ->where('id', $id)
            ->first();

        if (!$notification) {
            return response()->json([
                'message' => 'Notifikasi tidak ditemukan.',
            ], 404);
        }

        $notification->markAsRead();

        return response()->json([
            'message' => 'Notifikasi ditandai sudah dibaca.',
        ]);
    }

    /**
     * Mark all as read
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json([
            'message' => 'Semua notifikasi ditandai sudah dibaca.',
        ]);
    }
}
```

---

# PART 18: Implementasi PembayaranController

Edit `app/Http/Controllers/API/PembayaranController.php`:
```php
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class PembayaranController extends Controller
{
    /**
     * List pembayaran
     */
    public function index(Request $request): JsonResponse
    {
        $query = Pembayaran::with(['user.tier'])
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by user
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // For member, only show their own payments
        if ($request->user()->hasRole('member')) {
            $query->where('user_id', $request->user()->id);
        }

        $pembayaran = $query->paginate($request->per_page ?? 20);

        return response()->json($pembayaran);
    }

    /**
     * Create pembayaran
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jenis' => 'required|in:pendaftaran,perpanjangan,lainnya',
            'nominal' => 'required|numeric|min:0',
            'metode_pembayaran' => 'required|string',
            'pendaftaran_id' => 'nullable|exists:pendaftaran,id',
        ]);

        $pembayaran = Pembayaran::create([
            'no_transaksi' => 'TRX-' . date('YmdHis') . '-' . Str::random(4),
            'user_id' => $request->user()->id,
            'pendaftaran_id' => $request->pendaftaran_id,
            'jenis' => $request->jenis,
            'nominal' => $request->nominal,
            'total_bayar' => $request->nominal,
            'metode_pembayaran' => $request->metode_pembayaran,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Transaksi berhasil dibuat.',
            'data' => $pembayaran,
        ], 201);
    }

    /**
     * Upload bukti pembayaran
     */
    public function uploadBukti(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'bukti' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $pembayaran = Pembayaran::findOrFail($id);

        if ($pembayaran->user_id !== $request->user()->id && !$request->user()->hasRole(['admin', 'superadmin'])) {
            return response()->json([
                'message' => 'Tidak diizinkan.',
            ], 403);
        }

        $path = $request->file('bukti')->store('bukti-pembayaran', 'public');

        $pembayaran->update([
            'bukti_pembayaran' => $path,
            'status' => 'verifikasi',
        ]);

        return response()->json([
            'message' => 'Bukti pembayaran berhasil diupload.',
            'data' => $pembayaran->fresh(),
        ]);
    }

    /**
     * Verify pembayaran (admin only)
     */
    public function verify(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:sukses,gagal',
            'catatan' => 'nullable|string',
        ]);

        $pembayaran = Pembayaran::findOrFail($id);

        if ($pembayaran->status === 'sukses') {
            return response()->json([
                'message' => 'Pembayaran sudah diverifikasi.',
            ], 400);
        }

        $pembayaran->update([
            'status' => $request->status,
            'verified_by' => $request->user()->id,
            'tanggal_verifikasi' => now(),
            'catatan' => $request->catatan,
        ]);

        // If payment success, activate user
        if ($request->status === 'sukses') {
            $user = $pembayaran->user;
            if ($user->status_keanggotaan === 'pending') {
                $user->update([
                    'status_keanggotaan' => 'aktif',
                    'tanggal_aktif' => now(),
                    'tanggal_expired' => now()->addYear(),
                ]);
                $user->generateNoAnggota();
                $user->save();
            }
        }

        return response()->json([
            'message' => 'Pembayaran berhasil diverifikasi.',
            'data' => $pembayaran->fresh(),
        ]);
    }
}
```

---

# PART 19: Setup CORS & Middleware

## 19.1 Setup CORS

Edit `config/cors.php`:
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://kopnusa.id',
        'https://www.kopnusa.id',
        'https://admin.kopnusa.id',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## 19.2 Create Middleware untuk API Key (Optional)

```bash
php artisan make:middleware ApiKeyMiddleware
```

Edit `app/Http/Middleware/ApiKeyMiddleware.php`:
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-KEY');
        
        if ($apiKey !== config('app.api_key')) {
            return response()->json([
                'message' => 'Invalid API Key',
            ], 401);
        }

        return $next($request);
    }
}
```

## 19.3 Register Middleware

Edit `app/Http/Kernel.php`:
```php
protected $middlewareAliases = [
    // ... existing aliases
    'api.key' => \App\Http\Middleware\ApiKeyMiddleware::class,
];
```

---

# PART 20: Setup API Documentation (Swagger)

## 20.1 Generate Swagger Documentation

Edit `config/l5-swagger.php`:
```php
<?php

return [
    'default' => 'v1',
    'documentations' => [
        'v1' => [
            'api' => [
                'title' => 'KNMP API Documentation',
                'description' => 'API Documentation for KNMP (Koperasi Nusantara Merdeka Putra)',
                'version' => '1.0.0',
            ],
            'routes' => [
                'api' => 'api/documentation',
            ],
            'paths' => [
                'annotations' => [
                    base_path('app'),
                ],
            ],
        ],
    ],
];
```

## 20.2 Add Swagger Annotations to Controller

Tambahkan di awal `app/Http/Controllers/API/AuthController.php`:
```php
/**
 * @OA\Info(
 *     title="KNMP API",
 *     version="1.0.0",
 *     description="API Documentation for KNMP",
 *     @OA\Contact(
 *         email="admin@kopnusa.id"
 *     )
 * )
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="KNMP API Server"
 * )
 */

/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="User login",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email","password","device_name"},
 *             @OA\Property(property="email", type="string", format="email"),
 *             @OA\Property(property="password", type="string"),
 *             @OA\Property(property="device_name", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Login successful"
 *     )
 * )
 */
```

## 20.3 Generate Documentation

```bash
php artisan l5-swagger:generate
```

Akses dokumentasi: `http://localhost:8000/api/documentation`

---

## ═══════════════════════════════════════════════════════════
## PHASE 3: ADMIN PANEL & INTEGRATION (PART 21-30)
## ═══════════════════════════════════════════════════════════

---

# PART 21: Install Laravel Filament (Admin Panel)

## 21.1 Install Filament

```bash
composer require filament/filament:"^3.2"
```

## 21.2 Publish Filament Assets

```bash
php artisan filament:install --panels
```

## 21.3 Create Admin User

```bash
php artisan make:filament-user
```

Isi form:
- Name: Super Admin
- Email: admin@kopnusa.id
- Password: (password yang diinginkan)

## 21.4 Access Admin Panel

Buka: `http://localhost:8000/admin`

---

# PART 22: Create Filament Resources

## 22.1 Create User Resource

```bash
php artisan make:filament-resource User --generate
```

Edit `app/Filament/Resources/UserResource.php`:
```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Manajemen Anggota';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data Pribadi')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('nik')
                            ->label('NIK')
                            ->required()
                            ->length(16)
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true),
                        Forms\Components\Select::make('jenis_kelamin')
                            ->options([
                                'L' => 'Laki-laki',
                                'P' => 'Perempuan',
                            ])
                            ->required(),
                        Forms\Components\DatePicker::make('tanggal_lahir'),
                        Forms\Components\TextInput::make('tempat_lahir'),
                    ])->columns(2),

                Forms\Components\Section::make('Alamat')
                    ->schema([
                        Forms\Components\Textarea::make('alamat'),
                        Forms\Components\TextInput::make('provinsi_id'),
                        Forms\Components\TextInput::make('kabupaten_id'),
                        Forms\Components\TextInput::make('kecamatan_id'),
                        Forms\Components\TextInput::make('kelurahan_id'),
                    ])->columns(2),

                Forms\Components\Section::make('Keanggotaan')
                    ->schema([
                        Forms\Components\Select::make('tier_id')
                            ->relationship('tier', 'nama_tier')
                            ->required(),
                        Forms\Components\Select::make('status_keanggotaan')
                            ->options([
                                'pending' => 'Pending',
                                'aktif' => 'Aktif',
                                'nonaktif' => 'Non-Aktif',
                                'ditolak' => 'Ditolak',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('no_anggota')
                            ->readOnly(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('no_anggota')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tier.nama_tier')
                    ->badge()
                    ->color(fn ($record) => $record->tier?->warna ?? 'gray'),
                Tables\Columns\BadgeColumn::make('status_keanggotaan')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'aktif',
                        'danger' => 'ditolak',
                        'secondary' => 'nonaktif',
                    ]),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('tier')
                    ->relationship('tier', 'nama_tier'),
                Tables\Filters\SelectFilter::make('status_keanggotaan')
                    ->options([
                        'pending' => 'Pending',
                        'aktif' => 'Aktif',
                        'nonaktif' => 'Non-Aktif',
                        'ditolak' => 'Ditolak',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'view' => Pages\ViewUser::route('/{record}'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
```

## 22.2 Create Pendaftaran Resource

```bash
php artisan make:filament-resource Pendaftaran --generate
```

## 22.3 Create Tier Resource

```bash
php artisan make:filament-resource Tier --generate
```

---

# PART 23: Create Custom Filament Widgets

## 23.1 Create Stats Widget

```bash
php artisan make:filament-widget StatsOverviewWidget
```

Edit `app/Filament/Widgets/StatsOverviewWidget.php`:
```php
<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\Pendaftaran;
use App\Models\Pembayaran;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Anggota Aktif', User::where('status_keanggotaan', 'aktif')->count())
                ->description(User::whereMonth('tanggal_aktif', now()->month)->count() . ' bulan ini')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
            
            Stat::make('Pendaftaran Pending', Pendaftaran::where('status', 'pending')->count())
                ->description('Perlu verifikasi')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),
            
            Stat::make('Pemasukan Bulan Ini', 'Rp ' . number_format(
                Pembayaran::where('status', 'sukses')
                    ->whereMonth('created_at', now()->month)
                    ->sum('total_bayar'),
                0, ',', '.'
            ))
                ->description('Total pembayaran sukses')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('primary'),
        ];
    }
}
```

## 23.2 Create Chart Widget

```bash
php artisan make:filament-widget PendaftaranChartWidget
```

---

# PART 24: Setup File Storage

## 24.1 Configure Filesystem

Edit `config/filesystems.php`:
```php
'disks' => [
    'local' => [
        'driver' => 'local',
        'root' => storage_path('app'),
        'throw' => false,
    ],

    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL') . '/storage',
        'visibility' => 'public',
        'throw' => false,
    ],

    // Untuk shared hosting
    'shared' => [
        'driver' => 'local',
        'root' => public_path('uploads'),
        'url' => env('APP_URL') . '/uploads',
        'visibility' => 'public',
    ],
],
```

## 24.2 Create Storage Link

```bash
php artisan storage:link
```

---

# PART 25: Database Seeder

## 25.1 Create DatabaseSeeder

Edit `database/seeders/DatabaseSeeder.php`:
```php
<?php

namespace Database\Seeders;

use App\Models\Tier;
use App\Models\Jabatan;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Roles
        $roles = ['superadmin', 'admin', 'verifikator', 'bendahara', 'member'];
        foreach ($roles as $role) {
            Role::create(['name' => $role, 'guard_name' => 'web']);
        }

        // Seed Tiers
        $tiers = Tier::getDefaultTiers();
        foreach ($tiers as $tier) {
            Tier::create($tier);
        }

        // Seed Jabatan
        $jabatanData = [
            ['nama_jabatan' => 'Panglima Besar', 'kode_jabatan' => 'PB', 'level' => 1, 'kuota' => 1],
            ['nama_jabatan' => 'Panglima Wilayah', 'kode_jabatan' => 'PW', 'level' => 2, 'kuota' => 34],
            ['nama_jabatan' => 'Panglima Distrik', 'kode_jabatan' => 'PD', 'level' => 3, 'kuota' => 514],
            ['nama_jabatan' => 'Panglima Camat', 'kode_jabatan' => 'PC', 'level' => 4, 'kuota' => 7000],
            ['nama_jabatan' => 'Panglima Desa', 'kode_jabatan' => 'PDES', 'level' => 5, 'kuota' => 80000],
        ];

        foreach ($jabatanData as $jabatan) {
            Jabatan::create($jabatan);
        }

        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@kopnusa.id',
            'password' => bcrypt('password123'),
            'status_keanggotaan' => 'aktif',
            'tanggal_daftar' => now(),
            'tanggal_aktif' => now(),
        ]);
        $superAdmin->assignRole('superadmin');
    }
}
```

## 25.2 Run Seeder

```bash
php artisan db:seed
```

---

# PART 26: Integration dengan Next.js Frontend

## 26.1 Update Next.js Environment Variables

Edit `.env.local` di project Next.js:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STORAGE_URL=http://localhost:8000/storage
```

## 26.2 Create API Service di Next.js

Buat `src/lib/api.ts`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Get token from localStorage if in browser
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    }

    return { data, message: data.message };
  }

  // Auth
  async login(email: string, password: string, deviceName: string) {
    return this.request<{ user: any; token: string }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, device_name: deviceName }),
    });
  }

  async logout() {
    const result = await this.request('/logout', { method: 'POST' });
    this.setToken(null);
    return result;
  }

  async getMe() {
    return this.request<{ user: any }>('/me');
  }

  // Tiers
  async getTiers() {
    return this.request<{ data: any[] }>('/tiers');
  }

  async checkTierAvailability(tierId: number) {
    return this.request<{ tier: string; available: boolean }>(`/tiers/check-availability/${tierId}`);
  }

  // Pendaftaran
  async checkNik(nik: string) {
    return this.request<{ available: boolean }>(`/pendaftaran/check-nik/${nik}`);
  }

  async checkEmail(email: string) {
    return this.request<{ available: boolean }>(`/pendaftaran/check-email/${email}`);
  }

  async checkKodeReferral(kode: string) {
    return this.request<{ valid: boolean; data?: { nama: string; tier: string } }>(
      `/pendaftaran/check-kode-referral/${kode}`
    );
  }

  async submitPendaftaran(formData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/pendaftaran/submit`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  async trackPendaftaran(noPendaftaran: string) {
    return this.request<{ data: any }>(`/pendaftaran/track/${noPendaftaran}`);
  }

  // Dashboard
  async getPublicStats() {
    return this.request<any>('/stats');
  }

  async getDashboardStats() {
    return this.request<any>('/dashboard/stats');
  }

  // Notifications
  async getNotifications(page = 1) {
    return this.request<any>(`/notifications?page=${page}`);
  }

  async getUnreadCount() {
    return this.request<{ unread_count: number }>('/notifications/unread-count');
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: 'POST' });
  }
}

export const api = new ApiService(API_URL);
```

## 26.3 Update Registration Page untuk Submit ke API

Buat API route untuk handle registration di Next.js:

Buat `src/app/api/register/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const response = await fetch(`${API_URL}/pendaftaran/submit`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Registration failed', errors: data.errors },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

# PART 27: Setup Real-time Notification dengan Pusher

## 27.1 Install Pusher

```bash
composer require pusher/pusher-php-server
```

## 27.2 Configure Broadcasting

Edit `.env`:
```env
BROADCAST_CONNECTION=pusher

PUSHER_APP_ID=your-app-id
PUSHER_APP_KEY=your-app-key
PUSHER_APP_SECRET=your-app-secret
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=ap1
```

## 27.3 Install Laravel Echo di Frontend

```bash
npm install --save-dev laravel-echo pusher-js
```

## 27.4 Setup Echo di Next.js

Buat `src/lib/echo.ts`:
```typescript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

export const initEcho = (token: string) => {
  if (typeof window === 'undefined') return null;

  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || 'local',
    wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST || 'localhost',
    wsPort: process.env.NEXT_PUBLIC_PUSHER_PORT || 6001,
    wssPort: process.env.NEXT_PUBLIC_PUSHER_PORT || 6001,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return window.Echo;
};

export const getEcho = () => {
  if (typeof window === 'undefined') return null;
  return window.Echo || null;
};
```

---

# PART 28: Setup Email dengan Gmail SMTP

## 28.1 Configure Mail

Edit `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@kopnusa.id"
MAIL_FROM_NAME="${APP_NAME}"
```

## 28.2 Create Mailable

```bash
php artisan make:mail WelcomeMemberMail
```

Edit `app/Mail/WelcomeMemberMail.php`:
```php
<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMemberMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('Selamat Bergabung di KNMP!')
            ->view('emails.welcome')
            ->with([
                'noAnggota' => $this->user->no_anggota,
                'nama' => $this->user->name,
                'tier' => $this->user->tier->nama_tier,
            ]);
    }
}
```

## 28.3 Create Email Template

Buat `resources/views/emails/welcome.blade.php`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Selamat Bergabung di KNMP!</h1>
        </div>
        <div class="content">
            <p>Yth. {{ $nama }},</p>
            <p>Selamat! Pendaftaran Anda sebagai <strong>{{ $tier }}</strong> telah disetujui.</p>
            <p>Nomor Anggota Anda: <strong>{{ $noAnggota }}</strong></p>
            <p>Silakan login ke dashboard untuk mengakses fitur lengkap KNMP.</p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} KNMP - Koperasi Nusantara Merdeka Putra</p>
        </div>
    </div>
</body>
</html>
```

---

# PART 29: Deploy ke Shared Hosting

## 29.1 Persiapan Deploy

### A. Compress Project Laravel
Zip semua file kecuali:
- `node_modules`
- `.git`
- `tests`
- `storage/logs/*`
- `bootstrap/cache/*`

### B. Buat Database di Hosting
1. Login ke cPanel
2. Buka MySQL Databases
3. Buat database baru
4. Buat user dan password
5. Assign user ke database

### C. Upload Files
1. Buka File Manager
2. Navigate ke `public_html`
3. Upload dan extract zip
4. Pindahkan file dari folder `public` ke `public_html`
5. Edit `index.php`:
```php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
```

### D. Update .env
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.kopnusa.id

DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

### E. Jalankan Migration
Di cPanel, buka Terminal (jika tersedia) atau gunakan PHP Cron Jobs:
```bash
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

## 29.2 Setup Subdomain di cPanel

### A. Buat Subdomain
1. Login ke cPanel
2. Buka Subdomains
3. Buat subdomain:
   - `api.kopnusa.id` → Document Root: `/public_html/api`
   - `admin.kopnusa.id` → Document Root: `/public_html/admin`

### B. Setup SSL
1. Buka SSL/TLS Status
2. Run AutoSSL untuk semua subdomain

---

# PART 30: Testing & Final Checklist

## 30.1 API Testing Checklist

### Authentication
- [ ] POST /api/register - Register new user
- [ ] POST /api/login - Login user
- [ ] POST /api/logout - Logout user
- [ ] GET /api/me - Get current user

### Tiers
- [ ] GET /api/tiers - List all tiers
- [ ] GET /api/tiers/{id} - Get tier detail
- [ ] GET /api/tiers/check-availability/{id} - Check availability

### Pendaftaran
- [ ] GET /api/pendaftaran/check-nik/{nik} - Check NIK
- [ ] GET /api/pendaftaran/check-email/{email} - Check email
- [ ] GET /api/pendaftaran/check-kode-referral/{kode} - Check referral
- [ ] POST /api/pendaftaran/submit - Submit registration
- [ ] GET /api/pendaftaran/track/{no} - Track registration

### Admin Functions
- [ ] GET /api/pendaftaran - List registrations
- [ ] POST /api/verifikasi/{id}/approve - Approve registration
- [ ] POST /api/verifikasi/{id}/reject - Reject registration

## 30.2 Frontend Integration Checklist

- [ ] Registration form submit ke API
- [ ] Real-time validation (NIK, email, referral)
- [ ] File upload (KTP, foto kebun, bukti bayar)
- [ ] Success/error handling
- [ ] Loading states

## 30.3 Security Checklist

- [ ] CSRF Protection enabled
- [ ] XSS Protection
- [ ] SQL Injection Protection (Eloquent)
- [ ] Rate Limiting
- [ ] Input Validation
- [ ] File Upload Validation
- [ ] API Authentication (Sanctum)
- [ ] Role-based Access Control

---

# 🎉 SELAMAT! TUTORIAL SELESAI!

## Quick Commands Reference

```bash
# Run Laravel Development Server
php artisan serve

# Run Migrations
php artisan migrate

# Run Seeders
php artisan db:seed

# Clear Cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Storage Link
php artisan storage:link

# Generate Swagger Docs
php artisan l5-swagger:generate
```

## Important URLs (Local Development)

- Frontend: http://localhost:3000
- API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin
- API Docs: http://localhost:8000/api/documentation
- phpMyAdmin: http://localhost/phpmyadmin

---

**Dibuat dengan ❤️ oleh PT Digital Bisnis Manajemen DIGIMAN**
**Mastermind: master polymath**
