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
  Leaf,
  Percent,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// Tier Colors - Sesuai spesifikasi user
const tierColors: Record<number, { main: string; soft: string; gradient: string }> = {
  1: { main: '#6B7280', soft: 'rgba(107, 114, 128, 0.10)', gradient: 'from-gray-500 to-gray-700' },
  2: { main: '#10B981', soft: 'rgba(16, 185, 129, 0.10)', gradient: 'from-emerald-500 to-emerald-700' },
  3: { main: '#0EA5E9', soft: 'rgba(14, 165, 233, 0.10)', gradient: 'from-sky-500 to-sky-700' },
  4: { main: '#7C3AED', soft: 'rgba(124, 58, 237, 0.10)', gradient: 'from-violet-500 to-violet-700' },
  5: { main: '#DB2777', soft: 'rgba(219, 39, 119, 0.10)', gradient: 'from-pink-500 to-pink-700' },
  6: { main: '#B7791F', soft: 'rgba(183, 121, 31, 0.12)', gradient: 'from-amber-500 to-amber-700' },
  7: { main: '#C81E1E', soft: 'rgba(200, 30, 30, 0.10)', gradient: 'from-red-600 to-red-800' },
}

// 7 Tier Membership Data - HARGA SESUAI MEMBERSHIP PAGE ASLI
// Discount: Harga Normal → Harga Early Bird (75% off) → Promo Maret 2026 (95% off dari harga normal)
const TIERS = [
  {
    id: 1,
    name: 'PETANI',
    title: 'Petani Koperasi',
    subtitle: 'Tier 1 - Gratis',
    normalPrice: 0,           // Harga normal
    earlyBirdPrice: 0,        // Harga early bird (75% off)
    promoPrice: 0,            // Promo Maret 2026 (95% off)
    discountPercent: 0,
    color: tierColors[1].main,
    softColor: tierColors[1].soft,
    gradient: tierColors[1].gradient,
    icon: Leaf,
    description: 'Petani - Gratis bergabung dengan syarat KTP dan foto kebun.',
    benefits: [
      { text: 'Kartu Anggota Digital (Blockchain Passport)', included: true },
      { text: 'Akses JE-P3 Academy Tingkat 1', included: true },
      { text: 'Akses Marketplace Basic', included: true },
      { text: 'Hak SHU dari Hasil Panen', included: true },
      { text: 'Gratis selamanya', included: true },
      { text: 'Profil Direktori Pengusaha', included: false },
      { text: 'Hak Suara di Munas', included: false },
      { text: 'Hak Prioritas Kemitraan Wilayah', included: false },
    ],
    specialRequirement: 'Wajib upload KTP dan foto kebun/pertanian',
    cta: 'Daftar Gratis',
    popular: false,
    isFree: true,
  },
  {
    id: 2,
    name: 'ANGGOTA BIASA',
    title: 'Anggota Koperasi',
    subtitle: 'Tier 2 - Anggota',
    normalPrice: 1000000,      // Rp 1 Juta
    earlyBirdPrice: 250000,    // Rp 250 Ribu (75% off)
    promoPrice: 50000,         // Rp 50 Ribu (95% off)
    discountPercent: 95,
    color: tierColors[2].main,
    softColor: tierColors[2].soft,
    gradient: tierColors[2].gradient,
    icon: BadgeCheck,
    description: 'Anggota resmi dengan hak suara di Munas.',
    benefits: [
      { text: 'Semua benefit Petani', included: true },
      { text: 'Profil Direktori Pengusaha', included: true },
      { text: 'Prioritas Pelatihan Batch Awal', included: true },
      { text: 'Hak Suara di Munas', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah', included: false },
      { text: 'Hak Usaha Operasional KNMP', included: false },
    ],
    cta: 'Daftar Sekarang',
    popular: true,
    isFree: false,
  },
  {
    id: 3,
    name: 'KORDES',
    title: 'Panglima Desa',
    subtitle: 'Tier 3 - Mitra Desa',
    normalPrice: 10000000,     // Rp 10 Juta
    earlyBirdPrice: 2500000,   // Rp 2.5 Juta (75% off)
    promoPrice: 500000,        // Rp 500 Ribu (95% off)
    discountPercent: 95,
    color: tierColors[3].main,
    softColor: tierColors[3].soft,
    gradient: tierColors[3].gradient,
    icon: Building,
    description: 'Panglima Desa - Hak usaha logistik + prioritas kemitraan tingkat desa.',
    benefits: [
      { text: 'Semua benefit Anggota Biasa', included: true },
      { text: 'Hak Prioritas Kemitraan Wilayah (Desa)', included: true },
      { text: 'Hak Usaha Operasional via KNMP', included: true },
      { text: 'Agen Logistik (J&T, JNE, SiCepat)', included: true },
      { text: 'Dashboard Agen Realtime', included: true },
      { text: 'Hak SHU dari Koperasi KNMP', included: true },
      { text: 'Hak Suara RAT KNMP', included: true },
      { text: 'Akses Dewan Nasional JE-P3', included: false },
    ],
    cta: 'Daftar Sekarang',
    popular: false,
    isFree: false,
  },
  {
    id: 4,
    name: 'KORCAM',
    title: 'Panglima Camat',
    subtitle: 'Tier 4 - Mitra Kecamatan',
    normalPrice: 40000000,     // Rp 40 Juta
    earlyBirdPrice: 10000000,  // Rp 10 Juta (75% off)
    promoPrice: 2000000,       // Rp 2 Juta (95% off)
    discountPercent: 95,
    color: tierColors[4].main,
    softColor: tierColors[4].soft,
    gradient: tierColors[4].gradient,
    icon: Landmark,
    description: 'Panglima Camat - Eksklusivitas kemitraan tingkat kecamatan.',
    benefits: [
      { text: 'Semua benefit KORDES', included: true },
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
    isFree: false,
  },
  {
    id: 5,
    name: 'KORDA',
    title: 'Panglima Distrik',
    subtitle: 'Tier 5 - Mitra Kabupaten',
    normalPrice: 60000000,     // Rp 60 Juta
    earlyBirdPrice: 15000000,  // Rp 15 Juta (75% off)
    promoPrice: 3000000,       // Rp 3 Juta (95% off)
    discountPercent: 95,
    color: tierColors[5].main,
    softColor: tierColors[5].soft,
    gradient: tierColors[5].gradient,
    icon: Sparkles,
    description: 'Panglima Distrik - Master Koordinator Kabupaten/Kota.',
    benefits: [
      { text: 'Semua benefit KORCAM', included: true },
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
    isFree: false,
  },
  {
    id: 6,
    name: 'KORWIL',
    title: 'Panglima Wilayah',
    subtitle: 'Tier 6 - Mitra Provinsi',
    normalPrice: 400000000,    // Rp 400 Juta
    earlyBirdPrice: 100000000, // Rp 100 Juta (75% off)
    promoPrice: 20000000,      // Rp 20 Juta (95% off)
    discountPercent: 95,
    color: tierColors[6].main,
    softColor: tierColors[6].soft,
    gradient: tierColors[6].gradient,
    icon: Crown,
    description: 'Panglima Wilayah - Regional Director Provinsi.',
    benefits: [
      { text: 'Semua benefit KORDA', included: true },
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
    isFree: false,
  },
  {
    id: 7,
    name: 'KORNAS',
    title: 'Panglima Besar',
    subtitle: 'Tier 7 - Mitra Nasional',
    normalPrice: 4000000000,   // Rp 4 Miliar
    earlyBirdPrice: 1000000000, // Rp 1 Miliar (75% off)
    promoPrice: 200000000,     // Rp 200 Juta (95% off)
    discountPercent: 95,
    color: tierColors[7].main,
    softColor: tierColors[7].soft,
    gradient: tierColors[7].gradient,
    icon: Rocket,
    description: 'Panglima Besar - Badan Koordinasi Nasional / Pusat. Level tertinggi dengan hak veto terbatas.',
    benefits: [
      { text: 'Semua benefit KORWIL', included: true },
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
    isFree: false,
  },
]

const formatPrice = (price: number) => {
  if (price === 0) return 'GRATIS'
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
        <PromoBanner />
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
      className="mb-12 text-center"
    >
      <motion.div variants={fadeInUp}>
        <div className="flex justify-center mb-4">
          <div className="h-14 sm:h-16 md:h-20 w-auto">
            <Image src="/logo-knmp.png" alt="Logo KNMP" width={1408} height={768} className="h-full w-auto object-contain" />
          </div>
        </div>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
          <Crown className="w-4 h-4 mr-2" />
          7 Level Pimpinan KNMP
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
        Dari Petani gratis hingga Panglima Besar (KORNAS). 
        Setiap tier membuka akses ke ekosistem JE-P3 × KNMP yang berbeda.
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
// Promo Banner
// =====================
function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <Card className="bg-gradient-to-r from-[#8B0000] to-[#C81E1E] text-white border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Percent className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold">PROMO SPESIAL MARET 2026</h3>
                <p className="text-red-100 text-sm">Diskon 95% untuk semua tier keanggotaan!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Jangan sampai terlewat!</span>
              <Star className="w-5 h-5 text-yellow-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
    'Hak SHU Petani',
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
            <Badge className="bg-red-100 text-red-700">7 Level</Badge>
          </CardTitle>
          <CardDescription>Fitur utama yang tersedia di setiap tier keanggotaan</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-4 text-left font-medium text-muted-foreground">Benefit</th>
                  {TIERS.map((tier) => (
                    <th key={tier.id} className="p-4 text-center min-w-[100px]">
                      <div className="flex flex-col items-center">
                        <tier.icon className="w-5 h-5 mb-1" style={{ color: tier.color }} />
                        <span className="font-semibold text-sm">{tier.name}</span>
                        <span className="text-xs text-muted-foreground">{tier.title}</span>
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
                        (benefit === 'Hak SHU Petani' && tier.id >= 1) ||
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
          Detail <span className="text-[#8B0000]">Tier</span> Keanggotaan
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
              )}
              style={{ borderTop: `4px solid ${tier.color}` }}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-[#8B0000] text-white rounded-none rounded-bl-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Populer
                  </Badge>
                </div>
              )}
              
              {tier.isFree && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-green-500 text-white rounded-none rounded-bl-lg">
                    <Leaf className="w-3 h-3 mr-1" />
                    Gratis
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-2" style={{ backgroundColor: tier.softColor }}>
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
                  {tier.isFree ? (
                    <div className="text-3xl font-bold text-[#008F3D]">GRATIS</div>
                  ) : (
                    <>
                      {/* Promo Price (95% off) */}
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold" style={{ color: tier.color }}>
                          {formatPrice(tier.promoPrice)}
                        </span>
                      </div>
                      {/* Early Bird Price (75% off) */}
                      <div className="text-sm text-muted-foreground line-through">
                        Early Bird: {formatPrice(tier.earlyBirdPrice)}
                      </div>
                      {/* Normal Price */}
                      <div className="text-xs text-gray-400 line-through">
                        Normal: {formatPrice(tier.normalPrice)}
                      </div>
                      <Badge variant="outline" className="text-xs border-red-200 text-red-600 mt-1">
                        <Percent className="w-3 h-3 mr-1" />
                        Hemat {tier.discountPercent}%!
                      </Badge>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">/ tahun</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {tier.description}
                </p>
                
                {tier.specialRequirement && (
                  <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded mb-4 border border-amber-200">
                    <strong>Syarat:</strong> {tier.specialRequirement}
                  </div>
                )}

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
                  {tier.benefits.length > 5 && (
                    <li className="text-xs text-muted-foreground">
                      +{tier.benefits.length - 5} benefit lainnya
                    </li>
                  )}
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                <Link href="/daftar" className="w-full">
                  <Button
                    className={cn(
                      'w-full',
                      tier.popular
                        ? 'bg-[#8B0000] hover:bg-[#6B0000] text-white'
                        : tier.id >= 6
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : tier.isFree
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : ''
                    )}
                    variant={tier.popular || tier.id >= 6 || tier.isFree ? 'default' : 'outline'}
                    style={!tier.popular && tier.id < 6 && !tier.isFree ? { borderColor: tier.color, color: tier.color } : {}}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
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
        'Hak usaha logistik (agen J&T, JNE, SiCepat, dll) tersedia untuk Tier 3 (KORDES) ke atas, setelah KNMP berbadan hukum dan MoU dengan ekspedisi ditandatangani. Estimasi: Q2-Q3 2026.',
    },
    {
      question: 'Bagaimana cara pembayaran membership?',
      answer:
        'Pembayaran melalui halaman pendaftaran dengan berbagai metode (transfer bank, e-wallet, QRIS). Untuk promo Maret 2026, Anda mendapat diskon 95% dari harga normal.',
    },
    {
      question: 'Apakah ada garansi uang kembali?',
      answer:
        'Ya, garansi uang kembali 100% dalam 14 hari jika belum ada aktivitas pelatihan atau akses platform yang signifikan. Setelah itu, keanggotaan bersifat final.',
    },
    {
      question: 'Bagaimana sistem voting di RAT KNMP?',
      answer:
        'Pentagon Kedaulatan: Setiap KPA mendapat 20% suara kolektif dalam RAT. Total 5 KPA × 20% = 100% demokratis. Di internal masing-masing KPA berlaku 1 Anggota = 1 Suara. Investor (KPA-5) TIDAK punya hak veto berdasarkan Doktrin Anti-Oligarki.',
    },
    {
      question: 'Apa itu HPKW (Hak Prioritas Kemitraan Wilayah)?',
      answer:
        'HPKW memberikan prioritas eksklusif untuk menjadi koordinator/mitra utama JE-P3 dan KNMP di wilayah tertentu (desa/kecamatan/kabupaten/provinsi/nasional). Ini berarti prioritas dalam pembukaan unit usaha, koordinasi agen, dan akses proyek pemerintah di wilayah tersebut.',
    },
    {
      question: 'Bagaimana cara mendaftar sebagai Petani (GRATIS)?',
      answer:
        'Untuk mendaftar sebagai Petani, Anda cukup mengisi data diri, upload KTP, dan upload foto kebun/pertanian Anda. Setelah diverifikasi oleh tim kami, Anda akan mendapat kartu anggota digital dan akses ke semua benefit Petani secara gratis selamanya.',
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
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#8B0000] to-[#B7791F] rounded-2xl flex items-center justify-center">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Siap Bergabung dengan Ekosistem?
          </h3>
          <p className="text-muted-foreground mb-4">
            Daftar sekarang dan jadi bagian dari 83.763 desa yang terhubung dengan 195 negara.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge className="bg-red-100 text-red-700">
              <Percent className="w-3 h-3 mr-1" />
              Diskon 95% Maret 2026
            </Badge>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/daftar">
              <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
                Daftar Sekarang
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
              Hubungi Kami
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
