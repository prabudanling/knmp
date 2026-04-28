# 📚 TUTORIAL LENGKAP UNTUK PEMULA
## Panduan Mengedit Website KNMP (Koperasi Nusantara Merah Putih)

---

## 📋 DAFTAR ISI

1. [Struktur Folder Project](#1-struktur-folder-project)
2. [Cara Mengedit Menu/Navigation](#2-cara-mengedit-menunavigation)
3. [Cara Mengedit Halaman/Pages](#3-cara-mengedit-halamanpages)
4. [Cara Mengedit Warna/Colors](#4-cara-mengedit-warnacolors)
5. [Cara Mengedit Komponen](#5-cara-mengedit-komponen)
6. [Cara Menambah Halaman Baru](#6-cara-menambah-halaman-baru)
7. [Tips & Troubleshooting](#7-tips--troubleshooting)

---

## 1. STRUKTUR FOLDER PROJECT

Website KNMP menggunakan **Next.js 16** dengan struktur folder yang terorganisir. Berikut penjelasan struktur folder utama:

```
📁 my-project/
├── 📁 src/
│   ├── 📁 app/                    # Halaman-halaman website
│   │   ├── 📄 page.tsx           # Halaman Beranda (/)
│   │   ├── 📁 tentang/           # Halaman Tentang (/tentang)
│   │   ├── 📁 visi-misi/         # Halaman Visi Misi (/visi-misi)
│   │   ├── 📁 kpa/               # Halaman 6 KPA (/kpa)
│   │   ├── 📁 marketplace/       # Halaman Marketplace (/marketplace)
│   │   └── ...                   # Halaman lainnya
│   │
│   ├── 📁 components/
│   │   ├── 📁 layout/            # Komponen layout (Header, Footer)
│   │   │   ├── 📄 Header.tsx    # Navigation bar di atas
│   │   │   └── 📄 Footer.tsx    # Footer di bawah
│   │   │
│   │   └── 📁 sections/          # Komponen section untuk halaman
│   │       ├── 📄 Hero.tsx       # Section hero (banner utama)
│   │       ├── 📄 StatsSection.tsx
│   │       └── ...
│   │
│   └── 📁 constants/
│       └── 📄 site.ts            # Konfigurasi website (nama, link, warna)
│
└── 📄 package.json               # Dependencies project
```

### Penjelasan File Penting:

| File | Fungsi |
|------|--------|
| `src/app/page.tsx` | Halaman beranda (homepage) - halaman yang pertama kali dilihat |
| `src/components/layout/Header.tsx` | Menu navigasi di bagian atas website |
| `src/components/layout/Footer.tsx` | Bagian bawah website dengan link dan info kontak |
| `src/constants/site.ts` | Konfigurasi nama website, link sosial media, dll |
| `src/app/globals.css` | Styling global untuk seluruh website |

---

## 2. CARA MENGEDIT MENU/NAVIGATION

### 📍 Lokasi File Menu
File menu berada di: `src/components/layout/Header.tsx`

### 🎯 Struktur Menu

Menu diorganisir dalam **dropdown groups** untuk tampilan yang rapi:

```typescript
// File: src/components/layout/Header.tsx

const menuStructure = [
  { 
    label: 'Beranda',      // Nama yang tampil di menu
    href: '/'              // URL tujuan saat diklik
  },
  { 
    label: 'Tentang', 
    href: '/tentang',
    children: [            // Sub-menu dropdown
      { label: 'Tentang KNMP', href: '/tentang' },
      { label: 'Visi & Misi', href: '/visi-misi' },
      { label: '6 KPA', href: '/kpa' },
    ]
  },
  // ... menu lainnya
]
```

### ✏️ Cara Mengedit Menu:

#### 1. Menambah Menu Baru (Tanpa Dropdown)
```typescript
const menuStructure = [
  // ... menu yang ada
  { 
    label: 'Menu Baru',    // Nama menu
    href: '/halaman-baru'  // URL tujuan
  },
]
```

#### 2. Menambah Menu Dengan Dropdown
```typescript
const menuStructure = [
  // ... menu yang ada
  { 
    label: 'Layanan Baru', 
    href: '#',              // '#' jika tidak ada halaman utama
    children: [
      { label: 'Sub Menu 1', href: '/layanan-1' },
      { label: 'Sub Menu 2', href: '/layanan-2' },
    ]
  },
]
```

#### 3. Menghapus Menu
Cukup hapus atau comment (tambah `//` di depan) item menu yang tidak diinginkan:
```typescript
const menuStructure = [
  { label: 'Beranda', href: '/' },
  // { label: 'Menu Dihapus', href: '/hapus' }, // ← di-comment
]
```

#### 4. Mengubah Nama Menu
```typescript
// Sebelum
{ label: 'Tentang', href: '/tentang' }

// Sesudah
{ label: 'Profil Kami', href: '/tentang' }
```

---

## 3. CARA MENGEDIT HALAMAN/PAGES

### 📍 Lokasi File Halaman
Setiap halaman berada di folder terpisah dalam `src/app/`:

| URL | Lokasi File |
|-----|-------------|
| `/` | `src/app/page.tsx` |
| `/tentang` | `src/app/tentang/page.tsx` |
| `/visi-misi` | `src/app/visi-misi/page.tsx` |
| `/kpa` | `src/app/kpa/page.tsx` |
| `/marketplace` | `src/app/marketplace/page.tsx` |

### ✏️ Struktur File Halaman

```typescript
// File: src/app/tentang/page.tsx

'use client'  // ← Wajib ada untuk halaman interaktif

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Konten halaman di sini */}
      <h1>Tentang KNMP</h1>
      <p>Deskripsi tentang KNMP...</p>
    </main>
  )
}
```

### 📝 Cara Mengedit Konten Halaman:

#### 1. Mengedit Teks
Cari teks yang ingin diubah, lalu edit langsung:
```typescript
// Sebelum
<h1 className="text-4xl font-bold">Selamat Datang</h1>

// Sesudah
<h1 className="text-4xl font-bold">Halo, Selamat Datang di KNMP</h1>
```

#### 2. Mengedit Section pada Homepage
Homepage (`src/app/page.tsx`) terdiri dari beberapa section:

```typescript
// File: src/app/page.tsx

export default function Home() {
  return (
    <main>
      <Hero />              {/* Banner utama */}
      <VisiMisiSection />   {/* Section Visi Misi */}
      <StatsSection />      {/* Section Statistik */}
      <EcosystemSection />  {/* Section 6 KPA */}
      {/* ... section lainnya */}
    </main>
  )
}
```

Setiap section adalah file terpisah di `src/components/sections/`:

| Section | File Lokasi |
|---------|-------------|
| Hero | `src/components/sections/Hero.tsx` |
| VisiMisiSection | `src/components/sections/VisiMisiSection.tsx` |
| StatsSection | `src/components/sections/StatsSection.tsx` |
| EcosystemSection | `src/components/sections/EcosystemSection.tsx` |

---

## 4. CARA MENGEDIT WARNA/COLORS

### 🎨 Palet Warna Utama KNMP

Website KNMP menggunakan 2 warna utama:

| Nama | Kode Warna | Penggunaan |
|------|------------|------------|
| **Merah Marun** | `#8B0000` | Warna utama, tombol, heading penting |
| **Emas** | `#D4AF37` | Aksen, badge, highlight |

### ✏️ Cara Menggunakan Warna:

#### 1. Menggunakan Warna di Tailwind CSS
```tsx
// Contoh penggunaan warna Merah Marun (#8B0000)
<div className="bg-[#8B0000] text-white">
  Tombol Merah
</div>

// Contoh penggunaan warna Emas (#D4AF37)
<div className="text-[#D4AF37]">
  Teks Emas
</div>

// Contoh penggunaan dengan opacity
<div className="bg-[#8B0000]/10">  {/* 10% opacity */}
  Background Merah Transparan
</div>
```

#### 2. Kontras Warna yang Benar

**PENTING:** Selalu perhatikan kontras warna!

| Background | Warna Teks | Contoh |
|------------|------------|--------|
| Putih (`bg-white`) | Gelap (`text-gray-900`, `text-[#8B0000]`) | ✅ BAGUS |
| Gelap (`bg-gray-900`) | Terang (`text-white`, `text-[#D4AF37]`) | ✅ BAGUS |
| Merah Marun (`bg-[#8B0000]`) | Putih (`text-white`) | ✅ BAGUS |
| Putih (`bg-white`) | Putih (`text-white`) | ❌ TIDAK TERLIHAT |
| Gelap (`bg-gray-900`) | Gelap (`text-gray-900`) | ❌ TIDAK TERLIHAT |

#### 3. Contoh Penggunaan Warna yang Benar

```tsx
// ✅ BENAR: Background putih, teks gelap
<Card className="bg-white border border-gray-100">
  <h3 className="text-gray-900">Judul</h3>
  <p className="text-gray-600">Deskripsi</p>
</Card>

// ✅ BENAR: Background gelap, teks terang
<section className="bg-gray-900 py-20">
  <h2 className="text-white">Judul</h2>
  <p className="text-gray-400">Deskripsi</p>
</section>

// ✅ BENAR: Background merah, teks putih
<Button className="bg-[#8B0000] text-white hover:bg-[#6B0000]">
  Tombol Merah
</Button>

// ❌ SALAH: Background putih, teks putih
<div className="bg-white text-white">
  Teks tidak terlihat!
</div>
```

#### 4. Mengubah Warna Global

Untuk mengubah warna yang digunakan di banyak tempat, edit file konfigurasi:

```typescript
// File: src/constants/site.ts

export const SITE_CONFIG = {
  name: 'KOPNUSA',
  brand: {
    primaryColor: '#8B0000',    // Warna utama (Merah Marun)
    secondaryColor: '#D4AF37',  // Warna aksen (Emas)
  },
}
```

### 🎨 Daftar Warna yang Tersedia di Tailwind:

```css
/* Warna Abu-abu */
text-gray-50   /* Sangat terang */
text-gray-100  
text-gray-200  
text-gray-300  
text-gray-400  
text-gray-500   /* Abu-abu medium */
text-gray-600  
text-gray-700  
text-gray-800  
text-gray-900   /* Sangat gelap */

/* Warna Umum */
text-red-500    /* Merah */
text-blue-500   /* Biru */
text-green-500  /* Hijau */
text-yellow-500 /* Kuning */
text-purple-500 /* Ungu */
```

---

## 5. CARA MENGEDIT KOMPONEN

### 📝 Mengedit Card

```tsx
// Contoh Card dasar
<Card className="bg-white border border-gray-100 shadow-sm">
  <CardContent className="p-6">
    <h3 className="font-semibold text-gray-900 mb-2">Judul</h3>
    <p className="text-gray-600 text-sm">Deskripsi konten...</p>
  </CardContent>
</Card>

// Menambah hover effect
<Card className="bg-white border border-gray-100 shadow-sm 
  hover:shadow-lg hover:border-gray-200 transition-all duration-300">
  ...
</Card>
```

### 📝 Mengedit Badge

```tsx
// Badge dasar
<Badge className="bg-red-100 text-[#8B0000] border-red-200">
  Label
</Badge>

// Badge dengan ikon
<Badge className="bg-amber-100 text-amber-700 border-amber-200">
  <Icon className="w-4 h-4 mr-2" />
  Label
</Badge>
```

### 📝 Mengedit Button

```tsx
// Button Primary (Merah)
<Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
  Tombol Merah
</Button>

// Button Outline
<Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-red-50">
  Tombol Outline
</Button>

// Button dengan Ikon
<Button className="bg-[#8B0000] text-white">
  <ArrowRight className="w-4 h-4 mr-2" />
  Lihat Selengkapnya
</Button>
```

---

## 6. CARA MENAMBAH HALAMAN BARU

### 📝 Langkah-langkah Membuat Halaman Baru:

#### 1. Buat Folder dan File
Buat folder baru di `src/app/` dengan nama sesuai URL yang diinginkan:

```
📁 src/app/
└── 📁 halaman-baru/        # URL: /halaman-baru
    └── 📄 page.tsx         # File wajib bernama "page.tsx"
```

#### 2. Buat Konten Halaman

```tsx
// File: src/app/halaman-baru/page.tsx

'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function HalamanBaruPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
            Label
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Judul Halaman
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Deskripsi halaman di sini...
          </p>
        </div>

        {/* Konten */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border border-gray-100">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Konten 1</h3>
              <p className="text-gray-600 text-sm">Deskripsi...</p>
            </CardContent>
          </Card>
          {/* Tambah card lainnya... */}
        </div>
      </div>
    </main>
  )
}
```

#### 3. Tambahkan ke Menu

Edit `src/components/layout/Header.tsx`:

```typescript
const menuStructure = [
  // ... menu yang ada
  { 
    label: 'Halaman Baru', 
    href: '/halaman-baru' 
  },
]
```

---

## 7. TIPS & TROUBLESHOOTING

### ⚠️ Masalah Umum dan Solusinya:

#### 1. Teks Tidak Terlihat
**Masalah:** Teks tidak terlihat karena warna mirip dengan background.

**Solusi:** Pastikan kontras warna benar:
```tsx
// ❌ SALAH
<div className="bg-white text-gray-100">Teks tidak terlihat</div>

// ✅ BENAR
<div className="bg-white text-gray-900">Teks terlihat jelas</div>
```

#### 2. Menu Tidak Muncul
**Masalah:** Menu baru tidak muncul setelah ditambah.

**Solusi:** 
- Pastikan syntax benar (kurung, koma, dll)
- Refresh browser (Ctrl+F5)
- Cek console untuk error

#### 3. Halaman Error 404
**Masalah:** Halaman baru menghasilkan error 404.

**Solusi:**
- Pastikan nama folder dan file benar (`page.tsx`)
- Pastikan ada `'use client'` di baris pertama jika menggunakan interaktivitas

#### 4. Styling Tidak Berubah
**Masalah:** Perubahan CSS tidak muncul.

**Solusi:**
- Clear cache browser (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Restart development server

### 💡 Tips Penting:

1. **Selalu Backup** - Simpan copy file sebelum mengedit besar
2. **Test di Mobile** - Gunakan responsive mode di browser (F12 > Toggle Device)
3. **Perhatikan Penulisan** - TypeScript sensitif terhadap huruf besar/kecil
4. **Gunakan Auto-format** - Tekan Shift+Alt+F di VS Code untuk merapikan kode

### 📚 Referensi Cepat:

| Yang Ingin Dilakukan | Lokasi File |
|---------------------|-------------|
| Ubah nama/logo website | `src/constants/site.ts` |
| Ubah menu navigasi | `src/components/layout/Header.tsx` |
| Ubah footer | `src/components/layout/Footer.tsx` |
| Ubah halaman beranda | `src/app/page.tsx` |
| Ubah hero section | `src/components/sections/Hero.tsx` |
| Tambah halaman baru | `src/app/[nama-folder]/page.tsx` |

---

## 🎉 SELAMAT!

Anda telah menyelesaikan tutorial lengkap untuk mengedit website KNMP. 

Jika ada pertanyaan lebih lanjut, silakan lihat file-file yang sudah ada sebagai contoh, atau hubungi tim developer.

---

**Dibuat dengan ❤️ untuk Kemajuan Desa Indonesia**

© 2026 KNMP - Koperasi Nusantara Merah Putih
