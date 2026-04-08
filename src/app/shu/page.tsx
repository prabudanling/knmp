'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  TrendingUp,
  PieChart,
  Users,
  Calendar,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ChevronDown,
  AlertTriangle,
  Shield,
  Target,
  Gavel,
  Ban,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SHU_BREAKDOWN, KPA_DATA } from '@/data/mocks'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function SHUPage() {
  const shuData = SHU_BREAKDOWN

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection data={shuData} />
        <BreakdownSection data={shuData} />
        <HardCapKPISection />
        <DistributionSection />
        <TransparencySection />
        <CTASection />
      </div>
    </main>
  )
}

// =====================
// Hero Section
// =====================
function HeroSection({ data }: { data: typeof SHU_BREAKDOWN }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
          <Eye className="w-4 h-4 mr-2" />
          Formula Distribusi Ekuilibrium — AD Pasal 21 Versi 7
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          SHU <span className="text-[#8B0000]">Transparansi</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Setiap rupiah terlacak dan terverifikasi. Formula distribusi ekuilibrium 100% sesuai AD/ART Versi 7.
        </p>
      </motion.div>

      {/* Main SHU Card */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gradient-to-br from-amber-100 via-amber-50 to-white border-amber-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full -mr-32 -mt-32" />
          <CardContent className="p-8 md:p-12 relative">
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-2">Total SHU Tahun {data.year}</p>
              <p className="text-5xl md:text-6xl font-bold text-[#8B0000]">
                Rp {(data.totalSHU / 1000000000).toFixed(1)} Miliar
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Badge className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +23.5% dari tahun lalu
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/70 rounded-xl p-4 text-center border border-amber-200">
                <p className="text-sm text-muted-foreground mb-1">Jasa Usaha Anggota</p>
                <p className="text-2xl font-bold text-[#8B0000]">
                  Rp {(data.breakdown.jasaUsaha / 1000000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">45% dari SHU</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4 text-center border border-amber-200">
                <p className="text-sm text-muted-foreground mb-1">Dana Cadangan</p>
                <p className="text-2xl font-bold text-amber-700">
                  Rp {(data.breakdown.danaCadangan / 1000000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">25% dari SHU</p>
              </div>
              <div className="bg-white/70 rounded-xl p-4 text-center border border-amber-200">
                <p className="text-sm text-muted-foreground mb-1">Jasa Modal Anggota</p>
                <p className="text-2xl font-bold text-green-700">
                  Rp {(data.breakdown.jasaModal / 1000000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">Maks. 10% dari SHU</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}

// =====================
// Breakdown Section
// =====================
function BreakdownSection({ data }: { data: typeof SHU_BREAKDOWN }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const items = [
    { label: 'Dana Cadangan', value: data.breakdown.danaCadangan, percent: 25, color: '#8B0000', desc: 'Mitigasi risiko dan pembesaran aset' },
    { label: 'Jasa Usaha Anggota', value: data.breakdown.jasaUsaha, percent: 45, color: '#22c55e', desc: 'Berdasarkan partisipasi transaksi di platform' },
    { label: 'Jasa Modal Anggota (Maks. 10%)', value: data.breakdown.jasaModal, percent: 10, color: '#008F3D', desc: 'Hard-cap untuk mencegah karakter kapitalistik' },
    { label: 'Dana Riset & Teknologi', value: data.breakdown.danaRisetTeknologi, percent: 10, color: '#3b82f6', desc: 'Pengembangan AI dan pemeliharaan server' },
    { label: 'Dana Sosial & Peradaban', value: data.breakdown.danaSosialPeradaban, percent: 5, color: '#ec4899', desc: 'Dampak lingkungan dan kemanusiaan' },
    { label: 'Insentif Manajemen (Maks. 5%)', value: data.breakdown.insentifManajemen, percent: 5, color: '#f59e0b', desc: 'Hanya cair jika memenuhi Hard-Cap KPI' },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Pembagian <span className="text-[#8B0000]">SHU</span> — Formula Distribusi Ekuilibrium
        </h2>
        <p className="text-muted-foreground">
          Komposisi pembagian SHU sesuai AD Pasal 21 — AD/ART KNMP Versi 7
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="bg-white border border-amber-100">
          <CardContent className="p-6">
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-foreground">
                        Rp {(item.value / 1000000000).toFixed(1)}M
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">({item.percent}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.percent}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}

// =====================
// Hard-Cap KPI Section (ART Pasal 11)
// =====================
function HardCapKPISection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const kpis = [
    {
      icon: Users,
      title: 'Pertumbuhan Anggota Aktif',
      value: '≥ 15%/tahun',
      description: 'Jumlah anggota aktif harus tumbuh minimal 15% setiap tahun.',
      color: '#22c55e',
    },
    {
      icon: Shield,
      title: 'Zero Fraud',
      value: '0 Kecurangan Material',
      description: 'Tidak boleh ada kecurangan material yang terdeteksi selama periode audit.',
      color: '#8B0000',
    },
    {
      icon: Gavel,
      title: 'Opini Audit WTP',
      value: 'Wajar Tanpa Pengecualian',
      description: 'Laporan keuangan harus mendapat opini "Wajar Tanpa Pengecualian" (WTP) dari auditor independen.',
      color: '#3b82f6',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <Badge className="bg-red-100 text-red-700 border-red-200 mb-2">
          <AlertTriangle className="w-4 h-4 mr-1" />
          ART Pasal 11
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Hard-Cap KPI <span className="text-[#8B0000]">Insentif Manajemen</span>
        </h2>
        <p className="text-muted-foreground">
          Insentif Manajemen (maks. 5%) hanya dicairkan jika seluruh KPI terpenuhi. Jika gagal, bonus 5% DIRAMPAS → Dana Cadangan.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="h-full border border-red-100 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}15` }}
                  >
                    <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{kpi.title}</h3>
                    <p className="text-xs font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp}>
        <Card className="border-l-4 border-l-red-600 bg-red-50/50">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Ban className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground mb-1">Sanksi: Bonus DIRAMPAS</h3>
                <p className="text-sm text-muted-foreground">
                  Jika <span className="font-semibold text-foreground">salah satu</span> KPI di atas gagal dipenuhi, maka alokasi Insentif Manajemen (5%) <span className="font-bold text-red-600">DIRAMPAS dan dialihkan ke Dana Cadangan</span>. Mekanisme ini memastikan akuntabilitas penuh pengurus dan pengawas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}

// =====================
// Distribution Section
// =====================
function DistributionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const distribution = SHU_BREAKDOWN.memberDistribution

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Distribusi per <span className="text-[#8B0000]">KPA</span> Pentagon Kedaulatan
        </h2>
        <p className="text-muted-foreground">
          Pembagian jasa usaha berdasarkan 5 Kelompok Pihak Anggota
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {distribution.map((item, i) => {
          const kpa = KPA_DATA.find(k => k.id === item.kpa)
          return (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="h-full bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{kpa?.name || item.kpa}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.memberCount.toLocaleString('id-ID')} anggota
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${kpa?.color}15` || '#f0f0f0' }}
                    >
                      <Users className="w-5 h-5" style={{ color: kpa?.color || '#666' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Jasa Usaha</span>
                      <span className="font-medium text-[#8B0000]">
                        Rp {(item.totalJasaUsaha / 1000000).toFixed(0)}Jt
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Jasa Modal</span>
                      <span className="font-medium text-amber-700">
                        Rp {(item.totalJasaModal / 1000000).toFixed(0)}Jt
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-1 border-t">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-bold text-foreground">
                        Rp {((item.totalJasaUsaha + item.totalJasaModal) / 1000000).toFixed(0)}Jt
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Transparency Section
// =====================
function TransparencySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const features = [
    {
      icon: Eye,
      title: 'Real-time Tracking',
      description: 'Setiap transaksi tercatat secara real-time dan dapat diakses kapan saja.',
    },
    {
      icon: CheckCircle2,
      title: 'Blockchain Verified',
      description: 'Semua data SHU diverifikasi menggunakan teknologi blockchain.',
    },
    {
      icon: Download,
      title: 'Download Report',
      description: 'Unduh laporan SHU dalam format PDF atau Excel kapan saja.',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp}>
        <Card className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-100">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Sistem <span className="text-[#8B0000]">Transparansi</span>
              </h2>
              <p className="text-muted-foreground">
                Bagaimana kami memastikan setiap rupiah terlacak
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center border border-red-100">
                    <feature.icon className="w-7 h-7 text-[#8B0000]" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}

// =====================
// CTA Section
// =====================
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="text-center"
    >
      <Card className="bg-white border border-red-100 max-w-xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Lihat SHU Anda
          </h3>
          <p className="text-muted-foreground mb-6">
            Login untuk melihat estimasi SHU pribadi Anda
          </p>
          <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
            Login Dashboard
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  )
}
