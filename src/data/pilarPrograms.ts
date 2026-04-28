// ─── 9 Pilar Kampung Programs Data ──────────────────────────────────────────────
// Complete program data for all 9 Pilars with Klaster/Domain organization
// and interlink connections between pilars
// Updated to new Adikara naming convention

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface Program {
  id: string
  number: number
  title: string
  description: string
  interlinks?: number[] // pilar numbers this program connects to
}

export interface Klaster {
  id: string
  number: number
  title: string
  emoji: string
  programs: Program[]
}

export interface PilarPrograms {
  number: number
  title: string
  adhikara: string
  icon: string // lucide icon name
  color: string
  secondaryColor: string
  klasterLabel: string // 'Klaster' or 'Domain'
  klasterGroups: Klaster[]
}

export type InterlinkType = 'resource' | 'capital' | 'data' | 'goods' | 'services'

export interface InterlinkConnection {
  from: number
  to: number
  type: InterlinkType
  label: string
}

// ─── Color Mapping by Interlink Type ────────────────────────────────────────────

export const INTERLINK_COLORS: Record<InterlinkType, string> = {
  resource: '#008F3D',  // Green - bahan mentah, energi
  capital: '#D4AF37',   // Gold - uang, investasi
  data: '#3b82f6',      // Blue - informasi, teknologi
  goods: '#8B0000',     // Dark Red - produk jadi
  services: '#7c3aed',  // Purple - layanan, SDM
}

export const INTERLINK_LABELS: Record<InterlinkType, string> = {
  resource: 'Aliran Sumber Daya',
  capital: 'Aliran Modal',
  data: 'Aliran Data & Teknologi',
  goods: 'Aliran Barang/Jasa',
  services: 'Aliran Layanan',
}

// ─── All 9 Pilar Program Data ───────────────────────────────────────────────────

export const PILAR_PROGRAMS: PilarPrograms[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 1: Kampung Modal (Adhikara Artha) - 20 programs in 5 Klaster
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 1,
    title: 'Kampung Modal',
    adhikara: 'Adhikara Artha',
    icon: 'Scale',
    color: '#f59e0b',
    secondaryColor: '#FBBF24',
    klasterLabel: 'Klaster',
    klasterGroups: [
      {
        id: 'p1-k1', number: 1, title: 'Fondasi Transaksi & Akumulasi', emoji: '💰',
        programs: [
          { id: 'p1-1', number: 1, title: 'NusaPay', description: 'Sistem Saraf Pembayaran Ekosistem', interlinks: [6, 9] },
          { id: 'p1-2', number: 2, title: 'Simpanan Syariah Terintegrasi', description: 'Tabungan komunitas berbasis syariah', interlinks: [7] },
          { id: 'p1-3', number: 3, title: 'Smart Contract Escrow Service', description: 'Rekening bersama B2B berbasis smart contract', interlinks: [6, 9] },
          { id: 'p1-4', number: 4, title: 'Tabungan Pendidikan Cerdas (Edu-Save)', description: 'Tabungan pendidikan untuk generasi desa', interlinks: [5] },
        ],
      },
      {
        id: 'p1-k2', number: 2, title: 'Injeksi Kapital Mikro & Menengah', emoji: '🚀',
        programs: [
          { id: 'p1-5', number: 5, title: 'Fasilitasi KUR Presisi', description: 'Kredit Usaha Rakyat berbasis data', interlinks: [2, 3] },
          { id: 'p1-6', number: 6, title: 'Dana Bergulir Qardhul Hasan Revolving (QRV)', description: 'Dana bergulir untuk pemberdayaan', interlinks: [2, 8] },
          { id: 'p1-7', number: 7, title: 'Pembiayaan Rantai Pasok (Supply Chain/Invoice Financing)', description: 'Pembiayaan arus kas', interlinks: [2, 6] },
          { id: 'p1-8', number: 8, title: 'KPR-P Kredit Pemilikan Rumah Produktif', description: 'Kredit rumah yang menghasilkan pendapatan', interlinks: [9] },
        ],
      },
      {
        id: 'p1-k3', number: 3, title: 'Investasi Komunitas & Skala Global', emoji: '🌍',
        programs: [
          { id: 'p1-9', number: 9, title: 'Platform Crowdfunding (Urun Dana Desa)', description: 'Crowdfunding proyek desa', interlinks: [2, 3] },
          { id: 'p1-10', number: 10, title: 'Bursa Saham Desa (Micro-Secondary Market)', description: 'Perdagangan sekunder kepemilikan usaha', interlinks: [7, 9] },
          { id: 'p1-11', number: 11, title: 'NB Investor Network (Skala Ventura)', description: 'Jaringan investor strategis', interlinks: [2, 9] },
          { id: 'p1-12', number: 12, title: 'Capital Matching & Export Trade Finance', description: 'Pencocokan modal & pembiayaan ekspor', interlinks: [6, 9] },
        ],
      },
      {
        id: 'p1-k4', number: 4, title: 'Keuangan Hijau & Teknologi', emoji: '⚡',
        programs: [
          { id: 'p1-13', number: 13, title: 'Pembiayaan Alsintan & IoT Farming (Leasing Teknologi)', description: 'Leasing alat pertanian & IoT', interlinks: [2, 3, 7] },
          { id: 'p1-14', number: 14, title: 'Green Financing (Pembiayaan Transisi Energi & Daur Ulang)', description: 'Pembiayaan hijau', interlinks: [2, 8] },
          { id: 'p1-15', number: 15, title: 'Tokenisasi Aset Desa (Real-World Asset Tokenization)', description: 'Tokenisasi aset desa', interlinks: [7, 9] },
          { id: 'p1-16', number: 16, title: 'Dana Abadi Desa (Sovereign Wealth Fund Desa)', description: 'SWF desa untuk keberlanjutan', interlinks: [1] },
        ],
      },
      {
        id: 'p1-k5', number: 5, title: 'Proteksi, Kesejahteraan & Filantropi', emoji: '🛡️',
        programs: [
          { id: 'p1-17', number: 17, title: 'Pinjaman Antar Anggota (Qardhul Hasan P2P)', description: 'Pinjaman peer-to-peer syariah', interlinks: [8, 9] },
          { id: 'p1-18', number: 18, title: 'Asuransi Mikro Syariah (Takaful & Perlindungan Gagal Panen)', description: 'Asuransi mikro komunitas', interlinks: [3, 4] },
          { id: 'p1-19', number: 19, title: 'Wakaf TunAI (Cash Waqf Intergenerasional)', description: 'Wakaf tunai antargenerasi', interlinks: [4, 9] },
          { id: 'p1-20', number: 20, title: 'Program Dana Pensiun Desa (DPLK Koperasi)', description: 'Dana pensiun desa', interlinks: [4] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 2: Kampung Industri (Adhikara Krada) - 20 programs in 5 Klaster
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 2,
    title: 'Kampung Industri',
    adhikara: 'Adhikara Krada',
    icon: 'Warehouse',
    color: '#8B0000',
    secondaryColor: '#DC143C',
    klasterLabel: 'Klaster',
    klasterGroups: [
      {
        id: 'p2-k1', number: 1, title: 'Hilirisasi Agro & Pangan', emoji: '🏭',
        programs: [
          { id: 'p2-1', number: 1, title: 'Pabrik Mini Kopi & Cokelat Premium', description: 'Pabrik mini pengolahan kopi & cokelat premium skala desa', interlinks: [3, 9] },
          { id: 'p2-2', number: 2, title: 'Dapur Terpusat HACCP', description: 'Dapur terpusat dengan standar HACCP', interlinks: [3, 4] },
          { id: 'p2-3', number: 3, title: 'Pusat Ekstraksi Herbal & Jamu Modern', description: 'Pusat ekstraksi herbal dan jamu modern', interlinks: [3, 4] },
          { id: 'p2-4', number: 4, title: 'Pabrik Bio-Kemasan Ramah Lingkungan', description: 'Pabrik bio-kemasan ramah lingkungan', interlinks: [3, 8] },
        ],
      },
      {
        id: 'p2-k2', number: 2, title: 'Kriya, Fashion & Manufaktur Ringan', emoji: '🧵',
        programs: [
          { id: 'p2-5', number: 5, title: 'Manufaktur Garmen & Tekstil Presisi', description: 'Manufaktur garmen dan tekstil presisi', interlinks: [9] },
          { id: 'p2-6', number: 6, title: 'Lab Kriya & Desain Kontemporer', description: 'Lab kriya dan desain kontemporer', interlinks: [7, 9] },
          { id: 'p2-7', number: 7, title: 'Sentra Kulit & Sepatu Skala Desa', description: 'Sentra kulit dan sepatu skala desa', interlinks: [9] },
          { id: 'p2-8', number: 8, title: 'Fasilitas Produksi Kosmetik Organik', description: 'Fasilitas produksi kosmetik organik', interlinks: [3, 4, 8] },
        ],
      },
      {
        id: 'p2-k3', number: 3, title: 'Teknologi Masa Depan', emoji: '⚡',
        programs: [
          { id: 'p2-9', number: 9, title: 'Fasilitas Perakitan Elektronik Terdistribusi', description: 'Perakitan elektronik terdistribusi', interlinks: [7] },
          { id: 'p2-10', number: 10, title: 'Studio Produksi Konten & Animasi Digital', description: 'Studio produksi konten & animasi digital', interlinks: [7, 9] },
          { id: 'p2-11', number: 11, title: 'Pabrik Komponen Alsintan Desa', description: 'Pabrik komponen alsintan desa', interlinks: [1, 3] },
          { id: 'p2-12', number: 12, title: 'Pusat Daur Ulang & Upcycling Premium', description: 'Pusat daur ulang dan upcycling premium', interlinks: [6, 8] },
        ],
      },
      {
        id: 'p2-k4', number: 4, title: 'Skalabilitas & QC', emoji: '🌐',
        programs: [
          { id: 'p2-13', number: 13, title: 'Program Transisi Mini Factory', description: 'Program transisi mini factory', interlinks: [1, 9] },
          { id: 'p2-14', number: 14, title: 'Export Processing Zone Desa', description: 'Zona pemrosesan ekspor desa', interlinks: [6, 9] },
          { id: 'p2-15', number: 15, title: 'Pusat Kalibrasi & Sertifikasi Mutu Terpadu', description: 'Pusat kalibrasi dan sertifikasi mutu', interlinks: [7, 9] },
          { id: 'p2-16', number: 16, title: 'Lean Manufacturing & Zero Defect Training Center', description: 'Pelatihan lean manufacturing dan zero defect', interlinks: [5, 7] },
        ],
      },
      {
        id: 'p2-k5', number: 5, title: 'Infrastruktur Rantai Pasok', emoji: '🛡️',
        programs: [
          { id: 'p2-17', number: 17, title: 'Marketplace Zonasi B2B Material Sourcing Hub', description: 'Marketplace B2B material sourcing hub', interlinks: [6, 9] },
          { id: 'p2-18', number: 18, title: 'Bank Mesin & Equipment Sharing Pool', description: 'Bank mesin dan equipment sharing pool', interlinks: [1, 6] },
          { id: 'p2-19', number: 19, title: 'Sistem K3 Industri Rumahan', description: 'Sistem K3 industri rumahan', interlinks: [4] },
          { id: 'p2-20', number: 20, title: 'Pencatatan HAKI & Royalti Blockchain', description: 'Pencatatan HAKI dan royalti blockchain', interlinks: [7, 9] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 3: Kampung Pangan (Adhikara Anna) - 25 programs in 5 Domain
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 3,
    title: 'Kampung Pangan',
    adhikara: 'Adhikara Anna',
    icon: 'Wheat',
    color: '#16a34a',
    secondaryColor: '#4ADE80',
    klasterLabel: 'Domain',
    klasterGroups: [
      {
        id: 'p3-d1', number: 1, title: 'Pertanian & Hortikultura', emoji: '🌾',
        programs: [
          { id: 'p3-1', number: 1, title: 'Padi Berdaulat & SRI Presisi', description: 'Program padi berdaulat dengan SRI presisi', interlinks: [2] },
          { id: 'p3-2', number: 2, title: 'Hortikultura Smart Greenhouse', description: 'Hortikultura cerdas smart greenhouse', interlinks: [2, 7] },
          { id: 'p3-3', number: 3, title: 'Sentra Toga Biofarmaka & Herbal Medis', description: 'Sentra toga biofarmaka dan herbal medis', interlinks: [2, 4] },
          { id: 'p3-4', number: 4, title: 'Florikultura & Tanaman Hias Ekspor', description: 'Florikultura dan tanaman hias ekspor', interlinks: [2, 9] },
          { id: 'p3-5', number: 5, title: 'Pertanian Urban & Pekarangan Food Estate Mikro', description: 'Pertanian urban dan pekarangan food estate mikro', interlinks: [8, 9] },
        ],
      },
      {
        id: 'p3-d2', number: 2, title: 'Perkebunan & Agroforestri', emoji: '🌴',
        programs: [
          { id: 'p3-6', number: 6, title: 'Kopi & Kakao Specialty Direct Trade', description: 'Kopi dan kakao specialty direct trade', interlinks: [2, 9] },
          { id: 'p3-7', number: 7, title: 'Rempah Vanili & Minyak Atsiri New Spice Route', description: 'Rempah vanili dan minyak atsiri new spice route', interlinks: [2, 9] },
          { id: 'p3-8', number: 8, title: 'Agroforestri Kelapa & Derivatif Terpadu', description: 'Agroforestri kelapa dan derivatif terpadu', interlinks: [2, 8] },
          { id: 'p3-9', number: 9, title: 'Gula Aren & Pemanis Alami Berkelanjutan', description: 'Gula aren dan pemanis alami berkelanjutan', interlinks: [2, 9] },
          { id: 'p3-10', number: 10, title: 'Karet Damar & Hasil Hutan Bukan Kayu', description: 'Karet damar dan hasil hutan bukan kayu', interlinks: [2, 8] },
        ],
      },
      {
        id: 'p3-d3', number: 3, title: 'Peternakan & Protein Darat', emoji: '🐄',
        programs: [
          { id: 'p3-11', number: 11, title: 'Sentra Sapi Perah & Pedaging Modern', description: 'Sentra sapi perah dan pedaging modern', interlinks: [2, 4] },
          { id: 'p3-12', number: 12, title: 'Klaster Kambing/Domba Etawa Premium', description: 'Klaster kambing/domba etawa premium', interlinks: [2, 9] },
          { id: 'p3-13', number: 13, title: 'Unggas Organik Ayam Kampung & Itik Bebas Antibiotik', description: 'Unggas organik ayam kampung dan itik bebas antibiotik', interlinks: [2, 4] },
          { id: 'p3-14', number: 14, title: 'Bank Pakan & Konsentrat Mandiri', description: 'Bank pakan dan konsentrat mandiri', interlinks: [2] },
          { id: 'p3-15', number: 15, title: 'Integrasi Biogas & Pupuk Organik Closed-Loop', description: 'Integrasi biogas dan pupuk organik closed-loop', interlinks: [2, 8] },
        ],
      },
      {
        id: 'p3-d4', number: 4, title: 'Perikanan & Akuakultur', emoji: '🐟',
        programs: [
          { id: 'p3-16', number: 16, title: 'Tambak Terintegrasi RAS & Bioflok', description: 'Tambak terintegrasi RAS dan bioflok', interlinks: [2, 7] },
          { id: 'p3-17', number: 17, title: 'Makroalga & Rumput Laut Global', description: 'Makroalga dan rumput laut global', interlinks: [2, 9] },
          { id: 'p3-18', number: 18, title: 'Hatchery Pembenihan & Bank Indukan Desa', description: 'Hatchery pembenihan dan bank indukan desa', interlinks: [2] },
          { id: 'p3-19', number: 19, title: 'Penangkapan Terukur Nelayan Digital', description: 'Penangkapan terukur nelayan digital', interlinks: [6, 7] },
        ],
      },
      {
        id: 'p3-d5', number: 5, title: 'Ekosistem Pertahanan & Supply Chain', emoji: '📦',
        programs: [
          { id: 'p3-20', number: 20, title: 'Lumbung Pangan Digital & Sistem Resi Gudang', description: 'Lumbung pangan digital dan sistem resi gudang', interlinks: [6, 9] },
          { id: 'p3-21', number: 21, title: 'Keadilan Pangan Zero Tengkulak Fair Trade', description: 'Keadilan pangan zero tengkulak fair trade', interlinks: [9] },
          { id: 'p3-22', number: 22, title: 'Karantina & Standardisasi Ekspor Desa EPZ', description: 'Karantina dan standardisasi ekspor desa EPZ', interlinks: [2, 9] },
          { id: 'p3-23', number: 23, title: 'Riset Agrikultur & Bank Benih Lokal', description: 'Riset agrikultur dan bank benih lokal', interlinks: [7] },
          { id: 'p3-24', number: 24, title: 'Cold Chain Logistics Rantai Pendingin', description: 'Cold chain logistics rantai pendingin', interlinks: [6] },
          { id: 'p3-25', number: 25, title: 'Takaful Anna Asuransi Gagal Panen', description: 'Takaful Anna asuransi gagal panen', interlinks: [1, 4] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 4: Kampung Sehat (Adhikara Roga) - 25 programs in 5 Domain
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 4,
    title: 'Kampung Sehat',
    adhikara: 'Adhikara Roga',
    icon: 'Heart',
    color: '#dc2626',
    secondaryColor: '#F87171',
    klasterLabel: 'Domain',
    klasterGroups: [
      {
        id: 'p4-d1', number: 1, title: 'Infrastruktur Klinis', emoji: '🏥',
        programs: [
          { id: 'p4-1', number: 1, title: 'Klinik Desa Sehat Puskesmas Mini', description: 'Klinik desa sehat puskesmas mini', interlinks: [7] },
          { id: 'p4-2', number: 2, title: 'Posyandu Plus Digital Stunting Terminator', description: 'Posyandu plus digital stunting terminator', interlinks: [7] },
          { id: 'p4-3', number: 3, title: 'Telemedicine Nusantara', description: 'Telemedicine nusantara', interlinks: [7] },
          { id: 'p4-4', number: 4, title: 'Apotek Digital & Apotek Hidup', description: 'Apotek digital dan apotek hidup', interlinks: [3, 7] },
          { id: 'p4-5', number: 5, title: 'Ambulans Cerdas & SOS Response', description: 'Ambulans cerdas dan SOS response', interlinks: [6] },
        ],
      },
      {
        id: 'p4-d2', number: 2, title: 'Nutrisi & Lingkungan', emoji: '🥗',
        programs: [
          { id: 'p4-6', number: 6, title: 'Program Gizi Presisi Transformatif', description: 'Program gizi presisi transformatif', interlinks: [3] },
          { id: 'p4-7', number: 7, title: 'Herbal Medicine & Jamu Center', description: 'Herbal medicine dan jamu center', interlinks: [3] },
          { id: 'p4-8', number: 8, title: 'Sanitasi & Air Suci Desa', description: 'Sanitasi dan air suci desa', interlinks: [8] },
          { id: 'p4-9', number: 9, title: 'Lansia Berdaya Home Care & IoT Monitoring', description: 'Lansia berdaya home care dan IoT monitoring', interlinks: [7, 9] },
          { id: 'p4-10', number: 10, title: 'NB K3 Kesehatan & Keselamatan Kerja Ekosistem', description: 'NB K3 kesehatan dan keselamatan kerja ekosistem', interlinks: [2] },
        ],
      },
      {
        id: 'p4-d3', number: 3, title: 'Jaring Pengaman Sosial', emoji: '🧠',
        programs: [
          { id: 'p4-11', number: 11, title: 'NB Takaful Kesehatan Asuransi Mikro Syariah', description: 'NB Takaful kesehatan asuransi mikro syariah', interlinks: [1] },
          { id: 'p4-12', number: 12, title: 'Mental Health & Crisis Center Desa', description: 'Mental health dan crisis center desa', interlinks: [7] },
          { id: 'p4-13', number: 13, title: 'Pusat Olahraga & Kebugaran Komunitas', description: 'Pusat olahraga dan kebugaran komunitas', interlinks: [9] },
          { id: 'p4-14', number: 14, title: 'Dapur Sehat & Edukasi Gizi Komunitas', description: 'Dapur sehat dan edukasi gizi komunitas', interlinks: [3] },
          { id: 'p4-15', number: 15, title: 'Mobile Medical Fleet Klinik Berjalan NB', description: 'Mobile medical fleet klinik berjalan NB', interlinks: [6] },
        ],
      },
      {
        id: 'p4-d4', number: 4, title: 'Kesehatan Rohani', emoji: '🕌',
        programs: [
          { id: 'p4-16', number: 16, title: 'Mushola & Rumah Ibadah Digital', description: 'Mushola dan rumah ibadah digital', interlinks: [7] },
          { id: 'p4-17', number: 17, title: 'NB Tabungan Haji & Umroh Desa', description: 'NB tabungan haji dan umroh desa', interlinks: [1] },
          { id: 'p4-18', number: 18, title: 'Pesantren Ekonomi & Fiqh Muamalah', description: 'Pesantren ekonomi dan fiqh muamalah', interlinks: [1, 7] },
          { id: 'p4-19', number: 19, title: 'Wakaf Produktif Kesehatan', description: 'Wakaf produktif kesehatan', interlinks: [1, 9] },
          { id: 'p4-20', number: 20, title: 'Ziarah & Spiritual Tourism', description: 'Ziarah dan spiritual tourism', interlinks: [9] },
        ],
      },
      {
        id: 'p4-d5', number: 5, title: 'Harmoni Sosial', emoji: '🕊️',
        programs: [
          { id: 'p4-21', number: 21, title: 'NB Zakat & Sedekah Terorganisir', description: 'NB zakat dan sedekah terorganisir', interlinks: [1] },
          { id: 'p4-22', number: 22, title: 'Interfaith Dialogue & Harmony Center', description: 'Interfaith dialogue dan harmony center', interlinks: [7] },
          { id: 'p4-23', number: 23, title: 'Konseling Spiritual Paliatif End-of-Life Care', description: 'Konseling spiritual paliatif end-of-life care', interlinks: [9] },
          { id: 'p4-24', number: 24, title: 'Manajemen Kedukaan & Pemakaman Bermartabat', description: 'Manajemen kedukaan dan pemakaman bermartabat', interlinks: [9] },
          { id: 'p4-25', number: 25, title: 'Spiritual Retreat & Mindfulness', description: 'Spiritual retreat dan mindfulness', interlinks: [9] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 5: Kampung Cerdas (Adhikara Vidya) - 25 programs in 5 Domain
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 5,
    title: 'Kampung Cerdas',
    adhikara: 'Adhikara Vidya',
    icon: 'GraduationCap',
    color: '#7c3aed',
    secondaryColor: '#A78BFA',
    klasterLabel: 'Domain',
    klasterGroups: [
      {
        id: 'p5-d1', number: 1, title: 'Solusi Putus Sekolah', emoji: '📚',
        programs: [
          { id: 'p5-1', number: 1, title: 'Sekolah Desa Berbasis Produksi (Sekolah Pro)', description: 'Sekolah desa berbasis produksi', interlinks: [2, 3] },
          { id: 'p5-2', number: 2, title: 'Kejar Paket A/B/C Digital', description: 'Kejar paket A/B/C digital', interlinks: [7] },
          { id: 'p5-3', number: 3, title: 'RPL Rekognisi Pembelajaran Lampau', description: 'RPL rekognisi pembelajaran lampau', interlinks: [7] },
          { id: 'p5-4', number: 4, title: 'Earn & Learn (Sekolah Sambil Bekerja)', description: 'Earn & learn sekolah sambil bekerja', interlinks: [1, 2] },
          { id: 'p5-5', number: 5, title: 'Home Schooling & Inklusif Disabilitas', description: 'Home schooling dan inklusif disabilitas', interlinks: [7] },
        ],
      },
      {
        id: 'p5-d2', number: 2, title: 'Fondasi Literasi', emoji: '📖',
        programs: [
          { id: 'p5-6', number: 6, title: 'Desa Literasi 360°', description: 'Desa literasi 360 derajat', interlinks: [7] },
          { id: 'p5-7', number: 7, title: 'Perpustakaan Desa Digital', description: 'Perpustakaan desa digital', interlinks: [7] },
          { id: 'p5-8', number: 8, title: 'Program Bahasa Asing & Diplomasi Desa', description: 'Program bahasa asing dan diplomasi desa', interlinks: [7, 9] },
          { id: 'p5-9', number: 9, title: 'Financial Literacy & Cooperative Academy', description: 'Financial literacy dan cooperative academy', interlinks: [1, 7] },
          { id: 'p5-10', number: 10, title: 'Media & Informasi Literacy', description: 'Media dan informasi literacy', interlinks: [7] },
        ],
      },
      {
        id: 'p5-d3', number: 3, title: 'Vokasi & Sertifikasi', emoji: '🔧',
        programs: [
          { id: 'p5-11', number: 11, title: 'Sertifikasi Kompetensi BNSP', description: 'Sertifikasi kompetensi BNSP', interlinks: [2, 7] },
          { id: 'p5-12', number: 12, title: 'Mini-MBA Desa Pelatihan UMKM', description: 'Mini-MBA desa pelatihan UMKM', interlinks: [1, 2] },
          { id: 'p5-13', number: 13, title: 'Workshop Teknik & Vokasi Spesialis', description: 'Workshop teknik dan vokasi spesialis', interlinks: [2, 7] },
          { id: 'p5-14', number: 14, title: 'Magang & Apprenticeship Terstruktur', description: 'Magang dan apprenticeship terstruktur', interlinks: [2] },
          { id: 'p5-15', number: 15, title: 'Digital Skill Bootcamp', description: 'Digital skill bootcamp', interlinks: [7, 9] },
        ],
      },
      {
        id: 'p5-d4', number: 4, title: 'Pendidikan Tinggi', emoji: '🎓',
        programs: [
          { id: 'p5-16', number: 16, title: 'Universitas Desa Terbuka', description: 'Universitas desa terbuka', interlinks: [7] },
          { id: 'p5-17', number: 17, title: 'Beasiswa Koperasi Intergenerasional', description: 'Beasiswa koperasi intergenerasional', interlinks: [1] },
          { id: 'p5-18', number: 18, title: 'Research & Innovation Lab Desa', description: 'Research and innovation lab desa', interlinks: [3, 7] },
          { id: 'p5-19', number: 19, title: 'Leadership School Perangkat Desa', description: 'Leadership school perangkat desa', interlinks: [7] },
          { id: 'p5-20', number: 20, title: 'Pusat Dokumentasi & Kajian Kebijakan Desa', description: 'Pusat dokumentasi dan kajian kebijakan desa', interlinks: [7] },
        ],
      },
      {
        id: 'p5-d5', number: 5, title: 'Pembelajaran Sepanjang Hayat', emoji: '🌟',
        programs: [
          { id: 'p5-21', number: 21, title: 'NB Academy E-Learning Platform', description: 'NB Academy e-learning platform', interlinks: [7] },
          { id: 'p5-22', number: 22, title: 'Komunitas Belajar & Study Circle', description: 'Komunitas belajar dan study circle', interlinks: [7] },
          { id: 'p5-23', number: 23, title: 'Festival Ilmu & Pameran Inovasi Desa', description: 'Festival ilmu dan pameran inovasi desa', interlinks: [2, 9] },
          { id: 'p5-24', number: 24, title: 'Mentoring & Coaching Ekosistem', description: 'Mentoring dan coaching ekosistem', interlinks: [1, 2] },
          { id: 'p5-25', number: 25, title: 'Elder Wisdom & Intergenerational Learning', description: 'Elder wisdom dan intergenerational learning', interlinks: [4, 9] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 6: Kampung Niaga (Adhikara Yana) - 26 programs in 5 Domain
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 6,
    title: 'Kampung Niaga',
    adhikara: 'Adhikara Yana',
    icon: 'Truck',
    color: '#0d9488',
    secondaryColor: '#2DD4BF',
    klasterLabel: 'Domain',
    klasterGroups: [
      {
        id: 'p6-d1', number: 1, title: 'Gerbang Ekspor-Impor', emoji: '🌏',
        programs: [
          { id: 'p6-1', number: 1, title: 'Export Processing Zone Desa', description: 'Zona pemrosesan ekspor desa', interlinks: [2, 9] },
          { id: 'p6-2', number: 2, title: 'Pusat Konsolidasi Ekspor & LCL', description: 'Pusat konsolidasi ekspor dan LCL', interlinks: [2, 9] },
          { id: 'p6-3', number: 3, title: 'Desa Transit & Free Trade Zone', description: 'Desa transit dan free trade zone', interlinks: [2, 9] },
          { id: 'p6-4', number: 4, title: 'Digital Trade Facilitation & e-Customs', description: 'Digital trade facilitation dan e-Customs', interlinks: [7, 9] },
          { id: 'p6-5', number: 5, title: 'Konsultan Ekspor & Market Access', description: 'Konsultan ekspor dan market access', interlinks: [2, 9] },
        ],
      },
      {
        id: 'p6-d2', number: 2, title: 'Jaringan Logistik', emoji: '🔗',
        programs: [
          { id: 'p6-6', number: 6, title: 'Agregator Logistik Multi-Ekspedisi', description: 'Agregator logistik multi-ekspedisi', interlinks: [9] },
          { id: 'p6-7', number: 7, title: 'NB Fulfillment Center Gudang Bersama', description: 'NB fulfillment center gudang bersama', interlinks: [9] },
          { id: 'p6-8', number: 8, title: 'Sistem Pelacakan Blockchain', description: 'Sistem pelacakan blockchain', interlinks: [7, 9] },
          { id: 'p6-9', number: 9, title: 'Desa Transit & Terminal Logistik Regional', description: 'Desa transit dan terminal logistik regional', interlinks: [2, 9] },
          { id: 'p6-10', number: 10, title: 'AI Smart Routing Logistics', description: 'AI smart routing logistics', interlinks: [7] },
        ],
      },
      {
        id: 'p6-d3', number: 3, title: 'Cold Chain', emoji: '❄️',
        programs: [
          { id: 'p6-11', number: 11, title: 'Cold Storage Desa Bertenaga Surya', description: 'Cold storage desa bertenaga surya', interlinks: [3, 8] },
          { id: 'p6-12', number: 12, title: 'Armada Truk Pendingin Refrigerated Transport', description: 'Armada truk pendingin refrigerated transport', interlinks: [3] },
          { id: 'p6-13', number: 13, title: 'Cold Display Retail Rumah Niaga', description: 'Cold display retail rumah niaga', interlinks: [3, 9] },
          { id: 'p6-14', number: 14, title: 'Drone & Autonomous Delivery Desa Terisolir', description: 'Drone dan autonomous delivery desa terisolir', interlinks: [7] },
          { id: 'p6-15', number: 15, title: 'Lumbung Pangan Digital & Sistem Resi Gudang', description: 'Lumbung pangan digital dan sistem resi gudang', interlinks: [3, 9] },
        ],
      },
      {
        id: 'p6-d4', number: 4, title: 'Konektivitas Manusia', emoji: '🚌',
        programs: [
          { id: 'p6-16', number: 16, title: 'Angkutan Desa Terintegrasi NB Shuttle', description: 'Angkutan desa terintegrasi NB shuttle', interlinks: [9] },
          { id: 'p6-17', number: 17, title: 'Jaringan Shuttle Wisata', description: 'Jaringan shuttle wisata', interlinks: [9] },
          { id: 'p6-18', number: 18, title: 'Ambulans Niaga & Logistik Medis Cepat', description: 'Ambulans niaga dan logistik medis cepat', interlinks: [4] },
          { id: 'p6-19', number: 19, title: 'Transportasi Laut Pelosok', description: 'Transportasi laut pelosok', interlinks: [9] },
          { id: 'p6-20', number: 20, title: 'MaaS Mobility-as-a-Service via NusaPay', description: 'MaaS mobility-as-a-service via NusaPay', interlinks: [1, 9] },
        ],
      },
      {
        id: 'p6-d5', number: 5, title: 'Kampung Energi', emoji: '⚡',
        programs: [
          { id: 'p6-21', number: 21, title: 'PLTS Atap Desa & Net Metering', description: 'PLTS atap desa dan net metering', interlinks: [7, 8] },
          { id: 'p6-22', number: 22, title: 'Biogas Komunal dari Limbah Ternak', description: 'Biogas komunal dari limbah ternak', interlinks: [3, 8] },
          { id: 'p6-23', number: 23, title: 'Mini Hydro & Mikro Hidro Desa', description: 'Mini hydro dan mikro hidro desa', interlinks: [8] },
          { id: 'p6-24', number: 24, title: 'EV Fleet Transition Armada Elektrik', description: 'EV fleet transition armada elektrik', interlinks: [7, 8] },
          { id: 'p6-25', number: 25, title: 'Energy Storage & Smart Grid Desa', description: 'Energy storage dan smart grid desa', interlinks: [7, 8] },
          { id: 'p6-26', number: 26, title: 'Terminal Agri-Logistik Desa', description: 'Terminal agri-logistik desa', interlinks: [3] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 7: Kampung Digital (Adhikara Jnana) - 20 programs in 5 Klaster
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 7,
    title: 'Kampung Digital',
    adhikara: 'Adhikara Jnana',
    icon: 'Laptop',
    color: '#3b82f6',
    secondaryColor: '#60A5FA',
    klasterLabel: 'Klaster',
    klasterGroups: [
      {
        id: 'p7-k1', number: 1, title: 'Smart Village OS', emoji: '🧠',
        programs: [
          { id: 'p7-1', number: 1, title: 'IoT Sensor Network Pertanian', description: 'Jaringan sensor IoT pertanian', interlinks: [3] },
          { id: 'p7-2', number: 2, title: 'AI Analytics & Predictive Engine', description: 'AI analytics dan predictive engine', interlinks: [1, 3] },
          { id: 'p7-3', number: 3, title: 'Drone Monitoring & Precision Farming', description: 'Drone monitoring dan precision farming', interlinks: [3] },
          { id: 'p7-4', number: 4, title: 'Smart Grid & Energy Management', description: 'Smart grid dan energy management', interlinks: [6, 8] },
        ],
      },
      {
        id: 'p7-k2', number: 2, title: 'Infrastruktur Digital', emoji: '📡',
        programs: [
          { id: 'p7-5', number: 5, title: 'Desa WiFi & Internet Masuk Desa', description: 'Desa WiFi dan internet masuk desa', interlinks: [1] },
          { id: 'p7-6', number: 6, title: 'Cloud Computing & Data Center Desa', description: 'Cloud computing dan data center desa', interlinks: [1] },
          { id: 'p7-7', number: 7, title: 'Cybersecurity & Data Privacy', description: 'Cybersecurity dan data privacy', interlinks: [1, 9] },
          { id: 'p7-8', number: 8, title: 'Blockchain Infrastructure', description: 'Blockchain infrastructure', interlinks: [9] },
        ],
      },
      {
        id: 'p7-k3', number: 3, title: 'Platform & Aplikasi', emoji: '📱',
        programs: [
          { id: 'p7-9', number: 9, title: 'E-Governance Desa', description: 'E-Governance desa', interlinks: [1] },
          { id: 'p7-10', number: 10, title: 'Dashboard Kinerja Real-Time', description: 'Dashboard kinerja real-time', interlinks: [1] },
          { id: 'p7-11', number: 11, title: 'Marketplace Digital Desa', description: 'Marketplace digital desa', interlinks: [6, 9] },
          { id: 'p7-12', number: 12, title: 'Super-App Ekosistem KKMNBMP', description: 'Super-App ekosistem KKMNBMP', interlinks: [1, 6, 9] },
        ],
      },
      {
        id: 'p7-k4', number: 4, title: 'Data & Kedaulatan Digital', emoji: '🔐',
        programs: [
          { id: 'p7-13', number: 13, title: 'Pusat Data Desa Terpadu', description: 'Pusat data desa terpadu', interlinks: [1] },
          { id: 'p7-14', number: 14, title: 'Pemetaan Aset Desa GIS', description: 'Pemetaan aset desa GIS', interlinks: [1] },
          { id: 'p7-15', number: 15, title: 'Open Data & API Ekosistem', description: 'Open data dan API ekosistem', interlinks: [1, 9] },
          { id: 'p7-16', number: 16, title: 'Digital Identity & e-KTP Desa', description: 'Digital identity dan e-KTP desa', interlinks: [1] },
        ],
      },
      {
        id: 'p7-k5', number: 5, title: 'Inovasi & R&D', emoji: '🔬',
        programs: [
          { id: 'p7-17', number: 17, title: 'Tech Hub & Inkubator Inovasi Pemuda', description: 'Tech hub dan inkubator inovasi pemuda', interlinks: [2, 5] },
          { id: 'p7-18', number: 18, title: 'R&D Lab Desa', description: 'R&D lab desa', interlinks: [3] },
          { id: 'p7-19', number: 19, title: 'Hackathon & Innovation Challenge', description: 'Hackathon dan innovation challenge', interlinks: [5, 9] },
          { id: 'p7-20', number: 20, title: 'Paten & HAKI Digital', description: 'Paten dan HAKI digital', interlinks: [2, 9] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 8: Kampung Hijau (Adhikara Prakriti) - 20 programs in 5 Domain
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 8,
    title: 'Kampung Hijau',
    adhikara: 'Adhikara Prakriti',
    icon: 'Flower2',
    color: '#059669',
    secondaryColor: '#34D399',
    klasterLabel: 'Domain',
    klasterGroups: [
      {
        id: 'p8-d1', number: 1, title: 'Energi Terbarukan', emoji: '☀️',
        programs: [
          { id: 'p8-1', number: 1, title: 'PLTS Atap Desa & Net Metering', description: 'PLTS atap desa dan net metering', interlinks: [6, 7] },
          { id: 'p8-2', number: 2, title: 'Biogas Komunal dari Limbah Ternak', description: 'Biogas komunal dari limbah ternak', interlinks: [3, 6] },
          { id: 'p8-3', number: 3, title: 'Mini Hydro & Mikro Hidro Desa', description: 'Mini hydro dan mikro hidro desa', interlinks: [6] },
          { id: 'p8-4', number: 4, title: 'Biomass & Waste-to-Energy', description: 'Biomass dan waste-to-energy', interlinks: [2, 6] },
        ],
      },
      {
        id: 'p8-d2', number: 2, title: 'Pengelolaan Limbah', emoji: '♻️',
        programs: [
          { id: 'p8-5', number: 5, title: 'Bank Sampah Digital', description: 'Bank sampah digital', interlinks: [7, 9] },
          { id: 'p8-6', number: 6, title: 'Pusat Daur Ulang & Upcycling', description: 'Pusat daur ulang dan upcycling', interlinks: [2, 7] },
          { id: 'p8-7', number: 7, title: 'Composting Center & Pupuk Organik', description: 'Composting center dan pupuk organik', interlinks: [3] },
          { id: 'p8-8', number: 8, title: 'E-Waste Management & Recycling', description: 'E-waste management dan recycling', interlinks: [7] },
        ],
      },
      {
        id: 'p8-d3', number: 3, title: 'Konservasi & Rehabilitasi', emoji: '🌳',
        programs: [
          { id: 'p8-9', number: 9, title: 'Reforestasi & Agroforestri', description: 'Reforestasi dan agroforestri', interlinks: [3] },
          { id: 'p8-10', number: 10, title: 'Konservasi Sungai & Danau', description: 'Konservasi sungai dan danau', interlinks: [3] },
          { id: 'p8-11', number: 11, title: 'Perlindungan Biodiversitas Desa', description: 'Perlindungan biodiversitas desa', interlinks: [3] },
          { id: 'p8-12', number: 12, title: 'Mangrove Restoration & Coastal Protection', description: 'Mangrove restoration dan coastal protection', interlinks: [3, 9] },
        ],
      },
      {
        id: 'p8-d4', number: 4, title: 'Pertanian & Lingkungan Hijau', emoji: '🌿',
        programs: [
          { id: 'p8-13', number: 13, title: 'Pertanian Organik & Regeneratif', description: 'Pertanian organik dan regeneratif', interlinks: [3] },
          { id: 'p8-14', number: 14, title: 'Pestisida Nabati & Pengendalian Hama Terpadu', description: 'Pestisida nabati dan pengendalian hama terpadu', interlinks: [3] },
          { id: 'p8-15', number: 15, title: 'Water Harvesting & Irigasi Hemat Air', description: 'Water harvesting dan irigasi hemat air', interlinks: [3, 7] },
          { id: 'p8-16', number: 16, title: 'Carbon Farming & Carbon Credit Desa', description: 'Carbon farming dan carbon credit desa', interlinks: [1, 7] },
        ],
      },
      {
        id: 'p8-d5', number: 5, title: 'Ekosistem Hijau Desa', emoji: '🌎',
        programs: [
          { id: 'p8-17', number: 17, title: 'Green Building & Material Lokal', description: 'Green building dan material lokal', interlinks: [2, 9] },
          { id: 'p8-18', number: 18, title: 'Eco-Village Planning & Zonasi', description: 'Eco-village planning dan zonasi', interlinks: [7, 9] },
          { id: 'p8-19', number: 19, title: 'Climate Adaptation & Resilience Center', description: 'Climate adaptation dan resilience center', interlinks: [7] },
          { id: 'p8-20', number: 20, title: 'Environmental Education & Eco-Tourism', description: 'Environmental education dan eco-tourism', interlinks: [5, 9] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PILAR 9: Kampung Wisata (Adhikara Ramya) - 30 programs in 5 Klaster
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    number: 9,
    title: 'Kampung Wisata',
    adhikara: 'Adhikara Ramya',
    icon: 'Home',
    color: '#92400e',
    secondaryColor: '#D97706',
    klasterLabel: 'Klaster',
    klasterGroups: [
      {
        id: 'p9-k1', number: 1, title: 'Wisata Alam & Petualangan', emoji: '🏔️',
        programs: [
          { id: 'p9-1', number: 1, title: 'Ekowisata & Agrowisata Terintegrasi', description: 'Destinasi ekowisata dan agrowisata berbasis komunitas dengan jalur interpretasi alam', interlinks: [3, 8] },
          { id: 'p9-2', number: 2, title: 'Wisata Petualangan & Outdoor Adventure', description: 'Trekking, rafting, climbing, dan off-road adventure dengan standar keselamatan internasional', interlinks: [8] },
          { id: 'p9-3', number: 3, title: 'Marine Tourism & Wisata Bahari', description: 'Snorkeling, diving, island hopping, dan dolphin watching berbasis konservasi laut', interlinks: [3, 8] },
          { id: 'p9-4', number: 4, title: 'Cave & Geotourism Explorer', description: 'Eksplorasi gua, geosite, dan formasi geologi unik dengan interpretasi saintifik', interlinks: [8] },
          { id: 'p9-5', number: 5, title: 'Waterfall & River Tourism Park', description: 'Taman wisata air terjun dan sungai dengan zona renang, kayak, dan foto premium', interlinks: [8] },
          { id: 'p9-6', number: 6, title: 'Wildlife & Bird Watching Sanctuary', description: 'Suaka margasatwa dan bird watching dengan observatorium dan guided tour bersertifikasi', interlinks: [3, 8] },
        ],
      },
      {
        id: 'p9-k2', number: 2, title: 'Wisata Budaya & Spiritual', emoji: '🏛️',
        programs: [
          { id: 'p9-7', number: 7, title: 'Wisata Budaya & Kearifan Lokal Living Museum', description: 'Museum hidup budaya desa dengan demonstrasi ritual, tradisi, dan adat istiadat', interlinks: [5] },
          { id: 'p9-8', number: 8, title: 'Spiritual Retreat & Healing Tourism', description: 'Retreat spiritual, meditation camp, dan healing therapy berbasis tradisi lokal', interlinks: [4] },
          { id: 'p9-9', number: 9, title: 'Ziarah & Pilgrimage Tourism', description: 'Jalur ziarah multifaith dengan infrastruktur pendukung dan guided pilgrimage', interlinks: [4, 6] },
          { id: 'p9-10', number: 10, title: 'Festival Desa & Cultural Events Calendar', description: 'Kalender festival tahunan desa dengan event management profesional', interlinks: [5, 7] },
          { id: 'p9-11', number: 11, title: 'Heritage Trail & Story Walk AR', description: 'Jalur warisan budaya dengan augmented reality storytelling dan audio guide', interlinks: [5, 7] },
          { id: 'p9-12', number: 12, title: 'Workshop Seni & Master Class Tradisional', description: 'Workshop seni ukir, tenun, tari, dan musik tradisional bersama maestro desa', interlinks: [2, 5] },
        ],
      },
      {
        id: 'p9-k3', number: 3, title: 'Hospitality & Akomodasi', emoji: '🏨',
        programs: [
          { id: 'p9-13', number: 13, title: 'Homestay & Penginapan Desa Berstandar', description: 'Homestay dan penginapan desa dengan standar hospitality nasional dan klasifikasi bintang', interlinks: [1] },
          { id: 'p9-14', number: 14, title: 'Glamping & Eco-Lodge Premium', description: 'Glamping dan eco-lodge premium dengan desain arsitektur vernakular dan off-grid systems', interlinks: [8] },
          { id: 'p9-15', number: 15, title: 'Co-Living & Digital Nomad Hub', description: 'Rumah co-living dan workspace untuk digital nomad dengan fiber optic dan co-working space', interlinks: [7] },
          { id: 'p9-16', number: 16, title: 'Convention Center & MICE Desa', description: 'Pusat konvensi dan MICE desa untuk meeting, incentive, conference, dan exhibition', interlinks: [6] },
          { id: 'p9-17', number: 17, title: 'Villa Desa & Boutique Resort Komunitas', description: 'Villa dan boutique resort dikelola komunitas dengan desain unik dan pelayanan personalized', interlinks: [1, 8] },
          { id: 'p9-18', number: 18, title: 'Rumah Sawah & Farm Stay Experience', description: 'Penginapan rumah sawah dengan pengalaman bertani, memancing, dan hidup bersama petani', interlinks: [3, 8] },
        ],
      },
      {
        id: 'p9-k4', number: 4, title: 'Ekonomi Kreatif & Kuliner', emoji: '🎨',
        programs: [
          { id: 'p9-19', number: 19, title: 'Produksi Handicraft & Souvenir Bermerk', description: 'Produksi handicraft dan souvenir bermerk dengan sertifikasi HAKI dan packaging premium', interlinks: [2, 7] },
          { id: 'p9-20', number: 20, title: 'Wisata Kuliner & Farm-to-Table Gastronomi', description: 'Wisata kuliner dari kebun ke meja dengan cooking class dan gastronomi lokal', interlinks: [3] },
          { id: 'p9-21', number: 21, title: 'Fashion & Batik Desa Haute Couture', description: 'Fashion dan batik desa dengan koleksi haute couture dan ready-to-wear untuk pasar global', interlinks: [2] },
          { id: 'p9-22', number: 22, title: 'Konten Digital & Creator Economy Hub', description: 'Studio konten dan creator economy untuk vlogger, influencer, dan digital storyteller', interlinks: [7] },
          { id: 'p9-23', number: 23, title: 'Coffee & Tea Tasting Experience', description: 'Pengalaman cupping kopi dan teh specialty dengan barista bersertifikasi dan direct trade', interlinks: [2, 3] },
          { id: 'p9-24', number: 24, title: 'Art Gallery & Pop-Up Market Desa', description: 'Galeri seni dan pop-up market rotasi mingguan untuk seniman dan artisan lokal', interlinks: [2, 7] },
        ],
      },
      {
        id: 'p9-k5', number: 5, title: 'Manajemen & Pemasaran Wisata', emoji: '📊',
        programs: [
          { id: 'p9-25', number: 25, title: 'Sistem Reservasi & Booking Terpadu NusaTrip', description: 'Platform reservasi dan booking terpadu NusaTrip terintegrasi NusaPay dan OTA global', interlinks: [1, 7] },
          { id: 'p9-26', number: 26, title: 'Pelatihan Hospitality & Tourism Academy', description: 'Tourism academy desa dengan kurikulum hospitality, guiding, dan service excellence', interlinks: [5, 7] },
          { id: 'p9-27', number: 27, title: 'Paket Wisata Inter-Kampung & Rail Pass', description: 'Paket wisata inter-kampung dan rail pass terintegrasi 9 pilar dengan shuttle connection', interlinks: [6] },
          { id: 'p9-28', number: 28, title: 'Digital Marketing & OTA Global Integration', description: 'Pemasaran digital terintegrasi dengan Booking.com, Airbnb, Traveloka, dan OTA global', interlinks: [7] },
          { id: 'p9-29', number: 29, title: 'Smart Tourism Dashboard & Analytics', description: 'Dashboard pariwisata cerdas real-time dengan visitor analytics, heat map, dan revenue tracking', interlinks: [7] },
          { id: 'p9-30', number: 30, title: 'Quality Assurance & Sustainable Tourism Certification', description: 'Jaminan mutu dan sertifikasi pariwisata berkelanjutan green destination internasional', interlinks: [5, 8] },
        ],
      },
    ],
  },
]

// ─── Interlink Connections ──────────────────────────────────────────────────────
// Meaningful connections across all 9 pilars
// New numbering: 1=Modal, 2=Industri, 3=Pangan, 4=Sehat, 5=Cerdas, 6=Niaga, 7=Digital, 8=Hijau, 9=Wisata

export const INTERLINK_CONNECTIONS: InterlinkConnection[] = [
  // ─── Pilar 1 (Modal/Artha) → Capital flows to all ───
  { from: 1, to: 2, type: 'capital', label: 'Pembiayaan industri & alsintan' },
  { from: 1, to: 3, type: 'capital', label: 'KUR presisi & asuransi gagal panen' },
  { from: 1, to: 4, type: 'capital', label: 'Asuransi mikro & dana pensiun' },
  { from: 1, to: 5, type: 'capital', label: 'Beasiswa koperasi & edu-save' },
  { from: 1, to: 6, type: 'capital', label: 'NusaPay MaaS & trade finance' },
  { from: 1, to: 8, type: 'capital', label: 'Green financing & carbon credit' },
  { from: 1, to: 9, type: 'capital', label: 'Investasi wisata & homestay' },

  // ─── Pilar 2 (Industri/Krada) → Goods processing ───
  { from: 3, to: 2, type: 'resource', label: 'Bahan baku pertanian & perkebunan' },
  { from: 2, to: 6, type: 'goods', label: 'Produk jadi ke distribusi niaga' },
  { from: 2, to: 9, type: 'goods', label: 'Handicraft, fashion & kosmetik' },
  { from: 2, to: 4, type: 'services', label: 'Herbal & kosmetik untuk kesehatan' },
  { from: 2, to: 7, type: 'data', label: 'HAKI digital & blockchain royalti' },
  { from: 2, to: 5, type: 'services', label: 'Lean manufacturing training' },
  { from: 2, to: 8, type: 'resource', label: 'Limbah untuk daur ulang & bio-kemasan' },

  // ─── Pilar 3 (Pangan/Anna) → Food supply ───
  { from: 3, to: 4, type: 'resource', label: 'Gizi & herbal medicine' },
  { from: 3, to: 8, type: 'resource', label: 'Limbah pertanian → biogas & kompos' },
  { from: 3, to: 9, type: 'goods', label: 'Farm-to-table & wisata kuliner' },
  { from: 3, to: 7, type: 'data', label: 'IoT pertanian & drone monitoring' },
  { from: 3, to: 6, type: 'goods', label: 'Cold chain & terminal agri-logistik' },

  // ─── Pilar 4 (Sehat/Roga) → Health services ───
  { from: 4, to: 7, type: 'data', label: 'Telemedicine & IoT monitoring' },
  { from: 4, to: 9, type: 'services', label: 'Spiritual tourism & wellness' },
  { from: 4, to: 6, type: 'services', label: 'Ambulans niaga & medical fleet' },
  { from: 4, to: 8, type: 'resource', label: 'Sanitasi & air bersih' },

  // ─── Pilar 5 (Cerdas/Vidya) → Education for all ───
  { from: 5, to: 2, type: 'services', label: 'Vokasi industri & sertifikasi' },
  { from: 5, to: 7, type: 'data', label: 'E-learning & digital skill' },
  { from: 5, to: 9, type: 'services', label: 'Hospitality training & festival' },
  { from: 5, to: 4, type: 'services', label: 'Elder wisdom & health literacy' },

  // ─── Pilar 6 (Niaga/Yana) → Distribution for all ───
  { from: 6, to: 9, type: 'goods', label: 'Shuttle wisata & ekspor-impor' },
  { from: 6, to: 2, type: 'goods', label: 'Material sourcing B2B & EPZ' },
  { from: 6, to: 7, type: 'data', label: 'Blockchain tracking & smart routing' },
  { from: 6, to: 8, type: 'resource', label: 'PLTS, biogas & energi terbarukan' },

  // ─── Pilar 7 (Digital/Jnana) → Tech for all ───
  { from: 7, to: 1, type: 'data', label: 'Smart contract, tokenisasi & super-app' },
  { from: 7, to: 3, type: 'data', label: 'IoT pertanian & AI analytics' },
  { from: 7, to: 9, type: 'data', label: 'Booking system & digital marketing' },
  { from: 7, to: 8, type: 'data', label: 'Smart grid & environmental monitoring' },

  // ─── Pilar 8 (Hijau/Prakriti) → Green infrastructure ───
  { from: 8, to: 3, type: 'resource', label: 'Pupuk organik & pertanian regeneratif' },
  { from: 8, to: 6, type: 'resource', label: 'Energi terbarukan & EV fleet' },
  { from: 8, to: 9, type: 'resource', label: 'Eco-lodge & eco-tourism' },
  { from: 8, to: 7, type: 'data', label: 'Smart grid & carbon monitoring' },

  // ─── Pilar 9 (Wisata/Ramya) → Tourism experiences & economy ───
  { from: 9, to: 1, type: 'capital', label: 'Pendapatan wisata, homestay investasi & NusaTrip booking' },
  { from: 9, to: 2, type: 'goods', label: 'Handicraft, fashion, batik & coffee tasting' },
  { from: 9, to: 3, type: 'goods', label: 'Agrowisata, farm-to-table, farm stay & wildlife' },
  { from: 9, to: 4, type: 'services', label: 'Healing tourism, spiritual retreat & wellness' },
  { from: 9, to: 5, type: 'services', label: 'Cultural events, hospitality training & master class' },
  { from: 9, to: 6, type: 'services', label: 'Shuttle wisata, MICE & paket inter-kampung' },
  { from: 9, to: 7, type: 'data', label: 'Smart tourism dashboard, digital marketing & AR heritage' },
  { from: 9, to: 8, type: 'resource', label: 'Eco-tourism, green destination & eco-lodge' },
]

// ─── Helper Functions ───────────────────────────────────────────────────────────

export function getProgramCount(pilarNumber: number): number {
  const pilar = PILAR_PROGRAMS.find(p => p.number === pilarNumber)
  if (!pilar) return 0
  return pilar.klasterGroups.reduce((sum, k) => sum + k.programs.length, 0)
}

export function getTotalProgramCount(): number {
  return PILAR_PROGRAMS.reduce((sum, p) => sum + p.klasterGroups.reduce((s, k) => s + k.programs.length, 0), 0)
}
