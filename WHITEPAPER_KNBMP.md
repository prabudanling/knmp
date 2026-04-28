# WHITEPAPER
# Koperasi Nusa Berdikari Merah Putih (KNBMP)
# Ekosistem JE-P3 × Digital Platform

---

**Versi:** 2.0 — God Tier Edition
**Tanggal:** Juni 2025
**Klasifikasi:** Internal & Stakeholder
**Domain:** kopnusa.id
**Platform:** Next.js 16 + Neon PostgreSQL + Prisma ORM

---

> *"Membangun Indonesia dari Desa — Menghubungkan Petani, Pedagang, dan Produsen ke Pasar Global melalui Ekosistem Koperasi Digital Terintegrasi."*

---

## DAFTAR ISI

1. [Executive Summary](#1-executive-summary)
2. [Profil Koperasi](#2-profil-koperasi)
3. [Visi, Misi & Nilai-Nilai](#3-visi-misi--nilai-nilai)
4. [Landasan Hukum](#4-landasan-hukum)
5. [Ekosistem JE-P3](#5-ekosistem-je-p3)
6. [Model Bisnis & Arsitektur Organisasi](#6-model-bisnis--arsitektur-organisasi)
7. [Sistem Keanggotaan EKTA](#7-sistem-keanggotaan-ekta)
8. [Hak-Hak Member Lengkap](#8-hak-hak-member-lengkap)
9. [Unit Usaha KNBMP](#9-unit-usaha-knbmp)
10. [Arsitektur Teknologi Platform](#10-arsitektur-teknologi-platform)
11. [Desain Database (Blueprint)](#11-desain-database-blueprint)
12. [Alur Operasional Sistem](#12-alur-operasional-sistem)
13. [Integrasi Layanan Eksternal](#13-integrasi-layanan-eksternal)
14. [Analisis Proyek Saat Ini](#14-analisis-proyek-saat-ini)
15. [Rencana Rebuild Platform](#15-rencana-rebuild-platform)
16. [Revenue Model & Keuangan](#16-revenue-model--keuangan)
17. [Roadmap Pengembangan](#17-roadmap-pengembangan)
18. [Risiko & Mitigasi](#18-risiko--mitigasi)
19. [Glosarium](#19-glosarium)
20. [Lampiran](#20-lampiran)

---

# 1. EXECUTIVE SUMMARY

## 1.1 Latar Belakang

Indonesia memiliki **268 juta penduduk**, dengan **70%+** tinggal di pedesaan dan bergantung pada sektor agraria serta UMKM. Namun, rantai distribusi yang panjang, akses modal terbatas, dan ketiadaan teknologi menyebabkan:

- **Petani** menjual hasil panen 40-60% di bawah harga pasar
- **UMKM desa** tidak memiliki akses ke pasar yang lebih luas
- **Distribusi** melalui 5-7 layer tengkulak sebelum sampai ke konsumen
- **Akses pembiayaan** sangat terbatas di luar perbankan konvensional

KNBMP hadir sebagai **Koperasi Korporasi Multipihak** yang memanfaatkan ekosistem **JE-P3 (Jaringan Ekonomi Petani dan Pedagang Produktif)** untuk menghubungkan seluruh rantai nilai — dari hulu (petani/produsen) hingga hilir (konsumen/pasar global) — melalui satu platform digital terintegrasi.

## 1.2 Solusi

KNBMP membangun **3 pilar utama**:

```
┌─────────────────────────────────────────────────────────┐
│                    PLATFORM KNBMP                       │
│                                                         │
│  ┌───────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │   DIGITAL  │  │   FINANSIAL  │  │   LOGISTIK &   │   │
│  │  PLATFORM  │  │   ECOSYSTEM  │  │   DISTRIBUSI   │   │
│  │            │  │              │  │                │   │
│  │ • Website  │  │ • Midtrans   │  │ • Hulu-Hilir   │   │
│  │ • Mobile   │  │ • KUR Bank   │  │ • Cold Chain   │   │
│  │ • Admin    │  │ • Investor   │  │ • Ekspor-Impor │   │
│  │ • API      │  │ • SHU        │  │ • Gudang       │   │
│  └───────────┘  └──────────────┘  └────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              DATABASE TERPUSAT                  │    │
│  │         (Member · Transaksi · Inventori)         │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 1.3 Tujuan Whitepaper

Dokumen ini berfungsi sebagai:

1. **Blueprint Bisnis** — Panduan lengkap model bisnis KNBMP
2. **Blueprint Teknis** — Spesifikasi arsitektur teknologi platform
3. **Blueprint Database** — Desain skema data yang optimal
4. **Panduan Rebuild** — Roadmap pembangunan ulang platform dari nol
5. **Referensi Stakeholder** — Dokumen untuk anggota, investor, dan regulator

---

# 2. PROFIL KOPERASI

## 2.1 Identitas

| Item | Detail |
|------|--------|
| **Nama Resmi** | Koperasi Nusa Berdikari Merah Putih (KNBMP) |
| **Bentuk Badan Hukum** | Koperasi Korporasi Multipihak |
| **Domain Digital** | kopnusa.id |
| **Kantor Pusat** | Jakarta Pusat, DKI Jakarta |
| **Cakupan Operasi** | Nasional (34 Provinsi) → Asia & Internasional |
| **Ekosistem** | JE-P3 (Jaringan Ekonomi Petani dan Pedagang Produktif) |
| **Program Keanggotaan** | EKTA (Member EKTA) |

## 2.2 Perbedaan KNBMP vs Koperasi Konvensional

| Aspek | Koperasi Konvensional | KNBMP |
|-------|----------------------|-------|
| **Pendaftaran** | Datang ke kantor, isi formulir kertas | Online 24/7 via platform digital |
| **Pembayaran** | Transfer manual, konfirmasi manual | Midtrans (multi-metode, real-time) |
| **Identitas** | Kartu kertas yang mudah hilang | Digital ID + Fisik (NFC/QR) |
| **Transaksi** | Catat manual di buku | Dashboard digital real-time |
| **Distribusi** | Tunggu tengkulak datang | Akses jaringan logistik terintegrasi |
| **Pasar** | Pasar lokal saja | Desa → Nasional → Asia → Global |
| **SHU** | Dihitung tahunan, manual | Real-time, transparan, digital |
| **Pelatihan** | Seminar offline sesekali | Academy digital, on-demand |
| **Skala** | 1 desa / 1 kecamatan | Nasional + Internasional |

## 2.3 Stakeholder Utama

```
                    ┌─────────────┐
                    │   KNBMP     │
                    │  (Pusat)    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │  MEMBER   │   │  MITRA    │   │  REGULATOR│
    │  EKTA     │   │  BISNIS   │   │           │
    │           │   │           │   │           │
    │ • Petani  │   │ • Bank    │   │ • Kemenkop│
    │ • Pedagang│   │ • Investor│   │ • OJK     │
    │ • UMKM    │   │ • Logistik│   │ • Bea Cukai│
    │ • Eksportir│ │ • Distribur│  │ • Kemendag │
    └───────────┘   └───────────┘   └───────────┘
```

---

# 3. VISI, MISI & NILAI-NILAI

## 3.1 Visi

> *"Menjadi koperasi korporasi multipihak terdepan di Asia Tenggara yang membangun kedaulatan ekonomi rakyat dari desa melalui ekosistem digital JE-P3."*

## 3.2 Misi

1. **Digitalisasi Koperasi** — Membringsih seluruh proses koperasi ke platform digital yang terintegrasi
2. **Pemberdayaan Ekonomi Desa** — Memberikan akses modal, pasar, dan teknologi kepada pelaku usaha di tingkat desa
3. **Rantai Distribusi Efisien** — Memangkas 5-7 layer tengkulak menjadi direct-to-consumer melalui jaringan logistik KNBMP
4. **Akses Pasar Global** — Membuka peluang ekspor bagi produk unggulan desa melalui jaringan internasional
5. **Pendidikan & Pelatihan** — Meningkatkan kapasitas anggota melalui Academy KNBMP
6. **Transparansi Keuangan** — SHU real-time dan laporan keuangan yang dapat diakses oleh seluruh anggota

## 3.3 Nilai-Nilai Inti

| Nilai | Implementasi |
|-------|-------------|
| **Gotong Royong** | Crowdfunding antar anggota, distribusi berbasis komunitas |
| **Keadilan** | SHU transparan, voting RAT digital |
| **Integritas** | Sistem verifikasi digital, audit trail lengkap |
| **Inovasi** | Platform digital, AI analytics, blockchain-ready |
| **Kemandirian** | Member bisa mandiri secara finansial melalui ekosistem |
| **Keberlanjutan** | Fokus pada usaha berkelanjutan, bukan eksploitasi |

---

# 4. LANDASAN HUKUM

## 4.1 Regulasi yang Menjadi Dasar

| No | Regulasi | Relevansi |
|----|----------|-----------|
| 1 | **UUD 1945 Pasal 33** | Ekonomi disusun sebagai usaha bersama berdasar asas kekeluargaan |
| 2 | **UU No. 25/1992** | Pokok-Pokok Perkoperasian |
| 3 | **UU No. 20/2008** | Usaha Mikro, Kecil, Menengah |
| 4 | **PP No. 4/2015** | Peraturan Pelaksanaan UU Koperasi |
| 5 | **Permenkop No. 8/2021** | Koperasi Korporasi Multipihak ← **PILAR UTAMA** |
| 6 | **Permenkop No. 6/2022** | Pedoman Penyelenggaraan RAT |
| 7 | **UU No. 7/2014** | Perdagangan (ekspor-impor) |
| 8 | **UU No. 39/2014** | Perkebunan |
| 9 | **PP No. 71/2019** | Penyelenggaraan Sistem dan Transaksi Elektronik |
| 10 | **POJK No. 12/2021** | Perlindungan Konsumen Sektor Jasa Keuangan |

## 4.2 Mengapa Koperasi Korporasi Multipihak?

Berdasarkan **Permenkop No. 8/2021**, Koperasi Korporasi Multipihak memiliki keunggulan strategis:

| Keunggulan | Penjelasan |
|-----------|-----------|
| **Multi-sektor** | Bisa menjalankan usaha di SEMUA bidang, tidak terbatas 1 sektor |
| **Skala Besar** | Bisa beroperasi nasional dan internasional |
| **Kredit Bank** | Lebih mudah mendapat pembiayaan dari lembaga keuangan |
| **Pajak** | Mendapat fasilitas pajak koperasi (UU PPh) |
| **Legalitas** | Badan hukum kuat, diakui di semua sektor |
| **Permodalan** | Bisa menerima investasi dari berbagai sumber |
| **Partnership** | Bisa menjalin kemitraan B2B dan B2G secara resmi |

---

# 5. EKOSISTEM JE-P3

## 5.1 Definisi

**JE-P3** = **Jaringan Ekonomi Petani dan Pedagang Produktif**

Ekosistem integrasi yang menghubungkan 3 elemen utama perekonomian desa:

```
        JE-P3 (Jaringan Ekonomi Petani & Pedagang Produktif)

   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
   │              │         │              │         │              │
   │   PETANI /   │────────▶│   PEDAGANG / │────────▶│  KONSUMEN /  │
   │   PRODUSEN   │ SUPPLY  │   DISTRIBUTOR│ JUAL    │  MARKET      │
   │              │         │              │         │              │
   │ • Hasil tani │         │ • Tengkulak  │         │ • Lokal      │
   │ • Perikanan  │         │   digital    │         │ • Nasional   │
   │ • Peternakan │         │ • Warung     │         │ • Global     │
   │ • UMKM Desa  │         │ • Online     │         │              │
   └──────────────┘         └──────────────┘         └──────────────┘
          │                         │                         │
          └─────────────────────────┴─────────────────────────┘
                                    │
                            ┌───────┴───────┐
                            │    KNBMP      │
                            │   PLATFORM    │
                            │  (Integrator) │
                            └───────────────┘
```

## 5.2 Value Chain JE-P3

```
HULU                                    HILIR
─────────────────────────────────────────────────────▶

[Produsen]  [Koperasi Desa]  [Gudang]  [Distributor]  [Konsumen]
  Petani      Kordes          Korda      Korwil         End User
  Nelayan     KORCAM          Logistik   Ekspor         Marketplace
  Peternak    KORDA           Cold Chain Import         HORECA
  UMKM        KORWIL          Quality                    Retail

        ◀────── BACKWARD LINKAGE ──────▶
        ◀────── FORWARD LINKAGE ───────▶
        ◀────── SIDEWARD LINKAGE ──────▶
```

## 5.3 Peran KNBMP dalam JE-P3

KNBMP bukan sekadar platform — KNBMP adalah **INTEGRATOR** yang:

1. **Menghubungkan** produsen desa dengan pasar yang lebih luas
2. **Menyediakan** infrastruktur digital untuk transaksi
3. **Menjamin** kualitas produk melalui standarisasi
4. **Memfasilitasi** pembiayaan melalui jaringan bank & investor
5. **Mendistribusikan** SHU secara adil dan transparan
6. **Melatih** anggota agar mandiri dan produktif

---

# 6. MODEL BISNIS & ARSITEKTUR ORGANISASI

## 6.1 Struktur Organisasi

```
┌─────────────────────────────────────────────────────────────────┐
│                        RAPAT ANGGOTA TAHUNAN (RAT)              │
│                    (Voting Digital via Platform)                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │  DEWAN PENGAWAS     │
                    │  (Komite Audit)     │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │  PENGURUS           │
                    │  (Ketua + Sekretaris│
                    │   + Bendahara)      │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐
│  DIVISI BISNIS │  │  DIVISI TEKNOLO│  │  DIVISI OPERASI│
│                │  │  GI INFORMASI  │  │                │
│ • Unit Usaha   │  │ • Platform     │  │ • Logistik     │
│ • Partnership  │  │ • Database     │  │ • Gudang       │
│ • Ekspor-Impor │  │ • Keamanan     │  │ • Distribusi   │
│ • Pembiayaan   │  │ • Maintenance  │  │ • Quality      │
│ • SHU          │  │                │  │ • Admin        │
└────────────────┘  └────────────────┘  └────────────────┘
```

## 6.2 Struktur Keanggotaan Berbasis Wilayah

```
                     ┌─────────────────┐
                     │  ASIA & INTL    │
                     │  ─────────────  │
                     │  Akses Global   │
                     └────────┬────────┘
                              │
                     ┌────────┴────────┐
                     │   NASIONAL      │
                     │  ─────────────  │
                     │  34 Provinsi    │
                     └────────┬────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
     ┌────────┴────────┐ ┌───┴────┐ ┌────────┴────────┐
     │   PROVINSI      │ │  ...   │ │   PROVINSI 34   │
     │  ─────────────  │ │        │ │                 │
     │  Kab/Kota pool  │ │        │ │                 │
     └────────┬────────┘ │        │ └─────────────────┘
              │           │        │
     ┌────────┴────────┐ └────────┘
     │  KABUPATEN/KOTA │
     │  ─────────────  │
     │  Kecamatan pool │
     └────────┬────────┘
              │
     ┌────────┴────────┐
     │  KECAMATAN      │
     │  ─────────────  │
     │  Desa pool      │
     └────────┬────────┘
              │
     ┌────────┴────────┐
     │  DESA / KEL     │
     │  ─────────────  │
     │  Member base    │
     └─────────────────┘
```

## 6.3 Komisi & Insentif Berbasis Wilayah

Sistem komisi didistribusikan berdasarkan **chain of transaction**:

```
Contoh: Petani Desa A menjual beras ke Konsumen di Kota B

Petani (Desa A)           → Mendapat 100% hasil jual
Kordes (Desa A)           → Komisi 2% (fasilitasi lokal)
KORCAM (Kecamatan A)      → Komisi 1.5% (koordinasi kecamatan)
KORDA (Kab/Kota A)        → Komisi 1% (koordinasi kabupaten)
KORWIL (Provinsi A)       → Komisi 0.5% (koordinasi wilayah)
KORNAS (Nasional)         → Komisi 0.5% (platform fee)
KNBMP Platform            → Komisi 1.5% (maintenance & pengembangan)

TOTAL                     → 7% dari nilai transaksi
```

> **Catatan:** Persentase komisi bersifat konfigurasi dan dapat diubah melalui RAT.

---

# 7. SISTEM KEANGGOTAAN EKTA

## 7.1 Apa itu Member EKTA?

**EKTA** = Program keanggotaan premium KNBMP yang memberikan hak penuh akses ke seluruh ekosistem koperasi sesuai **tingkatan wilayah** yang dipilih.

Berbeda dengan sistem keanggotaan konvensional yang berbasis hierarki organisasi, **EKTA menggunakan sistem zonasi wilayah** — member memilih sendiri seberapa luas cakupan wilayah usaha mereka.

## 7.2 Tingkatan Wilayah Keanggotaan

| # | Tingkat | Simbol | Cakupan | Target User |
|---|---------|--------|---------|-------------|
| 1 | **Desa / Kelurahan** | 🏘️ | 1 desa terdaftar | Petani, UMKM desa, warung |
| 2 | **Kecamatan** | 🏡 | Seluruh desa dalam 1 kecamatan | Distributor kecamatan |
| 3 | **Kabupaten / Kota** | 🏙️ | Seluruh kecamatan dalam 1 kab/kota | Pengusaha kabupaten |
| 4 | **Provinsi** | 🌆 | Seluruh kab/kota dalam 1 provinsi | Distributor provinsi |
| 5 | **Nasional** | 🇮🇩 | Seluruh 34 provinsi Indonesia | Eksportir nasional |
| 6 | **Asia & Internasional** | 🌏 | Jaringan global | Importir/Eksportir internasional |

## 7.3 Matrix Hak Akses per Tingkat

| Hak | Desa | Kec. | Kab/Kota | Prov. | Nas. | Asia |
|-----|:----:|:----:|:--------:|:-----:|:----:|:----:|
| Keanggotaan Resmi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ID Card Digital | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hak Usaha Semua Bidang | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Akses Pasar Lokal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hak Usaha Logistik | Lokal | Kec. | Kab. | Prov. | Nas. | Global |
| Hak Ekspor-Impor | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Pasar Asia & Intl | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Kampung Modal (Investor) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hak Usaha Wisata | Desa | Kec. | Kab. | Prov. | Nas. | ✅ |
| Wisata Religi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Akses KUR Bank | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pembiayaan Investor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Seragam Resmi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pelatihan EKTA | Basic | Std | Adv | Pro | Elite | Elite+ |
| Konsultasi & Sertifikasi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Academy KNBMP | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## 7.4 Biaya Keanggotaan (Proposed)

| Tingkat | Biaya Pendaftaran | Simpanan Pokok | Simpanan Wajib/Bulan |
|---------|------------------|----------------|---------------------|
| Desa/Kelurahan | Rp 0 (Gratis) | Rp 50.000 | Rp 10.000 |
| Kecamatan | Rp 100.000 | Rp 100.000 | Rp 25.000 |
| Kabupaten/Kota | Rp 500.000 | Rp 500.000 | Rp 50.000 |
| Provinsi | Rp 2.000.000 | Rp 1.000.000 | Rp 100.000 |
| Nasional | Rp 5.000.000 | Rp 5.000.000 | Rp 500.000 |
| Asia & Internasional | Rp 20.000.000 | Rp 20.000.000 | Rp 1.000.000 |

> **Catatan:** Biaya bersifat proposal dan dapat diubah melalui RAT.

## 7.5 Alur Pendaftaran Member EKTA

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  1. BUKA  │───▶│ 2. PILIH │───▶│ 3. ISI   │───▶│ 4. UPLOAD│───▶│ 5. BAYAR │───▶│ 6. SELESAI│
│  WEBSITE  │    │  TINGKAT │    │  DATA    │    │  DOKUMEN │    │          │    │          │
│           │    │  WILAYAH │    │  DIRI    │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │               │               │
     ▼               ▼               ▼               ▼               ▼               ▼
 kopnusa.id      Desa/KEC/     Nama,NIK,       Foto KTP,      Midtrans       Email
                 Kab/Prov/     Email,No HP,    Foto Selfie    (Sandbox)      Konfirmasi
                 Nas/Intl      Alamat                         (Multi-       Otomatis
                                                                metode)       (Resend)
                                                                               │
                                                                               ▼
                                                                        ┌──────────┐
                                                                        │ 7.ADMIN  │
                                                                        │ REVIEW   │
                                                                        │ APPROVE  │
                                                                        │ /REJECT  │
                                                                        └──────────┘
                                                                               │
                                                                   ┌───────┴───────┐
                                                                   ▼               ▼
                                                            ┌──────────┐    ┌──────────┐
                                                            │ APPROVE  │    │ REJECT   │
                                                            │ → NIAK   │    │ → Email  │
                                                            │ → Email  │    │   Alasan │
                                                            │   Aktif  │    │          │
                                                            └──────────┘    └──────────┘
```

---

# 8. HAK-HAK MEMBER LENGKAP

## 8.1 Ringkasan 16 Hak Member EKTA

### HAK FONDASI (Dimiliki Semua Tingkat)

| # | Hak | Deskripsi Singkat |
|---|-----|-------------------|
| 1 | **Keanggotaan Resmi** | Anggota sah dengan akses penuh ke seluruh unit bisnis & jaringan mitra |
| 2 | **ID Card & User ID** | Kartu identitas fisik/digital + User ID unik untuk transaksi & voting RAT |
| 3 | **Hak Akses Wilayah** | Akses prioritas ke gerai fisik, gudang, zona bisnis sesuai tingkatan |
| 4 | **Hak Usaha Semua Bidang** | Menjalankan usaha di semua sektor sesuai Permenkop No. 8/2021 |

### HAK EKONOMI

| # | Hak | Deskripsi Singkat |
|---|-----|-------------------|
| 5 | **Hak Usaha Logistik** | Akses jaringan distribusi hulu-hilir, cold chain, mitra logistik |
| 6 | **Hak Usaha Ekspor-Impor** ⭐ | Fasilitasi ekspor produk unggulan & impor kebutuhan usaha (Kab+) |
| 7 | **Hak Pasar Asia & Internasional** ⭐ | Akses langsung pasar lintas negara (Asia+ only) |
| 8 | **Hak Kampung Modal** | Crowdfunding usaha desa (peternakan, perkebunan, perikanan, UMKM) |
| 9 | **Hak Usaha Wisata Lokal** | Wisata alam, budaya, homestay, kuliner berbasis potensi wilayah |
| 10 | **Hak Usaha Wisata Religi** | Paket Haji/Umroh + wisata ziarah multi-keyakinan |

### HAK PEMBIAYAAN

| # | Hak | Deskripsi Singkat |
|---|-----|-------------------|
| 11 | **Hak Modal KUR** | Prioritas Kredit Usaha Rakyat melalui bank mitra KNBMP |
| 12 | **Pembiayaan Investor Internal** | Crowdfunding antar anggota + jaringan investor JE-P3 |

### HAK PENGEMBANGAN

| # | Hak | Deskripsi Singkat |
|---|-----|-------------------|
| 13 | **Seragam Resmi** | Identitas kelembagaan & kebanggaan organisasi |
| 14 | **Pelatihan EKTA** ⭐ | Program pelatihan eksklusif (ekspor-impor, pasar global, manajemen) |
| 15 | **Konsultasi & Sertifikasi** | Pendampingan usaha, sertifikasi halal/organik/mutu |
| 16 | **Akses Academy** | Platform pelatihan digital on-demand (sedang disiapkan) |

---

## 8.2 Detail Hak #3: Zonasi Wilayah

Setiap member mendapat **zonasi akses** berdasarkan tingkat keanggotaan:

```
Tingkat: DESA
┌──────────────────────────────────────────────────────────┐
│  Akses: Zona Desa Terdaftar                              │
│  • 1 desa tempat member terdaftar                        │
│  • Prioritas di gerai & gudang desa                      │
│  • Distribusi lokal antar warga desa                     │
└──────────────────────────────────────────────────────────┘

Tingkat: KECAMATAN
┌──────────────────────────────────────────────────────────┐
│  Akses: Seluruh Desa dalam Kecamatan                     │
│  • Semua desa di kecamatan yang dipilih                  │
│  • Koordinasi distribusi antar desa                      │
│  • Akses gudang kecamatan                                │
└──────────────────────────────────────────────────────────┘

Tingkat: KABUPATEN/KOTA
┌──────────────────────────────────────────────────────────┐
│  Akses: Seluruh Kecamatan dalam Kabupaten/Kota           │
│  • Semua kecamatan → semua desa                          │
│  • ✅ Mulai dapat hak Ekspor-Impor                       │
│  • Distribusi antar kecamatan                            │
│  • Akses gudang kabupaten + cold chain                   │
└──────────────────────────────────────────────────────────┘

Tingkat: PROVINSI
┌──────────────────────────────────────────────────────────┐
│  Akses: Seluruh Kab/Kota dalam Provinsi                  │
│  • Semua kab/kota → semua kecamatan → semua desa         │
│  • Distribusi lintas kabupaten/kota                      │
│  • Akses jaringan logistik provinsi                      │
└──────────────────────────────────────────────────────────┘

Tingkat: NASIONAL
┌──────────────────────────────────────────────────────────┐
│  Akses: Seluruh 34 Provinsi Indonesia                    │
│  • Penuh akses nasional                                  │
│  • Koneksi logistik nasional                             │
│  • Jaringan buyer & distributor seluruh Indonesia         │
│  • Prioritas bantuan pemerintah                          │
└──────────────────────────────────────────────────────────┘

Tingkat: ASIA & INTERNASIONAL
┌──────────────────────────────────────────────────────────┐
│  Akses: Jaringan Global                                  │
│  • Pasar ASEAN, Asia Timur, Asia Selatan                │
│  • Pasar Eropa, Timur Tengah, Amerika, Afrika           │
│  • Marketplace internasional (Alibaba, dll)              │
│  • Pameran dagang & misi bisnis internasional            │
│  • Kemitraan koperasi & asosiasi bisnis global          │
│  • Pelabuhan internasional                               │
└──────────────────────────────────────────────────────────┘
```

---

## 8.3 Detail Hak #5: Logistik

Sistem logistik KNBMP mengikuti **chain of distribution**:

```
PRODUSEN DESA          KORDES            KORCAM           KORDA          KORWIL         KORNAS
     │                   │                 │                │              │              │
     ▼                   ▼                 ▼                ▼              ▼              ▼
  [Panen] ──────────▶ [Kumpul] ──────▶ [Gudang] ──────▶ [Sortir] ──────▶ [Distribusi] ──────▶ [Market]
                        Desa              Kec.             Kab/Kota        Provinsi         Nasional
                         │                 │                │              │              │
                         └──── Cold Chain ──┴──── Quality ──┴──────────────┘              │
                                                                                            │
                                                                                     ┌──────┘
                                                                                     ▼
                                                                               [Ekspor Global]
```

**Jenis Logistik:**
- **Distribusi Lokal** (Desa → Kecamatan): Motor, pickup, angkutan desa
- **Distribusi Kabupaten**: Truk kecil, cold box
- **Distribusi Provinsi**: Truk besar, reefer container
- **Distribusi Nasional**: Kereta api, kapal, trucking partner
- **Distribusi Internasional**: Container, freight forwarding

---

## 8.4 Detail Hak #6: Ekspor-Impor

**Tersedia mulai tingkat Kabupaten/Kota ke atas.**

### Ekspor
```
PRODUSEN DESA                KNBMP                   BUYER INTERNATIONAL
     │                          │                            │
     ▼                          ▼                            ▼
  [Produk] ──────▶ [Standarisasi] ──────▶ [Koneksi Buyer]
                     • Sertifikasi mutu        • Jaringan mitra
                     • Packaging               • Trade show
                     • Dokumen                 • Digital platform
                          │                         │
                          ▼                         ▼
                   [Pendampingan]            [Transaksi]
                   • Kepabeanan              • LC/Pembayaran
                   • Phyto/Fumigasi          • Logistik
                   • COO (Certificate        • Tracking
                     of Origin)
```

### Impor
```
MEMBER KNBMP                 KNBMP                   SUPPLIER INTL
     │                          │                            │
     ▼                          ▼                            ▼
  [Kebutuhan] ──────▶ [Pengadaan] ──────▶ [Koneksi Supplier]
   Usaha             Kolektif              • Terverifikasi
                         │                  • Bulk pricing
                         ▼
                   [Impor Kolektif]
                   • Efisiensi biaya
                   • Jalur koperasi
                   • Dokumen impor
                   • Bea cukai
```

---

## 8.5 Detail Hak #7: Pasar Asia & Internasional

**Eksklusif untuk tingkat Asia & Internasional.**

### Jaringan Pasar Asia
| Wilayah | Peluang | Platform |
|---------|---------|----------|
| ASEAN | Singapore, Malaysia, Thailand, Vietnam | Lazada Regional, Shopee Cross-border |
| Asia Timur | Jepang, Korea Selatan, Taiwan | Rakuten, Coupang |
| Asia Selatan | India, Bangladesh | Flipkart, Udaan |

### Jaringan Pasar Global
| Wilayah | Peluang |
|---------|---------|
| Eropa | UE, UK — standar CE, organic |
| Timur Tengah | UAE, Saudi Arabia — halal market |
| Amerika | USA, Canada, Brazil |
| Afrika | Kenya, Nigeria — emerging market |

### Fasilitasi KNBMP
- Pameran dagang internasional berbasis koperasi
- Misi bisnis (trade mission) kolektif
- Pendampingan standarisasi produk
- Negosiasi kontrak dagang internasional
- Legal & compliance

---

## 8.6 Detail Hak #8: Kampung Modal

**Platform Crowdfunding Usaha Desa**

```
┌──────────────────────────────────────────────────────┐
│                 KAMPUNG MODAL                        │
│           Platform Crowdfunding Desa                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌───────────────────┐      ┌───────────────────┐   │
│  │   PENGUSAHA       │      │    INVESTOR       │   │
│  │   (Butuh Modal)   │      │   (Member EKTA)   │   │
│  │                   │      │                   │   │
│  │ • Tampil profil   │      │ • Pilih unit      │   │
│  │ • Omzet saat ini  │      │ • Investasi       │   │
│  │ • Kebutuhan modal │      │ • Terima dividen  │   │
│  │ • Proyeksi ROI    │      │ • Monitoring      │   │
│  │   (return)        │      │                   │   │
│  └────────┬──────────┘      └────────┬──────────┘   │
│           │                          │              │
│           └──────────┬───────────────┘              │
│                      ▼                              │
│           ┌──────────────────┐                      │
│           │  SMART CONTRACT  │                      │
│           │  (Escrow KNBMP)  │                      │
│           │                  │                      │
│           │ • Verifikasi     │                      │
│           │ • Disbursement   │                      │
│           │ • Reporting      │                      │
│           └──────────────────┘                      │
│                                                      │
│  SEKTOR: Peternakan · Perkebunan · Perikanan ·      │
│          UMKM Desa · Sektor Lainnya                  │
└──────────────────────────────────────────────────────┘
```

---

## 8.7 Detail Hak #9 & #10: Wisata

### Wisata Lokal
- Wisata alam & ekowisata
- Wisata budaya & kearifan lokal
- Homestay & kuliner tradisional
- Paket wisata komunitas

### Wisata Religi
| Kategori | Layanan |
|----------|---------|
| **Muslim** | Paket Haji & Umroh berbasis komunitas desa/koperasi |
| **Non-Muslim** | Wisata ziarah nasional & internasional |
| | Paket perjalanan rohani lintas keyakinan |
| | Destinasi ibadah sesuai keyakinan member |

---

## 8.8 Detail Hak #11 & #12: Pembiayaan

### KUR (Kredit Usaha Rakyat)
```
Member EKTA → Data Keanggotaan → Scoring KNBMP → Rekomendasi → Bank Mitra → KUR
                                                           │
                                                     ┌─────┴─────┐
                                                     │ Bunga Rendah│
                                                     │ (Subsidi)   │
                                                     └─────────────┘
```

### Pembiayaan Investor Internal
```
Sumber Pembiayaan:
1. Crowdfunding sesama anggota koperasi
2. Jaringan investor ekosistem JE-P3
3. Simpanan sukarela anggota
4. Dana cadangan koperasi
5. Reinvestasi SHU
```

---

## 8.9 Detail Hak #14: Pelatihan EKTA

| Tingkat | Akses Pelatihan |
|---------|----------------|
| Desa | Literasi dasar usaha & koperasi |
| Kecamatan | Manajemen usaha skala kecamatan |
| Kab/Kota | Strategi ekspor-impor dasar, sertifikasi |
| Provinsi | Penetrasi pasar nasional, keuangan lanjutan |
| Nasional | Manajemen usaha skala nasional & global |
| Asia & Intl | Pasar internasional, kepemimpinan, tata kelola koperasi |

---

# 9. UNIT USAHA KNBMP

## 9.1 Map Unit Usaha

```
┌─────────────────────────────────────────────────────────────────┐
│                      UNIT USAHA KNBMP                          │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│  PERDAGANGAN │   JASA       │  PEMBIAYAAN  │   PENGEMBANGAN   │
├──────────────┼──────────────┼──────────────┼───────────────────┤
│ • Marketplace│ • Logistik   │ • KUR        │ • Academy         │
│ • Ekspor     │ • Gudang     │ • Kampung    │ • Pelatihan EKTA  │
│ • Impor      │ • Cold Chain │   Modal      │ • Konsultasi      │
│ • Distribusi │ • Wisata     │ • Investor   │ • Sertifikasi     │
│ • Ritel      │ • Religi     │ • SHU        │ • Riset           │
│ • HORECA     │ • Event      │ • Simpanan   │ • Digitalisasi    │
│ • B2B        │ • Asuransi   │   Pinjaman   │                   │
│ • Tender     │              │              │                   │
└──────────────┴──────────────┴──────────────┴───────────────────┘
```

## 9.2 Prioritas Pengembangan (MVP ke Full)

| Phase | Unit Usaha | Platform | Timeline |
|-------|-----------|----------|----------|
| **MVP** | Pendaftaran Member | Website | Bulan 1-2 |
| **MVP** | Admin Dashboard | Website | Bulan 1-2 |
| **MVP** | Email Otomatis | Resend API | Bulan 1-2 |
| **MVP** | Pembayaran | Midtrans | Bulan 2-3 |
| **Phase 2** | Marketplace / Toko Digital | Website+Mobile | Bulan 3-4 |
| **Phase 2** | Upload KTP/Foto | Uploadthing | Bulan 2-3 |
| **Phase 3** | Kampung Modal | Website | Bulan 5-6 |
| **Phase 3** | Wisata (Lokal+Religi) | Website | Bulan 5-7 |
| **Phase 4** | Ekspor-Impor | Website | Bulan 7-9 |
| **Phase 4** | Logistik & Gudang | Website+App | Bulan 7-9 |
| **Phase 5** | SHU Digital | Dashboard | Bulan 9-10 |
| **Phase 5** | Academy KNBMP | LMS Platform | Bulan 10-12 |
| **Phase 6** | Mobile App | React Native/Flutter | Bulan 12+ |
| **Phase 6** | AI Analytics | Dashboard | Bulan 12+ |

---

# 10. ARSITEKTUR TEKNOLOGI PLATFORM

## 10.1 Tech Stack

| Layer | Teknologi | Fungsi |
|-------|-----------|--------|
| **Framework** | Next.js 16 (App Router) | Full-stack web framework |
| **Language** | TypeScript 5 | Type-safe development |
| **Styling** | Tailwind CSS 4 + shadcn/ui | UI components & design system |
| **Database** | Neon PostgreSQL | Cloud database (always online) |
| **ORM** | Prisma ORM | Database interaction layer |
| **Auth** | NextAuth.js v4 + bcryptjs | Authentication & password hashing |
| **Email** | Resend | Transactional email |
| **Payment** | Midtrans | Payment gateway |
| **Upload** | Uploadthing | File upload (KTP, selfie) |
| **State** | Zustand + TanStack Query | Client & server state |
| **Animation** | Framer Motion | UI animations |
| **Charts** | Recharts | Dashboard analytics |
| **WhatsApp** | Fonnte | WhatsApp notification |
| **Hosting** | Vercel | Cloud deployment |
| **Domain** | kopnusa.id | Custom domain |
| **Monitoring** | Vercel Analytics | Performance monitoring |

## 10.2 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                        │
│                     http://localhost:3000                      │
│                     https://kopnusa.id                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  NEXT.JS APP ROUTER                     │   │
│  │                                                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │   │
│  │  │ Landing  │  │ Daftar   │  │  Login   │              │   │
│  │  │ Page     │  │ Anggota  │  │  Admin   │              │   │
│  │  │ (/)      │  │ (/daftar)│  │ (/login) │              │   │
│  │  └──────────┘  └──────────┘  └──────────┘              │   │
│  │                                                         │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              ADMIN DASHBOARD                     │   │   │
│  │  │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐        │   │   │
│  │  │  │Stats  │ │Member │ │Payment│ │SHU    │        │   │   │
│  │  │  └───────┘ └───────┘ └───────┘ └───────┘        │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                     API Calls (fetch)                          │
│                              │                                  │
├──────────────────────────────┼──────────────────────────────────┤
│                     SERVER (Next.js API Routes)                │
│                              │                                  │
│  ┌────────────┐  ┌───────────┴───────────┐  ┌────────────┐   │
│  │ /api/auth  │  │    /api/pendaftaran    │  │ /api/admin │   │
│  │  • login   │  │  • POST (daftar baru) │  │  • stats   │   │
│  │  • logout  │  │  • GET (cek status)   │  │  • members │   │
│  │  • me      │  │  • PUT (update)       │  │  • approve │   │
│  │  • register│  │                       │  │  • reject  │   │
│  └────────────┘  └───────────────────────┘  └────────────┘   │
│                              │                                  │
│  ┌───────────────────────────┼─────────────────────────────┐   │
│  │                    BUSINESS LOGIC LAYER                  │   │
│  │                                                         │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│  │  │  Prisma  │ │  Resend  │ │ Midtrans │ │Uploadthng│  │   │
│  │  │  ORM     │ │  Email   │ │ Payment  │ │  Upload  │  │   │
│  │  └────┬─────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│  └───────┼────────────────────────────────────────────────┘   │
│          │                                                     │
├──────────┼─────────────────────────────────────────────────────┤
│          ▼              EXTERNAL SERVICES                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  NEON POSTGRE│  │   RESEND     │  │  MIDTRANS    │         │
│  │  SQL         │  │   EMAIL      │  │  PAYMENT     │         │
│  │              │  │              │  │              │         │
│  │ • 25+ tables │  │ • 4 template │  │ • Sandbox    │         │
│  │ • Always on  │  │ • noreply@   │  │ • Multi pay  │         │
│  │ • Cloud      │  │   kopnusa.id │  │ • Webhook    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ UPLOADTHING  │  │   FONNTE     │                          │
│  │ FILE UPLOAD  │  │  WHATSAPP    │                          │
│  └──────────────┘  └──────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

## 10.3 Arsitektur File (Target — Setelah Rebuild)

```
knbmp/
│
├── prisma/
│   ├── schema.prisma              ← Blueprint database (PostgreSQL)
│   └── seed.ts                    ← Data awal
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← Root layout (Navbar + Footer)
│   │   ├── page.tsx               ← Landing page SAJA
│   │   │
│   │   ├── daftar/
│   │   │   └── page.tsx           ← Halaman pendaftaran member
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx           ← Halaman login
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx         ← Admin layout (Sidebar)
│   │   │   ├── page.tsx           ← Dashboard utama
│   │   │   ├── members/
│   │   │   │   └── page.tsx       ← Kelola anggota
│   │   │   ├── pendaftaran/
│   │   │   │   ├── page.tsx       ← List pendaftaran
│   │   │   │   └── [id]/page.tsx  ← Detail pendaftaran
│   │   │   ├── payments/
│   │   │   │   └── page.tsx       ← Kelola pembayaran
│   │   │   ├── shu/
│   │   │   │   └── page.tsx       ← SHU management
│   │   │   └── settings/
│   │   │       └── page.tsx       ← Pengaturan website
│   │   │
│   │   └── api/
│   │       ├── public/
│   │       │   ├── tiers/route.ts
│   │       │   └── faq/route.ts
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   ├── register/route.ts
│   │       │   └── me/route.ts
│   │       ├── pendaftaran/
│   │       │   └── route.ts
│   │       └── admin/
│   │           ├── login/route.ts
│   │           ├── dashboard/
│   │           │   └── stats/route.ts
│   │           ├── members/route.ts
│   │           ├── pendaftaran/
│   │           │   ├── route.ts
│   │           │   └── [id]/
│   │           │       ├── approve/route.ts
│   │           │       └── reject/route.ts
│   │           └── settings/route.ts
│   │
│   ├── components/
│   │   ├── ui/                     ← shadcn/ui (sudah ada)
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── mobile-nav.tsx
│   │   ├── landing/
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── membership-section.tsx
│   │   │   ├── faq-section.tsx
│   │   │   ├── contact-section.tsx
│   │   │   └── tier-card.tsx
│   │   ├── registration/
│   │   │   ├── step-pilih-wilayah.tsx
│   │   │   ├── step-data-diri.tsx
│   │   │   ├── step-upload-dokumen.tsx
│   │   │   ├── step-pembayaran.tsx
│   │   │   └── step-selesai.tsx
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   └── admin/
│   │       ├── sidebar.tsx
│   │       ├── stats-cards.tsx
│   │       ├── members-table.tsx
│   │       ├── pendaftaran-table.tsx
│   │       └── payment-table.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                   ← Prisma client (Neon)
│   │   ├── auth.ts                 ← Auth logic (NextAuth)
│   │   ├── niak.ts                 ← Generator NIAK
│   │   ├── resend.ts               ← Email templates
│   │   ├── midtrans.ts             ← Midtrans integration
│   │   ├── uploadthing.ts          ← Upload config
│   │   ├── uploadthing-client.ts   ← Upload client
│   │   ├── permissions.ts          ← Role-based access
│   │   ├── utils.ts                ← General helpers
│   │   └── utils-server.ts         ← Server-side helpers
│   │
│   ├── hooks/
│   │   ├── use-auth.ts             ← Auth hook
│   │   └── use-toast.ts            ← Toast notifications
│   │
│   └── types/
│       └── index.ts                ← TypeScript type definitions
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── og-image.jpg
│   └── favicon.ico
│
├── .env                             ← Environment variables (RAHASIA!)
├── .env.example                     ← Template env vars
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── WHITEPAPER.md                    ← Dokumen ini
```

## 10.4 Design Principles

| Prinsip | Implementasi |
|---------|-------------|
| **Mobile-First** | Desain untuk HP dulu, baru desktop |
| **Database-Driven** | SEMUA data dari database, tidak ada hardcoded |
| **Component-Based** | Setiap bagian UI = komponen terpisah & reusable |
| **API-First** | Backend (API) dibangun dulu, baru frontend |
| **Type-Safe** | TypeScript strict mode untuk mengurangi bug |
| **Accessible** | Semantic HTML, ARIA labels, keyboard navigation |
| **Responsive** | Mobile, tablet, desktop — semua harus baik |
| **Secure** | Password hashed, API authenticated, env vars hidden |

---

# 11. DESAIN DATABASE (BLUEPRINT)

## 11.1 Filosofi Desain

**"Minimal Viable Tables, Maximum Future Flexibility"**

Jangan buat 25+ tabel sekaligus. Mulai dengan tabel yang **benar-benar diperlukan** untuk MVP, lalu tambah sesuai kebutuhan.

## 11.2 Database Tiers (Phased)

### Phase MVP — 8 Tabel Inti

```
┌──────────────────────────────────────────────────────┐
│                MVP DATABASE SCHEMA                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐    │
│  │   User   │────▶│   Tier   │     │   KPA    │    │
│  │          │     │          │     │          │    │
│  │ • id     │     │ • id     │     │ • id     │    │
│  │ • niak   │     │ • name   │     │ • name   │    │
│  │ • email  │     │ • price  │     │ • code   │    │
│  │ • name   │     │ • level  │     │ • desc   │    │
│  │ • role   │     │ • zone   │     │          │    │
│  │ • status │     │          │     │          │    │
│  └────┬─────┘     └──────────┘     └──────────┘    │
│       │                                              │
│       ▼                                              │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐    │
│  │Pendaftar-│────▶│ Payment  │     │  Setting │    │
│  │  an      │     │          │     │          │    │
│  │ • id     │     │ • id     │     │ • key    │    │
│  │ • email  │     │ • orderId│     │ • value  │    │
│  │ • tier   │     │ • amount │     │          │    │
│  │ • status │     │ • status │     │          │    │
│  │ • nik    │     │ • method │     │          │    │
│  └──────────┘     └──────────┘     └──────────┘    │
│                                                      │
│  ┌──────────┐     ┌──────────┐                       │
│  │   FAQ    │     │ Provinsi │────▶ KabKota        │
│  │          │     │          │     │                 │
│  │ • q      │     │ • code   │     │ • code         │
│  │ • a      │     │ • name   │     │ • name         │
│  │ • order  │     │          │     │ • provinsiId   │
│  └──────────┘     └──────────┘     └─────────┘      │
└──────────────────────────────────────────────────────┘
```

### Detail Tabel MVP:

#### 1. User (Anggota & Admin)
```prisma
model User {
  id              String    @id @default(cuid())
  niak            String?   @unique           // Nomor Induk Anggota Koperasi
  email           String    @unique
  phone           String?
  password        String                       // Hashed with bcryptjs
  name            String
  nik             String?                      // Nomor Induk Kependudukan
  tempatLahir     String?
  tanggalLahir    DateTime?
  jenisKelamin    String?
  alamat          String?
  rt              String?
  rw              String?
  kelurahan       String?
  kecamatan       String?
  kabKota         String?
  provinsi        String?
  kodePos         String?
  fotoKtp         String?                      // URL dari Uploadthing
  fotoDiri        String?                      // URL dari Uploadthing

  // Keanggotaan EKTA
  tierId          String?                      // Tingkat wilayah
  tier            Tier?     @relation(fields: [tierId], references: [id])
  kpaId           String?
  kpa             KPA?      @relation(fields: [kpaId], references: [id])

  // Status & Role
  status          String    @default("PENDING")  // PENDING, ACTIVE, REJECTED, SUSPENDED
  role            String    @default("MEMBER")   // MEMBER, ADMIN, SUPER_ADMIN

  // Keuangan
  simpananPokok   Int       @default(0)
  simpananWajib   Int       @default(0)

  // Metadata
  joinDate        DateTime?
  approvedAt      DateTime?
  approvedBy      String?
  rejectedAt      DateTime?
  rejectedReason  String?
  lastLoginAt     DateTime?

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  pendaftaran     Pendaftaran[]
  payments        Payment[]
  activityLogs    ActivityLog[]
}
```

#### 2. Tier (Tingkat Wilayah Keanggotaan)
```prisma
model Tier {
  id                String    @id @default(cuid())
  code              String    @unique              // DESA, KECAMATAN, KAB_KOTA, PROVINSI, NASIONAL, ASIA_INTL
  name              String                          // Desa/Kelurahan, Kecamatan, dll
  level             Int                             // 1-6 (untuk sorting & permission)
  zoneType          String                          // DESA, KECAMATAN, KABUPATEN, PROVINSI, NASIONAL, INTERNATIONAL
  price             Int                             // Biaya pendaftaran
  simpananPokok     Int                             // Simpanan pokok
  simpananWajib     Int                             // Simpanan wajib per bulan
  description       String
  benefits          String                          // JSON string array
  hakEksporImpor    Boolean   @default(false)       // Mulai level Kab/Kota
  hakPasarAsia      Boolean   @default(false)       // Hanya level Asia & Intl
  sortOrder         Int       @default(0)
  isActive          Boolean   @default(true)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  pendaftaran       Pendaftaran[]
  users             User[]
}
```

#### 3. Pendaftaran
```prisma
model Pendaftaran {
  id                String    @id @default(cuid())
  nomorPendaftaran  String    @unique              // Auto-generated

  // Data Diri
  namaLengkap       String
  email             String
  phone             String
  nik               String?
  tempatLahir       String?
  tanggalLahir      DateTime?
  jenisKelamin      String?
  alamat            String?
  rt                String?
  rw                String?
  kelurahan         String?
  kecamatan         String?
  kabKota           String?
  provinsi          String?
  kodePos           String?
  fotoKtp           String?
  fotoDiri          String?

  // Pilihan Tier
  tierId            String
  tier              Tier      @relation(fields: [tierId], references: [id])
  kpaId             String?

  // Status
  status            String    @default("PENDING")  // PENDING, PAYMENT_PENDING, PAID, REVIEWING, APPROVED, REJECTED
  notes             String?

  // Review
  reviewedAt        DateTime?
  reviewedBy        String?
  approvedAt        DateTime?
  approvedBy        String?
  rejectedAt        DateTime?
  rejectedBy        String?
  rejectedReason    String?

  // NIAK (setelah approve)
  niak              String?
  userId            String?
  user              User?     @relation(fields: [userId], references: [id])

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  payments          Payment[]
}
```

#### 4. Payment
```prisma
model Payment {
  id                String    @id @default(cuid())
  orderId           String    @unique              // Midtrans order ID
  transactionId     String?                         // Midtrans transaction ID

  pendaftaranId     String
  pendaftaran       Pendaftaran @relation(fields: [pendaftaranId], references: [id])
  userId            String?
  user              User?     @relation(fields: [userId], references: [id])

  amount            Int
  status            String    @default("PENDING")  // PENDING, PAID, FAILED, EXPIRED, REFUNDED
  paymentType       String?                         // pendaftaran, simpanan, produk
  paymentMethod     String?                         // gopay, bank_transfer, etc

  snapToken         String?                         // Midtrans Snap Token
  snapRedirectUrl   String?
  vaNumber          String?                         // Virtual Account number

  paidAt            DateTime?
  expiredAt         DateTime?

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

#### 5. KPA
```prisma
model KPA {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  description String
  icon        String
  color       String
  sortOrder   Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  users       User[]
}
```

#### 6. Setting
```prisma
model Setting {
  id          String    @id @default(cuid())
  key         String    @unique
  value       String
  type        String    @default("STRING")   // STRING, NUMBER, BOOLEAN, JSON
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

#### 7. FAQ
```prisma
model FAQ {
  id          String    @id @default(cuid())
  question    String
  answer      String
  category    String?
  order       Int       @default(0)
  status      Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

#### 8. Provinsi & KabKota
```prisma
model Provinsi {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  kabKotas    KabKota[]
}

model KabKota {
  id          String    @id @default(cuid())
  code        String    @unique
  name        String
  provinsiId  String
  provinsi    Provinsi  @relation(fields: [provinsiId], references: [id])
  type        String                    // KABUPATEN, KOTA
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Phase 2 — Tabel Tambahan (Marketplace)

```prisma
// Product — Produk yang dijual di marketplace
model Product { ... }

// Order — Pesanan marketplace
model Order { ... }

// OrderItem — Detail item pesanan
model OrderItem { ... }

// Member — Profil lengkap member (extended User)
model Member { ... }

// Review — Review produk
model Review { ... }
```

### Phase 3 — Tabel Tambahan (Keuangan)

```prisma
// SHUConfig — Konfigurasi SHU per tahun
model SHUConfig { ... }

// SHUDistribution — Distribusi SHU per member
model SHUDistribution { ... }

// Transaction — Riwayat transaksi keuangan
model Transaction { ... }

// KampungModal — Proyek crowdfunding
model KampungModal { ... }

// KampungModalInvestment — Investasi ke proyek
model KampungModalInvestment { ... }
```

### Phase 4 — Tabel Tambahan (Operasional)

```prisma
// Announcement — Pengumuman
model Announcement { ... }

// Notification — Notifikasi user
model Notification { ... }

// SupportTicket — Tiket bantuan
model SupportTicket { ... }

// Wisata — Paket wisata
model Wisata { ... }

// WisataBooking — Booking wisata
model WisataBooking { ... }

// ExportImport — Permohonan ekspor/impor
model ExportImport { ... }
```

## 11.3 Entity Relationship Diagram (MVP)

```
User ─────────┬──── Tier (tierId)
              │
              ├──── KPA (kpaId)
              │
              ├──── Pendaftaran (userId) ◄──── Tier (tierId)
              │                                  │
              │                                  └──── Payment (pendaftaranId)
              │
              └──── Payment (userId)

Provinsi ────────────── KabKota (provinsiId)

Setting (standalone)
FAQ (standalone)
```

---

# 12. ALUR OPERASIONAL SISTEM

## 12.1 Alur Pendaftaran Member (End-to-End)

```
USER                              SYSTEM                           ADMIN
 │                                  │                                │
 │ 1. Buka kopnusa.id               │                                │
 │─────────────────────────────────▶│                                │
 │                                  │                                │
 │ 2. Klik "Daftar Sekarang"        │                                │
 │─────────────────────────────────▶│                                │
 │                                  │                                │
 │ 3. Pilih Tingkat Wilayah         │                                │
 │   (Desa/Kec/Kab/Prov/Nas/Asia)  │                                │
 │─────────────────────────────────▶│                                │
 │                                  │ GET /api/public/tiers          │
 │                                  │◀───────────────────────────────│
 │◀─────────────────────────────────│ Data tier dari database        │
 │                                  │                                │
 │ 4. Isi Data Diri                 │                                │
 │   Nama, NIK, Email, No HP,       │                                │
 │   Alamat, Tgl Lahir, Jenis Kelamin│                               │
 │─────────────────────────────────▶│                                │
 │                                  │ Validasi input                  │
 │◀─────────────────────────────────│ OK / Error                     │
 │                                  │                                │
 │ 5. Upload Dokumen                │                                │
 │   Foto KTP + Foto Selfie         │                                │
 │─────────────────────────────────▶│ Uploadthing API                │
 │                                  │                                │
 │ 6. Pilih Metode Pembayaran       │                                │
 │─────────────────────────────────▶│                                │
 │                                  │ POST /api/pendaftaran          │
 │                                  │ → Simpan ke DB (status: PENDING)│
 │                                  │ → Midtrans: Generate Snap Token│
 │◀─────────────────────────────────│ Snap Token (popup pembayaran)  │
 │                                  │                                │
 │ 7. Bayar via Midtrans            │                                │
 │   (Gopay/VA/E-Wallet/Card)       │                                │
 │─────────────────────────────────▶│ Midtrans processes payment     │
 │                                  │                                │
 │                                  │ Webhook: /api/midtrans/webhook │
 │                                  │ → Update Payment status: PAID  │
 │                                  │ → Update Pendaftaran: PAID     │
 │                                  │ → Kirim Email: "Terima Kasih"  │
 │                                  │                                │
 │◀─────────────────────────────────│ Email: Pendaftaran Diterima    │
 │  Halaman: "Menunggu Review"      │                                │
 │                                  │                                │
 │                                  │                                │
 │                                  │  8. Admin Review                │
 │                                  │───────────────────────────────▶│
 │                                  │  GET /api/admin/pendaftaran    │
 │                                  │◀───────────────────────────────│
 │                                  │  List pendaftaran pending       │
 │                                  │                                │
 │                                  │  9. Admin Approve               │
 │                                  │───────────────────────────────▶│
 │                                  │  POST /api/admin/pendaftaran/  │
 │                                  │        [id]/approve            │
 │                                  │◀───────────────────────────────│
 │                                  │                                │
 │                                  │ System:                         │
 │                                  │ → Generate NIAK                │
 │                                  │ → Create User (status: ACTIVE)  │
 │                                  │ → Update Pendaftaran: APPROVED │
 │                                  │ → Kirim Email Approval + NIAK  │
 │                                  │                                │
 │◀─────────────────────────────────│ Email: Selamat! Kamu sudah     │
 │                                  │ menjadi anggota KNBMP.          │
 │  Halaman: "Pendaftaran Disetujui"│ NIAK: KNBMP-2025-00001         │
 │                                  │                                │
 │                                  │  ATAU                           │
 │                                  │                                │
 │                                  │  10. Admin Reject                │
 │                                  │───────────────────────────────▶│
 │                                  │  POST /api/admin/pendaftaran/  │
 │                                  │        [id]/reject             │
 │                                  │◀───────────────────────────────│
 │                                  │                                │
 │                                  │ System:                         │
 │                                  │ → Update Pendaftaran: REJECTED │
 │                                  │ → Kirim Email Penolakan         │
 │                                  │                                │
 │◀─────────────────────────────────│ Email: Maaf, pendaftaran Anda  │
 │                                  │ ditolak. Alasan: [alasan]      │
```

## 12.2 Alur Login Admin

```
ADMIN                             SYSTEM
 │                                  │
 │ 1. Buka kopnusa.id/login         │
 │─────────────────────────────────▶│
 │                                  │
 │ 2. Masukkan Email + Password     │
 │─────────────────────────────────▶│ POST /api/auth/login
 │                                  │ → bcrypt.compare(password, hash)
 │                                  │ → Generate session token
 │◀─────────────────────────────────│ { user, token } atau Error
 │                                  │
 │ 3. Redirect ke /admin            │
 │                                  │ GET /api/auth/me (verify token)
 │─────────────────────────────────▶│◀───────────────────────
 │◀─────────────────────────────────│ { user data }
 │                                  │
 │ 4. Dashboard Admin               │
 │                                  │ GET /api/admin/dashboard/stats
 │─────────────────────────────────▶│◀───────────────────────
 │◀─────────────────────────────────│ { totalMembers, pendingRegistrations, ... }
```

## 12.3 Alur Email (Resend)

```
TRIGGER                    TEMPLATE                     RECIPIENT
───────                    ────────                     ────────

Pendaftaran baru           ✉️ "Pendaftaran Diterima"     User
(Pembayaran berhasil)     → Terima kasih telah mendaftar
                           → Menunggu review admin
                           → No. Pendaftaran: XXX

Admin Approve              ✉️ "Selamat! Anda sudah       User
                           resmi menjadi anggota KNBMP"
                           → NIAK: KNBMP-2025-XXXXX
                           → Hak-hak keanggotaan
                           → Link login

Admin Reject               ✉️ "Pendaftaran Ditolak"       User
                           → Maaf, pendaftaran ditolak
                           → Alasan: [alasan dari admin]
                           → Bisa mendaftar ulang

Pembayaran Gagal          ✉️ "Pembayaran Gagal"          User
                           → Waktu pembayaran habis
                           → Link untuk bayar ulang
```

## 12.4 Alur Midtrans (Payment Gateway)

```
USER                 PLATFORM            MIDTRANS
 │                      │                    │
 │ Pilih metode bayar   │                    │
 │─────────────────────▶│                    │
 │                      │ POST /api/pendaftaran│
 │                      │                    │
 │                      │ Get Snap Token ────▶│
 │                      │◀─── Snap Token ─────│
 │                      │                    │
 │◀─ Snap Popup ────────│                    │
 │  (Midtrans UI)       │                    │
 │──────────────────────────────────────────▶│
 │  Bayar (Gopay/VA/    │                    │
 │  E-Wallet/Card)      │                    │
 │                      │                    │
 │                      │  Webhook ──────────│
 │                      │◀─ Payment Status ──│
 │                      │                    │
 │                      │ Update DB:         │
 │                      │ → Payment: PAID    │
 │                      │ → Pendaftaran: PAID│
 │                      │ → Kirim Email      │
```

---

# 13. INTEGRASI LAYANAN EKSTERNAL

## 13.1 Matrix Integrasi

| Layanan | Provider | Fungsi | API Key | Status |
|---------|----------|--------|---------|--------|
| **Database** | Neon PostgreSQL | Cloud database | DATABASE_URL | ✅ Aktif |
| **Email** | Resend | Kirim email otomatis | RESEND_API_KEY | ✅ Verified |
| **Payment** | Midtrans | Payment gateway | SB-Mid-server-xxx | ✅ Sandbox |
| **Upload** | Uploadthing | Upload foto KTP/Selfie | UPLOADTHING_SECRET | ✅ Ready |
| **WhatsApp** | Fonnte | Notifikasi WA | FONNTE_API_KEY | ⏳ Deferred |
| **Hosting** | Vercel | Deploy website | - | ✅ Aktif |
| **Domain** | idcloudhost | kopnusa.id | - | ✅ Aktif |
| **Auth** | NextAuth.js | Login session | AUTH_SECRET | ✅ Ready |

## 13.2 Environment Variables Required

```env
# DATABASE (Neon PostgreSQL)
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require

# AUTH
AUTH_SECRET=<generated-random-string-64-chars>

# EMAIL (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@kopnusa.id

# FILE UPLOAD (Uploadthing)
UPLOADTHING_SECRET=sk_xxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxx

# PAYMENT (Midtrans)
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxx
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false

# FRONTEND
NEXT_PUBLIC_FRONTEND_URL=https://kopnusa.id

# WHATSAPP (Fonnte) - Opsional
FONNTE_API_KEY=xxxxxxxxxx
```

---

# 14. ANALISIS PROYEK SAAT INI

## 14.1 Apa yang Sudah Dibangun

| Komponen | File | Kondisi | Catatan |
|----------|------|---------|---------|
| **Landing Page** | `src/app/page.tsx` | ⚠️ Monolith | 2.152 baris, semua dalam 1 file |
| **Tier Data** | Hardcoded di `TIERS` constant | ❌ Bukan DB | 7 tier, tapi hardcoded |
| **FAQ Data** | Hardcoded di `FAQ_ITEMS` | ❌ Bukan DB | 6 FAQ, tapi hardcoded |
| **Activity Log** | Mock data di `MOCK_ACTIVITIES` | ❌ Palsu | Data contoh, bukan asli |
| **Hero Section** | Inline component | ✅ Visual OK | Bagus secara desain |
| **About Section** | Inline component | ✅ Visual OK | Konten statis |
| **Registration** | Inline multi-step form | ⚠️ Tidak terkoneksi | Form ada tapi tidak kirim ke API |
| **Login Page** | Inline form | ⚠️ Mock auth | Login tanpa koneksi API asli |
| **Admin Dashboard** | Inline component | ⚠️ Data mock | Stats, charts pakai data palsu |
| **Navbar** | Inline component | ✅ OK | Responsive |
| **Footer** | Inline component | ✅ OK | Link navigasi |
| **API Routes** | 14 files | ✅ Sebagian berfungsi | Login, pendaftaran, stats |
| **Prisma Schema** | `schema.prisma` | ⚠️ Over-engineered | 25+ tabel, 8 yang dipakai |
| **Seed Data** | `prisma/seed.ts` | ✅ Baik | 7 tier, 6 KPA, admin, FAQ, dll |
| **Email Templates** | `src/lib/resend.ts` | ✅ Siap | 4 template |
| **Midtrans Integration** | `src/lib/midtrans.ts` | ✅ Siap | Sandbox |
| **Uploadthing** | `src/lib/uploadthing.ts` | ✅ Siap | Upload config |
| **Auth Logic** | `src/lib/auth.ts` | ✅ Ada | bcryptjs + NextAuth |

## 14.2 Apa yang TIDAK Ada / Bermasalah

| Masalah | Dampak | Prioritas |
|---------|--------|-----------|
| Semua UI di 1 file (2.152 baris) | Susah maintain, duplicate code | 🔴 Critical |
| Data tier hardcoded | Perubahan harga di DB tidak berpengaruh | 🔴 Critical |
| Data FAQ hardcoded | FAQ di DB tidak tampil | 🔴 Critical |
| Activity log mock | Admin dashboard menampilkan data palsu | 🟡 Medium |
| Form pendaftaran tidak kirim ke API | Data tidak tersimpan | 🔴 Critical |
| Login menggunakan mock auth | Tidak terkoneksi ke database | 🔴 Critical |
| Admin dashboard data mock | Statistik tidak akurat | 🔴 Critical |
| Nama "KNMP" vs "KNBMP" | Inkonsistensi branding | 🟡 Medium |
| Tier system (hierarki) vs zonasi | Business model tidak match | 🔴 Critical |
| Tabel tidak perlu sudah dibuat | Waste resource | 🟢 Low |

## 14.3 Kesimpulan Analisis

**Project saat ini = Prototype Visual yang BAGUS secara desain, tapi TIDAK BERFUNGSI sebagai sistem operasional.**

Analogi: Seperti rumah yang cat-nya bagus, tapi pipa airnya belum dipasang. Kelihatan cantik dari luar, tapi tidak bisa ditinggali.

**Keputusan: REBUILD dengan fondasi yang benar, tapi PAKAI desain visual yang sudah ada sebagai referensi.**

---

# 15. RENCANA REBUILD PLATFORM

## 15.1 Pendekatan: "Database-First, Component-Based"

```
REBUILD ROADMAP
===============

PHASE 0: Persiapan (1 hari)
├── Backup project lama
├── Setup Neon PostgreSQL
├── Update Prisma schema (minimal MVP)
└── Buat .env file

PHASE 1: Backend/API (3-5 hari)
├── Step 1.1: Schema & Seed
│   ├── Update schema.prisma (8 tabel MVP)
│   ├── prisma db push (Neon)
│   └── prisma seed (data awal)
│
├── Step 1.2: Public API
│   ├── GET /api/public/tiers (data tier dari DB)
│   ├── GET /api/public/faq (data FAQ dari DB)
│   └── GET /api/public/settings (data pengaturan)
│
├── Step 1.3: Auth API
│   ├── POST /api/auth/login
│   ├── POST /api/auth/logout
│   ├── POST /api/auth/register
│   └── GET /api/auth/me
│
├── Step 1.4: Pendaftaran API
│   ├── POST /api/pendaftaran (submit pendaftaran baru)
│   ├── GET /api/pendaftaran?email=xxx (cek status)
│   └── Integration: Uploadthing + Midtrans
│
└── Step 1.5: Admin API
    ├── GET /api/admin/dashboard/stats
    ├── GET /api/admin/pendaftaran
    ├── POST /api/admin/pendaftaran/[id]/approve
    ├── POST /api/admin/pendaftaran/[id]/reject
    └── GET /api/admin/members

PHASE 2: Frontend - Layout (1-2 hari)
├── Root Layout (layout.tsx)
├── Navbar (components/layout/navbar.tsx)
├── Footer (components/layout/footer.tsx)
├── Mobile Navigation
└── Global Styles & Theme

PHASE 3: Frontend - Landing Page (2-3 hari)
├── Hero Section (from DB settings)
├── About Section (from DB settings)
├── Membership Section (from DB tiers) ← DATA DRIVEN!
├── FAQ Section (from DB faq) ← DATA DRIVEN!
├── Contact Section (from DB settings)
└── Responsive Testing

PHASE 4: Frontend - Pendaftaran (2-3 hari)
├── Step 1: Pilih Tingkat Wilayah (from DB tiers)
├── Step 2: Isi Data Diri
├── Step 3: Upload Dokumen (Uploadthing)
├── Step 4: Pembayaran (Midtrans Snap)
├── Step 5: Halaman Selesai
└── Form Validation (Zod)

PHASE 5: Frontend - Login & Admin (3-4 hari)
├── Login Page
├── Admin Layout (Sidebar)
├── Admin Dashboard (stats from API)
├── Admin Pendaftaran List (from API)
├── Admin Approve/Reject Modal
└── Admin Members List

PHASE 6: Testing & Polish (2-3 hari)
├── End-to-End Testing
├── Email Testing (Resend)
├── Payment Testing (Midtrans Sandbox)
├── Mobile Responsive Testing
└── Bug Fixing

PHASE 7: Deploy to Vercel (1 hari)
├── Push to GitHub
├── Update Prisma provider to postgresql
├── Set env vars in Vercel
├── Run prisma db push on Neon
├── Seed production data
└── Test production

TOTAL ESTIMASI: 15-22 hari kerja
```

## 15.2 Urutan Pengerjaan (Per Hari)

| Hari | Fokus | Deliverable |
|------|-------|-------------|
| **1** | Persiapan | Neon ready, schema MVP, .env, seed data |
| **2** | API - Public | GET /tiers, GET /faq, GET /settings |
| **3** | API - Auth | Login, logout, register, me |
| **4** | API - Pendaftaran | POST pendaftaran, integrasi Midtrans |
| **5** | API - Admin | Dashboard stats, list, approve/reject |
| **6** | Frontend - Layout | Navbar, Footer, Layout |
| **7-8** | Frontend - Landing | Semua section dari DB |
| **9-10** | Frontend - Pendaftaran | Multi-step form + upload + bayar |
| **11-12** | Frontend - Login | Login page, session management |
| **13-15** | Frontend - Admin | Dashboard, list, approve/reject |
| **16-17** | Testing | E2E, email, payment, responsive |
| **18** | Deploy | Vercel, Neon, test production |

---

# 16. REVENUE MODEL & KEUANGAN

## 16.1 Sumber Pendapatan KNBMP

```
┌────────────────────────────────────────────────────────────────┐
│                   REVENUE STREAMS KNBMP                        │
├────────────────┬──────────┬──────────────┬────────────────────┤
│ Sumber         │ Model    │ Estimasi/Bln │ Catatan            │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Biaya Daftar   │ One-time │ Rp 0-20jt   │ Sesuai tingkat     │
│ Member         │ per      │ x member baru│ wilayah            │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Simpanan Pokok │ One-time │ Rp 50rb-20jt│ Aset koperasi      │
│                │          │ per member   │                    │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Simpanan Wajib │ Bulanan  │ Rp 10rb-1jt  │ Aset koperasi      │
│                │          │ per member   │                    │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Komisi         │ Per      │ 1-7%         │ Dari transaksi     │
│ Transaksi      │ transaksi│              │ marketplace        │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Platform Fee   │ Per      │ 1-2%         │ Biaya penggunaan   │
│                │ transaksi│              │ platform           │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Kampung Modal  │ Per      │ 2-5%         │ Fee pengelolaan    │
│ Fee            │ proyek   │ dari dana    │ crowdfunding       │
│                │ berhasil │ yang terkumpul│                    │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Wisata Fee     │ Per      │ 5-10%        │ Komisi paket wisata│
│                │ booking  │              │                    │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Ekspor-Impor   │ Per      │ 3-5%         │ Fee fasilitasi     │
│ Fee            │ transaksi│              │ ekspor/impor       │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Pelatihan      │ Per      │ Rp 100rb-5jt │ Fee pelatihan EKTA │
│ Fee            │ peserta  │ per sesi     │                    │
├────────────────┼──────────┼──────────────┼────────────────────┤
│ Iklan /        │ Per      │ Negotiable   │ Iklan di platform  │
│ Sponsorship    │ campaign │              │ & newsletter       │
└────────────────┴──────────┴──────────────┴────────────────────┘
```

## 16.2 Proyeksi Sederhana (Tahun 1)

**Asumsi:**
- 500 member baru/bulan (rata-rata)
- Rata-rata biaya pendaftaran: Rp 500.000
- Rata-rata simpanan wajib: Rp 50.000/bulan
- 50% member aktif bertransaksi, avg Rp 1.000.000/bln
- Komisi platform: 2%

| Sumber | Per Bulan | Per Tahun |
|--------|-----------|-----------|
| Pendaftaran (500 x Rp 500k) | Rp 250.000.000 | Rp 3.000.000.000 |
| Simpanan Wajib (6000 x Rp 50k) | Rp 300.000.000 | Rp 3.600.000.000 |
| Komisi Transaksi (2% x Rp 3M) | Rp 60.000.000 | Rp 720.000.000 |
| **TOTAL (estimasi)** | **Rp 610.000.000** | **Rp 7.320.000.000** |

> **Catatan:** Ini estimasi konservatif. Angka sebenarnya tergantung eksekusi.

## 16.3 Biaya Operasional

| Item | Per Bulan | Per Tahun |
|------|-----------|-----------|
| Vercel (Hosting) | ~Rp 500.000 | ~Rp 6.000.000 |
| Neon (Database) | ~Rp 300.000 | ~Rp 3.600.000 |
| Resend (Email) | ~Rp 200.000 | ~Rp 2.400.000 |
| Midtrans (Payment) | Variable | ~Rp 5.000.000 |
| Uploadthing (Upload) | ~Rp 150.000 | ~Rp 1.800.000 |
| Domain (kopnusa.id) | ~Rp 100.000 | ~Rp 1.200.000 |
| Fonnte (WhatsApp) | ~Rp 200.000 | ~Rp 2.400.000 |
| **TOTAL** | **~Rp 1.450.000** | **~Rp 22.400.000** |

> **ROI sangat tinggi** — biaya teknologi sangat rendah dibanding potensi revenue.

---

# 17. ROADMAP PENGEMBANGAN

## 17.1 Timeline 12 Bulan

```
MONTH 1-2: MVP (Minimum Viable Product)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── ✅ Pendaftaran member online
├── ✅ Login admin dashboard
├── ✅ Approve/Reject member
├── ✅ Email otomatis (Resend)
├── ✅ Pembayaran (Midtrans Sandbox)
├── ✅ Upload KTP/Selfie
└── ✅ Landing page (database-driven)

MONTH 3-4: MARKETPLACE V1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── 🔲 Toko digital member
├── 🔲 Produk catalog
├── 🔲 Keranjang & checkout
├── 🔲 Pembayaran produk
├── 🔲 Rating & review
└── 🔲 Search & filter

MONTH 5-6: KAMPUNG MODAL & WISATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── 🔲 Platform crowdfunding
├── 🔲 Investor dashboard
├── 🔲 Paket wisata lokal
├── 🔲 Paket wisata religi
├── 🔲 Booking system
└── 🔲 WhatsApp notification (Fonnte)

MONTH 7-9: EKSPOR-IMPOR & LOGISTIK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── 🔲 Portal ekspor-impor
├── 🔲 Koneksi buyer/supplier internasional
├── 🔲 Tracking logistik
├── 🔲 Gudang management
├── 🔲 Cold chain monitoring
└── 🔲 Dokumen ekspor-impor digital

MONTH 10-12: SHU, ACADEMY & MOBILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├── 🔲 SHU digital (real-time)
├── 🔲 RAT digital (voting online)
├── 🔲 Academy KNBMP (LMS)
├── 🔲 Mobile App (Android/iOS)
├── 🔲 AI Analytics & Recommendation
└── 🔲 API untuk partner eksternal
```

## 17.2 Milestone & Success Metrics

| Milestone | Target | KPI |
|-----------|--------|-----|
| **MVP Launch** | Bulan 2 | Platform online, 50+ pendaftar |
| **100 Members** | Bulan 3 | 100 member aktif |
| **Marketplace Live** | Bulan 4 | 50+ produk listing |
| **Midtrans Production** | Bulan 3 | Switch dari sandbox ke production |
| **500 Members** | Bulan 6 | 500 member aktif, Rp 100jt+ transaksi |
| **Kampung Modal** | Bulan 6 | 10+ proyek crowdfunding |
| **First Export** | Bulan 9 | 1+ transaksi ekspor berhasil |
| **1.000 Members** | Bulan 9 | 1.000 member aktif |
| **Academy Launch** | Bulan 10 | 5+ pelatihan online |
| **Mobile App** | Bulan 12 | 500+ download |
| **5.000 Members** | Bulan 12 | 5.000 member aktif |

---

# 18. RISIKO & MITIGASI

## 18.1 Matrix Risiko

| # | Risiko | Probabilitas | Dampak | Mitigasi |
|---|--------|:------------:|:------:|----------|
| 1 | **Keamanan Data** | Medium | Tinggi | Enkripsi password (bcryptjs), HTTPS, env vars, audit log |
| 2 | **Payment Fraud** | Medium | Tinggi | Midtrans sandbox → production, webhook verification, fraud detection |
| 3 | **Server Downtime** | Rendah | Tinggi | Vercel auto-scaling, Neon read replicas, monitoring |
| 4 | **Regulasi Berubah** | Rendah | Medium | Pantau regulasi koperasi, konsultasi legal |
| 5 | **Adopsi Member Rendah** | Medium | Tinggi | Marketing digital, referral program, sosialisasi desa |
| 6 | **Kompetitor** | Medium | Medium | Fokus pada value proposition unik (zonasi wilayah) |
| 7 | **Teknologi Usang** | Rendah | Rendah | Tech stack modern, regularly updated |
| 8 | **Cash Flow** | Medium | Tinggi | Simpanan wajib sebagai base, diversifikasi revenue |
| 9 | **Human Error (Admin)** | Tinggi | Medium | Audit trail, approval workflow, training |
| 10 | **DDoS / Cyber Attack** | Rendah | Tinggi | Vercel DDoS protection, rate limiting |

## 18.2 Business Continuity Plan

```
NORMAL OPERATION
      │
      ▼
MONITORING (24/7 via Vercel)
      │
      ├── Issue Detected ──▶ AUTO-ALERT (Email/WhatsApp)
      │                          │
      │                    ┌─────┴─────┐
      │                    ▼           ▼
      │              Minor Issue   Major Issue
      │                    │           │
      │              Auto-fix      Manual Intervention
      │              (Vercel)      (Admin + Dev)
      │                    │           │
      └────────────────────┴───────────┘
                           │
                           ▼
                    POST-MORTEM
                    (Dokumentasi &
                     Preventive Action)
```

---

# 19. GLOSARIUM

| Istilah | Definisi |
|---------|----------|
| **KNBMP** | Koperasi Nusa Berdikari Merah Putih |
| **EKTA** | Program keanggotaan premium KNBMP (Member EKTA) |
| **JE-P3** | Jaringan Ekonomi Petani dan Pedagang Produktif |
| **NIAK** | Nomor Induk Anggota Koperasi — ID unik setiap member |
| **RAT** | Rapat Anggota Tahunan — forum tertinggi koperasi |
| **SHU** | Sisa Hasil Usaha — pembagian keuntungan koperasi ke anggota |
| **KUR** | Kredit Usaha Rakyat — program kredit bank untuk UMKM |
| **KPA** | Komisi Pemberdayaan Anggota — divisi internal koperasi |
| **Tier** | Tingkatan keanggotaan berdasarkan cakupan wilayah |
| **Zonasi** | Sistem pembagian area akses berdasarkan tingkat keanggotaan |
| **Kordes** | Koordinator Desa |
| **KORCAM** | Koordinator Kecamatan |
| **KORDA** | Koordinator Kabupaten/Kota |
| **KORWIL** | Koordinator Wilayah (Provinsi) |
| **KORNAS** | Koordinator Nasional |
| **Midtrans** | Payment gateway untuk transaksi online |
| **Resend** | layanan pengiriman email transactional |
| **Uploadthing** | Layanan upload file (foto KTP, selfie) |
| **Fonnte** | Layanan WhatsApp API untuk notifikasi |
| **Neon** | Cloud PostgreSQL database |
| **Prisma** | ORM (Object-Relational Mapping) untuk database |
| **Next.js** | Framework web full-stack berbasis React |
| **Vercel** | Platform hosting untuk Next.js |
| **API** | Application Programming Interface — jalur komunikasi data |
| **MVP** | Minimum Viable Product — versi paling sederhana yang berfungsi |
| **ORM** | Object-Relational Mapping — alat untuk mengelola database dengan kode |
| **CUID** | Collision-resistant Unique Identifier — format ID unik |
| **SSL** | Secure Sockets Layer — enkripsi data internet |
| **bcrypt** | Algoritma hashing password (keamanan) |
| **Webhook** | Notifikasi otomatis dari layanan eksternal ke sistem kita |
| **Snap Token** | Token dari Midtrans untuk membuka popup pembayaran |
| **VA** | Virtual Account — nomor rekening virtual untuk pembayaran |

---

# 20. LAMPIRAN

## 20.1 Checklist Master Setup (Untuk User)

```
┌─────────────────────────────────────────────────────────────┐
│              CHECKLIST MASTER SETUP KNBMP                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ☐ A. AKUN & LAYANAN                                       │
│    ☐ GitHub Account                                        │
│    ☐ Vercel Account (terhubung GitHub)                     │
│    ☐ Neon Database (terhubung Vercel)                      │
│    ☐ Resend Account (domain kopnusa.id verified)           │
│    ☐ Midtrans Account (Sandbox ready)                      │
│    ☐ Uploadthing Account                                   │
│    ☐ Fonnte Account (opsional)                             │
│    ☐ Domain kopnusa.id (idcloudhost)                       │
│                                                             │
│  ☐ B. ENVIRONMENT VARIABLES                                │
│    ☐ DATABASE_URL (Neon)                                   │
│    ☐ AUTH_SECRET (generated)                               │
│    ☐ RESEND_API_KEY                                        │
│    ☐ RESEND_FROM_EMAIL (noreply@kopnusa.id)                │
│    ☐ UPLOADTHING_SECRET                                    │
│    ☐ UPLOADTHING_APP_ID                                    │
│    ☐ MIDTRANS_SERVER_KEY                                   │
│    ☐ MIDTRANS_CLIENT_KEY                                   │
│    ☐ NEXT_PUBLIC_MIDTRANS_CLIENT_KEY                       │
│    ☐ MIDTRANS_IS_PRODUCTION=false                          │
│    ☐ NEXT_PUBLIC_FRONTEND_URL                              │
│    ☐ FONNTE_API_KEY                                        │
│                                                             │
│  ☐ C. LOCAL DEVELOPMENT                                    │
│    ☐ Node.js 20 LTS terinstall                             │
│    ☐ Git terinstall                                        │
│    ☐ VS Code terinstall                                    │
│    ☐ Project cloned dari GitHub                            │
│    ☐ npm install berhasil                                  │
│    ☐ .env file dibuat dan diisi                            │
│    ☐ prisma db push berhasil (ke Neon)                     │
│    ☐ prisma seed berhasil                                 │
│    ☐ npm run dev berhasil                                  │
│    ☐ Landing page tampil                                   │
│    ☐ API /api/public/tiers mengembalikan data dari DB      │
│                                                             │
│  ☐ D. DEPLOYMENT                                           │
│    ☐ Code push ke GitHub                                   │
│    ☐ Vercel connected ke repo                              │
│    ☐ Semua env vars di Vercel                              │
│    ☐ DATABASE_URL di Vercel = Neon (bukan SQLite)          │
│    ☐ Build berhasil                                        │
│    ☐ Website online di kopnusa.id                          │
│    ☐ Semua fitur berjalan di production                    │
│                                                             │
│  ☐ E. TEST END-TO-END                                      │
│    ☐ Landing page: semua section tampil                    │
│    ☐ Pendaftaran: form terisi, data tersimpan              │
│    ☐ Pembayaran: Midtrans popup muncul                     │
│    ☐ Email: terkirim setelah pendaftaran                   │
│    ☐ Login admin: berhasil masuk                           │
│    ☐ Admin dashboard: stats benar                          │
│    ☐ Admin approve: NIAK tergenerate, email terkirim       │
│    ☐ Admin reject: email penolakan terkirim               │
│    ☐ Mobile responsive: tampil baik di HP                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 20.2 Akun Admin Default

```
Email:    admin@kopnusa.id
Password: admin123456 (GANTI di production!)
Role:     SUPER_ADMIN
NIAK:     KNBMP-ADMIN-001
```

## 20.3 Kontak & Sumber Daya

| Sumber Daya | URL |
|-------------|-----|
| Vercel Dashboard | https://vercel.com |
| Neon Console | https://console.neon.tech |
| Resend Dashboard | https://resend.com |
| Midtrans Dashboard | https://dashboard.midtrans.com |
| Uploadthing Dashboard | https://uploadthing.com |
| Fonnte Dashboard | https://fonnte.com |
| Next.js Documentation | https://nextjs.org/docs |
| Prisma Documentation | https://www.prisma.io/docs |
| Tailwind CSS | https://tailwindcss.com |
| shadcn/ui | https://ui.shadcn.com |
| Lucide Icons | https://lucide.dev |

## 20.4 Versi Dokumen

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 1.0 | - | Versi awal project (KNMP) |
| 2.0 | Juni 2025 | Rebranding KNBMP, EKTA system, zonasi wilayah, whitepaper lengkap |

---

> **Dokumen ini bersifat living document dan akan terus diperbarui seiring perkembangan proyek.**

---

**© 2025 Koperasi Nusa Berdikari Merah Putih (KNBMP)**
**Whitepaper v2.0 — God Tier Edition**
**Dibuat dengan dedikasi untuk membangun Indonesia dari Desa.** 🇮🇩
