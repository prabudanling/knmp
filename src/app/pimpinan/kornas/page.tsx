'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Crown,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Users,
  Building2,
  Shield,
  Star,
  Target,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PIMPINAN_LEVELS, KORNAS_STRUCTURE, DEWAN_PENDIRI_LENGKAP } from '@/data/mocks';

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

const kornas = PIMPINAN_LEVELS[0];

// Sub Menu Navigation
function SubMenuNavigation() {
  const levels = [
    { id: 'kornas', name: 'Kornas', title: 'Presiden', href: '/pimpinan/kornas', icon: Crown, color: '#8B0000', badge: '1', active: true },
    { id: 'korwil', name: 'Korwil', title: 'Panglima Wilayah', href: '/pimpinan/korwil', icon: Users, color: '#008F3D', badge: '38' },
    { id: 'korda', name: 'Korda', title: 'Panglima Distrik', href: '/pimpinan/korda', icon: Building2, color: '#3b82f6', badge: '514' },
    { id: 'korcam', name: 'Korcam', title: 'Panglima Sektor', href: '/pimpinan/korcam', icon: Target, color: '#f59e0b', badge: '7.2K' },
    { id: 'kordes', name: 'Kordes', title: 'Komandan Lapangan', href: '/pimpinan/kordes', icon: Building2, color: '#8b5cf6', badge: '83K' },
  ];

  return (
    <section className="sticky top-16 md:top-20 z-40 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          <Link href="/pimpinan" className="flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-gray-700 font-semibold">
              Semua
            </Button>
          </Link>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          {levels.map((level) => (
            <Link key={level.id} href={level.href} className="flex-shrink-0">
              <Button
                variant={level.active ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center gap-2 ${level.active ? 'bg-[#8B0000] text-white hover:bg-[#6B0000]' : ''}`}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: level.active ? 'rgba(255,255,255,0.2)' : `${level.color}15` }}
                >
                  <level.icon className="w-3 h-3" style={{ color: level.active ? 'white' : level.color }} />
                </div>
                <span className="font-medium">{level.name}</span>
                <Badge className={`text-[10px] px-1.5 py-0.5 ${level.active ? 'bg-white/20 text-white' : ''}`} style={{ backgroundColor: level.active ? undefined : level.color, color: level.active ? undefined : 'white' }}>
                  {level.badge}
                </Badge>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Position Card Component
function PositionCard({ position }: { position: { id: string; position: string; name: string; status: string; termEnd?: string } }) {
  const isVacant = position.name === '(Posisi Kosong)';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`p-3 rounded-lg border transition-all ${isVacant ? 'border-dashed border-gray-300 bg-gray-50/50' : 'border border-gray-200 bg-white hover:border-[#8B0000]/30 hover:shadow-sm'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-0.5">{position.position}</p>
          <p className={`font-medium text-sm ${isVacant ? 'text-gray-400 italic' : 'text-gray-900'}`}>
            <strong>{position.name}</strong>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {position.termEnd && (
            <Badge variant="outline" className="text-[10px]">
              {position.termEnd}
            </Badge>
          )}
          <Badge className={`text-[10px] ${isVacant ? 'bg-gray-200 text-gray-600' : 'bg-[#008F3D] text-white'}`}>
            {isVacant ? 'Kosong' : 'Aktif'}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}

// Category Section Component
function CategorySection({ category, positions, icon: Icon, color }: { category: string; positions: any[]; icon: any; color: string }) {
  const filledCount = positions.filter(p => p.name !== '(Posisi Kosong)').length;
  const totalCount = positions.length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="border-l-4" style={{ borderLeftColor: color }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <CardTitle className="text-lg">{category}</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {filledCount}/{totalCount} Terisi
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {positions.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function KornasPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#008F3D]/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <Link href="/pimpinan" className="inline-flex items-center text-white/70 hover:text-white text-sm mb-4">
                <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                Kembali ke Pimpinan
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#008F3D] mb-4">
                <Crown className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">
              {kornas.name}
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge className="bg-[#008F3D]/30 text-[#00A847] text-sm px-4 py-1">
                {kornas.shortName}
              </Badge>
              <Badge className="bg-white/20 text-white text-sm px-4 py-1">
                {kornas.title}
              </Badge>
              <Badge className="bg-white/10 text-white/80 text-sm px-4 py-1">
                {kornas.totalPositions} Posisi
              </Badge>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-white/80 text-lg max-w-2xl mx-auto">
              {kornas.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sub Menu Navigation */}
      <SubMenuNavigation />

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kornas.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 bg-white rounded-xl border"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#8B0000]">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-4 bg-white rounded-xl border"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#008F3D]">9</div>
              <div className="text-sm text-muted-foreground">Dewan Pendiri</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center p-4 bg-white rounded-xl border"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#3b82f6]">15</div>
              <div className="text-sm text-muted-foreground">Koordinator Bidang</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold mb-4">
              Struktur <span className="text-[#8B0000]">Organisasi Nasional</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
              Struktur lengkap pimpinan KNMP tingkat nasional dengan posisi yang tersedia untuk diisi
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {KORNAS_STRUCTURE.structure.map((section, index) => (
              <CategorySection
                key={section.category}
                category={section.category}
                positions={section.positions}
                icon={
                  section.category.includes('Pendiri') ? Star :
                  section.category.includes('Pembina') ? Shield :
                  section.category.includes('Pengurus') ? Building2 :
                  section.category.includes('Pengawas') ? Shield :
                  section.category.includes('Penasihat') ? Award :
                  section.category.includes('Sekretaris') ? Users : Target
                }
                color={
                  section.category.includes('Pendiri') ? '#8B0000' :
                  section.category.includes('Pembina') ? '#008F3D' :
                  section.category.includes('Pengurus') ? '#3b82f6' :
                  section.category.includes('Pengawas') ? '#f59e0b' :
                  section.category.includes('Penasihat') ? '#8b5cf6' :
                  '#008F3D'
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#8B0000]" />
                    Tanggung Jawab
                  </h3>
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {kornas.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#008F3D] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8B0000]" />
                    Persyaratan
                  </h3>
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {[
                      'Anggota KNMP minimal 5 tahun',
                      'Memiliki pengalaman kepemimpinan di koperasi atau organisasi besar',
                      'Lulus seleksi dan penilaian Dewan Pembina',
                      'Bersedia mengabdikan diri untuk misi KNMP',
                      'Memiliki visi dan komitmen untuk Indonesia Emas 2045',
                    ].map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#8B0000] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#8B0000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">
              Siap Menjadi <span className="text-[#00A847]">Pemimpin?</span>
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Bergabunglah dengan KNMP dan raih kesempatan untuk memimpin transformasi desa Indonesia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#008F3D] hover:bg-[#006B2D] text-white px-8" asChild>
                <Link href="/membership">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
