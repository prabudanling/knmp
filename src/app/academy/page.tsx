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
  Search,
  Filter,
  CheckCircle2,
  Download,
  Video,
  FileText,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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

export default function AcademyPage() {
  const courses = COURSES

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <StatsSection />
        <CoursesSection courses={courses} />
        <FeaturesSection />
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
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
          <GraduationCap className="w-4 h-4 mr-2" />
          JE-P3 Academy
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Academy <span className="text-[#8B0000]">Pelatihan</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Tingkatkan kapasitas Anda dengan pelatihan digital berkualitas. Gratis untuk anggota KNMP.
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
    { value: '100%', label: 'Gratis Anggota', icon: Award },
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
                <Badge className="absolute top-3 right-3" style={{ className: levelColors[course.level] }}>
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
// Features Section
// =====================
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const features = [
    {
      icon: Video,
      title: 'Video HD',
      description: 'Materi video berkualitas tinggi dengan subtitle Indonesia.',
    },
    {
      icon: FileText,
      title: 'Materi PDF',
      description: 'Unduh materi pelatihan dalam format PDF.',
    },
    {
      icon: Award,
      title: 'Sertifikat',
      description: 'Dapatkan sertifikat setelah menyelesaikan pelatihan.',
    },
    {
      icon: CheckCircle2,
      title: 'Quiz & Ujian',
      description: 'Uji pemahaman dengan quiz interaktif.',
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
          Fitur <span className="text-[#8B0000]">Academy</span>
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {features.map((f, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="h-full bg-white border border-blue-100 text-center">
              <CardContent className="p-5">
                <div className="w-14 h-14 mx-auto mb-3 bg-blue-50 rounded-xl flex items-center justify-center">
                  <f.icon className="w-7 h-7 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
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
            Daftar sebagai anggota KNMP dan akses semua pelatihan gratis
          </p>
          <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
            Daftar Gratis
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  )
}
