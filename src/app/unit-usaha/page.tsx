'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  Store, 
  Truck, 
  CreditCard, 
  GraduationCap, 
  Plane, 
  Leaf,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Warehouse,
  Building2,
  Monitor,
  Sun,
  Wallet
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
    transition: { staggerChildren: 0.08 },
  },
}

const pilars = [
  { 
    icon: CreditCard, 
    name: 'JP3 Pay', 
    desc: 'Dompet digital & fintech koperasi untuk transaksi seamless', 
    color: '#8b5cf6', 
    bgColor: 'from-purple-50 to-purple-100',
    features: ['E-Wallet', 'Transfer Bank', 'QRIS', 'Virtual Account', 'Auto-Deduct Simpanan']
  },
  { 
    icon: Store, 
    name: 'Marketplace Multi-Sektor', 
    desc: 'Platform jual-beli terintegrasi untuk seluruh produk desa', 
    color: '#22c55e', 
    bgColor: 'from-green-50 to-green-100',
    features: ['Multi-kategori', 'Zonasi 8 area', 'Rating & Review', 'Fee kompetitif']
  },
  { 
    icon: Truck, 
    name: 'Logistik Digital Desa', 
    desc: 'Jaringan distribusi 83.763 desa dengan tracking real-time', 
    color: '#f59e0b', 
    bgColor: 'from-amber-50 to-amber-100',
    features: ['83.763 Desa', 'Same Day Delivery', 'Tracking Real-time', 'Agen terlatih']
  },
  { 
    icon: Warehouse, 
    name: 'Resi Gudang Digital', 
    desc: 'Sistem penyimpanan modern dengan monitoring IoT', 
    color: '#06b6d4', 
    bgColor: 'from-cyan-50 to-cyan-100',
    features: ['Digital Warehouse Receipt', 'Sistem Rating', 'Integrasi Marketplace', 'Monitoring IoT']
  },
  { 
    icon: Building2, 
    name: 'Gerai KDMP & Infrastruktur Desa', 
    desc: 'Pusat aktivitas ekonomi desa sebagai hub fisik terintegrasi', 
    color: '#8B0000', 
    bgColor: 'from-red-50 to-red-100',
    features: ['Physical Hub', 'Co-working Space', 'Training Center', 'Display Produk']
  },
  { 
    icon: GraduationCap, 
    name: 'JE-P3 Academy', 
    desc: 'Pelatihan & sertifikasi digital untuk peningkatan kapasitas', 
    color: '#f97316', 
    bgColor: 'from-orange-50 to-orange-100',
    features: ['500+ Kursus', 'Sertifikasi', 'Mentoring', 'Free untuk Anggota']
  },
  { 
    icon: Monitor, 
    name: 'Village Management System', 
    desc: 'Dashboard pengelolaan desa terintegrasi berbasis big data', 
    color: '#0d9488', 
    bgColor: 'from-teal-50 to-teal-100',
    features: ['Big Data Desa', 'Monitoring Real-time', 'Decision Support', 'IoT Integration']
  },
  { 
    icon: Globe, 
    name: 'Desa Wisata & Ekonomi Kreatif', 
    desc: 'Pengembangan pariwisata desa berbasis komunitas', 
    color: '#e11d48', 
    bgColor: 'from-rose-50 to-rose-100',
    features: ['Booking Platform', 'Community Based Tourism', 'Produk Craft', 'Experience Tours']
  },
  { 
    icon: Sun, 
    name: 'Energi Terbarukan Ekosistem Desa', 
    desc: 'Sumber energi bersih untuk kemandirian desa', 
    color: '#eab308', 
    bgColor: 'from-yellow-50 to-yellow-100',
    features: ['Solar Panel', 'Micro Hydro', 'Biogas', 'Energy Trading']
  },
  { 
    icon: Plane, 
    name: 'Wisata Nusantara & Perjalanan Ibadah', 
    desc: 'Layanan wisata domestik, internasional, dan perjalanan spiritual', 
    color: '#ec4899', 
    bgColor: 'from-pink-50 to-pink-100',
    features: ['Paket Haji & Umroh', 'Wisata Domestik', 'Internasional', 'Cicilan 0%']
  },
  { 
    icon: Leaf, 
    name: 'Perdagangan Karbon (ESG)', 
    desc: 'Carbon credits & keberlanjutan lingkungan', 
    color: '#10b981', 
    bgColor: 'from-emerald-50 to-emerald-100',
    features: ['Carbon Trading', 'Eco Projects', 'Green Bonds', 'ESG Reporting']
  },
  { 
    icon: Globe, 
    name: 'Trading Internasional', 
    desc: 'Ekspor produk desa ke 195 negara di seluruh dunia', 
    color: '#9333ea', 
    bgColor: 'from-violet-50 to-violet-100',
    features: ['Export Hub', '195 Negara Target', 'Logistics Partner', 'Trade Finance']
  },
  { 
    icon: Wallet, 
    name: 'Kampung Modal (Crowdfunding Sovereign)', 
    desc: 'Alokasi modal adil dengan ring-fencing dan blockchain verified', 
    color: '#84cc16', 
    bgColor: 'from-lime-50 to-lime-100',
    features: ['Ring-Fencing', 'Escrow Account', 'Blockchain Verified', '24 Bulan Lock-up']
  },
]

const stats = [
  { icon: TrendingUp, value: 'Rp 2,5T+', label: 'Revenue 2025', color: '#8B0000' },
  { icon: Users, value: '125.000+', label: 'Anggota Aktif', color: '#008F3D' },
  { icon: Globe, value: '83.763', label: 'Desa Terjangkau', color: '#22c55e' },
  { icon: Shield, value: '100%', label: 'Transparansi', color: '#0d9488' },
]

export default function UnitUsahaPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-6 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                AD Pasal 9
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              13 Pilar <span className="text-[#8B0000]">Bisnis Terintegrasi</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 mb-8"
            >
              Ekosistem bisnis terlengkap yang mengintegrasikan seluruh aspek ekonomi desa Indonesia — dari fintech hingga trading global
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/kontak">
                <Button className="bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#B22222] hover:to-[#DC143C] text-white px-8 py-6 text-lg shadow-lg shadow-red-900/20">
                  Konsultasi Gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilar Bisnis Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {pilars.map((pilar, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-br ${pilar.bgColor} p-6`}>
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-md group-hover:scale-110 transition-transform duration-300"
                        >
                          <pilar.icon className="w-8 h-8" style={{ color: pilar.color }} />
                        </div>
                        <Badge 
                          className="bg-white/80 text-gray-700 border-0"
                        >
                          Pilar {i + 1}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mt-4">{pilar.name}</h3>
                      <p className="text-gray-600 mt-2">{pilar.desc}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-3">
                        {pilar.features.map((feature, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: pilar.color }} />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link href="/kontak" className="block mt-6">
                        <Button 
                          variant="outline" 
                          className="w-full border-gray-200 text-gray-700 hover:bg-red-50 hover:text-[#8B0000] hover:border-[#8B0000]"
                        >
                          Pelajari Lebih Lanjut
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#8B0000] via-[#B22222] to-[#8B0000]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Bergabung dengan Ekosistem KNMP?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Dapatkan akses ke seluruh 13 pilar bisnis terintegrasi dan rasakan manfaatnya untuk pertumbuhan usaha Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak">
                <Button size="lg" className="bg-white text-[#8B0000] hover:bg-gray-100 px-8 py-6">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/tentang">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                  Tentang KNMP
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
