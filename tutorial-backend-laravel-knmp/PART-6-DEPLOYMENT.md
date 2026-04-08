# 📚 PART 6: DEPLOYMENT & FINAL SETUP

> **Tujuan**: Deploy ke cPanel dan finalisasi setup

---

## 📋 DAFTAR ISI PART 6

1. [Persiapan Deployment](#1-persiapan-deployment)
2. [Upload ke cPanel](#2-upload-ke-cpanel)
3. [Konfigurasi Production](#3-konfigurasi-production)
4. [Database Migration di Server](#4-database-migration-di-server)
5. [Cron Jobs](#5-cron-jobs)
6. [Monitoring & Logs](#6-monitoring--logs)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. PERSIAPAN DEPLOYMENT

### 1.1 Checklist Sebelum Deploy

- [ ] Semua fitur sudah di-test di lokal
- [ ] Database migration sudah siap
- [ ] Environment variables sudah dikumpulkan
- [ ] SSL sudah aktif di hosting
- [ ] Domain/subdomain sudah di-setup

### 1.2 Persiapan File Production

Buat file `.env.production`:

```env
# APP CONFIGURATION
APP_NAME=KNMP
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.knmp.org

# LOGGING
LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# DATABASE
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=knmp_db
DB_USERNAME=knmp_user
DB_PASSWORD=YOUR_DB_PASSWORD

# CACHE & SESSION
BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=file
SESSION_LIFETIME=120

# MAIL
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourmail.com
MAIL_PORT=465
MAIL_USERNAME=noreply@knmp.org
MAIL_PASSWORD=YOUR_MAIL_PASSWORD
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="noreply@knmp.org"
MAIL_FROM_NAME="${APP_NAME}"

# MIDTRANS
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_MERCHANT_ID=YOUR_MERCHANT_ID
MIDTRANS_CLIENT_KEY=YOUR_CLIENT_KEY
MIDTRANS_SERVER_KEY=YOUR_SERVER_KEY

# SANCTUM
SANCTUM_STATEFUL_DOMAINS=knmp.org,www.knmp.org
```

### 1.3 Build Assets

```bash
# Di komputer lokal
npm run build
```

### 1.4 Optimize Autoloader

```bash
composer install --optimize-autoloader --no-dev
```

---

## 2. UPLOAD KE CPANEL

### 2.1 Kompres File yang Diperlukan

Buat file ZIP dengan struktur:

```
knmp-backend-production.zip
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── vendor/
├── .env (dari .env.production)
├── artisan
├── composer.json
├── composer.lock
└── package.json
```

### 2.2 Upload via File Manager

1. Login ke cPanel
2. Buka **File Manager**
3. Navigate ke `public_html/api` (atau folder subdomain)
4. Upload file ZIP
5. Extract file

### 2.3 Set Permissions

Via File Manager, ubah permission:

| Folder/File | Permission |
|-------------|------------|
| storage/ | 755 atau 775 |
| storage/app/ | 755 |
| storage/framework/ | 755 |
| storage/logs/ | 755 |
| bootstrap/cache/ | 755 |
| public/ | 755 |
| artisan | 755 |

### 2.4 Setup .htaccess

Buat file `.htaccess` di root project:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Disable directory listing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Protect .env file
<Files .env>
    Order allow,deny
    Deny from all
</Files>
```

---

## 3. KONFIGURASI PRODUCTION

### 3.1 Update .env

Rename `.env.production` menjadi `.env` dan update nilai-nilai:

```bash
# Via File Manager, edit file .env
```

### 3.2 Generate APP_KEY (jika belum)

Jika belum ada APP_KEY, buat file PHP sementara:

Buat `generate-key.php` di folder public:

```php
<?php
echo 'APP_KEY=base64:' . base64_encode(random_bytes(32));
```

Akses: `https://api.knmp.org/generate-key.php`

Copy hasilnya ke `.env`, lalu hapus file `generate-key.php`.

### 3.3 Clear Cache

Buat file `clear-cache.php` di folder public:

```php
<?php
// Clear all cache
$commands = [
    'php artisan config:clear',
    'php artisan cache:clear',
    'php artisan route:clear',
    'php artisan view:clear',
];

foreach ($commands as $command) {
    echo exec($command) . "\n";
}

echo "Cache cleared!";
```

Akses: `https://api.knmp.org/clear-cache.php`

Lalu hapus file ini setelah selesai.

---

## 4. DATABASE MIGRATION DI SERVER

### 4.1 Via phpMyAdmin

Jika tidak bisa menjalankan migration via SSH:

**Option A: Export/Import Database**

1. Di lokal, jalankan `php artisan migrate --seed`
2. Export database via phpMyAdmin
3. Import ke database server via cPanel > phpMyAdmin

**Option B: Manual Migration via Script**

Buat file `migrate.php` di folder public:

```php
<?php
// Set max execution time
set_time_limit(300);

// Run migrations
$output = shell_exec('php artisan migrate --force 2>&1');
echo "<pre>$output</pre>";

// Run seeders
$output = shell_exec('php artisan db:seed --force 2>&1');
echo "<pre>$output</pre>";
```

Akses via browser, lalu hapus file ini.

---

## 5. CRON JOBS

### 5.1 Setup Laravel Scheduler

Di cPanel:

1. Cari **"Cron Jobs"**
2. Klik untuk membuka
3. Tambah cron job baru:

```
* * * * * cd /home/username/public_html/api && php artisan schedule:run >> /dev/null 2>&1
```

Ganti `username` dengan username cPanel Anda.

### 5.2 Queue Worker (Optional)

Jika menggunakan queue:

```
* * * * * cd /home/username/public_html/api && php artisan queue:work --stop-when-empty >> /dev/null 2>&1
```

---

## 6. MONITORING & LOGS

### 6.1 Check Logs

Logs tersimpan di `storage/logs/laravel.log`

Via File Manager:
1. Navigate ke `storage/logs/`
2. Download atau edit file `laravel.log`

### 6.2 Enable Error Reporting (Development Mode)

Untuk debugging sementara, ubah `.env`:

```env
APP_DEBUG=true
LOG_LEVEL=debug
```

**PENTING**: Setelah selesai debugging, kembalikan ke:

```env
APP_DEBUG=false
LOG_LEVEL=error
```

---

## 7. TROUBLESHOOTING

### 7.1 Error 500

**Penyebab umum:**
1. Permission folder salah
2. .env tidak ada atau salah
3. APP_KEY kosong
4. Database tidak terkoneksi

**Solusi:**
1. Cek permission: storage, bootstrap/cache
2. Cek file .env ada
3. Cek APP_KEY sudah diisi
4. Cek kredensial database

### 7.2 Error "Class not found"

```bash
composer dump-autoload
```

Atau jalankan via script PHP:

```php
<?php
shell_exec('composer dump-autoload');
```

### 7.3 Error "Storage link not working"

Buat file `storage-link.php`:

```php
<?php
$target = '/home/username/public_html/api/storage/app/public';
$link = '/home/username/public_html/api/public/storage';

if (!file_exists($link)) {
    symlink($target, $link);
    echo "Storage link created!";
} else {
    echo "Storage link already exists!";
}
```

### 7.4 CORS Error

Update `config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['https://knmp.org', 'https://www.knmp.org'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

Lalu clear cache:

```bash
php artisan config:clear
```

---

## 8. API DOCUMENTATION

### 8.1 Endpoint Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/positions` | GET | List semua posisi |
| `/api/v1/positions/{id}` | GET | Detail posisi |
| `/api/v1/positions/levels` | GET | List level |
| `/api/v1/positions/categories` | GET | List kategori |
| `/api/v1/positions/level/{level}` | GET | Posisi per level |
| `/api/v1/stats` | GET | Statistik |
| `/api/v1/auth/register` | POST | Registrasi user |
| `/api/v1/auth/login` | POST | Login |
| `/api/v1/auth/logout` | POST | Logout |
| `/api/v1/registrations` | GET | List pendaftaran |
| `/api/v1/registrations` | POST | Buat pendaftaran |
| `/api/v1/payments/create` | POST | Buat pembayaran |
| `/api/v1/webhooks/midtrans` | POST | Webhook Midtrans |

### 8.2 Connect Frontend ke Backend

Di Next.js, buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.knmp.org/api/v1
```

Buat API helper:

```typescript
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Positions
export const getPositions = (params?: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/positions${query ? `?${query}` : ''}`);
};

export const getPosition = (id: string) => fetchAPI(`/positions/${id}`);

export const getPositionsByLevel = (level: string) => 
  fetchAPI(`/positions/level/${level}`);

// Auth
export const login = (email: string, password: string) =>
  fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (data: any) =>
  fetchAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
```

---

## 9. FINAL CHECKLIST

### Pre-Launch

- [ ] Semua fitur berfungsi
- [ ] SSL aktif
- [ ] API dapat diakses
- [ ] Database terisi dengan data awal
- [ ] Admin dapat login
- [ ] Email dapat dikirim
- [ ] Payment gateway berfungsi
- [ ] Cron jobs aktif
- [ ] Logs dapat diakses

### Post-Launch

- [ ] Monitor error logs
- [ ] Test semua endpoint API
- [ ] Test integrasi dengan frontend
- [ ] Backup database
- [ ] Setup monitoring (optional)

---

## 🎉 SELAMAT!

Anda telah berhasil membuat backend KNMP yang lengkap dengan:

1. ✅ Struktur database untuk 5 level pimpinan
2. ✅ API untuk manajemen posisi
3. ✅ Sistem autentikasi
4. ✅ Admin panel
5. ✅ Sistem pendaftaran
6. ✅ Integrasi email
7. ✅ Integrasi payment gateway
8. ✅ Deployment ke cPanel

---

## 📞 SUPPORT

Jika mengalami kendala:

1. **Cek Logs**: `storage/logs/laravel.log`
2. **Cek dokumentasi Laravel**: `https://laravel.com/docs`
3. **Community**: Laravel Indonesia Telegram/Discord

---

*Dokumentasi ini dibuat dengan ❤️ untuk KNMP*
*Total Halaman: 100+ halaman*
*Author: AI Assistant | Version: 1.0.0*
