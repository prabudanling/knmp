// ============================================
// 17 DEWAN PENDIRI KMNMP
// Berdasarkan dokumen v17 terbaru
// ============================================

export interface Founder {
  id: string;
  no: number;
  name: string;
  position: string;
  role: string;
  photo?: string;
  status: 'active' | 'vacant';
}

export const DEWAN_PENDIRI_17: Founder[] = [
  {
    id: 'pendiri-1',
    no: 1,
    name: 'H. Arif Rachman Hakim, M.M.',
    position: 'Pendiri ke-1',
    role: 'Wakil Presiden / Wakil Ketua Umum, CEO JE-P3 & Diplomat Utama 195 Negara',
    status: 'active',
  },
  {
    id: 'pendiri-2',
    no: 2,
    name: 'Prof. Wirono, S.E., M.Pd',
    position: 'Pendiri ke-2',
    role: 'Presiden / Ketua Umum (Bakornas), Pimpinan Tertinggi Eksekutif KMNMP',
    status: 'active',
  },
  {
    id: 'pendiri-3',
    no: 3,
    name: 'Prof. Dr. Tedy Mantoro',
    position: 'Pendiri ke-3',
    role: 'Ketua Dewan Pengawas, Ahli Tata Kelola Digital & CTO Advisor',
    status: 'active',
  },
  {
    id: 'pendiri-4',
    no: 4,
    name: 'Dr. Habib',
    position: 'Pendiri ke-4',
    role: 'Anggota Dewan Pengawas, Ahli Ketahanan Pangan Nasional',
    status: 'active',
  },
  {
    id: 'pendiri-5',
    no: 5,
    name: 'Komjen. Pol. (Purn.) Dr. Dharma Pongrekun, S.I.K., M.M., M.H.',
    position: 'Pendiri ke-5',
    role: 'Ketua Bidang Keamanan Siber & Kedaulatan Digital, Mantan Wakil Kepala BSSN',
    status: 'active',
  },
  {
    id: 'pendiri-6',
    no: 6,
    name: 'Jenderal TNI Agus Subiyanto, S.I.P.',
    position: 'Pendiri ke-6',
    role: 'Dewan Penasihat Pertahanan & Ketahanan Nasional, Panglima TNI RI',
    status: 'active',
  },
  {
    id: 'pendiri-7',
    no: 7,
    name: 'Tn. H. Gugun Gunara, S.E., M.M.',
    position: 'Pendiri ke-7',
    role: 'Grand Architect & COO, Arsitek Ekosistem Digital KMNMP, Chief Strategy & Innovation Officer',
    status: 'active',
  },
  {
    id: 'pendiri-8',
    no: 8,
    name: 'Dr. Cecep Sumarno',
    position: 'Pendiri ke-8',
    role: 'Sekretaris Jenderal, Kepala Administrasi & Legal Koperasi',
    status: 'active',
  },
  {
    id: 'pendiri-9',
    no: 9,
    name: 'Andi Darmadji, S.E.',
    position: 'Pendiri ke-9',
    role: 'Panglima Wilayah Kalimantan (Bakorwil), Pilar Ekspansi Kawasan Timur & IKN',
    status: 'active',
  },
  {
    id: 'pendiri-10',
    no: 10,
    name: 'Hj. Inna Hadianala, S.E.',
    position: 'Pendiri ke-10',
    role: 'Ketua Dewan Pembina, Penjaga Nilai & Konstitusi KMNMP',
    status: 'active',
  },
  {
    id: 'pendiri-11',
    no: 11,
    name: 'Fawwaz Arif Al Jabar, S.E., M.M.',
    position: 'Pendiri ke-11',
    role: 'Ketua Dewan Penasihat, CFO & Chief Financial Advisor, Arsitek ESG & Green Sukuk Desa',
    status: 'active',
  },
  {
    id: 'pendiri-12',
    no: 12,
    name: 'H. Mugi Prasetyo, S.E.',
    position: 'Pendiri ke-12',
    role: 'Koordinator Bidang Kemitraan Strategis',
    status: 'active',
  },
  {
    id: 'pendiri-13',
    no: 13,
    name: 'Dr. N. Rusmiati, M.Si., M.H.',
    position: 'Pendiri ke-13',
    role: 'Ketua Umum DPP ASITA, Koordinator Bidang Pariwisata',
    status: 'active',
  },
  {
    id: 'pendiri-14',
    no: 14,
    name: 'Hj. Fani Anggraeni, S.E.',
    position: 'Pendiri ke-14',
    role: 'Koordinator Bidang Pengembangan SDM',
    status: 'active',
  },
  {
    id: 'pendiri-15',
    no: 15,
    name: 'Ir. Endro Wuryanto, M.M.',
    position: 'Pendiri ke-15',
    role: 'Koordinator Bidang Infrastruktur Digital',
    status: 'active',
  },
  {
    id: 'pendiri-16',
    no: 16,
    name: 'Prof. Dr. H. Anwar Sanusi, SH, S.Pel, MM',
    position: 'Pendiri ke-16',
    role: 'Wakil Ketua Dewan Pembina, Representasi Pemerintah',
    status: 'active',
  },
  {
    id: 'pendiri-17',
    no: 17,
    name: 'dr. Hanson Barki',
    position: 'Pendiri ke-17',
    role: 'Koordinator Bidang Adab & Budaya',
    status: 'active',
  },
];

// ============================================
// 17 KOORDINATOR BIDANG STRATEGIS
// ============================================

export interface Korbid {
  no: number;
  kode: string;
  bidang: string;
  ketua: string;
  sekretaris: string;
  catatan: string;
  status: 'active' | 'vacant' | 'plt';
  color: string;
}

export const KORDINATOR_BIDANG_17: Korbid[] = [
  {
    no: 1,
    kode: 'KORBID_ORGANISASI',
    bidang: 'Organisasi & Keanggotaan',
    ketua: 'Hj. Inna Hadianala, S.E.',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-10 | Ketua Dewan Pembina',
    status: 'active',
    color: '#008F3D',
  },
  {
    no: 2,
    kode: 'KORBID_PANGAN',
    bidang: 'Pangan & Ketahanan Pangan',
    ketua: 'Dr. Habib',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-4 | Ahli Ketahanan Pangan Nasional',
    status: 'active',
    color: '#22c55e',
  },
  {
    no: 3,
    kode: 'KORBID_INDUSTRI',
    bidang: 'Industri & Manufaktur',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'Prioritas: Industri Pengolahan Desa',
    status: 'vacant',
    color: '#64748b',
  },
  {
    no: 4,
    kode: 'KORBID_LOGISTIK',
    bidang: 'Logistik & Distribusi',
    ketua: 'M. Ilham',
    sekretaris: '(Kosong)',
    catatan: 'Jaringan Logistik 83.763 Desa',
    status: 'active',
    color: '#f59e0b',
  },
  {
    no: 5,
    kode: 'KORBID_KESEHATAN',
    bidang: 'Kesehatan & Farmasi',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'Integrasi Posyandu 300rb Unit',
    status: 'vacant',
    color: '#ef4444',
  },
  {
    no: 6,
    kode: 'KORBID_KEUANGAN',
    bidang: 'Keuangan & Perbankan',
    ketua: 'Fawwaz Arif Al Jabar, S.E., M.M.',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-11 | CFO & ESG Architect',
    status: 'active',
    color: '#3b82f6',
  },
  {
    no: 7,
    kode: 'KORBID_ADAB_BUDAYA',
    bidang: 'Adab & Budaya',
    ketua: 'dr. Hanson Barki',
    sekretaris: '(Kosong)',
    catatan: 'Adab, Budaya',
    status: 'active',
    color: '#8b5cf6',
  },
  {
    no: 8,
    kode: 'KORBID_KEMITRAAN',
    bidang: 'Bisnis Kemitraan & UMKM',
    ketua: 'Ongky Putra',
    sekretaris: '(Kosong)',
    catatan: 'Ekosistem Mitra & UMKM Desa',
    status: 'active',
    color: '#ec4899',
  },
  {
    no: 9,
    kode: 'KORBID_DIGITAL',
    bidang: 'Digital & Teknologi',
    ketua: 'M. Sidik',
    sekretaris: '(Kosong)',
    catatan: 'kopnusa.id | Blockchain | AI | IoT',
    status: 'active',
    color: '#06b6d4',
  },
  {
    no: 10,
    kode: 'KORBID_HOLDING',
    bidang: 'Holding Trading Ekosistem',
    ketua: 'Tn. H. Gugun Gunara, S.E., M.M.',
    sekretaris: 'Cecep Abdul Jabbar',
    catatan: 'Pendiri ke-7 | Grand Architect',
    status: 'active',
    color: '#8B0000',
  },
  {
    no: 11,
    kode: 'KORBID_WISATA',
    bidang: 'Wisata, Umroh & Haji',
    ketua: 'Dr. Cecep Sumarno',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-8 | Sekjen merangkap',
    status: 'active',
    color: '#0ea5e9',
  },
  {
    no: 12,
    kode: 'KORBID_HUKUM',
    bidang: 'Hukum & Advokasi',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'Legal, Compliance, Advokasi Anggota',
    status: 'vacant',
    color: '#6366f1',
  },
  {
    no: 13,
    kode: 'KORBID_SDM',
    bidang: 'Pengembangan SDM & Diklat',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'JE-P3 Academy | Kader KMNMP Nasional',
    status: 'vacant',
    color: '#14b8a6',
  },
  {
    no: 14,
    kode: 'KORBID_EKSPOR',
    bidang: 'Ekspor Impor & Perdagangan Internasional',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'Global Trade Desk | Komoditas Ekspor Desa',
    status: 'vacant',
    color: '#f97316',
  },
  {
    no: 15,
    kode: 'KORBID_HUMAS',
    bidang: 'Hubungan Masyarakat & Media',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'Branding KMNMP Nasional & Internasional',
    status: 'vacant',
    color: '#a855f7',
  },
  {
    no: 16,
    kode: 'KORBID_AGRITECH',
    bidang: 'Pertanian Presisi & Agritech',
    ketua: 'Tn. H. Gugun Gunara, S.E., M.M.',
    sekretaris: '(Kosong)',
    catatan: 'Plt | Smart Farming | IoT Pertanian',
    status: 'plt',
    color: '#22c55e',
  },
  {
    no: 17,
    kode: 'KORBID_ENERGI',
    bidang: 'Energi Terbarukan & Lingkungan Hidup',
    ketua: 'Tn. H. Gugun Gunara, S.E., M.M.',
    sekretaris: '(Kosong)',
    catatan: 'Plt | Renewable Energy | Carbon Credits',
    status: 'plt',
    color: '#eab308',
  },
];

// ============================================
// STATISTIK KMNMP
// ============================================

export const KMNMP_STATS = {
  totalDesa: 83763,
  totalProvinsi: 38,
  totalNegara: 195,
  targetAnggota: 10000000,
  targetTransaksi: 2000000000000000, // 2000 Triliun
};
