'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { 
  Wheat, 
  Briefcase, 
  Building2, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  ArrowUpRight 
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KPA_DATA } from '@/data/mocks'

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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat,
  Briefcase,
  Building2,
  Users,
  ShoppingBag,
  TrendingUp,
}

export function EcosystemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-[80px]" />
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
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4 px-4 py-1.5">
              Multipihak Demokratis
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            6 Kelompok <span className="text-[#8B0000]">Pihak Anggota</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Setiap KPA memiliki hak suara proposional. Keputusan diambil secara demokratis.
          </motion.p>
        </motion.div>

        {/* KPA Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {KPA_DATA.map((kpa) => {
            const IconComponent = iconMap[kpa.icon] || Users
            return (
              <motion.div key={kpa.id} variants={fadeInUp}>
                <Link href="/kpa">
                  <Card className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-900/5">
                    {/* Top accent bar */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ backgroundColor: kpa.color }}
                    />
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${kpa.color}15` }}
                        >
                          <IconComponent className="w-7 h-7" style={{ color: kpa.color }} />
                        </div>
                        <Badge 
                          variant="outline" 
                          className="font-bold border-gray-200 bg-gray-50"
                          style={{ color: kpa.color }}
                        >
                          {kpa.votingPower}%
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8B0000] transition-colors">
                        {kpa.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {kpa.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Anggota Aktif</span>
                        <span className="font-semibold text-gray-900" style={{ color: kpa.color }}>
                          {kpa.memberCount.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      {/* Hover arrow */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Voting Power Visualization */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                Distribusi Voting Power dalam RAT
              </h3>
              <div className="h-4 rounded-full overflow-hidden flex bg-gray-100">
                {KPA_DATA.map((kpa, i) => (
                  <motion.div
                    key={kpa.id}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full origin-left"
                    style={{ 
                      width: `${kpa.votingPower}%`,
                      backgroundColor: kpa.color 
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {KPA_DATA.map((kpa) => (
                  <div key={kpa.id} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: kpa.color }}
                    />
                    <span className="text-sm text-gray-600 font-medium">{kpa.votingPower}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
