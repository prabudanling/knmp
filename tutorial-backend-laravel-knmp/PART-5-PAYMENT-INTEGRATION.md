# 📚 PART 5: PAYMENT INTEGRATION (MIDTRANS / XENDIT)

> **Tujuan**: Integrasi payment gateway untuk pembayaran pendaftaran

---

## 📋 DAFTAR ISI PART 5

1. [Setup Midtrans](#1-setup-midtrans)
2. [Integrasi Midtrans di Laravel](#2-integrasi-midtrans-di-laravel)
3. [Setup Xendit (Alternatif)](#3-setup-xendit-alternatif)
4. [Webhook Handler](#4-webhook-handler)
5. [Testing Payment](#5-testing-payment)

---

## 1. SETUP MIDTRANS

### 1.1 Apa itu Midtrans?

**Midtrans** adalah payment gateway Indonesia yang mendukung berbagai metode pembayaran:
- Virtual Account (BCA, Mandiri, BNI, dll)
- E-Wallet (GoPay, OVO, Dana, ShopeePay)
- Credit Card
- Bank Transfer
- QRIS

### 1.2 Mendaftar Midtrans

1. Buka browser: `https://midtrans.com/`
2. Klik **"Daftar Gratis"**
3. Isi form pendaftaran:

```
┌─────────────────────────────────────────────────┐
│  Daftar Midtrans                                │
├─────────────────────────────────────────────────┤
│                                                 │
│  Email: [email@domain.com         ]             │
│  Password: [••••••••              ]             │
│  Nama Merchant: [KNMP              ]             │
│                                                 │
│  [Daftar Sekarang]                              │
└─────────────────────────────────────────────────┘
```

4. Verifikasi email Anda
5. Login ke dashboard Midtrans

### 1.3 Mendapatkan API Keys

1. Login ke dashboard Midtrans
2. Pilih environment: **Sandbox** (untuk development) atau **Production**
3. Klik **"Settings"** > **"Access Keys"**
4. Copy kredensial berikut:

```
Merchant ID: G123456789
Client Key: SB-Mid-client-xxxxxxxxxxxx
Server Key: SB-Mid-server-xxxxxxxxxxxx
```

**CONTOH (Sandbox):**

```
Merchant ID: G812345678
Client Key: SB-Mid-client-AbCdEfGhIjKlMnOp
Server Key: SB-Mid-server-QrStUvWxYz123456
```

### 1.4 Update .env

Tambahkan kredensial Midtrans ke `.env`:

```env
# Midtrans Configuration
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_MERCHANT_ID=G812345678
MIDTRANS_CLIENT_KEY=SB-Mid-client-AbCdEfGhIjKlMnOp
MIDTRANS_SERVER_KEY=SB-Mid-server-QrStUvWxYz123456
```

---

## 2. INTEGRASI MIDTRANS DI LARAVEL

### 2.1 Install Midtrans PHP SDK

```bash
composer require midtrans/midtrans-php
```

### 2.2 Konfigurasi Midtrans

Buat file `config/midtrans.php`:

```php
<?php

return [
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'merchant_id' => env('MIDTRANS_MERCHANT_ID'),
    'client_key' => env('MIDTRANS_CLIENT_KEY'),
    'server_key' => env('MIDTRANS_SERVER_KEY'),
];
```

### 2.3 Buat Midtrans Service

Buat file `app/Services/MidtransService.php`:

```php
<?php

namespace App\Services;

use Midtrans\Snap;
use Midtrans\Config;
use Midtrans\Notification;
use App\Models\Registration;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    public function __construct()
    {
        // Configure Midtrans
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    /**
     * Create Snap transaction
     */
    public function createTransaction(Registration $registration): array
    {
        $order_id = 'KNMP-' . $registration->id . '-' . time();
        
        $params = [
            'transaction_details' => [
                'order_id' => $order_id,
                'gross_amount' => (int) $registration->amount,
            ],
            'customer_details' => [
                'first_name' => $registration->name,
                'email' => $registration->email,
                'phone' => $registration->phone,
            ],
            'item_details' => [
                [
                    'id' => 'REG-' . $registration->id,
                    'price' => (int) $registration->amount,
                    'quantity' => 1,
                    'name' => 'Biaya Pendaftaran KNMP - ' . ($registration->tier_type ?? 'Member'),
                ],
            ],
            'callbacks' => [
                'finish' => config('app.url') . '/dashboard?payment=finish',
                'error' => config('app.url') . '/dashboard?payment=error',
                'pending' => config('app.url') . '/dashboard?payment=pending',
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            
            // Update registration with order_id
            $registration->update([
                'transaction_id' => $order_id,
            ]);

            return [
                'success' => true,
                'snap_token' => $snapToken,
                'order_id' => $order_id,
                'redirect_url' => "https://app.sandbox.midtrans.com/snap/v2/vtweb/{$snapToken}",
            ];
        } catch (\Exception $e) {
            Log::error('Midtrans Error: ' . $e->getMessage());
            
            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Handle notification from Midtrans
     */
    public function handleNotification(array $data): array
    {
        $notification = new Notification();
        
        $transaction_status = $notification->transaction_status;
        $payment_type = $notification->payment_type;
        $order_id = $notification->order_id;
        $fraud_status = $notification->fraud_status ?? null;
        $gross_amount = $notification->gross_amount;

        // Extract registration ID from order_id
        $orderParts = explode('-', $order_id);
        $registrationId = $orderParts[1] ?? null;

        if (!$registrationId) {
            return ['success' => false, 'message' => 'Invalid order ID'];
        }

        $registration = Registration::find($registrationId);

        if (!$registration) {
            return ['success' => false, 'message' => 'Registration not found'];
        }

        // Update payment status based on transaction status
        switch ($transaction_status) {
            case 'capture':
                if ($payment_type == 'credit_card') {
                    if ($fraud_status == 'challenge') {
                        $status = Registration::PAYMENT_PENDING;
                    } else {
                        $status = Registration::PAYMENT_PAID;
                    }
                }
                break;
            
            case 'settlement':
                $status = Registration::PAYMENT_PAID;
                break;
            
            case 'pending':
                $status = Registration::PAYMENT_PENDING;
                break;
            
            case 'deny':
            case 'cancel':
            case 'expire':
                $status = Registration::PAYMENT_FAILED;
                break;
            
            default:
                $status = Registration::PAYMENT_PENDING;
        }

        // Update registration
        $registration->update([
            'payment_status' => $status,
            'payment_method' => $payment_type,
            'paid_at' => $status === Registration::PAYMENT_PAID ? now() : null,
        ]);

        // If payment success, update user status
        if ($status === Registration::PAYMENT_PAID) {
            $this->handleSuccessfulPayment($registration);
        }

        return [
            'success' => true,
            'status' => $status,
            'registration_id' => $registrationId,
        ];
    }

    /**
     * Handle successful payment
     */
    private function handleSuccessfulPayment(Registration $registration): void
    {
        // Update registration status
        $registration->update([
            'status' => Registration::STATUS_VERIFIED,
            'verified_at' => now(),
        ]);

        // If there's a user, activate them
        if ($registration->user) {
            $registration->user->update([
                'status' => 'active',
            ]);
        }

        // Send notification email
        // Mail::to($registration->email)->send(new PaymentSuccess($registration));
    }

    /**
     * Get transaction status
     */
    public function getTransactionStatus(string $orderId): array
    {
        $url = config('midtrans.is_production')
            ? "https://api.midtrans.com/v2/{$orderId}/status"
            : "https://api.sandbox.midtrans.com/v2/{$orderId}/status";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Basic ' . base64_encode(config('midtrans.server_key') . ':'),
        ]);

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }
}
```

### 2.4 Payment Controller

Buat file `app/Http/Controllers/Api/PaymentController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Services\MidtransService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    /**
     * Create payment transaction
     */
    public function create(Request $request)
    {
        $request->validate([
            'registration_id' => 'required|exists:registrations,id',
        ]);

        $registration = Registration::where('id', $request->registration_id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        // Check if already paid
        if ($registration->isPaid()) {
            return response()->json([
                'success' => false,
                'message' => 'Pembayaran sudah dilakukan.',
            ], 400);
        }

        // Check if amount is 0
        if ($registration->amount <= 0) {
            // Direct approval for free registrations
            $registration->update([
                'payment_status' => Registration::PAYMENT_PAID,
                'status' => Registration::STATUS_VERIFIED,
                'paid_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran gratis berhasil.',
                'data' => $registration,
            ]);
        }

        $result = $this->midtrans->createTransaction($registration);

        if ($result['success']) {
            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil dibuat.',
                'data' => [
                    'snap_token' => $result['snap_token'],
                    'order_id' => $result['order_id'],
                    'redirect_url' => $result['redirect_url'],
                    'registration' => $registration,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => $result['message'],
        ], 500);
    }

    /**
     * Handle Midtrans webhook notification
     */
    public function webhook(Request $request)
    {
        // Verify signature
        $signature_key = hash('sha512', 
            $request->order_id . 
            $request->status_code . 
            $request->gross_amount . 
            config('midtrans.server_key')
        );

        if ($signature_key !== $request->signature_key) {
            return response()->json([
                'message' => 'Invalid signature',
            ], 401);
        }

        $result = $this->midtrans->handleNotification($request->all());

        return response()->json($result);
    }

    /**
     * Check payment status
     */
    public function status(Request $request, $orderId)
    {
        $status = $this->midtrans->getTransactionStatus($orderId);

        return response()->json([
            'success' => true,
            'data' => $status,
        ]);
    }
}
```

### 2.5 Add Routes

Tambahkan ke `routes/api.php`:

```php
// Payment Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/payments/create', [PaymentController::class, 'create']);
    Route::get('/payments/status/{orderId}', [PaymentController::class, 'status']);
});

// Midtrans Webhook (no auth required)
Route::post('/webhooks/midtrans', [PaymentController::class, 'webhook']);
```

### 2.6 Frontend Integration

Untuk integrasi di frontend, tambahkan script Midtrans:

```html
<script src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key="{{ config('midtrans.client_key') }}"></script>
```

Atau di React/Vue:

```javascript
// Komponen Payment
import { useEffect } from 'react';

export default function PaymentButton({ snapToken }) {
    useEffect(() => {
        // Load Midtrans Snap script
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', 'YOUR_CLIENT_KEY');
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        // @ts-ignore
        window.snap.pay(snapToken, {
            onSuccess: function(result) {
                console.log('Payment success', result);
                // Redirect to success page
            },
            onPending: function(result) {
                console.log('Payment pending', result);
            },
            onError: function(result) {
                console.log('Payment error', result);
            },
            onClose: function() {
                console.log('Customer closed the popup');
            }
        });
    };

    return (
        <button onClick={handlePayment} className="btn-primary">
            Bayar Sekarang
        </button>
    );
}
```

---

## 3. SETUP XENDIT (ALTERNATIF)

### 3.1 Apa itu Xendit?

**Xendit** adalah payment gateway alternatif yang juga populer di Indonesia. Mendukung:
- Virtual Account
- E-Wallet
- Retail Outlet (Alfamart, Indomaret)
- Credit Card
- QR Code

### 3.2 Mendaftar Xendit

1. Buka: `https://www.xendit.co/`
2. Klik **"Start for Free"**
3. Isi form dan verifikasi email

### 3.3 Mendapatkan API Keys

1. Login ke dashboard Xendit
2. Klik **"Settings"** > **"API Keys"**
3. Generate API Key baru:

```
Secret Key: xnd_development_abcdefghijklmnopqrstuvwxyz
Public Key: xnd_public_development_abcdefghijklmnopqrstuvwxyz
```

### 3.4 Install Xendit PHP SDK

```bash
composer require xendit/xendit-php
```

### 3.5 Konfigurasi Xendit

Tambahkan ke `.env`:

```env
# Xendit Configuration
XENDIT_SECRET_KEY=xnd_development_abcdefghijklmnopqrstuvwxyz
XENDIT_PUBLIC_KEY=xnd_public_development_abcdefghijklmnopqrstuvwxyz
XENDIT_CALLBACK_TOKEN=your_callback_token
```

### 3.6 Buat Xendit Service

Buat file `app/Services/XenditService.php`:

```php
<?php

namespace App\Services;

use Xendit\Xendit;
use Xendit\Invoice;
use App\Models\Registration;

class XenditService
{
    public function __construct()
    {
        Xendit::setApiKey(config('services.xendit.secret_key'));
    }

    /**
     * Create Invoice
     */
    public function createInvoice(Registration $registration): array
    {
        $external_id = 'KNMP-' . $registration->id . '-' . time();

        $params = [
            'external_id' => $external_id,
            'amount' => (int) $registration->amount,
            'payer_email' => $registration->email,
            'description' => 'Biaya Pendaftaran KNMP - ' . ($registration->tier_type ?? 'Member'),
            'invoice_duration' => 86400, // 24 hours
            'customer' => [
                'given_names' => $registration->name,
                'email' => $registration->email,
                'mobile_number' => $registration->phone,
            ],
            'success_redirect_url' => config('app.url') . '/dashboard?payment=success',
            'failure_redirect_url' => config('app.url') . '/dashboard?payment=failed',
        ];

        try {
            $invoice = Invoice::create($params);

            // Update registration with external_id
            $registration->update([
                'transaction_id' => $external_id,
            ]);

            return [
                'success' => true,
                'invoice_url' => $invoice['invoice_url'],
                'external_id' => $external_id,
                'invoice_id' => $invoice['id'],
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Handle Xendit callback
     */
    public function handleCallback(array $data): array
    {
        $external_id = $data['external_id'] ?? null;
        $status = $data['status'] ?? null;
        $payment_method = $data['payment_method'] ?? null;

        // Extract registration ID from external_id
        $parts = explode('-', $external_id);
        $registrationId = $parts[1] ?? null;

        if (!$registrationId) {
            return ['success' => false, 'message' => 'Invalid external ID'];
        }

        $registration = Registration::find($registrationId);

        if (!$registration) {
            return ['success' => false, 'message' => 'Registration not found'];
        }

        // Update payment status
        $paymentStatus = match ($status) {
            'PAID', 'SETTLED' => Registration::PAYMENT_PAID,
            'EXPIRED' => Registration::PAYMENT_FAILED,
            default => Registration::PAYMENT_PENDING,
        };

        $registration->update([
            'payment_status' => $paymentStatus,
            'payment_method' => $payment_method,
            'paid_at' => $paymentStatus === Registration::PAYMENT_PAID ? now() : null,
        ]);

        return [
            'success' => true,
            'status' => $paymentStatus,
        ];
    }
}
```

---

## 4. WEBHOOK HANDLER

### 4.1 Setup Webhook URL

Untuk menerima notifikasi dari payment gateway:

**Midtrans:**
1. Login ke dashboard Midtrans
2. Settings > Notification
3. Set Payment Notification URL: `https://api.knmp.org/api/v1/webhooks/midtrans`

**Xendit:**
1. Login ke dashboard Xendit
2. Settings > Callbacks
3. Add callback untuk Invoice paid: `https://api.knmp.org/api/v1/webhooks/xendit`

### 4.2 Pastikan URL Bisa Diakses

Webhook harus bisa diakses dari internet. Pastikan:

1. Server sudah online dengan SSL aktif
2. Endpoint webhook mengembalikan response yang benar
3. Signature/key diverifikasi untuk keamanan

---

## 5. TESTING PAYMENT

### 5.1 Test Midtrans Sandbox

Untuk testing di sandbox Midtrans:

1. **VA BCA**: Gunakan nomor VA yang di-generate, lalu simulasikan pembayaran di:
   `https://simulator.sandbox.midtrans.com/bca/va/index`

2. **GoPay**: Scan QR atau gunakan deeplink untuk testing

3. **Credit Card**:
   - Card Number: `4811111111111114`
   - CVV: `123`
   - Expiry: Any future date

### 5.2 Test dengan Postman

```
POST /api/v1/payments/create
Authorization: Bearer {your_token}

Body:
{
    "registration_id": 1
}
```

Response:

```json
{
    "success": true,
    "data": {
        "snap_token": "abc123...",
        "order_id": "KNMP-1-1710931200",
        "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/abc123..."
    }
}
```

---

## 6. PRODUCTION CHECKLIST

Sebelum go-live:

- [ ] Ganti ke Production environment di Midtrans/Xendit
- [ ] Update API keys dengan production keys
- [ ] Set `MIDTRANS_IS_PRODUCTION=true` di `.env`
- [ ] Update webhook URLs dengan production URLs
- [ ] Test dengan nominal kecil dulu
- [ ] Monitor log untuk error

---

## ✅ CHECKLIST PART 5

- [ ] Midtrans/Xendit terdaftar
- [ ] API keys dikonfigurasi
- [ ] Payment service dibuat
- [ ] Webhook handler berfungsi
- [ ] Test payment berhasil

---

## 📖 LANJUT KE PART 6

**PART 6: Deployment & Final Setup** → `PART-6-DEPLOYMENT.md`

---

*Dokumentasi ini dibuat dengan ❤️ untuk KNMP*
