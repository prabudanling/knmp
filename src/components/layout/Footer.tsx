'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUpRight,
  Heart,
  Send,
  ChevronRight,
  Globe,
  Shield,
  Award,
  Users,
  Building2,
  Sparkles,
  Star,
  CheckCircle,
  ExternalLink,
  Clock,
  HeadphonesIcon,
  MessageCircle,
  Leaf
} from 'lucide-react'
import { SITE_CONFIG, FOOTER_LINKS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const timer = setInterval(() => {
        start += Math.ceil(end / (duration * 60))
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 1000 / 60)
      return () => clearInterval(timer)
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Social Links Data
const socialLinks = [
  { href: SITE_CONFIG.social.instagram, icon: Instagram, label: 'Instagram', color: '#E4405F' },
  { href: SITE_CONFIG.social.twitter, icon: Twitter, label: 'Twitter', color: '#1DA1F2' },
  { href: SITE_CONFIG.social.youtube, icon: Youtube, label: 'YouTube', color: '#FF0000' },
  { href: SITE_CONFIG.social.linkedin, icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { href: SITE_CONFIG.social.facebook, icon: Facebook, label: 'Facebook', color: '#1877F2' },
]

// Quick Stats Data
const quickStats = [
  { icon: Users, value: 125000, suffix: '+', label: 'Anggota Aktif', color: '#008F3D' },
  { icon: Building2, value: 83763, suffix: '', label: 'Desa Terintegrasi', color: '#8B0000' },
  { icon: Globe, value: 38, suffix: '', label: 'Provinsi', color: '#00A847' },
  { icon: Star, value: 2.5, suffix: 'T+', label: 'Nilai Transaksi (Rp)', color: '#3b82f6' },
]

// Certifications Data
const certifications = [
  { icon: Shield, label: 'Kemenkumham', desc: 'Terdaftar' },
  { icon: Award, label: 'ISO 27001', desc: 'Certified' },
  { icon: Star, label: 'Best Co-op', desc: '2024' },
  { icon: CheckCircle, label: 'OJK', desc: 'Supervised' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer
      ref={ref}
      className="relative bg-[#111111] text-white overflow-hidden"
    >
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-[#008F3D] via-[#8B0000] to-[#008F3D]" />

      {/* Main Footer Content */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Top Section - Newsletter & Stats */}
        <div className="container mx-auto px-4 lg:px-8 pt-12 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#008F3D]/20 backdrop-blur-sm rounded-full border border-[#008F3D]/30">
                <Sparkles className="w-4 h-4 text-[#008F3D]" />
                <span className="text-sm font-medium text-[#008F3D]">Newsletter</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Dapatkan Update Terbaru
                <span className="block text-[#008F3D]">Langsung ke Email Anda</span>
              </h3>
              <p className="text-gray-400 max-w-md">
                Bergabung dengan 125.000+ anggota yang mendapatkan informasi terkini tentang program, 
                peluang usaha, dan kegiatan KNMP.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-[#1A1A1A] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#008F3D] focus:ring-[#008F3D]/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 px-6 bg-[#008F3D] hover:bg-[#00752F] text-white font-semibold group"
                >
                  {subscribed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Berhasil!
                    </motion.div>
                  ) : (
                    <>
                      Subscribe
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative p-5 bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden group"
                >
                  <stat.icon className="w-8 h-8 mb-3" style={{ color: stat.color }} />
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        {/* Main Links Section */}
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#008F3D] to-[#006B2D] flex items-center justify-center shadow-xl shadow-[#008F3D]/20"
                >
                  <span className="text-white font-bold text-2xl">K</span>
                </motion.div>
                <div>
                  <span className="font-bold text-2xl text-white group-hover:text-[#008F3D] transition-colors">
                    {SITE_CONFIG.name}
                  </span>
                  <p className="text-xs text-gray-500">{SITE_CONFIG.fullName}</p>
                </div>
              </Link>

              <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                {SITE_CONFIG.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <motion.a
                  href="https://maps.google.com/?q=Menara+Cakrawala+Jl+MH+Thamrin+Kav+9+Jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#008F3D] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] group-hover:bg-[#008F3D]/20 flex items-center justify-center transition-colors">
                    <MapPin className="w-5 h-5 text-[#008F3D]" />
                  </div>
                  <span className="flex-1">Menara Cakrawala 12th Floor, Jl. MH Thamrin Kav. 9, Menteng, Jakarta Pusat 10340</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
                <motion.a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#008F3D] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] group-hover:bg-[#008F3D]/20 flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-[#008F3D]" />
                  </div>
                  <span>{SITE_CONFIG.contact.phone}</span>
                </motion.a>
                <motion.a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#008F3D] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] group-hover:bg-[#008F3D]/20 flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5 text-[#008F3D]" />
                  </div>
                  <span>{SITE_CONFIG.contact.email}</span>
                </motion.a>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#008F3D]" />
                </div>
                <div>
                  <p className="text-gray-300">Senin - Jumat: 08:00 - 17:00 WIB</p>
                  <p className="text-xs">Hotline 24 Jam Tersedia</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-[#1A1A1A] hover:bg-[#008F3D] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-800 hover:border-[#008F3D]"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Platform Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#008F3D]" />
                Platform
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.platform.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#008F3D] transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Dashboard & Transparansi Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-5 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#008F3D]" />
                Koperasi & Transparansi
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.cooperative.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#008F3D] transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company & Bantuan Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-5 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#008F3D]" />
                Informasi & Bantuan
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#008F3D] transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <h4 className="font-bold text-white mb-5 mt-8 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#008F3D]" />
                Legal
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.legal.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#008F3D] transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="border-y border-gray-800 bg-[#0A0A0A]"
        >
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#1A1A1A] border border-gray-800 hover:border-[#008F3D]/30 transition-all cursor-default"
                >
                  <cert.icon className="w-5 h-5 text-[#008F3D]" />
                  <div>
                    <p className="text-sm font-medium text-white">{cert.label}</p>
                    <p className="text-xs text-gray-500">{cert.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Support Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="container mx-auto px-4 lg:px-8 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-[#008F3D]/10 via-[#1A1A1A] to-[#008F3D]/10 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#008F3D]/20 flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-[#008F3D]" />
              </div>
              <div>
                <p className="font-semibold text-white">Butuh Bantuan?</p>
                <p className="text-sm text-gray-400">Tim support kami siap membantu 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-[#008F3D]/10 hover:text-[#008F3D] hover:border-[#008F3D]"
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
              </Button>
              <Button className="bg-[#008F3D] hover:bg-[#00752F] text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-[#0A0A0A]">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500"
              >
                <span>© {currentYear} {SITE_CONFIG.fullName}.</span>
                <span className="hidden sm:inline">All rights reserved.</span>
                <span className="hidden md:inline">|</span>
                <span className="text-xs bg-[#008F3D]/20 text-[#008F3D] px-2 py-0.5 rounded">
                  {SITE_CONFIG.legal.licenseNumber}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 }}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <span>Dibuat dengan</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-[#8B0000] fill-[#8B0000]" />
                </motion.div>
                <span>untuk Indonesia Raya</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 }}
                className="flex items-center gap-4 text-xs text-gray-600"
              >
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Indonesia
                </span>
                <span>v2.0.0</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#008F3D] hover:bg-[#00752F] text-white rounded-full shadow-xl shadow-[#008F3D]/30 flex items-center justify-center transition-colors z-50"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUpRight className="w-5 h-5 rotate-[-45deg]" />
          </motion.div>
        </motion.button>
      </motion.div>
    </footer>
  )
}
