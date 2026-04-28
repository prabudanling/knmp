# 🚀 TUTORIAL LENGKAP BACKEND LARAVEL KNMP
## Sistem Pendaftaran Pengurus 7 Tier - Part 1: Setup & Database

---

## 📋 DAFTAR ISI PART 1

1. [Pengertian 7 Tier KNMP](#1-pengertian-7-tier-knmp)
2. [Flow Pendaftaran Lengkap](#2-flow-pendaftaran-lengkap)
3. [Persiapan Development](#3-persiapan-development)
4. [Struktur Database Lengkap](#4-struktur-database-lengkap)
5. [Migration Laravel](#5-migration-laravel)

---

## 1. PENGETIAN 7 TIER KNMP

### 🏛️ Struktur Tier (Dari Tinggi ke Rendah)

| Tier | Nama | Level | Keterangan | Masuk Sistem Pengurus |
|------|------|-------|------------|----------------------|
| **Tier 1** | KORNAS | Nasional | Pimpinan Pusat | ✅ Ya |
| **Tier 2** | KORWIL | Provinsi | Pimpinan Wilayah | ✅ Ya |
| **Tier 3** | KORDA | Kabupaten/Kota | Pimpinan Daerah | ✅ Ya |
| **Tier 4** | KORCAM | Kecamatan | Pimpinan Camat | ✅ Ya |
| **Tier 5** | KORDES | Desa | Pimpinan Desa | ✅ Ya |
| **Tier 6** | ANGGOTA BIASA | - | Anggota Reguler | ✅ Ya |
| **Tier 7** | MITRA | - | Partner Bisnis | ❌ Tidak (Database Terpisah) |

### 📊 Alur Pendaftaran

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLOW PENDAFTARAN KNMP                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [CALON ANGGOTA]                                                 │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────┐                                            │
│  │ PILIH TIER/PAKET│                                            │
│  └────────┬────────┘                                            │
│           │                                                      │
│    ┌──────┴──────┬──────────┬──────────┬─────────┐             │
│    ▼             ▼          ▼          ▼         ▼             │
│ ┌──────┐    ┌──────┐   ┌──────┐   ┌──────┐  ┌──────┐          │
│ │TIER 7│    │TIER 6│   │TIER 5│   │TIER 4│  │TIER 3│          │
│ │MITRA │    │ANGGOTA│   │KORDES│   │KORCAM│  │KORDA │          │
│ └──┬───┘    └──┬───┘   └──┬───┘   └──┬───┘  └──┬───┘          │
│    │           │          │          │         │               │
│    ▼           └──────────┴──────────┴─────────┘               │
│ ┌─────────────────────────────────────────────────┐            │
│ │        FORM PENDAFTARAN (Data Diri)             │            │
│ └──────────────────────┬──────────────────────────┘            │
│                        │                                        │
│                        ▼                                        │
│ ┌─────────────────────────────────────────────────┐            │
│ │           PEMILIHAN LOKASI/POSISI               │            │
│ │  (Untuk Tier 2-5: Pilih Provinsi/Kab/Kec/Desa) │            │
│ └──────────────────────┬──────────────────────────┘            │
│                        │                                        │
│                        ▼                                        │
│ ┌─────────────────────────────────────────────────┐            │
│ │              KONFIRMASI & PEMBAYARAN            │            │
│ └──────────────────────┬──────────────────────────┘            │
│                        │                                        │
│           ┌────────────┴────────────┐                          │
│           ▼                         ▼                          │
│    ┌─────────────┐          ┌─────────────┐                    │
│    │   TIER 7    │          │  TIER 2-6   │                    │
│    │   (MITRA)   │          │ (PENGURUS)  │                    │
│    └──────┬──────┘          └──────┬──────┘                    │
│           │                        │                            │
│           ▼                        ▼                            │
│    ┌─────────────┐          ┌─────────────┐                    │
│ │ DB: mitra    │          │ DB: pengurus│                    │
│ │ (Terpisah)   │          │ (Sistem)    │                    │
│ └─────────────┘          └─────────────┘                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. FLOW PENDAFTARAN LENGKAP

### 🔄 Alur Step by Step

#### STEP 1: Pemilihan Tier/Paket
```
User mengunjungi website → Klik "Daftar" → Pilih Tier
- Tier 7 (Mitra): Rp 500.000 - Rp 5.000.000
- Tier 6 (Anggota Biasa): Rp 100.000/tahun
- Tier 5 (KORDES): Rp 250.000/tahun + Pilih Desa
- Tier 4 (KORCAM): Rp 500.000/tahun + Pilih Kecamatan
- Tier 3 (KORDA): Rp 1.000.000/tahun + Pilih Kabupaten
- Tier 2 (KORWIL): Rp 2.500.000/tahun + Pilih Provinsi
```

#### STEP 2: Isi Data Diri
```
- Nama Lengkap (sesuai KTP)
- NIK (Nomor Induk Kependudukan)
- Tempat, Tanggal Lahir
- Jenis Kelamin
- Alamat Lengkap (sesuai KTP)
- Email (untuk login & notifikasi)
- No. HP/WhatsApp
- Pekerjaan
- Upload KTP
- Upload Foto 3x4
```

#### STEP 3: Pilih Lokasi (Khusus Tier 2-5)
```
Tier 2 (KORWIL): Pilih Provinsi (yang masih kosong)
Tier 3 (KORDA): Pilih Provinsi → Kabupaten/Kota
Tier 4 (KORCAM): Pilih Provinsi → Kabupaten → Kecamatan
Tier 5 (KORDES): Pilih Provinsi → Kabupaten → Kecamatan → Desa
```

#### STEP 4: Pembayaran
```
- Midtrans/Xendit Integration
- Virtual Account
- QRIS
- E-Wallet (GoPay, OVO, DANA, ShopeePay)
- Bank Transfer
```

#### STEP 5: Verifikasi & Approval
```
- Admin menerima notifikasi
- Admin verifikasi pembayaran & dokumen
- Admin approve/reject
- User menerima email notifikasi
- Jika approve: Akun aktif, masuk sistem
```

---

## 3. PERSIAPAN DEVELOPMENT

### 📦 Software yang Dibutuhkan (Local Development)

1. **XAMPP** (Windows) atau **Laragon** (Recommended)
   - PHP 8.1+
   - MySQL 5.7+ / MariaDB 10.3+
   - Composer

2. **VS Code** dengan extensions:
   - PHP Intelephense
   - Laravel Extra Intellisense
   - Thunder Client (untuk test API)

3. **Postman** (untuk testing API)

### 🔧 Install Laravel (Local Development)

```bash
# Via Composer
composer create-project laravel/laravel knmp-backend

# Masuk folder
cd knmp-backend

# Install dependencies
composer install
```

### 📁 Struktur Folder Laravel

```
knmp-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── RegistrationController.php
│   │   │   │   ├── MemberController.php
│   │   │   │   ├── PositionController.php
│   │   │   │   ├── PaymentController.php
│   │   │   │   └── AdminController.php
│   │   │   └── Controller.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Member.php
│   │   ├── Mitra.php
│   │   ├── Position.php
│   │   ├── Province.php
│   │   ├── Regency.php
│   │   ├── District.php
│   │   ├── Village.php
│   │   ├── Payment.php
│   │   └── Registration.php
│   └── Services/
│       ├── MidtransService.php
│       ├── XenditService.php
│       └── MailService.php
├── bootstrap/
├── config/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── public/
├── resources/
├── routes/
│   ├── api.php
│   └── web.php
├── storage/
└── tests/
```

---

## 4. STRUKTUR DATABASE LENGKAP

### 🗄️ Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA KNMP                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐            │
│  │   provinces  │       │   regencies  │       │   districts  │            │
│  ├──────────────┤       ├──────────────┤       ├──────────────┤            │
│  │ id           │───┐   │ id           │───┐   │ id           │            │
│  │ name         │   │   │ province_id  │◄──┘   │ regency_id   │            │
│  │ code         │   │   │ name         │       │ name         │            │
│  │ created_at   │   │   │ code         │       │ code         │            │
│  │ updated_at   │   │   │ created_at   │       │ created_at   │            │
│  └──────────────┘   │   │ updated_at   │       │ updated_at   │            │
│                     │   └──────────────┘       └──────┬───────┘            │
│                     │                                  │                    │
│                     │          ┌──────────────┐       │                    │
│                     │          │   villages   │       │                    │
│                     │          ├──────────────┤       │                    │
│                     │          │ id           │◄──────┘                    │
│                     │          │ district_id  │                            │
│                     │          │ name         │                            │
│                     │          │ code         │                            │
│                     │          │ created_at   │                            │
│                     │          │ updated_at   │                            │
│                     │          └──────────────┘                            │
│                     │                                                       │
│  ┌──────────────┐   │   ┌──────────────┐       ┌──────────────┐            │
│  │    users     │   │   │   members    │       │    mitra     │            │
│  ├──────────────┤   │   ├──────────────┤       ├──────────────┤            │
│  │ id           │◄──┼───│ user_id      │       │ id           │            │
│  │ email        │   │   │ tier_id      │       │ user_id      │            │
│  │ password     │   │   │ nik          │       │ company_name │            │
│  │ role         │   │   │ name         │       │ business_type│            │
│  │ status       │   │   │ phone        │       │ npwp         │            │
│  │ created_at   │   │   │ photo        │       │ siup         │            │
│  │ updated_at   │   │   │ ktp_photo    │       │ nib          │            │
│  └──────────────┘   │   │ province_id  │◄──────┘              │            │
│         │           │   │ regency_id   │                      │            │
│         │           │   │ district_id  │                      │            │
│         │           │   │ village_id   │                      │            │
│         │           │   │ position     │                      │            │
│         │           │   │ status       │                      │            │
│         │           │   │ join_date    │                      │            │
│         │           │   │ term_end     │                      │            │
│         │           │   │ created_at   │                      │            │
│         │           │   │ updated_at   │                      │            │
│         │           │   └──────────────┘                      │            │
│         │           │                                       │            │
│         │           │   ┌──────────────┐       ┌──────────────┤            │
│         │           │   │  positions   │       │   payments   │            │
│         │           │   ├──────────────┤       ├──────────────┤            │
│         │           │   │ id           │       │ id           │            │
│         │           │   │ tier_id      │       │ member_id    │            │
│         │           │   │ position_name│       │ mitra_id     │            │
│         │           │   │ province_id  │◄──────│ amount       │            │
│         │           │   │ regency_id   │       │ payment_type │            │
│         │           │   │ district_id  │       │ payment_method│           │
│         │           │   │ village_id   │       │ transaction_id│           │
│         │           │   │ member_id    │       │ status       │            │
│         │           │   │ status       │       │ paid_at      │            │
│         │           │   │ created_at   │       │ verified_at  │            │
│         │           │   │ updated_at   │       │ created_at   │            │
│         │           │   └──────────────┘       │ updated_at   │            │
│         │           │                          └──────────────┘            │
│         │           │                                                       │
│         │           │   ┌──────────────┐       ┌──────────────┐            │
│         │           │   │registrations │       │    tiers     │            │
│         │           │   ├──────────────┤       ├──────────────┤            │
│         │           │   │ id           │       │ id           │            │
│         └───────────┴───│ user_id      │       │ name         │            │
│                         │ tier_id      │◄──────│ level        │            │
│                         │ status       │       │ price        │            │
│                         │ data_json    │       │ description  │            │
│                         │ payment_id   │       │ benefits     │            │
│                         │ approved_by  │       │ is_active    │            │
│                         │ approved_at  │       │ created_at   │            │
│                         │ created_at   │       │ updated_at   │            │
│                         │ updated_at   │       └──────────────┘            │
│                         └──────────────┘                                   │
│                                                                              │
│  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐            │
│  │   admins     │       │   logs       │       │ notifications│            │
│  ├──────────────┤       ├──────────────┤       ├──────────────┤            │
│  │ id           │       │ id           │       │ id           │            │
│  │ user_id      │       │ user_id      │       │ user_id      │            │
│  │ level        │       │ action       │       │ title        │            │
│  │ permissions  │       │ description  │       │ message      │            │
│  │ created_at   │       │ ip_address   │       │ type         │            │
│  │ updated_at   │       │ user_agent   │       │ is_read      │            │
│  └──────────────┘       │ created_at   │       │ created_at   │            │
│                         │ updated_at   │       │ updated_at   │            │
│                         └──────────────┘       └──────────────┘            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. MIGRATION LARAVEL

### 📝 Buat Migration Files

Jalankan command berikut di terminal:

```bash
php artisan make:migration create_provinces_table
php artisan make:migration create_regencies_table
php artisan make:migration create_districts_table
php artisan make:migration create_villages_table
php artisan make:migration create_tiers_table
php artisan make:migration update_users_table
php artisan make:migration create_members_table
php artisan make:migration create_mitra_table
php artisan make:migration create_positions_table
php artisan make:migration create_payments_table
php artisan make:migration create_registrations_table
php artisan make:migration create_admins_table
php artisan make:migration create_logs_table
php artisan make:migration create_notifications_table
```

### 📄 File Migration Lengkap

#### 1. Provinces Table

```php
<?php
// database/migrations/2024_01_01_000001_create_provinces_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('code', 2)->unique();
            $table->string('name', 100);
            $table->timestamps();
            
            $table->index('code');
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
```

#### 2. Regencies Table

```php
<?php
// database/migrations/2024_01_01_000002_create_regencies_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('regencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained('provinces')->onDelete('cascade');
            $table->string('code', 4)->unique();
            $table->string('name', 100);
            $table->timestamps();
            
            $table->index(['province_id', 'code']);
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('regencies');
    }
};
```

#### 3. Districts Table

```php
<?php
// database/migrations/2024_01_01_000003_create_districts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('regency_id')->constrained('regencies')->onDelete('cascade');
            $table->string('code', 6)->unique();
            $table->string('name', 100);
            $table->timestamps();
            
            $table->index(['regency_id', 'code']);
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
```

#### 4. Villages Table

```php
<?php
// database/migrations/2024_01_01_000004_create_villages_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('villages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained('districts')->onDelete('cascade');
            $table->string('code', 10)->unique();
            $table->string('name', 100);
            $table->timestamps();
            
            $table->index(['district_id', 'code']);
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('villages');
    }
};
```

#### 5. Tiers Table

```php
<?php
// database/migrations/2024_01_01_000005_create_tiers_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tiers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->integer('level')->unique(); // 1-7
            $table->decimal('price', 12, 2)->default(0);
            $table->text('description')->nullable();
            $table->json('benefits')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('requires_location')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tiers');
    }
};
```

#### 6. Update Users Table

```php
<?php
// database/migrations/2024_01_01_000006_update_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['guest', 'member', 'mitra', 'admin', 'superadmin'])->default('guest');
            $table->enum('status', ['pending', 'active', 'inactive', 'banned'])->default('pending');
            $table->string('phone', 20)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            
            $table->index('role');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'status', 'phone', 'email_verified_at', 'remember_token']);
        });
    }
};
```

#### 7. Members Table

```php
<?php
// database/migrations/2024_01_01_000007_create_members_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tier_id')->constrained('tiers')->onDelete('restrict');
            
            // Data Pribadi
            $table->string('nik', 16)->unique();
            $table->string('name', 100);
            $table->string('tempat_lahir', 50)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->default('L');
            $table->text('alamat')->nullable();
            $table->string('pekerjaan', 50)->nullable();
            
            // Foto
            $table->string('photo')->nullable();
            $table->string('ktp_photo')->nullable();
            
            // Lokasi (untuk Tier 2-5)
            $table->foreignId('province_id')->nullable()->constrained('provinces')->onDelete('set null');
            $table->foreignId('regency_id')->nullable()->constrained('regencies')->onDelete('set null');
            $table->foreignId('district_id')->nullable()->constrained('districts')->onDelete('set null');
            $table->foreignId('village_id')->nullable()->constrained('villages')->onDelete('set null');
            
            // Jabatan
            $table->string('position', 50)->nullable();
            $table->string('position_code', 20)->nullable();
            
            // Status Keanggotaan
            $table->enum('status', ['pending', 'active', 'inactive', 'rejected'])->default('pending');
            $table->timestamp('join_date')->nullable();
            $table->timestamp('term_end')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();
            
            $table->timestamps();
            
            $table->index('nik');
            $table->index('status');
            $table->index(['province_id', 'regency_id', 'district_id', 'village_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
```

#### 8. Mitra Table

```php
<?php
// database/migrations/2024_01_01_000008_create_mitra_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mitra', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Data Perusahaan/Usaha
            $table->string('company_name', 150);
            $table->string('business_type', 100);
            $table->string('npwp', 20)->nullable();
            $table->string('siup', 50)->nullable();
            $table->string('nib', 20)->nullable();
            $table->text('address')->nullable();
            
            // Kontak Bisnis
            $table->string('contact_person', 100);
            $table->string('phone', 20);
            $table->string('email', 100);
            $table->string('website', 100)->nullable();
            
            // Dokumen
            $table->string('akta_perusahaan')->nullable();
            $table->string('logo')->nullable();
            
            // Kategori Mitra
            $table->enum('category', ['platinum', 'gold', 'silver', 'bronze'])->default('bronze');
            $table->decimal('investment_value', 15, 2)->default(0);
            
            // Status
            $table->enum('status', ['pending', 'active', 'inactive', 'rejected'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            
            $table->timestamps();
            
            $table->index('status');
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mitra');
    }
};
```

#### 9. Positions Table

```php
<?php
// database/migrations/2024_01_01_000009_create_positions_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tier_id')->constrained('tiers')->onDelete('cascade');
            
            // Nama Jabatan
            $table->string('position_name', 100);
            $table->string('position_code', 20)->unique();
            
            // Lokasi
            $table->foreignId('province_id')->nullable()->constrained('provinces')->onDelete('set null');
            $table->foreignId('regency_id')->nullable()->constrained('regencies')->onDelete('set null');
            $table->foreignId('district_id')->nullable()->constrained('districts')->onDelete('set null');
            $table->foreignId('village_id')->nullable()->constrained('villages')->onDelete('set null');
            
            // Member yang menempati
            $table->foreignId('member_id')->nullable()->constrained('members')->onDelete('set null');
            
            // Status
            $table->enum('status', ['vacant', 'filled', 'pending'])->default('vacant');
            
            $table->timestamps();
            
            $table->index('status');
            $table->index('position_code');
            $table->unique(['tier_id', 'province_id', 'regency_id', 'district_id', 'village_id', 'position_name'], 'unique_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
```

#### 10. Payments Table

```php
<?php
// database/migrations/2024_01_01_000010_create_payments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            
            // Polymorphic relation (bisa untuk member atau mitra)
            $table->morphs('payable'); // payable_id, payable_type
            
            // Detail Pembayaran
            $table->decimal('amount', 12, 2);
            $table->string('payment_type', 50); // registration, renewal, upgrade
            $table->string('payment_method', 50)->nullable(); // va, qris, ewallet
            
            // Gateway Response
            $table->string('transaction_id')->nullable();
            $table->string('order_id')->unique();
            $table->string('payment_code')->nullable(); // VA number / QRIS code
            $table->json('gateway_response')->nullable();
            
            // Status
            $table->enum('status', ['pending', 'paid', 'failed', 'expired', 'refunded'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            
            $table->timestamps();
            
            $table->index('status');
            $table->index('transaction_id');
            $table->index('order_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
```

#### 11. Registrations Table

```php
<?php
// database/migrations/2024_01_01_000011_create_registrations_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tier_id')->constrained('tiers')->onDelete('restrict');
            
            // Data Form (JSON untuk fleksibilitas)
            $table->json('form_data');
            
            // Status
            $table->enum('status', ['draft', 'submitted', 'payment_pending', 'paid', 'verified', 'approved', 'rejected'])->default('draft');
            
            // Payment
            $table->foreignId('payment_id')->nullable()->constrained('payments')->onDelete('set null');
            
            // Approval
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index('status');
            $table->index(['user_id', 'tier_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
```

#### 12. Admins Table

```php
<?php
// database/migrations/2024_01_01_000012_create_admins_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Level Admin
            $table->enum('level', ['superadmin', 'admin_kornas', 'admin_korwil', 'admin_korda', 'admin_korcam', 'admin_kordes'])->default('admin_kordes');
            
            // Scope Wilayah
            $table->foreignId('province_id')->nullable()->constrained('provinces')->onDelete('set null');
            $table->foreignId('regency_id')->nullable()->constrained('regencies')->onDelete('set null');
            $table->foreignId('district_id')->nullable()->constrained('districts')->onDelete('set null');
            $table->foreignId('village_id')->nullable()->constrained('villages')->onDelete('set null');
            
            // Permissions (JSON)
            $table->json('permissions')->nullable();
            
            $table->timestamps();
            
            $table->index('level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
```

#### 13. Logs Table

```php
<?php
// database/migrations/2024_01_01_000013_create_logs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            
            $table->string('action', 100);
            $table->string('model_type', 100)->nullable();
            $table->unsignedBigInteger('model_id')->nullable();
            $table->text('description')->nullable();
            
            // Request Info
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            
            // Old & New Data
            $table->json('old_data')->nullable();
            $table->json('new_data')->nullable();
            
            $table->timestamps();
            
            $table->index(['model_type', 'model_id']);
            $table->index('action');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};
```

#### 14. Notifications Table

```php
<?php
// database/migrations/2024_01_01_000014_create_notifications_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->morphs('notifiable'); // notifiable_id, notifiable_type
            $table->string('type');
            $table->json('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            
            $table->index(['notifiable_id', 'notifiable_type']);
            $table->index('read_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
```

---

## 6. SEEDER DATA AWAL

### 📄 TierSeeder

```php
<?php
// database/seeders/TierSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TierSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            [
                'id' => 1,
                'name' => 'KORNAS',
                'level' => 1,
                'price' => 0.00,
                'description' => 'Pimpinan Pusat Koperasi Nusantara Merah Putih',
                'benefits' => json_encode([
                    'Hak suara dalam RAT',
                    'Akses penuh sistem',
                    'Kartu anggota khusus',
                    'Sertifikat pengurus'
                ]),
                'is_active' => false, // Tidak bisa daftar langsung
                'requires_location' => false,
            ],
            [
                'id' => 2,
                'name' => 'KORWIL',
                'level' => 2,
                'price' => 2500000.00,
                'description' => 'Pimpinan Wilayah Provinsi',
                'benefits' => json_encode([
                    'Hak suara dalam RAT',
                    'Akses sistem wilayah',
                    'Kartu pengurus',
                    'Sertifikat pengurus',
                    'Pengelolaan anggota wilayah'
                ]),
                'is_active' => true,
                'requires_location' => true,
            ],
            [
                'id' => 3,
                'name' => 'KORDA',
                'level' => 3,
                'price' => 1000000.00,
                'description' => 'Pimpinan Daerah Kabupaten/Kota',
                'benefits' => json_encode([
                    'Hak suara dalam RAT',
                    'Akses sistem daerah',
                    'Kartu pengurus',
                    'Sertifikat pengurus',
                    'Pengelolaan anggota daerah'
                ]),
                'is_active' => true,
                'requires_location' => true,
            ],
            [
                'id' => 4,
                'name' => 'KORCAM',
                'level' => 4,
                'price' => 500000.00,
                'description' => 'Pimpinan Kecamatan',
                'benefits' => json_encode([
                    'Hak suara dalam RAT',
                    'Akses sistem kecamatan',
                    'Kartu pengurus',
                    'Sertifikat pengurus',
                    'Pengelolaan anggota kecamatan'
                ]),
                'is_active' => true,
                'requires_location' => true,
            ],
            [
                'id' => 5,
                'name' => 'KORDES',
                'level' => 5,
                'price' => 250000.00,
                'description' => 'Pimpinan Desa',
                'benefits' => json_encode([
                    'Hak suara dalam RAT',
                    'Akses sistem desa',
                    'Kartu pengurus',
                    'Sertifikat pengurus',
                    'Pengelolaan anggota desa'
                ]),
                'is_active' => true,
                'requires_location' => true,
            ],
            [
                'id' => 6,
                'name' => 'ANGGOTA BIASA',
                'level' => 6,
                'price' => 100000.00,
                'description' => 'Anggota Biasa Koperasi',
                'benefits' => json_encode([
                    'Hak suara dalam RAT',
                    'Akses sistem anggota',
                    'Kartu anggota',
                    'Sertifikat keanggotaan',
                    'Partisipasi program koperasi'
                ]),
                'is_active' => true,
                'requires_location' => false,
            ],
            [
                'id' => 7,
                'name' => 'MITRA',
                'level' => 7,
                'price' => 500000.00,
                'description' => 'Mitra Bisnis Koperasi',
                'benefits' => json_encode([
                    'Akses jaringan bisnis KNMP',
                    'Promosi usaha',
                    'Sertifikat mitra',
                    'Peluang kerjasama',
                    'Networking event'
                ]),
                'is_active' => true,
                'requires_location' => false,
            ],
        ];

        foreach ($tiers as $tier) {
            DB::table('tiers')->insert(array_merge($tier, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
```

---

## ✅ CHECKLIST PART 1

- [x] Pahami struktur 7 Tier
- [x] Pahami flow pendaftaran
- [x] Persiapan environment
- [x] Struktur database lengkap
- [x] Migration files
- [x] Seeder data awal

---

## 📖 LANJUT KE PART 2

Part 2 akan membahas:
- Model Laravel
- Controller lengkap
- API Routes
- Request Validation
- Services (Midtrans, Xendit, Mail)

---

*Dokumen ini adalah bagian dari Tutorial Backend Laravel KNMP*
*Total Parts: 5 Dokumen*
