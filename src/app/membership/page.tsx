'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Crown,
  Check,
  X,
  Star,
  Users,
  Building,
  Globe,
  Landmark,
  Rocket,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Shield,
  Vote,
  Wallet,
  Truck,
  GraduationCap,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// 7 Tier Membership Data based on JE-P3 documents
const TIERS = [
  {
    id: 1,
    name: 'Tier 1',
    title: 'Digital Citizen',
    subtitle: 'Warga Digital',
    price: 0,
    originalPrice: 0,
    color: '#6b7280',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: Users,
    description: 'Pintu masuk ke ekosistem JE-P3. Gratis selamanya.',
    benefits: [
      { text: 'Kartu Anggota Digital (Blockchain Passport)', included: true },
      { text: 'Akses JE-P3 Academy Tingkat 1', included: true },
      { text: 'Akses Marketplace Basic', included: true },
      { text: 'Profil Direktori Pengusaha', included: false },
      { text: 'Prioritas Pelatihan', included: false },
      { text: 'Hak Prioritas Kemitraan Wilayah', included: false },
      { text: 'Hak Usaha Operasional KNMP', included: false },
      { text: 'Hak Suara di Munas', included: false },
    ],
    cta: 'Daftar Gratis',
    popular: false,
  },
  {
    id: 2,
    name: 'Tier 2',
    title: 'Basic Member',
    subtitle: 'Anggota Dasar',
    price: 250000,
    originalPrice: 1000000,
    color: '#059669',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: BadgeCheck,
    description: 'Anggota resmi JE-P3 dengan hak suara di Munas.',
    benefits: [
      { text: 'Kartu Anggota Digital (Blockchain Passport)', included: true },
      { text: 'Akses JE-P3 Academy Tingkat 1', included: true },
      { text: 'Akses Marketplace Basic', included: true },
      { text: 'Profil Direktori Pengusaha', included: true },
      { text: 'Prioritas Pelatihan Batch Awal', included: true },
      { text: 'Hak Suara di Munas', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah', included: false },
      { text: 'Hak Usaha Operasional KNMP', included: false },
    ],
    cta: 'Daftar Sekarang',
    popular: true,
  },
  {
    id: 3,
    name: 'Tier 3',
    title: 'Village Partner',
    subtitle: 'Mitra Desa',
    price: 2500000,
    originalPrice: 10000000,
    color: '#0284c7',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    icon: Building,
    description: 'Hak usaha logistik + prioritas kemitraan tingkat desa.',
    benefits: [
      { text: 'Semua benefit Tier 2', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah (Desa)', included: true },
      { text: 'Hak Usaha Operasional via KNMP', included: true },
      { text: 'Agen Logistik (J&T, JNE, SiCepat, dll)', included: true },
      { text: 'Dashboard Agen Realtime', included: true },
      { text: 'Pelatihan Operasional Gratis', included: true },
      { text: 'Hak SHU dari Koperasi KNMP', included: true },
      { text: 'Hak Suara RAT KNMP', included: true },
    ],
    cta: 'Daftar Sekarang',
    popular: false,
  },
  {
    id: 4,
    name: 'Tier 4',
    title: 'District Partner',
    subtitle: 'Mitra Kecamatan',
    price: 10000000,
    originalPrice: 40000000,
    color: '#7c3aed',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    icon: Landmark,
    description: 'Eksklusivitas kemitraan tingkat kecamatan.',
    benefits: [
      { text: 'Semua benefit Tier 3', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah (Kecamatan)', included: true },
      { text: 'Koordinator Agen di Kecamatan', included: true },
      { text: 'Revenue Sharing dari Network Agen', included: true },
      { text: 'Konsultasi Bisnis 1-on-1', included: true },
      { text: 'Prioritas Ekspansi Unit Usaha', included: true },
      { text: 'Akses Dewan Nasional JE-P3', included: false },
      { text: 'MoU Partnership Prioritas', included: true },
    ],
    cta: 'Daftar Sekarang',
    popular: false,
  },
  {
    id: 5,
    name: 'Tier 5',
    title: 'Regency Partner',
    subtitle: 'Mitra Kabupaten',
    price: 15000000,
    originalPrice: 60000000,
    color: '#db2777',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    icon: Sparkles,
    description: 'Eksklusivitas kemitraan tingkat kabupaten/kota.',
    benefits: [
      { text: 'Semua benefit Tier 4', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah (Kabupaten)', included: true },
      { text: 'Master Koordinator Kabupaten', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Prioritas Proyek Pemerintah', included: true },
      { text: 'Franchise First-Right', included: true },
      { text: 'Akses Dewan Nasional JE-P3', included: false },
      { text: 'Priority Investment Round', included: true },
    ],
    cta: 'Hubungi Kami',
    popular: false,
  },
  {
    id: 6,
    name: 'Tier 6',
    title: 'Provincial Partner',
    subtitle: 'Mitra Provinsi',
    price: 100000000,
    originalPrice: 400000000,
    color: '#D4AF37',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    icon: Crown,
    description: 'Eksklusivitas kemitraan tingkat provinsi.',
    benefits: [
      { text: 'Semua benefit Tier 5', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah (Provinsi)', included: true },
      { text: 'Regional Director Status', included: true },
      { text: 'Akses Dewan Nasional JE-P3', included: true },
      { text: 'Board Observer Rights', included: true },
      { text: 'Equity Participation Option', included: true },
      { text: 'International Mission Priority', included: true },
      { text: 'White-Label Platform Option', included: true },
    ],
    cta: 'Hubungi Kami',
    popular: false,
  },
  {
    id: 7,
    name: 'Tier 7',
    title: 'National Partner',
    subtitle: 'Mitra Nasional',
    price: 1000000000,
    originalPrice: 4000000000,
    color: '#8B0000',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    icon: Rocket,
    description: 'Partner level tertinggi dengan hak veto terbatas.',
    benefits: [
      { text: 'Semua benefit Tier 6', included: true },
      { text: 'Hak Prioritas Kemitraan (Nasional)', included: true },
      { text: 'National Director Status', included: true },
      { text: 'Board of Directors Seat', included: true },
      { text: 'Strategic Committee Member', included: true },
      { text: 'Equity Stake Guaranteed', included: true },
      { text: 'Hak Veto Terbatas (Strategic)', included: true },
      { text: 'ICA Delegation Priority', included: true },
    ],
    cta: 'Hubungi Founder',
    popular: false,
  },
]

const formatPrice = (price: number) => {
  if (price === 0) return 'Gratis'
  if (price >= 1000000000) return `Rp${(price / 1000000000).toFixed(0)} Miliar`
  if (price >= 1000000) return `Rp${(price / 1000000).toFixed(0)} Juta`
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <TierComparisonSection />
        <TierCardsSection />
        <BenefitsSection />
        <FAQSection />
        <CTASection />
      </div>
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
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-16 text-center"
    >
      <motion.div variants={fadeInUp}>
        <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
          <Crown className="w-4 h-4 mr-2" />
          7-Tier Membership System
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Pilih <span className="text-[#8B0000]">Tier</span> Keanggotaan
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto mb-6"
      >
        Dari Warga Digital gratis hingga Mitra Nasional eksklusif. Setiap tier membuka akses ke ekosistem JE-P3 × KNMP yang berbeda.
      </motion.p>
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap justify-center gap-4 text-sm"
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Badan Hukum Resmi</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Vote className="w-4 h-4 text-blue-500" />
          <span>Hak Suara Demokratis</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wallet className="w-4 h-4 text-amber-500" />
          <span>Hak SHU Koperasi</span>
        </div>
      </motion.div>
    </motion.section>
  )
}

// =====================
// Tier Comparison Section
// =====================
function TierComparisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const keyBenefits = [
    'Kartu Digital',
    'Academy T1',
    'Marketplace',
    'Direktori',
    'Hak Suara',
    'Hak Usaha',
    'HPKW Desa',
    'HPKW Kecamatan',
    'HPKW Kabupaten',
    'HPKW Provinsi',
    'HPKW Nasional',
    'Akses Dewan',
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-16"
    >
      <Card className="bg-white border border-red-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 to-amber-50">
          <CardTitle className="flex items-center justify-between">
            <span>Perbandingan <span className="text-[#8B0000]">Tier</span></span>
          </CardTitle>
          <CardDescription>Fitur utama yang tersedia di setiap tier</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 text-left font-medium text-muted-foreground">Benefit</th>
                  {TIERS.map((tier) => (
                    <th key={tier.id} className="p-4 text-center">
                      <div className="flex flex-col items-center">
                        <tier.icon className="w-5 h-5 mb-1" style={{ color: tier.color }} />
                        <span className="font-semibold text-sm">{tier.name}</span>
                        <span className="text-xs text-muted-foreground">{tier.subtitle}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keyBenefits.map((benefit, i) => (
                  <tr
                    key={benefit}
                    className={cn(
                      'border-b',
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    )}
                  >
                    <td className="p-4 font-medium text-sm">{benefit}</td>
                    {TIERS.map((tier) => {
                      const hasBenefit = 
                        (benefit === 'Kartu Digital' && tier.id >= 1) ||
                        (benefit === 'Academy T1' && tier.id >= 1) ||
                        (benefit === 'Marketplace' && tier.id >= 1) ||
                        (benefit === 'Direktori' && tier.id >= 2) ||
                        (benefit === 'Hak Suara' && tier.id >= 2) ||
                        (benefit === 'Hak Usaha' && tier.id >= 3) ||
                        (benefit === 'HPKW Desa' && tier.id >= 3) ||
                        (benefit === 'HPKW Kecamatan' && tier.id >= 4) ||
                        (benefit === 'HPKW Kabupaten' && tier.id >= 5) ||
                        (benefit === 'HPKW Provinsi' && tier.id >= 6) ||
                        (benefit === 'HPKW Nasional' && tier.id >= 7) ||
                        (benefit === 'Akses Dewan' && tier.id >= 6)

                      return (
                        <td key={tier.id} className="p-4 text-center">
                          {hasBenefit ? (
                            <Check className="w-5 h-5 mx-auto text-green-500" />
                          ) : (
                            <X className="w-5 h-5 mx-auto text-gray-300" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// Tier Cards Section
// =====================
function TierCardsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-16"
    >
      <motion.div variants={fadeInUp} className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Detail <span className="text-[#8B0000]">Tier</span>
        </h2>
        <p className="text-muted-foreground">
          Pilih tier yang sesuai dengan kebutuhan dan kapasitas Anda
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {TIERS.map((tier) => (
          <motion.div key={tier.id} variants={fadeInUp}>
            <Card
              className={cn(
                'h-full relative overflow-hidden transition-all hover:shadow-xl',
                tier.popular ? 'ring-2 ring-[#8B0000] ring-offset-2' : '',
                tier.borderColor
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-[#8B0000] text-white rounded-none rounded-bl-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Populer
                  </Badge>
                </div>
              )}

              <CardHeader className={cn('pb-2', tier.bgColor)}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${tier.color}20` }}
                  >
                    <tier.icon className="w-6 h-6" style={{ color: tier.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <CardDescription className="font-medium" style={{ color: tier.color }}>
                      {tier.title}
                    </CardDescription>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{tier.subtitle}</p>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="mb-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold" style={{ color: tier.color }}>
                      {formatPrice(tier.price)}
                    </span>
                    {tier.originalPrice > tier.price && tier.price > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(tier.originalPrice)}
                      </span>
                    )}
                  </div>
                  {tier.originalPrice > tier.price && tier.price > 0 && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Hemat 75%
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>

                <ul className="space-y-2">
                  {tier.benefits.slice(0, 5).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {benefit.included ? (
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={benefit.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {benefit.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  className={cn(
                    'w-full',
                    tier.popular
                      ? 'bg-[#8B0000] hover:bg-[#6B0000] text-white'
                      : tier.id >= 6
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : ''
                  )}
                  variant={tier.popular || tier.id >= 6 ? 'default' : 'outline'}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Benefits Section
// =====================
function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const benefits = [
    {
      icon: GraduationCap,
      title: 'JE-P3 Academy',
      description: 'Pelatihan digital gratis untuk semua anggota. 3 tingkat: Literasi, Bisnis, Ekspor.',
    },
    {
      icon: Truck,
      title: 'Hak Usaha Logistik',
      description: 'Jadi agen resmi J&T, JNE, SiCepat di bawah payung KNMP. Revenue harian.',
    },
    {
      icon: Wallet,
      title: 'Hak SHU Koperasi',
      description: 'Bagi hasil tahunan dari koperasi. 40% SHU untuk anggota (Tier 3+).',
    },
    {
      icon: Vote,
      title: 'Hak Suara Demokratis',
      description: '1 anggota = 1 suara. Pilih pengurus, tentukan kebijakan di RAT.',
    },
    {
      icon: Globe,
      title: 'Jaringan Nasional',
      description: 'Terhubung dengan 83.763 desa dan 195 negara target pasar global.',
    },
    {
      icon: Shield,
      title: '100% Legal & Terdaftar',
      description: 'JE-P3 Asosiasi + KNMP Koperasi. Badan hukum resmi, blockchain verified.',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-16"
    >
      <motion.div variants={fadeInUp} className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Keuntungan <span className="text-[#8B0000]">Keanggotaan</span>
        </h2>
        <p className="text-muted-foreground">
          Benefit yang Anda dapatkan sebagai bagian dari ekosistem JE-P3 × KNMP
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((benefit, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="h-full bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// FAQ Section
// =====================
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Apa perbedaan JE-P3 dan KNMP?',
      answer:
        'JE-P3 adalah asosiasi pengusaha (nirlaba) yang fokus pada narasi, branding, dan investor relations. KNMP adalah koperasi multipihak yang menjalankan operasional usaha (logistik, marketplace, fintech). Tier 1-2 adalah keanggotaan asosiasi murni. Tier 3+ membuka akses ke operasional KNMP.',
    },
    {
      question: 'Kapan saya mendapat hak usaha logistik?',
      answer:
        'Hak usaha logistik (agen J&T, JNE, SiCepat, dll) tersedia untuk Tier 3 ke atas, setelah KNMP berbadan hukum dan MoU dengan ekspedisi ditandatangani. Estimasi: Q2-Q3 2026.',
    },
    {
      question: 'Bagaimana cara pembayaran membership?',
      answer:
        'Pembayaran melalui daftar.pppbisnis.com dengan DP 5% dari harga tier, lalu pelunasan dalam deadline yang ditentukan. 20+ metode pembayaran via Midtrans (transfer, kartu kredit, e-wallet).',
    },
    {
      question: 'Apakah ada garansi uang kembali?',
      answer:
        'Ya, garansi uang kembali 100% dalam 14 hari jika belum ada aktivitas pelatihan atau akses platform yang signifikan. Setelah itu, keanggotaan bersifat final.',
    },
    {
      question: 'Bagaimana sistem voting di RAT KNMP?',
      answer:
        'Setiap anggota memiliki 1 suara dalam internal KPA. Hasil voting KPA diperhitungkan berdasarkan proporsi: Petani 30%, Pengusaha 20%, Koperasi/BUMDes 20%, Pekerja 10%, Konsumen 10%, Investor 10%. Investor tidak punya hak veto.',
    },
    {
      question: 'Apa itu HPKW (Hak Prioritas Kemitraan Wilayah)?',
      answer:
        'HPKW memberikan prioritas eksklusif untuk menjadi koordinator/mitra utama JE-P3 dan KNMP di wilayah tertentu (desa/kecamatan/kabupaten/provinsi/nasional). Ini berarti prioritas dalam pembukaan unit usaha, koordinasi agen, dan akses proyek pemerintah di wilayah tersebut.',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-16"
    >
      <Card className="bg-white border border-red-100">
        <CardHeader>
          <CardTitle>
            Pertanyaan <span className="text-[#8B0000]">Umum</span>
          </CardTitle>
          <CardDescription>Jawaban untuk pertanyaan yang sering diajukan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-red-100 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full p-4 flex items-center justify-between bg-red-50/50 hover:bg-red-50 transition-colors text-left"
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-[#8B0000] transition-transform',
                    openFAQ === i && 'rotate-180'
                  )}
                />
              </button>
              {openFAQ === i && (
                <div className="p-4 bg-white">
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
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
      <Card className="bg-gradient-to-br from-red-50 via-white to-amber-50 border border-red-200 max-w-3xl mx-auto">
        <CardContent className="p-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#8B0000] to-[#D4AF37] rounded-2xl flex items-center justify-center">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Siap Bergabung dengan Ekosistem?
          </h3>
          <p className="text-muted-foreground mb-6">
            Daftar sekarang dan jadi bagian dari 83.763 desa yang terhubung dengan 195 negara. 
            Early bird discount 75% masih berlaku.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
              Daftar Sekarang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
              Hubungi Kami
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
