'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Target, Building2, Wheat, Globe, Zap, ArrowRight, Sprout, Warehouse, Droplets, Tractor, Store, TreePine, Scale, Truck, Home, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }

const siblingPages = [
  { label: 'Pilar 1: Pemerintahan', href: '/nusa-futuristik/desa/proyek-strategis', icon: Target, color: '#008F3D' },
  { label: 'Pilar 2: Kawasan Industri', href: '/nusa-futuristik/desa/kawasan-industri-terpadu', icon: Building2, color: '#8B0000' },
  { label: 'Pilar 3: Kampung Modal', href: '/nusa-futuristik/desa/kampung-modal', icon: Scale, color: '#f59e0b' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/desa/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/desa/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Pilar 7: Rumah Produktif', href: '/nusa-futuristik/desa/rumah-produktif', icon: Home, color: '#92400e' },
]

const zones = [
  { title: 'Pertanian Cerdas Desa', description: 'Lahan pertanian desa dengan teknologi precision farming, sensor tanah, dan irigasi otomatis.', icon: Sprout, features: ['Precision Farm', 'Soil Sensor', 'Auto Irrigate'] },
  { title: 'Lumbung Pangan Desa', description: 'Gudang penyimpanan pangan desa dengan sistem pengawasan stok digital dan rotasi stock.', icon: Warehouse, features: ['Smart Storage', 'Stock Monitor', 'Quality Check'] },
  { title: 'Perikanan & Peternakan', description: 'Sentra perikanan dan peternakan desa dengan biosecurity dan monitoring kesehatan terintegrasi.', icon: Tractor, features: ['Bio Security', 'Health Monitor', 'Feed Optimize'] },
  { title: 'Perkebunan Terpadu', description: 'Kawasan perkebunan desa dengan diversifikasi komoditas dan sistem pasca-panen modern.', icon: TreePine, features: ['Multi Crop', 'Post Harvest', 'Processing'] },
  { title: 'Pengelolaan Air Desa', description: 'Sistem pengelolaan sumber daya air desa untuk pertanian dan kebutuhan sehari-hari.', icon: Droplets, features: ['Water Mgmt', 'Irrigation', 'Clean Water'] },
  { title: 'Pasar Pangan Desa', description: 'Pasar pangan desa digital yang terhubung dengan jaringan distribusi dan marketplace nasional.', icon: Store, features: ['Digital Market', 'National Link', 'Direct Sales'] },
]

export default function DesaKawasanPanganPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik" className="hover:text-[#008F3D]">Nusa Futuristik</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik/desa" className="hover:text-[#008F3D]">Desa/Kel</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><span className="text-[#1A1A1A] font-medium">Kawasan Pangan Terpadu</span></span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-r from-[#008F3D] to-[#006F30] text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}><Badge className="bg-white/20 text-white border-white/30 mb-4"><Wheat className="w-3.5 h-3.5 mr-1.5" />DESA FUTURISTIK</Badge></motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Kawasan Pangan Terpadu Desa</motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">Pertanian dan produksi pangan desa terintegrasi sebagai fondasi kedaulatan pangan Indonesia dari tingkat akar rumput.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {siblingPages.map((page, i) => (
              <Link key={i} href={page.href}><Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#008F3D] hover:text-[#008F3D] transition-colors cursor-pointer flex items-center gap-1.5"><page.icon className="w-3 h-3" />{page.label}</Badge></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-8">
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-2">Zona Pangan Desa</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">Berbagai zona pangan desa untuk ketahanan pangan dari akar rumput.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:border-[#008F3D]/30 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#008F3D]/10 flex items-center justify-center mb-4"><zone.icon className="w-6 h-6 text-[#008F3D]" /></div>
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

      <section className="py-12 bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">Dukung Kedaulatan Pangan Desa</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">Bergabung dengan KNMP dan berkontribusi pada kedaulatan pangan dari tingkat desa.</motion.p>
            <motion.div variants={fadeInUp}><Link href="/daftar"><Button className="bg-white text-[#8B0000] hover:bg-white/90 font-semibold shadow-lg group">Daftar Sekarang<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link></motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
