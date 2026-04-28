'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowRight, BadgeDollarSign, Banknote, ChevronRight, Clock, Coins, Cpu, CreditCard, Droplets, Flower2, Globe2, GraduationCap, HandCoins, Handshake, Heart, HeartHandshake, Home, Home as HomeIcon, LandPlot, Landmark, Laptop, Leaf, PiggyBank, Recycle, Scale, Shield, ShieldCheck, Sprout, Target, TrendingUp, Truck, Truck as TruckIcon, Umbrella, Users, Wallet, Warehouse, Wheat } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const siblingPages = [
  { label: 'Kampung Industri', href: '/nusa-futuristik/provinsi/kawasan-industri-terpadu', icon: Warehouse, color: '#8B0000' },
  { label: 'Kampung Pangan', href: '/nusa-futuristik/provinsi/kawasan-pangan-terpadu', icon: Wheat, color: '#16a34a' },
  { label: 'Kampung Sehat', href: '/nusa-futuristik/provinsi/wisata-terpadu', icon: Heart, color: '#dc2626' },
  { label: 'Kampung Cerdas', href: '/nusa-futuristik/provinsi/proyek-strategis', icon: GraduationCap, color: '#7c3aed' },
  { label: 'Kampung Niaga', href: '/nusa-futuristik/provinsi/transportasi-digital', icon: Truck, color: '#0d9488' },
  { label: 'Kampung Digital', href: '/nusa-futuristik/provinsi/proyek-strategis', icon: Laptop, color: '#3b82f6' },
  { label: 'Kampung Hijau', href: '/nusa-futuristik/provinsi/proyek-strategis', icon: Flower2, color: '#059669' },
  { label: 'Kampung Wisata', href: '/nusa-futuristik/provinsi/rumah-produktif', icon: Home, color: '#92400e' },
]

interface Program {
  number: number
  title: string
  subtitle: string
  description: string
  badges: string[]
}

interface Klaster {
  number: number
  name: string
  emoji: string
  color: string
  colorLight: string
  focus: string
  programs: Program[]
}

const klasterData: Klaster[] = [
  {
    number: 1,
    name: 'FONDASI TRANSAKSI & AKUMULASI',
    emoji: '🏛️',
    color: '#3b82f6',
    colorLight: '#3b82f6',
    focus: 'Securing cash flow, digitizing daily transactions, frictionless system — Basic Banking & Escrow',
    programs: [
      {
        number: 1,
        title: 'NB Pay',
        subtitle: 'Sistem Saraf Pembayaran Ekosistem',
        description: 'Digital wallet dengan doktrin Invisible Dues — auto-deduct dari hasil panen, komisi logistik, atau kembalian belanja. Terhubung dengan bank mitra (BRI, Mandiri) untuk cash-in/cash-out di level RT. Setiap transaksi mengalir tanpa gesekan, mengamankan cash flow ekosistem dari akar rumput.',
        badges: ['Invisible Dues', 'Cash-in/Cash-out RT', 'Bank Partner BRI & Mandiri']
      },
      {
        number: 2,
        title: 'Simpanan Syariah Terintegrasi',
        subtitle: 'Fondasi Kapital Bebas Riba',
        description: 'Fondasi kapital yang bebas dari riba, gharar, maysir. Terdiri dari Simpanan Pokok (syarat keanggotaan), Simpanan Wajib (otomatis bulanan), dan Simpanan Sukarela dengan profit-sharing dari ekosistem. Setiap rupiah tersimpan menghasilkan berkah yang terukur dan halal.',
        badges: ['Bebas Riba', 'Profit-Sharing', 'Simpanan Pokok & Wajib']
      },
      {
        number: 3,
        title: 'Smart Contract Escrow Service',
        subtitle: 'Rekening Bersama B2B',
        description: 'Blockchain-based automatic fund disbursement. Ketika Desa A menjual 10 ton beras ke Desa B, dana pembeli ditahan di escrow — hanya dilepas saat IoT Logistics mengkonfirmasi pengiriman aman. Zero trust, zero friction, zero dispute.',
        badges: ['Blockchain', 'IoT Logistics Confirm', 'Zero Dispute']
      },
      {
        number: 4,
        title: 'Tabungan Pendidikan Cerdas',
        subtitle: 'Edu-Save — Sinkronisasi Adikara Vidya',
        description: 'Tabungan berjangka yang disinkronkan dengan Adikara Vidya — auto-deduct dari hasil panen untuk sertifikasi anak atau universitas di NB Academy. Setiap musim panen menabung untuk masa depan anak, tanpa sakit, tanpa lupa.',
        badges: ['Auto-Deduct Panen', 'Adikara Vidya Sync', 'NB Academy']
      }
    ]
  },
  {
    number: 2,
    name: 'INJEKSI KAPITAL MIKRO & MENENGAH',
    emoji: '🚀',
    color: '#f59e0b',
    colorLight: '#f59e0b',
    focus: 'Fuel for homes and UMKM to transform into mini factories and producers — Credit & Scaling',
    programs: [
      {
        number: 5,
        title: 'Fasilitasi KUR Presisi',
        subtitle: 'Channeling Agent Perbankan',
        description: 'Menjadi channeling agent untuk bank — alternative credit scoring dari data transaksi NB Pay. KUR disetujui dalam hitungan hari dengan rekomendasi Kepala Kampung. Tidak lagi agunan properti, tapi agunan reputasi dan riwayat transaksi digital.',
        badges: ['Alternative Credit Scoring', 'KUR Days Approval', 'Rekomendasi Kepala Kampung']
      },
      {
        number: 6,
        title: 'Dana Bergulir Qardhul Hasan Revolving',
        subtitle: 'QRV — Kapital Bergulir Tanpa Bunga',
        description: 'Interest-free revolving capital. Ketika peminjam mengembalikan dana, dana tersebut langsung berpindah ke peminjam berikutnya dalam hitungan milidetik. Uang tidak pernah diam — terus bergulir, terus memberi manfaat, tanpa beban bunga.',
        badges: ['0% Bunga', 'Milisecond Transfer', 'Perpetual Revolving']
      },
      {
        number: 7,
        title: 'Pembiayaan Rantai Pasok',
        subtitle: 'Supply Chain / Invoice Financing',
        description: 'Sharia invoice factoring. UMKM mendapat kas instan ketika pesanan besar memiliki pembayaran tertunda (misal 3 bulan dari KPA-3). Faktur menjadi aset cair — tidak perlu menunggu, tidak perlu kehilangan momentum produksi.',
        badges: ['Sharia Invoice', 'Instant Cash', 'KPA-3 Integrated']
      },
      {
        number: 8,
        title: 'KPR-P',
        subtitle: 'Kredit Pemilikan Rumah Produktif',
        description: '"Setiap Rumah = Unit Produksi". Pembiayaan untuk mengubah garasi menjadi produksi standar HACCP (Krada), kamar kosong menjadi Homestay (Ramya), atau ruang tamu menjadi Mini Apotek (Roga). Rumah bukan tempat tidur — rumah adalah pabrik kecil.',
        badges: ['Rumah = Pabrik', 'HACCP Standard', 'Krada/Ramya/Roga']
      }
    ]
  },
  {
    number: 3,
    name: 'INVESTASI KOMUNITAS & SKALA GLOBAL',
    emoji: '🌍',
    color: '#8b5cf6',
    colorLight: '#8b5cf6',
    focus: 'Mass fundraising and protecting village sovereignty from oligarchy — Capital Market',
    programs: [
      {
        number: 9,
        title: 'Platform Crowdfunding',
        subtitle: 'Urun Dana Desa',
        description: 'Warga desa mengumpulkan dana (mulai Rp 50.000) untuk proyek kapital seperti penggilingan padi industri atau Cold Storage. Kepemilikan proporsional — setiap orang jadi pemilik, bukan penyewa. Demokrasi kapital di tingkat akar rumput.',
        badges: ['Mulai Rp 50.000', 'Kepemilikan Proporsional', 'Cold Storage & Rice Mill']
      },
      {
        number: 10,
        title: 'Bursa Saham Desa',
        subtitle: 'Micro-Secondary Market',
        description: 'Ketika proyek crowdfunding berhasil dan menghasilkan dividen tinggi, pemegang saham bisa menjual "saham komunal" ke warga lain via NB Pay — menciptakan likuiditas sekunder internal. Pasar modal desa, oleh desa, untuk desa.',
        badges: ['Saham Komunal', 'NB Pay Trading', 'Likuiditas Sekunder']
      },
      {
        number: 11,
        title: 'NB Investor Network',
        subtitle: 'Skala Ventura',
        description: 'Pintu masuk untuk Angel Investors atau Venture Capital (KPA-5) di atas Rp 50 juta. Strict Lock-up Period 24 bulan dan Escrow Mandatory — melindungi desa dari kapitalisasi jangka pendek dan spekulasi. Investor jangka panjang saja yang welcome.',
        badges: ['Angel Investor', 'Lock-up 24 Bulan', 'Escrow Mandatory']
      },
      {
        number: 12,
        title: 'Capital Matching & Export Trade Finance',
        subtitle: 'Pintu 195 Negara via Adikara Yana',
        description: 'Pembiayaan khusus untuk desa yang memasuki 195 negara via Adikara Yana. Sharia Letter of Credit (L/C) untuk mengimpor bahan baku atau membiayai logistik kontainer ekspor. Desa tidak hanya produksi — desa mengekspor ke seluruh dunia.',
        badges: ['Sharia L/C', '195 Negara', 'Export Container']
      }
    ]
  },
  {
    number: 4,
    name: 'KEUANGAN HIJAU & TEKNOLOGI',
    emoji: '⚡',
    color: '#10b981',
    colorLight: '#10b981',
    focus: 'Marrying capital with environmental sustainability and future technology — Green & Frontier Finance',
    programs: [
      {
        number: 13,
        title: 'Pembiayaan Alsintan & IoT Farming',
        subtitle: 'Leasing Teknologi Adikara Jnana & Anna',
        description: 'Lease financing untuk teknologi Adikara Jnana dan Anna. Petani lease drone atau sensor IoT, membayar cicilan dari surplus panen yang meningkat. Teknologi bukan kemewahan — teknologi adalah alat produksi yang membiayai dirinya sendiri.',
        badges: ['Drone Leasing', 'IoT Sensors', 'Self-Financing Tech']
      },
      {
        number: 14,
        title: 'Green Financing',
        subtitle: 'Pembiayaan Transisi Energi & Daur Ulang',
        description: 'Soft loan untuk 12 program Adikara Prakriti. Membiayai biodigester, mesin Eco-Brick, atau stasiun pengisian solar. Setiap rupiah yang dipinjam menanam pohon, mengurangi emisi, dan menghasilkan energi bersih — triple bottom line.',
        badges: ['Adikara Prakriti', 'Biodigester', 'Eco-Brick & Solar']
      },
      {
        number: 15,
        title: 'Tokenisasi Aset Desa',
        subtitle: 'Real-World Asset Tokenization',
        description: 'Konversi aset fisik desa (tanah desa, resi gudang hasil panen) menjadi token digital di blockchain KNBMP. Token bisa digadaikan secara digital (Rahn) untuk likuiditas instan tanpa menjual aset fisik. Aset tetap di desa, uang tetap mengalir.',
        badges: ['KNBMP Blockchain', 'Rahn Digital', 'Likuiditas Instan']
      },
      {
        number: 16,
        title: 'Dana Abadi Desa',
        subtitle: 'Sovereign Wealth Fund Desa',
        description: 'Meniru Sovereign Wealth Fund negara maju. Sebagian SHU dikunci di Endowment Fund, diinvestasikan di instrumen super-aman (seperti Sukuk Negara), returns-nya membiayai operasi Smart Village OS secara abadi. Desa tidak pernah miskin lagi — selamanya.',
        badges: ['Endowment Fund', 'Sukuk Negara', 'Perpetual Returns']
      }
    ]
  },
  {
    number: 5,
    name: 'PROTEKSI, KESEJAHTERAAN & FILANTROPI',
    emoji: '🛡️',
    color: '#8B0000',
    colorLight: '#8B0000',
    focus: 'Social safety net, old-age security, and spiritual instruments — Social Safety Net',
    programs: [
      {
        number: 17,
        title: 'Pinjaman Antar Anggota',
        subtitle: 'Qardhul Hasan P2P',
        description: 'Peer-to-Peer antar anggota. Pinjaman darurat tanpa bunga. Sistem mencatat dan menjamin pengembalian pokok. Ketika tetangga butuh, bukan rentenir yang datang — tapi sesama anggota yang menolong dengan terukur dan aman.',
        badges: ['0% Bunga', 'P2P Members', 'Guaranteed Principal']
      },
      {
        number: 18,
        title: 'Asuransi Mikro Syariah',
        subtitle: 'Takaful & Perlindungan Gagal Panen',
        description: 'Cross-subsidy (dana tabarru\') di mana ribuan desa menyumbang jumlah kecil. Jika satu desa mengalami gagal panen akibat banjir, dana langsung menutupi kerugian. Ribuan desa saling melindungi — inilah solidartas yang punya sistem.',
        badges: ['Tabarru\' Fund', 'Gagal Panen Cover', 'Cross-Subsidy']
      },
      {
        number: 19,
        title: 'Wakaf TunAI',
        subtitle: 'Cash Waqf Intergenerasional',
        description: 'Wakaf tunai dari warga atau investor eksternal. Pokok diinvestasikan, returns-nya membangun fasilitas gratis seperti Klinik Kesehatan Desa atau Musholla Digital. Pokok tidak pernah berkurang — perpetuitas. Warisannya mengalir ke tujuh generasi.',
        badges: ['Perpetuity', 'Klinik Desa', 'Musholla Digital']
      },
      {
        number: 20,
        title: 'Program Dana Pensiun Desa',
        subtitle: 'DPLK Koperasi',
        description: 'Untuk pertama kalinya, petani, nelayan, dan pengrajin memiliki jaminan hari tua. Auto-deduction (misal Rp 10.000/minggu via NB Pay) diinvestasikan di instrumen syariah jangka panjang — memastikan di usia 60 seorang petani pensiun dengan bermartabat.',
        badges: ['Auto-Deduction', 'Usia 60 Pensiun', 'Bermartabat']
      }
    ]
  }
]

const programIcons = [
  Wallet, Shield, CreditCard, GraduationCap, // Klaster 1
  Banknote, PiggyBank, TruckIcon, HomeIcon, // Klaster 2
  Globe2, TrendingUp, Landmark, HandCoins, // Klaster 3
  Sprout, Leaf, Cpu, Coins, // Klaster 4
  Handshake, Umbrella, HeartHandshake, Clock // Klaster 5
]

function KlasterSection({ klaster, index }: { klaster: Klaster; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className={`py-16 md:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Klaster Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <div
              className="px-5 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2"
              style={{ backgroundColor: klaster.color }}
            >
              <span className="text-lg">{klaster.emoji}</span>
              KLASTER {klaster.number === 1 ? 'I' : klaster.number === 2 ? 'II' : klaster.number === 3 ? 'III' : klaster.number === 4 ? 'IV' : 'V'}
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] mb-3">
            {klaster.name}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: klaster.color }}
          >
            {klaster.focus}
          </motion.p>
          {/* Color accent line */}
          <motion.div
            variants={fadeInUp}
            className="mt-4 h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: klaster.color }}
          />
        </motion.div>

        {/* Program Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {klaster.programs.map((program, pIndex) => {
            const IconComp = programIcons[(klaster.number - 1) * 4 + pIndex]
            return (
              <motion.div key={program.number} variants={fadeInUp}>
                <Card className="border hover:shadow-xl transition-all duration-300 h-full group overflow-hidden">
                  <CardContent className="p-6">
                    {/* Program Number & Icon */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${klaster.color}15` }}
                      >
                        {IconComp && (
                          <IconComp
                            className="w-6 h-6"
                            style={{ color: klaster.color }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: klaster.color }}
                          >
                            #{program.number}
                          </span>
                          <h3 className="font-bold text-[#1A1A1A] text-lg leading-tight">
                            {program.title}
                          </h3>
                        </div>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: klaster.color }}
                        >
                          {program.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                      {program.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {program.badges.map((badge, bIndex) => (
                        <Badge
                          key={bIndex}
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${klaster.color}10`,
                            color: klaster.color,
                            borderColor: `${klaster.color}30`,
                          }}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
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

export default function ProvinsiKampungModalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F5F5F5] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#008F3D]">Beranda</Link>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <Link href="/nusa-futuristik" className="hover:text-[#008F3D]">Nusa Futuristik</Link>
            </span>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <Link href="/nusa-futuristik/provinsi" className="hover:text-[#008F3D]">Provinsi</Link>
            </span>
            <span className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#1A1A1A] font-medium">Kampung Modal / Adikara Artha</span>
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Dark Gradient */}
      <section className="relative bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#1a0f00] text-white py-16 md:py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#f59e0b]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/3 rounded-full blur-[120px]" />
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40 mb-6 text-sm px-4 py-1.5">
                <Shield className="w-4 h-4 mr-2" />
                Adikara Artha — Kampung Modal
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                20 Program
              </span>
              <br />
              <span className="text-white">Super Detail</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-6 leading-relaxed">
              <strong className="text-[#FFD700]">Urat Nadi Finansial</strong> yang menginjeksikan kapital ke 8 Adhikara lainnya —
              mengubah 83.763 desa dari subsisten menjadi{' '}
              <strong className="text-[#FFD700]">Sovereign Wealth</strong>
            </motion.p>
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mt-8 text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <p className="text-sm md:text-base text-white/60 leading-relaxed italic">
                Salam Peradaban, Grandmaster. Kampung Modal bukan sekadar koperasi atau bank desa — ia adalah{' '}
                <span className="text-[#FFD700] font-semibold">sistem peradaban keuangan</span> yang dirancang dari nol untuk
                memastikan setiap rupiah yang mengalir di 83.763 desa Indonesia tidak bocor, tidak disalahgunakan, dan
                tidak berhenti. 20 Program ini adalah{' '}
                <span className="text-[#FFD700] font-semibold">urut nadi</span> yang memompa kapital dari level RT
                hingga pasar global — dari transaksi harian yang tembus ke satuan rupiah, hingga Sovereign Wealth Fund
                yang melindungi generasi tujuh tingkat ke depan.
              </p>
            </motion.div>

            {/* 5 Klaster Quick Nav */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-3">
              {klasterData.map((k) => (
                <a
                  key={k.number}
                  href={`#klaster-${k.number}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: `${k.color}20`,
                    borderColor: `${k.color}50`,
                  }}
                >
                  <span>{k.emoji}</span>
                  <span style={{ color: k.color }}>Klaster {k.number === 1 ? 'I' : k.number === 2 ? 'II' : k.number === 3 ? 'III' : k.number === 4 ? 'IV' : 'V'}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Sub Navigation - Sibling Pages */}
      <section className="py-6 bg-[#F5F5F5] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {siblingPages.map((page, i) => (
              <Link key={i} href={page.href} className="group">
                <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-300 text-gray-600 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors cursor-pointer flex items-center gap-1.5">
                  <page.icon className="w-3 h-3" />
                  {page.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '20', label: 'Program Super Detail', color: '#FFD700' },
              { value: '5', label: 'Klaster Strategis', color: '#3b82f6' },
              { value: '83.763', label: 'Desa Terintegrasi', color: '#10b981' },
              { value: '8', label: 'Adhikara Terkoneksi', color: '#8b5cf6' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border text-center h-full">
                  <CardContent className="p-4 md:p-6">
                    <p className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-[#6B7280]">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5 Klaster Sections */}
      {klasterData.map((klaster, index) => (
        <div key={klaster.number} id={`klaster-${klaster.number}`}>
          <KlasterSection klaster={klaster} index={index} />
        </div>
      ))}

      {/* Introduction / Philosophy Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#1a0f00] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40 mb-4">
                Filosofi Adikara Artha
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6">
              Dari <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Subsisten</span> ke{' '}
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Sovereign Wealth</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 leading-relaxed text-sm md:text-base mb-8">
              Kampung Modal (Adikara Artha) adalah urat nadi finansial Nusa Futuristik. Tanpa kapital yang mengalir,
              tidak ada bangunan yang berdiri, tidak ada panen yang dipanen, tidak ada anak yang bersekolah.
              20 Program ini dirancang sebagai sistem yang <strong className="text-white">saling mengunci</strong> —
              setiap program mendukung dan diperkuat oleh program lainnya. Seperti jaringan saraf,
              jika satu simpul mati, simpul lain mengkompensasi. Ini bukan koperasi biasa.
              Ini adalah <strong className="text-[#FFD700]">sistem keuangan peradaban</strong>.
            </motion.p>

            {/* 5 Klaster Summary Cards */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
              {klasterData.map((k) => (
                <motion.div key={k.number} variants={fadeInUp}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm h-full">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{k.emoji}</div>
                      <p className="text-xs font-bold mb-1" style={{ color: k.color }}>
                        KLASTER {k.number === 1 ? 'I' : k.number === 2 ? 'II' : k.number === 3 ? 'III' : k.number === 4 ? 'IV' : 'V'}
                      </p>
                      <p className="text-xs text-white/50">{k.programs.length} Program</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Bergabung dengan Kampung Modal
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Jadilah bagian dari revolusi keuangan peradaban. Dari NB Pay di level RT hingga Dana Abadi Desa
              yang melindungi tujuh generasi — setiap rupiah Anda mengalir dengan purpose.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/daftar">
                <Button className="bg-white text-[#f59e0b] hover:bg-white/90 font-semibold shadow-lg group px-8 py-3 text-base">
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/kpa">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-base">
                  Pelajari 5 KPA
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
