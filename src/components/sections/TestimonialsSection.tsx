'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
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

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Petani Kopi, Aceh',
      content: 'Sejak bergabung KNMP, hasil kopi saya bisa sampai ke pasar ekspor. Pendapatan naik 3x lipat dalam setahun!',
      rating: 5,
    },
    {
      name: 'Sri Wahyuni',
      role: 'BUMDes Ketua, Jawa Barat',
      content: 'Integrasi dengan KNMP membuat BUMDes kami punya akses ke marketplace nasional. Transparansi SHU juga sangat membantu kepercayaan warga.',
      rating: 5,
    },
    {
      name: 'Ahmad Rizki',
      role: 'Agen Logistik, Sumatera Utara',
      content: 'Jadi agen logistik KNMP bikin punya penghasilan tambahan yang stabil. Training-nya juga gratis dan sangat bermanfaat.',
      rating: 5,
    },
  ]

  const partners = ['J&T Express', 'JNE', 'SiCepat', 'AnterAja', 'Pos Indonesia', 'Ninja Express']

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-white via-red-50/20 to-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-amber-100 text-[#D4AF37] border-amber-200 mb-4 px-4 py-1.5">
              Testimoni
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Kata <span className="text-[#8B0000]">Anggota Kami</span>
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-[#8B0000]/20 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed italic">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B0000] to-[#D4AF37] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mt-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <p className="text-gray-400 text-sm mb-6 font-medium">Didukung oleh partner terpercaya</p>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-gray-400 font-semibold text-sm hover:text-[#8B0000] transition-colors px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-red-50"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
