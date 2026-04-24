'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronRight, Building2, Wheat, Globe, Zap, ArrowRight,
  Heart, Truck, Warehouse, Scale, Home, Target, Users,
  Fish, Apple, Droplets, ShoppingBag, Bath, ShieldCheck
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
  { label: 'Pilar 1: Pemerintahan', href: '/nusa-futuristik/provinsi/proyek-strategis', icon: Target, color: '#008F3D' },
  { label: 'Pilar 2: Kawasan Industri', href: '/nusa-futuristik/provinsi/kawasan-industri-terpadu', icon: Warehouse, color: '#8B0000' },
  { label: 'Pilar 3: Kampung Modal', href: '/nusa-futuristik/provinsi/kampung-modal', icon: Scale, color: '#f59e0b' },
  { label: 'Pilar 4: Kawasan Pangan', href: '/nusa-futuristik/provinsi/kawasan-pangan-terpadu', icon: Wheat, color: '#16a34a' },
  { label: 'Pilar 5: Kesehatan & Wisata', href: '/nusa-futuristik/provinsi/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Pilar 6: Transportasi', href: '/nusa-futuristik/provinsi/transportasi-digital', icon: Truck, color: '#0d9488' },
]

const rumahCategories = [
  {
    title: 'Rumah Ternak dan Perikanan',
    description: 'Fasilitas beternak dan budidaya perikanan terintegrasi di setiap rumah produktif. Didukung teknologi IoT untuk monitoring kesehatan ternak dan kualitas air.',
    icon: Fish,
    features: ['IoT Monitoring', 'Smart Feeding', 'Health Tracker', 'Marketplace'],
    color: '#16a34a',
  },
  {
    title: 'Rumah Pangan',
    description: 'Lumbung pangan keluarga dengan sistem penyimpanan modern. Setiap rumah memiliki cadangan pangan yang cukup untuk ketahanan keluarga dan surplus untuk komersialisasi.',
    icon: Apple,
    features: ['Smart Storage', 'Cold Chain', 'Inventory App', 'Surplus Market'],
    color: '#f59e0b',
  },
  {
    title: 'Rumah Sehat',
    description: 'Rumah yang dilengkapi dengan perangkat kesehatan digital dan koneksi ke layanan Dokter Digital. Monitoring kesehatan keluarga secara real-time 24/7.',
    icon: ShieldCheck,
    features: ['Telemedicine', 'Health IoT', 'Emergency Alert', 'Vitamin Tracker'],
    color: '#dc2626',
  },
  {
    title: 'Air Minum Sehat',
    description: 'Sistem filtrasi dan pengolahan air minum yang terjamin kualitasnya. Setiap rumah produktif memiliki akses air bersih dan sehat secara berkelanjutan.',
    icon: Droplets,
    features: ['Water Filter', 'Quality Sensor', 'pH Monitor', 'Auto Refill'],
    color: '#0d9488',
  },
  {
    title: 'Sembako',
    description: 'Ketersediaan sembilan bahan pokok yang terjamin dengan harga stabil melalui sistem distribusi digital yang terintegrasi dari produsen langsung ke rumah.',
    icon: ShoppingBag,
    features: ['Digital Distribution', 'Price Stability', 'Direct from Producer', 'Subscription'],
    color: '#92400e',
  },
  {
    title: 'Alat Mandi dan Cuci',
    description: 'Fasilitas sanitasi modern yang memadai untuk kesejahteraan keluarga. Didukung sistem daur ulang air dan teknologi hemat energi.',
    icon: Bath,
    features: ['Smart Sanitation', 'Water Recycling', 'Energy Efficient', 'Maintenance App'],
    color: '#008F3D',
  },
]

export default function ProvinsiRumahProduktifPage() {
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
              <span className="text-[#1A1A1A] font-medium">Rumah Produktif</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#92400e] to-[#78350f] text-white py-12 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Home className="w-3.5 h-3.5 mr-1.5" />
                PILAR 7 — PROVINSI
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Rumah Produktif
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 max-w-2xl mx-auto">
              Program Rumah Produktif di tingkat provinsi menyediakan 6 fasilitas utama
              untuk memastikan kesejahteraan, kemandirian, dan produktivitas setiap keluarga Indonesia.
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
                <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#92400e] hover:text-[#92400e] transition-colors cursor-pointer flex items-center gap-1.5">
                  <page.icon className="w-3 h-3" />
                  {page.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Category Cards */}
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
              6 Kategori Rumah Produktif
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#6B7280]">
              Setiap Rumah Produktif dilengkapi dengan fasilitas-fasilitas berikut untuk menunjang
              kesejahteraan dan produktivitas keluarga.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rumahCategories.map((category, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: category.color + '15' }}
                    >
                      <category.icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] mb-2">{category.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feat, j) => (
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

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: '6', label: 'Kategori Fasilitas', icon: Home },
              { value: '24/7', label: 'Monitoring Digital', icon: ShieldCheck },
              { value: '100%', label: 'Air Bersih Terjamin', icon: Droplets },
              { value: 'IoT', label: 'Smart Home Tech', icon: Zap },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#92400e]" />
                <p className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A]">{stat.value}</p>
                <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#92400e] to-[#78350f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-extrabold mb-4">
              Wujudkan Rumah Produktif Anda
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-6">
              Bergabung dengan KNMP dan jadilah bagian dari program Rumah Produktif
              di provinsi. Kesejahteraan dimulai dari rumah.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/daftar">
                <Button className="bg-white text-[#92400e] hover:bg-white/90 font-semibold shadow-lg group">
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
