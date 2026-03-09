'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
} from 'lucide-react'
import { SITE_CONFIG, FOOTER_LINKS } from '@/constants'

const socialLinks = [
  { href: SITE_CONFIG.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: SITE_CONFIG.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: SITE_CONFIG.social.youtube, icon: Youtube, label: 'YouTube' },
  { href: SITE_CONFIG.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: SITE_CONFIG.social.facebook, icon: Facebook, label: 'Facebook' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-red-900/30"
              >
                <span className="text-white font-bold text-xl">K</span>
              </motion.div>
              <div>
                <span className="font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                  {SITE_CONFIG.name}
                </span>
                <p className="text-xs text-gray-400">{SITE_CONFIG.fullName}</p>
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-[#D4AF37] transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#8B0000] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-[#8B0000]"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cooperative Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Koperasi</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.cooperative.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Perusahaan</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-white mb-4 mt-8 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '83.763', label: 'Desa Terintegrasi' },
              { value: '125K+', label: 'Anggota Aktif' },
              { value: '38', label: 'Provinsi' },
              { value: 'Rp2.5T+', label: 'Nilai Transaksi' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>© {currentYear} {SITE_CONFIG.fullName}.</span>
              <span className="hidden sm:inline">All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Dibuat dengan</span>
              <Heart className="w-4 h-4 text-[#8B0000] fill-[#8B0000]" />
              <span>untuk Indonesia</span>
            </div>
            <div className="text-xs">
              {SITE_CONFIG.legal.licenseNumber}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
