'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Building2,
  Users,
  MapPin,
  CheckCircle2,
  Database,
  Home,
  Heart,
  GraduationCap,
  Leaf,
  Globe,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { VILLAGE_INTEGRATION } from '@/data/mocks'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function IntegrasiDesaPage() {
  const integrations = VILLAGE_INTEGRATION

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <OverviewSection />
        <IntegrationTiers data={integrations} />
        <BenefitsSection />
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
        <Badge className="bg-green-100 text-green-700 border-green-200 mb-4">
          <Globe className="w-4 h-4 mr-2" />
          45+ Komponen Terintegrasi
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Integrasi <span className="text-[#8B0000]">Infrastruktur Desa</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        KNMP mengintegrasikan seluruh infrastruktur ekonomi desa yang sudah ada tanpa menggantikan peran mereka.
      </motion.p>
    </motion.section>
  )
}

// =====================
// Overview Section
// =====================
function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { value: '83.763', label: 'Desa Target', icon: MapPin },
    { value: '45+', label: 'Komponen', icon: Database },
    { value: '5', label: 'Tier Integrasi', icon: Building2 },
    { value: '100%', label: 'Tanpa Overwrite', icon: CheckCircle2 },
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
          <Card key={i} className="bg-white border border-green-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
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
// Integration Tiers Section
// =====================
function IntegrationTiers({ data }: { data: typeof VILLAGE_INTEGRATION }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const categoryColors: Record<string, string> = {
    LKD: '#22c55e',
    BADAN: '#3b82f6',
    KADER: '#f59e0b',
    PROGRAM: '#8b5cf6',
    SYSTEM: '#06b6d4',
    INFRASTRUCTURE: '#ec4899',
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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Tier <span className="text-[#8B0000]">Integrasi</span>
        </h2>
        <p className="text-muted-foreground">
          Tingkatan integrasi dari dasar hingga sistem digital pemerintah
        </p>
      </motion.div>

      <div className="space-y-6">
        {data.map((tier, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="bg-white border border-green-100 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#8B0000] text-white rounded-xl flex items-center justify-center font-bold text-lg">
                    {tier.tier}
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{tier.name}</CardTitle>
                    <CardDescription>
                      {tier.components.length} komponen
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tier.components.map((comp, j) => (
                    <div
                      key={j}
                      className="p-3 bg-red-50 rounded-lg border border-red-100 hover:border-[#8B0000]/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{ borderColor: categoryColors[comp.category], color: categoryColors[comp.category] }}
                        >
                          {comp.abbreviation}
                        </Badge>
                        {comp.digitalStatus === 'DIGITAL' && (
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">{comp.name}</p>
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
// Benefits Section
// =====================
function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const benefits = [
    {
      icon: Database,
      title: 'Tidak Overwrite',
      description: 'KNMP tidak menggantikan infrastruktur yang sudah ada, hanya mengintegrasikan.',
    },
    {
      icon: Users,
      title: 'Penguatan Kapasitas',
      description: 'Training dan pendampingan untuk semua komponen yang terintegrasi.',
    },
    {
      icon: Globe,
      title: 'Konektivitas Global',
      description: 'Setiap desa terhubung dengan pasar nasional dan internasional.',
    },
    {
      icon: Leaf,
      title: 'Keberlanjutan',
      description: 'Sistem yang berkelanjutan dan mandiri secara ekonomi.',
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
          Manfaat <span className="text-[#8B0000]">Integrasi</span>
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-4"
      >
        {benefits.map((b, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="h-full bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-lg transition-all">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-green-100">
                  <b.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.description}</p>
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
      <Card className="bg-gradient-to-br from-green-100 to-white border border-green-200 max-w-2xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Integrasikan Desa Anda
          </h3>
          <p className="text-muted-foreground mb-6">
            Hubungi tim kami untuk memulai proses integrasi desa
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
              Hubungi Tim Integrasi
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Download Panduan
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
