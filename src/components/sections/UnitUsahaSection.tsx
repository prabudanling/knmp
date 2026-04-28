'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Wallet, 
  Store, 
  Truck, 
  Plane, 
  GraduationCap, 
  ShoppingBag, 
  Heart, 
  Wheat, 
  Leaf, 
  Zap, 
  Building2,
  ArrowUpRight,
  Zap as QuickWinIcon
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

interface BusinessUnit {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  name: string
  desc: string
  color: string
  bgColor: string
  quickWin: boolean
  revenue: string
}

export function UnitUsahaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const units: BusinessUnit[] = [
    { 
      icon: Wallet, 
      name: 'NB Pay', 
      desc: 'E-Wallet & Fintech Desa: SPP Digital, Tabungan Haji, Zakat Pay, Microloans', 
      color: '#008F3D', 
      bgColor: 'from-green-50 to-green-100',
      quickWin: true,
      revenue: 'Rp 250M/bulan',
    },
    { 
      icon: Store, 
      name: 'Marketplace Zonasi', 
      desc: '8 Zona B2B/B2C: Agri, Retail, Jasa, Digital, Kesehatan, Spiritual, Ekspor, Energi', 
      color: '#8B0000', 
      bgColor: 'from-red-50 to-red-100',
      quickWin: true,
      revenue: 'Rp 500M/bulan',
    },
    { 
      icon: Truck, 
      name: 'Agen Logistik', 
      desc: 'Multi-ekspedisi: J&T, JNE, SiCepat, TIKI, AnterAja. Rp3-10M/agent/month', 
      color: '#f59e0b', 
      bgColor: 'from-amber-50 to-amber-100',
      quickWin: true,
      revenue: 'Rp 3-10M/agen',
    },
    { 
      icon: Plane, 
      name: 'Haji & Umroh', 
      desc: 'Tabungan Haji Digital + channel zakat via BAZDes', 
      color: '#16a34a', 
      bgColor: 'from-emerald-50 to-emerald-100',
      quickWin: false,
      revenue: 'Rp 150M/bulan',
    },
    { 
      icon: GraduationCap, 
      name: 'NB Academy', 
      desc: '3 Tingkat: Keluarga (PKK), Pemuda (KT), Profesional (LPM)', 
      color: '#7c3aed', 
      bgColor: 'from-violet-50 to-violet-100',
      quickWin: true,
      revenue: 'Rp 75M/bulan',
    },
    { 
      icon: ShoppingBag, 
      name: 'Gerai Sembako', 
      desc: 'KDMP outlets, pasar desa, sembako digital', 
      color: '#92400e', 
      bgColor: 'from-orange-50 to-orange-100',
      quickWin: false,
      revenue: 'Rp 200M/bulan',
    },
    { 
      icon: Heart, 
      name: 'Apotek/Klinik Desa', 
      desc: 'Telemedicine + resep digital + BPJS integration', 
      color: '#dc2626', 
      bgColor: 'from-rose-50 to-rose-100',
      quickWin: false,
      revenue: 'Rp 120M/bulan',
    },
    { 
      icon: Wheat, 
      name: 'Pertanian Ekspor', 
      desc: 'End-to-end: tanam → panen → gudang → resi → ekspor', 
      color: '#0d9488', 
      bgColor: 'from-teal-50 to-teal-100',
      quickWin: false,
      revenue: 'Rp 300M/bulan',
    },
    { 
      icon: Leaf, 
      name: 'Carbon Credits', 
      desc: '500M pohon + KRPL + agroforestri + carbon tokenization', 
      color: '#10b981', 
      bgColor: 'from-emerald-50 to-emerald-100',
      quickWin: false,
      revenue: 'Rp 50M/bulan',
    },
    { 
      icon: Zap, 
      name: 'Energi Desa', 
      desc: 'Biogas dari limbah ternak + solar panel komunal', 
      color: '#eab308', 
      bgColor: 'from-yellow-50 to-yellow-100',
      quickWin: false,
      revenue: 'Rp 80M/bulan',
    },
    { 
      icon: Building2, 
      name: 'Pasar Digital Desa', 
      desc: 'Upgrade pasar fisik → hybrid digital marketplace', 
      color: '#0ea5e9', 
      bgColor: 'from-sky-50 to-sky-100',
      quickWin: false,
      revenue: 'Rp 100M/bulan',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-50/30 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4 px-4 py-1.5">
              Ekosistem Lengkap
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4"
          >
            11 Unit <span className="text-[#008F3D]">Usaha Strategis</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Setiap unit usaha dirancang untuk memberikan nilai tambah bagi anggota
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {units.map((unit, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Card className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden h-full">
                <CardContent className="p-5 text-center relative">
                  {/* Quick Win Badge */}
                  {unit.quickWin && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] px-2 py-0.5 font-semibold">
                        <QuickWinIcon className="w-3 h-3 mr-1" />
                        Quick Win
                      </Badge>
                    </div>
                  )}
                  <div 
                    className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${unit.bgColor}`}
                  >
                    <unit.icon className="w-8 h-8" style={{ color: unit.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#8B0000] transition-colors text-base">
                    {unit.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed min-h-[40px]">{unit.desc}</p>
                  {/* Revenue Potential */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium" style={{ color: unit.color }}>
                      💰 {unit.revenue}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mt-12"
        >
          <Link href="/marketplace">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-red-50 hover:text-[#8B0000] hover:border-[#8B0000] px-6 py-5">
              Lihat Semua Unit Usaha
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
