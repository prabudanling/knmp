# 📜 PRD (PRODUCT REQUIREMENTS DOCUMENT)
## KMN BERDIKARI — Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih Indonesia
### Website: https://kopnusa.id | Versi Dokumen: 3.0.0 | Tahun: 2026

---

> **Penulis:** Master Polymath — The Ultimate Problem Solver, Sage Universal + Spectrum8
>
> **Peran Spectrum8:**
> 1. 🏗️ Website Quality Auditor & Reviser (Web Caretaker)
> 2. 🎨 Digital Color Harmony Specialist (Web Color Stylist)
> 3. 🧩 End-to-End UI/UX Architect (Full-Cycle Product Designer)
> 4. 👁️ Visual Comfort & Accessibility Expert (Eye-Ease Colorist)
> 5. 📐 Content Layout Maestro (Web Layout Artist)
> 6. 🖼️ End-to-End Art Curator (Spectrum Artist)
> 7. ✍️ Clarity Wordsmith (UX Copy Genius)
> 8. 🌍 Tourism & Investment Domain Strategist (DestiVest Sage)

---

# 📚 BAGIAN 0: KAMUS ISTILAH (Supaya Kamu Ngerti Semua!)

> Bayangkan kamu anak SMP yang baru pertama kali dengar tentang website koperasi. Ini kamusnya!

| Istilah | Arti Sederhana | Contoh |
|---------|----------------|--------|
| **PRD** | Product Requirements Document — semacam "rencana bangunan" sebelum membangun rumah | Kayak blueprint rumah, tapi untuk website |
| **Koperasi** | Organisasi orang-orang yang bergotong-royong untuk kepentingan bersama | Kayak arisan, tapi lebih besar dan resmi |
| **KPA** | Kelompok Anggota — pengelompokan anggota berdasarkan jenis pekerjaannya | Petani, Pedagang, Koperasi, Pekerja, Konsumen |
| **Tier** | Tingkatan keanggotaan — semacam level di game | Tier 1 = Level Pemula, Tier 7 = Level Master |
| **SHU** | Sisa Hasil Usaha — laba koperasi yang dibagi ke anggota | Kayak bonus akhir tahun di kantor |
| **NIAK** | Nomor Induk Anggota Koperasi — nomor unik tiap anggota | Kayak NISN di sekolah, tapi untuk koperasi |
| **Pendaftaran** | Proses daftar jadi anggota | Kayak daftar sekolah |
| **Midtrans** | Jasa pembayaran online (payment gateway) | Kayak kasir di toko, tapi online |
| **Snap Token** | Kode unik untuk membayar via Midtrans | Kayak nomor virtual account |
| **RAT** | Rapat Anggota Tahunan — pertemuan tahunan seluruh anggota | Kayak upacara bendera tahunan, tapi untuk koperasi |
| **Korwil/Korda/Korcam/Kordes** | Koordinator di tingkat Provinsi/Kabupaten/Kecamatan/Desa | Kayak ketua OSIS tingkat provinsi, kabupaten, dll |
| **Pilar Kampung** | 9 program utama koperasi yang saling terhubung | 9 "gedung" dalam satu "kota" koperasi |
| **Marketplace** | Toko online di dalam website koperasi | Kayak Tokopedia, tapi khusus anggota |
| **Smart Village** | Desa cerdas yang dikelola dengan teknologi | Desa yang punya WiFi, sensor pertanian, dll |
| **Nusa Futuristik** | Konsep kota masa depan Indonesia | Kayak kota dalam film sci-fi, tapi nyata |
| **UI/UX** | User Interface / User Experience — tampilan dan pengalaman pemakaian | UI = wajah website, UX = perasaan saat pakai |
| **Responsive** | Website bisa tampil bagus di HP maupun laptop | Website yang nggak rusak saat dibuka di HP |
| **SEO** | Search Engine Optimization — cara biar muncul di Google | Kayak daftar di buku telepon Google |
| **Aksesibilitas** | Website bisa dipakai semua orang termasuk penyandang disabilitas | Kayak jalan yang ada ram untuk kursi roda |
| **API** | Application Programming Interface — cara dua program berkomunikasi | Kayak penerjemah antara website dan database |
| **Prisma** | Alat untuk mengatur database (penyimpanan data) | Kayak lemari arsip yang rapi |
| **Framer Motion** | Library untuk membuat animasi di website | Kayak software animasi untuk website |
| **shadcn/ui** | Kumpulan komponen UI siap pakai | Kayak balok LEGO yang sudah jadi |
| **RBAC** | Role-Based Access Control — siapa boleh akses apa | Kayak kunci kartu hotel — tamu biasa vs VIP |
| **Interlink** | Hubungan antar Pilar yang saling mendukung | Kayak jembatan antar gedung |
| **Franchise** | Hak usaha yang bisa "disewa" oleh anggota | Kayak waralaba Indomaret |
| **Simpanan** | Uang yang disimpan anggota di koperasi | Kayak tabungan, tapi di koperasi |
| **Glassmorphism** | Efek kaca buram transparan di desain | Kayak kaca shower yang buram |
| **CTA** | Call to Action — tombol yang mengajak pengunjung melakukan sesuatu | Tombol "Daftar Sekarang!" |
| **Luhn Algorithm** | Rumus matematika untuk mengecek nomor valid atau tidak | Kayal rumus cek NIAK palsu atau asli |

---

# 📖 BAGIAN 1: PENDAHULUAN — APA ITU KNMP?

## 1.1 Cerita di Balik KNMP

Bayangkan Indonesia punya **83.763 desa**. Setiap desa punya petani, pedagang, nelayan, pekerja, dan konsumen. Mereka semua butuh:
- Tempat jualan (**marketplace**)
- Pinjaman modal (**simpanan & kredit**)
- Pelatihan (**academy**)
- Pengiriman barang (**logistik**)
- Bantuan hukum (**advokasi**)

Tapi selama ini, mereka **terpisah-pisah**. Petani di Aceh nggak kenal pedagang di Papua. Nelayan di Sulawesi nggak bisa jual ikan langsung ke konsumen di Jakarta.

**KNMP hadir untuk menyatukan mereka semua.**

KNMP = **Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih Indonesia**

Mari kita bedah namanya:
- **Koperasi** = Gotong royong bisnis
- **Korporasi** = Skala besar, profesional
- **Multipihak** = Banyak pihak (petani, pedagang, pekerja, investor, konsumen)
- **Nusa** = Indonesia (nusantara)
- **Berdikari** = Berdiri sendiri, mandiri
- **Merah Putih** = Indonesia!
- **Indonesia** = Dari Sabang sampai Merauke

## 1.2 Visi Besar

> **"Membangun Peradaban Ekonomi Digital Indonesia yang Berdaulat, Berkeadilan, dan Berkelanjutan"**

Artinya: Indonesia punya ekonomi digital SENDIRI yang:
- **Berdaulat** = Nggak tergantung asing
- **Berkeadilan** = Semua orang dapat bagian yang adil
- **Berkelanjutan** = Bisa terus jalan selamanya

## 1.3 Misi (8 Misi Utama)

| # | Misi | Penjelasan Sederhana |
|---|------|---------------------|
| 1 | Membangun ekosistem koperasi digital terintegrasi | Bikin "kota digital" lengkap untuk koperasi |
| 2 | Memberdayakan 83.763 desa melalui Smart Village | Setiap desa punya teknologi canggih |
| 3 | Menghubungkan 5 KPA dalam Pentagon Kedaulatan | 5 kelompok saling mendukung |
| 4 | Menjalankan 9 Pilar Kampung secara interlink | 9 program yang saling terhubung |
| 5 | Mewujudkan distribusi SHU yang adil dan transparan | Bagi laba secara adil, bisa dilihat semua anggota |
| 6 | Membangun marketplace koperasi terbesar di Indonesia | Toko online terbesar milik rakyat |
| 7 | Mengembangkan Nusa Futuristik di 38 provinsi | Kota masa depan di seluruh Indonesia |
| 8 | Menjadi koperasi terbesar di dunia pada 2045 | Target: lebih besar dari Mondragon (Spanyol) |

## 1.4 Angka-Angka Besar (Target)

| Metrik | Angka | Penjelasan |
|--------|-------|------------|
| Total Desa | 83.763 | Seluruh desa di Indonesia |
| Provinsi | 38 | Termasuk provinsi baru |
| Target Anggota | 10.000.000 | 10 juta orang |
| Target Transaksi | Rp 2.000 Triliun | Per tahun pada 2045 |
| Negara Ekspor | 195 | Seluruh negara di dunia |
| 9 Pilar Kampung | 211 Program | Program terinterlink |
| 5 KPA | 6 Kelompok | Termasuk Investor |
| 7 Tier | Rp100rb - Rp1M | Dari Basic sampai Executive |

---

# 🏗️ BAGIAN 2: ARSITEKTUR WEBSITE — BAGAIMANA WEBSITE INI DIBANGUN?

## 2.1 Teknologi yang Dipakai (Tech Stack)

Bayangkan membangun rumah. Kamu butuh:
- **Bata & Semen** = Framework (Next.js)
- **Cat & Dekorasi** = Styling (Tailwind CSS)
- **Perabotan** = Komponen (shadcn/ui)
- **Listrik & Pipa** = Database (Prisma + SQLite)
- **Kunci Pintu** = Keamanan (Auth)
- **Kasir** = Pembayaran (Midtrans)
- **Surat** = Email (Resend)

### Detail Tech Stack

| Kategori | Teknologi | Versi | Fungsi |
|----------|-----------|-------|--------|
| **Framework** | Next.js (App Router) | 16.1.x | "Tulang belakang" website |
| **Bahasa** | TypeScript | 5.x | Bahasa yang punya "aturan ketat" supaya nggak salah |
| **Styling** | Tailwind CSS | 4.0 | "Cat tembok" yang cepat dipakai |
| **Komponen UI** | shadcn/ui (New York) | Latest | "Perabotan" siap pakai |
| **Animasi** | Framer Motion | 12.x | Membuat gerakan indah di website |
| **Ikon** | Lucide React | 0.525.x | Gambar-gambar kecil (panah, hati, dll) |
| **Database** | Prisma ORM + SQLite | 6.x | "Lemari arsip" data |
| **Autentikasi** | NextAuth.js | 4.x | "Satpam" website |
| **Pembayaran** | Midtrans Client | 1.4.x | "Kasir online" |
| **Email** | Resend | 6.x | "Tukang pos" digital |
| **Grafik** | Recharts | 2.x | Membuat grafik & diagram |
| **Form** | React Hook Form + Zod | 7.x / 4.x | Formulir yang "pintar" mengecek kesalahan |
| **State** | Zustand + TanStack Query | 5.x / 5.x | "Memori" website |
| **Drag & Drop** | @dnd-kit | 6.x / 10.x | Seret & lepas barang |
| **Editor** | MDX Editor | 3.x | Editor tulisan yang kaya fitur |
| **Image** | Sharp | 0.34.x | Proses gambar (resize, compress) |

## 2.2 Struktur Folder (Kayak Denah Rumah)

```
my-project/
├── 📂 prisma/                    → Skema database (kayak denah lemari arsip)
│   ├── schema.prisma             → Daftar semua "laci" dan isinya (22 model)
│   └── seed.ts                   → Data awal yang diisi saat pertama kali
│
├── 📂 src/
│   ├── 📂 app/                   → Halaman-halaman website
│   │   ├── page.tsx              → Halaman utama (homepage)
│   │   ├── layout.tsx            → "Kerangka" semua halaman (header, footer)
│   │   ├── globals.css           → Gaya global (warna, font, animasi)
│   │   │
│   │   ├── 📂 daftar/            → Halaman pendaftaran anggota
│   │   ├── 📂 membership/        → Halaman tingkatan keanggotaan
│   │   ├── 📂 pimpinan/          → Halaman struktur pimpinan
│   │   │   ├── kornas/           → Koordinator Nasional
│   │   │   ├── korwil/           → Koordinator Wilayah (Provinsi)
│   │   │   ├── korda/            → Koordinator Daerah (Kabupaten)
│   │   │   ├── korcam/           → Koordinator Kecamatan
│   │   │   └── kordes/           → Koordinator Desa
│   │   ├── 📂 tentang/           → Halaman tentang koperasi
│   │   │   └── dewan-pendiri/    → Dewan Pendiri (17 orang)
│   │   ├── 📂 faq/               → Pertanyaan yang sering ditanyakan
│   │   ├── 📂 kontak/            → Halaman kontak
│   │   ├── 📂 marketplace/       → Toko online
│   │   ├── 📂 shu/               → Sisa Hasil Usaha (bagi hasil)
│   │   ├── 📂 login/             → Masuk ke akun
│   │   ├── 📂 dashboard/         → Dashboard anggota
│   │   ├── 📂 admin/             → Dashboard admin
│   │   ├── 📂 struktur-organisasi/ → Struktur organisasi
│   │   ├── 📂 visi-misi/         → Visi dan misi
│   │   ├── 📂 kpa/               → Kelompok Anggota (5 KPA)
│   │   ├── 📂 unit-usaha/        → 11 Unit Usaha
│   │   ├── 📂 logistik/          → Jasa pengiriman
│   │   ├── 📂 smart-village/     → Desa Cerdas
│   │   ├── 📂 integrasi-desa/    → Integrasi desa
│   │   ├── 📂 rat/               → Rapat Anggota Tahunan
│   │   ├── 📂 kode-etik/         → Kode etik
│   │   ├── 📂 anggaran-dasar/    → Anggaran dasar
│   │   ├── 📂 anggaran-rumah-tangga/ → Anggaran rumah tangga
│   │   ├── 📂 kebijakan-privasi/ → Kebijakan privasi
│   │   ├── 📂 syarat-ketentuan/  → Syarat & ketentuan
│   │   ├── 📂 disclaimer/        → Disclaimer
│   │   ├── 📂 academy/           → Akademi pelatihan
│   │   ├── 📂 nusa-futuristik/   → Kota masa depan
│   │   │   ├── 📂 provinsi/      → Tingkat provinsi
│   │   │   ├── 📂 kota/          → Tingkat kota
│   │   │   ├── 📂 kecamatan/     → Tingkat kecamatan
│   │   │   └── 📂 desa/          → Tingkat desa
│   │   ├── 📂 pilar/             → 9 Pilar Kampung
│   │   │   └── [slug]/           → Halaman tiap pilar
│   │   │
│   │   └── 📂 api/               → API (jembatan data)
│   │       ├── 📂 auth/          → Login, register, logout
│   │       ├── 📂 pendaftaran/   → Proses pendaftaran
│   │       ├── 📂 tiers/         → Data tingkatan
│   │       ├── 📂 public/        → Data publik
│   │       ├── 📂 midtrans/      → Pembayaran
│   │       ├── 📂 niak/          → Nomor anggota
│   │       ├── 📂 health/        → Cek kesehatan server
│   │       └── 📂 admin/         → API khusus admin
│   │           ├── 📂 dashboard/ → Statistik dashboard
│   │           ├── 📂 pendaftaran/ → Kelola pendaftaran
│   │           ├── 📂 members/   → Kelola anggota
│   │           ├── 📂 payments/  → Kelola pembayaran
│   │           ├── 📂 shu/       → Kelola SHU
│   │           ├── 📂 announcements/ → Pengumuman
│   │           ├── 📂 settings/  → Pengaturan
│   │           └── 📂 activity-logs/ → Log aktivitas
│   │
│   ├── 📂 components/            → Komponen-komponen yang bisa dipakai ulang
│   │   ├── 📂 ui/                → Komponen dasar (tombol, kartu, dll)
│   │   ├── 📂 layout/            → Header, Footer
│   │   ├── 📂 sections/          → Bagian-bagian halaman utama
│   │   └── 📂 pilar/             → Komponen khusus pilar
│   │
│   ├── 📂 lib/                   → Fungsi-fungsi pembantu
│   │   ├── db.ts                 → Koneksi database
│   │   ├── auth.ts               → Keamanan (login, token)
│   │   ├── midtrans.ts           → Pembayaran
│   │   ├── niak.ts               → Nomor anggota
│   │   ├── permissions.ts        → Siapa boleh akses apa
│   │   ├── resend.ts             → Kirim email
│   │   ├── utils-server.ts       → Fungsi pembantu server
│   │   └── utils.ts              → Fungsi pembantu umum
│   │
│   ├── 📂 constants/             → Data tetap yang nggak berubah
│   │   ├── site.ts               → Konfigurasi website
│   │   ├── colors.ts             → Semua warna
│   │   └── index.ts              → Pengumpul semua constants
│   │
│   ├── 📂 data/                  → Data statis
│   │   ├── mocks/                → Data contoh (sementara)
│   │   ├── pilarPrograms.ts      → Program 9 Pilar
│   │   └── founders.ts           → Data pendiri
│   │
│   ├── 📂 types/                 → Tipe data TypeScript
│   │   └── index.ts              → Semua tipe data
│   │
│   ├── 📂 services/              → Layanan API
│   │   └── api/                  → Client-side API service
│   │
│   └── 📂 hooks/                 → React hooks
│       ├── use-toast.ts          → Notifikasi toast
│       └── use-mobile.ts         → Deteksi HP/desktop
│
├── 📂 public/                    → File statis (gambar, ikon)
│   ├── 📂 images/people/         → Foto orang (SVG)
│   ├── logo-knmp.png             → Logo utama
│   ├── logo-knmp-v2.png          → Logo versi 2
│   ├── logo.svg                  → Logo SVG
│   ├── favicon.ico               → Ikon tab browser
│   └── robots.txt                → Petunjuk untuk Google
│
├── 📂 db/                        → File database
│   └── custom.db                 → Database SQLite
│
└── 📂 upload/                    → File yang diupload pengguna
```

## 2.3 Database Schema (22 Model = 22 "Laci")

Bayangkan database itu kayak **lemari arsip raksasa** dengan 22 laci. Setiap laci menyimpan jenis data berbeda:

### Laci Inti (Yang Paling Penting)

| # | Nama Laci | Isinya | Penjelasan |
|---|-----------|--------|------------|
| 1 | **User** | Nama, email, password, NIAK, tier, KPA | Data seluruh anggota |
| 2 | **Tier** | 7 tingkatan + harga + manfaat | Data level keanggotaan |
| 3 | **KPA** | 5 kelompok + kekuatan suara | Data kelompok anggota |
| 4 | **Pendaftaran** | Data pendaftaran baru + status | Data orang yang mau jadi anggota |
| 5 | **Payment** | Pembayaran + Midtrans + VA | Data uang yang masuk |

### Laci Organisasi

| # | Nama Laci | Isinya | Penjelasan |
|---|-----------|--------|------------|
| 6 | **Jabatan** | Posisi pimpinan + status | Siapa duduk di posisi apa |
| 7 | **DewanPendiri** | 17 pendiri + posisi | Orang-orang yang mendirikan |
| 8 | **KoordinatorBidang** | 17 bidang + ketua + sekretaris | Penanggung jawab tiap bidang |
| 9 | **Korwil** | 8 kawasan + panglima | Koordinator wilayah |

### Laci Bisnis

| # | Nama Laci | Isinya | Penjelasan |
|---|-----------|--------|------------|
| 10 | **Product** | Produk marketplace + harga + stok | Barang yang dijual |
| 11 | **Order** | Pesanan + pengiriman | Transaksi jual-beli |
| 12 | **OrderItem** | Detail item per pesanan | Barang apa yang dipesan |
| 13 | **Transaction** | Transaksi keuangan | Arus uang |
| 14 | **Member** | Profil bisnis anggota | Data usaha anggota |

### Laci SHU & Keuangan

| # | Nama Laci | Isinya | Penjelasan |
|---|-----------|--------|------------|
| 15 | **SHUConfig** | Konfigurasi SHU per tahun | Aturan bagi hasil |
| 16 | **SHUDistribution** | Distribusi SHU per anggota | Berapa bagian tiap orang |

### Laci Sistem

| # | Nama Laci | Isinya | Penjelasan |
|---|-----------|--------|------------|
| 17 | **Session** | Token login + kadaluarsa | Bukti bahwa user sudah login |
| 18 | **VerificationToken** | Token verifikasi email | Bukti untuk cek email |
| 19 | **NIAKSequence** | Nomor urut NIAK | Supaya NIAK nggak kembar |
| 20 | **Setting** | Konfigurasi website | Pengaturan website |
| 21 | **ActivityLog** | Log semua aktivitas | Catatan apa yang dilakukan siapa |
| 22 | **Notification** | Notifikasi untuk anggota | Pesan-pesan untuk anggota |
| 23 | **Announcement** | Pengumuman resmi | Berita resmi dari koperasi |
| 24 | **FAQ** | Pertanyaan & jawaban | Yang sering ditanyakan |
| 25 | **SupportTicket** | Tiket bantuan | Kalau ada yang butuh bantuan |
| 26 | **MemberCard** | Kartu anggota digital | Kartu identitas digital |
| 27 | **Document** | Dokumen resmi | File-file penting |
| 28 | **Provinsi** | 34 provinsi | Data wilayah |
| 29 | **KabKota** | Kabupaten & kota | Data wilayah detail |

---

# 🎨 BAGIAN 3: DESIGN SYSTEM — WARNA, FONT, DAN TAMPILAN

## 3.1 Filosofi Warna

> **Warna itu bahasa.** Setiap warna berbicara kepada mata dan hati pengunjung. Bayangkan warna itu kayak "suara" website — hijau berbicara tentang kemakmuran, merah tentang keberanian, emas tentang kemuliaan.

### Warna Utama (3 Warna Brand)

| Warna | Kode Hex | Nama | Arti | Digunakan Untuk |
|-------|----------|------|------|-----------------|
| 🟢 **Hijau PPP** | `#008F3D` | Primary Green | Kemakmuran, pertumbuhan, kehidupan | Tombol utama, link, badge positif |
| 🔴 **Merah Tua** | `#8B0000` | Secondary Maroon | Keberanian, pengorbanan, nasionalisme | Judul seksi, tombol sekunder, aksen |
| 🟡 **Emas** | `#D4AF37` | Luxury Gold | Kemuliaan, kemewahan, prestasi | Badge premium, garis dekoratif, animasi |

**Kenapa 3 warna ini?**
- **Hijau** = Warna bendera Indonesia (bagian bawah) + warna pertanian
- **Merah** = Warna bendera Indonesia (bagian atas) + warna keberanian
- **Emas** = Warna bintang di bendera + warna kejayaan Nusantara

### Palet Warna Lengkap (Skala 50-950)

Setiap warna punya **11 tingkatan kegelapan** (50 = paling terang, 950 = paling gelap). Ini kayak gradasi warna dari pagi sampai malam:

**Hijau Primary:**
| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| #f0fdf4 | #dcfce7 | #bbf7d0 | #86efac | #4ade80 | #22c55e | #16a34a | #008F3D | #166534 | #14532d | #052e16 |

**Merah Secondary:**
| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| #fef2f2 | #fee2e2 | #fecaca | #fca5a5 | #f87171 | #ef4444 | #dc2626 | #8B0000 | #991b1b | #7f1d1d | #450a0a |

### Warna 7 Tier Keanggotaan

> Setiap tier punya warna sendiri, kayak warna sabuk di taekwondo!

| Tier | Nama | Warna | Hex | Analogi |
|------|------|-------|-----|---------|
| T1 | Warga Digital | ⚪ Abu-abu | `#6B7280` | Sabuk putih — baru mulai |
| T2 | Anggota Dasar | 🟢 Hijau Muda | `#10B981` | Sabuk kuning — mulai belajar |
| T3 | Mitra Desa (KORDES) | 🔵 Biru Langit | `#0EA5E9` | Sabuk hijau — bisa mengajar desa |
| T4 | Mitra Kecamatan (KORCAM) | 🟣 Ungu | `#7C3AED` | Sabuk biru — pimpin kecamatan |
| T5 | Mitra Kabupaten (KORDA) | 🩷 Pink | `#DB2777` | Sabuk merah — pimpin kabupaten |
| T6 | Mitra Provinsi (KORWIL) | 🟠 Emas Perunggu | `#B7791F` | Sabuk hitam — pimpin provinsi |
| T7 | Mitra Nasional (KORNAS) | 🔴 Merah | `#C81E1E` | Sabuk hitam dan — pimpin nasional |

### Warna 5 KPA

| KPA | Nama | Warna | Hex |
|-----|------|-------|-----|
| KPA 1 | Petani/Produsen | 🌾 Hijau | `#22C55E` |
| KPA 2 | Pelaku UMKM | 🏪 Biru | `#3B82F6` |
| KPA 3 | Koperasi | 🤝 Ungu | `#8B5CF6` |
| KPA 4 | Pekerja/Buruh | 👷 Kuning | `#F59E0B` |
| KPA 5 | Konsumen | 🛒 Merah | `#EF4444` |

### Warna 8 Zona Marketplace

| Zona | Warna | Hex |
|------|-------|-----|
| AGRI (Pertanian) | Hijau | `#22C55E` |
| RETAIL (UMKM) | Biru | `#3B82F6` |
| LOGISTICS (Logistik) | Oranye | `#F97316` |
| DIGITAL (Digital) | Cyan | `#06B6D4` |
| HEALTH (Kesehatan) | Pink | `#EC4899` |
| SPIRITUAL (Spiritual) | Ungu | `#8B5CF6` |
| EXPORT (Ekspor) | Emas | `#D4AF37` |
| ENERGY (Energi) | Merah | `#EF4444` |

## 3.2 Tipografi (Font)

| Elemen | Font | Ukuran | Berat |
|--------|------|--------|-------|
| Judul Besar (H1) | Inter | 48-72px | Bold (700) |
| Judul Sedang (H2) | Inter | 36-48px | Semibold (600) |
| Judul Kecil (H3) | Inter | 24-30px | Semibold (600) |
| Paragraf | Inter | 16-18px | Regular (400) |
| Kecil/Caption | Inter | 12-14px | Medium (500) |
| Tombol | Inter | 14-16px | Semibold (600) |
| Angka Statistik | Inter | 48-64px | Bold (700) |

## 3.3 Efek Visual (Yang Bikin Website Keren)

| Efek | Nama CSS | Penjelasan Sederhana |
|------|----------|---------------------|
| **Kaca Buram** | `.glass` | Kayak kaca shower yang buram — bisa lihat tapi nggak jelas |
| **Kaca Putih** | `.glass-white` | Kaca buram dengan latar belakang putih |
| **Kaca Hijau** | `.glass-green` | Kaca buram dengan aksen hijau |
| **Cahaya Hijau** | `.glow-green` | Efek cahaya hijau di sekitar elemen |
| **Cahaya Merah** | `.glow-maroon` | Efek cahaya merah di sekitar elemen |
| **Cahaya Lembut** | `.glow-soft` | Cahaya lembut, nggak menyilaukan |
| **Mengambang** | `.animate-float` | Elemen seperti melayang di udara |
| **Denyut Nadi** | `.animate-pulse-slow` | Berkedip pelan kayak detak jantung |
| **Gradien Bergerak** | `.animate-gradient` | Warna yang bergerak perlahan |
| **3D Tilt** | Framer Motion | Kartu yang miring mengikuti gerakan mouse |
| **Partikel** | Custom | Bintik-bintik kecil yang melayang |
| **Emas Berkedip** | Custom | Efek cahaya emas yang berkedip |

## 3.4 Komponen UI yang Tersedia

> Kayak LEGO blocks — potongan-potongan yang bisa disusun jadi apapun!

| Komponen | Fungsi | Di Mana Dipakai |
|----------|--------|-----------------|
| Button | Tombol klik | Di mana-mana |
| Card | Kartu informasi | Homepage, dashboard |
| Dialog | Jendela pop-up | Modal, konfirmasi |
| Sheet | Panel samping | Navigasi mobile |
| Tabs | Tab pemilih | Dashboard, profil |
| Table | Tabel data | Admin panel |
| Form | Formulir input | Pendaftaran, login |
| Input | Kolom tulis | Formulir |
| Select | Pilihan dropdown | Filter, pilihan |
| Badge | Lencana kecil | Status, kategori |
| Avatar | Foto profil | User, pendiri |
| Accordion | Lipat-buka | FAQ |
| Carousel | Geser-geser gambar | Testimoni, produk |
| Progress | Bar kemajuan | Statistik, langkah |
| Skeleton | Kerangka loading | Saat data masih loading |
| Toast | Notifikasi kecil | Feedback aksi |
| Tooltip | Info tambahan | Penjelasan ikon |
| Chart | Grafik | Dashboard |
| Calendar | Kalender | Jadwal, RAT |
| Command | Pencarian cepat | Navigasi |

---

# 🏠 BAGIAN 4: HALAMAN PER HALAMAN — DETAIL LENGKAP

## 4.1 Homepage (`/`)

> Homepage itu kayak **pintu depan rumah**. Kalau pintunya menarik, orang mau masuk. Kalau jelek, orang pergi.

### Urutan Seksi (Dari Atas ke Bawah)

| # | Seksi | Nama Komponen | Baris Kode | Tujuan |
|---|-------|---------------|------------|--------|
| 1 | **Hero** | Hero.tsx | 1.369 | Memukau pengunjung saat pertama kali datang |
| 2 | **Visi Misi** | VisiMisiSection.tsx | 876 | Menjelaskan arah dan cita-cita |
| 3 | **Statistik** | StatsSection.tsx | 845 | Membuktikan besarnya visi dengan angka |
| 4 | **9 Pilar** | PilarSection.tsx | 1.281 | Menunjukkan 9 program utama |
| 5 | **Pentagon Kedaulatan** | KPASection.tsx | 1.196 | Menjelaskan 5 kelompok anggota |
| 6 | **Unit Usaha** | UnitUsahaSection.tsx | 244 | Menampilkan 11 bisnis |
| 7 | **Marketplace** | MarketplaceSection.tsx | 261 | Mengajak belanja |
| 8 | **Logistik** | LogistikSection.tsx | 318 | Menawarkan jasa kirim |
| 9 | **Smart Village** | SmartVillageSection.tsx | 399 | Memperlihatkan desa masa depan |
| 10 | **Cara Kerja** | HowItWorks.tsx | 172 | 5 langkah bergabung |
| 11 | **Testimoni** | TestimonialsSection.tsx | 135 | Membuktikan dari anggota nyata |
| 12 | **FAQ** | FAQSection.tsx | 138 | Menjawab pertanyaan umum |
| 13 | **CTA** | CTASection.tsx | 133 | Mengajak: "Daftar Sekarang!" |

### Detail Seksi Hero (Yang Paling Penting!)

**Hero itu kayak poster raksasa di dinding depan toko.** Kalau posternya keren, orang mau masuk toko.

**Elemen-elemen Hero:**
1. **Partikel Mewah** — 35 bintik warna-warni yang melayang perlahan
2. **Ikon Orbit** — Gambar-gambar yang berputar mengelilingi pusat
3. **4 Kartu Statistik 3D** — Kartu yang miring mengikuti mouse:
   - 83.763 Desa
   - 5 KPA
   - 9 Pilar
   - 195 Negara
4. **Bagian Simpanan** — 3 kartu 3D (Pokok, Wajib, Sukarela)
5. **Kartu "Navigasi Peradaban"** — Latar belakang merah gelap dengan aksen emas
6. **Bar Progres Scroll** — Indikator seberapa jauh pengunjung sudah scroll
7. **Kartu Kutipan** — Motto koperasi dengan bingkai emas beranimasi

### Detail Seksi 9 Pilar

> 9 Pilar itu kayak 9 gedung dalam satu kota. Setiap gedung punya fungsi berbeda, tapi semuanya saling terhubung dengan "jembatan" (interlink).

| # | Nama Pilar | Nama Sanskerta | Warna | Jumlah Program |
|---|-----------|----------------|-------|----------------|
| 1 | Kampung Pemerintahan Digital | Adhikara Jnana | 🔵 Biru | 20 |
| 2 | Kampung Modal | Adhikara Artha | 🟡 Emas | 20 |
| 3 | Kampung Industri | Adhikara Krada | 🔴 Merah | 20 |
| 4 | Kampung Pangan | Adhikara Anna | 🟢 Hijau | 25 |
| 5 | Kampung Sehat | Adhikara Roga | 🩷 Pink | 25 |
| 6 | Kampung Cerdas | Adhikara Vidya | 🟣 Ungu | 25 |
| 7 | Kampung Niaga | Adhikara Yana | 🟠 Oranye | 26 |
| 8 | Kampung Hijau | Adhikara Prakriti | 🌿 Teal | 20 |
| 9 | Kampung Wisata | Adhikara Ramya | 🩵 Sky | 30 |

**Interlink (Jembatan Antara Pilar):**
- 🟢 **Resource** (Sumber Daya) — Bahan mentah dari satu pilar ke pilar lain
- 🟡 **Capital** (Modal) — Uang mengalir antar pilar
- 🔵 **Data** (Informasi) — Data berbagi antar pilar
- 🔴 **Goods** (Barang) — Produk berpindah antar pilar
- 🟣 **Services** (Layanan) — Jasa dari satu pilar untuk pilar lain

### Detail Pentagon Kedaulatan

> Pentagon Kedaulatan itu kayak **5 pilar bangsa** yang saling menopang. Kalau satu lemah, yang lain jadi kuat karena saling mendukung.

**5 KPA dengan Kekuatan Suara:**

| KPA | Kekuatan Suara | Arti |
|-----|----------------|------|
| Petani/Produsen | 25% | Suara terbesar — mereka yang menghasilkan |
| Pelaku UMKM | 20% | Suara besar — mereka yang berdagang |
| Koperasi | 20% | Suara besar — mereka yang berorganisasi |
| Konsumen | 15% | Suara sedang — mereka yang membeli |
| Pekerja/Buruh | 10% | Suara kecil — mereka yang bekerja |
| Investor | 10% | Suara kecil — mereka yang memodali |

**Ambang Batas Voting:**
- 60% = Keputusan biasa bisa dilakukan
- 80% = Keputusan penting (ubah AD/ART)
- 80-100% = Keputusan sangat penting (pembubaran, merger)

## 4.2 Halaman Pendaftaran (`/daftar`)

> Ini kayak **formulir pendaftaran sekolah**, tapi untuk jadi anggota koperasi.

**Alur Pendaftaran (5 Langkah):**

```
Langkah 1: Pilih Tier (Tingkatan)
   ↓
Langkah 2: Isi Data Diri (Nama, Email, HP, NIK, Alamat)
   ↓
Langkah 3: Upload Dokumen (Foto KTP, Foto Diri, Foto Usaha)
   ↓
Langkah 4: Pilih Lokasi (Provinsi, Kabupaten, Kecamatan, Desa)
   ↓
Langkah 5: Pembayaran (via Midtrans — VA, QRIS, Transfer)
```

**Setelah Bayar:**
```
PENDING → SUDAH_BAYAR → DOCUMENT_REVIEW → APPROVED → ACTIVE
                                                    ↓
                                              Dapat NIAK!
```

## 4.3 Halaman Membership (`/membership`)

> Menjelaskan 7 tingkatan keanggotaan seperti menu restoran — dari yang murah sampai yang premium.

| Tier | Nama | Harga | Hak Utama |
|------|------|-------|-----------|
| T1 | Warga Digital | Rp 100.000 | Akses marketplace, pelatihan dasar |
| T2 | Anggota Dasar | Rp 250.000 | + Logistik digital, konsultasi bisnis |
| T3 | Mitra Desa | Rp 500.000 | + Hak usaha, SHU penuh, mentorship |
| T4 | Mitra Kecamatan | Rp 1.000.000 | + Ekspor, branding, legal support |
| T5 | Mitra Kabupaten | Rp 2.500.000 | + Dedicated manager, custom integration |
| T6 | Mitra Provinsi | Rp 5.000.000 | + Board meeting, strategic partnership |
| T7 | Mitra Nasional | Rp 10.000.000 | + Advisory board, equity options |

## 4.4 Halaman Pimpinan (`/pimpinan`)

> Menunjukkan siapa yang memimpin di setiap tingkatan — dari nasional sampai desa.

**5 Tingkatan Pimpinan:**

| Tingkat | Nama | Cakupan | Jumlah Posisi |
|---------|------|---------|---------------|
| 🇮🇩 Nasional | KORNAS | Seluruh Indonesia | 1 |
| 🏛️ Provinsi | KORWIL | 38 Provinsi | 38 |
| 🏢 Kabupaten | KORDA | 514 Kab/Kota | 514 |
| 🏘️ Kecamatan | KORCAM | 7.252 Kecamatan | 7.252 |
| 🏡 Desa | KORDES | 83.763 Desa | 83.763 |

## 4.5 Halaman Dashboard Anggota (`/dashboard`)

> Kayak **kamar pribadi** anggota — semua info penting ada di sini.

**Elemen Dashboard:**
- Profil anggota + NIAK
- Simpanan (Pokok, Wajib, Sukarela)
- Estimasi SHU
- Progress pelatihan
- Aktivitas terakhir
- Notifikasi

## 4.6 Halaman Dashboard Admin (`/admin`)

> Kayak **ruang kontrol** — admin bisa melihat dan mengatur semuanya.

**Fitur Admin:**
- Statistik keseluruhan (anggota, pendapatan, pertumbuhan)
- Kelola pendaftaran (approve/reject)
- Kelola pembayaran (verifikasi)
- Kelola SHU (hitung, distribusi)
- Pengumuman (buat, kirim)
- Pengaturan website
- Log aktivitas (siapa melakukan apa kapan)

## 4.7 Halaman Lainnya

| Halaman | URL | Fungsi |
|---------|-----|--------|
| Tentang | `/tentang` | Cerita tentang koperasi |
| Dewan Pendiri | `/tentang/dewan-pendiri` | 17 pendiri |
| Visi Misi | `/visi-misi` | Visi, misi, 10 dimensi |
| KPA | `/kpa` | 5 kelompok anggota |
| Struktur Organisasi | `/struktur-organisasi` | Bagan organisasi |
| Marketplace | `/marketplace` | Toko online |
| Logistik | `/logistik` | Jasa pengiriman |
| Smart Village | `/smart-village` | Desa cerdas |
| Unit Usaha | `/unit-usaha` | 11 bisnis |
| Academy | `/academy` | Pelatihan online |
| SHU | `/shu` | Bagi hasil |
| RAT | `/rat` | Rapat tahunan |
| Integrasi Desa | `/integrasi-desa` | Cara desa bergabung |
| Kode Etik | `/kode-etik` | Aturan perilaku |
| Anggaran Dasar | `/anggaran-dasar` | Konstitusi koperasi |
| Anggaran Rumah Tangga | `/anggaran-rumah-tangga` | Aturan internal |
| FAQ | `/faq` | Pertanyaan umum |
| Kontak | `/kontak` | Hubungi kami |
| Login | `/login` | Masuk akun |
| Disclaimer | `/disclaimer` | Penyangkalan |
| Kebijakan Privasi | `/kebijakan-privasi` | Privasi data |
| Syarat Ketentuan | `/syarat-ketentuan` | Aturan pemakaian |

## 4.8 Nusa Futuristik (Kota Masa Depan)

> Ini konsep paling ambisius — kota masa depan Indonesia di 4 tingkatan:

| Tingkat | Halaman | Konsep |
|---------|---------|--------|
| 🏛️ Provinsi | `/nusa-futuristik/provinsi` | Provinsi cerdas 2030 |
| 🏢 Kota | `/nusa-futuristik/kota` | Kota futuristik 2035 |
| 🏘️ Kecamatan | `/nusa-futuristik/kecamatan` | Kecamatan digital 2032 |
| 🏡 Desa | `/nusa-futuristik/desa` | Desa cerdas 2028 |

Setiap tingkat punya 7 sub-halaman:
1. Kawasan Pangan Terpadu
2. Kawasan Industri Terpadu
3. Wisata Terpadu
4. Transportasi Digital
5. Kampung Modal
6. Proyek Strategis
7. Rumah Produktif

---

# ⚙️ BAGIAN 5: SISTEM BACKEND — API & LOGIKA BISNIS

## 5.1 Autentikasi (Cara Masuk)

> Autentikasi itu kayak **penjaga pintu** — hanya orang yang punya kunci yang boleh masuk.

### Alur Login

```
User mengirim email + password
       ↓
Server cek: apakah email terdaftar?
       ↓ YA
Server cek: apakah password cocok? (SHA-256 hash)
       ↓ YA
Server cek: apakah status AKTIF? (bukan SUSPENDED/PENDING)
       ↓ YA
Server buat Session Token (berlaku 24 jam)
       ↓
User dapat token → simpan di localStorage
       ↓
Setiap request bawa token → server verifikasi
```

### 10 Tingkatan Peran (RBAC)

| Level | Role | Kekuatan |
|-------|------|----------|
| 100 | SUPER_ADMIN | Bisa semuanya — "Raja" |
| 90 | ADMIN | Bisa hampir semuanya — "Perdana Menteri" |
| 80 | KORNAS | Pimpinan nasional — "Gubernur Jenderal" |
| 70 | KORWIL | Pimpinan provinsi — "Gubernur" |
| 60 | KORDA | Pimpinan kabupaten — "Bupati" |
| 50 | KORCAM | Pimpinan kecamatan — "Camat" |
| 40 | KORDES | Pimpinan desa — "Kepala Desa" |
| 30 | KORBID | Koordinator bidang — "Kepala Dinas" |
| 20 | MEMBER | Anggota biasa — "Warga" |
| 10 | GUEST | Pengunjung — "Tamu" |

### 40+ Hak Akses (Permissions)

**Contoh:**
- `dashboard.view` — Buka dashboard
- `members.list` — Lihat daftar anggota
- `members.approve` — Setujui anggota baru
- `payments.verify` — Verifikasi pembayaran
- `shu.calculate` — Hitung SHU
- `settings.manage` — Ubah pengaturan website
- `announcements.create` — Buat pengumuman
- `audit.view` — Lihat log aktivitas

## 5.2 Sistem NIAK (Nomor Induk Anggota)

> NIAK itu kayak **NISN** (Nomor Induk Siswa Nasional), tapi untuk anggota koperasi.

### Format NIAK (16 Digit)

```
PP KK K T YY MM NNNNN C
│  │  │ │ │  │  │     │
│  │  │ │ │  │  │     └── Cek digit (Luhn algorithm)
│  │  │ │ │  │  └── Nomor urut (5 digit)
│  │  │ │ │  └── Bulan daftar (01-12)
│  │  │ │ └── Tahun daftar (2 digit terakhir)
│  │  │ └── Kode Tier (1-7)
│  │  └── Kode KPA (1-5)
│  └── Kode Kabupaten/Kota (2 digit)
└── Kode Provinsi (2 digit)
```

**Contoh:** `31 71 2 3 26 04 00001 7`
- 31 = DKI Jakarta
- 71 = Jakarta Selatan
- 2 = KPA Pelaku UMKM
- 3 = Tier 3 (Mitra Desa)
- 26 = Tahun 2026
- 04 = Bulan April
- 00001 = Anggota pertama bulan itu
- 7 = Cek digit

## 5.3 Sistem Pembayaran (Midtrans)

> Midtrans itu kayak **kasir online** — dia yang ngurus pembayaran.

### Alur Pembayaran

```
Anggota daftar → Pilih Tier → Dapat nomor pendaftaran
       ↓
Server buat transaksi di Midtrans → Dapat Snap Token
       ↓
Anggota bayar via Midtrans (VA/QRIS/Kartu Kredit/e-Wallet)
       ↓
Midtrans kirim notifikasi ke server (callback)
       ↓
Server verifikasi tanda tangan (SHA-512)
       ↓
Update status: PENDING → PAID
       ↓
Kirim email konfirmasi ke anggota
       ↓
Pendaftaran berubah: PENDING → SUDAH_BAYAR
```

### Metode Pembayaran yang Didukung

| Metode | Penjelasan |
|--------|------------|
| Virtual Account (VA) | Transfer ke nomor rekening virtual |
| QRIS | Scan QR code |
| Kartu Kredit/Debit | Bayar pakai kartu |
| e-Wallet (GoPay, ShopeePay) | Bayar pakai dompet digital |
| Bank Transfer | Transfer manual |

## 5.4 Sistem SHU (Sisa Hasil Usaha)

> SHU itu kayak **bonus akhir tahun** — laba koperasi dibagi ke semua anggota.

### Formula SHU

```
Total SHU = Rp 12.500.000.000 (contoh)

Distribusi:
├── Dana Cadangan       = 25% = Rp 3.125.000.000  (ditabung untuk darurat)
├── Jasa Usaha          = 45% = Rp 5.625.000.000  (dibagi rata ke anggota)
├── Jasa Modal          = 10% = Rp 1.250.000.000  (dibagi berdasarkan simpanan)
├── Dana Riset Teknologi = 10% = Rp 1.250.000.000 (untuk riset & inovasi)
├── Dana Sosial Peradaban = 5% = Rp 625.000.000   (untuk kegiatan sosial)
└── Insentif Manajemen  = 5% = Rp 625.000.000   (untuk pengurus)
```

### Cara Hitung SHU Per Anggota

**Jasa Usaha (45%):** Dibagi rata ke semua anggota aktif
```
SHU Jasa Usaha per orang = (45% × Total SHU) ÷ Jumlah Anggota Aktif
```

**Jasa Modal (10%):** Dibagi berdasarkan besar simpanan
```
SHU Jasa Modal per orang = (10% × Total SHU) × (Simpanan Orang Ini ÷ Total Simpanan Semua Anggota)
```

## 5.5 Sistem Email (Resend)

> Email itu kayak **surat resmi** — memberitahu anggota tentang status pendaftaran.

### 4 Template Email

| # | Template | Dipicu Saat | Isi |
|---|----------|-------------|-----|
| 1 | Pendaftaran Diterima | Pendaftaran baru berhasil | Link bayar, nomor pendaftaran |
| 2 | Pembayaran Berhasil | Pembayaran dikonfirmasi | Info selanjutnya |
| 3 | Approve + NIAK | Pendaftaran disetujui | NIAK (feeling celebratory!) |
| 4 | Reject | Pendaftaran ditolak | Alasan + link daftar ulang |

---

# 🧭 BAGIAN 6: NAVIGASI — BAGAIMANA PENGUNJUNG BERJALAN

## 6.1 Header (Navigasi Utama)

> Header itu kayak **peta** di mal — menunjukkan di mana kamu dan ke mana bisa pergi.

### Menu Desktop (6 Menu Utama)

```
🏠 Beranda                    → /
📋 Tentang ▾                  → Dropdown 5 item
   ├── Tentang Kami           → /tentang
   ├── 17 Dewan Pendiri       → /tentang/dewan-pendiri
   ├── 17 Koordinator Bidang  → /struktur-organisasi#korbid
   ├── Visi & Misi            → /visi-misi
   └── 5 KPA                  → /kpa
🌆 Nusa Futuristik ▾          → Dropdown 4 item
   ├── Provinsi Futuristik    → /nusa-futuristik/provinsi
   ├── Kota Futuristik        → /nusa-futuristik/kota
   ├── Kecamatan Digital      → /nusa-futuristik/kecamatan
   └── Desa Cerdas            → /nusa-futuristik/desa
🏛️ 9 Pilar ▾                 → Dropdown 9 item
   ├── 1. Pemerintahan Digital → /pilar/pemerintahan-digital
   ├── 2. Kampung Modal       → /pilar/kampung-modal
   ├── 3. Kampung Industri    → /pilar/kampung-industri
   ├── 4. Kampung Pangan      → /pilar/kampung-pangan
   ├── 5. Kampung Sehat       → /pilar/kampung-sehat
   ├── 6. Kampung Cerdas      → /pilar/kampung-cerdas
   ├── 7. Kampung Niaga       → /pilar/kampung-niaga
   ├── 8. Kampung Hijau       → /pilar/kampung-hijau
   └── 9. Kampung Wisata      → /pilar/kampung-wisata
👥 Pimpinan ▾                 → Dropdown 5 item
   ├── KORNAS (Nasional)      → /pimpinan/kornas
   ├── KORWIL (Provinsi)      → /pimpinan/korwil
   ├── KORDA (Kabupaten)      → /pimpinan/korda
   ├── KORCAM (Kecamatan)     → /pimpinan/korcam
   └── KORDES (Desa)          → /pimpinan/kordes
💼 Layanan ▾                  → Dropdown 5 item
   ├── Marketplace            → /marketplace
   ├── Logistik               → /logistik
   ├── Smart Village          → /smart-village
   ├── Unit Usaha             → /unit-usaha
   └── Academy                → /academy
```

### Menu Mobile (Slide dari Kanan)
- Panel lebar 88% layar
- Header hijau gradient dengan logo
- Menu yang bisa dilipat (accordion)
- Kartu CTA "Daftar Sekarang"
- Statistik mini
- Link sosial media

## 6.2 Footer (Bagian Bawah)

> Footer itu kayak **brosur** yang ditinggal di meja — info lengkap untuk yang ingin tahu lebih banyak.

**Isi Footer:**
1. **Newsletter** — Formulir langganan email
2. **Statistik Mini** — Anggota, Desa, Transaksi
3. **Link Platform** — 5 link (Marketplace, Logistik, dll)
4. **Link Koperasi** — 6 link (SHU, RAT, KPA, dll)
5. **Link Perusahaan** — 6 link (Tentang, Kontak, dll)
6. **Link Legal** — 6 link (Privasi, Syarat, Disclaimer, dll)
7. **Sertifikasi** — Badge keamanan & kualitas
8. **Sosial Media** — Instagram, YouTube, Facebook, Twitter
9. **Tombol Scroll ke Atas** — Klik untuk kembali ke atas
10. **Copyright** — © 2026 KMN BERDIKARI

---

# 🔍 BAGIAN 7: AUDIT KUALITAS — APA YANG KURANG & HARUS DIPERBAIKI

## 7.1 Temuan Kritis (Harus Diperbaiki Segera!)

> 🔴 Kayak rumah yang atapnya bocor — harus ditambal segera!

| # | Masalah | Dampak | Solusi |
|---|---------|--------|--------|
| 1 | **Password hashing pakai SHA-256** (bukan bcrypt) | Keamanan lemah — hacker bisa menebak password | Ganti ke bcrypt dengan salt rounds 12+ |
| 2 | **Session token disimpan di memori** (bukan database) | Kalau server restart, semua user logout | Pindah ke database atau Redis |
| 3 | **Password default 'password123'** di approve route | Siapapun bisa masuk dengan password itu | Generate password acak & kirim via email |
| 4 | **Tidak ada rate limiting** di API login | Brute force attack bisa menebak password | Tambah rate limiter (5 percobaan per menit) |
| 5 | **Tidak ada CSRF protection** | Serangan bisa datang dari website lain | Tambah CSRF token |
| 6 | **MIDTRANS_SERVER_KEY ada di .env** tapi belum production | Transaksi bayar nyata belum bisa | Setup production Midtrans |

## 7.2 Temuan Penting (Harus Diperbaiki Sebelum Launch)

> 🟡 Kayak cat yang mengelupas — kelihatan jelek tapi nggak bahaya

| # | Masalah | Dampak | Solusi |
|---|---------|--------|--------|
| 7 | **Komponen terlalu besar** (Hero 1369 baris, PilarSection 1281) | Susah di-maintain, loading lama | Pecah jadi sub-komponen |
| 8 | **Data mock masih dipakai** di beberapa seksi | Data nggak real/aktual | Hubungkan ke database via API |
| 9 | **Inconsistent naming** (camelCase vs snake_case) di API | Bingung developer | Standarisasi ke camelCase |
| 10 | **Duplicate API routes** (2 dashboard, 2 member list) | Waste, potensi inkonsistensi | Konsolidasi ke satu versi |
| 11 | **Forced light theme** padahal CSS dark mode ada | Nggak bisa ganti tema gelap | Aktifkan dark mode toggle |
| 12 | **Inline styles** berlebihan di komponen | Susah di-maintain | Pindah ke Tailwind classes |
| 13 | **CSS !important** overrides | Spesifisitas kacau | Refactor CSS agar tidak perlu !important |
| 14 | **Missing `text-gradient-gold`** class yang direferensikan | Error styling | Tambahkan class yang hilang |
| 15 | **EcosystemSection** tidak dipakai di homepage | Kode mati | Hapus atau integrasikan |

## 7.3 Temuan Minor (Perbaikan Kualitas)

> 🟢 Kayak rumput yang panjang — bagus kalau dirapikan

| # | Masalah | Dampak | Solusi |
|---|---------|--------|--------|
| 16 | Tidak ada unit test | Bug bisa lolos | Tambahkan testing |
| 17 | Tidak ada error boundary | Kalau error, halaman putih | Tambahkan error boundary |
| 18 | Loading state kurang konsisten | Pengalaman pengguna kurang smooth | Standarisasi skeleton loading |
| 19 | SEO bisa ditingkatkan | Kurang optimal di Google | Tambah meta tags, structured data |
| 20 | Aksesibilitas (a11y) belum lengkap | Penyandang disabilitas kesulitan | Tambah aria-label, keyboard nav |
| 21 | Tidak ada sitemap.xml | Google susah index semua halaman | Generate sitemap otomatis |
| 22 | Gambar belum di-optimize | Loading lambat | Gunakan next/image dengan blur placeholder |
| 23 | Tidak ada PWA support | Nggak bisa diinstall di HP | Tambahkan manifest + service worker |
| 24 | Copyright tahun 2026 | Kelihatan salah kalau belum 2026 | Auto-update tahun |

---

# 🎨 BAGIAN 8: REKOMENDASI DESAIN (DARI SPECTRUM8)

## 8.1 🎨 Digital Color Harmony Specialist — Harmoni Warna

### Prinsip Harmoni yang Harus Diterapkan

**60-30-10 Rule** (Aturan Emas Desain):
- **60%** Warna dominan = Putih/Abu-abu terang (latar belakang)
- **30%** Warna sekunder = Hijau PPP (elemen utama)
- **10%** Warna aksen = Emas (detail premium)

### Masalah Warna Saat Ini & Perbaikan

| Masalah | Sekarang | Seharusnya |
|---------|----------|------------|
| Terlalu banyak warna kontras | 7 warna tier + 5 warna KPA + 8 warna zona = 20 warna! | Gunakan gradasi dari 3 warna utama |
| Gradient terlalu agresif | Maroon→Green langsung | Transisi lembut via warna netral |
| Emas berlebihan | Glow emas di mana-mana | Emas hanya untuk elemen premium |
| Dark mode dipaksa mati | forcedTheme="light" | Biarkan user pilih |

### Rekomendasi Palet Revisi

**Palet Utama (Dipakai 80% waktu):**
```
Background:  #FAFAFA (putih hangat) → #F5F5F0 (krem)
Text:        #1A1A1A (hitam lembut)
Primary:     #008F3D (hijau brand)
Secondary:   #8B0000 (merah brand)
Accent:      #D4AF37 (emas premium)
```

**Palet Netral (Dipakai untuk jarak & pemisah):**
```
Gray-50:  #FAFAFA  → Background
Gray-100: #F5F5F5  → Card background
Gray-200: #E5E5E5  → Border
Gray-300: #D4D4D4  → Divider
Gray-400: #A3A3A3  → Placeholder
Gray-500: #737373  → Caption text
Gray-600: #525252  → Body text
Gray-700: #404040  → Heading text
Gray-800: #262626  → Dark heading
Gray-900: #171717  → Darkest text
```

## 8.2 👁️ Visual Comfort & Accessibility Expert — Kenyamanan Mata

### Kontras Warna (WCAG 2.1)

**Aturan:** Rasio kontras minimum:
- Teks biasa: **4.5:1** (AA) atau **7:1** (AAA)
- Teks besar: **3:1** (AA)
- Elemen UI: **3:1**

**Masalah Kontras Saat Ini:**

| Elemen | Saat Ini | Rasio | Status | Perbaikan |
|--------|----------|-------|--------|-----------|
| Teks abu-abu di putih | `#9CA3AF` on `#FFFFFF` | 2.8:1 | ❌ Gagal | Ganti ke `#6B7280` (4.6:1) |
| Teks putih di hijau muda | `#FFFFFF` on `#86EFAC` | 2.1:1 | ❌ Gagal | Ganti hijau ke `#16A34A` (4.7:1) |
| Badge emas di putih | `#D4AF37` on `#FFFFFF` | 2.9:1 | ❌ Gagal | Tambah outline atau ganti ke `#B8860B` |
| Teks merah di putih | `#8B0000` on `#FFFFFF` | 8.6:1 | ✅ Bagus | Pertahankan |

### Ukuran Target Sentuh (Touch Target)

**Aturan:** Minimum 44×44px untuk elemen yang bisa diklik

**Masalah:**
- Beberapa tombol di mobile terlalu kecil (24×24px)
- Jarak antar item menu terlalu rapat
- Checkbox dan radio button terlalu kecil

**Solusi:** Tambah padding dan jarak minimum 8px antar elemen interaktif

### Reduced Motion (Kurangi Gerakan)

**Aturan:** Hormati `prefers-reduced-motion` — beberapa orang pusing kalau terlalu banyak animasi

**Solusi:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 8.3 📐 Content Layout Maestro — Tata Letak Konten

### Grid System

**Aturan:** Gunakan grid 12 kolom dengan gutter 24px

| Breakpoint | Kolom | Gutter | Margin |
|------------|-------|--------|--------|
| Mobile (<640px) | 4 | 16px | 16px |
| Tablet (640-1024px) | 8 | 20px | 24px |
| Desktop (>1024px) | 12 | 24px | 32px |
| Wide (>1280px) | 12 | 24px | Auto (max-width: 1280px) |

### Hierarki Visual (Urutan Pentingnya)

```
1. HEADLINE (Paling Besar, Paling Tebal)
   ↓
2. SUB-HEADLINE (Lebih Kecil, Warna Berbeda)
   ↓
3. BODY TEXT (Ukuran Normal, Hitam Lembut)
   ↓
4. CAPTION (Paling Kecil, Abu-abu)
```

### White Space (Ruang Kosong)

**Aturan:** 
- Antar seksi: **80-120px** (desktop), **48-64px** (mobile)
- Antar kartu: **24px**
- Dalam kartu: **24-32px** padding
- Judul ke konten: **16px**

### Masalah Layout Saat Ini

| Masalah | Seksi | Perbaikan |
|---------|-------|-----------|
| Terlalu padat | StatsSection | Kurangi dari 6 kartu ke 4 kartu per baris |
| Inconsistent spacing | Antar seksi | Standarisasi: py-20 md:py-28 |
| Terlalu panjang scroll | Homepage (13 seksi!) | Buat "lazy load" atau gabung seksi kecil |
| Mobile layout berantakan | PilarSection SVG | Responsive SVG dengan viewBox |

## 8.4 ✍️ Clarity Wordsmith — Bahasa yang Jelas

### Prinsip Penulisan UX Copy

1. **Jelas** — Kalau bisa 1 kata, jangan 3 kata
2. **Ramah** — Kayak ngobrol dengan teman, bukan membaca undangan pernikahan
3. **Konsisten** — "Daftar" selalu "Daftar", jangan kadang "Registrasi"
4. **Aksi** — Tombol harus menyebut **aksi**, bukan keadaan

### Kamus Kata yang Konsisten

| Jangan Tulis | Tulis | Alasan |
|-------------|-------|--------|
| "Klik di sini" | "Daftar Sekarang" | Jelas aksinya apa |
| "Submit" | "Kirim" | Bahasa Indonesia |
| "Registration" | "Pendaftaran" | Bahasa Indonesia |
| "Member" | "Anggota" | Bahasa Indonesia |
| "Payment" | "Pembayaran" | Bahasa Indonesia |
| "Loading..." | "Memuat..." | Bahasa Indonesia |
| "Error" | "Terjadi kesalahan" | Bahasa Indonesia + tidak menakuti |
| "404 Not Found" | "Halaman Tidak Ditemukan" | Bahasa Indonesia |
| "Cancel" | "Batal" | Bahasa Indonesia |
| "Save" | "Simpan" | Bahasa Indonesia |
| "Delete" | "Hapus" | Bahasa Indonesia |
| "Edit" | "Ubah" | Bahasa Indonesia |

### Tombol CTA (Call to Action)

| Konteks | Tombol | Warna |
|---------|--------|-------|
| Homepage utama | "Gabung Sekarang" | Hijau |
| Pendaftaran | "Daftar Anggota" | Hijau |
| Pembayaran | "Bayar Sekarang" | Hijau |
| Login | "Masuk" | Hijau |
| Cari tahu lebih lanjut | "Pelajari Lebih Lanjut" | Ghost/Hijau outline |
| Profil | "Lihat Dashboard" | Hijau |
| Admin approve | "Setujui" | Hijau |
| Admin reject | "Tolak" | Merah |

## 8.5 🖼️ End-to-End Art Curator — Kurasi Visual

### Prinsip Kurasi Gambar

1. **Autentik** — Gunakan foto asli Indonesia, bukan stok Barat
2. **Beragam** — Tampilkan berbagai etnis, wilayah, profesi
3. **Konsisten** — Semua foto dengan filter warna yang sama
4. **Optimal** — Format WebP, ukuran responsif, lazy loading

### Kebutuhan Gambar

| Kategori | Jumlah | Ukuran | Format |
|----------|--------|--------|--------|
| Hero background | 1 | 1920×1080 | WebP |
| Pendiri foto | 17 | 400×400 | SVG/WebP |
| Produk marketplace | 50+ | 600×600 | WebP |
| Desa/Smart Village | 20+ | 1200×800 | WebP |
| Ikon kategori | 30+ | 64×64 | SVG |
| Ilustrasi seksi | 15+ | 800×600 | SVG |

### Masalah Visual Saat Ini

| Masalah | Perbaikan |
|---------|-----------|
| Foto pendiri pakai placeholder SVG | Ganti foto asli atau ilustrasi yang lebih hidup |
| Belum ada foto desa nyata | Tambahkan galeri foto desa mitra |
| Ikon kadang tidak konsisten | Standarisasi ke Lucide icons |
| SVG interlink terlalu teknis | Simplifikasi diagram untuk audiens umum |

## 8.6 🌍 Tourism & Investment Domain Strategist — Strategi Pariwisata & Investasi

### Strategi Konten Pariwisata

**Kampung Wisata (Pilar 9)** harus menjadi **magnet** yang menarik:
1. **Turis domestik** — Liburan di desa yang dikelola koperasi
2. **Turis mancanegara** — Pengalaman autentik Indonesia
3. **Investor** — Melihat peluang bisnis di desa

### Konten yang Harus Ada

| Halaman | Konten | Target Audiens |
|---------|--------|----------------|
| Kampung Wisata | Galeri foto + video 360° | Turis |
| Nusa Futuristik | Infografis investasi | Investor |
| Smart Village | Live dashboard data | Pemerintah |
| Marketplace | Produk unik daerah | Pembeli |

### Strategi SEO Pariwisata

**Keyword Target:**
- "desa wisata Indonesia"
- "koperasi wisata"
- "investasi desa Indonesia"
- "smart village Indonesia"
- "kampung wisata digital"

---

# 🚀 BAGIAN 9: ROADMAP PENGEMBANGAN — KAPAN APA DIBUAT?

## Phase 1: Fondasi (Minggu 1-4) 🔴 KRITIS

| # | Tugas | Prioritas | Estimasi |
|---|-------|-----------|----------|
| 1 | Ganti SHA-256 ke bcrypt untuk password | 🔴 Kritis | 2 jam |
| 2 | Pindahkan session ke database | 🔴 Kritis | 4 jam |
| 3 | Tambah rate limiting di login API | 🔴 Kritis | 2 jam |
| 4 | Hapus hardcoded password 'password123' | 🔴 Kritis | 1 jam |
| 5 | Tambah CSRF protection | 🔴 Kritis | 3 jam |
| 6 | Setup environment Midtrans production | 🔴 Kritis | 2 jam |
| 7 | Standarisasi naming API (camelCase) | 🟡 Penting | 4 jam |
| 8 | Konsolidasi duplicate API routes | 🟡 Penting | 3 jam |
| 9 | Perbaiki kontras warna WCAG | 🟡 Penting | 4 jam |
| 10 | Tambah error boundary | 🟡 Penting | 2 jam |

## Phase 2: Kualitas (Minggu 5-8) 🟡 PENTING

| # | Tugas | Prioritas | Estimasi |
|---|-------|-----------|----------|
| 11 | Pecah komponen besar (Hero, Pilar, KPA) | 🟡 Penting | 12 jam |
| 12 | Aktifkan dark mode toggle | 🟡 Penting | 4 jam |
| 13 | Ganti inline styles ke Tailwind classes | 🟡 Penting | 8 jam |
| 14 | Refactor CSS !important | 🟡 Penting | 4 jam |
| 15 | Hubungkan data mock ke API real | 🟡 Penting | 16 jam |
| 16 | Tambah loading state konsisten | 🟡 Penting | 4 jam |
| 17 | Optimize gambar (next/image) | 🟡 Penting | 4 jam |
| 18 | Tambah sitemap.xml | 🟡 Penting | 2 jam |
| 19 | Perbaiki mobile responsive (PilarSection) | 🟡 Penting | 6 jam |
| 20 | Standarisasi spacing antar seksi | 🟡 Penting | 3 jam |

## Phase 3: Peningkatan (Minggu 9-12) 🟢 BAGUS UNTUK PUNYA

| # | Tugas | Prioritas | Estimasi |
|---|-------|-----------|----------|
| 21 | Tambah PWA support | 🟢 Nice | 8 jam |
| 22 | Tambah unit testing | 🟢 Nice | 16 jam |
| 23 | Tambah aksesibilitas (aria-label, keyboard nav) | 🟢 Nice | 8 jam |
| 24 | Tambah structured data (JSON-LD) | 🟢 Nice | 4 jam |
| 25 | Ganti foto placeholder ke foto asli | 🟢 Nice | 8 jam |
| 26 | Tambah galeri video desa | 🟢 Nice | 8 jam |
| 27 | Implementasi notifikasi real-time | 🟢 Nice | 12 jam |
| 28 | Tambah multi-language (ID/EN) | 🟢 Nice | 16 jam |
| 29 | Performance optimization (Lighthouse 95+) | 🟢 Nice | 8 jam |
| 30 | Tambah analytics dashboard | 🟢 Nice | 8 jam |

## Phase 4: Skala (Minggu 13-24) 🔵 MASA DEPAN

| # | Tugas | Prioritas | Estimasi |
|---|-------|-----------|----------|
| 31 | Laravel backend (production API) | 🔵 Future | 160 jam |
| 32 | MySQL migration (dari SQLite) | 🔵 Future | 16 jam |
| 33 | Redis caching | 🔵 Future | 8 jam |
| 34 | WebSocket real-time (notification service) | 🔵 Future | 24 jam |
| 35 | Mobile app (React Native) | 🔵 Future | 200 jam |
| 36 | AI chatbot (LLM integration) | 🔵 Future | 40 jam |
| 37 | Blockchain verification | 🔵 Future | 80 jam |
| 38 | Carbon credit marketplace | 🔵 Future | 60 jam |

---

# 📊 BAGIAN 10: METRIK KEBERHASILAN — BAGAIMANA MENILAI BERHASIL?

## 10.1 Metrik Teknis

| Metrik | Target | Cara Ukur |
|--------|--------|-----------|
| Lighthouse Performance | > 90 | Chrome DevTools |
| Lighthouse Accessibility | 100 | Chrome DevTools |
| Lighthouse Best Practices | 100 | Chrome DevTools |
| Lighthouse SEO | > 95 | Chrome DevTools |
| First Contentful Paint | < 1.5s | Web Vitals |
| Largest Contentful Paint | < 2.5s | Web Vitals |
| Cumulative Layout Shift | < 0.1 | Web Vitals |
| Time to Interactive | < 3.0s | Web Vitals |
| Bundle Size | < 500KB | next build |
| API Response Time | < 200ms | Server logs |

## 10.2 Metrik Bisnis

| Metrik | Target | Cara Ukur |
|--------|--------|-----------|
| Pendaftaran per bulan | > 1.000 | Database query |
| Approval rate | > 80% | Database query |
| Payment success rate | > 95% | Midtrans dashboard |
| Daily active users | > 10.000 | Analytics |
| Marketplace GMV | > Rp 1M/bulan | Database query |
| SHU distribution accuracy | 100% | Audit manual |
| User satisfaction (NPS) | > 50 | Survey |
| Bounce rate | < 40% | Analytics |
| Average session duration | > 3 menit | Analytics |

## 10.3 Metrik Keamanan

| Metrik | Target | Cara Ukur |
|--------|--------|-----------|
| Zero data breach | 0 | Security audit |
| Failed login attempts | < 1% of total | Server logs |
| API error rate | < 0.1% | Server logs |
| Uptime | > 99.9% | Monitoring |
| Backup frequency | Daily | Cron job |

---

# 🧩 BAGIAN 11: USER PERSONA — SIAPA YANG PAKAI WEBSITE INI?

## Persona 1: Pak Budi — Petani Kopi 🌾

| Atribut | Detail |
|---------|--------|
| **Usia** | 45 tahun |
| **Lokasi** | Lampung |
| **Pekerjaan** | Petani kopi |
| **HP** | Android murah (RAM 2GB) |
| **Internet** | 4G kadang-kadang |
| **Tujuan** | Jual kopi langsung ke pembeli, nggak lewat tengkulak |
| **Frustrasi** | Susah cari pembeli, harga ditekan tengkulak |
| **Halaman favorit** | Marketplace, Logistik |
| **Tier** | T3 (Mitra Desa) |

## Persona 2: Bu Sri — Pengusaha Batik 🏪

| Atribut | Detail |
|---------|--------|
| **Usia** | 35 tahun |
| **Lokasi** | Solo |
| **Pekerjaan** | Pengusaha batik |
| **HP** | iPhone |
| **Internet** | WiFi + 5G |
| **Tujuan** | Ekspor batik ke luar negeri, dapat modal |
| **Frustrasi** | Birokrasi ekspor rumit, susah cari investor |
| **Halaman favorit** | Marketplace (zona EXPORT), Kampung Modal |
| **Tier** | T4 (Mitra Kecamatan) |

## Persona 3: Ahmad — Pekerja Pabrik 👷

| Atribut | Detail |
|---------|--------|
| **Usia** | 28 tahun |
| **Lokasi** | Bekasi |
| **Pekerjaan** | Operator mesin pabrik |
| **HP** | Android menengah |
| **Internet** | 4G stabil |
| **Tujuan** | Nabung, dapat SHU, beli barang murah |
| **Frustrasi** | Gaji pas-pasan, pengen punya tabungan |
| **Halaman favorit** | Marketplace (zona RETAIL), SHU |
| **Tier** | T2 (Anggota Dasar) |

## Persona 4: Ibu Ratna — Ibu Rumah Tangga 🛒

| Atribut | Detail |
|---------|--------|
| **Usia** | 40 tahun |
| **Lokasi** | Surabaya |
| **Pekerjaan** | Ibu rumah tangga |
| **HP** | Android |
| **Internet** | WiFi rumah |
| **Tujuan** | Belanja sembako murah, ikut arisan koperasi |
| **Frustrasi** | Harga sembako naik terus |
| **Halaman favorit** | Marketplace (zona AGRI), Gerai Sembako |
| **Tier** | T1 (Warga Digital) |

## Persona 5: Pak Hendra — Investor 💰

| Atribut | Detail |
|---------|--------|
| **Usia** | 55 tahun |
| **Lokasi** | Jakarta |
| **Pekerjaan** | Pengusaha / Investor |
| **HP** | iPhone Pro |
| **Internet** | WiFi cepat |
| **Tujuan** | Investasi di koperasi, dapat return bagus |
| **Frustrasi** | Nggak transparan, susah cek portofolio |
| **Halaman favorit** | SHU, Nusa Futuristik, Dashboard |
| **Tier** | T7 (Mitra Nasional) |

## Persona 6: Admin Rina — Admin Koperasi 💻

| Atribut | Detail |
|---------|--------|
| **Usia** | 30 tahun |
| **Lokasi** | Jakarta |
| **Pekerjaan** | Admin KMN BERDIKARI |
| **HP** | Laptop |
| **Internet** | WiFi kantor |
| **Tujuan** | Kelola pendaftaran, verifikasi pembayaran |
| **Frustrasi** | Proses manual, banyak data |
| **Halaman favorit** | Admin Dashboard |
| **Role** | ADMIN |

---

# 🔄 BAGIAN 12: ALUR BISNIS LENGKAP

## 12.1 Alur Pendaftaran Anggota (End-to-End)

```
[Pengunjung buka website]
       ↓
[Lihat homepage — tertarik!]
       ↓
[Klik "Gabung Sekarang"]
       ↓
[Halaman /daftar]
       ↓
[Langkah 1: Pilih Tier]
  "Saya mau jadi Mitra Desa (T3) - Rp 500.000"
       ↓
[Langkah 2: Isi Data Diri]
  Nama, Email, HP, NIK, Alamat, Jenis Kelamin
       ↓
[Langkah 3: Upload Dokumen]
  Foto KTP, Foto Diri, Foto Usaha/Pertanian
       ↓
[Langkah 4: Pilih Lokasi]
  Provinsi → Kabupaten → Kecamatan → Desa
       ↓
[Langkah 5: Pembayaran]
  Pilih metode: VA BCA / QRIS / e-Wallet
       ↓
[Dapat Snap Token dari Midtrans]
       ↓
[Bayar via Midtrans]
       ↓
[Midtrans kirim callback ke server]
       ↓
[Server verifikasi signature]
       ↓
[Update status: PENDING → SUDAH_BAYAR]
       ↓
[Kirim email "Pembayaran Berhasil"]
       ↓
[Admin review dokumen]
       ↓
[Admin APPROVE]
       ↓
[Generate NIAK otomatis]
  Contoh: 32 73 2 3 26 04 00001 5
       ↓
[Update status: APPROVED → ACTIVE]
       ↓
[Kirim email "Selamat! NIAK Anda: ..."]
       ↓
[Anggota bisa login & akses dashboard]
       ↓
[SELESAI! Anggota resmi terdaftar]
```

## 12.2 Alur Marketplace

```
[Anggota login]
       ↓
[Buka /marketplace]
       ↓
[Pilih zona: AGRI / RETAIL / DIGITAL / dll]
       ↓
[Pilih produk]
       ↓
[Lihat detail: harga, stok, penjual, sertifikasi]
       ↓
[Tambah ke keranjang]
       ↓
[Checkout]
       ↓
[Pilih alamat pengiriman]
       ↓
[Pilih kurir (J&T, JNE, SiCepat)]
       ↓
[Bayar via Midtrans]
       ↓
[Penjual kirim barang + nomor resi]
       ↓
[Pembeli terima barang]
       ↓
[Konfirmasi diterima]
       ↓
[Transaksi selesai → komisi masuk ke koperasi]
```

## 12.3 Alur SHU

```
[Akhir tahun fiskal]
       ↓
[Admin hitung total SHU]
  Total Pendapatan - Total Pengeluaran = SHU
       ↓
[Admin buat SHU Config]
  - Dana Cadangan: 25%
  - Jasa Usaha: 45%
  - Jasa Modal: 10%
  - Dana Riset: 10%
  - Dana Sosial: 5%
  - Insentif Manajemen: 5%
       ↓
[Admin hitung distribusi (dry-run)]
  - Jasa Usaha per orang = (45% × SHU) ÷ Anggota Aktif
  - Jasa Modal per orang = (10% × SHU) × (Simpanan ÷ Total Simpanan)
       ↓
[Admin review hasil]
       ↓
[Admin distribusi (eksekusi)]
       ↓
[Notifikasi ke semua anggota]
  "SHU Anda tahun ini: Rp XXX.XXX"
       ↓
[Anggota cek dashboard → lihat SHU]
       ↓
[SELESAI!]
```

---

# 📱 BAGIAN 13: RESPONSIVE DESIGN — BAGAIMANA TAMPIL DI SEMUA UKURAN LAYAR

## 13.1 Breakpoints

| Nama | Lebar | Perangkat |
|------|-------|-----------|
| **xs** | < 640px | HP kecil |
| **sm** | ≥ 640px | HP besar |
| **md** | ≥ 768px | Tablet |
| **lg** | ≥ 1024px | Laptop |
| **xl** | ≥ 1280px | Desktop |
| **2xl** | ≥ 1536px | Desktop lebar |

## 13.2 Adaptasi Layout

| Seksi | Desktop (lg+) | Tablet (md) | Mobile (sm) |
|-------|---------------|-------------|-------------|
| Hero | Grid 3 kolom + partikel | Grid 2 kolom | 1 kolom, partikel dikurangi |
| Stats | 6 kartu baris | 3×2 grid | 2×3 grid |
| Pilar | Grid 3×3 + SVG diagram | Grid 2×4 | 1 kolom + no SVG |
| KPA | 5 kartu baris | 3+2 grid | Carousel |
| Marketplace | 4×2 produk | 2×4 grid | 1 kolom scroll |
| Header | Mega menu dropdown | Hamburger | Slide panel |

## 13.3 Performa Mobile

| Optimasi | Cara |
|----------|------|
| Kurangi animasi di mobile | `prefers-reduced-motion` + device detection |
| Lazy load gambar | `loading="lazy"` + Intersection Observer |
| Kecilkan bundle | Dynamic import komponen besar |
| Compress gambar | WebP format + responsive sizes |
| Minimize JS | Code splitting per route |

---

# 🔐 BAGIAN 14: KEAMANAN — MENJAGA WEBSITE DARI SERANGAN

## 14.1 Ancaman & Pertahanan

| Ancaman | Penjelasan | Pertahanan |
|---------|------------|------------|
| **SQL Injection** | Hacker menyusupkan kode SQL di form | Prisma ORM otomatis parameterized query |
| **XSS** | Hacker menyusupkan JavaScript di halaman | React otomatis escape HTML |
| **CSRF** | Hacker mengirim request dari website lain | CSRF token di setiap form |
| **Brute Force** | Hacker menebak password berkali-kali | Rate limiting (5x/menit) + account lockout |
| **Session Hijacking** | Hacker mencuri token login | HTTP-only cookie + secure flag + same-site |
| **DDoS** | Hacker membanjiri server dengan traffic | Cloudflare + rate limiting |
| **Data Breach** | Hacker mencuri database | Encryption at rest + access control |
| **Password Leakage** | Password tersimpan plain text | Bcrypt hashing + salt |

## 14.2 Data yang Harus Dilindungi

| Data | Sensitivitas | Penyimpanan |
|------|-------------|-------------|
| Password | 🔴 Sangat Sensitif | Bcrypt hash |
| NIK | 🔴 Sangat Sensitif | Encrypted |
| NIAK | 🟡 Sensitif | Plain (public identifier) |
| Alamat | 🟡 Sensitif | Plain |
| Email | 🟡 Sensitif | Plain |
| Nomor HP | 🟡 Sensitif | Plain |
| Foto KTP | 🔴 Sangat Sensitif | Encrypted storage |
| Saldo simpanan | 🟡 Sensitif | Plain (internal) |
| Token session | 🔴 Sangat Sensitif | Database (hashed) |

---

# 📋 BAGIAN 15: DAFTAR PERIKSA (CHECKLIST) SEBELUM LAUNCH

## 15.1 Keamanan ✅

- [ ] Password di-hash dengan bcrypt (bukan SHA-256)
- [ ] Session disimpan di database (bukan memori)
- [ ] Rate limiting di semua API login
- [ ] CSRF protection di semua form
- [ ] HTTPS aktif (SSL certificate)
- [ ] HTTP-only cookies untuk token
- [ ] Tidak ada password hardcoded
- [ ] Environment variables tidak terpapar ke client
- [ ] Input validation di semua API
- [ ] File upload divalidasi (tipe, ukuran)

## 15.2 Performa ✅

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility = 100
- [ ] Lighthouse SEO > 95
- [ ] Gambar di-optimize (WebP, lazy load)
- [ ] Code splitting per route
- [ ] Bundle size < 500KB
- [ ] API response < 200ms
- [ ] No render-blocking resources

## 15.3 Konten ✅

- [ ] Semua teks dalam Bahasa Indonesia
- [ ] Tidak ada lorem ipsum
- [ ] Semua link berfungsi
- [ ] Semua gambar ada dan relevan
- [ ] FAQ terisi lengkap
- [ ] Kontak bisa dihubungi
- [ ] Legal pages lengkap (Privasi, Syarat, Disclaimer)

## 15.4 Fungsional ✅

- [ ] Pendaftaran anggota berfungsi end-to-end
- [ ] Pembayaran Midtrans berfungsi
- [ ] Admin bisa approve/reject
- [ ] Email terkirim otomatis
- [ ] NIAK generate otomatis
- [ ] Dashboard anggota berfungsi
- [ ] Dashboard admin berfungsi
- [ ] Marketplace berfungsi
- [ ] SHU calculation berfungsi
- [ ] Notifikasi berfungsi

## 15.5 Mobile ✅

- [ ] Responsive di semua ukuran layar
- [ ] Touch target ≥ 44px
- [ ] No horizontal scroll
- [ ] Animasi dikurangi di mobile
- [ ] Form mudah diisi di HP
- [ ] Navigation mobile berfungsi

---

# 📝 BAGIAN 16: KESIMPULAN

## Apa Itu Website KNMP?

Website KNMP adalah **platform digital** yang menyatukan seluruh ekosistem koperasi Indonesia — dari petani di desa terpencil sampai investor di Jakarta. Website ini bukan sekadar "brosur online", tapi sebuah **sistem bisnis digital** yang memungkinkan:

1. **Pendaftaran anggota** secara online
2. **Pembayaran** via Midtrans
3. **Marketplace** jual-beli antar anggota
4. **Distribusi SHU** yang transparan
5. **Smart Village** untuk desa cerdas
6. **9 Pilar Kampung** yang saling terhubung
7. **Pentagon Kedaulatan** — 5 kelompok berkuasa
8. **Nusa Futuristik** — visi kota masa depan

## Prioritas Perbaikan

```
🔴 SEGERA (Minggu 1):   Keamanan (bcrypt, session, rate limit)
🟡 PENTING (Minggu 2-4): Kualitas (komponen, dark mode, data real)
🟢 BAGUS (Minggu 5-8):   Peningkatan (PWA, testing, aksesibilitas)
🔵 MASA DEPAN (Minggu 9+): Skala (Laravel, MySQL, mobile app)
```

## Tim yang Dibutuhkan

| Peran | Jumlah | Fokus |
|-------|--------|-------|
| Frontend Developer | 2 | UI, animasi, responsive |
| Backend Developer | 1 | API, database, keamanan |
| UI/UX Designer | 1 | Desain, warna, layout |
| Content Writer | 1 | Teks, SEO, dokumentasi |
| QA Tester | 1 | Testing, bug report |
| DevOps | 1 | Server, deployment, monitoring |

---

> **Dokumen ini ditulis oleh Master Polymath + Spectrum8**
> Versi: 3.0.0 | Tanggal: 2026 | Status: DRAFT AKTIF
> 
> "Membangun Peradaban Ekonomi Digital Indonesia — Satu Desa, Satu Klik, Satu Nusa." 🇮🇩

