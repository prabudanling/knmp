# 📚 TUTORIAL LENGKAP BACKEND LARAVEL KNMP
## Dari Nol Sampai Jadi - Untuk Newbie Tanpa SSH Access

---

# 🎯 PART 1: ENVIRONMENT SETUP & CPANEL CONFIGURATION

> **Target Audience**: Newbie yang hanya pengalaman WordPress  
> **Environment**: cPanel hosting (tanpa SSH)  
> **Framework**: Laravel 11  
> **Database**: MySQL

---

## 📋 DAFTAR ISI PART 1

1. [Persiapan Awal](#1-persiapan-awal)
2. [Persiapan Komputer Lokal](#2-persiapan-komputer-lokal)
3. [Instalasi XAMPP di Komputer Lokal](#3-instalasi-xampp-di-komputer-lokal)
4. [Instalasi Composer](#4-instalasi-composer)
5. [Instalasi Node.js](#5-instalasi-nodejs)
6. [Membuat Project Laravel Pertama](#6-membuat-project-laravel-pertama)
7. [Konfigurasi cPanel Hosting](#7-konfigurasi-cpanel-hosting)
8. [Upload Project ke cPanel](#8-upload-project-ke-cpanel)
9. [Konfigurasi Database di cPanel](#9-konfigurasi-database-di-cpanel)
10. [Finalisasi dan Testing](#10-finalisasi-dan-testing)

---

## 1. PERSIAPAN AWAL

### 1.1 Apa yang Anda Butuhkan?

Sebelum memulai, pastikan Anda memiliki:

| Item | Keterangan | Contoh |
|------|------------|--------|
| Domain | Nama website Anda | `knmp.org` atau `knmp.co.id` |
| Hosting cPanel | Dengan support PHP 8.2+ | Niagahoster, Hostinger, Rumahweb |
| Email Aktif | Untuk verifikasi | email@domain.com |
| Komputer/Laptop | Windows/Mac/Linux | Minimal RAM 4GB |
| Koneksi Internet | Stabil | Minimal 10 Mbps |

### 1.2 Spesifikasi Minimum cPanel

Login ke cPanel Anda dan pastikan spesifikasi berikut tersedia:

```
✅ PHP Version: 8.2 atau lebih tinggi
✅ MySQL Version: 5.7 atau 8.0
✅ Storage: Minimal 1GB
✅ Bandwidth: Unlimited (disarankan)
✅ SSL Certificate: Aktif (Let's Encrypt gratis)
✅ Subdomain: Bisa membuat subdomain
```

### 1.3 Cara Cek Spesifikasi cPanel

1. Login ke cPanel (biasanya: `https://domainanda.com/cpanel` atau `https://domainanda.com:2083`)
2. Cari bagian **"Software"**
3. Klik **"Select PHP Version"**
4. Pastikan PHP version adalah **8.2** atau lebih tinggi

```
┌─────────────────────────────────────┐
│  Select PHP Version                 │
├─────────────────────────────────────┤
│  Current PHP version: 8.2.12       │
│                                     │
│  PHP extensions:                    │
│  ☑ bcmath      ☑ ctype             │
│  ☑ fileinfo    ☑ json              │
│  ☑ mbstring    ☑ openssl           │
│  ☑ pdo         ☑ pdo_mysql         │
│  ☑ tokenizer   ☑ xml               │
│                                     │
│  [Save] [Cancel]                    │
└─────────────────────────────────────┘
```

**PENTING**: Pastikan extensions berikut DI-CENTANG (aktif):
- `bcmath`
- `ctype`
- `fileinfo`
- `json`
- `mbstring`
- `openssl`
- `pdo`
- `pdo_mysql`
- `tokenizer`
- `xml`
- `curl`
- `gd`
- `zip`
- `intl`

---

## 2. PERSIAPAN KOMPUTER LOKAL

### 2.1 Software yang Harus Diinstall

Kita akan bekerja di komputer lokal dulu, baru upload ke cPanel. Install software berikut:

#### A. XAMPP (Web Server + PHP + MySQL)

**Untuk Windows:**

1. Buka browser, akses: `https://www.apachefriends.org/download.html`
2. Download XAMPP dengan PHP 8.2+
3. Jalankan file installer yang sudah didownload
4. Ikuti langkah instalasi:

```
┌─────────────────────────────────────────────────┐
│  XAMPP Setup Wizard                             │
├─────────────────────────────────────────────────┤
│                                                 │
│  Select Components:                             │
│                                                 │
│  ☑ Apache           ☑ MySQL                    │
│  ☑ PHP              ☑ phpMyAdmin               │
│  ☐ FileZilla FTP    ☐ Mercury Mail             │
│  ☐ Tomcat           ☐ Perl                     │
│                                                 │
│  Installation folder:                           │
│  C:\xampp                                       │
│                                                 │
│  [Next >]  [Cancel]                             │
└─────────────────────────────────────────────────┘
```

**PENTING**: 
- Install di `C:\xampp` (JANGAN di Program Files)
- Centang HANYA: Apache, MySQL, PHP, phpMyAdmin

5. Setelah instalasi selesai, jalankan XAMPP Control Panel

```
┌─────────────────────────────────────────────────┐
│  XAMPP Control Panel v3.3.0                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Module      Status      Action                 │
│  ───────────────────────────────────────────    │
│  Apache      Running     [Stop] [Admin]         │
│  MySQL       Running     [Stop] [Admin]         │
│  FileZilla   Stopped     [Start]                │
│  Mercury     Stopped     [Start]                │
│  Tomcat      Stopped     [Start]                │
│                                                 │
│  [Quit]                                         │
└─────────────────────────────────────────────────┘
```

6. Klik **Start** pada Apache dan MySQL
7. Test dengan buka browser: `http://localhost`

**Untuk Mac:**

1. Download XAMPP for Mac dari: `https://www.apachefriends.org/download.html`
2. Buka file DMG yang didownload
3. Drag XAMPP ke Applications folder
4. Buka Applications > XAMPP > Manager OS X
5. Start Apache dan MySQL

### 2.2 Verifikasi XAMPP Berhasil

1. Buka browser
2. Ketik: `http://localhost`
3. Jika muncul halaman XAMPP, berarti **BERHASIL** ✅

---

## 3. INSTALASI COMPOSER

### 3.1 Apa itu Composer?

**Composer** adalah "package manager" untuk PHP. Seperti npm untuk Node.js atau pip untuk Python. Composer akan membantu kita menginstall Laravel dan library lainnya.

### 3.2 Instalasi Composer di Windows

1. Buka browser, akses: `https://getcomposer.org/download/`
2. Download **Composer-Setup.exe**
3. Jalankan installer

```
┌─────────────────────────────────────────────────┐
│  Composer Setup                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Choose the PHP executable:                     │
│                                                 │
│  [C:\xampp\php\php.exe          ] [Browse]      │
│                                                 │
│  ☑ Install for all users (recommended)          │
│                                                 │
│  [Next >]  [Cancel]                             │
└─────────────────────────────────────────────────┘
```

4. Pilih PHP executable: `C:\xampp\php\php.exe`
5. Klik Next sampai selesai
6. Buka **Command Prompt** (Win + R, ketik `cmd`)

### 3.3 Verifikasi Composer Terinstall

Di Command Prompt, ketik:

```bash
composer --version
```

Jika muncul:

```
Composer version 2.7.0 2024-01-01 12:00:00
```

Maka **BERHASIL** ✅

### 3.4 Instalasi Composer di Mac

1. Buka Terminal
2. Ketik perintah berikut satu per satu:

```bash
# Download installer
curl -sS https://getcomposer.org/installer | php

# Pindahkan ke folder global
sudo mv composer.phar /usr/local/bin/composer

# Beri permission
sudo chmod +x /usr/local/bin/composer
```

3. Verifikasi:

```bash
composer --version
```

---

## 4. INSTALASI NODE.JS

### 4.1 Apa itu Node.js?

**Node.js** diperlukan untuk meng-compile asset frontend (CSS, JavaScript) di Laravel menggunakan Vite.

### 4.2 Instalasi Node.js di Windows

1. Buka browser, akses: `https://nodejs.org/`
2. Download **LTS version** (Long Term Support)
3. Jalankan installer

```
┌─────────────────────────────────────────────────┐
│  Node.js Setup                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Destination folder:                            │
│  C:\Program Files\nodejs                        │
│                                                 │
│  Custom Setup:                                  │
│  ☑ Node.js runtime                             │
│  ☑ npm package manager                         │
│  ☑ Online documentation shortcuts              │
│  ☑ Add to PATH                                 │
│                                                 │
│  [Next >]  [Cancel]                             │
└─────────────────────────────────────────────────┘
```

4. Klik Next sampai selesai (gunakan setting default)
5. Restart Command Prompt
6. Verifikasi:

```bash
node --version
npm --version
```

Output yang diharapkan:

```
v20.11.0
10.2.4
```

---

## 5. MEMBUAT PROJECT LARAVEL PERTAMA

### 5.1 Persiapan Folder

1. Buka Command Prompt
2. Navigate ke folder XAMPP:

```bash
# Windows
cd C:\xampp\htdocs

# Mac
cd /Applications/XAMPP/htdocs
```

### 5.2 Membuat Project Laravel

```bash
composer create-project laravel/laravel knmp-backend
```

Proses ini akan memakan waktu 5-15 menit tergantung kecepatan internet.

```
Installing laravel/laravel (v11.0.0)
  - Installing laravel/laravel (v11.0.0): Extracting archive
...
Created project in C:\xampp\htdocs\knmp-backend
> @php -r "file_exists('.env') || copy('.env.example', '.env');"
...
Application key set successfully.
```

### 5.3 Verifikasi Project Laravel

1. Navigate ke folder project:

```bash
cd knmp-backend
```

2. Jalankan server development:

```bash
php artisan serve
```

3. Buka browser: `http://localhost:8000`

Jika muncul halaman Laravel, **BERHASIL** ✅

---

## 6. STRUKTUR FOLDER LARAVEL

Penting untuk memahami struktur folder Laravel:

```
knmp-backend/
├── 📁 app/                    # Logic utama aplikasi
│   ├── 📁 Http/
│   │   ├── 📁 Controllers/    # Controller (logic request)
│   │   ├── 📁 Middleware/     # Filter request
│   │   └── 📁 Requests/       # Validasi input
│   ├── 📁 Models/             # Model (database)
│   └── 📁 Providers/          # Service providers
│
├── 📁 bootstrap/              # Startup files
│
├── 📁 config/                 # Konfigurasi aplikasi
│   ├── 📄 app.php            # Config utama
│   ├── 📄 database.php       # Config database
│   └── 📄 mail.php           # Config email
│
├── 📁 database/               # Database files
│   ├── 📁 migrations/         # Schema database
│   ├── 📁 seeders/            # Data awal
│   └── 📁 factories/          # Test data
│
├── 📁 public/                 # Public files (document root)
│   ├── 📄 index.php          # Entry point
│   └── 📄 .htaccess          # Apache config
│
├── 📁 resources/              # Views & frontend
│   ├── 📁 views/              # Blade templates
│   └── 📁 js/                 # JavaScript
│
├── 📁 routes/                 # Routing
│   ├── 📄 web.php            # Routes web
│   └── 📄 api.php            # Routes API
│
├── 📁 storage/                # Storage files
│   ├── 📁 app/               # User files
│   ├── 📁 framework/         # Cache
│   └── 📁 logs/              # Log files
│
├── 📁 tests/                  # Testing
│
├── 📄 .env                    # Environment config (PENTING!)
├── 📄 .env.example           # Template .env
├── 📄 artisan                 # CLI tool
├── 📄 composer.json           # PHP dependencies
├── 📄 package.json            # JS dependencies
└── 📄 vite.config.js          # Frontend build config
```

---

## 7. KONFIGURASI CPANEL HOSTING

### 7.1 Login ke cPanel

1. Buka browser
2. Akses cPanel Anda: `https://yourdomain.com/cpanel` atau `https://yourdomain.com:2083`
3. Masukkan username dan password

### 7.2 Persiapan Domain/Subdomain

#### Opsi A: Menggunakan Domain Utama

Jika ingin backend di domain utama: `knmp.org`

1. Buka **File Manager** di cPanel
2. Navigate ke `public_html`
3. Ini adalah folder utama domain

#### Opsi B: Menggunakan Subdomain (RECOMMENDED)

Jika ingin backend di subdomain: `api.knmp.org`

1. Di cPanel, cari **"Subdomains"**
2. Klik untuk membuka
3. Buat subdomain baru:

```
┌─────────────────────────────────────────────────┐
│  Create a Subdomain                             │
├─────────────────────────────────────────────────┤
│                                                 │
│  Subdomain: [api        ] .knmp.org            │
│                                                 │
│  Document Root: /public_html/api               │
│                                                 │
│  [Create]                                       │
└─────────────────────────────────────────────────┘
```

4. Klik **Create**
5. Subdomain akan terbuat dengan folder: `/public_html/api`

### 7.3 Persiapan SSL Certificate

1. Di cPanel, cari **"SSL/TLS Status"**
2. Klik untuk membuka
3. Pilih domain/subdomain Anda
4. Klik **"Run AutoSSL"**
5. Tunggu sampai status menjadi **"Certificate Active"**

---

## 8. UPLOAD PROJECT KE CPANEL

### 8.1 Persiapan File untuk Upload

Di komputer lokal, kita perlu menyiapkan file yang akan diupload:

#### Langkah 1: Install Dependencies untuk Production

```bash
# Di Command Prompt, dalam folder project
cd C:\xampp\htdocs\knmp-backend

# Install dependencies tanpa dev
composer install --optimize-autoloader --no-dev
```

#### Langkah 2: Build Assets untuk Production

```bash
# Install npm dependencies
npm install

# Build assets
npm run build
```

#### Langkah 3: Kompres File Project

Pilih file yang akan diupload. **YANG PERLU DIUPLOAD:**

```
✅ app/
✅ bootstrap/
✅ config/
✅ database/
✅ public/
✅ resources/
✅ routes/
✅ storage/
✅ vendor/
✅ .env (rename dari .env.production)
✅ artisan
✅ composer.json
✅ composer.lock
```

**YANG TIDAK PERLU DIUPLOAD:**

```
❌ node_modules/ (terlalu besar)
❌ tests/
❌ .git/
❌ .env.example
```

### 8.2 Upload ke cPanel

#### Langkah 1: Buka File Manager

1. Login ke cPanel
2. Cari **"File Manager"**
3. Klik untuk membuka

#### Langkah 2: Navigate ke Document Root

Jika menggunakan subdomain `api.knmp.org`:
1. Di sidebar kiri, klik `public_html`
2. Double-click folder `api`

#### Langkah 3: Upload File

1. Klik tombol **"Upload"** di toolbar atas
2. Klik **"Select File"** atau drag-drop file zip
3. Tunggu sampai upload 100%
4. Klik **"Go Back to..."** untuk kembali ke File Manager

#### Langkah 4: Extract File

1. Select file zip
2. Klik **"Extract"** di toolbar
3. Pilih destination
4. Klik **"Extract File(s)"**
5. Hapus file zip setelah selesai

### 8.3 Konfigurasi Document Root

**PENTING**: Laravel memerlukan document root mengarah ke folder `public/`

Buat file `.htaccess` di root project:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

---

## 9. KONFIGURASI DATABASE DI CPANEL

### 9.1 Membuat Database Baru

1. Di cPanel, cari **"MySQL Databases"**
2. Klik untuk membuka

#### Langkah 1: Create New Database

```
┌─────────────────────────────────────────────────┐
│  Create New Database                            │
├─────────────────────────────────────────────────┤
│                                                 │
│  New Database: knmp_db                          │
│                                                 │
│  [Create Database]                              │
└─────────────────────────────────────────────────┘
```

3. Masukkan nama database
4. Klik **"Create Database"**

#### Langkah 2: Create New User

```
┌─────────────────────────────────────────────────┐
│  Add New User                                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  Username: knmp_user                            │
│  Password: •••••••••                           │
│  Password (Again): •••••••••                   │
│                                                 │
│  [Create User]                                  │
└─────────────────────────────────────────────────┘
```

5. Buat username dan password yang kuat
6. Simpan username dan password ini!

#### Langkah 3: Add User to Database

7. Select user dan database
8. Klik **"Add"**
9. Centang **"ALL PRIVILEGES"**
10. Klik **"Make Changes"**

### 9.2 Update .env dengan Database Credentials

Edit file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knmp_db
DB_USERNAME=knmp_user
DB_PASSWORD=YourPassword123
```

---

## 10. FINALISASI DAN TESTING

### 10.1 Set Permissions

Di File Manager, ubah permission:

- `storage/` → 755 atau 775
- `storage/logs/` → 755
- `storage/framework/` → 755
- `bootstrap/cache/` → 755

### 10.2 Generate Application Key

Tambahkan di file `.env`:

```env
APP_KEY=base64:random32charactersstringhere=
```

Untuk generate random string:
`https://generate-random.org/encryption-key-generator`

### 10.3 Testing Aplikasi

Buka browser: `https://api.knmp.org`

Jika muncul halaman Laravel, **BERHASIL!** ✅

---

## ✅ CHECKLIST PART 1

- [ ] XAMPP terinstall dan berjalan
- [ ] Composer terinstall
- [ ] Node.js terinstall
- [ ] Project Laravel berhasil dibuat
- [ ] cPanel bisa diakses
- [ ] Subdomain dibuat
- [ ] SSL certificate aktif
- [ ] Project diupload
- [ ] Database dibuat
- [ ] .env dikonfigurasi
- [ ] Permission diset
- [ ] Aplikasi bisa diakses

---

## 📖 LANJUT KE PART 2

**PART 2: Database Design & Authentication** → `PART-2-DATABASE-AUTHENTICATION.md`

---

*Dokumentasi ini dibuat dengan ❤️ untuk KNMP*
