'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Scale,
  Warehouse,
  Wheat,
  Heart,
  GraduationCap,
  Truck,
  Laptop,
  Flower2,
  Home,
  ArrowUpRight,
  Sparkles,
  Crown,
  Gem,
  Star,
  X,
  Link2,
  ArrowRight,
  Layers,
  Zap,
  Globe,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  PILAR_PROGRAMS,
  INTERLINK_CONNECTIONS,
  INTERLINK_COLORS,
  INTERLINK_LABELS,
  getProgramCount,
  getTotalProgramCount,
  type InterlinkType,
} from '@/data/pilarPrograms'

// ─── Icon Map ───────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Scale, Warehouse, Wheat, Heart, GraduationCap, Truck, Laptop, Flower2, Home,
}

// ─── Pilar Card Data (for the grid) ────────────────────────────────────────────

interface PilarCardData {
  number: number
  title: string
  description: string
  icon: LucideIcon
  color: string
  secondaryColor: string
  href: string
  adhikara: string
  programCount: number
}

const PILAR_CARDS: PilarCardData[] = [
  { number: 1, title: 'Kampung Modal', description: 'Urat nadi finansial ekosistem: pembayaran, investasi, asuransi & kedaulatan modal desa', icon: Scale, color: '#f59e0b', secondaryColor: '#FBBF24', href: '/pilar/kampung-modal', adhikara: 'Adhikara Artha', programCount: 20 },
  { number: 2, title: 'Kampung Industri', description: 'Hilirisasi agro, kriya, manufaktur & teknologi masa depan berbasis desa', icon: Warehouse, color: '#8B0000', secondaryColor: '#DC143C', href: '/pilar/kampung-industri', adhikara: 'Adhikara Krada', programCount: 20 },
  { number: 3, title: 'Kampung Pangan', description: 'Kedaulatan pangan: pertanian, perkebunan, peternakan, perikanan hingga ekspor', icon: Wheat, color: '#16a34a', secondaryColor: '#4ADE80', href: '/pilar/kampung-pangan', adhikara: 'Adhikara Anna', programCount: 25 },
  { number: 4, title: 'Kampung Sehat', description: 'Infrastruktur klinis, nutrisi, jaring pengaman sosial & kesehatan rohani', icon: Heart, color: '#dc2626', secondaryColor: '#F87171', href: '/pilar/kampung-sehat', adhikara: 'Adhikara Roga', programCount: 25 },
  { number: 5, title: 'Kampung Cerdas', description: 'Solusi putus sekolah, literasi, vokasi, pendidikan tinggi & pembelajaran sepanjang hayat', icon: GraduationCap, color: '#7c3aed', secondaryColor: '#A78BFA', href: '/pilar/kampung-cerdas', adhikara: 'Adhikara Vidya', programCount: 25 },
  { number: 6, title: 'Kampung Niaga', description: 'Gerbang ekspor-impor, logistik, cold chain, konektivitas & energi terbarukan', icon: Truck, color: '#0d9488', secondaryColor: '#2DD4BF', href: '/pilar/kampung-niaga', adhikara: 'Adhikara Yana', programCount: 26 },
  { number: 7, title: 'Kampung Digital', description: 'Smart Village OS, infrastruktur digital, platform, kedaulatan data & inovasi R&D', icon: Laptop, color: '#3b82f6', secondaryColor: '#60A5FA', href: '/pilar/kampung-digital', adhikara: 'Adhikara Jnana', programCount: 20 },
  { number: 8, title: 'Kampung Hijau', description: 'Energi terbarukan, pengelolaan limbah, konservasi & pertanian lingkungan hijau', icon: Flower2, color: '#059669', secondaryColor: '#34D399', href: '/pilar/kampung-hijau', adhikara: 'Adhikara Prakriti', programCount: 20 },
  { number: 9, title: 'Kampung Wisata', description: 'Wisata alam, budaya & spiritual, hospitality, ekonomi kreatif & pemasaran wisata', icon: Home, color: '#92400e', secondaryColor: '#D97706', href: '/pilar/kampung-wisata', adhikara: 'Adhikara Ramya', programCount: 30 },
]

// ─── Particle System ────────────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: `${(i * 3.33) % 100}%`,
  y: `${(i * 5.71) % 100}%`,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  delay: i * 0.2,
  duration: 6 + (i % 5) * 2,
  color: ['#f59e0b', '#8B0000', '#16a34a', '#dc2626', '#7c3aed', '#0d9488', '#3b82f6', '#059669', '#92400e'][i % 9],
}))

// ─── Animation Variants ─────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.9 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const floatingBadge = {
  animate: { y: [0, -8, 0], rotate: [0, 2, -2, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
}

// ─── 3D Tilt Card Component ─────────────────────────────────────────────────────

function LuxuryPilarCard({
  pilar,
  onExpand,
}: {
  pilar: PilarCardData
  onExpand: (num: number) => void
}) {
  const Icon = pilar.icon
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), { stiffness: 300, damping: 30 })

  // Get top connections for this pilar
  const topConnections = useMemo(() => {
    const conns = INTERLINK_CONNECTIONS.filter(c => c.from === pilar.number || c.to === pilar.number)
    return conns.slice(0, 4)
  }, [pilar.number])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
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
        <button
          onClick={() => onExpand(pilar.number)}
          className="block h-full w-full text-left"
        >
          {/* Animated gradient border */}
          <div
            className={cn(
              'absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500',
              isHovered && 'opacity-100',
            )}
            style={{
              background: `conic-gradient(from var(--angle, 0deg), ${pilar.color}, ${pilar.secondaryColor}, ${pilar.color}, transparent, ${pilar.color})`,
              animation: 'spin-border 4s linear infinite',
            }}
          />

          {/* Glow effect behind card */}
          <div
            className={cn(
              'absolute -inset-4 rounded-3xl blur-xl opacity-0 transition-opacity duration-700',
              isHovered && 'opacity-30',
            )}
            style={{ background: `radial-gradient(circle, ${pilar.color}40, transparent 70%)` }}
          />

          {/* Card Body */}
          <div
            className={cn(
              'relative h-full rounded-2xl overflow-hidden',
              'bg-gradient-to-br from-white via-white to-gray-50/80',
              'border border-gray-200/60',
              'transition-all duration-500',
              'backdrop-blur-sm',
            )}
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Top animated bar */}
            <div className="relative h-1.5 overflow-hidden">
              <motion.div
                className="absolute inset-0 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${pilar.color}, ${pilar.secondaryColor}, ${pilar.color})`,
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

            <div className="p-5 sm:p-6">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Number orb with pulse */}
                  <div className="relative">
                    <motion.div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${pilar.color}, ${pilar.secondaryColor})`,
                        boxShadow: `0 4px 20px ${pilar.color}50`,
                      }}
                      animate={isHovered ? {
                        boxShadow: [
                          `0 4px 20px ${pilar.color}50`,
                          `0 4px 30px ${pilar.color}70`,
                          `0 4px 20px ${pilar.color}50`,
                        ],
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {pilar.number}
                    </motion.div>
                    {/* Pulse ring */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: pilar.color }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon with glow */}
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${pilar.color}10` }}
                    animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: pilar.color }} />
                  </motion.div>
                </div>

                {/* Arrow with animation */}
                <motion.div
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200/60"
                  style={{ backgroundColor: `${pilar.color}08` }}
                  animate={isHovered ? {
                    scale: 1.1,
                    backgroundColor: `${pilar.color}15`,
                    borderColor: `${pilar.color}30`,
                  } : {
                    scale: 1,
                    backgroundColor: `${pilar.color}08`,
                    borderColor: 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight
                    className="w-4 h-4 transition-colors duration-300"
                    style={{ color: isHovered ? pilar.color : '#9CA3AF' }}
                  />
                </motion.div>
              </div>

              {/* Title with gradient on hover */}
              <motion.h3
                className="text-base sm:text-lg font-bold mb-2 leading-snug"
                style={{ color: isHovered ? pilar.color : '#1F2937' }}
              >
                {pilar.title}
              </motion.h3>

              {/* Adhikara subtitle */}
              <motion.p
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: pilar.secondaryColor, opacity: isHovered ? 1 : 0.6 }}
              >
                {pilar.adhikara}
              </motion.p>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {pilar.description}
              </p>

              {/* Stats footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    color: pilar.color,
                    backgroundColor: `${pilar.color}0D`,
                  }}
                >
                  <Layers className="w-3 h-3" style={{ color: pilar.color }} />
                  {pilar.programCount} Program
                </div>

                <span
                  className="text-xs font-medium transition-colors duration-300"
                  style={{ color: isHovered ? pilar.color : '#9CA3AF' }}
                >
                  {pilar.number}/9
                </span>
              </div>

              {/* Interlink dots - top connections */}
              {topConnections.length > 0 && (
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-50">
                  <Link2 className="w-3 h-3 text-gray-300" />
                  <div className="flex items-center gap-1">
                    {topConnections.map((conn, idx) => {
                      const otherPilarNum = conn.from === pilar.number ? conn.to : conn.from
                      const otherCard = PILAR_CARDS.find(c => c.number === otherPilarNum)
                      const connColor = INTERLINK_COLORS[conn.type]
                      if (!otherCard) return null
                      return (
                        <div
                          key={idx}
                          className="group/conn relative"
                          title={`${conn.label} → ${otherCard.title}`}
                        >
                          <div
                            className="w-3 h-3 rounded-full border transition-all duration-300 hover:scale-150 cursor-pointer"
                            style={{
                              backgroundColor: `${otherCard.color}20`,
                              borderColor: `${otherCard.color}40`,
                            }}
                          >
                            <div
                              className="absolute inset-[2px] rounded-full"
                              style={{ backgroundColor: connColor, opacity: 0.7 }}
                            />
                          </div>
                        </div>
                      )
                    })}
                    <span className="text-[9px] text-gray-400 ml-1">
                      +{INTERLINK_CONNECTIONS.filter(c => c.from === pilar.number || c.to === pilar.number).length}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Corner decoration */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.06, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full"
                  style={{ background: `radial-gradient(circle, ${pilar.color}, transparent)` }}
                />
              )}
            </AnimatePresence>
          </div>
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Interlink Ecosystem Mini-Diagram ───────────────────────────────────────────

function InterlinkEcosystemDiagram({ pilarNumber }: { pilarNumber: number }) {
  const cardData = PILAR_CARDS.find(c => c.number === pilarNumber)

  const connections = INTERLINK_CONNECTIONS.filter(c => c.from === pilarNumber || c.to === pilarNumber)

  // Get unique connected pilars
  const connectedPilars = useMemo(() => {
    const pilarNums = new Set<number>()
    INTERLINK_CONNECTIONS.filter(c => c.from === pilarNumber || c.to === pilarNumber).forEach(c => {
      if (c.from === pilarNumber) pilarNums.add(c.to)
      else pilarNums.add(c.from)
    })
    return Array.from(pilarNums).map(num => PILAR_CARDS.find(c => c.number === num)).filter(Boolean) as PilarCardData[]
  }, [pilarNumber])

  // Position spokes around center
  const spokePositions = useMemo(() => {
    return connectedPilars.map((p, i) => {
      const angle = (i / connectedPilars.length) * 2 * Math.PI - Math.PI / 2
      const radiusX = 42
      const radiusY = 38
      return {
        pilar: p,
        x: 50 + radiusX * Math.cos(angle),
        y: 50 + radiusY * Math.sin(angle),
        angle,
      }
    })
  }, [connectedPilars])

  if (!cardData) return null

  // Get connections for a specific linked pilar
  const getConnsForPilar = (otherNum: number) =>
    connections.filter(c => c.from === otherNum || c.to === otherNum)

  return (
    <div className="rounded-xl border border-white/10 p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <h4 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        Ekosistem Koneksi — {cardData.title}
      </h4>

      {/* Hub-and-spoke diagram */}
      <div className="relative w-full max-w-md mx-auto" style={{ paddingBottom: '80%' }}>
        {/* Center pilar */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-xl border-2 z-10"
          style={{
            left: '35%', top: '30%', width: '30%', height: '28%',
            borderColor: cardData.color,
            backgroundColor: `${cardData.color}15`,
            boxShadow: `0 0 30px ${cardData.color}20`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-1"
            style={{ background: `linear-gradient(135deg, ${cardData.color}, ${cardData.secondaryColor})` }}
          >
            {(() => {
              const IconComp = ICON_MAP[cardData.icon] ?? Scale
              return <IconComp className="w-4 h-4 text-white" />
            })()}
          </div>
          <span className="text-[8px] sm:text-[10px] font-bold text-white/90 text-center leading-tight px-1">
            {cardData.title.replace('Kampung ', '')}
          </span>
          <span className="text-[7px] sm:text-[8px] text-white/40">{cardData.adhikara.split(' ').pop()}</span>
        </div>

        {/* Connected pilar spokes */}
        {spokePositions.map(({ pilar: sp, x, y }, idx) => {
          const conns = getConnsForPilar(sp.number)
          return (
            <motion.div
              key={sp.number}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="absolute flex flex-col items-center justify-center rounded-lg border transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                left: `${x - 10}%`, top: `${y - 8}%`,
                width: '20%', height: '18%',
                borderColor: `${sp.color}60`,
                backgroundColor: `${sp.color}10`,
              }}
            >
              {/* Connection line (CSS) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to center, ${sp.color}15, transparent)`,
                  borderRadius: 'inherit',
                }}
              />
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center mb-0.5"
                style={{ background: `linear-gradient(135deg, ${sp.color}, ${sp.secondaryColor})` }}
              >
                <span className="text-[7px] font-bold text-white">{sp.number}</span>
              </div>
              <span className="text-[6px] sm:text-[8px] font-semibold text-white/70 text-center leading-tight px-0.5">
                {sp.title.replace('Kampung ', '')}
              </span>
              {/* Flow type badges */}
              <div className="flex flex-wrap gap-0.5 mt-0.5 justify-center">
                {conns.slice(0, 2).map((c, ci) => (
                  <div
                    key={ci}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: INTERLINK_COLORS[c.type] }}
                    title={INTERLINK_LABELS[c.type]}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* SVG connection lines */}
        <svg
          viewBox="0 0 100 80"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {spokePositions.map(({ pilar: sp, x, y }, idx) => {
            const conns = getConnsForPilar(sp.number)
            const primaryType = conns[0]?.type ?? 'resource'
            const lineColor = INTERLINK_COLORS[primaryType]
            return (
              <g key={idx}>
                <line
                  x1="50" y1="44" x2={x} y2={y}
                  stroke={lineColor}
                  strokeWidth="0.4"
                  strokeOpacity="0.3"
                  strokeDasharray="2 1"
                />
                {/* Animated dot */}
                <circle r="0.6" fill={lineColor} opacity="0.7">
                  <animateMotion
                    dur={`${2 + idx * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M 50 44 L ${x} ${y}`}
                  />
                </circle>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Connection list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {connections.map((conn, idx) => {
          const isFrom = conn.from === pilarNumber
          const otherPilarNum = isFrom ? conn.to : conn.from
          const otherPilar = PILAR_CARDS.find(c => c.number === otherPilarNum)
          if (!otherPilar) return null
          const connColor = INTERLINK_COLORS[conn.type]
          return (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: `${connColor}08`, borderLeft: `2px solid ${connColor}` }}
            >
              <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: connColor }} />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white/80 truncate">
                  {isFrom ? '→' : '←'} {otherPilar.title.replace('Kampung ', '')}
                </div>
                <div className="text-[10px] text-white/40 truncate">{conn.label}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Program Expansion Modal ────────────────────────────────────────────────────

function ProgramExpansionModal({
  pilarNumber,
  onClose,
}: {
  pilarNumber: number
  onClose: () => void
}) {
  const pilarData = PILAR_PROGRAMS.find(p => p.number === pilarNumber)
  if (!pilarData) return null

  const cardData = PILAR_CARDS.find(c => c.number === pilarNumber)
  const pilarColor = cardData?.color ?? '#333'
  const pilarSecondary = cardData?.secondaryColor ?? '#666'
  const IconComp = cardData ? ICON_MAP[cardData.icon] ?? Scale : Scale

  // Find connections for this pilar
  const connections = INTERLINK_CONNECTIONS.filter(c => c.from === pilarNumber || c.to === pilarNumber)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 pt-8 sm:pt-16"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 border-b border-white/10" style={{ background: `linear-gradient(135deg, ${pilarColor}15, ${pilarSecondary}08, transparent)` }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${pilarColor}, ${pilarSecondary})`,
                boxShadow: `0 8px 30px ${pilarColor}40`,
              }}
            >
              <IconComp className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  className="text-[10px] font-bold tracking-wider"
                  style={{
                    backgroundColor: `${pilarColor}20`,
                    color: pilarColor,
                    borderColor: `${pilarColor}40`,
                  }}
                >
                  Pilar {pilarNumber}
                </Badge>
                <Badge
                  className="text-[10px] font-bold tracking-wider bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30"
                >
                  {pilarData.adhikara}
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{pilarData.title}</h2>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-xs">
              <Layers className="w-3.5 h-3.5" />
              <span className="font-bold text-white">{getProgramCount(pilarNumber)}</span> Program
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-xs">
              <Star className="w-3.5 h-3.5" />
              <span className="font-bold text-white">{pilarData.klasterGroups.length}</span> {pilarData.klasterLabel}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-xs">
              <Link2 className="w-3.5 h-3.5" />
              <span className="font-bold text-white">{connections.length}</span> Koneksi
            </div>
          </div>
        </div>

        {/* Programs by Klaster */}
        <div className="p-6 sm:p-8 space-y-8">
          {pilarData.klasterGroups.map((klaster) => (
            <div key={klaster.id}>
              {/* Klaster Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">{klaster.emoji}</span>
                <div>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold tracking-wider mb-1"
                    style={{
                      color: pilarColor,
                      borderColor: `${pilarColor}40`,
                      backgroundColor: `${pilarColor}10`,
                    }}
                  >
                    {pilarData.klasterLabel} {klaster.number}
                  </Badge>
                  <h3 className="text-sm sm:text-base font-bold text-white">{klaster.title}</h3>
                </div>
              </div>

              {/* Programs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {klaster.programs.map((program) => {
                  const hasInterlinks = program.interlinks && program.interlinks.length > 0
                  return (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: program.number * 0.03 }}
                      className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                              style={{ background: `linear-gradient(135deg, ${pilarColor}, ${pilarSecondary})` }}
                            >
                              {program.number}
                            </span>
                            <h4 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2">{program.title}</h4>
                          </div>
                          {hasInterlinks && (
                            <div className="flex-shrink-0" title="Terhubung ke Pilar lain">
                              <Link2 className="w-3.5 h-3.5 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-white/40 mt-2 leading-relaxed line-clamp-2">{program.description}</p>
                        {hasInterlinks && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {program.interlinks!.map(linkedPilar => {
                              const linkedCard = PILAR_CARDS.find(c => c.number === linkedPilar)
                              return linkedCard ? (
                                <Badge
                                  key={linkedPilar}
                                  className="text-[9px] px-1.5 py-0 font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                                  style={{
                                    backgroundColor: `${linkedCard.color}15`,
                                    color: linkedCard.color,
                                    borderColor: `${linkedCard.color}30`,
                                    borderWidth: 1,
                                  }}
                                >
                                  → {linkedCard.title.replace('Kampung ', '')}
                                </Badge>
                              ) : null
                            })}
                          </div>
                        )}
                      </div>
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${pilarColor}08, transparent 70%)` }}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Interlink Ecosystem Mini-Diagram */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <InterlinkEcosystemDiagram pilarNumber={pilarNumber} />
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            Klik pilar lain di diagram interlink untuk melihat koneksi
          </p>
          <Link
            href={cardData?.href ?? '#'}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${pilarColor}, ${pilarSecondary})`,
              boxShadow: `0 4px 20px ${pilarColor}30`,
            }}
          >
            Kunjungi Halaman
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Interlink Visualization ────────────────────────────────────────────────────

function InterlinkVisualization({ onPilarClick }: { onPilarClick: (num: number) => void }) {
  const [hoveredPilar, setHoveredPilar] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // 3x3 grid positions for nodes (percentages)
  const nodePositions = useMemo(() => [
    { x: 16.67, y: 25 },  // Pilar 1 (top-left)
    { x: 50, y: 25 },     // Pilar 2 (top-center)
    { x: 83.33, y: 25 },  // Pilar 3 (top-right)
    { x: 16.67, y: 55 },  // Pilar 4 (mid-left)
    { x: 50, y: 55 },     // Pilar 5 (mid-center)
    { x: 83.33, y: 55 },  // Pilar 6 (mid-right)
    { x: 16.67, y: 85 },  // Pilar 7 (bot-left)
    { x: 50, y: 85 },     // Pilar 8 (bot-center)
    { x: 83.33, y: 85 },  // Pilar 9 (bot-right)
  ], [])

  const activeConnections = useMemo(() => {
    if (hoveredPilar === null) return INTERLINK_CONNECTIONS
    return INTERLINK_CONNECTIONS.filter(c => c.from === hoveredPilar || c.to === hoveredPilar)
  }, [hoveredPilar])

  const isDimmed = useCallback((pilarNum: number) => {
    if (hoveredPilar === null) return false
    if (pilarNum === hoveredPilar) return false
    return !activeConnections.some(c =>
      (c.from === hoveredPilar && c.to === pilarNum) ||
      (c.to === hoveredPilar && c.from === pilarNum)
    )
  }, [hoveredPilar, activeConnections])

  const isLineDimmed = useCallback((conn: typeof INTERLINK_CONNECTIONS[number]) => {
    if (hoveredPilar === null) return false
    return !activeConnections.includes(conn)
  }, [hoveredPilar, activeConnections])

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section header */}
        <div className="text-center mb-8">
          <Badge className="px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Link2 className="w-3.5 h-3.5 mr-1.5" />
            Interlink Pilar
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black mt-3 mb-2">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#8B6914] bg-clip-text text-transparent">
              Visualisasi Koneksi
            </span>
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Hover pada pilar untuk melihat aliran koneksi. Klik untuk melihat detail program.
          </p>
        </div>

        {/* SVG Diagram */}
        <div className="relative w-full max-w-4xl mx-auto" style={{ paddingBottom: '60%' }}>
          <svg
            viewBox="0 0 100 60"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Arrow marker for each connection type */}
              {Object.entries(INTERLINK_COLORS).map(([type, color]) => (
                <marker
                  key={type}
                  id={`arrow-${type}`}
                  viewBox="0 0 10 6"
                  refX="9"
                  refY="3"
                  markerWidth="8"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 3 L 0 6 z" fill={color} fillOpacity="0.7" />
                </marker>
              ))}

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {INTERLINK_CONNECTIONS.map((conn, idx) => {
              const fromPos = nodePositions[conn.from - 1]
              const toPos = nodePositions[conn.to - 1]
              if (!fromPos || !toPos) return null

              const dimmed = isLineDimmed(conn)
              const color = INTERLINK_COLORS[conn.type]

              // Calculate slight curve offset
              const midX = (fromPos.x + toPos.x) / 2
              const midY = (fromPos.y + toPos.y) / 2
              const dx = toPos.x - fromPos.x
              const dy = toPos.y - fromPos.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              const offsetScale = dist * 0.1
              // perpendicular offset
              const perpX = -dy / dist * offsetScale * (idx % 2 === 0 ? 1 : -1)
              const perpY = dx / dist * offsetScale * (idx % 2 === 0 ? 1 : -1)

              const controlX = midX + perpX
              const controlY = midY + perpY

              return (
                <g key={idx}>
                  {/* Line path */}
                  <path
                    d={`M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={dimmed ? 0.15 : 0.4}
                    strokeOpacity={dimmed ? 0.08 : 0.5}
                    markerEnd={`url(#arrow-${conn.type})`}
                    className="transition-all duration-500"
                  />
                  {/* Animated flowing dot */}
                  {!dimmed && (
                    <circle r="0.5" fill={color} opacity={dimmed ? 0 : 0.8} filter="url(#glow)">
                      <animateMotion
                        dur={`${3 + idx * 0.5}s`}
                        repeatCount="indefinite"
                        path={`M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`}
                      />
                    </circle>
                  )}
                </g>
              )
            })}

            {/* Pilar Nodes */}
            {PILAR_CARDS.map((pilar, idx) => {
              const pos = nodePositions[idx]
              const dimmed = isDimmed(pilar.number)
              const isHovered = hoveredPilar === pilar.number
              const nodeRadius = isHovered ? 4.5 : 3.5

              return (
                <g
                  key={pilar.number}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPilar(pilar.number)}
                  onMouseLeave={() => setHoveredPilar(null)}
                  onClick={() => onPilarClick(pilar.number)}
                >
                  {/* Outer glow ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeRadius + 1.5}
                    fill="none"
                    stroke={pilar.color}
                    strokeWidth="0.3"
                    strokeOpacity={dimmed ? 0.05 : isHovered ? 0.4 : 0.15}
                    className="transition-all duration-500"
                  />
                  {/* Pulse ring for hovered */}
                  {isHovered && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={nodeRadius + 1.5}
                      fill="none"
                      stroke={pilar.color}
                      strokeWidth="0.2"
                      strokeOpacity="0.3"
                    >
                      <animate attributeName="r" from={`${nodeRadius + 1.5}`} to={`${nodeRadius + 4}`} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {/* Main circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeRadius}
                    fill={`url(#pilar-gradient-${pilar.number})`}
                    opacity={dimmed ? 0.2 : 1}
                    className="transition-all duration-500"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <radialGradient id={`pilar-gradient-${pilar.number}`} cx="40%" cy="40%">
                      <stop offset="0%" stopColor={pilar.secondaryColor} />
                      <stop offset="100%" stopColor={pilar.color} />
                    </radialGradient>
                  </defs>
                  {/* Number text */}
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="2.2"
                    fontWeight="bold"
                    opacity={dimmed ? 0.2 : 1}
                    className="transition-all duration-500 pointer-events-none"
                  >
                    {pilar.number}
                  </text>
                  {/* Label below */}
                  <text
                    x={pos.x}
                    y={pos.y + nodeRadius + 2.5}
                    textAnchor="middle"
                    fill={pilar.color}
                    fontSize="1.8"
                    fontWeight="bold"
                    opacity={dimmed ? 0.1 : 0.8}
                    className="transition-all duration-500 pointer-events-none"
                  >
                    {pilar.title.replace('Kampung ', '')}
                  </text>
                  {/* Adhikara label */}
                  <text
                    x={pos.x}
                    y={pos.y + nodeRadius + 4.5}
                    textAnchor="middle"
                    fill="#999"
                    fontSize="1.2"
                    fontWeight="normal"
                    opacity={dimmed ? 0.05 : 0.5}
                    className="transition-all duration-500 pointer-events-none"
                  >
                    {pilar.adhikara}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {(Object.entries(INTERLINK_COLORS) as [InterlinkType, string][]).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-500">{INTERLINK_LABELS[type]}</span>
            </div>
          ))}
        </div>

        {/* Total stats */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            <span className="font-bold text-[#D4AF37]">{INTERLINK_CONNECTIONS.length}</span> koneksi antar pilar ·{' '}
            <span className="font-bold text-[#D4AF37]">{getTotalProgramCount()}</span> total program
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Orbit Icon ─────────────────────────────────────────────────────────────────

function OrbitIcon({ icon: Icon, color, delay, radius = 100 }: {
  icon: React.ElementType; color: string; delay: number; radius?: number
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
      transition={{ duration: 20, repeat: Infinity, delay, ease: 'linear' }}
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

// ─── Main Section Component ─────────────────────────────────────────────────────

export function PilarSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [expandedPilar, setExpandedPilar] = useState<number | null>(null)

  const handleExpand = useCallback((num: number) => {
    setExpandedPilar(num)
  }, [])

  const handleCloseExpand = useCallback(() => {
    setExpandedPilar(null)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expandedPilar !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [expandedPilar])

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 30%, #F8FAFC 70%, #FAFAFA 100%)',
      }}
    >
      {/* CSS Animation for border spin */}
      <style jsx>{`
        @keyframes spin-border {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>

      {/* Animated top border - 9 pilar colors */}
      <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #8B0000, #16a34a, #dc2626, #7c3aed, #0d9488, #3b82f6, #059669, #92400e, #f59e0b)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Luxury background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,0,0,0.04) 0%, transparent 70%)' }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Section Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div {...floatingBadge} className="inline-block mb-6">
            <Badge className="px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
              <Crown className="w-3.5 h-3.5 mr-2" />
              9 Pilar Kampung
            </Badge>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] bg-clip-text text-transparent">
              Adikara Ekosistem
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Sembilan pilar transformasi desa yang saling terhubung membentuk super-ekosistem
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Gem className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold text-[#D4AF37]">{getTotalProgramCount()}</span> Program Terintegrasi
            <span className="text-gray-300">·</span>
            <span className="font-bold text-[#D4AF37]">{INTERLINK_CONNECTIONS.length}</span> Koneksi Antar Pilar
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
          </div>
        </motion.div>

        {/* Pilar Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PILAR_CARDS.map((pilar) => (
            <LuxuryPilarCard
              key={pilar.number}
              pilar={pilar}
              onExpand={handleExpand}
            />
          ))}
        </motion.div>

        {/* Spectrum Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-1"
        >
          {PILAR_CARDS.map((pilar) => (
            <div key={pilar.number} className="group relative">
              <div
                className="h-2 rounded-full transition-all duration-300 group-hover:h-4"
                style={{
                  width: 48,
                  background: `linear-gradient(90deg, ${pilar.color}, ${pilar.secondaryColor})`,
                }}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] whitespace-nowrap font-semibold">
                  {pilar.title}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Interlink Visualization */}
        <div className="mt-20">
          <InterlinkVisualization onPilarClick={handleExpand} />
        </div>
      </div>

      {/* Expansion Modal */}
      <AnimatePresence>
        {expandedPilar !== null && (
          <ProgramExpansionModal
            pilarNumber={expandedPilar}
            onClose={handleCloseExpand}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
