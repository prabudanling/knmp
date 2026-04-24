'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Target, Building2, Wheat, Globe, Zap, ArrowRight, Landmark, Construction, Shield, TrendingUp, Building,Scale, Heart, Truck, Home } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const siblingPages = [
  { label: 'Pilar 2: Kawasan Industri', href: '/nusa-futuristik/kota/kawasan-industri-terpadu', icon: Building2, color: '#8B0000' },
  { label: 'Pilar 3: Kampung Modal', href: '/nusa-futuristik/kota/kampung-modal', icon: Scale, color: '#f59e0b' },
  { label: 'Pilar 4: Kawasan Pangan', href: '/nusa-futuristik/kota/kawasan-pangan-terpadu', icon: Wheat, color: '#16a34a' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/kota/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/kota/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Pilar 7: Rumah Produktif', href: '/nusa-futuristik/kota/rumah-produktif', icon: Home, color: '#92400e' },
]

const projects = [
  { title: 'Smart City Command Center', description: 'Pusat kontrol kota cerdas yang mengintegrasikan data lalu lintas, cuaca, dan layanan publik dalam satu dashboard.', icon: Building, status: 'Pilot Project', city: 'Jakarta' },
  { title: 'Gedung Pemerintahan Digital', description: 'Pembaruan infrastruktur gedung pemerintahan kota dengan sistem e-government terintegrasi.', icon: Landmark, status: 'Perencanaan', city: 'Multi-Kota' },
  { title: 'Smart Drainage & Flood Control', description: 'Sistem drainase cerdas dengan sensor IoT untuk pencegahan banjir di kota-kota rawan genangan.', icon: Shield, status: 'Segera Hadir', city: 'Semarang' },
  { title: 'Urban Green Corridor', description: 'Koridor hijau perkotaan yang menghubungkan taman kota, ruang terbuka hijau, dan jalur pejalan kaki.', icon: TrendingUp, status: 'Perencanaan', city: 'Bandung' },
  { title: 'Smart Waste Management', description: 'Sistem pengelolaan sampah kota terintegrasi dengan smart bin dan recycling center.', icon: Construction, status: 'Pilot Project', city: 'Surabaya' },
  { title: 'Public Wi-Fi & 5G Network', description: 'Jaringan internet publik berkecepatan tinggi yang menjangkau seluruh wilayah kota.', icon: Zap, status: 'Segera Hadir', city: 'Nasional' },
]

export default function KotaProyekStrategisPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik" className="hover:text-[#008F3D]">Nusa Futuristik</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik/kota" className="hover:text-[#008F3D]">Kota</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><span className="text-[#1A1A1A] font-medium">Proyek Strategis</span></span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white border-white/30 mb-4"><Target className="w-3.5 h-3.5 mr-1.5" />KOTA FUTURISTIK</Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Proyek Strategis Kota</motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">Proyek infrastruktur urban yang mengubah setiap kota menjadi smart city dengan pelayanan publik modern dan efisien.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {siblingPages.map((page, i) => (
              <Link key={i} href={page.href}>
                <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#8B0000] hover:text-[#8B0000] transition-colors cursor-pointer flex items-center gap-1.5">
                  <page.icon className="w-3 h-3" />{page.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-8">
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-2">Daftar Proyek Strategis Kota</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">Proyek-proyek urban yang menjadi fondasi smart city di seluruh kabupaten/kota Indonesia.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center"><project.icon className="w-6 h-6 text-[#8B0000]" /></div>
                      <Badge variant="outline" className="text-xs border-[#f59e0b] text-[#f59e0b]">{project.status}</Badge>
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{project.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{project.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-[#6B7280]">{project.city}</Badge>
                      <Link href="/daftar" className="text-sm text-[#8B0000] font-medium hover:underline flex items-center gap-1">Detail <ChevronRight className="w-3 h-3" /></Link>
                    </div>
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
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">Ingin Terlibat dalam Proyek Kota?</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">Bergabung dengan KNMP dan jadilah bagian dari proyek transformasi smart city di seluruh Indonesia.</motion.p>
            <motion.div variants={fadeInUp}><Link href="/daftar"><Button className="bg-white text-[#008F3D] hover:bg-white/90 font-semibold shadow-lg group">Daftar Sekarang<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link></motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
