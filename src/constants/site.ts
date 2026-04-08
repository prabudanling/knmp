// ============================================
// KOPNUSA Site Configuration
// ============================================

export const SITE_CONFIG = {
  name: 'KOPNUSA',
  fullName: 'Koperasi Korporasi Multipihak Nusa Merah Putih',
  tagline: 'Digital Operating System Desa Indonesia',
  description: 'Digital Operating System Desa Indonesia — mengintegrasikan 83.763 desa dan 8.506 kelurahan ke dalam satu ekosistem ekonomi berdaulat berdasarkan AD/ART KKMNMP Super Final Versi 7.',
  url: 'https://kopnusa.id',
  version: '2.0.0',
  
  // Contact
  contact: {
    email: 'info@kopnusa.id',
    phone: '+62 21 3983 8888',
    whatsapp: '+62 812 3456 7890',
    address: 'Menara Cakrawala 12th Floor, Jl. MH Thamrin Kav. 9, Menteng, Jakarta Pusat 10340',
    officeHours: 'Senin - Jumat: 08:00 - 17:00 WIB',
  },
  
  // Social Media
  social: {
    instagram: 'https://instagram.com/kopnusa.id',
    twitter: 'https://twitter.com/kopnusa_id',
    youtube: 'https://youtube.com/@kopnusa',
    linkedin: 'https://linkedin.com/company/kopnusa',
    facebook: 'https://facebook.com/kopnusa.id',
    tiktok: 'https://tiktok.com/@kopnusa.id',
  },
  
  // SEO
  seo: {
    title: 'KOPNUSA - Koperasi Korporasi Multipihak Nusa Merah Putih | Digital OS Desa Indonesia',
    description: 'Portal resmi Koperasi Korporasi Multipihak Nusa Merah Putih (KKMNMP/KNMP). Mengintegrasikan 83.763 desa, 5 Kelompok Pihak Anggota (KPA), marketplace zonasi, logistik digital, dan smart village dashboard.',
    keywords: [
      'koperasi', 'koperasi digital', 'KNMP', 'KOPNUSA', 
      'koperasi nusantara merah putih', 'desa digital', 
      'smart village', 'marketplace desa', 'logistik desa',
      'koperasi multipihak', 'BUMDes', 'KDMP', 'KDM', 'KOPNUSA'
    ],
    ogImage: '/images/og-image.jpg',
  },
  
  // Legal
  legal: {
    foundingYear: 2026,
    licenseNumber: 'AHU-0001234.AH.01.01.Tahun 2026',
    npwp: '00.000.000.0-000.000',
  },
  
  // Brand - PPP Green & Maroon
  brand: {
    primaryColor: '#008F3D',     // Hijau PPP
    secondaryColor: '#8B0000',   // Merah Tua
    accentColor: '#1A1A1A',      // Soft Black
  },
};

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/nusa-futuristik', label: 'Nusa Futuristik' },
  { href: '/struktur-organisasi', label: 'Struktur Organisasi' },
  { href: '/visi-misi', label: 'Visi Misi' },
  { href: '/kpa', label: '5 KPA (Anggota)' },
  { href: '/unit-usaha', label: 'Unit Usaha' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/logistik', label: 'Logistik' },
  { href: '/smart-village', label: 'Smart Village' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/shu', label: 'SHU' },
  { href: '/rat', label: 'RAT' },
  { href: '/integrasi-desa', label: 'Integrasi Desa' },
  { href: '/academy', label: 'Academy' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kontak', label: 'Kontak' },
];

export const FOOTER_LINKS = {
  platform: [
    { href: '/marketplace', label: 'Marketplace Zonasi' },
    { href: '/logistik', label: 'Logistik Digital' },
    { href: '/smart-village', label: 'Smart Village' },
    { href: '/academy', label: 'JE-P3 Academy' },
    { href: '/integrasi-desa', label: 'Integrasi Desa' },
  ],
  cooperative: [
    { href: '/shu', label: 'SHU Transparansi' },
    { href: '/rat', label: 'RAT & E-Voting' },
    { href: '/unit-usaha', label: 'Unit Usaha' },
    { href: '/kpa', label: '5 Kelompok Pihak Anggota (KPA)' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/membership', label: 'Keanggotaan' },
  ],
  company: [
    { href: '/tentang', label: 'Tentang KNMP' },
    { href: '/struktur-organisasi', label: 'Struktur Organisasi' },
    { href: '/visi-misi', label: 'Visi & Misi' },
    { href: '/faq', label: 'FAQ' },
    { href: '/kontak', label: 'Hubungi Kami' },
    { href: '/docs', label: 'Dokumentasi' },
  ],
  legal: [
    { href: '/anggaran-dasar', label: 'Anggaran Dasar (AD)' },
    { href: '/anggaran-rumah-tangga', label: 'Anggaran Rumah Tangga (ART)' },
    { href: '/kode-etik', label: 'Kode Etik KKMNMP' },
    { href: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
    { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
};
