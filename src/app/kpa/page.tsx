"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  Building2,
  Users,
  Briefcase,
  ShoppingBag,
  Crown,
  CheckCircle2,
  ArrowRight,
  Vote,
  PieChart as PieChartIcon,
  Shield,
  Target,
  TrendingUp,
  UserPlus,
  Info,
  Banknote,
  Landmark,
  Scale,
  AlertTriangle,
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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// KPA Data — Pentagon Kedaulatan (AD/ART Versi 7)
const kpaData = [
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
    deskripsi: "Petani murni, nelayan, peternak, pekebun, pengrajin, buruh tani, agen logistik (Kordes/Korcam/Korda/Korwil), kurir ekosistem, kader digital",
    manfaat: ["Akses pasar langsung", "Modal usaha via Kampung Modal", "Teknologi pertanian", "Pelatihan gratis via JE-P3 Academy"],
    anggota: "45.000+",
    icon: Sprout,
    requirements: ["KTP valid", "Bukti aktivitas produksi", "Rekomendasi kelompok"],
    simpananPokok: "Rp 100.000",
    simpananWajib: "Rp 50.000/bulan",
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
    deskripsi: "Warga masyarakat umum pengguna JP3 Pay, pembeli retail Marketplace, wisatawan & jemaah perjalanan",
    manfaat: ["Harga khusus anggota", "Rewards & cashback", "Bagi SHU tahunan", "Priority access"],
    anggota: "50.000+",
    icon: ShoppingBag,
    requirements: ["KTP valid", "Minat produk lokal"],
    simpananPokok: "Rp 100.000",
    simpananWajib: "Rp 50.000/bulan",
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
    deskripsi: "PNS, ASN, P3K, Pensiunan, TNI/POLRI aktif & purnawirawan, Pejabat Negara, DPR/DPRD/DPD, Kepala Daerah",
    manfaat: ["Jangkar stabilitas ekosistem", "Hak suara politik", "Akses VIP", "Auto-debet gaji"],
    anggota: "25.000+",
    icon: Shield,
    requirements: ["Identitas ASN/TNI/POLRI", "Surat keterangan instansi"],
    simpananPokok: "Rp 250.000",
    simpananWajib: "Rp 100.000/bulan",
    note: "Klausul Netralitas berlaku",
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
    deskripsi: "Bandar lokal, pengepul hasil bumi, pedagang besar, PT/CV/Firma, Yayasan, BUMDes, Koperasi Primer",
    manfaat: ["Supply chain terintegrasi", "Financing B2B", "Dashboard VIP", "Network expansion"],
    anggota: "80.000+ unit",
    icon: Building2,
    requirements: ["SIUP/NIB aktif", "Badan hukum valid", "AD/ART (koperasi)"],
    simpananPokok: "Rp 5.000.000",
    simpananWajib: "Rp 1.000.000/bulan",
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
    deskripsi: "Angel Investor, Venture Capital, Bank Pemerintah (Himbara), Bank Swasta, Institusi internasional",
    manfaat: ["ROI kompetitif", "Impact investment", "Governance participation", "Reporting transparan"],
    anggota: "500+",
    icon: Crown,
    requirements: ["KYC/AML verification", "Lembar saham/kontrak investasi", "Memahami risiko investasi"],
    simpananPokok: "Individu: Rp 50.000.000 | Institusi: Rp 250.000.000",
    simpananWajib: "Rp 1.000.000/bulan (dividen deduction)",
    note1: "Doktrin Anti-Oligarki: 1 Anggota 1 Suara",
    note2: "Lock-up 24 bulan",
  },
];

// Chart data
const chartData = kpaData.map((kpa) => ({
  name: kpa.name,
  value: kpa.proporsi,
  color: kpa.color,
}));

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
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

export default function KPAPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-semibold bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            >
              <Vote className="w-4 h-4 mr-2" />
              5 KPA = 5 Suara Demokratis — Pentagon Kedaulatan
            </Badge>
            <h1 className="text-responsive-hero font-bold mb-6">
              <span className="text-gradient-gold">Pentagon</span>
              <br />
              <span className="text-white">Kedaulatan — 5 Kelompok Pihak Anggota</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Setiap KPA mendapat <span className="text-yellow-400 font-bold">20% suara</span> — Demokrasi sempurna dalam keputusan koperasi
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Daftar Sekarang
              </Button>
            </div>
          </motion.div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Overview Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4">
                <Info className="w-3 h-3 mr-1" />
                Pentagon Kedaulatan
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                Apa itu Pentagon Kedaulatan?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Pentagon Kedaulatan adalah model tata kelola koperasi multipihak yang memberikan{" "}
                <span className="font-semibold text-foreground">
                  suara seimbang 20%
                </span>{" "}
                kepada setiap dari 5 Kelompok Pihak Anggota (KPA). Dilandasi{" "}
                <span className="font-semibold text-foreground">
                  AD/ART Versi 7
                </span>
                , model ini memastikan tidak ada dominasi satu pihak dan kedaulatan
                ekonomi rakyat terjaga.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">5 KPA × 20% = 100% Demokratis</h4>
                    <p className="text-muted-foreground text-sm">
                      Setiap KPA memiliki proporsi suara yang sama dalam RAT
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Anti-Oligarki</h4>
                    <p className="text-muted-foreground text-sm">
                      Doktrin Anti-Oligarki berlaku — 1 Anggota 1 Suara, bahkan untuk investor
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Pertumbuhan Inklusif</h4>
                    <p className="text-muted-foreground text-sm">
                      Semua pihak mendapat manfaat dari pertumbuhan koperasi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="relative">
              <Card className="p-6 overflow-hidden">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-primary" />
                    Pentagon Kedaulatan — Distribusi Suara RAT
                  </CardTitle>
                  <CardDescription>
                    Proporsi voting power: 5 KPA masing-masing 20%
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={3}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="transparent"
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, "Proporsi Suara"]}
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value) => (
                            <span className="text-xs text-muted-foreground">{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5 KPA Cards Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Kelompok Pihak Anggota
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Mengenal 5 KPA Pentagon Kedaulatan
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Setiap KPA memiliki peran, manfaat, dan simpanan unik dalam ekosistem koperasi
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {kpaData.map((kpa, index) => {
              const IconComponent = kpa.icon;
              return (
                <motion.div
                  key={kpa.id}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`h-full overflow-hidden border-t-4 ${kpa.borderColor} card-hover-lift`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`p-3 rounded-xl ${kpa.lightBg}`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${kpa.textColor}`}
                            style={{ color: kpa.color }}
                          />
                        </div>
                        <Badge
                          variant="outline"
                          className={`${kpa.textColor} border-current`}
                        >
                          KPA {kpa.id}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{kpa.name}</CardTitle>
                      <CardDescription>
                        <span className="font-semibold" style={{ color: kpa.color }}>{kpa.subtitle}</span>
                        {" — "}{kpa.deskripsi}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Proporsi Suara */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Proporsi Suara</span>
                          <span
                            className="font-bold text-lg"
                            style={{ color: kpa.color }}
                          >
                            {kpa.proporsi}%
                          </span>
                        </div>
                        <Progress
                          value={kpa.proporsi}
                          className="h-2"
                          style={
                            {
                              "--progress-background": kpa.color,
                            } as React.CSSProperties
                          }
                        />
                      </div>

                      {/* Simpanan */}
                      <div className="mb-4 p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Banknote className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-semibold">Simpanan</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground block">Pokok</span>
                            <span className="font-semibold text-foreground">{kpa.simpananPokok}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Wajib</span>
                            <span className="font-semibold text-foreground">{kpa.simpananWajib}</span>
                          </div>
                        </div>
                      </div>

                      {/* Manfaat */}
                      <div className="mb-4">
                        <span className="text-sm font-medium text-muted-foreground mb-2 block">
                          Manfaat Utama
                        </span>
                        <ul className="space-y-1.5">
                          {kpa.manfaat.map((manfaat, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2
                                className={`w-4 h-4 ${kpa.textColor}`}
                                style={{ color: kpa.color }}
                              />
                              {manfaat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Anggota & Notes */}
                      <div className="pt-4 border-t flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">Anggota</span>
                          <p
                            className="font-bold"
                            style={{ color: kpa.color }}
                          >
                            {kpa.anggota}
                          </p>
                        </div>
                        {(kpa.note || kpa.note1) && (
                          <div className="flex flex-col gap-1 items-end">
                            {kpa.note && (
                              <Badge
                                variant="outline"
                                className="text-xs border-current"
                                style={{ color: kpa.color }}
                              >
                                {kpa.note}
                              </Badge>
                            )}
                            {kpa.note1 && (
                              <Badge
                                variant="destructive"
                                className="text-xs"
                              >
                                {kpa.note1}
                              </Badge>
                            )}
                            {kpa.note2 && (
                              <Badge
                                variant="secondary"
                                className="text-xs"
                              >
                                {kpa.note2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Voting Power Distribution Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Vote className="w-3 h-3 mr-1" />
              Pentagon Kedaulatan
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Distribusi Kekuatan Suara
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sistem voting adil dan demokratis — 5 KPA, masing-masing 20% suara
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Pentagon Kedaulatan — 20% per KPA</CardTitle>
                  <CardDescription>
                    Proporsi voting power yang seimbang dalam RAT
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {kpaData.map((kpa) => (
                    <motion.div
                      key={kpa.id}
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: kpa.id * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: kpa.color }}
                        />
                        <span className="font-medium text-sm">{kpa.name}</span>
                        <span
                          className="ml-auto font-bold"
                          style={{ color: kpa.color }}
                        >
                          {kpa.proporsi}%
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: kpa.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${kpa.proporsi}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: kpa.id * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Explanation Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Card className="p-6 border-l-4 border-l-yellow-500">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">Prinsip Pentagon Kedaulatan</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    Dalam model{" "}
                    <span className="font-semibold text-foreground">
                      Pentagon Kedaulatan
                    </span>
                    , setiap KPA mendapat proporsi suara yang sama —{" "}
                    <span className="font-bold" style={{ color: "#f59e0b" }}>20% masing-masing</span>.
                    Ini memastikan tidak ada dominasi dan keputusan diambil secara konsensual.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">Prinsip 1 Anggota = 1 Suara</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    Dalam setiap KPA, berlaku prinsip{" "}
                    <span className="font-semibold text-foreground">
                      1 anggota = 1 suara
                    </span>
                    . Ini memastikan kesetaraan dalam proses pengambilan keputusan
                    internal masing-masing KPA. Doktrin Anti-Oligarki berlaku untuk semua level.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">Mekanisme Delegasi</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    Setiap KPA memilih delegasi yang akan mewakili suara kolektif
                    mereka dalam RAT. Dengan 5 KPA masing-masing 20%, keputusan
                    membutuhkan minimal 3 KPA setuju (60% mayoritas).
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-l-4 border-l-primary">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">Pengambilan Keputusan</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Keputusan biasa: mayoritas suara (3+ KPA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Perubahan AD/ART: 2/3 suara (4 KPA)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Likuidasi: 3/4 suara (4-5 KPA)
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Investor TIDAK punya hak veto
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Perbandingan Manfaat
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Benefit per KPA Pentagon Kedaulatan
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bandingkan manfaat, simpanan, dan keuntungan dari setiap kelompok anggota
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold">KPA</TableHead>
                      <TableHead className="font-bold">Suara</TableHead>
                      <TableHead className="font-bold">Simpanan Pokok</TableHead>
                      <TableHead className="font-bold">Simpanan Wajib</TableHead>
                      <TableHead className="font-bold">Manfaat Utama</TableHead>
                      <TableHead className="font-bold">SHU</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kpaData.map((kpa) => {
                      const IconComponent = kpa.icon;
                      return (
                        <TableRow key={kpa.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: kpa.color }}
                              />
                              <div>
                                <span className="font-medium">{kpa.name}</span>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <IconComponent className="w-3 h-3" />
                                  {kpa.anggota}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className="font-bold"
                              style={{ color: kpa.color }}
                            >
                              {kpa.proporsi}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">{kpa.simpananPokok}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{kpa.simpananWajib}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{kpa.manfaat[0]}</span>
                          </TableCell>
                          <TableCell>
                            <CheckCircle2
                              className="w-5 h-5 text-green-500"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <UserPlus className="w-3 h-3 mr-1" />
              Cara Bergabung
            </Badge>
            <h2 className="text-responsive-title font-bold mb-4">
              Langkah Menjadi Anggota
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Pilih KPA yang sesuai dengan profil Anda dan ikuti langkah-langkah berikut
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
              <Card className="h-full p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Proses Umum Pendaftaran</CardTitle>
                  <CardDescription>
                    Langkah-langkah untuk menjadi anggota KNMP
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Pilih KPA",
                        desc: "Tentukan KPA yang sesuai dengan aktivitas Anda dari 5 KPA Pentagon Kedaulatan",
                      },
                      {
                        step: 2,
                        title: "Submit Dokumen",
                        desc: "Unggah dokumen persyaratan sesuai KPA yang dipilih",
                      },
                      {
                        step: 3,
                        title: "Verifikasi",
                        desc: "Tim KNMP akan memverifikasi data Anda",
                      },
                      {
                        step: 4,
                        title: "Bayar Simpanan",
                        desc: "Lakukan pembayaran simpanan pokok & wajib pertama",
                      },
                      {
                        step: 5,
                        title: "Aktivasi",
                        desc: "Akun Anda aktif dan siap digunakan — Selamat bergabung!",
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
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements per KPA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle>Persyaratan per KPA Pentagon Kedaulatan</CardTitle>
                  <CardDescription>
                    Dokumen yang diperlukan untuk setiap KPA
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
                    {kpaData.map((kpa) => {
                      const IconComponent = kpa.icon;
                      return (
                        <motion.div
                          key={kpa.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-lg border ${kpa.lightBg} border-l-4`}
                          style={{ borderLeftColor: kpa.color }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent
                              className="w-5 h-5"
                              style={{ color: kpa.color }}
                            />
                            <span className="font-semibold">{kpa.name}</span>
                          </div>
                          <ul className="space-y-1">
                            {kpa.requirements.map((req, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: kpa.color }}
                                />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Butuh Bantuan?</h3>
                  <p className="text-muted-foreground">
                    Hubungi tim membership kami untuk konsultasi pemilihan KPA yang tepat dalam Pentagon Kedaulatan
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline">
                    <span>📞 021-1234-5678</span>
                  </Button>
                  <Button>
                    <span>✉️ membership@knmp.co.id</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            >
              Bergabung Bersama Kami
            </Badge>
            <h2 className="text-responsive-title font-bold text-white mb-6">
              Temukan Tempatmu di{" "}
              <span className="text-gradient-gold">5 KPA Pentagon Kedaulatan</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Jadilah bagian dari ekosistem koperasi multipihak terbesar di Indonesia
            </p>

            {/* CTA Buttons per KPA */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {kpaData.map((kpa) => {
                const IconComponent = kpa.icon;
                return (
                  <motion.div
                    key={kpa.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <IconComponent
                        className="w-4 h-4 mr-2"
                        style={{ color: kpa.color }}
                      />
                      {kpa.name}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: "200.500+", label: "Total Anggota" },
                { value: "34", label: "Provinsi" },
                { value: "5", label: "KPA Pentagon Kedaulatan" },
                { value: "100%", label: "Demokratis (20%×5)" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gradient-gold">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
