'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Wheat, 
  Briefcase, 
  Building2, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  AlertCircle,
  Vote
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
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
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-50/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-green-50/20 rounded-full blur-[80px]" />
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
            <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4 px-4 py-1.5 text-sm">
              <Vote className="w-4 h-4 mr-1.5" />
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
            Setiap KPA memiliki hak suara proposional dalam RAT. Keputusan diambil secara demokratis dengan prinsip satu anggota, satu suara.
          </motion.p>
        </motion.div>

        {/* Voting Power Visualization - Top */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  Distribusi Voting Power dalam RAT
                </h3>
                <p className="text-white/80 text-sm mt-1">Total: 100% suara terbagi dalam 6 KPA</p>
              </div>
              
              {/* Horizontal stacked bar */}
              <div className="p-6">
                <div className="h-12 rounded-xl overflow-hidden flex shadow-inner bg-gray-100">
                  {KPA_DATA.map((kpa, i) => (
                    <motion.div
                      key={kpa.id}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="h-full origin-left flex items-center justify-center relative group"
                      style={{ 
                        width: `${kpa.votingPower}%`,
                        backgroundColor: kpa.color,
                        minWidth: kpa.votingPower < 10 ? '60px' : undefined
                      }}
                    >
                      <span className="text-white font-bold text-sm md:text-base drop-shadow-sm">
                        {kpa.votingPower}%
                      </span>
                      {/* Tooltip on hover */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {kpa.shortName}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
                  {KPA_DATA.map((kpa) => (
                    <div key={kpa.id} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-md shadow-sm"
                        style={{ backgroundColor: kpa.color }}
                      />
                      <span className="text-sm text-gray-600 font-medium">{kpa.shortName}</span>
                      <span className="text-sm font-bold" style={{ color: kpa.color }}>
                        {kpa.votingPower}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* KPA Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {KPA_DATA.map((kpa, index) => {
            const IconComponent = iconMap[kpa.icon] || Users
            const isHighestVoting = index === 0 // KPA-1 has highest voting power
            const isInvestor = kpa.id === 'KPA_6_INVESTOR'
            
            return (
              <motion.div key={kpa.id} variants={fadeInUp}>
                <Card className={`group relative bg-white border transition-all duration-500 overflow-hidden h-full ${
                  isHighestVoting 
                    ? 'border-green-200 shadow-lg shadow-green-100/50 hover:shadow-xl hover:shadow-green-100/50' 
                    : isInvestor
                    ? 'border-amber-200/50 shadow-md shadow-amber-50/50 hover:shadow-xl hover:shadow-amber-100/50'
                    : 'border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-900/5'
                }`}>
                  {/* Top accent bar with gradient */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: kpa.color }}
                  />
                  
                  {/* Highest voting badge */}
                  {isHighestVoting && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-semibold">
                        Highest Voting Power
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    {/* Icon and Voting Power */}
                    <div className="flex items-start justify-between mb-4 mt-2">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        style={{ backgroundColor: `${kpa.color}15` }}
                      >
                        <IconComponent className="w-8 h-8" style={{ color: kpa.color }} />
                      </div>
                      
                      {/* Voting Power Circle */}
                      <div className="relative">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            fill="none"
                            stroke={kpa.color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 100" }}
                            animate={isInView ? { strokeDasharray: `${kpa.votingPower * 3.14} 100` } : { strokeDasharray: "0 100" }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold" style={{ color: kpa.color }}>
                            {kpa.votingPower}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#8B0000] transition-colors">
                      {kpa.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {kpa.description}
                    </p>
                    
                    {/* Examples */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Contoh Anggota:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {kpa.examples.slice(0, 3).map((example, i) => (
                          <Badge 
                            key={i}
                            variant="outline" 
                            className="text-xs font-normal border-gray-200 bg-gray-50/50 hover:bg-gray-100 transition-colors"
                          >
                            {example}
                          </Badge>
                        ))}
                        {kpa.examples.length > 3 && (
                          <Badge 
                            variant="outline" 
                            className="text-xs font-normal border-gray-200 bg-gray-50/50"
                            style={{ color: kpa.color }}
                          >
                            +{kpa.examples.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Member Count */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400 font-medium">Anggota Aktif</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: kpa.color }}
                        />
                        <span className="font-bold text-gray-900">
                          {kpa.memberCount.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                    
                    {/* RAT Note for Investor */}
                    {kpa.ratNote && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700 font-medium">
                            {kpa.ratNote}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Summary Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-[#8B0000] to-[#6B0000] border-0 shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <p className="text-white/70 text-sm mb-1">Total Anggota Aktif</p>
                  <p className="text-3xl font-bold text-white">
                    {KPA_DATA.reduce((sum, kpa) => sum + kpa.memberCount, 0).toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Kelompok Pihak Anggota</p>
                  <p className="text-3xl font-bold text-white">6 KPA</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Total Voting Power</p>
                  <p className="text-3xl font-bold text-[#D4AF37]">100%</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/90 text-center text-sm">
                  <span className="font-semibold text-[#D4AF37]">Prinsip Demokrasi:</span> Setiap anggota memiliki hak suara dalam RAT. 
                  Keputusan diambil berdasarkan suara terbanyak dengan memperhatikan kepentingan semua pihak.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Voting Hierarchy Visualization */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Hierarki Voting Power</h3>
            <p className="text-sm text-gray-500 mt-1">KPA dengan voting power tertinggi memiliki pengaruh lebih besar dalam keputusan RAT</p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            {KPA_DATA.map((kpa, i) => (
              <motion.div
                key={kpa.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="w-full max-w-2xl"
              >
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      {/* Rank */}
                      <div 
                        className="w-12 h-16 flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: kpa.color }}
                      >
                        #{i + 1}
                      </div>
                      
                      {/* KPA Info */}
                      <div className="flex-1 px-4 py-3">
                        <div className="flex items-center gap-3">
                          {(() => {
                            const IconComponent = iconMap[kpa.icon] || Users
                            return <IconComponent className="w-5 h-5" style={{ color: kpa.color }} />
                          })()}
                          <div>
                            <p className="font-semibold text-gray-900">{kpa.shortName}</p>
                            <p className="text-xs text-gray-500">{kpa.memberCount.toLocaleString('id-ID')} anggota</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Voting Power Bar */}
                      <div className="flex-1 px-4">
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${kpa.votingPower}%` } : { width: 0 }}
                            transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: kpa.color }}
                          />
                        </div>
                      </div>
                      
                      {/* Percentage */}
                      <div className="px-4 py-3 bg-gray-50 min-w-[80px] text-center">
                        <span className="text-xl font-bold" style={{ color: kpa.color }}>
                          {kpa.votingPower}%
                        </span>
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
