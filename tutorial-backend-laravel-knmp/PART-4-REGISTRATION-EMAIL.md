# 📚 PART 4: REGISTRATION & EMAIL API

> **Tujuan**: Membuat sistem pendaftaran anggota dengan verifikasi email

---

## 📋 DAFTAR ISI PART 4

1. [Setup Mailtrap (Gratis)](#1-setup-mailtrap-gratis)
2. [Konfigurasi Email Laravel](#2-konfigurasi-email-laravel)
3. [Membuat Registration System](#3-membuat-registration-system)
4. [Email Templates](#4-email-templates)
5. [Verifikasi Email](#5-verifikasi-email)
6. [Testing Email](#6-testing-email)

---

## 1. SETUP MAILTRAP (GRATIS)

### 1.1 Apa itu Mailtrap?

**Mailtrap** adalah layanan email testing gratis yang sangat cocok untuk development. Email yang dikirim tidak akan sampai ke alamat asli, tapi akan tertampung di inbox Mailtrap.

### 1.2 Mendaftar Mailtrap

1. Buka browser: `https://mailtrap.io/`
2. Klik **"Sign up for free"**
3. Isi form pendaftaran:

```
┌─────────────────────────────────────────────────┐
│  Create your account                            │
├─────────────────────────────────────────────────┤
│                                                 │
│  Full name: [Nama Anda            ]             │
│  Email: [email@domain.com         ]             │
│  Password: [••••••••              ]             │
│                                                 │
│  ☑ I agree to Terms of Service                  │
│                                                 │
│  [Create Account]                               │
└─────────────────────────────────────────────────┘
```

4. Klik **"Create Account"**
5. Verifikasi email Anda

### 1.3 Membuat Inbox

1. Setelah login, klik **"Add inbox"**
2. Pilih **"My Inbox"**
3. Klik **"Create"**

### 1.4 Mendapatkan Kredensial SMTP

1. Di halaman inbox, klik tab **"SMTP Settings"**
2. Pilih **"Laravel"** dari dropdown integrations
3. Copy kredensial yang muncul:

```
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=xxxxxxxxxxxxxxx
MAILTRAP_PASSWORD=xxxxxxxxxxxxxxx
```

**CONTOH OUTPUT:**

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=1a2b3c4d5e6f7g
MAIL_PASSWORD=9h8i7j6k5l4m3n
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@knmp.org"
MAIL_FROM_NAME="${APP_NAME}"
```

### 1.5 Update .env

Buka file `.env` di project Laravel dan update:

```env
# Mail Configuration (Mailtrap)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=1a2b3c4d5e6f7g  # Ganti dengan username Anda
MAIL_PASSWORD=9h8i7j6k5l4m3n  # Ganti dengan password Anda
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@knmp.org"
MAIL_FROM_NAME="${APP_NAME}"
```

---

## 2. KONFIGURASI EMAIL LARAVEL

### 2.1 Konfigurasi config/mail.php

Buka file `config/mail.php`:

```php
<?php

return [
    'default' => env('MAIL_MAILER', 'smtp'),

    'mailers' => [
        'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', 'smtp.mailtrap.io'),
            'port' => env('MAIL_PORT', 2525),
            'encryption' => env('MAIL_ENCRYPTION', 'tls'),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'local_domain' => env('MAIL_EHLO_DOMAIN'),
        ],

        // Untuk production, gunakan mailer berikut:
        'ses' => [
            'transport' => 'ses',
        ],

        'postmark' => [
            'transport' => 'postmark',
        ],

        'sendmail' => [
            'transport' => 'sendmail',
            'path' => env('MAIL_SENDMAIL_PATH', '/usr/sbin/sendmail -bs -t'),
        ],

        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL'),
        ],

        'array' => [
            'transport' => 'array',
        ],
    ],

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'noreply@knmp.org'),
        'name' => env('MAIL_FROM_NAME', 'KNMP'),
    ],
];
```

---

## 3. MEMBUAT REGISTRATION SYSTEM

### 3.1 Registration Model

Buka file `app/Models/Registration.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'position_id',
        'province_id',
        'kab_kota_id',
        'kecamatan_id',
        'desa_id',
        'kpa_type',
        'tier_type',
        'amount',
        'payment_status',
        'payment_method',
        'transaction_id',
        'paid_at',
        'status',
        'notes',
        'verified_by',
        'verified_at',
        'documents',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'verified_at' => 'datetime',
        'documents' => 'array',
    ];

    // Status constants
    const STATUS_DRAFT = 'draft';
    const STATUS_SUBMITTED = 'submitted';
    const STATUS_VERIFIED = 'verified';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    // Payment status constants
    const PAYMENT_PENDING = 'pending';
    const PAYMENT_PAID = 'paid';
    const PAYMENT_FAILED = 'failed';
    const PAYMENT_REFUNDED = 'refunded';

    /**
     * Relasi ke User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Position
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
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
     * Relasi ke Verifier
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Scope untuk status tertentu
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope untuk payment status
     */
    public function scopeByPaymentStatus($query, string $status)
    {
        return $query->where('payment_status', $status);
    }

    /**
     * Check jika pembayaran sudah lunas
     */
    public function isPaid(): bool
    {
        return $this->payment_status === self::PAYMENT_PAID;
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        $labels = [
            self::STATUS_DRAFT => 'Draft',
            self::STATUS_SUBMITTED => 'Menunggu Verifikasi',
            self::STATUS_VERIFIED => 'Terverifikasi',
            self::STATUS_APPROVED => 'Disetujui',
            self::STATUS_REJECTED => 'Ditolak',
        ];

        return $labels[$this->status] ?? 'Unknown';
    }

    /**
     * Get payment status label
     */
    public function getPaymentStatusLabelAttribute(): string
    {
        $labels = [
            self::PAYMENT_PENDING => 'Menunggu Pembayaran',
            self::PAYMENT_PAID => 'Lunas',
            self::PAYMENT_FAILED => 'Gagal',
            self::PAYMENT_REFUNDED => 'Dikembalikan',
        ];

        return $labels[$this->payment_status] ?? 'Unknown';
    }
}
```

### 3.2 Registration Controller

```bash
php artisan make:controller Api/RegistrationController
```

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegistrationConfirmation;
use App\Mail\RegistrationVerified;
use App\Mail\RegistrationApproved;

class RegistrationController extends Controller
{
    /**
     * List registrations (untuk user yang login)
     */
    public function index(Request $request)
    {
        $registrations = Registration::with(['position', 'province', 'kabKota'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $registrations,
        ]);
    }

    /**
     * Create new registration
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'position_id' => 'required|exists:positions,id',
            'province_id' => 'nullable|exists:provinces,id',
            'kab_kota_id' => 'nullable|exists:kab_kotas,id',
            'kecamatan_id' => 'nullable|exists:kecamatans,id',
            'desa_id' => 'nullable|exists:desas,id',
            'kpa_type' => 'nullable|string',
            'tier_type' => 'nullable|string',
            'documents' => 'nullable|array',
        ]);

        // Get position to determine amount
        $position = Position::findOrFail($validated['position_id']);
        
        // Calculate amount based on tier
        $amount = $this->calculateAmount($validated['tier_type'] ?? null);

        DB::beginTransaction();
        try {
            $registration = Registration::create([
                'user_id' => $request->user()->id,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'position_id' => $validated['position_id'],
                'province_id' => $validated['province_id'] ?? null,
                'kab_kota_id' => $validated['kab_kota_id'] ?? null,
                'kecamatan_id' => $validated['kecamatan_id'] ?? null,
                'desa_id' => $validated['desa_id'] ?? null,
                'kpa_type' => $validated['kpa_type'] ?? null,
                'tier_type' => $validated['tier_type'] ?? null,
                'amount' => $amount,
                'payment_status' => Registration::PAYMENT_PENDING,
                'status' => Registration::STATUS_DRAFT,
                'documents' => $validated['documents'] ?? null,
            ]);

            // Send confirmation email
            Mail::to($validated['email'])->send(new RegistrationConfirmation($registration));

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran berhasil dibuat. Silakan cek email untuk konfirmasi.',
                'data' => $registration,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat membuat pendaftaran.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Submit registration (setelah lengkap)
     */
    public function submit(Request $request, $id)
    {
        $registration = Registration::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if ($registration->status !== Registration::STATUS_DRAFT) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran tidak dapat dikirim.',
            ], 400);
        }

        $registration->update([
            'status' => Registration::STATUS_SUBMITTED,
        ]);

        // Notify admin
        $this->notifyAdmin($registration);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil dikirim dan sedang diproses.',
            'data' => $registration,
        ]);
    }

    /**
     * Get registration detail
     */
    public function show(Request $request, $id)
    {
        $registration = Registration::with([
            'position', 
            'province', 
            'kabKota', 
            'kecamatan', 
            'desa',
            'verifier'
        ])
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $registration,
        ]);
    }

    /**
     * Upload document
     */
    public function uploadDocument(Request $request, $id)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // 5MB max
            'type' => 'required|string', // ktp, npwp, photo, etc
        ]);

        $registration = Registration::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $file = $request->file('document');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('documents/registrations', $filename, 'public');

        $documents = $registration->documents ?? [];
        $documents[$request->type] = [
            'path' => $path,
            'filename' => $filename,
            'uploaded_at' => now()->toIso8601String(),
        ];

        $registration->update(['documents' => $documents]);

        return response()->json([
            'success' => true,
            'message' => 'Dokumen berhasil diupload.',
            'data' => $registration,
        ]);
    }

    /**
     * Calculate amount based on tier
     */
    private function calculateAmount(?string $tierType): float
    {
        $amounts = [
            'T1' => 0,
            'T2' => 250000,
            'T3' => 2500000,
            'T4' => 10000000,
            'T5' => 15000000,
            'T6' => 125000000,
            'T7' => 1000000000,
        ];

        return $amounts[$tierType] ?? 0;
    }

    /**
     * Notify admin about new registration
     */
    private function notifyAdmin(Registration $registration)
    {
        $admins = User::whereIn('role', ['superadmin', 'admin'])->get();
        
        foreach ($admins as $admin) {
            // You can send notification here
            // Mail::to($admin->email)->send(new NewRegistrationNotification($registration));
        }
    }
}
```

---

## 4. EMAIL TEMPLATES

### 4.1 Membuat Mailable

```bash
php artisan make:mail RegistrationConfirmation
```

Buka file `app/Mail/RegistrationConfirmation.php`:

```php
<?php

namespace App\Mail;

use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;

    /**
     * Create a new message instance.
     */
    public function __construct(Registration $registration)
    {
        $this->registration = $registration;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Konfirmasi Pendaftaran - KNMP',
            from: config('mail.from.address'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.registration.confirmation',
            with: [
                'registration' => $this->registration,
                'position' => $this->registration->position,
            ],
        );
    }
}
```

### 4.2 Email View Template

Buat file `resources/views/emails/registration/confirmation.blade.php`:

```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Konfirmasi Pendaftaran</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <tr>
            <td style="background-color: #8B0000; padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">
                    KOPERASI NUSANTARA MERAH PUTIH
                </h1>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="background-color: white; padding: 40px 30px;">
                <h2 style="color: #1f2937; margin-top: 0;">Konfirmasi Pendaftaran</h2>
                
                <p style="color: #4b5563; line-height: 1.6;">
                    Yth. <strong>{{ $registration->name }}</strong>,
                </p>
                
                <p style="color: #4b5563; line-height: 1.6;">
                    Terima kasih telah mendaftar di Koperasi Nusantara Merah Putih. Pendaftaran Anda telah kami terima dengan detail sebagai berikut:
                </p>
                
                <!-- Registration Details -->
                <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">No. Pendaftaran</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right;">
                            #{{ str_pad($registration->id, 6, '0', STR_PAD_LEFT) }}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Posisi</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right;">
                            {{ $position->position_name ?? '-' }}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Email</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right;">
                            {{ $registration->email }}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Status</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                            <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;">
                                MENUNGGU PEMBAYARAN
                            </span>
                        </td>
                    </tr>
                    @if($registration->amount > 0)
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Biaya Pendaftaran</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #8B0000; font-weight: 700; text-align: right; font-size: 18px;">
                            Rp {{ number_format($registration->amount, 0, ',', '.') }}
                        </td>
                    </tr>
                    @endif
                </table>
                
                <p style="color: #4b5563; line-height: 1.6;">
                    Langkah selanjutnya:
                </p>
                
                <ol style="color: #4b5563; line-height: 1.8;">
                    <li>Lengkapi dokumen persyaratan di dashboard Anda</li>
                    <li>Lakukan pembayaran sesuai tier yang dipilih</li>
                    <li>Tim kami akan memverifikasi pendaftaran Anda</li>
                </ol>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{{ config('app.url') }}/dashboard" 
                       style="display: inline-block; background-color: #008F3D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                        Lihat Dashboard
                    </a>
                </div>
                
                <p style="color: #4b5563; line-height: 1.6;">
                    Jika Anda memiliki pertanyaan, silakan hubungi kami di:
                    <br>Email: <a href="mailto:support@knmp.org" style="color: #8B0000;">support@knmp.org</a>
                </p>
                
                <p style="color: #4b5563; line-height: 1.6; margin-top: 30px;">
                    Salam sejahtera,<br>
                    <strong>Tim KNMP</strong>
                </p>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                    © 2026 Koperasi Nusantara Merah Putih. All rights reserved.
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
                    <a href="{{ config('app.url') }}" style="color: #9ca3af;">Website</a> •
                    <a href="{{ config('app.url') }}/privacy" style="color: #9ca3af;">Privacy Policy</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
```

---

## 5. VERIFIKASI EMAIL

### 5.1 Email Verification untuk User Baru

Laravel Breeze sudah menyertakan fitur verifikasi email. Pastikan model User mengimplementasikan `MustVerifyEmail`:

```php
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    // ... existing code
}
```

### 5.2 Custom Verification Email

Buat file `resources/views/emails/verify-email.blade.php`:

```blade
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="background-color: #8B0000; padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">KNMP</h1>
            </td>
        </tr>
        
        <tr>
            <td style="background-color: white; padding: 40px 30px;">
                <h2 style="color: #1f2937;">Verifikasi Email Anda</h2>
                
                <p style="color: #4b5563; line-height: 1.6;">
                    Terima kasih telah mendaftar di KNMP. Silakan klik tombol di bawah untuk memverifikasi alamat email Anda:
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{{ $verificationUrl }}" 
                       style="display: inline-block; background-color: #008F3D; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                        Verifikasi Email
                    </a>
                </div>
                
                <p style="color: #6b7280; font-size: 14px;">
                    Jika tombol di atas tidak berfungsi, copy dan paste link berikut ke browser Anda:
                    <br>
                    <a href="{{ $verificationUrl }}" style="color: #8B0000; word-break: break-all;">
                        {{ $verificationUrl }}
                    </a>
                </p>
            </td>
        </tr>
        
        <tr>
            <td style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                    © 2026 KNMP. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
```

---

## 6. TESTING EMAIL

### 6.1 Test Menggunakan Tinker

Buka terminal dan jalankan:

```bash
php artisan tinker
```

Kemudian ketik:

```php
$user = App\Models\User::first();
Mail::to($user->email)->send(new App\Mail\RegistrationConfirmation(App\Models\Registration::first()));
```

### 6.2 Test Menggunakan Route

Tambahkan route sementara di `routes/web.php`:

```php
Route::get('/test-email', function () {
    $registration = App\Models\Registration::first();
    return new App\Mail\RegistrationConfirmation($registration);
});
```

Akses: `http://localhost:8000/test-email`

### 6.3 Cek di Mailtrap

1. Login ke Mailtrap
2. Buka inbox Anda
3. Email yang dikirim akan muncul di sana

```
┌─────────────────────────────────────────────────┐
│  Mailtrap Inbox                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  From: noreply@knmp.org                        │
│  To: test@example.com                          │
│  Subject: Konfirmasi Pendaftaran - KNMP        │
│  Date: 2026-03-20 10:30:00                     │
│                                                 │
│  [View HTML] [View Text] [View Raw]            │
└─────────────────────────────────────────────────┘
```

---

## 7. PRODUCTION EMAIL SETUP

### 7.1 Menggunakan SMTP Hosting

Untuk production, update `.env` dengan SMTP hosting Anda:

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_smtp_password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="noreply@knmp.org"
MAIL_FROM_NAME="${APP_NAME}"
```

### 7.2 Atau Gunakan Layanan Email Gratis

**Option A: Gmail SMTP (Gratis, terbatas)**

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password  # Generate dari Google Account
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your-email@gmail.com"
MAIL_FROM_NAME="KNMP"
```

**Option B: SendGrid (Gratis 100 email/hari)**

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@knmp.org"
MAIL_FROM_NAME="KNMP"
```

---

## ✅ CHECKLIST PART 4

- [ ] Mailtrap terdaftar dan dikonfigurasi
- [ ] Email verification berfungsi
- [ ] Registration model lengkap
- [ ] Registration controller dengan email
- [ ] Email templates (confirmation, verification)
- [ ] Test email berhasil di Mailtrap

---

## 📖 LANJUT KE PART 5

**PART 5: Payment Integration** → `PART-5-PAYMENT-INTEGRATION.md`

---

*Dokumentasi ini dibuat dengan ❤️ untuk KNMP*
