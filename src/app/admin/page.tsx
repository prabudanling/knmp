'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  UserCheck,
  UserX,
  Wallet,
  ShoppingBag,
  Package,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  Activity,
  Shield,
  ChevronRight,
  Search,
  RefreshCw,
  MapPin,
  LogOut,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

// Types
interface User {
  id: string
  email: string
  name: string
  role: string
  niak?: string
}

interface DashboardStats {
  totalMembers: number
  activeMembers: number
  pendingMembers: number
  totalTransactions: number
  totalRevenue: number
  pendingPayments: number
  totalProducts: number
  activeProducts: number
  pendingRegistrations: number
}

interface DashboardData {
  stats: DashboardStats
  today: {
    newMembers: number
    newRegistrations: number
    payments: number
    revenue: number
  }
  charts: {
    memberGrowth: { date: string; count: number }[]
    membersByProvince: { provinsi: string; count: number }[]
    membersByKPA: { kpa: string; count: number }[]
    membersByTier: { tier: string; count: number }[]
  }
  recentActivities: {
    id: string
    action: string
    entity: string
    description: string
    createdAt: string
    user?: { id: string; name: string; email: string }
  }[]
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchDashboardData(token)
  }, [router])

  const fetchDashboardData = async (token?: string) => {
    try {
      setLoading(true)
      const authToken = token || localStorage.getItem('token')
      
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
        setError(null)
      } else {
        if (response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
          return
        }
        setError(result.error?.message || 'Gagal memuat data')
      }
    } catch (err) {
      setError('Gagal terhubung ke server')
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading && !data) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#8B0000] mx-auto mb-4" />
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="hover:bg-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="h-10 w-auto rounded-lg overflow-hidden bg-white shadow-sm">
                  <Image src="/logo-knmp.png" alt="KNMP" width={1408} height={768} className="h-full w-auto object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-500 text-sm">Koperasi Korporasi Multipihak Nusa Merah Putih</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => fetchDashboardData()} variant="outline" size="icon" className="bg-white">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900 text-sm">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.role || 'SUPER_ADMIN'}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="icon" className="bg-white">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <p className="text-red-700 font-medium">Error: {error}</p>
            </div>
            <Button onClick={() => fetchDashboardData()} variant="outline" size="sm">
              Coba Lagi
            </Button>
          </motion.div>
        )}

        {/* Today's Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <TodayCard
            title="Anggota Baru"
            value={data?.today.newMembers || 0}
            icon={UserCheck}
            color="#22c55e"
          />
          <TodayCard
            title="Pendaftaran"
            value={data?.today.newRegistrations || 0}
            icon={FileText}
            color="#3b82f6"
          />
          <TodayCard
            title="Pembayaran"
            value={data?.today.payments || 0}
            icon={Wallet}
            color="#8b5cf6"
          />
          <TodayCard
            title="Pendapatan"
            value={`Rp ${((data?.today.revenue || 0) / 1000000).toFixed(1)}Jt`}
            icon={DollarSign}
            color="#f59e0b"
          />
        </motion.div>

        {/* Main Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <StatsCard
            title="Total Anggota"
            value={(data?.stats.totalMembers || 0).toLocaleString('id-ID')}
            subtitle={`${data?.stats.activeMembers || 0} aktif`}
            icon={Users}
            color="#8B0000"
          />
          <StatsCard
            title="Pendaftaran Pending"
            value={(data?.stats.pendingRegistrations || 0).toLocaleString('id-ID')}
            subtitle="Perlu verifikasi"
            icon={Clock}
            color="#f59e0b"
            alert={(data?.stats.pendingRegistrations || 0) > 0}
          />
          <StatsCard
            title="Total Transaksi"
            value={(data?.stats.totalTransactions || 0).toLocaleString('id-ID')}
            subtitle="Semua waktu"
            icon={ShoppingBag}
            color="#3b82f6"
          />
          <StatsCard
            title="Total Pendapatan"
            value={`Rp ${((data?.stats.totalRevenue || 0) / 1000000000).toFixed(1)}M`}
            subtitle="Kumulatif"
            icon={DollarSign}
            color="#22c55e"
          />
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Member Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#8B0000]" />
                  Pertumbuhan Anggota
                </CardTitle>
                <CardDescription>Pendaftaran anggota baru per bulan</CardDescription>
              </CardHeader>
              <CardContent>
                {data?.charts.memberGrowth && data.charts.memberGrowth.length > 0 ? (
                  <div className="h-64 flex items-end gap-2">
                    {data.charts.memberGrowth.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-[#8B0000] to-[#DC143C] rounded-t transition-all hover:opacity-80"
                          style={{ height: `${Math.max((item.count / Math.max(...data.charts.memberGrowth.map(g => g.count))) * 200, 4)}px` }}
                        />
                        <p className="text-xs text-gray-500 mt-2 truncate w-full text-center">{item.date.slice(0, 3)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <p>Belum ada data pertumbuhan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Members by KPA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#8B0000]" />
                  Anggota per KPA
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data?.charts.membersByKPA && data.charts.membersByKPA.length > 0 ? (
                  <div className="space-y-3">
                    {data.charts.membersByKPA.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 truncate flex-1">{item.kpa}</span>
                        <Badge variant="secondary" className="ml-2">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-400">
                    <p>Belum ada data KPA</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions & Geographic */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Akses cepat ke fitur utama</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <QuickActionCard
                  title="Verifikasi Pendaftaran"
                  count={data?.stats.pendingRegistrations}
                  icon={UserCheck}
                  href="/admin/pendaftaran"
                  color="#f59e0b"
                />
                <QuickActionCard
                  title="Verifikasi Pembayaran"
                  count={data?.stats.pendingPayments}
                  icon={Wallet}
                  href="/admin/payments"
                  color="#8b5cf6"
                />
                <QuickActionCard
                  title="Kelola Produk"
                  count={data?.stats.totalProducts}
                  icon={Package}
                  href="/admin/products"
                  color="#3b82f6"
                />
                <QuickActionCard
                  title="Laporan SHU"
                  icon={TrendingUp}
                  href="/admin/shu"
                  color="#22c55e"
                />
                <QuickActionCard
                  title="Pengumuman"
                  icon={Bell}
                  href="/admin/announcements"
                  color="#ef4444"
                />
                <QuickActionCard
                  title="Pengaturan"
                  icon={Settings}
                  href="/admin/settings"
                  color="#6b7280"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#8B0000]" />
                  Distribusi Geografis
                </CardTitle>
                <CardDescription>Anggota per provinsi</CardDescription>
              </CardHeader>
              <CardContent>
                {data?.charts.membersByProvince && data.charts.membersByProvince.length > 0 ? (
                  <div className="space-y-3">
                    {data.charts.membersByProvince.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-6 text-gray-400">{index + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">{item.provinsi}</span>
                            <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          </div>
                          <Progress 
                            value={(item.count / (data.charts.membersByProvince[0]?.count || 1)) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Belum ada data anggota</p>
                      <p className="text-sm">Data akan muncul setelah ada pendaftaran</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#8B0000]" />
                    Aktivitas Terbaru
                  </CardTitle>
                  <CardDescription>Log aktivitas sistem</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {data?.recentActivities && data.recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {data.recentActivities.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.action === 'LOGIN' ? 'bg-blue-100' :
                        activity.action === 'CREATE' ? 'bg-green-100' :
                        activity.action === 'APPROVE' ? 'bg-green-100' :
                        activity.action === 'REJECT' ? 'bg-red-100' :
                        'bg-gray-100'
                      }`}>
                        {activity.action === 'LOGIN' && <Users className="w-5 h-5 text-blue-600" />}
                        {activity.action === 'CREATE' && <UserCheck className="w-5 h-5 text-green-600" />}
                        {activity.action === 'APPROVE' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        {activity.action === 'REJECT' && <XCircle className="w-5 h-5 text-red-600" />}
                        {!['LOGIN', 'CREATE', 'APPROVE', 'REJECT'].includes(activity.action) && <Activity className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {activity.user?.name || 'System'} • {formatTimeAgo(activity.createdAt)}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.action}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Belum ada aktivitas</p>
                  <p className="text-sm">Aktivitas akan muncul setelah ada interaksi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}

// Helper Components
function TodayCard({ title, value, icon: Icon, color }: {
  title: string
  value: number | string
  icon: React.ElementType
  color: string
}) {
  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatsCard({ title, value, subtitle, icon: Icon, color, alert }: {
  title: string
  value: string
  subtitle?: string
  icon: React.ElementType
  color: string
  alert?: boolean
}) {
  return (
    <Card className={`bg-white ${alert ? 'border-2 border-amber-400' : ''}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          {alert && (
            <Badge className="bg-amber-100 text-amber-700" variant="secondary">
              <AlertCircle className="w-3 h-3 mr-1" />
              Perlu Aksi
            </Badge>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

function QuickActionCard({ title, count, icon: Icon, href, color }: {
  title: string
  count?: number
  icon: React.ElementType
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <Card className="bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-pointer h-full">
        <CardContent className="p-4 flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          {count !== undefined && (
            <Badge variant="secondary" className="text-xs">{count}</Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}
