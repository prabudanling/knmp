"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sprout,
  Building2,
  Shield,
  ShoppingBag,
  Crown,
  CheckCircle2,
  ArrowRight,
  Vote,
  PieChart as PieChartIcon,
  Scale,
  AlertTriangle,
  UserPlus,
  Info,
  Banknote,
  Landmark,
  TrendingUp,
  Lock,
  FileText,
  Fingerprint,
  ShieldCheck,
  Clock,
  AlertOctagon,
  ChevronRight,
  Zap,
  MapPin,
  Users,
  Handshake,
  Wallet,
  CreditCard,
  BadgeCheck,
  CircleDollarSign,
  BanknoteArrowDown,
  ArrowDownToLine,
  Gift,
  Star,
  Eye,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ============================================================
   DATA — Pentagon Kedaulatan (ART Super Final v7)
   ============================================================ */

interface KPAData {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
  lightBg: string;
  borderColor: string;
  textColor: string;
  proporsi: number;
  deskripsi: string;
  anggotaList: string[];
  manfaat: string[];
  icon: LucideIcon;
  requirements: string[];
  simpananPokok: string;
  simpananPokokDetail: string;
  simpananWajib: string;
  simpananWajibDetail: string;
  metodePotong: string;
  metodePotongDetail: string;
  specialNotes?: string[];
  catatan?: string;
  benefits: { icon: LucideIcon; title: string; desc: string }[];
}

const kpaData: KPAData[] = [
  {
    id: 1,
    name: "Produsen & Pekerja",
    subtitle: "Pencipta Nilai",
    color: "#22c55e",
    bgColor: "bg-green-500",
    lightBg: "bg-green-500/10",
    borderColor: "border-green-500",
    textColor: "text-green-500",
    proporsi: 20,
    deskripsi:
      "Kelompok pencipta nilai ekonomi riil — para petani, nelayan, dan pekerja produksi yang menjadi tulang punggung ekonomi Nusantara.",
    anggotaList: [
      "Petani murni",
      "Nelayan",
      "Peternak",
      "Pekebun",
      "Pengrajin",
      "Buruh tani",
      "Agen logistik (Kordes/Korcam/Korda/Korwil)",
      "Kurir ekosistem",
      "Kader digital",
    ],
    manfaat: [
      "Akses pasar langsung via Marketplace KKMNMP",
      "Modal usaha via Kampung Modal",
      "Teknologi pertanian & logistik",
      "Pelatihan gratis via JE-P3 Academy",
      "Dompet digital JP3 Pay dengan saldo awal",
    ],
    icon: Sprout,
    requirements: ["KTP valid", "Bukti aktivitas produksi", "Rekomendasi kelompok tani"],
    simpananPokok: "Rp 100.000",
    simpananPokokDetail:
      "Dikonversi sebagian menjadi saldo awal dompet digital JP3 Pay & biaya verifikasi",
    simpananWajib: "Rp 50.000/bulan",
    simpananWajibDetail:
      "Dieksekusi tanpa debt-collector; dipotong otomatis/volumetrik dari transaksi penjualan panen atau komisi logistik. Jika tidak ada transaksi, diakumulasikan sebagai piutang internal tanpa denda",
    metodePotong: "Auto-deduct / Volumetrik",
    metodePotongDetail:
      "Dipotong otomatis dari penjualan panen atau komisi logistik melalui platform kopnusa.id & JP3 Pay",
    benefits: [
      { icon: Zap, title: "Akses Pasar", desc: "Langsung ke Marketplace KKMNMP tanpa perantara" },
      { icon: CircleDollarSign, title: "Modal Usaha", desc: "Pembiayaan via Kampung Modal dengan suku bunga rendah" },
      { icon: Star, title: "Pelatihan", desc: "JE-P3 Academy gratis untuk peningkatan kapasitas" },
      { icon: Wallet, title: "JP3 Pay", desc: "Saldo awal dompet digital dari simpanan pokok" },
    ],
  },
  {
    id: 2,
    name: "Konsumen Umum",
    subtitle: "Mesin Permintaan",
    color: "#3b82f6",
    bgColor: "bg-blue-500",
    lightBg: "bg-blue-500/10",
    borderColor: "border-blue-500",
    textColor: "text-blue-500",
    proporsi: 20,
    deskripsi:
      "Warga masyarakat umum yang menggunakan layanan ekosistem KKMNMP — dari pembeli harian hingga wisatawan.",
    anggotaList: [
      "Warga masyarakat umum pengguna JP3 Pay",
      "Pembeli retail marketplace",
      "Wisatawan",
      "Jemaah perjalanan",
    ],
    manfaat: [
      "Harga khusus anggota",
      "Rewards & cashback Marketplace",
      "Bagi SHU tahunan",
      "Priority access event & promosi",
    ],
    icon: ShoppingBag,
    requirements: ["KTP valid", "Minat produk lokal & ekosistem KKMNMP"],
    simpananPokok: "Rp 100.000",
    simpananPokokDetail: "Simpanan pokok standar anggota Koperasi",
    simpananWajib: "Rp 50.000/bulan",
    simpananWajibDetail:
      "Dipotong otomatis dari sisa kembalian belanja, akumulasi cashback di Marketplace KKMNMP, atau pemotongan otomatis dari saldo JP3 Pay",
    metodePotong: "Cashback & Kembalian Belanja",
    metodePotongDetail:
      "Dipotong dari sisa kembalian belanja, akumulasi cashback Marketplace, atau saldo JP3 Pay secara otomatis",
    benefits: [
      { icon: Gift, title: "Cashback", desc: "Akumulasi cashback setiap transaksi Marketplace" },
      { icon: Star, title: "Harga Khusus", desc: "Diskon eksklusif anggota Koperasi" },
      { icon: BanknoteArrowDown, title: "SHU Tahunan", desc: "Mendapat bagian Sisa Hasil Usaha" },
      { icon: Zap, title: "Priority Access", desc: "Akses prioritas event & promosi terbatas" },
    ],
  },
  {
    id: 3,
    name: "Abdi Negara & Pejabat Publik",
    subtitle: "Jangkar Stabilitas",
    color: "#8b5cf6",
    bgColor: "bg-violet-500",
    lightBg: "bg-violet-500/10",
    borderColor: "border-violet-500",
    textColor: "text-violet-500",
    proporsi: 20,
    deskripsi:
      "Aparatur negara dan pejabat publik yang menjadi jangkar stabilitas institusional ekosistem KKMNMP.",
    anggotaList: [
      "PNS",
      "ASN",
      "P3K",
      "Pensiunan",
      "TNI/POLRI aktif & purnawirawan",
      "Pejabat Negara",
      "DPR/DPRD/DPD",
      "Kepala Daerah",
    ],
    manfaat: [
      "Jangkar stabilitas ekosistem",
      "Hak suara politik terlindungi",
      "Akses VIP dashboard",
      "Auto-debet dari rekening gaji",
    ],
    icon: Shield,
    requirements: ["Identitas ASN/TNI/POLRI", "Surat keterangan instansi"],
    simpananPokok: "Rp 250.000",
    simpananPokokDetail: "Simpanan pokok premium untuk anggota institusi pemerintah",
    simpananWajib: "Rp 100.000/bulan",
    simpananWajibDetail:
      "Disetor melalui mekanisme kerjasama auto-debet dari rekening gaji instansi, atau via instruksi transfer periodik massal",
    metodePotong: "Auto-debet Gaji",
    metodePotongDetail:
      "Kerjasama auto-debet langsung dari rekening gaji instansi atau instruksi transfer periodik massal",
    catatan: "Klausul Netralitas berlaku",
    specialNotes: [
      "Klausul Netralitas: Dilarang membawa atribut politik ke dalam forum Koperasi",
      "Dilarang menggunakan data Koperasi untuk kepentingan kampanye",
    ],
    benefits: [
      { icon: Landmark, title: "Stabilitas", desc: "Jangkar institusional ekosistem Koperasi" },
      { icon: ShieldCheck, title: "Netralitas", desc: "Ruang politik bebas & netral dalam ekosistem" },
      { icon: CreditCard, title: "Auto-debet", desc: "Pembayaran otomatis dari rekening gaji" },
      { icon: Star, title: "Akses VIP", desc: "Dashboard & layanan prioritas" },
    ],
  },
  {
    id: 4,
    name: "Entitas Bisnis & Pelaku Usaha",
    subtitle: "Mesin B2B",
    color: "#f59e0b",
    bgColor: "bg-amber-500",
    lightBg: "bg-amber-500/10",
    borderColor: "border-amber-500",
    textColor: "text-amber-500",
    proporsi: 20,
    deskripsi:
      "Pelaku usaha dan entitas bisnis yang menjadi mesin B2B — dari bandar lokal hingga korporasi besar.",
    anggotaList: [
      "Bandar lokal",
      "Pengepul hasil bumi",
      "Pedagang besar",
      "PT/CV/Firma",
      "Yayasan",
      "BUMDes",
      "Koperasi Primer",
    ],
    manfaat: [
      "Supply chain terintegrasi",
      "Financing B2B",
      "VIP Dashboard B2B Ekosistem",
      "Network expansion nasional",
    ],
    icon: Building2,
    requirements: ["SIUP/NIB aktif", "Badan hukum valid", "AD/ART (koperasi)"],
    simpananPokok: "Rp 5.000.000",
    simpananPokokDetail: "Disetor atas nama entitas kelembagaan/perusahaan",
    simpananWajib: "Rp 1.000.000/bulan",
    simpananWajibDetail:
      "Biaya langganan operasional & akses VIP Dashboard B2B Ekosistem KKMNMP",
    metodePotong: "Langganan Operasional",
    metodePotongDetail:
      "Dipotong sebagai biaya langganan bulanan untuk akses VIP Dashboard B2B Ekosistem KKMNMP",
    benefits: [
      { icon: Handshake, title: "B2B Network", desc: "Jaringan bisnis terintegrasi nasional" },
      { icon: TrendingUp, title: "Financing", desc: "Pembiayaan usaha dengan suku bunga kompetitif" },
      { icon: Star, title: "Dashboard VIP", desc: "Akses eksklusif dashboard B2B Ekosistem" },
      { icon: Zap, title: "Supply Chain", desc: "Integrasi rantai pasok dari hulu ke hilir" },
    ],
  },
  {
    id: 5,
    name: "Pemodal & Investor",
    subtitle: "Likuiditas Berdaulat",
    color: "#008F3D",
    bgColor: "bg-emerald-700",
    lightBg: "bg-emerald-700/10",
    borderColor: "border-emerald-700",
    textColor: "text-emerald-700",
    proporsi: 20,
    deskripsi:
      "Investor dan institusi keuangan yang menyediakan likuiditas berdaulat — dari angel investor hingga bank pemerintah.",
    anggotaList: [
      "Angel Investor",
      "Venture Capital",
      "Bank Pemerintah (Himbara)",
      "Bank Swasta",
      "Institusi internasional",
    ],
    manfaat: [
      "ROI kompetitif",
      "Impact investment berdaulat",
      "Governance participation",
      "Reporting transparan",
    ],
    icon: Crown,
    requirements: ["KYC/AML verification", "Lembar saham/kontrak investasi", "Memahami risiko investasi"],
    simpananPokok: "Individu: Rp 50.000.000 | Institusi: Rp 250.000.000",
    simpananPokokDetail:
      "Individu (Angel Investor): Minimal Rp 50.000.000 — Institusi/Korporasi (Venture/Bank): Minimal Rp 250.000.000",
    simpananWajib: "Rp 1.000.000/bulan",
    simpananWajibDetail:
      "Dividen Deduction — diakumulasikan Rp 12.000.000/tahun, dipotong otomatis dari SHU Dividen di akhir tahun buku",
    metodePotong: "Dividen Deduction",
    metodePotongDetail:
      "Diakumulasikan Rp 12.000.000/tahun, dipotong otomatis dari SHU Dividen di akhir tahun buku",
    specialNotes: [
      "Doktrin Anti-Oligarki: One Member One Vote — hak suara berdasarkan jumlah entitas, BUKAN persentase modal",
      "Investor TIDAK punya hak veto",
      "Lock-up Period 24 bulan (ART Pasal 9)",
      "Penarikan memerlukan Notice of Withdrawal minimal 6 bulan sebelumnya",
      "KYC & AML wajib (ART Pasal 8)",
      "Dana investasi via Kampung Modal wajib masuk Escrow Account (ART Pasal 10)",
    ],
    benefits: [
      { icon: CircleDollarSign, title: "ROI Kompetitif", desc: "Return on investment yang menarik & transparan" },
      { icon: ShieldCheck, title: "Escrow Mutlak", desc: "Dana dijaga dalam escrow account terpercaya" },
      { icon: TrendingUp, title: "Impact Investment", desc: "Investasi berdampak positif untuk rakyat" },
      { icon: Eye, title: "Transparan", desc: "Reporting keuangan berkala & akurat" },
    ],
  },
];

// Chart data for donut
const chartData = kpaData.map((kpa) => ({
  name: kpa.name,
  value: kpa.proporsi,
  color: kpa.color,
}));

// Bar chart data for simpanan comparison
const simpananBarData = [
  { name: "KPA-1", pokok: 0.1, wajib: 0.05, color: "#22c55e" },
  { name: "KPA-2", pokok: 0.1, wajib: 0.05, color: "#3b82f6" },
  { name: "KPA-3", pokok: 0.25, wajib: 0.1, color: "#8b5cf6" },
  { name: "KPA-4", pokok: 5, wajib: 1, color: "#f59e0b" },
  { name: "KPA-5", pokok: 50, wajib: 1, color: "#008F3D" },
];

// Proof of Stake / Franchise data
const franchiseData = [
  {
    level: "KORDES",
    full: "Koordinator Desa",
    total: "Rp 500.000",
    breakdown: [
      { label: "Simpanan Pokok", amount: "Rp 100.000", color: "#0EA5E9" },
      { label: "Lisensi Kemitraan", amount: "Rp 150.000", color: "#10B981" },
      { label: "Deposit Kerja", amount: "Rp 250.000", color: "#7C3AED" },
    ],
  },
  {
    level: "KORCAM",
    full: "Koordinator Kecamatan",
    total: "Rp 2.500.000",
    breakdown: [
      { label: "Simpanan Pokok", amount: "Rp 250.000", color: "#0EA5E9" },
      { label: "Lisensi Kemitraan", amount: "Rp 750.000", color: "#10B981" },
      { label: "Deposit Kerja", amount: "Rp 1.500.000", color: "#7C3AED" },
    ],
  },
  {
    level: "KORDA",
    full: "Koordinator Kabupaten/Kota",
    total: "Rp 10.000.000",
    breakdown: [
      { label: "Simpanan Pokok", amount: "Rp 1.000.000", color: "#0EA5E9" },
      { label: "Lisensi Kemitraan", amount: "Rp 3.000.000", color: "#10B981" },
      { label: "Deposit Kerja", amount: "Rp 6.000.000", color: "#7C3AED" },
    ],
  },
  {
    level: "KORWIL",
    full: "Koordinator Wilayah (Provinsi)",
    total: "Rp 50.000.000",
    breakdown: [
      { label: "Simpanan Pokok", amount: "Rp 5.000.000", color: "#0EA5E9" },
      { label: "Lisensi Kemitraan", amount: "Rp 15.000.000", color: "#10B981" },
      { label: "Modal Penyertaan Saham Kampung Modal", amount: "Rp 30.000.000", color: "#7C3AED" },
    ],
  },
];

// Voting thresholds
const votingThresholds = [
  {
    type: "Keputusan Biasa",
    threshold: "60%",
    kpaRequired: "3 dari 5 KPA",
    desc: "Kebijakan operasional, pengangkatan pengurus, program kerja tahunan",
    color: "#22c55e",
    icon: CheckCircle2,
  },
  {
    type: "Perubahan AD/ART",
    threshold: "80%",
    kpaRequired: "4 dari 5 KPA",
    desc: "Amandemen Anggaran Dasar/Rumah Tangga, perubahan struktur organisasi",
    color: "#f59e0b",
    icon: FileText,
  },
  {
    type: "Likuidasi Koperasi",
    threshold: "80–100%",
    kpaRequired: "4–5 KPA",
    desc: "Pembubaran Koperasi, distribusi aset, penyelesaian kewajiban",
    color: "#8B0000",
    icon: AlertOctagon,
  },
];

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

/* ============================================================
   CUSTOM TOOLTIP STYLE
   ============================================================ */

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--foreground)",
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function KPAPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d2818] text-white py-20 lg:py-32">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#008F3D] rounded-full blur-[150px] opacity-15" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#8B0000] rounded-full blur-[150px] opacity-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700] rounded-full blur-[200px] opacity-5" />
        </div>

        {/* Pentagon SVG Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
            <polygon
              points="400,50 750,300 620,700 180,700 50,300"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <polygon
              points="400,150 650,350 550,630 250,630 150,350"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* KNMP Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-6 inline-block"
            >
              <div className="relative">
                <div className="h-16 sm:h-20 md:h-24 w-auto mx-auto rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-1 border border-white/10">
                  <Image
                    src="/logo-knmp.png"
                    alt="Logo Koperasi Korporasi Multipihak Nusa Merah Putih"
                    width={1408}
                    height={768}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="absolute -inset-2 rounded-xl border-2 border-[#FFD700]/20 animate-pulse" />
              </div>
            </motion.div>

            <Badge className="mb-6 px-5 py-2 text-sm font-semibold bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
              <Vote className="w-4 h-4 mr-2" />
              5 KPA = 5 Suara Demokratis — Pentagon Kedaulatan
            </Badge>

            <h1 className="text-responsive-hero font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">Pentagon</span>
              <br />
              Kedaulatan
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-2 font-medium">
              5 Kelompok Pihak Anggota — Fondasi Demokrasi Ekonomi Nusantara
            </p>
            <p className="text-base md:text-lg text-white/40 mb-10 max-w-2xl mx-auto">
              Berdasarkan <span className="text-[#FFD700]/80 font-semibold">ART Super Final Versi 7</span> —
              Setiap KPA mendapat proporsi suara yang sama:{" "}
              <span className="text-[#FFD700] font-bold text-xl">20%</span> masing-masing
            </p>

            {/* KPA Color Dots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {kpaData.map((kpa) => (
                <div
                  key={kpa.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: kpa.color }}
                  />
                  <span className="text-xs text-white/70 font-medium">{kpa.subtitle}</span>
                </div>
              ))}
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#008F3D] hover:bg-[#006F30] text-white font-semibold shadow-lg shadow-[#008F3D]/30"
              >
                Pelajari 5 KPA
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Daftar Sekarang
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================================
          SECTION 2 — OVERVIEW (Pentagon Kedaulatan + Pie Chart)
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Text */}
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
                <Info className="w-3 h-3 mr-1" />
                Pentagon Kedaulatan
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                Apa itu <span className="text-gradient-gold">Pentagon Kedaulatan</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Pentagon Kedaulatan adalah model tata kelola koperasi multipihak revolusioner yang memberikan{" "}
                <span className="font-semibold text-foreground">suara seimbang 20%</span>{" "}
                kepada setiap dari 5 Kelompok Pihak Anggota (KPA). Dilandasi{" "}
                <span className="font-semibold text-foreground">AD/ART Super Final Versi 7</span>,
                model ini memastikan tidak ada dominasi satu pihak dan kedaulatan ekonomi rakyat terjaga.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Vote,
                    title: "5 KPA × 20% = 100% Demokratis",
                    desc: "Setiap KPA memiliki proporsi suara yang sama dalam Rapat Anggota Tahunan (RAT)",
                    color: "#008F3D",
                  },
                  {
                    icon: Scale,
                    title: "Doktrin Anti-Oligarki",
                    desc: "ART Pasal 7: One Member One Vote berlaku untuk semua KPA, termasuk investor. Hak suara berdasarkan jumlah entitas, BUKAN persentase modal",
                    color: "#8B0000",
                  },
                  {
                    icon: XCircle,
                    title: "Tanpa Hak Veto Investor",
                    desc: "KPA-5 tidak memiliki hak veto — keputusan strategis tetap di tangan mayoritas KPA",
                    color: "#f59e0b",
                  },
                  {
                    icon: TrendingUp,
                    title: "Pertumbuhan Inklusif",
                    desc: "Semua pihak — dari petani hingga investor — mendapat manfaat dari pertumbuhan koperasi",
                    color: "#8b5cf6",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Donut Chart */}
            <motion.div variants={scaleIn} className="relative">
              <Card className="p-6 overflow-hidden border-0 shadow-xl">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChartIcon className="w-5 h-5 text-[#008F3D]" />
                    Distribusi Suara RAT — Pentagon Kedaulatan
                  </CardTitle>
                  <CardDescription>
                    Proporsi voting power: 5 KPA masing-masing 20%
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={3}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1200}
                          strokeWidth={0}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, "Proporsi Suara"]}
                          contentStyle={tooltipStyle}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={60}
                          formatter={(value) => (
                            <span className="text-xs text-muted-foreground">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Center Label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: "-20px" }}>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#008F3D]">100%</p>
                      <p className="text-xs text-muted-foreground">Demokratis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — 5 KPA DETAIL CARDS
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
              Kelompok Pihak Anggota
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Mengenal <span className="text-gradient-gold">5 KPA</span> Pentagon Kedaulatan
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Setiap KPA memiliki peran unik, struktur simpanan berbeda, dan mekanisme eksekusi iuran yang sesuai
              dengan karakteristik anggotanya — sesuai ART Super Final Versi 7
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {kpaData.map((kpa) => {
              const IconComponent = kpa.icon;
              return (
                <motion.div key={kpa.id} variants={fadeInUp}>
                  <Card
                    className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
                    style={{ borderTop: `4px solid ${kpa.color}` }}
                  >
                    <CardContent className="p-0">
                      <div className="grid lg:grid-cols-3 gap-0">
                        {/* Left: Identity */}
                        <div className="p-6 lg:p-8 lg:col-span-1" style={{ backgroundColor: `${kpa.color}08` }}>
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="p-3 rounded-xl"
                              style={{ backgroundColor: `${kpa.color}18` }}
                            >
                              <IconComponent className="w-7 h-7" style={{ color: kpa.color }} />
                            </div>
                            <div>
                              <Badge
                                variant="outline"
                                className="text-xs font-bold"
                                style={{ color: kpa.color, borderColor: kpa.color }}
                              >
                                KPA {kpa.id}
                              </Badge>
                              <p className="text-xs text-muted-foreground">20% Voting Power</p>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-1">{kpa.name}</h3>
                          <p className="font-semibold text-sm mb-4" style={{ color: kpa.color }}>
                            {kpa.subtitle}
                          </p>
                          <p className="text-sm text-muted-foreground mb-6">{kpa.deskripsi}</p>

                          {/* Members List */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              Anggota
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {kpa.anggotaList.map((anggota, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs font-normal py-0.5 px-2"
                                >
                                  {anggota}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Voting Power Progress */}
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-muted-foreground">Voting Power</span>
                              <span className="font-bold text-sm" style={{ color: kpa.color }}>
                                {kpa.proporsi}%
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: kpa.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${kpa.proporsi * 5}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: kpa.id * 0.15 }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right: Details */}
                        <div className="p-6 lg:p-8 lg:col-span-2">
                          {/* Simpanan Pricing Cards */}
                          <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            {/* Simpanan Pokok */}
                            <div className="rounded-xl border p-4" style={{ borderColor: `${kpa.color}30` }}>
                              <div className="flex items-center gap-2 mb-2">
                                <Banknote className="w-4 h-4" style={{ color: kpa.color }} />
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  Simpanan Pokok
                                </span>
                              </div>
                              <p className="text-lg font-bold mb-1" style={{ color: kpa.color }}>
                                {kpa.simpananPokok}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {kpa.simpananPokokDetail}
                              </p>
                            </div>

                            {/* Simpanan Wajib */}
                            <div className="rounded-xl border p-4" style={{ borderColor: `${kpa.color}30` }}>
                              <div className="flex items-center gap-2 mb-2">
                                <BanknoteArrowDown className="w-4 h-4" style={{ color: kpa.color }} />
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  Simpanan Wajib
                                </span>
                              </div>
                              <p className="text-lg font-bold mb-1" style={{ color: kpa.color }}>
                                {kpa.simpananWajib}
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {kpa.simpananWajibDetail}
                              </p>
                            </div>
                          </div>

                          {/* Metode Potong */}
                          <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Metode Eksekusi Iuran
                              </span>
                            </div>
                            <p className="font-semibold text-sm mb-1">{kpa.metodePotong}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {kpa.metodePotongDetail}
                            </p>
                          </div>

                          {/* Benefits Grid */}
                          <div className="mb-6">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                              Benefits & Keuntungan
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {kpa.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div
                                    className="p-1.5 rounded-md flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: `${kpa.color}12` }}
                                  >
                                    <benefit.icon className="w-3.5 h-3.5" style={{ color: kpa.color }} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold">{benefit.title}</p>
                                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Special Notes */}
                          {(kpa.specialNotes || kpa.catatan) && (
                            <div className="space-y-2">
                              {kpa.catatan && (
                                <div
                                  className="p-3 rounded-lg border-l-4"
                                  style={{
                                    borderLeftColor: kpa.color,
                                    backgroundColor: `${kpa.color}08`,
                                  }}
                                >
                                  <p className="text-xs font-semibold" style={{ color: kpa.color }}>
                                    ⚠️ {kpa.catatan}
                                  </p>
                                </div>
                              )}
                              {kpa.specialNotes?.map((note, i) => (
                                <div
                                  key={i}
                                  className="p-3 rounded-lg flex items-start gap-2"
                                  style={{ backgroundColor: `${kpa.color}06` }}
                                >
                                  <AlertTriangle
                                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                    style={{ color: kpa.color }}
                                  />
                                  <p className="text-xs text-muted-foreground">{note}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — SIMPANAN COMPARISON TABLE
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
              <Banknote className="w-3 h-3 mr-1" />
              Tabel Perbandingan
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Perbandingan <span className="text-gradient-gold">Simpanan</span> 5 KPA
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bandingkan simpanan pokok, wajib, metode potong, manfaat, dan catatan khusus dari setiap KPA
            </p>
          </motion.div>

          {/* Table + Chart Side by Side */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Full Comparison Table (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Card className="overflow-hidden shadow-lg border-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-[#008F3D] to-[#006F30] text-white">
                        <TableHead className="font-bold text-white min-w-[160px]">KPA</TableHead>
                        <TableHead className="font-bold text-white">Simpanan Pokok</TableHead>
                        <TableHead className="font-bold text-white">Simpanan Wajib</TableHead>
                        <TableHead className="font-bold text-white">Metode Potong</TableHead>
                        <TableHead className="font-bold text-white">Catatan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {kpaData.map((kpa) => {
                        const IconComponent = kpa.icon;
                        return (
                          <TableRow key={kpa.id} className="hover:bg-muted/30 border-b border-border/50">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${kpa.color}15` }}
                                >
                                  <IconComponent className="w-4 h-4" style={{ color: kpa.color }} />
                                </div>
                                <div>
                                  <p className="font-semibold text-xs">{kpa.name}</p>
                                  <p className="text-xs text-muted-foreground">{kpa.subtitle}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="text-xs font-semibold whitespace-nowrap">{kpa.simpananPokok}</p>
                            </TableCell>
                            <TableCell>
                              <p className="text-xs whitespace-nowrap">{kpa.simpananWajib}</p>
                            </TableCell>
                            <TableCell>
                              <p className="text-xs text-muted-foreground">{kpa.metodePotong}</p>
                            </TableCell>
                            <TableCell>
                              {kpa.catatan ? (
                                <Badge
                                  variant="outline"
                                  className="text-xs whitespace-nowrap"
                                  style={{ color: kpa.color, borderColor: `${kpa.color}50` }}
                                >
                                  {kpa.catatan}
                                </Badge>
                              ) : kpa.id === 5 ? (
                                <Badge variant="destructive" className="text-xs whitespace-nowrap">
                                  Anti-Oligarki
                                </Badge>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </motion.div>

            {/* Bar Chart (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 shadow-lg border-0 h-full">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-sm">Simpanan per KPA (Juta Rp)</CardTitle>
                  <CardDescription className="text-xs">
                    Visualisasi perbandingan simpanan pokok & wajib
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={simpananBarData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                        <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="pokok" fill="#008F3D" name="Pokok (Juta)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="wajib" fill="#8B0000" name="Wajib (Juta)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — INVISIBLE DUES (Doktrin Pungutan Tak Terlihat)
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 border-[#8B0000]/30 text-[#8B0000]"
              >
                ART Pasal 2
              </Badge>
              <h2 className="text-responsive-title font-bold mb-4">
                Doktrin <span className="text-gradient-gold">Invisible Dues</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Pungutan Tak Terlihat — KKMNMP mengharamkan metode penagihan manual (door-to-door).
                Semua iuran dieksekusi via auto-deduct di platform kopnusa.id & dompet digital JP3 Pay.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Core Principle */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#8B0000] to-[#4a0000] text-white p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-white/10">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">HARAM: Penagihan Manual</h3>
                        <p className="text-white/60 text-xs">ART Pasal 2 — Larangan Mutlak</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      KKMNMP mengharamkan metode penagihan manual secara door-to-door, telepon intimidasi,
                      atau debt-collector. Sistem iuran berjalan sepenuhnya secara otomatis melalui platform digital.
                    </p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">Tidak Ada Debt-Collector</p>
                        <p className="text-xs text-muted-foreground">
                          Tidak ada penagihan manual, intimidasi, atau tekanan kepada anggota
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">Tidak Ada Door-to-Door</p>
                        <p className="text-xs text-muted-foreground">
                          Larangan kunjungan rumah untuk penagihan simpanan wajib
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">Tidak Ada Denda Keterlambatan</p>
                        <p className="text-xs text-muted-foreground">
                          Piutang internal diakumulasikan tanpa denda atau bunga
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Auto-Deduct System */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#008F3D] to-[#006F30] text-white p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-white/10">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">WAJIB: Auto-Deduct System</h3>
                        <p className="text-white/60 text-xs">Platform kopnusa.id & JP3 Pay</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Seluruh simpanan wajib dieksekusi secara otomatis melalui mekanisme yang
                      disesuaikan dengan karakteristik masing-masing KPA.
                    </p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    {[
                      {
                        kpa: "KPA-1 (Produsen)",
                        method: "Auto-deduct dari penjualan panen & komisi logistik",
                        color: "#22c55e",
                      },
                      {
                        kpa: "KPA-2 (Konsumen)",
                        method: "Auto-deduct dari kembalian belanja & cashback Marketplace",
                        color: "#3b82f6",
                      },
                      {
                        kpa: "KPA-3 (Abdi Negara)",
                        method: "Auto-debet rekening gaji instansi / transfer periodik massal",
                        color: "#8b5cf6",
                      },
                      {
                        kpa: "KPA-4 (Bisnis)",
                        method: "Biaya langganan operasional VIP Dashboard B2B",
                        color: "#f59e0b",
                      },
                      {
                        kpa: "KPA-5 (Investor)",
                        method: "Dividen Deduction dari SHU Dividen akhir tahun buku",
                        color: "#008F3D",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: item.color }}
                        />
                        <div>
                          <p className="text-sm font-semibold">{item.kpa}</p>
                          <p className="text-xs text-muted-foreground">{item.method}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — PROOF OF STAKE / FRANCHISE TERITORIAL
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
                ART Pasal 4–5
              </Badge>
              <h2 className="text-responsive-title font-bold mb-4">
                Proof of Stake / <span className="text-gradient-gold">Franchise Teritorial</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Kepangkatan Korwil/Korda/Korcam/Kordes adalah Lisensi Kemitraan Ekosistem,
                terbagi dalam 3 Keranjang Akuntansi: Simpanan Pokok, Lisensi Kemitraan, dan Deposit Kerja
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {franchiseData.map((franchise, index) => (
                <motion.div key={franchise.level} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Header */}
                    <div
                      className="p-5 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${
                          index === 0 ? "#0EA5E9" : index === 1 ? "#7C3AED" : index === 2 ? "#DB2777" : "#B7791F"
                        }, ${
                          index === 0 ? "#0369a1" : index === 1 ? "#5b21b6" : index === 2 ? "#9d174d" : "#92400e"
                        })`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <Badge className="bg-white/20 text-white border-white/30 text-sm font-bold">
                            {franchise.level}
                          </Badge>
                        </div>
                        <p className="text-2xl font-extrabold">{franchise.total}</p>
                      </div>
                      <p className="text-white/80 text-sm font-medium">{franchise.full}</p>
                    </div>

                    {/* 3 Keranjang Akuntansi */}
                    <CardContent className="p-5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        3 Keranjang Akuntansi
                      </p>
                      <div className="space-y-3">
                        {franchise.breakdown.map((item, i) => {
                          const percentage =
                            i === 0
                              ? 20
                              : franchise.level === "KORWIL" && i === 2
                              ? 60
                              : 30;
                          return (
                            <div key={i} className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                  />
                                  <span className="text-xs font-medium">{item.label}</span>
                                </div>
                                <span className="text-xs font-bold">{item.amount}</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: item.color }}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${percentage}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: index * 0.1 + i * 0.1 }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <motion.div variants={fadeInUp} className="mt-8">
              <Card className="p-4 border-0 bg-[#008F3D]/5">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#008F3D] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Catatan Penting:</span> Untuk KORWIL,
                    keranjang ketiga berubah dari &quot;Deposit Kerja&quot; menjadi{" "}
                    <span className="font-semibold">Modal Penyertaan Saham Kampung Modal</span>,
                    yang memberikan hak kepemilikan saham dalam entitas investasi koperasi.
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — KPA-5 GOVERNANCE (Anti-Oligarki, KYC, Lock-up, Escrow)
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
                <Crown className="w-3 h-3 mr-1" />
                KPA-5 Governance
              </Badge>
              <h2 className="text-responsive-title font-bold mb-4">
                Tata Kelola <span className="text-gradient-gold">Pemodal & Investor</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Mekanisme perlindungan kedaulatan koperasi dari risiko oligarki,
                dengan protokol keamanan investasi berlapis sesuai ART Pasal 7, 8, 9, dan 10
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Anti-Oligarki */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg p-6 hover:shadow-xl transition-shadow group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#8B0000]/10 group-hover:bg-[#8B0000]/15 transition-colors">
                      <Scale className="w-6 h-6 text-[#8B0000]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Doktrin Anti-Oligarki</h3>
                      <Badge variant="outline" className="text-xs border-[#8B0000]/30 text-[#8B0000]">
                        ART Pasal 7
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">One Member One Vote</span> — Hak suara
                        didasarkan pada jumlah entitas, BUKAN persentase modal
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Investor <span className="font-semibold text-[#8B0000]">TIDAK punya hak veto</span> atas
                        keputusan Koperasi
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Dilarang melakukan Side-Deals / Perjanjian Bawah Meja dengan Pengurus
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Voting power KPA-5 tetap <span className="font-semibold text-foreground">20%</span>,
                        sama dengan 4 KPA lainnya
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* KYC & AML */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg p-6 hover:shadow-xl transition-shadow group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#008F3D]/10 group-hover:bg-[#008F3D]/15 transition-colors">
                      <Fingerprint className="w-6 h-6 text-[#008F3D]" />
                    </div>
                    <div>
                      <h3 className="font-bold">KYC & AML</h3>
                      <Badge variant="outline" className="text-xs border-[#008F3D]/30 text-[#008F3D]">
                        ART Pasal 8
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Wajib KYC</span> — Semua calon anggota
                        KPA-5 wajib melewati protokol Know Your Customer
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Wajib AML</span> — Anti-Money Laundering
                        screening untuk pencegahan pencucian uang
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008F3D] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Verifikasi sumber dana & track record investasi sebelum penerimaan
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Calon anggota yang gagal KYC/AML <span className="font-semibold">ditolak otomatis</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Lock-up Period */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg p-6 hover:shadow-xl transition-shadow group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#f59e0b]/10 group-hover:bg-[#f59e0b]/15 transition-colors">
                      <Lock className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Lock-up Period</h3>
                      <Badge variant="outline" className="text-xs border-[#f59e0b]/30 text-[#f59e0b]">
                        ART Pasal 9
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Simpanan Pokok KPA-5 <span className="font-semibold text-foreground">dikunci minimal 24 bulan</span>{" "}
                        sejak tanggal pendaftaran
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Penarikan memerlukan{" "}
                        <span className="font-semibold text-foreground">Notice of Withdrawal</span> minimal{" "}
                        <span className="font-bold text-[#f59e0b]">6 bulan</span> sebelumnya
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Mekanisme ini mencegah{" "}
                        <span className="font-semibold">Bank Rush</span> dan{" "}
                        <span className="font-semibold">Hostile Takeover</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Proteksi stabilitas likuiditas koperasi dalam jangka panjang
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Escrow Mutlak */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg p-6 hover:shadow-xl transition-shadow group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#8b5cf6]/10 group-hover:bg-[#8b5cf6]/15 transition-colors">
                      <ShieldCheck className="w-6 h-6 text-[#8b5cf6]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Escrow Mutlak</h3>
                      <Badge variant="outline" className="text-xs border-[#8b5cf6]/30 text-[#8b5cf6]">
                        ART Pasal 10
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Dana investasi KPA-5 via Kampung Modal{" "}
                        <span className="font-semibold text-foreground">WAJIB masuk Escrow Account</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">BUKAN</span> rekening operasional — Dana escrow terpisah
                        dari kas harian Koperasi
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Anti-Bank Rush — Dana investor terlindungi dari penyalahgunaan
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Audit berkala oleh pihak independen untuk transparansi penggunaan dana
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Exit Strategy */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg p-6 hover:shadow-xl transition-shadow group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#22c55e]/10 group-hover:bg-[#22c55e]/15 transition-colors">
                      <ArrowRight className="w-6 h-6 text-[#22c55e]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Exit Strategy</h3>
                      <Badge variant="outline" className="text-xs border-[#22c55e]/30 text-[#22c55e]">
                        Mekanisme Keluar
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Notice of Withdrawal minimal{" "}
                        <span className="font-semibold text-foreground">6 bulan</span> sebelum penarikan
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Penarikan hanya setelah lock-up 24 bulan terpenuhi
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Pengembalian simpanan pokok sesuai prosedur yang diatur RAT
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Penarikan mendadak dilarang keras untuk menjaga stabilitas Koperasi
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Simpanan KPA-5 Detail */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-[#008F3D] to-[#006F30] text-white p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <CircleDollarSign className="w-5 h-5" />
                      <h3 className="font-bold">Detail Simpanan KPA-5</h3>
                    </div>
                    <p className="text-white/70 text-xs">Individu & Institusi</p>
                  </div>
                  <CardContent className="p-5 space-y-4">
                    <div className="p-3 rounded-lg bg-[#008F3D]/5 border border-[#008F3D]/20">
                      <p className="text-xs font-semibold text-[#008F3D] uppercase tracking-wider mb-1">
                        Individu (Angel Investor)
                      </p>
                      <p className="text-lg font-bold">Rp 50.000.000</p>
                      <p className="text-xs text-muted-foreground">Minimal Simpanan Pokok</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#008F3D]/5 border border-[#008F3D]/20">
                      <p className="text-xs font-semibold text-[#008F3D] uppercase tracking-wider mb-1">
                        Institusi (Venture/Bank)
                      </p>
                      <p className="text-lg font-bold">Rp 250.000.000</p>
                      <p className="text-xs text-muted-foreground">Minimal Simpanan Pokok</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Simpanan Wajib (Semua)
                      </p>
                      <p className="text-lg font-bold">Rp 1.000.000<span className="text-sm font-normal text-muted-foreground">/bulan</span></p>
                      <p className="text-xs text-muted-foreground">
                        Dividen Deduction — Rp 12.000.000/tahun, dipotong dari SHU Dividen
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8 — VOTING POWER (Pentagon Kedaulatan Rules)
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
                <Vote className="w-3 h-3 mr-1" />
                Voting Rules
              </Badge>
              <h2 className="text-responsive-title font-bold mb-4">
                Aturan <span className="text-gradient-gold">Kekuatan Suara</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Pentagon Kedaulatan menetapkan ambang batas suara yang berbeda untuk setiap jenis
                keputusan — dari kebijakan biasa hingga likuidasi
              </p>
            </motion.div>

            {/* Voting Threshold Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {votingThresholds.map((threshold, index) => {
                const IconComp = threshold.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow text-center">
                      <div
                        className="p-6 text-white"
                        style={{
                          background: `linear-gradient(135deg, ${threshold.color}, ${
                            threshold.color === "#22c55e"
                              ? "#16a34a"
                              : threshold.color === "#f59e0b"
                              ? "#d97706"
                              : "#6B0000"
                          })`,
                        }}
                      >
                        <IconComp className="w-10 h-10 mx-auto mb-3 opacity-90" />
                        <p className="text-4xl font-extrabold mb-1">{threshold.threshold}</p>
                        <p className="text-sm font-medium opacity-80">{threshold.kpaRequired}</p>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg mb-2">{threshold.type}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{threshold.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Visual Pentagon Voting */}
            <motion.div variants={fadeInUp}>
              <Card className="border-0 shadow-lg p-6 lg:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#008F3D]" />
                    Visualisasi Voting Pentagon Kedaulatan
                  </CardTitle>
                  <CardDescription>
                    Setiap KPA memiliki bobot suara yang sama — 20%. Keputusan diambil berdasarkan jumlah KPA yang setuju.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid sm:grid-cols-5 gap-3">
                    {kpaData.map((kpa) => {
                      const IconComponent = kpa.icon;
                      return (
                        <div
                          key={kpa.id}
                          className="text-center p-4 rounded-xl border transition-all hover:scale-105"
                          style={{
                            borderColor: `${kpa.color}30`,
                            backgroundColor: `${kpa.color}06`,
                          }}
                        >
                          <IconComponent
                            className="w-8 h-8 mx-auto mb-2"
                            style={{ color: kpa.color }}
                          />
                          <p className="text-xs font-bold mb-1">KPA-{kpa.id}</p>
                          <p className="text-xs text-muted-foreground mb-2">{kpa.subtitle}</p>
                          <p
                            className="text-2xl font-extrabold"
                            style={{ color: kpa.color }}
                          >
                            20%
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Rules */}
                  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total KPA", value: "5", sub: "Kelompok Pihak Anggota", color: "#008F3D" },
                      { label: "Suara per KPA", value: "20%", sub: "Proporsi voting equal", color: "#3b82f6" },
                      { label: "Mayoritas Normal", value: "3 KPA", sub: "60% suara diperlukan", color: "#f59e0b" },
                      { label: "Mayoritas Mutlak", value: "4 KPA", sub: "80% untuk AD/ART", color: "#8B0000" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: `${item.color}06`, borderLeft: `3px solid ${item.color}` }}
                      >
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-xl font-extrabold" style={{ color: item.color }}>
                          {item.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 9 — HOW TO JOIN
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
              <UserPlus className="w-3 h-3 mr-1" />
              Cara Bergabung
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Langkah Menjadi <span className="text-gradient-gold">Anggota</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih KPA yang sesuai dengan profil Anda dan ikuti langkah-langkah pendaftaran
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* General Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-6 border-0 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <ArrowDownToLine className="w-5 h-5 text-[#008F3D]" />
                    Proses Pendaftaran Umum
                  </CardTitle>
                  <CardDescription>
                    5 langkah untuk menjadi anggota KKMNMP/KNMP
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Pilih KPA yang Sesuai",
                        desc: "Tentukan KPA dari 5 Pentagon Kedaulatan yang paling sesuai dengan aktivitas/profil Anda",
                        color: "#008F3D",
                      },
                      {
                        step: 2,
                        title: "Daftar via kopnusa.id",
                        desc: "Buat akun di platform kopnusa.id dan unggah dokumen persyaratan sesuai KPA",
                        color: "#3b82f6",
                      },
                      {
                        step: 3,
                        title: "Verifikasi Data",
                        desc: "Tim KKMNMP akan memverifikasi dokumen dan data Anda (KYC untuk KPA-5)",
                        color: "#8b5cf6",
                      },
                      {
                        step: 4,
                        title: "Setor Simpanan Pokok",
                        desc: "Lakukan pembayaran simpanan pokok sesuai nominal KPA yang dipilih via JP3 Pay",
                        color: "#f59e0b",
                      },
                      {
                        step: 5,
                        title: "Aktivasi Akun",
                        desc: "Akun Anda aktif — selamat bergabung! Simpanan wajib akan otomatis terpotong via Invisible Dues",
                        color: "#22c55e",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements per KPA (Tabbed) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-6 border-0 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#008F3D]" />
                    Persyaratan per KPA
                  </CardTitle>
                  <CardDescription>
                    Dokumen yang diperlukan untuk setiap KPA Pentagon Kedaulatan
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="kpa-1" className="w-full">
                    <TabsList className="w-full grid grid-cols-5 mb-4">
                      {kpaData.map((kpa) => (
                        <TabsTrigger
                          key={kpa.id}
                          value={`kpa-${kpa.id}`}
                          className="text-xs data-[state=active]:text-white"
                          style={
                            {
                              "--tab-active-bg": kpa.color,
                            } as React.CSSProperties
                          }
                        >
                          KPA-{kpa.id}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {kpaData.map((kpa) => {
                      const IconComponent = kpa.icon;
                      return (
                        <TabsContent key={kpa.id} value={`kpa-${kpa.id}`} className="mt-0">
                          <div
                            className="p-4 rounded-xl border-l-4 mb-4"
                            style={{
                              borderLeftColor: kpa.color,
                              backgroundColor: `${kpa.color}06`,
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <IconComponent className="w-5 h-5" style={{ color: kpa.color }} />
                              <span className="font-bold text-sm">{kpa.name}</span>
                              <Badge
                                variant="outline"
                                className="text-xs ml-auto"
                                style={{ color: kpa.color, borderColor: `${kpa.color}40` }}
                              >
                                {kpa.subtitle}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{kpa.deskripsi}</p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Dokumen Persyaratan
                              </p>
                              <ul className="space-y-1.5">
                                {kpa.requirements.map((req, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                  >
                                    <CheckCircle2 className="w-4 h-4" style={{ color: kpa.color }} />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                              <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-xs text-muted-foreground mb-1">Simpanan Pokok</p>
                                <p className="text-sm font-bold" style={{ color: kpa.color }}>
                                  {kpa.simpananPokok}
                                </p>
                              </div>
                              <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-xs text-muted-foreground mb-1">Simpanan Wajib</p>
                                <p className="text-sm font-bold" style={{ color: kpa.color }}>
                                  {kpa.simpananWajib}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <Card className="p-6 bg-[#008F3D]/5 border-[#008F3D]/20 border-0 shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Butuh Bantuan Memilih KPA?</h3>
                  <p className="text-muted-foreground text-sm">
                    Hubungi tim membership KKMNMP untuk konsultasi gratis pemilihan KPA yang tepat
                    dalam Pentagon Kedaulatan
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="border-[#008F3D]/30 text-[#008F3D]">
                    📞 021-1234-5678
                  </Button>
                  <Button className="bg-[#008F3D] hover:bg-[#006F30] text-white">
                    ✉️ membership@knmp.co.id
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10 — CTA
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d2818] py-20 lg:py-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#008F3D] rounded-full blur-[120px] opacity-15" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#8B0000] rounded-full blur-[120px] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-8 inline-block"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] flex items-center justify-center shadow-2xl shadow-[#FFD700]/30">
                  <Handshake className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-full border-2 border-[#FFD700]/20 animate-pulse" />
              </div>
            </motion.div>

            <Badge className="mb-6 px-5 py-2 text-sm font-semibold bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/30">
              Bergabung dengan Koperasi Berdaulat
            </Badge>

            <h2 className="text-responsive-title font-bold text-white mb-6">
              Temukan Tempatmu di{" "}
              <span className="text-gradient-gold">5 KPA Pentagon Kedaulatan</span>
            </h2>

            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Jadilah bagian dari ekosistem ekonomi berdaulat yang menghubungkan produsen, konsumen,
              abdi negara, pelaku usaha, dan investor dalam satu wadah demokratis — KKMNMP/KNMP
            </p>

            {/* 5 KPA Quick Join Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {kpaData.map((kpa) => {
                const IconComponent = kpa.icon;
                return (
                  <motion.button
                    key={kpa.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all text-sm"
                  >
                    <IconComponent className="w-4 h-4" style={{ color: kpa.color }} />
                    <span>{kpa.subtitle}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#008F3D] hover:bg-[#006F30] text-white font-semibold shadow-lg shadow-[#008F3D]/30 px-8"
              >
                Daftar Sekarang — Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <FileText className="mr-2 w-5 h-5" />
                Baca AD/ART Lengkap
              </Button>
            </div>

            <p className="text-white/30 text-xs mt-8">
              Berdasarkan AD/ART Super Final Versi 7 — Sovereign Architecture Edition — Ditetapkan di Jakarta, 21 Maret 2026
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
