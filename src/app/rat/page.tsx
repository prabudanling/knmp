'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Users,
  Scale,
  Calendar,
  CheckCircle2,
  Clock,
  Vote,
  FileText,
  Award,
  Shield,
  Eye,
  ChevronRight,
  Building2,
  UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { GOVERNANCE_STRUCTURE } from '@/data/mocks'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function RATPage() {
  const governance = GOVERNANCE_STRUCTURE

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <RATInfoSection />
        <GovernanceSection data={governance} />
        <VotingPowerSection />
        <PrinciplesSection />
      </div>
    </main>
  )
}

// =====================
// Hero Section
// =====================
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12 text-center"
    >
      <motion.div variants={fadeInUp}>
        <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
          <Scale className="w-4 h-4 mr-2" />
          Tata Kelola Demokratis
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        RAT & <span className="text-[#8B0000]">Governance</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Rapat Anggota Tahunan adalah forum tertinggi KNMP. Setiap keputusan diambil secara demokratis.
      </motion.p>
    </motion.section>
  )
}

// =====================
// RAT Info Section
// =====================
function RATInfoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const info = [
    {
      icon: Calendar,
      title: 'Jadwal RAT',
      value: 'Q1 Setiap Tahun',
      description: 'Paling lambat 6 bulan setelah tahun buku berakhir',
    },
    {
      icon: Users,
      title: 'Peserta',
      value: 'Seluruh Anggota',
      description: 'Setiap KPA memiliki proporsi suara yang adil',
    },
    {
      icon: Vote,
      title: 'Mekanisme',
      value: '1 Anggota = 1 Suara',
      description: 'Voting internal KPA, kemudian agregasi',
    },
    {
      icon: FileText,
      title: 'Agenda',
      value: '7 Agenda Wajib',
      description: 'SHU, Pengurus, Rencana Kerja, dll',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {info.map((item, i) => (
          <Card key={i} className="bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-xl flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#8B0000]" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Governance Section
// =====================
function GovernanceSection({ data }: { data: typeof GOVERNANCE_STRUCTURE }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const sections = [
    { title: 'Pengurus', data: data.pengurus, icon: Building2, color: '#8B0000' },
    { title: 'Pengawas', data: data.pengawas, icon: Eye, color: '#008F3D' },
    { title: 'Dewan Penasihat', data: data.dewanPenasihat, icon: Award, color: '#3b82f6' },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Struktur <span className="text-[#8B0000]">Organisasi</span>
        </h2>
        <p className="text-muted-foreground">
          Organ yang mengelola dan mengawasi KNMP
        </p>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="bg-white border border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${section.color}15` }}
                  >
                    <section.icon className="w-5 h-5" style={{ color: section.color }} />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.data.map((person, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 p-3 bg-red-50 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center text-[#8B0000] font-bold">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{person.name}</p>
                        <p className="text-sm text-muted-foreground">{person.position}</p>
                        <p className="text-xs text-muted-foreground">
                          {person.termStart} - {person.termEnd}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// =====================
// Voting Power Section
// =====================
function VotingPowerSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const kpaVotes = [
    { name: 'KPA-1: Produsen & Pekerja', power: 20, color: '#22c55e' },
    { name: 'KPA-2: Konsumen Umum', power: 20, color: '#3b82f6' },
    { name: 'KPA-3: Abdi Negara', power: 20, color: '#8b5cf6' },
    { name: 'KPA-4: Entitas Bisnis', power: 20, color: '#f59e0b' },
    { name: 'KPA-5: Pemodal & Investor', power: 20, color: '#008F3D' },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Distribusi <span className="text-[#8B0000]">Voting Power</span>
        </h2>
        <p className="text-muted-foreground">
          Proporsi suara dalam RAT berdasarkan KPA
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="bg-white border border-red-100">
          <CardContent className="p-6">
            {/* Visual Bar */}
            <div className="h-8 rounded-full overflow-hidden flex mb-8">
              {kpaVotes.map((kpa, i) => (
                <div
                  key={i}
                  className="h-full transition-all duration-500"
                  style={{ width: `${kpa.power}%`, backgroundColor: kpa.color }}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {kpaVotes.map((kpa, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: kpa.color }}
                  />
                  <div>
                    <p className="font-medium text-foreground text-sm">{kpa.name}</p>
                    <p className="text-xs text-muted-foreground">{kpa.power}%</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Catatan:</strong> Investor (KPA-5) tidak memiliki hak veto meskipun memberikan modal penyertaan. Doktrin Anti-Oligarki berlaku — One Member One Vote.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  )
}

// =====================
// Principles Section
// =====================
function PrinciplesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const principles = [
    {
      icon: Users,
      title: 'Keanggotaan Sukarela & Terbuka',
      description: 'Terbuka bagi semua yang memenuhi syarat tanpa diskriminasi.',
    },
    {
      icon: Vote,
      title: 'Pengelolaan Demokratis',
      description: 'Setiap anggota memiliki hak suara yang setara.',
    },
    {
      icon: Award,
      title: 'Partisipasi Ekonomi',
      description: 'Anggota berkontribusi dan menerima SHU secara adil.',
    },
    {
      icon: Shield,
      title: 'Otonomi & Kemandirian',
      description: 'KNMP dikendalikan oleh anggota, bukan pihak eksternal.',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          7 Prinsip <span className="text-[#8B0000]">Koperasi ICA</span>
        </h2>
        <p className="text-muted-foreground">
          Prinsip International Cooperative Alliance yang dianut KNMP
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-4"
      >
        {principles.map((p, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="h-full bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
