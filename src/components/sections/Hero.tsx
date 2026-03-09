'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
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
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

// Pre-generated particle positions (deterministic)
const particlePositions = [
  { left: '10%', top: '20%', delay: 0 },
  { left: '25%', top: '15%', delay: 1 },
  { left: '40%', top: '30%', delay: 2 },
  { left: '55%', top: '10%', delay: 0.5 },
  { left: '70%', top: '25%', delay: 1.5 },
  { left: '85%', top: '18%', delay: 2.5 },
  { left: '15%', top: '45%', delay: 3 },
  { left: '30%', top: '55%', delay: 0.8 },
  { left: '45%', top: '50%', delay: 1.8 },
  { left: '60%', top: '60%', delay: 2.8 },
  { left: '75%', top: '45%', delay: 3.5 },
  { left: '90%', top: '55%', delay: 1.2 },
  { left: '20%', top: '75%', delay: 2.2 },
  { left: '50%', top: '80%', delay: 3.2 },
  { left: '80%', top: '70%', delay: 0.3 },
]

// Floating icons around hero
const floatingIcons = [
  { icon: Building2, x: '10%', y: '30%', delay: 0, color: '#8B0000' },
  { icon: Users, x: '85%', y: '25%', delay: 0.5, color: '#D4AF37' },
  { icon: Globe, x: '5%', y: '70%', delay: 1, color: '#22c55e' },
  { icon: TrendingUp, x: '90%', y: '65%', delay: 1.5, color: '#3b82f6' },
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const stats = [
    { value: '83.763', label: 'Desa', icon: Building2 },
    { value: '6', label: 'KPA', icon: Users },
    { value: '195', label: 'Negara', icon: Globe },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-amber-50/20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient - bright and clean */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50/40 to-amber-50/30" />
        
        {/* Animated mesh gradient - subtle merah accent */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,0,0,0.08), transparent)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Gold accent glow - subtle */}
        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Merah accent glow - left side */}
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,0,0,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Decorative pattern - very subtle */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B0000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Floating particles - using pre-generated positions */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
              backgroundColor: i % 2 === 0 ? 'rgba(139,0,0,0.15)' : 'rgba(212,175,55,0.2)',
            }}
            animate={{
              y: [0, -80],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}

        {/* Floating Icons */}
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:block"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: item.delay + 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 5 + i,
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
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-red-100 to-amber-100 text-[#8B0000] border border-red-200/50 px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow cursor-default">
              <Sparkles className="w-4 h-4 mr-2 text-[#D4AF37]" />
              Platform Koperasi Digital #1 Indonesia
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight"
          >
            <span className="block">Digital Operating System</span>
            <motion.span 
              className="block mt-2 bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#D4AF37] bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 100%' }}
            >
              Desa Indonesia
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Mengintegrasikan <span className="text-[#8B0000] font-semibold">83.763 Desa</span>, 
            <span className="text-gray-900 font-semibold"> 6 Kelompok Pihak Anggota</span>, 
            {' '}menuju <span className="text-gray-900 font-semibold">195 Negara</span>
          </motion.p>

          {/* Stats Bar */}
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-6 sm:gap-10 py-6"
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center border border-red-100 group-hover:border-[#8B0000]/30 transition-colors">
                  <stat.icon className="w-5 h-5 text-[#8B0000]" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/kontak">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#B22222] hover:to-[#DC143C] text-white px-10 py-7 text-lg shadow-xl shadow-red-900/20 hover:shadow-red-900/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Zap className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Gabung Sekarang</span>
                  <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/tentang">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#8B0000] hover:text-[#8B0000] px-10 py-7 text-lg bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Eksplor Platform
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-8"
          >
            {[
              { icon: Shield, text: 'Terdaftar & Diawasi', color: '#22c55e' },
              { icon: Database, text: 'Blockchain Verified', color: '#3b82f6' },
              { icon: Eye, text: 'Transparansi Total', color: '#8B0000' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2 text-gray-600 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#visi-misi"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-xs text-gray-400 tracking-wider font-medium group-hover:text-[#8B0000] transition-colors">SCROLL</span>
          <ChevronDown className="w-5 h-5 text-[#8B0000]/50 group-hover:text-[#8B0000] transition-colors" />
        </motion.a>
      </motion.div>
    </section>
  )
}
