'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Store,
  Wheat,
  Truck,
  Laptop,
  HeartPulse,
  Moon,
  Globe,
  Zap,
  ArrowRight,
  Star,
  MapPin,
  Shield,
  BadgeCheck,
  Leaf,
  Package,
  ShoppingCart,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

// Zone configuration
const zones = [
  { id: 'AGRI', name: 'Agrikultur', icon: Wheat, color: '#22c55e', count: '15.000+', desc: 'Produk pertanian & perkebunan' },
  { id: 'RETAIL', name: 'Retail UMKM', icon: Store, color: '#3b82f6', count: '12.500+', desc: 'Produk UMKM lokal' },
  { id: 'DIGITAL', name: 'Digital', icon: Laptop, color: '#8b5cf6', count: '8.000+', desc: 'Produk digital & jasa' },
  { id: 'HEALTH', name: 'Kesehatan', icon: HeartPulse, color: '#ef4444', count: '5.500+', desc: 'Produk kesehatan herbal' },
  { id: 'SPIRITUAL', name: 'Spiritual', icon: Moon, color: '#06b6d4', count: '3.200+', desc: 'Perlengkapan ibadah' },
  { id: 'EXPORT', name: 'Ekspor', icon: Globe, color: '#008F3D', count: '7.800+', desc: 'Produk siap ekspor' },
  { id: 'ENERGY', name: 'Energi', icon: Zap, color: '#f97316', count: '2.150+', desc: 'Energi terbarukan' },
  { id: 'LOGISTICS', name: 'Logistik', icon: Truck, color: '#64748b', count: '2.500+', desc: 'Jasa pengiriman' },
]

// Featured products (simplified)
const featuredProducts = [
  { name: 'Kopi Arabika Gayo Premium', zone: 'AGRI', price: 'Rp 185.000', seller: 'Koperasi Gayo', location: 'Aceh', rating: 4.9 },
  { name: 'Madu Hutan Asli Kalimantan', zone: 'AGRI', price: 'Rp 125.000', seller: 'UMKM Madu Borneo', location: 'Kalimantan', rating: 4.8 },
  { name: 'Batik Tulis Pekalongan', zone: 'RETAIL', price: 'Rp 450.000', seller: 'Batik Nusantara', location: 'Jawa Tengah', rating: 5.0 },
  { name: 'Kurma Ajwa Premium', zone: 'SPIRITUAL', price: 'Rp 95.000', seller: 'Toko Kurma Madinah', location: 'Jakarta', rating: 4.7 },
]

// Zone colors for products
const zoneConfig: Record<string, { color: string; icon: React.ElementType }> = {
  AGRI: { color: '#22c55e', icon: Wheat },
  RETAIL: { color: '#3b82f6', icon: Store },
  SPIRITUAL: { color: '#06b6d4', icon: Moon },
}

export function MarketplaceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-4 px-4 py-1.5">
              <Store className="w-4 h-4 mr-2" />
              Marketplace Zonasi
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4"
          >
            Platform B2B/B2C <span className="text-[#8B0000]">83.763 Desa</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Marketplace dengan 8 zona produksi terintegrasi dan lebih dari 56.650+ produk unggulan
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '56.650+', label: 'Produk Aktif', color: '#22c55e' },
            { value: '125.000+', label: 'Seller T3+', color: '#3b82f6' },
            { value: '38', label: 'Provinsi', color: '#8B0000' },
            { value: 'Rp 2,5T', label: 'Transaksi/bulan', color: '#008F3D' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* 8 Zones Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {zones.map((zone) => (
            <motion.div key={zone.id} variants={fadeInUp} whileHover={{ y: -3 }}>
              <Card className="h-full bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${zone.color}15` }}
                  >
                    <zone.icon className="w-6 h-6" style={{ color: zone.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{zone.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{zone.desc}</p>
                  <Badge variant="secondary" className="text-xs" style={{ color: zone.color }}>
                    {zone.count} produk
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-bold text-[#1A1A1A] mb-6 text-center">
            Produk <span className="text-[#008F3D]">Unggulan</span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => {
              const config = zoneConfig[product.zone] || zoneConfig.AGRI
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    {/* Image placeholder */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-300" />
                      <div className="absolute top-2 left-2">
                        <Badge className="text-xs bg-white/90" style={{ color: config.color }}>
                          <config.icon className="w-3 h-3 mr-1" />
                          {product.zone}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="w-8 h-8 rounded-full p-0 bg-[#8B0000] hover:bg-[#6B0000]">
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8B0000] to-[#008F3D] flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">{product.seller[0]}</span>
                        </div>
                        <span className="text-xs text-gray-500 truncate">{product.seller}</span>
                        <BadgeCheck className="w-3 h-3 text-green-500 flex-shrink-0" />
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{product.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm" style={{ color: config.color }}>{product.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {[
            { icon: Leaf, label: 'Organik', color: '#22c55e' },
            { icon: BadgeCheck, label: 'Halal', color: '#06b6d4' },
            { icon: Shield, label: 'SNI', color: '#008F3D' },
            { icon: Globe, label: 'Ekspor Ready', color: '#8b5cf6' },
          ].map((cert, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100">
              <cert.icon className="w-4 h-4" style={{ color: cert.color }} />
              <span className="text-sm text-gray-700">{cert.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/marketplace">
            <Button className="bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#B22222] hover:to-[#DC143C] text-white shadow-lg shadow-red-900/20 px-8 py-5">
              <Store className="w-4 h-4 mr-2" />
              Kunjungi Marketplace
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
