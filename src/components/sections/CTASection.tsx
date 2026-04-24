'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Zap, Shield, Users, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient base - Merah Tua to Green PPP */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] via-[#9B0F0F] to-[#008F3D]" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Animated glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-white/20 text-white border border-white/30 mb-6 px-5 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Bergabung Sekarang
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Jadilah Bagian dari
            <br />
            <span className="text-[#00A847]">
              Peradaban Baru
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Dari petani hingga investor, semua punya tempat di KNMP. 
            Bersama kita membangun masa depan ekonomi desa Indonesia.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/kontak">
              <Button 
                size="lg"
                className="bg-white text-[#8B0000] hover:bg-gray-100 px-12 py-8 text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 font-semibold"
              >
                Daftar Sebagai Anggota
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/tentang">
              <Button 
                size="lg"
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 px-12 py-8 text-lg backdrop-blur-sm transition-all duration-300"
              >
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 sm:gap-10"
          >
            {[
              { icon: Shield, text: 'Terdaftar Resmi' },
              { icon: Users, text: '125.000+ Anggota' },
              { icon: Star, text: 'Rating 4.8/5' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
