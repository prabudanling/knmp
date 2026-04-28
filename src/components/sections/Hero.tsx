'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'
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
  Crown,
  Gem,
  Star,
  Orbit,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ============================================
// LUXURY PARTICLES - 30+ floating particles with multiple colors
// ============================================
const LUXURY_PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: `${(i * 2.86) % 100}%`,
  y: `${(i * 4.29 + 10) % 100}%`,
  size: i % 5 === 0 ? 5 : i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  delay: i * 0.18,
  duration: 6 + (i % 6) * 2,
  color:
    i % 5 === 0
      ? '#D4AF37'
      : i % 5 === 1
        ? '#008F3D'
        : i % 5 === 2
          ? '#8B0000'
          : i % 5 === 3
            ? '#f59e0b'
            : '#3b82f6',
}))

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const floatingBadge = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 1.5, -1.5, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

// Stats data - LUXURY GOLD ACCENTS
const stats = [
  { value: '83.763', label: 'Desa Terintegrasi', sublabel: '(target nasional)', icon: Building2, color: '#008F3D', secondaryColor: '#00C853' },
  { value: '5', label: 'Kelompok Pihak Anggota', sublabel: '(KPA)', icon: Users, color: '#8B0000', secondaryColor: '#DC143C' },
  { value: '9', label: 'Pilar Kampung', sublabel: '(9 Program)', icon: Target, color: '#D4AF37', secondaryColor: '#F5E6B8' },
  { value: '195', label: 'Negara Terhubung', sublabel: '(akses global)', icon: Globe, color: '#3b82f6', secondaryColor: '#60A5FA' },
]

// Simpanan data - LUXURY VERSION
const simpananData = [
  { name: 'Simpanan Pokok', desc: 'Dibayar sekali saat mendaftar', icon: Wallet, color: '#008F3D', secondaryColor: '#00C853' },
  { name: 'Simpanan Wajib', desc: 'Dibayar berkala sesuai KPA', icon: Database, color: '#8B0000', secondaryColor: '#DC143C' },
  { name: 'Simpanan Sukarela', desc: 'Atas kehendak anggota', icon: TrendingUp, color: '#D4AF37', secondaryColor: '#F5E6B8' },
]

// ============================================
// ORBITING ICON COMPONENT
// ============================================
function OrbitIcon({
  icon: Icon,
  color,
  delay,
  radius = 100,
}: {
  icon: React.ElementType
  color: string
  delay: number
  radius?: number
}) {
  return (
    <motion.div
      className="absolute"
      style={{ top: '50%', left: '50%' }}
      animate={{
        x: [0, radius, 0, -radius, 0],
        y: [-radius, 0, radius, 0, -radius],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{ duration: 22, repeat: Infinity, delay, ease: 'linear' }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center opacity-20"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
    </motion.div>
  )
}

// ============================================
// 3D TILT STAT CARD
// ============================================
function LuxuryStatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {/* Animated gradient border on hover */}
        <div
          className={cn(
            'absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500',
            isHovered && 'opacity-100',
          )}
          style={{
            background: `conic-gradient(from var(--angle, 0deg), ${stat.color}, ${stat.secondaryColor}, ${stat.color}, transparent, ${stat.color})`,
            animation: 'spin-border 4s linear infinite',
          }}
        />

        {/* Glow behind card */}
        <div
          className={cn(
            'absolute -inset-3 rounded-3xl blur-xl opacity-0 transition-opacity duration-700',
            isHovered && 'opacity-25',
          )}
          style={{
            background: `radial-gradient(circle, ${stat.color}40, transparent 70%)`,
          }}
        />

        {/* Card body */}
        <div
          className="relative text-center group rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/95 via-white/90 to-white/80 backdrop-blur-md border border-gray-200/50 transition-all duration-500"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Icon with pulse ring */}
          <div className="relative mx-auto mb-3 w-fit">
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${stat.color}15, ${stat.secondaryColor}20)`,
                boxShadow: `0 4px 15px ${stat.color}20`,
              }}
              animate={
                isHovered
                  ? {
                      boxShadow: [
                        `0 4px 15px ${stat.color}20`,
                        `0 4px 25px ${stat.color}40`,
                        `0 4px 15px ${stat.color}20`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
            </motion.div>
            {/* Pulse ring on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl border-2"
                  style={{ borderColor: stat.color }}
                />
              )}
            </AnimatePresence>
          </div>

          <p
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight"
            style={{ color: stat.color }}
          >
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1">{stat.label}</p>
          <p className="text-[10px] sm:text-xs text-gray-400">{stat.sublabel}</p>

          {/* Bottom gold accent line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 3D TILT SIMPANAN CARD
// ============================================
function LuxurySimpananCard({
  item,
  index,
}: {
  item: (typeof simpananData)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-120, 120], [5, -5]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-120, 120], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
          setIsHovered(false)
        }}
        className="relative h-full"
      >
        {/* Animated gradient border */}
        <div
          className={cn(
            'absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500',
            isHovered && 'opacity-100',
          )}
          style={{
            background: `conic-gradient(from var(--angle, 0deg), ${item.color}, ${item.secondaryColor}, ${item.color}, transparent, ${item.color})`,
            animation: 'spin-border 4s linear infinite',
          }}
        />

        {/* Glow behind */}
        <div
          className={cn(
            'absolute -inset-4 rounded-3xl blur-xl opacity-0 transition-opacity duration-700',
            isHovered && 'opacity-20',
          )}
          style={{
            background: `radial-gradient(circle, ${item.color}30, transparent 70%)`,
          }}
        />

        {/* Card */}
        <div
          className="relative h-full rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-white via-white/95 to-gray-50/80 backdrop-blur-sm border border-gray-200/50 transition-all duration-500 overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Top animated accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                background: `linear-gradient(90deg, ${item.color}, ${item.secondaryColor}, ${item.color})`,
                backgroundSize: '200% 100%',
              }}
              initial={{ scaleX: 0 }}
              animate={isHovered ? { scaleX: 1, backgroundPosition: ['0% 0%', '100% 0%'] } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Icon with pulse ring */}
          <div className="relative mb-5 w-fit">
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${item.color}10, ${item.secondaryColor}15)`,
                boxShadow: `0 4px 15px ${item.color}15`,
              }}
              animate={
                isHovered
                  ? { scale: 1.08, rotate: [0, -3, 3, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.4 }}
            >
              <Icon className="w-6 h-6" style={{ color: item.color }} />
            </motion.div>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl border-2"
                  style={{ borderColor: item.color }}
                />
              )}
            </AnimatePresence>
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>

          {/* Gold gem decoration */}
          <div className="absolute -bottom-4 -right-4 opacity-[0.04]">
            <Gem className="w-20 h-20" style={{ color: item.color }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// SCROLL PROGRESS BAR - LUXURY GOLD GRADIENT
// ============================================
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [currentSection, setCurrentSection] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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
      {/* LUXURY Gold Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX,
            background:
              'linear-gradient(90deg, #008F3D, #D4AF37, #8B0000, #D4AF37, #008F3D)',
            backgroundSize: '200% 100%',
          }}
        />
        {/* Shimmer on progress bar */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>

      {/* Section indicator - Desktop only - LUXURY styling */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-4 top-20 z-[90] bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#D4AF37]/20"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-semibold text-gray-700">
              {currentSection || 'Beranda'}
            </span>
          </div>
        </motion.div>
      )}
    </>
  )
}

// ============================================
// HERO COMPONENT - LUXURY EDITION
// ============================================
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  return (
    <>
      <ScrollProgressBar />

      {/* ════════════════════════════════════════════
          MAIN HERO SECTION - LUXURY
          ════════════════════════════════════════════ */}
      <section
        ref={ref}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 30%, #F8FAFC 70%, #FAFAFA 100%)',
        }}
      >
        {/* ── CSS Animation for border spin ── */}
        <style jsx>{`
          @keyframes spin-border {
            from {
              --angle: 0deg;
            }
            to {
              --angle: 360deg;
            }
          }
          @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
        `}</style>

        {/* ── Animated gradient top border ── */}
        <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden z-20">
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #008F3D, #16a34a, #D4AF37, #f59e0b, #8B0000, #dc2626, #D4AF37, #008F3D)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* ── LUXURY Background Elements ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large gradient orbs */}
          <motion.div
            className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0,143,61,0.05) 0%, transparent 70%)',
            }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 70%)',
            }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Gold accent orb */}
          <motion.div
            className="absolute top-1/4 right-[10%] w-[300px] h-[300px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          />

          {/* 35 floating particles with multiple colors */}
          {LUXURY_PARTICLES.slice(0, isMobile ? 12 : 35).map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.05, 0.15, 0.05],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Diamond grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 0l20 20-20 20-20-20zM0 40l20 20-20 20zm60 0l20 20-20 20zM40 60l20 20-20 20-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* ── Orbiting Icon Decorations ── */}
        <div className="absolute top-[15%] left-[10%] hidden lg:block pointer-events-none">
          <OrbitIcon icon={Crown} color="#D4AF37" delay={0} radius={30} />
        </div>
        <div className="absolute top-[20%] right-[12%] hidden lg:block pointer-events-none">
          <OrbitIcon icon={Gem} color="#008F3D" delay={3} radius={25} />
        </div>
        <div className="absolute bottom-[25%] left-[8%] hidden lg:block pointer-events-none">
          <OrbitIcon icon={Star} color="#8B0000" delay={6} radius={35} />
        </div>
        <div className="absolute bottom-[20%] right-[6%] hidden lg:block pointer-events-none">
          <OrbitIcon icon={Sparkles} color="#D4AF37" delay={9} radius={28} />
        </div>

        {/* ═══ CONTENT ═══ */}
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
            {/* ── CROWN BADGE with Gold Gradient ── */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-5 sm:mb-7">
              <motion.div {...floatingBadge}>
                <div className="relative">
                  <OrbitIcon icon={Star} color="#D4AF37" delay={0} radius={35} />
                  <OrbitIcon icon={Gem} color="#008F3D" delay={5} radius={45} />
                  <Badge
                    className="px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase border-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/20 to-[#D4AF37]/10 text-[#8B6914] shadow-lg cursor-default"
                  >
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#D4AF37]" />
                    ✦ Platform Koperasi Digital #1 Indonesia ✦
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 text-[#D4AF37]" />
                  </Badge>
                </div>
              </motion.div>
            </motion.div>

            {/* ── KMN BERDIKARI Logo with Animated Gold Border Glow ── */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-5 sm:mb-7">
              <motion.div whileHover={{ scale: 1.03 }} className="relative group">
                {/* Animated gold glow ring around logo */}
                <div className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        'conic-gradient(from var(--angle, 0deg), #D4AF37, #F5E6B8, #D4AF37, transparent, #D4AF37)',
                      animation: 'spin-border 3s linear infinite',
                    }}
                  />
                  <div className="absolute inset-[2px] rounded-2xl bg-white" />
                </div>
                {/* Pulse glow behind logo */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative h-16 sm:h-20 md:h-24 w-auto">
                  <Image
                    src="/logo-koperasi-nusa-berdikari-merah-putih-indonesia.png"
                    alt="Logo Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih"
                    width={1408}
                    height={768}
                    priority
                    className="h-full w-auto object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ── HEADLINE with Gold Gradient Text ── */}
            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-center"
            >
              <span className="block text-[#008F3D]">
                KOPERASI KORPORASI MULTIPIHAK
              </span>
              <span className="block text-[#8B0000] mt-1">
                NUSA BERDIKARI MERAH PUTIH
              </span>
            </motion.h1>

            {/* ── Decorative Gold Gem Line ── */}
            <motion.div variants={fadeInUp} className="flex justify-center my-4 sm:my-5">
              <div className="flex items-center gap-2">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <Gem className="w-5 h-5 text-[#D4AF37]" />
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </motion.div>

            {/* ── SUB-HEADLINE with Luxury Styling ── */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center px-2"
            >
              <span className="text-[#8B0000]">
                melalui 9 PILAR dari Desa UNTUK DUNIA
              </span>
            </motion.p>

            {/* ── TAGLINE ── */}
            <motion.p
              variants={fadeInUp}
              className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center mt-2 sm:mt-3 px-2 text-gray-500"
            >
              MENGINTEGRASIKAN SELURUH EKOSISTEM MELALUI{' '}
              <span className="text-[#D4AF37]">9 PILAR PROGRAM KAMPUNG</span>{' '}
              DARI DESA UNTUK DUNIA, SECARA END TO END
            </motion.p>

            {/* ── MANIFESTO QUOTE - Glassmorphism Card with Gold Border ── */}
            <motion.div variants={fadeInUp} className="relative max-w-3xl mx-auto py-4 sm:py-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Animated gold border wrapper */}
                <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        'conic-gradient(from var(--angle, 0deg), #D4AF37, #F5E6B8, #D4AF37, transparent, #D4AF37)',
                      animation: 'spin-border 6s linear infinite',
                    }}
                  />
                </div>

                {/* Glassmorphism inner card */}
                <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl py-5 sm:py-7 px-5 sm:px-9 border border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/5">
                  {/* Top gold accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                  {/* Quote icon */}
                  <div className="absolute top-3 left-4 opacity-10">
                    <Gem className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <div className="absolute bottom-3 right-4 opacity-10 rotate-180">
                    <Gem className="w-8 h-8 text-[#D4AF37]" />
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-sm sm:text-base md:text-lg font-medium text-gray-800 leading-relaxed text-center relative z-10"
                  >
                    <span className="text-[#D4AF37] font-bold text-base sm:text-lg md:text-xl">
                      KMN BERDIKARI
                    </span>{' '}
                    adalah{' '}
                    <span className="text-[#8B0000] font-bold">
                      Koperasi Korporasi Multipihak
                    </span>{' '}
                    yang mengintegrasikan seluruh ekosistem melalui{' '}
                    <span className="text-[#008F3D] font-bold">
                      9 Pilar Program Kampung
                    </span>{' '}
                    dari hulu ke hilir, secara{' '}
                    <span className="text-[#008F3D] font-bold">end to end</span>,
                    dan menjadi{' '}
                    <span className="text-[#D4AF37] font-bold">
                      one stop services solution
                    </span>{' '}
                    —{' '}
                    <span className="text-[#8B0000] font-bold">
                      dirancang untuk menjadi Koperasi Korporasi Multipihak dari Desa untuk
                      Dunia
                    </span>
                    .
                  </motion.p>

                  {/* Bottom gold accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                </div>
              </motion.div>
            </motion.div>

            {/* ── STATS BAR - 3D Tilt Cards with Pulse Rings ── */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 py-4 sm:py-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, i) => (
                <LuxuryStatCard key={i} stat={stat} index={i} />
              ))}
            </motion.div>

            {/* ── CTA BUTTONS - Gold Shimmer Effects ── */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4"
            >
              {/* Primary CTA - Green with Gold shimmer */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link href="/membership" className="block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#008F3D] via-[#00A847] to-[#008F3D] hover:from-[#00752F] hover:via-[#008F3D] hover:to-[#00752F] text-white px-7 sm:px-10 py-5 sm:py-6 text-base sm:text-lg shadow-xl shadow-[#008F3D]/20 hover:shadow-[#008F3D]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Gabung Sekarang</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#D4AF37]/60" />
                    <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#D4AF37]/60" />
                    <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#D4AF37]/60" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#D4AF37]/60" />
                  </Button>
                </Link>
              </motion.div>

              {/* Secondary CTA - Maroon with Gold border shimmer */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link href="/tentang" className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white px-7 sm:px-10 py-5 sm:py-6 text-base sm:text-lg bg-white transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                    <span className="relative z-10">Eksplor Platform</span>
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-[1px] bg-[#D4AF37]/40" />
                    <div className="absolute top-0 left-0 w-[1px] h-6 bg-[#D4AF37]/40" />
                    <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-[#D4AF37]/40" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-[#D4AF37]/40" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* ── TRUST BADGES with Gold Icons ── */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 pt-5 sm:pt-7"
            >
              {[
                { icon: Shield, text: 'Legal & Terdaftar', color: '#D4AF37' },
                { icon: Database, text: 'Blockchain', color: '#3b82f6' },
                { icon: Eye, text: 'Transparan & Akuntabel', color: '#8B0000' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-xs sm:text-sm group"
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="relative">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10"
                    >
                      <item.icon
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        style={{ color: item.color }}
                      />
                    </div>
                    {/* Subtle pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-lg border border-[#D4AF37]/20"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </div>
                  <span className="font-medium hidden sm:inline group-hover:text-[#D4AF37] transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── SCROLL INDICATOR with Gold Accent ── */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.a
            href="#visi-misi"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer group"
          >
            <span className="text-[10px] sm:text-xs text-gray-400 tracking-widest font-semibold group-hover:text-[#D4AF37] transition-colors uppercase">
              Scroll
            </span>
            <div className="relative">
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
              <motion.div
                className="absolute -inset-2 rounded-full border border-[#D4AF37]/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.a>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SIMPANAN SECTION - LUXURY CARDS
          ════════════════════════════════════════════ */}
      <section
        className="relative py-14 md:py-20 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 50%, #F8FAFC 100%)',
        }}
      >
        {/* Background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {LUXURY_PARTICLES.slice(0, isMobile ? 6 : 15).map((p) => (
            <motion.div
              key={`simpanan-${p.id}`}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.03, 0.1, 0.03],
                scale: [0.7, 1.2, 0.7],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
          {/* Diamond grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 0l20 20-20 20-20-20zM0 40l20 20-20 20zm60 0l20 20-20 20zM40 60l20 20-20 20-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* Section Header - LUXURY */}
            <div className="text-center mb-10">
              {/* Crown Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-5"
              >
                <Badge className="px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase border-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/20 to-[#D4AF37]/10 text-[#8B6914] shadow-lg cursor-default">
                  <Wallet className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Simpanan Anggota
                  <Star className="w-3.5 h-3.5 ml-2 text-[#D4AF37]" />
                </Badge>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3"
              >
                Sistem Simpanan{' '}
                <span className="bg-gradient-to-r from-[#008F3D] to-[#8B0000] bg-clip-text text-transparent">
                  KMN BERDIKARI
                </span>
              </motion.h3>

              {/* Decorative line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <Gem className="w-4 h-4 text-[#D4AF37]" />
                  <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto"
              >
                Berdasarkan AD/ART Pasal 18, setiap anggota memiliki kewajiban simpanan yang
                menjadi modal koperasi
              </motion.p>
            </div>

            {/* 3D Tilt Simpanan Cards */}
            <div className="grid sm:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
              {simpananData.map((item, i) => (
                <LuxurySimpananCard key={i} item={item} index={i} />
              ))}
            </div>

            {/* Note with Gold Accent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-[#D4AF37]/20 shadow-sm">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-xs text-gray-500 max-w-md">
                  Simpanan Sukarela tidak mempengaruhi hak suara dalam RAT.{' '}
                  <span className="font-semibold text-[#8B0000]">
                    Pentagon Kedaulatan
                  </span>{' '}
                  — 5 KPA masing-masing 20% suara, berlaku Doktrin Anti-Oligarki.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          NAVIGASI PERADABAN SECTION - LUXURY EDITION
          ════════════════════════════════════════════ */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-[#8B0000] via-[#9B0F0F] to-[#8B0000] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
              {/* ── Animated top gold border ── */}
              <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #D4AF37, #F5E6B8, #D4AF37, transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* ── Animated background elements ── */}
              <motion.div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.5'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l4 3.5-4 3.5z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />

              {/* Decorative gold circles */}
              <motion.div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl"
                style={{ background: 'rgba(212,175,55,0.15)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl"
                style={{ background: 'rgba(0,143,61,0.15)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* Floating particles inside card */}
              {LUXURY_PARTICLES.slice(0, 8).map((p) => (
                <motion.div
                  key={`nav-${p.id}`}
                  className="absolute rounded-full"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size - 1,
                    height: p.size - 1,
                    backgroundColor: '#D4AF37',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.02, 0.08, 0.02],
                    scale: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: p.duration - 2,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              <div className="relative z-10 text-center">
                {/* Compass Icon with Gold Crown */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#008F3D] to-[#00A847] mb-5 sm:mb-6 shadow-xl relative"
                >
                  <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  {/* Gold pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Main Title with Gold accent */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 sm:mb-3"
                >
                  NAVIGASI PERADABAN{' '}
                  <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5E6B8] bg-clip-text text-transparent">
                    DUNIA BARU
                  </span>
                </motion.h3>

                {/* Decorative gold line */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="flex justify-center mb-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
                    <Crown className="w-4 h-4 text-[#D4AF37]/60" />
                    <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
                  </div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-white/90 font-medium mb-5 sm:mb-6 max-w-2xl mx-auto"
                >
                  Mereka yang bergabung hari ini akan menjadi{' '}
                  <span className="text-[#D4AF37] font-bold">arsitek masa depan</span>.
                  <br className="hidden sm:block" />
                  Mereka yang menunda akan menjadi{' '}
                  <span className="text-white/50">penonton sejarah</span>.
                </motion.p>

                {/* Warning/Opportunity Badge with Gold accent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                    <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm text-white font-semibold">
                      Kesempatan Tidak Datang Dua Kali
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/membership">
                      <Button className="bg-gradient-to-r from-[#008F3D] to-[#00A847] hover:from-[#00752F] hover:to-[#008F3D] text-white font-bold px-7 py-3 shadow-xl relative overflow-hidden group">
                        {/* Shimmer on CTA */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        />
                        <Rocket className="w-4 h-4 mr-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <span className="relative z-10">Mulai Perjalanan</span>
                        {/* Gold corner accents */}
                        <div className="absolute top-0 left-0 w-6 h-[1px] bg-[#D4AF37]/60" />
                        <div className="absolute top-0 left-0 w-[1px] h-6 bg-[#D4AF37]/60" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Stats mini - with Gold accents */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-7 sm:mt-8 pt-6 border-t border-[#D4AF37]/20"
                >
                  {[
                    { value: '125.000+', label: 'Sudah Bergabung' },
                    { value: '9', label: 'Pilar Kampung' },
                    { value: '2026', label: 'Tahun Berdiri' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#D4AF37] to-[#F5E6B8] bg-clip-text text-transparent">
                        {item.value}
                      </p>
                      <p className="text-xs sm:text-sm text-white/60 font-medium">
                        {item.label}
                      </p>
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
