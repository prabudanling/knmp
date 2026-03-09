'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Wheat,
  Store,
  Truck,
  Laptop,
  HeartPulse,
  Moon,
  Globe,
  Zap,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  Upload,
  Shield,
  CreditCard,
  Percent,
  Users,
  BadgeCheck,
  Leaf,
  Award,
  ExternalLink,
  Package,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SAMPLE_PRODUCTS, MARKETPLACE_ZONES } from '@/data/mocks';
import type { Product, MarketplaceZone } from '@/types';
import { cn } from '@/lib/utils';

// =====================
// Animation Variants
// =====================
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

// =====================
// Zone Colors & Icons
// =====================
const zoneConfig: Record<string, { color: string; bgColor: string; icon: React.ReactNode; emoji: string }> = {
  AGRI: { color: '#22c55e', bgColor: '#22c55e20', icon: <Wheat className="w-6 h-6" />, emoji: '🌾' },
  RETAIL_UMKM: { color: '#3b82f6', bgColor: '#3b82f620', icon: <Store className="w-6 h-6" />, emoji: '🏪' },
  LOGISTICS: { color: '#f59e0b', bgColor: '#f59e0b20', icon: <Truck className="w-6 h-6" />, emoji: '📦' },
  DIGITAL: { color: '#8b5cf6', bgColor: '#8b5cf620', icon: <Laptop className="w-6 h-6" />, emoji: '💻' },
  HEALTH: { color: '#ef4444', bgColor: '#ef444420', icon: <HeartPulse className="w-6 h-6" />, emoji: '🏥' },
  SPIRITUAL: { color: '#06b6d4', bgColor: '#06b6d420', icon: <Moon className="w-6 h-6" />, emoji: '🕌' },
  EXPORT: { color: '#D4AF37', bgColor: '#D4AF3720', icon: <Globe className="w-6 h-6" />, emoji: '🌍' },
  ENERGY: { color: '#f97316', bgColor: '#f9731620', icon: <Zap className="w-6 h-6" />, emoji: '⚡' },
};

// =====================
// Format Utilities
// =====================
function formatCurrency(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}rb`;
  }
  return num.toLocaleString('id-ID');
}

// =====================
// Hero Section
// =====================
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/30 px-4 py-1">
              <Store className="w-3 h-3 mr-2" />
              8 Zona Produksi Terintegrasi
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-responsive-hero font-bold text-white leading-tight"
          >
            Marketplace Zonasi{' '}
            <span className="text-gradient-gold">KNMP</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-responsive-subtitle text-gray-300 max-w-3xl mx-auto"
          >
            Platform B2B/B2C untuk{' '}
            <span className="text-[#D4AF37] font-semibold">83.763 Desa Indonesia</span>
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari produk dari desa di seluruh Indonesia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 bg-white/95 border-0 rounded-xl text-foreground placeholder:text-muted-foreground shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#8B0000] hover:bg-[#6B0000]">
                Cari
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-white">56.650+</p>
              <p className="text-sm text-gray-400">Produk Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">125.000+</p>
              <p className="text-sm text-gray-400">Seller T3+</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">38</p>
              <p className="text-sm text-gray-400">Provinsi</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Rp 2,5T</p>
              <p className="text-sm text-gray-400">Transaksi/bulan</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// Zones Overview Section
// =====================
function ZonesOverviewSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            <span className="text-gradient-primary">8 Zona</span> Marketplace Terintegrasi
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Setiap zona dirancang untuk kategori produk spesifik dengan dukungan penuh dari ekosistem KNMP
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {MARKETPLACE_ZONES.map((zone) => {
            const config = zoneConfig[zone.id];
            return (
              <motion.div key={zone.id} variants={scaleIn}>
                <Card className="h-full card-hover-lift border-t-4 group cursor-pointer" style={{ borderTopColor: config.color }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: config.bgColor }}
                      >
                        <span style={{ color: config.color }}>{config.icon}</span>
                      </div>
                      <span className="text-2xl">{config.emoji}</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{zone.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{zone.description}</p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="font-semibold" style={{ color: config.color }}>
                        {zone.productCount.toLocaleString('id-ID')} produk
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {zone.topCategories.slice(0, 3).map((cat, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// Featured Products Section
// =====================
function FeaturedProductsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const filters = ['ALL', 'AGRI', 'RETAIL', 'DIGITAL', 'HEALTH', 'EXPORT', 'ENERGY', 'SPIRITUAL', 'LOGISTICS'];

  const filteredProducts = activeFilter === 'ALL'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.category.includes(activeFilter));

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Produk <span className="text-gradient-gold">Unggulan</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Produk terbaik dari seller T3+ di seluruh Indonesia
          </motion.p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-full',
                activeFilter === filter && 'bg-[#8B0000] hover:bg-[#6B0000]'
              )}
            >
              {filter === 'ALL' ? 'Semua' : filter}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const config = zoneConfig[product.category] || zoneConfig.AGRI;

  return (
    <motion.div variants={scaleIn}>
      <Card className="h-full card-hover-lift overflow-hidden group">
        {/* Product Image Placeholder */}
        <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-muted-foreground/30" />
          </div>

          {/* Zone Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              className="text-xs"
              style={{ backgroundColor: config.bgColor, color: config.color }}
            >
              {config.emoji} {product.category}
            </Badge>
          </div>

          {/* Certification Badges */}
          {product.certification.length > 0 && (
            <div className="absolute top-3 right-3 flex gap-1">
              {product.certification.slice(0, 2).map((cert, i) => (
                <Badge key={i} variant="outline" className="text-[10px] bg-white/90">
                  {cert}
                </Badge>
              ))}
            </div>
          )}

          {/* Quick Add Button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="w-10 h-10 rounded-full bg-[#8B0000] hover:bg-[#6B0000]">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Seller Info */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8B0000] to-[#D4AF37] flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {product.sellerName.charAt(0)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground truncate">{product.sellerName}</span>
            <BadgeCheck className="w-3 h-3 text-[#22c55e]" />
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
            {product.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <MapPin className="w-3 h-3" />
            <span>{product.village}, {product.province}</span>
          </div>

          {/* Rating & Sold */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatNumber(product.sold)} terjual
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg" style={{ color: config.color }}>
              {formatCurrency(product.price)}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// =====================
// How It Works Section
// =====================
function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Daftar sebagai Seller',
      description: 'Bergabung sebagai anggota T3+ untuk mendapatkan hak upload produk ke Marketplace Zonasi',
      icon: <UserPlus className="w-8 h-8" />,
      color: '#22c55e',
    },
    {
      number: 2,
      title: 'Upload Produk',
      description: 'Upload produk dengan sertifikasi lengkap (Halal, Organik, SNI, dll)',
      icon: <Upload className="w-8 h-8" />,
      color: '#3b82f6',
    },
    {
      number: 3,
      title: 'Verifikasi AI & Blockchain',
      description: 'Produk diverifikasi otomatis oleh AI dan tercatat di blockchain untuk transparansi',
      icon: <Shield className="w-8 h-8" />,
      color: '#8b5cf6',
    },
    {
      number: 4,
      title: 'Transaksi dengan Smart Contract',
      description: 'Transaksi aman dengan smart contract, pembayaran otomatis, dan tracking real-time',
      icon: <CreditCard className="w-8 h-8" />,
      color: '#D4AF37',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Bagaimana <span className="text-gradient-primary">Cara Kerja</span> Marketplace
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proses mudah dan transparan untuk mulai berjualan di Marketplace KNMP
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#22c55e] via-[#3b82f6] via-[#8b5cf6] to-[#D4AF37] hidden lg:block transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeInUp}>
                <Card className="h-full card-hover-lift text-center">
                  <CardContent className="p-6">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <span style={{ color: step.color }}>{step.icon}</span>
                    </div>

                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// Seller Benefits Section
// =====================
function SellerBenefitsSection() {
  const benefits = [
    {
      icon: <Percent className="w-8 h-8" />,
      title: 'Fee Rendah',
      description: 'Hanya 2-3% dari transaksi, jauh di bawah marketplace lain yang bisa mencapai 10-20%',
      value: '2-3%',
      color: '#22c55e',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Akses 125.000+ Pembeli',
      description: 'Jangkau pembeli dari seluruh Indonesia dengan sistem rekomendasi berbasis AI',
      value: '125K+',
      color: '#3b82f6',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Blockchain Verified',
      description: 'Setiap transaksi tercatat di blockchain untuk keamanan dan transparansi maksimal',
      value: '100%',
      color: '#8b5cf6',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Export Ready',
      description: 'Akses ke pasar global dengan sertifikasi internasional dan dukungan logistik ekspor',
      value: '195 Negara',
      color: '#D4AF37',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#1a1a2e] via-[#8B0000]/20 to-[#1a1a2e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4 text-white">
            Keuntungan Jadi <span className="text-gradient-gold">Seller KNMP</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300 text-lg max-w-2xl mx-auto">
            Bergabung dengan ekosistem marketplace yang mendukung pertumbuhan usaha Anda
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardContent className="p-6 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${benefit.color}20` }}
                  >
                    <span style={{ color: benefit.color }}>{benefit.icon}</span>
                  </div>

                  <p
                    className="text-3xl font-bold mb-2"
                    style={{ color: benefit.color }}
                  >
                    {benefit.value}
                  </p>

                  <h3 className="font-semibold text-white text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// Product Certification Section
// =====================
function ProductCertificationSection() {
  const certifications = [
    { name: 'Organik', icon: <Leaf className="w-6 h-6" />, color: '#22c55e', description: 'Produk organik tersertifikasi' },
    { name: 'Halal', icon: <BadgeCheck className="w-6 h-6" />, color: '#06b6d4', description: 'Terjamin kehalalan' },
    { name: 'Fair Trade', icon: <Users className="w-6 h-6" />, color: '#3b82f6', description: 'Perdagangan adil untuk petani' },
    { name: 'SNI', icon: <Award className="w-6 h-6" />, color: '#D4AF37', description: 'Standar Nasional Indonesia' },
    { name: 'Ekspor Ready', icon: <Globe className="w-6 h-6" />, color: '#8b5cf6', description: 'Siap untuk pasar global' },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            <span className="text-gradient-primary">Sertifikasi Produk</span> Terpercaya
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Setiap produk di Marketplace KNMP dilengkapi dengan sertifikasi untuk menjamin kualitas dan keamanan
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="h-full card-hover-lift text-center">
                <CardContent className="p-6">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <span style={{ color: cert.color }}>{cert.icon}</span>
                  </div>

                  <h3 className="font-semibold text-lg mb-1" style={{ color: cert.color }}>
                    {cert.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm text-muted-foreground">BPOM Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm text-muted-foreground">Halal MUI</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm text-muted-foreground">LSO Indonesia</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm text-muted-foreground">Blockchain Secured</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// CTA Section
// =====================
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#8B0000] to-[#6B0000] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold text-white mb-6">
            Mulai Berjualan di{' '}
            <span className="text-gradient-gold">Marketplace KNMP</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Bergabung dengan 125.000+ seller dari 83.763 desa di seluruh Indonesia dan jadilah bagian dari ekosistem ekonomi digital desa
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-white text-[#8B0000] hover:bg-white/90 px-8 py-6 text-lg"
            >
              Jadi Seller T3+
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <ExternalLink className="mr-2 w-5 h-5" />
              Pelajari Lebih Lanjut
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Pendaftaran Gratis</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Verifikasi Cepat</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Support 24/7</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// Main Page Component
// =====================
export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ZonesOverviewSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <SellerBenefitsSection />
      <ProductCertificationSection />
      <CTASection />
    </main>
  );
}
