# 📚 TUTORIAL LENGKAP: KNMP Digital Platform
## Dari Frontend Next.js hingga Backend Laravel - Panduan Komprehensif untuk Developer

---

## 📋 DAFTAR ISI

1. [Overview Project](#1-overview-project)
2. [Tech Stack & Tools](#2-tech-stack--tools)
3. [Project Structure](#3-project-structure)
4. [Frontend Development](#4-frontend-development)
5. [Backend Development (Laravel)](#5-backend-development-laravel)
6. [Database Design](#6-database-design)
7. [API Integration](#7-api-integration)
8. [Authentication & Security](#8-authentication--security)
9. [Deployment](#9-deployment)
10. [Best Practices](#10-best-practices)

---

## 1. OVERVIEW PROJECT

### 1.1 Apa itu KNMP?

**KNMP (Koperasi Nusantara Merah Putih)** adalah platform koperasi digital multipihak pertama di Indonesia yang mengintegrasikan 45+ kelembagaan desa ke dalam satu ekosistem super-terintegrasi.

### 1.2 Dual-Entity Architecture

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
│                    │   MySQL     │ │   Redis   │ │  MinIO/S3   ││
│                    │   Database  │ │   Cache   │ │  Storage    ││
│                    └─────────────┘ └───────────┘ └─────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Key Features

| Feature | Description |
|---------|-------------|
| **7-Tier Membership** | Dari gratis (Tier 1) hingga National Partner (Tier 7, Rp 1M) |
| **6 KPA Voting** | Sistem voting multipihak dengan proporsi suara |
| **E-Voting RAT** | Sistem voting digital untuk Rapat Anggota Tahunan |
| **SHU Calculator** | Kalkulator pembagian Sisa Hasil Usaha otomatis |
| **JE-P3 Academy** | Platform e-learning 3 tingkat |
| **Marketplace** | B2B/B2C marketplace untuk produk desa |
| **Smart Village** | IoT dashboard untuk desa digital |

---

## 2. TECH STACK & TOOLS

### 2.1 Frontend Stack

```json
{
  "framework": "Next.js 16.x (App Router)",
  "language": "TypeScript 5.x",
  "styling": "Tailwind CSS 4.x",
  "ui-library": "shadcn/ui",
  "animation": "Framer Motion 11.x",
  "state": "React Query + Zustand",
  "http": "Axios",
  "form": "React Hook Form + Zod"
}
```

### 2.2 Backend Stack

```json
{
  "framework": "Laravel 11.x",
  "language": "PHP 8.2+",
  "database": "MySQL 8.0 / MariaDB 10.x",
  "cache": "Redis 7.x",
  "queue": "Redis + Laravel Horizon",
  "storage": "MinIO / AWS S3",
  "auth": "Laravel Sanctum",
  "docs": "Laravel Swagger (OpenAPI)"
}
```

### 2.3 Development Tools

```bash
# Required Software
- Node.js 18.x+ / Bun 1.x+
- PHP 8.2+
- Composer 2.x
- MySQL 8.0+
- Redis 7.x
- Git

# Recommended
- Docker & Docker Compose
- VS Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - PHP Intelephense
  - Laravel Extra Intellisense
```

---

## 3. PROJECT STRUCTURE

### 3.1 Frontend Structure (Next.js)

```
knmp-frontend/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/                    # App Router
│   │   ├── (auth)/             # Auth group routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/        # Protected routes
│   │   │   ├── dashboard/
│   │   │   ├── rat/
│   │   │   ├── shu/
│   │   │   └── academy/
│   │   ├── tentang/
│   │   ├── membership/
│   │   ├── struktur-organisasi/
│   │   ├── marketplace/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── VisiMisiSection.tsx
│   │   │   └── ...
│   │   └── shared/             # Reusable components
│   ├── lib/
│   │   ├── api/                # API client & services
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── membership.ts
│   │   │   └── voting.ts
│   │   ├── utils/              # Utility functions
│   │   ├── hooks/              # Custom hooks
│   │   └── validators/         # Zod schemas
│   ├── types/                  # TypeScript types
│   ├── data/
│   │   └── mocks/              # Mock data for development
│   ├── constants/              # App constants
│   └── styles/
│       └── globals.css
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 Backend Structure (Laravel)

```
knmp-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       └── V1/
│   │   │           ├── AuthController.php
│   │   │           ├── UserController.php
│   │   │           ├── MembershipController.php
│   │   │           ├── TierController.php
│   │   │           ├── RATController.php
│   │   │           ├── VotingController.php
│   │   │           ├── SHUController.php
│   │   │           └── CourseController.php
│   │   ├── Middleware/
│   │   │   ├── CheckKPA.php
│   │   │   ├── CheckTier.php
│   │   │   └── CheckVotingStatus.php
│   │   └── Requests/
│   │       └── Api/
│   │           └── V1/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Tier.php
│   │   ├── MembershipPayment.php
│   │   ├── RAT.php
│   │   ├── Voting.php
│   │   ├── Vote.php
│   │   ├── SHUAllocation.php
│   │   ├── SHUDistribution.php
│   │   ├── Course.php
│   │   └── ...
│   ├── Services/
│   │   ├── VotingService.php
│   │   ├── SHUService.php
│   │   ├── MembershipService.php
│   │   └── BlockchainService.php
│   ├── Repositories/
│   │   ├── UserRepository.php
│   │   └── VotingRepository.php
│   ├── Events/
│   │   ├── VoteCast.php
│   │   └── SHUDistributed.php
│   ├── Listeners/
│   │   └── RecordVoteToBlockchain.php
│   └── Policies/
│       ├── VotingPolicy.php
│       └── SHUPolicy.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   └── web.php
├── config/
│   ├── sanctum.php
│   ├── cors.php
│   └── knmp.php
├── tests/
│   ├── Feature/
│   └── Unit/
├── .env
├── composer.json
└── artisan
```

---

## 4. FRONTEND DEVELOPMENT

### 4.1 Setup Project

```bash
# Create Next.js project with Bun
bunx create-next-app@latest knmp-frontend --typescript --tailwind --app

# Navigate to project
cd knmp-frontend

# Install dependencies
bun add framer-motion lucide-react
bun add @tanstack/react-query zustand axios
bun add react-hook-form @hookform/resolvers zod
bun add clsx tailwind-merge class-variance-authority

# Install shadcn/ui
bunx shadcn@latest init
bunx shadcn@latest add button card badge input select dialog
bunx shadcn@latest add tabs table form toast
```

### 4.2 Environment Variables

```env
# .env.local

# App
NEXT_PUBLIC_APP_NAME="KNMP"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"

# Features
NEXT_PUBLIC_ENABLE_BLOCKCHAIN="false"
NEXT_PUBLIC_ENABLE_VOTING="true"

# Analytics (optional)
NEXT_PUBLIC_GA_ID=""
```

### 4.3 API Client Setup

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

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 4.4 React Query Setup

```typescript
// src/lib/api/query-provider.tsx

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 4.5 Auth Hooks

```typescript
// src/lib/api/hooks/useAuth.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  kpa_type: 'petani' | 'pengusaha' | 'koperasi' | 'pekerja' | 'konsumen' | 'investor';
  tier_id: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  kpa_type: string;
  tier_level: number;
  status: 'pending' | 'active' | 'suspended';
}

// Login hook
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.data.token);
      queryClient.setQueryData(['user'], data.data.user);
    },
  });
}

// Register hook
export function useRegister() {
  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { data } = await apiClient.post('/auth/register', userData);
      return data;
    },
  });
}

// Get current user
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await apiClient.get('/user');
      return data.data as User;
    },
    enabled: !!localStorage.getItem('auth_token'),
    retry: false,
  });
}

// Logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      queryClient.clear();
    },
  });
}
```

### 4.6 Voting Hooks

```typescript
// src/lib/api/hooks/useVoting.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';

interface Voting {
  id: number;
  title: string;
  description: string;
  type: 'yes_no' | 'multiple_choice' | 'election';
  status: 'draft' | 'active' | 'completed';
  quorum_achieved: number;
  quorum_required: number;
  results?: {
    setuju: number;
    tidak_setuju: number;
    abstain: number;
  };
  candidates?: Array<{
    id: number;
    name: string;
    votes_count: number;
    votes_percentage: number;
  }>;
  user_voted: boolean;
}

// Get all active votings
export function useActiveVotings() {
  return useQuery({
    queryKey: ['votings', 'active'],
    queryFn: async () => {
      const { data } = await apiClient.get('/rat/votings', {
        params: { status: 'active' }
      });
      return data.data as Voting[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });
}

// Get single voting detail
export function useVoting(votingId: number) {
  return useQuery({
    queryKey: ['voting', votingId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/rat/votings/${votingId}`);
      return data.data as Voting;
    },
    refetchInterval: 10000,
  });
}

// Cast vote
export function useCastVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      votingId, 
      vote 
    }: { 
      votingId: number;
      vote: 'setuju' | 'tidak_setuju' | 'abstain';
    }) => {
      const { data } = await apiClient.post(`/rat/votings/${votingId}/vote`, {
        vote,
      });
      return data;
    },
    onSuccess: (_, { votingId }) => {
      queryClient.invalidateQueries({ queryKey: ['voting', votingId] });
      queryClient.invalidateQueries({ queryKey: ['votings'] });
    },
  });
}

// Cast election vote
export function useCastElectionVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      votingId, 
      candidateId 
    }: { 
      votingId: number;
      candidateId: number;
    }) => {
      const { data } = await apiClient.post(`/rat/votings/${votingId}/vote`, {
        candidate_id: candidateId,
      });
      return data;
    },
    onSuccess: (_, { votingId }) => {
      queryClient.invalidateQueries({ queryKey: ['voting', votingId] });
    },
  });
}
```

### 4.7 Responsive Design Patterns

```typescript
// Tailwind responsive breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Example responsive component
export function ResponsiveCard() {
  return (
    <div className="
      p-4 sm:p-6 md:p-8
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-3 sm:gap-4 md:gap-6
    ">
      {/* Content */}
    </div>
  );
}

// Responsive typography
export function ResponsiveTypography() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Responsive Title
      </h1>
      <p className="text-sm sm:text-base md:text-lg">
        Responsive paragraph
      </p>
    </div>
  );
}

// Responsive visibility
export function ResponsiveVisibility() {
  return (
    <div>
      {/* Hidden on mobile, visible on md+ */}
      <div className="hidden md:block">Desktop only</div>
      
      {/* Visible on mobile, hidden on md+ */}
      <div className="md:hidden">Mobile only</div>
      
      {/* Different content for different screens */}
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden">SM</div>
      <div className="hidden md:block lg:hidden">MD</div>
      <div className="hidden lg:block">LG+</div>
    </div>
  );
}
```

---

## 5. BACKEND DEVELOPMENT (LARAVEL)

### 5.1 Setup Laravel Project

```bash
# Create Laravel project
composer create-project laravel/laravel knmp-backend
cd knmp-backend

# Install dependencies
composer require laravel/sanctum
composer require spatie/laravel-permission
composer require intervention/image
composer require maatwebsite/excel
composer require laravel/horizon

# Publish config files
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

### 5.2 Environment Configuration

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

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost
```

### 5.3 CORS Configuration

```php
// config/cors.php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', env('FRONTEND_URL')],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 5.4 User Model

```php
// app/Models/User.php

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'village_id',
        'district_id',
        'regency_id',
        'province_id',
        'kpa_type',
        'tier_level',
        'simpanan_pokok',
        'simpanan_wajib',
        'simpanan_sukarela',
        'status',
        'blockchain_id',
        'metadata',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'metadata' => 'array',
        'simpanan_pokok' => 'decimal:2',
        'simpanan_wajib' => 'decimal:2',
        'simpanan_sukarela' => 'decimal:2',
    ];

    // Relationships
    public function tier()
    {
        return $this->belongsTo(Tier::class, 'tier_level', 'level');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function shuDistributions()
    {
        return $this->hasMany(SHUDistribution::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_enrollments')
            ->withPivot(['status', 'progress_percent', 'completed_at'])
            ->withTimestamps();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByKpa($query, $kpaType)
    {
        return $query->where('kpa_type', $kpaType);
    }

    // Helper methods
    public function getVotingPower(): float
    {
        $votingPowers = [
            'petani' => 30,
            'pengusaha' => 20,
            'koperasi' => 20,
            'pekerja' => 10,
            'konsumen' => 10,
            'investor' => 10,
        ];

        return $votingPowers[$this->kpa_type] ?? 0;
    }

    public function getTotalSimpanan(): float
    {
        return $this->simpanan_pokok + $this->simpanan_wajib + $this->simpanan_sukarela;
    }

    public function hasVotingRights(): bool
    {
        return $this->tier_level >= 2 && $this->status === 'active';
    }

    public function hasBusinessRights(): bool
    {
        return $this->tier_level >= 3 && $this->status === 'active';
    }
}
```

### 5.5 Voting Controller

```php
// app/Http/Controllers/Api/V1/VotingController.php

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Voting;
use App\Models\Vote;
use App\Models\ElectionCandidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VotingController extends Controller
{
    /**
     * KPA Voting Power Configuration
     */
    const KPA_VOTING_POWER = [
        'petani' => 30,
        'pengusaha' => 20,
        'koperasi' => 20,
        'pekerja' => 10,
        'konsumen' => 10,
        'investor' => 10,
    ];

    /**
     * Get active votings
     */
    public function index(Request $request)
    {
        $query = Voting::with(['rat', 'options', 'candidates']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $votings = $query->orderBy('created_at', 'desc')->get();

        // Add user voted status
        $userId = auth()->id();
        $votings->each(function ($voting) use ($userId) {
            $voting->user_voted = $voting->votes()->where('user_id', $userId)->exists();
        });

        return response()->json([
            'success' => true,
            'data' => $votings,
        ]);
    }

    /**
     * Get voting detail with results
     */
    public function show($id)
    {
        $voting = Voting::with(['options', 'candidates', 'rat'])->findOrFail($id);

        // Calculate results
        $results = $this->calculateResults($voting);

        // Check if user has voted
        $userVoted = $voting->votes()->where('user_id', auth()->id())->exists();

        return response()->json([
            'success' => true,
            'data' => [
                'voting' => $voting,
                'results' => $results,
                'user_voted' => $userVoted,
            ],
        ]);
    }

    /**
     * Cast a vote
     */
    public function vote(Request $request, $id)
    {
        $voting = Voting::findOrFail($id);

        // Validation
        if ($voting->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Voting is not active',
            ], 400);
        }

        $user = auth()->user();

        // Check if user already voted
        if ($voting->votes()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'You have already voted',
            ], 400);
        }

        // Validate input based on voting type
        $rules = match ($voting->type) {
            'yes_no' => ['vote' => 'required|in:setuju,tidak_setuju,abstain'],
            'multiple_choice' => ['option_id' => 'required|exists:voting_options,id'],
            'election' => ['candidate_id' => 'required|exists:election_candidates,id'],
        };

        $request->validate($rules);

        $votingPower = self::KPA_VOTING_POWER[$user->kpa_type] ?? 0;

        // Cast vote in transaction
        DB::transaction(function () use ($voting, $user, $votingPower, $request) {
            $vote = Vote::create([
                'voting_id' => $voting->id,
                'user_id' => $user->id,
                'voting_option_id' => $request->option_id ?? null,
                'vote' => $request->vote ?? null,
                'kpa_type' => $user->kpa_type,
                'voting_power' => $votingPower,
            ]);

            // Update candidate votes if election
            if ($voting->type === 'election' && $request->candidate_id) {
                ElectionCandidate::where('id', $request->candidate_id)
                    ->increment('votes_count');
            }

            // Update quorum
            $this->updateQuorum($voting);
        });

        return response()->json([
            'success' => true,
            'message' => 'Vote recorded successfully',
        ]);
    }

    /**
     * Calculate voting results
     */
    protected function calculateResults(Voting $voting)
    {
        if ($voting->type === 'yes_no') {
            return [
                'setuju' => $voting->votes()->where('vote', 'setuju')->sum('voting_power'),
                'tidak_setuju' => $voting->votes()->where('vote', 'tidak_setuju')->sum('voting_power'),
                'abstain' => $voting->votes()->where('vote', 'abstain')->sum('voting_power'),
            ];
        }

        if ($voting->type === 'election') {
            return $voting->candidates()
                ->orderByDesc('votes_count')
                ->get(['id', 'name', 'votes_count']);
        }

        return [];
    }

    /**
     * Update quorum
     */
    protected function updateQuorum(Voting $voting)
    {
        $totalMembers = User::where('status', 'active')->count();
        $votedMembers = $voting->votes()->distinct('user_id')->count();
        
        $voting->quorum_achieved = ($votedMembers / $totalMembers) * 100;
        $voting->save();
    }
}
```

### 5.6 SHU Service

```php
// app/Services/SHUService.php

<?php

namespace App\Services;

use App\Models\SHUAllocation;
use App\Models\SHUDistribution;
use App\Models\User;

class SHUService
{
    /**
     * SHU Allocation Percentages (AD/ART Pasal 43)
     */
    const SHU_PERCENTAGES = [
        'dana_cadangan' => 30,
        'jasa_modal' => 10,
        'jasa_usaha' => 40,
        'dana_pengurus' => 5,
        'dana_pendidikan' => 5,
        'dana_sosial' => 5,
        'dana_teknologi' => 5,
    ];

    /**
     * Calculate SHU distribution for all members
     */
    public function calculateDistribution(SHUAllocation $allocation): void
    {
        // Calculate each component
        $allocation->dana_cadangan = $allocation->total_shu * (self::SHU_PERCENTAGES['dana_cadangan'] / 100);
        $allocation->jasa_modal = $allocation->total_shu * (self::SHU_PERCENTAGES['jasa_modal'] / 100);
        $allocation->jasa_usaha = $allocation->total_shu * (self::SHU_PERCENTAGES['jasa_usaha'] / 100);
        $allocation->dana_pengurus = $allocation->total_shu * (self::SHU_PERCENTAGES['dana_pengurus'] / 100);
        $allocation->dana_pendidikan = $allocation->total_shu * (self::SHU_PERCENTAGES['dana_pendidikan'] / 100);
        $allocation->dana_sosial = $allocation->total_shu * (self::SHU_PERCENTAGES['dana_sosial'] / 100);
        $allocation->dana_teknologi = $allocation->total_shu * (self::SHU_PERCENTAGES['dana_teknologi'] / 100);
        $allocation->save();

        // Calculate totals for distribution
        $totalTransactionVolume = User::where('status', 'active')->sum('transaction_volume');
        $totalSimpanan = User::where('status', 'active')
            ->selectRaw('SUM(simpanan_pokok + simpanan_wajib + simpanan_sukarela) as total')
            ->value('total');

        // Get eligible members (Tier 3+)
        $users = User::where('status', 'active')
            ->where('tier_level', '>=', 3)
            ->get();

        foreach ($users as $user) {
            $this->calculateMemberSHU($allocation, $user, $totalTransactionVolume, $totalSimpanan);
        }
    }

    /**
     * Calculate SHU for individual member
     */
    protected function calculateMemberSHU(
        SHUAllocation $allocation,
        User $user,
        float $totalTransactionVolume,
        float $totalSimpanan
    ): void {
        $userSimpanan = $user->getTotalSimpanan();
        $userTransactionVolume = $user->transaction_volume ?? 0;

        // Jasa Usaha = proportional to transaction volume
        $jasaUsahaAmount = $totalTransactionVolume > 0
            ? ($userTransactionVolume / $totalTransactionVolume) * $allocation->jasa_usaha
            : 0;

        // Jasa Modal = proportional to simpanan
        $jasaModalAmount = $totalSimpanan > 0
            ? ($userSimpanan / $totalSimpanan) * $allocation->jasa_modal
            : 0;

        // Create or update distribution
        SHUDistribution::updateOrCreate(
            [
                'shu_allocation_id' => $allocation->id,
                'user_id' => $user->id,
            ],
            [
                'jasa_usaha_amount' => $jasaUsahaAmount,
                'jasa_modal_amount' => $jasaModalAmount,
                'total_amount' => $jasaUsahaAmount + $jasaModalAmount,
                'transaction_volume' => $userTransactionVolume,
                'total_simpanan' => $userSimpanan,
            ]
        );
    }

    /**
     * Get member's SHU history
     */
    public function getMemberSHU(User $user)
    {
        return SHUDistribution::with('shuAllocation')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();
    }
}
```

---

## 6. DATABASE DESIGN

### 6.1 Core Tables Migration

```php
// database/migrations/2024_01_01_000001_create_users_table.php

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
    $table->enum('kpa_type', ['petani', 'pengusaha', 'koperasi', 'pekerja', 'konsumen', 'investor'])
        ->default('petani');
    $table->integer('tier_level')->default(1);
    $table->decimal('simpanan_pokok', 15, 2)->default(0);
    $table->decimal('simpanan_wajib', 15, 2)->default(0);
    $table->decimal('simpanan_sukarela', 15, 2)->default(0);
    $table->decimal('transaction_volume', 20, 2)->default(0);
    $table->enum('status', ['pending', 'active', 'suspended', 'banned'])->default('pending');
    $table->string('blockchain_id')->nullable()->unique();
    $table->json('metadata')->nullable();
    $table->rememberToken();
    $table->timestamps();
    $table->softDeletes();
    
    // Indexes
    $table->index(['kpa_type', 'status']);
    $table->index(['tier_level', 'status']);
    $table->index('village_id');
});
```

### 6.2 Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│   users     │       │    tiers     │       │ membership_  │
│             │       │              │       │   payments   │
├─────────────┤       ├──────────────┤       ├──────────────┤
│ id          │───┐   │ id           │   ┌───│ id           │
│ name        │   │   │ level        │◄──┘   │ user_id      │
│ email       │   │   │ name         │       │ tier_id      │
│ kpa_type    │   │   │ price        │       │ amount       │
│ tier_level  │◄──┘   │ benefits     │       │ status       │
│ status      │       └──────────────┘       └──────────────┘
└──────┬──────┘
       │
       │     ┌─────────────────┐
       └────►│      votes      │
             ├─────────────────┤
             │ id              │
             │ voting_id       │
             │ user_id         │
             │ kpa_type        │
             │ voting_power    │
             └────────┬────────┘
                      │
               ┌──────▼───────┐
               │   votings    │
               ├──────────────┤
               │ id           │
               │ title        │
               │ type         │
               │ status       │
               │ rat_id       │
               └──────────────┘
```

---

## 7. API INTEGRATION

### 7.1 API Endpoints Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/v1/auth/register | Register new user | No |
| POST | /api/v1/auth/login | Login | No |
| GET | /api/v1/user | Get current user | Yes |
| GET | /api/v1/tiers | List membership tiers | No |
| GET | /api/v1/rat/votings | List votings | Yes |
| POST | /api/v1/rat/votings/{id}/vote | Cast vote | Yes |
| GET | /api/v1/shu/my | Get user's SHU | Yes |
| GET | /api/v1/courses | List courses | No |
| POST | /api/v1/academy/enroll/{id} | Enroll course | Yes |

### 7.2 Frontend API Service Example

```typescript
// src/lib/api/services/voting.ts

import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../client';

export const votingService = {
  // Get active votings
  useActiveVotings: () => {
    return useQuery({
      queryKey: ['votings', 'active'],
      queryFn: async () => {
        const { data } = await apiClient.get('/rat/votings', {
          params: { status: 'active' }
        });
        return data.data;
      },
      refetchInterval: 30000,
    });
  },

  // Cast vote
  useCastVote: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ votingId, vote }: { votingId: number; vote: string }) => {
        const { data } = await apiClient.post(`/rat/votings/${votingId}/vote`, { vote });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['votings'] });
      },
    });
  },
};
```

---

## 8. AUTHENTICATION & SECURITY

### 8.1 Laravel Sanctum Setup

```php
// config/sanctum.php

return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:3000')),
    'guard' => ['web'],
    'expiration' => null,
];
```

### 8.2 Auth Middleware

```php
// app/Http/Middleware/CheckTier.php

class CheckTier
{
    public function handle($request, Closure $next, ...$tiers)
    {
        $user = auth()->user();

        if (!in_array($user->tier_level, $tiers)) {
            return response()->json([
                'success' => false,
                'message' => 'Your tier does not have access to this feature',
            ], 403);
        }

        return $next($request);
    }
}
```

---

## 9. DEPLOYMENT

### 9.1 Frontend Deployment (Vercel)

```yaml
# vercel.json

{
  "builds": [
    { "src": "package.json", "use": "@vercel/next" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

### 9.2 Backend Deployment

```bash
# Production commands
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan queue:work --daemon
```

---

## 10. BEST PRACTICES

### 10.1 Code Style

- Use TypeScript strict mode
- Follow PSR-12 for PHP
- Use ESLint + Prettier for frontend
- Use Laravel Pint for backend

### 10.2 Git Workflow

```
main
  └── develop
        ├── feature/xxx
        ├── bugfix/xxx
        └── release/x.x
```

---

*Tutorial ini adalah panduan lengkap untuk pengembangan KNMP Digital Platform.*
*Versi: 2.0 | Diperbarui: Maret 2026*
