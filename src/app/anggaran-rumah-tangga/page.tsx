'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, Shield, Scale, Users, Building2, Lock,
  ArrowLeft, ChevronRight, Eye, EyeOff, FileSignature,
  Globe, Database, Award, AlertTriangle, Gavel,
  ArrowUp, Menu, X, Wallet, CreditCard, MapPin,
  BarChart3, Target, Settings
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

interface PasalItem {
  nomor: string
  ayat?: string[]
  subs?: { ayat: string; isi: string }[]
  tabel?: { kolom: string[]; baris: { kategori: string; pokok: string; wajib: string; catatan?: string }[] }
  tabelPoS?: { kolom: string[]; baris: { level: string; total: string; rincian: string; catatan?: string }[] }
  teks?: string
  prinsip?: { nama: string; deskripsi: string }[]
}

interface BabItem {
  nomor: string
  judul: string
  pasalMulai: string
  pasalSelesai: string
  icon: React.ReactNode
  content: PasalItem[]
}

const babs: BabItem[] = [
  {
    nomor: 'I',
    judul: 'KEDUDUKAN ART',
    pasalMulai: '1',
    pasalSelesai: '1',
    icon: <BookOpen className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 1',
        teks: 'Kedudukan ART',
        subs: [
          { ayat: '(1)', isi: 'ART ini merupakan turunan operasional mutlak dan satu kesatuan yang tidak terpisahkan dari Anggaran Dasar (AD) KKMNMP/KNMP Super Final Versi 7.' },
          { ayat: '(2)', isi: 'ART ini adalah panduan eksekusi matematis, SOP kepangkatan teritorial, dan protokol keselamatan bagi Arsitek Konstitusi. Dalam hal terdapat perbedaan penafsiran, maka teks pada Anggaran Dasar adalah yang tertinggi.' }
        ]
      }
    ]
  },
  {
    nomor: 'II',
    judul: 'ARSITEKTUR FINANSIAL',
    pasalMulai: '2',
    pasalSelesai: '3',
    icon: <Wallet className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 2',
        teks: 'Doktrin Pungutan Tak Terlihat:',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP/KNMP menetapkan nominal wajib untuk menghimpun Cashflow Raksasa, namun mengharamkan metode penagihan manual (door-to-door) yang merendahkan martabat anggota.' },
          { ayat: '(2)', isi: 'Koperasi mengeksekusi sistem Invisible Dues melalui arsitektur pemotongan otomatis (auto-deduct) di platform kopnusa.id dan dompet digital JP3 Pay.' }
        ]
      },
      {
        nomor: 'Pasal 3',
        teks: 'Parameter Finansial Pentagon Kedaulatan (KPA 1-5):',
        tabel: {
          kolom: ['KPA', 'Simpanan Pokok', 'Simpanan Wajib/Bulan', 'Metode Pembayaran'],
          baris: [
            { kategori: 'KPA-1\nProdusen & Pekerja\n(Petani, Nelayan, Peternak, Agen)', pokok: 'Rp 100.000', wajib: 'Rp 50.000', catatan: 'Dikonversi sebagian jadi saldo awal JP3 Pay' },
            { kategori: 'KPA-2\nKonsumen Umum', pokok: 'Rp 100.000', wajib: 'Rp 50.000', catatan: 'Dipotong otomatis dari sisa kembalian belanja/cashback Marketplace/JP3 Pay' },
            { kategori: 'KPA-3\nAbdi Negara & Pejabat Publik\n(PNS/TNI/POLRI/ASN/Legislatif)', pokok: 'Rp 250.000', wajib: 'Rp 100.000', catatan: 'Auto-debet dari rekening gaji instansi' },
            { kategori: 'KPA-4\nEntitas Bisnis & Pelaku Usaha\n(Trader/Bandar/PT/CV/BUMDes)', pokok: 'Rp 5.000.000', wajib: 'Rp 1.000.000', catatan: 'Biaya langganan operasional & akses VIP Dashboard B2B' },
            { kategori: 'KPA-5 Individu\nPemodal Angel Investor', pokok: 'Rp 50.000.000', wajib: 'Rp 1.000.000', catatan: 'Dividen Deduction, dipotong dari SHU' },
            { kategori: 'KPA-5 Institusi\nPemodal Korporasi (Venture/Bank)', pokok: 'Rp 250.000.000', wajib: 'Rp 1.000.000', catatan: 'Dividen Deduction, dipotong dari SHU' }
          ]
        }
      }
    ]
  },
  {
    nomor: 'III',
    judul: 'LISENSI TERITORIAL',
    pasalMulai: '4',
    pasalSelesai: '5',
    icon: <MapPin className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 4',
        teks: 'Doktrin Lisensi Kepangkatan:',
        subs: [
          { ayat: '(1)', isi: 'Kepangkatan Korwil, Korda, Korcam, dan Kordes BUKANLAH jabatan politik yang bisa disogok, melainkan Lisensi Kemitraan Ekosistem (Franchise Teritorial) yang mewajibkan penyetoran modal kerja nyata (Proof of Stake).' }
        ]
      },
      {
        nomor: 'Pasal 5',
        teks: 'Rincian Nilai Proof of Stake (3 Keranjang Akuntansi):',
        subs: [
          { ayat: '(1)', isi: 'Dana wajib dipecah ke 3 keranjang: (1) Simpanan Pokok Elit, (2) Biaya Lisensi & Sistem, (3) Deposit Saldo Kerja.' }
        ],
        tabelPoS: {
          kolom: ['Level', 'Total Investasi', 'Rincian Komponen', 'Catatan'],
          baris: [
            {
              level: 'Kordes\n(Koordinator Desa)',
              total: 'Rp 500.000',
              rincian: 'Rp 100.000 (Pokok)\n+ Rp 150.000 (Lisensi Agen Logistik/Rompi/Seragam/Modul Akademi)\n+ Rp 250.000 (Saldo Deposit Kerja JP3 Pay)',
              catatan: 'Lisensi desa digital'
            },
            {
              level: 'Korcam\n(Koordinator Kecamatan)',
              total: 'Rp 2.500.000',
              rincian: 'Rp 250.000 (Pokok)\n+ Rp 750.000 (Lisensi Agregator Kecamatan & Dashboard Data Level 1)\n+ Rp 1.500.000 (Saldo Deposit Kerja Logistik/PPOB)',
              catatan: 'Koordinasi multi-desa'
            },
            {
              level: 'Korda\n(Koordinator Kab/Kota)',
              total: 'Rp 10.000.000',
              rincian: 'Rp 1.000.000 (Pokok)\n+ Rp 3.000.000 (Hak Eksklusif Hub Logistik Kabupaten & Akses VIP Level 2)\n+ Rp 6.000.000 (Modal Deposit Kerja / Buffer logistik kabupaten)',
              catatan: 'Pengelolaan area kab/kota'
            },
            {
              level: 'Korwil\n(Koordinator Wilayah/Provinsi)',
              total: 'Rp 50.000.000',
              rincian: 'Rp 5.000.000 (Pokok Elit)\n+ Rp 15.000.000 (Lisensi Monopoli Hub Provinsi & Dashboard Big Data)\n+ Rp 30.000.000 (Dikunci statusnya sebagai Modal Penyertaan/Saham di Proyek Kampung Modal provinsinya sendiri)',
              catatan: 'Partnership strategis wilayah'
            }
          ]
        }
      }
    ]
  },
  {
    nomor: 'IV',
    judul: 'TATA KELOLA, DEMOKRASI, DAN ARSITEKTUR FINANSIAL KPA-5 (PEMODAL/INVESTOR)',
    pasalMulai: '6',
    pasalSelesai: '9',
    icon: <CreditCard className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 6',
        teks: 'Doktrin Demokrasi KPA-5 (One Member One Vote):',
        subs: [
          { ayat: '(1)', isi: 'Meskipun KPA-5 memiliki bobot suara 20% secara kolektif di RAP, dinamika demokrasi INTERNAL mereka di RAK KPA-5 dikunci dengan prinsip One Member One Vote — hak suara mutlak didasarkan pada jumlah entitas kepala/institusi, BUKAN pada persentase besaran modal.' },
          { ayat: '(2)', isi: 'Mekanisme ini dirancang untuk mencegah dominasi modal dalam pengambilan keputusan kolektif dan menjaga integritas prinsip Pentagon Kedaulatan.' }
        ]
      },
      {
        nomor: 'Pasal 7',
        teks: 'Doktrin Anti-Oligarki:',
        subs: [
          { ayat: '(1)', isi: 'Meskipun KPA-5 memiliki bobot suara 20% secara kolektif di RAP, dinamika demokrasi INTERNAL mereka di RAK KPA-5 dikunci dengan Doktrin Anti-Oligarki.' },
          { ayat: '(2)', isi: 'One Member One Vote: Hak suara pada voting di RAK KPA-5 mutlak didasarkan pada jumlah entitas kepala/institusi, BUKAN pada persentase besaran modal.' },
          { ayat: '(3)', isi: 'Segala bentuk perjanjian sampingan (side-agreement) di luar konstitusi yang bertujuan mengalihkan, menyewakan, atau memborong hak suara anggota KPA-5 dinyatakan Batal Demi Hukum.' }
        ]
      },
      {
        nomor: 'Pasal 8',
        teks: 'Protokol Integritas Dana (KYC & Anti-Pencucian Uang):',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP/KNMP mengharamkan masuknya uang hasil kejahatan. Seluruh calon anggota KPA-5 wajib melewati protokol KYC dan uji kelayakan AML.' },
          { ayat: '(2)', isi: 'BAKORNAS dan Arsitek Konstitusi berhak penuh menolak pendaftaran atau memecat secara sepihak anggota KPA-5 yang terbukti dana investasinya bersumber dari korupsi, pendanaan terorisme, narkotika, dll. Simpanan Pokoknya akan dikembalikan dengan dipotong biaya risiko.' }
        ]
      },
      {
        nomor: 'Pasal 9',
        teks: 'Exit Strategy & Doktrin Sabuk Pengaman Kas (Lock-up Period):',
        subs: [
          { ayat: '(1)', isi: 'KKMNMP bukanlah bursa saham publik. Lock-up Period: Simpanan Pokok dan penyertaan modal spesifik pada proyek Kampung Modal dikunci minimal 24 bulan.' },
          { ayat: '(2)', isi: 'Notice of Withdrawal: 6 bulan sebelum tanggal penarikan.' },
          { ayat: '(3)', isi: 'Pengurus berhak melakukan pencairan secara bertahap (termin) apabila penarikan tunai sekaligus dinilai dapat membahayakan rasio kecukupan modal (Capital Adequacy Ratio).' }
        ]
      }
    ]
  },
  {
    nomor: 'V',
    judul: 'MANAJEMEN RISIKO',
    pasalMulai: '10',
    pasalSelesai: '10',
    icon: <AlertTriangle className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 10',
        teks: 'Protokol Escrow Mutlak & Anti-Bank Rush:',
        subs: [
          { ayat: '(1)', isi: 'Dana agregasi investasi dari masyarakat atau KPA-5 melalui platform Kampung Modal diharamkan masuk ke rekening operasional BAKORNAS.' },
          { ayat: '(2)', isi: 'Dana wajib disalurkan ke Escrow Account yang diawasi bank kustodian nasional atau Smart Contract.' },
          { ayat: '(3)', isi: 'Pencairan dana dilakukan bertahap (termin) berdasarkan progres lapangan (Proof of Work) yang diverifikasi oleh sistem.' }
        ]
      }
    ]
  },
  {
    nomor: 'VI',
    judul: 'KPI PENGURUS',
    pasalMulai: '11',
    pasalSelesai: '11',
    icon: <Target className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 11',
        teks: 'Hard-Cap KPI & Mekanisme Insentif Manajemen:',
        subs: [
          { ayat: '(1)', isi: 'Seluruh anggota Pengurus wajib memenuhi Hard-Cap KPI yang ditetapkan oleh RAP sebagai syarat penerimaan insentif manajemen (5% dari SHU sesuai AD Pasal 21).' },
          { ayat: '(2)', isi: 'Hard-Cap KPI meliputi: (a) Pertumbuhan minimum 15% per tahun pada seluruh indikator utama; (b) Zero Fraud — tidak boleh ada kasus fraud atau penyalahgunaan wewenang; (c) WTP Audit — opini audit Wajar Tanpa Pengecualian dari auditor independen.' },
          { ayat: '(3)', isi: 'Bonus insentif 5% yang diterima oleh Pengurus di-bekukan (escrowed) selama 2 (dua) tahun setelah masa jabatan berakhir.' },
          { ayat: '(4)', isi: 'Apabila dalam masa eskrow ditemukan pelanggaran atau KPI yang tidak terpenuhi, seluruh bonus yang dibekukan dirampas dan dialihkan ke Dana Cadangan.' },
          { ayat: '(5)', isi: 'KPI dievaluasi setiap triwulan oleh Badan Pengawas dan dilaporkan kepada RAP setiap tahun.' }
        ]
      }
    ]
  },
  {
    nomor: 'VII',
    judul: 'PENUTUP',
    pasalMulai: '12',
    pasalSelesai: '13',
    icon: <Settings className="w-5 h-5" />,
    content: [
      {
        nomor: 'Pasal 12',
        teks: 'Klausul Masa Transisi Digital (Pre-JP3 Pay):',
        subs: [
          { ayat: '(1)', isi: 'Selama platform dompet digital JP3 Pay masih dalam tahap coding dan belum beroperasi penuh, sistem auto-deduct ditangguhkan.' },
          { ayat: '(2)', isi: 'Seluruh penyetoran dana dilakukan secara manual murni melalui Transfer Bank ke Rekening Escrow Koperasi KKMNMP.' },
          { ayat: '(3)', isi: 'Tanda terima transfer manual yang divalidasi oleh Divisi Keuangan sah berfungsi sebagai verifikasi hak politik anggota di RAK. Dilarang keras transfer ke rekening pribadi Pengurus maupun Arsitek Konstitusi.' }
        ]
      },
      {
        nomor: 'Pasal 13',
        teks: 'Penutup Anggaran Rumah Tangga:',
        subs: [
          { ayat: '(1)', isi: 'Anggaran Rumah Tangga ini merupakan bagian yang tidak terpisahkan dari Anggaran Dasar KKMNMP/KNMP.' },
          { ayat: '(2)', isi: 'Hal-hal yang belum cukup diatur dalam ART ini akan diatur melalui Peraturan Internal yang ditetapkan oleh Pengurus.' },
          { ayat: '(3)', isi: 'ART ini berlaku efektif sejak tanggal ditetapkan dan disahkan di Jakarta pada tanggal 21 Maret 2026.' }
        ]
      }
    ]
  }
]

export default function AnggaranRumahTanggaPage() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#8B0000] via-[#A00000] to-[#C41E3A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <Badge className="bg-[#008F3D] text-white border-[#008F3D] hover:bg-[#008F3D] mb-6 px-5 py-2 text-sm font-semibold tracking-wide">
              {isRevealed ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              {isRevealed ? 'Dokumen Terbuka' : 'Dokumen Rahasia (Confidential)'}
            </Badge>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
              ANGGARAN RUMAH TANGGA
              <br />
              <span className="text-[#FFD700]">KKMNMP/KNMP</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-3 font-medium">
              Penjabaran Teknis Anggaran Dasar Koperasi Korporasi Multipihak Nusa Merah Putih
            </p>
            <p className="text-sm text-white/60 mb-8 max-w-2xl mx-auto">
              Sovereign Architecture Edition Super Final Versi 7 — Ditetapkan di Jakarta, 21 Maret 2026
            </p>

            {!isRevealed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  onClick={() => setIsRevealed(true)}
                  className="bg-[#FFD700] text-[#8B0000] hover:bg-[#FFC700] font-bold text-base px-8 py-3 shadow-lg shadow-[#FFD700]/20"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Buka Dokumen Rahasia
                </Button>
                <p className="text-xs text-white/40 mt-3">Dokumen ini bersifat rahasia dan hanya untuk anggota</p>
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
            {/* Quick Stats */}
            <section className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">
              <motion.div {...fadeInUp}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { label: 'Total BAB', value: '7', icon: <BookOpen className="w-5 h-5" /> },
                    { label: 'Total Pasal', value: '13', icon: <FileSignature className="w-5 h-5" /> },
                    { label: 'KPA Teregulasi', value: '5', icon: <Users className="w-5 h-5" /> },
                    { label: 'Level Teritorial', value: '4', icon: <MapPin className="w-5 h-5" /> }
                  ].map((stat, i) => (
                    <Card key={i} className="bg-white border-gray-200 shadow-lg">
                      <CardContent className="p-4 text-center">
                        <div className="flex justify-center mb-2 text-[#8B0000]">{stat.icon}</div>
                        <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 lg:px-8 py-12">
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
                          <div className="bg-gradient-to-r from-[#8B0000] to-[#C41E3A] text-white px-5 py-4 md:px-6 md:py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                {bab.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className="bg-[#FFD700] text-[#8B0000] border-[#FFD700] hover:bg-[#FFD700] text-xs font-bold">
                                    BAB {bab.nomor}
                                  </Badge>
                                  <span className="text-white/60 text-xs">
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

                                    {/* Iuran Table */}
                                    {pasal.tabel && (
                                      <div className="mb-4 overflow-x-auto">
                                        <div className="rounded-lg border border-gray-200 overflow-hidden">
                                          <Table>
                                            <TableHeader>
                                              <TableRow className="bg-[#8B0000] hover:bg-[#8B0000]">
                                                <TableHead className="text-white font-semibold text-xs">KPA</TableHead>
                                                <TableHead className="text-white font-semibold text-xs text-center">Simpanan Pokok</TableHead>
                                                <TableHead className="text-white font-semibold text-xs text-center">Wajib/Bulan</TableHead>
                                                <TableHead className="text-white font-semibold text-xs">Metode</TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {pasal.tabel.baris.map((row, i) => (
                                                <TableRow key={i}>
                                                  <TableCell className="font-medium text-xs">
                                                    {row.kategori.split('\n').map((line, j) => (
                                                      <span key={j}>
                                                        {j > 0 && <br />}
                                                        {line}
                                                      </span>
                                                    ))}
                                                  </TableCell>
                                                  <TableCell className="text-center text-xs font-mono font-bold text-[#8B0000]">{row.pokok}</TableCell>
                                                  <TableCell className="text-center text-xs font-mono font-bold text-[#8B0000]">{row.wajib}</TableCell>
                                                  <TableCell className="text-xs text-gray-500">{row.catatan}</TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                        </div>
                                      </div>
                                    )}

                                    {/* PoS Table */}
                                    {pasal.tabelPoS && (
                                      <div className="mb-4 overflow-x-auto">
                                        <div className="rounded-lg border border-gray-200 overflow-hidden">
                                          <Table>
                                            <TableHeader>
                                              <TableRow className="bg-[#004D21] hover:bg-[#004D21]">
                                                <TableHead className="text-white font-semibold text-xs">Level</TableHead>
                                                <TableHead className="text-white font-semibold text-xs text-center">Total</TableHead>
                                                <TableHead className="text-white font-semibold text-xs">Rincian</TableHead>
                                                <TableHead className="text-white font-semibold text-xs">Catatan</TableHead>
                                              </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                              {pasal.tabelPoS.baris.map((row, i) => (
                                                <TableRow key={i}>
                                                  <TableCell className="font-medium text-xs">
                                                    {row.level.split('\n').map((line, j) => (
                                                      <span key={j}>
                                                        {j > 0 && <br />}
                                                        {line}
                                                      </span>
                                                    ))}
                                                  </TableCell>
                                                  <TableCell className="text-center text-xs font-mono font-bold text-[#004D21]">{row.total}</TableCell>
                                                  <TableCell className="text-xs whitespace-pre-line text-gray-700">{row.rincian}</TableCell>
                                                  <TableCell className="text-xs text-gray-500">{row.catatan}</TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                        </div>
                                      </div>
                                    )}

                                    {/* Ayat */}
                                    {pasal.ayat && (
                                      <ol className="space-y-2">
                                        {pasal.ayat.map((a, i) => (
                                          <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <ChevronRight className="w-4 h-4 text-[#8B0000] mt-1 flex-shrink-0" />
                                            <span>{a}</span>
                                          </li>
                                        ))}
                                      </ol>
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
                    <Card className="bg-gradient-to-r from-[#008F3D] to-[#004D21] text-white overflow-hidden">
                      <CardContent className="p-6 md:p-8 text-center">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-white/80" />
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Dokumen Pelengkap</h3>
                        <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm md:text-base">
                          ART merupakan penjabaran teknis dari Anggaran Dasar KKMNMP. Kedua dokumen ini
                          harus dibaca secara bersamaan untuk pemahaman yang utuh.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Link href="/anggaran-dasar">
                            <Button className="bg-white text-[#008F3D] hover:bg-gray-100 font-semibold">
                              Lihat Anggaran Dasar &rarr;
                            </Button>
                          </Link>
                          <Link href="/kode-etik">
                            <Button className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold">
                              Lihat Kode Etik &rarr;
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
