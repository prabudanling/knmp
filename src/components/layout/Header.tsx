'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Menu, X, ChevronDown, Zap, ChevronRight,
  Home, Info, Building2, Store, Truck, GraduationCap,
  Users, Vote, LayoutDashboard, HelpCircle, Phone,
  MessageCircle, FileText, Shield, Sparkles, Heart,
  TrendingUp, Package, Globe, MapPin, Clock, Bell,
  Settings, User, LogIn, ArrowRight, ExternalLink,
  Wallet, BarChart3, Landmark, Leaf, Laptop, Briefcase,
  Crown, Map, Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/constants'

// Menu structure with icons and colors - GREEN PPP Theme
const menuStructure = [
  { 
    label: 'Beranda', 
    href: '/',
    icon: Home,
    color: '#008F3D',
    description: 'Halaman utama'
  },
  {
    label: 'Tentang',
    href: '/tentang',
    icon: Info,
    color: '#8B0000',
    description: 'Profil KNMP',
    children: [
      { label: 'Tentang KNMP', href: '/tentang', icon: Building2, color: '#8B0000' },
      { label: 'Visi & Misi', href: '/tentang#visi-misi', icon: Target, color: '#008F3D' },
      { label: '6 KPA (Anggota)', href: '/tentang#kpa', icon: Landmark, color: '#8b5cf6' },
    ]
  },
  {
    label: 'Pimpinan',
    href: '/pimpinan',
    icon: Users,
    color: '#008F3D',
    description: 'Struktur Pimpinan',
    children: [
      { label: 'Kornas (Presiden)', href: '/pimpinan/kornas', icon: Crown, color: '#8B0000', badge: '1' },
      { label: 'Korwil (Panglima Wilayah)', href: '/pimpinan/korwil', icon: Map, color: '#008F3D', badge: '38' },
      { label: 'Korda (Panglima Distrik)', href: '/pimpinan/korda', icon: Building2, color: '#3b82f6', badge: '514' },
      { label: 'Korcam (Panglima Sektor)', href: '/pimpinan/korcam', icon: MapPin, color: '#f59e0b', badge: '7.2K' },
      { label: 'Kordes (Komandan Lapangan)', href: '/pimpinan/kordes', icon: Home, color: '#8b5cf6', badge: '83K' },
    ]
  },
  { 
    label: 'Layanan', 
    href: '#',
    icon: Briefcase,
    color: '#008F3D',
    description: 'Produk & layanan',
    children: [
      { label: 'Marketplace', href: '/marketplace', icon: Store, color: '#8B0000', badge: '8 Zona' },
      { label: 'Logistik Digital', href: '/logistik', icon: Truck, color: '#f59e0b', badge: '3 Level' },
      { label: 'Smart Village', href: '/smart-village', icon: Laptop, color: '#3b82f6' },
      { label: 'Unit Usaha', href: '/unit-usaha', icon: Package, color: '#008F3D', badge: '5 Pilar' },
      { label: 'JE-P3 Academy', href: '/academy', icon: GraduationCap, color: '#8b5cf6', badge: '3 Level' },
    ]
  },
  { 
    label: 'Publik', 
    href: '#',
    icon: Globe,
    color: '#3b82f6',
    description: 'Transparansi',
    children: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: '#8B0000' },
      { label: 'SHU Transparansi', href: '/shu', icon: BarChart3, color: '#008F3D' },
      { label: 'RAT & E-Voting', href: '/rat', icon: Vote, color: '#00A847', badge: 'Live' },
      { label: 'Keanggotaan', href: '/membership', icon: Users, color: '#8b5cf6', badge: '7 Tier' },
    ]
  },
  { 
    label: 'Bantuan', 
    href: '#',
    icon: HelpCircle,
    color: '#f59e0b',
    description: 'FAQ & Kontak',
    children: [
      { label: 'FAQ', href: '/faq', icon: MessageCircle, color: '#3b82f6' },
      { label: 'Kontak', href: '/kontak', icon: Phone, color: '#008F3D' },
      { label: 'Dokumentasi', href: '/docs', icon: FileText, color: '#8b5cf6' },
    ]
  },
]

// Quick Actions for mobile - GREEN PPP Theme
const quickActions = [
  { label: 'Daftar', href: '/daftar', icon: User, color: '#008F3D' },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: '#8B0000' },
  { label: 'Marketplace', href: '/marketplace', icon: Store, color: '#00A847' },
  { label: 'Academy', href: '/academy', icon: GraduationCap, color: '#3b82f6' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const { scrollY } = useScroll()
  
  // Animate header on scroll
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.95)']
  )
  
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.08)']
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          backgroundColor: headerBg,
          boxShadow: headerShadow,
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled 
            ? 'backdrop-blur-xl' 
            : 'backdrop-blur-md'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#008F3D] via-[#00A847] to-[#8B0000] flex items-center justify-center shadow-lg shadow-green-900/20">
                  <span className="text-white font-bold text-lg md:text-xl tracking-tight">K</span>
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#008F3D] to-[#00A847]"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#008F3D] transition-colors duration-300">
                  {SITE_CONFIG.name}
                </span>
                <p className="text-[10px] md:text-[11px] text-gray-500 tracking-wide">
                  Digital OS Desa
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuStructure.map((item, index) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#008F3D] transition-colors duration-200 flex items-center gap-1 group">
                      {item.label}
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#008F3D] transition-colors duration-200 group"
                    >
                      {item.label}
                      <motion.span 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#008F3D] to-[#8B0000] group-hover:w-full transition-all duration-300"
                        layoutId={`underline-${index}`}
                      />
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2 min-w-[220px]"
                        >
                          <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl shadow-gray-900/10 p-2 overflow-hidden">
                            {item.children.map((child, childIndex) => (
                              <motion.div
                                key={child.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: childIndex * 0.05 }}
                              >
                                <Link
                                  href={child.href}
                                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[#008F3D] hover:bg-green-50 rounded-lg transition-all duration-200 group"
                                >
                                  <child.icon className="w-4 h-4" style={{ color: child.color }} />
                                  <span className="flex-1">{child.label}</span>
                                  {child.badge && (
                                    <Badge className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-[#008F3D] to-[#8B0000] text-white border-0">
                                      {child.badge}
                                    </Badge>
                                  )}
                                  <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#008F3D] hover:bg-green-50 transition-colors">
                  Dashboard
                </Button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/daftar">
                  <Button size="sm" className="bg-gradient-to-r from-[#008F3D] to-[#00A847] hover:from-[#00752F] hover:to-[#008F3D] text-white shadow-lg shadow-green-900/20 hover:shadow-green-900/30 transition-all duration-300 relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Zap className="w-4 h-4 mr-1 relative z-10" />
                    <span className="hidden lg:inline relative z-10">Gabung Sekarang</span>
                    <span className="lg:hidden relative z-10">Gabung</span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button - ENHANCED & VISIBLE */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "lg:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 shadow-lg",
                isOpen 
                  ? "bg-[#008F3D] text-white shadow-green-900/30" 
                  : "bg-gradient-to-br from-[#008F3D] to-[#00A847] text-white shadow-green-900/20"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        
        {/* Progress bar at bottom - Hidden on mobile */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#008F3D] via-[#8B0000] to-[#008F3D] hidden md:block"
          style={{
            scaleX: useTransform(scrollY, [0, 5000], [0, 1]),
            transformOrigin: 'left',
          }}
        />
      </motion.header>

      {/* Mobile Navigation Overlay - BRILLIANT DESIGN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop with blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-900/30 to-gray-900/40 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel - Full Height Brilliant Design */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[88%] max-w-sm bg-white overflow-y-auto shadow-2xl"
            >
              {/* Header Section with User Info */}
              <div className="sticky top-0 z-10 bg-gradient-to-br from-[#008F3D] via-[#00A847] to-[#008F3D] px-5 pt-16 pb-6">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {/* Logo & Branding */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                    <span className="text-[#8B0000] font-bold text-xl">K</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-white">{SITE_CONFIG.name}</h2>
                    <p className="text-xs text-white/70">Digital OS Desa Indonesia</p>
                  </div>
                </div>
                
                {/* Quick Actions Row */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {quickActions.map((action, i) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={action.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${action.color}20` }}
                        >
                          <action.icon className="w-4 h-4" style={{ color: action.color }} />
                        </div>
                        <span className="text-[10px] font-medium text-white/90">{action.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="p-4 space-y-1">
                {menuStructure.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    {item.children ? (
                      // Expandable Menu Item
                      <div className="rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200",
                            expandedMobile === item.label 
                              ? "bg-gradient-to-r from-red-50 to-amber-50" 
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <item.icon className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedMobile === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        </button>
                        
                        {/* Sub Menu */}
                        <AnimatePresence>
                          {expandedMobile === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pr-2 py-2 space-y-1">
                                {item.children.map((child, ci) => (
                                  <motion.div
                                    key={child.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: ci * 0.03 }}
                                  >
                                    <Link
                                      href={child.href}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:text-[#008F3D] hover:bg-green-50 transition-all duration-200 group"
                                    >
                                      <child.icon className="w-4 h-4" style={{ color: child.color }} />
                                      <span className="flex-1 text-sm">{child.label}</span>
                                      {child.badge && (
                                        <Badge className="text-[9px] px-1.5 py-0.5 bg-gradient-to-r from-[#008F3D] to-[#8B0000] text-white border-0">
                                          {child.badge}
                                        </Badge>
                                      )}
                                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Direct Link
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-[#008F3D] transition-colors">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#008F3D] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Section */}
              <div className="p-4 pt-2 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 bg-gradient-to-r from-red-50 via-amber-50 to-red-50 rounded-xl border border-red-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008F3D] to-[#8B0000] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Gabung KNMP</p>
                      <p className="text-xs text-gray-500">7 Tier Keanggotaan</p>
                    </div>
                  </div>
                  <Link href="/daftar" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-[#008F3D] to-[#00A847] text-white shadow-lg shadow-green-900/20 hover:shadow-green-900/30 transition-all group">
                      <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Gabung Sekarang
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
                
                {/* Stats Mini */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {[
                    { value: '83.763', label: 'Desa', icon: Building2 },
                    { value: '6', label: 'KPA (Anggota)', icon: Users },
                    { value: '195', label: 'Negara', icon: Globe },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                      <stat.icon className="w-4 h-4 mx-auto mb-1 text-[#8B0000]" />
                      <p className="font-bold text-sm text-gray-900">{stat.value}</p>
                      <p className="text-[10px] text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 pt-0 mt-2"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>© 2026 KNMP</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#8B0000] fill-[#8B0000]" />
                    Indonesia
                  </span>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center justify-center gap-2">
                  {[
                    { icon: Globe, label: 'Web', href: 'https://kopnusa.id' },
                    { icon: MessageCircle, label: 'Chat', href: '#' },
                    { icon: Phone, label: 'Call', href: 'tel:+62' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#8B0000] hover:text-white text-gray-600 flex items-center justify-center transition-all duration-200"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
