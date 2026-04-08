'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, Shield, Scale, Users, Building2, Lock,
  ArrowLeft, ChevronRight, Eye, EyeOff, FileSignature,
  Globe, Database, Award, AlertTriangle, Gavel,
  ArrowUp, Menu, X, Scroll
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

interface PasalItem {
  nomor: string
  ayat?: string[]
  definisi?: { istilah: string; penjelasan: string }[]
  prinsip?: { nama: string; deskripsi: string }[]
  pilar?: { nomor: string; nama: string; deskripsi: string }[]
  kpa?: { nomor: string; nama: string; anggota: string; catatan?: string }[]
  subs?: { ayat: string; isi: string }[]
  teks?: string
}

interface BabItem {
  nomor: string
  judul: string
  pasalMulai: string
  pasalSelesai: string
  icon: React.ReactNode
  content: PasalItem[]
}

const babs: BabItem[] = [
  {
    nomor: 'I',
    judul: 'KETENTUAN UMUM',
    pasalMulai: '1',
    pasalSelesai: '2',
    icon: <BookOpen className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 1',
        teks: 'Definisi - Dalam Anggaran Dasar ini yang dimaksud dengan:',
        definisi: [
          { istilah: 'KKMNMP/KNMP', penjelasan: 'Koperasi Korporasi Multipihak Nusa Merah Putih, badan hukum koperasi berdasarkan UU No. 25 Tahun 1992 jo. UU No. 20 Tahun 2008 tentang Koperasi yang menggunakan mekanisme Koperasi Multi Pihak.' },
          { istilah: 'Koperasi Multi Pihak', penjelasan: 'Koperasi yang anggotanya terdiri dari pihak-pihak yang memiliki kepentingan dalam koperasi sebagaimana dimaksud dalam Peraturan Menteri Koperasi dan UKM Nomor 8 Tahun 2021 tentang Pendirian, Pengurusan, dan Pembubaran Koperasi Multi Pihak.' },
          { istilah: 'Wali Amanat Data', penjelasan: 'Mekanisme perlindungan data anggota di mana KKMNMP bertindak sebagai wali amanat (fiduciary) atas seluruh data yang dikumpulkan, bukan pemilik data.' },
          { istilah: "Arm's Length Principle", penjelasan: 'Prinsip dimana setiap transaksi, perjanjian, atau kerja sama antara KKMNMP dan pihak ketiga harus dilakukan seolah-olah kedua belah pihak tidak memiliki hubungan istimewa, dengan harga dan syarat yang wajar dan seimbang.' },
          { istilah: 'Ring-Fencing', penjelasan: 'Mekanisme isolasi keuangan dan operasional yang memastikan bahwa aset, liabilitas, dan risiko dari suatu unit usaha tidak memengaruhi unit usaha lainnya atau entitas induk secara keseluruhan.' },
          { istilah: 'Hak Uji Materiil Suspensif', penjelasan: 'Hak anggota untuk mengajukan uji materiil terhadap keputusan manajemen yang dianggap bertentangan dengan AD/ART dengan efek suspender (menghentikan sementara) pelaksanaan keputusan yang bersangkutan.' },
          { istilah: 'Kampung Modal', penjelasan: 'Unit usaha otonom KKMNMP yang berfungsi sebagai platform equity crowdfunding terdesentralisasi untuk memobilisasi modal dari berbagai sumber guna pembiayaan proyek-proyek produktif di tingkat desa.' },
          { istilah: 'NIAK', penjelasan: 'Nomor Induk Anggota Koperasi, identitas unik digital yang diberikan kepada setiap anggota KKMNMP yang berfungsi sebagai akses tunggal ke seluruh ekosistem layanan koperasi.' },
          { istilah: 'Pentagon Kedaulatan', penjelasan: 'Konsep keanggotaan lima pihak (Pentagon) yang memastikan setiap Kelompok Pihak yang Berkepentingan (KPA) memiliki suara yang setara sebesar 20% dalam pengambilan keputusan.' }
        ]
      },
      {
        nomor: 'Pasal 2',
        teks: 'Dasar Hukum - Koperasi ini berdiri berdasarkan:',
        ayat: [
          'Undang-Undang Nomor 25 Tahun 1992 tentang Perkoperasian jo. Undang-Undang Nomor 20 Tahun 2008 tentang Usaha Mikro, Kecil, Menengah, dan Koperasi;',
          'Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP);',
          'Peraturan Menteri Koperasi dan UKM Nomor 8 Tahun 2021 tentang Pendirian, Pengurusan, dan Pembubaran Koperasi Multi Pihak;',
          'Regulasi Otoritas Jasa Keuangan (OJK) yang terkait dengan sektor keuangan koperasi;',
          'Peraturan perundang-undangan lainnya yang relevan.'
        ]
      }
    ]
  },
  {
    nomor: 'II',
    judul: 'NAMA, IDENTITAS GANDA',
    pasalMulai: '3',
    pasalSelesai: '4',
    icon: <Building2 className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 3',
        teks: 'Dual-Identity System - Koperasi ini menggunakan sistem identitas ganda:',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP (Koperasi Korporasi Multipihak Nusa Merah Putih) — digunakan sebagai identitas resmi, legal, dan korporat dalam seluruh dokumen hukum, perizinan, dan korespondensi resmi.' },
          { ayat: '(2)', isi: 'KNMP (Koperasi Nusa Merah Putih) — digunakan sebagai identitas branding, publikasi, dan pemasaran yang lebih singkat dan mudah diingat oleh masyarakat luas.' },
          { ayat: '(3)', isi: 'Kedua identitas tersebut merujuk pada entitas hukum yang sama dan memiliki kekuatan hukum yang setara.' },
          { ayat: '(4)', isi: 'Penggunaan salah satu identitas dalam dokumen resmi tidak mengurangi keabsahan dokumen tersebut selama merujuk pada entitas yang sama.' }
        ]
      },
      {
        nomor: 'Pasal 4',
        teks: 'Kedudukan dan Portal:',
        subs: [
          { ayat: '(1)', isi: 'Kedudukan Koperasi berada di Daerah Khusus Ibukota Jakarta.' },
          { ayat: '(2)', isi: 'Portal digital resmi Koperasi beralamat di kopnusa.id sebagai satu-satunya platform resmi transaksi dan keanggotaan.' },
          { ayat: '(3)', isi: 'Kantor pusat dapat dipindahkan ke wilayah lain di wilayah Negara Kesatuan Republik Indonesia berdasarkan keputusan Rapat Anggota Paripurna (RAP).' }
        ]
      }
    ]
  },
  {
    nomor: 'III',
    judul: 'LANDASAN & ASAS',
    pasalMulai: '5',
    pasalSelesai: '6',
    icon: <Scale className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 5',
        teks: 'Landasan & Asas Koperasi:',
        subs: [
          { ayat: '(1)', isi: 'Koperasi ini berlandaskan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.' },
          { ayat: '(2)', isi: 'Koperasi ini berasas Kekeluargaan sebagai asas fundamental yang mendasari seluruh kegiatan usaha dan pengambilan keputusan.' },
          { ayat: '(3)', isi: 'Seluruh anggota tanpa memandang latar belakang KPA-nya memiliki kedudukan yang setara dalam hak dan kewajibannya sebagai anggota Koperasi.' }
        ]
      },
      {
        nomor: 'Pasal 6',
        teks: '5 Prinsip Pertahanan Kedaulatan - KKMNMP menjunjung tinggi lima prinsip pertahanan kedaulatan yang tidak dapat dikompromikan:',
        prinsip: [
          { nama: 'Kedaulatan Data Absolut', deskripsi: 'Seluruh data anggota adalah milik anggota yang bersangkutan. KKMNMP hanya bertindak sebagai wali amanat (fiduciary) dan tidak memiliki hak kepemilikan atas data.' },
          { nama: 'Keadilan Radikal', deskripsi: 'Setiap KPA memiliki suara yang setara sebesar 20% dalam pengambilan keputusan, tanpa memandang besaran kontribusi finansial.' },
          { nama: 'Isolasi Risiko (Ring-Fencing)', deskripsi: 'Setiap unit usaha memiliki batas keuangan yang terisolasi sehingga kerugian pada satu unit tidak menular ke unit lainnya.' },
          { nama: 'Anti-Oligarki', deskripsi: 'Tidak ada individu, kelompok, atau entitas yang boleh menguasai lebih dari 40% kursi di setiap organ koperasi dari satu KPA yang sama.' },
          { nama: 'Inklusivitas Peradaban', deskripsi: 'Keanggotaan Koperasi terbuka untuk seluruh elemen masyarakat Indonesia tanpa diskriminasi, termasuk warga negara asing dalam batas yang diizinkan undang-undang.' }
        ]
      }
    ]
  },
  {
    nomor: 'IV',
    judul: 'VISI, MISI, 13 ARSITEKTUR BISNIS',
    pasalMulai: '7',
    pasalSelesai: '9',
    icon: <Globe className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 7',
        teks: 'Visi Singular KKMNMP:',
        subs: [
          { ayat: '(1)', isi: '"Menjadi Digital Operating System Desa Indonesia Terbesar di Dunia—mengintegrasikan 83.763 desa ke dalam satu arsitektur ekonomi berdaulat yang menyejahterakan rakyat, menghubungkan desa ke 195 negara pada tahun 2045."' },
          { ayat: '(2)', isi: 'Visi ini bersifat singular dan tidak dapat diubah kecuali dengan persetujuan Super-Mayoritas 3/4 suara dalam Rapat Anggota Paripurna (RAP) beserta persetujuan tertulis dari Arsitek Konstitusi.' },
          { ayat: '(3)', isi: 'Target jangka panjang pencapaian visi ditetapkan pada tahun 2045 sebagai bentuk kontribusi KKMNMP terhadap Indonesia Emas.' }
        ]
      },
      {
        nomor: 'Pasal 8',
        teks: '4 Misi Strategis KKMNMP:',
        subs: [
          { ayat: '(1)', isi: 'Hilirisasi Produk Desa — Membangun rantai pasok digital dari hulu ke hilir yang menghubungkan produsen desa langsung ke pasar nasional dan internasional.' },
          { ayat: '(2)', isi: 'Dekonstruksi Monopoli Permodalan — Menyediakan akses permodalan yang adil dan merata melalui Kampung Modal dan sistem keuangan inklusif tanpa diskriminasi.' },
          { ayat: '(3)', isi: 'Agregator Pariwisata Nusantara — Menjadi platform terdepan yang mempromosikan dan mengelola pariwisata desa, wisata spiritual, dan perjalanan ibadah ke seluruh penjuru Nusantara.' },
          { ayat: '(4)', isi: 'Melibatkan Abdi Negara — Mengintegrasikan PNS, TNI, POLRI, ASN, dan Legislatif sebagai bagian dari ekosistem Koperasi melalui KPA-3.' }
        ]
      },
      {
        nomor: 'Pasal 9',
        teks: '13 Pilar Arsitektur Bisnis KKMNMP:',
        pilar: [
          { nomor: '1', nama: 'JP3 Pay', deskripsi: 'Sistem pembayaran digital terintegrasi untuk seluruh transaksi dalam ekosistem KKMNMP.' },
          { nomor: '2', nama: 'Marketplace Multi-Sektor', deskripsi: 'Platform perdagangan daring yang menghubungkan UMKM dan produsen desa dengan konsumen di seluruh Indonesia.' },
          { nomor: '3', nama: 'Logistik Digital Desa', deskripsi: 'Sistem logistik berbasis teknologi yang menjangkau hingga pelosok desa dengan efisiensi tinggi.' },
          { nomor: '4', nama: 'Resi Gudang Digital', deskripsi: 'Sistem penyimpanan barang digital terdesentralisasi yang memberikan jaminan keamanan dan transparansi.' },
          { nomor: '5', nama: 'Gerai KDMP', deskripsi: 'Jaringan gerai fisik dan digital Koperasi Digital Multipihak sebagai titik layanan di tingkat desa.' },
          { nomor: '6', nama: 'JE-P3 Academy', deskripsi: 'Platform pendidikan dan pelatihan digital untuk meningkatkan kapasitas anggota dan masyarakat.' },
          { nomor: '7', nama: 'Village Management System', deskripsi: 'Sistem manajemen desa terintegrasi yang memfasilitasi tata kelola pemerintahan dan ekonomi desa.' },
          { nomor: '8', nama: 'Desa Wisata & Ekonomi Kreatif', deskripsi: 'Pengembangan potensi wisata desa dan ekonomi kreatif berbasis kearifan lokal.' },
          { nomor: '9', nama: 'Energi Terbarukan', deskripsi: 'Unit usaha di bidang energi bersih dan terbarukan untuk kemandirian energi desa.' },
          { nomor: '10', nama: 'Wisata Nusantara & Perjalanan Ibadah', deskripsi: 'Layanan pariwisata dan perjalanan ibadah yang terintegrasi dengan ekosistem Koperasi.' },
          { nomor: '11', nama: 'Perdagangan Karbon (ESG)', deskripsi: 'Platform perdagangan karbon berbasis prinsip Environmental, Social, dan Governance.' },
          { nomor: '12', nama: 'Trading Internasional', deskripsi: 'Jembatan perdagangan internasional untuk produk-produk unggulan desa Indonesia.' },
          { nomor: '13', nama: 'Kampung Modal', deskripsi: 'Platform equity crowdfunding terdesentralisasi untuk pembiayaan proyek produktif di tingkat desa.' }
        ]
      }
    ]
  },
  {
    nomor: 'V',
    judul: 'KEANGGOTAAN MULTI PIHAK',
    pasalMulai: '10',
    pasalSelesai: '15',
    icon: <Users className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 10',
        teks: 'Pentagon Kedaulatan — Keanggotaan KKMNMP terdiri dari 5 Kelompok Pihak yang Berkepentingan (KPA), masing-masing memiliki suara sebesar 20%:',
        kpa: [
          { nomor: 'KPA-1', nama: 'Produsen & Pekerja (Pencipta Nilai)', anggota: 'Petani, Nelayan, Peternak, Agen Logistik, Pengrajin Desa', catatan: '20% suara — Pilar produksi ekonomi riil Nusantara' },
          { nomor: 'KPA-2', nama: 'Konsumen Umum (Mesin Permintaan)', anggota: 'Pengguna JP3 Pay, Pembeli Marketplace, Wisatawan', catatan: '20% suara — Pasar internal yang menjamin demand berkelanjutan' },
          { nomor: 'KPA-3', nama: 'Abdi Negara & Pejabat Publik (Jangkar Stabilitas)', anggota: 'PNS, TNI, POLRI, ASN, Legislatif', catatan: '20% suara — Stabilitas institusional dan integritas sistem' },
          { nomor: 'KPA-4', nama: 'Entitas Bisnis & Pelaku Usaha (Mesin B2B)', anggota: 'Bandar, PT, CV, BUMDes, Koperasi Primer', catatan: '20% suara — Kekuatan korporasi dan jaringan usaha' },
          { nomor: 'KPA-5', nama: 'Pemodal & Investor (Likuiditas Berdaulat)', anggota: 'Angel Investor, Institusi Keuangan, Investor Asing', catatan: '20% suara — Sistem One Member One Vote, satu anggota satu suara' }
        ]
      },
      {
        nomor: 'Pasal 11',
        teks: 'KPA-1 Produsen & Pekerja (Pencipta Nilai):',
        subs: [
          { ayat: '(1)', isi: 'KPA-1 terdiri dari Petani, Nelayan, Peternak, Agen Logistik, dan Pengrajin Desa sebagai pilar pencipta nilai ekonomi riil Nusantara.' },
          { ayat: '(2)', isi: 'KPA-1 memiliki bobot suara sebesar 20% dalam seluruh pengambilan keputusan di tingkat RAP sesuai mekanisme Pentagon Kedaulatan.' },
          { ayat: '(3)', isi: 'Larangan Keras — Pengepul besar dan tengkulak dilarang masuk ke dalam KPA-1. Mereka yang terbukti melakukan praktik monopoli atau eksploitasi terhadap produsen kecil akan diberhentikan keanggotaannya.' },
          { ayat: '(4)', isi: 'Anggota KPA-1 wajib menjalankan proses KYC/AML dan membayar simpanan pokok serta simpanan wajib sesuai ketentuan ART.' }
        ]
      },
      {
        nomor: 'Pasal 12',
        teks: 'KPA-2 Konsumen Umum (Mesin Permintaan):',
        subs: [
          { ayat: '(1)', isi: 'KPA-2 terdiri dari seluruh pengguna JP3 Pay, Pembeli Marketplace, dan Wisatawan yang terdaftar dalam ekosistem KKMNMP.' },
          { ayat: '(2)', isi: 'KPA-2 memiliki bobot suara sebesar 20% dalam seluruh pengambilan keputusan di tingkat RAP sesuai mekanisme Pentagon Kedaulatan.' },
          { ayat: '(3)', isi: 'KPA-2 berfungsi sebagai Mesin Permintaan yang menjamin keberlangsungan demand internal ekosistem koperasi.' },
          { ayat: '(4)', isi: 'Keanggotaan KPA-2 bersifat terbuka bagi setiap Warga Negara Indonesia yang berusia minimal 17 tahun atau sudah menikah.' }
        ]
      },
      {
        nomor: 'Pasal 13',
        teks: 'KPA-3 Abdi Negara & Pejabat Publik (Jangkar Stabilitas):',
        subs: [
          { ayat: '(1)', isi: 'KPA-3 terdiri dari PNS, TNI, POLRI, ASN, dan Legislatif yang berfungsi sebagai Jangkar Stabilitas institusional dan integritas sistem.' },
          { ayat: '(2)', isi: 'KPA-3 memiliki bobot suara sebesar 20% dalam seluruh pengambilan keputusan di tingkat RAP sesuai mekanisme Pentagon Kedaulatan.' },
          { ayat: '(3)', isi: 'Klausul Netralitas — Anggota KPA-3 wajib mematuhi Firewall Politik sebagaimana diatur dalam Pasal 28. Dilarang keras menggunakan jabatan publik untuk kepentingan politik di dalam ruang Koperasi.' },
          { ayat: '(4)', isi: 'Partisipasi KPA-3 dalam ekosistem Koperasi dilakukan atas kapasitas pribadi sebagai anggota, bukan sebagai representasi institusi pemerintah.' }
        ]
      },
      {
        nomor: 'Pasal 14',
        teks: 'KPA-4 Entitas Bisnis & Pelaku Usaha (Mesin B2B):',
        subs: [
          { ayat: '(1)', isi: 'KPA-4 terdiri dari Bandar, PT, CV, BUMDes, dan Koperasi Primer yang berfungsi sebagai Mesin B2B dan kekuatan korporasi dalam ekosistem KKMNMP.' },
          { ayat: '(2)', isi: 'KPA-4 memiliki bobot suara sebesar 20% dalam seluruh pengambilan keputusan di tingkat RAP sesuai mekanisme Pentagon Kedaulatan.' },
          { ayat: '(3)', isi: 'Seluruh transaksi antara KPA-4 dan KKMNMP wajib mematuhi Arm\'s Length Principle sebagaimana diatur dalam Pasal 27.' },
          { ayat: '(4)', isi: 'Entitas bisnis yang terdaftar sebagai anggota KPA-4 wajib memenuhi standar KYC/AML serta mematuhi seluruh ketentuan AD, ART, dan Kode Etik KKMNMP.' }
        ]
      },
      {
        nomor: 'Pasal 15',
        teks: 'KPA-5 Pemodal & Investor (Likuiditas Berdaulat):',
        subs: [
          { ayat: '(1)', isi: 'KPA-5 terdiri dari Angel Investor, Institusi Keuangan, dan Investor yang berfungsi sebagai sumber Likuiditas Berdaulat dalam ekosistem KKMNMP.' },
          { ayat: '(2)', isi: 'KPA-5 memiliki bobot suara sebesar 20% dalam seluruh pengambilan keputusan di tingkat RAP sesuai mekanisme Pentagon Kedaulatan dengan sistem One Member One Vote.' },
          { ayat: '(3)', isi: 'Doktrin Anti-Oligarki — Tidak ada individu, kelompok, atau entitas dalam KPA-5 yang boleh menguasai lebih dari 40% total investasi atau kursi di setiap organ Koperasi.' },
          { ayat: '(4)', isi: 'Anggota KPA-5 wajib menjalani proses KYC/AML yang lebih ketat, Lock-up period 24 bulan, serta pemberitahuan withdrawal minimal 6 bulan sebagaimana diatur dalam ART.' },
          { ayat: '(5)', isi: 'Warga Negara Asing dapat menjadi anggota KPA-5 sesuai ketentuan peraturan perundang-undangan yang berlaku di Indonesia.' }
        ]
      }
    ]
  },
  {
    nomor: 'VI',
    judul: 'DEMOKRASI KEDAULATAN',
    pasalMulai: '16',
    pasalSelesai: '17',
    icon: <Award className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 16',
        teks: 'Mekanisme Musyawarah dan Permusyawaratan:',
        subs: [
          { ayat: '(1)', isi: 'RAK (Rapat Anggota Kelompok) — Rapat yang diadakan di tingkat kelompok KPA untuk membahas isu-isu spesifik dan menghasilkan mandat yang dibawa ke RAP.' },
          { ayat: '(2)', isi: 'RAP (Rapat Anggota Paripurna) — Rapat tertinggi Koperasi yang dihadiri oleh seluruh perwakilan KPA dengan hak suara masing-masing 20%.' },
          { ayat: '(3)', isi: 'RAP diadakan minimal 1 (satu) kali dalam setahun (RAT/Rapat Anggota Tahunan) dan dapat diadakan luar biasa (RALB) apabila diperlukan.' },
          { ayat: '(4)', isi: 'Keputusan RAP bersifat mengikat dan tidak dapat diganggu gugat kecuali melalui Hak Uji Materiil Suspensif.' }
        ]
      },
      {
        nomor: 'Pasal 17',
        teks: 'Blockchain Governance & NIAK:',
        subs: [
          { ayat: '(1)', isi: 'Seluruh proses pemungutan suara dalam RAK dan RAP dicatat dalam blockchain untuk menjamin transparansi, akuntabilitas, dan keabsahan hasil.' },
          { ayat: '(2)', isi: 'Setiap anggota menggunakan NIAK untuk mengakses dan memberikan suara dalam sistem Blockchain Governance.' },
          { ayat: '(3)', isi: 'Hasil voting yang telah dicatat dalam blockchain bersifat final dan tidak dapat diubah (immutable).' }
        ]
      }
    ]
  },
  {
    nomor: 'VII',
    judul: 'PENGURUS BAKORNAS',
    pasalMulai: '18',
    pasalSelesai: '18',
    icon: <Building2 className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 18',
        teks: 'Presidium Eksekutif Bakornas (Badan Koordinasi Nasional):',
        subs: [
          { ayat: '(1)', isi: 'Pengurus KKMNMP diorganisasikan dalam bentuk Presidium Eksekutif dengan nomenklatur BAKORNAS (Badan Koordinasi Nasional).' },
          { ayat: '(2)', isi: 'Struktur inti Presidium Eksekutif terdiri dari: Presiden/Ketua Umum, Wakil Presiden, Sekretaris Jenderal, dan Bendahara Umum/CFO.' },
          { ayat: '(3)', isi: 'Presidium Eksekutif dipilih oleh RAP untuk masa jabatan 5 (lima) tahun dan dapat dipilih kembali untuk satu periode berikutnya.' },
          { ayat: '(4)', isi: 'Pengurus wajib berasal dari minimal 3 (tiga) KPA yang berbeda.' },
          { ayat: '(5)', isi: 'Anti-Monopoli Faksi — Satu KPA dilarang menguasai lebih dari 40% jabatan strategis di dalam Presidium Eksekutif Bakornas.' },
          { ayat: '(6)', isi: 'Presidium Eksekutif bertanggung jawab penuh kepada RAP dan wajib menyampaikan laporan pertanggungjawaban minimal 1 (satu) kali setahun.' }
        ]
      }
    ]
  },
  {
    nomor: 'VIII',
    judul: 'BADAN PENGAWAS',
    pasalMulai: '19',
    pasalSelesai: '19',
    icon: <Eye className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 19',
        teks: 'Badan Pengawas Koperasi:',
        subs: [
          { ayat: '(1)', isi: 'Badan Pengawas bersifat mandiri dan independen dari Pengurus.' },
          { ayat: '(2)', isi: 'Anggota Badan Pengawas dipilih oleh RAP dari kalangan anggota yang memenuhi syarat kompetensi.' },
          { ayat: '(3)', isi: 'Badan Pengawas memiliki akses unlimited audit terhadap seluruh dokumen, laporan keuangan, dan operasional Koperasi.' },
          { ayat: '(4)', isi: 'Badan Pengawas wajib menyusun laporan pengawasan dan menyampaikannya kepada RAP setiap tahun.' },
          { ayat: '(5)', isi: 'Badan Pengawas berwenang mengajukan rekomendasi pemberhentian Pengurus kepada RAP apabila ditemukan pelanggaran berat.' }
        ]
      }
    ]
  },
  {
    nomor: 'IX',
    judul: 'BENTENG KAMPUNG MODAL',
    pasalMulai: '20',
    pasalSelesai: '20',
    icon: <Database className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 20',
        teks: 'Benteng Kampung Modal — Unit Usaha Otonom dengan Ring-Fencing:',
        subs: [
          { ayat: '(1)', isi: 'Benteng Kampung Modal adalah unit usaha otonom KKMNMP yang beroperasi dengan mekanisme Ring-Fencing penuh — seluruh aset, liabilitas, dan risiko diisolasi secara total dari entitas induk KKMNMP.' },
          { ayat: '(2)', isi: 'Ring-Fencing Doktrin — Seluruh aset dan liabilitas Kampung Modal diisolasi dari entitas induk KKMNMP, sehingga kerugian atau kebangkrutan Kampung Modal tidak menular ke entitas induk, dan sebaliknya.' },
          { ayat: '(3)', isi: 'Kampung Modal berfungsi sebagai platform equity crowdfunding terdesentralisasi untuk pembiayaan proyek produktif desa, sesuai amanat Pancasila dan UUD 1945.' },
          { ayat: '(4)', isi: 'Parent Asset Immunity — Aset KKMNMP sebagai entitas induk tidak dapat digunakan untuk menutup kerugian Kampung Modal, dan sebaliknya.' },
          { ayat: '(5)', isi: 'Pengelolaan Kampung Modal dilakukan oleh tim manajemen yang terpisah dan independen dari Pengurus Bakornas.' },
          { ayat: '(6)', isi: 'Kampung Modal tunduk pada prinsip Anti-Oligarki Finansial sebagaimana diatur dalam Pasal 6 dan Kode Etik KKMNMP.' }
        ]
      }
    ]
  },
  {
    nomor: 'X',
    judul: 'SHU & ASAS EKUILIBRIUM',
    pasalMulai: '21',
    pasalSelesai: '21',
    icon: <Scale className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 21',
        teks: 'Pembagian Sisa Hasil Usaha (SHU) — Asas Ekilibrium KKMNMP:',
        subs: [
          { ayat: '(1)', isi: 'SHU didistribusikan dengan ketentuan: 25% untuk Dana Cadangan Koperasi.' },
          { ayat: '(2)', isi: '45% untuk Jasa Usaha — dibagikan kepada anggota sesuai dengan volume transaksi dan partisipasi dalam kegiatan usaha Koperasi.' },
          { ayat: '(3)', isi: '10% untuk Jasa Modal (Hard-Cap Maksimal) — proporsi ini tidak boleh melebihi 10% dari total SHU untuk mencegah dominasi modal atas kerja.' },
          { ayat: '(4)', isi: '10% untuk Riset & Teknologi — dialokasikan untuk pengembangan inovasi, infrastruktur digital, dan penelitian.' },
          { ayat: '(5)', isi: '5% untuk Sosial & Peradaban — dialokasikan untuk program pemberdayaan masyarakat, bantuan bencana, dan kegiatan sosial.' },
          { ayat: '(6)', isi: '5% untuk Insentif Manajemen (Hard-Cap KPI) — dibagikan kepada Pengurus hanya apabila seluruh target KPI tercapai. Jika gagal, insentif ini dibekukan dan dialihkan ke Dana Cadangan.' }
        ]
      }
    ]
  },
  {
    nomor: 'XI',
    judul: 'KEWASAAN ASET & POISON PILL',
    pasalMulai: '22',
    pasalSelesai: '23',
    icon: <Lock className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 22',
        teks: 'Kewasaan Aset Kolektif:',
        subs: [
          { ayat: '(1)', isi: 'Seluruh aset Koperasi yang diperoleh dari hasil usaha, sumbangan, atau sumber lain yang sah adalah milik kolektif seluruh anggota.' },
          { ayat: '(2)', isi: 'Pencatatan aset dilakukan dalam Distributed Ledger (buku besar terdistribusi) yang transparan dan dapat diakses oleh seluruh anggota melalui NIAK.' },
          { ayat: '(3)', isi: 'Aset Kedaulatan Tak Terasingkan meliputi: Hak Kekayaan Intelektual (HAKI), source code seluruh platform, Big Data yang dikumpulkan, dan domain kopnusa.id.' },
          { ayat: '(4)', isi: 'Aset Kedaulatan Tak Terasingkan tidak dapat dijual, disewakan, dipindahtangankan, atau dijadikan jaminan hutang dalam keadaan apapun.' }
        ]
      },
      {
        nomor: 'Pasal 23',
        teks: 'Poison Pill — Mekanisme Pertahanan Aset Kedaulatan:',
        subs: [
          { ayat: '(1)', isi: 'Aset Kedaulatan Tak Terasingkan (sebagaimana dimaksud dalam Pasal 22 ayat 3) dilindungi oleh mekanisme Poison Pill.' },
          { ayat: '(2)', isi: 'Poison Pill berarti bahwa Aset Kedaulatan tidak boleh dijual, dipindahtangankan, atau dialihkan kepada pihak manapun bahkan dalam kondisi pembubaran atau kebangkrutan Koperasi.' },
          { ayat: '(3)', isi: 'Dalam hal pembubaran, Aset Kedaulatan diserahkan kepada Negara Kesatuan Republik Indonesia melalui mekanisme yang ditetapkan oleh RAP.' },
          { ayat: '(4)', isi: 'Setiap upaya pelanggaran terhadap ketentuan Poison Pill merupakan tindakan pidana yang dapat dituntut sesuai hukum yang berlaku.' }
        ]
      }
    ]
  },
  {
    nomor: 'XII',
    judul: 'WALI AMANAT DATA',
    pasalMulai: '24',
    pasalSelesai: '25',
    icon: <Shield className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 24',
        teks: 'Mekanisme Wali Amanat Data:',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP bertindak sebagai Wali Amanat Data (Data Fiduciary) atas seluruh data yang dikumpulkan dari anggota dan pengguna layanan.' },
          { ayat: '(2)', isi: 'Seluruh pengelolaan data tunduk pada Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).' },
          { ayat: '(3)', isi: 'Data milik anggota — KKMNMP tidak memiliki hak kepemilikan atas data anggota dan hanya menggunakan data berdasarkan persetujuan yang diberikan.' },
          { ayat: '(4)', isi: 'Anggota memiliki hak penuh untuk mengakses, memperbaiki, menghapus, dan memportabilitas data mereka kapan saja.' }
        ]
      },
      {
        nomor: 'Pasal 25',
        teks: 'Perlindungan Data melalui Teknologi:',
        subs: [
          { ayat: '(1)', isi: 'Zero-Knowledge Proof (ZKP) — KKMNMP menerapkan teknologi ZKP untuk memverifikasi informasi tanpa mengungkapkan data asli kepada pihak ketiga.' },
          { ayat: '(2)', isi: 'Data Spesifik — Hanya data yang spesifik dan relevan yang dikumpulkan sesuai prinsip minimasi data.' },
          { ayat: '(3)', isi: 'Seluruh proses pengolahan data dicatat dan dapat diaudit oleh Badan Pengawas.' }
        ]
      }
    ]
  },
  {
    nomor: 'XIII',
    judul: 'ALIANSI STRATEGIS',
    pasalMulai: '26',
    pasalSelesai: '27',
    icon: <Globe className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 26',
        teks: 'Prinsip Aliansi Non-Subordinatif:',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP dapat menjalin aliansi strategis dengan pihak ketiga, baik domestik maupun internasional.' },
          { ayat: '(2)', isi: 'Seluruh aliansi bersifat non-subordinatif — KKMNMP tidak boleh menjadi subordinat atau anak perusahaan dari entitas manapun.' },
          { ayat: '(3)', isi: 'JE-P3 Academy dan platform inti KKMNMP harus tetap independen dan tidak boleh dikendalikan oleh pihak ketiga melalui mekanisme aliansi.' },
          { ayat: '(4)', isi: 'Setiap perjanjian aliansi wajib mendapat persetujuan dari RAP apabila melibatkan pemanfaatan aset strategis atau operasional inti.' }
        ]
      },
      {
        nomor: "Pasal 27",
        teks: "Arm's Length Principle dalam Aliansi:",
        subs: [
          { ayat: "(1)", isi: "Seluruh transaksi dan perjanjian dengan pihak ketiga dalam aliansi wajib mematuhi Arm's Length Principle." },
          { ayat: "(2)", isi: "Harga, syarat, dan kondisi dalam setiap transaksi aliansi harus wajar, seimbang, dan seolah-olah kedua pihak tidak memiliki hubungan istimewa." },
          { ayat: "(3)", isi: "Pelanggaran terhadap Arm's Length Principle dapat dikenakan sanksi sesuai ketentuan dalam Kode Etik." }
        ]
      }
    ]
  },
  {
    nomor: 'XIV',
    judul: 'FIREWALL POLITIK',
    pasalMulai: '28',
    pasalSelesai: '28',
    icon: <AlertTriangle className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 28',
        teks: 'Netralitas Politik Absolut:',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP bersikap netral secara absolut dalam politik praktis dan tidak memihak kepada partai politik, calon kepala daerah, maupun kelompok politik manapun.' },
          { ayat: '(2)', isi: 'Dilarang keras menggunakan seluruh platform, aset, dan fasilitas Koperasi untuk kegiatan kampanye politik dalam bentuk apapun.' },
          { ayat: '(3)', isi: 'Anggota, Pengurus, dan Badan Pengawas yang menggunakan jabatan atau fasilitas Koperasi untuk kepentingan politik akan dikenakan sanksi berat sesuai Kode Etik.' },
          { ayat: '(4)', isi: 'Keterlibatan anggota dalam kegiatan politik dilakukan atas kapasitas pribadi dan tidak boleh membawa nama atau atribut KKMNMP.' }
        ]
      }
    ]
  },
  {
    nomor: 'XV',
    judul: 'PENYELESAIAN SENGKETA',
    pasalMulai: '29',
    pasalSelesai: '29',
    icon: <Gavel className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 29',
        teks: 'The Mute Arbitration — Penyelesaian Sengketa Tertutup:',
        subs: [
          { ayat: '(1)', isi: 'Seluruh sengketa yang timbul dari atau berkaitan dengan AD/ART ini diselesaikan melalui musyawarah terlebih dahulu.' },
          { ayat: '(2)', isi: 'Apabila musyawarah tidak mencapai kesepakatan dalam waktu 30 hari, sengketa diselesaikan melalui arbitrase di BANI (Badan Arbitrase Nasional Indonesia).' },
          { ayat: '(3)', isi: 'Proses arbitrase bersifat The Mute Arbitration — closed-door, rahasia, dan tidak dipublikasikan untuk menjaga keharmonisan internal Koperasi.' },
          { ayat: '(4)', isi: 'Keputusan arbitrase bersifat final dan mengikat serta tidak dapat diajukan banding kecuali dalam hal yang diatur oleh hukum yang berlaku.' }
        ]
      }
    ]
  },
  {
    nomor: 'XVI',
    judul: 'ARSITEK KONSTITUSI',
    pasalMulai: '30',
    pasalSelesai: '30',
    icon: <Scroll className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 30',
        teks: 'Arsitek Konstitusi — Grand Architect & Organ Ekstra-Struktural:',
        subs: [
          { ayat: '(1)', isi: 'Arsitek Konstitusi KKMNMP adalah Arif Rachman Hakim dan Gugun Gunara sebagai Grand Architect, yang merupakan organ ekstra-struktural di luar struktur pengurus dan pengawas Koperasi.' },
          { ayat: '(2)', isi: 'Arsitek Konstitusi berperan sebagai Civilization Gatekeepers — penjaga integritas visi, misi, dan prinsip-prinsip fundamental Koperasi.' },
          { ayat: '(3)', isi: 'Perubahan terhadap Bab XVI (Arsitek Konstitusi) dan ketentuan-ketentuan fundamental yang dilindungi memerlukan persetujuan Super-Mayoritas 3/4 suara RAP ditambah persetujuan tertulis dari Arsitek Konstitusi.' },
          { ayat: '(4)', isi: 'Arsitek Konstitusi memiliki hak veto atas setiap usulan amandemen yang bertentangan dengan visi singular dan prinsip pertahanan kedaulatan.' },
          { ayat: '(5)', isi: 'Kedudukan Arsitek Konstitusi bersifat seumur hidup dan tidak dapat diganti kecuali dengan persetujuan 3/4 suara RAP.' }
        ]
      }
    ]
  },
  {
    nomor: 'XVII',
    judul: 'PERUBAHAN, PEMBUBARAN, PENUTUP',
    pasalMulai: '31',
    pasalSelesai: '33',
    icon: <FileSignature className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 31',
        teks: 'Perubahan Anggaran Dasar (Amandemen):',
        subs: [
          { ayat: '(1)', isi: 'Perubahan Anggaran Dasar hanya dapat dilakukan melalui Rapat Anggota Paripurna (RAP) dengan persetujuan minimal 2/3 suara anggota yang hadir.' },
          { ayat: '(2)', isi: 'Perubahan terhadap Bab XVI (Arsitek Konstitusi) memerlukan persetujuan Super-Mayoritas 3/4 suara RAP ditambah persetujuan tertulis Arsitek Konstitusi (Arif Rachman Hakim dan Gugun Gunara).' },
          { ayat: '(3)', isi: 'Usulan perubahan AD harus disampaikan minimal 30 hari sebelum pelaksanaan RAP disertai dengan risalah dan alasan perubahan.' }
        ]
      },
      {
        nomor: 'Pasal 32',
        teks: 'Pembubaran Koperasi:',
        subs: [
          { ayat: '(1)', isi: 'Pembubaran Koperasi hanya dapat dilakukan melalui RAP dengan persetujuan minimal 3/4 suara seluruh anggota.' },
          { ayat: '(2)', isi: 'Dalam hal pembubaran, seluruh aset Koperasi setelah memenuhi seluruh kewajiban diserahkan kepada Negara Kesatuan Republik Indonesia.' },
          { ayat: '(3)', isi: 'Aset Kedaulatan Tak Terasingkan (sebagaimana dimaksud Pasal 22 dan 23) wajib diserahkan kepada Negara.' }
        ]
      },
      {
        nomor: 'Pasal 33',
        teks: 'Penutup:',
        subs: [
          { ayat: '(1)', isi: 'Anggaran Dasar ini berlaku efektif sejak tanggal ditetapkan.' },
          { ayat: '(2)', isi: 'Hal-hal yang belum cukup diatur dalam Anggaran Dasar ini akan diatur lebih lanjut dalam Anggaran Rumah Tangga.' },
          { ayat: '(3)', isi: 'Anggaran Dasar ini disahkan dan ditetapkan di Jakarta pada tanggal 21 Maret 2026.' }
        ]
      }
    ]
  }
]

export default function AnggaranDasarPage() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#004D21] via-[#006B2D] to-[#008F3D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00FF7F] rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <Badge className="bg-[#8B0000] text-white border-[#8B0000] hover:bg-[#8B0000] mb-6 px-5 py-2 text-sm font-semibold tracking-wide">
              {isRevealed ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              {isRevealed ? 'Dokumen Terbuka' : 'Dokumen Rahasia (Confidential)'}
            </Badge>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
              ANGGARAN DASAR
              <br />
              <span className="text-[#FFD700]">KKMNMP/KNMP</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-3 font-medium">
              Koperasi Korporasi Multipihak Nusa Merah Putih
            </p>
            <p className="text-sm text-white/60 mb-8 max-w-2xl mx-auto">
              Sovereign Architecture Edition Super Final Versi 7 — Ditetapkan di Jakarta, 21 Maret 2026
            </p>

            {!isRevealed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  onClick={() => setIsRevealed(true)}
                  className="bg-[#FFD700] text-[#004D21] hover:bg-[#FFC700] font-bold text-base px-8 py-3 shadow-lg shadow-[#FFD700]/20"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Buka Dokumen Rahasia
                </Button>
                <p className="text-xs text-white/40 mt-3">Dokumen ini bersifat rahasia dan hanya untuk anggota</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mukadimah */}
            <section className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">
              <motion.div {...fadeInUp}>
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center flex-shrink-0">
                        <Scroll className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-[#004D21]">MUKADIMAH</h2>
                    </div>
                    <div className="text-gray-700 leading-relaxed text-sm md:text-base space-y-3">
                      <p>
                        Dengan rahmat Tuhan Yang Maha Esa, para Pendiri Koperasi Korporasi Multipihak Nusa Merah Putih (KKMNMP atau KNMP) menyadari bahwa kedaulatan ekonomi nasional di abad ke-21 tidak lagi semata-mata diukur dari penguasaan lahan fisik, melainkan dari penguasaan data, integrasi teknologi, dan arsitektur finansial yang berkeadilan.
                      </p>
                      <p>
                        Bahwa untuk mewujudkan keadilan sosial bagi seluruh rakyat Indonesia sebagaimana diamanatkan dalam Pancasila dan UUD 1945, diperlukan sebuah Digital Operating System Desa Indonesia yang mampu mengagregasi 83.763 desa dan 8.506 kelurahan ke dalam satu ekosistem ekonomi berdaulat.
                      </p>
                      <p>
                        Bahwa demi melindungi ekosistem tersebut dari kerentanan kapitalisme predatoris, KKMNMP/KNMP didirikan dengan mengadopsi prinsip Koperasi Multipihak yang mengawinkan kearifan gotong royong dengan presisi korporasi modern.
                      </p>
                      <p className="font-semibold text-[#008F3D] italic">
                        &ldquo;Dari Desa, Untuk Indonesia, Menuju Dunia&rdquo;
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* Main Content with Side Navigation */}
            <section className="container mx-auto px-4 lg:px-8 py-12">
              <div className="flex gap-8">
                {/* Mobile TOC Toggle */}
                <div className="lg:hidden fixed bottom-6 right-6 z-50">
                  <Button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="bg-[#008F3D] text-white hover:bg-[#006B2D] rounded-full w-14 h-14 shadow-lg"
                    size="icon"
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </Button>
                </div>

                {/* Side Navigation */}
                <motion.aside
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${
                    mobileMenuOpen ? 'fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto' : 'hidden'
                  } lg:block lg:sticky lg:top-24 lg:w-72 lg:flex-shrink-0 lg:self-start lg:bg-transparent lg:pt-0 lg:px-0`}
                >
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-5">
                    <h3 className="text-sm font-bold text-[#008F3D] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Daftar Isi
                    </h3>
                    <nav className="space-y-1">
                      {babs.map((bab) => (
                        <a
                          key={bab.nomor}
                          href={`#bab-${bab.nomor}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#008F3D] hover:bg-[#008F3D]/5 rounded-lg transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-[#008F3D]/10 flex items-center justify-center text-[#008F3D] font-bold text-xs flex-shrink-0">
                            {bab.nomor}
                          </span>
                          <span className="line-clamp-2">{bab.judul}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </motion.aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                    {babs.map((bab, babIndex) => (
                      <motion.div key={bab.nomor} id={`bab-${bab.nomor}`} variants={fadeInUp}>
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                          {/* BAB Header */}
                          <div className="bg-gradient-to-r from-[#004D21] to-[#008F3D] text-white px-5 py-4 md:px-6 md:py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                {bab.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className="bg-[#FFD700] text-[#004D21] border-[#FFD700] hover:bg-[#FFD700] text-xs font-bold">
                                    BAB {bab.nomor}
                                  </Badge>
                                  <span className="text-white/60 text-xs">
                                    Pasal {bab.pasalMulai}{bab.pasalMulai !== bab.pasalSelesai ? `–${bab.pasalSelesai}` : ''}
                                  </span>
                                </div>
                                <h2 className="text-lg md:text-xl font-bold mt-1">{bab.judul}</h2>
                              </div>
                            </div>
                          </div>

                          {/* PASAL Content */}
                          <CardContent className="p-0">
                            <Accordion type="multiple" className="w-full">
                              {bab.content.map((pasal, pasalIndex) => (
                                <AccordionItem key={pasal.nomor} value={`${bab.nomor}-${pasal.nomor}`} className="px-5 md:px-6 border-b border-gray-100 last:border-b-0">
                                  <AccordionTrigger className="py-4 hover:no-underline">
                                    <div className="flex items-center gap-3 text-left">
                                      <Badge variant="outline" className="border-[#008F3D] text-[#008F3D] font-bold text-xs flex-shrink-0">
                                        {pasal.nomor}
                                      </Badge>
                                      {pasal.teks && (
                                        <span className="text-sm md:text-base font-medium text-gray-800 line-clamp-2">{pasal.teks}</span>
                                      )}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-4 text-sm md:text-base">
                                    {pasal.teks && <p className="text-gray-600 mb-4 font-medium">{pasal.teks}</p>}

                                    {/* Definisi */}
                                    {pasal.definisi && (
                                      <div className="space-y-3">
                                        {pasal.definisi.map((d, i) => (
                                          <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                            <span className="font-bold text-[#008F3D]">{d.istilah}</span>
                                            <span className="text-gray-500 mx-2">—</span>
                                            <span className="text-gray-700">{d.penjelasan}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Prinsip */}
                                    {pasal.prinsip && (
                                      <div className="space-y-3">
                                        {pasal.prinsip.map((p, i) => (
                                          <div key={i} className="flex items-start gap-3 bg-[#008F3D]/5 rounded-lg p-3 border border-[#008F3D]/10">
                                            <div className="w-8 h-8 rounded-full bg-[#008F3D] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                              {i + 1}
                                            </div>
                                            <div>
                                              <p className="font-bold text-[#004D21]">{p.nama}</p>
                                              <p className="text-gray-600 mt-0.5">{p.deskripsi}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Pilar Bisnis */}
                                    {pasal.pilar && (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {pasal.pilar.map((p, i) => (
                                          <div key={i} className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-100">
                                            <Badge className="bg-[#8B0000] text-white border-[#8B0000] hover:bg-[#8B0000] text-xs mt-0.5 flex-shrink-0">
                                              {p.nomor}
                                            </Badge>
                                            <div>
                                              <p className="font-bold text-[#8B0000] text-sm">{p.nama}</p>
                                              <p className="text-gray-600 text-xs mt-0.5">{p.deskripsi}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* KPA */}
                                    {pasal.kpa && (
                                      <div className="space-y-3">
                                        {pasal.kpa.map((k, i) => (
                                          <div key={i} className="bg-gradient-to-r from-[#008F3D]/5 to-transparent rounded-lg p-4 border border-[#008F3D]/10">
                                            <div className="flex items-center gap-2 mb-2">
                                              <Badge className="bg-[#004D21] text-white border-[#004D21] hover:bg-[#004D21] text-xs font-bold">
                                                {k.nomor}
                                              </Badge>
                                              <span className="font-bold text-gray-900">{k.nama}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-1">
                                              <span className="font-medium text-gray-700">Anggota:</span> {k.anggota}
                                            </p>
                                            {k.catatan && (
                                              <p className="text-[#008F3D] text-xs italic">{k.catatan}</p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Ayat */}
                                    {pasal.ayat && (
                                      <ol className="space-y-2">
                                        {pasal.ayat.map((a, i) => (
                                          <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <ChevronRight className="w-4 h-4 text-[#008F3D] mt-1 flex-shrink-0" />
                                            <span>{a}</span>
                                          </li>
                                        ))}
                                      </ol>
                                    )}

                                    {/* Subs (Ayat with content) */}
                                    {pasal.subs && (
                                      <div className="space-y-3">
                                        {pasal.subs.map((s, i) => (
                                          <div key={i} className="flex items-start gap-3 text-gray-700 pl-2 border-l-2 border-[#008F3D]/20">
                                            <span className="font-bold text-[#008F3D] flex-shrink-0">{s.ayat}</span>
                                            <span>{s.isi}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Footer CTA */}
                  <motion.div {...fadeInUp} className="mt-12">
                    <Card className="bg-gradient-to-r from-[#8B0000] to-[#008F3D] text-white overflow-hidden">
                      <CardContent className="p-6 md:p-8 text-center">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-white/80" />
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Dokumen Dilindungi</h3>
                        <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm md:text-base">
                          Anggaran Dasar ini merupakan dokumen hukum resmi KKMNMP yang dilindungi oleh Undang-Undang
                          Perkoperasian. Segala penyalinan tanpa izin tertulis dilarang.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Link href="/anggaran-rumah-tangga">
                            <Button className="bg-white text-[#8B0000] hover:bg-gray-100 font-semibold">
                              Lihat ART &rarr;
                            </Button>
                          </Link>
                          <Link href="/kode-etik">
                            <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold">
                              Lihat Kode Etik &rarr;
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Back Button */}
                  <div className="mt-8 text-center">
                    <Link href="/">
                      <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Beranda
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Scroll to Top */}
            <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#008F3D] text-white hover:bg-[#006B2D] rounded-full w-12 h-12 shadow-lg"
                size="icon"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
