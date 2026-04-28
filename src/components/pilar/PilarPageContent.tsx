'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Scale, Warehouse, Wheat, Heart, GraduationCap, Truck, Laptop, Flower2, Home,
  ChevronRight, ArrowRight, Sparkles, type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  PILAR_PROGRAMS,
  INTERLINK_CONNECTIONS,
  INTERLINK_COLORS,
  INTERLINK_LABELS,
  getProgramCount,
  type InterlinkType,
} from '@/data/pilarPrograms'

// ─── Icon Map ───────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Scale, Warehouse, Wheat, Heart, GraduationCap, Truck, Laptop, Flower2, Home,
}

// ─── Slug Map ───────────────────────────────────────────────────────────────────

const PILAR_SLUGS: Record<number, string> = {
  1: 'kampung-digital',
  2: 'kampung-modal',
  3: 'kampung-industri',
  4: 'kampung-pangan',
  5: 'kampung-sehat',
  6: 'kampung-cerdas',
  7: 'kampung-niaga',
  8: 'kampung-hijau',
  9: 'kampung-wisata',
}

// ─── Philosophy Map ─────────────────────────────────────────────────────────────

const PHILOSOPHY: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'Smart Village OS',
    subtitle: 'Kampung Pemerintahan Digital (Adikara Jnana) infrastruktur digital, platform, kedaulatan data, dan inovasi R&D yang menjadi otak operasional seluruh ekosistem. Tanpa fondasi digital, semua pilar lain berjalan dengan tangan terikat. Kampung Pemerintahan Digital membebaskan desa dari ketergantungan teknologi eksternal.',
  },
  2: {
    title: 'Dari Subsisten ke Sovereign Wealth',
    subtitle: 'Kampung Modal (Adikara Artha) adalah urat nadi finansial Nusa Futuristik. Tanpa kapital yang mengalir, tidak ada bangunan yang berdiri, tidak ada panen yang dipanen, tidak ada anak yang bersekolah. Program-program ini dirancang sebagai sistem yang saling mengunci — setiap program mendukung dan diperkuat oleh program lainnya. Ini bukan koperasi biasa. Ini adalah sistem keuangan peradaban.',
  },
  3: {
    title: 'Dari Bahan Mentah ke Produk Bernilai Tinggi',
    subtitle: 'Kampung Industri (Adikara Krada) mengubah bahan mentah menjadi produk bernilai tinggi, dari garasi rumah menjadi mini factory standar ekspor. Setiap desa memiliki potensi manufaktur yang selama ini terpendam. Kampung Industri membangkitkan potensi itu dengan teknologi, sertifikasi, dan akses pasar global.',
  },
  4: {
    title: 'Kedaulatan Pangan dari Hulu ke Hilir',
    subtitle: 'Kampung Pangan (Adikara Anna) menjamin setiap desa mampu memproduksi, mengolah, dan mendistribusikan pangannya sendiri. Dari hulu ke hilir, dari benih unggul hingga cold chain logistics — kedaulatan pangan bukan mimpi, tapi sistem yang dirancang dan dioperasikan oleh desa sendiri.',
  },
  5: {
    title: 'Jantung Kesehatan Desa',
    subtitle: 'Kampung Sehat (Adikara Roga) dari klinik mini hingga jaring pengaman sosial, menjamin setiap warga desa hidup sehat lahir dan batin. Kesehatan bukan sekadar absennya penyakit — kesehatan adalah keutuhan fisik, mental, rohani, dan sosial. Kampung Sehat membangun sistem kesehatan holistik.',
  },
  6: {
    title: 'Pabrik Pendidikan Desa',
    subtitle: 'Kampung Cerdas (Adikara Vidya) dari solusi putus sekolah hingga universitas terbuka, menjamin setiap anak desa memiliki akses ilmu setara kota. Pendidikan bukan privilege — pendidikan adalah hak setiap anak desa. Kampung Cerdas menghapus batasan geografis dalam akses ilmu.',
  },
  7: {
    title: 'Jalur Distribusi Nusantara',
    subtitle: 'Kampung Niaga (Adikara Yana) gerbang ekspor-impor, logistik, cold chain, konektivitas, dan energi yang menghubungkan desa ke 195 negara. Tanpa jalur distribusi, produk terbaik desa hanya akan menjadi cerita. Kampung Niaga memastikan setiap produk desa sampai ke pasar dunia.',
  },
  8: {
    title: 'Paru-Paru Hijau Desa',
    subtitle: 'Kampung Hijau (Adikara Prakriti) energi terbarukan, pengelolaan limbah, konservasi, dan pertanian hijau yang menjamin keberlanjutan 7 generasi ke depan. Kemakmuran tanpa keberlanjutan adalah hutang kepada anak cucu. Kampung Hijau memastikan setiap kemajuan ramah bagi tujuh generasi.',
  },
  9: {
    title: 'Ruang Keajaiban Desa',
    subtitle: 'Kampung Wisata (Adikara Ramya) wisata alam, budaya, spiritual, hospitality, dan ekonomi kreatif yang menjadikan desa sebagai destinasi dunia. Setiap desa punya keajaiban yang belum diceritakan. Kampung Wisata membuka panggung dunia bagi keajaiban desa Indonesia.',
  },
}

// ─── Animation Variants ─────────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

// ─── Klaster Section Component ──────────────────────────────────────────────────

function KlasterSection({
  klasterNumber,
  klasterTitle,
  emoji,
  color,
  pilarColor,
  klasterLabel,
  programs,
  index,
  pilarNumber,
}: {
  klasterNumber: number
  klasterTitle: string
  emoji: string
  color: string
  pilarColor: string
  klasterLabel: string
  programs: { number: number; title: string; description: string; interlinks?: number[] }[]
  index: number
  pilarNumber: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  const numeral = romanNumerals[klasterNumber - 1] || String(klasterNumber)

  return (
    <section
      ref={ref}
      className={`py-16 md:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaster Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <div
              className="px-5 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2"
              style={{ backgroundColor: color }}
            >
              <span className="text-lg">{emoji}</span>
              {klasterLabel.toUpperCase()} {numeral}
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] mb-3">
            {klasterTitle}
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mt-4 h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: color }}
          />
        </motion.div>

        {/* Program Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {programs.map((program) => {
            const IconComp = ICON_MAP[PILAR_PROGRAMS.find(p => p.number === pilarNumber)?.icon ?? 'Scale'] ?? Scale
            return (
              <motion.div key={program.number} variants={fadeInUp}>
                <Card className="border hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                  <CardContent className="p-6">
                    {/* Program Number & Icon */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <IconComp className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: color }}
                          >
                            #{program.number}
                          </span>
                          <h3 className="font-bold text-[#1A1A1A] text-lg leading-tight">
                            {program.title}
                          </h3>
                        </div>
                        <p className="text-xs font-semibold" style={{ color }}>
                          {program.description}
                        </p>
                      </div>
                    </div>

                    {/* Interlink Badges */}
                    {program.interlinks && program.interlinks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {program.interlinks.map((linkedPilar) => {
                          const linkedData = PILAR_PROGRAMS.find(p => p.number === linkedPilar)
                          if (!linkedData) return null
                          return (
                            <Link key={linkedPilar} href={`/pilar/${PILAR_SLUGS[linkedPilar]}`}>
                              <Badge
                                variant="secondary"
                                className="text-[10px] cursor-pointer hover:opacity-80 transition-opacity"
                                style={{
                                  backgroundColor: `${linkedData.color}10`,
                                  color: linkedData.color,
                                  borderColor: `${linkedData.color}30`,
                                }}
                              >
                                {linkedData.title.replace('Kampung ', '')}
                              </Badge>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Interlink Ecosystem Diagram ────────────────────────────────────────────────

function InterlinkEcosystemDiagram({ pilarNumber, color, secondaryColor, title, adhikara }: {
  pilarNumber: number
  color: string
  secondaryColor: string
  title: string
  adhikara: string
}) {
  const connections = INTERLINK_CONNECTIONS.filter(c => c.from === pilarNumber || c.to === pilarNumber)

  const connectedPilars = useMemo(() => {
    const pilarNums = new Set<number>()
    INTERLINK_CONNECTIONS.filter(c => c.from === pilarNumber || c.to === pilarNumber).forEach(c => {
      if (c.from === pilarNumber) pilarNums.add(c.to)
      else pilarNums.add(c.from)
    })
    return Array.from(pilarNums).map(num => PILAR_PROGRAMS.find(c => c.number === num)).filter(Boolean) as typeof PILAR_PROGRAMS[number][]
  }, [pilarNumber])

  const spokePositions = useMemo(() => {
    return connectedPilars.map((p, i) => {
      const angle = (i / connectedPilars.length) * 2 * Math.PI - Math.PI / 2
      const radiusX = 42
      const radiusY = 38
      return {
        pilar: p,
        x: 50 + radiusX * Math.cos(angle),
        y: 50 + radiusY * Math.sin(angle),
      }
    })
  }, [connectedPilars])

  const getConnsForPilar = (otherNum: number) =>
    connections.filter(c => c.from === otherNum || c.to === otherNum)

  return (
    <div className="rounded-xl border border-white/10 p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <h4 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        Ekosistem Koneksi — {title}
      </h4>

      {/* Hub-and-spoke diagram */}
      <div className="relative w-full max-w-md mx-auto" style={{ paddingBottom: '80%' }}>
        {/* Center pilar */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-xl border-2 z-10"
          style={{
            left: '35%', top: '30%', width: '30%', height: '28%',
            borderColor: color,
            backgroundColor: `${color}15`,
            boxShadow: `0 0 30px ${color}20`,
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-1"
            style={{ background: `linear-gradient(135deg, ${color}, ${secondaryColor})` }}
          >
            {(() => {
              const IconComp = ICON_MAP[PILAR_PROGRAMS.find(p => p.number === pilarNumber)?.icon ?? 'Scale'] ?? Scale
              return <IconComp className="w-4 h-4 text-white" />
            })()}
          </div>
          <span className="text-[8px] sm:text-[10px] font-bold text-white/90 text-center leading-tight px-1">
            {title.replace('Kampung ', '')}
          </span>
          <span className="text-[7px] sm:text-[8px] text-white/40">{adhikara.split(' ').pop()}</span>
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
          const otherPilar = PILAR_PROGRAMS.find(c => c.number === otherPilarNum)
          if (!otherPilar) return null
          const connColor = INTERLINK_COLORS[conn.type]
          return (
            <Link key={idx} href={`/pilar/${PILAR_SLUGS[otherPilarNum]}`}>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
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
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function PilarPageContent({ pilarNumber }: { pilarNumber: number }) {
  const pilarData = useMemo(() => PILAR_PROGRAMS.find(p => p.number === pilarNumber), [pilarNumber])
  const programCount = useMemo(() => getProgramCount(pilarNumber), [pilarNumber])
  const klasterCount = useMemo(() => pilarData?.klasterGroups.length ?? 0, [pilarData])
  const connectedCount = useMemo(() => {
    const nums = new Set<number>()
    INTERLINK_CONNECTIONS.filter(c => c.from === pilarNumber || c.to === pilarNumber).forEach(c => {
      nums.add(c.from === pilarNumber ? c.to : c.from)
    })
    return nums.size
  }, [pilarNumber])
  const philosophy = PHILOSOPHY[pilarNumber]

  // Invalid pilarNumber guard
  if (!pilarData || pilarNumber < 1 || pilarNumber > 9) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#1A1A1A] mb-4">Pilar Tidak Ditemukan</h1>
          <p className="text-[#6B7280] mb-6">Pilar dengan nomor {pilarNumber} tidak tersedia.</p>
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </main>
    )
  }

  const { title, adhikara, color, secondaryColor, klasterLabel, klasterGroups } = pilarData
  const shortName = title.replace('Kampung ', '')

  // Assign colors to klaster groups
  const klasterColors = [
    color,
    secondaryColor,
    '#8b5cf6',
    '#10b981',
    '#8B0000',
    '#3b82f6',
    '#f59e0b',
    '#059669',
    '#dc2626',
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <Link href="/nusa-futuristik" className="hover:text-[#008F3D]">9 Pilar Kampung</Link>
            </span>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#1A1A1A] font-medium">{shortName} / {adhikara}</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Dark Gradient */}
      <section className="relative bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#1a0f00] text-white py-16 md:py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: `${color}08` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/3 rounded-full blur-[120px]" />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40 mb-6 text-sm px-4 py-1.5">
                {(() => {
                  const IconComp = ICON_MAP[pilarData.icon] ?? Scale
                  return <IconComp className="w-4 h-4 mr-2 inline" />
                })()}
                {adhikara} — {title}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                {programCount} Program
              </span>
              <br />
              <span className="text-white">Super Detail</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-6 leading-relaxed">
              <strong style={{ color }}>Philosophy {pilarNumber}: </strong>
              {philosophy?.title ?? title}
            </motion.p>
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mt-8 text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <p className="text-sm md:text-base text-white/60 leading-relaxed italic">
                {philosophy?.subtitle ?? `Detail program ${title}.`}
              </p>
            </motion.div>

            {/* Klaster Quick Nav */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-3">
              {klasterGroups.map((k, i) => {
                const kColor = klasterColors[i] || color
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
                const numeral = romanNumerals[k.number - 1] || String(k.number)
                return (
                  <a
                    key={k.id}
                    href={`#klaster-${pilarNumber}-${k.number}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white border transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: `${kColor}20`,
                      borderColor: `${kColor}50`,
                    }}
                  >
                    <span>{k.emoji}</span>
                    <span style={{ color: kColor }}>{klasterLabel} {numeral}</span>
                  </a>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Sibling Navigation Badges */}
      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {PILAR_PROGRAMS.filter(p => p.number !== pilarNumber).map((p) => {
              const IconComp = ICON_MAP[p.icon] ?? Scale
              return (
                <Link key={p.number} href={`/pilar/${PILAR_SLUGS[p.number]}`}>
                  <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors cursor-pointer flex items-center gap-1.5">
                    <IconComp className="w-3 h-3" />
                    {p.title.replace('Kampung ', '')}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: String(programCount), label: 'Program Super Detail', statColor: '#FFD700' },
              { value: String(klasterCount), label: `${klasterLabel} Strategis`, statColor: color },
              { value: '83.763', label: 'Desa Terintegrasi', statColor: '#10b981' },
              { value: String(connectedCount), label: 'Adhikara Terkoneksi', statColor: '#8b5cf6' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border text-center h-full">
                  <CardContent className="p-4 md:p-6">
                    <p className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: stat.statColor }}>
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-[#6B7280]">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Klaster/Domain Sections */}
      {klasterGroups.map((klaster, index) => (
        <div key={klaster.id} id={`klaster-${pilarNumber}-${klaster.number}`}>
          <KlasterSection
            klasterNumber={klaster.number}
            klasterTitle={klaster.title}
            emoji={klaster.emoji}
            color={klasterColors[index] || color}
            pilarColor={color}
            klasterLabel={klasterLabel}
            programs={klaster.programs}
            index={index}
            pilarNumber={pilarNumber}
          />
        </div>
      ))}

      {/* Interlink/Ecosystem Diagram Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Ekosistem Interlink
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
                Koneksi ke <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">{connectedCount} Adhikara</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
                {title} tidak berdiri sendiri — ia terhubung dengan {connectedCount} Adhikara lainnya dalam ekosistem 9 Pilar Kampung yang saling memperkuat.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <InterlinkEcosystemDiagram
                pilarNumber={pilarNumber}
                color={color}
                secondaryColor={secondaryColor}
                title={title}
                adhikara={adhikara}
              />
            </motion.div>

            {/* Interlink type legend */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mt-8">
              {(Object.entries(INTERLINK_COLORS) as [InterlinkType, string][]).map(([type, typeColor]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColor }} />
                  <span className="text-xs text-white/50">{INTERLINK_LABELS[type]}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#1a0f00] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40 mb-4">
                Filosofi {adhikara}
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6">
              {philosophy?.title.split(' ').map((word, i) =>
                i === 0 ? word : ` ${word}`
              ).reduce((prev, curr, i) => {
                if (i === 1) return <span key={i} className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">{prev} {curr}</span>
                if (i > 1) return <span key={i}>{prev} <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">{curr}</span></span>
                return curr
              })}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 leading-relaxed text-sm md:text-base mb-8">
              {philosophy?.subtitle}
            </motion.p>

            {/* Klaster Summary Cards */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
              {klasterGroups.map((k, i) => {
                const kColor = klasterColors[i] || color
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
                const numeral = romanNumerals[k.number - 1] || String(k.number)
                return (
                  <motion.div key={k.id} variants={fadeInUp}>
                    <Card className="border-white/10 bg-white/5 backdrop-blur-sm h-full">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{k.emoji}</div>
                        <p className="text-xs font-bold mb-1" style={{ color: kColor }}>
                          {klasterLabel.toUpperCase()} {numeral}
                        </p>
                        <p className="text-xs text-white/50">{k.programs.length} Program</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 text-white relative overflow-hidden" style={{ background: `linear-gradient(to right, ${color}, ${secondaryColor})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Bergabung dengan {title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Jadilah bagian dari {philosophy?.title.toLowerCase() ?? 'ekosistem ini'}. Dari program di level RT hingga sistem yang melindungi tujuh generasi — setiap langkah Anda berarti.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/daftar">
                <Button className="bg-white font-semibold shadow-lg group px-8 py-3 text-base" style={{ color }}>
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/kpa">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-base">
                  Pelajari 5 KPA
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sibling Navigation - All 9 Pilars */}
      <section className="py-10 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-[#6B7280] mb-4 text-center">Pilar Lainnya</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {PILAR_PROGRAMS.map((p) => {
              const IconComp = ICON_MAP[p.icon] ?? Scale
              const isCurrent = p.number === pilarNumber
              return (
                <Link key={p.number} href={`/pilar/${PILAR_SLUGS[p.number]}`}>
                  <Badge
                    variant={isCurrent ? 'default' : 'outline'}
                    className="text-xs px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1.5"
                    style={isCurrent ? {
                      backgroundColor: color,
                      color: 'white',
                      borderColor: color,
                    } : {
                      borderColor: `${p.color}40`,
                      color: p.color,
                    }}
                  >
                    <IconComp className="w-3 h-3" />
                    {p.title.replace('Kampung ', '')}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
