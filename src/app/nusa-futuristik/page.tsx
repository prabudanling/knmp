'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronRight, Building2, Landmark, MapPin, Home, ArrowRight, Target, Zap, Globe,
  ShieldCheck, Heart, Truck, Warehouse, GraduationCap, Briefcase, Users, Sprout,
  Leaf, Droplets, Fish, Apple, Scale, Building, Clock, Rocket, Flag
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

const levelCards = [
  {
    label: 'Provinsi Futuristik',
    href: '/nusa-futuristik/provinsi',
    icon: Landmark,
    target: '38 Provinsi',
    description: 'Transformasi infrastruktur dan pemerintahan digital di tingkat provinsi seluruh Indonesia.',
    color: '#008F3D',
    stats: [
      { value: '38', label: 'Provinsi Target' },
      { value: '7', label: 'Pilar Utama' },
    ]
  },
  {
    label: 'Kota Futuristik',
    href: '/nusa-futuristik/kota',
    icon: Building2,
    target: '514 Kab/Kota',
    description: 'Kota cerdas dengan konektivitas digital, ekonomi hijau, dan tata kelola modern.',
    color: '#8B0000',
    stats: [
      { value: '514', label: 'Kab/Kota Target' },
      { value: '7', label: 'Pilar Utama' },
    ]
  },
  {
    label: 'Kecamatan Futuristik',
    href: '/nusa-futuristik/kecamatan',
    icon: MapPin,
    target: '7.277 Kecamatan',
    description: 'Pemberdayaan kecamatan sebagai pusat pertumbuhan ekonomi lokal berbasis teknologi.',
    color: '#f59e0b',
    stats: [
      { value: '7.277', label: 'Kecamatan Target' },
      { value: '7', label: 'Pilar Utama' },
    ]
  },
  {
    label: 'Desa/Kel Futuristik',
    href: '/nusa-futuristik/desa',
    icon: Home,
    target: '92.269 Desa/Kel',
    description: 'Desa digital terintegrasi sebagai fondasi kesejahteraan dan kedaulatan pangan.',
    color: '#16a34a',
    stats: [
      { value: '92.269', label: 'Desa/Kel Target' },
      { value: '7', label: 'Pilar Utama' },
    ]
  },
]

const pillars = [
  {
    icon: Building,
    label: 'Pilar 1: Pemerintahan & Bisnis Center',
    desc: 'Gerbang Masuk Futuristik, Full Digital, Tugu Pusat Kegiatan, Ruang Pamer Industri',
    color: '#008F3D',
  },
  {
    icon: Warehouse,
    label: 'Pilar 2: Proyek Strategis & Kawasan Industri',
    desc: 'Resi Gudang Digital, Penampung Hasil Industri, Pemasaran Digital, Industri Hilirisasi',
    color: '#8B0000',
  },
  {
    icon: Scale,
    label: 'Pilar 3: Holding & Trading BUMD / DIPUNTARA',
    desc: 'DIPUNTARA Holding, Kampung Modal, Pusat Diklat, Ekosistem Industri',
    color: '#f59e0b',
  },
  {
    icon: Sprout,
    label: 'Pilar 4: Kawasan Pangan Terpadu',
    desc: 'Hilirisasi Peternakan, Perikanan, Pertanian, Perkebunan Terintegrasi',
    color: '#16a34a',
  },
  {
    icon: Heart,
    label: 'Pilar 5: Kesehatan, Olahraga & Wisata',
    desc: 'Layanan Kesehatan Digital, Dokter Digital, Kawasan Olahraga, Wisata Terpadu',
    color: '#dc2626',
  },
  {
    icon: Truck,
    label: 'Pilar 6: Transportasi & Logistik Digital',
    desc: 'Darat, Kereta Api, Udara, Laut, Sungai — Terintegrasi Digital',
    color: '#0d9488',
  },
  {
    icon: Home,
    label: 'Pilar 7: Rumah Produktif',
    desc: 'Rumah Ternak, Rumah Pangan, Rumah Sehat, Air Minum Sehat, Sembako',
    color: '#92400e',
  },
]

const roadmapPhases = [
  {
    phase: 'Fase I',
    title: 'Fondasi',
    period: '2026–2027',
    icon: Flag,
    color: '#008F3D',
    items: [
      'Pembentukan DIPUNTARA Holding di 38 Provinsi',
      'Digitalisasi 100 Pemerintahan Desa Pilot',
      'Kampung Modal Platform Launch',
      'Rumah Produktif Pilot di 500 Desa',
      'Kawasan Pangan Terpadu di 10 Lokasi Strategis',
    ]
  },
  {
    phase: 'Fase II',
    title: 'Skalabilitas',
    period: '2028–2035',
    icon: Rocket,
    color: '#8B0000',
    items: [
      'Ekspansi ke 514 Kab/Kota',
      '7.277 Kecamatan Full Digital',
      'Kawasan Industri Terpadu di 200 Lokasi',
      'Transportasi & Logistik Digital Nasional',
      'Hilirisasi Pangan di Seluruh Provinsi',
    ]
  },
  {
    phase: 'Fase III',
    title: 'Peradaban',
    period: '2036–2045',
    icon: Globe,
    color: '#f59e0b',
    items: [
      '92.269 Desa/Kelurahan Futuristik',
      'Indonesia Emas 2045 Tercapai',
      'Ekonomi Digital Desa $1 Triliun',
      'Kemandirian Pangan & Energi Nasional',
      'Dari Desa, Untuk Indonesia, Menuju Dunia',
    ]
  },
]

export default function NusaFuturistikPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#1A1A1A] font-medium">Nusa Futuristik</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#008F3D] via-[#00752F] to-[#8B0000] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-1.5">
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                VISI INDONESIA 2045
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              NUSA FUTURISTIK
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-2">
              Framework Pembangunan Peradaban Desa Digital Indonesia
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-6">
              7 Pilar × 4 Level Wilayah
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="/daftar">
                <Button size="lg" className="bg-white text-[#008F3D] hover:bg-white/90 font-semibold shadow-lg group">
                  Gabung Perubahan
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#levels">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  Jelajahi Level
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="py-6 bg-gradient-to-r from-[#8B0000] to-[#008F3D] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl font-bold tracking-wide"
          >
            "Dari Desa, Untuk Indonesia, Menuju Dunia"
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: '38', label: 'Provinsi', icon: Landmark },
              { value: '514', label: 'Kab/Kota', icon: Building2 },
              { value: '7.277', label: 'Kecamatan', icon: MapPin },
              { value: '92.269', label: 'Desa/Kelurahan', icon: Home },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#8B0000]" />
                <p className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A]">{stat.value}</p>
                <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Level Cards */}
      <section id="levels" className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              Empat Level Transformasi
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280] max-w-2xl mx-auto text-lg">
              Dari provinsi hingga desa, setiap level memiliki program strategis yang terintegrasi
              untuk mencapai visi Indonesia Futuristik.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {levelCards.map((card, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link href={card.href} className="block group">
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-0">
                      <div className="h-2" style={{ backgroundColor: card.color }} />
                      <div className="p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${card.color}15` }}
                          >
                            <card.icon className="w-7 h-7" style={{ color: card.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#008F3D] transition-colors">
                                {card.label}
                              </h3>
                              <Badge className="text-xs px-2 py-0.5" style={{ backgroundColor: `${card.color}15`, color: card.color, border: 'none' }}>
                                {card.target}
                              </Badge>
                            </div>
                            <p className="text-[#6B7280] text-sm leading-relaxed">{card.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-6 pt-4 border-t border-gray-100">
                          {card.stats.map((stat, j) => (
                            <div key={j} className="flex-1 text-center">
                              <p className="text-xl font-bold text-[#1A1A1A]">{stat.value}</p>
                              <p className="text-xs text-[#6B7280]">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-end mt-4 text-sm font-medium" style={{ color: card.color }}>
                          Lihat Detail
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7 Pillars Section */}
      <section className="py-16 md:py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              7 Pilar Transformasi
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280] max-w-2xl mx-auto text-lg">
              Setiap level wilayah memiliki tujuh pilar utama yang menjadi fondasi
              pembangunan peradaban desa digital Indonesia.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {pillars.map((pillar, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <CardContent className="p-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${pillar.color}15` }}
                    >
                      <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                    </div>
                    <h3 className="font-bold text-sm text-[#1A1A1A] mb-1">{pillar.label}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{pillar.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4">
              Roadmap Indonesia 2045
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280] max-w-2xl mx-auto text-lg">
              Tiga fase strategis menuju peradaban desa digital Indonesia.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {roadmapPhases.map((phase, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-2" style={{ backgroundColor: phase.color }} />
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${phase.color}15` }}
                        >
                          <phase.icon className="w-6 h-6" style={{ color: phase.color }} />
                        </div>
                        <div>
                          <Badge className="text-xs px-2 py-0.5" style={{ backgroundColor: `${phase.color}15`, color: phase.color, border: 'none' }}>
                            {phase.phase}
                          </Badge>
                          <p className="text-sm font-bold text-[#1A1A1A]">{phase.title}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold mb-4" style={{ color: phase.color }}>
                        {phase.period}
                      </p>
                      <ul className="space-y-2">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#6B7280]">
                            <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: phase.color }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 md:py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#008F3D] to-[#8B0000] flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-6">
              Visi Transformasi Nasional
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#6B7280] leading-relaxed mb-8">
              Nusa Futuristik adalah framework strategis KNMP untuk mentransformasi seluruh wilayah Indonesia
              menjadi wilayah yang maju, berdaya saing, dan berkelanjutan. Melalui 7 Pilar di 4 Level Wilayah,
              dari provinsi hingga desa, setiap level memiliki peran krusial dalam mewujudkan Indonesia Emas 2045.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
              {[
                'Digitalisasi Pemerintahan',
                'DIPUNTARA & Kampung Modal',
                'Industri Hilirisasi',
                'Ketahanan Pangan',
                'Kesehatan & Wisata Terpadu',
                'Transportasi Digital',
                'Rumah Produktif',
              ].map((tag, i) => (
                <Badge key={i} variant="outline" className="text-sm px-4 py-2 border-[#008F3D] text-[#008F3D]">
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#008F3D] to-[#00752F] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold mb-4">
              Siap Membangun Indonesia Futuristik?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-2xl mx-auto text-lg mb-4">
              Bergabunglah dengan jutaan warga Indonesia dalam mewujudkan transformasi
              dari provinsi hingga desa. Mulai langkah Anda sekarang.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-white/60 text-base mb-8 italic">
              "Dari Desa, Untuk Indonesia, Menuju Dunia"
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/daftar">
                <Button size="lg" className="bg-white text-[#008F3D] hover:bg-white/90 font-semibold shadow-lg text-lg px-8 group">
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
