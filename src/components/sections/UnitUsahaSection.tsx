'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Store, 
  Truck, 
  CreditCard, 
  GraduationCap, 
  Plane, 
  Leaf,
  ArrowUpRight 
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
    transition: { staggerChildren: 0.1 },
  },
}

export function UnitUsahaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const units = [
    { icon: Store, name: 'Marketplace Zonasi', desc: 'Platform jual-beli produk desa', color: '#22c55e', bgColor: 'from-green-50 to-green-100' },
    { icon: Truck, name: 'Logistik Digital', desc: 'Jaringan agen logistik 83.763 desa', color: '#3b82f6', bgColor: 'from-blue-50 to-blue-100' },
    { icon: CreditCard, name: 'JP3 Pay', desc: 'Fintech & dompet digital koperasi', color: '#8b5cf6', bgColor: 'from-purple-50 to-purple-100' },
    { icon: GraduationCap, name: 'JE-P3 Academy', desc: 'Pelatihan & sertifikasi digital', color: '#f59e0b', bgColor: 'from-orange-50 to-orange-100' },
    { icon: Plane, name: 'Haji & Umroh', desc: 'Layanan perjalanan suci', color: '#06b6d4', bgColor: 'from-cyan-50 to-cyan-100' },
    { icon: Leaf, name: 'Carbon Credits', desc: 'Karbon kredit & energi terbarukan', color: '#10b981', bgColor: 'from-emerald-50 to-emerald-100' },
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            6 Unit <span className="text-[#D4AF37]">Usaha Strategis</span>
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {units.map((unit, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Card className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div 
                    className={`w-18 h-18 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${unit.bgColor}`}
                    style={{ width: '72px', height: '72px' }}
                  >
                    <unit.icon className="w-9 h-9" style={{ color: unit.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#8B0000] transition-colors text-lg">
                    {unit.name}
                  </h3>
                  <p className="text-sm text-gray-500">{unit.desc}</p>
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
