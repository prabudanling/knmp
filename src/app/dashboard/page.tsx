'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  User,
  Wallet,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Truck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Star,
  Bell,
  Settings,
  Award,
  Target,
  BookOpen,
  CreditCard,
  BarChart3,
  PieChart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { MEMBER_DASHBOARD } from '@/data/mocks'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function DashboardPage() {
  const dashboard = MEMBER_DASHBOARD

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <WelcomeSection data={dashboard} />

        {/* Quick Stats Grid */}
        <StatsGrid data={dashboard} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MembershipCard data={dashboard} />
            <TransactionSummary data={dashboard} />
            <LogisticsCommission data={dashboard} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SHUEstimate data={dashboard} />
            <TrainingProgress data={dashboard} />
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity data={dashboard} />
      </div>
    </main>
  )
}

// =====================
// Welcome Section
// =====================
function WelcomeSection({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-8"
    >
      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {data.greeting}
          </h1>
          <p className="text-muted-foreground">
            Selamat datang di dashboard anggota KNMP
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="border-red-100">
            <Bell className="w-5 h-5 text-[#8B0000]" />
          </Button>
          <Button variant="outline" size="icon" className="border-red-100">
            <Settings className="w-5 h-5 text-[#8B0000]" />
          </Button>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-red-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center text-white font-bold">
              {data.member.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-foreground">{data.member.name}</p>
              <p className="text-xs text-muted-foreground">Tier {data.member.tier}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

// =====================
// Stats Grid
// =====================
function StatsGrid({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      title: 'Total Transaksi',
      value: data.transactionSummary.totalTransactions,
      suffix: '',
      icon: ShoppingBag,
      color: '#8B0000',
      growth: data.transactionSummary.growth,
    },
    {
      title: 'Volume Transaksi',
      value: `Rp ${(data.transactionSummary.totalVolume / 1000000).toFixed(0)} Juta`,
      suffix: '',
      icon: Wallet,
      color: '#D4AF37',
    },
    {
      title: 'Komisi Logistik',
      value: `Rp ${(data.logisticsCommission.totalCommission / 1000000).toFixed(1)} Juta`,
      suffix: '',
      icon: Truck,
      color: '#22c55e',
    },
    {
      title: 'Estimasi SHU',
      value: `Rp ${(data.shuEstimate.total / 1000000).toFixed(1)} Juta`,
      suffix: '',
      icon: TrendingUp,
      color: '#8b5cf6',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div key={i} variants={fadeInUp}>
          <Card className="bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                {stat.growth && (
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.growth}%
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.section>
  )
}

// =====================
// Membership Card
// =====================
function MembershipCard({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-gradient-to-br from-[#8B0000] to-[#DC143C] text-white border-0 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Kartu Keanggotaan</CardTitle>
              <CardDescription className="text-white/70">
                Koperasi Nusantara Merah Putih
              </CardDescription>
            </div>
            <Badge className="bg-white/20 text-white border-0 text-lg px-4 py-1">
              Tier {data.membershipStatus.tier}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-white/60">Nama Anggota</p>
              <p className="font-semibold">{data.member.name}</p>
            </div>
            <div>
              <p className="text-xs text-white/60">Tanggal Bergabung</p>
              <p className="font-semibold">{data.membershipStatus.joinDate}</p>
            </div>
            <div>
              <p className="text-xs text-white/60">Status</p>
              <Badge className="bg-green-500 text-white border-0">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Aktif
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-white/60">Simpanan Pokok</p>
                <p className="font-semibold">Rp {data.membershipStatus.simpananPokok.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Simpanan Wajib</p>
                <p className="font-semibold">Rp {data.membershipStatus.simpananWajib.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Simpanan Sukarela</p>
                <p className="font-semibold">Rp {data.membershipStatus.simpananSukarela.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// Transaction Summary
// =====================
function TransactionSummary({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-white border border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-[#8B0000]" />
            Ringkasan Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Bulan Ini</p>
              <p className="text-2xl font-bold text-[#8B0000]">
                Rp {(data.transactionSummary.thisMonth / 1000000).toFixed(1)} Juta
              </p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{data.transactionSummary.growth}%</span>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Volume</p>
              <p className="text-2xl font-bold text-amber-700">
                Rp {(data.transactionSummary.totalVolume / 1000000).toFixed(0)} Juta
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {data.transactionSummary.totalTransactions} transaksi
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// Logistics Commission
// =====================
function LogisticsCommission({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-white border border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Truck className="w-5 h-5 text-[#8B0000]" />
            Komisi Logistik
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground">Total Komisi</p>
              <p className="text-2xl font-bold text-green-700">
                Rp {data.logisticsCommission.totalCommission.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Paket</p>
              <p className="text-2xl font-bold text-foreground">
                {data.logisticsCommission.totalPackages.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Bulan Ini</span>
            <span className="font-semibold text-[#8B0000]">
              Rp {data.logisticsCommission.thisMonth.toLocaleString('id-ID')}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// SHU Estimate
// =====================
function SHUEstimate({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-gradient-to-br from-amber-50 to-white border border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <PieChart className="w-5 h-5 text-amber-600" />
            Estimasi SHU
          </CardTitle>
          <CardDescription>Proyeksi akhir tahun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-[#8B0000]">
              Rp {(data.shuEstimate.total / 1000000).toFixed(1)} Juta
            </p>
            <p className="text-sm text-muted-foreground mt-1">Estimasi SHU 2026</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jasa Usaha</span>
              <span className="font-medium text-foreground">
                Rp {data.shuEstimate.jasaUsaha.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jasa Modal</span>
              <span className="font-medium text-foreground">
                Rp {data.shuEstimate.jasaModal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
            Lihat Detail SHU
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// Training Progress
// =====================
function TrainingProgress({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const progress = (data.trainingProgress.completed / data.trainingProgress.total) * 100

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-white border border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <GraduationCap className="w-5 h-5 text-[#8B0000]" />
            Progress Pelatihan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {data.trainingProgress.completed}/{data.trainingProgress.total} modul
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Sedang Dipelajari</p>
            <p className="font-medium text-foreground text-sm">
              {data.trainingProgress.currentCourse}
            </p>
          </div>

          <Button variant="outline" className="w-full border-red-100 text-[#8B0000] hover:bg-red-50">
            Lanjutkan Pelatihan
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// Quick Actions
// =====================
function QuickActions() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const actions = [
    { title: 'Upload Produk', icon: ShoppingBag, href: '/marketplace/upload', color: '#22c55e' },
    { title: 'Lihat Komisi', icon: Wallet, href: '/dashboard/komisi', color: '#D4AF37' },
    { title: 'Pelatihan', icon: GraduationCap, href: '/academy', color: '#3b82f6' },
    { title: 'SHU Saya', icon: TrendingUp, href: '/shu', color: '#8b5cf6' },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-white border border-red-100">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-auto py-4 flex-col gap-2 border-red-100 hover:border-[#8B0000]/30"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <span className="text-xs text-foreground">{action.title}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  )
}

// =====================
// Recent Activity
// =====================
function RecentActivity({ data }: { data: typeof MEMBER_DASHBOARD }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'TRANSACTION': return ShoppingBag
      case 'COMMISSION': return Wallet
      case 'TRAINING': return GraduationCap
      case 'SHU': return TrendingUp
      default: return Clock
    }
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mt-8"
    >
      <Card className="bg-white border border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock className="w-5 h-5 text-[#8B0000]" />
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-red-50/50 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-red-100">
                    <Icon className="w-5 h-5 text-[#8B0000]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {activity.amount && (
                    <div className="text-right">
                      <p className="font-semibold text-[#8B0000]">
                        +Rp {activity.amount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
