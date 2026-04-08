'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronRight, Building2, Target, Wheat, Globe, Zap, ArrowRight,
  Heart, Truck, Warehouse, Scale, Home, Landmark, Briefcase, GraduationCap, Users
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

const subPages = [
  {
    label: 'Pilar 1: Pemerintahan & Bisnis Center',
    href: '/nusa-futuristik/kota/proyek-strategis',
    icon: Building2,
    description: 'Gerbang Masuk Futuristik, Kota Full Digital, Tugu Pusat Kegiatan, Ruang Pamer Industri.',
    color: '#008F3D',
  },
  {
    label: 'Pilar 2: Proyek Strategis & Kawasan Industri',
    href: '/nusa-futuristik/kota/kawasan-industri-terpadu',
    icon: Warehouse,
    description: 'Resi Gudang Digital, Penampung Hasil Industri, Pusat Pemasaran Digital, Hilirisasi.',
    color: '#8B0000',
  },
  {
    label: 'Pilar 3: Kampung Modal / DIPUNTARA',
    href: '/nusa-futuristik/kota/kampung-modal',
    icon: Scale,
    description: 'DIPUNTARA Holding Kab/Kota, Equity Crowdfunding, Pusat Diklat, Ekosistem Industri Kota.',
    color: '#f59e0b',
  },
  {
    label: 'Pilar 4: Kawasan Pangan Terpadu',
    href: '/nusa-futuristik/kota/kawasan-pangan-terpadu',
    icon: Wheat,
    description: 'Hilirisasi Peternakan, Perikanan, Pertanian, Perkebunan — Integrasi Ekosistem.',
    color: '#16a34a',
  },
  {
    label: 'Pilar 5: Kesehatan, Olahraga & Wisata',
    href: '/nusa-futuristik/kota/wisata-terpadu',
    icon: Heart,
    description: 'Puskesmas Digital, Dokter Digital, Kawasan Olahraga, Wisata Edukasi & Kuliner.',
    color: '#dc2626',
  },
  {
    label: 'Pilar 6: Transportasi & Logistik Digital',
    href: '/nusa-futuristik/kota/transportasi-digital',
    icon: Truck,
    description: 'Darat, Kereta Api, Udara, Laut, Sungai — Terintegrasi Sistem Digital.',
    color: '#0d9488',
  },
  {
    label: 'Pilar 7: Rumah Produktif',
    href: '/nusa-futuristik/kota/rumah-produktif',
    icon: Home,
    description: 'Rumah Ternak, Rumah Pangan, Rumah Sehat, Air Minum Sehat, Sembako, Alat Mandi Cuci.',
    color: '#92400e',
  },
]

export default function KotaPage() {
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
              <span className="text-[#1A1A1A] font-medium">Kota Futuristik</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Building2 className="w-3.5 h-3.5 mr-1.5" />
                LEVEL KOTA / KABUPATEN
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Kota / Kabupaten Futuristik
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">
              Kota cerdas dengan konektivitas digital, ekonomi hijau, dan tata kelola modern
              di 514 kabupaten dan kota seluruh Indonesia.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: '514', label: 'Kab/Kota Target' },
              { value: '7', label: 'Pilar Utama' },
              { value: '7.277', label: 'Kecamatan Binaan' },
              { value: '3.598', label: 'Proyek Strategis' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl md:text-3xl font-extrabold text-[#8B0000]">{stat.value}</p>
                <p className="text-xs md:text-sm text-[#6B7280] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7 Pilar Navigation Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-8"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-2">
              7 Pilar Kota / Kabupaten Futuristik
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">
              Jelajahi program transformasi di setiap pilar pembangunan kota dan kabupaten.
              DIPUNTARA Holding Kab/Kota mengelola seluruh ekosistem industri tingkat kota.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {subPages.map((page, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={page.href} className="block group h-full">
                  <Card className="border border-gray-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${page.color}15` }}
                      >
                        <page.icon className="w-6 h-6" style={{ color: page.color }} />
                      </div>
                      <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#8B0000] transition-colors mb-2">
                        {page.label}
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                        {page.description}
                      </p>
                      <div className="flex items-center text-sm font-medium" style={{ color: page.color }}>
                        Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pilar 3 Highlight */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#f59e0b]/5 to-[#f59e0b]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div>
                <Badge className="text-xs px-2 py-0.5 bg-[#f59e0b]/15 text-[#f59e0b] border-none mb-1">
                  PILAR 3 — HIGHLIGHT
                </Badge>
                <h3 className="text-xl font-bold text-[#1A1A1A]">DIPUNTARA Holding Kab/Kota</h3>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4 text-[#6B7280] leading-relaxed">
              <p>
                <strong className="text-[#1A1A1A]">DIPUNTARA Holding Kab/Kota</strong> mengelola investasi
                dan ekosistem industri di seluruh wilayah kabupaten dan kota. Melalui
                <strong className="text-[#1A1A1A]"> Kampung Modal</strong>, DIPUNTARA Kab/Kota menyediakan:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {[
                  { label: 'Equity Crowdfunding', desc: 'Platform investasi kolektif untuk UMKM kota/kabupaten' },
                  { label: 'Pinjaman Kolektif', desc: 'Pembiayaan bergulir berbasis komunitas lokal' },
                  { label: 'Investor-Entrepreneur Matching', desc: 'Pertemuan modal dan peluang usaha kota' },
                  { label: 'Village Impact Fund', desc: 'Dana dampak untuk kecamatan dan desa binaan' },
                  { label: 'Diaspora Gateway', desc: 'Koneksi investasi diaspora ke daerah asal' },
                  { label: 'Ekosistem Industri Kota', desc: 'Pengembangan rantai pasok dan industri lokal' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
                    <ChevronRight className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{item.label}</p>
                      <p className="text-xs text-[#6B7280]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#008F3D] to-[#006F30] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">
              Bergabung dengan Transformasi Kota
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">
              Jadilah bagian dari perubahan di kota Anda. Daftarkan diri Anda dan mulai
              berkontribusi pada pembangunan Indonesia Futuristik.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/daftar">
                <Button className="bg-white text-[#008F3D] hover:bg-white/90 font-semibold shadow-lg group">
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
