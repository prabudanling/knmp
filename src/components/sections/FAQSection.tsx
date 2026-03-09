'use client'

import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

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

const faqs = [
  {
    question: 'Apa itu KNMP?',
    answer: 'KNMP (Koperasi Nusantara Merah Putih) adalah koperasi multipihak digital yang mengintegrasikan 83.763 desa Indonesia dengan pasar global melalui ekosistem teknologi.',
  },
  {
    question: 'Bagaimana cara menjadi anggota?',
    answer: 'Daftar online melalui portal KNMP, pilih KPA dan tier yang sesuai, kemudian lakukan verifikasi data. Prosesnya cepat dan transparan.',
  },
  {
    question: 'Apa itu 6 KPA?',
    answer: '6 KPA adalah 6 Kelompok Pihak Anggota: Petani/Produsen, Pengusaha/Pengepul, Koperasi/BUMDes, Pekerja/Kader, Konsumen, dan Investor. Setiap KPA memiliki proporsi suara dalam RAT.',
  },
  {
    question: 'Bagaimana pembagian SHU?',
    answer: 'SHU dibagikan berdasarkan partisipasi ekonomi anggota. 40% untuk jasa usaha anggota, 30% dana cadangan, 10% jasa modal, sisanya untuk operasional dan pengembangan.',
  },
  {
    question: 'Apakah gratis bergabung?',
    answer: 'Tier T1 (Petani Digital) gratis. Tier lainnya memiliki simpanan pokok yang berbeda sesuai hak usaha yang diberikan.',
  },
]

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl p-6 transition-all duration-300",
        isOpen 
          ? "bg-white border border-[#8B0000]/20 shadow-lg shadow-red-900/5" 
          : "bg-white border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-semibold text-gray-900">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isOpen ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-500"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 mb-4 px-4 py-1.5">
              <HelpCircle className="w-3 h-3 mr-1" />
              FAQ
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Pertanyaan <span className="text-[#8B0000]">Umum</span>
          </motion.h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
