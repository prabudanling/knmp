'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  Target,
  Heart,
  Scale,
  Gavel,
  Briefcase,
  Cpu,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Flag,
  Rocket,
  Trophy,
  Wheat,
  Factory,
  Wallet,
  Landmark,
  Shield,
  GraduationCap,
  Handshake,
  Building2,
  TrendingUp,
  MapPin,
  Crown,
  Zap,
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

// Animated Counter Component
function AnimatedCounter({ 
  target, 
  suffix = '', 
  prefix = '', 
  duration = 2 
}: { 
  target: number
  suffix?: string
  prefix?: string
  duration?: number 
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    if (isInView) {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.floor(target * easeOut))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

// VISI Data - Complete comprehensive vision
const VISI_TEXT = {
  main: "Menjadi Digital Operating System Desa Indonesia Terbesar di Dunia",
  details: [
    "mengintegrasikan 45+ kelembagaan desa ke dalam satu platform digital terunifikasi via kopnusa.id",
    "menghubungkan 83.763 desa dan kelurahan Indonesia ke 195 negara",
    "mewujudkan kedaulatan ekonomi rakyat melalui Gotong Royong 4.0, Blockchain, dan AI",
  ],
  target: {
    value: 500,
    unit: "Triliun",
    label: "Target Transaksi 2045",
    icon: TrendingUp,
  },
  members: {
    value: 10,
    unit: "Juta",
    label: "Anggota Koperasi",
    icon: Users,
  },
  benchmark: "melampaui Koperasi Terbesar dunia saat ini yaitu Mondragon Corporation Spanyol"
}

// 4 MISI Data
const MISI_DATA = [
  {
    number: 1,
    keyword: "MENGHIMPUN",
    title: "Menghimpun Kapasitas Anggota",
    description: "MENGHIMPUN kapasitas anggota KNMP untuk ekosistem ekonomi desa yang kuat, mandiri, dan berkelanjutan.",
    icon: Users,
    color: "#8B0000",
    gradient: "from-[#8B0000] to-[#B22222]",
  },
  {
    number: 2,
    keyword: "MENGINTEGRASIKAN",
    title: "Integrasi Sistem Ekonomi",
    description: "MENGINTEGRASIKAN sistem ekonomi dari desa hingga nasional dan global — menghubungkan 45+ kelembagaan desa yang selama ini berjalan silo.",
    icon: Building2,
    color: "#D4AF37",
    gradient: "from-[#D4AF37] to-[#FFD700]",
  },
  {
    number: 3,
    keyword: "MENGAKSELERASI",
    title: "Akselerasi Akses Pasar",
    description: "MENGAKSELERASI akses pasar domestik dan internasional, pembiayaan inklusif, dan pelatihan bagi seluruh anggota tanpa terkecuali.",
    icon: Rocket,
    color: "#3b82f6",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    number: 4,
    keyword: "MENDIPLOMASI",
    title: "Diplomasi Ekonomi Global",
    description: "MENDIPLOMASI hubungan ekonomi dalam dan luar negeri — membangun jaringan ekspor ke 195 negara via KNMP Global Trade Desk.",
    icon: Globe,
    color: "#22c55e",
    gradient: "from-green-500 to-green-600",
  },
]

// 4 BRAND Data
const BRAND_DATA = [
  {
    number: 1,
    title: "DESA MANDIRI PANGAN DAN ENERGI",
    tagline: "Dari Lumbung Sendiri, Untuk Meja Makan Dunia",
    icon: Wheat,
    color: "#22c55e",
    bgGradient: "from-green-50 to-emerald-100",
    borderGradient: "from-green-400 to-emerald-500",
  },
  {
    number: 2,
    title: "DESA INDUSTRI BERBASIS EKSPOR",
    tagline: "Produk Desa Indonesia — Untuk Meja Makan 195 Negara",
    icon: Factory,
    color: "#3b82f6",
    bgGradient: "from-blue-50 to-indigo-100",
    borderGradient: "from-blue-400 to-indigo-500",
  },
  {
    number: 3,
    title: "DESA FINANSIAL INKLUSIF",
    tagline: "Tidak ada satu pun warga desa yang tidak memiliki akses pada permodalan",
    icon: Wallet,
    color: "#D4AF37",
    bgGradient: "from-amber-50 to-yellow-100",
    borderGradient: "from-amber-400 to-yellow-500",
  },
  {
    number: 4,
    title: "DESA WARISAN DUNIA",
    tagline: "Kearifan Lokal Desa — Aset Budaya untuk Peradaban Global",
    icon: Landmark,
    color: "#8B0000",
    bgGradient: "from-red-50 to-rose-100",
    borderGradient: "from-red-400 to-rose-500",
  },
]

// 7 PRINSIP KOPERASI ICA
const PRINSIP_KOPERASI = [
  {
    number: 1,
    title: "Keanggotaan Bersifat Sukarela dan Terbuka",
    icaTitle: "Voluntary and Open Membership",
    description: "Koperasi adalah organisasi sukarela, terbuka bagi semua orang yang mampu menggunakan jasa koperasi dan bersedia menerima tanggung jawab keanggotaan.",
    icon: Users,
    color: "#8B0000",
  },
  {
    number: 2,
    title: "Pengelolaan Dilakukan Secara Demokratis",
    icaTitle: "Democratic Member Control",
    description: "Koperasi adalah organisasi yang dikelola secara demokratis oleh anggota yang aktif berpartisipasi dalam menetapkan kebijakan dan mengambil keputusan.",
    icon: Scale,
    color: "#D4AF37",
  },
  {
    number: 3,
    title: "Pembagian SHU Dilakukan Secara Adil",
    icaTitle: "Member Economic Participation",
    description: "Anggota berkontribusi secara adil dan mengendalikan modal secara demokratis. SHU dibagi berdasarkan kontribusi transaksi anggota.",
    icon: TrendingUp,
    color: "#22c55e",
  },
  {
    number: 4,
    title: "Otonomi dan Kemandirian",
    icaTitle: "Autonomy and Independence",
    description: "Koperasi bersifat otonom dan mandiri, organisasi swadaya yang dikelola oleh anggota. Jika bermitra, harus tetap menjaga otonomi.",
    icon: Shield,
    color: "#3b82f6",
  },
  {
    number: 5,
    title: "Pendidikan dan Pelatihan",
    icaTitle: "Education, Training and Information",
    description: "Koperasi menyediakan pendidikan dan pelatihan bagi anggota, pengurus, dan karyawan agar dapat berkontribusi efektif.",
    icon: GraduationCap,
    color: "#8b5cf6",
  },
  {
    number: 6,
    title: "Kerjasama Antar Koperasi",
    icaTitle: "Cooperation among Cooperatives",
    description: "Koperasi melayani anggota secara efektif dan memperkuat gerakan koperasi melalui kerjasama antar koperasi lokal, nasional, dan internasional.",
    icon: Handshake,
    color: "#f59e0b",
  },
  {
    number: 7,
    title: "Kepedulian Terhadap Komunitas",
    icaTitle: "Concern for Community",
    description: "Koperasi bekerja demi pembangunan berkelanjutan bagi komunitas melalui kebijakan yang disetujui oleh anggota.",
    icon: Heart,
    color: "#ec4899",
  },
]

// TARGET 2045 Data - Mondragon Comparison
const TARGET_2045 = {
  knmp: {
    revenue: { value: 500, unit: "Triliun", equivalent: "~€30 Miliar" },
    members: { value: 10, unit: "Juta" },
    villages: { value: 83763, unit: "Desa" },
    countries: { value: 195, unit: "Negara" },
  },
  mondragron: {
    revenue: "€11.2 Miliar",
    members: "80.000",
    founded: 1956,
    country: "Spanyol",
    description: "Koperasi terbesar di dunia saat ini",
  },
  comparison: {
    ratio: "2.5x",
    statement: "KNMP akan menjadi 2.5x lebih besar dari Mondragon",
  }
}

export function VisiMisiSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="visi-misi" className="relative py-20 md:py-28 bg-gradient-to-b from-white via-red-50/30 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-50/30 to-transparent rounded-full" />
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
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4 px-4 py-1.5 text-sm">
              <Target className="w-4 h-4 mr-2" />
              Visi & Misi KNMP
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Menuju <span className="text-[#8B0000]">World Class</span> Cooperative
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Transformasi ekonomi desa Indonesia menuju kedaulatan digital global
          </motion.p>
        </motion.div>

        {/* ==================== VISI SECTION ==================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Badge className="bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white border-0 mb-4 px-4 py-1.5 text-sm">
              <Crown className="w-4 h-4 mr-2" />
              VISI UTAMA
            </Badge>
          </motion.div>

          {/* Main Vision Card */}
          <motion.div variants={scaleIn}>
            <Card className="relative overflow-hidden border-2 border-[#8B0000]/20 bg-gradient-to-br from-white via-red-50/30 to-amber-50/20 shadow-2xl">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#8B0000]/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <CardContent className="relative p-8 md:p-12 lg:p-16">
                <div className="max-w-5xl mx-auto">
                  {/* Main Vision Statement */}
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#B22222] flex items-center justify-center shadow-lg">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                      "Menjadi <span className="text-[#D4AF37]">Digital Operating System</span> Desa Indonesia{' '}
                      <span className="text-[#8B0000]">Terbesar di Dunia</span>"
                    </h3>
                    
                    {/* Vision Details */}
                    <div className="space-y-4 text-left max-w-3xl mx-auto">
                      {VISI_TEXT.details.map((detail, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B0000] to-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                          <p className="text-gray-700 text-base md:text-lg">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Target Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#8B0000]/10 text-center"
                    >
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[#8B0000]" />
                      <div className="text-2xl md:text-3xl font-bold text-[#8B0000]">
                        <AnimatedCounter target={500} suffix=" T" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Target Transaksi 2045</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#D4AF37]/10 text-center"
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                      <div className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                        <AnimatedCounter target={10} suffix=" Juta" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Anggota Koperasi</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-blue-100 text-center"
                    >
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl md:text-3xl font-bold text-blue-600">
                        <AnimatedCounter target={83763} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Desa Terintegrasi</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-green-100 text-center"
                    >
                      <Globe className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl md:text-3xl font-bold text-green-600">
                        <AnimatedCounter target={195} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Negara Tujuan Ekspor</p>
                    </motion.div>
                  </div>

                  {/* Benchmark Statement */}
                  <div className="mt-8 text-center">
                    <p className="text-sm md:text-base text-gray-600 italic">
                      <span className="text-[#8B0000] font-semibold">Target:</span> {VISI_TEXT.benchmark}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* ==================== 4 MISI SECTION ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4 px-4 py-1.5 text-sm">
              <Flag className="w-4 h-4 mr-2" />
              MISI STRATEGIS
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              4 Misi <span className="text-[#D4AF37]">KNMP</span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {MISI_DATA.map((misi) => (
              <motion.div
                key={misi.number}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group"
              >
                <Card className="h-full bg-white border border-gray-100 hover:border-[#8B0000]/20 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Top accent line */}
                  <div className={`h-1 bg-gradient-to-r ${misi.gradient}`} />
                  
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Number Badge */}
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: misi.color }}
                      >
                        <misi.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        {/* Keyword */}
                        <div 
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-2"
                          style={{ backgroundColor: `${misi.color}15`, color: misi.color }}
                        >
                          {misi.keyword}
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8B0000] transition-colors">
                          {misi.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {misi.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== 4 BRAND SECTION ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <Badge className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] text-white border-0 mb-4 px-4 py-1.5 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              BRAND PILAR
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              4 Brand <span className="text-[#8B0000]">Unggulan</span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BRAND_DATA.map((brand) => (
              <motion.div
                key={brand.number}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${brand.bgGradient} opacity-50`} />
                  
                  {/* Top gradient border */}
                  <div className={`h-1.5 bg-gradient-to-r ${brand.borderGradient}`} />
                  
                  <CardContent className="relative p-6 text-center">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: brand.color }}
                    >
                      <brand.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Number */}
                    <div 
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white mb-3"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.number}
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-sm font-bold text-gray-900 mb-3 leading-tight">
                      {brand.title}
                    </h4>
                    
                    {/* Tagline */}
                    <p 
                      className="text-xs leading-relaxed italic"
                      style={{ color: brand.color }}
                    >
                      "{brand.tagline}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== 7 PRINSIP KOPERASI ICA SECTION ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 px-4 py-1.5 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              PRINSIP KOPERASI ICA
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              7 Prinsip <span className="text-[#8B0000]">Internasional</span>
            </h3>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
              International Cooperative Alliance (ICA) Principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First row: 4 items */}
            {PRINSIP_KOPERASI.slice(0, 4).map((prinsip) => (
              <motion.div
                key={prinsip.number}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${prinsip.color}15` }}
                      >
                        <prinsip.icon className="w-5 h-5" style={{ color: prinsip.color }} />
                      </div>
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: prinsip.color }}
                      >
                        {prinsip.number}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#8B0000] transition-colors">
                      {prinsip.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 italic mb-2">{prinsip.icaTitle}</p>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {prinsip.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Second row: 3 items centered */}
          <div className="grid md:grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
            {PRINSIP_KOPERASI.slice(4).map((prinsip) => (
              <motion.div
                key={prinsip.number}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${prinsip.color}15` }}
                      >
                        <prinsip.icon className="w-5 h-5" style={{ color: prinsip.color }} />
                      </div>
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: prinsip.color }}
                      >
                        {prinsip.number}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#8B0000] transition-colors">
                      {prinsip.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 italic mb-2">{prinsip.icaTitle}</p>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {prinsip.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== TARGET 2045 - MONDRAGON COMPARISON ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 mb-4 px-4 py-1.5 text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              TARGET 2045
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Melampaui <span className="text-[#D4AF37]">Mondragon</span>
            </h3>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
              Benchmark dengan koperasi terbesar dunia saat ini
            </p>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mondragon Card */}
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-lg overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-gray-400 to-gray-500" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Mondragon Corporation</h4>
                      <p className="text-xs text-gray-500">Spanyol • Est. 1956</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-gray-600 border-gray-300">
                      #1 Dunia Saat Ini
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                      <TrendingUp className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <div className="text-xl font-bold text-gray-900">€11.2 B</div>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
                      <Users className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <div className="text-xl font-bold text-gray-900">80.000</div>
                      <p className="text-xs text-gray-500">Members</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center italic">
                    Koperasi terbesar di dunia saat ini
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* KNMP Target Card */}
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full bg-gradient-to-br from-red-50 via-amber-50/50 to-white border-2 border-[#8B0000]/20 shadow-xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#B22222] flex items-center justify-center shadow-lg">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">KNMP Target 2045</h4>
                      <p className="text-xs text-gray-500">Indonesia • Est. 2026</p>
                    </div>
                    <Badge className="ml-auto bg-gradient-to-r from-[#8B0000] to-[#D4AF37] text-white border-0">
                      Target 2.5x
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-[#8B0000]/10">
                      <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[#8B0000]" />
                      <div className="text-xl font-bold text-[#8B0000]">
                        Rp 500 T
                      </div>
                      <p className="text-xs text-gray-500">~€30 Miliar</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-[#D4AF37]/10">
                      <Users className="w-6 h-6 mx-auto mb-2 text-[#D4AF37]" />
                      <div className="text-xl font-bold text-[#D4AF37]">
                        10 Juta
                      </div>
                      <p className="text-xs text-gray-500">Members</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-[#8B0000]/5 to-[#D4AF37]/5 rounded-lg border border-[#8B0000]/10">
                    <p className="text-xs text-center text-gray-700">
                      <span className="font-bold text-[#8B0000]">125x</span> lebih banyak anggota dari Mondragon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Comparison Statement */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <Card className="inline-block bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white border-0 shadow-xl">
              <CardContent className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-[#D4AF37]" />
                  <span className="font-semibold">
                    KNMP akan menjadi <span className="text-[#D4AF37]">2.5x lebih besar</span> dari Mondragon pada 2045
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/visi-misi">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#B22222] hover:to-[#8B0000] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Lihat Detail Visi Misi Lengkap
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
