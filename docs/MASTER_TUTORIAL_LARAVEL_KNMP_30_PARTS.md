# 🚀 MASTER TUTORIAL LARAVEL BACKEND KNMP
## Dari Nol Sampai Jadi - 30 Part Super Lengkap
### Untuk Newbie dengan Shared Hosting Tanpa SSH

---

# 📖 BAGIAN A: GAMBARAN SISTEM FINAL

## Apa yang Akan Kita Bangun?

Bayangkan seperti ini:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ARSITEKTUR SISTEM KNMP                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐  │
│  │   VERCEL        │         │   CPANEL        │         │  LOCALHOST   │  │
│  │   (Cloud)       │         │   (Shared Host) │         │  (Komputermu)│  │
│  └────────┬────────┘         └────────┬────────┘         └──────┬───────┘  │
│           │                           │                          │          │
│           ▼                           ▼                          ▼          │
│  ┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐  │
│  │ kopnusa.id      │   API   │ api.kopnusa.id  │  DEPLOY │  Laravel     │  │
│  │ (Frontend)      │◄───────►│ (Backend API)   │◄────────│  Development │  │
│  │ Next.js         │  JSON   │ Laravel         │  UPLOAD │              │  │
│  └─────────────────┘         └─────────────────┘         └──────────────┘  │
│                                       │                                      │
│                                       ▼                                      │
│                              ┌─────────────────┐                            │
│                              │ admin.kopnusa.id│                            │
│                              │ (Admin Panel)   │                            │
│                              │ Filament        │                            │
│                              └─────────────────┘                            │
│                                       │                                      │
│                                       ▼                                      │
│                              ┌─────────────────┐                            │
│                              │ storage.kopnusa │                            │
│                              │ (File Storage)  │                            │
│                              └─────────────────┘                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Alur Data Pendaftaran Anggota

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   PENGGUNA   │    │   FRONTEND   │    │   BACKEND    │    │    ADMIN     │
│  (Pengunjung)│    │  (Next.js)   │    │  (Laravel)   │    │   (Filament) │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │                   │
       │ 1. Buka Website   │                   │                   │
       │──────────────────►│                   │                   │
       │                   │                   │                   │
       │ 2. Isi Form       │                   │                   │
       │──────────────────►│                   │                   │
       │                   │                   │                   │
       │                   │ 3. Kirim ke API   │                   │
       │                   │──────────────────►│                   │
       │                   │   (POST /api/     │                   │
       │                   │    register)      │                   │
       │                   │                   │                   │
       │                   │                   │ 4. Simpan DB      │
       │                   │                   │─────────►         │
       │                   │                   │                   │
       │                   │                   │ 5. Notifikasi     │
       │                   │                   │──────────────────►│
       │                   │                   │                   │
       │                   │ 6. Response OK    │                   │
       │                   │◄──────────────────│                   │
       │                   │                   │                   │
       │ 7. Terima Konfirmasi                 │                   │
       │◄──────────────────│                   │                   │
       │                   │                   │                   │
       │                   │                   │     8. Review &  │
       │                   │                   │        Approve   │
       │                   │                   │        ◄─────────│
       │                   │                   │                   │
       │                   │                   │ 9. Update Status │
       │                   │                   │─────────►         │
       │                   │                   │                   │
       │ 10. Cek Status    │                   │                   │
       │──────────────────►│                   │                   │
       │                   │ 11. Get Status    │                   │
       │                   │──────────────────►│                   │
       │                   │◄──────────────────│                   │
       │◄──────────────────│                   │                   │
       │                   │                   │                   │
```

---

# 📖 BAGIAN B: KEPUTUSAN ARSITEKTUR FINAL

> ⚠️ **PENTING**: Saya sudah mengambil keputusan arsitektur yang PALING REALISTIS untuk kondisi kamu. Ini bukan teori, ini keputusan praktis berdasarkan:
> - Kamu newbie
> - Shared hosting tanpa SSH
> - Frontend sudah di Vercel
> - Target utama: PENDAFTARAN ANGGOTA CEPAT ON

## 1. Stack Teknologi Final

| Komponen | Teknologi | Alasan |
|----------|-----------|--------|
| **Backend Framework** | Laravel 11 (versi terbaru stabil) | Dokumentasi lengkap, komunitas besar, cocok untuk shared hosting |
| **Database** | MySQL 8.0 / MariaDB | Sudah tersedia di cPanel, mudah dikelola via phpMyAdmin |
| **Authentication** | Laravel Sanctum | Ringan, cocok untuk API, tidak butuh OAuth kompleks |
| **Admin Panel** | Filament 3 | Gratis, powerful, UI modern, tidak butuh coding UI admin |
| **Role & Permission** | Spatie Laravel Permission | Standar industri, mudah dipahami |
| **File Storage** | Local Storage + Public Disk | Simpel, tidak butuh S3, bisa diakses langsung |
| **Notification** | Database + Email (SMTP) | Tidak butuh Redis, bisa polling dari frontend |
| **Queue** | Sync Driver (langsung) | Tidak butuh worker, cocok untuk shared hosting |
| **API Documentation** | Swagger/OpenAPI | Otomatis generate, mudah testing |
| **Realtime** | Polling (bukan WebSocket) | Shared hosting tidak support WebSocket persistent |

## 2. Keputusan Domain & Subdomain

### Yang AKAN Kita Gunakan (MVP):

```
┌─────────────────────────────────────────────────────────────────┐
│ DOMAIN FINAL (YANG AKAN KITA SETUP)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. kopnusa.id                                                  │
│     └── Frontend Next.js (SUDAH ADA di Vercel)                  │
│     └── User mengakses website publik                           │
│                                                                 │
│  2. api.kopnusa.id                                              │
│     └── Laravel REST API                                        │
│     └── Semua request data dari frontend                        │
│     └── Port: 443 (HTTPS)                                       │
│                                                                 │
│  3. admin.kopnusa.id                                            │
│     └── Laravel Admin Panel (Filament)                          │
│     └── Admin kelola data                                       │
│     └── Bisa digabung dengan api (1 Laravel project)            │
│                                                                 │
│  4. storage.kopnusa.id                                          │
│     └── File storage untuk KTP, foto, dokumen                   │
│     └── Bisa menggunakan subfolder dari api                     │
│     └── Contoh: api.kopnusa.id/storage/...                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Yang TIDAK Kita Gunakan (Ditunda):

| Subdomain | Status | Alasan |
|-----------|--------|--------|
| ws.kopnusa.id | ❌ DITUNDA | Shared hosting tidak support WebSocket |
| mail.kopnusa.id | ❌ DITUNDA | Pakai Gmail SMTP lebih mudah |
| cdn.kopnusa.id | ❌ DITUNDA | Tidak butuh untuk MVP |

## 3. Keputusan Arsitektur Database

### Tabel Utama (Yang WAJIB ada):

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA FINAL                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │    users     │      │    roles     │      │ permissions  │  │
│  ├──────────────┤      ├──────────────┤      ├──────────────┤  │
│  │ id           │      │ id           │      │ id           │  │
│  │ name         │      │ name         │      │ name         │  │
│  │ email        │      │ guard_name   │      │ guard_name   │  │
│  │ password     │      └──────────────┘      └──────────────┘  │
│  │ nik          │                                          │    │
│  │ no_hp        │      ┌──────────────┐                    │    │
│  │ no_wa        │      │ model_has_   │                    │    │
│  │ alamat       │      │ roles        │                    │    │
│  │ provinsi_id  │      ├──────────────┤                    │    │
│  │ kabupaten_id │      │ role_id      │                    │    │
│  │ kecamatan_id │      │ model_type   │                    │    │
│  │ kelurahan_id │      │ model_id     │                    │    │
│  │ tier_id      │      └──────────────┘                    │    │
│  │ status       │                                          │    │
│  └──────────────┘                                          │    │
│         │                                                  │    │
│         │ 1:N                                              │    │
│         ▼                                                  │    │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │pendaftaran   │      │    tiers     │      │   jabatan    │  │
│  ├──────────────┤      ├──────────────┤      ├──────────────┤  │
│  │ id           │      │ id           │      │ id           │  │
│  │ no_registrasi│      │ nama_tier    │      │ nama_jabatan │  │
│  │ user_id      │      │ kode_tier    │      │ kode_jabatan │  │
│  │ tier_id      │      │ level        │      │ level        │  │
│  │ status       │      │ harga_normal │      │ tier_id      │  │
│  │ verified_by  │      │ harga_promo  │      │ kuota        │  │
│  │ verified_at  │      │ kuota        │      │ terisi       │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │notifications │      │  settings    │      │ audit_logs   │  │
│  ├──────────────┤      ├──────────────┤      ├──────────────┤  │
│  │ id           │      │ key          │      │ id           │  │
│  │ type         │      │ value        │      │ user_id      │  │
│  │ notifiable_id│      │ group        │      │ action       │  │
│  │ data         │      │ autoload     │      │ model_type   │  │
│  │ read_at      │      └──────────────┘      │ model_id     │  │
│  └──────────────┘                            │ old_data     │  │
│                                              │ new_data     │  │
│                                              └──────────────┘  │
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │struktur_     │      │   wilayah    │      │   files      │  │
│  │ organisasi   │      ├──────────────┤      ├──────────────┤  │
│  ├──────────────┤      │ id           │      │ id           │  │
│  │ id           │      │ nama         │      │ filename     │  │
│  │ user_id      │      │ level        │      │ path         │  │
│  │ jabatan_id   │      │ parent_id    │      │ type         │  │
│  │ wilayah_id   │      │ kode         │      │ size         │  │
│  │ status       │      └──────────────┘      │ uploadable   │  │
│  └──────────────┘                            └──────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 4. Keputusan Deployment Strategy

### Workflow Deployment (Tanpa SSH):

```
┌─────────────────────────────────────────────────────────────────┐
│              DEPLOYMENT WORKFLOW (SHARED HOSTING)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LOCALHOST (Komputermu)                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Develop Laravel                                       │   │
│  │ 2. Test di localhost                                     │   │
│  │ 3. Run migration (php artisan migrate)                   │   │
│  │ 4. Run seeder (php artisan db:seed)                      │   │
│  │ 5. Export database (SQL file)                            │   │
│  │ 6. Optimize (config:cache, route:cache)                  │   │
│  │ 7. Zip semua file project                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼ UPLOAD via File Manager             │
│  CPANEL (Shared Hosting)                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 8. Extract zip ke folder subdomain                       │   │
│  │ 9. Import database via phpMyAdmin                        │   │
│  │ 10. Edit .env untuk production                           │   │
│  │ 11. Set document root ke /public                         │   │
│  │ 12. Test di browser                                      │   │
│  │ 13. Setup SSL (Let's Encrypt)                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5. Keputusan Fitur Prioritas

### Phase 1 - MVP (WAJIB HIDUP DULU):

| No | Fitur | Status | Target |
|----|-------|--------|--------|
| 1 | Form Pendaftaran Anggota | ✅ WAJIB | Part 13 |
| 2 | Simpan ke Database | ✅ WAJIB | Part 8-9 |
| 3 | Admin Lihat Data | ✅ WAJIB | Part 18 |
| 4 | Approve/Reject | ✅ WAJIB | Part 14 |
| 5 | Anti Duplikasi | ✅ WAJIB | Part 15 |
| 6 | Struktur Leader Dasar | ✅ WAJIB | Part 14 |
| 7 | Login Admin | ✅ WAJIB | Part 11 |

### Phase 2 - Enhancement:

| No | Fitur | Status | Target |
|----|-------|--------|--------|
| 8 | Notifikasi Database | ⏳ Phase 2 | Part 17 |
| 9 | Upload File | ⏳ Phase 2 | Part 16 |
| 10 | CMS Dasar | ⏳ Phase 2 | Part 20 |

### Phase 3 - Advanced:

| No | Fitur | Status | Target |
|----|-------|--------|--------|
| 11 | Polling Realtime | ⏳ Phase 3 | Part 17 |
| 12 | Export CSV/Excel | ⏳ Phase 3 | Part 19 |
| 13 | Audit Log | ⏳ Phase 3 | Part 29 |

---

# 📖 BAGIAN C: ROADMAP 30 PART

## Overview Seluruh Tutorial

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ROADMAP 30 PART TUTORIAL                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: FOUNDATION (Part 1-10)                                            │
│  ═════════════════════════════════                                           │
│  Part 1  → Gambaran Sistem & Persiapan Mental                                │
│  Part 2  → Instalasi Tools yang Dibutuhkan                                   │
│  Part 3  → Membuat Project Laravel Baru                                      │
│  Part 4  → Memahami Struktur Folder Laravel                                  │
│  Part 5  → Konfigurasi Environment (.env)                                    │
│  Part 6  → Setup Database MySQL                                              │
│  Part 7  → Migration: Membuat Tabel Users                                    │
│  Part 8  → Migration: Tabel Pendaftaran & Tier                               │
│  Part 9  → Model: Menghubungkan PHP dengan Database                          │
│  Part 10 → Seeder: Mengisi Data Awal                                        │
│                                                                              │
│  PHASE 2: CORE FEATURES (Part 11-20)                                        │
│  ══════════════════════════════════                                          │
│  Part 11 → Authentication: Login Admin                                       │
│  Part 12 → Authorization: Role & Permission                                  │
│  Part 13 → API: Endpoint Pendaftaran Anggota                                │
│  Part 14 → API: Endpoint Pendaftaran Leader                                 │
│  Part 15 → Validasi: Anti Duplikasi & Lock Posisi                           │
│  Part 16 → File Upload: KTP, Foto, Dokumen                                  │
│  Part 17 → Notification: Database & Email                                   │
│  Part 18 → Admin Panel: Dashboard Filament                                  │
│  Part 19 → Admin Panel: Kelola Anggota                                      │
│  Part 20 → CMS: Setting untuk Frontend                                      │
│                                                                              │
│  PHASE 3: INTEGRATION (Part 21-25)                                          │
│  ════════════════════════════════                                            │
│  Part 21 → Struktur Organisasi Otomatis                                      │
│  Part 22 → Integrasi Next.js: Setup API Client                              │
│  Part 23 → Integrasi Next.js: Form Pendaftaran                              │
│  Part 24 → CORS & Environment Vercel                                        │
│  Part 25 → Testing Manual & Checklist QA                                    │
│                                                                              │
│  PHASE 4: DEPLOYMENT (Part 26-30)                                           │
│  ════════════════════════════════                                            │
│  Part 26 → Deploy ke cPanel (Tanpa SSH)                                     │
│  Part 27 → Setup Subdomain & SSL                                            │
│  Part 28 → Maintenance & Backup                                             │
│  Part 29 → Troubleshooting Lengkap                                          │
│  Part 30 → Roadmap Upgrade: VPS, WebSocket, Scaling                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 📖 PART 1: GAMBARAN SISTEM & PERSIAPAN MENTAL

## 1.1 Tujuan Part 1

```
┌─────────────────────────────────────────────────────────────────┐
│ TUJUAN PART 1                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Setelah menyelesaikan Part 1, kamu akan:                        │
│                                                                 │
│ ✅ Memahami gambaran besar sistem yang akan dibangun            │
│ ✅ Memahami peran masing-masing komponen                        │
│ ✅ Mengetahui apa saja yang perlu disiapkan                     │
│ ✅ Memahami workflow development yang akan dijalani             │
│ ✅ Siap secara mental untuk memulai coding                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.2 Hasil Akhir Part 1

Kamu tidak akan membuat kode di Part 1. Tapi kamu akan:
- Memahami arsitektur sistem
- Memiliki checklist persiapan tools
- Memahami workflow yang akan dijalani
- Siap untuk mulai Part 2

## 1.3 Konsep Dasar: Apa itu Backend?

### Analogi Sederhana

Bayangkan sebuah restoran:

```
┌─────────────────────────────────────────────────────────────────┐
│              ANALOGI RESTORAN                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FRONTEND (Next.js)        BACKEND (Laravel)      DATABASE     │
│  ═══════════════════       ═══════════════════     ═════════   │
│                                                                 │
│  ┌──────────────┐         ┌──────────────┐      ┌───────────┐ │
│  │   RUANGAN    │         │    DAPUR     │      │  GUDANG   │ │
│  │   RESTORAN   │         │              │      │  BAHAN    │ │
│  │              │         │  - Chef      │      │           │ │
│  │  - Meja      │◄───────►│  - Koki      │◄────►│  - Data   │ │
│  │  - Kursi     │ Pesanan │  - Waiter    │  Bahan│  - User   │ │
│  │  - Menu      │ Makanan │              │      │  - File   │ │
│  │  - Pelanggan │         │              │      │           │ │
│  └──────────────┘         └──────────────┘      └───────────┘ │
│                                                                 │
│  ALUR:                                                          │
│  1. Pelanggan lihat menu (Frontend tampilkan halaman)          │
│  2. Pelanggan pesan makanan (Frontend kirim request)           │
│  3. Waiter terima pesanan (Backend terima API request)         │
│  4. Koki ambil bahan dari gudang (Backend query database)      │
│  5. Koki masak (Backend proses data)                           │
│  6. Waiter antar makanan (Backend kirim response)              │
│  7. Pelanggan makan (Frontend tampilkan hasil)                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Terminologi Penting

| Istilah | Penjelasan Sederhana | Contoh |
|---------|---------------------|--------|
| **Frontend** | Bagian yang dilihat user di browser | Website kopnusa.id |
| **Backend** | Bagian yang memproses data di server | Laravel API |
| **Database** | Tempat menyimpan data | MySQL |
| **API** | Jembatan komunikasi Frontend-Backend | REST API |
| **Request** | Permintaan dari Frontend ke Backend | POST /api/register |
| **Response** | Jawaban dari Backend ke Frontend | JSON data |
| **JSON** | Format data yang mudah dibaca | `{"status": "success"}` |
| **Endpoint** | Alamat API yang bisa dipanggil | /api/users |
| **CRUD** | Create, Read, Update, Delete | Operasi data dasar |

## 1.4 Gambaran Sistem Lengkap

### Komponen Utama

```
┌─────────────────────────────────────────────────────────────────┐
│                 KOMPONEN SISTEM KNMP                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. FRONTEND (SUDAH ADA)                                        │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ kopnusa.id (Next.js di Vercel)                      │    │
│     │                                                      │    │
│     │ Halaman:                                             │    │
│     │ - Homepage                                           │    │
│     │ - Pendaftaran Anggota (/daftar)                      │    │
│     │ - Membership Info (/membership)                      │    │
│     │ - Struktur Organisasi (/pimpinan)                    │    │
│     │ - dan lainnya...                                     │    │
│     └─────────────────────────────────────────────────────┘    │
│                           │                                     │
│                           │ HTTP Request (API Call)            │
│                           ▼                                     │
│  2. BACKEND (YANG AKAN DIBUAT)                                  │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ api.kopnusa.id (Laravel)                            │    │
│     │                                                      │    │
│     │ Fitur:                                               │    │
│     │ - REST API untuk semua data                          │    │
│     │ - Authentication (Login)                             │    │
│     │ - Authorization (Role & Permission)                  │    │
│     │ - CRUD Anggota                                       │    │
│     │ - CRUD Leader/Pengurus                               │    │
│     │ - File Upload                                        │    │
│     │ - Notification                                       │    │
│     └─────────────────────────────────────────────────────┘    │
│                           │                                     │
│                           │ SQL Query                          │
│                           ▼                                     │
│  3. DATABASE                                                    │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ MySQL (di cPanel)                                   │    │
│     │                                                      │    │
│     │ Tabel:                                               │    │
│     │ - users (data anggota)                               │    │
│     │ - pendaftaran (data pendaftaran)                     │    │
│     │ - tiers (kategori keanggotaan)                       │    │
│     │ - jabatan (posisi organisasi)                        │    │
│     │ - notifications (notifikasi)                          │    │
│     │ - settings (pengaturan)                              │    │
│     │ - dan lainnya...                                     │    │
│     └─────────────────────────────────────────────────────┘    │
│                           │                                     │
│                           │ HTTP Request (Admin Access)        │
│                           ▼                                     │
│  4. ADMIN PANEL                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ admin.kopnusa.id (Filament)                         │    │
│     │                                                      │    │
│     │ Fitur:                                               │    │
│     │ - Dashboard statistik                                │    │
│     │ - Kelola anggota                                     │    │
│     │ - Approve/Reject pendaftaran                         │    │
│     │ - Kelola struktur organisasi                         │    │
│     │ - CMS untuk konten frontend                          │    │
│     │ - Settings sistem                                    │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.5 Alur Pendaftaran Anggota

### Step by Step (Apa yang Terjadi Saat User Mendaftar)

```
┌─────────────────────────────────────────────────────────────────┐
│            ALUR PENDAFTARAN ANGGOTA (DETAILED)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STEP 1: User Buka Form Pendaftaran                            │
│  ────────────────────────────────────────                       │
│                                                                 │
│  Browser User                Frontend (Next.js)                 │
│       │                           │                             │
│       │ GET /daftar               │                             │
│       │──────────────────────────►│                             │
│       │                           │                             │
│       │     HTML Form             │                             │
│       │◄──────────────────────────│                             │
│       │                           │                             │
│                                                                 │
│  STEP 2: User Isi Form                                         │
│  ─────────────────────────                                      │
│                                                                 │
│  User mengisi:                                                  │
│  - Nama lengkap                                                 │
│  - NIK (16 digit)                                               │
│  - Email                                                        │
│  - No. WhatsApp                                                 │
│  - Alamat lengkap                                               │
│  - Pilih tier (KORDES, KORCAM, dll)                            │
│  - Upload KTP                                                   │
│  - Upload bukti pembayaran                                      │
│                                                                 │
│  STEP 3: Submit Form                                           │
│  ─────────────────────                                          │
│                                                                 │
│  Browser User                Frontend           Backend         │
│       │                        │                   │            │
│       │ Click "Daftar"         │                   │            │
│       │───────────────────────►│                   │            │
│       │                        │                   │            │
│       │                        │ POST /api/        │            │
│       │                        │ pendaftaran       │            │
│       │                        │──────────────────►│            │
│       │                        │                   │            │
│       │                        │                   │ VALIDASI   │
│       │                        │                   │ ├── Cek NIK│
│       │                        │                   │ ├── Cek    │
│       │                        │                   │ │  Email   │
│       │                        │                   │ ├── Cek    │
│       │                        │                   │ │  No WA   │
│       │                        │                   │ └── Cek    │
│       │                        │                   │    Kuota   │
│       │                        │                   │            │
│       │                        │                   │ SIMPAN DB  │
│       │                        │                   │            │
│       │                        │                   │ NOTIFIKASI │
│       │                        │                   │ ke Admin   │
│       │                        │                   │            │
│       │                        │ Response JSON     │            │
│       │                        │◄──────────────────│            │
│       │                        │                   │            │
│       │ Success Page           │                   │            │
│       │◄───────────────────────│                   │            │
│       │                        │                   │            │
│                                                                 │
│  STEP 4: Admin Review                                          │
│  ─────────────────────                                          │
│                                                                 │
│  Admin                    Backend              Database         │
│    │                         │                     │            │
│    │ Login admin panel        │                     │            │
│    │─────────────────────────►│                     │            │
│    │                         │                     │            │
│    │ Lihat daftar pending     │                     │            │
│    │─────────────────────────►│                     │            │
│    │                         │ Query pending       │            │
│    │                         │────────────────────►│            │
│    │                         │                     │            │
│    │                         │ Data pendaftar      │            │
│    │                         │◄────────────────────│            │
│    │                         │                     │            │
│    │ List pendaftar          │                     │            │
│    │◄─────────────────────────│                     │            │
│    │                         │                     │            │
│    │ Review detail            │                     │            │
│    │─────────────────────────►│                     │            │
│    │                         │                     │            │
│    │ Approve/Reject           │                     │            │
│    │─────────────────────────►│                     │            │
│    │                         │ Update status       │            │
│    │                         │────────────────────►│            │
│    │                         │                     │            │
│    │                         │ NOTIFIKASI ke User  │            │
│    │                         │ (via email)         │            │
│    │                         │                     │            │
│                                                                 │
│  STEP 5: User Cek Status                                       │
│  ─────────────────────────                                      │
│                                                                 │
│  Browser User              Frontend           Backend          │
│      │                        │                   │            │
│      │ GET /status/REG001     │                   │            │
│      │───────────────────────►│                   │            │
│      │                        │                   │            │
│      │                        │ GET /api/status/  │            │
│      │                        │ REG001            │            │
│      │                        │──────────────────►│            │
│      │                        │                   │            │
│      │                        │ Query database    │            │
│      │                        │◄──────────────────│            │
│      │                        │                   │            │
│      │ Status: APPROVED       │                   │            │
│      │◄───────────────────────│                   │            │
│      │                        │                   │            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.6 Data yang Akan Disimpan

### Struktur Data Anggota

```
┌─────────────────────────────────────────────────────────────────┐
│              DATA ANGGOTA YANG DISIMPAN                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. DATA PRIBADI                                                │
│     ┌───────────────────────────────────────────────────────┐  │
│     │ Field           │ Tipe       │ Contoh                 │  │
│     ├─────────────────┼────────────┼────────────────────────┤  │
│     │ nama_lengkap    │ String     │ "Budi Santoso"         │  │
│     │ nik             │ String(16) │ "3201234567890001"     │  │
│     │ email           │ Email      │ "budi@email.com"       │  │
│     │ no_hp           │ String     │ "081234567890"         │  │
│     │ no_wa           │ String     │ "081234567890"         │  │
│     │ tempat_lahir    │ String     │ "Bandung"              │  │
│     │ tanggal_lahir   │ Date       │ "1990-05-15"           │  │
│     │ jenis_kelamin   │ Enum       │ "L" atau "P"           │  │
│     │ pekerjaan       │ String     │ "Petani"               │  │
│     └───────────────────────────────────────────────────────┘  │
│                                                                 │
│  2. DATA ALAMAT                                                 │
│     ┌───────────────────────────────────────────────────────┐  │
│     │ Field           │ Tipe       │ Contoh                 │  │
│     ├─────────────────┼────────────┼────────────────────────┤  │
│     │ alamat          │ Text       │ "Jl. Sawah No. 10"     │  │
│     │ provinsi_id     │ String     │ "32" (Jawa Barat)      │  │
│     │ kabupaten_id    │ String     │ "3204" (Bandung)       │  │
│     │ kecamatan_id    │ String     │ "3204010" (Ciparay)    │  │
│     │ kelurahan_id    │ String     │ "3204010001"           │  │
│     │ kode_pos        │ String     │ "40381"                │  │
│     └───────────────────────────────────────────────────────┘  │
│                                                                 │
│  3. DATA KEANGGOTAAN                                           │
│     ┌───────────────────────────────────────────────────────┐  │
│     │ Field           │ Tipe       │ Contoh                 │  │
│     ├─────────────────┼────────────┼────────────────────────┤  │
│     │ tier_id         │ Integer    │ 5 (KORDES)             │  │
│     │ no_anggota      │ String     │ "KNMP-2026-05-00001"   │  │
│     │ status          │ Enum       │ "pending"/"aktif"/...  │  │
│     │ tanggal_daftar  │ DateTime   │ "2026-03-15 10:30:00"  │  │
│     │ tanggal_aktif   │ DateTime   │ "2026-03-16 09:00:00"  │  │
│     │ tanggal_expired │ DateTime   │ "2027-03-16 00:00:00"  │  │
│     │ referrer_id     │ Integer    │ 123 (ID referrer)      │  │
│     └───────────────────────────────────────────────────────┘  │
│                                                                 │
│  4. DATA DOKUMEN                                                │
│     ┌───────────────────────────────────────────────────────┐  │
│     │ Field           │ Tipe       │ Contoh                 │  │
│     ├─────────────────┼────────────┼────────────────────────┤  │
│     │ foto_ktp        │ Path       │ "/storage/ktp/abc.jpg" │  │
│     │ foto_kebun      │ Path       │ "/storage/kebun/..."   │  │
│     │ bukti_bayar     │ Path       │ "/storage/bukti/..."   │  │
│     │ qr_code         │ Path       │ "/storage/qr/..."      │  │
│     └───────────────────────────────────────────────────────┘  │
│                                                                 │
│  5. DATA SISTEM                                                 │
│     ┌───────────────────────────────────────────────────────┐  │
│     │ Field           │ Tipe       │ Contoh                 │  │
│     ├─────────────────┼────────────┼────────────────────────┤  │
│     │ created_at      │ DateTime   │ "2026-03-15 10:30:00"  │  │
│     │ updated_at      │ DateTime   │ "2026-03-16 09:00:00"  │  │
│     │ verified_by     │ Integer    │ 1 (ID admin)           │  │
│     │ verified_at     │ DateTime   │ "2026-03-16 09:00:00"  │  │
│     └───────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.7 Tools yang Harus Disiapkan

### Daftar Tools (Yang Akan Dibahas di Part 2)

```
┌─────────────────────────────────────────────────────────────────┐
│              TOOLS YANG HARUS DISIAPKAN                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  WAJIB (Tidak bisa tidak):                                      │
│  ──────────────────────────                                      │
│  1. XAMPP                                                       │
│     - Untuk menjalankan PHP dan MySQL di lokal                  │
│     - Download: https://www.apachefriends.org/                  │
│     - Versi: PHP 8.2+ dengan MySQL                              │
│                                                                 │
│  2. Text Editor (VS Code - RECOMMENDED)                         │
│     - Untuk menulis kode                                        │
│     - Download: https://code.visualstudio.com/                  │
│     - Extensions yang perlu diinstall (akan dibahas Part 2)     │
│                                                                 │
│  3. Web Browser (Chrome/Firefox/Edge)                           │
│     - Untuk testing                                             │
│     - Sudah ada di komputermu                                   │
│                                                                 │
│  RECOMMENDED (Sangat Berguna):                                   │
│  ─────────────────────────────                                   │
│  4. Postman                                                     │
│     - Untuk testing API                                         │
│     - Download: https://www.postman.com/downloads/              │
│     - Alternatif: Thunder Client (extension VS Code)            │
│                                                                 │
│  5. Git                                                         │
│     - Untuk version control                                     │
│     - Download: https://git-scm.com/                            │
│     - Opsional untuk awal, tapi sangat berguna nanti            │
│                                                                 │
│  YANG SUDAH ADA (Dari Hosting):                                  │
│  ────────────────────────────                                    │
│  6. cPanel Access                                               │
│     - Untuk manage hosting                                      │
│     - Sudah ada dari provider hosting                           │
│                                                                 │
│  7. phpMyAdmin                                                  │
│     - Untuk manage database di hosting                          │
│     - Akses via cPanel                                          │
│                                                                 │
│  8. Domain & Subdomain                                          │
│     - kopnusa.id (sudah ada)                                    │
│     - api.kopnusa.id (akan dibuat)                              │
│     - admin.kopnusa.id (akan dibuat)                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.8 Checklist Persiapan

Sebelum lanjut ke Part 2, pastikan:

```
┌─────────────────────────────────────────────────────────────────┐
│              CHECKLIST PERSIAPAN PART 1                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Saya memahami apa itu Frontend, Backend, dan Database        │
│                                                                 │
│  □ Saya memahami bagaimana Frontend berkomunikasi dengan Backend│
│                                                                 │
│  □ Saya memahami alur pendaftaran anggota dari awal sampai akhir│
│                                                                 │
│  □ Saya memahami data apa saja yang akan disimpan               │
│                                                                 │
│  □ Saya sudah tahu tools apa saja yang perlu disiapkan          │
│                                                                 │
│  □ Saya sudah siap secara mental untuk belajar Laravel          │
│                                                                 │
│  □ Saya punya waktu minimal 1-2 jam per hari untuk belajar      │
│                                                                 │
│  □ Saya siap untuk menghadapi error dan troubleshooting        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.9 Workflow Development yang Akan Dijalani

```
┌─────────────────────────────────────────────────────────────────┐
│              WORKFLOW DEVELOPMENT                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│  │   CODING    │───►│   TESTING   │───►│  DEBUGGING  │        │
│  │  (Write)    │    │   (Test)    │    │   (Fix)     │        │
│  └─────────────┘    └─────────────┘    └─────────────┘        │
│         ▲                                     │                 │
│         └─────────────────────────────────────┘                 │
│                    (Ulang sampai berhasil)                      │
│                                                                 │
│  Proses yang akan kamu lalui di SETIAP Part:                   │
│                                                                 │
│  1. BACA tutorial dengan teliti                                 │
│  2. CODING sesuai instruksi                                     │
│  3. SAVE file yang sudah diubah                                  │
│  4. TEST di browser atau Postman                                │
│  5. JIKA ERROR: baca pesan error, troubleshoot                  │
│  6. JIKA SUKSES: lanjut ke langkah berikutnya                   │
│  7. ULANGI untuk setiap file/langkah                            │
│                                                                 │
│  Tips Penting:                                                  │
│  ─────────────                                                   │
│  - Jangan skip langkah apapun                                   │
│  - Jangan ragu untuk bertanya jika bingung                      │
│  - Error adalah teman, bukan musuh                              │
│  - Backup pekerjaan secara berkala                              │
│  - Dokumentasikan apa yang sudah dipelajari                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.10 Mindset untuk Sukses

```
┌─────────────────────────────────────────────────────────────────┐
│              MINDSET UNTUK SUKSES                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SABAR                                                       │
│     - Belajar programming butuh waktu                           │
│     - Tidak ada yang instan                                     │
│     - Setiap error adalah pembelajaran                          │
│                                                                 │
│  2. KONSISTEN                                                   │
│     - Coding setiap hari lebih baik daripada marathon          │
│     - 1 jam per hari > 7 jam sekali seminggu                   │
│                                                                 │
│  3. TIDAK MALU BERTANYA                                         │
│     - Semua programmer pernah newbie                            │
│     - Bertanya adalah tanda keinginan belajar                   │
│                                                                 │
│  4. TIDAK MENYERAH                                              │
│     - Error adalah normal                                       │
│     - Setiap error ada solusinya                                │
│     - Google adalah sahabat                                     │
│                                                                 │
│  5. PRAKTIK                                                     │
│     - Membaca tidak cukup                                       │
│     - Harus praktek langsung                                    │
│     - Ketik kode, jangan copy-paste                             │
│                                                                 │
│  QUOTE UNTUK DIINGAT:                                           │
│  ───────────────────                                             │
│  "The only way to learn programming is by programming."         │
│  - Donald Knuth                                                 │
│                                                                 │
│  "Every expert was once a beginner."                            │
│  - Helen Hayes                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.11 Ringkasan File yang Dibahas

Di Part 1 ini, kita tidak membuat file apapun. Kita hanya:
- Memahami konsep
- Mempersiapkan mental
- Mengetahui tools yang dibutuhkan

## 1.12 Catatan untuk Shared Hosting tanpa SSH

```
┌─────────────────────────────────────────────────────────────────┐
│         CATATAN SHARED HOSTING TANPA SSH                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PENTING UNTUK DIINGAT:                                         │
│                                                                 │
│  1. SEMUA development dilakukan di LOCALHOST                    │
│     - Kamu coding di komputermu                                 │
│     - Test di komputermu                                        │
│     - Pastikan berjalan sempurna di lokal                       │
│                                                                 │
│  2. DATABASE dibuat di LOCALHOST dulu                           │
│     - Run migration di lokal                                    │
│     - Export ke SQL file                                        │
│     - Import ke phpMyAdmin di hosting                           │
│                                                                 │
│  3. FILE di-upload via File Manager                             │
│     - Zip semua file project                                    │
│     - Upload via cPanel File Manager                            │
│     - Extract di server                                         │
│                                                                 │
│  4. TIDAK ADA command line di SERVER                            │
│     - php artisan tidak bisa dijalankan di server               │
│     - Jadi semua yang perlu artisan dilakukan di lokal          │
│     - Cache, config, dll di-generate di lokal                   │
│                                                                 │
│  5. CRON JOB via cPanel                                         │
│     - Kalau butuh scheduled task                                │
│     - Setup via cPanel Cron Jobs                                │
│     - Tidak butuh SSH                                           │
│                                                                 │
│  KITA AKAN BAHAS SEMUA INI DETAIL DI PART 26-27                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.13 Next Step

```
┌─────────────────────────────────────────────────────────────────┐
│              NEXT: PART 2                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Di Part 2, kita akan:                                          │
│                                                                 │
│  1. Download dan install XAMPP                                  │
│  2. Download dan install VS Code                                │
│  3. Download dan install Composer                               │
│  4. Setup VS Code extensions untuk Laravel                      │
│  5. Verifikasi semua tools berjalan dengan benar                │
│                                                                 │
│  Pastikan kamu sudah siap dengan:                               │
│  - Komputer dengan Windows/Mac/Linux                            │
│  - Koneksi internet stabil                                      │
│  - Minimal 10GB free space                                      │
│  - Akses admin ke komputer (untuk install software)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 PART 2: INSTALASI TOOLS YANG DIBUTUHKAN

## 2.1 Tujuan Part 2

```
┌─────────────────────────────────────────────────────────────────┐
│ TUJUAN PART 2                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Setelah menyelesaikan Part 2, kamu akan:                        │
│                                                                 │
│ ✅ Memiliki XAMPP terinstall dan berjalan                       │
│ ✅ Memiliki VS Code terinstall dengan extensions Laravel        │
│ ✅ Memiliki Composer terinstall                                 │
│ ✅ Memahami cara mengecek apakah tools sudah benar              │
│ ✅ Siap untuk membuat project Laravel di Part 3                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.2 Hasil Akhir Part 2

```
┌─────────────────────────────────────────────────────────────────┐
│ HASIL AKHIR PART 2                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Tools yang sudah terinstall:                                   │
│                                                                 │
│  1. XAMPP                                                       │
│     ├── Apache (Web Server) ────── [RUNNING]                    │
│     ├── MySQL (Database) ────────── [RUNNING]                   │
│     └── PHP 8.2+ ───────────────── [WORKING]                    │
│                                                                 │
│  2. VS Code                                                     │
│     ├── Editor ──────────────────── [INSTALLED]                 │
│     └── Extensions ──────────────── [INSTALLED]                 │
│         ├── PHP Intelephense                                    │
│         ├── Laravel Extra Intellisense                          │
│         ├── Laravel Blade Snippets                              │
│         └── Thunder Client                                      │
│                                                                 │
│  3. Composer                                                    │
│     └── Package Manager ─────────── [WORKING]                   │
│                                                                 │
│  4. Postman (Optional)                                          │
│     └── API Testing ──────────────── [INSTALLED]                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.3 Konsep Dasar: Apa itu XAMPP, VS Code, Composer?

### XAMPP

```
┌─────────────────────────────────────────────────────────────────┐
│ APA ITU XAMPP?                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  XAMPP adalah paket software yang berisi:                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ X ──── Cross-platform (Windows/Mac/Linux)              │   │
│  │ A ──── Apache (Web Server)                              │   │
│  │ M ──── MariaDB/MySQL (Database)                         │   │
│  │ P ──── PHP (Bahasa Pemrograman)                         │   │
│  │ P ──── Perl (Bahasa Pemrograman)                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  KENAPA PERLU XAMPP?                                            │
│  ───────────────────                                            │
│  - Laravel butuh PHP untuk berjalan                             │
│  - Laravel butuh database (MySQL/MariaDB)                       │
│  - Apache sebagai web server untuk serve halaman                │
│  - Semua sudah dalam 1 paket, tinggal install                   │
│                                                                 │
│  ANALOGI:                                                       │
│  ────────                                                        │
│  XAMPP seperti "dapur lengkap" yang sudah ada:                  │
│  - Kompor (Apache)                                              │
│  - Kulkas (MySQL untuk simpan bahan)                           │
│  - Peralatan masak (PHP)                                        │
│                                                                 │
│  Kamu tinggal masak (coding)!                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### VS Code

```
┌─────────────────────────────────────────────────────────────────┐
│ APA ITU VS CODE?                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  VS Code (Visual Studio Code) adalah text editor untuk coding.  │
│                                                                 │
│  KENAPA VS CODE?                                                │
│  ─────────────────                                              │
│  1. GRATIS                                                      │
│  2. Ringan (tidak berat seperti IDE lain)                      │
│  3. Banyak extension yang membantu coding                       │
│  4. Populer (banyak tutorial dan support)                       │
│                                                                 │
│  EXTENSION YANG PERLU DIINSTALL:                                │
│  ───────────────────────────────────                            │
│                                                                 │
│  1. PHP Intelephense                                            │
│     - Untuk autocomplete PHP                                    │
│     - Menunjukkan error saat coding                             │
│     - Membantu navigation antar file                            │
│                                                                 │
│  2. Laravel Extra Intellisense                                  │
│     - Autocomplete khusus Laravel                               │
│     - Membantu ingat nama function, config, dll                 │
│                                                                 │
│  3. Laravel Blade Snippets                                      │
│     - Snippets untuk Blade template                             │
│     - Mempercepat coding HTML di Laravel                        │
│                                                                 │
│  4. Thunder Client (atau Postman)                               │
│     - Untuk test API                                            │
│     - Bisa langsung dari VS Code                                │
│                                                                 │
│  ANALOGI:                                                       │
│  ────────                                                        │
│  VS Code seperti "buku catatan premium" yang punya:             │
│  - Pensil yang bisa mengoreksi sendiri (autocomplete)          │
│  - Pensil warna untuk bedain kode (syntax highlighting)        │
│  - Pembantu yang ngasih sambil nulis (intellisense)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Composer

```
┌─────────────────────────────────────────────────────────────────┐
│ APA ITU COMPOSER?                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Composer adalah "package manager" untuk PHP.                   │
│                                                                 │
│  KENAPA PERLU COMPOSER?                                         │
│  ─────────────────────────                                      │
│  - Laravel adalah "package" yang besar                          │
│  - Laravel butuh banyak package lain                            │
│  - Composer mengunduh dan menginstall semua package itu         │
│  - Composer mengatur dependency antar package                   │
│                                                                 │
│  ANALOGI:                                                       │
│  ────────                                                        │
│  Composer seperti "kurir belanja online":                       │
│                                                                 │
│  Kamu mau bangun rumah (Laravel project)                        │
│  ┌───────────────────────────────────────────────┐             │
│  │ Beli bata, semen, cat, kaca, pipa, dll...    │             │
│  │                                               │             │
│  │ Kalau beli sendiri:                           │             │
│  │ - Harus cari toko satu-satu                   │             │
│  │ - Harus cek kompatibilitas                    │             │
│  │ - Ribet!                                      │             │
│  │                                               │             │
│  │ Pakai Composer:                               │             │
│  │ - Bilang "composer require laravel/laravel"  │             │
│  │ - Composer cariin semua yang dibutuhkan       │             │
│  │ - Download dan pasang otomatis                │             │
│  │ - Praktis!                                    │             │
│  └───────────────────────────────────────────────┘             │
│                                                                 │
│  COMMAND DASAR:                                                 │
│  ───────────────                                                 │
│  composer install     → Install semua package dari composer.json│
│  composer require x   → Tambah package baru                     │
│  composer update      → Update package ke versi terbaru         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.4 Langkah 1: Install XAMPP

### Step 2.4.1: Download XAMPP

```
┌─────────────────────────────────────────────────────────────────┐
│ LANGKAH DOWNLOAD XAMPP                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka browser (Chrome/Firefox/Edge)                          │
│                                                                 │
│  2. Kunjungi: https://www.apachefriends.org/                    │
│                                                                 │
│  3. Klik tombol "Download XAMPP"                                │
│                                                                 │
│  4. Pilih versi untuk sistem operasi kamu:                      │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Windows ───► XAMPP for Windows                      │    │
│     │ Mac ───────► XAMPP for Mac OS X                     │    │
│     │ Linux ─────► XAMPP for Linux                        │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  5. Pilih versi PHP 8.2 atau lebih baru                         │
│     - Contoh: XAMPP 8.2.12 / PHP 8.2.12                         │
│     - JANGAN pilih versi PHP 7.x (sudah tidak didukung)        │
│                                                                 │
│  6. Tunggu download selesai (sekitar 150-200 MB)               │
│                                                                 │
│  CATATAN:                                                       │
│  ────────                                                        │
│  - Pastikan download dari website resmi                         │
│  - Jangan download dari sumber lain                             │
│  - File yang didownload: xampp-windows-x64-8.2.x.exe           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.4.2: Install XAMPP

```
┌─────────────────────────────────────────────────────────────────┐
│ LANGKAH INSTALL XAMPP (Windows)                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Double-click file xampp-windows-x64-8.2.x.exe              │
│                                                                 │
│  2. Jika muncul "User Account Control", klik YES                │
│                                                                 │
│  3. Pada setup wizard, klik NEXT                                │
│                                                                 │
│  4. Pilih komponen yang akan diinstall:                         │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Component          │ Status    │ Keterangan        │    │
│     ├────────────────────┼───────────┼───────────────────┤    │
│     │ Apache             │ ✓ CHECKED │ WAJIB             │    │
│     │ MySQL              │ ✓ CHECKED │ WAJIB             │    │
│     │ FileZilla          │ ✗ SKIP    │ Tidak perlu       │    │
│     │ Mercury            │ ✗ SKIP    │ Tidak perlu       │    │
│     │ Tomcat             │ ✗ SKIP    │ Tidak perlu       │    │
│     │ PHP                │ ✓ CHECKED │ Otomatis terpilih│    │
│     │ phpMyAdmin         │ ✓ CHECKED │ WAJIB             │    │
│     │ OpenSSL            │ ✓ CHECKED │ Otomatis terpilih│    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  5. Pilih lokasi install:                                       │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ RECOMMENDED: C:\xampp\                               │    │
│     │                                                      │    │
│     │ Kenapa C:\xampp?                                     │    │
│     │ - Path pendek, mudah diakses                        │    │
│     │ - Tidak ada spasi (menghindari error)               │    │
│     │ - Standar untuk kebanyakan tutorial                 │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  6. Klik NEXT                                                   │
│                                                                 │
│  7. Pilih bahasa (English atau German), NEXT                    │
│                                                                 │
│  8. Uncheck "Learn more about Bitnami", NEXT                    │
│                                                                 │
│  9. Klik NEXT, mulai install                                    │
│                                                                 │
│  10. Tunggu proses install (2-5 menit)                          │
│                                                                 │
│  11. Setelah selesai, checklist "Do you want to start           │
│      the Control Panel now?" dan klik FINISH                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.4.3: Verifikasi XAMPP

```
┌─────────────────────────────────────────────────────────────────┐
│ VERIFIKASI XAMPP BERJALAN                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka XAMPP Control Panel                                    │
│     - Biasanya terbuka otomatis setelah install                 │
│     - Atau cari di Start Menu: XAMPP Control Panel              │
│                                                                 │
│  2. Start Apache                                                │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Di Control Panel:                                    │    │
│     │ - Klik tombol "Start" di sebelah Apache             │    │
│     │ - Apache akan berubah hijau jika berhasil           │    │
│     │ - Port: 80 (HTTP) dan 443 (HTTPS)                   │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  3. Start MySQL                                                 │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Di Control Panel:                                    │    │
│     │ - Klik tombol "Start" di sebelah MySQL              │    │
│     │ - MySQL akan berubah hijau jika berhasil            │    │
│     │ - Port: 3306                                         │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  4. Test Apache                                                 │
│     - Buka browser                                              │
│     - Ketik: http://localhost                                   │
│     - Jika berhasil, akan muncul halaman XAMPP                  │
│                                                                 │
│  5. Test phpMyAdmin                                             │
│     - Buka browser                                              │
│     - Ketik: http://localhost/phpmyadmin                        │
│     - Jika berhasil, akan muncul halaman phpMyAdmin             │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ Apache hijau di Control Panel                               │
│  ✅ MySQL hijau di Control Panel                                │
│  ✅ http://localhost menampilkan halaman XAMPP                  │
│  ✅ http://localhost/phpmyadmin menampilkan phpMyAdmin          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.4.4: Troubleshooting XAMPP

```
┌─────────────────────────────────────────────────────────────────┐
│ TROUBLESHOOTING XAMPP                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROBLEM 1: Apache tidak bisa start (Port 80 dipakai)           │
│  ────────────────────────────────────────────────────           │
│  Penyebab: Port 80 dipakai oleh program lain (Skype, IIS, dll) │
│                                                                 │
│  Solusi:                                                        │
│  1. Di XAMPP Control Panel, klik "Config" di baris Apache       │
│  2. Pilih "httpd.conf"                                          │
│  3. Cari baris: Listen 80                                       │
│  4. Ganti menjadi: Listen 8080                                  │
│  5. Save file                                                    │
│  6. Restart Apache                                              │
│  7. Akses: http://localhost:8080                                │
│                                                                 │
│  PROBLEM 2: MySQL tidak bisa start                              │
│  ───────────────────────────────────                            │
│  Penyebab: MySQL sudah terinstall dari program lain            │
│                                                                 │
│  Solusi:                                                        │
│  1. Uninstall MySQL yang sudah ada                              │
│  2. Atau ubah port MySQL di my.ini                              │
│                                                                 │
│  PROBLEM 3: "Access Denied" di phpMyAdmin                       │
│  ──────────────────────────────────────                         │
│  Solusi:                                                        │
│  1. Buka file C:\xampp\phpMyAdmin\config.inc.php               │
│  2. Cari: $cfg['Servers'][$i]['password'] = '';                │
│  3. Pastikan kosong seperti di atas (default XAMPP)            │
│                                                                 │
│  PROBLEM 4: Antivirus memblokir XAMPP                           │
│  ────────────────────────────────────                           │
│  Solusi:                                                        │
│  1. Add exception untuk folder C:\xampp di antivirus           │
│  2. Atau disable antivirus sementara saat install              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.5 Langkah 2: Install VS Code

### Step 2.5.1: Download VS Code

```
┌─────────────────────────────────────────────────────────────────┐
│ LANGKAH DOWNLOAD VS CODE                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka browser                                                │
│                                                                 │
│  2. Kunjungi: https://code.visualstudio.com/                    │
│                                                                 │
│  3. Klik tombol "Download for Windows" (atau Mac/Linux)        │
│                                                                 │
│  4. Tunggu download selesai (sekitar 80-100 MB)                │
│                                                                 │
│  File yang didownload: VSCodeUserSetup-x64-x.xx.x.exe          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.5.2: Install VS Code

```
┌─────────────────────────────────────────────────────────────────┐
│ LANGKAH INSTALL VS CODE                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Double-click file VSCodeUserSetup-x64-x.xx.x.exe           │
│                                                                 │
│  2. Klik "I accept the agreement", NEXT                         │
│                                                                 │
│  3. Pilih lokasi install (default sudah bagus), NEXT            │
│                                                                 │
│  4. Pilih Start Menu folder (default), NEXT                     │
│                                                                 │
│  5. Select Additional Tasks:                                    │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ ☑ Add "Open with Code" action to folder context     │    │
│     │   → Memudahkan buka folder di VS Code               │    │
│     │                                                       │    │
│     │ ☑ Add "Open with Code" action to file context       │    │
│     │   → Memudahkan buka file di VS Code                 │    │
│     │                                                       │    │
│     │ ☑ Register Code as supported editor for file types  │    │
│     │   → VS Code jadi editor default                      │    │
│     │                                                       │    │
│     │ ☑ Add to PATH                                        │    │
│     │   → Bisa buka VS Code dari command line             │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  6. Klik INSTALL                                                │
│                                                                 │
│  7. Tunggu install selesai                                      │
│                                                                 │
│  8. Checklist "Launch VS Code", klik FINISH                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.5.3: Install Extensions

```
┌─────────────────────────────────────────────────────────────────┐
│ INSTALL EXTENSIONS LARAVEL DI VS CODE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CARA INSTALL EXTENSION:                                        │
│                                                                 │
│  1. Buka VS Code                                                │
│                                                                 │
│  2. Klik icon "Extensions" di sidebar kiri                      │
│     (atau tekan Ctrl+Shift+X)                                   │
│                                                                 │
│  3. Di search bar, ketik nama extension                         │
│                                                                 │
│  4. Klik "Install" pada extension yang muncul                   │
│                                                                 │
│  EXTENSIONS YANG HARUS DIINSTALL:                               │
│  ══════════════════════════════════                             │
│                                                                 │
│  1. PHP Intelephense                                            │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Nama: PHP Intelephense                              │    │
│     │ Publisher: Ben Mewburn                              │    │
│     │ Fungsi:                                             │    │
│     │ - Autocomplete PHP                                  │    │
│     │ - Error highlighting                                │    │
│     │ - Go to definition                                  │    │
│     │ - Signature help                                    │    │
│     │                                                      │    │
│     │ Search: "intelephense"                              │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  2. Laravel Extra Intellisense                                  │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Nama: Laravel Extra Intellisense                    │    │
│     │ Publisher: amiralizadeh9480                         │    │
│     │ Fungsi:                                             │    │
│     │ - Autocomplete Laravel spesifik                     │    │
│     │ - Config, route, view helper                        │    │
│     │ - Controller autocomplete                           │    │
│     │                                                      │    │
│     │ Search: "laravel extra intellisense"                │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  3. Laravel Blade Snippets                                      │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Nama: Laravel Blade Snippets                        │    │
│     │ Publisher: Winnie Lin                               │    │
│     │ Fungsi:                                             │    │
│     │ - Snippets untuk Blade template                     │    │
│     │ - Ketik "blade" untuk lihat snippet                 │    │
│     │ - Mempercepat coding                                │    │
│     │                                                      │    │
│     │ Search: "laravel blade snippets"                    │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  4. Thunder Client                                              │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Nama: Thunder Client                                │    │
│     │ Publisher: Thunder Client                           │    │
│     │ Fungsi:                                             │    │
│     │ - Test API langsung dari VS Code                    │    │
│     │ - Alternatif Postman                                │    │
│     │ - Support collections dan environments              │    │
│     │                                                      │    │
│     │ Search: "thunder client"                            │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  5. Laravel goto controller                                     │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Nama: Laravel goto controller                       │    │
│     │ Publisher: recca0120                                │    │
│     │ Fungsi:                                             │    │
│     │ - Navigasi dari route ke controller                 │    │
│     │ - Mempercepat development                           │    │
│     │                                                      │    │
│     │ Search: "laravel goto controller"                   │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  OPTIONAL TAPI BAGUS:                                           │
│  ────────────────────                                           │
│  - GitLens (untuk Git)                                          │
│  - Prettier (formatter)                                         │
│  - Error Lens (error highlighting)                              │
│  - Material Icon Theme (icon file yang bagus)                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.5.4: Verifikasi VS Code

```
┌─────────────────────────────────────────────────────────────────┐
│ VERIFIKASI VS CODE DAN EXTENSIONS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka VS Code                                                │
│                                                                 │
│  2. Klik Extensions icon (Ctrl+Shift+X)                         │
│                                                                 │
│  3. Pastikan semua extension sudah terinstall:                  │
│     - PHP Intelephense ✓                                        │
│     - Laravel Extra Intellisense ✓                              │
│     - Laravel Blade Snippets ✓                                  │
│     - Thunder Client ✓                                          │
│     - Laravel goto controller ✓                                 │
│                                                                 │
│  4. Test PHP Intelephense:                                      │
│     a. Buat file baru: File > New File                          │
│     b. Save as: test.php                                        │
│     c. Ketik: <?php                                             │
│     d. Ketik: echo "hello";                                     │
│     e. Jika ada autocomplete dan syntax highlighting → OK      │
│                                                                 │
│  5. Test Thunder Client:                                        │
│     a. Klik icon Thunder Client di sidebar                      │
│     b. Jika muncul panel Thunder Client → OK                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.6 Langkah 3: Install Composer

### Step 2.6.1: Download Composer

```
┌─────────────────────────────────────────────────────────────────┐
│ LANGKAH DOWNLOAD COMPOSER                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka browser                                                │
│                                                                 │
│  2. Kunjungi: https://getcomposer.org/download/                 │
│                                                                 │
│  3. Scroll ke bagian "Windows Installer"                        │
│                                                                 │
│  4. Klik link: Composer-Setup.exe                               │
│                                                                 │
│  5. Tunggu download selesai (sekitar 2-3 MB)                   │
│                                                                 │
│  File yang didownload: Composer-Setup.exe                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.6.2: Install Composer

```
┌─────────────────────────────────────────────────────────────────┐
│ LANGKAH INSTALL COMPOSER                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Pastikan XAMPP sudah terinstall dan Apache running          │
│                                                                 │
│  2. Double-click file Composer-Setup.exe                        │
│                                                                 │
│  3. Jika muncul "User Account Control", klik YES                │
│                                                                 │
│  4. Klik "Next" pada welcome screen                             │
│                                                                 │
│  5. Pilih PHP executable:                                       │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Pilih: C:\xampp\php\php.exe                         │    │
│     │                                                      │    │
│     │ Jika tidak muncul otomatis, klik "Browse" dan       │    │
│     │ navigasi ke C:\xampp\php\php.exe                    │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  6. Klik "Next"                                                 │
│                                                                 │
│  7. Proxy settings (biarkan kosong), "Next"                     │
│                                                                 │
│  8. Klik "Install"                                              │
│                                                                 │
│  9. Tunggu install selesai                                      │
│                                                                 │
│  10. Klik "Next", kemudian "Finish"                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2.6.3: Verifikasi Composer

```
┌─────────────────────────────────────────────────────────────────┐
│ VERIFIKASI COMPOSER                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka Command Prompt                                         │
│     - Tekan Win+R                                               │
│     - Ketik: cmd                                                │
│     - Tekan Enter                                               │
│                                                                 │
│  2. Ketik command berikut:                                      │
│                                                                 │
│     composer --version                                          │
│                                                                 │
│  3. Jika berhasil, akan muncul:                                 │
│                                                                 │
│     Composer version 2.x.x 2024-xx-xx                           │
│                                                                 │
│  4. Test Composer dengan command:                               │
│                                                                 │
│     composer                                                    │
│                                                                 │
│  5. Jika muncul logo Composer dan daftar command → BERHASIL    │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ composer --version menampilkan versi                        │
│  ✅ composer menampilkan daftar command                         │
│  ✅ Tidak ada error "command not found"                         │
│                                                                 │
│  JIKA ERROR "command not found":                                │
│  ────────────────────────────────                               │
│  1. Tutup Command Prompt                                        │
│  2. Buka lagi Command Prompt baru                               │
│  3. Coba lagi                                                   │
│  4. Jika masih error, restart komputer                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.7 Langkah 4: Verifikasi Semua Tools

### Final Verification Checklist

```
┌─────────────────────────────────────────────────────────────────┐
│ FINAL VERIFICATION CHECKLIST                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BUKA COMMAND PROMPT DAN JALANKAN:                              │
│                                                                 │
│  1. CEK PHP                                                     │
│     Command: php -v                                             │
│     Expected: PHP 8.2.x (cli) ...                               │
│     Status : [ ]                                                │
│                                                                 │
│  2. CEK COMPOSER                                                │
│     Command: composer --version                                 │
│     Expected: Composer version 2.x.x                            │
│     Status : [ ]                                                │
│                                                                 │
│  3. CEK MYSQL                                                   │
│     Command: mysql --version                                    │
│     Expected: mysql Ver 15.1 Distrib 10.4.x-MariaDB...         │
│     Status : [ ]                                                │
│                                                                 │
│  CEK VIA BROWSER:                                               │
│                                                                 │
│  4. CEK APACHE                                                  │
│     URL: http://localhost                                       │
│     Expected: Halaman XAMPP                                     │
│     Status : [ ]                                                │
│                                                                 │
│  5. CEK PHPMYADMIN                                              │
│     URL: http://localhost/phpmyadmin                            │
│     Expected: Halaman phpMyAdmin                                │
│     Status : [ ]                                                │
│                                                                 │
│  CEK VS CODE:                                                   │
│                                                                 │
│  6. CEK EXTENSIONS                                              │
│     - Buka VS Code                                              │
│     - Klik Extensions (Ctrl+Shift+X)                            │
│     - Pastikan semua extension terinstall                       │
│     Status : [ ]                                                │
│                                                                 │
│  JIKA SEMUA CHECKLIST TERISI, LANJUT KE PART 3!                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.8 Troubleshooting Umum

```
┌─────────────────────────────────────────────────────────────────┐
│ TROUBLESHOOTING UMUM                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MASALAH: "php tidak dikenali sebagai perintah"                │
│  ──────────────────────────────────────────────                 │
│  Solusi:                                                        │
│  1. Buka Environment Variables:                                 │
│     - Klik kanan "This PC" → Properties                        │
│     - Advanced system settings                                  │
│     - Environment Variables                                     │
│  2. Di "System variables", cari "Path"                         │
│  3. Klik Edit → New                                             │
│  4. Tambahkan: C:\xampp\php                                     │
│  5. OK, restart Command Prompt                                  │
│                                                                 │
│  MASALAH: VS Code extension tidak jalan                         │
│  ────────────────────────────────────────────                   │
│  Solusi:                                                        │
│  1. Uninstall extension                                         │
│  2. Restart VS Code                                             │
│  3. Install ulang extension                                     │
│                                                                 │
│  MASALAH: XAMPP Control Panel tidak muncul                      │
│  ─────────────────────────────────────────────                  │
│  Solusi:                                                        │
│  1. Run as Administrator                                        │
│  2. Cari di C:\xampp\xampp-control.exe                         │
│  3. Double-click                                                │
│                                                                 │
│  MASALAH: MySQL tidak bisa connect                              │
│  ────────────────────────────────                               │
│  Solusi:                                                        │
│  1. Stop MySQL di XAMPP                                         │
│  2. Start lagi                                                  │
│  3. Jika masih error, restart komputer                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.9 Ringkasan File yang Diubah

Di Part 2, kita tidak membuat file apapun. Kita hanya menginstall tools.

## 2.10 Catatan untuk Shared Hosting

```
┌─────────────────────────────────────────────────────────────────┐
│ CATATAN SHARED HOSTING                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PENTING:                                                       │
│                                                                 │
│  1. Tools yang kita install (XAMPP, VS Code, Composer)          │
│     HANYA untuk development di LOCALHOST                        │
│                                                                 │
│  2. Di hosting, kamu TIDAK PERLU install XAMPP                  │
│     - Hosting sudah punya PHP                                   │
│     - Hosting sudah punya MySQL                                 │
│     - Hosting sudah punya Web Server                            │
│                                                                 │
│  3. Yang kamu lakukan di hosting adalah:                        │
│     - Upload file project                                       │
│     - Import database                                           │
│     - Konfigurasi .env                                          │
│                                                                 │
│  4. Version PHP di hosting harus sama atau lebih tinggi         │
│     dari versi PHP di localhost                                 │
│                                                                 │
│  KITA AKAN BAHAS INI DETAIL DI PART 26-27                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.11 Checklist Sebelum Lanjut

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST SEBELUM LANJUT KE PART 3                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ XAMPP terinstall dan berjalan                                │
│    - Apache hijau di Control Panel                              │
│    - MySQL hijau di Control Panel                               │
│    - http://localhost menampilkan halaman XAMPP                 │
│    - http://localhost/phpmyadmin menampilkan phpMyAdmin         │
│                                                                 │
│  □ VS Code terinstall                                           │
│    - VS Code bisa dibuka                                        │
│    - Extensions terinstall:                                     │
│      □ PHP Intelephense                                         │
│      □ Laravel Extra Intellisense                               │
│      □ Laravel Blade Snippets                                   │
│      □ Thunder Client                                           │
│      □ Laravel goto controller                                  │
│                                                                 │
│  □ Composer terinstall                                          │
│    - composer --version menampilkan versi                       │
│    - php -v menampilkan versi PHP                               │
│                                                                 │
│  □ (Optional) Postman terinstall                                │
│    - Postman bisa dibuka                                        │
│                                                                 │
│  JIKA SEMUA TERISI, LANJUT KE PART 3!                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2.12 Next Step

```
┌─────────────────────────────────────────────────────────────────┐
│ NEXT: PART 3                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Di Part 3, kita akan:                                          │
│                                                                 │
│  1. Membuat project Laravel baru                                │
│  2. Memahami struktur folder Laravel                            │
│  3. Menjalankan Laravel di localhost                            │
│  4. Memahami file-file penting di Laravel                       │
│                                                                 │
│  Yang perlu disiapkan:                                          │
│  - Semua tools dari Part 2 sudah terinstall                     │
│  - Terminal/Command Prompt sudah bisa diakses                   │
│  - Browser untuk testing                                        │
│  - VS Code sudah terbuka                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 DAFTAR API ENDPOINT AWAL

Berikut adalah daftar API endpoint yang akan kita buat:

```
┌─────────────────────────────────────────────────────────────────┐
│              API ENDPOINT KNMP                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AUTHENTICATION                                                 │
│  ═════════════════                                              │
│  POST   /api/auth/login           │ Login admin/member          │
│  POST   /api/auth/logout          │ Logout                      │
│  POST   /api/auth/register        │ Register member baru        │
│  POST   /api/auth/forgot-password │ Request reset password      │
│  POST   /api/auth/reset-password  │ Reset password              │
│  GET    /api/auth/me              │ Get current user info       │
│                                                                 │
│  PUBLIC API (No Auth Required)                                  │
│  ═════════════════════════════                                  │
│  GET    /api/tiers                │ List semua tier             │
│  GET    /api/tiers/{id}           │ Detail tier                 │
│  GET    /api/tiers/{id}/availability │ Cek kuota tier          │
│  GET    /api/settings/public      │ Settings publik             │
│  GET    /api/banners              │ List banner                 │
│  GET    /api/pages/{slug}         │ Halaman CMS                 │
│  GET    /api/organization/structure │ Struktur organisasi       │
│  GET    /api/provinces            │ List provinsi               │
│  GET    /api/kabupaten/{prov_id}  │ List kabupaten              │
│  GET    /api/kecamatan/{kab_id}   │ List kecamatan              │
│  GET    /api/kelurahan/{kec_id}   │ List kelurahan              │
│                                                                 │
│  PENDAFTARAN                                                    │
│  ═════════════                                                  │
│  POST   /api/pendaftaran/check-nik/{nik}    │ Cek NIK          │
│  POST   /api/pendaftaran/check-email/{email}│ Cek email        │
│  POST   /api/pendaftaran/check-wa/{wa}      │ Cek no WA        │
│  POST   /api/pendaftaran/submit             │ Submit pendaftaran│
│  GET    /api/pendaftaran/track/{code}       │ Track status     │
│                                                                 │
│  ADMIN API (Auth Required)                                      │
│  ═════════════════════════                                      │
│  GET    /api/admin/dashboard       │ Dashboard stats            │
│  GET    /api/admin/pendaftaran     │ List pendaftaran           │
│  GET    /api/admin/pendaftaran/{id}│ Detail pendaftaran         │
│  PATCH  /api/admin/pendaftaran/{id}/approve │ Approve           │
│  PATCH  /api/admin/pendaftaran/{id}/reject  │ Reject            │
│  GET    /api/admin/members         │ List anggota               │
│  GET    /api/admin/members/{id}    │ Detail anggota             │
│  GET    /api/admin/notifications   │ List notifikasi            │
│  POST   /api/admin/notifications/{id}/read │ Mark read          │
│  GET    /api/admin/settings        │ List settings              │
│  POST   /api/admin/settings        │ Update settings            │
│                                                                 │
│  MEMBER API (Auth Required)                                     │
│  ═════════════════════════                                      │
│  GET    /api/member/profile        │ Profil member              │
│  PUT    /api/member/profile        │ Update profil              │
│  GET    /api/member/notifications  │ Notifikasi                 │
│  GET    /api/member/status         │ Status keanggotaan         │
│                                                                 │
│  LEADER API (Auth Required)                                     │
│  ═════════════════════════                                      │
│  GET    /api/leader/dashboard     │ Dashboard leader            │
│  GET    /api/leader/members       │ Anggota di wilayah          │
│  GET    /api/leader/pendaftaran   │ Pendaftaran di wilayah      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 CONTOH RESPONSE JSON

## Response Sukses Submit Pendaftaran

```json
{
  "success": true,
  "message": "Pendaftaran berhasil dikirim. Silakan tunggu verifikasi.",
  "data": {
    "no_registrasi": "REG-20260315-0001",
    "nama_lengkap": "Budi Santoso",
    "tier": {
      "id": 5,
      "nama_tier": "KORDES - Panglima Desa",
      "level": 5
    },
    "status": "pending",
    "tanggal_daftar": "2026-03-15T10:30:00+07:00",
    "estimated_verification": "1-2 hari kerja"
  }
}
```

## Response Validation Error

```json
{
  "success": false,
  "message": "Data tidak valid",
  "errors": {
    "nik": [
      "NIK harus 16 digit",
      "NIK sudah terdaftar"
    ],
    "email": [
      "Format email tidak valid"
    ],
    "no_wa": [
      "Nomor WhatsApp sudah terdaftar"
    ]
  }
}
```

## Response Duplicate Registration

```json
{
  "success": false,
  "message": "Pendaftaran tidak dapat diproses",
  "error_code": "DUPLICATE_REGISTRATION",
  "data": {
    "existing_registration": {
      "no_registrasi": "REG-20260310-0023",
      "status": "pending",
      "tanggal_daftar": "2026-03-10T14:20:00+07:00"
    }
  }
}
```

## Response Position Already Filled

```json
{
  "success": false,
  "message": "Posisi sudah terisi",
  "error_code": "POSITION_FILLED",
  "data": {
    "position": {
      "nama_jabatan": "Panglima Desa",
      "wilayah": "Desa Sukamaju, Kec. Ciparay, Kab. Bandung",
      "current_holder": "Ahmad Hidayat",
      "status": "aktif"
    }
  }
}
```

## Response Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized",
  "error_code": "UNAUTHORIZED"
}
```

## Response Forbidden

```json
{
  "success": false,
  "message": "Anda tidak memiliki akses ke resource ini",
  "error_code": "FORBIDDEN"
}
```

## Response Not Found

```json
{
  "success": false,
  "message": "Data tidak ditemukan",
  "error_code": "NOT_FOUND"
}
```

## Response Server Error

```json
{
  "success": false,
  "message": "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
  "error_code": "SERVER_ERROR",
  "support_contact": "admin@kopnusa.id"
}
```

---

# 📖 VALIDASI BISNIS (PSEUDOCODE)

## Cek Apakah Email/NIK/WA Sudah Terdaftar

```php
/**
 * CEK DUPLIKASI DATA
 */

function checkDuplicateRegistration($nik, $email, $noWa) {
    // Cek berdasarkan NIK
    $existingByNik = User::where('nik', $nik)
        ->whereIn('status_keanggotaan', ['pending', 'aktif'])
        ->first();
    
    if ($existingByNik) {
        return [
            'is_duplicate' => true,
            'field' => 'nik',
            'message' => 'NIK sudah terdaftar',
            'existing_data' => $existingByNik
        ];
    }
    
    // Cek berdasarkan email
    $existingByEmail = User::where('email', $email)
        ->whereIn('status_keanggotaan', ['pending', 'aktif'])
        ->first();
    
    if ($existingByEmail) {
        return [
            'is_duplicate' => true,
            'field' => 'email',
            'message' => 'Email sudah terdaftar',
            'existing_data' => $existingByEmail
        ];
    }
    
    // Cek berdasarkan no WA
    $existingByWa = User::where('no_wa', $noWa)
        ->whereIn('status_keanggotaan', ['pending', 'aktif'])
        ->first();
    
    if ($existingByWa) {
        return [
            'is_duplicate' => true,
            'field' => 'no_wa',
            'message' => 'Nomor WhatsApp sudah terdaftar',
            'existing_data' => $existingByWa
        ];
    }
    
    return [
        'is_duplicate' => false
    ];
}
```

## Cek Apakah Posisi Leader di Wilayah Sudah Terisi

```php
/**
 * CEK POSISI TERISI
 */

function checkPositionAvailability($jabatanId, $wilayahId) {
    // Ambil data jabatan
    $jabatan = Jabatan::find($jabatanId);
    
    // Hitung berapa yang sudah terisi
    $filledCount = StrukturOrganisasi::where('jabatan_id', $jabatanId)
        ->where('wilayah_id', $wilayahId)
        ->where('status', 'aktif')
        ->count();
    
    // Cek apakah masih ada slot
    $isAvailable = $filledCount < $jabatan->kuota;
    
    // Jika tidak tersedia, ambil data yang sudah terisi
    $currentHolder = null;
    if (!$isAvailable) {
        $currentHolder = StrukturOrganisasi::where('jabatan_id', $jabatanId)
            ->where('wilayah_id', $wilayahId)
            ->where('status', 'aktif')
            ->with('user')
            ->first();
    }
    
    return [
        'is_available' => $isAvailable,
        'filled_count' => $filledCount,
        'kuota' => $jabatan->kuota,
        'current_holder' => $currentHolder ? [
            'nama' => $currentHolder->user->name,
            'tanggal_mulai' => $currentHolder->tanggal_mulai
        ] : null
    ];
}
```

## Cek Apakah Pendaftaran Sedang Dibuka

```php
/**
 * CEK STATUS PEMBUKAAN PENDAFTARAN
 */

function checkRegistrationOpen() {
    // Ambil setting dari database
    $registrationOpen = Setting::where('key', 'registration_open')->first();
    $registrationMessage = Setting::where('key', 'registration_closed_message')->first();
    
    // Jika setting tidak ada, default = buka
    if (!$registrationOpen) {
        return [
            'is_open' => true
        ];
    }
    
    return [
        'is_open' => (bool) $registrationOpen->value,
        'message' => $registrationMessage ? $registrationMessage->value : 'Pendaftaran sedang ditutup.'
    ];
}

function checkTierRegistrationOpen($tierId) {
    // Cek apakah tier bisa didaftarkan
    $tier = Tier::find($tierId);
    
    // Cek apakah tier aktif
    if (!$tier->is_active) {
        return [
            'is_open' => false,
            'message' => 'Tier ini tidak aktif.'
        ];
    }
    
    // Cek apakah kuota masih tersedia
    if ($tier->isFull()) {
        return [
            'is_open' => false,
            'message' => 'Kuota untuk tier ini sudah penuh.'
        ];
    }
    
    return [
        'is_open' => true
    ];
}
```

## Cek Apakah User Punya Hak Akses Wilayah

```php
/**
 * CEK AKSES WILAYAH
 */

function checkUserWilayahAccess($userId, $targetWilayahId) {
    $user = User::with('struktur.wilayah')->find($userId);
    
    // Superadmin dan admin punya akses semua
    if ($user->hasRole(['superadmin', 'admin'])) {
        return [
            'has_access' => true,
            'access_level' => 'all'
        ];
    }
    
    // Leader hanya bisa akses wilayahnya dan turunannya
    if ($user->hasRole('leader')) {
        $userWilayah = $user->struktur->wilayah;
        
        // Cek apakah target wilayah adalah turunan dari wilayah user
        $isDescendant = $this->isWilayahDescendant(
            $userWilayah->id,
            $targetWilayahId
        );
        
        return [
            'has_access' => $isDescendant || $userWilayah->id == $targetWilayahId,
            'access_level' => 'wilayah',
            'user_wilayah' => $userWilayah
        ];
    }
    
    // Member tidak punya akses ke data orang lain
    return [
        'has_access' => false,
        'access_level' => 'none'
    ];
}

function isWilayahDescendant($parentWilayahId, $childWilayahId) {
    // Cek rekursif apakah child adalah turunan dari parent
    $child = Wilayah::find($childWilayahId);
    
    while ($child->parent_id !== null) {
        if ($child->parent_id == $parentWilayahId) {
            return true;
        }
        $child = Wilayah::find($child->parent_id);
    }
    
    return false;
}
```

## Cek Apakah Status Final Tidak Boleh Diedit

```php
/**
 * CEK STATUS FINAL
 */

function canEditRegistration($registrationId) {
    $registration = Pendaftaran::find($registrationId);
    
    // Status yang tidak bisa diedit
    $finalStatuses = ['disetujui', 'ditolak'];
    
    if (in_array($registration->status, $finalStatuses)) {
        return [
            'can_edit' => false,
            'reason' => "Pendaftaran dengan status '{$registration->status}' tidak dapat diedit."
        ];
    }
    
    return [
        'can_edit' => true
    ];
}

function canEditUser($userId) {
    $user = User::find($userId);
    
    // Field yang tidak bisa diubah jika status aktif
    $protectedFields = ['nik', 'tier_id', 'no_anggota'];
    
    if ($user->status_keanggotaan === 'aktif') {
        return [
            'can_edit' => true,
            'protected_fields' => $protectedFields,
            'message' => 'Beberapa field tidak dapat diubah karena status sudah aktif.'
        ];
    }
    
    return [
        'can_edit' => true,
        'protected_fields' => []
    ];
}
```

---

# 📖 STRATEGI NOTIFIKASI

## Level 1: Database Notification (WAJIB untuk MVP)

```php
/**
 * DATABASE NOTIFICATION
 * 
 * Cara Kerja:
 * 1. Notifikasi disimpan di tabel 'notifications'
 * 2. Frontend melakukan polling setiap 15-30 detik
 * 3. Frontend menampilkan badge unread count
 */

// Di Backend (Laravel)
class NewRegistrationNotification extends Notification
{
    public function via($notifiable)
    {
        return ['database']; // Simpan ke database
    }
    
    public function toArray($notifiable)
    {
        return [
            'type' => 'new_registration',
            'title' => 'Pendaftaran Baru',
            'message' => 'Ada pendaftaran baru yang perlu diverifikasi',
            'data' => [
                'registration_id' => $this->registration->id,
                'no_registrasi' => $this->registration->no_registrasi,
                'nama' => $this->registration->nama_lengkap
            ]
        ];
    }
}

// Endpoint API
GET /api/admin/notifications
GET /api/admin/notifications/unread-count
POST /api/admin/notifications/{id}/read
POST /api/admin/notifications/read-all
```

```typescript
// Di Frontend (Next.js) - Polling
useEffect(() => {
  // Fetch unread count setiap 15 detik
  const interval = setInterval(async () => {
    const response = await fetch('/api/admin/notifications/unread-count');
    const data = await response.json();
    setUnreadCount(data.count);
  }, 15000);

  return () => clearInterval(interval);
}, []);
```

## Level 2: Email Notification

```php
/**
 * EMAIL NOTIFICATION via Gmail SMTP
 * 
 * Setup:
 * 1. Enable "Less Secure Apps" di Google Account
 *    ATAU gunakan App Password (lebih aman)
 * 2. Configure .env
 */

// .env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password  // Bukan password biasa
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@kopnusa.id
MAIL_FROM_NAME="KNMP"

// Notification dengan Email
class ApprovalNotification extends Notification
{
    public function via($notifiable)
    {
        return ['database', 'mail']; // Database + Email
    }
    
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Pendaftaran Anda Disetujui')
            ->greeting('Selamat ' . $notifiable->name . '!')
            ->line('Pendaftaran Anda sebagai ' . $this->user->tier->nama_tier . ' telah disetujui.')
            ->line('Nomor Anggota: ' . $this->user->no_anggota)
            ->action('Lihat Profil', url('/member/profile'))
            ->line('Terima kasih telah bergabung!');
    }
}
```

## Level 3: WebSocket (DITUNDA sampai ada VPS)

```
┌─────────────────────────────────────────────────────────────────┐
│ WEBSOCKET - DITUNDA SAMPAI ADA VPS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  KENAPA DITUNDA?                                                │
│  ────────────────                                                │
│  1. Shared hosting biasanya tidak support WebSocket persistent  │
│  2. Butuh Node.js runtime di server                             │
│  3. Butuh port khusus yang mungkin tidak tersedia               │
│  4. Alternatif polling sudah cukup untuk MVP                    │
│                                                                 │
│  KAPAN DIGUNAKAN?                                               │
│  ─────────────────                                               │
│  - Setelah pindah ke VPS                                        │
│  - Membutuhkan realtime update yang cepat                       │
│  - Volume traffic tinggi                                        │
│                                                                 │
│  TEKNOLOGI YANG AKAN DIGUNAKAN:                                 │
│  ───────────────────────────────                                │
│  - Laravel Reverb (WebSocket server)                            │
│  - Laravel Echo (frontend library)                              │
│  - Pusher (alternatif cloud)                                    │
│                                                                 │
│  UNTUK SEKARANG: GUNAKAN POLLING                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 DAFTAR YANG HARUS DISIAPKAN SEBELUM PART 2

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST PERSIAPAN SEBELUM LANJUT                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HARDWARE:                                                      │
│  □ Komputer dengan spesifikasi minimal:                         │
│    - RAM: 4GB (8GB lebih baik)                                  │
│    - Storage: 10GB free space                                   │
│    - OS: Windows 10/11, macOS, atau Linux                       │
│                                                                 │
│  SOFTWARE:                                                      │
│  □ Web browser terbaru (Chrome/Firefox/Edge)                   │
│  □ Akses admin ke komputer (untuk install software)             │
│                                                                 │
│  INTERNET:                                                      │
│  □ Koneksi stabil untuk download (±300MB total)                │
│                                                                 │
│  AKUN & Akses:                                                  │
│  □ Akses cPanel hosting (untuk nanti)                          │
│  □ Domain kopnusa.id sudah aktif                                │
│  □ Email untuk notifikasi                                       │
│                                                                 │
│  WAKTU:                                                         │
│  □ Minimal 1-2 jam per hari untuk belajar                       │
│  □ Total estimasi: 30-60 jam untuk semua part                   │
│                                                                 │
│  MENTAL:                                                        │
│  □ Siap belajar hal baru                                        │
│  □ Tidak takut error                                            │
│  □ Konsisten dan sabar                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**TUTORIAL INI AKAN DILANJUTKAN DI FILE BERIKUTNYA DENGAN PART 3-30**

---

*Master Tutorial Laravel KNMP - 30 Part*
*Dibuat dengan ❤️ oleh PT Digital Bisnis Manajemen DIGIMAN*
*Master Polymath - The Ultimate Problem Solver*
