'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building2,
  Zap,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/constants'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-red-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <HeroSection />
        <ContactGrid />
        <ContactForm />
        <MapSection />
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
        <Badge className="bg-red-100 text-[#8B0000] border-red-200 mb-4">
          <MessageSquare className="w-4 h-4 mr-2" />
          Hubungi Kami
        </Badge>
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
      >
        Kami Siap <span className="text-[#8B0000]">Membantu</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        Punya pertanyaan atau ingin bergabung? Tim kami siap membantu Anda.
      </motion.p>
    </motion.section>
  )
}

// =====================
// Contact Grid
// =====================
function ContactGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const contacts = [
    {
      icon: Phone,
      title: 'Telepon',
      value: SITE_CONFIG.contact.phone,
      description: 'Senin - Jumat, 08:00 - 17:00 WIB',
      action: `tel:${SITE_CONFIG.contact.phone}`,
    },
    {
      icon: Mail,
      title: 'Email',
      value: SITE_CONFIG.contact.email,
      description: 'Respon dalam 24 jam kerja',
      action: `mailto:${SITE_CONFIG.contact.email}`,
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: SITE_CONFIG.contact.address,
      description: 'Kantor Pusat KNMP',
      action: '#map',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      value: 'Senin - Jumat',
      description: '08:00 - 17:00 WIB',
      action: '#',
    },
  ]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map((contact, i) => (
          <a key={i} href={contact.action}>
            <Card className="h-full bg-white border border-red-100 hover:border-[#8B0000]/30 hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-xl flex items-center justify-center">
                  <contact.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{contact.title}</p>
                <p className="font-semibold text-foreground text-sm">{contact.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{contact.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </motion.div>
    </motion.section>
  )
}

// =====================
// Contact Form
// =====================
function ContactForm() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="mb-12"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white border border-red-100">
          <CardHeader>
            <CardTitle className="text-foreground">Kirim Pesan</CardTitle>
            <CardDescription>
              Isi formulir di bawah dan tim kami akan segera menghubungi Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="text-muted-foreground">
                  Terima kasih telah menghubungi kami. Tim kami akan segera merespon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Masukkan nama" required className="border-red-100 focus:border-[#8B0000]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@email.com" required className="border-red-100 focus:border-[#8B0000]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input id="phone" placeholder="+62 812 3456 7890" className="border-red-100 focus:border-[#8B0000]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kpa">KPA (Opsional)</Label>
                    <select
                      id="kpa"
                      className="w-full h-10 px-3 rounded-md border border-red-100 focus:border-[#8B0000] focus:outline-none"
                    >
                      <option value="">Pilih KPA</option>
                      <option value="KPA1">KPA-1: Produsen & Pekerja</option>
                      <option value="KPA2">KPA-2: Konsumen Umum</option>
                      <option value="KPA3">KPA-3: Abdi Negara & Pejabat Publik</option>
                      <option value="KPA4">KPA-4: Entitas Bisnis & Pelaku Usaha</option>
                      <option value="KPA5">KPA-5: Pemodal & Investor</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" placeholder="Topik pesan Anda" required className="border-red-100 focus:border-[#8B0000]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    required
                    className="border-red-100 focus:border-[#8B0000]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white h-12"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}

// =====================
// Map Section
// =====================
function MapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      ref={ref}
      id="map"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
    >
      <Card className="bg-white border border-red-100 overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[21/9] bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-dots-pattern opacity-30" />
            <div className="text-center z-10">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#8B0000]" />
              <p className="text-xl font-semibold text-foreground mb-2">Kantor Pusat KNMP</p>
              <p className="text-muted-foreground">{SITE_CONFIG.contact.address}</p>
              <Button variant="outline" className="mt-4 border-red-100 text-[#8B0000] hover:bg-red-50">
                Buka di Google Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
