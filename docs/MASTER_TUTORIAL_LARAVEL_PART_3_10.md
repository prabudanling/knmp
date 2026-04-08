# 🚀 MASTER TUTORIAL LARAVEL KNMP
## Part 3-10: Setup Laravel & Database
### Untuk Newbie dengan Shared Hosting Tanpa SSH

---

# 📖 PART 3: MEMBUAT PROJECT LARAVEL BARU

## 3.1 Tujuan Part 3

```
┌─────────────────────────────────────────────────────────────────┐
│ TUJUAN PART 3                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Setelah menyelesaikan Part 3, kamu akan:                        │
│                                                                 │
│ ✅ Memiliki project Laravel baru di komputermu                  │
│ ✅ Memahami cara membuat project dengan Composer                │
│ ✅ Bisa menjalankan Laravel di localhost                        │
│ ✅ Memahami struktur folder dasar Laravel                       │
│ ✅ Siap untuk konfigurasi database di Part selanjutnya          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.2 Hasil Akhir Part 3

```
┌─────────────────────────────────────────────────────────────────┐
│ HASIL AKHIR PART 3                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Struktur folder yang akan dibuat:                              │
│                                                                 │
│  C:\xampp\htdocs\                                               │
│  └── knmp-api\                    ← Project Laravel baru        │
│      ├── app\                     ← Kode aplikasi               │
│      ├── bootstrap\               ← Framework startup           │
│      ├── config\                  ← Konfigurasi                 │
│      ├── database\                ← Migration, seeder           │
│      ├── public\                  ← Document root               │
│      ├── resources\               ← Views, assets               │
│      ├── routes\                  ← Route definitions           │
│      ├── storage\                 ← File storage                │
│      ├── tests\                   ← Unit tests                  │
│      ├── vendor\                  ← Dependencies                │
│      ├── .env                     ← Environment config          │
│      ├── .env.example             ← Template env                │
│      ├── artisan                  ← CLI tool                    │
│      ├── composer.json            ← Dependencies list           │
│      └── package.json             ← Frontend dependencies       │
│                                                                 │
│  URL Akses: http://localhost:8000                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.3 Konsep Dasar: Apa itu Project Laravel?

```
┌─────────────────────────────────────────────────────────────────┐
│ APA ITU PROJECT LARAVEL?                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Project Laravel adalah sekumpulan file dan folder yang         │
│  membentuk aplikasi web menggunakan framework Laravel.          │
│                                                                 │
│  ANALOGI:                                                       │
│  ────────                                                        │
│  Project Laravel seperti "rumah siap pakai" yang:               │
│  - Sudah ada fondasinya (framework)                             │
│  - Sudah ada atap dan dinding (struktur folder)                 │
│  - Sudah ada instalasi listrik dan air (fitur built-in)         │
│  - Kamu tinggal isi dengan furniture (kode bisnis)              │
│                                                                 │
│  FITUR YANG SUDAH ADA:                                          │
│  ────────────────────                                           │
│  - Authentication (login/register)                              │
│  - Routing (mengatur URL)                                       │
│  - Database ORM (mengakses database dengan PHP)                 │
│  - Validation (validasi input)                                  │
│  - Migration (version control database)                         │
│  - Dan masih banyak lagi...                                     │
│                                                                 │
│  KENAPA LARAVEL?                                                │
│  ────────────────                                                │
│  1. Paling populer di Indonesia                                 │
│  2. Dokumentasi sangat lengkap                                  │
│  3. Komunitas besar                                             │
│  4. Cocok untuk shared hosting                                  │
│  5. Mudah dipelajari untuk pemula                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.4 Langkah 1: Buka Command Prompt

### Step 3.4.1: Membuka Command Prompt di Folder htdocs

```
┌─────────────────────────────────────────────────────────────────┐
│ CARA 1: Via File Explorer (RECOMMENDED)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka File Explorer (Win+E)                                  │
│                                                                 │
│  2. Navigasi ke folder:                                         │
│     C:\xampp\htdocs                                             │
│                                                                 │
│  3. Di address bar, ketik: cmd                                  │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Address Bar:                                        │    │
│     │ C:\xampp\htdocs                                     │    │
│     │                                                     │    │
│     │ Ganti dengan: cmd                                   │    │
│     │ cmd                                                 │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  4. Tekan Enter                                                 │
│                                                                 │
│  5. Command Prompt akan terbuka di folder htdocs                │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  Prompt menunjukkan: C:\xampp\htdocs>                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CARA 2: Via Start Menu                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Tekan Win+R                                                 │
│                                                                 │
│  2. Ketik: cmd                                                  │
│                                                                 │
│  3. Tekan Enter                                                 │
│                                                                 │
│  4. Di Command Prompt, ketik:                                   │
│     cd C:\xampp\htdocs                                          │
│                                                                 │
│  5. Tekan Enter                                                 │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  Prompt menunjukkan: C:\xampp\htdocs>                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.5 Langkah 2: Buat Project Laravel

### Step 3.5.1: Jalankan Command Composer

```
┌─────────────────────────────────────────────────────────────────┐
│ COMMAND MEMBUAT PROJECT LARAVEL                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Di Command Prompt, ketik command berikut:                      │
│                                                                 │
│  composer create-project laravel/laravel knmp-api               │
│                                                                 │
│  PENJELASAN COMMAND:                                            │
│  ────────────────────                                           │
│                                                                 │
│  composer           → Jalankan Composer                         │
│  create-project     → Perintah untuk buat project baru         │
│  laravel/laravel    → Package Laravel dari repositori resmi     │
│  knmp-api           → Nama folder project (bisa diganti)        │
│                                                                 │
│  CONTOH OUTPUT:                                                 │
│  ────────────────                                               │
│                                                                 │
│  Creating a "laravel/laravel" project at "./knmp-api"           │
│  Installing laravel/laravel (v11.x.x)                           │
│    - Installing laravel/framework (v11.x.x)                     │
│    - Installing laravel/sanctum (v4.x.x)                        │
│    - Installing laravel/tinker (v2.x.x)                         │
│    ...                                                          │
│    ...                                                          │
│  Created project in C:\xampp\htdocs\knmp-api                    │
│  > @php artisan package:discover --ansi                         │
│    Discovered Package: laravel/sail                             │
│    Discovered Package: laravel/sanctum                          │
│    Discovered Package: laravel/tinker                           │
│    ...                                                          │
│  Application key set successfully.                              │
│                                                                 │
│  WAKTU PROSES:                                                  │
│  ─────────────                                                   │
│  - Download semua package dari internet                         │
│  - Butuh waktu 5-15 menit tergantung koneksi                    │
│  - Total download sekitar 50-100 MB                             │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ Tidak ada error                                             │
│  ✅ Ada pesan "Application key set successfully"                │
│  ✅ Ada pesan "Created project in C:\xampp\htdocs\knmp-api"     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3.5.2: Verifikasi Project Terbuat

```
┌─────────────────────────────────────────────────────────────────┐
│ VERIFIKASI PROJECT TERBUAT                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka File Explorer                                          │
│                                                                 │
│  2. Navigasi ke: C:\xampp\htdocs\knmp-api                      │
│                                                                 │
│  3. Pastikan ada folder dan file berikut:                       │
│                                                                 │
│     knmp-api\                                                   │
│     ├── app\              ← Ada                                 │
│     ├── bootstrap\        ← Ada                                 │
│     ├── config\           ← Ada                                 │
│     ├── database\         ← Ada                                 │
│     ├── public\           ← Ada                                 │
│     ├── resources\        ← Ada                                 │
│     ├── routes\           ← Ada                                 │
│     ├── storage\          ← Ada                                 │
│     ├── tests\            ← Ada                                 │
│     ├── vendor\           ← Ada (folder besar)                  │
│     ├── .env              ← Ada                                 │
│     ├── artisan           ← Ada                                 │
│     └── composer.json     ← Ada                                 │
│                                                                 │
│  JIKA ADA YANG KURANG:                                          │
│  ────────────────────                                           │
│  - Hapus folder knmp-api                                        │
│  - Jalankan command create-project lagi                         │
│  - Pastikan koneksi internet stabil                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.6 Langkah 3: Buka Project di VS Code

### Step 3.6.1: Membuka Folder Project

```
┌─────────────────────────────────────────────────────────────────┐
│ BUKA PROJECT DI VS CODE                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CARA 1: Via VS Code                                            │
│  ────────────────────                                           │
│  1. Buka VS Code                                                │
│  2. Klik File > Open Folder                                     │
│  3. Navigasi ke: C:\xampp\htdocs\knmp-api                      │
│  4. Klik "Select Folder"                                        │
│                                                                 │
│  CARA 2: Via File Explorer                                      │
│  ────────────────────────                                       │
│  1. Buka File Explorer                                          │
│  2. Navigasi ke: C:\xampp\htdocs\knmp-api                      │
│  3. Klik kanan di dalam folder                                  │
│  4. Pilih "Open with Code"                                      │
│                                                                 │
│  CARA 3: Via Command Prompt                                     │
│  ───────────────────────────                                    │
│  1. Di Command Prompt, pastikan sudah di folder knmp-api        │
│  2. Ketik: code .                                               │
│  3. Tekan Enter                                                 │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  - VS Code terbuka                                              │
│  - Sidebar kiri menampilkan struktur folder knmp-api            │
│  - Semua extension Laravel aktif (ada autocomplete)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.7 Langkah 4: Jalankan Laravel

### Step 3.7.1: Menjalankan Development Server

```
┌─────────────────────────────────────────────────────────────────┐
│ JALANKAN LARAVEL DEVELOPMENT SERVER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CARA 1: Via Command Prompt                                     │
│  ───────────────────────────                                    │
│  1. Buka Command Prompt baru                                    │
│  2. Navigasi ke folder project:                                 │
│     cd C:\xampp\htdocs\knmp-api                                 │
│  3. Jalankan command:                                           │
│     php artisan serve                                           │
│                                                                 │
│  OUTPUT YANG DIHARAPKAN:                                        │
│  ────────────────────────                                       │
│                                                                 │
│    Starting Laravel development server: http://127.0.0.1:8000   │
│    [Sun Mar 15 10:30:00 2026] PHP 8.2.12 Development Server     │
│    (http://127.0.0.1:8000) started                              │
│                                                                 │
│  CARA 2: Via VS Code Terminal                                   │
│  ────────────────────────────                                   │
│  1. Buka VS Code                                                │
│  2. Tekan Ctrl+` (backtick) untuk buka terminal                 │
│  3. Ketik: php artisan serve                                    │
│  4. Tekan Enter                                                 │
│                                                                 │
│  PENTING:                                                       │
│  ────────                                                        │
│  - JANGAN TUTUP terminal/command prompt yang menjalankan serve  │
│  - Jika ditutup, server akan berhenti                           │
│  - Untuk stop server, tekan Ctrl+C                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3.7.2: Test di Browser

```
┌─────────────────────────────────────────────────────────────────┐
│ TEST LARAVEL DI BROWSER                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka browser (Chrome/Firefox/Edge)                          │
│                                                                 │
│  2. Ketik URL:                                                  │
│     http://localhost:8000                                       │
│     ATAU                                                        │
│     http://127.0.0.1:8000                                       │
│                                                                 │
│  3. Tekan Enter                                                 │
│                                                                 │
│  4. Jika berhasil, akan muncul halaman Laravel dengan:          │
│     - Logo Laravel                                              │
│     - Teks "Laravel"                                            │
│     - Tampilan yang bersih dan modern                           │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ Halaman Laravel muncul                                      │
│  ✅ Tidak ada error 404 atau 500                               │
│  ✅ Tampilan seperti gambar di bawah:                           │
│                                                                 │
│     ┌───────────────────────────────────────────────────┐      │
│     │                                                   │      │
│     │              [Laravel Logo]                       │      │
│     │                                                   │      │
│     │                 Laravel                           │      │
│     │                                                   │      │
│     │     Documentation  Laracasts  News  Partners     │      │
│     │                                                   │      │
│     └───────────────────────────────────────────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.8 Memahami Struktur Folder Laravel

### Penjelasan Detail Setiap Folder

```
┌─────────────────────────────────────────────────────────────────┐
│ STRUKTUR FOLDER LARAVEL - PENJELASAN LENGKAP                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  knmp-api/                                                      │
│  │                                                              │
│  ├── app/                                                       │
│  │   ├── Console/           ← Command yang bisa dijalankan     │
│  │   ├── Exceptions/        ← Error handling                   │
│  │   ├── Http/              ← HTTP layer                       │
│  │   │   ├── Controllers/   ← Logic untuk handle request       │
│  │   │   ├── Middleware/    ← Filter request/response          │
│  │   │   └── Requests/      ← Validasi input                   │
│  │   ├── Models/            ← Representasi tabel database      │
│  │   ├── Providers/         ← Service providers                │
│  │   └── Services/          ← Business logic (akan dibuat)     │
│  │                                                              │
│  ├── bootstrap/                                                 │
│  │   ├── app.php            ← Bootstrap aplikasi               │
│  │   └── cache/             ← Cache files                      │
│  │                                                              │
│  ├── config/                ← Semua konfigurasi aplikasi       │
│  │   ├── app.php            ← Config utama                     │
│  │   ├── database.php       ← Config database                  │
│  │   ├── filesystems.php    ← Config file storage              │
│  │   └── ...                                                     │
│  │                                                              │
│  ├── database/              ← Semua yang berhubungan DB        │
│  │   ├── factories/         ← Test data factories              │
│  │   ├── migrations/        ← Schema database                  │
│  │   └── seeders/           ← Data awal                        │
│  │                                                              │
│  ├── public/                ← Document root (yang diakses web) │
│  │   ├── index.php          ← Entry point                      │
│  │   ├── .htaccess          ← Apache config                    │
│  │   └── assets/            ← CSS, JS, images                  │
│  │                                                              │
│  ├── resources/             ← Views dan raw assets             │
│  │   ├── views/             ← Template HTML (Blade)            │
│  │   ├── js/                ← JavaScript                       │
│  │   ├── css/               ← CSS                              │
│  │   └── lang/              ← Multi-language                   │
│  │                                                              │
│  ├── routes/                ← Definisi URL aplikasi            │
│  │   ├── web.php            ← Routes untuk web                 │
│  │   ├── api.php            ← Routes untuk API                 │
│  │   └── console.php        ← Routes untuk CLI                 │
│  │                                                              │
│  ├── storage/               ← File storage                     │
│  │   ├── app/               ← Application files                │
│  │   ├── framework/         ← Framework files                  │
│  │   └── logs/              ← Log files                        │
│  │                                                              │
│  ├── tests/                 ← Unit dan feature tests           │
│  │                                                              │
│  ├── vendor/                ← Third-party packages             │
│  │                                                              │
│  ├── .env                   ← Environment variables (PENTING)   │
│  ├── .env.example           ← Template .env                    │
│  ├── artisan                ← CLI tool Laravel                 │
│  ├── composer.json          ← PHP dependencies                 │
│  ├── composer.lock          ← Locked versions                  │
│  └── package.json           ← Node dependencies                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### File yang Paling Sering Diubah

```
┌─────────────────────────────────────────────────────────────────┐
│ FILE YANG PALING SERING DIUBAH                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  URUTAN FREKUENSI:                                              │
│                                                                 │
│  1. routes/api.php              ← Definisi endpoint API        │
│     - Setiap API baru harus didaftarkan di sini                │
│                                                                 │
│  2. app/Http/Controllers/       ← Logic aplikasi               │
│     - Memproses request, return response                        │
│                                                                 │
│  3. app/Models/                 ← Data model                   │
│     - Representasi tabel database                               │
│                                                                 │
│  4. database/migrations/        ← Database schema              │
│     - Definisi struktur tabel                                   │
│                                                                 │
│  5. .env                        ← Konfigurasi                  │
│     - Database, app key, dll                                    │
│                                                                 │
│  6. app/Http/Requests/          ← Validation                   │
│     - Validasi input dari user                                  │
│                                                                 │
│  7. config/*.php                ← Konfigurasi                  │
│     - Pengaturan aplikasi                                       │
│                                                                 │
│  URUTAN YANG AKAN KITA BUAT:                                    │
│  ──────────────────────────                                     │
│  Part 5:  .env                                                  │
│  Part 6:  database/migrations/                                  │
│  Part 7:  app/Models/                                           │
│  Part 8:  routes/api.php                                        │
│  Part 9:  app/Http/Controllers/                                 │
│  Part 10: app/Http/Requests/                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.9 File Penting: .env

### Apa itu .env?

```
┌─────────────────────────────────────────────────────────────────┐
│ APA ITU .env?                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  .env (environment) adalah file yang berisi konfigurasi         │
│  yang BERBEDA antara lokal dan production.                      │
│                                                                 │
│  KENAPA PERLU .env?                                             │
│  ────────────────────                                           │
│  1. Database lokal vs production berbeda                        │
│  2. Debug mode harus off di production                          │
│  3. API keys berbeda antar environment                          │
│  4. Password dan secret TIDAK boleh di commit ke Git            │
│                                                                 │
│  ISI FILE .env (DEFAULT):                                       │
│  ─────────────────────────                                       │
│                                                                 │
│  APP_NAME=Laravel                                               │
│  APP_ENV=local                                                  │
│  APP_KEY=base64:xxxxx...                                        │
│  APP_DEBUG=true                                                 │
│  APP_URL=http://localhost                                       │
│                                                                 │
│  DB_CONNECTION=mysql                                            │
│  DB_HOST=127.0.0.1                                              │
│  DB_PORT=3306                                                   │
│  DB_DATABASE=laravel                                            │
│  DB_USERNAME=root                                               │
│  DB_PASSWORD=                                                   │
│                                                                 │
│  YANG AKAN KITA UBAH DI PART 5:                                 │
│  ──────────────────────────────                                 │
│  - APP_NAME → KNMP_API                                          │
│  - DB_DATABASE → knmp_database                                  │
│  - Dan lainnya...                                               │
│                                                                 │
│  PENTING:                                                       │
│  ────────                                                        │
│  - File .env TIDAK boleh di-commit ke Git                       │
│  - File .env ADA di .gitignore (sudah otomatis)                │
│  - Di hosting, .env harus dibuat manual                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.10 Troubleshooting

```
┌─────────────────────────────────────────────────────────────────┐
│ TROUBLESHOOTING PART 3                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MASALAH 1: "composer tidak dikenali"                           │
│  ────────────────────────────────────                           │
│  Solusi:                                                        │
│  1. Pastikan Composer sudah terinstall (Part 2)                 │
│  2. Restart Command Prompt                                      │
│  3. Jika masih error, restart komputer                          │
│                                                                 │
│  MASALAH 2: Download sangat lambat                              │
│  ────────────────────────────────                               │
│  Solusi:                                                        │
│  1. Gunakan koneksi internet yang stabil                        │
│  2. Coba di waktu yang tidak sibuk (malam/pagi)                │
│  3. Gunakan VPN jika diperlukan                                 │
│                                                                 │
│  MASALAH 3: "php artisan serve" tidak jalan                     │
│  ──────────────────────────────────────────                     │
│  Solusi:                                                        │
│  1. Pastikan sudah cd ke folder project                         │
│     cd C:\xampp\htdocs\knmp-api                                 │
│  2. Pastikan PHP ada di PATH                                    │
│  3. Cek dengan: php -v                                          │
│                                                                 │
│  MASALAH 4: Port 8000 sudah dipakai                             │
│  ───────────────────────────────                                │
│  Solusi:                                                        │
│  1. Gunakan port lain:                                          │
│     php artisan serve --port=8001                               │
│  2. Akses dengan: http://localhost:8001                         │
│                                                                 │
│  MASALAH 5: Halaman blank / error 500                           │
│  ────────────────────────────────                               │
│  Solusi:                                                        │
│  1. Cek file .env ada                                           │
│  2. Jalankan: php artisan key:generate                          │
│  3. Clear cache: php artisan config:clear                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.11 Checklist Part 3

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST PART 3                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Folder knmp-api sudah ada di C:\xampp\htdocs\               │
│                                                                 │
│  □ Struktur folder lengkap (app, config, routes, dll)           │
│                                                                 │
│  □ File .env ada di root folder                                 │
│                                                                 │
│  □ php artisan serve berjalan                                   │
│                                                                 │
│  □ http://localhost:8000 menampilkan halaman Laravel            │
│                                                                 │
│  □ Project sudah terbuka di VS Code                             │
│                                                                 │
│  □ Memahami fungsi masing-masing folder                         │
│                                                                 │
│  JIKA SEMUA TERISI, LANJUT KE PART 4!                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.12 Ringkasan File

```
┌─────────────────────────────────────────────────────────────────┐
│ RINGKASAN FILE YANG DIBUAT DI PART 3                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SEMUA FILE DI-CREATE OTOMATIS oleh Composer:                   │
│                                                                 │
│  C:\xampp\htdocs\knmp-api\                                      │
│  ├── app\                       ← Otomatis                      │
│  ├── bootstrap\                 ← Otomatis                      │
│  ├── config\                    ← Otomatis                      │
│  ├── database\                  ← Otomatis                      │
│  ├── public\                    ← Otomatis                      │
│  ├── resources\                 ← Otomatis                      │
│  ├── routes\                    ← Otomatis                      │
│  ├── storage\                   ← Otomatis                      │
│  ├── tests\                     ← Otomatis                      │
│  ├── vendor\                    ← Otomatis                      │
│  ├── .env                       ← Otomatis                      │
│  ├── artisan                    ← Otomatis                      │
│  ├── composer.json              ← Otomatis                      │
│  └── ...                                                         │
│                                                                 │
│  KAMU TIDAK PERLU MEMBUAT FILE APAPUN SECARA MANUAL             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 3.13 Next Step

```
┌─────────────────────────────────────────────────────────────────┐
│ NEXT: PART 4                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Di Part 4, kita akan:                                          │
│                                                                 │
│  1. Memahami struktur folder Laravel lebih dalam                │
│  2. Mempelajari konsep MVC (Model-View-Controller)             │
│  3. Memahami flow request di Laravel                            │
│  4. Mempelajari file-file konfigurasi penting                   │
│                                                                 │
│  Yang perlu disiapkan:                                          │
│  - Project Laravel sudah berjalan                               │
│  - VS Code sudah terbuka                                        │
│  - Browser siap untuk testing                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 PART 4: MEMAHAMI STRUKTUR FOLDER LARAVEL

## 4.1 Tujuan Part 4

```
┌─────────────────────────────────────────────────────────────────┐
│ TUJUAN PART 4                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Setelah menyelesaikan Part 4, kamu akan:                        │
│                                                                 │
│ ✅ Memahami konsep MVC (Model-View-Controller)                 │
│ ✅ Memahami flow request di Laravel                             │
│ ✅ Memahami folder dan file yang sering diubah                  │
│ ✅ Memahami konsep Routing, Controller, Model                   │
│ ✅ Siap untuk konfigurasi di Part 5                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4.2 Konsep MVC

### Apa itu MVC?

```
┌─────────────────────────────────────────────────────────────────┐
│ KONSEP MVC (MODEL-VIEW-CONTROLLER)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MVC adalah pola desain yang memisahkan aplikasi menjadi 3     │
│  bagian utama untuk membuat kode lebih terorganisir.            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │                     REQUEST                             │   │
│  │                        │                                │   │
│  │                        ▼                                │   │
│  │  ┌──────────┐     ┌──────────┐     ┌──────────┐       │   │
│  │  │   VIEW   │◄────│CONTROLLER│────►│  MODEL   │       │   │
│  │  │          │     │          │     │          │       │   │
│  │  │ Tampilan │     │   Logika │     │   Data   │       │   │
│  │  │          │     │          │     │          │       │   │
│  │  └──────────┘     └──────────┘     └──────────┘       │   │
│  │       │                │                │              │   │
│  │       │                │                │              │   │
│  │       │                ▼                │              │   │
│  │       │          ┌──────────┐           │              │   │
│  │       │          │ DATABASE │◄──────────┘              │   │
│  │       │          └──────────┘                          │   │
│  │       │                                                 │   │
│  │       ▼                                                 │   │
│  │  ┌──────────┐                                          │   │
│  │  │ RESPONSE │                                          │   │
│  │  └──────────┘                                          │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ANALOGI:                                                       │
│  ────────                                                        │
│  Model      = Gudang (menyimpan data)                          │
│  View       = Display (menampilkan ke user)                    │
│  Controller = Kurir (mengatur antara gudang dan display)       │
│                                                                 │
│  CONTOH ALUR:                                                   │
│  ────────────                                                    │
│  1. User membuka halaman profil                                 │
│  2. Request masuk ke Controller                                 │
│  3. Controller meminta data ke Model                            │
│  4. Model mengambil data dari Database                          │
│  5. Model mengembalikan data ke Controller                      │
│  6. Controller mengirim data ke View                            │
│  7. View menampilkan halaman ke User                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Di Laravel, MVC Ada Di Mana?

```
┌─────────────────────────────────────────────────────────────────┐
│ LOKASI MVC DI LARAVEL                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MODEL:                                                         │
│  ──────                                                          │
│  Lokasi: app/Models/                                            │
│  Contoh: app/Models/User.php                                    │
│                                                                 │
│  Fungsi:                                                        │
│  - Berbicara dengan database                                    │
│  - Menjalankan query (SELECT, INSERT, UPDATE, DELETE)          │
│  - Validasi data sebelum disimpan                               │
│  - Relasi antar tabel                                           │
│                                                                 │
│  CONTROLLER:                                                    │
│  ──────────                                                      │
│  Lokasi: app/Http/Controllers/                                  │
│  Contoh: app/Http/Controllers/UserController.php                │
│                                                                 │
│  Fungsi:                                                        │
│  - Menerima request dari user                                   │
│  - Memanggil Model untuk ambil/simpan data                     │
│  - Mengembalikan response (JSON untuk API)                     │
│                                                                 │
│  VIEW:                                                          │
│  ─────                                                           │
│  Lokasi: resources/views/                                       │
│  Contoh: resources/views/profile.blade.php                      │
│                                                                 │
│  Fungsi:                                                        │
│  - Menampilkan HTML ke user                                     │
│  - Untuk API, View tidak digunakan (return JSON langsung)      │
│                                                                 │
│  ROUTE:                                                         │
│  ──────                                                          │
│  Lokasi: routes/web.php (untuk web)                            │
│           routes/api.php (untuk API)                           │
│                                                                 │
│  Fungsi:                                                        │
│  - Menghubungkan URL dengan Controller                          │
│  - Contoh: /api/users → UserController@index                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4.3 Flow Request di Laravel

### Bagaimana Request Diproses?

```
┌─────────────────────────────────────────────────────────────────┐
│ FLOW REQUEST LARAVEL                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User mengakses: http://localhost:8000/api/users               │
│                                                                 │
│  1. WEB SERVER (Apache/Nginx)                                   │
│     └── Menerima request HTTP                                   │
│     └── Mengarahkan ke public/index.php                         │
│                                                                 │
│  2. PUBLIC/INDEX.PHP                                            │
│     └── Entry point aplikasi                                    │
│     └── Load bootstrap/app.php                                  │
│                                                                 │
│  3. BOOTSTRAP/APP.PHP                                           │
│     └── Load framework                                          │
│     └── Load service providers                                  │
│                                                                 │
│  4. ROUTES/API.PHP                                              │
│     └── Cari route yang cocok dengan URL                        │
│     └── Route::get('/users', [UserController::class, 'index']) │
│     └── Ditemukan! Arahkan ke UserController                    │
│                                                                 │
│  5. MIDDLEWARE                                                  │
│     └── Filter request sebelum sampai Controller               │
│     └── Contoh: auth, cors, throttle                           │
│                                                                 │
│  6. CONTROLLER (UserController.php)                             │
│     └── Method index() dipanggil                                │
│     └── Controller meminta data ke Model                        │
│                                                                 │
│  7. MODEL (User.php)                                            │
│     └── Method all() dipanggil                                  │
│     └── Query database: SELECT * FROM users                     │
│     └── Return collection of users                              │
│                                                                 │
│  8. CONTROLLER                                                  │
│     └── Terima data dari Model                                  │
│     └── Return response JSON                                    │
│                                                                 │
│  9. RESPONSE                                                    │
│     └── JSON dikirim ke user                                    │
│     └── {"users": [...]}                                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │  Browser ──► index.php ──► Route ──► Middleware ──►     │  │
│  │                                                          │  │
│  │  Controller ──► Model ──► Database ──► Model ──►        │  │
│  │                                                          │  │
│  │  Controller ──► JSON Response ──► Browser               │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4.4 File Konfigurasi Penting

### File yang Wajib Dipahami

```
┌─────────────────────────────────────────────────────────────────┐
│ FILE KONFIGURASI PENTING                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. .env (Environment File)                                     │
│     ─────────────────────────                                    │
│     Lokasi: Root folder                                         │
│     Fungsi: Konfigurasi yang berbeda per environment            │
│                                                                 │
│     Isi penting:                                                │
│     - APP_NAME (nama aplikasi)                                  │
│     - APP_ENV (local/production)                                │
│     - APP_DEBUG (true/false)                                    │
│     - APP_URL (URL aplikasi)                                    │
│     - DB_* (konfigurasi database)                               │
│                                                                 │
│  2. config/app.php                                              │
│     ─────────────────                                            │
│     Fungsi: Konfigurasi aplikasi utama                          │
│     - Timezone                                                  │
│     - Locale                                                    │
│     - Providers                                                 │
│                                                                 │
│  3. config/database.php                                         │
│     ──────────────────────                                       │
│     Fungsi: Konfigurasi database                                │
│     - MySQL, PostgreSQL, SQLite                                 │
│     - Connection settings                                       │
│                                                                 │
│  4. config/cors.php                                             │
│     ──────────────────                                           │
│     Fungsi: Cross-Origin Resource Sharing                       │
│     - Izinkan frontend akses API                                │
│     - Penting untuk Next.js frontend                            │
│                                                                 │
│  5. config/auth.php                                             │
│     ──────────────────                                           │
│     Fungsi: Konfigurasi authentication                          │
│     - Guards (web, api)                                         │
│     - Providers                                                 │
│                                                                 │
│  6. config/filesystems.php                                      │
│     ─────────────────────────                                    │
│     Fungsi: Konfigurasi file storage                            │
│     - Local, public, s3                                         │
│     - Upload path                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4.5 Checklist Part 4

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST PART 4                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Memahami konsep MVC                                          │
│                                                                 │
│  □ Memahami lokasi Model, View, Controller di Laravel          │
│                                                                 │
│  □ Memahami flow request dari browser ke response               │
│                                                                 │
│  □ Memahami fungsi routes/api.php                               │
│                                                                 │
│  □ Memahami fungsi file .env                                    │
│                                                                 │
│  □ Memahami fungsi middleware                                   │
│                                                                 │
│  JIKA MASIH BINGUNG, BACA ULANG ATAU TANYAKAN!                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 PART 5: KONFIGURASI ENVIRONMENT (.env)

## 5.1 Tujuan Part 5

```
┌─────────────────────────────────────────────────────────────────┐
│ TUJUAN PART 5                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Setelah menyelesaikan Part 5, kamu akan:                        │
│                                                                 │
│ ✅ Memahami file .env dan fungsinya                             │
│ ✅ Bisa mengubah konfigurasi aplikasi                           │
│ ✅ Memahami perbedaan local dan production                      │
│ ✅ Siap membuat database di Part 6                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5.2 Buka File .env

```
┌─────────────────────────────────────────────────────────────────┐
│ CARA BUKA FILE .env                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CARA 1: Via VS Code                                            │
│  ────────────────────                                           │
│  1. Buka VS Code dengan project knmp-api                        │
│  2. Di sidebar kiri, cari file .env                             │
│  3. Klik file .env untuk membukanya                             │
│                                                                 │
│  CARA 2: Via File Explorer                                      │
│  ────────────────────────                                       │
│  1. Buka File Explorer                                          │
│  2. Navigasi ke C:\xampp\htdocs\knmp-api                       │
│  3. Cari file .env (file dengan nama .env saja)                 │
│  4. Klik kanan > Open with > VS Code                            │
│                                                                 │
│  PENTING:                                                       │
│  ────────                                                        │
│  - File .env tersembunyi (diawali titik)                        │
│  - Di File Explorer, pastikan "Show hidden files" aktif         │
│  - Atau buka langsung dari VS Code                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5.3 Ubah Konfigurasi .env

### Edit File .env

```
┌─────────────────────────────────────────────────────────────────┐
│ EDIT FILE .env                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CARI DAN UBAH BARIS BERIKUT:                                   │
│                                                                 │
│  1. APP_NAME                                                    │
│     ──────────                                                   │
│     SEBELUM:                                                    │
│     APP_NAME=Laravel                                            │
│                                                                 │
│     SESUDAH:                                                    │
│     APP_NAME=KNMP_API                                           │
│                                                                 │
│  2. APP_URL                                                     │
│     ─────────                                                    │
│     SEBELUM:                                                    │
│     APP_URL=http://localhost                                    │
│                                                                 │
│     SESUDAH:                                                    │
│     APP_URL=http://localhost:8000                               │
│                                                                 │
│  3. Database Configuration                                      │
│     ────────────────────────                                    │
│     SEBELUM:                                                    │
│     DB_CONNECTION=mysql                                         │
│     DB_HOST=127.0.0.1                                           │
│     DB_PORT=3306                                                │
│     DB_DATABASE=laravel                                         │
│     DB_USERNAME=root                                            │
│     DB_PASSWORD=                                                │
│                                                                 │
│     SESUDAH:                                                    │
│     DB_CONNECTION=mysql                                         │
│     DB_HOST=127.0.0.1                                           │
│     DB_PORT=3306                                                │
│     DB_DATABASE=knmp_database                                   │
│     DB_USERNAME=root                                            │
│     DB_PASSWORD=                                                │
│                                                                 │
│  FILE .env LENGKAP SETELAH DIUBAH:                              │
│  ──────────────────────────────────────                         │
│                                                                 │
│  APP_NAME=KNMP_API                                              │
│  APP_ENV=local                                                  │
│  APP_KEY=base64:xxxxx...                                        │
│  APP_DEBUG=true                                                 │
│  APP_TIMEZONE=Asia/Jakarta                                      │
│  APP_URL=http://localhost:8000                                  │
│                                                                 │
│  APP_LOCALE=en                                                  │
│  APP_FALLBACK_LOCALE=en                                         │
│  APP_FAKER_LOCALE=en_US                                         │
│                                                                 │
│  APP_MAINTENANCE_DRIVER=file                                    │
│                                                                 │
│  BCRYPT_ROUNDS=12                                               │
│                                                                 │
│  LOG_CHANNEL=stack                                              │
│  LOG_STACK=single                                               │
│  LOG_DEPRECATIONS_CHANNEL=null                                  │
│  LOG_LEVEL=debug                                                │
│                                                                 │
│  DB_CONNECTION=mysql                                            │
│  DB_HOST=127.0.0.1                                              │
│  DB_PORT=3306                                                   │
│  DB_DATABASE=knmp_database                                      │
│  DB_USERNAME=root                                               │
│  DB_PASSWORD=                                                   │
│                                                                 │
│  SESSION_DRIVER=database                                        │
│  SESSION_LIFETIME=120                                           │
│  SESSION_ENCRYPT=false                                          │
│  SESSION_PATH=/                                                 │
│  SESSION_DOMAIN=null                                            │
│                                                                 │
│  BROADCAST_CONNECTION=log                                       │
│  FILESYSTEM_DISK=local                                          │
│  QUEUE_CONNECTION=database                                      │
│                                                                 │
│  CACHE_STORE=database                                           │
│  CACHE_PREFIX=                                                  │
│                                                                 │
│  MEMCACHED_HOST=127.0.0.1                                       │
│                                                                 │
│  REDIS_HOST=127.0.0.1                                           │
│  REDIS_PASSWORD=null                                            │
│  REDIS_PORT=6379                                                │
│                                                                 │
│  MAIL_MAILER=smtp                                               │
│  MAIL_HOST=mailpit                                              │
│  MAIL_PORT=1025                                                 │
│  MAIL_USERNAME=null                                             │
│  MAIL_PASSWORD=null                                             │
│  MAIL_ENCRYPTION=null                                           │
│  MAIL_FROM_ADDRESS="hello@example.com"                          │
│  MAIL_FROM_NAME="${APP_NAME}"                                   │
│                                                                 │
│  AWS_ACCESS_KEY_ID=                                             │
│  AWS_SECRET_ACCESS_KEY=                                         │
│  AWS_DEFAULT_REGION=us-east-1                                   │
│  AWS_BUCKET=                                                    │
│  AWS_USE_PATH_STYLE_ENDPOINT=false                              │
│                                                                 │
│  VITE_APP_NAME="${APP_NAME}"                                    │
│  VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"                        │
│  VITE_PUSHER_HOST="${PUSHER_HOST}"                              │
│  VITE_PUSHER_PORT="${PUSHER_PORT}"                              │
│  VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"                          │
│  VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5.4 Save File .env

```
┌─────────────────────────────────────────────────────────────────┐
│ SAVE FILE .env                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Di VS Code:                                                    │
│  1. Tekan Ctrl+S untuk save                                     │
│  2. Atau File > Save                                            │
│                                                                 │
│  PENTING:                                                       │
│  ────────                                                        │
│  - Pastikan file tersimpan                                      │
│  - Jika ada tab dot di nama file, berarti belum disave         │
│  - Setelah save, Laravel akan otomatis membaca konfigurasi baru │
│                                                                 │
│  JIKA ADA ERROR SETELAH SAVE:                                   │
│  ────────────────────────────────                               │
│  1. Stop server (Ctrl+C di terminal)                            │
│  2. Jalankan: php artisan config:clear                          │
│  3. Jalankan lagi: php artisan serve                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5.5 Checklist Part 5

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST PART 5                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ File .env sudah dibuka di VS Code                            │
│                                                                 │
│  □ APP_NAME diubah menjadi KNMP_API                             │
│                                                                 │
│  □ APP_URL diubah menjadi http://localhost:8000                 │
│                                                                 │
│  □ DB_DATABASE diubah menjadi knmp_database                     │
│                                                                 │
│  □ File .env sudah disave                                       │
│                                                                 │
│  □ Server Laravel masih berjalan tanpa error                    │
│                                                                 │
│  JIKA SEMUA TERISI, LANJUT KE PART 6!                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 PART 6: SETUP DATABASE MYSQL

## 6.1 Tujuan Part 6

```
┌─────────────────────────────────────────────────────────────────┐
│ TUJUAN PART 6                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Setelah menyelesaikan Part 6, kamu akan:                        │
│                                                                 │
│ ✅ Memiliki database knmp_database di MySQL                     │
│ ✅ Bisa mengakses phpMyAdmin                                    │
│ ✅ Memahami konsep database dan tabel                           │
│ ✅ Siap membuat migration di Part 7                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6.2 Buka phpMyAdmin

### Step 6.2.1: Akses phpMyAdmin

```
┌─────────────────────────────────────────────────────────────────┐
│ BUKA PHPMYADMIN                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CARA 1: Via Browser                                            │
│  ────────────────────                                           │
│  1. Buka browser                                                │
│  2. Ketik URL: http://localhost/phpmyadmin                      │
│  3. Tekan Enter                                                 │
│                                                                 │
│  CARA 2: Via XAMPP Control Panel                                │
│  ───────────────────────────────                                │
│  1. Buka XAMPP Control Panel                                    │
│  2. Klik tombol "Admin" di baris MySQL                          │
│  3. Browser akan terbuka dengan phpMyAdmin                      │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ Halaman phpMyAdmin terbuka                                  │
│  ✅ Ada daftar database di sidebar kiri                         │
│  ✅ Tidak ada error "Access denied"                             │
│                                                                 │
│  JIKA ERROR ACCESS DENIED:                                      │
│  ────────────────────────                                       │
│  1. Cek file config.inc.php di C:\xampp\phpMyAdmin\            │
│  2. Pastikan password kosong                                    │
│  3. Restart MySQL di XAMPP Control Panel                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6.3 Buat Database Baru

### Step 6.3.1: Create Database

```
┌─────────────────────────────────────────────────────────────────┐
│ BUAT DATABASE knmp_database                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Di phpMyAdmin, klik tab "Databases" di menu atas            │
│                                                                 │
│  2. Atau klik "New" di sidebar kiri                             │
│                                                                 │
│  3. Di form "Create database":                                  │
│     ┌─────────────────────────────────────────────────────┐    │
│     │ Database name: knmp_database                        │    │
│     │ Collation: utf8mb4_unicode_ci                       │    │
│     └─────────────────────────────────────────────────────┘    │
│                                                                 │
│  4. Klik tombol "Create"                                        │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ Database knmp_database muncul di sidebar kiri              │
│  ✅ Pesan "Database knmp_database has been created"            │
│  ✅ Tidak ada error                                             │
│                                                                 │
│  PENTING:                                                       │
│  ────────                                                        │
│  - Nama database HARUS SAMA dengan di .env                      │
│  - DB_DATABASE=knmp_database                                    │
│  - Collation utf8mb4_unicode_ci untuk support emoji             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6.4 Test Koneksi Database

### Step 6.4.1: Jalankan Migration Default

```
┌─────────────────────────────────────────────────────────────────┐
│ TEST KONEKSI DATABASE                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Buka terminal/command prompt                                │
│                                                                 │
│  2. Pastikan sudah di folder project:                           │
│     cd C:\xampp\htdocs\knmp-api                                 │
│                                                                 │
│  3. Jalankan command:                                           │
│     php artisan migrate                                         │
│                                                                 │
│  OUTPUT YANG DIHARAPKAN:                                        │
│  ────────────────────────                                       │
│                                                                 │
│    INFO  Preparing database.                                    │
│                                                                 │
│    Creating migration table ........................ 42ms DONE  │
│                                                                 │
│    INFO  Running migrations.                                    │
│                                                                 │
│    0001_01_01_000000_create_users_table ................ 45ms   │
│    0001_01_01_000001_create_cache_table ................. 32ms  │
│    0001_01_01_000002_create_jobs_table ................. 28ms   │
│                                                                 │
│  TANDA BERHASIL:                                                │
│  ────────────────                                                │
│  ✅ Tidak ada error "Connection refused"                        │
│  ✅ Migration berjalan tanpa error                              │
│  ✅ Tabel-tabel dibuat di database                              │
│                                                                 │
│  VERIFIKASI DI PHPMYADMIN:                                      │
│  ────────────────────────                                       │
│  1. Refresh phpMyAdmin (F5)                                     │
│  2. Klik database knmp_database                                 │
│  3. Pastikan ada tabel:                                         │
│     - migrations                                                │
│     - users                                                     │
│     - cache                                                     │
│     - jobs                                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6.5 Troubleshooting Database

```
┌─────────────────────────────────────────────────────────────────┐
│ TROUBLESHOOTING DATABASE                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MASALAH 1: "SQLSTATE[HY000] [2002] Connection refused"         │
│  ─────────────────────────────────────────────────────          │
│  Penyebab: MySQL tidak running                                  │
│  Solusi:                                                        │
│  1. Buka XAMPP Control Panel                                    │
│  2. Klik Start di MySQL                                         │
│  3. Pastikan MySQL hijau                                        │
│                                                                 │
│  MASALAH 2: "SQLSTATE[HY000] [1049] Unknown database"           │
│  ─────────────────────────────────────────────────────          │
│  Penyebab: Database belum dibuat                                │
│  Solusi:                                                        │
│  1. Buat database di phpMyAdmin (ikuti langkah 6.3)            │
│  2. Pastikan nama database sama dengan .env                     │
│                                                                 │
│  MASALAH 3: "SQLSTATE[HY000] [1045] Access denied"              │
│  ─────────────────────────────────────────────────────          │
│  Penyebab: Username/password salah                              │
│  Solusi:                                                        │
│  1. Cek DB_USERNAME dan DB_PASSWORD di .env                     │
│  2. Default XAMPP: root dengan password kosong                 │
│  3. Pastikan tidak ada typo                                     │
│                                                                 │
│  MASALAH 4: phpMyAdmin tidak bisa diakses                       │
│  ──────────────────────────────────                             │
│  Solusi:                                                        │
│  1. Pastikan Apache dan MySQL running di XAMPP                  │
│  2. Cek port 80 dan 3306 tidak dipakai program lain             │
│  3. Restart Apache dan MySQL                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6.6 Checklist Part 6

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST PART 6                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ MySQL running di XAMPP (hijau)                               │
│                                                                 │
│  □ phpMyAdmin bisa diakses                                      │
│                                                                 │
│  □ Database knmp_database sudah dibuat                          │
│                                                                 │
│  □ php artisan migrate berhasil tanpa error                     │
│                                                                 │
│  □ Tabel migrations, users, cache, jobs ada di database         │
│                                                                 │
│  JIKA SEMUA TERISI, LANJUT KE PART 7!                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 PART 7-10: RINGKASAN

## Part 7: Migration - Membuat Tabel Users Extended

```
┌─────────────────────────────────────────────────────────────────┐
│ PART 7: MIGRATION USERS EXTENDED                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COMMAND:                                                       │
│  php artisan make:migration add_fields_to_users_table           │
│                                                                 │
│  FILE DIBUAT:                                                   │
│  database/migrations/xxxx_add_fields_to_users_table.php         │
│                                                                 │
│  FIELD YANG DITAMBAHKAN:                                        │
│  - nik (NIK 16 digit)                                           │
│  - no_hp, no_wa                                                 │
│  - alamat, provinsi_id, kabupaten_id, kecamatan_id, etc.        │
│  - tier_id (foreign key ke tabel tiers)                         │
│  - status_keanggotaan (pending/aktif/nonaktif/ditolak)          │
│  - foto_ktp, foto_kebun, bukti_pembayaran                       │
│  - tanggal_daftar, tanggal_aktif, tanggal_expired               │
│                                                                 │
│  SETELAH BUAT FILE:                                             │
│  php artisan migrate                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Part 8: Migration - Tabel Tier, Pendaftaran, dll

```
┌─────────────────────────────────────────────────────────────────┐
│ PART 8: MIGRATION TABEL LAINNYA                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TABEL YANG DIBUAT:                                             │
│                                                                 │
│  1. tiers (Kategori keanggotaan)                                │
│     - id, nama_tier, kode_tier, level                           │
│     - harga_normal, harga_early_bird, harga_promo               │
│     - kuota, terisi, warna                                      │
│                                                                 │
│  2. pendaftaran (Data pendaftaran)                              │
│     - id, no_pendaftaran, user_id, tier_id                      │
│     - data lengkap pemohon                                      │
│     - status, verified_by, verified_at                          │
│                                                                 │
│  3. jabatan (Posisi organisasi)                                 │
│     - id, nama_jabatan, level, kuota, terisi                    │
│                                                                 │
│  4. struktur_organisasi (Penugasan)                             │
│     - id, user_id, jabatan_id, wilayah_id, status               │
│                                                                 │
│  5. notifications                                                │
│  6. pembayaran                                                   │
│  7. komisi                                                       │
│  8. settings                                                     │
│  9. audit_logs                                                   │
│                                                                 │
│  COMMAND:                                                       │
│  php artisan make:migration create_tiers_table                  │
│  php artisan make:migration create_pendaftaran_table            │
│  ... dst                                                        │
│  php artisan migrate                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Part 9: Model

```
┌─────────────────────────────────────────────────────────────────┐
│ PART 9: MODEL                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MODEL YANG DIBUAT:                                             │
│                                                                 │
│  1. User.php (Update)                                           │
│     - Relasi ke Tier, Pendaftaran, Struktur                     │
│     - Scope untuk filter                                        │
│     - Method generateNoAnggota(), generateKodeUnik()            │
│                                                                 │
│  2. Tier.php                                                    │
│     - Relasi ke Users                                           │
│     - Method isFull(), sisaKuota()                              │
│                                                                 │
│  3. Pendaftaran.php                                             │
│     - Relasi ke User, Tier                                      │
│     - Method generateNoPendaftaran()                            │
│                                                                 │
│  4. Jabatan.php                                                 │
│  5. StrukturOrganisasi.php                                      │
│  6. Pembayaran.php                                              │
│  7. Notification.php                                            │
│  8. Setting.php                                                 │
│                                                                 │
│  COMMAND:                                                       │
│  php artisan make:model Tier                                    │
│  php artisan make:model Pendaftaran                             │
│  ... dst                                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Part 10: Seeder

```
┌─────────────────────────────────────────────────────────────────┐
│ PART 10: SEEDER                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SEEDER YANG DIBUAT:                                            │
│                                                                 │
│  1. DatabaseSeeder.php                                          │
│     - Seed Roles (superadmin, admin, member)                    │
│     - Seed Tiers (7 tier)                                       │
│     - Seed Jabatan                                              │
│     - Seed Super Admin user                                     │
│                                                                 │
│  DATA DEFAULT:                                                  │
│                                                                 │
│  TIERS:                                                         │
│  - Tier 1: PETANI (Gratis)                                      │
│  - Tier 2: ANGGOTA BIASA (Rp 50.000)                            │
│  - Tier 3: KORDES (Rp 500.000)                                  │
│  - Tier 4: KORCAM (Rp 2 Juta)                                   │
│  - Tier 5: KORDA (Rp 3 Juta)                                    │
│  - Tier 6: KORWIL (Rp 20 Juta)                                  │
│  - Tier 7: KORNAS (Rp 200 Juta)                                 │
│                                                                 │
│  SUPER ADMIN:                                                   │
│  - Email: admin@kopnusa.id                                      │
│  - Password: password123                                        │
│                                                                 │
│  COMMAND:                                                       │
│  php artisan db:seed                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📖 CHECKLIST AKHIR PART 1-10

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKLIST AKHIR PHASE 1 (PART 1-10)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TOOLS:                                                         │
│  □ XAMPP terinstall dan running                                 │
│  □ VS Code terinstall dengan extensions                         │
│  □ Composer terinstall                                          │
│                                                                 │
│  PROJECT:                                                       │
│  □ Project Laravel knmp-api dibuat                              │
│  □ Laravel berjalan di localhost:8000                           │
│  □ File .env sudah dikonfigurasi                                │
│                                                                 │
│  DATABASE:                                                      │
│  □ Database knmp_database dibuat                                │
│  □ Semua migration berjalan sukses                              │
│  □ Semua tabel terbuat                                          │
│                                                                 │
│  MODEL:                                                         │
│  □ Semua model dibuat                                           │
│  □ Relasi antar model benar                                     │
│                                                                 │
│  SEEDER:                                                        │
│  □ Data awal tersimpan (tiers, roles, admin)                    │
│  □ Bisa login dengan admin@kopnusa.id                           │
│                                                                 │
│  JIKA SEMUA TERISI, LANJUT KE PHASE 2 (PART 11-20)!             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**TUTORIAL AKAN DILANJUTKAN DENGAN PART 11-30 DI FILE BERIKUTNYA**

---

*Master Tutorial Laravel KNMP - 30 Part*
*Dibuat dengan ❤️ oleh PT Digital Bisnis Manajemen DIGIMAN*
*Master Polymath - The Ultimate Problem Solver*
