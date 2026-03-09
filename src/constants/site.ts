// ============================================
// KOPNUSA Site Configuration
// ============================================

export const SITE_CONFIG = {
  name: 'KOPNUSA',
  fullName: 'Koperasi Nusantara Merah Putih',
  tagline: 'Digital Operating System Desa Indonesia',
  description: 'Menghubungkan 83.763 desa Indonesia dengan pasar global melalui transformasi digital, tata kelola demokratis, dan gotong royong ekonomi kerakyatan.',
  url: 'https://kopnusa.id',
  version: '1.0.0',
  
  // Contact
  contact: {
    email: 'info@kopnusa.id',
    phone: '+62 21 1234 5678',
    whatsapp: '+62 812 3456 7890',
    address: 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345, Indonesia',
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
    title: 'KOPNUSA - Koperasi Nusantara Merah Putih | Digital OS Desa Indonesia',
    description: 'Portal resmi Koperasi Nusantara Merah Putih (KNMP). Mengintegrasikan 83.763 desa, 6 Kelompok Pihak Anggota, marketplace zonasi, logistik digital, dan smart village dashboard.',
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
  
  // Brand
  brand: {
    primaryColor: '#8B0000',
    secondaryColor: '#D4AF37',
    accentColor: '#1a1a2e',
  },
};

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/visi-misi', label: 'Visi Misi' },
  { href: '/kpa', label: '6 KPA' },
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
    { href: '/rat', label: 'RAT & Governance' },
    { href: '/unit-usaha', label: 'Unit Usaha' },
    { href: '/kpa', label: '6 Kelompok Pihak Anggota' },
  ],
  company: [
    { href: '/tentang', label: 'Tentang KNMP' },
    { href: '/visi-misi', label: 'Visi & Misi' },
    { href: '/faq', label: 'FAQ' },
    { href: '/kontak', label: 'Hubungi Kami' },
  ],
  legal: [
    { href: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
    { href: '/syarat-ketentuan', label: 'Syarat & Ketentuan' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
};
