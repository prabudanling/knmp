'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
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
  TrendingUp,
  PieChart,
  CheckCircle,
  AlertCircle,
  Lock,
  Unlock,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  Info,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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

// Mock voting data
const ACTIVE_VOTINGS = [
  {
    id: 1,
    title: 'Persetujuan Laporan Keuangan 2025',
    description: 'Pengesahan laporan keuangan tahun buku 2025 yang telah diaudit oleh Akuntan Publik independen.',
    status: 'active',
    deadline: '2026-03-15T23:59:00',
    category: 'Pengesahan',
    quorum: { current: 67, required: 50 },
    votes: {
      setuju: 58,
      tidak_setuju: 7,
      abstain: 2,
      total: 67,
    },
  },
  {
    id: 2,
    title: 'Pemilihan Ketua Pengurus Periode 2026-2031',
    description: 'Pemilihan ketua pengurus KNMP untuk periode 2026-2031. Masa jabatan 5 tahun.',
    status: 'active',
    deadline: '2026-03-15T23:59:00',
    category: 'Pemilihan',
    candidates: [
      { name: 'H. Ahmad Fadillah, S.E., M.M.', votes: 35 },
      { name: 'Ir. Siti Rahayu, M.Si.', votes: 28 },
      { name: 'Drs. Bambang Wijaya', votes: 4 },
    ],
    quorum: { current: 67, required: 50 },
  },
  {
    id: 3,
    title: 'Pembagian SHU 2025',
    description: 'Penetapan pembagian SHU dengan komposisi: Dana Cadangan 30%, Jasa Modal 10%, Jasa Usaha 40%, Dana Pendidikan 5%, Dana Sosial 5%, Lainnya 10%.',
    status: 'pending',
    deadline: '2026-03-16T23:59:00',
    category: 'SHU',
    quorum: { current: 45, required: 50 },
  },
]

const KPA_VOTING_POWER = [
  { name: 'Petani/Produsen', power: 30, color: '#22c55e', icon: '🌾' },
  { name: 'Pengusaha/Pengepul', power: 20, color: '#3b82f6', icon: '💼' },
  { name: 'Koperasi/BUMDes', power: 20, color: '#8b5cf6', icon: '🏛️' },
  { name: 'Pekerja/Kader', power: 10, color: '#f59e0b', icon: '👷' },
  { name: 'Konsumen', power: 10, color: '#ec4899', icon: '🛒' },
  { name: 'Investor', power: 10, color: '#D4AF37', icon: '💰' },
]

export default function RATPage() {
  const governance = GOVERNANCE_STRUCTURE
  const [selectedVoting, setSelectedVoting] = useState<number | null>(null)
  const [userVote, setUserVote] = useState<Record<number, string>>({})

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <RATInfoSection />
        <ActiveVotingSection 
          votings={ACTIVE_VOTINGS}
          selectedVoting={selectedVoting}
          setSelectedVoting={setSelectedVoting}
          userVote={userVote}
          setUserVote={setUserVote}
        />
        <VotingPowerSection />
        <GovernanceSection data={governance} />
        <RATScheduleSection />
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
          Rapat Anggota Tahunan
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        RAT & <span className="text-[#8B0000]">E-Voting</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Forum tertinggi KNMP dengan sistem voting digital transparan. Setiap keputusan dicatat di blockchain.
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
      value: '15 Maret 2026',
      description: 'RAT Tahunan KNMP periode 2025-2026',
    },
    {
      icon: Users,
      title: 'Peserta',
      value: '5.000+ Anggota',
      description: 'Perwakilan 6 KPA dari seluruh Indonesia',
    },
    {
      icon: Vote,
      title: 'Mekanisme',
      value: 'E-Voting Hybrid',
      description: 'Daring + Luring dengan verifikasi digital',
    },
    {
      icon: FileText,
      title: 'Agenda',
      value: '11 Item',
      description: 'SHU, Pemilihan, Rencana Kerja, dll',
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
// Active Voting Section
// =====================
function ActiveVotingSection({
  votings,
  selectedVoting,
  setSelectedVoting,
  userVote,
  setUserVote,
}: {
  votings: typeof ACTIVE_VOTINGS
  selectedVoting: number | null
  setSelectedVoting: (id: number | null) => void
  userVote: Record<number, string>
  setUserVote: (votes: Record<number, string>) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700"><Zap className="w-3 h-3 mr-1" />Aktif</Badge>
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Menunggu Quorum</Badge>
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-700"><Lock className="w-3 h-3 mr-1" />Ditutup</Badge>
      default:
        return null
    }
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Voting <span className="text-[#8B0000]">Aktif</span>
          </h2>
          <p className="text-muted-foreground">Sesuai AD/ART Pasal 24-27 tentang mekanisme voting RAT</p>
        </div>
        <Badge className="bg-[#8B0000] text-white">
          <Unlock className="w-3 h-3 mr-1" />
          RAT Berlangsung
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {votings.map((voting) => (
          <Card
            key={voting.id}
            className={cn(
              'bg-white border transition-all cursor-pointer',
              selectedVoting === voting.id ? 'border-[#8B0000] ring-2 ring-[#8B0000]/20' : 'border-red-100 hover:border-[#8B0000]/30'
            )}
            onClick={() => setSelectedVoting(selectedVoting === voting.id ? null : voting.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="outline" className="text-xs">{voting.category}</Badge>
                {getStatusBadge(voting.status)}
              </div>
              <CardTitle className="text-lg leading-tight">{voting.title}</CardTitle>
              <CardDescription className="text-sm line-clamp-2">{voting.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Quorum Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Quorum</span>
                  <span className="font-medium">{voting.quorum.current}% / {voting.quorum.required}%</span>
                </div>
                <Progress 
                  value={voting.quorum.current} 
                  className="h-2"
                />
              </div>

              {/* Voting Results */}
              {'votes' in voting && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Hasil Sementara:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
                      <ThumbsUp className="w-4 h-4 mx-auto text-green-500 mb-1" />
                      <p className="text-lg font-bold text-green-600">{voting.votes.setuju}%</p>
                      <p className="text-xs text-muted-foreground">Setuju</p>
                    </div>
                    <div className="flex-1 bg-red-50 rounded-lg p-2 text-center">
                      <ThumbsDown className="w-4 h-4 mx-auto text-red-500 mb-1" />
                      <p className="text-lg font-bold text-red-600">{voting.votes.tidak_setuju}%</p>
                      <p className="text-xs text-muted-foreground">Tidak</p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                      <MinusCircle className="w-4 h-4 mx-auto text-gray-500 mb-1" />
                      <p className="text-lg font-bold text-gray-600">{voting.votes.abstain}%</p>
                      <p className="text-xs text-muted-foreground">Abstain</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Candidate Results */}
              {'candidates' in voting && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Kandidat:</p>
                  {voting.candidates.map((candidate, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="truncate pr-2">{candidate.name}</span>
                        <span className="font-medium">{candidate.votes}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${candidate.votes}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className={cn(
                            'h-full rounded-full',
                            i === 0 ? 'bg-[#8B0000]' : i === 1 ? 'bg-[#D4AF37]' : 'bg-gray-400'
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Vote Button */}
              {voting.status === 'active' && !userVote[voting.id] && (
                <Button 
                  className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setUserVote({ ...userVote, [voting.id]: 'setuju' })
                  }}
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Berikan Suara
                </Button>
              )}

              {userVote[voting.id] && (
                <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Anda sudah memberikan suara</span>
                </div>
              )}
            </CardContent>
          </Card>
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
          Proporsi <span className="text-[#8B0000]">Suara KPA</span>
        </h2>
        <p className="text-muted-foreground">
          Sesuai Permenkop 8/2021 & AD/ART Pasal 24 — Setiap KPA memiliki proporsi suara yang adil
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="bg-white border border-red-100">
          <CardContent className="p-6">
            {/* Visual Bar */}
            <div className="h-10 rounded-full overflow-hidden flex mb-8 shadow-inner">
              {KPA_VOTING_POWER.map((kpa, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: `${kpa.power}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: kpa.color }}
                >
                  {kpa.power}%
                </motion.div>
              ))}
            </div>

            {/* Legend Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {KPA_VOTING_POWER.map((kpa, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">{kpa.icon}</div>
                  <p className="font-medium text-foreground text-sm">{kpa.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: kpa.color }} />
                    <span className="text-sm font-bold" style={{ color: kpa.color }}>{kpa.power}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">Catatan Penting:</p>
                  <p className="text-sm text-amber-700 mt-1">
                    <strong>Investor (KPA-6) tidak memiliki hak veto</strong> meskipun memberikan modal penyertaan terbesar. 
                    Keputusan RAT diambil berdasarkan suara terbanyak (&gt;50%) atau musyawarah mufakat.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
    { title: 'Pengawas', data: data.pengawas, icon: Eye, color: '#D4AF37' },
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
          Organ yang mengelola dan mengawasi KNMP (AD/ART Pasal 28-41)
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
// RAT Schedule Section
// =====================
function RATScheduleSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const agenda = [
    { time: '08:00', title: 'Pembukaan & Verifikasi Peserta', icon: UserCheck },
    { time: '09:00', title: 'Laporan Pertanggungjawaban Pengurus', icon: FileText },
    { time: '10:30', title: 'Laporan Pengawasan dari Pengawas', icon: Eye },
    { time: '11:00', title: 'Pembahasan & Pengesahan Laporan Keuangan', icon: PieChart },
    { time: '12:00', title: 'Ishoma & Shalat', icon: Clock },
    { time: '13:30', title: 'Pemilihan Pengurus & Pengawas Periode Baru', icon: Vote },
    { time: '15:00', title: 'Penetapan Pembagian SHU', icon: TrendingUp },
    { time: '15:30', title: 'Rencana Kerja & Anggaran 2026', icon: BarChart3 },
    { time: '16:30', title: 'Penutupan & Pengumuman Hasil Voting', icon: CheckCircle2 },
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
          Agenda <span className="text-[#8B0000]">RAT 2026</span>
        </h2>
        <p className="text-muted-foreground">
          Jadwal lengkap Rapat Anggota Tahunan KNMP
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="bg-white border border-red-100">
          <CardContent className="p-6">
            <div className="space-y-3">
              {agenda.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <div className="w-16 text-sm font-medium text-[#8B0000]">{item.time}</div>
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#8B0000]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                  </div>
                </div>
              ))}
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
      description: 'Setiap anggota memiliki hak suara yang setara dalam RAT.',
    },
    {
      icon: TrendingUp,
      title: 'Partisipasi Ekonomi',
      description: 'Anggota berkontribusi dan menerima SHU secara adil berdasarkan partisipasi.',
    },
    {
      icon: Shield,
      title: 'Otonomi & Kemandirian',
      description: 'KNMP dikendalikan oleh anggota, bukan pihak eksternal.',
    },
    {
      icon: Award,
      title: 'Pendidikan & Pelatihan',
      description: 'JE-P3 Academy menyediakan pelatihan untuk semua anggota.',
    },
    {
      icon: Building2,
      title: 'Kerjasama Antarkoperasi',
      description: 'Bekerja sama dengan koperasi lain, BUMDes, dan KDMP.',
    },
    {
      icon: CheckCircle2,
      title: 'Kepedulian Komunitas',
      description: 'Dana sosial 5% untuk kesejahteraan masyarakat.',
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
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
