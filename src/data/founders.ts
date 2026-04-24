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
    name: 'Drs. H. Arif Rachman Hakim, M.M.',
    position: 'Pendiri ke-1',
    role: 'Sekretaris Jenderal / CEO JE-P3',
    status: 'active',
  },
  {
    id: 'pendiri-2',
    no: 2,
    name: 'Dr. N. Rusmiati, M.Si., M.H.',
    position: 'Pendiri ke-2',
    role: 'Presiden / Ketua Umum',
    status: 'active',
  },
  {
    id: 'pendiri-3',
    no: 3,
    name: 'Prof. Wirono, S.E., M.Pd.',
    position: 'Pendiri ke-3',
    role: 'Wakil Ketua Umum',
    status: 'active',
  },
  {
    id: 'pendiri-4',
    no: 4,
    name: 'Prof. Dr. Elan Masbulan',
    position: 'Pendiri ke-4',
    role: 'Ketua Dewan Pengawas',
    status: 'active',
  },
  {
    id: 'pendiri-5',
    no: 5,
    name: 'Prof. Dr. H. Anwar Sanusi, S.H., S.Pel., M.M.',
    position: 'Pendiri ke-5',
    role: 'Ketua Dewan Penasehat',
    status: 'active',
  },
  {
    id: 'pendiri-6',
    no: 6,
    name: 'Prof. Dr. Teddy Mantoro, M.Sc., Ph.D., SMIEEE',
    position: 'Pendiri ke-6',
    role: 'Ketua Dewan Pakar',
    status: 'active',
  },
  {
    id: 'pendiri-7',
    no: 7,
    name: 'H. Gugun Gunara, S.E.',
    position: 'Pendiri ke-7',
    role: 'Wakil Sekretaris Jenderal / Grand Architect & COO',
    status: 'active',
  },
  {
    id: 'pendiri-8',
    no: 8,
    name: 'Komjen. Pol. (Purn.) Dharma Pongrekun',
    position: 'Pendiri ke-8',
    role: 'Ketua Bidang Keamanan Siber',
    status: 'active',
  },
  {
    id: 'pendiri-9',
    no: 9,
    name: 'Mayor Art. (Purn.) Cecep Sumarno, S.I.P., S.H.',
    position: 'Pendiri ke-9',
    role: 'Ketua Bidang Hukum dan Advokasi',
    status: 'active',
  },
  {
    id: 'pendiri-10',
    no: 10,
    name: 'Dr. Habib',
    position: 'Pendiri ke-10',
    role: 'Anggota Dewan Pengawas',
    status: 'active',
  },
  {
    id: 'pendiri-11',
    no: 11,
    name: 'Dr. Heri Solahudin',
    position: 'Pendiri ke-11',
    role: 'Anggota Dewan Penasehat',
    status: 'active',
  },
  {
    id: 'pendiri-12',
    no: 12,
    name: 'Ir. Endro Wuryanto, M.M.',
    position: 'Pendiri ke-12',
    role: 'Koordinator Bidang Infrastruktur Digital',
    status: 'active',
  },
  {
    id: 'pendiri-13',
    no: 13,
    name: 'Sae Tanangga Karim, S.E.',
    position: 'Pendiri ke-13',
    role: 'Koordinator Bidang Event Organizer',
    status: 'active',
  },
  {
    id: 'pendiri-14',
    no: 14,
    name: 'Hj. Inna Hadianala, S.E.',
    position: 'Pendiri ke-14',
    role: 'Koordinator Bidang Pengembangan SDM & Organisasi, Ex. Anggota DPRD Prov. Jawa Tengah',
    status: 'active',
  },
  {
    id: 'pendiri-15',
    no: 15,
    name: 'Andi Darmadji, S.E.',
    position: 'Pendiri ke-15',
    role: 'Koordinator Wilayah Kalimantan',
    status: 'active',
  },
  {
    id: 'pendiri-16',
    no: 16,
    name: '(Posisi Belum Terisi)',
    position: 'Pendiri ke-16',
    role: 'Vacant',
    status: 'vacant',
  },
  {
    id: 'pendiri-17',
    no: 17,
    name: 'dr. Hanson Barki',
    position: 'Pendiri ke-17',
    role: 'Koordinator Bidang Adab dan Budaya',
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
  status: 'active' | 'vacant' | 'plt' | 'pending';
  color: string;
}

export const KORDINATOR_BIDANG_17: Korbid[] = [
  {
    no: 1,
    kode: 'KORBID_ORGANISASI',
    bidang: 'Organisasi & Keanggotaan',
    ketua: 'Hj. Inna Hadianala, S.E.',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-14 | Koordinator Bidang Pengembangan SDM & Organisasi | Ex. Anggota DPRD Prov. Jawa Tengah',
    status: 'active',
    color: '#008F3D',
  },
  {
    no: 2,
    kode: 'KORBID_PANGAN',
    bidang: 'Pangan & Ketahanan Pangan',
    ketua: 'Dr. Habib',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-10 | Anggota Dewan Pengawas',
    status: 'active',
    color: '#22c55e',
  },
  {
    no: 3,
    kode: 'KORBID_INDUSTRI',
    bidang: 'Industri & Manufaktur',
    ketua: '(RAT Perdana)',
    sekretaris: '(Kosong)',
    catatan: 'Vacant — Akan diisi melalui RAT Perdana',
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
    catatan: 'Vacant — Akan diisi melalui RAT Perdana',
    status: 'vacant',
    color: '#ef4444',
  },
  {
    no: 6,
    kode: 'KORBID_KEUANGAN',
    bidang: 'Keuangan & Perbankan',
    ketua: 'Fawwaz Arif Al Jabar, S.E., M.M.',
    sekretaris: '(Kosong)',
    catatan: 'CFO & ESG Architect',
    status: 'active',
    color: '#3b82f6',
  },
  {
    no: 7,
    kode: 'KORBID_HOLDING',
    bidang: 'Holding Trading Ekosistem',
    ketua: 'H. Gugun Gunara, S.E.',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-7 | Wakil Sekretaris Jenderal / Grand Architect & COO',
    status: 'active',
    color: '#8B0000',
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
    kode: 'KORBID_ADAB_BUDAYA',
    bidang: 'Adab & Budaya',
    ketua: 'dr. Hanson Barki',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-17 | Koordinator Bidang Adab dan Budaya',
    status: 'active',
    color: '#8b5cf6',
  },
  {
    no: 11,
    kode: 'KORBID_HUKUM',
    bidang: 'Hukum & Advokasi',
    ketua: 'Mayor Art. (Purn.) Cecep Sumarno, S.I.P., S.H.',
    sekretaris: '(Kosong)',
    catatan: 'Pendiri ke-9 | Ketua Bidang Hukum dan Advokasi',
    status: 'active',
    color: '#6366f1',
  },
  {
    no: 12,
    kode: 'KORBID_HAJI_UMROH',
    bidang: 'Haji dan Umroh',
    ketua: 'H. Abu Bakar',
    sekretaris: '(Kosong)',
    catatan: 'Layanan Haji & Umroh Anggota',
    status: 'active',
    color: '#0ea5e9',
  },
  {
    no: 13,
    kode: 'KORBID_SDM',
    bidang: 'Pengembangan SDM & Diklat',
    ketua: '(Dalam Proses Pengesahan)',
    sekretaris: '(Kosong)',
    catatan: 'Dalam Proses Pengesahan',
    status: 'pending',
    color: '#14b8a6',
  },
  {
    no: 14,
    kode: 'KORBID_EKSPOR',
    bidang: 'Ekspor Impor & Perdagangan Internasional',
    ketua: '(Dalam Proses Pengesahan)',
    sekretaris: '(Kosong)',
    catatan: 'Dalam Proses Pengesahan',
    status: 'pending',
    color: '#f97316',
  },
  {
    no: 15,
    kode: 'KORBID_HUMAS',
    bidang: 'Hubungan Masyarakat & Media',
    ketua: '(Dalam Proses Pengesahan)',
    sekretaris: '(Kosong)',
    catatan: 'Dalam Proses Pengesahan',
    status: 'pending',
    color: '#a855f7',
  },
  {
    no: 16,
    kode: 'KORBID_TEKNOLOGI_INOVASI',
    bidang: 'Teknologi & Inovasi',
    ketua: '(Dalam Proses Pengesahan)',
    sekretaris: '(Kosong)',
    catatan: 'Dalam Proses Pengesahan',
    status: 'pending',
    color: '#22c55e',
  },
  {
    no: 17,
    kode: 'KORBID_KEMITRAAN_INTERNASIONAL',
    bidang: 'Kemitraan Internasional',
    ketua: '(Dalam Proses Pengesahan)',
    sekretaris: '(Kosong)',
    catatan: 'Dalam Proses Pengesahan',
    status: 'pending',
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
