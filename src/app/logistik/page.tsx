'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Truck,
  Wallet,
  Calculator,
  Users,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Package,
  Award,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { LOGISTICS_PARTNERS, SAMPLE_AGENTS } from '@/data/mocks'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

export default function LogistikPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white">
      <HeroSection />
      <PartnersSection />
      <HowItWorksSection />
      <CommissionCalculatorSection />
      <AgentsSection />
      <StatsSection />
      <CTASection />
    </main>
  )
}

// =====================
// Hero Section
// =====================
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-6 px-4 py-2">
              <Truck className="w-4 h-4 mr-2" />
              Jaringan Logistik Terluas Indonesia
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Logistik <span className="text-[#8B0000]">Digital</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
              83.763 Titik Coverage di 38 Provinsi
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Jaringan agen logistik multi-ekspedisi yang menghubungkan desa dengan dunia.
            Dapatkan komisi menarik sambil melayani masyarakat desa.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8"
            >
              Daftar Jadi Agen
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#8B0000] text-[#8B0000] hover:bg-red-50"
            >
              Pelajari Lebih Lanjut
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { value: '83.763', label: 'Agen Aktif', icon: Users },
              { value: '1.25 Juta', label: 'Paket/Bulan', icon: Package },
              { value: '6+', label: 'Partner Ekspedisi', icon: Globe },
              { value: 'Rp8.5M+', label: 'Komisi Dibagikan', icon: Wallet },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all"
              >
                <stat.icon className="w-6 h-6 text-[#8B0000] mx-auto mb-2" />
                <p className="text-2xl font-bold text-[#8B0000]">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =====================
// Partners Section
// =====================
function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const partners = LOGISTICS_PARTNERS

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partner <span className="text-[#8B0000]">Ekspedisi</span> Terpercaya
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
            Terhubung dengan ekspedisi terbaik Indonesia untuk pengiriman cepat dan aman
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              variants={scaleIn}
              className="group"
            >
              <Card className="h-full bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-50 to-amber-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-[#8B0000]" />
                  </div>
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {partner.type}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// =====================
// How It Works Section
// =====================
function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      step: 1,
      title: 'Daftar Jadi Agen',
      description: 'Daftar online via aplikasi KNMP. Verifikasi data diri dan lokasi usaha.',
      icon: Users,
      color: '#8B0000',
    },
    {
      step: 2,
      title: 'Aktivasi & Training',
      description: 'Ikuti pelatihan gratis selama 10 jam. Dapatkan sertifikat agen resmi.',
      icon: Award,
      color: '#008F3D',
    },
    {
      step: 3,
      title: 'Terima Paket',
      description: 'Warga desa datang ke lokasi Anda untuk mengirim paket.',
      icon: Package,
      color: '#22c55e',
    },
    {
      step: 4,
      title: 'Proses & Kirim',
      description: 'Proses paket via partner ekspedisi pilihan pelanggan.',
      icon: Truck,
      color: '#3b82f6',
    },
    {
      step: 5,
      title: 'Dapat Komisi',
      description: 'Komisi otomatis masuk ke dompet digital Anda per paket.',
      icon: Wallet,
      color: '#8b5cf6',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cara <span className="text-[#8B0000]">Kerja</span> Menjadi Agen
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
            Lima langkah mudah untuk memulai bisnis logistik desa Anda
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-200 hidden lg:block" />

          <div className="space-y-8">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={cn(
                  'relative lg:w-1/2',
                  index % 2 === 0 ? 'lg:pr-12 lg:ml-0' : 'lg:pl-12 lg:ml-auto'
                )}
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    'absolute top-6 w-4 h-4 rounded-full border-2 border-white hidden lg:block',
                    index % 2 === 0 ? 'right-0 -mr-2' : 'left-0 -ml-2'
                  )}
                  style={{ backgroundColor: item.color }}
                />

                <Card className="bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon className="w-7 h-7" style={{ color: item.color }} />
                      </div>
                      <div>
                        <Badge className="mb-2" style={{ backgroundColor: item.color }}>
                          Langkah {item.step}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
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

// =====================
// Commission Calculator Section
// =====================
function CommissionCalculatorSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [packages, setPackages] = useState(10)

  const commissionPerPackage = 2500 // Average
  const monthlyCommission = packages * commissionPerPackage * 30

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Kalkulator Interaktif
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Estimasi <span className="text-[#8B0000]">Penghasilan</span> Anda
            </h2>
            <p className="text-muted-foreground">
              Hitung potensi penghasilan Anda sebagai agen logistik KNMP
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-100">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-foreground">
                  Kalkulator Komisi
                </CardTitle>
                <CardDescription className="text-center">
                  Geser slider untuk menghitung estimasi penghasilan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-foreground font-medium">
                      Paket per hari
                    </Label>
                    <span className="text-2xl font-bold text-[#8B0000]">
                      {packages} paket
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={packages}
                    onChange={(e) => setPackages(Number(e.target.value))}
                    className="w-full h-3 bg-red-100 rounded-lg appearance-none cursor-pointer accent-[#8B0000]"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 paket</span>
                    <span>50 paket</span>
                  </div>
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center border border-red-100">
                    <p className="text-sm text-muted-foreground mb-1">Komisi per paket</p>
                    <p className="text-xl font-bold text-foreground">
                      Rp {commissionPerPackage.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center border border-red-100">
                    <p className="text-sm text-muted-foreground mb-1">Paket per bulan</p>
                    <p className="text-xl font-bold text-foreground">
                      {(packages * 30).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-xl p-4 text-center text-white">
                    <p className="text-sm opacity-80 mb-1">Estimasi per bulan</p>
                    <p className="text-2xl font-bold">
                      Rp {monthlyCommission.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Bonus Tambahan</p>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan bonus tambahan hingga 20% untuk pengiriman ke daerah terpencil!
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white"
                >
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// =====================
// Agents Section
// =====================
function AgentsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const agents = SAMPLE_AGENTS

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Agen <span className="text-[#8B0000]">Terbaik</span> Kami
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
            Temui para agen logistik yang sudah sukses bergabung dengan KNMP
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {agents.map((agent) => (
            <motion.div key={agent.id} variants={fadeInUp}>
              <Card className="h-full bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center">
                      <Users className="w-7 h-7 text-[#8B0000]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.village}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium">{agent.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Paket</span>
                      <span className="font-medium text-foreground">
                        {agent.totalPackages.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Komisi</span>
                      <span className="font-medium text-[#8B0000]">
                        Rp {agent.totalCommission.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {agent.partnerExpeditions.slice(0, 3).map((exp, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// =====================
// Stats Section
// =====================
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { value: '83.763', label: 'Agen Logistik', icon: Users },
    { value: '1.25 Juta', label: 'Paket Terkirim/Bulan', icon: Package },
    { value: 'Rp8.5M+', label: 'Komisi Dibagikan', icon: Wallet },
    { value: '4.8', label: 'Rating Rata-rata', icon: Star },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-red-100 to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <stat.icon className="w-8 h-8 text-[#8B0000]" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-[#8B0000] mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// =====================
// CTA Section
// =====================
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-red-50 via-white to-amber-50 rounded-3xl p-8 md:p-12 border border-red-100 text-center"
          >
            <Badge className="bg-[#8B0000] text-white mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Mulai Sekarang
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Jadilah Bagian dari
              <br />
              <span className="text-[#8B0000]">Jaringan Logistik Terluas</span>
            </h2>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Daftar sebagai agen logistik KNMP dan dapatkan penghasilan tambahan
              sambil melayani masyarakat desa Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8"
              >
                <Phone className="mr-2 w-5 h-5" />
                Hubungi Kami
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#8B0000] text-[#8B0000] hover:bg-red-50"
              >
                <Mail className="mr-2 w-5 h-5" />
                Kirim Email
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-red-100">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#8B0000]" />
                  <span>Terdaftar Resmi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B0000]" />
                  <span>Training Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#8B0000]" />
                  <span>Penghasilan Stabil</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
