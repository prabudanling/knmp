# 📚 TUTORIAL LENGKAP: KNMP Frontend × Laravel Backend Integration

## Panduan Konfigurasi dan Pengembangan Backend untuk Website KNMP

---

## 📋 DAFTAR ISI

1. [Arsitektur Sistem](#1-arsitektur-sistem)
2. [Persiapan Environment](#2-persiapan-environment)
3. [Struktur Database](#3-struktur-database)
4. [API Endpoints](#4-api-endpoints)
5. [Autentikasi & Otorisasi](#5-autentikasi--otorisasi)
6. [Implementasi Fitur](#6-implementasi-fitur)
7. [Konfigurasi Frontend](#7-konfigurasi-frontend)
8. [Testing & Deployment](#8-testing--deployment)

---

## 1. ARSITEKTUR SISTEM

### 1.1 Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    KNMP DIGITAL PLATFORM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐           ┌─────────────────┐            │
│   │   NEXT.JS 16    │   REST    │    LARAVEL 11   │            │
│   │   FRONTEND      │◄────────►│    BACKEND      │            │
│   │   (Port 3000)   │   API    │    (Port 8000)  │            │
│   └─────────────────┘           └────────┬────────┘            │
│                                          │                      │
│                           ┌──────────────┼──────────────┐      │
│                           │              │              │      │
│                    ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐│
│                    │   MySQL     │ │   Redis   │ │  File       ││
│                    │   Database  │ │   Cache   │ │  Storage    ││
│                    └─────────────┘ └───────────┘ └─────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js (App Router) | 16.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | shadcn/ui | latest |
| Animation | Framer Motion | 11.x |
| Backend | Laravel | 11.x |
| Database | MySQL / MariaDB | 8.x / 10.x |
| Cache | Redis | 7.x |
| Auth | Laravel Sanctum | 4.x |
| API Docs | Swagger/OpenAPI | 3.x |

### 1.3 Dual-Entity Architecture (JE-P3 × KNMP)

```
┌─────────────────────────────────────────────────────────────────┐
│                     DUAL-ENTITY SYSTEM                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌───────────────────┐         ┌───────────────────┐          │
│   │      JE-P3        │         │       KNMP        │          │
│   │    (Asosiasi)     │◄───────►│    (Koperasi)     │          │
│   │                   │   JSC   │                   │          │
│   │ • Narasi Global   │         │ • Aset Produktif  │          │
│   │ • Brand Owner     │         │ • Anggota         │          │
│   │ • Investor Rel.   │         │ • SHU & RAT       │          │
│   │ • IP Licensing    │         │ • Unit Usaha      │          │
│   └───────────────────┘         └───────────────────┘          │
│                                                                 │
│                    STRATEGIC ALLIANCE FRAMEWORK                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. PERSIAPAN ENVIRONMENT

### 2.1 Requirements

```bash
# PHP
php >= 8.2
composer >= 2.x

# Node.js
node >= 18.x
bun >= 1.x

# Database
mysql >= 8.0
redis >= 7.0
```

### 2.2 Laravel Installation

```bash
# Create new Laravel project
composer create-project laravel/laravel knmp-backend
cd knmp-backend

# Install dependencies
composer require laravel/sanctum
composer require laravel/passport  # optional for OAuth2
composer require spatie/laravel-permission
composer require intervention/image
composer require maatwebsite/excel
```

### 2.3 Environment Configuration

```env
# .env
APP_NAME="KNMP Backend"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knmp_db
DB_USERNAME=root
DB_PASSWORD=

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost
```

---

## 3. STRUKTUR DATABASE

### 3.1 Core Tables

#### Users Table
```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('phone', 20)->nullable();
    $table->text('address')->nullable();
    $table->string('village_id', 20)->nullable();
    $table->string('district_id', 20)->nullable();
    $table->string('regency_id', 20)->nullable();
    $table->string('province_id', 20)->nullable();
    $table->enum('kpa_type', ['petani', 'pengusaha', 'koperasi', 'pekerja', 'konsumen', 'investor'])->default('petani');
    $table->integer('tier_level')->default(1);
    $table->decimal('simpanan_pokok', 15, 2)->default(0);
    $table->decimal('simpanan_wajib', 15, 2)->default(0);
    $table->decimal('simpanan_sukarela', 15, 2)->default(0);
    $table->enum('status', ['pending', 'active', 'suspended', 'banned'])->default('pending');
    $table->string('blockchain_id')->nullable()->unique();
    $table->json('metadata')->nullable();
    $table->rememberToken();
    $table->timestamps();
    $table->softDeletes();
});
```

#### Tiers Table
```php
Schema::create('tiers', function (Blueprint $table) {
    $table->id();
    $table->integer('level')->unique();
    $table->string('name');
    $table->string('subtitle');
    $table->decimal('price', 15, 2);
    $table->decimal('original_price', 15, 2);
    $table->text('description');
    $table->json('benefits');
    $table->string('color')->default('#8B0000');
    $table->string('icon')->default('Users');
    $table->boolean('has_usaha_rights')->default(false);
    $table->boolean('has_voting_rights')->default(false);
    $table->boolean('has_shu_rights')->default(false);
    $table->boolean('has_hpkw')->default(false);
    $table->string('hpkw_level')->nullable();
    $table->boolean('active')->default(true);
    $table->timestamps();
});
```

#### RAT & Voting Tables
```php
Schema::create('rats', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->year('year');
    $table->dateTime('scheduled_at');
    $table->dateTime('started_at')->nullable();
    $table->dateTime('ended_at')->nullable();
    $table->enum('status', ['scheduled', 'active', 'completed', 'cancelled'])->default('scheduled');
    $table->decimal('quorum_required', 5, 2)->default(50.00);
    $table->decimal('quorum_achieved', 5, 2)->default(0);
    $table->text('notes')->nullable();
    $table->timestamps();
});

Schema::create('votings', function (Blueprint $table) {
    $table->id();
    $table->foreignId('rat_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('description');
    $table->enum('type', ['yes_no', 'multiple_choice', 'election'])->default('yes_no');
    $table->enum('category', ['pengesahan', 'pemilihan', 'shu', 'lainnya'])->default('lainnya');
    $table->enum('status', ['draft', 'active', 'completed', 'cancelled'])->default('draft');
    $table->dateTime('starts_at');
    $table->dateTime('ends_at');
    $table->decimal('quorum_required', 5, 2)->default(50.00);
    $table->decimal('quorum_achieved', 5, 2)->default(0);
    $table->boolean('blockchain_recorded')->default(false);
    $table->string('blockchain_tx')->nullable();
    $table->timestamps();
});

Schema::create('votes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('voting_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('voting_option_id')->nullable()->constrained();
    $table->enum('vote', ['setuju', 'tidak_setuju', 'abstain'])->nullable();
    $table->string('kpa_type');
    $table->decimal('voting_power', 5, 2);
    $table->string('blockchain_tx')->nullable();
    $table->timestamps();
    $table->unique(['voting_id', 'user_id']);
});
```

#### SHU Tables
```php
Schema::create('shu_allocations', function (Blueprint $table) {
    $table->id();
    $table->year('year');
    $table->decimal('total_shu', 20, 2);
    $table->decimal('dana_cadangan', 20, 2)->default(0); // 30%
    $table->decimal('jasa_modal', 20, 2)->default(0); // 10%
    $table->decimal('jasa_usaha', 20, 2)->default(0); // 40%
    $table->decimal('dana_pengurus', 20, 2)->default(0); // 5%
    $table->decimal('dana_pendidikan', 20, 2)->default(0); // 5%
    $table->decimal('dana_sosial', 20, 2)->default(0); // 5%
    $table->decimal('dana_teknologi', 20, 2)->default(0); // 5%
    $table->enum('status', ['draft', 'rat_approved', 'distributed'])->default('draft');
    $table->timestamp('rat_approved_at')->nullable();
    $table->foreignId('rat_id')->nullable();
    $table->timestamps();
});

Schema::create('shu_distributions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('shu_allocation_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->decimal('jasa_usaha_amount', 15, 2)->default(0);
    $table->decimal('jasa_modal_amount', 15, 2)->default(0);
    $table->decimal('total_amount', 15, 2)->default(0);
    $table->decimal('transaction_volume', 20, 2)->default(0);
    $table->decimal('total_simpanan', 15, 2)->default(0);
    $table->enum('status', ['pending', 'distributed', 'withdrawn'])->default('pending');
    $table->timestamp('distributed_at')->nullable();
    $table->timestamp('withdrawn_at')->nullable();
    $table->timestamps();
});
```

---

## 4. API ENDPOINTS

### 4.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login user |
| POST | /api/v1/auth/logout | Logout user |
| POST | /api/v1/auth/forgot-password | Request password reset |
| POST | /api/v1/auth/reset-password | Reset password |

### 4.2 User & Membership

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/user | Get current user profile |
| PUT | /api/v1/user | Update profile |
| GET | /api/v1/dashboard | Get dashboard data |
| GET | /api/v1/tiers | List all membership tiers |
| POST | /api/v1/membership/register | Register membership |
| GET | /api/v1/membership/status | Get membership status |
| GET | /api/v1/membership/card | Get digital membership card |

### 4.3 RAT & Voting

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/rat | List all RAT |
| GET | /api/v1/rat/{id} | Get RAT detail |
| GET | /api/v1/rat/{ratId}/votings | List votings in RAT |
| GET | /api/v1/rat/votings/{id} | Get voting detail |
| POST | /api/v1/rat/votings/{id}/vote | Cast vote |
| GET | /api/v1/rat/votings/{id}/result | Get voting results |

### 4.4 SHU

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/shu | List SHU allocations |
| GET | /api/v1/shu/my | Get user's SHU |
| POST | /api/v1/shu/withdraw | Request SHU withdrawal |

### 4.5 Academy

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/courses | List courses |
| GET | /api/v1/courses/{slug} | Get course detail |
| POST | /api/v1/academy/enroll/{id} | Enroll to course |
| GET | /api/v1/academy/my-courses | Get enrolled courses |
| POST | /api/v1/academy/complete/{id} | Complete course |
| GET | /api/v1/academy/certificates | Get user certificates |

---

## 5. KPA VOTING POWER

```php
const KPA_VOTING_POWER = [
    'petani' => 30,      // KPA-1: 30%
    'pengusaha' => 20,   // KPA-2: 20%
    'koperasi' => 20,    // KPA-3: 20%
    'pekerja' => 10,     // KPA-4: 10%
    'konsumen' => 10,    // KPA-5: 10%
    'investor' => 10,    // KPA-6: 10% (no veto rights!)
];
```

---

## 6. SHU ALLOCATION FORMULA

```php
const SHU_PERCENTAGES = [
    'dana_cadangan' => 30,    // Dana Cadangan: 30%
    'jasa_modal' => 10,       // Jasa Modal: 10%
    'jasa_usaha' => 40,       // Jasa Usaha Anggota: 40%
    'dana_pengurus' => 5,     // Dana Pengurus & Pengawas: 5%
    'dana_pendidikan' => 5,   // Dana Pendidikan: 5%
    'dana_sosial' => 5,       // Dana Sosial: 5%
    'dana_teknologi' => 5,    // Dana Teknologi Desa: 5%
];

// Jasa Usaha = Proportional to transaction volume
// Jasa Modal = Proportional to simpanan (pokok + wajib + sukarela)
```

---

## 7. FRONTEND CONFIGURATION

### 7.1 API Client

```typescript
// src/lib/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 7.2 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=KNMP
```

---

## 8. DEPLOYMENT

### 8.1 Laravel Commands

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:work --daemon
```

### 8.2 Testing

```bash
php artisan test
php artisan test --filter VotingTest
```

---

*Dokumentasi ini adalah panduan lengkap untuk integrasi frontend Next.js dengan backend Laravel.*

*Versi: 1.0 | Diperbarui: Maret 2026*
