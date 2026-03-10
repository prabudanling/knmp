'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Target,
  Heart,
  Scale,
  Gavel,
  Briefcase,
  Cpu,
  Users,
  Globe,
  Landmark,
  Sparkles,
  ArrowRight,
  Flag,
  Rocket,
  Trophy,
} from 'lucide-react'
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

// Visi dimensions data
const visiDimensions = [
  { icon: Heart, title: "Spiritual", desc: "Nilai keagamaan sebagai landasan moral", color: "#ec4899" },
  { icon: Scale, title: "Konstitusional", desc: "Sejalan dengan UUD 1945 & Pancasila", color: "#8B0000" },
  { icon: Gavel, title: "Legal", desc: "Kepatuhan regulasi koperasi", color: "#3b82f6" },
  { icon: Briefcase, title: "Bisnis", desc: "Model bisnis berkelanjutan", color: "#22c55e" },
  { icon: Cpu, title: "Teknologi", desc: "Digitalisasi menyeluruh", color: "#8b5cf6" },
  { icon: Users, title: "Sosial", desc: "Pemberdayaan SDM desa", color: "#f59e0b" },
]

// Misi data
const misiData = [
  { number: 1, title: "Menghimpun Kapasitas Anggota", desc: "Menghimpun dan mengembangkan kapasitas anggota KNMP untuk ekosistem ekonomi yang kuat" },
  { number: 2, title: "Sistem Ekonomi Terintegrasi", desc: "Membangun sistem ekonomi terintegrasi dari desa hingga nasional" },
  { number: 3, title: "Akses Pasar & Pelatihan", desc: "Mendorong akses pasar, pembiayaan, dan pelatihan untuk anggota" },
  { number: 4, title: "Diplomasi Ekonomi", desc: "Menjalankan diplomasi ekonomi dalam dan luar negeri" },
]

// Roadmap data
const roadmapData = [
  { year: "2026", title: "Fondasi & Launch", target: "1.000 desa pilot", progress: 10, color: "#f59e0b" },
  { year: "2027", title: "Scale-Up", target: "10.000 desa", progress: 25, color: "#22c55e" },
  { year: "2030", title: "Ekspor Global", target: "50.000 desa", progress: 50, color: "#3b82f6" },
  { year: "2045", title: "World Class", target: "83.763 desa", progress: 100, color: "#D4AF37" },
]

export function VisiMisiSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="visi-misi" className="relative py-20 md:py-28 bg-gradient-to-b from-white via-red-50/30 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
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
              <Target className="w-4 h-4 mr-2" />
              Visi & Misi
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Menuju <span className="text-[#8B0000]">World Class</span> Cooperative
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Menjadi Digital Operating System Desa Indonesia Terbesar di Dunia
          </motion.p>
        </motion.div>

        {/* Main Quote Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="relative overflow-hidden border-2 border-[#8B0000]/10 bg-gradient-to-br from-white to-red-50/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]" />
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-[#8B0000]" />
              </div>
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-relaxed mb-4">
                "Menjadi <span className="text-[#D4AF37]">Digital Operating System</span> Desa Indonesia{' '}
                <span className="text-[#8B0000]">Terbesar di Dunia</span>"
              </blockquote>
              <p className="text-gray-600 max-w-2xl mx-auto">
                KNMP hadir sebagai platform ekonomi digital yang menghubungkan seluruh desa di Indonesia menuju Indonesia Emas 2045.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 6 Dimensions Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {visiDimensions.map((dim) => (
            <motion.div key={dim.title} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Card className="h-full bg-white border border-gray-100 hover:border-[#8B0000]/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${dim.color}15` }}
                  >
                    <dim.icon className="w-6 h-6" style={{ color: dim.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{dim.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{dim.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Misi Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4 px-4 py-1.5">
              <Flag className="w-4 h-4 mr-2" />
              Misi Utama
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              4 Misi <span className="text-[#D4AF37]">Strategis</span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {misiData.map((misi) => (
              <motion.div key={misi.number} variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 hover:border-[#8B0000]/20 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#B22222] flex items-center justify-center text-white font-bold">
                        {misi.number}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-[#8B0000] transition-colors">
                        {misi.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{misi.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roadmap Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 px-4 py-1.5">
              <Rocket className="w-4 h-4 mr-2" />
              Roadmap 2026-2045
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Perjalanan Menuju <span className="text-[#8B0000]">World Class</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roadmapData.map((item, i) => (
              <motion.div key={item.year} variants={fadeInUp}>
                <Card className="h-full bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="h-1" style={{ backgroundColor: item.color }} />
                  <CardContent className="p-4 text-center">
                    <div 
                      className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <span className="font-bold" style={{ color: item.color }}>{item.year}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 mb-3">{item.target}</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color, width: `${item.progress}%` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
          <Link href="/visi-misi">
            <Button variant="outline" className="border-[#8B0000] text-[#8B0000] hover:bg-red-50 hover:text-[#8B0000] px-6 py-5">
              Lihat Detail Visi Misi
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
