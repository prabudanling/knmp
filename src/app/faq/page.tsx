'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  HelpCircle,
  ChevronDown,
  Search,
  Users,
  CreditCard,
  Wallet,
  Truck,
  TrendingUp,
  Shield,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const faqData = [
  {
    category: 'Keanggotaan',
    icon: Users,
    faqs: [
      {
        question: 'Apa itu KNMP?',
        answer: 'KNMP (KKMNMP — Koperasi Korporasi Multipihak Nusa Merah Putih) adalah koperasi multipihak digital yang mengintegrasikan 83.763 desa Indonesia dengan pasar global. Berlandaskan Pentagon Kedaulatan dengan 5 KPA, kami menghubungkan produsen, konsumen, abdi negara, pelaku usaha, dan pemodal dalam satu ekosistem berdaulat.',
      },
      {
        question: 'Bagaimana cara menjadi anggota?',
        answer: 'Pendaftaran anggota dapat dilakukan melalui portal resmi KNMP (knmp.id). Calon anggota harus memenuhi persyaratan: WNI minimal 17 tahun, memiliki usaha yang relevan dengan salah satu KPA, menyetujui AD/ART, dan membayar simpanan pokok.',
      },
      {
        question: 'Berapa biaya menjadi anggota?',
        answer: 'Biaya keanggotaan sesuai Pentagon Kedaulatan (ART Super Final v7): KPA-1 Produsen & Pekerja — Pokok Rp 100.000 + Wajib Rp 50.000/bulan; KPA-2 Konsumen Umum — Pokok Rp 100.000 + Wajib Rp 50.000/bulan; KPA-3 Abdi Negara & Pejabat Publik — Pokok Rp 250.000 + Wajib Rp 100.000/bulan; KPA-4 Entitas Bisnis & Pelaku Usaha — Pokok Rp 5.000.000 + Wajib Rp 1.000.000/bulan; KPA-5 Pemodal & Investor (Individu) — Pokok Rp 50.000.000 + Wajib Rp 1.000.000/bulan. Semua iuran dieksekusi via auto-deduct (Doktrin Invisible Dues).',
      },
      {
        question: 'Apa itu 5 KPA?',
        answer: '5 KPA (Pentagon Kedaulatan) adalah 5 Kelompok Pihak Anggota yang masing-masing memiliki 20% suara dalam RAT: KPA-1 Produsen & Pekerja, KPA-2 Konsumen Umum, KPA-3 Abdi Negara & Pejabat Publik, KPA-4 Entitas Bisnis & Pelaku Usaha, dan KPA-5 Pemodal & Investor. Struktur Pentagon Kedaulatan menjamin kesetaraan suara setiap kelompok dalam pengambilan keputusan.',
      },
    ],
  },
  {
    category: 'Transaksi & Keuangan',
    icon: Wallet,
    faqs: [
      {
        question: 'Bagaimana cara transaksi di marketplace?',
        answer: 'Anggota T3 ke atas dapat menjual produk di Marketplace Zonasi. Produk akan diverifikasi tim KNMP sebelum dipublikasikan. Pembayaran dapat dilakukan melalui JP3 Pay atau transfer bank.',
      },
      {
        question: 'Bagaimana pembagian SHU?',
        answer: 'SHU dibagikan berdasarkan partisipasi ekonomi anggota sesuai AD/ART KKMNMP/KNMP. Komposisi: 25% Dana Cadangan, 45% Jasa Usaha Anggota, 10% Jasa Modal, 10% Dana Riset & Teknologi, 5% Dana Sosial & Peradaban, dan 5% Insentif Manajemen. Pembagian dilakukan setelah RAT.',
      },
      {
        question: 'Kapan SHU dibagikan?',
        answer: 'SHU dibagikan setelah RAT tahunan yang diselenggarakan paling lambat 6 bulan setelah tahun buku berakhir. Anggota dapat melihat estimasi SHU secara real-time di dashboard member.',
      },
    ],
  },
  {
    category: 'Logistik',
    icon: Truck,
    faqs: [
      {
        question: 'Bagaimana cara menjadi agen logistik?',
        answer: 'Daftar melalui portal KNMP, pilih program Agen Logistik. Persyaratan: punya lokasi fisik, smartphone, KTP. Setelah training 10 jam dan aktivasi, Anda bisa mulai menerima paket.',
      },
      {
        question: 'Berapa komisi agen logistik?',
        answer: 'Komisi berkisar Rp 1.500 - 5.000 per paket tergantung ekspedisi dan tujuan. Rata-rata penghasilan agen dengan 10 paket/hari adalah Rp 600.000 - 1.500.000 per bulan.',
      },
    ],
  },
  {
    category: 'Keamanan & Legal',
    icon: Shield,
    faqs: [
      {
        question: 'Apa itu Kampung Modal?',
        answer: 'Kampung Modal adalah platform agregasi modal berlandaskan prinsip Ring-Fencing yang dikembangkan oleh KKMNMP/KNMP. Platform ini memungkinkan penghimpunan dana dari berbagai KPA untuk membiayai proyek-proyek strategis desa secara transparan, aman, dan terukur melalui mekanisme Pentagon Kedaulatan.',
      },
      {
        question: 'Bagaimana sistem Invisible Dues?',
        answer: 'Invisible Dues adalah sistem pemotongan otomatis iuran/simpanan wajib anggota melalui platform kopnusa.id dan JP3 Pay. Setiap transaksi ekonomi anggota akan secara otomatis memotong persentase simpanan wajib sesuai ketentuan ART, sehingga anggota tidak perlu melakukan pembayaran manual.',
      },
      {
        question: 'Siapa Arsitek Konstitusi?',
        answer: 'Arsitek Konstitusi KKMNMP/KNMP adalah Arif Rachman Hakim dan Gugun Gunara. Keduanya berstatus sebagai Organ Ekstra-Struktural yang bertugas merancang, menjaga, dan mengawal konsistensi konstitusi (AD/ART/Kode Etik) KKMNMP/KNMP Versi 7 Super Final.',
      },
      {
        question: 'Apa itu Poison Pill?',
        answer: 'Poison Pill (Aset Kedaulatan Tak Terasingkan) adalah aset-aset strategis KKMNMP/KNMP yang secara konstitusional tidak dapat dijual, digadaikan, dipindahtangankan, atau dialihkan kepada pihak mana pun. Mekanisme ini dirancang untuk melindungi kedaulatan koperasi dan keberlanjutan ekosistem Pentagon Kedaulatan.',
      },
      {
        question: 'Apakah KNMP terdaftar resmi?',
        answer: 'Ya, KNMP terdaftar sebagai badan hukum koperasi dengan Akta Notaris dan SK Kemenkop. Kami beroperasi sesuai UU 25/1992 tentang Perkoperasian dan Permenkop 8/2021 tentang Koperasi Multipihak. Konstitusi terbaru mengacu pada AD/ART/Kode Etik KKMNMP/KNMP Versi 7 Super Final.',
      },
      {
        question: 'Bagaimana keamanan data anggota?',
        answer: 'Data anggota dilindungi sesuai UU 27/2022 tentang Perlindungan Data Pribadi. Setiap transaksi terverifikasi blockchain. Data adalah milik anggota dan tidak akan dijual ke pihak ketiga.',
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <SearchSection query={searchQuery} setQuery={setSearchQuery} />
        <FAQAccordion data={faqData} searchQuery={searchQuery} />
        <ContactCTA />
      </div>
    </main>
  )
}

// =====================
// Hero Section
// =====================
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12 text-center"
    >
      <motion.div variants={fadeInUp}>
        <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4">
          <HelpCircle className="w-4 h-4 mr-2" />
          Pusat Bantuan
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Frequently Asked <span className="text-[#8B0000]">Questions</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Temukan jawaban untuk pertanyaan yang sering diajukan
      </motion.p>
    </motion.section>
  )
}

// =====================
// Search Section
// =====================
function SearchSection({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-8"
    >
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari pertanyaan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-12 bg-white border-purple-100 focus:border-[#8B0000]"
          />
        </div>
      </div>
    </motion.section>
  )
}

// =====================
// FAQ Accordion
// =====================
function FAQAccordion({ data, searchQuery }: { data: typeof faqData; searchQuery: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const filterFaqs = (faqs: typeof data[0]['faqs']) => {
    if (!searchQuery) return faqs
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <div className="space-y-8">
        {data.map((category, i) => {
          const filteredFaqs = filterFaqs(category.faqs)
          if (filteredFaqs.length === 0) return null

          return (
            <motion.div key={i} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-[#8B0000]" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{category.category}</h2>
              </div>

              <Card className="bg-white border border-purple-100">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, j) => (
                    <AccordionItem key={j} value={`item-${i}-${j}`} className="border-b border-purple-100 last:border-0">
                      <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 text-left font-medium text-foreground">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

// =====================
// Contact CTA
// =====================
function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="text-center"
    >
      <Card className="bg-gradient-to-br from-purple-100 to-white border border-purple-200 max-w-2xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Tidak menemukan jawaban?
          </h3>
          <p className="text-muted-foreground mb-6">
            Hubungi tim support kami untuk bantuan lebih lanjut
          </p>
          <Button className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
            Hubungi Support
          </Button>
        </CardContent>
      </Card>
    </motion.section>
  )
}
