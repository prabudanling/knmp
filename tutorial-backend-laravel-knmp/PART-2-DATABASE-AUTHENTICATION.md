# 📚 PART 2: DATABASE DESIGN & AUTHENTICATION

> **Tujuan**: Membuat struktur database untuk sistem KNMP dan implementasi authentication

---

## 📋 DAFTAR ISI PART 2

1. [Desain Database KNMP](#1-desain-database-knmp)
2. [Membuat Migration](#2-membuat-migration)
3. [Membuat Model](#3-membuat-model)
4. [Membuat Relations](#4-membuat-relations)
5. [Instalasi Laravel Breeze](#5-instalasi-laravel-breeze)
6. [Konfigurasi Authentication](#6-konfigurasi-authentication)
7. [Membuat Admin Panel](#7-membuat-admin-panel)
8. [Seeding Data Awal](#8-seeding-data-awal)

---

## 1. DESAIN DATABASE KNMP

### 1.1 Entity Relationship Diagram (ERD)

Berikut adalah struktur database untuk KNMP:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA KNMP                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      users       │       │    positions     │       │    provinces     │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id               │       │ id               │       │ id               │
│ name             │──┐    │ position_name    │    ┌──│ name             │
│ email            │  │    │ level            │    │  │ code             │
│ password         │  │    │ parent_id        │    │  └────────┬─────────┘
│ role             │  │    │ province_id      │◄───┘           │
│ position_id      │◄─┘    │ kab_kota_id      │               │
│ phone            │       │ kecamatan_id     │               │
│ address          │       │ desa_id          │               │
│ status           │       │ user_id          │               │
│ created_at       │       │ status           │               │
│ updated_at       │       │ term_start       │               │
└──────────────────┘       │ term_end         │               │
                           │ created_at       │               │
                           │ updated_at       │               │
                           └──────────────────┘               │
                                                              │
┌──────────────────┐       ┌──────────────────┐               │
│    kab_kotas     │       │   kecamatans     │               │
├──────────────────┤       ├──────────────────┤               │
│ id               │       │ id               │               │
│ province_id      │◄──────│ kab_kota_id      │◄──────────────┘
│ name             │       │ name             │
│ code             │       │ code             │
└──────────────────┘       └────────┬─────────┘
                                    │
                           ┌────────▼─────────┐
                           │     desas        │
                           ├──────────────────┤
                           │ id               │
                           │ kecamatan_id     │
                           │ name             │
                           │ code             │
                           └──────────────────┘

┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  position_levels │       │   categories     │       │  registrations   │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id               │       │ id               │       │ id               │
│ name             │       │ name             │       │ user_id          │
│ code             │       │ type             │       │ position_id      │
│ short_name       │       │ description      │       │ status           │
│ title            │       │ created_at       │       │ payment_status   │
│ total_positions  │       │ updated_at       │       │ amount           │
│ color            │       └──────────────────┘       │ created_at       │
│ icon             │                                  │ updated_at       │
│ hierarchy        │                                  └──────────────────┘
│ created_at       │
│ updated_at       │
└──────────────────┘
```

### 1.2 Penjelasan Tabel

| Tabel | Keterangan |
|-------|------------|
| `users` | Data pengguna/admin yang login |
| `positions` | Posisi jabatan (Kornas, Korwil, dll) |
| `position_levels` | Level jabatan (5 level) |
| `provinces` | Data 38 provinsi Indonesia |
| `kab_kotas` | Data 514 kabupaten/kota |
| `kecamatans` | Data 7.252 kecamatan |
| `desas` | Data 83.763 desa/kelurahan |
| `categories` | Kategori posisi (Pendiri, Pembina, dll) |
| `registrations` | Data pendaftaran anggota |

---

## 2. MEMBUAT MIGRATION

### 2.1 Membuat Migration untuk Position Levels

Di Command Prompt (folder project):

```bash
php artisan make:migration create_position_levels_table
```

Buka file yang dibuat di `database/migrations/xxxx_create_position_levels_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('position_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // Koordinator Nasional
            $table->string('code')->unique();  // KORNAS
            $table->string('short_name');      // Kornas
            $table->string('title');           // Presiden
            $table->integer('total_positions'); // 1
            $table->string('color')->default('#8B0000');
            $table->string('icon')->default('Crown');
            $table->integer('hierarchy');       // 1-5 (urutan)
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('position_levels');
    }
};
```

### 2.2 Membuat Migration untuk Categories

```bash
php artisan make:migration create_categories_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // Dewan Pendiri, Dewan Pembina, dll
            $table->string('type');           // founder, supervisor, advisor, board
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->default('#8B0000');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

### 2.3 Membuat Migration untuk Positions

```bash
php artisan make:migration create_positions_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            
            // Basic Info
            $table->string('position_name');      // Ketua Dewan Pembina
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('level_id')->nullable()->constrained('position_levels')->onDelete('set null');
            
            // Hierarchy (parent-child relationship)
            $table->foreignId('parent_id')->nullable()->constrained('positions')->onDelete('set null');
            $table->integer('sort_order')->default(0);
            
            // Location (nullable - hanya untuk level tertentu)
            $table->foreignId('province_id')->nullable();
            $table->foreignId('kab_kota_id')->nullable();
            $table->foreignId('kecamatan_id')->nullable();
            $table->foreignId('desa_id')->nullable();
            
            // User Assignment
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            
            // Status
            $table->enum('status', ['vacant', 'filled', 'pending'])->default('vacant');
            $table->date('term_start')->nullable();
            $table->date('term_end')->nullable();
            
            // Additional Info
            $table->text('responsibilities')->nullable();
            $table->text('requirements')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'level_id']);
            $table->index(['province_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
```

### 2.4 Membuat Migration untuk Provinces

```bash
php artisan make:migration create_provinces_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 2)->unique();  // JB, JT, etc
            $table->string('capital')->nullable();
            $table->integer('population')->nullable();
            $table->string('region');             // Jawa, Sumatera, etc
            $table->string('iso_code')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
```

### 2.5 Membuat Migration untuk KabKota

```bash
php artisan make:migration create_kab_kotas_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kab_kotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code', 4)->unique();
            $table->enum('type', ['kabupaten', 'kota']);
            $table->string('capital')->nullable();
            $table->integer('population')->nullable();
            $table->timestamps();
            
            $table->index('province_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kab_kotas');
    }
};
```

### 2.6 Membuat Migration untuk Kecamatan

```bash
php artisan make:migration create_kecamatans_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kecamatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kab_kota_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code', 7)->unique();
            $table->integer('population')->nullable();
            $table->timestamps();
            
            $table->index('kab_kota_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kecamatans');
    }
};
```

### 2.7 Membuat Migration untuk Desa

```bash
php artisan make:migration create_desas_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('desas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kecamatan_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code', 10)->unique();
            $table->enum('type', ['desa', 'kelurahan']);
            $table->integer('population')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->timestamps();
            
            $table->index('kecamatan_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('desas');
    }
};
```

### 2.8 Update Users Table

```bash
php artisan make:migration add_fields_to_users_table
```

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
            $table->foreignId('position_id')->nullable()->constrained()->onDelete('set null');
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('province_id')->nullable();
            $table->string('kab_kota_id')->nullable();
            $table->string('kecamatan_id')->nullable();
            $table->string('desa_id')->nullable();
            $table->enum('role', ['superadmin', 'admin', 'kornas', 'korwil', 'korda', 'korcam', 'kordes', 'member'])->default('member');
            $table->enum('status', ['active', 'inactive', 'pending', 'banned'])->default('pending');
            $table->string('avatar')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'position_id', 'phone', 'address', 'province_id',
                'kab_kota_id', 'kecamatan_id', 'desa_id', 'role',
                'status', 'avatar', 'email_verified_at', 'remember_token',
                'deleted_at'
            ]);
        });
    }
};
```

### 2.9 Membuat Migration untuk Registrations

```bash
php artisan make:migration create_registrations_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            
            // User Info
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('address');
            
            // Position Applied
            $table->foreignId('position_id')->constrained()->onDelete('cascade');
            
            // Location
            $table->foreignId('province_id')->nullable();
            $table->foreignId('kab_kota_id')->nullable();
            $table->foreignId('kecamatan_id')->nullable();
            $table->foreignId('desa_id')->nullable();
            
            // KPA & Tier
            $table->string('kpa_type')->nullable();      // KPA_1_PRODUCER, etc
            $table->string('tier_type')->nullable();      // T1, T2, etc
            
            // Payment
            $table->decimal('amount', 12, 2)->default(0);
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('transaction_id')->nullable();
            $table->timestamp('paid_at')->nullable();
            
            // Status
            $table->enum('status', ['draft', 'submitted', 'verified', 'approved', 'rejected'])->default('draft');
            $table->text('notes')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('verified_at')->nullable();
            
            // Documents
            $table->json('documents')->nullable();
            
            $table->timestamps();
            
            $table->index(['status', 'payment_status']);
            $table->index('position_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
```

### 2.10 Jalankan Semua Migration

```bash
php artisan migrate
```

Output:

```
Migration table created successfully.
...
INFO  Preparing database.
INFO  Running migrations.
  2024_01_01_000001_create_position_levels_table ............................ 32ms DONE
  2024_01_01_000002_create_categories_table ................................ 25ms DONE
  2024_01_01_000003_create_provinces_table .................................. 18ms DONE
  2024_01_01_000004_create_kab_kotas_table .................................. 21ms DONE
  2024_01_01_000005_create_kecamatans_table ................................. 19ms DONE
  2024_01_01_000006_create_desas_table ....................................... 16ms DONE
  2024_01_01_000007_create_positions_table .................................. 45ms DONE
  2024_01_01_000008_add_fields_to_users_table ............................... 38ms DONE
  2024_01_01_000009_create_registrations_table .............................. 52ms DONE
```

---

## 3. MEMBUAT MODEL

### 3.1 Model PositionLevel

```bash
php artisan make:model PositionLevel
```

Buka `app/Models/PositionLevel.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PositionLevel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'short_name',
        'title',
        'total_positions',
        'color',
        'icon',
        'hierarchy',
        'description',
    ];

    protected $casts = [
        'total_positions' => 'integer',
        'hierarchy' => 'integer',
    ];

    /**
     * Relasi ke Positions
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'level_id');
    }

    /**
     * Scope untuk mengurutkan berdasarkan hierarchy
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('hierarchy');
    }

    /**
     * Get badge color
     */
    public function getBadgeColorAttribute(): string
    {
        return $this->color ?: '#8B0000';
    }
}
```

### 3.2 Model Category

```bash
php artisan make:model Category
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'icon',
        'color',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    /**
     * Relasi ke Positions
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'category_id');
    }

    /**
     * Scope untuk mengurutkan
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Scope berdasarkan type
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
```

### 3.3 Model Province

```bash
php artisan make:model Province
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'capital',
        'population',
        'region',
        'iso_code',
    ];

    protected $casts = [
        'population' => 'integer',
    ];

    /**
     * Relasi ke KabKota
     */
    public function kabKotas(): HasMany
    {
        return $this->hasMany(KabKota::class, 'province_id');
    }

    /**
     * Relasi ke Positions
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'province_id');
    }

    /**
     * Scope untuk region tertentu
     */
    public function scopeByRegion($query, string $region)
    {
        return $query->where('region', $region);
    }

    /**
     * Get kode singkat (JB, JT, etc)
     */
    public function getShortCodeAttribute(): string
    {
        return $this->code;
    }
}
```

### 3.4 Model KabKota

```bash
php artisan make:model KabKota
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KabKota extends Model
{
    use HasFactory;

    protected $fillable = [
        'province_id',
        'name',
        'code',
        'type',
        'capital',
        'population',
    ];

    protected $casts = [
        'population' => 'integer',
    ];

    /**
     * Relasi ke Province
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Relasi ke Kecamatan
     */
    public function kecamatans(): HasMany
    {
        return $this->hasMany(Kecamatan::class, 'kab_kota_id');
    }

    /**
     * Relasi ke Positions
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'kab_kota_id');
    }

    /**
     * Scope untuk kabupaten saja
     */
    public function scopeKabupaten($query)
    {
        return $query->where('type', 'kabupaten');
    }

    /**
     * Scope untuk kota saja
     */
    public function scopeKota($query)
    {
        return $query->where('type', 'kota');
    }
}
```

### 3.5 Model Kecamatan

```bash
php artisan make:model Kecamatan
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kecamatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'kab_kota_id',
        'name',
        'code',
        'population',
    ];

    protected $casts = [
        'population' => 'integer',
    ];

    /**
     * Relasi ke KabKota
     */
    public function kabKota(): BelongsTo
    {
        return $this->belongsTo(KabKota::class);
    }

    /**
     * Relasi ke Desa
     */
    public function desas(): HasMany
    {
        return $this->hasMany(Desa::class, 'kecamatan_id');
    }

    /**
     * Relasi ke Positions
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'kecamatan_id');
    }
}
```

### 3.6 Model Desa

```bash
php artisan make:model Desa
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Desa extends Model
{
    use HasFactory;

    protected $fillable = [
        'kecamatan_id',
        'name',
        'code',
        'type',
        'population',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'population' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    /**
     * Relasi ke Kecamatan
     */
    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    /**
     * Relasi ke Positions
     */
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'desa_id');
    }

    /**
     * Scope untuk desa saja
     */
    public function scopeDesa($query)
    {
        return $query->where('type', 'desa');
    }

    /**
     * Scope untuk kelurahan saja
     */
    public function scopeKelurahan($query)
    {
        return $query->where('type', 'kelurahan');
    }
}
```

### 3.7 Model Position

```bash
php artisan make:model Position
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'position_name',
        'category_id',
        'level_id',
        'parent_id',
        'sort_order',
        'province_id',
        'kab_kota_id',
        'kecamatan_id',
        'desa_id',
        'user_id',
        'status',
        'term_start',
        'term_end',
        'responsibilities',
        'requirements',
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'term_start' => 'date',
        'term_end' => 'date',
        'responsibilities' => 'array',
        'requirements' => 'array',
    ];

    /**
     * Status constants
     */
    const STATUS_VACANT = 'vacant';
    const STATUS_FILLED = 'filled';
    const STATUS_PENDING = 'pending';

    /**
     * Relasi ke Category
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relasi ke Level
     */
    public function level(): BelongsTo
    {
        return $this->belongsTo(PositionLevel::class, 'level_id');
    }

    /**
     * Relasi ke Parent Position
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'parent_id');
    }

    /**
     * Relasi ke Child Positions
     */
    public function children(): HasMany
    {
        return $this->hasMany(Position::class, 'parent_id');
    }

    /**
     * Relasi ke User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Province
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Relasi ke KabKota
     */
    public function kabKota(): BelongsTo
    {
        return $this->belongsTo(KabKota::class);
    }

    /**
     * Relasi ke Kecamatan
     */
    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class);
    }

    /**
     * Relasi ke Desa
     */
    public function desa(): BelongsTo
    {
        return $this->belongsTo(Desa::class);
    }

    /**
     * Scope untuk status tertentu
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope untuk level tertentu
     */
    public function scopeByLevel($query, int $levelId)
    {
        return $query->where('level_id', $levelId);
    }

    /**
     * Scope untuk posisi kosong
     */
    public function scopeVacant($query)
    {
        return $query->where('status', self::STATUS_VACANT);
    }

    /**
     * Scope untuk posisi terisi
     */
    public function scopeFilled($query)
    {
        return $query->where('status', self::STATUS_FILLED);
    }

    /**
     * Check jika posisi kosong
     */
    public function isVacant(): bool
    {
        return $this->status === self::STATUS_VACANT;
    }

    /**
     * Check jika posisi terisi
     */
    public function isFilled(): bool
    {
        return $this->status === self::STATUS_FILLED;
    }

    /**
     * Get nama pemangku jabatan atau "Posisi Kosong"
     */
    public function getHolderNameAttribute(): string
    {
        return $this->user ? $this->user->name : '(Posisi Kosong)';
    }

    /**
     * Get full location name
     */
    public function getFullLocationAttribute(): string
    {
        $parts = [];
        
        if ($this->desa) {
            $parts[] = $this->desa->name;
        }
        if ($this->kecamatan) {
            $parts[] = $this->kecamatan->name;
        }
        if ($this->kabKota) {
            $parts[] = $this->kabKota->name;
        }
        if ($this->province) {
            $parts[] = $this->province->name;
        }
        
        return implode(', ', $parts) ?: 'Nasional';
    }
}
```

### 3.8 Update User Model

Buka `app/Models/User.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * Role constants
     */
    const ROLE_SUPERADMIN = 'superadmin';
    const ROLE_ADMIN = 'admin';
    const ROLE_KORNAS = 'kornas';
    const ROLE_KORWIL = 'korwil';
    const ROLE_KORDA = 'korda';
    const ROLE_KORCAM = 'korcam';
    const ROLE_KORDES = 'kordes';
    const ROLE_MEMBER = 'member';

    /**
     * Status constants
     */
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const STATUS_PENDING = 'pending';
    const STATUS_BANNED = 'banned';

    protected $fillable = [
        'name',
        'email',
        'password',
        'position_id',
        'phone',
        'address',
        'province_id',
        'kab_kota_id',
        'kecamatan_id',
        'desa_id',
        'role',
        'status',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Relasi ke Position
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }

    /**
     * Relasi ke Registrations
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Check jika user adalah superadmin
     */
    public function isSuperAdmin(): bool
    {
        return $this->role === self::ROLE_SUPERADMIN;
    }

    /**
     * Check jika user adalah admin atau lebih tinggi
     */
    public function isAdmin(): bool
    {
        return in_array($this->role, [self::ROLE_SUPERADMIN, self::ROLE_ADMIN]);
    }

    /**
     * Check jika user adalah pimpinan
     */
    public function isPimpinan(): bool
    {
        return in_array($this->role, [
            self::ROLE_KORNAS,
            self::ROLE_KORWIL,
            self::ROLE_KORDA,
            self::ROLE_KORCAM,
            self::ROLE_KORDES,
        ]);
    }

    /**
     * Check jika user aktif
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    /**
     * Get avatar URL
     */
    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&background=8B0000&color=fff';
    }

    /**
     * Get role label
     */
    public function getRoleLabelAttribute(): string
    {
        $labels = [
            self::ROLE_SUPERADMIN => 'Super Admin',
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_KORNAS => 'Koordinator Nasional',
            self::ROLE_KORWIL => 'Koordinator Wilayah',
            self::ROLE_KORDA => 'Koordinator Daerah',
            self::ROLE_KORCAM => 'Koordinator Kecamatan',
            self::ROLE_KORDES => 'Koordinator Desa',
            self::ROLE_MEMBER => 'Anggota',
        ];

        return $labels[$this->role] ?? 'Unknown';
    }
}
```

---

## 4. MEMBUAT RELATIONS

Sekarang semua model sudah punya relations yang lengkap. Ringkasan relations:

```
User
├── belongsTo Position
└── hasMany Registrations

Position
├── belongsTo Category
├── belongsTo Level (PositionLevel)
├── belongsTo Parent (Position)
├── hasMany Children (Position)
├── belongsTo User
├── belongsTo Province
├── belongsTo KabKota
├── belongsTo Kecamatan
└── belongsTo Desa

Province
├── hasMany KabKotas
└── hasMany Positions

KabKota
├── belongsTo Province
├── hasMany Kecamatans
└── hasMany Positions

Kecamatan
├── belongsTo KabKota
├── hasMany Desas
└── hasMany Positions

Desa
├── belongsTo Kecamatan
└── hasMany Positions

Category
└── hasMany Positions

PositionLevel
└── hasMany Positions
```

---

## 5. INSTALASI LARAVEL BREEZE

Laravel Breeze adalah package authentication yang simple dan lengkap.

### 5.1 Install Breeze

```bash
composer require laravel/breeze --dev
```

### 5.2 Install Breeze Stack

```bash
php artisan breeze:install blade
```

Pilih opsi:

```
┌─────────────────────────────────────────────────┐
│  Which Breeze stack would you like to install?  │
├─────────────────────────────────────────────────┤
│                                                 │
│  > Blade                                        │
│    React                                        │
│    Vue                                          │
│    API only                                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

Pilih **Blade** (untuk admin panel sederhana)

```
┌─────────────────────────────────────────────────┐
│  Would you like dark mode support?              │
├─────────────────────────────────────────────────┤
│                                                 │
│  > No                                           │
│    Yes                                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

Pilih **No**

```
┌─────────────────────────────────────────────────┐
│  Which testing framework do you prefer?         │
├─────────────────────────────────────────────────┤
│                                                 │
│  > PHPUnit                                      │
│    Pest                                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

Pilih **PHPUnit**

### 5.3 Install NPM Dependencies

```bash
npm install
```

### 5.4 Build Assets

```bash
npm run build
```

### 5.5 Run Migration

```bash
php artisan migrate
```

---

## 6. KONFIGURASI AUTHENTICATION

### 6.1 Update .env

Tambahkan konfigurasi berikut:

```env
# App
APP_NAME="KNMP Backend"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knmp_db
DB_USERNAME=root
DB_PASSWORD=

# Mail (untuk verifikasi email)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@knmp.org"
MAIL_FROM_NAME="${APP_NAME}"
```

### 6.2 Tambahkan Middleware untuk Role

Buat file baru `app/Http/Middleware/CheckRole.php`:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        // Check if user has the required role or higher
        $roleHierarchy = [
            'member' => 1,
            'kordes' => 2,
            'korcam' => 3,
            'korda' => 4,
            'korwil' => 5,
            'kornas' => 6,
            'admin' => 7,
            'superadmin' => 8,
        ];

        $userLevel = $roleHierarchy[$user->role] ?? 0;
        $requiredLevel = $roleHierarchy[$role] ?? 0;

        if ($userLevel < $requiredLevel) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
```

### 6.3 Register Middleware

Buka `app/Http/Kernel.php` dan tambahkan:

```php
protected $middlewareAliases = [
    // ... existing aliases
    'role' => \App\Http\Middleware\CheckRole::class,
];
```

### 6.4 Gunakan Middleware di Routes

Buka `routes/web.php`:

```php
<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PositionController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/', function () {
    return view('welcome');
});

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware(['verified', 'role:member'])
        ->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes (requires admin role)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'admin'])->name('dashboard');
    
    // Position Management
    Route::resource('positions', PositionController::class);
    
    // User Management
    Route::resource('users', UserController::class);
});

// Super Admin Routes
Route::middleware(['auth', 'role:superadmin'])->prefix('superadmin')->name('superadmin.')->group(function () {
    // Additional super admin routes
});

require __DIR__ . '/auth.php';
```

---

## 7. MEMBUAT ADMIN PANEL

### 7.1 Buat Dashboard Controller

```bash
php artisan make:controller Admin/DashboardController
```

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\User;
use App\Models\Registration;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_positions' => Position::count(),
            'vacant_positions' => Position::vacant()->count(),
            'filled_positions' => Position::filled()->count(),
            'total_users' => User::count(),
            'active_users' => User::where('status', 'active')->count(),
            'pending_registrations' => Registration::where('status', 'submitted')->count(),
        ];

        $recentRegistrations = Registration::with('user', 'position')
            ->latest()
            ->take(5)
            ->get();

        return view('dashboard', compact('stats', 'recentRegistrations'));
    }

    public function admin()
    {
        return $this->index();
    }
}
```

### 7.2 Buat Position Controller

```bash
php artisan make:controller Admin/PositionController --resource
```

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\Category;
use App\Models\PositionLevel;
use App\Models\Province;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Position::with(['category', 'level', 'user', 'province']);

        // Filter by status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Filter by level
        if ($request->level) {
            $query->where('level_id', $request->level);
        }

        // Filter by category
        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        // Search
        if ($request->search) {
            $query->where('position_name', 'like', "%{$request->search}%");
        }

        $positions = $query->ordered()->paginate(20);

        $levels = PositionLevel::ordered()->get();
        $categories = Category::ordered()->get();

        return view('admin.positions.index', compact('positions', 'levels', 'categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::ordered()->get();
        $levels = PositionLevel::ordered()->get();
        $provinces = Province::all();

        return view('admin.positions.create', compact('categories', 'levels', 'provinces'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'position_name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'level_id' => 'nullable|exists:position_levels,id',
            'parent_id' => 'nullable|exists:positions,id',
            'province_id' => 'nullable|exists:provinces,id',
            'status' => 'required|in:vacant,filled,pending',
            'term_start' => 'nullable|date',
            'term_end' => 'nullable|date',
            'responsibilities' => 'nullable|array',
            'requirements' => 'nullable|array',
        ]);

        Position::create($validated);

        return redirect()->route('admin.positions.index')
            ->with('success', 'Position created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Position $position)
    {
        $position->load(['category', 'level', 'user', 'province', 'children']);

        return view('admin.positions.show', compact('position'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        $categories = Category::ordered()->get();
        $levels = PositionLevel::ordered()->get();
        $provinces = Province::all();

        return view('admin.positions.edit', compact('position', 'categories', 'levels', 'provinces'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'position_name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'level_id' => 'nullable|exists:position_levels,id',
            'parent_id' => 'nullable|exists:positions,id',
            'province_id' => 'nullable|exists:provinces,id',
            'user_id' => 'nullable|exists:users,id',
            'status' => 'required|in:vacant,filled,pending',
            'term_start' => 'nullable|date',
            'term_end' => 'nullable|date',
            'responsibilities' => 'nullable|array',
            'requirements' => 'nullable|array',
        ]);

        $position->update($validated);

        return redirect()->route('admin.positions.index')
            ->with('success', 'Position updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Position $position)
    {
        $position->delete();

        return redirect()->route('admin.positions.index')
            ->with('success', 'Position deleted successfully.');
    }

    /**
     * Assign user to position
     */
    public function assignUser(Request $request, Position $position)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $position->update([
            'user_id' => $validated['user_id'],
            'status' => Position::STATUS_FILLED,
        ]);

        return redirect()->back()
            ->with('success', 'User assigned to position successfully.');
    }

    /**
     * Remove user from position
     */
    public function removeUser(Position $position)
    {
        $position->update([
            'user_id' => null,
            'status' => Position::STATUS_VACANT,
        ]);

        return redirect()->back()
            ->with('success', 'User removed from position successfully.');
    }
}
```

---

## 8. SEEDING DATA AWAL

### 8.1 Buat Seeder untuk Position Levels

```bash
php artisan make:seeder PositionLevelSeeder
```

Buka `database/seeders/PositionLevelSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionLevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            [
                'name' => 'Koordinator Nasional',
                'code' => 'KORNAS',
                'short_name' => 'Kornas',
                'title' => 'Presiden',
                'total_positions' => 1,
                'color' => '#8B0000',
                'icon' => 'Crown',
                'hierarchy' => 1,
                'description' => 'Pimpinan tertinggi KNMP yang bertanggung jawab atas strategi nasional',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Koordinator Wilayah',
                'code' => 'KORWIL',
                'short_name' => 'Korwil',
                'title' => 'Panglima Wilayah',
                'total_positions' => 38,
                'color' => '#008F3D',
                'icon' => 'Map',
                'hierarchy' => 2,
                'description' => 'Pimpinan tingkat provinsi yang mengkoordinasikan seluruh aktivitas KNMP di wilayahnya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Koordinator Daerah',
                'code' => 'KORDA',
                'short_name' => 'Korda',
                'title' => 'Panglima Distrik',
                'total_positions' => 514,
                'color' => '#3b82f6',
                'icon' => 'Building',
                'hierarchy' => 3,
                'description' => 'Pimpinan tingkat kabupaten/kota yang mengelola operasional KNMP di daerahnya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Koordinator Kecamatan',
                'code' => 'KORCAM',
                'short_name' => 'Korcam',
                'title' => 'Panglima Sektor',
                'total_positions' => 7252,
                'color' => '#f59e0b',
                'icon' => 'MapPin',
                'hierarchy' => 4,
                'description' => 'Pimpinan tingkat kecamatan yang mengkoordinasikan aktivitas KNMP di kecamatannya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Koordinator Desa/Kelurahan',
                'code' => 'KORDES',
                'short_name' => 'Kordes',
                'title' => 'Komandan Lapangan',
                'total_positions' => 83763,
                'color' => '#8b5cf6',
                'icon' => 'Home',
                'hierarchy' => 5,
                'description' => 'Pimpinan tingkat desa/kelurahan yang mengelola operasional harian KNMP di desanya',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('position_levels')->insert($levels);

        $this->command->info('Position levels seeded successfully!');
    }
}
```

### 8.2 Buat Seeder untuk Categories

```bash
php artisan make:seeder CategorySeeder
```

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Dewan Pendiri',
                'type' => 'founder',
                'description' => '9 Anggota Pendiri KNMP dengan quorum ganjil untuk pengambilan keputusan',
                'icon' => 'Star',
                'color' => '#8B0000',
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dewan Pembina',
                'type' => 'advisor',
                'description' => 'Dewan yang membina dan memberikan arahan strategis kepada KNMP',
                'icon' => 'Shield',
                'color' => '#008F3D',
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pengurus Harian Nasional (Bakornas)',
                'type' => 'board',
                'description' => 'Pengurus harian yang menjalankan operasional KNMP tingkat nasional',
                'icon' => 'Building',
                'color' => '#3b82f6',
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dewan Pengawas',
                'type' => 'supervisor',
                'description' => 'Dewan yang mengawasi jalannya operasional dan keuangan KNMP',
                'icon' => 'Eye',
                'color' => '#f59e0b',
                'sort_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dewan Penasihat',
                'type' => 'advisor',
                'description' => 'Dewan yang memberikan nasihat dan konsultasi kepada pengurus KNMP',
                'icon' => 'Award',
                'color' => '#8b5cf6',
                'sort_order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Koordinator Bidang',
                'type' => 'coordinator',
                'description' => 'Koordinator untuk 15 bidang kegiatan KNMP',
                'icon' => 'Users',
                'color' => '#008F3D',
                'sort_order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sekretaris Koordinator Bidang',
                'type' => 'secretary',
                'description' => 'Sekretaris pendukung untuk setiap koordinator bidang',
                'icon' => 'FileText',
                'color' => '#6b7280',
                'sort_order' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('categories')->insert($categories);

        $this->command->info('Categories seeded successfully!');
    }
}
```

### 8.3 Buat Seeder untuk Positions (KNMP Structure)

```bash
php artisan make:seeder PositionSeeder
```

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        // Get IDs
        $kornasLevel = DB::table('position_levels')->where('code', 'KORNAS')->first()->id;
        $korwilLevel = DB::table('position_levels')->where('code', 'KORWIL')->first()->id;
        $kordaLevel = DB::table('position_levels')->where('code', 'KORDA')->first()->id;
        $korcamLevel = DB::table('position_levels')->where('code', 'KORCAM')->first()->id;
        $kordesLevel = DB::table('position_levels')->where('code', 'KORDES')->first()->id;

        $founderCategory = DB::table('categories')->where('type', 'founder')->first()->id;
        $advisorCategory = DB::table('categories')->where('type', 'advisor')->first()->id;
        $boardCategory = DB::table('categories')->where('type', 'board')->first()->id;
        $supervisorCategory = DB::table('categories')->where('type', 'supervisor')->first()->id;
        $coordinatorCategory = DB::table('categories')->where('type', 'coordinator')->first()->id;
        $secretaryCategory = DB::table('categories')->where('type', 'secretary')->first()->id;

        $positions = [];

        // =====================
        // DEWAN PENDIRI (9 Anggota)
        // =====================
        $founders = [
            ['name' => 'Prof. Wirono, S.E., M.Pd', 'position' => 'Pendiri ke-1 - Presiden / Ketua Umum', 'term_end' => '2029'],
            ['name' => 'Drs. H. Arif Rachman Hakim, M.M.', 'position' => 'Pendiri ke-2 - Wakil Presiden', 'term_end' => '2029'],
            ['name' => 'Hj. Inna Hadianala, S.E.', 'position' => 'Pendiri ke-3 - Ketua Dewan Pembina', 'term_end' => 'Seumur Hidup'],
            ['name' => 'Dr. Cecep Sumarno', 'position' => 'Pendiri ke-4 - Sekretaris Jenderal', 'term_end' => '2029'],
            ['name' => 'Tn. H. Gugun Gunara', 'position' => 'Pendiri ke-5 - Wasekjen & COO', 'term_end' => '2029'],
            ['name' => 'Fawwaz Arif Al Jabar, S.E., M.M.', 'position' => 'Pendiri ke-6 - Ketua Dewan Penasihat', 'term_end' => '2029'],
            ['name' => 'Andi Darmadji, S.E.', 'position' => 'Pendiri ke-7 - Korwil Kalimantan', 'term_end' => '2029'],
            ['name' => 'Dr. Habib', 'position' => 'Pendiri ke-8 - Anggota Dewan Pengawas', 'term_end' => '2029'],
            ['name' => 'Prof. Dr. Tedy Mantoro', 'position' => 'Pendiri ke-9 - Ketua Dewan Pengawas', 'term_end' => '2029'],
        ];

        foreach ($founders as $index => $founder) {
            $positions[] = [
                'position_name' => $founder['position'],
                'category_id' => $founderCategory,
                'level_id' => $kornasLevel,
                'status' => 'filled',
                'term_start' => '2026-01-01',
                'term_end' => $founder['term_end'] === 'Seumur Hidup' ? null : $founder['term_end'] . '-12-31',
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // =====================
        // DEWAN PEMBINA
        // =====================
        $pembinaPositions = [
            ['position' => 'Ketua Dewan Pembina', 'filled' => true],
            ['position' => 'Wakil Ketua Pembina', 'filled' => false],
            ['position' => 'Sekretaris Pembina', 'filled' => false],
            ['position' => 'Anggota Pembina Bidang Pemerintahan', 'filled' => false],
            ['position' => 'Anggota Pembina Bidang Ekonomi', 'filled' => false],
            ['position' => 'Anggota Pembina Bidang Sosial', 'filled' => false],
        ];

        foreach ($pembinaPositions as $index => $pos) {
            $positions[] = [
                'position_name' => $pos['position'],
                'category_id' => $advisorCategory,
                'level_id' => $kornasLevel,
                'status' => $pos['filled'] ? 'filled' : 'vacant',
                'term_start' => '2026-01-01',
                'term_end' => '2029-12-31',
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // =====================
        // PENGURUS HARIAN NASIONAL
        // =====================
        $pengurusPositions = [
            ['position' => 'Presiden / Ketua Umum', 'filled' => true],
            ['position' => 'Wakil Presiden / Wakil Ketua Umum', 'filled' => true],
            ['position' => 'Sekretaris Jenderal (Sekjen)', 'filled' => true],
            ['position' => 'Wakil Sekretaris Jenderal (Wasekjen)', 'filled' => true],
            ['position' => 'Bendahara Umum / CFO', 'filled' => false],
            ['position' => 'Wakil Bendahara', 'filled' => false],
        ];

        foreach ($pengurusPositions as $index => $pos) {
            $positions[] = [
                'position_name' => $pos['position'],
                'category_id' => $boardCategory,
                'level_id' => $kornasLevel,
                'status' => $pos['filled'] ? 'filled' : 'vacant',
                'term_start' => '2026-01-01',
                'term_end' => '2029-12-31',
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // =====================
        // DEWAN PENGAWAS
        // =====================
        $pengawasPositions = [
            ['position' => 'Ketua Dewan Pengawas', 'filled' => true],
            ['position' => 'Wakil Ketua Pengawas', 'filled' => true],
            ['position' => 'Sekretaris Pengawas', 'filled' => true],
            ['position' => 'Anggota Pengawas Bidang Keuangan', 'filled' => false],
            ['position' => 'Anggota Pengawas Bidang Operasional', 'filled' => false],
            ['position' => 'Anggota Pengawas Bidang Organisasi', 'filled' => false],
        ];

        foreach ($pengawasPositions as $index => $pos) {
            $positions[] = [
                'position_name' => $pos['position'],
                'category_id' => $supervisorCategory,
                'level_id' => $kornasLevel,
                'status' => $pos['filled'] ? 'filled' : 'vacant',
                'term_start' => '2026-01-01',
                'term_end' => '2029-12-31',
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // =====================
        // DEWAN PENASIHAT
        // =====================
        $penasihatPositions = [
            ['position' => 'Ketua Dewan Penasihat', 'filled' => true],
            ['position' => 'Ketua Dewan Penasihat Kehormatan', 'filled' => true],
            ['position' => 'Wakil Ketua Penasihat', 'filled' => false],
            ['position' => 'Sekretaris Penasihat', 'filled' => false],
            ['position' => 'Anggota Penasihat Bidang Hukum', 'filled' => true],
            ['position' => 'Anggota Penasihat Bidang Ekonomi', 'filled' => false],
            ['position' => 'Anggota Penasihat Bidang Teknologi', 'filled' => false],
            ['position' => 'Anggota Penasihat Bidang Pertanian', 'filled' => false],
        ];

        foreach ($penasihatPositions as $index => $pos) {
            $positions[] = [
                'position_name' => $pos['position'],
                'category_id' => $advisorCategory,
                'level_id' => $kornasLevel,
                'status' => $pos['filled'] ? 'filled' : 'vacant',
                'term_start' => '2026-01-01',
                'term_end' => '2029-12-31',
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // =====================
        // KOORDINATOR 15 BIDANG
        // =====================
        $bidangPositions = [
            ['position' => 'Bidang Organisasi & Keanggotaan', 'filled' => true],
            ['position' => 'Bidang Pangan & Ketahanan Pangan', 'filled' => true],
            ['position' => 'Bidang Industri & Manufaktur', 'filled' => false],
            ['position' => 'Bidang Logistik & Distribusi', 'filled' => true],
            ['position' => 'Bidang Kesehatan & Farmasi', 'filled' => false],
            ['position' => 'Bidang Keuangan & Perbankan', 'filled' => true],
            ['position' => 'Bidang Investasi & ESG', 'filled' => false],
            ['position' => 'Bidang Bisnis Kemitraan & UMKM', 'filled' => true],
            ['position' => 'Bidang Digital & Teknologi', 'filled' => true],
            ['position' => 'Bidang Holding Trading Ekosistem', 'filled' => false],
            ['position' => 'Bidang Wisata, Umroh & Haji', 'filled' => true],
            ['position' => 'Bidang Hukum & Advokasi', 'filled' => false],
            ['position' => 'Bidang Pengembangan SDM & Diklat', 'filled' => false],
            ['position' => 'Bidang Ekspor Impor & Perdagangan Internasional', 'filled' => false],
            ['position' => 'Bidang Hubungan Masyarakat & Media', 'filled' => false],
        ];

        foreach ($bidangPositions as $index => $pos) {
            $positions[] = [
                'position_name' => $pos['position'],
                'category_id' => $coordinatorCategory,
                'level_id' => $kornasLevel,
                'status' => $pos['filled'] ? 'filled' : 'vacant',
                'term_start' => '2026-01-01',
                'term_end' => '2029-12-31',
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert all positions
        DB::table('positions')->insert($positions);

        $this->command->info('Positions seeded successfully!');
    }
}
```

### 8.4 Buat Super Admin Seeder

```bash
php artisan make:seeder SuperAdminSeeder
```

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@knmp.org',
            'password' => bcrypt('password123'),  // Ganti dengan password yang kuat!
            'role' => 'superadmin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        $this->command->info('Super Admin created successfully!');
        $this->command->info('Email: admin@knmp.org');
        $this->command->info('Password: password123');
        $this->command->warn('IMPORTANT: Change the password immediately after first login!');
    }
}
```

### 8.5 Update DatabaseSeeder

Buka `database/seeders/DatabaseSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PositionLevelSeeder::class,
            CategorySeeder::class,
            PositionSeeder::class,
            SuperAdminSeeder::class,
        ]);
    }
}
```

### 8.6 Jalankan Semua Seeder

```bash
php artisan db:seed
```

Output:

```
Seeding database.
Position levels seeded successfully!
Categories seeded successfully!
Positions seeded successfully!
Super Admin created successfully!
Email: admin@knmp.org
Password: password123
IMPORTANT: Change the password immediately after first login!
```

---

## ✅ CHECKLIST PART 2

- [ ] Migration dibuat untuk semua tabel
- [ ] Migration dijalankan berhasil
- [ ] Model dibuat dengan relations lengkap
- [ ] Laravel Breeze terinstall
- [ ] Middleware role dibuat
- [ ] Admin Controller dibuat
- [ ] Seeder dibuat untuk semua data awal
- [ ] Super Admin bisa login
- [ ] Data posisi tersimpan di database

---

## 📖 LANJUT KE PART 3

**PART 3: Position Management System** → `PART-3-POSITION-MANAGEMENT.md`

---

*Dokumentasi ini dibuat dengan ❤️ untuk KNMP*
