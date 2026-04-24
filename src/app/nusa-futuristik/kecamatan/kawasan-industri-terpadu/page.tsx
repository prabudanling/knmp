'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Target, Building2, Wheat, Globe, Zap, ArrowRight, Store, Hammer, Package, Cpu, Users, Scale, Truck, Home, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }

const siblingPages = [
  { label: 'Pilar 1: Pemerintahan', href: '/nusa-futuristik/kecamatan/proyek-strategis', icon: Target, color: '#008F3D' },
  { label: 'Pilar 3: Kampung Modal', href: '/nusa-futuristik/kecamatan/kampung-modal', icon: Scale, color: '#f59e0b' },
  { label: 'Pilar 4: Kawasan Pangan', href: '/nusa-futuristik/kecamatan/kawasan-pangan-terpadu', icon: Wheat, color: '#16a34a' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/kecamatan/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/kecamatan/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Pilar 7: Rumah Produktif', href: '/nusa-futuristik/kecamatan/rumah-produktif', icon: Home, color: '#92400e' },
]

const zones = [
  { title: 'Sentra UMKM Digital', description: 'Pusat pemberdayaan UMKM kecamatan dengan pelatihan digital dan marketplace integrasi.', icon: Store, features: ['Digital Training', 'Marketplace', 'Branding'] },
  { title: 'Workshop & Maker Space', description: 'Ruang kerja terpadu untuk pengrajin dan produsen lokal dengan peralatan modern.', icon: Hammer, features: ['Tools Access', 'Training', 'Co-Creation'] },
  { title: 'Micro Logistics Center', description: 'Pusat logistik kecil untuk distribusi produk lokal ke pasar yang lebih luas.', icon: Package, features: ['Local Hub', 'Last Mile', 'Aggregation'] },
  { title: 'Agro-Processing Unit', description: 'Unit pengolahan hasil pertanian dan perkebunan kecamatan menjadi produk bernilai tinggi.', icon: Cpu, features: ['Processing', 'Packaging', 'Certification'] },
  { title: 'Creative Village Hub', description: 'Pusat industri kreatif kecamatan yang mendukung seni, kerajinan, dan digital content.', icon: Users, features: ['Art Studio', 'Digital Content', 'Exhibition'] },
  { title: 'Koperasi Digital Kecamatan', description: 'Koperasi berbasis digital untuk mengelola produksi, pemasaran, dan keuangan bersama.', icon: Building2, features: ['Digital Coop', 'Shared Economy', 'Micro Finance'] },
]

export default function KecamatanKawasanIndustriPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik" className="hover:text-[#008F3D]">Nusa Futuristik</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik/kecamatan" className="hover:text-[#008F3D]">Kecamatan</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><span className="text-[#1A1A1A] font-medium">Kawasan Industri Terpadu</span></span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}><Badge className="bg-white/20 text-white border-white/30 mb-4"><Building2 className="w-3.5 h-3.5 mr-1.5" />KECAMATAN FUTURISTIK</Badge></motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Kawasan Industri Terpadu Kecamatan</motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">Sentra ekonomi kerakyatan berbasis teknologi digital yang memberdayakan UMKM dan produsen lokal di setiap kecamatan.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {siblingPages.map((page, i) => (
              <Link key={i} href={page.href}><Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#8B0000] hover:text-[#8B0000] transition-colors cursor-pointer flex items-center gap-1.5"><page.icon className="w-3 h-3" />{page.label}</Badge></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-8">
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-2">Zona Industri Kecamatan</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">Berbagai zona industri kecamatan yang memberdayakan ekonomi lokal.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center mb-4"><zone.icon className="w-6 h-6 text-[#8B0000]" /></div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{zone.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{zone.description}</p>
                    <div className="flex flex-wrap gap-2">{zone.features.map((f, j) => (<Badge key={j} variant="secondary" className="text-xs bg-gray-100 text-[#6B7280]">{f}</Badge>))}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#008F3D] to-[#006F30] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">Berkembang Bersama UMKM Kecamatan</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">Bergabung dengan KNMP dan akses peluang pemberdayaan UMKM di kecamatan seluruh Indonesia.</motion.p>
            <motion.div variants={fadeInUp}><Link href="/daftar"><Button className="bg-white text-[#008F3D] hover:bg-white/90 font-semibold shadow-lg group">Daftar Sekarang<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link></motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
