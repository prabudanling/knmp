'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  Users,
  Scale,
  Shield,
  GraduationCap,
  Handshake,
  Heart,
  MapPin,
  TrendingUp,
  Flag,
  Rocket,
  Network,
  CheckCircle2,
  ArrowRight,
  Award,
  FileText,
  Globe,
  Vote,
  Zap,
  Building,
  Star,
  ChevronRight,
  Landmark,
  Plus, // Added for empty slots
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ORIGIN_TIMELINE,
  LEGAL_INFO,
  COOPERATIVE_PRINCIPLES,
  DUAL_ENTITY,
  VISION_2045,
  TEAM_STRUCTURE,
  PARTNER_LOGOS,
  KDMP_ALIGNMENT,
  HERO_STATS,
} from '@/data/mocks';
import { SITE_CONFIG, COLORS } from '@/constants';

// Animation variants
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

// Helper function to get icon component
const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, React.ReactNode> = {
    Users: <Users className={className} />,
    Vote: <Vote className={className} />,
    Scale: <Scale className={className} />,
    Shield: <Shield className={className} />,
    GraduationCap: <GraduationCap className={className} />,
    Handshake: <Handshake className={className} />,
    Heart: <Heart className={className} />,
    MapPin: <MapPin className={className} />,
    TrendingUp: <TrendingUp className={className} />,
    Flag: <Flag className={className} />,
    Rocket: <Rocket className={className} />,
    Network: <Network className={className} />,
    Building2: <Building2 className={className} />,
  };
  return icons[iconName] || <Users className={className} />;
};

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37] px-4 py-1 text-sm">
              Tentang Kami
            </Badge>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-responsive-hero font-bold text-white leading-tight"
          >
            Tentang{' '}
            <span className="text-gradient-gold">Koperasi Nusantara</span>
            <br />
            <span className="text-gradient-gold">Merah Putih</span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-responsive-subtitle text-gray-300 max-w-3xl mx-auto"
          >
            Platform koperasi digital pertama di Indonesia yang mengintegrasikan seluruh ekosistem desa
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8"
            >
              Gabung Sekarang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              Lihat Visi 2045
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Origin Story Section
function OriginStorySection() {
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
            <span className="text-gradient-primary">Perjalanan</span> Kami
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dari visi sederhana hingga menjadi platform koperasi digital terbesar di Indonesia
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#D4AF37] via-[#8B0000] to-[#1a1a2e] hidden md:block" />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {ORIGIN_TIMELINE.map((item, index) => (
              <motion.div
                key={item.year}
                variants={fadeInUp}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <Card className="card-hover-lift border-l-4 border-l-[#D4AF37]">
                    <CardHeader>
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Badge className="bg-[#8B0000] text-white">{item.year}</Badge>
                        <span className="text-[#D4AF37]">{getIcon(item.icon, 'w-5 h-5')}</span>
                      </div>
                      <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline dot */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#8B0000] border-4 border-[#D4AF37] flex items-center justify-center glow-gold">
                  <span className="text-white font-bold text-sm">{item.year.slice(-2)}</span>
                </div>
                
                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- REVISED FOUNDERS SECTION (5 SLOTS) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="flex items-center justify-center mb-8 gap-2">
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
            <h3 className="text-2xl font-bold text-white text-center">Dewan Founder</h3>
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* SLOT 1: CEO (Filled) */}
            <motion.div variants={scaleIn} className="md:col-span-1">
              <Card className="h-full border-2 border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative mb-4 group">
                    <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-lg group-hover:bg-[#D4AF37]/30 transition-all"></div>
                    <Avatar className="w-24 h-24 border-2 border-[#D4AF37] relative z-10 bg-navy">
                      <AvatarImage src="/images/ceo-arif.jpg" alt="CEO" />
                      <AvatarFallback className="bg-[#D4AF37] text-navy font-bold text-xl">
                        AH
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-maroon rounded-full p-1.5 border-2 border-navy z-20">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    </div>
                  </div>
                  
                  <Badge className="bg-[#D4AF37] text-[#1a1a2e] hover:bg-[#D4AF37]/90 mb-3 font-bold">
                    CEO
                  </Badge>
                  
                  <h4 className="text-lg font-bold text-white leading-tight mb-1">
                    Drs. H. Arif Rachman Hakim
                  </h4>
                  <p className="text-xs text-gray-400 mb-4">Chief Executive Officer</p>
                  
                  <div className="mt-auto w-full space-y-2">
                    <div className="h-px w-full bg-white/10"></div>
                    <p className="text-xs text-gray-300 italic">
                      "Memimpin transformasi digital dengan integritas dan visi kebangsaan."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* SLOT 2: Empty */}
            <motion.div variants={scaleIn} className="md:col-span-1">
              <Card className="h-full border-2 border-dashed border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all cursor-default group">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-gray-600 group-hover:text-[#D4AF37]" />
                  </div>
                  <h4 className="font-bold text-gray-400 group-hover:text-white transition-colors">Founder Seat</h4>
                  <p className="text-xs text-gray-600 mt-1">Open Position</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* SLOT 3: Empty */}
            <motion.div variants={scaleIn} className="md:col-span-1">
              <Card className="h-full border-2 border-dashed border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all cursor-default group">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-gray-600 group-hover:text-[#D4AF37]" />
                  </div>
                  <h4 className="font-bold text-gray-400 group-hover:text-white transition-colors">Founder Seat</h4>
                  <p className="text-xs text-gray-600 mt-1">Open Position</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* SLOT 4: Empty */}
            <motion.div variants={scaleIn} className="md:col-span-1">
              <Card className="h-full border-2 border-dashed border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all cursor-default group">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-gray-600 group-hover:text-[#D4AF37]" />
                  </div>
                  <h4 className="font-bold text-gray-400 group-hover:text-white transition-colors">Founder Seat</h4>
                  <p className="text-xs text-gray-600 mt-1">Open Position</p>
                </CardContent>
              </Card>
            </motion.div>

             {/* SLOT 5: Empty (Completing the 5 slots) */}
             <motion.div variants={scaleIn} className="md:col-span-1">
              <Card className="h-full border-2 border-dashed border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/5 transition-all cursor-default group">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-8 h-8 text-gray-600 group-hover:text-[#D4AF37]" />
                  </div>
                  <h4 className="font-bold text-gray-400 group-hover:text-white transition-colors">Founder Seat</h4>
                  <p className="text-xs text-gray-600 mt-1">Open Position</p>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Legal & Compliance Section
function LegalComplianceSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Legal & <span className="text-gradient-primary">Compliance</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Koperasi yang terdaftar dan diawasi sesuai regulasi Indonesia
          </motion.p>
        </motion.div>

        {/* Legal Info Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2">Akta Koperasi</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.aktaKoperasi}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Landmark className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className
