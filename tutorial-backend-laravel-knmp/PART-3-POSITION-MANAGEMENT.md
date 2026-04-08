# 📚 PART 3: POSITION MANAGEMENT SYSTEM

> **Tujuan**: Membuat sistem manajemen posisi yang terintegrasi dengan frontend

---

## 📋 DAFTAR ISI PART 3

1. [Membuat Admin Views](#1-membuat-admin-views)
2. [Position Index Page](#2-position-index-page)
3. [Position Create/Edit Form](#3-position-createedit-form)
4. [API Routes untuk Frontend](#4-api-routes-untuk-frontend)
5. [Ajax CRUD Operations](#5-ajax-crud-operations)
6. [Export/Import Positions](#6-exportimport-positions)
7. [Bulk Actions](#7-bulk-actions)

---

## 1. MEMBUAT ADMIN VIEWS

### 1.1 Struktur Folder Views

Buat folder berikut di `resources/views/`:

```
resources/views/
├── admin/
│   ├── positions/
│   │   ├── index.blade.php
│   │   ├── create.blade.php
│   │   ├── edit.blade.php
│   │   └── show.blade.php
│   ├── users/
│   │   ├── index.blade.php
│   │   └── show.blade.php
│   └── dashboard.blade.php
├── components/
│   ├── admin-sidebar.blade.php
│   ├── admin-header.blade.php
│   └── pagination.blade.php
└── layouts/
    └── admin.blade.php
```

### 1.2 Layout Admin

Buat file `resources/views/layouts/admin.blade.php`:

```blade
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') - KNMP Admin</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
    
    <!-- Tailwind CSS -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <style>
        [x-cloak] { display: none !important; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #f1f1f1; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
    </style>
</head>
<body class="font-sans antialiased bg-gray-100">
    <div class="min-h-screen flex" x-data="{ sidebarOpen: true }">
        
        <!-- Sidebar -->
        <aside 
            class="fixed inset-y-0 left-0 z-50 w-64 bg-[#8B0000] text-white transform transition-transform duration-300 ease-in-out"
            :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
            x-show="sidebarOpen"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="-translate-x-full"
            x-transition:enter-end="translate-x-0"
        >
            <!-- Logo -->
            <div class="flex items-center justify-center h-16 bg-[#6B0000]">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span class="text-[#8B0000] font-bold text-lg">K</span>
                    </div>
                    <span class="font-bold text-lg">KNMP Admin</span>
                </a>
            </div>
            
            <!-- Navigation -->
            <nav class="mt-6 px-3 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-thin">
                <!-- Dashboard -->
                <a href="{{ route('admin.dashboard') }}" 
                   class="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg mb-1 transition-colors
                          {{ request()->routeIs('admin.dashboard') ? 'bg-white/10 text-white' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span>Dashboard</span>
                </a>
                
                <!-- Positions -->
                <div class="mb-1" x-data="{ positionsOpen: {{ request()->routeIs('admin.positions.*') ? 'true' : 'false' }} }">
                    <button @click="positionsOpen = !positionsOpen"
                            class="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span>Posisi</span>
                        </div>
                        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': positionsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div x-show="positionsOpen" x-collapse class="mt-1 ml-4 space-y-1">
                        <a href="{{ route('admin.positions.index') }}" 
                           class="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors
                                  {{ request()->routeIs('admin.positions.index') ? 'bg-white/10 text-white' : '' }}">
                            Semua Posisi
                        </a>
                        <a href="{{ route('admin.positions.index', ['status' => 'vacant']) }}" 
                           class="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors">
                            Posisi Kosong
                        </a>
                        <a href="{{ route('admin.positions.create') }}" 
                           class="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors">
                            Tambah Posisi
                        </a>
                    </div>
                </div>
                
                <!-- Users -->
                <div class="mb-1" x-data="{ usersOpen: {{ request()->routeIs('admin.users.*') ? 'true' : 'false' }} }">
                    <button @click="usersOpen = !usersOpen"
                            class="w-full flex items-center justify-between px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <div class="flex items-center gap-3">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                            <span>Pengguna</span>
                        </div>
                        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': usersOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div x-show="usersOpen" x-collapse class="mt-1 ml-4 space-y-1">
                        <a href="{{ route('admin.users.index') }}" 
                           class="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors">
                            Semua Pengguna
                        </a>
                    </div>
                </div>
                
                <!-- Registrations -->
                <a href="{{ route('admin.registrations.index') }}" 
                   class="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg mb-1 transition-colors
                          {{ request()->routeIs('admin.registrations.*') ? 'bg-white/10 text-white' : '' }}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Pendaftaran</span>
                    @php($pending = \App\Models\Registration::where('status', 'submitted')->count())
                    @if($pending > 0)
                        <span class="ml-auto bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                            {{ $pending }}
                        </span>
                    @endif
                </a>
                
                <!-- Divider -->
                <div class="border-t border-white/10 my-4"></div>
                
                <!-- Settings -->
                <a href="#" 
                   class="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg mb-1 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>Pengaturan</span>
                </a>
            </nav>
        </aside>
        
        <!-- Main Content -->
        <div class="flex-1" :class="{ 'ml-64': sidebarOpen }">
            
            <!-- Top Header -->
            <header class="sticky top-0 z-40 bg-white border-b shadow-sm">
                <div class="flex items-center justify-between h-16 px-6">
                    <!-- Toggle Sidebar -->
                    <button @click="sidebarOpen = !sidebarOpen" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    
                    <!-- Breadcrumb -->
                    <nav class="hidden md:flex">
                        <ol class="flex items-center gap-2 text-sm text-gray-500">
                            <li><a href="{{ route('admin.dashboard') }}" class="hover:text-[#8B0000]">Dashboard</a></li>
                            @yield('breadcrumb')
                        </ol>
                    </nav>
                    
                    <!-- User Menu -->
                    <div class="flex items-center gap-4" x-data="{ userMenuOpen: false }">
                        <div class="relative">
                            <button @click="userMenuOpen = !userMenuOpen" class="flex items-center gap-2">
                                <img src="{{ auth()->user()->avatar_url }}" 
                                     alt="{{ auth()->user()->name }}"
                                     class="w-8 h-8 rounded-full">
                                <span class="hidden md:block text-sm font-medium text-gray-700">
                                    {{ auth()->user()->name }}
                                </span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            <!-- Dropdown -->
                            <div x-show="userMenuOpen" 
                                 @click.outside="userMenuOpen = false"
                                 x-transition
                                 class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                                <a href="{{ route('profile.edit') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    Profil Saya
                                </a>
                                <div class="border-t my-1"></div>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Page Content -->
            <main class="p-6">
                <!-- Flash Messages -->
                @if(session('success'))
                    <div x-data="{ show: true }" 
                         x-init="setTimeout(() => show = false, 5000)"
                         x-show="show"
                         x-transition
                         class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {{ session('success') }}
                    </div>
                @endif
                
                @if(session('error'))
                    <div x-data="{ show: true }" 
                         x-init="setTimeout(() => show = false, 5000)"
                         x-show="show"
                         x-transition
                         class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        {{ session('error') }}
                    </div>
                @endif
                
                @yield('content')
            </main>
        </div>
    </div>
    
    @stack('scripts')
</body>
</html>
```

---

## 2. POSITION INDEX PAGE

### 2.1 Dashboard View

Buat file `resources/views/admin/dashboard.blade.php`:

```blade
@extends('layouts.admin')

@section('title', 'Dashboard')

@section('breadcrumb')
    <li class="text-gray-400">/</li>
    <li class="text-gray-900 font-medium">Dashboard</li>
@endsection

@section('content')
<div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Positions -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Total Posisi</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['total_positions'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
            </div>
        </div>
        
        <!-- Vacant Positions -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Posisi Kosong</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['vacant_positions'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
            </div>
        </div>
        
        <!-- Filled Positions -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Posisi Terisi</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['filled_positions'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>
        </div>
        
        <!-- Pending Registrations -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Pendaftaran Pending</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $stats['pending_registrations'] ?? 0 }}</p>
                </div>
                <div class="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="bg-white rounded-xl shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="{{ route('admin.positions.create') }}" 
               class="flex items-center gap-3 p-4 bg-[#008F3D]/10 hover:bg-[#008F3D]/20 rounded-xl transition-colors">
                <div class="w-10 h-10 bg-[#008F3D] rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </div>
                <span class="font-medium text-gray-900">Tambah Posisi</span>
            </a>
            
            <a href="{{ route('admin.positions.index', ['status' => 'vacant']) }}" 
               class="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors">
                <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <span class="font-medium text-gray-900">Posisi Kosong</span>
            </a>
            
            <a href="{{ route('admin.registrations.index') }}" 
               class="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <span class="font-medium text-gray-900">Pendaftaran</span>
            </a>
            
            <a href="{{ route('admin.users.index') }}" 
               class="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </div>
                <span class="font-medium text-gray-900">Pengguna</span>
            </a>
        </div>
    </div>
    
    <!-- Recent Registrations -->
    @if(isset($recentRegistrations) && $recentRegistrations->count() > 0)
    <div class="bg-white rounded-xl shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Pendaftaran Terbaru</h3>
            <a href="{{ route('admin.registrations.index') }}" class="text-sm text-[#8B0000] hover:underline">
                Lihat Semua
            </a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b">
                        <th class="text-left py-3 text-sm font-medium text-gray-500">Nama</th>
                        <th class="text-left py-3 text-sm font-medium text-gray-500">Posisi</th>
                        <th class="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                        <th class="text-left py-3 text-sm font-medium text-gray-500">Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($recentRegistrations as $registration)
                    <tr class="border-b last:border-0">
                        <td class="py-3 text-sm text-gray-900">{{ $registration->name }}</td>
                        <td class="py-3 text-sm text-gray-600">{{ $registration->position->position_name ?? '-' }}</td>
                        <td class="py-3">
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                {{ $registration->status === 'submitted' ? 'bg-yellow-100 text-yellow-800' : '' }}
                                {{ $registration->status === 'verified' ? 'bg-blue-100 text-blue-800' : '' }}
                                {{ $registration->status === 'approved' ? 'bg-green-100 text-green-800' : '' }}
                                {{ $registration->status === 'rejected' ? 'bg-red-100 text-red-800' : '' }}">
                                {{ ucfirst($registration->status) }}
                            </span>
                        </td>
                        <td class="py-3 text-sm text-gray-500">{{ $registration->created_at->diffForHumans() }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @endif
</div>
@endsection
```

### 2.2 Position Index View

Buat file `resources/views/admin/positions/index.blade.php`:

```blade
@extends('layouts.admin')

@section('title', 'Daftar Posisi')

@section('breadcrumb')
    <li class="text-gray-400">/</li>
    <li class="text-gray-400">Posisi</li>
    <li class="text-gray-400">/</li>
    <li class="text-gray-900 font-medium">Daftar</li>
@endsection

@section('content')
<div class="space-y-6" x-data="{ 
    selectAll: false,
    selectedItems: [],
    bulkAction: '',
    showDeleteModal: false,
    itemToDelete: null
}">
    
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Daftar Posisi</h1>
            <p class="text-sm text-gray-500">Kelola semua posisi dalam organisasi KNMP</p>
        </div>
        <a href="{{ route('admin.positions.create') }}" 
           class="inline-flex items-center gap-2 px-4 py-2 bg-[#008F3D] text-white rounded-lg hover:bg-[#00752F] transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Tambah Posisi
        </a>
    </div>
    
    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border p-4">
        <form method="GET" class="flex flex-col md:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1">
                <div class="relative">
                    <input type="text" 
                           name="search" 
                           value="{{ request('search') }}"
                           placeholder="Cari posisi..."
                           class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            
            <!-- Status Filter -->
            <div class="w-full md:w-48">
                <select name="status" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                    <option value="">Semua Status</option>
                    <option value="vacant" {{ request('status') === 'vacant' ? 'selected' : '' }}>Kosong</option>
                    <option value="filled" {{ request('status') === 'filled' ? 'selected' : '' }}>Terisi</option>
                    <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
                </select>
            </div>
            
            <!-- Level Filter -->
            <div class="w-full md:w-48">
                <select name="level" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                    <option value="">Semua Level</option>
                    @foreach($levels as $level)
                        <option value="{{ $level->id }}" {{ request('level') == $level->id ? 'selected' : '' }}>
                            {{ $level->short_name }} - {{ $level->title }}
                        </option>
                    @endforeach
                </select>
            </div>
            
            <!-- Buttons -->
            <div class="flex gap-2">
                <button type="submit" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Filter
                </button>
                <a href="{{ route('admin.positions.index') }}" 
                   class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Reset
                </a>
            </div>
        </form>
    </div>
    
    <!-- Bulk Actions -->
    <div x-show="selectedItems.length > 0" x-transition class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-4">
        <span class="text-sm text-blue-700">
            <span x-text="selectedItems.length"></span> item dipilih
        </span>
        <select x-model="bulkAction" class="px-3 py-1.5 border rounded-lg text-sm">
            <option value="">Pilih aksi...</option>
            <option value="activate">Aktifkan</option>
            <option value="deactivate">Nonaktifkan</option>
            <option value="delete">Hapus</option>
        </select>
        <button @click="executeBulkAction()" 
                :disabled="!bulkAction"
                class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Eksekusi
        </button>
    </div>
    
    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="w-12 px-4 py-3">
                            <input type="checkbox" 
                                   x-model="selectAll"
                                   @change="toggleSelectAll()"
                                   class="w-4 h-4 rounded border-gray-300 text-[#8B0000] focus:ring-[#8B0000]">
                        </th>
                        <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Posisi</th>
                        <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Kategori</th>
                        <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Level</th>
                        <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Pemangku</th>
                        <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                        <th class="text-left px-4 py-3 text-sm font-medium text-gray-500">Masa Jabatan</th>
                        <th class="text-right px-4 py-3 text-sm font-medium text-gray-500">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    @forelse($positions as $position)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-4 py-3">
                            <input type="checkbox" 
                                   :value="{{ $position->id }}"
                                   x-model="selectedItems"
                                   class="w-4 h-4 rounded border-gray-300 text-[#8B0000] focus:ring-[#8B0000]">
                        </td>
                        <td class="px-4 py-3">
                            <div>
                                <p class="font-medium text-gray-900">{{ $position->position_name }}</p>
                                @if($position->province)
                                    <p class="text-xs text-gray-500">{{ $position->full_location }}</p>
                                @endif
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            @if($position->category)
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                      style="background-color: {{ $position->category->color }}20; color: {{ $position->category->color }}">
                                    {{ $position->category->name }}
                                </span>
                            @else
                                <span class="text-gray-400">-</span>
                            @endif
                        </td>
                        <td class="px-4 py-3">
                            @if($position->level)
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                      style="background-color: {{ $position->level->color }}20; color: {{ $position->level->color }}">
                                    {{ $position->level->short_name }}
                                </span>
                            @else
                                <span class="text-gray-400">-</span>
                            @endif
                        </td>
                        <td class="px-4 py-3">
                            @if($position->user)
                                <div class="flex items-center gap-2">
                                    <img src="{{ $position->user->avatar_url }}" 
                                         alt="{{ $position->user->name }}"
                                         class="w-6 h-6 rounded-full">
                                    <span class="text-sm text-gray-900">{{ $position->user->name }}</span>
                                </div>
                            @else
                                <span class="text-sm text-gray-400 italic">Posisi Kosong</span>
                            @endif
                        </td>
                        <td class="px-4 py-3">
                            @php
                                $statusColors = [
                                    'vacant' => 'bg-yellow-100 text-yellow-800',
                                    'filled' => 'bg-green-100 text-green-800',
                                    'pending' => 'bg-blue-100 text-blue-800',
                                ];
                                $statusLabels = [
                                    'vacant' => 'Kosong',
                                    'filled' => 'Terisi',
                                    'pending' => 'Pending',
                                ];
                            @endphp
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {{ $statusColors[$position->status] }}">
                                {{ $statusLabels[$position->status] }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-500">
                            @if($position->term_start && $position->term_end)
                                {{ $position->term_start->format('Y') }} - {{ $position->term_end->format('Y') }}
                            @elseif($position->term_end)
                                Sampai {{ $position->term_end->format('Y') }}
                            @else
                                -
                            @endif
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.positions.show', $position) }}" 
                                   class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                   title="Lihat">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </a>
                                <a href="{{ route('admin.positions.edit', $position) }}" 
                                   class="p-1.5 text-gray-400 hover:text-[#008F3D] hover:bg-green-50 rounded-lg transition-colors"
                                   title="Edit">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </a>
                                <button @click="itemToDelete = {{ $position->id }}; showDeleteModal = true"
                                        class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="px-4 py-12 text-center">
                            <svg class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <p class="text-gray-500 mb-2">Tidak ada posisi ditemukan</p>
                            <a href="{{ route('admin.positions.create') }}" class="text-[#8B0000] hover:underline">
                                Tambah posisi baru
                            </a>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        <!-- Pagination -->
        @if($positions->hasPages())
        <div class="px-4 py-3 border-t">
            {{ $positions->links() }}
        </div>
        @endif
    </div>
    
    <!-- Delete Modal -->
    <div x-show="showDeleteModal" 
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
         @click.self="showDeleteModal = false">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">Hapus Posisi?</h3>
                    <p class="text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan.</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button @click="showDeleteModal = false" 
                        class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Batal
                </button>
                <form :action="'{{ route('admin.positions.destroy', ['position' => 'ID']) }}'.replace('ID', itemToDelete)" 
                      method="POST" class="flex-1">
                    @csrf
                    @method('DELETE')
                    <button type="submit" 
                            class="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Hapus
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
function toggleSelectAll() {
    if (this.selectAll) {
        this.selectedItems = {{ $positions->pluck('id') }};
    } else {
        this.selectedItems = [];
    }
}

function executeBulkAction() {
    if (!this.bulkAction || this.selectedItems.length === 0) return;
    
    if (this.bulkAction === 'delete') {
        if (!confirm(`Hapus ${this.selectedItems.length} item yang dipilih?`)) return;
    }
    
    // Send bulk action request
    fetch('{{ route('admin.positions.bulk') }}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        body: JSON.stringify({
            action: this.bulkAction,
            ids: this.selectedItems
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.reload();
        }
    });
}
</script>
@endpush
@endsection
```

---

## 3. POSITION CREATE/EDIT FORM

### 3.1 Create Form

Buat file `resources/views/admin/positions/create.blade.php`:

```blade
@extends('layouts.admin')

@section('title', 'Tambah Posisi')

@section('breadcrumb')
    <li class="text-gray-400">/</li>
    <li class="text-gray-400">Posisi</li>
    <li class="text-gray-400">/</li>
    <li class="text-gray-900 font-medium">Tambah</li>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-sm border">
        <div class="p-6 border-b">
            <h2 class="text-xl font-semibold text-gray-900">Tambah Posisi Baru</h2>
            <p class="text-sm text-gray-500">Isi form di bawah untuk menambahkan posisi baru</p>
        </div>
        
        <form method="POST" action="{{ route('admin.positions.store') }}" class="p-6 space-y-6">
            @csrf
            
            <!-- Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                    <label for="position_name" class="block text-sm font-medium text-gray-700 mb-1">
                        Nama Posisi <span class="text-red-500">*</span>
                    </label>
                    <input type="text" 
                           id="position_name"
                           name="position_name"
                           value="{{ old('position_name') }}"
                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none"
                           placeholder="Contoh: Ketua Dewan Pembina"
                           required>
                    @error('position_name')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                
                <div>
                    <label for="category_id" class="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                    </label>
                    <select name="category_id" 
                            id="category_id"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                        <option value="">Pilih Kategori</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                
                <div>
                    <label for="level_id" class="block text-sm font-medium text-gray-700 mb-1">
                        Level
                    </label>
                    <select name="level_id" 
                            id="level_id"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                        <option value="">Pilih Level</option>
                        @foreach($levels as $level)
                            <option value="{{ $level->id }}" {{ old('level_id') == $level->id ? 'selected' : '' }}>
                                {{ $level->short_name }} - {{ $level->title }}
                            </option>
                        @endforeach
                    </select>
                </div>
                
                <div>
                    <label for="parent_id" class="block text-sm font-medium text-gray-700 mb-1">
                        Parent Position
                    </label>
                    <select name="parent_id" 
                            id="parent_id"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                        <option value="">Tidak Ada</option>
                        @foreach(\App\Models\Position::orderBy('position_name')->get() as $pos)
                            <option value="{{ $pos->id }}" {{ old('parent_id') == $pos->id ? 'selected' : '' }}>
                                {{ $pos->position_name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                        Status <span class="text-red-500">*</span>
                    </label>
                    <select name="status" 
                            id="status"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none"
                            required>
                        <option value="vacant" {{ old('status') === 'vacant' ? 'selected' : '' }}>Kosong</option>
                        <option value="filled" {{ old('status') === 'filled' ? 'selected' : '' }}>Terisi</option>
                        <option value="pending" {{ old('status') === 'pending' ? 'selected' : '' }}>Pending</option>
                    </select>
                </div>
            </div>
            
            <!-- Location -->
            <div class="border-t pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Lokasi (Opsional)</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="province_id" class="block text-sm font-medium text-gray-700 mb-1">
                            Provinsi
                        </label>
                        <select name="province_id" 
                                id="province_id"
                                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                            <option value="">Pilih Provinsi</option>
                            @foreach($provinces as $province)
                                <option value="{{ $province->id }}" {{ old('province_id') == $province->id ? 'selected' : '' }}>
                                    {{ $province->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- Term -->
            <div class="border-t pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Masa Jabatan</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="term_start" class="block text-sm font-medium text-gray-700 mb-1">
                            Mulai Jabatan
                        </label>
                        <input type="date" 
                               name="term_start"
                               id="term_start"
                               value="{{ old('term_start') }}"
                               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                    </div>
                    
                    <div>
                        <label for="term_end" class="block text-sm font-medium text-gray-700 mb-1">
                            Akhir Jabatan
                        </label>
                        <input type="date" 
                               name="term_end"
                               id="term_end"
                               value="{{ old('term_end') }}"
                               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] outline-none">
                    </div>
                </div>
            </div>
            
            <!-- Buttons -->
            <div class="flex items-center justify-end gap-4 pt-6 border-t">
                <a href="{{ route('admin.positions.index') }}" 
                   class="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                    Batal
                </a>
                <button type="submit" 
                        class="px-6 py-2 bg-[#008F3D] text-white rounded-lg hover:bg-[#00752F] transition-colors">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
```

---

## 4. API ROUTES UNTUK FRONTEND

Buat file `routes/api.php`:

```php
<?php

use App\Http\Controllers\Api\PositionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegistrationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::prefix('v1')->group(function () {
    
    // Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
    
    // Public Position Info
    Route::get('/positions', [PositionController::class, 'index']);
    Route::get('/positions/levels', [PositionController::class, 'levels']);
    Route::get('/positions/categories', [PositionController::class, 'categories']);
    Route::get('/positions/{id}', [PositionController::class, 'show']);
    Route::get('/positions/level/{level}', [PositionController::class, 'byLevel']);
    
    // Public Statistics
    Route::get('/stats', [PositionController::class, 'stats']);
    
    // Provinces
    Route::get('/provinces', [PositionController::class, 'provinces']);
    Route::get('/provinces/{id}/kab-kotas', [PositionController::class, 'kabKotas']);
    Route::get('/kab-kotas/{id}/kecamatans', [PositionController::class, 'kecamatans']);
    Route::get('/kecamatans/{id}/desas', [PositionController::class, 'desas']);
});

// Protected Routes
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::put('/auth/user', [AuthController::class, 'updateProfile']);
    
    // Registration
    Route::apiResource('registrations', RegistrationController::class);
    Route::post('/registrations/{id}/upload-document', [RegistrationController::class, 'uploadDocument']);
    
    // Admin Only
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('admin/positions', \App\Http\Controllers\Api\Admin\PositionController::class);
        Route::post('/admin/positions/bulk', [\App\Http\Controllers\Api\Admin\PositionController::class, 'bulkAction']);
        Route::post('/admin/positions/{id}/assign-user', [\App\Http\Controllers\Api\Admin\PositionController::class, 'assignUser']);
        Route::post('/admin/positions/{id}/remove-user', [\App\Http\Controllers\Api\Admin\PositionController::class, 'removeUser']);
        
        Route::apiResource('admin/registrations', \App\Http\Controllers\Api\Admin\RegistrationController::class);
        Route::post('/admin/registrations/{id}/verify', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'verify']);
        Route::post('/admin/registrations/{id}/approve', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'approve']);
        Route::post('/admin/registrations/{id}/reject', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'reject']);
    });
});
```

### 4.1 API Position Controller

Buat file `app/Http/Controllers/Api/PositionController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\PositionLevel;
use App\Models\Category;
use App\Models\Province;
use App\Models\KabKota;
use App\Models\Kecamatan;
use App\Models\Desa;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Get all positions
     */
    public function index(Request $request)
    {
        $query = Position::with(['category', 'level', 'user', 'province', 'kabKota', 'kecamatan', 'desa']);
        
        // Filters
        if ($request->status) {
            $query->where('status', $request->status);
        }
        
        if ($request->level_id) {
            $query->where('level_id', $request->level_id);
        }
        
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }
        
        if ($request->province_id) {
            $query->where('province_id', $request->province_id);
        }
        
        // Search
        if ($request->search) {
            $query->where('position_name', 'like', "%{$request->search}%");
        }
        
        $positions = $query->orderBy('sort_order')->paginate($request->per_page ?? 20);
        
        return response()->json([
            'success' => true,
            'data' => $positions,
        ]);
    }
    
    /**
     * Get position by ID
     */
    public function show($id)
    {
        $position = Position::with([
            'category', 
            'level', 
            'user', 
            'province', 
            'kabKota', 
            'kecamatan', 
            'desa',
            'children.user',
            'parent.user'
        ])->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $position,
        ]);
    }
    
    /**
     * Get positions by level
     */
    public function byLevel($levelCode)
    {
        $level = PositionLevel::where('code', strtoupper($levelCode))->firstOrFail();
        
        $positions = Position::with(['user', 'province', 'kabKota', 'kecamatan', 'desa'])
            ->where('level_id', $level->id)
            ->orderBy('sort_order')
            ->get();
        
        return response()->json([
            'success' => true,
            'level' => $level,
            'data' => $positions,
        ]);
    }
    
    /**
     * Get all levels
     */
    public function levels()
    {
        $levels = PositionLevel::orderBy('hierarchy')->get();
        
        return response()->json([
            'success' => true,
            'data' => $levels,
        ]);
    }
    
    /**
     * Get all categories
     */
    public function categories()
    {
        $categories = Category::orderBy('sort_order')->get();
        
        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
    
    /**
     * Get statistics
     */
    public function stats()
    {
        $stats = [
            'total_positions' => Position::count(),
            'vacant_positions' => Position::vacant()->count(),
            'filled_positions' => Position::filled()->count(),
            'pending_positions' => Position::where('status', 'pending')->count(),
            'by_level' => PositionLevel::withCount(['positions', 'positions as filled_count' => function($q) {
                $q->where('status', 'filled');
            }])->orderBy('hierarchy')->get(),
        ];
        
        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }
    
    /**
     * Get provinces
     */
    public function provinces()
    {
        $provinces = Province::orderBy('name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $provinces,
        ]);
    }
    
    /**
     * Get kab/kota by province
     */
    public function kabKotas($provinceId)
    {
        $kabKotas = KabKota::where('province_id', $provinceId)
            ->orderBy('name')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $kabKotas,
        ]);
    }
    
    /**
     * Get kecamatans by kab/kota
     */
    public function kecamatans($kabKotaId)
    {
        $kecamatans = Kecamatan::where('kab_kota_id', $kabKotaId)
            ->orderBy('name')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $kecamatans,
        ]);
    }
    
    /**
     * Get desas by kecamatan
     */
    public function desas($kecamatanId)
    {
        $desas = Desa::where('kecamatan_id', $kecamatanId)
            ->orderBy('name')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $desas,
        ]);
    }
}
```

---

## 5. NEXT.JS FRONTEND INTEGRATION

### 5.1 Update Frontend API Calls

Update file `src/app/pimpinan/kornas/page.tsx` di Next.js untuk mengambil data dari backend:

```typescript
// Tambahkan di bagian atas file
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.knmp.org/api/v1';

// Fetch data dari backend
async function getPositions() {
  const res = await fetch(`${API_URL}/positions?level_id=1`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch positions');
  }
  
  return res.json();
}
```

### 5.2 Environment Variables

Buat file `.env.local` di Next.js:

```env
NEXT_PUBLIC_API_URL=https://api.knmp.org/api/v1
```

---

## ✅ CHECKLIST PART 3

- [ ] Admin layout dengan sidebar dibuat
- [ ] Dashboard dengan statistik
- [ ] Position index dengan filter dan search
- [ ] Position create/edit form
- [ ] API routes untuk frontend
- [ ] API controller untuk positions
- [ ] Integration dengan Next.js frontend

---

## 📖 LANJUT KE PART 4

**PART 4: Registration & Email API** → `PART-4-REGISTRATION-EMAIL.md`

---

*Dokumentasi ini dibuat dengan ❤️ untuk KNMP*
