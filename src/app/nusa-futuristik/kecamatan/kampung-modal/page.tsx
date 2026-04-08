'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronRight, Building2, Wheat, Globe, Zap, ArrowRight,
  Heart, Truck, Warehouse, Scale, Home, Target, Users, GraduationCap,
  Landmark, TrendingUp, DollarSign, PiggyBank, Handshake, Globe2, BookOpen
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const siblingPages = [
  { label: 'Pilar 1: Pemerintahan', href: '/nusa-futuristik/kecamatan/proyek-strategis', icon: Target, color: '#008F3D' },
  { label: 'Pilar 2: Kawasan Industri', href: '/nusa-futuristik/kecamatan/kawasan-industri-terpadu', icon: Warehouse, color: '#8B0000' },
  { label: 'Pilar 4: Kawasan Pangan', href: '/nusa-futuristik/kecamatan/kawasan-pangan-terpadu', icon: Wheat, color: '#16a34a' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/kecamatan/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/kecamatan/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Pilar 7: Rumah Produktif', href: '/nusa-futuristik/kecamatan/rumah-produktif', icon: Home, color: '#92400e' },
]

const kampungModalFeatures = [
  {
    title: 'Equity Crowdfunding',
    description: 'Platform investasi kolektif untuk mendanai UMKM dan startup lokal secara transparan dan terukur.',
    icon: DollarSign,
    features: ['Due Diligence Digital', 'Investor Dashboard', 'Return Tracking'],
  },
  {
    title: 'Pinjaman Kolektif',
    description: 'Pembiayaan bergulir berbasis komunitas dengan bunga kompetitif dan proses verifikasi digital.',
    icon: PiggyBank,
    features: ['Smart Scoring', 'Auto Disbursement', 'Repayment Monitor'],
  },
  {
    title: 'Investor-Entrepreneur Matching',
    description: 'Platform AI untuk mencocokkan investor dengan peluang usaha yang relevan di kecamatan.',
    icon: Handshake,
    features: ['AI Matching', 'Pitch Deck', 'Term Sheet Generator'],
  },
  {
    title: 'Village Impact Fund',
    description: 'Dana dampak sosial untuk mendanai proyek-proyek yang memberikan manfaat langsung kepada masyarakat.',
    icon: TrendingUp,
    features: ['Impact Measurement', 'Social ROI', 'Community Fund'],
  },
  {
    title: 'Diaspora Gateway',
    description: 'Koneksi investasi diaspora Indonesia untuk menyalurkan modal ke kampung halaman mereka.',
    icon: Globe2,
    features: ['Diaspora Network', 'Remittance Investment', 'Cross-border'],
  },
  {
    title: 'Pusat Diklat',
    description: 'Pusat pendidikan dan pelatihan untuk meningkatkan kapasitas SDM industri di kecamatan.',
    icon: GraduationCap,
    features: ['Digital Training', 'Certification', 'Mentoring Program'],
  },
]

export default function KecamatanKampungModalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <Link href="/nusa-futuristik" className="hover:text-[#008F3D]">Nusa Futuristik</Link>
            </span>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <Link href="/nusa-futuristik/kecamatan" className="hover:text-[#008F3D]">Kecamatan</Link>
            </span>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#1A1A1A] font-medium">Kampung Modal / DIPUNTARA</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Scale className="w-3.5 h-3.5 mr-1.5" />
                PILAR 3 — KECAMATAN
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Kampung Modal / DIPUNTARA
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">
              DIPUNTARA melalui BUMDes, KUD, dan KDMP mengelola investasi di tingkat kecamatan. Kampung Modal menghubungkan modal komunitas dengan peluang usaha desa-desa binaan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sub Navigation */}
      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {siblingPages.map((page, i) => (
              <Link key={i} href={page.href} className="group">
                <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors cursor-pointer flex items-center gap-1.5">
                  <page.icon className="w-3 h-3" />
                  {page.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIPUNTARA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-4">
              DIPUNTARA — Dana Investasi Ibu Pertiwi Nusantara
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280] leading-relaxed">
              DIPUNTARA adalah holding company yang mengelola dana investasi untuk pembangunan ekonomi lokal.
              Sebagai <strong className="text-[#1A1A1A]">Kampung Modal</strong>, DIPUNTARA menyediakan platform
              investasi, pembiayaan, dan pendampingan untuk UMKM di seluruh Indonesia.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {kampungModalFeatures.map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:border-[#f59e0b]/30 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((feat, j) => (
                        <Badge key={j} variant="secondary" className="text-xs bg-gray-100 text-[#6B7280]">
                          {feat}
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

      {/* Ekosistem Industri Section */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-6">
              Ekosistem Industri Kecamatan
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-4 text-[#6B7280] leading-relaxed">
              <p>
                Ekosistem Industri di tingkat kecamatan dirancang untuk menciptakan sinergi
                antara sektor pangan, industri, dan jasa. DIPUNTARA berperan sebagai penghubung
                antara modal, produksi, dan pemasaran untuk memastikan setiap unit usaha dapat berkembang
                secara berkelanjutan.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {['Hilirisasi Produk Lokal', 'Rantai Pasok Terintegrasi', 'Branding & Pemasaran Digital', 'Pelatihan & Sertifikasi', 'Quality Control Standard', 'Marketplace Terpadu'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                    <ChevronRight className="w-4 h-4 text-[#f59e0b] shrink-0" />
                    <span className="text-sm font-medium text-[#1A1A1A]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">
              Bergabung dengan Kampung Modal
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">
              Jadilah bagian dari ekosistem investasi desa digital Indonesia.
              Daftarkan diri Anda dan mulai berinvestasi untuk pembangunan kecamatan.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/daftar">
                <Button className="bg-white text-[#f59e0b] hover:bg-white/90 font-semibold shadow-lg group">
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
