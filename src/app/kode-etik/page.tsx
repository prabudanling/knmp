'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Shield, BookOpen, Scale, Users, Lock, ArrowLeft,
  ChevronRight, Eye, EyeOff, Gavel, Heart, AlertTriangle,
  ArrowUp, Menu, X, Handshake, MapPin, Landmark, Ban
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

interface PasalItem {
  nomor: string
  sumpah?: string
  teks?: string
  subs?: { ayat: string; isi: string }[]
  prinsip?: { nama: string; deskripsi: string }[]
  sanksi?: { tingkat: string; sanksi: string; keterangan: string }[]
}

interface BabItem {
  nomor: string
  judul: string
  pasalMulai: string
  pasalSelesai: string
  icon: React.ReactNode
  warna: string
  content: PasalItem[]
}

const babs: BabItem[] = [
  {
    nomor: 'I',
    judul: 'INTEGRITAS TATA KELOLA EKSEKUTIF (BAKORNAS)',
    pasalMulai: '1',
    pasalSelesai: '2',
    icon: <Shield className="w-5 h-5" />,
    warna: 'from-[#1a1a2e] to-[#16213e]',
    content: [
      {
        nomor: 'Pasal 1',
        teks: 'Sumpah Pelayanan Tanpa Ekstraksi',
        subs: [
          { ayat: '(1)', isi: 'Pengurus Eksekutif (Presiden, Sekjen, CFO, dan jajaran BAKORNAS) adalah pelayan sistem, bukan pemilik Koperasi.' },
          { ayat: '(2)', isi: 'Haram Hukumnya bagi Pengurus untuk memperkaya diri sendiri, keluarga, atau kroni melalui komisi gelap (kickback), manipulasi tender vendor, atau penyalahgunaan anggaran Koperasi.' }
        ]
      },
      {
        nomor: 'Pasal 2',
        teks: 'Resolusi Konflik Kepentingan (Conflict of Interest)',
        subs: [
          { ayat: '(1)', isi: 'Setiap Pengurus wajib mendeklarasikan secara tertulis segala bentuk potensi benturan kepentingan sebelum mengambil keputusan strategis.' },
          { ayat: '(2)', isi: 'Pengurus dilarang mengarahkan Koperasi untuk bertransaksi dengan perusahaan pribadi atau perusahaan keluarganya, kecuali telah diaudit dan disetujui melalui asas Arm\'s Length Principle (Kewajaran Harga Pasar) oleh Badan Pengawas.' }
        ]
      }
    ]
  },
  {
    nomor: 'II',
    judul: 'ETIKA INVESTASI & DOKTRIN ANTI-OLIGARKI (KPA-4 & KPA-5)',
    pasalMulai: '3',
    pasalSelesai: '4',
    icon: <Scale className="w-5 h-5" />,
    warna: 'from-[#0d1117] to-[#1a1f36]',
    content: [
      {
        nomor: 'Pasal 3',
        teks: 'Kepatuhan Modal Beradab (Sovereign Capital)',
        subs: [
          { ayat: '(1)', isi: 'Investor (KPA-5) dan Entitas Bisnis/Bandar (KPA-4) disambut dengan karpet merah sebagai motor penggerak ekonomi, namun mereka adalah tamu di rumah kedaulatan rakyat, bukan majikan yang bisa mendikte Koperasi.' },
          { ayat: '(2)', isi: 'Dilarang keras bagi KPA-5 untuk melakukan "Perjanjian Bawah Meja" (Side-Deals) dengan Pengurus untuk mendapatkan keistimewaan bunga, prioritas proyek, atau hak suara ganda yang melanggar asas One Member One Vote.' }
        ]
      },
      {
        nomor: 'Pasal 4',
        teks: 'Larangan Sabotase Finansial',
        subs: [
          { ayat: '(1)', isi: 'Setiap Investor dilarang melakukan manuver penarikan modal secara agresif tanpa pemberitahuan (Bank Rush) atau menyebarkan rumor negatif yang bertujuan untuk meruntuhkan valuasi Koperasi demi memicu pengambilalihan paksa (Hostile Takeover).' }
        ]
      }
    ]
  },
  {
    nomor: 'III',
    judul: 'ETIKA WALI AMANAT DATA (DATA FIDUCIARY OATH)',
    pasalMulai: '5',
    pasalSelesai: '5',
    icon: <Lock className="w-5 h-5" />,
    warna: 'from-[#1a1a2e] to-[#16213e]',
    content: [
      {
        nomor: 'Pasal 5',
        teks: 'Sumpah Kedaulatan Privasi',
        subs: [
          { ayat: '(1)', isi: 'Data anggota (identitas, transaksi, rekam jejak) adalah Aset Kedaulatan Tak Terasingkan.' },
          { ayat: '(2)', isi: 'Siapa pun (Pengurus, Admin IT, atau Korwil) yang terbukti mencuri, menjual, menyewakan, atau membocorkan Big Data KKMNMP kepada pihak ketiga (termasuk kepada broker data, pinjol, atau lembaga survei) akan dipecat secara tidak hormat dan dituntut secara pidana berdasarkan UU Pelindungan Data Pribadi (UU PDP).' }
        ]
      }
    ]
  },
  {
    nomor: 'IV',
    judul: 'ETIKA PANGLIMA TERITORIAL (KORWIL, KORDA, KORCAM, KORDES)',
    pasalMulai: '6',
    pasalSelesai: '7',
    icon: <MapPin className="w-5 h-5" />,
    warna: 'from-[#0d1117] to-[#1a1f36]',
    content: [
      {
        nomor: 'Pasal 6',
        teks: 'Pantangan Panglima Ekosistem',
        subs: [
          { ayat: '(1)', isi: 'Pemegang Lisensi Teritorial adalah perpanjangan tangan peradaban di daerah. Mereka diharamkan untuk:' },
          { ayat: '(2)', isi: 'a. Memonopoli harga beli hasil panen petani (KPA-1) di bawah standar kewajaran (Predatory Pricing).' },
          { ayat: '(3)', isi: 'b. Melakukan pungutan liar (Pungli) di luar sistem JP3 Pay kepada anggota di wilayahnya.' },
          { ayat: '(4)', isi: 'c. Bertindak sebagai "Raja Kecil" yang mengintimidasi anggota atau menahan distribusi logistik demi keuntungan sepihak.' }
        ]
      },
      {
        nomor: 'Pasal 7',
        teks: 'Kewajiban Literasi & Pembinaan',
        subs: [
          { ayat: '(1)', isi: 'Panglima Teritorial wajib mendidik dan membimbing KPA-1 dan KPA-2 tentang cara menggunakan teknologi ekosistem dengan penuh kesabaran, adab, dan penghormatan.' }
        ]
      }
    ]
  },
  {
    nomor: 'V',
    judul: 'FIREWALL POLITIK & ETIKA ABDI NEGARA (KPA-3)',
    pasalMulai: '8',
    pasalSelesai: '8',
    icon: <Ban className="w-5 h-5" />,
    warna: 'from-[#1a1a2e] to-[#16213e]',
    content: [
      {
        nomor: 'Pasal 8',
        teks: 'Sumpah Netralitas Ruang Koperasi',
        subs: [
          { ayat: '(1)', isi: 'Seluruh Anggota Legislatif, Pejabat Negara, atau Kader Partai yang tergabung dalam KPA-3 WAJIB meninggalkan jubah politiknya di luar ekosistem.' },
          { ayat: '(2)', isi: 'Pelanggaran Etik Berat akan dijatuhkan kepada siapa pun yang:' },
          { ayat: '(3)', isi: 'a. Memanfaatkan data Koperasi untuk blast SMS/WhatsApp kampanye.' },
          { ayat: '(4)', isi: 'b. Memaksa anggota (KPA-1/KPA-2) untuk memilih kandidat tertentu dengan ancaman akan mencabut akses keanggotaan/logistik.' },
          { ayat: '(5)', isi: 'c. Membawa atribut, bendera, atau yel-yel partai ke dalam Rapat Anggota KKMNMP/KNMP.' }
        ]
      }
    ]
  },
  {
    nomor: 'VI',
    judul: 'ETIKA ALIANSI STRATEGIS (HUBUNGAN DENGAN JE-P3 & MITRA)',
    pasalMulai: '9',
    pasalSelesai: '9',
    icon: <Handshake className="w-5 h-5" />,
    warna: 'from-[#0d1117] to-[#1a1f36]',
    content: [
      {
        nomor: 'Pasal 9',
        teks: 'Batas Kesucian Kelembagaan',
        subs: [
          { ayat: '(1)', isi: 'Meskipun KKMNMP/KNMP memiliki hubungan aliansi historis dan strategis dengan JE-P3 (Jaringan Ekosistem Pengusaha Persatuan Pembangunan), Koperasi ini tetaplah Entitas Berdaulat yang Independen.' },
          { ayat: '(2)', isi: 'Mitra strategis (termasuk pengurus JE-P3) dilarang mengintervensi atau menekan BAKORNAS dalam penentuan kebijakan kas, approval proyek Kampung Modal, atau distribusi Sisa Hasil Usaha (SHU). Seluruh kerja sama wajib tunduk pada Arm\'s Length Principle.' }
        ]
      }
    ]
  },
  {
    nomor: 'VII',
    judul: 'MAHKAMAH KEHORMATAN ETIK & SANKSI',
    pasalMulai: '10',
    pasalSelesai: '11',
    icon: <Gavel className="w-5 h-5" />,
    warna: 'from-[#8B0000] to-[#4a0000]',
    content: [
      {
        nomor: 'Pasal 10',
        teks: 'Pembentukan Mahkamah Etik',
        subs: [
          { ayat: '(1)', isi: 'Segala bentuk dugaan pelanggaran Kode Etik akan disidangkan oleh Mahkamah Kehormatan Etik Koperasi (MKEK) yang bersifat Ad-Hoc, dibentuk oleh Badan Pengawas.' },
          { ayat: '(2)', isi: 'Sidang MKEK bersifat tertutup demi menjaga kehormatan Koperasi di mata publik.' }
        ]
      },
      {
        nomor: 'Pasal 11',
        teks: 'Skala Sanksi Eksekutorial',
        subs: [
          { ayat: '(1)', isi: 'Pelanggaran terhadap Kode Etik akan dijatuhi sanksi progresif:' },
          { ayat: '(2)', isi: '1. Teguran Tertulis & Pembekuan Akses (Suspend) Sementara.' },
          { ayat: '(3)', isi: '2. Perampasan Hak Lisensi Teritorial (Hangusnya Proof of Stake bagi Korwil/Korda yang melanggar).' },
          { ayat: '(4)', isi: '3. Pemecatan Tidak Dengan Hormat dari jabatan Pengurus/Keanggotaan.' },
          { ayat: '(5)', isi: '4. Gugatan Pidana/Perdata melalui Badan Arbitrase (BANI) atau Aparat Penegak Hukum (khusus untuk kejahatan finansial dan pencurian data).' }
        ]
      }
    ]
  }
]

export default function KodeEtikPage() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Dramatic Dark Theme */}
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d0a0a] text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px)',
          }} />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-[#8B0000] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#008F3D] rounded-full blur-[150px] opacity-10" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            {/* Shield Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 1 }}
              className="mb-6 inline-block"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B0000] to-[#C41E3A] flex items-center justify-center shadow-2xl shadow-[#8B0000]/30">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 rounded-full border-2 border-[#FFD700]/30 animate-pulse" />
              </div>
            </motion.div>

            <Badge className="bg-[#8B0000] text-white border-[#8B0000] hover:bg-[#8B0000] mb-6 px-5 py-2 text-sm font-semibold tracking-wide">
              {isRevealed ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              {isRevealed ? 'Dokumen Terbuka' : 'Dokumen Rahasia (Confidential)'}
            </Badge>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
              KODE ETIK
              <br />
              <span className="text-[#FFD700]">KKMNMP/KNMP</span>
</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 mb-3 font-medium">
              Etika Peradaban — Pedoman Moral & Tata Tertib Koperasi Korporasi Multipihak Nusa Merah Putih
            </p>
            <p className="text-sm text-white/40 mb-8 max-w-2xl mx-auto">
              Sovereign Architecture Edition Super Final Versi 7 — Ditetapkan di Jakarta, 21 Maret 2026
            </p>

            {!isRevealed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Button
                  onClick={() => setIsRevealed(true)}
                  className="bg-[#8B0000] text-white hover:bg-[#A00000] font-bold text-base px-8 py-3 shadow-lg shadow-[#8B0000]/40 border border-[#C41E3A]/30"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Buka Kode Etik
                </Button>
                <p className="text-xs text-white/30 mt-3">Dokumen ini bersifat rahasia dan mengikat seluruh anggota</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mukadimah Etika Peradaban */}
            <section className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">
              <motion.div {...fadeInUp}>
                <Card className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border-[#8B0000]/30 shadow-2xl shadow-[#8B0000]/10">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#C41E3A] flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">MUKADIMAH ETIKA PERADABAN</h2>
                        <p className="text-xs text-[#FFD700] uppercase tracking-wider">Pernyataan Nilai-Nilai Dasar</p>
                      </div>
                    </div>
                    <div className="text-gray-300 leading-relaxed text-sm md:text-base space-y-3 border-l-2 border-[#8B0000]/50 pl-4">
                      <p className="italic text-gray-200 text-lg">
                        &ldquo;Kami tidak hanya membangun bisnis, kami sedang merajut kembali peradaban Nusantara. Oleh karena itu, setiap rupiah yang mengalir, setiap baris kode yang dieksekusi, dan setiap data yang disimpan di dalam ekosistem KKMNMP/KNMP adalah amanah suci yang tidak boleh dinodai oleh keserakahan, manipulasi oligarki, maupun pengkhianatan.&rdquo;
                      </p>
                      <p>
                        Kode Etik ini mengikat secara sakral seluruh komponen ekosistem: BAKORNAS sebagai pengelola eksekutif, Badan Pengawas sebagai penjaga integritas, Panglima Teritorial (Korwil, Korda, Korcam, Kordes) sebagai perpanjangan tangan peradaban di daerah, Investor dan Mitra Aliansi sebagai mitra strategis yang berdaulat setara, serta seluruh Anggota Koperasi sebagai tuan dari kedaulatan ini.
                      </p>
                      <p>
                        Pelanggaran terhadap Kode Etik bukan hanya pelanggaran terhadap aturan tertulis — ia adalah pengkhianatan terhadap amanah rakyat dan peradaban yang sedang kita rajut bersama.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 7 Ethical Principles - Commandment Cards */}
            <section className="container mx-auto px-4 lg:px-8 py-12">
              <motion.div {...fadeInUp} className="text-center mb-10">
                <Badge className="bg-[#8B0000]/10 text-[#8B0000] border-[#8B0000]/20 mb-4 px-4 py-1.5 text-xs font-bold">
                  7 PILAR ETIKA
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Prinsip-Prinsip Etika <span className="text-[#8B0000]">Peradaban</span>
                </h2>
                <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
                  Tujuh pilar etika yang menjadi fondasi moral seluruh aktivitas KKMNMP/KNMP
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
              >
                {[
                  { icon: <Shield className="w-6 h-6" />, judul: 'Integritas Mutlak', desc: 'Kejujuran tanpa kompromi dalam setiap tindakan dan keputusan' },
                  { icon: <Scale className="w-6 h-6" />, judul: 'Keadilan Radikal', desc: 'Kesetaraan suara dan perlakuan bagi seluruh anggota tanpa diskriminasi' },
                  { icon: <Lock className="w-6 h-6" />, judul: 'Kedaulatan Data', desc: 'Data anggota adalah milik anggota, dilindungi seumur hidup' },
                  { icon: <Landmark className="w-6 h-6" />, judul: 'Netralitas Politik', desc: 'Bebas dari campur tangan politik praktis dalam bentuk apapun' },
                  { icon: <Handshake className="w-6 h-6" />, judul: 'Aliansi Bermartabat', desc: 'Kerja sama setara tanpa subordinasi kepada pihak manapun' },
                  { icon: <Ban className="w-6 h-6" />, judul: 'Anti Oligarki', desc: 'Mencegah konsentrasi kekuasaan pada individu atau golongan tertentu' },
                  { icon: <Gavel className="w-6 h-6" />, judul: 'Akuntabilitas Penuh', desc: 'Setiap tindakan dapat dipertanggungjawabkan secara transparan' }
                ].map((pilar, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="bg-white border-gray-200 shadow-sm hover:shadow-lg hover:border-[#8B0000]/30 transition-all group h-full">
                      <CardContent className="p-5 text-center h-full flex flex-col items-center">
                        <div className="w-14 h-14 rounded-xl bg-[#8B0000]/5 group-hover:bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] mb-3 transition-colors">
                          {pilar.icon}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{pilar.judul}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{pilar.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Main Content with Side Navigation */}
              <div className="flex gap-8">
                {/* Mobile TOC Toggle */}
                <div className="lg:hidden fixed bottom-6 right-6 z-50">
                  <Button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="bg-[#8B0000] text-white hover:bg-[#A00000] rounded-full w-14 h-14 shadow-lg"
                    size="icon"
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </Button>
                </div>

                {/* Side Navigation */}
                <motion.aside
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${
                    mobileMenuOpen ? 'fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto' : 'hidden'
                  } lg:block lg:sticky lg:top-24 lg:w-72 lg:flex-shrink-0 lg:self-start lg:bg-transparent lg:pt-0 lg:px-0`}
                >
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-5">
                    <h3 className="text-sm font-bold text-[#8B0000] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Daftar Isi
                    </h3>
                    <nav className="space-y-1">
                      {babs.map((bab) => (
                        <a
                          key={bab.nomor}
                          href={`#bab-${bab.nomor}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#8B0000] hover:bg-[#8B0000]/5 rounded-lg transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] font-bold text-xs flex-shrink-0">
                            {bab.nomor}
                          </span>
                          <span className="line-clamp-2">{bab.judul}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </motion.aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                    {babs.map((bab) => (
                      <motion.div key={bab.nomor} id={`bab-${bab.nomor}`} variants={fadeInUp}>
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                          {/* BAB Header */}
                          <div className={`bg-gradient-to-r ${bab.warna} text-white px-5 py-4 md:px-6 md:py-5`}>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                {bab.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className="bg-[#FFD700] text-[#1a1a1a] border-[#FFD700] hover:bg-[#FFD700] text-xs font-bold">
                                    BAB {bab.nomor}
                                  </Badge>
                                  <span className="text-white/50 text-xs">
                                    Pasal {bab.pasalMulai}{bab.pasalMulai !== bab.pasalSelesai ? `–${bab.pasalSelesai}` : ''}
                                  </span>
                                </div>
                                <h2 className="text-lg md:text-xl font-bold mt-1">{bab.judul}</h2>
                              </div>
                            </div>
                          </div>

                          {/* PASAL Content */}
                          <CardContent className="p-0">
                            <Accordion type="multiple" className="w-full">
                              {bab.content.map((pasal) => (
                                <AccordionItem key={pasal.nomor} value={`${bab.nomor}-${pasal.nomor}`} className="px-5 md:px-6 border-b border-gray-100 last:border-b-0">
                                  <AccordionTrigger className="py-4 hover:no-underline">
                                    <div className="flex items-center gap-3 text-left">
                                      <Badge variant="outline" className="border-[#8B0000] text-[#8B0000] font-bold text-xs flex-shrink-0">
                                        {pasal.nomor}
                                      </Badge>
                                      {pasal.teks && (
                                        <span className="text-sm md:text-base font-medium text-gray-800 line-clamp-2">{pasal.teks}</span>
                                      )}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-4 text-sm md:text-base">
                                    {pasal.teks && <p className="text-gray-600 mb-4 font-medium">{pasal.teks}</p>}

                                    {/* Sumpah Box */}
                                    {pasal.sumpah && (
                                      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d0a0a] rounded-xl p-5 border border-[#8B0000]/30 mb-4">
                                        <div className="flex items-start gap-3">
                                          <div className="w-8 h-8 rounded-full bg-[#8B0000] flex items-center justify-center flex-shrink-0 mt-1">
                                            <BookOpen className="w-4 h-4 text-white" />
                                          </div>
                                          <div>
                                            <p className="text-xs uppercase tracking-wider text-[#FFD700] font-bold mb-2">Sumpah</p>
                                            <p className="text-gray-200 italic leading-relaxed text-sm">{pasal.sumpah}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Sanksi Table */}
                                    {pasal.sanksi && (
                                      <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                          <Gavel className="w-5 h-5 text-[#8B0000]" />
                                          <h4 className="font-bold text-gray-900">Skala Sanksi</h4>
                                        </div>
                                        {pasal.sanksi.map((s, i) => (
                                          <div
                                            key={i}
                                            className={`flex items-start gap-3 rounded-lg p-4 border ${
                                              i === pasal.sanksi.length - 1
                                                ? 'bg-[#8B0000]/5 border-[#8B0000]/20'
                                                : 'bg-gray-50 border-gray-100'
                                            }`}
                                          >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white ${
                                              i === 0 ? 'bg-amber-500' :
                                              i === 1 ? 'bg-orange-500' :
                                              i === 2 ? 'bg-red-500' :
                                              i === 3 ? 'bg-red-700' :
                                              'bg-[#1a1a1a]'
                                            }`}>
                                              {s.tingkat.split(' ')[1]}
                                            </div>
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant="outline" className="border-gray-300 text-gray-600 text-xs">
                                                  {s.tingkat}
                                                </Badge>
                                                <span className="font-bold text-gray-900 text-sm">{s.sanksi}</span>
                                              </div>
                                              <p className="text-gray-600 text-xs mt-1">{s.keterangan}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Subs */}
                                    {pasal.subs && (
                                      <div className="space-y-3">
                                        {pasal.subs.map((s, i) => (
                                          <div key={i} className="flex items-start gap-3 text-gray-700 pl-2 border-l-2 border-[#8B0000]/20">
                                            <span className="font-bold text-[#8B0000] flex-shrink-0">{s.ayat}</span>
                                            <span>{s.isi}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Footer CTA */}
                  <motion.div {...fadeInUp} className="mt-12">
                    <Card className="bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d0a0a] text-white overflow-hidden">
                      <CardContent className="p-6 md:p-8 text-center">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Etika adalah Fondasi Peradaban</h3>
                        <p className="text-white/60 mb-6 max-w-xl mx-auto text-sm md:text-base">
                          Kode Etik ini merupakan jaminan bahwa KKMNMP/KNMP akan selalu berjalan di atas
                          jalur kebenaran, keadilan, dan kedaulatan. Pelanggaran etika adalah pengkhianatan
                          terhadap kepercayaan seluruh rakyat Indonesia.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Link href="/anggaran-dasar">
                            <Button className="bg-[#FFD700] text-[#1a1a1a] hover:bg-[#FFC700] font-semibold">
                              Lihat Anggaran Dasar &rarr;
                            </Button>
                          </Link>
                          <Link href="/anggaran-rumah-tangga">
                            <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold">
                              Lihat ART &rarr;
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Back Button */}
                  <div className="mt-8 text-center">
                    <Link href="/">
                      <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Beranda
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Scroll to Top */}
            <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-[#8B0000] text-white hover:bg-[#A00000] rounded-full w-12 h-12 shadow-lg"
                size="icon"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
