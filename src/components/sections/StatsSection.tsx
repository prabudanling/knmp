'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import {
  Building2,
  Users,
  MapPin,
  Target,
  Shield,
  TrendingUp,
  Crown,
  Gem,
  Star,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface StatItem {
  icon: React.ElementType
  label: string
  displayValue: string
  counterValue: number
  counterSuffix: string
  color: string
  secondaryColor: string
  prefix?: string
  isCrown?: boolean
}

const STATS_DATA: StatItem[] = [
  {
    icon: Building2,
    label: 'Desa Terintegrasi',
    displayValue: '83.763',
    counterValue: 83763,
    counterSuffix: '',
    color: '#008F3D',
    secondaryColor: '#00C853',
    isCrown: true,
  },
  {
    icon: Users,
    label: 'Anggota Aktif',
    displayValue: '125.000+',
    counterValue: 125000,
    counterSuffix: '+',
    color: '#8B0000',
    secondaryColor: '#DC143C',
  },
  {
    icon: MapPin,
    label: 'Provinsi',
    displayValue: '38',
    counterValue: 38,
    counterSuffix: '',
    color: '#00A847',
    secondaryColor: '#34D399',
  },
  {
    icon: Target,
    label: 'Pilar Kampung',
    displayValue: '9',
    counterValue: 9,
    counterSuffix: '',
    color: '#f59e0b',
    secondaryColor: '#FBBF24',
  },
  {
    icon: Shield,
    label: 'Kelompok Pihak Anggota',
    displayValue: '5',
    counterValue: 5,
    counterSuffix: '',
    color: '#B91C1C',
    secondaryColor: '#EF4444',
  },
  {
    icon: TrendingUp,
    label: 'Target Revenue 2030',
    displayValue: 'Rp 1.03T',
    counterValue: 103,
    counterSuffix: '0M',
    color: '#15803D',
    secondaryColor: '#22C55E',
    prefix: 'Rp ',
  },
]

// ─── Particle System ──────────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${(i * 4.17) % 100}%`,
  y: `${(i * 6.25) % 100}%`,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  delay: i * 0.25,
  duration: 5 + (i % 5) * 2,
  color:
    i % 5 === 0
      ? '#D4AF37'
      : i % 5 === 1
        ? '#008F3D'
        : i % 5 === 2
          ? '#8B0000'
          : i % 5 === 3
            ? '#f59e0b'
            : '#B91C1C',
}))

// ─── Animation Variants ───────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const floatingBadge = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ─── Animated Counter with Gold Flash ─────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  color,
  isCrown,
}: {
  value: number
  suffix?: string
  prefix?: string
  color: string
  isCrown?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const duration = 2200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(value * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      {/* Gold flash effect on completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.2, 1, 1] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isCrown
                ? 'linear-gradient(90deg, transparent, #D4AF37, #F5E6B8, #D4AF37, transparent)'
                : `linear-gradient(90deg, transparent, ${color}60, transparent)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'blur(1px)',
            }}
          >
            {prefix}
            {displayValue.toLocaleString('id-ID')}
            {suffix}
          </motion.span>
        )}
      </AnimatePresence>

      <span
        className={cn(
          'transition-all duration-500',
          isComplete && isCrown && 'bg-gradient-to-r from-[#D4AF37] via-[#F5E6B8] to-[#D4AF37] bg-clip-text text-transparent',
        )}
        style={{
          ...(isComplete && !isCrown
            ? {
                background: `linear-gradient(90deg, ${color}, ${color}CC, ${color})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            : {}),
        }}
      >
        {prefix}
        {displayValue.toLocaleString('id-ID')}
        {suffix}
      </span>
    </span>
  )
}

// ─── 3D Tilt Stat Card ────────────────────────────────────────────────────────

function LuxuryStatCard({ stat, index }: { stat: StatItem; index: number }) {
  const Icon = stat.icon
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-150, 150], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-150, 150], [-10, 10]), {
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

  return (
    <motion.div variants={cardVariants} className="perspective-[1200px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        {/* Animated gradient border */}
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

        {/* Glow effect behind card */}
        <div
          className={cn(
            'absolute -inset-4 rounded-3xl blur-xl opacity-0 transition-opacity duration-700',
            isHovered && 'opacity-30',
          )}
          style={{
            background: `radial-gradient(circle, ${stat.color}40, transparent 70%)`,
          }}
        />

        {/* Card Body — Glassmorphism */}
        <div
          className={cn(
            'relative h-full rounded-2xl overflow-hidden',
            'bg-gradient-to-br from-white/90 via-white/80 to-white/60',
            'border border-white/40',
            'backdrop-blur-md',
            'shadow-lg shadow-gray-200/30',
            'transition-all duration-500',
          )}
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Top animated gradient bar */}
          <div className="relative h-1.5 overflow-hidden">
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                background: `linear-gradient(90deg, ${stat.color}, ${stat.secondaryColor}, ${stat.color})`,
                backgroundSize: '200% 100%',
              }}
              initial={{ scaleX: 0 }}
              animate={
                isHovered
                  ? { scaleX: 1, backgroundPosition: ['0% 0%', '100% 0%'] }
                  : { scaleX: 0 }
              }
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Shimmer on bar */}
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

          <div className="p-5 sm:p-6">
            {/* Icon with pulse ring */}
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                    border: `1px solid ${stat.color}20`,
                  }}
                  animate={
                    isHovered
                      ? {
                          boxShadow: [
                            `0 4px 20px ${stat.color}30`,
                            `0 4px 30px ${stat.color}50`,
                            `0 4px 20px ${stat.color}30`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Icon className="w-7 h-7" style={{ color: stat.color }} />
                </motion.div>

                {/* Pulse ring */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2"
                      style={{ borderColor: stat.color }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Crown badge for most important stat */}
              {stat.isCrown && (
                <motion.div
                  animate={
                    isHovered
                      ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/20 to-[#F5E6B8]/30 border border-[#D4AF37]/30">
                    <Crown className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </motion.div>
              )}

              {/* Gem icon for non-crown cards on hover */}
              {!stat.isCrown && (
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}15` }}
                      >
                        <Gem className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Value with gold gradient on hover */}
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 leading-none"
              style={
                isHovered
                  ? {
                      background: stat.isCrown
                        ? 'linear-gradient(90deg, #D4AF37, #F5E6B8, #D4AF37)'
                        : `linear-gradient(90deg, ${stat.color}, ${stat.secondaryColor})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : { color: '#111827' }
              }
            >
              <AnimatedCounter
                value={stat.counterValue}
                suffix={stat.counterSuffix}
                prefix={stat.prefix || ''}
                color={stat.color}
                isCrown={stat.isCrown}
              />
            </motion.p>

            {/* Label */}
            <p
              className={cn(
                'text-xs sm:text-sm font-medium mt-2 transition-colors duration-300',
              )}
              style={{
                color: isHovered ? stat.color : '#6B7280',
              }}
            >
              {stat.label}
            </p>

            {/* Gold shimmer overlay on card */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent"
                />
              )}
            </AnimatePresence>

            {/* Corner decoration */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.06, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${stat.color}, transparent)`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Star decoration at bottom */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-100/60">
              <Star
                className="w-3 h-3 transition-colors duration-300"
                style={{ color: isHovered ? stat.color : '#D1D5DB' }}
                fill={isHovered ? stat.color : 'none'}
              />
              <Star
                className="w-3 h-3 transition-colors duration-300"
                style={{ color: isHovered ? stat.color : '#E5E7EB' }}
                fill={isHovered ? stat.color : 'none'}
              />
              <Star
                className="w-3 h-3 transition-colors duration-300"
                style={{ color: isHovered ? stat.color : '#F3F4F6' }}
                fill={isHovered ? stat.color : 'none'}
              />
              <span
                className="ml-auto text-[10px] font-bold tracking-wider uppercase transition-colors duration-300"
                style={{ color: isHovered ? stat.color : '#D1D5DB' }}
              >
                {stat.isCrown ? '★ FLAGSHIP' : `${String(index + 1).padStart(2, '0')}/06`}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Section Component ───────────────────────────────────────────────────

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
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

      {/* ── Animated top border with flowing gradient ── */}
      <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #008F3D, #16a34a, #8B0000, #DC143C, #B91C1C, #EF4444, #15803D, #22C55E, #f59e0b, #FBBF24, #D4AF37, #008F3D)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* ── Gold decorative line above section ── */}
      <div className="absolute top-1.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      {/* ── Luxury background elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-10 left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,143,61,0.05) 0%, transparent 70%)',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 70%)',
          }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(185,28,28,0.03) 0%, transparent 70%)',
          }}
          animate={{ x: [0, -15, 0], y: [0, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: 0.08,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.04, 0.14, 0.04],
              scale: [0.8, 1.2, 0.8],
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
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 0l20 20-20 20-20-20zM0 40l20 20-20 20zm60 0l20 20-20 20zM40 60l20 20-20 20-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* ── Luxury Section Header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-12 md:mb-16"
        >
          {/* Crown Badge */}
          <motion.div variants={headerVariants} className="flex justify-center mb-5">
            <motion.div {...floatingBadge}>
              <Badge className="px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase border-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/20 to-[#D4AF37]/10 text-[#8B6914] shadow-lg">
                <Crown className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Data & Statistik
                <Sparkles className="w-3.5 h-3.5 ml-2 text-[#D4AF37]" />
              </Badge>
            </motion.div>
          </motion.div>

          {/* Title with luxury gradient */}
          <motion.h2
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 tracking-tight"
          >
            <span className="bg-gradient-to-r from-[#008F3D] to-[#8B0000] bg-clip-text text-transparent">
              Data & Statistik
            </span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            variants={headerVariants}
            className="flex justify-center mb-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <Gem className="w-4 h-4 text-[#D4AF37]" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Kinerja KMNBMPI dalam angka —{' '}
            <span className="font-semibold text-[#8B0000]">
              Skala Nasional, Dampak Desa
            </span>
          </motion.p>
        </motion.div>

        {/* ── Grid of Luxury Stat Cards ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 mb-12 md:mb-16"
        >
          {STATS_DATA.map((stat, index) => (
            <LuxuryStatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* ── Luxury Spectrum Bar ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-5">
            <motion.p
              className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5 }}
            >
              ✦ Spektrum Statistik KMNBMPI ✦
            </motion.p>
          </div>

          {/* Spectrum bar */}
          <div className="relative rounded-full overflow-hidden h-3 md:h-4 shadow-inner bg-gray-100/80 border border-gray-200/40">
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />

            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  delay: 1 + i * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute top-0 h-full origin-left group/spectrum cursor-pointer"
                style={{
                  left: `${(i / 6) * 100}%`,
                  width: `${100 / 6}%`,
                  background: `linear-gradient(180deg, ${stat.secondaryColor}, ${stat.color})`,
                  borderRadius:
                    i === 0
                      ? '9999px 0 0 9999px'
                      : i === 5
                        ? '0 9999px 9999px 0'
                        : '0',
                }}
                whileHover={{ scaleY: 1.6, zIndex: 20 }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/spectrum:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded whitespace-nowrap pointer-events-none">
                  {stat.displayValue} {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Labels under the bar */}
          <div className="flex justify-between mt-3 px-1">
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: 2 + i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center gap-1.5 flex-1 group"
              >
                <motion.div
                  className="w-3 h-3 rounded-full shadow-md border-2 border-white"
                  style={{ backgroundColor: stat.color }}
                  whileHover={{ scale: 1.8 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-[10px] md:text-xs font-bold text-gray-400 text-center leading-tight hidden sm:block group-hover:text-gray-700 transition-colors">
                  {stat.displayValue.split('.')[0]}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tagline below spectrum */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-400">
              Enam dimensi kedaulatan —{' '}
              <span className="font-semibold text-[#008F3D]">
                dari desa untuk Indonesia
              </span>
            </p>
            <div className="flex justify-center mt-3 gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#D4AF37]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
