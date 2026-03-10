'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  Clock,
  Star,
  Users,
  Award,
  Play,
  ChevronRight,
  CheckCircle2,
  Video,
  FileText,
  ArrowRight,
  Globe,
  Target,
  Briefcase,
  TrendingUp,
  CertificateIcon,
  Building,
  Laptop,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { COURSES } from '@/data/mocks'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// 3-Level Academy System based on JE-P3 documents
const ACADEMY_LEVELS = [
  {
    level: 1,
    title: 'Tingkat 1: Literasi Digital',
    subtitle: 'Digital Literacy',
    description: 'Pintu masuk untuk 50 juta warga Indonesia. Gratis untuk semua anggota JE-P3.',
    target: '50 Juta Warga (2027)',
    duration: '20 jam',
    price: 'GRATIS',
    priceNote: 'Untuk semua anggota',
    color: '#22c55e',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: Laptop,
    features: [
      'Dasar-dasar literasi digital',
      'Penggunaan smartphone produktif',
      'Keamanan digital & privasi data',
      'Pengenalan marketplace digital',
      'Komunikasi online efektif',
    ],
    certification: 'JE-P3 Digital Citizen Certificate',
    courses: 12,
  },
  {
    level: 2,
    title: 'Tingkat 2: Keterampilan Bisnis',
    subtitle: 'Business Skills',
    description: 'Pelatihan kewirausahaan untuk 5 jita entrepreneur Indonesia.',
    target: '5 Juta Entrepreneur',
    duration: '80 jam',
    price: 'Rp 2-5 Juta',
    priceNote: 'Subsidi untuk anggota KNMP',
    color: '#3b82f6',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Briefcase,
    features: [
      'Manajemen usaha kecil & menengah',
      'Digital marketing & social media',
      'Keuangan & pembukuan sederhana',
      'Supply chain & logistik dasar',
      'Customer relationship management',
    ],
    certification: 'JE-P3 Certified Entrepreneur',
    courses: 24,
    popular: true,
  },
  {
    level: 3,
    title: 'Tingkat 3: Penguasaan Ekspor',
    subtitle: 'Export Mastery',
    description: 'Program profesional untuk 500 ribu calon eksportir Indonesia.',
    target: '500 Ribu Trader',
    duration: '120 jam',
    price: 'Rp 5-10 Juta',
    priceNote: 'Garansi penempatan kerja',
    color: '#8B0000',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: Globe,
    features: [
      'Regulasi ekspor-impor Indonesia',
      'Incoterms & kontrak internasional',
      'Pasar global: 195 negara target',
      'Sertifikasi produk ekspor',
      'Pembayaran internasional & forex',
    ],
    certification: 'JE-P3 Certified Export Professional',
    courses: 36,
    employmentGuarantee: true,
  },
]

// Specialized Training Tracks
const TRAINING_TRACKS = [
  {
    title: 'Agen Logistik',
    description: 'Pelatihan khusus untuk agen J&T, JNE, SiCepat, dll',
    duration: '8 jam',
    modules: ['SOP ekspedisi', 'Customer handling', 'Dashboard operasional'],
    icon: '🚚',
  },
  {
    title: 'Smart Farming',
    description: 'Teknologi pertanian digital untuk petani modern',
    duration: '16 jam',
    modules: ['IoT sensors', 'Weather monitoring', 'Market access'],
    icon: '🌾',
  },
  {
    title: 'Marketplace Seller',
    description: 'Strategi jualan online di marketplace KNMP & partner',
    duration: '12 jam',
    modules: ['Product listing', 'SEO marketplace', 'Customer service'],
    icon: '🛒',
  },
  {
    title: 'Fintech Basic',
    description: 'Penggunaan JP3 Pay & layanan keuangan digital',
    duration: '6 jam',
    modules: ['E-wallet', 'Microloans', 'Keuangan pribadi'],
    icon: '💳',
  },
]

export default function AcademyPage() {
  const courses = COURSES

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <StatsSection />
        <AcademyLevelsSection />
        <TrainingTracksSection />
        <CoursesSection courses={courses} />
        <PartnersSection />
        <CTASection />
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
        <Badge className="bg-[#8B0000] text-white mb-4">
          <GraduationCap className="w-4 h-4 mr-2" />
          JE-P3 Academy
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Academy <span className="text-[#8B0000]">JE-P3</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Platform pelatihan digital untuk 50 juta warga Indonesia. Dari literasi dasar hingga ekspor global.
        Kolaborasi dengan Harvard, Stanford, IPB, UGM, & Mondragon University.
      </motion.p>
    </motion.section>
  )
}

// =====================
// Stats Section
// =====================
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { value: '50+', label: 'Modul Pelatihan', icon: BookOpen },
    { value: '125.000+', label: 'Peserta Terdaftar', icon: Users },
    { value: '4.8', label: 'Rating Rata-rata', icon: Star },
    { value: '100%', label: 'Gratis Tier 1', icon: Award },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white border border-blue-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
            <CardContent className="p-5 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#8B0000]" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Academy Levels Section
// =====================
function AcademyLevelsSection() {
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
      <motion.div variants={fadeInUp} className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          3 Tingkat <span className="text-[#8B0000]">Pelatihan</span>
        </h2>
        <p className="text-muted-foreground">
          Jalur pembelajaran terstruktur sesuai AD/ART Pasal 7 ayat 5 tentang Pendidikan, Pelatihan, dan Informasi
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-6"
      >
        {ACADEMY_LEVELS.map((level) => (
          <motion.div key={level.level} variants={fadeInUp}>
            <Card
              className={cn(
                'h-full relative overflow-hidden transition-all hover:shadow-xl',
                level.popular ? 'ring-2 ring-[#8B0000] ring-offset-2' : '',
                level.borderColor
              )}
            >
              {level.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-[#8B0000] text-white rounded-none rounded-bl-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Populer
                  </Badge>
                </div>
              )}

              <CardHeader className={cn('pb-2', level.bgColor)}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${level.color}20` }}
                  >
                    <level.icon className="w-7 h-7" style={{ color: level.color }} />
                  </div>
                  <div>
                    <CardDescription className="text-xs">{level.subtitle}</CardDescription>
                    <CardTitle className="text-lg">{level.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {level.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="text-sm font-medium">{level.target}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <Clock className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">Durasi</p>
                    <p className="text-sm font-medium">{level.duration}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold" style={{ color: level.color }}>
                    {level.price}
                  </p>
                  <p className="text-xs text-muted-foreground">{level.priceNote}</p>
                </div>

                <ul className="space-y-2 mb-4">
                  {level.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center gap-2">
                    <CertificateIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm font-medium">{level.certification}</span>
                  </div>
                </div>

                {level.employmentGuarantee && (
                  <div className="p-3 bg-green-50 rounded-lg mb-4 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">Garansi Penempatan Kerja</span>
                    </div>
                  </div>
                )}

                <Button
                  className={cn(
                    'w-full',
                    level.popular ? 'bg-[#8B0000] hover:bg-[#6B0000] text-white' : ''
                  )}
                  variant={level.popular ? 'default' : 'outline'}
                >
                  Mulai Belajar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Training Tracks Section
// =====================
function TrainingTracksSection() {
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
      <motion.div variants={fadeInUp} className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Pelatihan <span className="text-[#8B0000]">Spesialisasi</span>
        </h2>
        <p className="text-muted-foreground">
          Modul pelatihan khusus untuk unit usaha KNMP
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {TRAINING_TRACKS.map((track, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="h-full bg-white border border-blue-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="text-4xl mb-3">{track.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{track.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{track.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{track.duration}</span>
                </div>
                <div className="space-y-1">
                  {track.modules.map((module, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-muted-foreground">{module}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Courses Section
// =====================
function CoursesSection({ courses }: { courses: typeof COURSES }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [activeCategory, setActiveCategory] = useState('Semua')

  const categories = ['Semua', 'Digital', 'Bisnis', 'Keuangan', 'Logistik', 'Ekspor']

  const filteredCourses = activeCategory === 'Semua' 
    ? courses 
    : courses.filter(c => c.category === activeCategory)

  const levelColors: Record<string, string> = {
    BASIC: 'bg-green-100 text-green-700',
    INTERMEDIATE: 'bg-amber-100 text-amber-700',
    ADVANCED: 'bg-red-100 text-red-700',
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Daftar <span className="text-[#8B0000]">Pelatihan</span>
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                activeCategory === cat && 'bg-[#8B0000] hover:bg-[#6B0000] text-white'
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCourses.map((course) => (
          <motion.div key={course.id} variants={fadeInUp}>
            <Card className="h-full bg-white border border-blue-100 hover:border-[#8B0000]/30 hover:shadow-xl transition-all overflow-hidden group">
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-amber-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#8B0000]" />
                  </div>
                </div>
                <Badge className={cn('absolute top-3 right-3', levelColors[course.level])}>
                  {course.level}
                </Badge>
              </div>

              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} jam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules} modul</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({course.enrolled.toLocaleString('id-ID')})
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-[#8B0000]">
                    Lihat <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Partners Section
// =====================
function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const partners = [
    { name: 'Harvard', type: 'Kurikulum' },
    { name: 'Stanford', type: 'Research' },
    { name: 'IPB', type: 'Pertanian' },
    { name: 'UGM', type: 'Kewirausahaan' },
    { name: 'Mondragon Univ.', type: 'Koperasi' },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-12"
    >
      <Card className="bg-white border border-blue-100">
        <CardHeader>
          <CardTitle className="text-center">
            Kolaborator <span className="text-[#8B0000]">Akademik</span>
          </CardTitle>
          <CardDescription className="text-center">
            Kurikulum dan sertifikasi dikembangkan bersama universitas terkemuka
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-medium text-sm">{partner.name}</p>
                <p className="text-xs text-muted-foreground">{partner.type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// CTA Section
// =====================
function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="text-center"
    >
      <Card className="bg-gradient-to-br from-blue-100 to-white border border-blue-200 max-w-2xl mx-auto">
        <CardContent className="p-8">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-[#8B0000]" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Mulai Belajar Sekarang
          </h3>
          <p className="text-muted-foreground mb-6">
            Tingkat 1 (Literasi Digital) gratis untuk semua anggota JE-P3. 
            Daftar sekarang dan akses 50+ modul pelatihan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
              Daftar Gratis
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
              Lihat Kurikulum
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
