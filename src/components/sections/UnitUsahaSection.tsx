'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Monitor, 
  Building2, 
  Warehouse, 
  TrendingUp, 
  Truck,
  ChevronDown,
  ChevronRight,
  Globe,
  Shield,
  Heart,
  GraduationCap,
  Wallet,
  MapPin,
  Leaf,
  Fish,
  Plane,
  Zap,
  Package,
  Users,
  Database,
  Barcode,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

// 5 Pilar Unit Usaha
const PILAR_UNIT_USAHA = [
  {
    id: 1,
    name: 'Desa Cerdas Digital',
    icon: Monitor,
    color: '#8B0000',
    description: 'Mengintegrasikan seluruh kelembagaan sosial desa ke dalam satu platform digital',
    subPilar: [
      { name: 'Desa Digital', desc: 'Village Management System terintegrasi SID, Prodeskel, Siskeudes', icon: Database },
      { name: 'Desa Aman', desc: 'Smart CCTV, BMKG Alert, Perlindungan Data', icon: Shield },
      { name: 'Desa Sehat', desc: 'Posyandu Digital, Health Score, integrasi PKK dan Pamsimas', icon: Heart },
      { name: 'Desa Pintar', desc: 'JE-P3 Academy, Karang Taruna Digital, Perpustakaan Digital', icon: GraduationCap },
      { name: 'Desa Kaya', desc: 'Family Economy Tracker, KUBE Digital, Graduasi Kemiskinan', icon: Wallet },
      { name: 'Desa Modern', desc: 'Cultural Heritage, Desa Wisata Digital, Infrastruktur Tracker', icon: MapPin },
    ]
  },
  {
    id: 2,
    name: 'Holding Desa',
    icon: Building2,
    color: '#D4AF37',
    description: 'Menyatukan KDMP, BUMDes, BUMDesMA, Dana Desa, dan KUD dalam satu orkestra kelembagaan',
    subPilar: [
      { name: 'KDMP-as-a-Service', desc: '80.081 gerai KDMP terintegrasi', icon: Package },
      { name: 'BUMDes & BUMDesMA', desc: 'Digitalisasi 57.000+ BUMDes ke KPA 3', icon: Building2 },
      { name: 'Dana Desa Intelligence', desc: 'Analisis alokasi optimal Rp71 triliun/tahun', icon: TrendingUp },
      { name: 'KUD Revitalisasi', desc: 'Migrasi anggota aktif KUD ke ekosistem KNMP', icon: Users },
    ]
  },
  {
    id: 3,
    name: 'Resi Gudang Digital',
    icon: Warehouse,
    color: '#22c55e',
    description: 'Membangun infrastruktur pasca-panen yang membebaskan petani dari jerat tengkulak',
    subPilar: [
      { name: 'Hilirisasi Komoditas', desc: 'Pengolahan bahan baku menjadi produk jadi di level desa', icon: Package },
      { name: 'Resi Gudang BAPPEBTI', desc: 'Upgrade Lumbung Pangan Desa menjadi agunan kredit digital', icon: Barcode },
      { name: 'Supply Chain Tokenization', desc: 'Blockchain traceability dari benih hingga buyer global', icon: Database },
      { name: 'Cold Chain Network', desc: '80.081 Collection Point, 5.000+ Hub, 38 Distribution Hub', icon: Truck },
    ]
  },
  {
    id: 4,
    name: 'Investasi & Kampung Modal',
    icon: TrendingUp,
    color: '#3b82f6',
    description: 'Mengubah potensi desa menjadi aset investasi yang bankable dan menguntungkan seluruh anggota',
    subPilar: [
      { name: 'Pertanian Presisi', desc: 'Smart Farming AI, IoT, BMKG, KUR Desa via JP3 Pay', icon: Leaf },
      { name: 'Perkebunan Ekspor', desc: 'Sertifikasi organik/Fair Trade, mini-processing', icon: Globe },
      { name: 'Peternakan', desc: 'Village Protein Hub, sertifikasi Halal MUI + GCC, ekspor 57 negara OKI', icon: Heart },
      { name: 'Perikanan', desc: 'Digital Fishery Hub, Fish Auction Blockchain', icon: Fish },
      { name: 'Desa Wisata', desc: 'Platform booking, homestay, OTA global, Heritage NFT', icon: Plane },
      { name: 'Energi Desa', desc: 'Biogas, panel surya, micro-hydro, Carbon Credits', icon: Zap },
    ]
  },
  {
    id: 5,
    name: 'Logistik Digital',
    icon: Truck,
    color: '#8b5cf6',
    description: 'Membangun jaringan logistik terintegrasi dari desa ke dunia',
    subPilar: [
      { name: 'Ekspor Digital', desc: 'KNMP Global Trade Desk, FCL Consolidation, sertifikasi kolektif', icon: Globe },
      { name: 'Impor Strategis', desc: 'Group Purchasing Order, penghematan 30-50%', icon: Package },
      { name: 'Karang Taruna Digital', desc: '83.763 agen logistik desa, pelatihan 10 jam, starter kit', icon: Users },
      { name: 'Tokenisasi Rantai Pasok', desc: 'Blockchain track & trace, Supply Chain Finance Rp50 triliun', icon: Database },
      { name: 'Infrastruktur 3 Level', desc: '80.081 CP, 5.000+ Hub, 38 Distribution Hub', icon: MapPin },
    ]
  },
]

export function UnitUsahaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedPilar, setExpandedPilar] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="unit-usaha"
      className="py-20 md:py-28 bg-gradient-to-b from-white via-red-50/30 to-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-red-100 to-amber-100 text-[#8B0000] border border-red-200/50 px-4 py-1.5 text-sm font-medium mb-4">
              5 Pilar Unit Usaha
            </Badge>
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] bg-clip-text text-transparent">
              Digital Operating System
            </span>
            <br />
            Desa Indonesia
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            KNMP menjalankan usaha dalam 5 Pilar Strategis yang saling terintegrasi
            sebagai fondasi ekonomi kerakyatan dari desa hingga dunia.
          </motion.p>
        </motion.div>

        {/* Pilar Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-6"
        >
          {PILAR_UNIT_USAHA.map((pilar, index) => (
            <motion.div key={pilar.id} variants={fadeInUp}>
              <Card 
                className={cn(
                  "border-2 transition-all duration-300 cursor-pointer overflow-hidden",
                  expandedPilar === pilar.id 
                    ? "border-[#8B0000]/50 shadow-xl shadow-red-900/10" 
                    : "border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg"
                )}
                onClick={() => setExpandedPilar(expandedPilar === pilar.id ? null : pilar.id)}
              >
                <CardHeader className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${pilar.color}15` }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <pilar.icon className="w-8 h-8" style={{ color: pilar.color }} />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl md:text-2xl text-gray-900 mb-1">
                            Pilar {pilar.id}: {pilar.name}
                          </CardTitle>
                          <CardDescription className="text-gray-600 text-base">
                            {pilar.description}
                          </CardDescription>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedPilar === pilar.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="hidden md:block"
                        >
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </div>
                      
                      {/* Sub-pilar count badge */}
                      <div className="flex items-center gap-3 mt-3">
                        <Badge 
                          variant="outline"
                          className="border-red-100 text-gray-600"
                        >
                          {pilar.subPilar.length} Sub-Pilar
                        </Badge>
                        <div className="flex -space-x-2">
                          {pilar.subPilar.slice(0, 4).map((sub, i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full bg-white border-2 border-white flex items-center justify-center"
                              style={{ 
                                backgroundColor: i === 0 ? `${pilar.color}20` : 'white',
                                borderColor: pilar.color
                              }}
                            >
                              <sub.icon className="w-3.5 h-3.5" style={{ color: pilar.color }} />
                            </div>
                          ))}
                          {pilar.subPilar.length > 4 && (
                            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                              +{pilar.subPilar.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedPilar === pilar.id ? 'auto' : 0,
                    opacity: expandedPilar === pilar.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="border-t border-red-100 pt-4 mt-2">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pilar.subPilar.map((sub, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: expandedPilar === pilar.id ? 1 : 0,
                              x: expandedPilar === pilar.id ? 0 : -10,
                            }}
                            transition={{ delay: subIndex * 0.05 }}
                            className="flex items-start gap-3 p-4 rounded-xl bg-red-50/50 hover:bg-red-50 transition-colors group"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: `${pilar.color}20` }}
                            >
                              <sub.icon className="w-5 h-5" style={{ color: pilar.color }} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {sub.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {sub.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Infrastructure Stats */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-[#8B0000] to-[#B22222] text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            
            <CardContent className="p-8 relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Infrastruktur Jaringan KNMP
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">80.081</p>
                  <p className="text-sm text-white/80 mt-1">Collection Point</p>
                  <p className="text-xs text-white/60">(Level Desa)</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">5.000+</p>
                  <p className="text-sm text-white/80 mt-1">Hub Kecamatan</p>
                  <p className="text-xs text-white/60">(Level Kecamatan)</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">38</p>
                  <p className="text-sm text-white/80 mt-1">Distribution Hub</p>
                  <p className="text-xs text-white/60">(Level Provinsi)</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">195</p>
                  <p className="text-sm text-white/80 mt-1">Negara Tujuan</p>
                  <p className="text-xs text-white/60">(Ekspor Global)</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4">
                <p className="text-white/80 text-sm">Dari Desa untuk Indonesia — Dari Indonesia untuk Dunia</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
