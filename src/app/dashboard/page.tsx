'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  User,
  Wallet,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  Truck,
  Clock,
  CheckCircle2,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

// Demo data langsung di halaman
const DEMO_DATA = {
  member: {
    name: 'Ahmad Suryanto',
    tier: 'T3',
    kpa: 'Petani/Produsen',
    village: 'Desa Sukamaju',
    province: 'Jawa Barat',
  },
  greeting: 'Selamat Datang di Dashboard',
  membershipStatus: {
    tier: 'T3',
    joinDate: '15 Maret 2026',
    simpananPokok: 100000,
    simpananWajib: 500000,
    simpananSukarela: 2500000,
  },
  transactionSummary: {
    totalTransactions: 156,
    totalVolume: 45800000,
    thisMonth: 12500000,
    growth: 23.5,
  },
  logisticsCommission: {
    totalPackages: 1250,
    totalCommission: 3750000,
    thisMonth: 850000,
  },
  shuEstimate: {
    jasaUsaha: 1250000,
    jasaModal: 350000,
    total: 1600000,
  },
  trainingProgress: {
    completed: 3,
    total: 8,
    currentCourse: 'Digital Marketing untuk Petani',
  },
  recentActivity: [
    { id: '1', type: 'TRANSACTION', title: 'Penjualan Kopi Arabica', description: '50kg @ Rp 85.000', amount: 4250000, time: '2 jam lalu' },
    { id: '2', type: 'COMMISSION', title: 'Komisi Logistik Bulan Ini', description: '125 paket terkirim', amount: 375000, time: '1 hari lalu' },
    { id: '3', type: 'TRAINING', title: 'Sertifikat Selesai', description: 'Modul Dasar Marketplace', time: '2 hari lalu' },
  ],
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-[#8B0000] hover:bg-red-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </motion.div>

        {/* Welcome Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {DEMO_DATA.greeting}
              </h1>
              <p className="text-gray-600">
                Dashboard Anggota Koperasi Nusantara Merah Putih
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="border-red-100">
                <Bell className="w-5 h-5 text-[#8B0000]" />
              </Button>
              <Button variant="outline" size="icon" className="border-red-100">
                <Settings className="w-5 h-5 text-[#8B0000]" />
              </Button>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-red-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center text-white font-bold">
                  {DEMO_DATA.member.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{DEMO_DATA.member.name}</p>
                  <p className="text-xs text-gray-500">Tier {DEMO_DATA.member.tier}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatsCard
            title="Total Transaksi"
            value={DEMO_DATA.transactionSummary.totalTransactions.toString()}
            icon={ShoppingBag}
            color="#8B0000"
            growth={DEMO_DATA.transactionSummary.growth}
          />
          <StatsCard
            title="Volume Transaksi"
            value={`Rp ${(DEMO_DATA.transactionSummary.totalVolume / 1000000).toFixed(0)} Jt`}
            icon={Wallet}
            color="#D4AF37"
          />
          <StatsCard
            title="Komisi Logistik"
            value={`Rp ${(DEMO_DATA.logisticsCommission.totalCommission / 1000000).toFixed(1)} Jt`}
            icon={Truck}
            color="#22c55e"
          />
          <StatsCard
            title="Estimasi SHU"
            value={`Rp ${(DEMO_DATA.shuEstimate.total / 1000000).toFixed(1)} Jt`}
            icon={TrendingUp}
            color="#8b5cf6"
          />
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Membership Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
                      Tier {DEMO_DATA.membershipStatus.tier}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-white/60">Nama Anggota</p>
                      <p className="font-semibold">{DEMO_DATA.member.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Tanggal Bergabung</p>
                      <p className="font-semibold">{DEMO_DATA.membershipStatus.joinDate}</p>
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
                        <p className="font-semibold">Rp {DEMO_DATA.membershipStatus.simpananPokok.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Simpanan Wajib</p>
                        <p className="font-semibold">Rp {DEMO_DATA.membershipStatus.simpananWajib.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Simpanan Sukarela</p>
                        <p className="font-semibold">Rp {DEMO_DATA.membershipStatus.simpananSukarela.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Transaction Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white border border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <BarChart3 className="w-5 h-5 text-[#8B0000]" />
                    Ringkasan Transaksi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Bulan Ini</p>
                      <p className="text-2xl font-bold text-[#8B0000]">
                        Rp {(DEMO_DATA.transactionSummary.thisMonth / 1000000).toFixed(1)} Juta
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+{DEMO_DATA.transactionSummary.growth}%</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Total Volume</p>
                      <p className="text-2xl font-bold text-amber-700">
                        Rp {(DEMO_DATA.transactionSummary.totalVolume / 1000000).toFixed(0)} Juta
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {DEMO_DATA.transactionSummary.totalTransactions} transaksi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Logistics Commission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white border border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Truck className="w-5 h-5 text-[#8B0000]" />
                    Komisi Logistik
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-500">Total Komisi</p>
                      <p className="text-2xl font-bold text-green-700">
                        Rp {DEMO_DATA.logisticsCommission.totalCommission.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Paket</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {DEMO_DATA.logisticsCommission.totalPackages.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* SHU Estimate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <PieChart className="w-5 h-5 text-amber-600" />
                    Estimasi SHU
                  </CardTitle>
                  <CardDescription>Proyeksi akhir tahun</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-[#8B0000]">
                      Rp {(DEMO_DATA.shuEstimate.total / 1000000).toFixed(1)} Juta
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Estimasi SHU 2026</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Jasa Usaha</span>
                      <span className="font-medium text-gray-900">
                        Rp {DEMO_DATA.shuEstimate.jasaUsaha.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Jasa Modal</span>
                      <span className="font-medium text-gray-900">
                        Rp {DEMO_DATA.shuEstimate.jasaModal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <Link href="/shu">
                    <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
                      Lihat Detail SHU
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Training Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white border border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <GraduationCap className="w-5 h-5 text-[#8B0000]" />
                    Progress Pelatihan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-900">
                        {DEMO_DATA.trainingProgress.completed}/{DEMO_DATA.trainingProgress.total} modul
                      </span>
                    </div>
                    <Progress value={(DEMO_DATA.trainingProgress.completed / DEMO_DATA.trainingProgress.total) * 100} className="h-3" />
                  </div>

                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Sedang Dipelajari</p>
                    <p className="font-medium text-gray-900 text-sm">
                      {DEMO_DATA.trainingProgress.currentCourse}
                    </p>
                  </div>

                  <Link href="/academy">
                    <Button variant="outline" className="w-full border-red-100 text-[#8B0000] hover:bg-red-50">
                      Lanjutkan Pelatihan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white border border-red-100">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <QuickActionButton title="Upload Produk" icon={ShoppingBag} href="/marketplace" color="#22c55e" />
                  <QuickActionButton title="Lihat Komisi" icon={Wallet} href="/dashboard" color="#D4AF37" />
                  <QuickActionButton title="Pelatihan" icon={GraduationCap} href="/academy" color="#3b82f6" />
                  <QuickActionButton title="SHU Saya" icon={TrendingUp} href="/shu" color="#8b5cf6" />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-white border border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Clock className="w-5 h-5 text-[#8B0000]" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DEMO_DATA.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-red-50/50 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-red-100">
                      {activity.type === 'TRANSACTION' && <ShoppingBag className="w-5 h-5 text-[#8B0000]" />}
                      {activity.type === 'COMMISSION' && <Wallet className="w-5 h-5 text-[#8B0000]" />}
                      {activity.type === 'TRAINING' && <GraduationCap className="w-5 h-5 text-[#8B0000]" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <div className="text-right">
                        <p className="font-semibold text-[#8B0000]">
                          +Rp {activity.amount.toLocaleString('id-ID')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </main>
  )
}

// Stats Card Component
function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  growth 
}: { 
  title: string
  value: string
  icon: React.ElementType
  color: string
  growth?: number
}) {
  return (
    <Card className="bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          {growth && (
            <Badge className="bg-green-100 text-green-700 border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              {growth}%
            </Badge>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </CardContent>
    </Card>
  )
}

// Quick Action Button Component
function QuickActionButton({ 
  title, 
  icon: Icon, 
  href, 
  color 
}: { 
  title: string
  icon: React.ElementType
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        className="w-full h-auto py-4 flex-col gap-2 border-red-100 hover:border-[#8B0000]/30"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-xs text-gray-700">{title}</span>
      </Button>
    </Link>
  )
}
