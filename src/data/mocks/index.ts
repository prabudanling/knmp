// ============================================
// KOPNUSA Mock Data
// ============================================

import type { 
  KPACategory, 
  TierInfo, 
  MarketplaceZoneInfo,
  HeroStats,
  SmartVillageDashboard,
  MemberDashboard,
  SHUBreakdown,
  VillageIntegration,
  LogisticsPartner,
  Course,
  GovernanceStructure,
  Product,
  LogisticsAgent,
  Activity
} from '@/types';

// =====================
// Hero Stats
// =====================

export const HERO_STATS: HeroStats = {
  villages: 83763, // 83.763 Desa
  members: 125000,
  provinces: 38,
  kpaCount: 6, // 6 KPA
  exportCountries: 195, // 195 Negara target ekspor
  transactionValue: 2500000000000, // 2.5 Triliun
  exportVolume: 25000000000000, // 25 Triliun
  agents: 83763,
  targetBy2045: 500000000000000, // Rp 500 Triliun by 2045
};

// =====================
// KPA Data
// =====================

export const KPA_DATA: KPACategory[] = [
  {
    id: 'KPA_1_PRODUCER',
    name: 'KPA-1: Petani/Produsen',
    shortName: 'Petani/Produsen',
    description: 'Petani, nelayan, peternak, pengrajin, produsen desa',
    icon: 'Wheat',
    color: '#22c55e',
    votingPower: 30,
    memberCount: 45000,
    examples: ['Gapoktan', 'Poktan', 'KWT', 'Kelompok Nelayan', 'Kelompok Peternak'],
  },
  {
    id: 'KPA_2_ENTREPRENEUR',
    name: 'KPA-2: Pengusaha/Pengepul',
    shortName: 'Pengusaha/Pengepul',
    description: 'Trader, eksportir, agregator, UMKM',
    icon: 'Briefcase',
    color: '#3b82f6',
    votingPower: 20,
    memberCount: 25000,
    examples: ['Anggota JE-P3', 'Pengusaha PPP', 'Eksportir Komoditas', 'Agregator UMKM'],
  },
  {
    id: 'KPA_3_COOPERATIVE',
    name: 'KPA-3: Koperasi/BUMDes',
    shortName: 'Koperasi/BUMDes',
    description: 'Koperasi primer, BUMDes, BUMDesMA, KDMP',
    icon: 'Building2',
    color: '#8b5cf6',
    votingPower: 20,
    memberCount: 80000,
    examples: ['KDMP', 'BUMDesMA', 'KUD', 'Koperasi Desa', 'Koperasi Primer'],
  },
  {
    id: 'KPA_4_WORKER',
    name: 'KPA-4: Pekerja/Kader',
    shortName: 'Pekerja/Kader',
    description: 'Karyawan KNMP, agen logistik, kader digital',
    icon: 'Users',
    color: '#f59e0b',
    votingPower: 15,
    memberCount: 15000,
    examples: ['Karang Taruna Digital', 'Kader PKK IT', 'Agen Logistik', 'Karyawan KNMP'],
  },
  {
    id: 'KPA_5_CONSUMER',
    name: 'KPA-5: Konsumen',
    shortName: 'Konsumen',
    description: 'Konsumen produk dan layanan KNMP',
    icon: 'ShoppingBag',
    color: '#ec4899',
    votingPower: 10,
    memberCount: 50000,
    examples: ['Konsumen Platform', 'Anggota Rumah Tangga', 'Pembeli Produk Lokal'],
  },
  {
    id: 'KPA_6_INVESTOR',
    name: 'KPA-6: Investor Pendukung',
    shortName: 'Investor Pendukung',
    description: 'Investor modal, impact investor, bank',
    icon: 'TrendingUp',
    color: '#D4AF37',
    votingPower: 5,
    memberCount: 500,
    examples: ['Bank Himbara', 'ADB', 'World Bank', 'Angel Investor', 'Impact Investor'],
    ratNote: 'Investor TIDAK BOLEH memiliki hak veto atas keputusan RAT',
  },
];

// =====================
// Tier Data
// =====================

export const TIER_DATA: TierInfo[] = [
  {
    tier: 'T1',
    name: 'Petani Digital',
    price: 0,
    description: 'Basic listing di marketplace, harga pasar real-time',
    benefits: ['Kartu Anggota Digital', 'Akses Marketplace Basic', 'Harga Pasar Real-time'],
    hasOperationalRights: false,
  },
  {
    tier: 'T2',
    name: 'Founding Member',
    price: 250000,
    description: 'Profil direktori, badge Founding Member, voting Munas',
    benefits: ['Semua T1', 'Profil Direktori', 'Badge Founding Member', 'Hak Suara Munas', 'Referral System'],
    hasOperationalRights: false,
  },
  {
    tier: 'T3',
    name: 'Koperasi/BUMDes',
    price: 2500000,
    description: 'Hak upload produk ke Marketplace Zonasi, akses unit usaha',
    benefits: ['Semua T2', 'Hak Upload Produk Marketplace', 'Akses Modul Agregasi', 'HAK USAHA OPERASIONAL via KNMP', 'Undangan Koperasi Digital Nasional'],
    hasOperationalRights: true,
  },
  {
    tier: 'T4',
    name: 'Regional Kecamatan',
    price: 10000000,
    description: 'Hak eksklusif wilayah kecamatan',
    benefits: ['Semua T3', 'Hak Eksklusif Wilayah Kecamatan', 'Dashboard Regional', 'Koordinasi Koperasi & BUMDes'],
    hasOperationalRights: true,
  },
  {
    tier: 'T5',
    name: 'Regional Kabupaten',
    price: 15000000,
    description: 'Hak eksklusif kabupaten, channel resmi kota besar',
    benefits: ['Semua T4', 'Hak Eksklusif Kabupaten', 'Channel Resmi Kota Besar', 'Implementasi Smart Village Skala Kota'],
    hasOperationalRights: true,
  },
  {
    tier: 'T6',
    name: 'Provinsi',
    price: 125000000,
    description: 'Akses Dewan Nasional, koordinasi 38 provinsi',
    benefits: ['Semua T5', 'Akses Dewan Nasional', 'Koordinasi 38 Provinsi', 'Board Advisory'],
    hasOperationalRights: true,
  },
  {
    tier: 'T7',
    name: 'Nasional Strategis',
    price: 1000000000,
    description: 'Investor-level access, C-Suite advisory',
    benefits: ['Semua T6', 'Investor-Level Access', 'C-Suite Advisory', 'Strategic Partnership Direct'],
    hasOperationalRights: true,
  },
];

// =====================
// Marketplace Zones
// =====================

export const MARKETPLACE_ZONES: MarketplaceZoneInfo[] = [
  {
    id: 'AGRI',
    name: 'Zona Agri',
    description: 'Pertanian, perkebunan, peternakan, perikanan',
    icon: 'Wheat',
    productCount: 12500,
    topCategories: ['Kopi', 'Beras', 'Rempah', 'Coklat', 'Madu'],
  },
  {
    id: 'RETAIL_UMKM',
    name: 'Zona Retail/UMKM',
    description: 'Produk olahan, kerajinan, fashion, F&B',
    icon: 'Store',
    productCount: 28500,
    topCategories: ['Keripik', 'Batik', 'Kuliner Lokal', 'Furniture', 'Kerajinan'],
  },
  {
    id: 'LOGISTICS',
    name: 'Zona Jasa & Logistik',
    description: 'Jasa ekspedisi, pergudangan, transportasi',
    icon: 'Truck',
    productCount: 3200,
    topCategories: ['Agen J&T', 'Agen JNE', 'Cargo', 'Cold Storage', 'Warehouse'],
  },
  {
    id: 'DIGITAL',
    name: 'Zona Digital',
    description: 'Produk & jasa digital',
    icon: 'Laptop',
    productCount: 4500,
    topCategories: ['Web Design', 'Content Creation', 'AI Services', 'SaaS', 'Digital Marketing'],
  },
  {
    id: 'HEALTH',
    name: 'Zona Kesehatan',
    description: 'Apotek, klinik, herbal',
    icon: 'HeartPulse',
    productCount: 2100,
    topCategories: ['Obat Generik', 'Jamu', 'Layanan Kesehatan', 'Suplemen', 'Alkes'],
  },
  {
    id: 'SPIRITUAL',
    name: 'Zona Spiritual',
    description: 'Haji, Umroh, perlengkapan ibadah',
    icon: 'Moon',
    productCount: 1800,
    topCategories: ['Paket Umroh', 'Perlengkapan Haji', 'Al-Quran', 'Busana Muslim', 'Ziarah'],
  },
  {
    id: 'EXPORT',
    name: 'Zona Ekspor',
    description: 'Produk certified untuk pasar global',
    icon: 'Globe',
    productCount: 3200,
    topCategories: ['Kopi Specialty', 'Coconut Sugar', 'Organic Spices', 'Cacao', 'Vanilla'],
  },
  {
    id: 'ENERGY',
    name: 'Zona Energi & Karbon',
    description: 'Energi terbarukan, carbon credits',
    icon: 'Zap',
    productCount: 850,
    topCategories: ['Solar Panel', 'Biogas', 'Carbon Offset', 'Biomass', 'Mini Hydro'],
  },
];

// =====================
// Smart Village Dashboard
// =====================

export const SMART_VILLAGE_DASHBOARD: SmartVillageDashboard = {
  summary: {
    totalVillages: 83763,
    totalMembers: 125000,
    integratedComponents: 8500,
    productionValue: 2500000000000,
    activeAgents: 45230,
    transactionVolume: 890000000000,
  },
  villageStats: [
    { province: 'Jawa Barat', villageCount: 5941, memberCount: 25000, productionValue: 450000000000, growth: 15.2 },
    { province: 'Jawa Tengah', villageCount: 8559, memberCount: 22000, productionValue: 380000000000, growth: 12.8 },
    { province: 'Jawa Timur', villageCount: 8503, memberCount: 20000, productionValue: 350000000000, growth: 18.5 },
    { province: 'Sumatera Utara', villageCount: 6263, memberCount: 15000, productionValue: 280000000000, growth: 22.3 },
    { province: 'Sulawesi Selatan', villageCount: 3033, memberCount: 12000, productionValue: 220000000000, growth: 19.7 },
  ],
  commodityBreakdown: [
    { name: 'Kopi', volume: 125000, value: 450000000000, growth: 25.5, icon: 'Coffee' },
    { name: 'Beras', volume: 850000, value: 380000000000, growth: 8.2, icon: 'Wheat' },
    { name: 'Rempah', volume: 45000, value: 220000000000, growth: 32.1, icon: 'Sparkles' },
    { name: 'Coklat', volume: 28000, value: 180000000000, growth: 28.7, icon: 'Cookie' },
    { name: 'Kelapa', volume: 150000, value: 150000000000, growth: 15.3, icon: 'CircleDot' },
  ],
  logisticsStatus: {
    totalPackages: 1250000,
    deliveredPackages: 1180000,
    activeAgents: 45230,
    averageDeliveryTime: 3.2,
    commission: 8500000000,
  },
  roadmapProgress: [
    { phase: 'Fase 1', year: '2026', target: '1.000 Desa Terintegrasi', progress: 100, status: 'COMPLETED' },
    { phase: 'Fase 2', year: '2027', target: '10.000 Desa Terintegrasi', progress: 85, status: 'IN_PROGRESS' },
    { phase: 'Fase 3', year: '2028', target: '25.000 Desa Terintegrasi', progress: 45, status: 'IN_PROGRESS' },
    { phase: 'Fase 4', year: '2030', target: '50.000 Desa Terintegrasi', progress: 0, status: 'UPCOMING' },
    { phase: 'Fase 5', year: '2035', target: '83.763 Desa Terintegrasi', progress: 0, status: 'UPCOMING' },
  ],
  heatmapData: [],
};

// =====================
// Member Dashboard (Demo)
// =====================

export const MEMBER_DASHBOARD: MemberDashboard = {
  member: {
    id: 'demo-member-001',
    name: 'Ahmad Suryanto',
    email: 'ahmad.suryanto@email.com',
    phone: '+62 812 3456 7890',
    kpa: 'KPA_1_PRODUCER',
    tier: 'T3',
    status: 'ACTIVE',
    joinDate: '2026-03-15',
    village: 'Desa Sukamaju',
    district: 'Kecamatan Cianjur Selatan',
    province: 'Jawa Barat',
  },
  greeting: 'Selamat Pagi, Ahmad! 🌾',
  membershipStatus: {
    tier: 'T3',
    joinDate: '15 Maret 2026',
    status: 'ACTIVE',
    simpananPokok: 100000,
    simpananWajib: 500000,
    simpananSukarela: 2500000,
  },
  transactionSummary: {
    totalTransactions: 156,
    totalVolume: 45800000,
    thisMonth: 12500000,
    growth: 23.5,
  },
  logisticsCommission: {
    totalPackages: 1250,
    totalCommission: 3750000,
    thisMonth: 850000,
  },
  shuEstimate: {
    jasaUsaha: 1250000,
    jasaModal: 350000,
    total: 1600000,
  },
  trainingProgress: {
    completed: 3,
    total: 8,
    currentCourse: 'Digital Marketing untuk Petani',
  },
  recentActivity: [
    { id: '1', type: 'TRANSACTION', title: 'Penjualan Kopi Arabica', description: '50kg @ Rp 85.000', amount: 4250000, timestamp: '2026-03-20T08:30:00Z' },
    { id: '2', type: 'COMMISSION', title: 'Komisi Logistik Bulan Ini', description: '125 paket terkirim', amount: 375000, timestamp: '2026-03-19T14:00:00Z' },
    { id: '3', type: 'TRAINING', title: 'Sertifikat Selesai', description: 'Modul Dasar Marketplace', timestamp: '2026-03-18T10:00:00Z' },
  ],
  quickActions: [
    { id: '1', title: 'Upload Produk', icon: 'Plus', href: '/dashboard/upload', color: '#22c55e' },
    { id: '2', title: 'Lihat Komisi', icon: 'Wallet', href: '/dashboard/komisi', color: '#D4AF37' },
    { id: '3', title: 'Pelatihan', icon: 'GraduationCap', href: '/academy', color: '#3b82f6' },
    { id: '4', title: 'SHU Saya', icon: 'TrendingUp', href: '/shu', color: '#8b5cf6' },
  ],
};

// =====================
// SHU Breakdown
// =====================
// Based on AD/ART KNMP:
// - Dana Cadangan: 30%
// - Jasa Modal: 10%
// - Jasa Usaha Anggota: 40%
// - Dana Pengurus & Pengawas: 5%
// - Dana Pendidikan: 5%
// - Dana Sosial: 5%
// - Dana Teknologi Desa: 5%

export const SHU_BREAKDOWN: SHUBreakdown = {
  year: 2026,
  totalSHU: 12500000000,
  percentages: {
    danaCadangan: 30,
    jasaModal: 10,
    jasaUsaha: 40,
    danaPengurus: 5,
    danaPendidikan: 5,
    danaSosial: 5,
    danaTeknologi: 5,
  },
  breakdown: {
    danaCadangan: 3750000000, // 30% of 12.5M
    jasaModal: 1250000000, // 10%
    jasaUsaha: 5000000000, // 40%
    danaPengurus: 625000000, // 5%
    danaPendidikan: 625000000, // 5%
    danaSosial: 625000000, // 5%
    danaTeknologi: 625000000, // 5%
  },
  memberDistribution: [
    { kpa: 'KPA_1_PRODUCER', totalJasaUsaha: 2250000000, totalJasaModal: 500000000, memberCount: 45000 },
    { kpa: 'KPA_2_ENTREPRENEUR', totalJasaUsaha: 1250000000, totalJasaModal: 300000000, memberCount: 25000 },
    { kpa: 'KPA_3_COOPERATIVE', totalJasaUsaha: 1000000000, totalJasaModal: 250000000, memberCount: 80000 },
    { kpa: 'KPA_4_WORKER', totalJasaUsaha: 250000000, totalJasaModal: 100000000, memberCount: 15000 },
    { kpa: 'KPA_5_CONSUMER', totalJasaUsaha: 150000000, totalJasaModal: 50000000, memberCount: 50000 },
    { kpa: 'KPA_6_INVESTOR', totalJasaUsaha: 100000000, totalJasaModal: 50000000, memberCount: 500 },
  ],
};

// =====================
// Village Integration Components
// =====================

export const VILLAGE_INTEGRATION: VillageIntegration[] = [
  {
    tier: 1,
    name: 'Integrasi Dasar',
    components: [
      { id: 'rt', name: 'Rukun Tetangga', abbreviation: 'RT', category: 'LKD', description: 'Unit terkecil masyarakat', digitalStatus: 'MANUAL', integrationPriority: 'HIGH', icon: 'Home' },
      { id: 'rw', name: 'Rukun Warga', abbreviation: 'RW', category: 'LKD', description: 'Koordinasi antar RT', digitalStatus: 'MANUAL', integrationPriority: 'HIGH', icon: 'Building' },
      { id: 'pkk', name: 'PKK', abbreviation: 'PKK', category: 'KADER', description: 'Pemberdayaan keluarga', digitalStatus: 'MANUAL', integrationPriority: 'CRITICAL', icon: 'Users' },
      { id: 'karang-taruna', name: 'Karang Taruna', abbreviation: 'KT', category: 'KADER', description: 'Pemberdayaan pemuda', digitalStatus: 'MANUAL', integrationPriority: 'CRITICAL', icon: 'Rocket' },
    ],
  },
  {
    tier: 2,
    name: 'Kelembagaan Ekonomi',
    components: [
      { id: 'bumdes', name: 'BUMDes', abbreviation: 'BUMDes', category: 'BADAN', description: 'Badan usaha milik desa', digitalStatus: 'PARTIAL', integrationPriority: 'CRITICAL', icon: 'Building2' },
      { id: 'bumdesma', name: 'BUMDesMA', abbreviation: 'BUMDesMA', category: 'BADAN', description: 'BUMDes Bersama antar desa', digitalStatus: 'PARTIAL', integrationPriority: 'CRITICAL', icon: 'Network' },
      { id: 'kdmp', name: 'Koperasi Desa Merah Putih', abbreviation: 'KDMP', category: 'BADAN', description: 'Koperasi desa program pemerintah', digitalStatus: 'PARTIAL', integrationPriority: 'CRITICAL', icon: 'Flag' },
      { id: 'gapoktan', name: 'Gabungan Kelompok Tani', abbreviation: 'Gapoktan', category: 'PROGRAM', description: 'Kelompok tani tergabung', digitalStatus: 'MANUAL', integrationPriority: 'HIGH', icon: 'Wheat' },
    ],
  },
  {
    tier: 3,
    name: 'Infrastruktur Kesehatan',
    components: [
      { id: 'posyandu', name: 'Posyandu', abbreviation: 'Posyandu', category: 'PROGRAM', description: 'Kesehatan ibu-anak', digitalStatus: 'PARTIAL', integrationPriority: 'HIGH', icon: 'Heart' },
      { id: 'puskesmas', name: 'Puskesmas Pembantu', abbreviation: 'Pustu', category: 'INFRASTRUCTURE', description: 'Pelayanan kesehatan dasar', digitalStatus: 'PARTIAL', integrationPriority: 'HIGH', icon: 'Stethoscope' },
      { id: 'pamsimas', name: 'Pamsimas', abbreviation: 'Pamsimas', category: 'INFRASTRUCTURE', description: 'Air minum dan sanitasi', digitalStatus: 'PARTIAL', integrationPriority: 'MEDIUM', icon: 'Droplets' },
    ],
  },
  {
    tier: 4,
    name: 'Sistem Digital Pemerintah',
    components: [
      { id: 'sid', name: 'Sistem Informasi Desa', abbreviation: 'SID', category: 'SYSTEM', description: 'Data potensi desa', digitalStatus: 'DIGITAL', integrationPriority: 'CRITICAL', icon: 'Database' },
      { id: 'prodeskel', name: 'Profil Desa dan Kelurahan', abbreviation: 'Prodeskel', category: 'SYSTEM', description: 'Profil desa Kemendagri', digitalStatus: 'DIGITAL', integrationPriority: 'CRITICAL', icon: 'FileText' },
      { id: 'siskeudes', name: 'Sistem Keuangan Desa', abbreviation: 'Siskeudes', category: 'SYSTEM', description: 'Keuangan desa BPKP', digitalStatus: 'DIGITAL', integrationPriority: 'CRITICAL', icon: 'Calculator' },
    ],
  },
  {
    tier: 5,
    name: 'Program Pemberdayaan',
    components: [
      { id: 'kube', name: 'Kelompok Usaha Bersama', abbreviation: 'KUBE', category: 'PROGRAM', description: 'Kelompok usaha miskin', digitalStatus: 'MANUAL', integrationPriority: 'HIGH', icon: 'Handshake' },
      { id: 'spp', name: 'Simpan Pinjam Perempuan', abbreviation: 'SPP', category: 'PROGRAM', description: 'Microfinance perempuan', digitalStatus: 'MANUAL', integrationPriority: 'HIGH', icon: 'Wallet' },
      { id: 'lumbung', name: 'Lumbung Pangan Desa', abbreviation: 'LPD', category: 'INFRASTRUCTURE', description: 'Cadangan pangan masyarakat', digitalStatus: 'MANUAL', integrationPriority: 'HIGH', icon: 'Warehouse' },
      { id: 'krpl', name: 'Kawasan Rumah Pangan Lestari', abbreviation: 'KRPL', category: 'PROGRAM', description: 'Pekarangan produktif', digitalStatus: 'MANUAL', integrationPriority: 'MEDIUM', icon: 'Leaf' },
    ],
  },
];

// =====================
// Logistics Partners
// =====================

export const LOGISTICS_PARTNERS: LogisticsPartner[] = [
  { id: 'jnt', name: 'J&T Express', logo: '/images/partners/jnt.png', type: 'EXPRESS', commissionRate: 2000, coverage: ['Nasional'] },
  { id: 'jne', name: 'JNE', logo: '/images/partners/jne.png', type: 'EXPRESS', commissionRate: 2500, coverage: ['Nasional'] },
  { id: 'sicepat', name: 'SiCepat', logo: '/images/partners/sicepat.png', type: 'EXPRESS', commissionRate: 1800, coverage: ['Nasional'] },
  { id: 'anteraja', name: 'AnterAja', logo: '/images/partners/anteraja.png', type: 'EXPRESS', commissionRate: 1500, coverage: ['Nasional'] },
  { id: 'pos', name: 'Pos Indonesia', logo: '/images/partners/pos.png', type: 'POS', commissionRate: 1500, coverage: ['Nasional', 'Remote'] },
  { id: 'jtcargo', name: 'J&T Cargo', logo: '/images/partners/jtcargo.png', type: 'CARGO', commissionRate: 5000, coverage: ['Nasional'] },
];

// =====================
// Courses
// =====================

export const COURSES: Course[] = [
  { id: 'c1', title: 'Literasi Digital Dasar', description: 'Pelajari dasar-dasar literasi digital untuk warga desa', level: 'BASIC', duration: 20, modules: 8, enrolled: 12500, rating: 4.8, thumbnail: '/images/courses/digital-literacy.jpg', category: 'Digital' },
  { id: 'c2', title: 'Marketing Produk Pertanian', description: 'Strategi pemasaran produk pertanian di era digital', level: 'INTERMEDIATE', duration: 40, modules: 12, enrolled: 8500, rating: 4.7, thumbnail: '/images/courses/agri-marketing.jpg', category: 'Bisnis' },
  { id: 'c3', title: 'Manajemen Keuangan Koperasi', description: 'Pengelolaan keuangan untuk pengurus koperasi', level: 'ADVANCED', duration: 60, modules: 15, enrolled: 3200, rating: 4.9, thumbnail: '/images/courses/coop-finance.jpg', category: 'Keuangan' },
  { id: 'c4', title: 'Agen Logistik Digital', description: 'Menjadi agen logistik digital profesional', level: 'INTERMEDIATE', duration: 30, modules: 10, enrolled: 15000, rating: 4.6, thumbnail: '/images/courses/logistics.jpg', category: 'Logistik' },
  { id: 'c5', title: 'Ekspor Produk Pertanian', description: 'Persiapan ekspor produk pertanian ke pasar global', level: 'ADVANCED', duration: 80, modules: 20, enrolled: 2100, rating: 4.8, thumbnail: '/images/courses/export.jpg', category: 'Ekspor' },
];

// =====================
// Governance Structure
// =====================

export const GOVERNANCE_STRUCTURE: GovernanceStructure = {
  pengurus: [
    { id: 'p1', name: 'Drs. H. Arif Rachman Hakim', position: 'Ketua Umum', photo: '/images/people/ceo.jpg', termStart: '2026', termEnd: '2031' },
    { id: 'p2', name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Ketua Dewan Penasihat', photo: '/images/people/founder.jpg', termStart: '2026', termEnd: 'Seumur Hidup' },
    { id: 'p3', name: 'Tn. Fawwaz Arif Al Jabar, S.E., M.M.', position: 'Bendahara Umum', photo: '/images/people/cfo.jpg', termStart: '2026', termEnd: '2031' },
  ],
  pengawas: [
    { id: 'pw1', name: 'Ir. H. Ahmad Sudrajat', position: 'Ketua Pengawas', photo: '/images/people/auditor1.jpg', termStart: '2026', termEnd: '2031' },
  ],
  dewanPenasihat: [
    { id: 'dp1', name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Ketua Dewan Penasihat', photo: '/images/people/founder.jpg', termStart: '2026', termEnd: 'Seumur Hidup' },
  ],
  dewanEtik: [],
  ombudsman: [],
};

// =====================
// Sample Products
// =====================

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 'prod1', name: 'Kopi Arabica Gayo Premium', description: 'Kopi arabica specialty grade dari dataran tinggi Gayo, Aceh', price: 185000, category: 'AGRI', sellerId: 's1', sellerName: 'Gapoktan Gayo Lues', village: 'Gayo Lues', province: 'Aceh', images: ['/images/products/kopi-gayo.jpg'], certification: ['Organik', 'Fair Trade'], stock: 500, rating: 4.9, sold: 1250 },
  { id: 'prod2', name: 'Gula Aren Murni 500g', description: 'Gula aren murni tanpa campuran dari Jawa Barat', price: 45000, category: 'AGRI', sellerId: 's2', sellerName: 'Kelompok Tani Sukajadi', village: 'Sukajadi', province: 'Jawa Barat', images: ['/images/products/gula-aren.jpg'], certification: ['Organik'], stock: 300, rating: 4.8, sold: 890 },
  { id: 'prod3', name: 'Batik Tulis Madura', description: 'Batik tulis asli Madura dengan motif klasik', price: 450000, category: 'RETAIL_UMKM', sellerId: 's3', sellerName: 'UMKM Batik Madura', village: 'Pamekasan', province: 'Jawa Timur', images: ['/images/products/batik-madura.jpg'], certification: ['BTIK'], stock: 50, rating: 4.9, sold: 125 },
  { id: 'prod4', name: 'Madu Hutan Kalimantan 350ml', description: 'Madu hutan asli dari pedalaman Kalimantan', price: 125000, category: 'AGRI', sellerId: 's4', sellerName: 'Kelompok Pemanen Madu', village: 'Kutai', province: 'Kalimantan Timur', images: ['/images/products/madu-kalimantan.jpg'], certification: ['Halal', 'BPOM'], stock: 200, rating: 4.7, sold: 560 },
  { id: 'prod5', name: 'Keripik Singkong Pedas', description: 'Keripik singkong renyah dengan bumbu pedas khas', price: 25000, category: 'RETAIL_UMKM', sellerId: 's5', sellerName: 'KUBE Maju Bersama', village: 'Ciamis', province: 'Jawa Barat', images: ['/images/products/keripik-singkong.jpg'], certification: ['Halal', 'PIRT'], stock: 500, rating: 4.6, sold: 2100 },
  { id: 'prod6', name: 'Jasa Pembuatan Website UMKM', description: 'Pembuatan website profesional untuk UMKM dengan SEO', price: 2500000, category: 'DIGITAL', sellerId: 's6', sellerName: 'Digital Creative Hub', village: 'Bandung', province: 'Jawa Barat', images: ['/images/products/web-design.jpg'], certification: [], stock: 99, rating: 4.8, sold: 45 },
  { id: 'prod7', name: 'Paket Umroh Hemat 9 Hari', description: 'Paket umroh all in 9 hari dengan hotel bintang 3', price: 28500000, category: 'SPIRITUAL', sellerId: 's7', sellerName: 'KNMP Travel', village: 'Jakarta', province: 'DKI Jakarta', images: ['/images/products/umroh.jpg'], certification: ['Halal'], stock: 50, rating: 4.9, sold: 120 },
  { id: 'prod8', name: 'Jamu Kunir Asem Original', description: 'Jamu tradisional kunir asem tanpa pengawet', price: 15000, category: 'HEALTH', sellerId: 's8', sellerName: 'Jamu Ibu Kartini', village: 'Solo', province: 'Jawa Tengah', images: ['/images/products/jamu.jpg'], certification: ['Halal', 'BPOM'], stock: 300, rating: 4.7, sold: 3400 },
  { id: 'prod9', name: 'Cocoa Beans Fermented Grade A', description: 'Biji kakao fermentasi grade A untuk ekspor', price: 85000, category: 'EXPORT', sellerId: 's9', sellerName: 'Koperasi Kakao Sulawesi', village: 'Luwu', province: 'Sulawesi Selatan', images: ['/images/products/cocoa.jpg'], certification: ['Organik', 'Fair Trade', 'Ekspor Ready'], stock: 2000, rating: 4.9, sold: 850 },
  { id: 'prod10', name: 'Solar Panel Kit 1000Wp', description: 'Paket solar panel lengkap untuk rumah tangga', price: 12500000, category: 'ENERGY', sellerId: 's10', sellerName: 'Energi Terbarunan Nusantara', village: 'Surabaya', province: 'Jawa Timur', images: ['/images/products/solar.jpg'], certification: ['SNI'], stock: 25, rating: 4.8, sold: 78 },
  { id: 'prod11', name: 'Vanilla Planifolia Grade A', description: 'Vanilla bourbon premium untuk ekspor', price: 450000, category: 'EXPORT', sellerId: 's11', sellerName: 'Vanilla Papua Cooperative', village: 'Jayapura', province: 'Papua', images: ['/images/products/vanilla.jpg'], certification: ['Organik', 'Ekspor Ready'], stock: 100, rating: 5.0, sold: 200 },
  { id: 'prod12', name: 'Layanan Cargo Maluku-Java', description: 'Layanan cargo kapal dari Maluku ke Jawa', price: 2500000, category: 'LOGISTICS', sellerId: 's12', sellerName: 'Logistik KNMP Ambon', village: 'Ambon', province: 'Maluku', images: ['/images/products/cargo.jpg'], certification: [], stock: 99, rating: 4.6, sold: 350 },
];

// =====================
// Logistics Agents
// =====================

export const SAMPLE_AGENTS: LogisticsAgent[] = [
  { id: 'a1', name: 'Dedi Supriadi', village: 'Sukamaju', province: 'Jawa Barat', partnerExpeditions: ['J&T Express', 'JNE', 'SiCepat'], totalPackages: 1250, totalCommission: 3750000, rating: 4.8, status: 'ACTIVE' },
  { id: 'a2', name: 'Siti Rahayu', village: 'Cianjur', province: 'Jawa Barat', partnerExpeditions: ['J&T Express', 'AnterAja'], totalPackages: 890, totalCommission: 2670000, rating: 4.7, status: 'ACTIVE' },
  { id: 'a3', name: 'Bambang Wijaya', village: 'Garut', province: 'Jawa Barat', partnerExpeditions: ['JNE', 'Pos Indonesia'], totalPackages: 650, totalCommission: 1950000, rating: 4.9, status: 'ACTIVE' },
];

// =====================
// Timeline Activities
// =====================

export const TIMELINE_ACTIVITIES: Activity[] = [
  { id: 'act1', type: 'MEMBERSHIP', title: 'KNMP Didirikan', description: 'Akta notaris KNMP disahkan', timestamp: '2026-01-15T00:00:00Z' },
  { id: 'act2', type: 'TRANSACTION', title: 'Transaksi Pertama', description: 'Transaksi marketplace pertama berhasil', amount: 500000, timestamp: '2026-02-01T00:00:00Z' },
  { id: 'act3', type: 'TRAINING', title: 'Pelatihan Perdana', description: 'Batch pertama JE-P3 Academy diluncurkan', timestamp: '2026-02-15T00:00:00Z' },
  { id: 'act4', type: 'COMMISSION', title: 'Komisi Logistik Pertama', description: 'Agen logistik pertama menerima komisi', amount: 500000, timestamp: '2026-03-01T00:00:00Z' },
  { id: 'act5', type: 'SHU', title: 'SHU Perdana', description: 'Pembagian SHU pertama kepada anggota', amount: 12500000, timestamp: '2026-12-31T00:00:00Z' },
];

// =====================
// Roadmap Data
// =====================

export const ROADMAP_DATA = [
  { year: '2026', title: 'Fondasi & Launch', description: 'Pendirian KNMP, platform MVP, 1.000 desa pilot', status: 'COMPLETED' as const },
  { year: '2027', title: 'Scale-Up Nasional', description: '10.000 desa terintegrasi, 500.000 anggota', status: 'IN_PROGRESS' as const },
  { year: '2028', title: 'Ekspor Global', description: '25.000 desa, ekspor 10 negara, ICA membership', status: 'UPCOMING' as const },
  { year: '2030', title: 'Koperasi Digital Terbesar', description: '50.000 desa, 5 juta anggota, Rp1T revenue', status: 'UPCOMING' as const },
  { year: '2035', title: '100% Coverage', description: '83.763 desa terintegrasi penuh', status: 'UPCOMING' as const },
  { year: '2045', title: 'World Class Cooperative', description: 'Setara Mondragon, Rp500T transaksi', status: 'UPCOMING' as const },
];

// =====================
// Origin Story Timeline
// =====================

export const ORIGIN_TIMELINE = [
  {
    year: '2016',
    title: 'bisnisPPP',
    description: 'Awal mula perjalanan dengan platform bisnis berbasis kemitraan pertama',
    icon: 'Rocket',
  },
  {
    year: '2020',
    title: 'JP3 (Jaringan Penggerak Pembangunan Partisipatif)',
    description: 'Transformasi menjadi jaringan yang lebih terstruktur dengan fokus pemberdayaan desa',
    icon: 'Network',
  },
  {
    year: '2026',
    title: 'JE-P3 & KNMP',
    description: 'Pembentukan dual entity: JE-P3 sebagai asosiasi strategis dan KNMP sebagai koperasi operasional',
    icon: 'Building2',
  },
];

// =====================
// Legal & Compliance
// =====================

export const LEGAL_INFO = {
  aktaKoperasi: 'AHU-0001234.AH.01.01.Tahun 2026',
  npwp: '00.000.000.0-000.000',
  legalEntity: 'Koperasi Serba Usaha (KSU)',
  foundingDate: '15 Januari 2026',
  notary: 'Notaris H. Ahmad Hidayat, S.H., M.Kn.',
  registeredAt: 'Kementerian Koperasi dan UKM RI',
  legalBasis: {
    primaryLaw: 'UU No. 25 Tahun 1992 tentang Perkoperasian',
    regulation: 'Permenkop No. 8 Tahun 2021 tentang Koperasi Digital',
    villageLaw: 'UU No. 27 Tahun 2022 tentang Desa',
    references: [
      'UU No. 25/1992 - Perkoperasian',
      'Permenkop No. 8/2021 - Koperasi Digital',
      'UU No. 27/2022 - Desa',
    ],
  },
};

export const COOPERATIVE_PRINCIPLES = [
  {
    number: 1,
    title: 'Keanggotaan Bersifat Sukarela dan Terbuka',
    description: 'Koperasi adalah organisasi sukarela, terbuka bagi semua orang yang mampu menggunakan jasa koperasi dan bersedia menerima tanggung jawab keanggotaan.',
    icon: 'Users',
    icaTitle: 'Voluntary and Open Membership',
  },
  {
    number: 2,
    title: 'Pengelolaan Dilakukan Secara Demokratis',
    description: 'Koperasi adalah organisasi yang dikelola secara demokratis oleh anggota yang aktif berpartisipasi dalam menetapkan kebijakan dan mengambil keputusan.',
    icon: 'Vote',
    icaTitle: 'Democratic Member Control',
  },
  {
    number: 3,
    title: 'Pembagian SHU Dilakukan Secara Adil',
    description: 'Anggota berkontribusi secara adil dan mengendalikan modal secara demokratis. SHU dibagi berdasarkan kontribusi transaksi anggota.',
    icon: 'Scale',
    icaTitle: 'Member Economic Participation',
  },
  {
    number: 4,
    title: 'Otonomi dan Kemandirian',
    description: 'Koperasi bersifat otonom dan mandiri, organisasi swadaya yang dikelola oleh anggota. Jika bermitra, harus tetap menjaga otonomi.',
    icon: 'Shield',
    icaTitle: 'Autonomy and Independence',
  },
  {
    number: 5,
    title: 'Pendidikan dan Pelatihan',
    description: 'Koperasi menyediakan pendidikan dan pelatihan bagi anggota, pengurus, dan karyawan agar dapat berkontribusi efektif.',
    icon: 'GraduationCap',
    icaTitle: 'Education, Training and Information',
  },
  {
    number: 6,
    title: 'Kerjasama Antar Koperasi',
    description: 'Koperasi melayani anggota secara efektif dan memperkuat gerakan koperasi melalui kerjasama antar koperasi lokal, nasional, dan internasional.',
    icon: 'Handshake',
    icaTitle: 'Cooperation among Cooperatives',
  },
  {
    number: 7,
    title: 'Kepedulian Terhadap Komunitas',
    description: 'Koperasi bekerja demi pembangunan berkelanjutan bagi komunitas melalui kebijakan yang disetujui oleh anggota.',
    icon: 'Heart',
    icaTitle: 'Concern for Community',
  },
];

// =====================
// Dual Entity Architecture
// =====================

export const DUAL_ENTITY = {
  jep3: {
    name: 'JE-P3',
    fullName: 'Jaringan Ekonomi Penggerak Pembangunan Partisipatif',
    type: 'Asosiasi',
    role: 'Strategic Brain',
    description: 'Pemilik kekayaan intelektual, strategi bisnis, dan pengembangan ekosistem',
    responsibilities: [
      'Penyusunan strategi jangka panjang',
      'Pengembangan teknologi & IP',
      'Kemitraan strategis nasional/internasional',
      'Riset dan inovasi bisnis',
      'Standardisasi dan sertifikasi',
    ],
    color: '#D4AF37',
  },
  knmp: {
    name: 'KNMP',
    fullName: 'Koperasi Nusantara Merah Putih',
    type: 'Koperasi',
    role: 'Operational Heart',
    description: 'Pengelola operasional, aset anggota, dan distribusi manfaat ekonomi',
    responsibilities: [
      'Operasional marketplace & logistik',
      'Pengelolaan simpan pinjam',
      'Distribusi SHU kepada anggota',
      'Pemberdayaan UMKM & desa',
      'Pelaksanaan program koperasi',
    ],
    color: '#8B0000',
  },
  saf: {
    name: 'Strategic Alliance Framework',
    description: 'Kerangka kerja strategis yang mengatur hubungan sinergis antara JE-P3 dan KNMP',
    principles: [
      'Pisah hukum, satu visi',
      'Masing-masing entitas mandiri secara legal',
      'JSC sebagai penghubung strategis',
      'Profit sharing yang adil',
      'IP licensing yang transparan',
    ],
  },
  jsc: {
    name: 'Joint Strategic Committee',
    description: 'Komite strategis gabungan yang memastikan alignment antara JE-P3 dan KNMP',
    members: 12,
    meetingFrequency: 'Triwulan',
  },
};

// =====================
// Vision 2045
// =====================

export const VISION_2045 = {
  title: 'Visi Indonesia 2045',
  subtitle: 'KNMP sebagai Penggerak Ekonomi Kerakyatan Indonesia Emas',
  targets: [
    { label: 'Desa Terintegrasi', value: 83763, suffix: '', icon: 'MapPin' },
    { label: 'Anggota Aktif', value: 10, suffix: ' Juta', icon: 'Users' },
    { label: 'Nilai Transaksi', value: 500, suffix: ' Triliun', icon: 'TrendingUp' },
    { label: 'Provinsi', value: 38, suffix: '', icon: 'Flag' },
  ],
  milestones: [
    { year: '2026', title: '1.000 Desa', description: 'Pilot project dan fondasi digital' },
    { year: '2030', title: '50.000 Desa', description: 'Koperasi digital terbesar di Indonesia' },
    { year: '2035', title: '83.763 Desa', description: '100% coverage desa Indonesia' },
    { year: '2040', title: 'Regional Hub', description: 'Pusat koperasi Asia Tenggara' },
    { year: '2045', title: 'World Class', description: 'Setara Mondragon, Spanyol' },
  ],
  benchmark: {
    name: 'Mondragon Corporation',
    country: 'Spanyol',
    founded: 1956,
    members: 80000,
    revenue: '€11.2 Miliar',
    workers: 81000,
    description: 'Koperasi terbesar di dunia yang menjadi inspirasi KNMP. Target KNMP adalah menyalip Mondragon by 2045.',
    targetComparison: {
      knmpTarget2045: 'Rp 500 Triliun (~€30 Miliar)',
      mondragonRevenue: '€11.2 Miliar',
      surpassGoal: '2.5x lebih besar dari Mondragon',
    },
  },
};

// =====================
// Extended Team Structure
// =====================

export const TEAM_STRUCTURE = {
  pengurus: [
    { id: 'p1', name: 'Drs. H. Arif Rachman Hakim', position: 'Ketua Umum', photo: '/images/people/ceo.jpg', termStart: '2026', termEnd: '2031', bio: 'Pengalaman 25 tahun di bidang koperasi dan pembangunan desa' },
    { id: 'p2', name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Ketua Dewan Penasihat', photo: '/images/people/founder.jpg', termStart: '2016', termEnd: 'Seumur Hidup', bio: 'Founder KNMP, visioner ekonomi digital desa' },
    { id: 'p3', name: 'Tn. Fawwaz Arif Al Jabar, S.E., M.M.', position: 'Bendahara Umum', photo: '/images/people/cfo.jpg', termStart: '2026', termEnd: '2031', bio: 'Expert keuangan dan investasi syariah' },
    { id: 'p4', name: 'Ir. H. Bambang Sutrisno', position: 'Sekretaris Umum', photo: '/images/people/secretary.jpg', termStart: '2026', termEnd: '2031', bio: 'Pengelola administrasi dan tata kelola organisasi' },
  ],
  pengawas: [
    { id: 'pw1', name: 'Ir. H. Ahmad Sudrajat', position: 'Ketua Pengawas', photo: '/images/people/auditor1.jpg', termStart: '2026', termEnd: '2031', bio: 'Audit internal dan pengawasan keuangan' },
    { id: 'pw2', name: 'Dra. Hj. Siti Nurhaliza', position: 'Anggota Pengawas', photo: '/images/people/auditor2.jpg', termStart: '2026', termEnd: '2031', bio: 'Pengawasan operasional dan kepatuhan' },
  ],
  dewanPenasihat: [
    { id: 'dp1', name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Ketua Dewan Penasihat', photo: '/images/people/founder.jpg', termStart: '2016', termEnd: 'Seumur Hidup', bio: 'Founder & Chief Visionary' },
    { id: 'dp2', name: 'Prof. Dr. H. Bambang Brodjonegoro', position: 'Penasihat Ekonomi', photo: '/images/people/advisor1.jpg', termStart: '2026', termEnd: '2031', bio: 'Pakar ekonomi regional dan pembangunan' },
    { id: 'dp3', name: 'Dr. H. Suharso Monoarfa', position: 'Penasihat Kebijakan', photo: '/images/people/advisor2.jpg', termStart: '2026', termEnd: '2031', bio: 'Expert kebijakan publik dan pembangunan nasional' },
  ],
};

// =====================
// Partner Logos
// =====================

export const PARTNER_LOGOS = [
  { id: 'kemenkop', name: 'Kementerian Koperasi dan UKM', logo: '/images/partners/kemenkop.png', category: 'Government' },
  { id: 'kemendesa', name: 'Kementerian Desa PDTT', logo: '/images/partners/kemendesa.png', category: 'Government' },
  { id: 'jnt', name: 'J&T Express', logo: '/images/partners/jnt.png', category: 'Logistics' },
  { id: 'jne', name: 'JNE', logo: '/images/partners/jne.png', category: 'Logistics' },
  { id: 'sicepat', name: 'SiCepat', logo: '/images/partners/sicepat.png', category: 'Logistics' },
  { id: 'ant', name: 'AnterAja', logo: '/images/partners/anteraja.png', category: 'Logistics' },
  { id: 'pos', name: 'Pos Indonesia', logo: '/images/partners/pos.png', category: 'Logistics' },
  { id: 'bri', name: 'Bank BRI', logo: '/images/partners/bri.png', category: 'Financial' },
  { id: 'mandiri', name: 'Bank Mandiri', logo: '/images/partners/mandiri.png', category: 'Financial' },
  { id: 'kdmp', name: 'KDMP Network', logo: '/images/partners/kdmp.png', category: 'Network' },
];

// =====================
// KDMP Alignment
// =====================

export const KDMP_ALIGNMENT = {
  description: 'KNMP selaras dengan program Koperasi Desa Merah Putih (KDMP) pemerintah untuk mempercepat integrasi desa digital di seluruh Indonesia',
  points: [
    'Sinergi dengan 83.763 desa dalam program KDMP',
    'Integrasi sistem dengan BUMDes dan koperasi desa',
    'Dukungan pelatihan digital untuk kader desa',
    'Akses marketplace dan logistik terintegrasi',
    'Pemberdayaan ekonomi berbasis komoditas lokal',
  ],
};

// =====================
// 5 Pilar Unit Usaha Strategis (AD/ART KNMP)
// =====================

export const PILAR_UNIT_USAHA = [
  {
    number: 1,
    name: 'DESA CERDAS DIGITAL',
    headline: 'Mengintegrasikan seluruh kelembagaan sosial desa ke dalam satu platform digital',
    description: 'Platform digital untuk transformasi desa mencakup e-government, e-health, e-education, dan e-commerce desa',
    icon: 'Smartphone',
    color: '#3b82f6',
    gradientFrom: '#3b82f6',
    gradientTo: '#1d4ed8',
    services: [
      'Sistem Informasi Desa Terpadu',
      'Dashboard Pemerintahan Desa',
      'Layanan Publik Digital',
      'E-Voting Musyawarah Desa',
    ],
    targetRevenue: 50000000000, // 50 Miliar
    progress: 75,
    subPilar: [
      {
        id: '1a',
        name: 'Desa Digital',
        description: 'Village Management System terintegrasi SID, Prodeskel, Siskeudes',
        icon: 'LayoutDashboard',
        color: '#3b82f6',
      },
      {
        id: '1b',
        name: 'Desa Aman',
        description: 'Smart CCTV, BMKG Alert, Perlindungan Data',
        icon: 'ShieldCheck',
        color: '#22c55e',
      },
      {
        id: '1c',
        name: 'Desa Sehat',
        description: 'Posyandu Digital, Health Score, integrasi PKK dan Pamsimas',
        icon: 'HeartPulse',
        color: '#ef4444',
      },
      {
        id: '1d',
        name: 'Desa Pintar',
        description: 'JE-P3 Academy, Karang Taruna Digital, Perpustakaan Digital',
        icon: 'GraduationCap',
        color: '#8b5cf6',
      },
      {
        id: '1e',
        name: 'Desa Kaya',
        description: 'Family Economy Tracker, KUBE Digital, Graduasi Kemiskinan',
        icon: 'Wallet',
        color: '#D4AF37',
      },
      {
        id: '1f',
        name: 'Desa Modern',
        description: 'Cultural Heritage, Desa Wisata Digital, Infrastruktur Tracker',
        icon: 'Building2',
        color: '#f59e0b',
      },
    ],
  },
  {
    number: 2,
    name: 'HOLDING DESA',
    headline: 'Menyatukan KDMP, BUMDes, BUMDesMA, Dana Desa, dan KUD',
    description: 'KDMP-as-a-Service, BUMDes, dan BUMDesMA sebagai penggerak ekonomi desa terintegrasi',
    icon: 'Building2',
    color: '#8B0000',
    gradientFrom: '#8B0000',
    gradientTo: '#5c0000',
    services: [
      'KDMP-as-a-Service (KaaS)',
      'BUMDes Management System',
      'BUMDesMA Konsolidasi',
      'Konsultasi Pengembangan Usaha',
    ],
    targetRevenue: 150000000000, // 150 Miliar
    progress: 65,
    subPilar: [
      {
        id: '2a',
        name: 'KDMP-as-a-Service (KaaS)',
        description: '80.081 gerai KDMP terintegrasi platform digital',
        icon: 'Store',
        color: '#8B0000',
        highlight: '80.081 gerai',
      },
      {
        id: '2b',
        name: 'BUMDes & BUMDesMA',
        description: 'Digitalisasi 57.000+ BUMDes dan BUMDesMA seluruh Indonesia',
        icon: 'Network',
        color: '#D4AF37',
        highlight: '57.000+ BUMDes',
      },
      {
        id: '2c',
        name: 'Dana Desa Intelligence',
        description: 'Analisis alokasi optimal Rp71 triliun untuk pembangunan desa',
        icon: 'BarChart3',
        color: '#22c55e',
        highlight: 'Rp71 Triliun',
      },
      {
        id: '2d',
        name: 'KUD Revitalisasi',
        description: 'Migrasi anggota aktif KUD ke platform digital KNMP',
        icon: 'Users',
        color: '#3b82f6',
      },
    ],
  },
  {
    number: 3,
    name: 'RESI GUDANG DIGITAL',
    headline: 'Membangun infrastruktur pasca-panen untuk kedaulatan pangan',
    description: 'Sistem resi gudang elektronik untuk komoditas pertanian dengan sertifikasi blockchain',
    icon: 'Warehouse',
    color: '#22c55e',
    gradientFrom: '#22c55e',
    gradientTo: '#15803d',
    services: [
      'E-Resi Gudang Terdaftar',
      'Sertifikasi Komoditas',
      'Skema Pembiayaan Resi',
      'Trading Komoditas Digital',
    ],
    targetRevenue: 100000000000, // 100 Miliar
    progress: 45,
    subPilar: [
      {
        id: '3a',
        name: 'Hilirisasi Komoditas',
        description: 'Pengolahan bahan baku di level desa untuk nilai tambah maksimal',
        icon: 'Package',
        color: '#22c55e',
      },
      {
        id: '3b',
        name: 'Resi Gudang Bersertifikat BAPPEBTI',
        description: 'Agunan kredit digital berbasis komoditas tersertifikasi',
        icon: 'FileCheck',
        color: '#3b82f6',
        highlight: 'BAPPEBTI Certified',
      },
      {
        id: '3c',
        name: 'Supply Chain Tokenization',
        description: 'Blockchain traceability untuk transparansi rantai pasok',
        icon: 'Link',
        color: '#8b5cf6',
      },
      {
        id: '3d',
        name: 'Cold Chain Network',
        description: '80.081 Collection Point, 5.000+ Hub, 38 Distribution Hub',
        icon: 'Refrigerator',
        color: '#06b6d4',
        highlight: '80.081 CP',
      },
    ],
  },
  {
    number: 4,
    name: 'INVESTASI & KAMPUNG MODAL',
    headline: 'Mengubah potensi desa menjadi aset investasi produktif',
    description: 'Platform investasi syariah dan konvensional untuk pemberdayaan ekonomi desa',
    icon: 'TrendingUp',
    color: '#D4AF37',
    gradientFrom: '#D4AF37',
    gradientTo: '#b8960c',
    services: [
      'Kampung Modal Platform',
      'Investasi Syariah Desa',
      'Crowdfunding Pertanian',
      'Sukuk Desa Digital',
    ],
    targetRevenue: 200000000000, // 200 Miliar
    progress: 35,
    subPilar: [
      {
        id: '4a',
        name: 'Pertanian Presisi',
        description: 'Smart Farming AI, IoT sensors, KUR Desa untuk petani modern',
        icon: 'Wheat',
        color: '#22c55e',
      },
      {
        id: '4b',
        name: 'Perkebunan Ekspor',
        description: 'Sertifikasi organik/Fair Trade untuk akses pasar global',
        icon: 'TreeDeciduous',
        color: '#84cc16',
        highlight: 'Fair Trade',
      },
      {
        id: '4c',
        name: 'Peternakan',
        description: 'Village Protein Hub, sertifikasi Halal MUI + GCC',
        icon: 'Beef',
        color: '#f59e0b',
        highlight: 'Halal MUI + GCC',
      },
      {
        id: '4d',
        name: 'Perikanan',
        description: 'Digital Fishery Hub, Fish Auction Blockchain',
        icon: 'Fish',
        color: '#06b6d4',
      },
      {
        id: '4e',
        name: 'Desa Wisata',
        description: 'Platform booking, homestay management, OTA global integration',
        icon: 'Palmtree',
        color: '#8b5cf6',
      },
      {
        id: '4f',
        name: 'Energi Desa',
        description: 'Biogas, panel surya, micro-hydro, Carbon Credits trading',
        icon: 'Zap',
        color: '#f59e0b',
        highlight: 'Carbon Credits',
      },
    ],
  },
  {
    number: 5,
    name: 'LOGISTIK DIGITAL',
    headline: 'Jaringan logistik terintegrasi dari desa ke dunia',
    description: 'Jaringan logistik terintegrasi dengan 83.763 agen desa untuk distribusi barang',
    icon: 'Truck',
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    services: [
      'Agen Logistik Desa',
      'Last Mile Delivery',
      'Cold Chain Logistics',
      'Cargo Domestik & Ekspor',
    ],
    targetRevenue: 250000000000, // 250 Miliar
    progress: 80,
    subPilar: [
      {
        id: '5a',
        name: 'Ekspor Digital',
        description: 'KNMP Global Trade Desk, FCL Consolidation ke 195 negara',
        icon: 'Globe',
        color: '#3b82f6',
        highlight: '195 Negara',
      },
      {
        id: '5b',
        name: 'Impor Strategis',
        description: 'Group Purchasing Order, penghematan 30-50% untuk desa',
        icon: 'Ship',
        color: '#22c55e',
        highlight: 'Hemat 30-50%',
      },
      {
        id: '5c',
        name: 'Karang Taruna Digital',
        description: '83.763 agen logistik desa sebagai last mile delivery',
        icon: 'Users',
        color: '#8B0000',
        highlight: '83.763 agen',
      },
      {
        id: '5d',
        name: 'Tokenisasi Rantai Pasok',
        description: 'Supply Chain Finance Rp50 triliun untuk modal kerja',
        icon: 'Coins',
        color: '#D4AF37',
        highlight: 'Rp50 Triliun',
      },
      {
        id: '5e',
        name: 'Infrastruktur 3 Level',
        description: '80.081 Collection Point, 5.000+ Hub, 38 Distribution Hub',
        icon: 'MapPin',
        color: '#f59e0b',
        highlight: '3 Level Network',
      },
    ],
  },
];

// =====================
// Leadership / Key People
// =====================

export const LEADERSHIP = {
  ceo: {
    name: 'Drs. H. Arif Rachman Hakim',
    title: 'CEO & Pendiri KNMP',
    position: 'Ketua Umum',
    photo: '/images/people/ceo.jpg',
    bio: 'Pengalaman 25 tahun di bidang koperasi dan pembangunan desa. Visioner di balik pendirian KNMP sebagai koperasi digital terbesar di Indonesia.',
    termStart: '2026',
    termEnd: '2031',
  },
  coo: {
    name: 'Tn. H. Gugun Gunara, S.E., M.M.',
    title: 'Grand Architect & COO',
    position: 'Ketua Dewan Penasihat',
    photo: '/images/people/founder.jpg',
    bio: 'Founder JE-P3 dan arsitek utama ekosistem KNMP. Perintis ekonomi digital desa sejak 2016 dengan visi menjadikan KNMP setara Mondragon.',
    termStart: '2016',
    termEnd: 'Seumur Hidup',
  },
  cfo: {
    name: 'Tn. Fawwaz Arif Al Jabar, S.E., M.M.',
    title: 'CFO',
    position: 'Bendahara Umum',
    photo: '/images/people/cfo.jpg',
    bio: 'Expert keuangan dan investasi syariah dengan pengalaman di berbagai lembaga keuangan nasional.',
    termStart: '2026',
    termEnd: '2031',
  },
  board: [
    {
      name: 'Ir. H. Bambang Sutrisno',
      title: 'Sekretaris Umum',
      photo: '/images/people/secretary.jpg',
      bio: 'Pengelola administrasi dan tata kelola organisasi',
    },
    {
      name: 'Ir. H. Ahmad Sudrajat',
      title: 'Ketua Pengawas',
      photo: '/images/people/auditor1.jpg',
      bio: 'Audit internal dan pengawasan keuangan',
    },
  ],
};

// =====================
// KPA Voting Power Summary
// =====================

export const KPA_VOTING_SUMMARY = {
  totalVotingPower: 100,
  categories: [
    { kpa: 'KPA-1', name: 'Petani/Produsen', votingPower: 30, description: 'Suara terbesar karena produsen adalah tulang punggung ekonomi desa' },
    { kpa: 'KPA-2', name: 'Pengusaha/Pengepul', votingPower: 20, description: 'Penghubung antara produsen dan pasar' },
    { kpa: 'KPA-3', name: 'Koperasi/BUMDes', votingPower: 20, description: 'Institusi ekonomi desa yang mandiri' },
    { kpa: 'KPA-4', name: 'Pekerji/Kader', votingPower: 15, description: 'Tenaga operasional yang menjalankan roda koperasi' },
    { kpa: 'KPA-5', name: 'Konsumen', votingPower: 10, description: 'Pengguna akhir produk dan jasa KNMP' },
    { kpa: 'KPA-6', name: 'Investor Pendukung', votingPower: 5, description: 'Penyedia modal untuk pengembangan usaha' },
  ],
};

// =====================
// Tier Pricing Summary
// =====================

export const TIER_PRICING_SUMMARY = [
  { tier: 'T1', name: 'Petani Digital', price: 0, priceFormatted: 'Gratis', description: 'Untuk petani yang ingin memulai journey digital' },
  { tier: 'T2', name: 'Founding Member', price: 250000, priceFormatted: 'Rp 250.000', description: 'Anggota pendiri dengan hak suara Munas' },
  { tier: 'T3', name: 'Koperasi/BUMDes', price: 2500000, priceFormatted: 'Rp 2.500.000', description: 'Hak usaha operasional via KNMP' },
  { tier: 'T4', name: 'Regional Kecamatan', price: 10000000, priceFormatted: 'Rp 10.000.000', description: 'Hak eksklusif wilayah kecamatan' },
  { tier: 'T5', name: 'Regional Kabupaten', price: 15000000, priceFormatted: 'Rp 15.000.000', description: 'Hak eksklusif kabupaten' },
  { tier: 'T6', name: 'Provinsi', price: 125000000, priceFormatted: 'Rp 125.000.000', description: 'Koordinasi 38 provinsi' },
  { tier: 'T7', name: 'Nasional Strategis', price: 1000000000, priceFormatted: 'Rp 1.000.000.000', description: 'Investor-level access' },
];

// =====================
// Hero Stats for Display
// =====================

export const HERO_STATS_DISPLAY = {
  villages: { value: 83763, label: 'Desa', suffix: '', description: 'Target integrasi seluruh desa Indonesia' },
  kpaCount: { value: 6, label: 'KPA', suffix: '', description: 'Kelompok Penerima Manfaat terstruktur' },
  exportCountries: { value: 195, label: 'Negara', suffix: '', description: 'Target ekspor ke seluruh dunia' },
  targetBy2045: { value: 500, label: 'Triliun', suffix: ' Rp', description: 'Target nilai transaksi by 2045' },
};
