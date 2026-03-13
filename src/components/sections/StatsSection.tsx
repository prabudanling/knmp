'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, Globe, Wallet, TrendingUp, Truck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { HERO_STATS } from '@/data/mocks'

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

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(value * easeOut))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString('id-ID')}{suffix}
    </span>
  )
}

// Format large numbers
function formatValue(num: number): { value: number; suffix: string } {
  if (num >= 1000000000000) {
    return { value: num / 1000000000000, suffix: ' Triliun' }
  }
  if (num >= 1000000000) {
    return { value: num / 1000000000, suffix: ' Miliar' }
  }
  if (num >= 1000000) {
    return { value: num / 1000000, suffix: ' Juta' }
  }
  return { value: num, suffix: '' }
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { 
      icon: MapPin, 
      label: 'Desa Terintegrasi', 
      value: HERO_STATS.villages,
      color: '#8B0000',
      bgColor: 'from-red-50 to-red-100',
    },
    { 
      icon: Users, 
      label: 'Anggota Aktif', 
      value: HERO_STATS.members,
      suffix: '+',
      color: '#008F3D',
      bgColor: 'from-green-50 to-green-100',
    },
    { 
      icon: Globe, 
      label: 'Provinsi', 
      value: HERO_STATS.provinces,
      color: '#22c55e',
      bgColor: 'from-green-50 to-green-100',
    },
    { 
      icon: Wallet, 
      label: 'Nilai Transaksi', 
      value: HERO_STATS.transactionValue,
      prefix: 'Rp ',
      color: '#3b82f6',
      bgColor: 'from-blue-50 to-blue-100',
    },
    { 
      icon: TrendingUp, 
      label: 'Target Ekspor', 
      value: HERO_STATS.exportVolume,
      prefix: 'Rp ',
      color: '#8b5cf6',
      bgColor: 'from-purple-50 to-purple-100',
    },
    { 
      icon: Truck, 
      label: 'Agen Logistik', 
      value: HERO_STATS.agents,
      color: '#f59e0b',
      bgColor: 'from-orange-50 to-orange-100',
    },
  ]

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #8B0000 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat, i) => {
            const formatted = formatValue(stat.value)
            return (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div 
                      className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.prefix}
                      <AnimatedCounter 
                        value={formatted.value} 
                        suffix={formatted.suffix + (stat.suffix || '')} 
                      />
                    </p>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
