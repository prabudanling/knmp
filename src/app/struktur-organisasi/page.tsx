'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  Shield,
  Award,
  Building2,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Star,
  Globe,
  Scale,
  Target,
  Flag,
  TrendingUp,
  Clock,
  Landmark,
  Network,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

// ==================== DATA FROM PDF ====================

// Sistem Hierarki Komando Bakor Nusantara
const HIERARKI_KOMANDO = [
  {
    tingkat: 'I',
    nama: 'BAKORNAS',
    namaLengkap: 'Badan Koordinasi Nasional',
    sebutan: 'Presiden / Ketua Umum',
    wilayah: 'Seluruh NKRI',
    padanan: 'Pimpinan Tertinggi Eksekutif Nasional',
    icon: Landmark,
    color: '#8B0000',
  },
  {
    tingkat: 'II',
    nama: 'BAKORWIL',
    namaLengkap: 'Badan Koordinasi Wilayah',
    sebutan: 'Panglima Wilayah',
    wilayah: 'Provinsi (34 Wilayah)',
    padanan: 'Koordinator Provinsi — Setara Gubernur KNMP',
    icon: MapPin,
    color: '#008F3D',
  },
  {
    tingkat: 'III',
    nama: 'BAKORDA',
    namaLengkap: 'Badan Koordinasi Daerah',
    sebutan: 'Panglima Distrik',
    wilayah: 'Kabupaten/Kota (514 Daerah)',
    padanan: 'Koordinator Daerah — Setara Bupati/Wali Kota KNMP',
    icon: Building2,
    color: '#1a1a2e',
  },
  {
    tingkat: 'IV',
    nama: 'BAKORCAM',
    namaLengkap: 'Badan Koordinasi Kecamatan',
    sebutan: 'Panglima Sektor',
    wilayah: 'Kecamatan (7.266 Sektor)',
    padanan: 'Koordinator Kecamatan — Setara Camat KNMP',
    icon: Network,
    color: '#059669',
  },
  {
    tingkat: 'V',
    nama: 'BAKORDEKA',
    namaLengkap: 'Badan Koordinasi Desa/Kelurahan',
    sebutan: 'Komandan Lapangan',
    wilayah: 'Desa/Kelurahan (83.763 Titik)',
    padanan: 'Eksekutor Lapangan — Ujung Tombak KNMP',
    icon: Flag,
    color: '#7c3aed',
  },
];

// Dewan Pendiri 9 Anggota - Gugun Gunara DIKOSONGKAN
const DEWAN_PENDIRI = [
  {
    no: 1,
    nama: 'Prof. Wirono, S.E., M.Pd',
    jabatan: 'Presiden / Ketua Umum (Bakornas)',
    peran: 'Pimpinan Tertinggi Eksekutif KNMP | Ketua Umum Koperasi Periode 2026–2029',
  },
  {
    no: 2,
    nama: 'Drs. H. Arif Rachman Hakim, M.M.',
    jabatan: 'Wakil Presiden / Wakil Ketua Umum (Bakornas)',
    peran: 'Wakil Pimpinan Eksekutif & CEO JE-P3 | Diplomat Utama 195 Negara',
  },
  {
    no: 3,
    nama: 'Hj. Inna Hadianala, S.E.',
    jabatan: 'Ketua Dewan Pembina + Koordinator Bidang Organisasi & Keanggotaan',
    peran: 'Penjaga Nilai & Konstitusi KNMP | Ketua Pembina Permanen Non-Jabatan',
  },
  {
    no: 4,
    nama: 'Dr. Cecep Sumarno',
    jabatan: 'Sekretaris Jenderal (Sekjen) + Koordinator Bidang Wisata, Umroh & Haji',
    peran: 'Kepala Administrasi & Legal Koperasi',
  },
  {
    no: 5,
    nama: 'Tn. H. Gugun Gunara, S. E',
    jabatan: 'Wakil Sekretaris Jenderal (Wasekjen) + Ketua Bidang Holding Trading Ekosistem + Grand Architect',
    peran: 'COO, Arsitek Strategi & Ekosistem Digital KNMP | Chief Strategy & Innovation Officer',
  },
  {
    no: 6,
    nama: 'Fawwaz Arif Al Jabar, S.E., M.M.',
    jabatan: 'Ketua Dewan Penasihat + Koordinator Bidang Keuangan & Perbankan',
    peran: 'Chief Financial Advisor KNMP | Arsitek Sistem Keuangan & ESG',
  },
  {
    no: 7,
    nama: 'Andi Darmadji, S.E.',
    jabatan: 'Pendiri & Koordinator Wilayah Kalimantan (Bakorwil Kalimantan)',
    peran: 'Panglima Wilayah Kalimantan | Pilar Ekspansi Kawasan Timur KNMP',
  },
  {
    no: 8,
    nama: 'Dr. Habib',
    jabatan: 'Anggota Dewan Pengawas + Koordinator Bidang Pangan',
    peran: 'Pengawas Internal KNMP | Ahli Ketahanan Pangan Nasional',
  },
  {
    no: 9,
    nama: 'Prof. Dr. Tedy Mantoro',
    jabatan: 'Ketua Dewan Pengawas (Chairman of Supervisory Board)',
    peran: 'Ketua Pengawas Independen KNMP | Ahli Teknologi & Tata Kelola Digital',
  },
];

// Dewan Pengawas
const DEWAN_PENGAWAS = [
  { jabatan: 'Ketua Dewan Pengawas', nama: 'Prof. Dr. Tedy Mantoro', keterangan: 'Pendiri ke-9 | Independen', status: 'terisi' },
  { jabatan: 'Wakil Ketua Pengawas', nama: 'Prof. Dr. Elan Masbulan', keterangan: 'Pakar Pendidikan & Tata Kelola', status: 'terisi' },
  { jabatan: 'Sekretaris Pengawas', nama: 'Dr. Habib', keterangan: 'Pendiri ke-8 | Bidang Pangan', status: 'terisi' },
  { jabatan: 'Anggota Pengawas 1', nama: '(Kosong — Usulan: Ahli Hukum Koperasi)', keterangan: 'Diusulkan dari unsur eksternal', status: 'kosong' },
  { jabatan: 'Anggota Pengawas 2', nama: '(Kosong — Usulan: Akuntan Publik Tersertifikasi)', keterangan: 'Diusulkan dari unsur KAP independen', status: 'kosong' },
];

// Dewan Pembina
const DEWAN_PEMBINA = [
  { jabatan: 'Ketua Dewan Pembina', nama: 'Dr. (H.C.) Ir. H. Suharso Monoarfa', keterangan: 'Pendiri ke-3 | Permanen', status: 'terisi' },
  { jabatan: 'Wakil Ketua Pembina', nama: 'Dr. H. Anwar Sanusi, SH, S.Pel, MM.', keterangan: 'Representasi Pemerintah', status: 'terisi' },
  { jabatan: 'Anggota Pembina 1', nama: '(Kosong — Usulan: Unsur Pendidikan Tinggi)', keterangan: 'Akademisi/Pakar Koperasi', status: 'kosong' },
];

// Dewan Penasihat
const DEWAN_PENASIHAT = [
  { jabatan: 'Ketua Dewan Penasihat Kehormatan', nama: 'Dr. A. Iskandar Zulkarnain, CRP, CIFM, GRCP, CIB, RIFA, WCW', keterangan: 'Finansial & ESG', status: 'terisi' },
  { jabatan: 'Anggota Penasihat Bidang Hukum', nama: 'Dr. Heri Solahudin', keterangan: '46 Pakar Lintas Bidang', status: 'terisi' },
  { jabatan: 'Anggota Penasihat Bidang Digital', nama: '(Kosong — Usulan: Pakar Blockchain/AI)', keterangan: 'Kuota 46 pakar total', status: 'kosong' },
  { jabatan: 'Anggota Penasihat Bidang Agribisnis', nama: '(Kosong — Usulan: Pakar Pertanian/Pangan)', keterangan: 'Kuota 46 pakar total', status: 'kosong' },
];

// Presidium Eksekutif Nasional (BAKORNAS) - Gugun Gunara DIKOSONGKAN
const PRESIDIUM_BAKORNAS = [
  { jabatan: 'PRESIDEN / Ketua Umum (Bakornas)', nama: 'Prof. Wirono, S.E., M.Pd', keterangan: 'Pendiri ke-1 | Pemimpin Tertinggi Eksekutif', status: 'terisi', highlight: true },
  { jabatan: 'WAKIL PRESIDEN / Wakil Ketua Umum', nama: 'Drs. H. Arif Rachman Hakim, M.M.', keterangan: 'Pendiri ke-2 | CEO JE-P3 & Diplomasi Global', status: 'terisi', highlight: true },
  { jabatan: 'SEKRETARIS JENDERAL (Sekjen)', nama: 'Dr. Cecep Sumarno', keterangan: 'Pendiri ke-4 | Legal Koperasi', status: 'terisi' },
  { jabatan: 'WAKIL SEKRETARIS JENDERAL (Wasekjen)', nama: 'Tn. H. Gugun Gunara', keterangan: 'Pendiri ke-5 | COO + Grand Architect KNMP', status: 'terisi', highlight: true },
  { jabatan: 'BENDAHARA UMUM / CFO', nama: '(Kosong — Usulan: Akuntan/CPA Berpengalaman)', keterangan: 'Dipilih RAT Perdana — Memiliki Sertifikasi Keuangan', status: 'kosong' },
  { jabatan: 'WAKIL BENDAHARA UMUM 1', nama: '(Kosong — Usulan: Ahli Keuangan Koperasi)', keterangan: 'Bidang Anggaran & Simpanan', status: 'kosong' },
  { jabatan: 'WAKIL BENDAHARA UMUM 2', nama: '(Kosong — Usulan: Ahli Pajak/Tax Specialist)', keterangan: 'Bidang Pajak & Kepatuhan Fiskal', status: 'kosong' },
  { jabatan: 'WAKIL BENDAHARA UMUM 3', nama: '(Kosong — Usulan: Ahli Investasi Syariah)', keterangan: 'Bidang Investasi & SHU', status: 'kosong' },
];

// Koordinator 15 Bidang Strategis - Gugun Gunara DIKOSONGKAN
const KOORDINATOR_BIDANG = [
  { no: 1, bidang: 'Bidang Organisasi & Keanggotaan', ketua: 'Hj. Inna Hadianala, S.E.', sekretaris: '(Kosong — Usulan: Ahli Manajemen SDM)', catatan: 'Pendiri ke-3 | Pembina Organisasi', status: 'terisi' },
  { no: 2, bidang: 'Bidang Pangan & Ketahanan Pangan', ketua: 'Dr. Habib', sekretaris: '(Kosong — Usulan: Ahli Agribisnis/Pangan)', catatan: 'Pendiri ke-8 | Ketahanan Pangan Nasional', status: 'terisi' },
  { no: 3, bidang: 'Bidang Industri & Manufaktur', ketua: '(Kosong — Usulan: Pakar Industri Nasional)', sekretaris: '(Kosong)', catatan: 'Prioritas: Industri Pengolahan Desa', status: 'kosong' },
  { no: 4, bidang: 'Bidang Logistik & Distribusi', ketua: 'M. Ilham', sekretaris: '(Kosong — Usulan: Ahli Supply Chain)', catatan: 'Jaringan Logistik 83.763 Desa', status: 'terisi' },
  { no: 5, bidang: 'Bidang Kesehatan & Farmasi', ketua: '(Kosong — Usulan: Dokter/Ahli Kesehatan Masyarakat)', sekretaris: '(Kosong)', catatan: 'Integrasi Posyandu 300rb Unit', status: 'kosong' },
  { no: 6, bidang: 'Bidang Keuangan & Perbankan', ketua: 'Fawwaz Arif Al Jabar, S.E., M.M.', sekretaris: '(Kosong — Usulan: Ahli Perbankan Koperasi)', catatan: 'Pendiri ke-6 | JP3 Pay & Fintech Desa', status: 'terisi' },
  { no: 7, bidang: 'Bidang Investasi & ESG', ketua: '(Kosong — Usulan: Ahli Investasi/CFA)', sekretaris: '(Kosong)', catatan: 'ESG, Green Bond, Impact Investing', status: 'kosong' },
  { no: 8, bidang: 'Bidang Bisnis Kemitraan & UMKM', ketua: 'Ongky Putra', sekretaris: '(Kosong — Usulan: Ahli Kewirausahaan)', catatan: 'Ekosistem Mitra & UMKM Desa', status: 'terisi' },
  { no: 9, bidang: 'Bidang Digital & Teknologi', ketua: 'M. Sidik', sekretaris: '(Kosong — Usulan: Software Engineer/DevOps)', catatan: 'kopnusa.id | Blockchain | AI | IoT', status: 'terisi' },
  { no: 10, bidang: 'Bidang Holding Trading Ekosistem', ketua: 'Tn. H. Gugun Gunara, S. E', sekretaris: 'Cecep Abdul Jabbar', catatan: 'Pendiri ke-5 | Grand Architect | Holding Strategis', status: 'terisi' },
  { no: 11, bidang: 'Bidang Wisata, Umroh & Haji', ketua: 'Dr. Cecep Sumarno', sekretaris: '(Kosong — Usulan: Ahli Bisnis Haji/Umroh)', catatan: 'Pendiri ke-4 | Sekjen merangkap Bid. 11', status: 'terisi' },
  { no: 12, bidang: 'Bidang Hukum & Advokasi', ketua: '(Kosong — Usulan: Advokat/Pakar Hukum Koperasi)', sekretaris: '(Kosong — Usulan: Konsultan Hukum/Notaris)', catatan: 'Legal, Compliance, Advokasi Anggota', status: 'kosong' },
  { no: 13, bidang: 'Bidang Pengembangan SDM & Diklat', ketua: '(Kosong — Usulan: Prof./Pakar Pendidikan Koperasi)', sekretaris: '(Kosong — Usulan: Trainer/HRD Bersertifikat)', catatan: 'JE-P3 Academy | Kader KNMP Nasional', status: 'kosong' },
  { no: 14, bidang: 'Bidang Ekspor Impor & Perdagangan Internasional', ketua: '(Kosong — Usulan: Ahli Perdagangan Internasional/PPEI)', sekretaris: '(Kosong — Usulan: Ahli Kepabeanan/Logistik Ekspor)', catatan: 'Global Trade Desk | Komoditas Ekspor Desa', status: 'kosong' },
  { no: 15, bidang: 'Bidang Hubungan Masyarakat & Media', ketua: '(Kosong — Usulan: Praktisi PR/Media/Komunikasi)', sekretaris: '(Kosong — Usulan: Jurnalis/Content Strategist)', catatan: 'Branding KNMP Nasional & Internasional', status: 'kosong' },
];

// Koordinator 5 Kawasan Kepulauan
const KOORDINATOR_KAWASAN = [
  { no: 1, kawasan: 'JAWA (Bakorwil Jawa)', panglima: '(Kosong — Prioritas Utama) Usulan: Tokoh Senior Jawa / Eks-Pejabat Kemendes', cakupan: 'DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur, DI Yogyakarta, Banten (6 Provinsi)', catatan: 'Pusat Populasi & Ekonomi NKRI | Prioritas Rekrutmen 35.000+ Desa Target', status: 'kosong', prioritas: true },
  { no: 2, kawasan: 'SUMATERA (Bakorwil Sumatera)', panglima: 'Erick Hariadi (Jaringan KADIN)', cakupan: 'Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepri, Jambi, Bengkulu, Sumatera Selatan, Babel, Lampung (10 Provinsi)', catatan: 'Komoditas: Sawit, Karet, Kopi, Lada, Batubara | Gateway Ekspor ASEAN', status: 'terisi' },
  { no: 3, kawasan: 'KALIMANTAN (Bakorwil Kalimantan)', panglima: 'Andi Darmadji, S.E. (Pendiri ke-7 KNMP)', cakupan: 'Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, Kalimantan Utara (5 Provinsi)', catatan: 'IKN Nusantara — Episentrum Baru | Sawit, Batubara, Rotan', status: 'terisi' },
  { no: 4, kawasan: 'SULAWESI & MALUKU (Bakorwil Sulawesi-Maluku)', panglima: 'Imam Fauzan (Koordinator Sulawesi)', cakupan: 'Sulawesi Utara, Sulawesi Tengah, Sulawesi Selatan, Sulawesi Tenggara, Gorontalo, Sulawesi Barat, Maluku, Maluku Utara (8 Provinsi)', catatan: 'Nikel, Kakao, Cengkeh, Rempah, Perikanan Laut Dalam | Ekonomi Biru', status: 'terisi' },
  { no: 5, kawasan: 'PAPUA & WILAYAH TIMUR (Bakorwil Papua & NTT)', panglima: '(Kosong — Prioritas Strategis) Usulan: Tokoh Papua Adat / Figur Lokal Terpercaya', cakupan: 'Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya, NTT (7 Provinsi)', catatan: 'Kawasan Perbatasan & Sumber Daya | Emas, Perikanan, Pariwisata', status: 'kosong', prioritas: true },
];

// Rekapitulasi Status
const REKAPITULASI = [
  { komponen: 'Dewan Pendiri', status: 'LENGKAP', keterangan: '9 Pendiri (ganjil) — Sah & Legal', color: 'green' },
  { komponen: 'Dewan Pengawas', status: 'LENGKAP', keterangan: 'Cukup', color: 'green' },
  { komponen: 'Dewan Pembina', status: '2/3 Terisi', keterangan: 'Butuh 1 Anggota', color: 'yellow' },
  { komponen: 'Dewan Penasihat', status: '2/3+ Terisi', keterangan: 'Ketua Terisi — Butuh 2 Anggota', color: 'yellow' },
  { komponen: 'Presidium Bakornas', status: '3/8 Terisi', keterangan: 'Presiden, Waketum, Sekjen Terisi', color: 'yellow' },
  { komponen: 'Bendahara & Wakil', status: '0/4 Terisi', keterangan: 'Perlu Segera Diisi — RAT Perdana', color: 'red' },
  { komponen: 'Koordinator 15 Bidang', status: '7/15 Ketua Terisi', keterangan: '8 Posisi Ketua Kosong', color: 'yellow' },
  { komponen: 'Koordinator 5 Kawasan', status: '3/5 Terisi', keterangan: 'Jawa & Papua Kosong — Prioritas', color: 'yellow' },
];

// Roadmap
const ROADMAP = [
  { fase: 'Fase 0 — Pendirian', timeline: 'Maret 2026', target: '9 Pendiri ✅ | Presidium Inti ✅ | Akta Notaris' },
  { fase: 'Fase 1 — Konsolidasi', timeline: 'Maret 2026', target: 'Bendahara + 5 Bidang Prioritas + Bakorwil Jawa' },
  { fase: 'Fase 2 — Ekspansi Pulau', timeline: 'Maret 2026', target: '10 Bidang Tersisa + Bakorwil Papua + Sekretaris Bidang' },
  { fase: 'Fase 3 — RAT Perdana', timeline: 'Maret 2026', target: 'Pengesahan Seluruh Pengurus melalui RAT Perdana KNMP' },
  { fase: 'Fase 4 — Operasional Penuh', timeline: 'April 2026', target: 'Aktivasi Bakorwil 34 Provinsi + Bakorda 514 Daerah' },
];

// ==================== SECTIONS ====================

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#008F3D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="border-[#008F3D] text-[#008F3D] px-4 py-1">
              Dokumen Resmi KNMP
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-responsive-hero font-bold text-white leading-tight">
            Struktur Organisasi
            <br />
            <span className="text-gradient-gold">KNMP 2026–2029</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-responsive-subtitle text-gray-300 max-w-3xl mx-auto">
            Rancangan Pengurus Nasional — Sistem Komando Bakor Nusantara
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-4">
            <Badge className="bg-[#8B0000] text-white px-4 py-2">
              <Scale className="w-4 h-4 mr-2" />UU 25/1992 · Permenkop 8/2021
            </Badge>
            <Badge className="bg-[#008F3D] text-[#1a1a2e] px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />UU 27/2022 · Inpres 9/2025
            </Badge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HierarkiKomandoSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            BAB I — Sistem Hierarki <span className="text-gradient-primary">Komando Bakor Nusantara</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Nomenklatur Resmi Sistem Koordinasi Wilayah — Setara dengan Struktur Komando Eksekutif Nasional
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-3">
          {HIERARKI_KOMANDO.map((item) => (
            <motion.div key={item.tingkat} variants={fadeInUp}>
              <Card className="card-hover-lift border-l-4" style={{ borderLeftColor: item.color }}>
                <CardContent className="p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">Tingkat {item.tingkat}</Badge>
                        <h3 className="font-bold">{item.nama}</h3>
                        <p className="text-xs text-muted-foreground">{item.namaLengkap}</p>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="hidden md:block h-12" />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sebutan Kehormatan</p>
                        <p className="font-semibold text-sm">{item.sebutan}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Wilayah</p>
                        <p className="font-semibold text-sm">{item.wilayah}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Padanan Struktural</p>
                        <p className="font-semibold text-sm">{item.padanan}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-6">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 flex gap-3">
              <Scale className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>CATATAN LEGAL:</strong> Penamaan Bakornas/Bakorwil/Bakorda/Bakorcam/Bakordeka adalah nomenklatur internal koperasi yang sah secara AD/ART berdasarkan Pasal 16 AD KNMP. Sebutan kehormatan bersifat seremonial internal.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function DewanPendiriSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#8B0000] text-white mb-3">9 Anggota Pendiri</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            BAB II — Dewan Pendiri <span className="text-gradient-gold">Koperasi</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Jumlah Ganjil — Sesuai Prinsip Musyawarah Mufakat & Quorum Pengambilan Keputusan
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEWAN_PENDIRI.map((pendiri) => (
            <motion.div key={pendiri.no} variants={scaleIn}>
              <Card className={cn(
                "h-full card-hover-lift",
                pendiri.kosong ? "border-dashed border-2 border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-950/20" : "border-l-4 border-l-[#008F3D]"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0",
                      pendiri.kosong ? "bg-amber-500" : "bg-[#8B0000]"
                    )}>
                      {pendiri.no}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={cn("font-semibold mb-1", pendiri.kosong && "text-muted-foreground italic")}>
                        {pendiri.nama || '(Posisi Kosong)'}
                      </h4>
                      <p className="text-xs text-[#008F3D] font-medium mb-1 line-clamp-2">{pendiri.jabatan}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{pendiri.peran}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-6">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>LEGAL NOTE:</strong> 9 Pendiri (angka ganjil) memenuhi persyaratan quorum pengambilan keputusan dengan prinsip simple majority (5:4) maupun supermajority (6:3 atau 7:2). Sesuai Permenkop 8/2021.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function DewanSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            BAB III — Rancangan <span className="text-gradient-primary">Pengurus Nasional</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Susunan Lengkap Pengurus Nasional — Periode 2026–2029
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {/* Dewan Pengawas */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card className="border-[#8B0000]/30">
              <CardHeader className="bg-gradient-to-r from-[#8B0000]/10 to-transparent border-b py-3">
                <CardTitle className="flex items-center gap-2 text-[#8B0000] text-lg">
                  <Shield className="w-5 h-5" />Dewan Pengawas (Supervisory Board)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {DEWAN_PENGAWAS.map((item, idx) => (
                    <div key={idx} className={cn("p-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4", item.status === 'kosong' && "bg-gray-50/50 dark:bg-gray-900/30")}>
                      <div className="md:w-1/3"><p className="font-medium text-sm">{item.jabatan}</p></div>
                      <div className="md:w-1/3"><p className={cn("text-sm", item.status === 'kosong' ? "text-muted-foreground italic" : "font-semibold")}>{item.nama}</p></div>
                      <div className="md:w-1/3"><p className="text-xs text-muted-foreground">{item.keterangan}</p></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dewan Pembina */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card className="border-[#008F3D]/30">
              <CardHeader className="bg-gradient-to-r from-[#008F3D]/10 to-transparent border-b py-3">
                <CardTitle className="flex items-center gap-2 text-[#008F3D] text-lg">
                  <Award className="w-5 h-5" />Dewan Pembina (Advisory & Covenant Board)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {DEWAN_PEMBINA.map((item, idx) => (
                    <div key={idx} className={cn("p-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4", item.status === 'kosong' && "bg-gray-50/50 dark:bg-gray-900/30")}>
                      <div className="md:w-1/3"><p className="font-medium text-sm">{item.jabatan}</p></div>
                      <div className="md:w-1/3"><p className={cn("text-sm", item.status === 'kosong' ? "text-muted-foreground italic" : "font-semibold")}>{item.nama}</p></div>
                      <div className="md:w-1/3"><p className="text-xs text-muted-foreground">{item.keterangan}</p></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dewan Penasihat */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card className="border-[#1a1a2e]/30">
              <CardHeader className="bg-gradient-to-r from-[#1a1a2e]/10 to-transparent border-b py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="w-5 h-5 text-[#008F3D]" />Dewan Penasihat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {DEWAN_PENASIHAT.map((item, idx) => (
                    <div key={idx} className={cn("p-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4", item.status === 'kosong' && "bg-gray-50/50 dark:bg-gray-900/30")}>
                      <div className="md:w-1/3"><p className="font-medium text-sm">{item.jabatan}</p></div>
                      <div className="md:w-1/3"><p className={cn("text-sm", item.status === 'kosong' ? "text-muted-foreground italic" : "font-semibold")}>{item.nama}</p></div>
                      <div className="md:w-1/3"><p className="text-xs text-muted-foreground">{item.keterangan}</p></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PresidiumSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#8B0000] text-white mb-3">BAKORNAS</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Presidium Eksekutif <span className="text-gradient-gold">Nasional</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pimpinan Tertinggi Eksekutif KNMP — Bakornas
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
          <Card className="border-2 border-[#8B0000]/30 overflow-hidden">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] p-3">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Landmark className="w-5 h-5" />PRESIDIUM UTAMA — BAKORNAS
              </h3>
            </div>
            <CardContent className="p-0">
              <div className="divide-y">
                {PRESIDIUM_BAKORNAS.map((item, idx) => (
                  <div key={idx} className={cn(
                    "p-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 transition-colors",
                    item.status === 'kosong' && "bg-gray-50/50 dark:bg-gray-900/30",
                    item.kosong && "bg-amber-50/50 dark:bg-amber-950/20",
                    item.highlight && "bg-[#008F3D]/5"
                  )}>
                    <div className="md:w-2/5">
                      <p className={cn("font-medium text-sm", item.highlight && "text-[#8B0000] font-semibold")}>{item.jabatan}</p>
                    </div>
                    <div className="md:w-2/5">
                      <p className={cn("text-sm", (item.status === 'kosong' || item.kosong) ? "text-muted-foreground italic" : "font-semibold")}>
                        {item.nama || '(Posisi Kosong)'}
                      </p>
                    </div>
                    <div className="md:w-1/5">
                      <p className="text-xs text-muted-foreground">{item.keterangan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function KoordinatorBidangSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#008F3D] text-[#1a1a2e] mb-3">15 Divisi Strategis</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Koordinator <span className="text-gradient-primary">Bidang</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#8B0000] text-white">
                <th className="p-2 text-left font-semibold w-10">No</th>
                <th className="p-2 text-left font-semibold">Bidang</th>
                <th className="p-2 text-left font-semibold">Ketua Bidang</th>
                <th className="p-2 text-left font-semibold hidden md:table-cell">Sekretaris</th>
                <th className="p-2 text-left font-semibold hidden lg:table-cell">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {KOORDINATOR_BIDANG.map((item) => (
                <motion.tr
                  key={item.no}
                  variants={fadeInUp}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    item.status === 'kosong' && "bg-gray-50/30 dark:bg-gray-900/20",
                    item.kosong && "bg-amber-50/30 dark:bg-amber-900/10"
                  )}
                >
                  <td className="p-2 text-center font-medium">{item.no}</td>
                  <td className="p-2 font-medium">{item.bidang}</td>
                  <td className={cn("p-2", (item.status === 'kosong' || item.kosong) ? "text-muted-foreground italic" : "font-medium")}>
                    {item.ketua || '(Kosong)'}
                  </td>
                  <td className="p-2 text-muted-foreground hidden md:table-cell">{item.sekretaris}</td>
                  <td className="p-2 text-xs text-muted-foreground hidden lg:table-cell">{item.catatan}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function KoordinatorKawasanSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#1a1a2e] text-white mb-3">5 Kawasan Kepulauan</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Koordinator Pulau — <span className="text-gradient-gold">BAKORWIL</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Peta Komando Wilayah Kepulauan Nusantara — Representasi 34 Provinsi dalam 5 Kawasan Strategis
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-3">
          {KOORDINATOR_KAWASAN.map((item) => (
            <motion.div key={item.no} variants={scaleIn}>
              <Card className={cn(
                "card-hover-lift overflow-hidden",
                item.prioritas && "border-amber-400 dark:border-amber-600",
                item.status === 'terisi' && "border-l-4 border-l-green-500"
              )}>
                <CardContent className="p-0">
                  <div className={cn("p-4 flex flex-col lg:flex-row gap-4", item.status === 'kosong' && "bg-gray-50/50 dark:bg-gray-900/30")}>
                    <div className="lg:w-1/4 flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                        item.prioritas ? "bg-amber-500" : item.status === 'terisi' ? "bg-green-600" : "bg-gray-400"
                      )}>
                        {item.no}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.kawasan}</h4>
                        {item.prioritas && <Badge variant="outline" className="text-xs border-amber-500 text-amber-600">Prioritas</Badge>}
                      </div>
                    </div>
                    <div className="lg:w-1/4">
                      <p className={cn("text-sm", item.status === 'kosong' ? "text-muted-foreground italic" : "font-medium")}>{item.panglima}</p>
                    </div>
                    <div className="lg:w-1/4">
                      <p className="text-xs text-muted-foreground">{item.cakupan}</p>
                    </div>
                    <div className="lg:w-1/4">
                      <p className="text-xs text-muted-foreground">{item.catatan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RekapitulasiSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-10">
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            BAB IV — Rekapitulasi & <span className="text-gradient-primary">Roadmap</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rekapitulasi */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card>
              <CardHeader className="border-b py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5 text-[#8B0000]" />Rekapitulasi Status Kepengurusan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {REKAPITULASI.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center gap-3">
                      <div className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0",
                        item.color === 'green' && "bg-green-500",
                        item.color === 'yellow' && "bg-yellow-500",
                        item.color === 'red' && "bg-red-500"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.komponen}</p>
                        <p className="text-xs text-muted-foreground">{item.keterangan}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "flex-shrink-0 text-xs",
                        item.color === 'green' && "border-green-500 text-green-600",
                        item.color === 'yellow' && "border-yellow-500 text-yellow-600",
                        item.color === 'red' && "border-red-500 text-red-600"
                      )}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Roadmap */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card>
              <CardHeader className="border-b py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-[#008F3D]" />Roadmap Pengisian Posisi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {ROADMAP.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-start gap-3">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs",
                        idx < 2 ? "bg-[#8B0000]" : idx < 4 ? "bg-[#008F3D]" : "bg-gray-400"
                      )}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{item.fase}</p>
                          <Badge variant="outline" className="text-xs"><Clock className="w-3 h-3 mr-1" />{item.timeline}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="mt-8">
          <Card className="bg-gradient-to-r from-[#8B0000] to-[#1a1a2e] text-white">
            <CardContent className="p-6 text-center">
              <blockquote className="text-lg md:text-xl italic mb-4">
                "KNMP bukan milik pendirinya. KNMP milik seluruh anggota — kini dan selamanya."
              </blockquote>
              <cite className="text-[#008F3D] not-italic text-sm">
                — Drs. H. Arif Rachman Hakim, CEO – Wakil Presiden / Waketum KNMP
              </cite>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Badge className="bg-white/20 text-white">Dari Desa untuk Indonesia</Badge>
                <Badge className="bg-white/20 text-white">Dari Indonesia untuk Dunia</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#8B0000] to-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="mb-4">
            <Badge className="bg-white/20 text-white mb-4">Gabung Bersama Kami</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Jadilah Bagian dari <span className="text-[#008F3D]">Peradaban Baru</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300 mb-6 max-w-2xl mx-auto">
            KNMP membuka kesempatan bagi seluruh anggota untuk berkontribusi dalam struktur organisasi.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#008F3D] hover:bg-[#B8960C] text-[#1a1a2e] font-semibold">
              Daftar Sebagai Anggota
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/kontak" className="flex items-center gap-2">
                Hubungi Kami
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== MAIN PAGE ====================
export default function StrukturOrganisasiPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HierarkiKomandoSection />
      <DewanPendiriSection />
      <DewanSection />
      <PresidiumSection />
      <KoordinatorBidangSection />
      <KoordinatorKawasanSection />
      <RekapitulasiSection />
      <CTASection />
    </main>
  );
}
