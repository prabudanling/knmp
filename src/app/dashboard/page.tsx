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
  Shield,
  Database,
  Vote,
  Award,
  Building2,
  Globe,
  Leaf,
  Zap,
  CreditCard,
  Target,
  FileText,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Demo data anggota
const DEMO_MEMBER = {
  name: 'Ahmad Suryanto',
  tier: 'T3',
  kpa: 'KPA-1: Petani/Produsen',
  kpaShort: 'Petani/Produsen',
  village: 'Desa Sukamaju',
  district: 'Kecamatan Cianjur Selatan',
  province: 'Jawa Barat',
  joinDate: '15 Maret 2026',
  status: 'AKTIF',
  
  simpanan: {
    pokok: 100000,
    wajib: 500000,
    sukarela: 2500000,
    total: 3100000,
  },
  
  transaksi: {
    total: 156,
    volume: 45800000,
    bulanIni: 12500000,
    growth: 23.5,
  },
  
  logistik: {
    paket: 1250,
    komisi: 3750000,
    bulanIni: 850000,
  },
  
  shu: {
    jasaUsaha: 1250000,
    jasaModal: 350000,
    total: 1600000,
  },
  
  pelatihan: {
    selesai: 3,
    total: 8,
    modul: 'Digital Marketing untuk Petani',
  },
  
  aktivitas: [
    { id: '1', type: 'TRANSACTION', title: 'Penjualan Kopi Arabica', desc: '50kg @ Rp 85.000', amount: 4250000, time: '2 jam lalu' },
    { id: '2', type: 'COMMISSION', title: 'Komisi Logistik Bulan Ini', desc: '125 paket terkirim', amount: 375000, time: '1 hari lalu' },
    { id: '3', type: 'TRAINING', title: 'Sertifikat Selesai', desc: 'Modul Dasar Marketplace', time: '2 hari lalu' },
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Dashboard Anggota KNMP
              </h1>
              <p className="text-gray-600">
                Selamat datang di portal anggota Koperasi Nusantara Merah Putih
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
                  {DEMO_MEMBER.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{DEMO_MEMBER.name}</p>
                  <p className="text-xs text-gray-500">{DEMO_MEMBER.kpaShort}</p>
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
            value={DEMO_MEMBER.transaksi.total.toString()}
            icon={ShoppingBag}
            color="#8B0000"
            growth={DEMO_MEMBER.transaksi.growth}
          />
          <StatsCard
            title="Volume Transaksi"
            value={`Rp ${(DEMO_MEMBER.transaksi.volume / 1000000).toFixed(0)} Jt`}
            icon={Wallet}
            color="#D4AF37"
          />
          <StatsCard
            title="Komisi Logistik"
            value={`Rp ${(DEMO_MEMBER.logistik.komisi / 1000000).toFixed(1)} Jt`}
            icon={Truck}
            color="#22c55e"
          />
          <StatsCard
            title="Estimasi SHU"
            value={`Rp ${(DEMO_MEMBER.shu.total / 1000000).toFixed(1)} Jt`}
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
                <div className="absolute top-4 right-4 opacity-10">
                  <Building2 className="w-32 h-32" />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">Kartu Keanggotaan</CardTitle>
                      <CardDescription className="text-white/70">
                        Koperasi Nusantara Merah Putih
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-white/20 text-white border-0 text-lg px-4 py-1">
                        {DEMO_MEMBER.tier}
                      </Badge>
                      <Badge className="bg-green-500 text-white border-0">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {DEMO_MEMBER.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-white/60">Nama Anggota</p>
                      <p className="font-semibold">{DEMO_MEMBER.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">KPA</p>
                      <p className="font-semibold">{DEMO_MEMBER.kpaShort}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Bergabung</p>
                      <p className="font-semibold">{DEMO_MEMBER.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Desa</p>
                      <p className="font-semibold">{DEMO_MEMBER.village}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-white/60">Simpanan Pokok</p>
                        <p className="font-semibold">Rp {DEMO_MEMBER.simpanan.pokok.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Simpanan Wajib</p>
                        <p className="font-semibold">Rp {DEMO_MEMBER.simpanan.wajib.toLocaleString('id-ID')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Simpanan Sukarela</p>
                        <p className="font-semibold">Rp {DEMO_MEMBER.simpanan.sukarela.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>Terverifikasi Blockchain</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Database className="w-4 h-4" />
                      <span>Transparansi Total</span>
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
                        Rp {(DEMO_MEMBER.transaksi.bulanIni / 1000000).toFixed(1)} Juta
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+{DEMO_MEMBER.transaksi.growth}%</span>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Total Volume</p>
                      <p className="text-2xl font-bold text-amber-700">
                        Rp {(DEMO_MEMBER.transaksi.volume / 1000000).toFixed(0)} Juta
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {DEMO_MEMBER.transaksi.total} transaksi
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
                  <CardDescription>Sebagai Agen Logistik KNMP</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-500">Total Komisi</p>
                      <p className="text-2xl font-bold text-green-700">
                        Rp {DEMO_MEMBER.logistik.komisi.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Paket</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {DEMO_MEMBER.logistik.paket.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500">Bulan Ini</span>
                    <span className="font-semibold text-[#8B0000]">
                      Rp {DEMO_MEMBER.logistik.bulanIni.toLocaleString('id-ID')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SHU Allocation Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white border border-red-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <PieChart className="w-5 h-5 text-[#8B0000]" />
                    Formula Pembagian SHU
                  </CardTitle>
                  <CardDescription>Berdasarkan AD/ART KNMP Pasal 43</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: 'Jasa Usaha Anggota', value: 40, color: 'bg-[#8B0000]' },
                      { label: 'Dana Cadangan', value: 30, color: 'bg-amber-500' },
                      { label: 'Jasa Modal', value: 10, color: 'bg-green-500' },
                      { label: 'Dana Pengurus & Pengawas', value: 5, color: 'bg-blue-500' },
                      { label: 'Dana Pendidikan', value: 5, color: 'bg-purple-500' },
                      { label: 'Dana Sosial', value: 5, color: 'bg-pink-500' },
                      { label: 'Dana Teknologi Desa', value: 5, color: 'bg-cyan-500' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-24 text-sm text-gray-600">{item.label}</div>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                        <div className="w-10 text-sm font-medium text-gray-900">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg">
                    <strong>Formula SHU Individu:</strong> SHU = (Volume Transaksi Anggota / Total Volume KPA) × Alokasi Jasa Usaha + (Simpanan Anggota / Total Simpanan KPA) × Alokasi Jasa Modal
                  </p>
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
                    Estimasi SHU Anda
                  </CardTitle>
                  <CardDescription>Proyeksi akhir tahun 2026</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <p className="text-4xl font-bold text-[#8B0000]">
                      Rp {(DEMO_MEMBER.shu.total / 1000000).toFixed(1)} Juta
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Estimasi SHU 2026</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm p-2 bg-white rounded-lg">
                      <span className="text-gray-500">Jasa Usaha</span>
                      <span className="font-medium text-gray-900">
                        Rp {DEMO_MEMBER.shu.jasaUsaha.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm p-2 bg-white rounded-lg">
                      <span className="text-gray-500">Jasa Modal</span>
                      <span className="font-medium text-gray-900">
                        Rp {DEMO_MEMBER.shu.jasaModal.toLocaleString('id-ID')}
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
                        {DEMO_MEMBER.pelatihan.selesai}/{DEMO_MEMBER.pelatihan.total} modul
                      </span>
                    </div>
                    <Progress value={(DEMO_MEMBER.pelatihan.selesai / DEMO_MEMBER.pelatihan.total) * 100} className="h-3" />
                  </div>

                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Sedang Dipelajari</p>
                    <p className="font-medium text-gray-900 text-sm">
                      {DEMO_MEMBER.pelatihan.modul}
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
                  <QuickActionButton title="Komisi" icon={Wallet} href="/dashboard" color="#D4AF37" />
                  <QuickActionButton title="Pelatihan" icon={GraduationCap} href="/academy" color="#3b82f6" />
                  <QuickActionButton title="SHU Saya" icon={TrendingUp} href="/shu" color="#8b5cf6" />
                  <QuickActionButton title="RAT" icon={Vote} href="/rat" color="#8B0000" />
                  <QuickActionButton title="Sertifikat" icon={Award} href="/academy" color="#ec4899" />
                </CardContent>
              </Card>
            </motion.div>

            {/* RAT Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-[#8B0000]/5 to-white border border-red-100">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8B0000]/10 flex items-center justify-center">
                      <Vote className="w-5 h-5 text-[#8B0000]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Hak Suara RAT</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Anda memiliki <strong className="text-[#8B0000]">1 suara</strong> dalam KPA-1 (30% total suara)
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Next RAT: Q2 2026
                      </p>
                    </div>
                  </div>
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
                {DEMO_MEMBER.aktivitas.map((activity) => (
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
                      <p className="text-sm text-gray-500">{activity.desc}</p>
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
