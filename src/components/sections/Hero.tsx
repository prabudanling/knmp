'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import Link from 'next/link'
import { 
  Play, 
  ArrowRight, 
  Shield, 
  Database, 
  Eye, 
  Sparkles,
  ChevronDown,
  Globe,
  Users,
  Building2,
  Zap,
  TrendingUp,
  Target,
  Compass,
  Rocket,
  AlertTriangle,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

// Pre-generated particle positions (deterministic)
const particlePositions = Array.from({ length: 12 }, (_, i) => ({
  left: `${10 + (i * 7) % 85}%`,
  top: `${15 + (i * 8) % 75}%`,
  delay: i * 0.3,
  size: i % 3 === 0 ? 'w-3 h-3' : i % 2 === 0 ? 'w-2 h-2' : 'w-1.5 h-1.5',
}))

// Floating icons - hidden on mobile
const floatingIcons = [
  { icon: Building2, x: '8%', y: '25%', delay: 0, color: '#8B0000' },
  { icon: Users, x: '88%', y: '20%', delay: 0.5, color: '#D4AF37' },
  { icon: Globe, x: '5%', y: '75%', delay: 1, color: '#22c55e' },
  { icon: TrendingUp, x: '92%', y: '70%', delay: 1.5, color: '#3b82f6' },
]

// Stats data - Professional, Precise & Powerful
const stats = [
  { value: '83.763', label: 'Desa Terhubung', sublabel: '(target nasional)', icon: Building2, color: '#8B0000' },
  { value: '6', label: 'Kelompok Pihak', sublabel: 'Anggota (KPA)', icon: Users, color: '#D4AF37' },
  { value: '195', label: 'Akses Potensial', sublabel: 'ke Negara', icon: Globe, color: '#22c55e' },
  { value: 'Rp 2.000 T', label: 'Target Volume', sublabel: 'Transaksi 2045', icon: Target, color: '#3b82f6' },
]

// Simpanan data
const simpananData = [
  { name: 'Simpanan Pokok', desc: 'Dibayar sekali saat mendaftar', icon: Wallet, color: '#8B0000' },
  { name: 'Simpanan Wajib', desc: 'Dibayar berkala sesuai KPA', icon: Database, color: '#D4AF37' },
  { name: 'Simpanan Sukarela', desc: 'Atas kehendak anggota', icon: TrendingUp, color: '#22c55e' },
]

// Scroll Progress Bar Component - Clean & Professional
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const [currentSection, setCurrentSection] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', name: 'Beranda' },
        { id: 'visi-misi', name: 'Visi & Misi' },
        { id: 'ecosystem', name: 'Ekosistem' },
        { id: 'unit-usaha', name: 'Unit Usaha' },
        { id: 'marketplace', name: 'Marketplace' },
        { id: 'logistik', name: 'Logistik' },
        { id: 'smart-village', name: 'Desa Cerdas' },
      ]
      
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].name)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Progress Bar - Thin line only, no background */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[100] h-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000] origin-left"
          style={{ scaleX }}
        />
      </motion.div>
      
      {/* Section indicator - Only visible on Desktop, positioned below header */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-4 top-20 z-[90] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-gray-100"
        >
          <span className="text-xs font-medium text-gray-600">
            {currentSection || 'Beranda'}
          </span>
        </motion.div>
      )}
    </>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse parallax (desktop only)
  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      <section
        ref={ref}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/40 to-amber-50/30" />
          
          {/* Animated mesh gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,0,0,0.08), transparent)',
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Gold accent glow */}
          <motion.div
            className="absolute top-1/3 right-0 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Merah accent glow */}
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,0,0,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B0000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          {/* Floating particles - fewer on mobile */}
          {particlePositions.slice(0, isMobile ? 5 : 12).map((pos, i) => (
            <motion.div
              key={i}
              className={cn('absolute rounded-full', pos.size)}
              style={{
                left: pos.left,
                top: pos.top,
                backgroundColor: i % 2 === 0 ? 'rgba(139,0,0,0.15)' : 'rgba(212,175,55,0.2)',
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                delay: pos.delay,
              }}
            />
          ))}

          {/* Floating Icons - desktop only */}
          {!isMobile && floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              className="absolute hidden lg:block"
              style={{ left: item.x, top: item.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ delay: item.delay + 1, duration: 0.5 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20"
        >
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-4 sm:mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center"
              >
                <Badge className="bg-gradient-to-r from-red-100 to-amber-100 text-[#8B0000] border border-red-200/50 px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-shadow cursor-default">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#D4AF37]" />
                  Platform Koperasi Digital #1 Indonesia
                </Badge>
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight text-center"
            >
              <span className="block">Navigasi Peradaban Dunia Baru</span>
              <motion.span 
                className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#D4AF37] bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 100%' }}
              >
                VISI DESA FUTURISTIK 2028 
              </motion.span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 text-center mt-4 sm:mt-6 px-2"
            >
              <span className="bg-gradient-to-r from-[#8B0000] to-[#B22222] bg-clip-text text-transparent">
                Dari Desa untuk Masa Depan Indonesia
              </span>
              <span className="block mt-1 bg-gradient-to-r from-[#008000] to-[#008000] bg-clip-text text-transparent font-bold">
                MENUJU DESA YG BERDIKARI, PANGAN, ENERGI, & KESEHATAN
              </span>
            </motion.p>

            {/* Manifesto Quote */}
            <motion.div
              variants={fadeInUp}
              className="relative max-w-3xl mx-auto py-4 sm:py-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-r from-[#8B0000]/5 via-[#D4AF37]/10 to-[#8B0000]/5 rounded-xl sm:rounded-2xl py-4 sm:py-6 px-4 sm:px-8 border border-[#D4AF37]/20 backdrop-blur-sm">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-sm sm:text-base md:text-lg font-medium text-gray-700 leading-relaxed text-center"
                  >
                    <span className="text-[#8B0000] font-bold text-base sm:text-lg md:text-xl">KNMP</span> adalah{' '}
                    <span className="text-[#8B0000] font-bold">Koperasi Korporasi Multi Pihak</span>
                    {' '}yang mengintegrasikan seluruh sistem ekonomi desa{' '}
                    <span className="bg-gradient-to-r from-[#008000] to-[#008000] bg-clip-text text-transparent font-bold">
                      dari hulu ke hilir
                    </span>
                    , secara{' '}
                    <span className="bg-gradient-to-r from-[#008000] to-[#008000] bg-clip-text text-transparent font-bold">
                      end-to-end
                    </span>
                    , menjadi{' '}
                    <span className="bg-gradient-to-r from-[#008000] to-[#008000] bg-clip-text text-transparent font-bold">
                      one stop service solution
                    </span>
                    {' '}— <span className="text-[#8B0000] font-bold">dirancang untuk menjadi yang terbesar di dunia</span>.
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-4 sm:py-6 max-w-2xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-1.5 sm:mb-2 rounded-lg sm:rounded-xl flex items-center justify-center border shadow-sm group-hover:shadow-md transition-all"
                    style={{ 
                      backgroundColor: `${stat.color}10`,
                      borderColor: `${stat.color}20`
                    }}
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-700 font-semibold">{stat.label}</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500">{stat.sublabel}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link href="/membership" className="block">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#B22222] hover:to-[#DC143C] text-white px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg shadow-xl shadow-red-900/20 hover:shadow-red-900/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Gabung Sekarang</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link href="/tentang" className="block">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#8B0000] hover:text-[#8B0000] px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg bg-white/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Eksplor Platform
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges - Enhanced Credibility */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6"
            >
              {[
                { icon: Shield, text: 'Legal & Terdaftar', color: '#22c55e' },
                { icon: Database, text: 'Blockchain', color: '#3b82f6' },
                { icon: Eye, text: 'Transparan & Akuntabel', color: '#8B0000' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-xs sm:text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: item.color }} />
                  </div>
                  <span className="font-medium hidden sm:inline">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#visi-misi"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer group"
          >
            <span className="text-[10px] sm:text-xs text-gray-400 tracking-wider font-medium group-hover:text-[#8B0000] transition-colors">SCROLL</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B0000]/50 group-hover:text-[#8B0000] transition-colors" />
          </motion.a>
        </motion.div>
      </section>

      {/* Simpanan Section - Separate from Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-red-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <Badge className="bg-gradient-to-r from-red-100 to-amber-100 text-[#8B0000] border border-red-200/50 px-4 py-1.5 text-sm font-medium mb-4">
                <Wallet className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Simpanan Anggota
              </Badge>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Sistem Simpanan{' '}
                <span className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] bg-clip-text text-transparent">
                  KNMP
                </span>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Berdasarkan AD/ART Pasal 18, setiap anggota memiliki kewajiban simpanan yang menjadi modal koperasi
              </p>
            </div>

            {/* Simpanan Cards */}
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              {simpananData.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative p-5 sm:p-6 bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all group"
                  style={{ borderColor: `${item.color}20` }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
              <Shield className="w-3 h-3 inline mr-1" />
              Simpanan Sukarela tidak mempengaruhi hak suara dalam RAT. Modal Penyertaan dari KPA-6 (Investor) maksimal 30% total modal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigasi Peradaban Section - Separate from Hero */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-[#8B0000] via-[#9B0F0F] to-[#8B0000] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l4 3.5-4 3.5z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '40px 40px'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Decorative circles */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10 text-center">
                {/* Compass Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] mb-4 sm:mb-6 shadow-xl shadow-black/20"
                >
                  <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-[#8B0000]" />
                </motion.div>

                {/* Main Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 sm:mb-3"
                >
                  NAVIGASI PERADABAN DUNIA BARU
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-white/90 font-medium mb-4 sm:mb-6 max-w-2xl mx-auto"
                >
                  Mereka yang bergabung hari ini akan menjadi{' '}
                  <span className="text-[#D4AF37] font-bold">arsitek masa depan</span>.
                  <br className="hidden sm:block" />
                  Mereka yang menunda akan menjadi{' '}
                  <span className="text-white/60">penonton sejarah</span>.
                </motion.p>

                {/* Warning/Opportunity Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm text-white font-medium">Kesempatan Tidak Datang Dua Kali</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/membership">
                      <Button className="bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B0000] font-bold px-6 py-2.5 shadow-lg group">
                        <Rocket className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Mulai Perjalanan
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Stats mini */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 pt-6 border-t border-white/10"
                >
                  {[
                    { value: '125.000+', label: 'Sudah Bergabung' },
                    { value: '38', label: 'Provinsi' },
                    { value: '2026', label: 'Tahun Berdiri' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg sm:text-xl font-bold text-[#D4AF37]">{item.value}</p>
                      <p className="text-xs sm:text-sm text-white/70">{item.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
