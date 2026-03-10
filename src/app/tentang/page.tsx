'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Users,
  Scale,
  Shield,
  Eye,
  Vote,
  Award,
  Star,
  Briefcase,
  Globe,
  Landmark,
  GraduationCap,
  Heart,
  Zap,
  Layers,
  Network,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UserCircle,
  Building,
  FileText,
  Gavel,
  Target,
  TrendingUp,
  MapPin,
  Flag,
  Rocket,
  CheckCircle2,
  ArrowRight,
<<<<<<< HEAD
  Award,
  FileText,
  Globe,
  Vote,
  Zap,
  Building,
  Star,
  ChevronRight,
  Landmark,
  Crown,
  BadgeCheck,
  Plus,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ORIGIN_TIMELINE,
  LEGAL_INFO,
  COOPERATIVE_PRINCIPLES,
  DUAL_ENTITY,
  VISION_2045,
  TEAM_STRUCTURE,
  PARTNER_LOGOS,
  KDMP_ALIGNMENT,
  HERO_STATS,
} from '@/data/mocks';
import { SITE_CONFIG, COLORS } from '@/constants';

// ─── Animation Variants ───────────────────────────────────────────────────────
=======
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPinned,
  ExternalLink,
  BadgeCheck,
  Globe2,
  Handshake,
  Leaf,
  BarChart3,
  Package,
  Truck,
  Warehouse,
  Smartphone,
  DollarSign,
  Wallet,
  Seedling,
  Fish,
  TreeDeciduous,
  Palmtree,
  Sun,
  Droplets,
  Mountain,
  Anchor,
  Plane,
  HeartHandshake,
  Wheat,
  ShoppingBag,
  Crown,
  Info,
  Quote,
  Play,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

>>>>>>> 60f4267 (update web)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
<<<<<<< HEAD
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
=======
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
>>>>>>> 60f4267 (update web)

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

<<<<<<< HEAD
const founderFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const glowPulse = {
  initial: { boxShadow: '0 0 0px 0px rgba(212,175,55,0)' },
  animate: {
    boxShadow: [
      '0 0 0px 0px rgba(212,175,55,0)',
      '0 0 24px 6px rgba(212,175,55,0.35)',
      '0 0 0px 0px rgba(212,175,55,0)',
    ],
    transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
  },
};

// ─── Helper ───────────────────────────────────────────────────────────────────
const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, React.ReactNode> = {
    Users: <Users className={className} />,
    Vote: <Vote className={className} />,
    Scale: <Scale className={className} />,
    Shield: <Shield className={className} />,
    GraduationCap: <GraduationCap className={className} />,
    Handshake: <Handshake className={className} />,
    Heart: <Heart className={className} />,
    MapPin: <MapPin className={className} />,
    TrendingUp: <TrendingUp className={className} />,
    Flag: <Flag className={className} />,
    Rocket: <Rocket className={className} />,
    Network: <Network className={className} />,
    Building2: <Building2 className={className} />,
  };
  return icons[iconName] || <Users className={className} />;
};

// ─── Founders Data ────────────────────────────────────────────────────────────
const founders = [
  {
    id: 1,
    name: 'Tn. H. Gugun Gunara, S.E., M.M.',
    shortName: 'Gugun Gunara',
    position: 'Founder & Chief Visionary',
    role: 'founder',
    since: 'Sejak 2016',
    photo: '',
    bio: 'Visioner di balik transformasi digital koperasi Indonesia. Pelopor ekosistem desa digital terintegrasi.',
    initials: 'GG',
    badge: 'COO',
    badgeColor: 'gold',
    icon: Crown,
    active: true,
  },
  {
    id: 2,
    name: 'Drs. H. Arif Rachman Hakim',
    shortName: 'Arif Rachman Hakim',
    position: 'Chief Executive Officer',
    role: 'ceo',
    since: 'CEO',
    photo: '',
    bio: 'Memimpin strategi eksekusi dan tata kelola operasional Koperasi Nusantara Merah Putih secara menyeluruh.',
    initials: 'AR',
    badge: 'CEO',
    badgeColor: 'red',
    icon: BadgeCheck,
    active: true,
  },
  {
    id: 3,
    name: '',
    shortName: 'Segera Hadir',
    position: 'Co-Founder',
    role: 'empty',
    since: '',
    photo: '',
    bio: 'Posisi ini akan segera diisi oleh tokoh terpilih yang berkontribusi dalam pendirian koperasi.',
    initials: '?',
    badge: 'TBA',
    badgeColor: 'muted',
    icon: Plus,
    active: false,
  },
  {
    id: 4,
    name: '',
    shortName: 'Segera Hadir',
    position: 'Co-Founder',
    role: 'empty',
    since: '',
    photo: '',
    bio: 'Posisi ini akan segera diisi oleh tokoh terpilih yang berkontribusi dalam pendirian koperasi.',
    initials: '?',
    badge: 'TBA',
    badgeColor: 'muted',
    icon: Plus,
    active: false,
  },
  {
    id: 5,
    name: '',
    shortName: 'Segera Hadir',
    position: 'Co-Founder',
    role: 'empty',
    since: '',
    photo: '',
    bio: 'Posisi ini akan segera diisi oleh tokoh terpilih yang berkontribusi dalam pendirian koperasi.',
    initials: '?',
    badge: 'TBA',
    badgeColor: 'muted',
    icon: Plus,
    active: false,
  },
];

const badgeStyles: Record<string, string> = {
  gold: 'bg-[#D4AF37] text-[#1a1a2e] font-bold',
  red: 'bg-[#8B0000] text-white font-bold',
  muted: 'bg-white/10 text-white/50 border border-white/20',
};

// ─── SECTION: Hero ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
=======
// ==================== DATA ====================

// Executive Summary Stats
const EXECUTIVE_STATS = [
  { value: '83.763', suffix: '', label: 'Desa Terintegrasi', icon: MapPin, color: '#8B0000' },
  { value: '10', suffix: ' Juta', label: 'Target Anggota', icon: Users, color: '#D4AF37' },
  { value: 'Rp 500', suffix: ' T', label: 'Target Transaksi 2045', icon: TrendingUp, color: '#059669' },
  { value: '195', suffix: '', label: 'Negara Tujuan Ekspor', icon: Globe, color: '#0284c7' },
  { value: '45+', suffix: '', label: 'Infrastruktur Desa', icon: Building2, color: '#7c3aed' },
  { value: '6', suffix: ' KPA', label: 'Kelompok Pihak Anggota', icon: Network, color: '#db2777' },
]

// Company Profile
const COMPANY_PROFILE = {
  legalName: 'KOPERASI NUSANTARA MERAH PUTIH',
  englishName: 'RED AND WHITE ARCHIPELAGO COOPERATIVE',
  abbreviation: 'KNMP',
  type: 'Koperasi Multipihak Primer',
  established: '2026',
  headquarters: 'Jakarta Selatan, DKI Jakarta, Indonesia',
  coverage: '38 Provinsi, 514 Kabupaten/Kota, 83.763 Desa',
  legalBasis: [
    'UU No. 25/1992 tentang Perkoperasian',
    'Permenkop No. 8/2021 tentang Koperasi Multipihak',
    'UU No. 27/2022 tentang Perlindungan Data Pribadi',
    'Inpres No. 9/2025 tentang Koperasi Desa Merah Putih',
  ],
  portals: {
    knmp: 'kopnusa.id',
    jep3: 'pppbisnis.com',
    register: 'daftar.kopnusa.id',
  },
}

// Timeline History
const HISTORY_TIMELINE = [
  { year: '2016', title: 'bisnisPPP', description: 'Awal mula sebagai komunitas pengusaha Persatuan Pembangunan', icon: Users },
  { year: '2020', title: 'JP3', description: 'Transformasi menjadi Jaringan Pengusaha Persatuan Pembangunan dengan visi ekosistem digital', icon: Network },
  { year: '2025', title: 'JE-P3', description: 'Evolusi menjadi Jaringan Ekosistem Pengusaha Persatuan Pembangunan dengan dual-entity architecture', icon: Zap },
  { year: '2026', title: 'KNMP', description: 'Pendirian Koperasi Nusantara Merah Putih sebagai koperasi multipihak berbasis desa digital', icon: Building2 },
]

// Vision & Mission
const VISION_MISSION = {
  vision: 'Menjadi Digital Operating System Desa Indonesia Terbesar di Dunia — Koperasi Nusantara Merah Putih sebagai Jantung Operasional yang Mengintegrasikan 45+ Kelembagaan Desa ke dalam Satu Platform Digital Terunifikasi.',
  missions: [
    { title: 'MENGHIMPUN', desc: 'Menghimpun dan mengembangkan kapasitas anggota secara berjenjang dari desa hingga nasional', icon: Users },
    { title: 'MENGINTEGRASIKAN', desc: 'Mengintegrasikan 45+ infrastruktur desa (PKK, BUMDes, Gapoktan, dll) ke dalam satu platform digital', icon: Network },
    { title: 'MENGAKSELERASI', desc: 'Mendorong akses pasar, pembiayaan inklusif, pelatihan, dan sertifikasi terukur', icon: Rocket },
    { title: 'MENDIPLOMASI', desc: 'Menjalankan diplomasi ekonomi melalui kolaborasi dengan pemerintah dan 195 negara', icon: Globe },
    { title: 'MEMBERDAYAKAN', desc: 'Meningkatkan kesejahteraan anggota melalui distribusi SHU yang adil dan transparan', icon: TrendingUp },
  ],
  values: [
    { title: 'Desa-First', desc: 'Setiap keputusan diuji: apakah menguntungkan desa?', icon: MapPin },
    { title: 'Transparansi Digital', desc: 'Blockchain-verified, audit publik, data terbuka', icon: Shield },
    { title: 'Keberlanjutan ESG', desc: 'Environmental, Social, Governance', icon: Leaf },
    { title: 'Profesionalisme', desc: 'Standar internasional, manajemen berbasis data', icon: Award },
    { title: 'Independensi Politik', desc: 'Trans-partisan, fokus pada kesejahteraan rakyat', icon: Scale },
  ],
}

// Founder & Leadership
const FOUNDERS = [
  {
    name: 'Drs. H. Arif Rachman Hakim',
    position: 'CEO & Pendiri',
    role: 'Chief Executive Officer',
    organization: 'JE-P3 Asosiasi',
    description: 'CEO Asosiasi JE-P3. Pemimpin strategis yang mengarahkan visi ekosistem pengusaha Indonesia.',
    since: '2016',
    certifications: [],
    status: 'active',
    color: '#8B0000',
  },
  {
    name: 'Tn. H. Gugun Gunara, S.E., M.M.',
    position: 'COO & Grand Architect',
    role: 'Chief Operating Officer',
    organization: 'KNMP + JE-P3',
    description: 'Visioner di balik transformasi digital koperasi Indonesia. Grand Architect 42 Dokumen Peradaban.',
    since: '2016',
    certifications: ['CMC', 'MBA', 'CFA', 'PMP', 'CBP', 'SSBB'],
    status: 'active',
    color: '#D4AF37',
    isFounder: true,
  },
  {
    name: '',
    position: 'CFO',
    role: 'Chief Financial Officer',
    organization: 'KNMP',
    description: '',
    since: '',
    certifications: [],
    status: 'vacant',
    color: '#0284c7',
  },
  {
    name: '',
    position: 'CTO',
    role: 'Chief Technology Officer',
    organization: 'KNMP',
    description: '',
    since: '',
    certifications: [],
    status: 'vacant',
    color: '#7c3aed',
  },
  {
    name: '',
    position: 'CSO',
    role: 'Chief Strategy Officer',
    organization: 'KNMP',
    description: '',
    since: '',
    certifications: [],
    status: 'vacant',
    color: '#059669',
  },
]

// Complete Organization Structure
const ORG_STRUCTURE = {
  rat: {
    name: 'RAT',
    fullName: 'Rapat Anggota Tahunan',
    description: 'Forum tertinggi KNMP dengan kekuasaan tertinggi dalam pengambilan keputusan.',
    icon: Vote,
    color: '#8B0000',
    positions: 3,
    authority: ['Menetapkan & mengubah AD/ART', 'Memilih & memberhentikan Pengurus/Pengawas', 'Menetapkan pembagian SHU', 'Mengesahkan laporan keuangan', 'Memutuskan penggabungan/pembubaran'],
  },
  pengurus: {
    name: 'Pengurus',
    fullName: 'Pengurus KNMP',
    description: 'Organ pelaksana yang dipilih RAT untuk mengelola koperasi sehari-hari.',
    icon: Building2,
    color: '#D4AF37',
    positions: 11,
    term: '5 Tahun (maks 2 periode)',
  },
  pengawas: {
    name: 'Pengawas',
    fullName: 'Pengawas KNMP',
    description: 'Organ independen yang mengawasi pelaksanaan AD/ART dan kinerja Pengurus.',
    icon: Eye,
    color: '#0284c7',
    positions: 5,
    term: '5 Tahun (maks 2 periode)',
  },
  dewanPenasihat: {
    name: 'Dewan Penasihat',
    fullName: 'Dewan Penasihat KNMP',
    description: 'Organ non-struktural yang memberikan nasihat strategis. Founder sebagai Ketua Permanen.',
    icon: Award,
    color: '#7c3aed',
    positions: 4,
    note: 'Founder menjabat sebagai Ketua Permanen',
  },
  dewanEtik: {
    name: 'Dewan Etik',
    fullName: 'Dewan Etik KNMP',
    description: 'Organ independen yang menegakkan Kode Etik KNMP.',
    icon: Scale,
    color: '#ea580c',
    positions: 4,
  },
  ombudsman: {
    name: 'Ombudsman',
    fullName: 'Ombudsman KNMP',
    description: 'Organ independen yang menerima dan menindaklanjuti pengaduan anggota.',
    icon: Shield,
    color: '#0891b2',
    positions: 3,
  },
  jsc: {
    name: 'JSC',
    fullName: 'Joint Strategic Committee',
    description: 'Komite bersama KNMP–JE-P3 dengan hak rekomendasi kuat untuk keputusan strategis.',
    icon: Network,
    color: '#db2777',
    positions: 7,
    note: 'Founder memiliki hak veto terbatas atas keputusan strategis',
  },
}

// 6 KPA
const KPA_DATA = [
  { id: 1, name: 'KPA-1: Petani/Produsen', proportion: 30, icon: '🌾', color: '#059669', description: 'Petani, pekebun, nelayan, peternak, pengrajin, dan produsen barang/jasa di tingkat desa.', examples: ['Gapoktan', 'Poktan', 'KWT', 'Kelompok Nelayan'] },
  { id: 2, name: 'KPA-2: Pengusaha/Pengepul', proportion: 20, icon: '💼', color: '#0284c7', description: 'Pengusaha UMKM, pengepul, pedagang, dan distributor yang menghubungkan produsen dengan pasar.', examples: ['Anggota JE-P3', 'Pengusaha PPP', 'Trader', 'Exportir'] },
  { id: 3, name: 'KPA-3: Koperasi/BUMDes', proportion: 20, icon: '🏛️', color: '#7c3aed', description: 'Koperasi primer, koperasi desa, BUMDes, BUMDesMA, dan badan usaha milik desa lainnya.', examples: ['KDMP', 'BUMDesMA', 'KUD', 'Koperasi Primer'] },
  { id: 4, name: 'KPA-4: Pekerja/Kader', proportion: 10, icon: '👷', color: '#ea580c', description: 'Pekerja, kader lapangan, agen logistik, dan tenaga profesional yang mendukung operasional KNMP.', examples: ['Karang Taruna', 'Kader PKK', 'Agen Logistik', 'Karyawan KNMP'] },
  { id: 5, name: 'KPA-5: Konsumen', proportion: 10, icon: '🛒', color: '#db2777', description: 'Konsumen akhir yang menggunakan produk/jasa anggota KNMP.', examples: ['Rumah Tangga', 'Konsumen Platform', 'Pembeli Produk'] },
  { id: 6, name: 'KPA-6: Investor Pendukung', proportion: 10, icon: '💰', color: '#D4AF37', description: 'Investor individu atau institusi yang menyediakan modal bagi pengembangan usaha KNMP.', examples: ['Bank Himbara', 'ADB', 'World Bank', 'Impact Investor'], note: 'Tidak memiliki hak veto' },
]

// 7 ICA Principles
const ICA_PRINCIPLES = [
  { number: 1, title: 'Keanggotaan Sukarela & Terbuka', icon: Users, color: '#8B0000', description: 'Terbuka bagi semua yang memenuhi syarat tanpa diskriminasi.' },
  { number: 2, title: 'Pengelolaan Demokratis', icon: Vote, color: '#D4AF37', description: 'Setiap anggota memiliki hak suara yang setara dalam RAT.' },
  { number: 3, title: 'Partisipasi Ekonomi Anggota', icon: TrendingUp, color: '#059669', description: 'Anggota berkontribusi dan menerima SHU secara adil berdasarkan partisipasi.' },
  { number: 4, title: 'Otonomi & Kemandirian', icon: Shield, color: '#0284c7', description: 'KNMP dikendalikan oleh anggota, bukan pihak eksternal.' },
  { number: 5, title: 'Pendidikan & Pelatihan', icon: GraduationCap, color: '#7c3aed', description: 'JE-P3 Academy menyediakan pelatihan untuk semua anggota.' },
  { number: 6, title: 'Kerjasama Antarkoperasi', icon: Handshake, color: '#ea580c', description: 'Bekerja sama dengan koperasi lain, BUMDes, dan KDMP.' },
  { number: 7, title: 'Kepedulian Komunitas', icon: Heart, color: '#db2777', description: 'Dana sosial 5% untuk kesejahteraan masyarakat.' },
]

// 5 Pillars
const FIVE_PILLARS = [
  { id: 1, name: 'Desa Cerdas Digital', icon: Smartphone, color: '#0284c7', revenue: 'Rp 50 M', description: 'Mengintegrasikan seluruh kelembagaan sosial desa ke dalam satu platform digital.', subs: ['Desa Digital', 'Desa Aman', 'Desa Sehat', 'Desa Pintar', 'Desa Kaya', 'Desa Modern'] },
  { id: 2, name: 'Holding Desa', icon: Building2, color: '#D4AF37', revenue: 'Rp 150 M', description: 'Menyatukan KDMP, BUMDes, BUMDesMA, Dana Desa, dan KUD.', subs: ['KDMP-as-a-Service', 'BUMDes & BUMDesMA', 'Dana Desa Intelligence', 'KUD Revitalisasi'] },
  { id: 3, name: 'Resi Gudang Digital', icon: Warehouse, color: '#059669', revenue: 'Rp 100 M', description: 'Membangun infrastruktur pasca-panen untuk kedaulatan pangan.', subs: ['Hilirisasi Komoditas', 'Resi Gudang BAPPEBTI', 'Supply Chain Tokenization', 'Cold Chain Network'] },
  { id: 4, name: 'Investasi & Kampung Modal', icon: TrendingUp, color: '#8B0000', revenue: 'Rp 200 M', description: 'Mengubah potensi desa menjadi aset investasi produktif.', subs: ['Pertanian Presisi', 'Perkebunan Ekspor', 'Peternakan', 'Perikanan', 'Desa Wisata', 'Energi Desa'] },
  { id: 5, name: 'Logistik Digital', icon: Truck, color: '#7c3aed', revenue: 'Rp 250 M', description: 'Jaringan logistik terintegrasi dari desa ke dunia.', subs: ['Ekspor Digital', 'Impor Strategis', 'Karang Taruna Digital', 'Tokenisasi Rantai Pasok', 'Infrastruktur 3 Level'] },
]

// Benchmark
const BENCHMARK = {
  name: 'Mondragon Corporation',
  country: 'Spanyol',
  founded: 1956,
  revenue: '€11.2 Miliar',
  members: '80.000+',
  description: 'Koperasi terbesar di dunia yang menjadi benchmark KNMP untuk mencapai target 2.5x lebih besar pada 2045.',
}

// Partners
const PARTNERS = {
  government: ['Kemenkop', 'Kemendesa', 'Kemendagri', 'Kementan', 'BPKP'],
  logistics: ['J&T Express', 'JNE', 'SiCepat', 'AnterAja', 'POS Indonesia'],
  financial: ['Bank Himbara', 'BRI', 'BNI', 'Mandiri', 'BSI'],
  academic: ['Harvard', 'Stanford', 'IPB', 'UGM', 'Mondragon Univ.'],
  international: ['ICA', 'World Bank', 'ADB', 'UNDP'],
}

// KDMP Alignment
const KDMP_ALIGNMENT = {
  title: 'KDMP Network',
  subtitle: 'Koperasi Desa Merah Putih',
  description: 'KNMP sebagai mitra strategis pemerintah dalam program Koperasi Desa Merah Putih (Inpres 9/2025) dengan target 80.081 gerai di seluruh Indonesia.',
  points: ['Integrasi dengan 80.081 gerai KDMP', 'Penyediaan platform digital kopnusa.id', 'Pelatihan kader KDMP via JE-P3 Academy', 'Akses pasar global melalui Global Trade Desk', 'Blockchain-verified transactions'],
}

// Color scheme for sections
const SECTION_COLORS = {
  primary: { main: '#8B0000', bg: 'bg-gradient-to-br from-red-900 to-red-800', border: 'border-red-800', text: 'text-red-900' },
  secondary: { main: '#D4AF37', bg: 'bg-gradient-to-br from-amber-500 to-yellow-500', border: 'border-amber-500', text: 'text-amber-700' },
  accent: { main: '#0284c7', bg: 'bg-gradient-to-br from-sky-500 to-blue-600', border: 'border-sky-500', text: 'text-sky-700' },
  tertiary: { main: '#7c3aed', bg: 'bg-gradient-to-br from-violet-500 to-purple-600', border: 'border-violet-500', text: 'text-violet-700' },
  success: { main: '#059669', bg: 'bg-gradient-to-br from-emerald-500 to-green-600', border: 'border-emerald-500', text: 'text-emerald-700' },
  warning: { main: '#ea580c', bg: 'bg-gradient-to-br from-orange-500 to-amber-600', border: 'border-orange-500', text: 'text-orange-700' },
  info: { main: '#0891b2', bg: 'bg-gradient-to-br from-cyan-500 to-teal-600', border: 'border-cyan-500', text: 'text-cyan-700' },
  pink: { main: '#db2777', bg: 'bg-gradient-to-br from-pink-500 to-rose-600', border: 'border-pink-500', text: 'text-pink-700' },
}

// ==================== MAIN COMPONENT ====================

export default function TentangKNMPPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-amber-50/30">
      {/* Hero */}
      <HeroSection />
      
      {/* Quick Stats */}
      <QuickStatsSection />
      
      {/* Executive Summary */}
      <ExecutiveSummarySection />
      
      {/* Company Profile */}
      <CompanyProfileSection />
      
      {/* Vision & Mission */}
      <VisionMissionSection />
      
      {/* History Timeline */}
      <HistorySection />
      
      {/* Dual Entity */}
      <DualEntitySection />
      
      {/* Organization Structure */}
      <OrganizationSection />
      
      {/* 6 KPA */}
      <KPASection />
      
      {/* 7 ICA Principles */}
      <PrinciplesSection />
      
      {/* 5 Pillars */}
      <FivePillarsSection />
      
      {/* Global Benchmark */}
      <BenchmarkSection />
      
      {/* Government Alignment */}
      <KDMPSection />
      
      {/* Partners */}
      <PartnersSection />
      
      {/* CTA */}
      <CTASection />
    </main>
  )
}

// ==================== SECTION COMPONENTS ====================

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#6B0000] to-[#1a1a2e]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#8B0000]/30 rounded-full blur-[120px]"
        />
      </div>

      <div ref={ref} className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center max-w-5xl mx-auto"
        >
>>>>>>> 60f4267 (update web)
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#D4AF37] text-[#1a1a2e] px-6 py-2 text-sm font-semibold mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Digital OS Desa Indonesia
            </Badge>
          </motion.div>

<<<<<<< HEAD
          <motion.h1 variants={fadeInUp} className="text-responsive-hero font-bold text-white leading-tight">
=======
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
>>>>>>> 60f4267 (update web)
            Tentang{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              KNMP
            </span>
          </motion.h1>

<<<<<<< HEAD
          <motion.p variants={fadeInUp} className="text-responsive-subtitle text-gray-300 max-w-3xl mx-auto">
            Platform koperasi digital pertama di Indonesia yang mengintegrasikan seluruh ekosistem desa
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8">
              Gabung Sekarang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
              Lihat Visi 2045
=======
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto"
          >
            Koperasi Nusantara Merah Putih
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/60 mb-8 max-w-3xl mx-auto"
          >
            Platform koperasi digital terbesar di Indonesia yang mengintegrasikan 45+ kelembagaan desa 
            ke dalam satu ekosistem super-terintegrasi — dari desa untuk Indonesia, dari Indonesia untuk dunia.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8960F] text-[#1a1a2e] px-8 font-semibold">
              <Link href="/membership" className="flex items-center">
                Gabung Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
              <Link href="/struktur-organisasi" className="flex items-center">
                Lihat Struktur Organisasi
              </Link>
>>>>>>> 60f4267 (update web)
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </section>
  )
}

<<<<<<< HEAD
// ─── SECTION: Origin Story ────────────────────────────────────────────────────
function OriginStorySection() {
=======
function QuickStatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

>>>>>>> 60f4267 (update web)
  return (
    <section ref={ref} className="py-8 bg-white border-b border-red-100">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {EXECUTIVE_STATS.map((stat, i) => (
            <motion.div key={i} variants={scaleIn}>
              <div className="text-center p-4">
                <stat.icon className="w-8 h-8 mx-auto mb-2" style={{ color: stat.color }} />
                <p className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}<span className="text-lg">{stat.suffix}</span>
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ExecutiveSummarySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-red-50/50">
      <div className="container mx-auto px-4">
        <motion.div
<<<<<<< HEAD
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="text-center mb-16"
=======
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
>>>>>>> 60f4267 (update web)
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
              <Info className="w-4 h-4 mr-2" />
              Executive Summary
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Membangun <span className="text-[#8B0000]">Peradaban</span> Ekonomi Desa
            </h2>
          </motion.div>

<<<<<<< HEAD
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#D4AF37] via-[#8B0000] to-[#1a1a2e] hidden md:block" />
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer} className="space-y-12"
          >
            {ORIGIN_TIMELINE.map((item, index) => (
              <motion.div
                key={item.year} variants={fadeInUp}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <Card className="card-hover-lift border-l-4 border-l-[#D4AF37]">
                    <CardHeader>
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Badge className="bg-[#8B0000] text-white">{item.year}</Badge>
                        <span className="text-[#D4AF37]">{getIcon(item.icon, 'w-5 h-5')}</span>
=======
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border border-red-100 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="w-10 h-10 text-[#D4AF37] flex-shrink-0" />
                  <p className="text-lg text-muted-foreground italic leading-relaxed">
                    "KNMP adalah jawaban atas satu pertanyaan yang terlalu lama terbengkalai: mengapa 45+ lembaga desa 
                    yang sudah ada — dari PKK, Posyandu, Karang Taruna, BUMDes, Gapoktan, P3A, Lumbung Pangan, 
                    hingga SID dan Siskeudes — bekerja sendiri-sendiri dalam silo tanpa pernah terhubung?"
                  </p>
                </div>

                <p className="text-foreground leading-relaxed mb-6">
                  KNMP hadir sebagai <strong className="text-[#8B0000]">Digital Operating System Desa</strong> — 
                  platform yang menghubungkan seluruh organ desa yang sudah ada ke dalam satu ekosistem digital. 
                  JE-P3 sebagai asosiasi menjaga narasi global, berbicara kepada investor, ICA, dan 195 negara. 
                  KNMP sebagai koperasi menjaga amanah desa — memastikan setiap rupiah SHU sampai ke petani, 
                  setiap RAT dijalankan demokratis, setiap data anggota dilindungi sesuai UU PDP 27/2022.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <h4 className="font-semibold text-[#8B0000] mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Target 2045
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Menjadi koperasi terbesar Indonesia dengan 10 juta anggota dan Rp 500 Triliun transaksi — 
                      melampaui Mondragon Corporation (€11.2B).
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-[#D4AF37] mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      ICA Membership
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Target bergabung dengan International Cooperative Alliance pada 2027 — 
                      akses ke 1.2 miliar anggota koperasi di 118 negara.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CompanyProfileSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-4">
              <Building className="w-4 h-4 mr-2" />
              Company Profile
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Profil <span className="text-[#8B0000]">Perusahaan</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left - Company Info */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-red-100">
                <CardHeader className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white rounded-t-lg">
                  <CardTitle className="text-2xl">{COMPANY_PROFILE.legalName}</CardTitle>
                  <CardDescription className="text-white/80">{COMPANY_PROFILE.englishName}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Singkatan</p>
                      <p className="font-semibold">{COMPANY_PROFILE.abbreviation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-000">Jenis</p>
                      <p className="font-semibold">{COMPANY_PROFILE.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tahun Berdiri</p>
                      <p className="font-semibold">{COMPANY_PROFILE.established}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kantor Pusat</p>
                      <p className="font-semibold">{COMPANY_PROFILE.headquarters}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Jangkauan Operasional</p>
                    <p className="text-sm">{COMPANY_PROFILE.coverage}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Dasar Hukum</p>
                    <ul className="space-y-1">
                      {COMPANY_PROFILE.legalBasis.map((basis, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{basis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right - Portals */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <Card className="border-2 border-[#8B0000]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#8B0000] rounded-xl flex items-center justify-center">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Portal KNMP</h3>
                      <p className="text-[#8B0000] font-medium">{COMPANY_PROFILE.portals.knmp}</p>
                      <p className="text-sm text-muted-foreground">Platform operasional koperasi</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#8B0000] text-[#8B0000]">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#D4AF37]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Portal JE-P3</h3>
                      <p className="text-[#D4AF37] font-medium">{COMPANY_PROFILE.portals.jep3}</p>
                      <p className="text-sm text-muted-foreground">Narasi global & investor relations</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37]">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center">
                      <UserCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Portal Pendaftaran</h3>
                      <p className="text-gray-700 font-medium">{COMPANY_PROFILE.portals.register}</p>
                      <p className="text-sm text-muted-foreground">Pendaftaran anggota baru</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function VisionMissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-red-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Vision */}
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-16">
            <Card className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <Badge className="bg-[#D4AF37] text-[#1a1a2e] mb-4">
                    <Star className="w-4 h-4 mr-2" />
                    Visi
                  </Badge>
                  <p className="text-xl md:text-2xl leading-relaxed">
                    {VISION_MISSION.vision}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Misi Kami</h3>
              <p className="text-muted-foreground">5 pilar misi untuk mewujudkan visi</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VISION_MISSION.missions.map((mission, i) => (
                <motion.div key={i} variants={scaleIn}>
                  <Card className="h-full border border-red-100 hover:border-[#8B0000]/50 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                        <mission.icon className="w-6 h-6 text-[#8B0000]" />
>>>>>>> 60f4267 (update web)
                      </div>
                      <h4 className="font-bold text-[#8B0000] mb-2">{mission.title}</h4>
                      <p className="text-sm text-muted-foreground">{mission.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={fadeInUp}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Nilai-Nilai Kami</h3>
              <p className="text-muted-foreground">Prinsip tambahan KNMP yang membedakan kami</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {VISION_MISSION.values.map((value, i) => (
                <motion.div key={i} variants={scaleIn}>
                  <Card className="h-full text-center border border-red-100 hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <value.icon className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                      <h4 className="font-semibold text-sm mb-1">{value.title}</h4>
                      <p className="text-xs text-muted-foreground">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function HistorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              Sejarah
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perjalanan <span className="text-[#8B0000]">Kami</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dari visi sederhana hingga menjadi platform koperasi digital terbesar di Indonesia
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#8B0000] to-[#D4AF37] hidden md:block" />

            <motion.div variants={staggerContainer} className="space-y-12">
              {HISTORY_TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  className={cn(
                    'flex items-center gap-8',
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}
                >
                  <Card className={cn(
                    'flex-1 border-2',
                    i === 3 ? 'border-[#8B0000] bg-gradient-to-r from-red-50 to-white' : 'border-red-100'
                  )}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={cn(
                          'px-3 py-1',
                          i === 3 ? 'bg-[#8B0000] text-white' : 'bg-[#D4AF37] text-[#1a1a2e]'
                        )}>
                          {item.year}
                        </Badge>
                        <item.icon className="w-5 h-5 text-[#8B0000]" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
<<<<<<< HEAD
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#8B0000] border-4 border-[#D4AF37] flex items-center justify-center glow-gold">
                  <span className="text-white font-bold text-sm">{item.year.slice(-2)}</span>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>


// ─── SECTION: Founders (NEW — 5 Columns) ─────────────────────────────────────
function FoundersSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#0a0a12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_100%,rgba(139,0,0,0.08),transparent)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-sm mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Para Pendiri
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Mereka yang{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Memulai Segalanya
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Visi besar lahir dari keberanian para pendiri yang percaya pada kekuatan koperasi digital Indonesia
          </p>
        </motion.div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {founders.map((founder, index) => {
            const IconComp = founder.icon;
            const isActive = founder.active;

            return (
              <motion.div
                key={founder.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={founderFadeUp}
              >
                <div
                  className={`relative w-full rounded-2xl border transition-all duration-500 group
                    ${isActive
                      ? 'bg-gradient-to-b from-[#1a1a2e] to-[#0d0d1a] border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_0_32px_rgba(212,175,55,0.2)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }
                    p-6 text-center`}
                >
                  {/* Corner accent */}
                  {isActive && (
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#D4AF37]/20 to-transparent" />
                    </div>
                  )}

                  {/* Badge chip */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[founder.badgeColor]}`}>
                      <IconComp className="w-3 h-3" />
                      {founder.badge}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="mt-4 mb-4 relative flex justify-center">
                    {isActive && (
                      <motion.div
                        variants={glowPulse}
                        initial="initial"
                        animate="animate"
                        className={`absolute inset-0 rounded-full ${founder.role === 'founder' ? 'border-2 border-[#D4AF37]' : 'border-2 border-[#8B0000]'}`}
                        style={{ width: 88, height: 88, margin: 'auto' }}
                      />
                    )}
                    <Avatar
                      className={`w-20 h-20 border-2 shadow-xl
                        ${founder.role === 'founder' ? 'border-[#D4AF37]' :
                          founder.role === 'ceo' ? 'border-[#8B0000]' : 'border-white/10'}
                        ${!isActive ? 'opacity-40' : ''}`}
                    >
                      <AvatarImage src={founder.photo} alt={founder.name} />
                      <AvatarFallback
                        className={`text-lg font-bold
                          ${founder.role === 'founder' ? 'bg-gradient-to-br from-[#D4AF37] to-[#a07a1a] text-[#1a1a2e]' :
                            founder.role === 'ceo' ? 'bg-gradient-to-br from-[#8B0000] to-[#5a0000] text-white' :
                            'bg-white/5 text-white/30'}`}
                      >
                        {isActive ? founder.initials : <Plus className="w-6 h-6" />}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Name */}
                  <h4 className={`font-bold text-sm leading-tight mb-1 min-h-[2.5rem] flex items-center justify-center ${isActive ? 'text-white' : 'text-white/30'}`}>
                    {isActive ? founder.shortName : 'Segera Diumumkan'}
                  </h4>

                  {/* Position */}
                  <p className={`text-xs mb-3 font-medium
                    ${founder.role === 'founder' ? 'text-[#D4AF37]' :
                      founder.role === 'ceo' ? 'text-red-400' : 'text-white/20'}`}>
                    {founder.position}
                  </p>

                  {/* Divider */}
                  <div className={`w-8 h-px mx-auto mb-3
                    ${founder.role === 'founder' ? 'bg-[#D4AF37]/60' :
                      founder.role === 'ceo' ? 'bg-[#8B0000]/60' : 'bg-white/10'}`}
                  />

                  {/* Bio */}
                  <p className={`text-xs leading-relaxed ${isActive ? 'text-gray-400' : 'text-white/20'}`}>
                    {founder.bio}
                  </p>

                  {/* Since badge */}
                  {isActive && founder.since && (
                    <div className="mt-4">
                      <span className={`inline-block text-xs px-3 py-1 rounded-full border
                        ${founder.role === 'founder'
                          ? 'border-[#D4AF37]/30 text-[#D4AF37]/80 bg-[#D4AF37]/5'
                          : 'border-[#8B0000]/30 text-red-400/80 bg-[#8B0000]/5'}`}>
                        {founder.since}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
          <div className="flex items-center gap-2 text-[#D4AF37]/50 text-xs font-medium tracking-widest uppercase">
            <Building2 className="w-3.5 h-3.5" />
            Koperasi Nusantara Merah Putih
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
=======

                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[#8B0000] border-4 border-[#D4AF37] items-center justify-center z-10 shadow-lg">
                    <span className="text-white font-bold text-sm">{item.year.slice(-2)}</span>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </motion.div>
          </div>
>>>>>>> 60f4267 (update web)
        </motion.div>
      </div>
    </section>
  )
}

<<<<<<< HEAD
// ─── SECTION: Legal & Compliance ──────────────────────────────────────────────
function LegalComplianceSection() {
=======
function DualEntitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

>>>>>>> 60f4267 (update web)
  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-amber-50/50">
      <div className="container mx-auto px-4">
        <motion.div
<<<<<<< HEAD
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="text-center mb-16"
=======
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
>>>>>>> 60f4267 (update web)
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4">
              <Layers className="w-4 h-4 mr-2" />
              Dual-Entity Architecture
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dua Entitas, <span className="text-[#8B0000]">Satu Peradaban</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Model unik yang memisahkan strategi dan operasional untuk efektivitas maksimal
            </p>
          </motion.div>

<<<<<<< HEAD
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2">Akta Koperasi</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.aktaKoperasi}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Landmark className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold mb-2">NPWP</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.npwp}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1a1a2e]/10 flex items-center justify-center">
                  <Building className="w-7 h-7 text-[#1a1a2e]" />
                </div>
                <h3 className="font-semibold mb-2">Badan Hukum</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.legalEntity}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                  <Award className="w-7 h-7 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2">Terdaftar di</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.registeredAt}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* 7 Principles */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <Card className="border-[#D4AF37]/20">
            <CardHeader className="text-center border-b">
              <CardTitle className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-[#D4AF37]" />
                7 Prinsip Koperasi ICA + UU 25/1992
              </CardTitle>
              <CardDescription>Prinsip internasional koperasi yang menjadi landasan operasional kami</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {COOPERATIVE_PRINCIPLES.map((principle) => (
                  <motion.div
                    key={principle.number} variants={fadeInUp}
                    className="group p-4 rounded-lg border border-border hover:border-[#D4AF37] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B0000] transition-colors">
                        <span className="text-[#8B0000] group-hover:text-white font-bold text-sm">{principle.number}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{principle.title}</h4>
                        <p className="text-xs text-muted-foreground">{principle.description}</p>
                      </div>
=======
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* JE-P3 */}
            <motion.div variants={scaleIn}>
              <Card className="h-full border-2 border-[#D4AF37] hover:shadow-xl transition-all">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6" />
>>>>>>> 60f4267 (update web)
                    </div>
                    <div>
                      <CardTitle className="text-xl">JE-P3</CardTitle>
                      <CardDescription className="text-white/80">Jaringan Ekosistem Pengusaha Persatuan Pembangunan</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Badge className="bg-amber-100 text-amber-800 mb-4">Asosiasi / Perkumpulan</Badge>
                  <p className="text-muted-foreground mb-4">
                    Otak strategis ekosistem — pemilik narasi, brand, IP, dan investor relations. 
                    Berbicara kepada ICA, World Bank, dan 195 negara.
                  </p>
                  <div className="space-y-2">
                    {['Narasi & Branding Global', 'Investor Relations', 'IP Licensing', 'International Expansion'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* KNMP */}
            <motion.div variants={scaleIn}>
              <Card className="h-full border-2 border-[#8B0000] hover:shadow-xl transition-all">
                <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">KNMP</CardTitle>
                      <CardDescription className="text-white/80">Koperasi Nusantara Merah Putih</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Badge className="bg-red-100 text-[#8B0000] mb-4">Koperasi Multipihak</Badge>
                  <p className="text-muted-foreground mb-4">
                    Jantung operasional ekosistem — pemilik aset produktif, pengelola anggota, 
                    pelaksana SHU, RAT, dan unit usaha.
                  </p>
                  <div className="space-y-2">
                    {['Aset & Unit Usaha', 'Anggota & SHU', 'RAT & Voting', 'Marketplace & Logistik'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#8B0000]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* SAF */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-[#1a1a2e] to-[#8B0000]/20 border-[#D4AF37]/30 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-[#D4AF37] text-[#1a1a2e] mb-2">Framework</Badge>
                  <h3 className="text-2xl font-bold text-white">Strategic Alliance Framework (SAF)</h3>
                  <p className="text-gray-300">Kerangka kerja sama yang mengatur hubungan JE-P3 dan KNMP</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Network className="w-5 h-5 text-[#D4AF37]" />
                      Joint Strategic Committee (JSC)
                    </h4>
                    <p className="text-gray-300 text-sm mb-2">
                      Komite bersama dengan Founder sebagai Ketua Permanen — memiliki hak rekomendasi kuat 
                      dan hak veto terbatas atas keputusan strategis.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#D4AF37]" />
                      16 Red Lines
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Batas yang tidak boleh dilanggar oleh kedua entitas — termasuk larangan 
                      konversi ke PT, jual aset tanpa persetujuan RAT, dan intervensi politik.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function OrganizationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Governance Structure
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Struktur <span className="text-[#8B0000]">Organisasi</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Struktur tata kelola lengkap sesuai AD/ART Super Final 2026
            </p>
          </motion.div>

          {/* Org Chart Visual */}
          <motion.div variants={fadeInUp} className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              {/* RAT */}
              <div className="w-full max-w-md bg-gradient-to-r from-red-900 to-red-800 rounded-xl p-4 text-white text-center shadow-lg">
                <Vote className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold text-lg">RAT</h3>
                <p className="text-xs text-white/70">Forum Tertinggi</p>
              </div>

              <div className="w-0.5 h-8 bg-[#D4AF37]" />

              {/* Pengurus & Pengawas */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <div className="flex-1 min-w-[200px] max-w-[300px] bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-4 text-white text-center shadow-lg">
                  <Building2 className="w-6 h-6 mx-auto mb-2" />
                  <h3 className="font-bold">Pengurus</h3>
                  <p className="text-xs text-white/70">11 Jabatan</p>
                </div>
                <div className="flex-1 min-w-[200px] max-w-[300px] bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-4 text-white text-center shadow-lg">
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <h3 className="font-bold">Pengawas</h3>
                  <p className="text-xs text-white/70">5 Jabatan</p>
                </div>
              </div>

              <div className="w-0.5 h-8 bg-violet-500" />

              {/* Advisory Bodies */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Dewan Penasihat', icon: Award, color: 'from-violet-500 to-purple-600' },
                  { name: 'Dewan Etik', icon: Scale, color: 'from-orange-500 to-amber-600' },
                  { name: 'Ombudsman', icon: Shield, color: 'from-cyan-500 to-teal-600' },
                ].map((body, i) => (
                  <div key={i} className={cn('rounded-lg p-3 text-white text-center shadow-lg bg-gradient-to-r', body.color)}>
                    <body.icon className="w-5 h-5 mx-auto mb-1" />
                    <h4 className="font-medium text-sm">{body.name}</h4>
                  </div>
                ))}
              </div>

<<<<<<< HEAD
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />Terdaftar Resmi
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
            <Shield className="w-4 h-4 mr-2" />Berbadan Hukum
          </Badge>
          <Badge className="bg-amber-100 text-amber-800 px-4 py-2 text-sm">
            <Award className="w-4 h-4 mr-2" />ICA Compliant
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION: Dual Entity ─────────────────────────────────────────────────────
function DualEntitySection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Dual Entity <span className="text-gradient-gold">Architecture</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Model unik yang memisahkan strategi dan operasional untuk efektivitas maksimal
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card className="h-full border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors">
              <CardHeader className="border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37] flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] mb-1">{DUAL_ENTITY.jep3.type}</Badge>
                    <CardTitle className="text-2xl">{DUAL_ENTITY.jep3.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-4 text-base">{DUAL_ENTITY.jep3.fullName}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">{DUAL_ENTITY.jep3.role}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{DUAL_ENTITY.jep3.description}</p>
                <h4 className="font-semibold mb-3">Tanggung Jawab:</h4>
                <ul className="space-y-2">
                  {DUAL_ENTITY.jep3.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <Card className="h-full border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-colors">
              <CardHeader className="border-b border-[#8B0000]/20">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#8B0000] flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-[#8B0000]/20 text-[#8B0000] mb-1">{DUAL_ENTITY.knmp.type}</Badge>
                    <CardTitle className="text-2xl">{DUAL_ENTITY.knmp.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-4 text-base">{DUAL_ENTITY.knmp.fullName}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="border-[#8B0000] text-[#8B0000]">{DUAL_ENTITY.knmp.role}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{DUAL_ENTITY.knmp.description}</p>
                <h4 className="font-semibold mb-3">Tanggung Jawab:</h4>
                <ul className="space-y-2">
                  {DUAL_ENTITY.knmp.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
          <Card className="bg-gradient-to-r from-[#1a1a2e] to-[#8B0000]/20 border-[#D4AF37]/30">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge className="bg-[#D4AF37] text-[#1a1a2e] mb-2">Framework</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">{DUAL_ENTITY.saf.name}</h3>
                <p className="text-gray-300">{DUAL_ENTITY.saf.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-white mb-4">Prinsip Utama:</h4>
                  <ul className="space-y-2">
                    {DUAL_ENTITY.saf.principles.map((principle, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <ChevronRight className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{DUAL_ENTITY.jsc.name}</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{DUAL_ENTITY.jsc.description}</p>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="border-white/30 text-white">{DUAL_ENTITY.jsc.members} Anggota</Badge>
                    <Badge variant="outline" className="border-white/30 text-white">Rapat {DUAL_ENTITY.jsc.meetingFrequency}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
=======
              <div className="w-0.5 h-8 bg-pink-500" />

              {/* JSC */}
              <div className="w-full max-w-sm bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-4 text-white text-center shadow-lg">
                <Network className="w-6 h-6 mx-auto mb-2" />
                <h3 className="font-bold">JSC (Joint Strategic Committee)</h3>
                <p className="text-xs text-white/70">KNMP × JE-P3</p>
              </div>
            </div>
          </motion.div>

          {/* Detail Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {Object.entries(ORG_STRUCTURE).map(([key, org]) => (
              <motion.div key={key} variants={scaleIn}>
                <Card className="h-full border-l-4" style={{ borderLeftColor: org.color }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${org.color}20` }}>
                        <org.icon className="w-5 h-5" style={{ color: org.color }} />
                      </div>
                      <div>
                        <h4 className="font-bold" style={{ color: org.color }}>{org.name}</h4>
                        <p className="text-xs text-muted-foreground">{org.fullName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{org.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" style={{ borderColor: org.color, color: org.color }}>
                        {org.positions} Jabatan
                      </Badge>
                      {org.term && <span className="text-muted-foreground">{org.term}</span>}
                    </div>
                    {org.authority && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {org.authority.length} Wewenang Utama
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="text-center mt-8">
            <Button asChild variant="outline" className="border-[#8B0000] text-[#8B0000]">
              <Link href="/struktur-organisasi">
                Lihat Struktur Lengkap dengan Detail Jabatan
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
>>>>>>> 60f4267 (update web)
        </motion.div>
      </div>
    </section>
  )
}

<<<<<<< HEAD
// ─── SECTION: Vision 2045 ─────────────────────────────────────────────────────
function Vision2045Section() {
=======
function KPASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

>>>>>>> 60f4267 (update web)
  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-red-50/50">
      <div className="container mx-auto px-4">
        <motion.div
<<<<<<< HEAD
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="text-center mb-16"
=======
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 border-green-200 mb-4">
              <Users className="w-4 h-4 mr-2" />
              6 Kelompok Pihak Anggota
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              6 <span className="text-[#8B0000]">KPA</span> Multipihak
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pengelompokan anggota berdasarkan peran ekonomi sesuai Permenkop 8/2021
            </p>
          </motion.div>

          {/* Voting Power Bar */}
          <motion.div variants={fadeInUp} className="mb-12 max-w-4xl mx-auto">
            <h4 className="text-center font-semibold mb-4">Distribusi Proporsi Suara dalam RAT</h4>
            <div className="h-12 rounded-xl overflow-hidden flex shadow-lg">
              {KPA_DATA.map((kpa) => (
                <motion.div
                  key={kpa.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${kpa.proportion}%` }}
                  transition={{ duration: 0.8, delay: kpa.id * 0.1 }}
                  className="h-full flex items-center justify-center text-white font-medium text-sm"
                  style={{ backgroundColor: kpa.color }}
                >
                  {kpa.proportion}%
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* KPA Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {KPA_DATA.map((kpa) => (
              <motion.div key={kpa.id} variants={scaleIn}>
                <Card className="h-full border-2 hover:shadow-xl transition-all" style={{ borderColor: kpa.color }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{kpa.icon}</span>
                      <Badge className="text-white" style={{ backgroundColor: kpa.color }}>
                        {kpa.proportion}% Suara
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{kpa.name}</CardTitle>
                    <CardDescription>{kpa.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Contoh Anggota:</p>
                    <div className="flex flex-wrap gap-1">
                      {kpa.examples.map((ex, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{ex}</Badge>
                      ))}
                    </div>
                    {kpa.note && (
                      <p className="text-xs text-amber-600 mt-3 italic">⚠️ {kpa.note}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PrinciplesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-4">
              <Award className="w-4 h-4 mr-2" />
              International Cooperative Alliance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              7 Prinsip <span className="text-[#8B0000]">Koperasi</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prinsip ICA + UU 25/1992 yang menjadi landasan operasional KNMP
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {ICA_PRINCIPLES.map((principle) => (
              <motion.div key={principle.number} variants={scaleIn}>
                <Card className="h-full border border-red-100 hover:border-[#8B0000]/50 hover:shadow-lg transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${principle.color}15` }}
                      >
                        <principle.icon className="w-6 h-6" style={{ color: principle.color }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{principle.title}</h4>
                        <p className="text-sm text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FivePillarsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-amber-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              Unit Usaha Strategis
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              5 Pilar <span className="text-[#8B0000]">Unit Usaha</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Total target revenue Rp 750 Miliar per tahun — dari desa untuk Indonesia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FIVE_PILLARS.map((pillar) => (
              <motion.div key={pillar.id} variants={scaleIn}>
                <Card className="h-full border-2 hover:shadow-xl transition-all" style={{ borderColor: pillar.color }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${pillar.color}20` }}>
                        <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pillar.name}</CardTitle>
                        <p className="text-sm font-medium" style={{ color: pillar.color }}>{pillar.revenue}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {pillar.subs.slice(0, 3).map((sub, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{sub}</Badge>
                      ))}
                      {pillar.subs.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{pillar.subs.length - 3} lainnya</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BenchmarkSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
              <Globe2 className="w-4 h-4 mr-2" />
              Global Benchmark
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Target <span className="text-[#8B0000]">Mondragon</span>
            </h2>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="bg-gradient-to-r from-[#1a1a2e] to-[#8B0000]/20 border-[#D4AF37]/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B0000] flex items-center justify-center">
                    <Globe className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">{BENCHMARK.name}</h3>
                    <p className="text-gray-300 mb-4">{BENCHMARK.description}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Badge variant="outline" className="border-white/30 text-white">{BENCHMARK.country}</Badge>
                      <Badge variant="outline" className="border-white/30 text-white">Sejak {BENCHMARK.founded}</Badge>
                      <Badge variant="outline" className="border-white/30 text-white">{BENCHMARK.members} Anggota</Badge>
                      <Badge variant="outline" className="border-white/30 text-white">Revenue {BENCHMARK.revenue}</Badge>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-white/20" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">KNMP vs Mondragon 2045</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        125x lebih banyak anggota
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        2.5x lebih besar revenue
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        Digital-native & blockchain-verified
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Keunggulan KNMP</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#D4AF37]" />
                        45+ integrasi kelembagaan desa
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#D4AF37]" />
                        83.763 desa coverage
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#D4AF37]" />
                        Government-backed via KDMP
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function KDMPSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-red-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
>>>>>>> 60f4267 (update web)
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-[#8B0000]/10 to-[#D4AF37]/10 border-2 border-[#8B0000]/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B0000] to-[#D4AF37] flex items-center justify-center">
                    <Flag className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <Badge className="bg-[#8B0000] text-white mb-2">Government Alignment</Badge>
                    <h3 className="text-2xl font-bold mb-2">{KDMP_ALIGNMENT.title}</h3>
                    <p className="text-muted-foreground mb-4">{KDMP_ALIGNMENT.subtitle}</p>
                    <p className="text-muted-foreground mb-4">{KDMP_ALIGNMENT.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {KDMP_ALIGNMENT.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
<<<<<<< HEAD
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Menuju <span className="text-gradient-gold">Indonesia Emas</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {VISION_2045.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {VISION_2045.targets.map((target) => (
            <motion.div key={target.label} variants={scaleIn}>
              <Card className="text-center card-hover-lift h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                    {getIcon(target.icon, 'w-6 h-6 text-[#8B0000]')}
                  </div>
                  <div className="text-3xl font-bold text-[#8B0000] mb-1">
                    {target.value.toLocaleString()}{target.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{target.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Card className="mb-12">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                Roadmap 2045
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted transform -translate-y-1/2 hidden lg:block" />
                <div className="absolute top-1/2 left-0 w-1/5 h-1 bg-gradient-to-r from-[#8B0000] to-[#D4AF37] transform -translate-y-1/2 hidden lg:block" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {VISION_2045.milestones.map((milestone, idx) => (
                    <div key={milestone.year} className="relative text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center z-10 relative ${
                        idx < 1 ? 'bg-[#8B0000] text-white' : idx < 2 ? 'bg-[#D4AF37] text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {idx < 1 ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold text-sm">{milestone.year}</span>}
                      </div>
                      <h4 className="font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-xs text-muted-foreground">{milestone.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
          <Card className="bg-gradient-to-r from-[#1a1a2e] to-[#8B0000]/20 border-[#D4AF37]/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B0000] flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] mb-2">Benchmark Global</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">{VISION_2045.benchmark.name}</h3>
                  <p className="text-gray-300 mb-4">{VISION_2045.benchmark.description}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Badge variant="outline" className="border-white/30 text-white">{VISION_2045.benchmark.country}</Badge>
                    <Badge variant="outline" className="border-white/30 text-white">Sejak {VISION_2045.benchmark.founded}</Badge>
                    <Badge variant="outline" className="border-white/30 text-white">{VISION_2045.benchmark.members.toLocaleString()} Anggota</Badge>
                    <Badge variant="outline" className="border-white/30 text-white">Revenue {VISION_2045.benchmark.revenue}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
=======
>>>>>>> 60f4267 (update web)
        </motion.div>
      </div>
    </section>
  )
}

<<<<<<< HEAD
// ─── SECTION: Team ────────────────────────────────────────────────────────────
function TeamSection() {
=======
function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

>>>>>>> 60f4267 (update web)
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
<<<<<<< HEAD
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="text-center mb-16"
=======
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
>>>>>>> 60f4267 (update web)
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 mb-4">
              <Handshake className="w-4 h-4 mr-2" />
              Partners & Collaborators
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Jaringan <span className="text-[#8B0000]">Kemitraan</span>
            </h2>
          </motion.div>

<<<<<<< HEAD
        {/* Pengurus */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8B0000]" />Pengurus
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_STRUCTURE.pengurus.map((member) => (
              <motion.div key={member.id} variants={scaleIn}>
                <Card className="card-hover-lift h-full">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#D4AF37]">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#8B0000] text-white text-lg">
                        {member.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold mb-1">{member.name}</h4>
                    <p className="text-sm text-[#D4AF37] mb-2">{member.position}</p>
                    <p className="text-xs text-muted-foreground mb-2">{member.bio}</p>
                    <Badge variant="outline" className="text-xs">{member.termStart} - {member.termEnd}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pengawas */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8B0000]" />Pengawas
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {TEAM_STRUCTURE.pengawas.map((member) => (
              <motion.div key={member.id} variants={scaleIn}>
                <Card className="card-hover-lift h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-[#8B0000]">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#8B0000] text-white">
                        {member.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-[#D4AF37]">{member.position}</p>
                      <p className="text-xs text-muted-foreground">{member.bio}</p>
=======
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Pemerintah', partners: PARTNERS.government, icon: Landmark, color: '#8B0000' },
              { title: 'Logistik', partners: PARTNERS.logistics, icon: Truck, color: '#D4AF37' },
              { title: 'Keuangan', partners: PARTNERS.financial, icon: Wallet, color: '#059669' },
              { title: 'Akademik', partners: PARTNERS.academic, icon: GraduationCap, color: '#0284c7' },
              { title: 'Internasional', partners: PARTNERS.international, icon: Globe, color: '#7c3aed' },
            ].map((category, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="h-full border border-red-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <category.icon className="w-5 h-5" style={{ color: category.color }} />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.partners.map((partner, j) => (
                        <Badge key={j} variant="outline" className="text-xs">{partner}</Badge>
                      ))}
>>>>>>> 60f4267 (update web)
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
<<<<<<< HEAD

        {/* Dewan Penasihat */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#D4AF37]" />Dewan Penasihat
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_STRUCTURE.dewanPenasihat.map((member) => (
              <motion.div key={member.id} variants={scaleIn}>
                <Card className="card-hover-lift h-full border-[#D4AF37]/20">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#D4AF37]">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#D4AF37] text-white text-lg">
                        {member.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold mb-1">{member.name}</h4>
                    <p className="text-sm text-[#8B0000] mb-2">{member.position}</p>
                    <p className="text-xs text-muted-foreground mb-2">{member.bio}</p>
                    <Badge variant="outline" className="text-xs border-[#D4AF37] text-[#D4AF37]">
                      {member.termStart} - {member.termEnd}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-center mt-12"
        >
          <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
            <Link href="/rat" className="flex items-center gap-2">
              Lihat Struktur Governance Lengkap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
=======
>>>>>>> 60f4267 (update web)
      </div>
    </section>
  )
}

<<<<<<< HEAD
// ─── SECTION: Partner ─────────────────────────────────────────────────────────
function PartnerSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer} className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Partner & <span className="text-gradient-gold">Kemitraan</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Berkolaborasi dengan berbagai institusi untuk membangun ekosistem desa digital
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12"
        >
          {PARTNER_LOGOS.map((partner) => (
            <motion.div key={partner.id} variants={scaleIn}>
              <Card className="card-hover-lift h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-center">{partner.name}</p>
                  <Badge variant="outline" className="mt-2 text-xs">{partner.category}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
          <Card className="bg-gradient-to-r from-[#8B0000]/10 to-[#D4AF37]/10 border-[#D4AF37]/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B0000] to-[#D4AF37] flex items-center justify-center">
                  <Flag className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge className="bg-[#8B0000] text-white mb-2">Government Alignment</Badge>
                  <h3 className="text-xl font-bold mb-2">KDMP Network</h3>
                  <p className="text-muted-foreground mb-4">{KDMP_ALIGNMENT.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {KDMP_ALIGNMENT.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION: CTA ─────────────────────────────────────────────────────────────
=======
>>>>>>> 60f4267 (update web)
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
<<<<<<< HEAD
    <section className="py-20 bg-gradient-to-r from-[#1a1a2e] via-[#8B0000] to-[#1a1a2e] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
=======
    <section ref={ref} className="py-20 bg-gradient-to-r from-[#8B0000] via-[#6B0000] to-[#8B0000] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
>>>>>>> 60f4267 (update web)
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
            Jadilah Bagian dari{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              Peradaban
            </span>
          </motion.h2>

<<<<<<< HEAD
          <motion.p variants={fadeInUp} className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan 125.000+ anggota KNMP dan jadilah bagian dari transformasi ekonomi digital desa Indonesia
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1a1a2e] px-8 py-6 text-lg">
              Gabung Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Pelajari Lebih Lanjut
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">{HERO_STATS.members.toLocaleString()}+</div>
              <div className="text-sm text-gray-400">Anggota Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">{HERO_STATS.villages.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Desa Terintegrasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">{HERO_STATS.provinces}</div>
              <div className="text-sm text-gray-400">Provinsi</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function TentangPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OriginStorySection />
      {/* ✨ NEW: 5-Column Founders Section — setelah Origin Story */}
      <FoundersSection />
      <LegalComplianceSection />
      <DualEntitySection />
      <Vision2045Section />
      <TeamSection />
      <PartnerSection />
      <CTASection />
    </div>
  );
=======
          <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-8">
            Bergabunglah dengan ekosistem koperasi digital terbesar di Indonesia. 
            Dari desa untuk Indonesia, dari Indonesia untuk dunia.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8960F] text-[#1a1a2e] px-8 font-semibold">
              <Link href="/membership" className="flex items-center">
                Daftar Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
>>>>>>> 60f4267 (update web)
}
