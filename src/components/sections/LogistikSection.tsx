'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Truck,
  Wallet,
  Calculator,
  Users,
  Package,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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

// Partner expedisi
const partners = [
  { name: 'JNE', type: 'Reguler' },
  { name: 'J&T Express', type: 'Express' },
  { name: 'SiCepat', type: 'Reguler' },
  { name: 'AnterAja', type: 'Same Day' },
  { name: 'ID Express', type: 'Express' },
  { name: 'Ninja Express', type: 'Reguler' },
]

// Steps
const steps = [
  { step: 1, title: 'Daftar Jadi Agen', desc: 'Daftar online via aplikasi KNMP', icon: Users, color: '#8B0000' },
  { step: 2, title: 'Training Gratis', desc: 'Pelatihan 10 jam dengan sertifikat', icon: Zap, color: '#D4AF37' },
  { step: 3, title: 'Terima Paket', desc: 'Warga kirim paket ke lokasi Anda', icon: Package, color: '#22c55e' },
  { step: 4, title: 'Dapat Komisi', desc: 'Komisi otomatis ke dompet digital', icon: Wallet, color: '#8b5cf6' },
]

// Sample agents
const topAgents = [
  { name: 'Pak Budi Santoso', village: 'Desa Sukamaju, Jawa Barat', packages: '2.450', commission: 'Rp 6.125.000', rating: 4.9 },
  { name: 'Bu Siti Rahayu', village: 'Desa Harapan, Jawa Tengah', packages: '1.890', commission: 'Rp 4.725.000', rating: 4.8 },
  { name: 'Pak Ahmad Fauzi', village: 'Desa Makmur, Jawa Timur', packages: '1.650', commission: 'Rp 4.125.000', rating: 4.9 },
]

export function LogistikSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [packages, setPackages] = useState(10)
  const commissionPerPackage = 2500
  const monthlyCommission = packages * commissionPerPackage * 30

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 px-4 py-1.5">
              <Truck className="w-4 h-4 mr-2" />
              Logistik Digital
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Jaringan <span className="text-[#8B0000]">83.763 Titik</span> Coverage
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Agen logistik multi-ekspedisi yang menghubungkan desa dengan dunia
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '83.763', label: 'Agen Aktif', icon: Users, color: '#8B0000' },
            { value: '1.25 Juta', label: 'Paket/Bulan', icon: Package, color: '#3b82f6' },
            { value: '6+', label: 'Partner Ekspedisi', icon: Truck, color: '#22c55e' },
            { value: 'Rp8.5M+', label: 'Komisi Dibagikan', icon: Wallet, color: '#D4AF37' },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
              <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Commission Calculator */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-amber-50 to-white border border-amber-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Calculator className="w-5 h-5 text-amber-600" />
                  Kalkulator Komisi
                </CardTitle>
                <CardDescription>
                  Hitung potensi penghasilan sebagai agen logistik
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-gray-700 font-medium">Paket per hari</Label>
                    <span className="text-xl font-bold text-[#8B0000]">{packages} paket</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={packages}
                    onChange={(e) => setPackages(Number(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-[#8B0000]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 paket</span>
                    <span>50 paket</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center border border-amber-100">
                    <p className="text-xs text-gray-500 mb-1">per Paket</p>
                    <p className="font-bold text-gray-900">Rp 2.500</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-amber-100">
                    <p className="text-xs text-gray-500 mb-1">Paket/Bulan</p>
                    <p className="font-bold text-gray-900">{(packages * 30).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#8B0000] to-[#B22222] rounded-lg p-3 text-center text-white">
                    <p className="text-xs opacity-80 mb-1">Estimasi/Bulan</p>
                    <p className="font-bold">Rp {monthlyCommission.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <Link href="/logistik">
                  <Button className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white">
                    Daftar Jadi Agen
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* How It Works */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="h-full bg-white border border-gray-100">
              <CardHeader>
                <CardTitle className="text-gray-900">Cara Menjadi Agen</CardTitle>
                <CardDescription>4 langkah mudah memulai bisnis logistik desa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((item) => (
                    <div key={item.step} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="text-xs text-white" style={{ backgroundColor: item.color }}>
                            Langkah {item.step}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
            Partner <span className="text-[#8B0000]">Ekspedisi</span> Terpercaya
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, i) => (
              <div key={i} className="bg-white rounded-xl px-6 py-4 border border-gray-100 hover:border-[#8B0000]/30 hover:shadow-md transition-all flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#8B0000]" />
                <div>
                  <p className="font-semibold text-gray-900">{partner.name}</p>
                  <p className="text-xs text-gray-500">{partner.type}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Agents */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">
            Agen <span className="text-[#D4AF37]">Terbaik</span> Kami
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {topAgents.map((agent, i) => (
              <Card key={i} className="bg-white border border-gray-100 hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#D4AF37] flex items-center justify-center text-white font-bold">
                      {agent.name.split(' ')[1][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{agent.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{agent.village}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium">{agent.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Paket</p>
                      <p className="font-semibold text-gray-900">{agent.packages}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">Komisi</p>
                      <p className="font-semibold text-[#8B0000]">{agent.commission}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/logistik">
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-red-50 hover:text-[#8B0000] px-6 py-5">
              Lihat Detail Logistik
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
