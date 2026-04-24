'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Target, Building2, Wheat, Globe, Zap, ArrowRight, Sprout, Droplets, Tractor, Warehouse, Beef, Scale, Heart, Truck, Home } from 'lucide-react'
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
    transition: { staggerChildren: 0.1 }
  }
}

const siblingPages = [
  { label: 'Pilar 1: Pemerintahan', href: '/nusa-futuristik/provinsi/proyek-strategis', icon: Target, color: '#008F3D' },
  { label: 'Pilar 2: Kawasan Industri', href: '/nusa-futuristik/provinsi/kawasan-industri-terpadu', icon: Building2, color: '#8B0000' },
  { label: 'Pilar 3: Kampung Modal', href: '/nusa-futuristik/provinsi/kampung-modal', icon: Scale, color: '#f59e0b' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/provinsi/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/provinsi/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Pilar 7: Rumah Produktif', href: '/nusa-futuristik/provinsi/rumah-produktif', icon: Home, color: '#92400e' },
]

const zones = [
  {
    title: 'Lumbung Pangan Digital',
    description: 'Pusat penyimpanan dan distribusi pangan berbasis teknologi IoT untuk monitoring stok real-time.',
    icon: Warehouse,
    features: ['Smart Storage', 'IoT Monitoring', 'Cold Chain'],
  },
  {
    title: 'Kawasan Pertanian Cerdas',
    description: 'Lahan pertanian modern dengan drone monitoring, sensor tanah, dan irigasi otomatis.',
    icon: Sprout,
    features: ['Precision Farming', 'Drone Monitoring', 'Auto Irrigation'],
  },
  {
    title: 'Agroindustri Terpadu',
    description: 'Pusat pengolahan hasil pertanian dan peternakan bernilai tambah tinggi.',
    icon: Tractor,
    features: ['Food Processing', 'Value Added', 'Quality Control'],
  },
  {
    title: 'Ketahanan Air & Irigasi',
    description: 'Sistem irigasi cerdas dan pengelolaan sumber daya air terintegrasi.',
    icon: Droplets,
    features: ['Smart Irrigation', 'Water Harvest', 'Flood Control'],
  },
  {
    title: 'Peternakan Modern',
    description: 'Fasilitas peternakan terpadu dengan teknologi reproduksi dan pakan teroptimasi.',
    icon: Beef,
    features: ['Smart Farming', 'Feed Optimization', 'Health Monitor'],
  },
  {
    title: 'Riset & Pengembangan Pangan',
    description: 'Pusat riset untuk pengembangan varitas unggul dan teknologi pangan masa depan.',
    icon: Sprout,
    features: ['Seed Bank', 'Biotech Lab', 'Training Center'],
  },
]

export default function ProvinsiKawasanPanganPage() {
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
              <Link href="/nusa-futuristik/provinsi" className="hover:text-[#008F3D]">Provinsi</Link>
            </span>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#1A1A1A] font-medium">Kawasan Pangan Terpadu</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Wheat className="w-3.5 h-3.5 mr-1.5" />
                PROVINSI FUTURISTIK
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Kawasan Pangan Terpadu
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">
              Mewujudkan kedaulatan pangan Indonesia melalui kawasan produksi pangan 
              terintegrasi berbasis teknologi modern di setiap provinsi.
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

      {/* Zone Cards */}
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
              Zona Kawasan Pangan
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">
              Berbagai zona pangan terintegrasi untuk mencapai ketahanan pangan nasional.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {zones.map((zone, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:border-[#f59e0b]/30 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                      <zone.icon className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{zone.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{zone.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {zone.features.map((feat, j) => (
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
              Dukung Ketahanan Pangan Indonesia
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">
              Bergabung dengan KNMP dan berkontribusi pada program kedaulatan pangan 
              nasional melalui kawasan pangan terpadu.
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
