'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function DisclaimerPage() {
  const sections = [
    {
      title: 'Disclaimer Umum',
      icon: Info,
      content: [
        'Informasi di website ini disediakan "sebagaimana adanya" tanpa jaminan apapun',
        'KNMP tidak menjamin keakuratan, kelengkapan, atau kegunaan informasi',
        'Penggunaan informasi di website adalah tanggung jawab pengguna sendiri',
        'KNMP berhak mengubah konten sewaktu-waktu tanpa pemberitahuan'
      ]
    },
    {
      title: 'Investasi dan Keuangan',
      icon: AlertTriangle,
      content: [
        'Investasi di koperasi memiliki risiko seperti instrumen keuangan lainnya',
        'Return investasi tidak dijamin dan dapat berubah sewaktu-waktu',
        'SHU dibagikan berdasarkan partisipasi ekonomi, bukan return tetap',
        'Kampung Modal sebagai platform investasi berlandaskan prinsip Ring-Fencing — dana anggota terpisah dan dilindungi',
        'Keanggotaan koperasi tidak sama dengan produk keuangan yang dijamin oleh LPS',
        'Konsultasikan dengan penasihat keuangan sebelum berinvestasi'
      ]
    },
    {
      title: 'Produk dan Layanan',
      icon: AlertTriangle,
      content: [
        'Produk yang dijual di marketplace adalah tanggung jawab seller masing-masing',
        'KNMP bertindak sebagai perantara dan tidak memproduksi semua produk',
        'Klaim produk (Halal, Organik, SNI) adalah tanggung jawab seller',
        'Sengketa produk diselesaikan sesuai kebijakan masing-masing seller'
      ]
    },
    {
      title: 'Tautan Pihak Ketiga',
      icon: Info,
      content: [
        'Website mungkin berisi tautan ke website pihak ketiga',
        'KNMP tidak bertanggung jawab atas konten website pihak ketiga',
        'Tautan tidak merupakan dukungan terhadap website tersebut',
        'Kebijakan privasi pihak ketiga mungkin berbeda dengan KNMP'
      ]
    },
    {
      title: 'Batasan Tanggung Jawab',
      icon: AlertTriangle,
      content: [
        'KNMP tidak bertanggung jawab atas kerugian langsung maupun tidak langsung',
        'Kerusakan sistem, kehilangan data, atau gangguan layanan',
        'Tindakan yang dilakukan berdasarkan informasi di website',
        'Gangguan yang disebabkan oleh force majeure'
      ]
    },
    {
      title: 'Penyelesaian Sengketa',
      icon: AlertTriangle,
      content: [
        'Seluruh sengketa internal wajib diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) sesuai AD Pasal 29 (The Mute Arbitration)',
        'Putusan arbitrase BANI bersifat final, mengikat, dan rahasia (tertutup untuk publik)',
        'Para pihak melepaskan hak gugatan perdata ke Pengadilan Negeri',
        'Hukum yang berlaku adalah Hukum Negara Republik Indonesia'
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
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4 px-4 py-2">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Dokumen Legal
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-600">Disclaimer</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Terakhir diperbarui: Januari 2026
          </p>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-orange-50 border-orange-200 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-orange-800 mb-2">PENTING - BACA DENGAN SEKSAMA</h3>
                  <p className="text-orange-700 leading-relaxed">
                    Disclaimer ini merupakan penyangkalan resmi dari Koperasi Nusantara Merah Putih (KKMNMP/KNMP) 
                    berdasarkan AD Versi 7 Super Final. Dengan mengakses dan menggunakan layanan kami, Anda dianggap telah membaca, memahami, 
                    dan menyetujui disclaimer ini beserta seluruh konstitusi KKMNMP/KNMP (AD/ART/Kode Etik).
                  </p>
                </div>
              </div>
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-3 ml-1">
                    {section.content.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
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
              <h3 className="text-xl font-bold mb-2">Ada Pertanyaan tentang Disclaimer?</h3>
              <p className="text-gray-300 mb-6">
                Hubungi tim legal kami di legal@kopnusa.id
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
