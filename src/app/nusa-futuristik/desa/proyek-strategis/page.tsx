'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Target, Building2, Wheat, Globe, Zap, ArrowRight, Home, Wifi, Droplets, Sun, Shield, School, Scale, Truck, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }

const siblingPages = [
  { label: 'Pilar 2: Kawasan Industri', href: '/nusa-futuristik/desa/kawasan-industri-terpadu', icon: Building2, color: '#8B0000' },
  { label: 'Pilar 3: Kampung Modal', href: '/nusa-futuristik/desa/kampung-modal', icon: Scale, color: '#f59e0b' },
  { label: 'Pilar 4: Kawasan Pangan', href: '/nusa-futuristik/desa/kawasan-pangan-terpadu', icon: Wheat, color: '#16a34a' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/desa/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/desa/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Pilar 7: Rumah Produktif', href: '/nusa-futuristik/desa/rumah-produktif', icon: Home, color: '#92400e' },
]

const projects = [
  { title: 'Balai Desa Digital', description: 'Modernisasi balai desa dengan e-government, digital archive, dan layanan surat online.', icon: Home, status: 'Pilot Project', area: 'Multi-Desa' },
  { title: 'Internet Desa Merdeka', description: 'Penyediaan akses internet gratis dan stabil untuk seluruh warga desa melalui jaringan fiber optik.', icon: Wifi, status: 'Segera Hadir', area: 'Nasional' },
  { title: 'Air Bersih & Sanitasi', description: 'Pembangunan sistem air bersih dan sanitasi modern untuk kesehatan warga desa.', icon: Droplets, status: 'Perencanaan', area: 'Nasional' },
  { title: 'Listrik Surya Desa', description: 'Pemasangan panel surya untuk kemandirian energi listrik di desa terpencil.', icon: Sun, status: 'Pilot Project', area: 'Indonesia Timur' },
  { title: 'Posyandu Cerdas', description: 'Peningkatan posyandu dengan sistem monitoring kesehatan digital dan telemedicine.', icon: Shield, status: 'Perencanaan', area: 'Multi-Desa' },
  { title: 'PAUD & Sekolah Digital', description: 'Peningkatan fasilitas pendidikan desa dengan smart classroom dan e-learning.', icon: School, status: 'Segera Hadir', area: 'Nasional' },
]

export default function DesaProyekStrategisPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik" className="hover:text-[#008F3D]">Nusa Futuristik</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link href="/nusa-futuristik/desa" className="hover:text-[#008F3D]">Desa/Kel</Link></span>
            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><span className="text-[#1A1A1A] font-medium">Proyek Strategis</span></span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-r from-[#0d9488] to-[#0f766e] text-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}><Badge className="bg-white/20 text-white border-white/30 mb-4"><Target className="w-3.5 h-3.5 mr-1.5" />DESA FUTURISTIK</Badge></motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Proyek Strategis Desa</motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">Proyek infrastruktur dasar yang memperkuat fondasi pembangunan desa dan meningkatkan kualitas hidup warga.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {siblingPages.map((page, i) => (
              <Link key={i} href={page.href}><Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#0d9488] hover:text-[#0d9488] transition-colors cursor-pointer flex items-center gap-1.5"><page.icon className="w-3 h-3" />{page.label}</Badge></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-8">
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] mb-2">Daftar Proyek Strategis Desa</motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">Proyek-proyek pembangunan desa yang menjadi fondasi kesejahteraan masyarakat.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:border-[#0d9488]/30 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0d9488]/10 flex items-center justify-center"><project.icon className="w-6 h-6 text-[#0d9488]" /></div>
                      <Badge variant="outline" className="text-xs border-[#f59e0b] text-[#f59e0b]">{project.status}</Badge>
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{project.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{project.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-[#6B7280]">{project.area}</Badge>
                      <Link href="/daftar" className="text-sm text-[#0d9488] font-medium hover:underline flex items-center gap-1">Detail <ChevronRight className="w-3 h-3" /></Link>
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
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">Ingin Terlibat dalam Proyek Desa?</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">Bergabung dengan KNMP dan jadilah bagian dari pembangunan desa digital seluruh Indonesia.</motion.p>
            <motion.div variants={fadeInUp}><Link href="/daftar"><Button className="bg-white text-[#008F3D] hover:bg-white/90 font-semibold shadow-lg group">Daftar Sekarang<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link></motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
