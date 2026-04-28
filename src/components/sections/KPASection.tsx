"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  Building2,
  Shield,
  ShoppingBag,
  Crown,
  CheckCircle2,
  ArrowRight,
  Vote,
  Scale,
  AlertTriangle,
  UserPlus,
  Info,
  Banknote,
  Landmark,
  TrendingUp,
  ShieldCheck,
  Zap,
  Handshake,
  Wallet,
  CreditCard,
  CircleDollarSign,
  BanknoteArrowDown,
  Gift,
  Star,
  Eye,
  XCircle,
  FileText,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


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
      "Pelatihan gratis via NB Academy",
      "Dompet digital NB Pay dengan saldo awal",
    ],
    icon: Sprout,
    requirements: ["KTP valid", "Bukti aktivitas produksi", "Rekomendasi kelompok tani"],
    simpananPokok: "Rp 100.000",
    simpananPokokDetail:
      "Dikonversi sebagian menjadi saldo awal dompet digital NB Pay & biaya verifikasi",
    simpananWajib: "Rp 50.000/bulan",
    simpananWajibDetail:
      "Dieksekusi tanpa debt-collector; dipotong otomatis/volumetrik dari transaksi penjualan panen atau komisi logistik. Jika tidak ada transaksi, diakumulasikan sebagai piutang internal tanpa denda",
    metodePotong: "Auto-deduct / Volumetrik",
    metodePotongDetail:
      "Dipotong otomatis dari penjualan panen atau komisi logistik melalui platform kopnusa.id & NB Pay",
    benefits: [
      { icon: Zap, title: "Akses Pasar", desc: "Langsung ke Marketplace KKMNMP tanpa perantara" },
      { icon: CircleDollarSign, title: "Modal Usaha", desc: "Pembiayaan via Kampung Modal dengan suku bunga rendah" },
      { icon: Star, title: "Pelatihan", desc: "NB Academy gratis untuk peningkatan kapasitas" },
      { icon: Wallet, title: "NB Pay", desc: "Saldo awal dompet digital dari simpanan pokok" },
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
      "Warga masyarakat umum pengguna NB Pay",
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
      "Dipotong otomatis dari sisa kembalian belanja, akumulasi cashback di Marketplace KKMNMP, atau pemotongan otomatis dari saldo NB Pay",
    metodePotong: "Cashback & Kembalian Belanja",
    metodePotongDetail:
      "Dipotong dari sisa kembalian belanja, akumulasi cashback Marketplace, atau saldo NB Pay secara otomatis",
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
    icon: AlertTriangle,
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
   MAIN COMPONENT
   ============================================================ */

export function KPASection() {
  return (
    <section className="relative" id="pentagon-kedaulatan">
      {/* ============================================================
          PART 1 — COMPACT SECTION HERO (Dark Gradient Header)
          ============================================================ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d2818] text-white py-12 lg:py-16">
        {/* Background Decorations */}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* KNMP Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-4 inline-block"
            >
              <div className="relative">
                <div className="h-12 sm:h-16 md:h-20 w-auto mx-auto rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-1 border border-white/10">
                  <Image
                    src="/logo-knmp-v2.png"
                    alt="Logo Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih"
                    width={1408}
                    height={768}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="absolute -inset-2 rounded-xl border-2 border-[#FFD700]/20 animate-pulse" />
              </div>
            </motion.div>

            <Badge className="mb-4 px-4 py-1.5 text-sm font-semibold bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
              <Vote className="w-4 h-4 mr-2" />
              5 KPA = 5 Suara Demokratis
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="text-gradient-gold">Pentagon</span>{" "}
              Kedaulatan
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-2 font-medium">
              5 Kelompok Pihak Anggota — Fondasi Demokrasi Ekonomi Nusantara
            </p>
            <p className="text-sm md:text-base text-white/40 mb-8 max-w-2xl mx-auto">
              Berdasarkan <span className="text-[#FFD700]/80 font-semibold">ART Super Final Versi 7</span> —
              Setiap KPA mendapat proporsi suara yang sama:{" "}
              <span className="text-[#FFD700] font-bold text-lg">20%</span> masing-masing
            </p>

            {/* KPA Color Dots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
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
              <Link href="/kpa">
                <Button
                  size="lg"
                  className="bg-[#008F3D] hover:bg-[#006F30] text-white font-semibold shadow-lg shadow-[#008F3D]/30"
                >
                  Pelajari 5 KPA
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/daftar">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <UserPlus className="mr-2 w-5 h-5" />
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ============================================================
          PART 2 — OVERVIEW (Pentagon Kedaulatan + Pie Chart)
          ============================================================ */}
      <div className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left: Text */}
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
                <Info className="w-3 h-3 mr-1" />
                Pentagon Kedaulatan
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                Apa itu <span className="text-gradient-gold">Pentagon Kedaulatan</span>?
              </h3>
              <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
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
                    desc: "ART Pasal 7: One Member One Vote berlaku untuk semua KPA, termasuk investor",
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

            {/* Right: Distribusi Suara RAT — Premium Pentagon Diagram */}
            <motion.div variants={scaleIn} className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d1a10] border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Vote className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="text-lg font-bold text-white">Distribusi Suara RAT</h4>
                  </div>
                  <p className="text-sm text-white/50">Proporsi voting power: 5 KPA masing-masing 20%</p>
                </div>

                {/* Pentagon Visual Diagram */}
                <div className="px-5 sm:px-6 pb-4">
                  <div className="relative flex items-center justify-center py-8">
                    {/* Pentagon SVG */}
                    <svg viewBox="0 0 400 380" className="w-full max-w-[360px] h-auto">
                      <defs>
                        {/* Glow filter */}
                        <filter id="pentagon-glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        {/* Center gradient */}
                        <radialGradient id="center-grad" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#008F3D" stopOpacity="0.05" />
                        </radialGradient>
                      </defs>

                      {/* Pentagon outer glow shape */}
                      <polygon
                        points="200,30 370,150 305,340 95,340 30,150"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.5"
                        strokeOpacity="0.15"
                      />
                      {/* Pentagon outer shape */}
                      <polygon
                        points="200,30 370,150 305,340 95,340 30,150"
                        fill="none"
                        stroke="url(#pentagon-border-grad)"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                      <defs>
                        <linearGradient id="pentagon-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#008F3D" />
                          <stop offset="50%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#8B0000" />
                        </linearGradient>
                      </defs>
                      {/* Pentagon inner shape */}
                      <polygon
                        points="200,75 330,165 278,310 122,310 70,165"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.5"
                        strokeOpacity="0.1"
                      />

                      {/* Center lines from center to each vertex with gradient */}
                      {[
                        { x2: 200, y2: 30, color: '#22c55e' },
                        { x2: 370, y2: 150, color: '#3b82f6' },
                        { x2: 305, y2: 340, color: '#8b5cf6' },
                        { x2: 95, y2: 340, color: '#f59e0b' },
                        { x2: 30, y2: 150, color: '#008F3D' },
                      ].map((line, i) => (
                        <line key={i} x1="200" y1="190" x2={line.x2} y2={line.y2} stroke={line.color} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4,4" />
                      ))}

                      {/* Center circle with pulse */}
                      <circle cx="200" cy="190" r="42" fill="url(#center-grad)" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
                      <circle cx="200" cy="190" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3">
                        <animate attributeName="r" from="42" to="55" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text x="200" y="183" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#D4AF37">100%</text>
                      <text x="200" y="200" textAnchor="middle" fontSize="8" fill="#D4AF37" opacity="0.7">DEMOKRATIS</text>

                      {/* KPA-1: Top vertex — Produsen & Pekerja */}
                      <g>
                        <circle cx="200" cy="22" r="22" fill="#22c55e" opacity="0.12" stroke="#22c55e" strokeWidth="2" filter="url(#pentagon-glow)" />
                        <text x="200" y="17" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#22c55e">20%</text>
                        <text x="200" y="28" textAnchor="middle" fontSize="5.5" fill="#22c55e" opacity="0.8">KPA-1</text>
                        <text x="200" y="5" textAnchor="middle" fontSize="5" fill="white" opacity="0.5">Produsen</text>
                      </g>

                      {/* KPA-2: Top-right — Konsumen Umum */}
                      <g>
                        <circle cx="378" cy="145" r="22" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="2" filter="url(#pentagon-glow)" />
                        <text x="378" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#3b82f6">20%</text>
                        <text x="378" y="151" textAnchor="middle" fontSize="5.5" fill="#3b82f6" opacity="0.8">KPA-2</text>
                        <text x="378" y="128" textAnchor="middle" fontSize="5" fill="white" opacity="0.5">Konsumen</text>
                      </g>

                      {/* KPA-3: Bottom-right — Abdi Negara */}
                      <g>
                        <circle cx="312" cy="350" r="22" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="2" filter="url(#pentagon-glow)" />
                        <text x="312" y="345" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#8b5cf6">20%</text>
                        <text x="312" y="356" textAnchor="middle" fontSize="5.5" fill="#8b5cf6" opacity="0.8">KPA-3</text>
                        <text x="312" y="333" textAnchor="middle" fontSize="5" fill="white" opacity="0.5">Abdi Negara</text>
                      </g>

                      {/* KPA-4: Bottom-left — Entitas Bisnis */}
                      <g>
                        <circle cx="88" cy="350" r="22" fill="#f59e0b" opacity="0.12" stroke="#f59e0b" strokeWidth="2" filter="url(#pentagon-glow)" />
                        <text x="88" y="345" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#f59e0b">20%</text>
                        <text x="88" y="356" textAnchor="middle" fontSize="5.5" fill="#f59e0b" opacity="0.8">KPA-4</text>
                        <text x="88" y="333" textAnchor="middle" fontSize="5" fill="white" opacity="0.5">Entitas Bisnis</text>
                      </g>

                      {/* KPA-5: Top-left — Pemodal & Investor */}
                      <g>
                        <circle cx="22" cy="145" r="22" fill="#008F3D" opacity="0.12" stroke="#008F3D" strokeWidth="2" filter="url(#pentagon-glow)" />
                        <text x="22" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#008F3D">20%</text>
                        <text x="22" y="151" textAnchor="middle" fontSize="5.5" fill="#008F3D" opacity="0.8">KPA-5</text>
                        <text x="22" y="128" textAnchor="middle" fontSize="5" fill="white" opacity="0.5">Pemodal</text>
                      </g>

                      {/* Animated flow dots on edges */}
                      <circle r="2" fill="#D4AF37" opacity="0.6">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M200,30 L370,150" />
                      </circle>
                      <circle r="2" fill="#D4AF37" opacity="0.6">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M370,150 L305,340" />
                      </circle>
                      <circle r="2" fill="#D4AF37" opacity="0.6">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M305,340 L95,340" />
                      </circle>
                      <circle r="2" fill="#D4AF37" opacity="0.6">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M95,340 L30,150" />
                      </circle>
                      <circle r="2" fill="#D4AF37" opacity="0.6">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M30,150 L200,30" />
                      </circle>
                    </svg>
                  </div>
                </div>

                {/* KPA Legend — Elegant horizontal bars */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-2.5">
                  {kpaData.map((kpa, i) => {
                    const IconComp = kpa.icon;
                    return (
                      <motion.div
                        key={kpa.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.4 }}
                        className="flex items-center gap-3 group"
                      >
                        {/* Color indicator dot */}
                        <div className="relative flex-shrink-0">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${kpa.color}20` }}
                          >
                            <IconComp className="w-4 h-4" style={{ color: kpa.color }} />
                          </div>
                        </div>

                        {/* KPA Name & Bar */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-white/80 truncate">
                              {kpa.name}
                            </span>
                            <span className="text-xs font-bold ml-2" style={{ color: kpa.color }}>
                              20%
                            </span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: kpa.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: '20%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer note */}
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-white/5">
                  <p className="text-[10px] text-[#D4AF37]/60 text-center font-medium tracking-wide">
                    Doktrin Anti-Oligarki — One Member One Vote — Tanpa Hak Veto
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          PART 3 — 5 KPA DETAIL CARDS
          ============================================================ */}
      <div className="py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-[#008F3D]/30 text-[#008F3D]">
              Kelompok Pihak Anggota
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Mengenal <span className="text-gradient-gold">5 KPA</span> Pentagon Kedaulatan
            </h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
              Setiap KPA memiliki peran unik, struktur simpanan berbeda, dan mekanisme eksekusi iuran yang sesuai
              dengan karakteristik anggotanya — sesuai ART Super Final Versi 7
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
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
                        <div className="p-5 sm:p-6 lg:p-8 lg:col-span-1" style={{ backgroundColor: `${kpa.color}08` }}>
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

                          <h4 className="text-xl font-bold mb-1">{kpa.name}</h4>
                          <p className="font-semibold text-sm mb-3" style={{ color: kpa.color }}>
                            {kpa.subtitle}
                          </p>
                          <p className="text-sm text-muted-foreground mb-5">{kpa.deskripsi}</p>

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
                        <div className="p-5 sm:p-6 lg:p-8 lg:col-span-2">
                          {/* Simpanan Pricing Cards */}
                          <div className="grid sm:grid-cols-2 gap-4 mb-5">
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
                          <div className="mb-5 p-4 rounded-xl bg-muted/50 border border-border">
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
                          <div className="mb-5">
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
      </div>

      {/* ============================================================
          PART 4 — INVISIBLE DUES (Doktrin Pungutan Tak Terlihat)
          ============================================================ */}
      <div className="py-12 lg:py-20 bg-background">
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
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Doktrin <span className="text-gradient-gold">Invisible Dues</span>
              </h3>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
                Pungutan Tak Terlihat — KKMNMP mengharamkan metode penagihan manual (door-to-door).
                Semua iuran dieksekusi via auto-deduct di platform kopnusa.id & dompet digital NB Pay.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Core Principle - HARAM */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#8B0000] to-[#4a0000] text-white p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-white/10">
                        <XCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">HARAM: Penagihan Manual</h4>
                        <p className="text-white/60 text-xs">ART Pasal 2 — Larangan Mutlak</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      KKMNMP mengharamkan metode penagihan manual secara door-to-door, telepon intimidasi,
                      atau debt-collector. Sistem iuran berjalan sepenuhnya secara otomatis melalui platform digital.
                    </p>
                  </div>
                  <CardContent className="p-5 sm:p-6 space-y-4">
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

              {/* Auto-Deduct System - WAJIB */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-[#008F3D] to-[#006F30] text-white p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-white/10">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">WAJIB: Auto-Deduct System</h4>
                        <p className="text-white/60 text-xs">Platform kopnusa.id & NB Pay</p>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Seluruh simpanan wajib dieksekusi secara otomatis melalui mekanisme yang
                      disesuaikan dengan karakteristik masing-masing KPA.
                    </p>
                  </div>
                  <CardContent className="p-5 sm:p-6 space-y-4">
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
      </div>
    </section>
  );
}
