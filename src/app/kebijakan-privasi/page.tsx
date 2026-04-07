'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function KebijakanPrivasiPage() {
  const sections = [
    {
      title: '1. Informasi yang Kami Kumpulkan',
      content: [
        'Data identitas: nama, alamat email, nomor telepon, alamat',
        'Data transaksi: riwayat pembelian, pembayaran, dan pengiriman',
        'Data penggunaan: aktivitas di platform, preferensi, dan interaksi',
        'Data perangkat: alamat IP, jenis browser, sistem operasi',
        'Data lokasi: lokasi perkiraan untuk pengiriman dan layanan'
      ]
    },
    {
      title: '2. Penggunaan Informasi',
      content: [
        'Memproses dan memenuhi pesanan serta transaksi',
        'Mengirimkan notifikasi tentang pesanan dan layanan',
        'Meningkatkan layanan dan pengalaman pengguna',
        'Mengirimkan informasi promosi (dengan persetujuan)',
        'Mematuhi kewajiban hukum dan regulasi'
      ]
    },
    {
      title: '3. Berbagi Informasi',
      content: [
        'Mitra logistik untuk pengiriman produk',
        'Penyedia layanan pembayaran yang aman',
        'Otoritas pemerintah sesuai regulasi yang berlaku',
        'Mitra bisnis dengan persetujuan pengguna',
        'Tidak menjual data pribadi kepada pihak ketiga'
      ]
    },
    {
      title: '4. Keamanan Data',
      content: [
        'Enkripsi data end-to-end untuk transaksi',
        'Sistem keamanan blockchain untuk transparansi',
        'Akses terbatas hanya untuk personel yang berwenang',
        'Audit keamanan berkala oleh pihak ketiga',
        'Prosedur respons insiden keamanan yang terstandar'
      ]
    },
    {
      title: '5. Hak Pengguna',
      content: [
        'Mengakses dan memperbarui data pribadi',
        'Meminta penghapusan data (dengan batasan tertentu)',
        'Menolak pemrosesan data untuk pemasaran',
        'Mengajukan keluhan kepada otoritas perlindungan data',
        'Mendapatkan salinan data dalam format yang dapat dibaca'
      ]
    },
    {
      title: '6. Cookie dan Teknologi Serupa',
      content: [
        'Cookie esensial untuk fungsi website',
        'Cookie analitik untuk meningkatkan layanan',
        'Cookie preferensi untuk pengalaman personalisasi',
        'Pengguna dapat mengatur preferensi cookie di browser',
        'Penggunaan cookie sesuai dengan regulasi yang berlaku'
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
          <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Dokumen Legal
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Kebijakan <span className="text-[#8B0000]">Privasi</span>
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
          <Card className="bg-red-50 border-red-100 mb-8">
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                Koperasi Nusantara Merah Putih (KNMP) berkomitmen untuk melindungi privasi dan keamanan data pribadi 
                anggota dan pengguna platform. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, 
                menggunakan, dan melindungi informasi Anda.
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
                        <CheckCircle2 className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0" />
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
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Pertanyaan tentang Privasi?</h3>
              <p className="text-gray-300 mb-6">
                Hubungi tim Data Protection Officer kami di privacy@kopnusa.id
              </p>
              <Link href="/kontak">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
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
