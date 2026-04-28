# 🚀 TUTORIAL LENGKAP BACKEND LARAVEL KNMP
## Sistem Pendaftaran Pengurus 7 Tier - Part 2: Models & Controllers

---

## 📋 DAFTAR ISI PART 2

1. [Model Laravel](#1-model-laravel)
2. [Controller API](#2-controller-api)
3. [Request Validation](#3-request-validation)
4. [API Routes](#4-api-routes)
5. [Services (Midtrans, Xendit, Mail)](#5-services)

---

## 1. MODEL LARAVEL

### 📄 Model Province

```php
<?php
// app/Models/Province.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $fillable = [
        'code',
        'name',
    ];

    // Relasi
    public function regencies(): HasMany
    {
        return $this->hasMany(Regency::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }

    // Scope
    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', "%{$search}%")
                     ->orWhere('code', 'like', "%{$search}%");
    }
}
```

### 📄 Model Regency

```php
<?php
// app/Models/Regency.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Regency extends Model
{
    protected $fillable = [
        'province_id',
        'code',
        'name',
    ];

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function districts(): HasMany
    {
        return $this->hasMany(District::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }
}
```

### 📄 Model District

```php
<?php
// app/Models/District.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    protected $fillable = [
        'regency_id',
        'code',
        'name',
    ];

    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class);
    }

    public function villages(): HasMany
    {
        return $this->hasMany(Village::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }
}
```

### 📄 Model Village

```php
<?php
// app/Models/Village.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Village extends Model
{
    protected $fillable = [
        'district_id',
        'code',
        'name',
    ];

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }
}
```

### 📄 Model Tier

```php
<?php
// app/Models/Tier.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tier extends Model
{
    protected $fillable = [
        'name',
        'level',
        'price',
        'description',
        'benefits',
        'is_active',
        'requires_location',
    ];

    protected $casts = [
        'benefits' => 'array',
        'is_active' => 'boolean',
        'requires_location' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    // Scope
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForRegistration($query)
    {
        return $query->active()->whereIn('level', [2, 3, 4, 5, 6, 7]);
    }
}
```

### 📄 Model User (Update)

```php
<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relasi
    public function member(): HasOne
    {
        return $this->hasOne(Member::class);
    }

    public function mitra(): HasOne
    {
        return $this->hasOne(Mitra::class);
    }

    public function admin(): HasOne
    {
        return $this->hasOne(Admin::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(Log::class);
    }

    // Helper Methods
    public function isAdmin(): bool
    {
        return in_array($this->role, ['admin', 'superadmin']);
    }

    public function isMember(): bool
    {
        return $this->role === 'member';
    }

    public function isMitra(): bool
    {
        return $this->role === 'mitra';
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}
```

### 📄 Model Member

```php
<?php
// app/Models/Member.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Member extends Model
{
    protected $fillable = [
        'user_id',
        'tier_id',
        'nik',
        'name',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'pekerjaan',
        'photo',
        'ktp_photo',
        'province_id',
        'regency_id',
        'district_id',
        'village_id',
        'position',
        'position_code',
        'status',
        'join_date',
        'term_end',
        'approved_by',
        'approved_at',
        'rejection_reason',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'join_date' => 'datetime',
        'term_end' => 'datetime',
        'approved_at' => 'datetime',
    ];

    // Relasi
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tier(): BelongsTo
    {
        return $this->belongsTo(Tier::class);
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }

    // Scope
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeByTier($query, $tierId)
    {
        return $query->where('tier_id', $tierId);
    }

    // Helper
    public function getLocationName(): string
    {
        $location = [];
        if ($this->village) $location[] = $this->village->name;
        if ($this->district) $location[] = $this->district->name;
        if ($this->regency) $location[] = $this->regency->name;
        if ($this->province) $location[] = $this->province->name;
        return implode(', ', $location);
    }
}
```

### 📄 Model Mitra

```php
<?php
// app/Models/Mitra.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Mitra extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'business_type',
        'npwp',
        'siup',
        'nib',
        'address',
        'contact_person',
        'phone',
        'email',
        'website',
        'akta_perusahaan',
        'logo',
        'category',
        'investment_value',
        'status',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'investment_value' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    // Scope
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
```

### 📄 Model Position

```php
<?php
// app/Models/Position.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Position extends Model
{
    protected $fillable = [
        'tier_id',
        'position_name',
        'position_code',
        'province_id',
        'regency_id',
        'district_id',
        'village_id',
        'member_id',
        'status',
    ];

    // Relasi
    public function tier(): BelongsTo
    {
        return $this->belongsTo(Tier::class);
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    // Scope
    public function scopeVacant($query)
    {
        return $query->where('status', 'vacant');
    }

    public function scopeFilled($query)
    {
        return $query->where('status', 'filled');
    }

    public function scopeByTier($query, $tierId)
    {
        return $query->where('tier_id', $tierId);
    }

    public function scopeByProvince($query, $provinceId)
    {
        return $query->where('province_id', $provinceId);
    }

    // Helper
    public function getLocationName(): string
    {
        $location = [];
        if ($this->village) $location[] = $this->village->name;
        if ($this->district) $location[] = $this->district->name;
        if ($this->regency) $location[] = $this->regency->name;
        if ($this->province) $location[] = $this->province->name;
        return implode(', ', $location);
    }
}
```

### 📄 Model Payment

```php
<?php
// app/Models/Payment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Payment extends Model
{
    protected $fillable = [
        'payable_id',
        'payable_type',
        'amount',
        'payment_type',
        'payment_method',
        'transaction_id',
        'order_id',
        'payment_code',
        'gateway_response',
        'status',
        'paid_at',
        'expired_at',
        'verified_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'gateway_response' => 'array',
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
        'verified_at' => 'datetime',
    ];

    public function payable(): MorphTo
    {
        return $this->morphTo();
    }

    // Scope
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    public function scopeExpired($query)
    {
        return $query->where('status', 'expired')
                     ->where('expired_at', '<', now());
    }

    // Helper
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }
}
```

### 📄 Model Registration

```php
<?php
// app/Models/Registration.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    protected $fillable = [
        'user_id',
        'tier_id',
        'form_data',
        'status',
        'payment_id',
        'approved_by',
        'approved_at',
        'notes',
    ];

    protected $casts = [
        'form_data' => 'array',
        'approved_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tier(): BelongsTo
    {
        return $this->belongsTo(Tier::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Scope
    public function scopePending($query)
    {
        return $query->where('status', 'submitted')
                     ->orWhere('status', 'payment_pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    // Helper
    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isSubmitted(): bool
    {
        return $this->status === 'submitted';
    }

    public function isPaid(): bool
    {
        return in_array($this->status, ['paid', 'verified', 'approved']);
    }
}
```

---

## 2. CONTROLLER API

### 📄 AuthController

```php
<?php
// app/Http/Controllers/Api/AuthController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register new user
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => 'guest',
            'status' => 'pending',
        ]);

        // Send verification email
        // $user->sendEmailVerificationNotification();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil. Silakan cek email untuk verifikasi.',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], 201);
    }

    /**
     * Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        if ($user->status === 'banned') {
            return response()->json([
                'success' => false,
                'message' => 'Akun Anda diblokir. Hubungi admin.',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'user' => $user->load(['member', 'mitra']),
                'token' => $token,
            ]
        ]);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil'
        ]);
    }

    /**
     * Get current user
     */
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()->load(['member.tier', 'mitra'])
        ]);
    }

    /**
     * Update profile
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
        ]);

        $user = $request->user();
        $user->update($request->only(['name', 'phone']));

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => $user
        ]);
    }
}
```

### 📄 RegistrationController (PENTING!)

```php
<?php
// app/Http/Controllers/Api/RegistrationController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Member;
use App\Models\Mitra;
use App\Models\Position;
use App\Models\Tier;
use App\Models\Payment;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    /**
     * Get available tiers for registration
     */
    public function getTiers()
    {
        $tiers = Tier::forRegistration()
            ->orderBy('level')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tiers
        ]);
    }

    /**
     * Get available positions for tier
     */
    public function getAvailablePositions(Request $request)
    {
        $request->validate([
            'tier_id' => 'required|exists:tiers,id',
            'province_id' => 'sometimes|exists:provinces,id',
            'regency_id' => 'sometimes|exists:regencies,id',
            'district_id' => 'sometimes|exists:districts,id',
        ]);

        $query = Position::with(['province', 'regency', 'district', 'village'])
            ->where('tier_id', $request->tier_id)
            ->where('status', 'vacant');

        if ($request->province_id) {
            $query->where('province_id', $request->province_id);
        }
        if ($request->regency_id) {
            $query->where('regency_id', $request->regency_id);
        }
        if ($request->district_id) {
            $query->where('district_id', $request->district_id);
        }

        $positions = $query->get();

        return response()->json([
            'success' => true,
            'data' => $positions
        ]);
    }

    /**
     * Submit registration (Step 1 - Save data)
     */
    public function submit(Request $request)
    {
        $tier = Tier::findOrFail($request->tier_id);

        // Validasi berdasarkan tier
        if ($tier->level === 7) {
            // Mitra
            $validated = $request->validate([
                'tier_id' => 'required|exists:tiers,id',
                // Data User
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|string|max:20',
                'password' => 'required|string|min:8|confirmed',
                // Data Mitra
                'company_name' => 'required|string|max:150',
                'business_type' => 'required|string|max:100',
                'npwp' => 'nullable|string|max:20',
                'siup' => 'nullable|string|max:50',
                'nib' => 'nullable|string|max:20',
                'address' => 'required|string',
                'contact_person' => 'required|string|max:100',
                'website' => 'nullable|string|max:100',
                'investment_value' => 'required|numeric|min:500000',
            ]);
        } else {
            // Member (Tier 2-6)
            $rules = [
                'tier_id' => 'required|exists:tiers,id',
                // Data User
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required|string|max:20',
                'password' => 'required|string|min:8|confirmed',
                // Data Member
                'nik' => 'required|string|size:16|unique:members,nik',
                'tempat_lahir' => 'required|string|max:50',
                'tanggal_lahir' => 'required|date',
                'jenis_kelamin' => 'required|in:L,P',
                'alamat' => 'required|string',
                'pekerjaan' => 'nullable|string|max:50',
                // File
                'photo' => 'required|image|max:2048',
                'ktp_photo' => 'required|image|max:2048',
            ];

            // Validasi lokasi untuk Tier 2-5
            if ($tier->requires_location) {
                switch ($tier->level) {
                    case 2: // KORWIL
                        $rules['province_id'] = 'required|exists:provinces,id';
                        break;
                    case 3: // KORDA
                        $rules['province_id'] = 'required|exists:provinces,id';
                        $rules['regency_id'] = 'required|exists:regencies,id';
                        break;
                    case 4: // KORCAM
                        $rules['province_id'] = 'required|exists:provinces,id';
                        $rules['regency_id'] = 'required|exists:regencies,id';
                        $rules['district_id'] = 'required|exists:districts,id';
                        break;
                    case 5: // KORDES
                        $rules['province_id'] = 'required|exists:provinces,id';
                        $rules['regency_id'] = 'required|exists:regencies,id';
                        $rules['district_id'] = 'required|exists:districts,id';
                        $rules['village_id'] = 'required|exists:villages,id';
                        break;
                }
            }

            $validated = $request->validate($rules);
        }

        DB::beginTransaction();
        try {
            // Upload file
            $photoPath = null;
            $ktpPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('members/photo', 'public');
            }
            if ($request->hasFile('ktp_photo')) {
                $ktpPath = $request->file('ktp_photo')->store('members/ktp', 'public');
            }

            // Create user
            $user = \App\Models\User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => bcrypt($validated['password']),
                'role' => $tier->level === 7 ? 'mitra' : 'member',
                'status' => 'pending',
            ]);

            // Create registration record
            $registration = Registration::create([
                'user_id' => $user->id,
                'tier_id' => $tier->id,
                'form_data' => $validated,
                'status' => 'submitted',
            ]);

            // Create payment
            $payment = $this->createPayment($registration, $tier);

            // Generate payment via Midtrans
            $paymentResponse = $this->midtrans->createTransaction($payment);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran berhasil disimpan. Silakan lakukan pembayaran.',
                'data' => [
                    'registration' => $registration,
                    'payment' => $payment,
                    'payment_url' => $paymentResponse['payment_url'] ?? null,
                    'va_number' => $paymentResponse['va_number'] ?? null,
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create payment record
     */
    protected function createPayment($registration, $tier)
    {
        $orderId = 'KNMP-' . date('Ymd') . '-' . str_pad($registration->id, 6, '0', STR_PAD_LEFT);

        return Payment::create([
            'payable_type' => Registration::class,
            'payable_id' => $registration->id,
            'amount' => $tier->price,
            'payment_type' => 'registration',
            'order_id' => $orderId,
            'status' => 'pending',
            'expired_at' => now()->addHours(24),
        ]);
    }

    /**
     * Check registration status
     */
    public function checkStatus($id)
    {
        $registration = Registration::with(['tier', 'payment', 'user'])
            ->where('user_id', request()->user()->id)
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $registration
        ]);
    }

    /**
     * Get user's registrations
     */
    public function myRegistrations(Request $request)
    {
        $registrations = Registration::with(['tier', 'payment'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $registrations
        ]);
    }
}
```

### 📄 PaymentController

```php
<?php
// app/Http/Controllers/Api/PaymentController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Registration;
use App\Models\Member;
use App\Models\Mitra;
use App\Models\Position;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    /**
     * Midtrans Callback/Notification
     */
    public function midtransCallback(Request $request)
    {
        $notification = $request->all();

        // Verify signature
        $isValid = $this->midtrans->verifySignature($notification);

        if (!$isValid) {
            return response()->json(['message' => 'Invalid signature'], 400);
        }

        $orderId = $notification['order_id'];
        $transactionStatus = $notification['transaction_status'];
        $paymentType = $notification['payment_type'];

        $payment = Payment::where('order_id', $orderId)->first();

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        DB::beginTransaction();
        try {
            // Update payment status
            $payment->update([
                'transaction_id' => $notification['transaction_id'] ?? null,
                'payment_method' => $paymentType,
                'gateway_response' => $notification,
                'status' => $this->mapStatus($transactionStatus),
                'paid_at' => $transactionStatus === 'settlement' ? now() : null,
            ]);

            // If payment success, update registration
            if ($transactionStatus === 'settlement' || $transactionStatus === 'capture') {
                $this->processSuccessfulPayment($payment);
            }

            DB::commit();

            return response()->json(['message' => 'OK']);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Map Midtrans status to local status
     */
    protected function mapStatus($status)
    {
        return match($status) {
            'capture', 'settlement' => 'paid',
            'pending' => 'pending',
            'deny', 'cancel' => 'failed',
            'expire' => 'expired',
            default => 'pending'
        };
    }

    /**
     * Process successful payment
     */
    protected function processSuccessfulPayment($payment)
    {
        $registration = $payment->payable;

        if (!($registration instanceof Registration)) {
            return;
        }

        // Update registration status
        $registration->update(['status' => 'paid']);

        // Create member/mitra based on tier
        $tier = $registration->tier;
        $user = $registration->user;
        $formData = $registration->form_data;

        if ($tier->level === 7) {
            // Create Mitra
            Mitra::create([
                'user_id' => $user->id,
                'company_name' => $formData['company_name'],
                'business_type' => $formData['business_type'],
                'npwp' => $formData['npwp'] ?? null,
                'siup' => $formData['siup'] ?? null,
                'nib' => $formData['nib'] ?? null,
                'address' => $formData['address'],
                'contact_person' => $formData['contact_person'],
                'phone' => $formData['phone'],
                'email' => $formData['email'],
                'website' => $formData['website'] ?? null,
                'investment_value' => $formData['investment_value'],
                'category' => $this->determineMitraCategory($formData['investment_value']),
                'status' => 'pending', // Needs admin approval
            ]);

            $user->update(['role' => 'mitra']);

        } else {
            // Create Member
            $member = Member::create([
                'user_id' => $user->id,
                'tier_id' => $tier->id,
                'nik' => $formData['nik'],
                'name' => $formData['name'],
                'tempat_lahir' => $formData['tempat_lahir'],
                'tanggal_lahir' => $formData['tanggal_lahir'],
                'jenis_kelamin' => $formData['jenis_kelamin'],
                'alamat' => $formData['alamat'],
                'pekerjaan' => $formData['pekerjaan'] ?? null,
                'photo' => $formData['photo_path'] ?? null,
                'ktp_photo' => $formData['ktp_path'] ?? null,
                'province_id' => $formData['province_id'] ?? null,
                'regency_id' => $formData['regency_id'] ?? null,
                'district_id' => $formData['district_id'] ?? null,
                'village_id' => $formData['village_id'] ?? null,
                'status' => 'pending', // Needs admin approval
            ]);

            $user->update(['role' => 'member']);

            // If tier 2-5, assign to position
            if ($tier->requires_location && $tier->level >= 2 && $tier->level <= 5) {
                $this->assignToPosition($member, $tier);
            }

            // Update registration to verified
            $registration->update(['status' => 'verified']);
        }
    }

    /**
     * Determine mitra category based on investment
     */
    protected function determineMitraCategory($value)
    {
        if ($value >= 5000000) return 'platinum';
        if ($value >= 2500000) return 'gold';
        if ($value >= 1000000) return 'silver';
        return 'bronze';
    }

    /**
     * Assign member to position
     */
    protected function assignToPosition($member, $tier)
    {
        // Find vacant position
        $query = Position::where('tier_id', $tier->id)
            ->where('status', 'vacant');

        if ($member->province_id) {
            $query->where('province_id', $member->province_id);
        }
        if ($member->regency_id) {
            $query->where('regency_id', $member->regency_id);
        }
        if ($member->district_id) {
            $query->where('district_id', $member->district_id);
        }
        if ($member->village_id) {
            $query->where('village_id', $member->village_id);
        }

        $position = $query->first();

        if ($position) {
            $position->update([
                'member_id' => $member->id,
                'status' => 'pending', // Will be 'filled' after admin approval
            ]);

            $member->update([
                'position' => $position->position_name,
                'position_code' => $position->position_code,
            ]);
        }
    }
}
```

### 📄 AdminController

```php
<?php
// app/Http/Controllers/Api/AdminController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\Member;
use App\Models\Mitra;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Get pending registrations
     */
    public function pendingRegistrations(Request $request)
    {
        $query = Registration::with(['user', 'tier', 'payment'])
            ->whereIn('status', ['paid', 'verified']);

        // Filter by admin level
        $admin = $request->user()->admin;
        if ($admin && $admin->level !== 'superadmin') {
            // Non-superadmin can only see registrations in their area
            if ($admin->province_id) {
                $query->whereHas('member', function($q) use ($admin) {
                    $q->where('province_id', $admin->province_id);
                });
            }
        }

        $registrations = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $registrations
        ]);
    }

    /**
     * Approve registration
     */
    public function approveRegistration(Request $request, $id)
    {
        $registration = Registration::findOrFail($id);

        if (!in_array($registration->status, ['paid', 'verified'])) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran tidak dapat disetujui'
            ], 400);
        }

        DB::beginTransaction();
        try {
            // Update registration
            $registration->update([
                'status' => 'approved',
                'approved_by' => $request->user()->id,
                'approved_at' => now(),
            ]);

            // Approve member/mitra
            $tier = $registration->tier;
            $user = $registration->user;

            if ($tier->level === 7) {
                // Approve mitra
                $mitra = Mitra::where('user_id', $user->id)->first();
                if ($mitra) {
                    $mitra->update([
                        'status' => 'active',
                        'approved_by' => $request->user()->id,
                        'approved_at' => now(),
                    ]);
                }
            } else {
                // Approve member
                $member = Member::where('user_id', $user->id)->first();
                if ($member) {
                    $member->update([
                        'status' => 'active',
                        'approved_by' => $request->user()->id,
                        'approved_at' => now(),
                        'join_date' => now(),
                        'term_end' => now()->addYears(5),
                    ]);

                    // Update position status
                    if ($member->position_code) {
                        Position::where('member_id', $member->id)
                            ->update(['status' => 'filled']);
                    }
                }
            }

            // Update user status
            $user->update(['status' => 'active']);

            // TODO: Send approval email

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran berhasil disetujui'
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reject registration
     */
    public function rejectRegistration(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $registration = Registration::findOrFail($id);

        DB::beginTransaction();
        try {
            $registration->update([
                'status' => 'rejected',
                'approved_by' => $request->user()->id,
                'approved_at' => now(),
                'notes' => $request->reason,
            ]);

            $user = $registration->user;

            // Update member status
            if ($member = $user->member) {
                $member->update([
                    'status' => 'rejected',
                    'rejection_reason' => $request->reason,
                ]);
            }

            // Update mitra status
            if ($mitra = $user->mitra) {
                $mitra->update([
                    'status' => 'rejected',
                ]);
            }

            // Free up position
            Position::where('member_id', $user->member?->id)
                ->update(['status' => 'vacant', 'member_id' => null]);

            // TODO: Send rejection email

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran ditolak'
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all members
     */
    public function getMembers(Request $request)
    {
        $query = Member::with(['user', 'tier', 'province', 'regency', 'district', 'village']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by tier
        if ($request->has('tier_id')) {
            $query->where('tier_id', $request->tier_id);
        }

        // Filter by province
        if ($request->has('province_id')) {
            $query->where('province_id', $request->province_id);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        $members = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $members
        ]);
    }

    /**
     * Get statistics
     */
    public function getStatistics()
    {
        $stats = [
            'total_members' => Member::count(),
            'active_members' => Member::where('status', 'active')->count(),
            'pending_registrations' => Registration::whereIn('status', ['paid', 'verified'])->count(),
            'total_mitra' => Mitra::count(),
            'active_mitra' => Mitra::where('status', 'active')->count(),
            'by_tier' => Member::selectRaw('tier_id, count(*) as total')
                ->groupBy('tier_id')
                ->with('tier:id,name')
                ->get(),
            'by_province' => Member::selectRaw('province_id, count(*) as total')
                ->whereNotNull('province_id')
                ->groupBy('province_id')
                ->with('province:id,name')
                ->get(),
            'vacant_positions' => Position::where('status', 'vacant')->count(),
            'filled_positions' => Position::where('status', 'filled')->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
```

---

## 3. REQUEST VALIDATION

### 📄 Form Request Classes

```php
<?php
// app/Http/Requests/RegistrationRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $tierId = $this->input('tier_id');
        $tier = \App\Models\Tier::find($tierId);

        $rules = [
            'tier_id' => 'required|exists:tiers,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20|regex:/^08[0-9]{8,12}$/',
            'password' => 'required|string|min:8|confirmed',
        ];

        if ($tier && $tier->level === 7) {
            // Mitra validation
            $rules = array_merge($rules, [
                'company_name' => 'required|string|max:150',
                'business_type' => 'required|string|max:100',
                'npwp' => 'nullable|string|size:16',
                'siup' => 'nullable|string|max:50',
                'nib' => 'nullable|string|max:20',
                'address' => 'required|string|max:500',
                'contact_person' => 'required|string|max:100',
                'website' => 'nullable|url|max:100',
                'investment_value' => 'required|numeric|min:500000',
            ]);
        } else {
            // Member validation
            $rules = array_merge($rules, [
                'nik' => 'required|string|size:16|unique:members,nik',
                'tempat_lahir' => 'required|string|max:50',
                'tanggal_lahir' => 'required|date|before:today',
                'jenis_kelamin' => 'required|in:L,P',
                'alamat' => 'required|string|max:500',
                'pekerjaan' => 'nullable|string|max:50',
                'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'ktp_photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            // Location validation based on tier
            if ($tier && $tier->requires_location) {
                switch ($tier->level) {
                    case 2:
                        $rules['province_id'] = 'required|exists:provinces,id';
                        break;
                    case 3:
                        $rules['province_id'] = 'required|exists:provinces,id';
                        $rules['regency_id'] = 'required|exists:regencies,id';
                        break;
                    case 4:
                        $rules['province_id'] = 'required|exists:provinces,id';
                        $rules['regency_id'] = 'required|exists:regencies,id';
                        $rules['district_id'] = 'required|exists:districts,id';
                        break;
                    case 5:
                        $rules['province_id'] = 'required|exists:provinces,id';
                        $rules['regency_id'] = 'required|exists:regencies,id';
                        $rules['district_id'] = 'required|exists:districts,id';
                        $rules['village_id'] = 'required|exists:villages,id';
                        break;
                }
            }
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi',
            'email' => 'Format email tidak valid',
            'unique' => ':attribute sudah terdaftar',
            'min' => ':attribute minimal :min karakter',
            'max' => ':attribute maksimal :max karakter',
            'exists' => ':attribute tidak ditemukan',
            'image' => ':attribute harus berupa gambar',
            'mimes' => ':attribute harus berformat :values',
            'size' => ':attribute harus :size karakter',
            'regex' => 'Format :attribute tidak valid',
            'before' => ':attribute harus tanggal sebelum hari ini',
        ];
    }

    public function attributes(): array
    {
        return [
            'tier_id' => 'Tier/Package',
            'name' => 'Nama lengkap',
            'email' => 'Email',
            'phone' => 'Nomor HP',
            'password' => 'Password',
            'nik' => 'NIK',
            'tempat_lahir' => 'Tempat lahir',
            'tanggal_lahir' => 'Tanggal lahir',
            'jenis_kelamin' => 'Jenis kelamin',
            'alamat' => 'Alamat',
            'pekerjaan' => 'Pekerjaan',
            'photo' => 'Foto',
            'ktp_photo' => 'Foto KTP',
            'province_id' => 'Provinsi',
            'regency_id' => 'Kabupaten/Kota',
            'district_id' => 'Kecamatan',
            'village_id' => 'Desa',
            'company_name' => 'Nama perusahaan',
            'business_type' => 'Jenis usaha',
            'npwp' => 'NPWP',
            'siup' => 'SIUP',
            'nib' => 'NIB',
            'contact_person' => 'Contact person',
            'website' => 'Website',
            'investment_value' => 'Nilai investasi',
        ];
    }
}
```

---

## 4. API ROUTES

### 📄 routes/api.php

```php
<?php
// routes/api.php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\MemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Tiers (for registration)
Route::get('/tiers', [RegistrationController::class, 'getTiers']);

// Locations
Route::get('/provinces', [LocationController::class, 'provinces']);
Route::get('/regencies', [LocationController::class, 'regencies']);
Route::get('/districts', [LocationController::class, 'districts']);
Route::get('/villages', [LocationController::class, 'villages']);

// Available positions
Route::get('/positions/available', [RegistrationController::class, 'getAvailablePositions']);

// Payment callback (from Midtrans/Xendit)
Route::post('/payment/callback/midtrans', [PaymentController::class, 'midtransCallback']);
Route::post('/payment/callback/xendit', [PaymentController::class, 'xenditCallback']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // Registration
    Route::post('/registration/submit', [RegistrationController::class, 'submit']);
    Route::get('/registration/my', [RegistrationController::class, 'myRegistrations']);
    Route::get('/registration/{id}', [RegistrationController::class, 'checkStatus']);

    // Member profile
    Route::get('/member/profile', [MemberController::class, 'profile']);
    Route::put('/member/profile', [MemberController::class, 'updateProfile']);
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    
    // Dashboard
    Route::get('/statistics', [AdminController::class, 'getStatistics']);

    // Registrations
    Route::get('/registrations/pending', [AdminController::class, 'pendingRegistrations']);
    Route::post('/registrations/{id}/approve', [AdminController::class, 'approveRegistration']);
    Route::post('/registrations/{id}/reject', [AdminController::class, 'rejectRegistration']);

    // Members
    Route::get('/members', [AdminController::class, 'getMembers']);
    Route::get('/members/{id}', [AdminController::class, 'getMemberDetail']);
    Route::put('/members/{id}', [AdminController::class, 'updateMember']);
    Route::delete('/members/{id}', [AdminController::class, 'deleteMember']);

    // Mitra
    Route::get('/mitra', [AdminController::class, 'getMitra']);
    Route::get('/mitra/{id}', [AdminController::class, 'getMitraDetail']);

    // Positions
    Route::get('/positions', [AdminController::class, 'getPositions']);
    Route::post('/positions/generate', [AdminController::class, 'generatePositions']);
});
```

---

## 5. SERVICES

### 📄 MidtransService

```php
<?php
// app/Services/MidtransService.php

namespace App\Services;

use App\Models\Payment;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    protected $serverKey;
    protected $clientKey;
    protected $isProduction;
    protected $baseUrl;

    public function __construct()
    {
        $this->serverKey = config('services.midtrans.server_key');
        $this->clientKey = config('services.midtrans.client_key');
        $this->isProduction = config('services.midtrans.is_production', false);
        $this->baseUrl = $this->isProduction 
            ? 'https://api.midtrans.com/v2' 
            : 'https://api.sandbox.midtrans.com/v2';
    }

    /**
     * Create transaction
     */
    public function createTransaction(Payment $payment)
    {
        $payable = $payment->payable;
        $user = $payable->user;
        $tier = $payable->tier;

        $params = [
            'transaction_details' => [
                'order_id' => $payment->order_id,
                'gross_amount' => (int) $payment->amount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
            ],
            'item_details' => [
                [
                    'id' => $tier->id,
                    'price' => (int) $payment->amount,
                    'quantity' => 1,
                    'name' => "Pendaftaran {$tier->name} KNMP",
                ]
            ],
            'callbacks' => [
                'finish' => url('/registration/finish'),
            ],
        ];

        try {
            $response = Http::withBasicAuth($this->serverKey, '')
                ->post("{$this->baseUrl}/charge", $params);

            $result = $response->json();

            Log::info('Midtrans transaction created', [
                'order_id' => $payment->order_id,
                'response' => $result
            ]);

            return [
                'payment_url' => $result['redirect_url'] ?? null,
                'va_number' => $result['va_numbers'][0]['va_number'] ?? null,
                'transaction_id' => $result['transaction_id'] ?? null,
                'qr_string' => $result['qr_string'] ?? null,
            ];

        } catch (\Exception $e) {
            Log::error('Midtrans transaction error', [
                'order_id' => $payment->order_id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Verify signature from callback
     */
    public function verifySignature(array $notification)
    {
        $orderId = $notification['order_id'] ?? '';
        $statusCode = $notification['status_code'] ?? '';
        $grossAmount = $notification['gross_amount'] ?? '';
        $serverKey = $this->serverKey;

        $signature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        return $signature === ($notification['signature_key'] ?? '');
    }

    /**
     * Get transaction status
     */
    public function getStatus($orderId)
    {
        try {
            $response = Http::withBasicAuth($this->serverKey, '')
                ->get("{$this->baseUrl}/{$orderId}/status");

            return $response->json();

        } catch (\Exception $e) {
            Log::error('Midtrans status check error', [
                'order_id' => $orderId,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
}
```

### 📄 MailService

```php
<?php
// app/Services/MailService.php

namespace App\Services;

use App\Models\User;
use App\Models\Member;
use App\Models\Registration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class MailService
{
    /**
     * Send registration confirmation
     */
    public function sendRegistrationConfirmation(Registration $registration)
    {
        $user = $registration->user;
        $tier = $registration->tier;
        $payment = $registration->payment;

        $data = [
            'name' => $user->name,
            'tier' => $tier->name,
            'amount' => number_format($payment->amount, 0, ',', '.'),
            'order_id' => $payment->order_id,
            'payment_url' => url("/payment/{$payment->order_id}"),
        ];

        try {
            Mail::send('emails.registration-confirmation', $data, function($message) use ($user) {
                $message->to($user->email, $user->name)
                        ->subject('Konfirmasi Pendaftaran KNMP');
            });

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send registration email', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send approval notification
     */
    public function sendApprovalNotification(Registration $registration)
    {
        $user = $registration->user;
        $member = $user->member;

        $data = [
            'name' => $user->name,
            'tier' => $registration->tier->name,
            'position' => $member?->position,
            'location' => $member?->getLocationName(),
            'login_url' => url('/login'),
        ];

        try {
            Mail::send('emails.registration-approved', $data, function($message) use ($user) {
                $message->to($user->email, $user->name)
                        ->subject('Pendaftaran KNMP Disetujui');
            });

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send approval email', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send rejection notification
     */
    public function sendRejectionNotification(Registration $registration)
    {
        $user = $registration->user;

        $data = [
            'name' => $user->name,
            'reason' => $registration->notes,
            'contact_url' => url('/contact'),
        ];

        try {
            Mail::send('emails.registration-rejected', $data, function($message) use ($user) {
                $message->to($user->email, $user->name)
                        ->subject('Pendaftaran KNMP Ditolak');
            });

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send rejection email', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send payment reminder
     */
    public function sendPaymentReminder(Registration $registration)
    {
        $user = $registration->user;
        $payment = $registration->payment;

        $data = [
            'name' => $user->name,
            'amount' => number_format($payment->amount, 0, ',', '.'),
            'expired_at' => $payment->expired_at->format('d/m/Y H:i'),
            'payment_url' => url("/payment/{$payment->order_id}"),
        ];

        try {
            Mail::send('emails.payment-reminder', $data, function($message) use ($user) {
                $message->to($user->email, $user->name)
                        ->subject('Reminder: Pembayaran Pendaftaran KNMP');
            });

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to send payment reminder', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }
}
```

---

## ✅ CHECKLIST PART 2

- [x] Model Province, Regency, District, Village
- [x] Model Tier, User, Member, Mitra
- [x] Model Position, Payment, Registration
- [x] AuthController (register, login, logout)
- [x] RegistrationController (submit, check status)
- [x] PaymentController (callback, process payment)
- [x] AdminController (approve, reject, statistics)
- [x] Form Request Validation
- [x] API Routes
- [x] MidtransService
- [x] MailService

---

## 📖 LANJUT KE PART 3

Part 3 akan membahas:
- Frontend Integration (Next.js)
- Form Pendaftaran
- Payment UI
- Admin Dashboard

---

*Dokumen ini adalah bagian dari Tutorial Backend Laravel KNMP*
*Total Parts: 5 Dokumen*
