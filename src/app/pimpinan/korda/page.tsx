'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Users,
  Shield,
  Target,
  Award,
  Search,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { PIMPINAN_LEVELS, KORDA_STRUCTURE } from '@/data/mocks';

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

const korda = PIMPINAN_LEVELS[2];

// Sub Menu Navigation
function SubMenuNavigation() {
  const levels = [
    { id: 'kornas', name: 'Kornas', href: '/pimpinan/kornas', icon: Shield, color: '#8B0000', badge: '1' },
    { id: 'korwil', name: 'Korwil', href: '/pimpinan/korwil', icon: MapPin, color: '#008F3D', badge: '38' },
    { id: 'korda', name: 'Korda', href: '/pimpinan/korda', icon: Building2, color: '#3b82f6', badge: '514', active: true },
    { id: 'korcam', name: 'Korcam', href: '/pimpinan/korcam', icon: Target, color: '#f59e0b', badge: '7.2K' },
    { id: 'kordes', name: 'Kordes', href: '/pimpinan/kordes', icon: Users, color: '#8b5cf6', badge: '83K' },
  ];

  return (
    <section className="sticky top-16 md:top-20 z-40 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          <Link href="/pimpinan" className="flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-gray-700 font-semibold">Semua</Button>
          </Link>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          {levels.map((level) => (
            <Link key={level.id} href={level.href} className="flex-shrink-0">
              <Button
                variant={level.active ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center gap-2 ${level.active ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' : ''}`}
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

export default function KordaPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#3b82f6] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#8B0000]/10 rounded-full blur-3xl" />
        
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white mb-4">
                <Building2 className="w-10 h-10 text-[#3b82f6]" />
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">
              {korda.name}
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge className="bg-white/20 text-white text-sm px-4 py-1">{korda.shortName}</Badge>
              <Badge className="bg-[#8B0000]/30 text-white text-sm px-4 py-1">{korda.title}</Badge>
              <Badge className="bg-white/10 text-white/80 text-sm px-4 py-1">{korda.totalPositions} Kab/Kota</Badge>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-white/80 text-lg max-w-2xl mx-auto">
              {korda.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SubMenuNavigation />

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {korda.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 bg-white rounded-xl border"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#3b82f6]">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure Summary */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-8"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold mb-4">
              Struktur Per <span className="text-[#3b82f6]">Distrik</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              Semua {KORDA_STRUCTURE.totalPositions} Kabupaten/Kota tersedia untuk diisi
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {KORDA_STRUCTURE.structure.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.position}</p>
                      <p className="text-sm text-muted-foreground">{item.filled} terisi dari {item.total.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#3b82f6]">{item.total.toLocaleString()}</div>
                      <Badge variant="secondary" className="text-xs">Tersedia</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sample Districts */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Contoh Kabupaten/Kota:</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {KORDA_STRUCTURE.sampleDistricts.map((district) => (
                <motion.div
                  key={district.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-3 rounded-lg border border-dashed border-gray-300 bg-gray-50/50"
                >
                  <p className="font-medium text-gray-900">{district.kabKota}</p>
                  <p className="text-sm text-gray-400 italic">{district.panglima}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#3b82f6]" />
                    Tanggung Jawab
                  </h3>
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {korda.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#3b82f6]" />
                    Persyaratan
                  </h3>
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {[
                      'Anggota KNMP minimal 2 tahun',
                      'Memiliki jaringan di kabupaten/kota bersangkutan',
                      'Lulus seleksi dan penilaian Korwil',
                      'Bersedia mengkoordinasi seluruh Korcam di kabupaten',
                      'Memiliki komitmen untuk pemberdayaan desa',
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
      <section className="py-16 bg-[#3b82f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Jadilah <span className="text-[#00A847]">Panglima Distrik</span>
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Semua {KORDA_STRUCTURE.totalPositions} posisi tersedia. Daftar sekarang dan jadilah pemimpin transformasi desa di kabupaten/kota Anda!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-[#3b82f6] hover:bg-gray-100 px-8" asChild>
                <Link href="/membership">Daftar Sekarang<ArrowRight className="ml-2 w-4 h-4" /></Link>
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
