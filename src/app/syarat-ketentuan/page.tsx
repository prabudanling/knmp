'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SyaratKetentuanPage() {
  const sections = [
    {
      title: '1. Penerimaan Syarat',
      content: [
        'Dengan mengakses dan menggunakan platform KNMP, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini',
        'Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami',
        'Kami berhak mengubah syarat ini sewaktu-waktu dengan pemberitahuan terlebih dahulu',
        'Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan terhadap syarat baru'
      ]
    },
    {
      title: '2. Keanggotaan',
      content: [
        'Keanggotaan terbuka untuk Warga Negara Indonesia yang berusia minimal 17 tahun',
        'Pendaftaran memerlukan verifikasi identitas dan dokumen pendukung sesuai KPA yang dipilih',
        'Setiap anggota wajib membayar Simpanan Pokok dan Simpanan Wajib sesuai KPA (mengacu pada ART KKMNMP/KNMP)',
        'Anggota bertanggung jawab untuk menjaga kerahasiaan akun dan password'
      ]
    },
    {
      title: '3. Transaksi dan Pembayaran',
      content: [
        'Semua transaksi dilakukan melalui sistem pembayaran yang terintegrasi',
        'Pembayaran dianggap sah setelah dana diterima di rekening resmi KNMP',
        'Pembatalan transaksi tunduk pada kebijakan masing-masing seller',
        'Biaya transaksi sebesar 2-3% berlaku untuk setiap transaksi di marketplace'
      ]
    },
    {
      title: '4. Hak dan Kewajiban Anggota',
      content: [
        'Hak suara dalam Rapat Anggota Tahunan (RAT) sesuai proporsi 5 KPA (Pentagon Kedaulatan)',
        'Hak atas SHU sesuai dengan partisipasi ekonomi',
        'Kewajiban mematuhi AD/ART/Kode Etik KKMNMP/KNMP dan keputusan RAT',
        'Kewajiban menjaga nama baik koperasi dan anggota lainnya'
      ]
    },
    {
      title: '5. Konten dan Kekayaan Intelektual',
      content: [
        'Konten di platform adalah milik KNMP atau pemberi lisensi',
        'Penggunaan konten untuk kepentingan komersial memerlukan izin tertulis',
        'Seller bertanggung jawab atas keaslian dan legalitas produk yang dijual',
        'Pelanggaran hak kekayaan intelektual akan dikenakan sanksi'
      ]
    },
    {
      title: '6. Batasan Tanggung Jawab',
      content: [
        'KNMP tidak bertanggung jawab atas kerugian tidak langsung',
        'Tanggung jawab maksimal terbatas pada nilai transaksi',
        'KNMP tidak menjamin ketersediaan layanan 24/7 tanpa gangguan',
        'Force majeure membebaskan pihak yang terkena dampak dari kewajiban'
      ]
    },
    {
      title: '7. Penyelesaian Sengketa',
      content: [
        'Seluruh sengketa internal wajib diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) secara final, mengikat, dan rahasia (tertutup untuk publik) sesuai AD Pasal 29 (The Mute Arbitration)',
        'Para pihak melepaskan hak gugatan perdata ke Pengadilan Negeri',
        'Hukum yang berlaku adalah Hukum Negara Republik Indonesia',
        'Keputusan arbitrase BANI bersifat final dan tidak dapat diajukan banding'
      ]
    },
    {
      title: '8. Perlindungan Data',
      content: [
        'KKMNMP/KNMP bertindak sebagai Wali Amanat Data (Data Fiduciary) sesuai AD Pasal 24-25',
        'Seluruh pengelolaan data mematuhi UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)',
        'Data adalah milik anggota, Koperasi adalah pelindung dan pengelola',
        'Verifikasi transaksi menggunakan Zero-Knowledge Proof (ZKP) untuk menjaga kerahasiaan'
      ]
    },
    {
      title: '9. Kode Etik',
      content: [
        'Seluruh anggota wajib mematuhi Kode Etik KKMNMP/KNMP',
        'Pelanggaran Kode Etik dapat dikenakan sanksi sesuai ketentuan AD/ART',
        'Kode Etik mencakup Sumpah Kedaulatan Privasi dan prinsip-prinsip integritas anggota'
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-4 px-4 py-2">
            <FileText className="w-4 h-4 mr-2" />
            Dokumen Legal
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Syarat & <span className="text-[#008F3D]">Ketentuan</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Terakhir diperbarui: Januari 2026
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-amber-50 border-amber-100 mb-8">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Syarat dan Ketentuan ini mengatur penggunaan platform Koperasi Nusantara Merah Putih (KNMP), 
                termasuk website, aplikasi mobile, dan seluruh layanan yang disediakan. Mohon baca dengan 
                seksama sebelum menggunakan layanan kami.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.content.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#008F3D] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-[#008F3D] to-[#B8860B] text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Ada Pertanyaan?</h3>
              <p className="text-white/80 mb-6">
                Hubungi tim legal kami di legal@kopnusa.id
              </p>
              <Link href="/kontak">
                <Button className="bg-white text-[#008F3D] hover:bg-gray-100">
                  Hubungi Kami
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
