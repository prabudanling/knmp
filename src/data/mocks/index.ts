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
  villages: 83763,
  members: 125000,
  provinces: 38,
  transactionValue: 2500000000000, // 2.5 Triliun
  exportVolume: 25000000000000, // 25 Triliun
  agents: 83763,
};

// =====================
// KPA Data
// =====================

export const KPA_DATA: KPACategory[] = [
  {
    id: 'KPA_1_PRODUSEN_PEKERJA',
    name: 'Produsen & Pekerja (Pencipta Nilai)',
    description: 'Petani murni, nelayan, peternak, pekebun, pengrajin, buruh tani, agen logistik, kurir ekosistem, kader digital',
    icon: 'Wheat',
    color: '#22c55e',
    votingPower: 20,
    memberCount: 45000,
  },
  {
    id: 'KPA_2_KONSUMEN_UMUM',
    name: 'Konsumen Umum (Mesin Permintaan)',
    description: 'Warga masyarakat umum pengguna JP3 Pay, pembeli retail marketplace, wisatawan & jemaah perjalanan',
    icon: 'ShoppingBag',
    color: '#3b82f6',
    votingPower: 20,
    memberCount: 50000,
  },
  {
    id: 'KPA_3_ABDI_NEGARA',
    name: 'Abdi Negara & Pejabat Publik (Jangkar Stabilitas)',
    description: 'PNS, ASN, P3K, Pensiunan, TNI/POLRI aktif & purnawirawan, Pejabat Negara, DPR/DPRD/DPD, Kepala Daerah',
    icon: 'Shield',
    color: '#8b5cf6',
    votingPower: 20,
    memberCount: 25000,
  },
  {
    id: 'KPA_4_ENTITAS_BISNIS',
    name: 'Entitas Bisnis & Pelaku Usaha (Mesin B2B)',
    description: 'Bandar lokal, pengepul hasil bumi, pedagang besar, PT/CV/Firma, Yayasan, BUMDes, Koperasi Primer',
    icon: 'Building2',
    color: '#f59e0b',
    votingPower: 20,
    memberCount: 80000,
  },
  {
    id: 'KPA_5_PEMODAL_INVESTOR',
    name: 'Pemodal & Investor (Likuiditas Berdaulat)',
    description: 'Angel Investor, Venture Capital, Bank Pemerintah (Himbara), Bank Swasta, Institusi internasional',
    icon: 'TrendingUp',
    color: '#008F3D',
    votingPower: 20,
    memberCount: 500,
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
    { phase: 'Fase 1', year: '2026', target: '5.000 Desa Terintegrasi', progress: 100, status: 'COMPLETED' },
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
    kpa: 'KPA_1_PRODUSEN_PEKERJA',
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
    { id: '2', title: 'Lihat Komisi', icon: 'Wallet', href: '/dashboard/komisi', color: '#008F3D' },
    { id: '3', title: 'Pelatihan', icon: 'GraduationCap', href: '/academy', color: '#3b82f6' },
    { id: '4', title: 'SHU Saya', icon: 'TrendingUp', href: '/shu', color: '#8b5cf6' },
  ],
};

// =====================
// SHU Breakdown
// =====================

export const SHU_BREAKDOWN: SHUBreakdown = {
  year: 2026,
  totalSHU: 12500000000,
  breakdown: {
    danaCadangan: 3125000000,
    jasaUsaha: 5625000000,
    jasaModal: 1250000000,
    danaRisetTeknologi: 1250000000,
    danaSosialPeradaban: 625000000,
    insentifManajemen: 625000000,
  },
  memberDistribution: [
    { kpa: 'KPA_1_PRODUSEN_PEKERJA', totalJasaUsaha: 2250000000, totalJasaModal: 500000000, memberCount: 45000 },
    { kpa: 'KPA_2_KONSUMEN_UMUM', totalJasaUsaha: 1250000000, totalJasaModal: 300000000, memberCount: 50000 },
    { kpa: 'KPA_3_ABDI_NEGARA', totalJasaUsaha: 1000000000, totalJasaModal: 250000000, memberCount: 25000 },
    { kpa: 'KPA_4_ENTITAS_BISNIS', totalJasaUsaha: 750000000, totalJasaModal: 150000000, memberCount: 80000 },
    { kpa: 'KPA_5_PEMODAL_INVESTOR', totalJasaUsaha: 375000000, totalJasaModal: 50000000, memberCount: 500 },
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
// Governance Structure - Updated based on PDF
// =====================

export const GOVERNANCE_STRUCTURE: GovernanceStructure = {
  pengurus: [
    { id: 'p1', name: 'Prof. Wirono, S.E., M.Pd', position: 'Presiden / Ketua Umum (Bakornas)', photo: '/images/people/ketua.jpg', termStart: '2026', termEnd: '2029' },
    { id: 'p2', name: 'Drs. H. Arif Rachman Hakim, M.M.', position: 'Wakil Presiden / Wakil Ketua Umum', photo: '/images/people/waketum.jpg', termStart: '2026', termEnd: '2029' },
    { id: 'p3', name: 'Dr. Cecep Sumarno', position: 'Sekretaris Jenderal (Sekjen)', photo: '/images/people/sekjen.jpg', termStart: '2026', termEnd: '2029' },
    { id: 'p4', name: '(Posisi Kosong)', position: 'Wakil Sekretaris Jenderal (Wasekjen)', photo: '', termStart: '2026', termEnd: '2029' },
    { id: 'p5', name: '(Posisi Kosong)', position: 'Bendahara Umum / CFO', photo: '', termStart: '2026', termEnd: '2029' },
  ],
  pengawas: [
    { id: 'pw1', name: 'Prof. Dr. Tedy Mantoro', position: 'Ketua Dewan Pengawas', photo: '/images/people/pengawas1.jpg', termStart: '2026', termEnd: '2029' },
    { id: 'pw2', name: 'Prof. Dr. Elan Masbulan', position: 'Wakil Ketua Pengawas', photo: '/images/people/pengawas2.jpg', termStart: '2026', termEnd: '2029' },
    { id: 'pw3', name: 'Dr. Habib', position: 'Sekretaris Pengawas', photo: '/images/people/pengawas3.jpg', termStart: '2026', termEnd: '2029' },
  ],
  dewanPenasihat: [
    { id: 'dp1', name: 'Dr. A. Iskandar Zulkarnain', position: 'Ketua Dewan Penasihat Kehormatan', photo: '/images/people/penasihat1.jpg', termStart: '2026', termEnd: '2029' },
  ],
  dewanEtik: [],
  ombudsman: [],
};

// =====================
// Dewan Pendiri - 17 Anggota (v17 Final)
// =====================

export const DEWAN_PENDIRI = [
  { id: 'pendiri-1', no: 1, name: 'H. Arif Rachman Hakim, M.M.', position: 'Pendiri ke-1', role: 'Wakil Presiden / Wakil Ketua Umum, CEO JE-P3 & Diplomat Utama 195 Negara', status: 'active' },
  { id: 'pendiri-2', no: 2, name: 'Prof. Wirono, S.E., M.Pd', position: 'Pendiri ke-2', role: 'Presiden / Ketua Umum (Bakornas), Pimpinan Tertinggi Eksekutif KMNMP', status: 'active' },
  { id: 'pendiri-3', no: 3, name: 'Prof. Dr. Teddy Mantoro, MSC., PHD., SMIEEE', position: 'Pendiri ke-3', role: 'Ketua Dewan Pengawas, Ahli Tata Kelola Digital & CTO Advisor', status: 'active' },
  { id: 'pendiri-4', no: 4, name: 'Dr. Habib', position: 'Pendiri ke-4', role: 'Anggota Dewan Pengawas, Ahli Ketahanan Pangan Nasional', status: 'active' },
  { id: 'pendiri-5', no: 5, name: 'Komjen. Pol. (Purn.) Dr. Dharma Pongrekun', position: 'Pendiri ke-5', role: 'Ketua Bidang Keamanan Siber & Kedaulatan Digital, Mantan Wakil Kepala BSSN', status: 'active' },
  { id: 'pendiri-6', no: 6, name: 'Dalam Proses Pengesahan', position: 'Pendiri ke-6', role: 'Dewan Penasihat Pertahanan & Ketahanan Nasional', status: 'pending' },
  { id: 'pendiri-7', no: 7, name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Pendiri ke-7', role: 'Grand Architect & COO, Arsitek Ekosistem Digital KMNMP', status: 'active' },
  { id: 'pendiri-8', no: 8, name: 'Dr. Cecep Sumarno', position: 'Pendiri ke-8', role: 'Sekretaris Jenderal, Kepala Administrasi & Legal Koperasi', status: 'active' },
  { id: 'pendiri-9', no: 9, name: 'Andi Darmadji, S.E.', position: 'Pendiri ke-9', role: 'Panglima Wilayah Kalimantan (Bakorwil), Pilar Ekspansi Kawasan Timur & IKN', status: 'active' },
  { id: 'pendiri-10', no: 10, name: 'Hj. Inna Hadianala, S.E.', position: 'Pendiri ke-10', role: 'Ketua Bidang Organisasi & Keanggotaan', status: 'active' },
  { id: 'pendiri-11', no: 11, name: 'Fawwaz Arif Al Jabar, S.E., M.M.', position: 'Pendiri ke-11', role: 'Ketua Bidang Keuangan & Perbankan, CFO & Chief Financial Advisor', status: 'active' },
  { id: 'pendiri-12', no: 12, name: 'H. Mugi Prasetyo, S.E.', position: 'Pendiri ke-12', role: 'Koordinator Bidang Kemitraan Strategis', status: 'active' },
  { id: 'pendiri-13', no: 13, name: 'Dr. N. Rusmiati, M.Si., M.H.', position: 'Pendiri ke-13', role: 'Ketua Umum DPP ASITA, Koordinator Bidang Pariwisata', status: 'active' },
  { id: 'pendiri-14', no: 14, name: 'Hj. Fani Anggraeni, S.E.', position: 'Pendiri ke-14', role: 'Koordinator Bidang Pengembangan SDM', status: 'active' },
  { id: 'pendiri-15', no: 15, name: 'Ir. Endro Wuryanto, M.M.', position: 'Pendiri ke-15', role: 'Koordinator Bidang Infrastruktur Digital', status: 'active' },
  { id: 'pendiri-16', no: 16, name: 'Prof. Dr. H. Anwar Sanusi, SH, S.Pel, MM', position: 'Pendiri ke-16', role: 'Wakil Ketua Dewan Pembina, Representasi Pemerintah', status: 'active' },
  { id: 'pendiri-17', no: 17, name: 'Dalam Proses Pengesahan', position: 'Pendiri ke-17', role: 'Menunggu Pengesahan RAT', status: 'pending' },
];

// =====================
// Koordinator 17 Bidang (Updated)
// =====================

export const KOORDINATOR_BIDANG = [
  { no: 1, bidang: 'Organisasi & Keanggotaan', ketua: 'Hj. Inna Hadianala, S.E.', sekretaris: '(Kosong)', catatan: 'Pendiri ke-10 | Koordinator Organisasi' },
  { no: 2, bidang: 'Pangan & Ketahanan Pangan', ketua: 'Dr. Habib', sekretaris: '(Kosong)', catatan: 'Pendiri ke-4 | Ketahanan Pangan Nasional' },
  { no: 3, bidang: 'Industri & Manufaktur', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'Prioritas: Industri Pengolahan Desa' },
  { no: 4, bidang: 'Logistik & Distribusi', ketua: 'M. Ilham', sekretaris: '(Kosong)', catatan: 'Jaringan Logistik 83.763 Desa' },
  { no: 5, bidang: 'Kesehatan & Farmasi', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'Integrasi Posyandu 300rb Unit' },
  { no: 6, bidang: 'Keuangan & Perbankan', ketua: 'Fawwaz Arif Al Jabar, S.E., M.M.', sekretaris: '(Kosong)', catatan: 'Pendiri ke-11 | CFO & Fintech Desa' },
  { no: 7, bidang: 'Investasi & ESG', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'ESG, Green Bond, Impact Investing' },
  { no: 8, bidang: 'Bisnis Kemitraan & UMKM', ketua: 'Ongky Putra', sekretaris: '(Kosong)', catatan: 'Ekosistem Mitra & UMKM Desa' },
  { no: 9, bidang: 'Digital & Teknologi', ketua: 'M. Sidik', sekretaris: '(Kosong)', catatan: 'kopnusa.id | Blockchain | AI | IoT' },
  { no: 10, bidang: 'Holding Trading Ekosistem', ketua: 'Tn. H. Gugun Gunara, S.E., M.M.', sekretaris: 'Cecep Abdul Jabbar', catatan: 'Pendiri ke-7 | Grand Architect | Holding Strategis' },
  { no: 11, bidang: 'Wisata, Umroh & Haji', ketua: 'Dr. Cecep Sumarno', sekretaris: '(Kosong)', catatan: 'Pendiri ke-8 | Sekjen merangkap Bid. 11' },
  { no: 12, bidang: 'Hukum & Advokasi', ketua: 'Tegar Ramadhan, SH', sekretaris: '(Kosong)', catatan: 'Legal, Compliance, Advokasi Anggota' },
  { no: 13, bidang: 'Pengembangan SDM & Diklat', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'JE-P3 Academy | Kader KNMP Nasional' },
  { no: 14, bidang: 'Ekspor Impor & Perdagangan Internasional', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'Global Trade Desk | Komoditas Ekspor Desa' },
  { no: 15, bidang: 'Hubungan Masyarakat & Media', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'Branding KNMP Nasional & Internasional' },
  { no: 16, bidang: 'Teknologi & Inovasi', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'IT Infrastructure | Software Development' },
  { no: 17, bidang: 'Kemitraan Internasional', ketua: 'Dalam Proses Pengesahan', sekretaris: '(Kosong)', catatan: 'Diplomasi Ekonomi | 195 Negara' },
];

// =====================
// Koordinator 5 Kawasan Bakorwil (Updated from PDF)
// =====================

export const KOORDINATOR_KAWASAN = [
  { no: 1, kawasan: 'JAWA (Bakorwil Jawa)', panglima: '(Kosong - Prioritas Utama)', cakupan: 'DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur, DI Yogyakarta, Banten (6 Provinsi)', catatan: 'Pusat Populasi & Ekonomi NKRI Prioritas Rekrutmen' },
  { no: 2, kawasan: 'SUMATERA (Bakorwil Sumatera)', panglima: 'Erick Hariadi (Jaringan KADIN)', cakupan: 'Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepri, Jambi, Bengkulu, Sumatera Selatan, Babel, Lampung (10 Provinsi)', catatan: 'Komoditas: Sawit, Karet, Kopi, Lada, Batubara Gateway Ekspor ASEAN' },
  { no: 3, kawasan: 'KALIMANTAN (Bakorwil Kalimantan)', panglima: 'Andi Darmadji, S.E. (Pendiri ke-9 KNMP)', cakupan: 'Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, Kalimantan Utara (5 Provinsi)', catatan: 'IKN Nusantara - Episentrum Baru Komoditas: Sawit, Batubara, Rotan' },
  { no: 4, kawasan: 'SULAWESI & MALUKU (Bakorwil Sulawesi-Maluku)', panglima: 'Imam Fauzan (Koordinator Sulawesi)', cakupan: 'Sulawesi Utara, Sulawesi Tengah, Sulawesi Selatan, Sulawesi Tenggara, Gorontalo, Sulawesi Barat, Maluku, Maluku Utara (8 Provinsi)', catatan: 'Komoditas: Nikel, Kakao, Cengkeh, Rempah, Perikanan Laut Dalam Ekonomi Biru' },
  { no: 5, kawasan: 'PAPUA & WILAYAH TIMUR (Bakorwil Papua & NTT)', panglima: '(Kosong - Prioritas Strategis)', cakupan: 'Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya, Nusa Tenggara Timur (7 Provinsi)', catatan: 'Kawasan Perbatasan & Sumber Daya Prioritas Program Keadilan Ekonomi' },
];

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
  { year: '2045', title: 'World Class Cooperative', description: 'Setara Mondragon, Rp2.000 T transaksi', status: 'UPCOMING' as const },
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
};

export const COOPERATIVE_PRINCIPLES = [
  {
    number: 1,
    title: 'Keanggotaan Bersifat Sukarela dan Terbuka',
    description: 'Koperasi adalah organisasi sukarela, terbuka bagi semua orang yang mampu menggunakan jasa koperasi.',
    icon: 'Users',
  },
  {
    number: 2,
    title: 'Pengelolaan Dilakukan Secara Demokratis',
    description: 'Koperasi adalah organisasi yang dikelola secara demokratis oleh anggota yang aktif berpartisipasi.',
    icon: 'Vote',
  },
  {
    number: 3,
    title: 'Pembagian SHU Dilakukan Secara Adil',
    description: 'Anggota berkontribusi secara adil dan mengendalikan modal secara demokratis.',
    icon: 'Scale',
  },
  {
    number: 4,
    title: 'Otonomi dan Kemandirian',
    description: 'Koperasi bersifat otonom dan mandiri, organisasi swadaya yang dikelola oleh anggota.',
    icon: 'Shield',
  },
  {
    number: 5,
    title: 'Pendidikan dan Pelatihan',
    description: 'Koperasi menyediakan pendidikan dan pelatihan bagi anggota, pengurus, dan karyawan.',
    icon: 'GraduationCap',
  },
  {
    number: 6,
    title: 'Kerjasama Antar Koperasi',
    description: 'Koperasi melayani anggota secara efektif dan memperkuat gerakan koperasi.',
    icon: 'Handshake',
  },
  {
    number: 7,
    title: 'Kepedulian Terhadap Komunitas',
    description: 'Koperasi bekerja demi pembangunan berkelanjutan bagi komunitas.',
    icon: 'Heart',
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
    color: '#008F3D',
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
    { label: 'Nilai Transaksi', value: 2000, suffix: ' Triliun', icon: 'TrendingUp' },
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
    revenue: '€20 Miliar',
    workers: 81000,
    description: 'Koperasi terbesar di dunia yang menjadi inspirasi KNMP',
  },
};

// =====================
// Extended Team Structure - Updated (No Gugun Gunara)
// =====================

export const TEAM_STRUCTURE = {
  pengurus: [
    { id: 'p1', name: 'Prof. Wirono, S.E., M.Pd', position: 'Presiden / Ketua Umum (Bakornas)', photo: '/images/people/ketua.jpg', termStart: '2026', termEnd: '2029', bio: 'Pimpinan Tertinggi Eksekutif KNMP, Ketua Umum Koperasi Periode 2026–2029' },
    { id: 'p2', name: 'Drs. H. Arif Rachman Hakim, M.M.', position: 'Wakil Presiden / Wakil Ketua Umum', photo: '/images/people/waketum.jpg', termStart: '2026', termEnd: '2029', bio: 'Wakil Pimpinan Eksekutif & CEO JE-P3, Diplomat Utama 195 Negara' },
    { id: 'p3', name: 'Dr. Cecep Sumarno', position: 'Sekretaris Jenderal (Sekjen)', photo: '/images/people/sekjen.jpg', termStart: '2026', termEnd: '2029', bio: 'Kepala Administrasi & Legal Koperasi' },
    { id: 'p4', name: 'Tn. H. Gugun Gunara', position: 'Wakil Sekretaris Jenderal (Wasekjen)', photo: '/images/people/wasekjen.jpg', termStart: '2026', termEnd: '2029', bio: 'COO, Arsitek Strategi & Ekosistem Digital KNMP' },
    { id: 'p5', name: 'Fawwaz Arif Al Jabar, S.E., M.M.', position: 'Ketua Dewan Penasihat', photo: '/images/people/penasihat1.jpg', termStart: '2026', termEnd: '2029', bio: 'Chief Financial Advisor KNMP, Arsitek Sistem Keuangan & ESG' },
  ],
  pengawas: [
    { id: 'pw1', name: 'Prof. Dr. Teddy Mantoro, MSC., PHD., SMIEEE', position: 'Ketua Dewan Pengawas', photo: '/images/people/pengawas1.jpg', termStart: '2026', termEnd: '2029', bio: 'Ketua Pengawas Independen KNMP, Ahli Teknologi & Tata Kelola Digital' },
    { id: 'pw2', name: 'Prof. Dr. Elan Masbulan', position: 'Wakil Ketua Pengawas', photo: '/images/people/pengawas2.jpg', termStart: '2026', termEnd: '2029', bio: 'Pakar Pendidikan & Tata Kelola' },
    { id: 'pw3', name: 'Dr. Habib', position: 'Sekretaris Pengawas', photo: '/images/people/pengawas3.jpg', termStart: '2026', termEnd: '2029', bio: 'Pengawas Internal KNMP, Ahli Ketahanan Pangan Nasional' },
  ],
  dewanPenasihat: [
    { id: 'dp1', name: 'Dr. A. Iskandar Zulkarnain', position: 'Ketua Dewan Penasihat Kehormatan', photo: '/images/people/penasihat1.jpg', termStart: '2026', termEnd: '2029', bio: 'Finansial & ESG, GRCP, CIB, RIFA, WCW' },
    { id: 'dp2', name: 'Dr. Heri Solahudin', position: 'Anggota Penasihat Bidang Hukum', photo: '/images/people/penasihat2.jpg', termStart: '2026', termEnd: '2029', bio: '46 Pakar Lintas Bidang' },
  ],
  dewanPembina: [
    { id: 'dpm1', name: 'Dr. (H.C.) Ir. H. Suharso Monoarfa', position: 'Ketua Dewan Pembina', photo: '/images/people/pembina.jpg', termStart: '2026', termEnd: 'Seumur Hidup', bio: 'Pendiri ke-3 | Permanen' },
    { id: 'dpm2', name: 'Dr. H. Anwar Sanusi, SH, S.Pel, MM.', position: 'Wakil Ketua Pembina', photo: '/images/people/pembina2.jpg', termStart: '2026', termEnd: '2029', bio: 'Representasi Pemerintah' },
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
// Struktur Pimpinan KNMP
// =====================

export const PIMPINAN_LEVELS = [
  {
    id: 'kornas',
    name: 'Koordinator Nasional',
    shortName: 'Kornas',
    title: 'Presiden',
    description: 'Pimpinan tertinggi KNMP yang bertanggung jawab atas strategi nasional dan koordinasi seluruh wilayah Indonesia',
    icon: 'Crown',
    color: '#8B0000',
    href: '/pimpinan/kornas',
    totalPositions: 1,
    responsibilities: [
      'Menetapkan kebijakan strategis nasional',
      'Mengkoordinasikan seluruh Panglima Wilayah',
      'Mewakili KNMP dalam forum nasional dan internasional',
      'Mengesahkan keputusan Rapat Anggota Tahunan',
      'Memimpin Dewan Pimpinan Nasional',
    ],
    stats: [
      { label: 'Wilayah', value: 38, suffix: ' Provinsi' },
      { label: 'Anggota', value: 5000000, suffix: '+' },
      { label: 'Target', value: 2030, suffix: '' },
    ],
  },
  {
    id: 'korwil',
    name: 'Koordinator Wilayah',
    shortName: 'Korwil',
    title: 'Panglima Wilayah',
    description: 'Pimpinan tingkat provinsi yang mengkoordinasikan seluruh aktivitas KNMP di wilayahnya',
    icon: 'Map',
    color: '#008F3D',
    href: '/pimpinan/korwil',
    totalPositions: 38,
    responsibilities: [
      'Mengkoordinasikan seluruh Panglima Distrik di provinsi',
      'Menjalankan kebijakan nasional di tingkat provinsi',
      'Mengembangkan kemitraan regional',
      'Memantau kinerja Koordinator Daerah',
      'Membuat laporan berkala ke Kornas',
    ],
    stats: [
      { label: 'Provinsi', value: 38, suffix: '' },
      { label: 'Kab/Kota', value: 514, suffix: '' },
      { label: 'Target', value: 2030, suffix: '' },
    ],
  },
  {
    id: 'korda',
    name: 'Koordinator Daerah',
    shortName: 'Korda',
    title: 'Panglima Distrik',
    description: 'Pimpinan tingkat kabupaten/kota yang mengelola operasional KNMP di daerahnya',
    icon: 'Building',
    color: '#3b82f6',
    href: '/pimpinan/korda',
    totalPositions: 514,
    responsibilities: [
      'Mengkoordinasikan seluruh Panglima Sektor di kabupaten/kota',
      'Mengelola keanggotaan dan perekrutan anggota baru',
      'Mengembangkan unit usaha lokal',
      'Memantau kinerja Koordinator Kecamatan',
      'Menyelenggarakan rapat daerah',
    ],
    stats: [
      { label: 'Kab/Kota', value: 514, suffix: '' },
      { label: 'Kecamatan', value: 7252, suffix: '' },
      { label: 'Target', value: 2028, suffix: '' },
    ],
  },
  {
    id: 'korcam',
    name: 'Koordinator Kecamatan',
    shortName: 'Korcam',
    title: 'Panglima Sektor',
    description: 'Pimpinan tingkat kecamatan yang mengkoordinasikan aktivitas KNMP di kecamatannya',
    icon: 'MapPin',
    color: '#f59e0b',
    href: '/pimpinan/korcam',
    totalPositions: 7252,
    responsibilities: [
      'Mengkoordinasikan seluruh Komandan Lapangan di kecamatan',
      'Mengelola marketplace dan logistik tingkat kecamatan',
      'Mengembangkan komoditas unggulan lokal',
      'Memantau kinerja Koordinator Desa',
      'Membina hubungan dengan pemerintah kecamatan',
    ],
    stats: [
      { label: 'Kecamatan', value: 7252, suffix: '' },
      { label: 'Desa/Kel', value: 83763, suffix: '' },
      { label: 'Target', value: 2027, suffix: '' },
    ],
  },
  {
    id: 'kordes',
    name: 'Koordinator Desa/Kelurahan',
    shortName: 'Kordes',
    title: 'Komandan Lapangan',
    description: 'Pimpinan tingkat desa/kelurahan yang mengelola operasional harian KNMP di desanya',
    icon: 'Home',
    color: '#8b5cf6',
    href: '/pimpinan/kordes',
    totalPositions: 83763,
    responsibilities: [
      'Mengelola keanggotaan desa',
      'Mengkoordinasikan produksi dan distribusi komoditas',
      'Mengelola agen logistik desa',
      'Membina kelompok tani dan UMKM lokal',
      'Menghubungkan desa dengan marketplace KNMP',
    ],
    stats: [
      { label: 'Desa/Kel', value: 83763, suffix: '' },
      { label: 'Target', value: 2026, suffix: '' },
      { label: 'Aktif', value: 1000, suffix: ' Desa' },
    ],
  },
];

// =====================
// Struktur Organisasi Lengkap - Posisi Kosong untuk Backend
// =====================

// Tipe posisi untuk struktur organisasi
export interface PositionSlot {
  id: string;
  position: string;
  name: string; // Kosong = '(Posisi Kosong)'
  status: 'vacant' | 'filled' | 'pending';
  province?: string;
  kabKota?: string;
  kecamatan?: string;
  desa?: string;
  email?: string;
  phone?: string;
  joinDate?: string;
  termEnd?: string;
}

// =====================
// KORNAS - Struktur Nasional (1 Presiden)
// =====================
export const KORNAS_STRUCTURE = {
  level: 'Kornas',
  title: 'Presiden / Ketua Umum (Bakornas)',
  totalPositions: 1,
  filledPositions: 1,
  structure: [
    // Dewan Pendiri (17 Anggota) - Urutan Sesuai DEWAN_PENDIRI
    {
      category: 'Dewan Pendiri',
      positions: [
        { id: 'dp-1', position: 'Pendiri ke-1 - Wakil Presiden / CEO JE-P3', name: 'H. Arif Rachman Hakim, M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-2', position: 'Pendiri ke-2 - Presiden / Ketua Umum (Bakornas)', name: 'Prof. Wirono, S.E., M.Pd', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-3', position: 'Pendiri ke-3 - Ketua Dewan Pengawas', name: 'Prof. Dr. Teddy Mantoro, MSC., PHD., SMIEEE', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-4', position: 'Pendiri ke-4 - Anggota Dewan Pengawas', name: 'Dr. Habib', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-5', position: 'Pendiri ke-5 - Ketua Bidang Keamanan Siber', name: 'Komjen. Pol. (Purn.) Dr. Dharma Pongrekun', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-6', position: 'Pendiri ke-6 - Dewan Penasihat Pertahanan', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'dp-7', position: 'Pendiri ke-7 - Grand Architect & COO', name: 'Tn. H. Gugun Gunara, S.E., M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-8', position: 'Pendiri ke-8 - Sekretaris Jenderal', name: 'Dr. Cecep Sumarno', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-9', position: 'Pendiri ke-9 - Korwil Kalimantan', name: 'Andi Darmadji, S.E.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-10', position: 'Pendiri ke-10 - Ketua Bidang Organisasi & Keanggotaan', name: 'Hj. Inna Hadianala, S.E.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-11', position: 'Pendiri ke-11 - Ketua Bidang Keuangan & Perbankan', name: 'Fawwaz Arif Al Jabar, S.E., M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-12', position: 'Pendiri ke-12 - Koordinator Bidang Kemitraan Strategis', name: 'H. Mugi Prasetyo, S.E.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-13', position: 'Pendiri ke-13 - Koordinator Bidang Pariwisata', name: 'Dr. N. Rusmiati, M.Si., M.H.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-14', position: 'Pendiri ke-14 - Koordinator Bidang Pengembangan SDM', name: 'Hj. Fani Anggraeni, S.E.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-15', position: 'Pendiri ke-15 - Koordinator Bidang Infrastruktur Digital', name: 'Ir. Endro Wuryanto, M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-16', position: 'Pendiri ke-16 - Wakil Ketua Dewan Pembina', name: 'Prof. Dr. H. Anwar Sanusi, SH, S.Pel, MM', status: 'filled' as const, termEnd: '2029' },
        { id: 'dp-17', position: 'Pendiri ke-17', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
    // Dewan Pembina
    {
      category: 'Dewan Pembina',
      positions: [
        { id: 'dpm-1', position: 'Ketua Dewan Pembina', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'dpm-2', position: 'Wakil Ketua Pembina', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'dpm-3', position: 'Sekretaris Pembina', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'dpm-4', position: 'Anggota Pembina Bidang Pemerintahan', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'dpm-5', position: 'Anggota Pembina Bidang Ekonomi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'dpm-6', position: 'Anggota Pembina Bidang Sosial', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
    // Pengurus Harian Nasional
    {
      category: 'Pengurus Harian Nasional (Bakornas)',
      positions: [
        { id: 'phn-1', position: 'Presiden / Ketua Umum', name: 'Prof. Wirono, S.E., M.Pd', status: 'filled' as const, termEnd: '2029' },
        { id: 'phn-2', position: 'Wakil Presiden / Wakil Ketua Umum', name: 'Drs. H. Arif Rachman Hakim, M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'phn-3', position: 'Sekretaris Jenderal (Sekjen)', name: 'Dr. Cecep Sumarno', status: 'filled' as const, termEnd: '2029' },
        { id: 'phn-4', position: 'Wakil Sekretaris Jenderal (Wasekjen)', name: 'Tn. H. Gugun Gunara', status: 'filled' as const, termEnd: '2045' },
        { id: 'phn-5', position: 'Bendahara Umum / CFO', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'phn-6', position: 'Wakil Bendahara', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
    // Dewan Pengawas
    {
      category: 'Dewan Pengawas',
      positions: [
        { id: 'pw-1', position: 'Ketua Dewan Pengawas', name: 'Prof. Dr. Teddy Mantoro, MSC., PHD., SMIEEE', status: 'filled' as const, termEnd: '2029' },
        { id: 'pw-2', position: 'Wakil Ketua Pengawas', name: 'Prof. Dr. Elan Masbulan', status: 'filled' as const, termEnd: '2029' },
        { id: 'pw-3', position: 'Sekretaris Pengawas', name: 'Dr. Habib', status: 'filled' as const, termEnd: '2029' },
        { id: 'pw-4', position: 'Anggota Pengawas Bidang Keuangan', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pw-5', position: 'Anggota Pengawas Bidang Operasional', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pw-6', position: 'Anggota Pengawas Bidang Organisasi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
    // Dewan Penasihat
    {
      category: 'Dewan Penasihat',
      positions: [
        { id: 'pn-1', position: 'Ketua Dewan Penasihat', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pn-2', position: 'Ketua Dewan Penasihat Kehormatan', name: 'Dr. A. Iskandar Zulkarnain', status: 'filled' as const, termEnd: '2029' },
        { id: 'pn-3', position: 'Wakil Ketua Penasihat', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pn-4', position: 'Sekretaris Penasihat', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pn-5', position: 'Anggota Penasihat Bidang Hukum', name: 'Dr. Heri Solahudin', status: 'filled' as const, termEnd: '2029' },
        { id: 'pn-6', position: 'Anggota Penasihat Bidang Ekonomi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pn-7', position: 'Anggota Penasihat Bidang Teknologi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'pn-8', position: 'Anggota Penasihat Bidang Pertanian', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
    // Koordinator 17 Bidang
    {
      category: 'Koordinator Bidang (17 Bidang)',
      positions: [
        { id: 'kb-1', position: 'Bidang Organisasi & Keanggotaan', name: 'Hj. Inna Hadianala, S.E.', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-2', position: 'Bidang Pangan & Ketahanan Pangan', name: 'Dr. Habib', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-3', position: 'Bidang Industri & Manufaktur', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-4', position: 'Bidang Logistik & Distribusi', name: 'M. Ilham', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-5', position: 'Bidang Kesehatan & Farmasi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-6', position: 'Bidang Keuangan & Perbankan', name: 'Fawwaz Arif Al Jabar, S.E., M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-7', position: 'Bidang Investasi & ESG', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-8', position: 'Bidang Bisnis Kemitraan & UMKM', name: 'Ongky Putra', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-9', position: 'Bidang Digital & Teknologi', name: 'M. Sidik', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-10', position: 'Bidang Holding Trading Ekosistem', name: 'Tn. H. Gugun Gunara, S.E., M.M.', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-11', position: 'Bidang Wisata, Umroh & Haji', name: 'Dr. Cecep Sumarno', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-12', position: 'Bidang Hukum & Advokasi', name: 'Tegar Ramadhan, SH', status: 'filled' as const, termEnd: '2029' },
        { id: 'kb-13', position: 'Bidang Pengembangan SDM & Diklat', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-14', position: 'Bidang Ekspor Impor & Perdagangan Internasional', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-15', position: 'Bidang Hubungan Masyarakat & Media', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-16', position: 'Bidang Teknologi & Inovasi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'kb-17', position: 'Bidang Kemitraan Internasional', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
    // Sekretaris Masing-masing Bidang
    {
      category: 'Sekretaris Koordinator Bidang',
      positions: [
        { id: 'sk-1', position: 'Sekretaris Bidang Organisasi & Keanggotaan', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-2', position: 'Sekretaris Bidang Pangan & Ketahanan Pangan', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-3', position: 'Sekretaris Bidang Industri & Manufaktur', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-4', position: 'Sekretaris Bidang Logistik & Distribusi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-5', position: 'Sekretaris Bidang Kesehatan & Farmasi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-6', position: 'Sekretaris Bidang Keuangan & Perbankan', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-7', position: 'Sekretaris Bidang Investasi & ESG', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-8', position: 'Sekretaris Bidang Bisnis Kemitraan & UMKM', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-9', position: 'Sekretaris Bidang Digital & Teknologi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-10', position: 'Sekretaris Bidang Holding Trading Ekosistem', name: 'Cecep Abdul Jabbar', status: 'filled' as const, termEnd: '2029' },
        { id: 'sk-11', position: 'Sekretaris Bidang Wisata, Umroh & Haji', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-12', position: 'Sekretaris Bidang Hukum & Advokasi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-13', position: 'Sekretaris Bidang Pengembangan SDM & Diklat', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-14', position: 'Sekretaris Bidang Ekspor Impor', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-15', position: 'Sekretaris Bidang Hubungan Masyarakat & Media', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-16', position: 'Sekretaris Bidang Teknologi & Inovasi', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
        { id: 'sk-17', position: 'Sekretaris Bidang Kemitraan Internasional', name: 'Dalam Proses Pengesahan', status: 'pending' as const },
      ]
    },
  ]
};

// =====================
// KORWIL - Struktur Provinsi (38 Panglima Wilayah)
// =====================
export const KORWIL_STRUCTURE = {
  level: 'Korwil',
  title: 'Panglima Wilayah',
  totalPositions: 38,
  filledPositions: 5,
  provinces: [
    // Jawa
    { id: 'korwil-1', province: 'DKI Jakarta', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-2', province: 'Jawa Barat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-3', province: 'Jawa Tengah', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-4', province: 'Jawa Timur', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-5', province: 'DI Yogyakarta', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-6', province: 'Banten', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    // Sumatera
    { id: 'korwil-7', province: 'Aceh', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-8', province: 'Sumatera Utara', panglima: 'Erick Hariadi', status: 'filled' as const },
    { id: 'korwil-9', province: 'Sumatera Barat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-10', province: 'Riau', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-11', province: 'Kepulauan Riau', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-12', province: 'Jambi', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-13', province: 'Bengkulu', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-14', province: 'Sumatera Selatan', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-15', province: 'Bangka Belitung', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-16', province: 'Lampung', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    // Kalimantan
    { id: 'korwil-17', province: 'Kalimantan Barat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-18', province: 'Kalimantan Tengah', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-19', province: 'Kalimantan Selatan', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-20', province: 'Kalimantan Timur', panglima: 'Andi Darmadji, S.E.', status: 'filled' as const },
    { id: 'korwil-21', province: 'Kalimantan Utara', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    // Sulawesi & Maluku
    { id: 'korwil-22', province: 'Sulawesi Utara', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-23', province: 'Sulawesi Tengah', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-24', province: 'Sulawesi Selatan', panglima: 'Imam Fauzan', status: 'filled' as const },
    { id: 'korwil-25', province: 'Sulawesi Tenggara', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-26', province: 'Gorontalo', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-27', province: 'Sulawesi Barat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-28', province: 'Maluku', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-29', province: 'Maluku Utara', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    // Nusa Tenggara
    { id: 'korwil-30', province: 'Bali', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-31', province: 'Nusa Tenggara Barat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-32', province: 'Nusa Tenggara Timur', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    // Papua
    { id: 'korwil-33', province: 'Papua', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-34', province: 'Papua Barat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-35', province: 'Papua Selatan', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-36', province: 'Papua Tengah', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-37', province: 'Papua Pegunungan', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korwil-38', province: 'Papua Barat Daya', panglima: '(Posisi Kosong)', status: 'vacant' as const },
  ],
  // Struktur per Korwil
  structure: [
    { position: 'Panglima Wilayah', total: 38, filled: 5 },
    { position: 'Wakil Panglima Wilayah', total: 38, filled: 0 },
    { position: 'Sekretaris Wilayah', total: 38, filled: 0 },
    { position: 'Bendahara Wilayah', total: 38, filled: 0 },
    { position: 'Koordinator Bidang (15 per wilayah)', total: 570, filled: 0 },
    { position: 'Staff Administrasi', total: 38, filled: 0 },
  ]
};

// =====================
// KORDA - Struktur Kabupaten/Kota (514 Panglima Distrik)
// =====================
export const KORDA_STRUCTURE = {
  level: 'Korda',
  title: 'Panglima Distrik',
  totalPositions: 514,
  filledPositions: 0,
  structure: [
    { position: 'Panglima Distrik', total: 514, filled: 0 },
    { position: 'Wakil Panglima Distrik', total: 514, filled: 0 },
    { position: 'Sekretaris Distrik', total: 514, filled: 0 },
    { position: 'Bendahara Distrik', total: 514, filled: 0 },
    { position: 'Koordinator Sektor (Korcam)', total: 7252, filled: 0 },
    { position: 'Staff Administrasi', total: 514, filled: 0 },
  ],
  sampleDistricts: [
    { id: 'korda-jkt-1', kabKota: 'Kota Jakarta Selatan', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korda-jkt-2', kabKota: 'Kota Jakarta Pusat', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korda-jbr-1', kabKota: 'Kab. Bandung', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korda-jbr-2', kabKota: 'Kab. Bogor', panglima: '(Posisi Kosong)', status: 'vacant' as const },
    { id: 'korda-jtg-1', kabKota: 'Kab. Semarang', panglima: '(Posisi Kosong)', status: 'vacant' as const },
  ]
};

// =====================
// KORCAM - Struktur Kecamatan (7.252 Panglima Sektor)
// =====================
export const KORCAM_STRUCTURE = {
  level: 'Korcam',
  title: 'Panglima Sektor',
  totalPositions: 7252,
  filledPositions: 0,
  structure: [
    { position: 'Panglima Sektor', total: 7252, filled: 0 },
    { position: 'Wakil Panglima Sektor', total: 7252, filled: 0 },
    { position: 'Sekretaris Sektor', total: 7252, filled: 0 },
    { position: 'Bendahara Sektor', total: 7252, filled: 0 },
    { position: 'Koordinator Desa (Kordes)', total: 83763, filled: 1000 },
    { position: 'Staff Administrasi', total: 7252, filled: 0 },
  ]
};

// =====================
// KORDES - Struktur Desa/Kelurahan (83.763 Komandan Lapangan)
// =====================
export const KORDES_STRUCTURE = {
  level: 'Kordes',
  title: 'Komandan Lapangan',
  totalPositions: 83763,
  filledPositions: 1000,
  structure: [
    { position: 'Komandan Lapangan', total: 83763, filled: 1000 },
    { position: 'Wakil Komandan Lapangan', total: 83763, filled: 0 },
    { position: 'Sekretaris Desa', total: 83763, filled: 0 },
    { position: 'Bendahara Desa', total: 83763, filled: 0 },
    { position: 'Koordinator RT/RW', total: 83763, filled: 0 },
    { position: 'Agen Logistik KNMP', total: 83763, filled: 45230 },
    { position: 'Kader Pemberdayaan', total: 83763, filled: 0 },
  ]
};

// =====================
// Dewan Pendiri Lengkap (17 Anggota)
// =====================
export const DEWAN_PENDIRI_LENGKAP = [
  { id: 'pendiri-1', name: 'H. Arif Rachman Hakim, M.M.', position: 'Pendiri ke-1 - Wakil Presiden / CEO JE-P3', role: 'Wakil Presiden / Wakil Ketua Umum, CEO JE-P3 & Diplomat Utama 195 Negara', status: 'filled' as const },
  { id: 'pendiri-2', name: 'Prof. Wirono, S.E., M.Pd', position: 'Pendiri ke-2 - Presiden / Ketua Umum (Bakornas)', role: 'Presiden / Ketua Umum (Bakornas), Pimpinan Tertinggi Eksekutif KMNMP', status: 'filled' as const },
  { id: 'pendiri-3', name: 'Prof. Dr. Tedy Mantoro', position: 'Pendiri ke-3 - Ketua Dewan Pengawas', role: 'Ketua Dewan Pengawas, Ahli Tata Kelola Digital & CTO Advisor', status: 'filled' as const },
  { id: 'pendiri-4', name: 'Dr. Habib', position: 'Pendiri ke-4 - Anggota Dewan Pengawas', role: 'Anggota Dewan Pengawas, Ahli Ketahanan Pangan Nasional', status: 'filled' as const },
  { id: 'pendiri-5', name: 'Komjen. Pol. (Purn.) Dr. Dharma Pongrekun', position: 'Pendiri ke-5 - Ketua Bidang Keamanan Siber', role: 'Ketua Bidang Keamanan Siber & Kedaulatan Digital, Mantan Wakil Kepala BSSN', status: 'filled' as const },
  { id: 'pendiri-6', name: '', position: 'Pendiri ke-6 - Dewan Penasihat Pertahanan', role: '(Posisi Kosong)', status: 'vacant' as const },
  { id: 'pendiri-7', name: 'Tn. H. Gugun Gunara, S.E., M.M.', position: 'Pendiri ke-7 - Grand Architect & COO', role: 'Grand Architect & COO, Arsitek Ekosistem Digital KMNMP', status: 'filled' as const },
  { id: 'pendiri-8', name: 'Dr. Cecep Sumarno', position: 'Pendiri ke-8 - Sekretaris Jenderal', role: 'Sekretaris Jenderal, Kepala Administrasi & Legal Koperasi', status: 'filled' as const },
  { id: 'pendiri-9', name: 'Andi Darmadji, S.E.', position: 'Pendiri ke-9 - Korwil Kalimantan', role: 'Panglima Wilayah Kalimantan (Bakorwil), Pilar Ekspansi Kawasan Timur & IKN', status: 'filled' as const },
  { id: 'pendiri-10', name: 'Hj. Inna Hadianala, S.E.', position: 'Pendiri ke-10 - Ketua Bidang Organisasi & Keanggotaan', role: 'Ketua Bidang Organisasi & Keanggotaan', status: 'filled' as const },
  { id: 'pendiri-11', name: 'Fawwaz Arif Al Jabar, S.E., M.M.', position: 'Pendiri ke-11 - Ketua Bidang Keuangan & Perbankan', role: 'Ketua Bidang Keuangan & Perbankan, CFO & Chief Financial Advisor', status: 'filled' as const },
  { id: 'pendiri-12', name: 'H. Mugi Prasetyo, S.E.', position: 'Pendiri ke-12 - Koordinator Bidang Kemitraan Strategis', role: 'Koordinator Bidang Kemitraan Strategis', status: 'filled' as const },
  { id: 'pendiri-13', name: 'Dr. N. Rusmiati, M.Si., M.H.', position: 'Pendiri ke-13 - Koordinator Bidang Pariwisata', role: 'Ketua Umum DPP ASITA, Koordinator Bidang Pariwisata', status: 'filled' as const },
  { id: 'pendiri-14', name: 'Hj. Fani Anggraeni, S.E.', position: 'Pendiri ke-14 - Koordinator Bidang Pengembangan SDM', role: 'Koordinator Bidang Pengembangan SDM', status: 'filled' as const },
  { id: 'pendiri-15', name: 'Ir. Endro Wuryanto, M.M.', position: 'Pendiri ke-15 - Koordinator Bidang Infrastruktur Digital', role: 'Koordinator Bidang Infrastruktur Digital', status: 'filled' as const },
  { id: 'pendiri-16', name: 'Tegar Ramadhan, S.Kom.', position: 'Pendiri ke-16 - Koordinator Bidang Teknologi & Inovasi', role: 'Koordinator Bidang Teknologi & Inovasi', status: 'filled' as const },
  { id: 'pendiri-17', name: '', position: 'Pendiri ke-17', role: '(Belum ditentukan)', status: 'vacant' as const },
];
