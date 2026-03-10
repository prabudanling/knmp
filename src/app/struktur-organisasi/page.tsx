'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Crown,
  Users,
  Building2,
  Scale,
  Shield,
  Eye,
  Vote,
  Award,
  Star,
  Briefcase,
  Globe,
  Landmark,
  Heart,
  Zap,
  Layers,
  Network,
  ChevronDown,
  Sparkles,
  UserCircle,
  Building,
  FileText,
  Gavel,
  Target,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Master Color Palette - No overlapping, harmonious gradient scheme
const COLORS = {
  // Primary - Deep Maroon
  primary: {
    main: '#8B0000',
    light: '#B22222',
    dark: '#5C0000',
    bg: 'bg-gradient-to-br from-red-900 to-red-800',
    text: 'text-red-900',
    border: 'border-red-800',
    glow: 'shadow-red-900/30',
  },
  // Secondary - Royal Gold
  secondary: {
    main: '#D4AF37',
    light: '#E5C76B',
    dark: '#A68A2A',
    bg: 'bg-gradient-to-br from-amber-500 to-yellow-500',
    text: 'text-amber-700',
    border: 'border-amber-500',
    glow: 'shadow-amber-500/30',
  },
  // Accent - Ocean Blue
  accent: {
    main: '#0284c7',
    light: '#38bdf8',
    dark: '#0369a1',
    bg: 'bg-gradient-to-br from-sky-500 to-blue-600',
    text: 'text-sky-700',
    border: 'border-sky-500',
    glow: 'shadow-sky-500/30',
  },
  // Tertiary - Royal Purple
  tertiary: {
    main: '#7c3aed',
    light: '#a78bfa',
    dark: '#5b21b6',
    bg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    text: 'text-violet-700',
    border: 'border-violet-500',
    glow: 'shadow-violet-500/30',
  },
  // Success - Emerald
  success: {
    main: '#059669',
    light: '#34d399',
    dark: '#047857',
    bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
    text: 'text-emerald-700',
    border: 'border-emerald-500',
    glow: 'shadow-emerald-500/30',
  },
  // Info - Cyan
  info: {
    main: '#0891b2',
    light: '#22d3ee',
    dark: '#0e7490',
    bg: 'bg-gradient-to-br from-cyan-500 to-teal-600',
    text: 'text-cyan-700',
    border: 'border-cyan-500',
    glow: 'shadow-cyan-500/30',
  },
  // Warning - Orange
  warning: {
    main: '#ea580c',
    light: '#fb923c',
    dark: '#c2410c',
    bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    text: 'text-orange-700',
    border: 'border-orange-500',
    glow: 'shadow-orange-500/30',
  },
  // Pink
  pink: {
    main: '#db2777',
    light: '#f472b6',
    dark: '#be185d',
    bg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    text: 'text-pink-700',
    border: 'border-pink-500',
    glow: 'shadow-pink-500/30',
  },
}

// Founder/Key Leadership - 5 Positions
const FOUNDERS = [
  {
    id: 1,
    name: 'Drs. H. Arif Rachman Hakim',
    position: 'CEO & Pendiri',
    role: 'Chief Executive Officer',
    description: 'CEO Asosiasi JE-P3. Pemimpin strategis yang mengarahkan visi ekosistem pengusaha Indonesia.',
    icon: Crown,
    color: COLORS.primary,
    since: '2016',
    certifications: [],
    status: 'active',
  },
  {
    id: 2,
    name: 'Tn. H. Gugun Gunara, S.E., M.M.',
    position: 'COO & Grand Architect',
    role: 'Chief Operating Officer',
    description: 'Visioner di balik transformasi digital koperasi Indonesia. Grand Architect 39 Dokumen Peradaban.',
    icon: Star,
    color: COLORS.secondary,
    since: '2016',
    certifications: ['CMC', 'MBA', 'CFA', 'PMP', 'CBP', 'SSBB'],
    status: 'active',
  },
  {
    id: 3,
    name: '',
    position: 'CFO',
    role: 'Chief Financial Officer',
    description: '',
    icon: Briefcase,
    color: COLORS.accent,
    since: '',
    certifications: [],
    status: 'vacant',
  },
  {
    id: 4,
    name: '',
    position: 'CTO',
    role: 'Chief Technology Officer',
    description: '',
    icon: Globe,
    color: COLORS.tertiary,
    since: '',
    certifications: [],
    status: 'vacant',
  },
  {
    id: 5,
    name: '',
    position: 'CSO',
    role: 'Chief Strategy Officer',
    description: '',
    icon: Target,
    color: COLORS.success,
    since: '',
    certifications: [],
    status: 'vacant',
  },
]

// Complete Organizational Structure from AD/ART
const ORG_STRUCTURE = {
  // Level 1 - Highest Authority
  rat: {
    name: 'RAT',
    fullName: 'Rapat Anggota Tahunan',
    description: 'Forum tertinggi KNMP. Memiliki kekuasaan tertinggi dalam pengambilan keputusan.',
    icon: Vote,
    color: COLORS.primary,
    level: 1,
    positions: [
      { name: '', position: 'Ketua RAT', status: 'vacant' },
      { name: '', position: 'Wakil Ketua RAT', status: 'vacant' },
      { name: '', position: 'Sekretaris RAT', status: 'vacant' },
    ],
    authority: [
      'Menetapkan & mengubah AD/ART',
      'Memilih & memberhentikan Pengurus/Pengawas',
      'Menetapkan pembagian SHU',
      'Mengesahkan laporan keuangan',
      'Memutuskan penggabungan/pembubaran',
    ],
  },
  
  // Level 2 - Executive
  pengurus: {
    name: 'Pengurus',
    fullName: 'Pengurus KNMP',
    description: 'Organ pelaksana yang dipilih RAT untuk menjalankan keputusan RAT dan mengelola KNMP.',
    icon: Building2,
    color: COLORS.secondary,
    level: 2,
    positions: [
      { name: '', position: 'Ketua Pengurus', status: 'vacant' },
      { name: '', position: 'Wakil Ketua Pengurus I', status: 'vacant' },
      { name: '', position: 'Wakil Ketua Pengurus II', status: 'vacant' },
      { name: '', position: 'Sekretaris', status: 'vacant' },
      { name: '', position: 'Wakil Sekretaris', status: 'vacant' },
      { name: '', position: 'Bendahara', status: 'vacant' },
      { name: '', position: 'Wakil Bendahara', status: 'vacant' },
      { name: '', position: 'Ketua Bidang Usaha Logistik', status: 'vacant' },
      { name: '', position: 'Ketua Bidang Usaha Marketplace', status: 'vacant' },
      { name: '', position: 'Ketua Bidang Usaha Pertanian', status: 'vacant' },
      { name: '', position: 'Ketua Bidang Usaha Haji & Umroh', status: 'vacant' },
    ],
    term: '5 Tahun (maks 2 periode)',
  },
  
  // Level 2 - Supervisory
  pengawas: {
    name: 'Pengawas',
    fullName: 'Pengawas KNMP',
    description: 'Organ independen yang dipilih RAT untuk mengawasi pelaksanaan AD/ART dan kinerja Pengurus.',
    icon: Eye,
    color: COLORS.accent,
    level: 2,
    positions: [
      { name: '', position: 'Ketua Pengawas', status: 'vacant' },
      { name: '', position: 'Wakil Ketua Pengawas', status: 'vacant' },
      { name: '', position: 'Anggota Pengawas I', status: 'vacant' },
      { name: '', position: 'Anggota Pengawas II', status: 'vacant' },
      { name: '', position: 'Anggota Pengawas III', status: 'vacant' },
    ],
    term: '5 Tahun (maks 2 periode)',
  },
  
  // Level 3 - Advisory
  dewanPenasihat: {
    name: 'Dewan Penasihat',
    fullName: 'Dewan Penasihat KNMP',
    description: 'Organ non-struktural yang memberikan nasihat strategis kepada Pengurus.',
    icon: Award,
    color: COLORS.tertiary,
    level: 3,
    positions: [
      { name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Ketua Dewan Penasihat (Permanen)', status: 'active', isFounder: true },
      { name: '', position: 'Anggota Dewan Penasihat I', status: 'vacant' },
      { name: '', position: 'Anggota Dewan Penasihat II', status: 'vacant' },
      { name: '', position: 'Anggota Dewan Penasihat III', status: 'vacant' },
    ],
    note: 'Founder menjabat sebagai Ketua Permanen sepanjang hidup dan bersedia',
  },
  
  // Level 3 - Ethics
  dewanEtik: {
    name: 'Dewan Etik',
    fullName: 'Dewan Etik KNMP',
    description: 'Organ independen yang menegakkan Kode Etik KNMP.',
    icon: Scale,
    color: COLORS.warning,
    level: 3,
    positions: [
      { name: '', position: 'Ketua Dewan Etik', status: 'vacant' },
      { name: '', position: 'Wakil Ketua Dewan Etik', status: 'vacant' },
      { name: '', position: 'Anggota Dewan Etik I', status: 'vacant' },
      { name: '', position: 'Anggota Dewan Etik II', status: 'vacant' },
    ],
    term: '5 Tahun',
  },
  
  // Level 3 - Ombudsman
  ombudsman: {
    name: 'Ombudsman',
    fullName: 'Ombudsman KNMP',
    description: 'Organ independen yang menerima dan menindaklanjuti pengaduan anggota.',
    icon: Shield,
    color: COLORS.info,
    level: 3,
    positions: [
      { name: '', position: 'Ketua Ombudsman', status: 'vacant' },
      { name: '', position: 'Anggota Ombudsman I', status: 'vacant' },
      { name: '', position: 'Anggota Ombudsman II', status: 'vacant' },
    ],
  },
  
  // Level 4 - Joint Committee (JE-P3 × KNMP)
  jsc: {
    name: 'JSC',
    fullName: 'Joint Strategic Committee',
    description: 'Komite bersama KNMP–JE-P3 yang bersifat konsultatif dengan hak rekomendasi kuat.',
    icon: Network,
    color: COLORS.pink,
    level: 4,
    positions: [
      { name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Ketua JSC (Permanen)', status: 'active', isFounder: true },
      { name: '', position: 'Perwakilan KNMP I', status: 'vacant' },
      { name: '', position: 'Perwakilan KNMP II', status: 'vacant' },
      { name: '', position: 'Perwakilan JE-P3 I', status: 'vacant' },
      { name: '', position: 'Perwakilan JE-P3 II', status: 'vacant' },
      { name: '', position: 'Perwakilan JE-P3 III', status: 'vacant' },
    ],
    note: 'Founder memiliki hak veto terbatas atas keputusan strategis KNMP–JE-P3',
  },
}

// 6 KPA (Kelompok Pihak Anggota)
const KPA_MEMBERS = [
  {
    id: 1,
    name: 'KPA-1: Petani/Produsen',
    description: 'Petani, pekebun, nelayan, peternak, pengrajin, dan produsen barang/jasa di tingkat desa.',
    proportion: 30,
    icon: '🌾',
    color: COLORS.success,
    examples: ['Gapoktan', 'Poktan', 'KWT', 'Kelompok Nelayan'],
  },
  {
    id: 2,
    name: 'KPA-2: Pengusaha/Pengepul',
    description: 'Pengusaha UMKM, pengepul, pedagang, dan distributor yang menghubungkan produsen dengan pasar.',
    proportion: 20,
    icon: '💼',
    color: COLORS.accent,
    examples: ['Anggota JE-P3', 'Pengusaha PPP', 'Trader', 'Exportir'],
  },
  {
    id: 3,
    name: 'KPA-3: Koperasi/BUMDes',
    description: 'Koperasi primer, koperasi desa, BUMDes, BUMDesMA, dan badan usaha milik desa lainnya.',
    proportion: 20,
    icon: '🏛️',
    color: COLORS.tertiary,
    examples: ['KDMP', 'BUMDesMA', 'KUD', 'Koperasi Primer'],
  },
  {
    id: 4,
    name: 'KPA-4: Pekerji/Kader',
    description: 'Pekerja, kader lapangan, agen logistik, dan tenaga profesional yang mendukung operasional KNMP.',
    proportion: 10,
    icon: '👷',
    color: COLORS.warning,
    examples: ['Karang Taruna', 'Kader PKK', 'Agen Logistik', 'Karyawan KNMP'],
  },
  {
    id: 5,
    name: 'KPA-5: Konsumen',
    description: 'Konsumen akhir yang menggunakan produk/jasa anggota KNMP.',
    proportion: 10,
    icon: '🛒',
    color: COLORS.pink,
    examples: ['Rumah Tangga', 'Konsumen Platform', 'Pembeli Produk'],
  },
  {
    id: 6,
    name: 'KPA-6: Investor Pendukung',
    description: 'Investor individu atau institusi yang menyediakan modal bagi pengembangan usaha KNMP.',
    proportion: 10,
    icon: '💰',
    color: COLORS.secondary,
    examples: ['Bank Himbara', 'ADB', 'World Bank', 'Impact Investor'],
    note: 'Tidak memiliki hak veto meskipun memberikan modal terbesar',
  },
]

export default function StrukturOrganisasiPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('founders')
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-red-50/30 to-amber-50/30 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] text-white mb-4">
              <Layers className="w-4 h-4 mr-2" />
              Struktur Organisasi Lengkap
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Governance <span className="text-[#8B0000]">Structure</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-3xl mx-auto"
          >
            Struktur tata kelola KNMP sesuai AD/ART Super Final 2026. 
            Meliputi seluruh organ organisasi, komite strategis, dan 6 Kelompok Pihak Anggota.
          </motion.p>
        </motion.section>

        {/* Organizational Chart - Visual Hierarchy */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-red-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Peta Organisasi KNMP
              </CardTitle>
              <CardDescription className="text-red-100">
                Hierarki tata kelola berdasarkan AD/ART Pasal 21-50
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                {/* Level 1 - RAT */}
                <motion.div
                  variants={scaleIn}
                  className="w-full max-w-md"
                >
                  <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-xl p-4 text-white text-center shadow-lg shadow-red-900/30">
                    <Vote className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">RAT</h3>
                    <p className="text-xs text-red-100">Forum Tertinggi</p>
                  </div>
                </motion.div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-red-800 to-amber-500" />

                {/* Level 2 - Pengurus & Pengawas */}
                <div className="flex flex-wrap justify-center gap-4 w-full">
                  <motion.div variants={scaleIn} className="flex-1 min-w-[200px] max-w-[300px]">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-4 text-white text-center shadow-lg shadow-amber-500/30">
                      <Building2 className="w-6 h-6 mx-auto mb-2" />
                      <h3 className="font-bold">Pengurus</h3>
                      <p className="text-xs text-amber-100">Pelaksana</p>
                    </div>
                  </motion.div>
                  <motion.div variants={scaleIn} className="flex-1 min-w-[200px] max-w-[300px]">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-4 text-white text-center shadow-lg shadow-sky-500/30">
                      <Eye className="w-6 h-6 mx-auto mb-2" />
                      <h3 className="font-bold">Pengawas</h3>
                      <p className="text-xs text-sky-100">Pengawas</p>
                    </div>
                  </motion.div>
                </div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500 to-violet-500" />

                {/* Level 3 - Advisory Bodies */}
                <div className="flex flex-wrap justify-center gap-3 w-full">
                  {[
                    { name: 'Dewan Penasihat', icon: Award, color: 'from-violet-500 to-purple-600' },
                    { name: 'Dewan Etik', icon: Scale, color: 'from-orange-500 to-amber-600' },
                    { name: 'Ombudsman', icon: Shield, color: 'from-cyan-500 to-teal-600' },
                  ].map((body, i) => (
                    <motion.div key={i} variants={scaleIn} className="min-w-[150px]">
                      <div className={`bg-gradient-to-r ${body.color} rounded-lg p-3 text-white text-center shadow-lg`}>
                        <body.icon className="w-5 h-5 mx-auto mb-1" />
                        <h4 className="font-medium text-sm">{body.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-violet-500 to-pink-500" />

                {/* Level 4 - JSC */}
                <motion.div variants={scaleIn} className="w-full max-w-sm">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-4 text-white text-center shadow-lg shadow-pink-500/30">
                    <Network className="w-6 h-6 mx-auto mb-2" />
                    <h3 className="font-bold">Joint Strategic Committee (JSC)</h3>
                    <p className="text-xs text-pink-100">KNMP × JE-P3</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Founder & Key Leadership */}
        <SectionWrapper
          title="Founder & Key Leadership"
          subtitle="Pemimpin visioner di balik ekosistem JE-P3 × KNMP"
          icon={Crown}
          color={COLORS.primary}
          isExpanded={expandedSection === 'founders'}
          onToggle={() => setExpandedSection(expandedSection === 'founders' ? null : 'founders')}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {FOUNDERS.map((founder, i) => (
              <motion.div
                key={founder.id}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.1 }}
              >
                <Card className={cn(
                  'h-full border-2 transition-all duration-300 hover:shadow-xl',
                  founder.status === 'active' ? founder.color.border : 'border-dashed border-gray-300',
                  founder.status === 'vacant' && 'bg-gray-50/50'
                )}>
                  <CardContent className="p-6">
                    {/* Avatar */}
                    <div className="relative mb-4">
                      <div className={cn(
                        'w-20 h-20 mx-auto rounded-full flex items-center justify-center',
                        founder.status === 'active' 
                          ? founder.color.bg
                          : 'bg-gray-200 border-2 border-dashed border-gray-300'
                      )}>
                        {founder.status === 'active' ? (
                          <span className="text-2xl font-bold text-white">
                            {founder.name.charAt(0)}
                          </span>
                        ) : (
                          <UserCircle className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      {founder.status === 'active' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={cn(
                            'absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center',
                            founder.color.bg
                          )}
                        >
                          <founder.icon className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="text-center">
                      {founder.status === 'active' ? (
                        <>
                          <h3 className="font-bold text-foreground">{founder.name}</h3>
                          <p className={cn('text-sm font-medium', founder.color.text)}>
                            {founder.position}
                          </p>
                          <p className="text-xs text-muted-foreground">{founder.role}</p>
                          {founder.since && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Sejak {founder.since}
                            </Badge>
                          )}
                        </>
                      ) : (
                        <>
                          <h3 className="font-medium text-muted-foreground">{founder.position}</h3>
                          <p className="text-xs text-muted-foreground">{founder.role}</p>
                          <Badge variant="outline" className="mt-2 text-xs border-dashed">
                            <UserCircle className="w-3 h-3 mr-1" />
                            Kosong
                          </Badge>
                        </>
                      )}

                      {founder.certifications && founder.certifications.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mt-3">
                          {founder.certifications.map((cert, j) => (
                            <Badge key={j} className="text-[10px] bg-gray-100 text-gray-600">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Detailed Structure Sections */}
        {Object.entries(ORG_STRUCTURE).map(([key, section]) => (
          <SectionWrapper
            key={key}
            title={section.fullName}
            subtitle={section.description}
            icon={section.icon}
            color={section.color}
            isExpanded={expandedSection === key}
            onToggle={() => setExpandedSection(expandedSection === key ? null : key)}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Positions */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Jabatan ({section.positions.length})
                </h4>
                <div className="space-y-2">
                  {section.positions.map((pos, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border transition-all',
                        pos.status === 'active' 
                          ? `${section.color.border} bg-white shadow-sm`
                          : 'border-dashed border-gray-200 bg-gray-50/50'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                        pos.status === 'active'
                          ? section.color.bg + ' text-white'
                          : 'bg-gray-200 text-gray-400'
                      )}>
                        {pos.status === 'active' && pos.name ? pos.name.charAt(0) : <UserCircle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          'font-medium',
                          pos.status === 'vacant' ? 'text-muted-foreground' : 'text-foreground'
                        )}>
                          {pos.name || 'Kosong'}
                        </p>
                        <p className="text-xs text-muted-foreground">{pos.position}</p>
                      </div>
                      {pos.isFounder && (
                        <Badge className={cn(section.color.bg, 'text-white text-xs')}>
                          <Crown className="w-3 h-3 mr-1" />
                          Founder
                        </Badge>
                      )}
                      {pos.status === 'vacant' && (
                        <Badge variant="outline" className="text-xs border-dashed">
                          Tersedia
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                {'authority' in section && (
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                      <Gavel className="w-4 h-4" />
                      Wewenang
                    </h4>
                    <ul className="space-y-2">
                      {section.authority.map((auth, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-red-700">{i + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{auth}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {'term' in section && (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Masa Jabatan:</span> {section.term}
                    </p>
                  </div>
                )}

                {'note' in section && (
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-foreground">
                      <Zap className="w-4 h-4 inline mr-2" />
                      {section.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SectionWrapper>
        ))}

        {/* 6 KPA Section */}
        <SectionWrapper
          title="6 Kelompok Pihak Anggota (KPA)"
          subtitle="Pengelompokan anggota berdasarkan peran ekonomi sesuai Permenkop 8/2021"
          icon={Users}
          color={COLORS.primary}
          isExpanded={expandedSection === 'kpa'}
          onToggle={() => setExpandedSection(expandedSection === 'kpa' ? null : 'kpa')}
        >
          {/* Voting Power Bar */}
          <div className="mb-8">
            <h4 className="font-semibold text-foreground mb-4">Distribusi Proporsi Suara dalam RAT</h4>
            <div className="h-12 rounded-xl overflow-hidden flex shadow-lg">
              {KPA_MEMBERS.map((kpa, i) => (
                <motion.div
                  key={kpa.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${kpa.proportion}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={cn('h-full flex items-center justify-center text-white font-medium text-sm')}
                  style={{ backgroundColor: kpa.color.main }}
                >
                  {kpa.proportion}%
                </motion.div>
              ))}
            </div>
          </div>

          {/* KPA Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KPA_MEMBERS.map((kpa, i) => (
              <motion.div
                key={kpa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={cn('h-full border-2 hover:shadow-xl transition-all', kpa.color.border)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{kpa.icon}</div>
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: kpa.color.main }}
                      >
                        {kpa.proportion}% Suara
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{kpa.name}</CardTitle>
                    <CardDescription>{kpa.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Contoh Anggota:</p>
                      <div className="flex flex-wrap gap-2">
                        {kpa.examples.map((ex, j) => (
                          <Badge key={j} variant="outline" className="text-xs">
                            {ex}
                          </Badge>
                        ))}
                      </div>
                      {kpa.note && (
                        <p className="text-xs text-amber-600 mt-2 italic">
                          ⚠️ {kpa.note}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </main>
  )
}

// Reusable Section Wrapper Component
function SectionWrapper({
  title,
  subtitle,
  icon: Icon,
  color,
  children,
  isExpanded,
  onToggle,
}: {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: typeof COLORS.primary
  children: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-8"
    >
      <Card className="bg-white/80 backdrop-blur-sm border overflow-hidden">
        {/* Header */}
        <button
          onClick={onToggle}
          className={cn(
            'w-full p-4 flex items-center justify-between text-white transition-all',
            color.bg
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h2 className="font-bold text-lg">{title}</h2>
              <p className="text-sm text-white/80">{subtitle}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {/* Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <CardContent className="p-6">
            {children}
          </CardContent>
        </motion.div>
      </Card>
    </motion.section>
  )
}
