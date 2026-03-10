'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ChevronDown, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/constants'

// Menu structure with dropdowns for better organization
const menuStructure = [
  { 
    label: 'Beranda', 
    href: '/' 
  },
  { 
    label: 'Tentang', 
    href: '/tentang',
    children: [
      { label: 'Tentang KNMP', href: '/tentang' },
      { label: 'Visi & Misi', href: '/visi-misi' },
      { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
      { label: '6 KPA', href: '/kpa' },
    ]
  },
  { 
    label: 'Keanggotaan', 
    href: '/membership',
    highlight: true,
  },
  { 
    label: 'Layanan', 
    href: '#',
    children: [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Logistik Digital', href: '/logistik' },
      { label: 'Smart Village', href: '/smart-village' },
      { label: 'Unit Usaha', href: '/unit-usaha' },
      { label: 'JE-P3 Academy', href: '/academy' },
    ]
  },
  { 
    label: 'Publik', 
    href: '#',
    children: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'SHU Transparansi', href: '/shu' },
      { label: 'RAT & E-Voting', href: '/rat' },
      { label: 'Integrasi Desa', href: '/integrasi-desa' },
    ]
  },
  { 
    label: 'Bantuan', 
    href: '#',
    children: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Kontak', href: '/kontak' },
    ]
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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
            ? 'backdrop-blur-xl border-b border-gray-100' 
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
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#8B0000] via-[#B22222] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-red-900/20">
                  <span className="text-white font-bold text-lg md:text-xl tracking-tight">K</span>
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-[#8B0000] transition-colors duration-300">
                  {SITE_CONFIG.name}
                </span>
                <p className="text-[10px] md:text-[11px] text-gray-500 tracking-wide">
                  Digital OS Desa
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Reorganized */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuStructure.map((item, index) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#8B0000] transition-colors duration-200 flex items-center gap-1 group">
                      {item.label}
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-colors duration-200 group",
                        item.highlight 
                          ? "bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white rounded-lg shadow-md hover:shadow-lg"
                          : "text-gray-600 hover:text-[#8B0000]"
                      )}
                    >
                      {item.label}
                      {!item.highlight && (
                        <motion.span 
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#8B0000] to-[#D4AF37] group-hover:w-full transition-all duration-300"
                          layoutId={`underline-${index}`}
                        />
                      )}
                    </Link>
                  )}
                  
                  {/* Dropdown Menu with Animation */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2 min-w-[200px]"
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
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-[#8B0000] hover:bg-red-50 rounded-lg transition-all duration-200 group"
                                >
                                  {child.label}
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
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#8B0000] hover:bg-red-50 transition-colors">
                  Dashboard
                </Button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/kontak">
                  <Button size="sm" className="bg-gradient-to-r from-[#8B0000] to-[#B22222] hover:from-[#B22222] hover:to-[#DC143C] text-white shadow-lg shadow-red-900/20 hover:shadow-red-900/30 transition-all duration-300 relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Zap className="w-4 h-4 mr-1 relative z-10" />
                    <span className="hidden lg:inline relative z-10">Gabung Sekarang</span>
                    <span className="lg:hidden relative z-10">Gabung</span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:bg-red-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Progress bar at bottom - shows scroll progress */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]"
          style={{
            scaleX: useTransform(scrollY, [0, 5000], [0, 1]),
            transformOrigin: 'left',
          }}
        />
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-gray-100 overflow-y-auto shadow-2xl"
            >
              <div className="p-6 pt-20">
                {/* Mobile Menu with collapsible sections */}
                <div className="space-y-2">
                  {menuStructure.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item.children ? (
                        <div className="border-b border-gray-100 last:border-0">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {item.label}
                          </div>
                          <div className="pb-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 text-base text-gray-700 hover:text-[#8B0000] hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                            item.highlight 
                              ? "bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white text-center shadow-lg"
                              : "text-gray-700 hover:text-[#8B0000] hover:bg-red-50"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-8 border-t border-gray-100 space-y-3"
                >
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-red-50 hover:text-[#8B0000] hover:border-[#8B0000]">
                      Dashboard Member
                    </Button>
                  </Link>
                  <Link href="/kontak" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-[#8B0000] to-[#B22222] text-white shadow-lg shadow-red-900/20">
                      <Zap className="w-4 h-4 mr-2" />
                      Gabung Sekarang
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
