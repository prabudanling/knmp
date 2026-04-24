'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Crown,
  Shield,
  Building2,
  Globe,
  Zap,
  ArrowLeft,
  Star,
  User,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// 17 Dewan Pendiri - KOPNUSA BERDIKARI (Updated)
const DEWAN_PENDIRI = [
  { no: 1, name: 'Drs. H. Arif Rachman Hakim, M.M.', position: 'Pendiri ke-1', role: 'Sekretaris Jenderal / CEO JE-P3, Inisiator Architect Koperasi Nusa Berdikari Merah Putih', kuadran: 'POLITIK' },
  { no: 2, name: 'Dr. N. Rusmiati, M.Si., M.H.', position: 'Pendiri ke-2', role: 'Presiden / Ketua Umum, Ketua Umum DPP ASITA 2019–2029, CEO PT Patih Indo Group', kuadran: null },
  { no: 3, name: 'Prof. Wirono, S.E., M.Pd.', position: 'Pendiri ke-3', role: 'Wakil Ketua Umum, Mantan Marketing AJB Bumi Putera', kuadran: null },
  { no: 4, name: 'Prof. Dr. Elan Masbulan', position: 'Pendiri ke-4', role: 'Ketua Dewan Pengawas, Akademisi/Peneliti bidang pertanian di lingkungan UGM', kuadran: null },
  { no: 5, name: 'Prof. Dr. H. Anwar Sanusi, S.H., S.Pel., M.M.', position: 'Pendiri ke-5', role: 'Ketua Dewan Penasehat, Mantan Sekjen Kementerian Ketenagakerjaan RI', kuadran: null },
  { no: 6, name: 'Prof. Dr. Teddy Mantoro, M.Sc., Ph.D., SMIEEE', position: 'Pendiri ke-6', role: 'Ketua Dewan Pakar, Director School of CS Nusa Putra University, Senior Member IEEE', kuadran: 'SIBER' },
  { no: 7, name: 'H. Gugun Gunara, S.E.', position: 'Pendiri ke-7', role: 'Wakil Sekretaris Jenderal / Grand Architect & COO, Senior Konsultan Bisnis 16+ tahun, Arsitek Ekosistem Digital KOPNUSA', kuadran: null },
  { no: 8, name: 'Komjen. Pol. (Purn.) Dharma Pongrekun', position: 'Pendiri ke-8', role: 'Ketua Bidang Keamanan Siber, Mantan Wakil Kepala BSSN 2019–2021, Purnawirawan Polisi bintang 3', kuadran: 'SIBER' },
  { no: 9, name: 'Mayor Art. (Purn.) Cecep Sumarno, S.I.P., S.H.', position: 'Pendiri ke-9', role: 'Ketua Bidang Hukum dan Advokasi, Pengacara aktif', kuadran: null },
  { no: 10, name: 'Dr. Habib', position: 'Pendiri ke-10', role: 'Anggota Dewan Pengawas, Pakar ketahanan pangan, Ketua Umum Asosiasi Pertanian', kuadran: null },
  { no: 11, name: 'Dr. Heri Solahudin', position: 'Pendiri ke-11', role: 'Anggota Dewan Penasehat, Peneliti Senior CSEAS Kyoto University', kuadran: null },
  { no: 12, name: 'Ir. Endro Wuryanto, M.M.', position: 'Pendiri ke-12', role: 'Koordinator Bidang Infrastruktur Digital', kuadran: null },
  { no: 13, name: 'Sae Tanangga Karim, S.E.', position: 'Pendiri ke-13', role: 'Koordinator Bidang Event Organizer, General Manager PT Dyandra Promosindo', kuadran: null },
  { no: 14, name: 'Hj. Inna Hadianala, S.E.', position: 'Pendiri ke-14', role: 'Koordinator Bidang Pengembangan SDM & Organisasi, Ex. Anggota DPRD Prov. Jawa Tengah', kuadran: null },
  { no: 15, name: 'Andi Darmadji, S.E.', position: 'Pendiri ke-15', role: 'Panglima Wilayah Kalimantan (Bakorwil), Pilar Ekspansi Kawasan Timur & IKN', kuadran: null },
  { no: 16, name: 'Posisi Belum Terisi', position: 'Pendiri ke-16', role: 'Menunggu Pengesahan', kuadran: null },
  { no: 17, name: 'dr. Hanson Barki', position: 'Pendiri ke-17', role: 'Koordinator Bidang Adab dan Budaya, Dokter, Komisaris Utama PT Hanara Batik', kuadran: null },
];

// 17 Koordinator Bidang
const KORBID = [
  { no: 1, bidang: 'Organisasi & Keanggotaan', ketua: 'Hj. Inna Hadianala, S.E.', color: '#008F3D' },
  { no: 2, bidang: 'Pangan & Ketahanan Pangan', ketua: 'Dr. Habib', color: '#22c55e' },
  { no: 3, bidang: 'Industri & Manufaktur', ketua: '(RAT Perdana)', color: '#64748b', isVacant: true },
  { no: 4, bidang: 'Logistik & Distribusi', ketua: 'M. Ilham', color: '#f59e0b' },
  { no: 5, bidang: 'Kesehatan & Farmasi', ketua: '(RAT Perdana)', color: '#ef4444', isVacant: true },
  { no: 6, bidang: 'Keuangan & Perbankan', ketua: 'Fawwaz Arif Al Jabar, S.E., M.M.', color: '#3b82f6' },
  { no: 7, bidang: 'Holding Trading Ekosistem', ketua: 'H. Gugun Gunara, S.E.', color: '#8B0000' },
  { no: 8, bidang: 'Bisnis Kemitraan & UMKM', ketua: 'Ongky Putra', color: '#ec4899' },
  { no: 9, bidang: 'Digital & Teknologi', ketua: 'M. Sidik', color: '#06b6d4' },
  { no: 10, bidang: 'Adab & Budaya', ketua: 'dr. Hanson Barki', color: '#8b5cf6' },
  { no: 11, bidang: 'Hukum & Advokasi', ketua: 'Mayor Art. (Purn.) Cecep Sumarno, S.I.P., S.H.', color: '#6366f1' },
  { no: 12, bidang: 'Haji dan Umroh', ketua: 'H. Abu Bakar', color: '#0ea5e9' },
  { no: 13, bidang: 'Pengembangan SDM & Diklat', ketua: 'Dalam Proses Pengesahan', color: '#14b8a6' },
  { no: 14, bidang: 'Ekspor Impor & Perdagangan Int.', ketua: 'Dalam Proses Pengesahan', color: '#f97316' },
  { no: 15, bidang: 'Hubungan Masyarakat & Media', ketua: 'Dalam Proses Pengesahan', color: '#a855f7' },
  { no: 16, bidang: 'Teknologi & Inovasi', ketua: 'Dalam Proses Pengesahan', color: '#6366f1' },
  { no: 17, bidang: 'Kemitraan Internasional', ketua: 'Dalam Proses Pengesahan', color: '#3b82f6' },
];

// Kuadran Kekuatan
const KUADRAN = [
  { icon: Shield, title: 'SIBER', subtitle: 'Digital Security', founder: 'Prof. Dr. Teddy Mantoro & Komjen Dharma Pongrekun', desc: 'Platform Security · ZKP-ID · BSSN · Keamanan Siber', color: '#3b82f6' },
  { icon: Shield, title: 'MILITER', subtitle: 'National Defense', founder: '(Posisi Kosong - akan diisi)', desc: 'Keamanan fisik 83.763 desa · Daerah 3T · Pertahanan Nasional', color: '#ef4444' },
  { icon: Building2, title: 'POLITIK', subtitle: 'Government Access', founder: 'Drs. H. Arif Rachman Hakim, M.M.', desc: 'Akses langsung Istana · Inpres 9/2025 · Kebijakan Strategis', color: '#f59e0b' },
  { icon: Globe, title: 'KAPITAL', subtitle: 'Financial Architecture', founder: 'Fawwaz Arif Al Jabar, S.E., M.M.', desc: 'Keuangan & Perbankan · CFO · Impact Investing', color: '#22c55e' },
];

export default function DewanPendiriPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B0000] via-[#6B0000] to-[#1a1a1a]">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#008F3D]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B0000]/30 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Button variant="ghost" className="text-white/70 hover:text-white" asChild>
                <Link href="/tentang">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Badge className="bg-[#008F3D] text-white px-4 py-2 text-sm mb-4">
                <Crown className="w-4 h-4 mr-2" />
                17 Dewan Pendiri KOPNUSA BERDIKARI
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Dewan <span className="text-[#00A847]">Pendiri</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-white/80 text-lg max-w-2xl mx-auto">
              Para visioner dan arsitek di balik terbentuknya Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00A847]">16</div>
                <div className="text-sm text-white/60">Pendiri Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">38</div>
                <div className="text-sm text-white/60">Provinsi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00A847]">83.763</div>
                <div className="text-sm text-white/60">Desa Target</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 17 Dewan Pendiri */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Susunan <span className="text-[#8B0000]">17 Dewan Pendiri</span>
              </h2>
              <p className="text-gray-600 text-sm">
                Kuadran Kekuatan: Siber · Militer · Politik · Kapital
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {DEWAN_PENDIRI.map((founder) => {
                const isPending = founder.name === 'Posisi Belum Terisi';
                return (
                  <motion.div
                    key={founder.no}
                    variants={scaleIn}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border p-4 transition-all",
                      isPending
                        ? "bg-amber-50 border-amber-200 hover:border-amber-300"
                        : "bg-white border-gray-200 hover:border-[#008F3D] hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0",
                        isPending ? "bg-amber-500" : "bg-gradient-to-br from-[#8B0000] to-[#008F3D]"
                      )}>
                        {founder.no}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn(
                          "font-semibold text-sm leading-tight",
                          isPending ? "text-amber-700 italic" : "text-gray-900"
                        )}>
                          {founder.name}
                        </h3>
                        <p className="text-xs text-[#008F3D] font-medium mt-0.5">
                          {founder.position}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {founder.role}
                        </p>
                      </div>
                    </div>
                    
                    {founder.kuadran && (
                      <div className="mt-2 flex justify-end">
                        <Badge variant="outline" className="text-[10px] border-[#008F3D]/30 text-[#008F3D]">
                          <Star className="w-3 h-3 mr-1" />
                          Kuadran {founder.kuadran}
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kuadran Kekuatan */}
      <section className="py-12 bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1a]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <Badge className="bg-[#008F3D]/20 text-[#00A847] mb-2">Strategi Pertahanan</Badge>
              <h2 className="text-xl font-bold text-white">Kuadran Kekuatan 4 Pendiri Kunci</h2>
              <p className="text-white/60 text-sm">Membentuk pertahanan menyeluruh untuk KOPNUSA BERDIKARI</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {KUADRAN.map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">{item.title}</h3>
                        <span className="text-[10px] text-white/50">({item.subtitle})</span>
                      </div>
                      <p className="text-xs text-white/80 font-medium mt-0.5">{item.founder}</p>
                      <p className="text-[10px] text-white/50 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 17 Koordinator Bidang */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <Badge className="bg-[#8B0000] text-white mb-2">Struktur Operasional</Badge>
              <h2 className="text-xl font-bold text-gray-900">
                17 Koordinator <span className="text-[#8B0000]">Bidang</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {KORBID.map((item) => {
                const isPending = item.ketua === 'Dalam Proses Pengesahan' || item.isVacant;
                return (
                  <motion.div
                    key={item.no}
                    variants={scaleIn}
                    className={cn(
                      "rounded-lg border p-3 transition-all",
                      isPending
                        ? "bg-amber-50 border-amber-200 hover:border-amber-300"
                        : "bg-white border-gray-200 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.no}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-xs leading-tight">
                          {item.bidang}
                        </h3>
                        <p className={cn(
                          "text-[10px] mt-0.5 truncate",
                          isPending ? "text-amber-600 italic" : "text-[#008F3D]"
                        )}>
                          {item.ketua}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#8B0000]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-xl font-bold text-white mb-3">
              Bergabung dengan Ekosistem KOPNUSA BERDIKARI
            </h2>
            <p className="text-white/80 text-sm mb-6">
              Jadilah bagian dari koperasi digital terbesar di Indonesia
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-[#008F3D] hover:bg-[#00A847] text-white" asChild>
                <Link href="/daftar">
                  <Zap className="w-4 h-4 mr-2" />
                  Daftar Sekarang
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/membership">Lihat Keanggotaan</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
