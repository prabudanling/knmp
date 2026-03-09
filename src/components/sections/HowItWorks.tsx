'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Users,
  FileCheck,
  ShoppingBag,
  TrendingUp,
  Wallet,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      number: '01',
      title: 'Daftar Online',
      description: 'Daftar sebagai anggota melalui portal KNMP. Pilih KPA dan tier yang sesuai. Proses cepat dan transparan.',
      icon: Users,
      color: '#8B0000',
      bgColor: 'from-red-50 to-red-100',
    },
    {
      number: '02',
      title: 'Verifikasi Data',
      description: 'Tim kami memverifikasi data diri dan kelengkapan persyaratan.',
      icon: FileCheck,
      color: '#D4AF37',
      bgColor: 'from-amber-50 to-amber-100',
    },
    {
      number: '03',
      title: 'Aktivasi Akun',
      description: 'Setelah disetujui, akun Anda aktif dan bisa mulai bertransaksi.',
      icon: CheckCircle2,
      color: '#22c55e',
      bgColor: 'from-green-50 to-green-100',
    },
    {
      number: '04',
      title: 'Mulai Berjualan',
      description: 'Upload produk ke Marketplace Zonasi dan jangkau pasar nasional.',
      icon: ShoppingBag,
      color: '#3b82f6',
      bgColor: 'from-blue-50 to-blue-100',
    },
    {
      number: '05',
      title: 'Dapatkan SHU',
      description: 'Setiap transaksi berkontribusi pada SHU yang dibagikan akhir tahun.',
      icon: TrendingUp,
      color: '#8b5cf6',
      bgColor: 'from-purple-50 to-purple-100',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #8B0000 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-amber-100 text-[#D4AF37] border-amber-200 mb-4 px-4 py-1.5">
              Cara Kerja
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Bergabung <span className="text-[#8B0000]">Mudah & Cepat</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Lima langkah sederhana untuk menjadi bagian dari ekosistem KNMP
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className={`relative lg:w-1/2 ${
                  index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:ml-auto'
                }`}
              >
                {/* Timeline Dot */}
                <div 
                  className={`absolute top-8 w-5 h-5 rounded-full border-4 border-white shadow-md hidden lg:block ${
                    index % 2 === 0 ? 'right-0 -mr-2.5' : 'left-0 -ml-2.5'
                  }`}
                  style={{ backgroundColor: step.color }}
                />

                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div 
                        className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${step.bgColor}`}
                      >
                        <step.icon className="w-8 h-8" style={{ color: step.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span 
                            className="text-sm font-bold px-2.5 py-1 rounded-lg bg-gray-100"
                            style={{ color: step.color }}
                          >
                            {step.number}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
