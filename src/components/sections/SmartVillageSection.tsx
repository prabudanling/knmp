'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Users,
  Package,
  TrendingUp,
  Truck,
  Wallet,
  MapPin,
  Globe,
  Database,
  Layers,
  ShieldCheck,
  Clock,
  Zap,
  Activity,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

// Stats - GREEN PPP as primary accent
const mainStats = [
  { title: 'Total Desa', value: 83763, icon: Building2, color: '#008F3D', trend: 12.5 },
  { title: 'Anggota Terdaftar', value: 5218231, icon: Users, color: '#00A847', trend: 23.8 },
  { title: 'Komponen Terintegrasi', value: 8500, icon: Layers, color: '#10B981', trend: 18.2 },
  { title: 'Nilai Produksi', value: 2500, suffix: 'M', icon: TrendingUp, color: '#22c55e', trend: 15.3 },
]

// Province data
const topProvinces = [
  { name: 'Jawa Timur', count: 8503 },
  { name: 'Jawa Tengah', count: 8559 },
  { name: 'Jawa Barat', count: 5941 },
  { name: 'Sumatera Utara', count: 6263 },
  { name: 'Sulawesi Selatan', count: 3033 },
]

// Commodities
const commodities = [
  { name: 'Kopi', value: 'Rp 850M', growth: 15, color: '#008F3D' },
  { name: 'Beras', value: 'Rp 620M', growth: 8, color: '#22c55e' },
  { name: 'Rempah', value: 'Rp 430M', growth: 22, color: '#10B981' },
  { name: 'Coklat', value: 'Rp 380M', growth: 18, color: '#00A847' },
]

// Village categories
const villageCategories = [
  { name: 'Terintegrasi Penuh', count: 12450, color: '#008F3D', icon: ShieldCheck },
  { name: 'Dalam Proses', count: 28500, color: '#3b82f6', icon: Clock },
  { name: 'Pilot Project', count: 5200, color: '#f59e0b', icon: Zap },
  { name: 'Target Q4', count: 37613, color: '#8b5cf6', icon: Building2 },
]

// Animated counter component (proper hook usage)
function StatCard({ title, value, suffix, icon: Icon, color, trend }: {
  title: string
  value: number
  suffix?: string
  icon: React.ElementType
  color: string
  trend: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const displayValue = value >= 1000000 ? Math.floor(value / 1000) : value

  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    const duration = 2000
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * displayValue))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, displayValue])

  return (
    <motion.div ref={ref} variants={fadeInUp}>
      <Card className="bg-white/10 border border-white/20 backdrop-blur-sm hover:border-white/40 transition-all">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20"
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-xs text-green-300">
              <TrendingUp className="w-3 h-3" />
              +{trend}%
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white tabular-nums">
              {count.toLocaleString()}
              {value >= 1000000 ? 'K' : ''}
            </span>
            {suffix && <span className="text-white/70">{suffix}</span>}
          </div>
          <p className="text-xs text-white/70 mt-1">{title}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SmartVillageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date().toLocaleTimeString('id-ID'))
    updateTime() // Set initial time on client
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-[#8B0000] via-[#9B0F0F] to-[#6B0000] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,143,61,0.4) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#008F3D]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00A847]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#008F3D]/30 text-white border-[#008F3D]/50 mb-4 px-4 py-1.5">
              <Activity className="w-4 h-4 mr-2" />
              Real-time Dashboard
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Smart Village <span className="text-[#00A847]">Dashboard</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-white/80 text-lg max-w-2xl mx-auto mb-4"
          >
            Pemantauan Real-time <span className="text-white font-semibold">83.763 Desa Indonesia</span>
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 text-sm text-white/60"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Live Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentTime || '--:--:--'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Blockchain Verified</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {mainStats.map((stat, i) => (
            <StatCard 
              key={i}
              title={stat.title}
              value={stat.value}
              suffix={stat.suffix}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Map Placeholder */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="h-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#00A847]" />
                      Distribusi Desa per Provinsi
                    </h3>
                    <p className="text-sm text-white/60">Pemetaan 83.763 desa</p>
                  </div>
                  <Badge className="bg-green-500/30 text-green-300 border-green-500/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1" />
                    Live
                  </Badge>
                </div>
                
                {/* Map visualization */}
                <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-24 h-24 text-white/20" />
                  </div>
                  {/* Dots representing provinces */}
                  {[
                    { x: 45, y: 75, size: 20, name: 'Jawa Barat' },
                    { x: 50, y: 78, size: 22, name: 'Jawa Tengah' },
                    { x: 58, y: 80, size: 21, name: 'Jawa Timur' },
                    { x: 35, y: 35, size: 16, name: 'Sumut' },
                    { x: 62, y: 70, size: 12, name: 'Sulsel' },
                  ].map((dot, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-[#00A847] animate-pulse"
                      style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>

                {/* Top provinces list */}
                <div className="space-y-2">
                  {topProvinces.map((province, i) => (
                    <div key={province.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm text-white/90">{province.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#00A847]">
                        {province.count.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commodities & Categories */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Commodities */}
            <Card className="bg-white/10 border border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-[#00A847]" />
                  Komoditas Unggulan
                </h3>
                <div className="space-y-3">
                  {commodities.map((commodity) => (
                    <div key={commodity.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: commodity.color }}
                        />
                        <span className="text-sm text-white/90">{commodity.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white">{commodity.value}</span>
                        <Badge className="bg-green-500/20 text-green-300 text-xs">+{commodity.growth}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Village Categories */}
            <Card className="bg-white/10 border border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-[#00A847]" />
                  Kategori Desa
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {villageCategories.map((cat) => (
                    <div key={cat.name} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <cat.icon className="w-4 h-4 text-white" style={{ color: cat.color }} />
                        <span className="text-xs text-white/60">{cat.name}</span>
                      </div>
                      <p className="text-lg font-bold text-white">{cat.count.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="bg-white/10 border border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">Progress Integrasi Desa</h3>
                  <p className="text-sm text-white/60">Menuju 83.763 desa terintegrasi</p>
                </div>
                <Badge className="bg-[#008F3D]/30 text-[#00A847]">
                  {((12450 + 28500 + 5200) / 83763 * 100).toFixed(1)}% Complete
                </Badge>
              </div>
              <Progress value={(12450 + 28500 + 5200) / 83763 * 100} className="h-3 bg-white/20" />
              <div className="flex justify-between text-xs text-white/50 mt-2">
                <span>46.150 desa terintegrasi</span>
                <span>Target: 83.763 desa</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/smart-village">
            <Button className="bg-[#008F3D] hover:bg-[#00A847] text-white font-semibold shadow-lg px-8 py-5">
              <Activity className="w-4 h-4 mr-2" />
              Buka Dashboard Lengkap
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
