"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Users,
  Globe,
  TrendingUp,
  Building2,
  Shield,
  Heart,
  Scale,
  Gavel,
  Briefcase,
  Cpu,
  Users2,
  Globe2,
  Landmark,
  Sparkles,
  MapPin,
  DollarSign,
  Truck,
  GraduationCap,
  Award,
  ArrowRight,
  ChevronRight,
  Star,
  Zap,
  CheckCircle2,
  Rocket,
  Flag,
  Trophy,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animated counter component
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Section wrapper with animation
function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Timeline data
const roadmapData = [
  {
    year: "2026",
    title: "Fondasi & Launch",
    description: "1.000 desa pilot project",
    target: "Pilot Phase",
    progress: 10,
    icon: Rocket,
    color: "from-amber-500 to-yellow-500",
  },
  {
    year: "2027",
    title: "Scale-Up",
    description: "10.000 desa, 500K anggota",
    target: "Growth Phase",
    progress: 20,
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
  },
  {
    year: "2028",
    title: "Ekspor Global",
    description: "25.000 desa, ICA membership",
    target: "International",
    progress: 35,
    icon: Globe,
    color: "from-red-500 to-orange-500",
  },
  {
    year: "2030",
    title: "Koperasi Digital Terbesar",
    description: "50.000 desa, Rp1T revenue",
    target: "Market Leader",
    progress: 55,
    icon: Trophy,
    color: "from-rose-600 to-red-500",
  },
  {
    year: "2035",
    title: "100% Coverage",
    description: "83.763 desa tersentuh",
    target: "National Scale",
    progress: 80,
    icon: MapPin,
    color: "from-primary to-rose-600",
  },
  {
    year: "2045",
    title: "World Class Cooperative",
    description: "Setara Mondragon, Spanyol",
    target: "World Class",
    progress: 100,
    icon: Star,
    color: "from-yellow-500 to-amber-400",
  },
];

// Visi dimensions data
const visiDimensions = [
  { icon: Heart, title: "Spiritual", desc: "Nilai-nilai keagamaan dan spiritual sebagai landasan moral" },
  { icon: Scale, title: "Konstitusional", desc: "Sejalan dengan UUD 1945 dan Pancasila" },
  { icon: Gavel, title: "Legal", desc: "Kepatuhan penuh terhadap regulasi koperasi dan perdagangan" },
  { icon: Briefcase, title: "Bisnis", desc: "Model bisnis berkelanjutan dan profitable" },
  { icon: Cpu, title: "Teknologi", desc: "Digitalisasi menyeluruh untuk efisiensi operasional" },
  { icon: Users2, title: "People", desc: "Pemberdayaan SDM desa yang berkelanjutan" },
  { icon: Users, title: "Sosial", desc: "Penguatan kohesi sosial masyarakat desa" },
  { icon: Globe2, title: "Global", desc: "Kesiapan bersaing di pasar internasional" },
  { icon: Landmark, title: "Governance", desc: "Tata kelola yang transparan dan akuntabel" },
  { icon: Sparkles, title: "Peradaban", desc: "Kontribusi pada kemajuan peradaban bangsa" },
];

// Misi data
const misiData = [
  {
    number: 1,
    title: "Menghimpun dan Mengembangkan Kapasitas Anggota",
    description:
      "Menghimpun dan mengembangkan kapasitas anggota KNMP, anggota koperasi primer, dan anggota kelompok usaha desa untuk menciptakan ekosistem ekonomi yang kuat.",
    icon: Users,
  },
  {
    number: 2,
    title: "Membangun Sistem Ekonomi Terintegrasi",
    description:
      "Membangun sistem ekonomi terintegrasi dari tingkat desa hingga nasional untuk memperkuat ketahanan ekonomi masyarakat pedesaan.",
    icon: Building2,
  },
  {
    number: 3,
    title: "Mendorong Akses Pasar, Pembiayaan, Pelatihan",
    description:
      "Mendorong keterlibatan masyarakat dalam akses pasar, pembiayaan, dan pelatihan untuk meningkatkan kapasitas produktif anggota.",
    icon: TrendingUp,
  },
  {
    number: 4,
    title: "Menjalankan Diplomasi Ekonomi",
    description:
      "Menjalankan diplomasi ekonomi kerakyatan dalam negeri maupun luar negeri untuk memperluas jaringan dan peluang usaha.",
    icon: Globe,
  },
  {
    number: 5,
    title: "Mengintegrasikan Infrastruktur Ekonomi Desa",
    description:
      "Mengintegrasikan infrastruktur ekonomi desa ke dalam sistem ekonomi nasional yang lebih luas dan terkoneksi.",
    icon: Truck,
  },
  {
    number: 6,
    title: "Mendukung Program Pemerintah",
    description:
      "Mendukung program pemerintah dalam pembangunan ekonomi pedesaan yang berkelanjutan dan inklusif.",
    icon: Landmark,
  },
  {
    number: 7,
    title: "Meningkatkan Kesejahteraan Anggota",
    description:
      "Meningkatkan kesejahteraan anggota melalui program-program ekonomi produktif dan berkelanjutan.",
    icon: Award,
  },
];

// Strategic pillars data
const strategicPillars = [
  {
    title: "6 KPA (Komisi Pengelola Aset)",
    description: "Pengelolaan aset terstruktur melalui 6 komisi utama untuk efisiensi dan transparansi",
    items: ["KPA Pertanian", "KPA Perikanan", "KPA Peternakan", "KPA Industri", "KPA Pariwisata", "KPA Jasa"],
    icon: Building2,
  },
  {
    title: "Unit Usaha Strategy",
    description: "Diversifikasi unit usaha untuk menciptakan multiple revenue streams",
    items: ["Trading & Distribusi", "Agribisnis", "Fintech", "Logistik", "E-commerce"],
    icon: Briefcase,
  },
  {
    title: "Technology Roadmap",
    description: "Transformasi digital menyeluruh untuk operasional yang efisien",
    items: ["Platform Digital", "Mobile App", "IoT Integration", "AI & Analytics", "Blockchain"],
    icon: Cpu,
  },
  {
    title: "Partnership Strategy",
    description: "Kemitraan strategis dengan berbagai pihak untuk percepatan pertumbuhan",
    items: ["Pemerintah", "BUMN/BUMD", "Swasta", "Internasional", "Akademisi"],
    icon: HandshakeIcon,
  },
];

// KPI targets data
const kpiTargets = [
  {
    label: "Desa Tergabung",
    value: 83763,
    suffix: "",
    icon: MapPin,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Anggota Aktif",
    value: 10000000,
    suffix: "",
    icon: Users,
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    label: "Transaksi Tahunan",
    value: 500,
    suffix: " T",
    prefix: "Rp",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
  },
  {
    label: "Nilai Ekspor",
    value: 25,
    suffix: " T",
    prefix: "Rp",
    icon: Globe,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    label: "Lapangan Kerja",
    value: 518231,
    suffix: "",
    icon: GraduationCap,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
];

// Handshake icon component (not in lucide)
function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

export default function VisiMisiPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden hero-gradient min-h-[60vh] flex items-center"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-secondary/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <Badge
                variant="outline"
                className="border-secondary/30 text-secondary px-4 py-1.5 text-sm backdrop-blur-sm bg-white/5"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Visi & Misi KNMP
              </Badge>
            </motion.div>

            <h1 className="text-responsive-hero font-bold text-white mb-6">
              <span className="text-gradient-gold">Visi & Misi</span>
              <br />
              <span className="text-white">KNMP</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            >
              Menuju Koperasi Digital Terbesar Indonesia 2045
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8">
                Lihat Roadmap
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8"
              >
                Bergabung Sekarang
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Visi Utama Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <Target className="w-4 h-4 mr-2" />
                Visi Utama
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                Visi <span className="text-gradient-primary">Besar</span> KNMP
              </h2>
            </div>
          </AnimatedSection>

          {/* Main Quote */}
          <AnimatedSection>
            <Card className="max-w-5xl mx-auto mb-16 border-2 border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              <CardContent className="p-8 md:p-12 text-center">
                <div className="mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    viewport={{ once: true }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <Target className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6">
                  <span className="text-gradient-primary">"</span>
                  Menjadi <span className="text-gradient-gold">Digital Operating System</span> Desa Indonesia{" "}
                  <span className="text-gradient-primary">Terbesar di Dunia</span>
                  <span className="text-gradient-primary">"</span>
                </blockquote>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                  KNMP hadir sebagai platform ekonomi digital yang menghubungkan seluruh desa di Indonesia,
                  menciptakan ekosistem ekonomi yang kuat, inklusif, dan berkelanjutan menuju Indonesia Emas 2045.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* 10 Dimensions Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {visiDimensions.map((dim, index) => {
              const Icon = dim.icon;
              return (
                <motion.div
                  key={dim.title}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="h-full card-hover-lift border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-sm md:text-base">{dim.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{dim.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-secondary/50 text-secondary">
                <Flag className="w-4 h-4 mr-2" />
                Misi Utama
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                7 Misi <span className="text-gradient-gold">Strategis</span> KNMP
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Langkah-langkah strategis untuk mewujudkan visi besar KNMP sebagai koperasi digital terbesar Indonesia
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {misiData.map((misi, index) => {
              const Icon = misi.icon;
              return (
                <motion.div
                  key={misi.number}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full card-hover-lift border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {misi.number}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {misi.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {misi.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <Rocket className="w-4 h-4 mr-2" />
                Roadmap 2026-2045
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                Perjalanan Menuju <span className="text-gradient-primary">World Class</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Timeline strategis pertumbuhan KNMP dari pilot project hingga world class cooperative
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-primary hidden lg:block" />

            <div className="space-y-8 lg:space-y-12">
              {roadmapData.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col lg:flex-row items-center gap-6 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                      <Card className="card-hover-lift border-border/50 hover:border-primary/30">
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${isEven ? "lg:justify-end" : ""}`}>
                            <Badge className={`bg-gradient-to-r ${item.color} text-white border-0`}>
                              {item.year}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{item.target}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground mb-4">{item.description}</p>
                          <div className="flex items-center gap-3">
                            <Progress value={item.progress} className="flex-1 h-2" />
                            <span className="text-sm font-medium text-primary">{item.progress}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline node */}
                    <div className="relative z-10 hidden lg:flex">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Mobile icon */}
                    <div className="lg:hidden">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-accent text-accent-foreground bg-accent/10">
                <Zap className="w-4 h-4 mr-2" />
                Strategic Pillars
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                Pilar <span className="text-gradient-gold">Strategis</span> KNMP
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fondasi strategis yang mendukung pencapaian visi dan misi KNMP
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {strategicPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={fadeInUp}>
                  <Card className="h-full card-hover-lift border-border/50 hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle>{pillar.title}</CardTitle>
                          <CardDescription>{pillar.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {pillar.items.map((item) => (
                          <Badge key={item} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {item}
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

      {/* KPIs & Targets Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-secondary/50 text-secondary">
                <Trophy className="w-4 h-4 mr-2" />
                Target 2045
              </Badge>
              <h2 className="text-responsive-title font-bold mb-6">
                KPI & <span className="text-gradient-primary">Target Capaian</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Target ambisius yang akan dicapai KNMP pada tahun 2045
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {kpiTargets.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <motion.div key={kpi.label} variants={scaleIn}>
                  <Card className="card-hover-lift border-border/50 hover:border-primary/30 h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 mx-auto mb-4 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${kpi.color}`} />
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold ${kpi.color} mb-1`}>
                        <AnimatedCounter end={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                      </div>
                      <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary/20 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-secondary" />
              </motion.div>

              <h2 className="text-responsive-title font-bold text-white mb-6">
                Mari Wujudkan <span className="text-gradient-gold">Visi Ini</span> Bersama
              </h2>

              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Bergabunglah dengan KNMP untuk menjadi bagian dari transformasi ekonomi desa Indonesia
                menuju koperasi digital terbesar di dunia.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg">
                  Daftar Sebagai Anggota
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
                >
                  Pelajari Lebih Lanjut
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/60"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Terdaftar Resmi</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>10.000+ Anggota</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>1.000+ Desa</span>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
