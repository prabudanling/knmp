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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#8B0000]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#8B0000]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#008F3D]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6B0000]/30 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="border-white text-white px-4 py-1 text-sm bg-white/10">
              Tentang Kami
            </Badge>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-responsive-hero font-bold text-white leading-tight"
          >
            Tentang{' '}
            <span className="text-[#00A847]">Koperasi Nusantara</span>
            <br />
            <span className="text-[#00A847]">Merah Putih</span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-responsive-subtitle text-white/90 max-w-3xl mx-auto font-medium"
          >
            Platform koperasi digital pertama di Indonesia yang mengintegrasikan seluruh ekosistem desa
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[#008F3D] hover:bg-[#00A847] text-white px-8 font-semibold"
            >
              Gabung Sekarang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 font-semibold"
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
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#8B0000] hidden md:block" />
          
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
                  <Card className="card-hover-lift border-l-4 border-l-[#008F3D]">
                    <CardHeader>
                      <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Badge className="bg-[#8B0000] text-white">{item.year}</Badge>
                        <span className="text-[#008F3D]">{getIcon(item.icon, 'w-5 h-5')}</span>
                      </div>
                      <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline dot */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#8B0000] border-4 border-[#008F3D] flex items-center justify-center glow-gold">
                  <span className="text-white font-bold text-sm">{item.year.slice(-2)}</span>
                </div>
                
                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dewan Pendiri - 9 Anggota */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="mt-16"
        >
          <Card className="bg-[#8B0000] border-[#008F3D]/30 border-2">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge className="bg-[#008F3D] text-white mb-3">9 Dewan Pendiri</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Anggota Ganjil — Quorum & Legal
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Sembilan pendiri (angka ganjil) memenuhi persyaratan quorum pengambilan keputusan dengan prinsip simple majority (5:4) maupun supermajority (6:3 atau 7:2).
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Prof. Wirono, S.E., M.Pd', position: 'Pendiri ke-1', role: 'Presiden / Ketua Umum' },
                  { name: 'Drs. H. Arif Rachman Hakim, M.M.', position: 'Pendiri ke-2', role: 'Wakil Presiden' },
                  { name: 'Hj. Inna Hadianala, S.E.', position: 'Pendiri ke-3', role: 'Ketua Dewan Pembina' },
                  { name: 'Dr. Cecep Sumarno', position: 'Pendiri ke-4', role: 'Sekretaris Jenderal' },
                  { name: '(Posisi Kosong)', position: 'Pendiri ke-5', role: 'Wakil Sekretaris Jenderal' },
                  { name: 'Fawwaz Arif Al Jabar, S.E., M.M.', position: 'Pendiri ke-6', role: 'Ketua Dewan Penasihat' },
                  { name: 'Andi Darmadji, S.E.', position: 'Pendiri ke-7', role: 'Koordinator Wilayah Kalimantan' },
                  { name: 'Dr. Habib', position: 'Pendiri ke-8', role: 'Anggota Dewan Pengawas' },
                  { name: 'Prof. Dr. Tedy Mantoro', position: 'Pendiri ke-9', role: 'Ketua Dewan Pengawas' },
                ].map((founder, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "p-4 rounded-xl border border-white/20",
                      founder.name === '(Posisi Kosong)' ? 'bg-white/5 opacity-60' : 'bg-white/10'
                    )}
                  >
                    <p className="font-semibold text-white text-sm">{founder.name}</p>
                    <p className="text-xs text-[#00A847] font-semibold">{founder.position}</p>
                    <p className="text-xs text-white/70 mt-1">{founder.role}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#008F3D]/10 flex items-center justify-center">
                  <Landmark className="w-7 h-7 text-[#008F3D]" />
                </div>
                <h3 className="font-semibold mb-2">NPWP</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.npwp}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1a1a2e]/10 flex items-center justify-center">
                  <Building className="w-7 h-7 text-[#1a1a2e]" />
                </div>
                <h3 className="font-semibold mb-2">Badan Hukum</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.legalEntity}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="h-full card-hover-lift">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                  <Award className="w-7 h-7 text-[#8B0000]" />
                </div>
                <h3 className="font-semibold mb-2">Terdaftar di</h3>
                <p className="text-sm text-muted-foreground">{LEGAL_INFO.registeredAt}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* 7 Principles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Card className="border-[#008F3D]/20">
            <CardHeader className="text-center border-b">
              <CardTitle className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-[#008F3D]" />
                7 Prinsip Koperasi ICA + UU 25/1992
              </CardTitle>
              <CardDescription>
                Prinsip internasional koperasi yang menjadi landasan operasional kami
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {COOPERATIVE_PRINCIPLES.map((principle) => (
                  <motion.div
                    key={principle.number}
                    variants={fadeInUp}
                    className="group p-4 rounded-lg border border-border hover:border-[#008F3D] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B0000] transition-colors">
                        <span className="text-[#8B0000] group-hover:text-white font-bold text-sm">
                          {principle.number}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{principle.title}</h4>
                        <p className="text-xs text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compliance Badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Terdaftar Resmi
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            Berbadan Hukum
          </Badge>
          <Badge className="bg-amber-100 text-amber-800 px-4 py-2 text-sm">
            <Award className="w-4 h-4 mr-2" />
            ICA Compliant
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}

// Dual Entity Architecture Section
function DualEntitySection() {
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
            Dual Entity <span className="text-gradient-gold">Architecture</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Model unik yang memisahkan strategi dan operasional untuk efektivitas maksimal
          </motion.p>
        </motion.div>

        {/* Two Entities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* JE-P3 Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <Card className="h-full border-2 border-[#008F3D]/30 hover:border-[#008F3D] transition-colors">
              <CardHeader className="border-b border-[#008F3D]/20">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#008F3D] flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-[#008F3D]/20 text-[#008F3D] mb-1">{DUAL_ENTITY.jep3.type}</Badge>
                    <CardTitle className="text-2xl">{DUAL_ENTITY.jep3.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-4 text-base">
                  {DUAL_ENTITY.jep3.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="border-[#008F3D] text-[#008F3D]">
                    {DUAL_ENTITY.jep3.role}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{DUAL_ENTITY.jep3.description}</p>
                <h4 className="font-semibold mb-3">Tanggung Jawab:</h4>
                <ul className="space-y-2">
                  {DUAL_ENTITY.jep3.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#008F3D] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* KNMP Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <Card className="h-full border-2 border-[#8B0000]/30 hover:border-[#8B0000] transition-colors">
              <CardHeader className="border-b border-[#8B0000]/20">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#8B0000] flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-[#8B0000]/20 text-[#8B0000] mb-1">{DUAL_ENTITY.knmp.type}</Badge>
                    <CardTitle className="text-2xl">{DUAL_ENTITY.knmp.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-4 text-base">
                  {DUAL_ENTITY.knmp.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="border-[#8B0000] text-[#8B0000]">
                    {DUAL_ENTITY.knmp.role}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{DUAL_ENTITY.knmp.description}</p>
                <h4 className="font-semibold mb-3">Tanggung Jawab:</h4>
                <ul className="space-y-2">
                  {DUAL_ENTITY.knmp.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* SAF Diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <Card className="bg-[#8B0000] border-[#008F3D]/30 border-2">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge className="bg-[#008F3D] text-white mb-2">Framework</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">{DUAL_ENTITY.saf.name}</h3>
                <p className="text-white/80">{DUAL_ENTITY.saf.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SAF Principles */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Prinsip Utama:</h4>
                  <ul className="space-y-2">
                    {DUAL_ENTITY.saf.principles?.map((principle, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80">
                        <ChevronRight className="w-4 h-4 text-[#00A847] mt-0.5 flex-shrink-0" />
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* JSC Info */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#008F3D] flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{DUAL_ENTITY.jsc.name}</h4>
                  </div>
                  <p className="text-white/80 text-sm mb-4">{DUAL_ENTITY.jsc.description}</p>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="border-white/30 text-white">
                      {DUAL_ENTITY.jsc.members} Anggota
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white">
                      Rapat {DUAL_ENTITY.jsc.meetingFrequency}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Vision 2045 Section
function Vision2045Section() {
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
          <motion.div variants={fadeInUp}>
            <Badge className="bg-[#008F3D] text-[#1a1a2e] mb-4">Visi 2045</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold mb-4">
            Menuju <span className="text-gradient-gold">Indonesia Emas</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {VISION_2045.subtitle}
          </motion.p>
        </motion.div>

        {/* Target Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {VISION_2045.targets.map((target) => (
            <motion.div key={target.label} variants={scaleIn}>
              <Card className="text-center card-hover-lift h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                    {getIcon(target.icon, 'w-6 h-6 text-[#8B0000]')}
                  </div>
                  <div className="text-3xl font-bold text-[#8B0000] mb-1">
                    {target.value.toLocaleString()}{target.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{target.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Milestones Roadmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="mb-12">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#008F3D]" />
                Roadmap 2045
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative">
                {/* Progress line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted transform -translate-y-1/2 hidden lg:block" />
                <div className="absolute top-1/2 left-0 w-1/5 h-1 bg-gradient-to-r from-[#8B0000] to-[#008F3D] transform -translate-y-1/2 hidden lg:block" />
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {VISION_2045.milestones.map((milestone, idx) => (
                    <div key={milestone.year} className="relative text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center z-10 relative ${
                        idx < 1 
                          ? 'bg-[#8B0000] text-white' 
                          : idx < 2 
                            ? 'bg-[#008F3D] text-white' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {idx < 1 ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <span className="font-bold text-sm">{milestone.year}</span>
                        )}
                      </div>
                      <h4 className="font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-xs text-muted-foreground">{milestone.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mondragon Benchmark */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <Card className="bg-[#8B0000] border-[#008F3D]/30 border-2">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full bg-[#008F3D] flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge className="bg-[#008F3D] text-white mb-2">Benchmark Global</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {VISION_2045.benchmark.name}
                  </h3>
                  <p className="text-white/80 mb-4">{VISION_2045.benchmark.description}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Badge variant="outline" className="border-white/30 text-white">
                      {VISION_2045.benchmark.country}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white">
                      Sejak {VISION_2045.benchmark.founded}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white">
                      {VISION_2045.benchmark.members.toLocaleString()} Anggota
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white">
                      Revenue {VISION_2045.benchmark.revenue}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
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
            Struktur <span className="text-gradient-primary">Organisasi</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pengurus, Pengawas, dan Dewan Penasihat yang berkomitmen untuk kemajuan koperasi
          </motion.p>
        </motion.div>

        {/* Pengurus */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8B0000]" />
            Pengurus
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_STRUCTURE.pengurus.map((member) => (
              <motion.div key={member.id} variants={scaleIn}>
                <Card className="card-hover-lift h-full">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#008F3D]">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#8B0000] text-white text-lg">
                        {member.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold mb-1">{member.name}</h4>
                    <p className="text-sm text-[#008F3D] mb-2">{member.position}</p>
                    <p className="text-xs text-muted-foreground mb-2">{member.bio}</p>
                    <Badge variant="outline" className="text-xs">
                      {member.termStart} - {member.termEnd}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pengawas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8B0000]" />
            Pengawas
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {TEAM_STRUCTURE.pengawas.map((member) => (
              <motion.div key={member.id} variants={scaleIn}>
                <Card className="card-hover-lift h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-[#8B0000]">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#8B0000] text-white">
                        {member.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-[#008F3D]">{member.position}</p>
                      <p className="text-xs text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dewan Penasihat */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeInUp} className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#008F3D]" />
            Dewan Penasihat
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_STRUCTURE.dewanPenasihat.map((member) => (
              <motion.div key={member.id} variants={scaleIn}>
                <Card className="card-hover-lift h-full border-[#008F3D]/20">
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-[#008F3D]">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#008F3D] text-white text-lg">
                        {member.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold mb-1">{member.name}</h4>
                    <p className="text-sm text-[#8B0000] mb-2">{member.position}</p>
                    <p className="text-xs text-muted-foreground mb-2">{member.bio}</p>
                    <Badge variant="outline" className="text-xs border-[#008F3D] text-[#008F3D]">
                      {member.termStart} - {member.termEnd}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Link to governance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
          <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
            <Link href="/rat" className="flex items-center gap-2">
              Lihat Struktur Governance Lengkap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Partner Section
function PartnerSection() {
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
            Partner & <span className="text-gradient-gold">Kemitraan</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Berkolaborasi dengan berbagai institusi untuk membangun ekosistem desa digital
          </motion.p>
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12"
        >
          {PARTNER_LOGOS.map((partner) => (
            <motion.div key={partner.id} variants={scaleIn}>
              <Card className="card-hover-lift h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-center">{partner.name}</p>
                  <Badge variant="outline" className="mt-2 text-xs">{partner.category}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* KDMP Alignment */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <Card className="bg-[#8B0000] border-[#008F3D]/30 border-2">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-[#008F3D] flex items-center justify-center">
                  <Flag className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Badge className="bg-[#008F3D] text-white mb-2">Government Alignment</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">KDMP Network</h3>
                  <p className="text-white/80 mb-4">{KDMP_ALIGNMENT.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {KDMP_ALIGNMENT.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#00A847] mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-[#8B0000] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#008F3D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6B0000]/30 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-responsive-title font-bold text-white mb-6">
            Jadilah Bagian dari{' '}
            <span className="text-[#00A847]">Peradaban Baru</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-medium">
            Bergabunglah dengan 125.000+ anggota KNMP dan jadilah bagian dari transformasi ekonomi digital desa Indonesia
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#008F3D] hover:bg-[#00A847] text-white px-8 py-6 text-lg font-semibold shadow-lg"
            >
              Gabung Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
            >
              Pelajari Lebih Lanjut
            </Button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00A847]">
                {HERO_STATS.members.toLocaleString()}+
              </div>
              <div className="text-sm text-white/70">Anggota Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00A847]">
                {HERO_STATS.villages.toLocaleString()}
              </div>
              <div className="text-sm text-white/70">Desa Terintegrasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00A847]">
                {HERO_STATS.provinces}
              </div>
              <div className="text-sm text-white/70">Provinsi</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page Component
export default function TentangPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OriginStorySection />
      <LegalComplianceSection />
      <DualEntitySection />
      <Vision2045Section />
      <TeamSection />
      <PartnerSection />
      <CTASection />
    </div>
  );
}
