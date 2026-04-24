'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  Map,
  Building2,
  MapPin,
  Home,
  Crown,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PIMPINAN_LEVELS } from '@/data/mocks';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Crown,
  Map,
  Building: Building2,
  MapPin,
  Home,
};

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#8B0000]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#008F3D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B0000]/30 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#008F3D] text-white px-4 py-1 text-sm">
              <Crown className="w-4 h-4 mr-2" />
              Struktur Pimpinan
            </Badge>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-responsive-hero font-bold text-white leading-tight"
          >
            Struktur <span className="text-[#00A847]">Pimpinan</span>
            <br />
            KNMP
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-responsive-subtitle text-white/80 max-w-3xl mx-auto"
          >
            Hierarki kepemimpinan dari tingkat nasional hingga desa untuk memastikan koordinasi yang efektif
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// Sub Menu Navigation - Always Visible
function SubMenuNavigation() {
  const levels = [
    { id: 'kornas', name: 'Kornas', title: 'Presiden', href: '/pimpinan/kornas', icon: Crown, color: '#8B0000', badge: '1' },
    { id: 'korwil', name: 'Korwil', title: 'Panglima Wilayah', href: '/pimpinan/korwil', icon: Map, color: '#008F3D', badge: '38' },
    { id: 'korda', name: 'Korda', title: 'Panglima Distrik', href: '/pimpinan/korda', icon: Building2, color: '#3b82f6', badge: '514' },
    { id: 'korcam', name: 'Korcam', title: 'Panglima Sektor', href: '/pimpinan/korcam', icon: MapPin, color: '#f59e0b', badge: '7.2K' },
    { id: 'kordes', name: 'Kordes', title: 'Komandan Lapangan', href: '/pimpinan/kordes', icon: Home, color: '#8b5cf6', badge: '83K' },
  ];

  return (
    <section className="sticky top-16 md:top-20 z-40 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          <Link href="/pimpinan" className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 font-semibold hover:text-[#8B0000] hover:bg-red-50"
            >
              Semua
            </Button>
          </Link>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          {levels.map((level) => (
            <Link key={level.id} href={level.href} className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-gray-50"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${level.color}15` }}
                  >
                    <level.icon className="w-4 h-4" style={{ color: level.color }} />
                  </div>
                  <span className="hidden sm:inline font-medium">{level.name}</span>
                  <span className="sm:hidden font-medium text-xs">{level.name}</span>
                  <Badge
                    className="text-[10px] px-1.5 py-0.5"
                    style={{ backgroundColor: level.color, color: 'white' }}
                  >
                    {level.badge}
                  </Badge>
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Level Card Component
function LevelCard({ level, index }: { level: typeof PIMPINAN_LEVELS[0]; index: number }) {
  const Icon = iconMap[level.icon] || Users;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={level.href}>
        <Card className="h-full card-hover-lift border-l-4 group cursor-pointer relative" style={{ borderLeftColor: level.color }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${level.color}15` }}
              >
                <Icon className="w-7 h-7" style={{ color: level.color }} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-gray-900">
                    {level.shortName}
                  </h3>
                  <Badge className="text-xs" style={{ backgroundColor: `${level.color}20`, color: level.color }}>
                    {level.title}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{level.name}</p>
                <p className="text-sm text-gray-500 mb-4">{level.description}</p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {level.stats.map((stat, i) => (
                    <div key={i} className="text-center px-3 py-1 bg-gray-50 rounded-lg">
                      <p className="font-bold text-sm" style={{ color: level.color }}>
                        {stat.value.toLocaleString()}{stat.suffix}
                      </p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                {/* Responsibilities Preview */}
                <div className="space-y-1 mb-4">
                  {level.responsibilities.slice(0, 3).map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: level.color }} />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: level.color }}>
                  <span>Lihat Detail</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            
            {/* Position Count Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="text-xs font-semibold">
                {level.totalPositions.toLocaleString()} Posisi
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// Levels Section
function LevelsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Hierarki <span className="text-[#8B0000]">Pimpinan</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Struktur kepemimpinan dari tingkat nasional hingga desa dalam satu kesatuan komando
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {PIMPINAN_LEVELS.map((level, index) => (
            <LevelCard key={level.id} level={level} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Hierarchy Visualization
function HierarchySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Visualisasi <span className="text-[#008F3D]">Hierarki</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
            Dari 1 Presiden hingga 83.763 Komandan Lapangan di seluruh Indonesia
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {PIMPINAN_LEVELS.map((level, index) => {
            const Icon = iconMap[level.icon] || Users;
            const width = 100 - (index * 15);
            
            return (
              <div key={level.id} className="flex flex-col items-center w-full">
                {/* Connector Line */}
                {index > 0 && (
                  <div 
                    className="w-0.5 h-6"
                    style={{ backgroundColor: level.color }}
                  />
                )}
                
                <Link href={level.href} className="w-full flex justify-center mb-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:shadow-md transition-shadow w-full max-w-xl"
                    style={{ 
                      width: `${width}%`,
                      backgroundColor: `${level.color}15`,
                      border: `2px solid ${level.color}30`
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: level.color }} />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900">{level.shortName}</span>
                      <span className="text-gray-500 mx-2">|</span>
                      <span className="text-gray-600">{level.title}</span>
                    </div>
                    <Badge className="text-xs" style={{ backgroundColor: level.color, color: 'white' }}>
                      {level.totalPositions.toLocaleString()}
                    </Badge>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-[#8B0000]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white">
            Jadilah Bagian dari <span className="text-[#00A847]">Kepemimpinan</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/80 text-lg max-w-2xl mx-auto">
            Bergabunglah dengan struktur pimpinan KNMP dan menjadi bagian dari transformasi desa Indonesia
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[#008F3D] hover:bg-[#006B2D] text-white px-8"
              asChild
            >
              <Link href="/membership">
                Daftar Sekarang
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/kontak">
                Hubungi Kami
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PimpinanPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SubMenuNavigation />
      <LevelsSection />
      <HierarchySection />
      <CTASection />
    </main>
  );
}
