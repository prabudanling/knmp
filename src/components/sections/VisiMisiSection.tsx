'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
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
  Landmark,
  Sparkles,
  ArrowRight,
  Rocket,
  Handshake,
  Wheat,
  Truck,
  Building2,
  Home,
  Package,
  Crown,
  Gem,
  Star,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

// Visi dimensions data — 10 dimensions
const visiDimensions = [
  { icon: Heart, title: "Spiritual", desc: "Gotong royong & rahmatan lil alamin", color: "#008F3D", secondaryColor: "#4ADE80" },
  { icon: Scale, title: "Konstitusional", desc: "Soko guru ekonomi Pasal 33 UUD 1945", color: "#8B0000", secondaryColor: "#DC143C" },
  { icon: Gavel, title: "Legal", desc: "Dual-Entity Permenkop 8/2021", color: "#f59e0b", secondaryColor: "#FBBF24" },
  { icon: Briefcase, title: "Bisnis", desc: "Rp1.03T revenue by 2030", color: "#16a34a", secondaryColor: "#4ADE80" },
  { icon: Cpu, title: "Teknologi", desc: "Digital OS via kopnusa.id, blockchain, AI", color: "#3b82f6", secondaryColor: "#60A5FA" },
  { icon: Users, title: "People", desc: "10M anggota koperasi, 518K+ lapangan kerja", color: "#7c3aed", secondaryColor: "#A78BFA" },
  { icon: Handshake, title: "Sosial", desc: "PKK 30M kader + Karang Taruna terintegrasi", color: "#ec4899", secondaryColor: "#F472B6" },
  { icon: Globe, title: "Global", desc: "Replikasi ke 20+ negara, ICA membership 2027", color: "#0ea5e9", secondaryColor: "#38BDF8" },
  { icon: Landmark, title: "Governance", desc: "Founder-centric, demokratis, RAT berdaulat", color: "#92400e", secondaryColor: "#D97706" },
  { icon: Sparkles, title: "Peradaban", desc: "100-Year Covenant on blockchain — never convert to private company", color: "#dc2626", secondaryColor: "#F87171" },
]

// 9 Pilar Kampung
const pilarData = [
  { number: 1, icon: Building2, title: "Kampung Pemerintahan", desc: "Pusat pemerintahan desa & bisnis center digital", color: "#008F3D", secondaryColor: "#00C853", stats: "38 Provinsi", adhikara: "Adhikara Kedaulatan" },
  { number: 2, icon: Wheat, title: "Kampung Industri", desc: "Proyek strategis & kawasan industri terpadu", color: "#8B0000", secondaryColor: "#DC143C", stats: "514 Kabupaten", adhikara: "Adhikarta Industri" },
  { number: 3, icon: Scale, title: "Kampung Modal", desc: "DIPUNTARA: holding, trading & investasi desa", color: "#f59e0b", secondaryColor: "#FBBF24", stats: "Rp 60.6T Dana Desa", adhikara: "Adhikara Artha" },
  { number: 4, icon: Wheat, title: "Kampung Pangan", desc: "Kawasan pangan terpadu dari hulu ke hilir", color: "#16a34a", secondaryColor: "#4ADE80", stats: "83.763 Desa", adhikara: "Adhikara Pangan" },
  { number: 5, icon: Heart, title: "Kampung Sehat", desc: "Kesehatan, olahraga & wisata terpadu", color: "#dc2626", secondaryColor: "#F87171", stats: "300K+ Posyandu", adhikara: "Adhikara Sehat" },
  { number: 6, icon: Truck, title: "Kampung Logistik", desc: "Transportasi & logistik digital terintegrasi", color: "#0d9488", secondaryColor: "#2DD4BF", stats: "80.081 Gerai", adhikara: "Adhikara Logistik" },
  { number: 7, icon: Home, title: "Kampung Produktif", desc: "Rumah produktif & ekonomi kreatif desa", color: "#92400e", secondaryColor: "#D97706", stats: "1.000 Desa Wisata", adhikara: "Adhikara Produktif" },
  { number: 8, icon: Cpu, title: "Kampung Digital", desc: "Desa cerdas: Digital, Sehat, Pintar, Aman, Kaya, Modern", color: "#3b82f6", secondaryColor: "#60A5FA", stats: "45+ Lembaga Terintegrasi", adhikara: "Adhikara Digital" },
  { number: 9, icon: Package, title: "Kampung Niaga", desc: "Resi gudang digital & perdagangan terintegrasi", color: "#0ea5e9", secondaryColor: "#38BDF8", stats: "Blockchain Certified", adhikara: "Adhikara Niaga" },
]

// Roadmap data — 2026-2045
const roadmapData = [
  { year: "2026", title: "Launch & 5.000 Desa Pilot", target: "5.000 desa pilot", progress: 6, color: "#f59e0b", secondaryColor: "#FBBF24" },
  { year: "2028", title: "25.000 Desa Scale-up", target: "25.000 desa", progress: 30, color: "#008F3D", secondaryColor: "#4ADE80" },
  { year: "2030", title: "Rp1.03T Revenue Target", target: "Rp1.03T revenue", progress: 50, color: "#3b82f6", secondaryColor: "#60A5FA" },
  { year: "2035", title: "20+ Countries Replication", target: "20+ negara", progress: 75, color: "#8B0000", secondaryColor: "#DC143C" },
  { year: "2045", title: "83.763 Desa Full Coverage", target: "Surpass Mondragon", progress: 100, color: "#dc2626", secondaryColor: "#F87171" },
]

// ─── Particle System ──────────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: `${(i * 4) % 100}%`,
  y: `${(i * 6.67) % 100}%`,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  delay: i * 0.25,
  duration: 6 + (i % 5) * 2,
  color: i % 4 === 0 ? '#D4AF37' : i % 4 === 1 ? '#008F3D' : i % 4 === 2 ? '#8B0000' : '#f59e0b',
}))

// Gold floating particles for inside the quote card
const GOLD_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + (i * 7.5) % 80}%`,
  y: `${10 + (i * 11) % 80}%`,
  delay: i * 0.3,
  duration: 4 + (i % 3) * 2,
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const floatingBadge = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ─── 3D Tilt Dimension Card ───────────────────────────────────────────────────

function LuxuryDimensionCard({ dim, index }: { dim: typeof visiDimensions[number]; index: number }) {
  const Icon = dim.icon
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-120, 120], [6, -6]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-120, 120], [-6, 6]), {
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
        {/* Animated gradient border on hover */}
        <div
          className={cn(
            'absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500',
            isHovered && 'opacity-100',
          )}
          style={{
            background: `conic-gradient(from var(--angle, 0deg), ${dim.color}, ${dim.secondaryColor}, ${dim.color}, transparent, ${dim.color})`,
            animation: 'spin-border 4s linear infinite',
          }}
        />

        {/* Glow effect */}
        <div
          className={cn(
            'absolute -inset-3 rounded-3xl blur-xl opacity-0 transition-opacity duration-700',
            isHovered && 'opacity-25',
          )}
          style={{
            background: `radial-gradient(circle, ${dim.color}40, transparent 70%)`,
          }}
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
          {/* Gold accent line at top */}
          <div className="relative h-1 overflow-hidden">
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                background: `linear-gradient(90deg, ${dim.color}, ${dim.secondaryColor}, #D4AF37)`,
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
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 sm:p-5 text-center">
            {/* Icon with gold ring effect on hover */}
            <div className="relative inline-block mb-3">
              <motion.div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center relative"
                style={{ backgroundColor: `${dim.color}12` }}
                animate={isHovered ? { scale: 1.08, rotate: [0, -3, 3, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="w-6 h-6" style={{ color: dim.color }} />
              </motion.div>
              {/* Gold ring pulse on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: '#D4AF37' }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Title */}
            <motion.h3
              className="font-bold text-sm mb-1.5 leading-snug"
              style={{ color: isHovered ? dim.color : '#1F2937' }}
            >
              {dim.title}
            </motion.h3>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{dim.desc}</p>

            {/* Gold star indicator */}
            <motion.div
              className="mt-3 flex justify-center"
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Star className="w-3 h-3" style={{ color: '#D4AF37' }} />
            </motion.div>
          </div>

          {/* Corner decoration on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.05, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                style={{ background: `radial-gradient(circle, ${dim.color}, transparent)` }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── 3D Tilt Pilar Card (matching PilarSection style) ─────────────────────────

function LuxuryPilarCard({ pilar, index }: { pilar: typeof pilarData[number]; index: number }) {
  const Icon = pilar.icon
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), {
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
            background: `conic-gradient(from var(--angle, 0deg), ${pilar.color}, ${pilar.secondaryColor}, ${pilar.color}, transparent, ${pilar.color})`,
            animation: 'spin-border 4s linear infinite',
          }}
        />

        {/* Glow effect */}
        <div
          className={cn(
            'absolute -inset-4 rounded-3xl blur-xl opacity-0 transition-opacity duration-700',
            isHovered && 'opacity-30',
          )}
          style={{
            background: `radial-gradient(circle, ${pilar.color}40, transparent 70%)`,
          }}
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

          <div className="p-4 sm:p-5">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {/* Number orb with pulse */}
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${pilar.color}10` }}
                  animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: pilar.color }} />
                </motion.div>
              </div>
            </div>

            {/* Title */}
            <motion.h3
              className="text-sm sm:text-base font-bold mb-1 leading-snug"
              style={{ color: isHovered ? pilar.color : '#1F2937' }}
            >
              {pilar.title}
            </motion.h3>

            {/* Adhikara subtitle */}
            <motion.p
              className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: pilar.secondaryColor, opacity: isHovered ? 1 : 0.6 }}
            >
              {pilar.adhikara}
            </motion.p>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{pilar.desc}</p>

            {/* Stats footer with gold star */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  color: pilar.color,
                  backgroundColor: `${pilar.color}0D`,
                }}
              >
                <Star className="w-2.5 h-2.5" style={{ color: '#D4AF37' }} />
                {pilar.stats}
              </div>

              <span
                className="text-[10px] font-medium transition-colors duration-300"
                style={{ color: isHovered ? pilar.color : '#9CA3AF' }}
              >
                {pilar.number}/9
              </span>
            </div>
          </div>

          {/* Corner decoration */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.06, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full"
                style={{ background: `radial-gradient(circle, ${pilar.color}, transparent)` }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Section Component ───────────────────────────────────────────────────

export function VisiMisiSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeRoadmap, setActiveRoadmap] = useState<number | null>(null)

  // Auto-cycle active roadmap item
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveRoadmap(prev => prev === null ? 0 : prev >= 4 ? 0 : prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={ref}
      id="visi-misi"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 25%, #FFFBF5 50%, #FFFFFF 75%, #FAFAFA 100%)',
      }}
    >
      {/* ── CSS Animation for border spin ── */}
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

      {/* ── Animated top border with flowing gradient ── */}
      <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #D4AF37, #8B0000, #008F3D, #f59e0b, #D4AF37, #3b82f6, #8B0000, #D4AF37)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* ── Luxury background elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-10 left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,0,0,0.04) 0%, transparent 70%)' }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,143,61,0.03) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
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
              opacity: 0.08,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.04, 0.15, 0.04],
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
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 0l20 20-20 20-20-20zM0 40l20 20-20 20zm60 0l20 20-20 20zM40 60l20 20-20 20-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* ════════════════════════════════════════════════════════════════════════
            SECTION 1: LUXURY HEADER
        ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16 md:mb-24"
        >
          {/* Crown Badge */}
          <motion.div variants={headerVariants} className="flex justify-center mb-6">
            <motion.div {...floatingBadge}>
              <div className="relative">
                <Badge
                  className="px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase border-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/20 to-[#D4AF37]/10 text-[#8B6914] shadow-lg"
                >
                  <Crown className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Visi & Misi
                  <Gem className="w-3.5 h-3.5 ml-2 text-[#D4AF37]" />
                </Badge>
              </div>
            </motion.div>
          </motion.div>

          {/* Title with luxury gradient */}
          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight"
          >
            <span className="text-gray-900">Menuju </span>
            <span className="text-[#8B0000]">
              World Class
            </span>
            <span className="text-gray-900"> Cooperative</span>
          </motion.h2>

          {/* Decorative gold line */}
          <motion.div
            variants={headerVariants}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <Gem className="w-4 h-4 text-[#D4AF37]" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Menjadi Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih Indonesia dari Desa untuk Dunia
          </motion.p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════════
            SECTION 2: GLASSMORPHISM QUOTE CARD
        ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto mb-20 md:mb-28"
        >
          <div className="relative">
            {/* Animated gold border glow behind card */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl"
              style={{
                background: 'conic-gradient(from var(--angle, 0deg), #D4AF37, #8B0000, #D4AF37, #008F3D, #D4AF37)',
                animation: 'spin-border 6s linear infinite',
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Large glow effect behind card */}
            <div
              className="absolute -inset-8 rounded-3xl blur-2xl opacity-20"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.3), rgba(139,0,0,0.15), transparent 70%)',
              }}
            />

            {/* Glassmorphism Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl">
              {/* Top animated gradient bar */}
              <div className="h-1.5 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, #8B0000, #D4AF37, #008F3D, #f59e0b, #8B0000)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Floating gold particles inside the card */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {GOLD_PARTICLES.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: 2,
                      height: 2,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.1, 0.4, 0.1],
                      scale: [0.8, 1.5, 0.8],
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#D4AF37]" />
                  </motion.div>
                ))}
              </div>

              {/* Card Content */}
              <div className="relative p-8 md:p-12 lg:p-16 text-center">
                {/* Target icon with gold crown */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,0,0,0.08), rgba(212,175,55,0.08))',
                      border: '1px solid rgba(212,175,55,0.2)',
                    }}
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Target className="w-10 h-10 text-[#8B0000]" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ y: [0, -3, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Crown className="w-5 h-5 text-[#D4AF37]" />
                  </motion.div>
                </div>

                {/* Main Quote */}
                <blockquote className="text-lg md:text-xl lg:text-2xl font-bold text-[#1A1A1A] leading-relaxed mb-6">
                  &ldquo;Menjadi <span className="text-[#008F3D]">Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih Indonesia dari Desa untuk Dunia</span> — <span className="text-[#8B0000]">KMNBMPI</span> sebagai{' '}
                  <span className="text-[#8B0000]">Jantung Operasional</span> yang Mengintegrasikan{' '}
                  <span className="text-[#008F3D]">9 Pilar Program Kampung</span> ke dalam Satu Platform Digital Terunifikasi — Mengkonsolidasikan{' '}
                  <span className="text-[#8B0000]">83.763 Desa Indonesia</span> dari Silo Menuju{' '}
                  <span className="text-[#f59e0b]">Super-Ekosistem Pangan, Logistik, Energi, Teknologi, Wisata Domestik, Internasional dan Wisata Religi</span> yang Menghubungkan Indonesia ke{' '}
                  <span className="text-[#3b82f6]">195 Negara</span>&rdquo;
                </blockquote>

                {/* Gold decorative divider */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <Star className="w-4 h-4 text-[#D4AF37]" />
                    <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>
                </div>

                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  KMNBMPI hadir sebagai platform ekonomi digital yang menghubungkan seluruh desa di Indonesia menuju Indonesia Emas 2045.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════════
            SECTION 3: 10 DIMENSI VISI — 3D TILT CARDS
        ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-20 md:mb-28"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="text-center mb-12">
            <motion.div {...floatingBadge} className="flex justify-center mb-4">
              <Badge
                className="px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase border-2 border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/15 to-[#D4AF37]/10 text-[#8B6914]"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                10 Dimensi Visi
                <Star className="w-3 h-3 ml-1.5 text-[#D4AF37]" />
              </Badge>
            </motion.div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">
              Visi{' '}
              <span className="bg-gradient-to-r from-[#008F3D] to-[#8B0000] bg-clip-text text-transparent">
                Multidimensi
              </span>
            </h3>
            {/* Gold decorative line */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </div>
          </motion.div>

          {/* Dimension Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {visiDimensions.map((dim, i) => (
              <LuxuryDimensionCard key={dim.title} dim={dim} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════════
            SECTION 4: 9 PILAR KAMPUNG — MATCHING PILARSECTION STYLE
        ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-20 md:mb-28"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="text-center mb-12">
            <motion.div {...floatingBadge} className="flex justify-center mb-4">
              <Badge
                className="px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase border-2 border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/15 to-[#D4AF37]/10 text-[#8B6914]"
              >
                <Crown className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                9 Pilar Kampung
                <Gem className="w-3 h-3 ml-1.5 text-[#D4AF37]" />
              </Badge>
            </motion.div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">
              Pilar{' '}
              <span className="bg-gradient-to-r from-[#f59e0b] to-[#8B0000] bg-clip-text text-transparent">
                Kampung
              </span>{' '}
              KMNBMPI
            </h3>
            {/* Gold decorative line */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </div>
          </motion.div>

          {/* Pilar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {pilarData.map((pilar, i) => (
              <LuxuryPilarCard key={pilar.number} pilar={pilar} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════════
            SECTION 5: ROADMAP 2026-2045 — LUXURY TIMELINE
        ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-16 md:mb-20"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="text-center mb-12">
            <motion.div {...floatingBadge} className="flex justify-center mb-4">
              <Badge
                className="px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase border-2 border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 via-[#F5E6B8]/15 to-[#D4AF37]/10 text-[#8B6914]"
              >
                <Rocket className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                Roadmap 2026-2045
                <Star className="w-3 h-3 ml-1.5 text-[#D4AF37]" />
              </Badge>
            </motion.div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">
              Perjalanan Menuju{' '}
              <span className="text-[#8B0000]">
                World Class
              </span>
            </h3>
            {/* Gold decorative line */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </div>
          </motion.div>

          {/* Luxury Timeline */}
          <div className="max-w-6xl mx-auto">
            {/* Horizontal connector line (desktop) */}
            <div className="hidden lg:block relative mb-8">
              <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/60 to-[#D4AF37]/30" />
              {/* Shimmer on connector */}
              <motion.div
                className="absolute top-[5px] h-[4px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
                animate={{ x: ['-100%', '800%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Roadmap Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {roadmapData.map((item, i) => {
                const isActive = activeRoadmap === i
                return (
                  <motion.div key={item.year} variants={cardVariants}>
                    <div className="relative h-full">
                      {/* Glow effect for active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -inset-2 rounded-3xl blur-xl"
                            style={{
                              background: `radial-gradient(circle, ${item.color}50, transparent 70%)`,
                            }}
                          />
                        )}
                      </AnimatePresence>

                      <div
                        className={cn(
                          'relative h-full rounded-2xl overflow-hidden transition-all duration-500',
                          'bg-gradient-to-br from-white via-white to-gray-50/80',
                          'border',
                          isActive ? 'border-[#D4AF37]/40 shadow-lg' : 'border-gray-200/60',
                        )}
                      >
                        {/* Top color bar */}
                        <div className="relative h-1.5 overflow-hidden">
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(90deg, ${item.color}, ${item.secondaryColor})`,
                            }}
                          />
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '200%' }}
                                exit={{ x: '-100%' }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="p-4 sm:p-5 text-center">
                          {/* Diamond Year Marker */}
                          <div className="relative inline-block mb-3">
                            <motion.div
                              className="w-14 h-14 mx-auto rotate-45 rounded-lg flex items-center justify-center"
                              style={{
                                background: isActive
                                  ? `linear-gradient(135deg, ${item.color}, ${item.secondaryColor})`
                                  : `${item.color}12`,
                                boxShadow: isActive ? `0 4px 20px ${item.color}40` : 'none',
                              }}
                              animate={isActive ? {
                                boxShadow: [
                                  `0 4px 20px ${item.color}40`,
                                  `0 4px 30px ${item.color}60`,
                                  `0 4px 20px ${item.color}40`,
                                ],
                              } : {}}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <span
                                className={cn(
                                  'font-black text-sm -rotate-45',
                                  isActive ? 'text-white' : '',
                                )}
                                style={{ color: isActive ? 'white' : item.color }}
                              >
                                {item.year}
                              </span>
                            </motion.div>
                            {/* Pulse ring on active */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 1, opacity: 0.4 }}
                                  animate={{ scale: 1.6, opacity: 0 }}
                                  exit={{ scale: 1, opacity: 0 }}
                                  transition={{ duration: 1.2, repeat: Infinity }}
                                  className="absolute inset-0 rotate-45 rounded-lg border-2"
                                  style={{ borderColor: '#D4AF37' }}
                                />
                              )}
                            </AnimatePresence>
                          </div>

                          <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">{item.title}</h4>
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-4">{item.target}</p>

                          {/* Shimmer Progress Bar */}
                          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${item.color}, ${item.secondaryColor})`,
                                width: `${item.progress}%`,
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            />
                            {/* Shimmer effect on progress bar */}
                            <motion.div
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ['-100%', '300%'] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1 + i * 0.15,
                              }}
                            />
                          </div>

                          {/* Progress percentage */}
                          <div className="flex items-center justify-center gap-1 mt-2">
                            <Star className="w-2.5 h-2.5" style={{ color: '#D4AF37', opacity: item.progress >= 50 ? 1 : 0.4 }} />
                            <span className="text-[10px] font-bold" style={{ color: item.color }}>
                              {item.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Gold connector dots below (mobile) */}
            <div className="lg:hidden flex justify-center gap-2 mt-6">
              {roadmapData.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: activeRoadmap === i ? item.color : '#E5E7EB',
                  }}
                  animate={activeRoadmap === i ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════════
            SECTION 6: CTA BUTTON
        ════════════════════════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/visi-misi">
              <Button
                variant="outline"
                className="group relative overflow-hidden border-[#D4AF37]/50 text-[#8B6914] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 px-8 py-6 text-sm font-bold tracking-wide"
              >
                {/* Shimmer overlay on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Crown className="w-4 h-4 mr-2 text-[#D4AF37]" />
                Lihat Detail Visi Misi
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Gold dots below CTA */}
          <div className="flex justify-center mt-6 gap-1.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-[#D4AF37]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
