/**
 * KMNMP Database Seed Script
 * Run with: bunx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ==================== TIERS ====================
  console.log('📦 Creating Tiers...');
  const tiers = await Promise.all([
    prisma.tier.upsert({
      where: { code: 'T1' },
      update: {},
      create: {
        code: 'T1',
        name: 'Tier 1 - Basic',
        price: 100000,
        description: 'Keanggotaan dasar dengan akses marketplace',
        benefits: JSON.stringify([
          'Akses Marketplace KMNMP',
          'Pelatihan Dasar',
          'Sertifikat Keanggotaan',
        ]),
        hasOperationalRights: false,
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.tier.upsert({
      where: { code: 'T2' },
      update: {},
      create: {
        code: 'T2',
        name: 'Tier 2 - Starter',
        price: 250000,
        description: 'Keanggotaan starter dengan fitur tambahan',
        benefits: JSON.stringify([
          'Semua fitur Tier 1',
          'Akses Logistik Digital',
          'Pelatihan Menengah',
          'Konsultasi Bisnis',
        ]),
        hasOperationalRights: false,
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.tier.upsert({
      where: { code: 'T3' },
      update: {},
      create: {
        code: 'T3',
        name: 'Tier 3 - Business',
        price: 500000,
        description: 'Keanggotaan bisnis dengan hak operasional',
        benefits: JSON.stringify([
          'Semua fitur Tier 2',
          'Hak Operasional Usaha',
          'Akses SHU Penuh',
          'Pelatihan Lanjutan',
          'Mentorship Program',
        ]),
        hasOperationalRights: true,
        sortOrder: 3,
        isActive: true,
      },
    }),
    prisma.tier.upsert({
      where: { code: 'T4' },
      update: {},
      create: {
        code: 'T4',
        name: 'Tier 4 - Professional',
        price: 1000000,
        description: 'Keanggotaan profesional',
        benefits: JSON.stringify([
          'Semua fitur Tier 3',
          'Akses Ekspor',
          'Branding Support',
          'Legal Support',
          'Financial Consulting',
        ]),
        hasOperationalRights: true,
        sortOrder: 4,
        isActive: true,
      },
    }),
    prisma.tier.upsert({
      where: { code: 'T5' },
      update: {},
      create: {
        code: 'T5',
        name: 'Tier 5 - Enterprise',
        price: 2500000,
        description: 'Keanggotaan enterprise',
        benefits: JSON.stringify([
          'Semua fitur Tier 4',
          'Dedicated Account Manager',
          'Priority Support',
          'Custom Integration',
          'Investment Opportunities',
        ]),
        hasOperationalRights: true,
        sortOrder: 5,
        isActive: true,
      },
    }),
    prisma.tier.upsert({
      where: { code: 'T6' },
      update: {},
      create: {
        code: 'T6',
        name: 'Tier 6 - Premium',
        price: 5000000,
        description: 'Keanggotaan premium',
        benefits: JSON.stringify([
          'Semua fitur Tier 5',
          'Board Meeting Access',
          'Strategic Partnership',
          'Exclusive Events',
        ]),
        hasOperationalRights: true,
        sortOrder: 6,
        isActive: true,
      },
    }),
    prisma.tier.upsert({
      where: { code: 'T7' },
      update: {},
      create: {
        code: 'T7',
        name: 'Tier 7 - Executive',
        price: 10000000,
        description: 'Keanggotaan eksekutif tertinggi',
        benefits: JSON.stringify([
          'Semua fitur Tier 6',
          'Advisory Board Position',
          'Equity Options',
          'VIP Access All Events',
          'Personal Business Consultant',
        ]),
        hasOperationalRights: true,
        sortOrder: 7,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${tiers.length} Tiers`);

  // ==================== KPA ====================
  console.log('👥 Creating KPA...');
  const kpas = await Promise.all([
    prisma.kPA.upsert({
      where: { code: 'KPA_1_PRODUCER' },
      update: {},
      create: {
        code: 'KPA_1_PRODUCER',
        name: 'Petani/Produsen',
        description: 'Kelompok produsen primer seperti petani, peternak, nelayan',
        icon: '🌾',
        color: '#22c55e',
        votingPower: 25,
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.kPA.upsert({
      where: { code: 'KPA_2_ENTREPRENEUR' },
      update: {},
      create: {
        code: 'KPA_2_ENTREPRENEUR',
        name: 'Pelaku UMKM',
        description: 'Usaha Mikro Kecil Menengah',
        icon: '🏪',
        color: '#3b82f6',
        votingPower: 20,
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.kPA.upsert({
      where: { code: 'KPA_3_COOPERATIVE' },
      update: {},
      create: {
        code: 'KPA_3_COOPERATIVE',
        name: 'Koperasi',
        description: 'Koperasi mitra dan anggota',
        icon: '🤝',
        color: '#8b5cf6',
        votingPower: 20,
        sortOrder: 3,
        isActive: true,
      },
    }),
    prisma.kPA.upsert({
      where: { code: 'KPA_4_WORKER' },
      update: {},
      create: {
        code: 'KPA_4_WORKER',
        name: 'Pekerja/Buruh',
        description: 'Kaum pekerja dan buruh',
        icon: '👷',
        color: '#f59e0b',
        votingPower: 10,
        sortOrder: 4,
        isActive: true,
      },
    }),
    prisma.kPA.upsert({
      where: { code: 'KPA_5_CONSUMER' },
      update: {},
      create: {
        code: 'KPA_5_CONSUMER',
        name: 'Konsumen',
        description: 'Konsumen dan pengguna jasa',
        icon: '🛒',
        color: '#ef4444',
        votingPower: 15,
        sortOrder: 5,
        isActive: true,
      },
    }),
    prisma.kPA.upsert({
      where: { code: 'KPA_6_INVESTOR' },
      update: {},
      create: {
        code: 'KPA_6_INVESTOR',
        name: 'Investor',
        description: 'Investor dan pemilik modal',
        icon: '💰',
        color: '#06b6d4',
        votingPower: 10,
        sortOrder: 6,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${kpas.length} KPA`);

  // ==================== ADMIN USER ====================
  console.log('👤 Creating Admin User...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kmnmp.id' },
    update: {},
    create: {
      email: 'admin@kmnmp.id',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      tierId: tiers[6].id, // T7
      kpaId: kpas[2].id, // Koperasi
      joinDate: new Date(),
      approvedAt: new Date(),
      simpananPokok: 10000000,
    },
  });
  console.log(`✅ Created Admin User: ${adminUser.email}`);

  // ==================== DEWAN PENDIRI ====================
  console.log('🏛️ Creating Dewan Pendiri...');
  const dewanPendiri = [
    { no: 1, name: 'Prof. Dr. H. Anwar Sanusi, SH, S.Pel, MM', position: 'Ketua Dewan Pendiri', role: 'Pendiri', status: 'ACTIVE' },
    { no: 2, name: 'Nama Disembunyikan', position: 'Wakil Ketua', role: 'Pendiri', status: 'ACTIVE' },
    { no: 3, name: 'Nama Disembunyikan', position: 'Sekretaris', role: 'Pendiri', status: 'ACTIVE' },
    { no: 4, name: 'Nama Disembunyikan', position: 'Bendahara', role: 'Pendiri', status: 'ACTIVE' },
    { no: 5, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 6, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 7, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 8, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 9, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 10, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 11, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 12, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 13, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 14, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 15, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 16, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
    { no: 17, name: 'Nama Disembunyikan', position: 'Anggota', role: 'Pendiri', status: 'ACTIVE' },
  ];

  for (const pendiri of dewanPendiri) {
    await prisma.dewanPendiri.upsert({
      where: { no: pendiri.no },
      update: { name: pendiri.name, position: pendiri.position, role: pendiri.role, status: pendiri.status },
      create: pendiri,
    });
  }
  console.log(`✅ Created ${dewanPendiri.length} Dewan Pendiri`);

  // ==================== KOORDINATOR BIDANG ====================
  console.log('📋 Creating Koordinator Bidang...');
  const korbid = [
    { no: 1, bidang: 'Pertanian & Peternakan', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 2, bidang: 'Perikanan & Kelautan', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 3, bidang: 'Industri & UMKM', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 4, bidang: 'Perdagangan & Distribusi', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 5, bidang: 'Teknologi & Digital', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 6, bidang: 'Pariwisata & Budaya', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 7, bidang: 'Kesehatan & Farmasi', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 8, bidang: 'Pendidikan & Pelatihan', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 9, bidang: 'Keuangan & Investasi', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 10, bidang: 'Infrastruktur & Lingkungan', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 11, bidang: 'Sosial & Kemanusiaan', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 12, bidang: 'Hukum & Advokasi', ketua: 'Tegar Ramadhan, SH', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 13, bidang: 'Komunikasi & Informasi', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 14, bidang: 'Ekonomi Kreatif', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 15, bidang: 'Energi & Sumber Daya', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 16, bidang: 'Teknologi & Inovasi', ketua: 'Prof. Dr. Teddy Mantoro, MSC., PHD., SMIEEE', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
    { no: 17, bidang: 'Kerjasama & Hubungan Internasional', ketua: 'Nama Disembunyikan', sekretaris: 'Nama Disembunyikan', status: 'FILLED' },
  ];

  for (const kb of korbid) {
    await prisma.koordinatorBidang.upsert({
      where: { no: kb.no },
      update: { bidang: kb.bidang, ketua: kb.ketua, sekretaris: kb.sekretaris, status: kb.status },
      create: kb,
    });
  }
  console.log(`✅ Created ${korbid.length} Koordinator Bidang`);

  // ==================== KORWIL ====================
  console.log('🗺️ Creating Korwil...');
  const korwilData = [
    { no: 1, kawasan: 'Sumatera', cakupan: 'Aceh, Sumut, Sumbar, Riau, Jambi, Sumsel, Bengkulu, Lampung, Bangka Belitung, Kepri', prioritas: true },
    { no: 2, kawasan: 'Jawa Barat', cakupan: 'Banten, DKI Jakarta, Jawa Barat', prioritas: true },
    { no: 3, kawasan: 'Jawa Tengah', cakupan: 'Jawa Tengah, DI Yogyakarta', prioritas: true },
    { no: 4, kawasan: 'Jawa Timur', cakupan: 'Jawa Timur', prioritas: true },
    { no: 5, kawasan: 'Kalimantan', cakupan: 'Kalbar, Kalteng, Kalsel, Kaltim, Kalut', prioritas: false },
    { no: 6, kawasan: 'Sulawesi', cakupan: 'Sulut, Sulteng, Sulsel, Sultra, Gorontalo, Sulbar', prioritas: false },
    { no: 7, kawasan: 'Bali Nusra', cakupan: 'Bali, NTB, NTT', prioritas: false },
    { no: 8, kawasan: 'Maluku Papua', cakupan: 'Maluku, Maluku Utara, Papua, Papua Barat', prioritas: false },
  ];

  for (const kw of korwilData) {
    await prisma.korwil.upsert({
      where: { no: kw.no },
      update: { kawasan: kw.kawasan, cakupan: kw.cakupan, prioritas: kw.prioritas },
      create: { ...kw, status: 'VACANT' },
    });
  }
  console.log(`✅ Created ${korwilData.length} Korwil`);

  // ==================== PROVINSI ====================
  console.log('🏛️ Creating Provinsi...');
  const provinsiData = [
    { code: '11', name: 'Aceh' },
    { code: '12', name: 'Sumatera Utara' },
    { code: '13', name: 'Sumatera Barat' },
    { code: '14', name: 'Riau' },
    { code: '15', name: 'Jambi' },
    { code: '16', name: 'Sumatera Selatan' },
    { code: '17', name: 'Bengkulu' },
    { code: '18', name: 'Lampung' },
    { code: '19', name: 'Kepulauan Bangka Belitung' },
    { code: '21', name: 'Kepulauan Riau' },
    { code: '31', name: 'DKI Jakarta' },
    { code: '32', name: 'Jawa Barat' },
    { code: '33', name: 'Jawa Tengah' },
    { code: '34', name: 'DI Yogyakarta' },
    { code: '35', name: 'Jawa Timur' },
    { code: '36', name: 'Banten' },
    { code: '51', name: 'Bali' },
    { code: '52', name: 'Nusa Tenggara Barat' },
    { code: '53', name: 'Nusa Tenggara Timur' },
    { code: '61', name: 'Kalimantan Barat' },
    { code: '62', name: 'Kalimantan Tengah' },
    { code: '63', name: 'Kalimantan Selatan' },
    { code: '64', name: 'Kalimantan Timur' },
    { code: '65', name: 'Kalimantan Utara' },
    { code: '71', name: 'Sulawesi Utara' },
    { code: '72', name: 'Sulawesi Tengah' },
    { code: '73', name: 'Sulawesi Selatan' },
    { code: '74', name: 'Sulawesi Tenggara' },
    { code: '75', name: 'Gorontalo' },
    { code: '76', name: 'Sulawesi Barat' },
    { code: '81', name: 'Maluku' },
    { code: '82', name: 'Maluku Utara' },
    { code: '91', name: 'Papua' },
    { code: '92', name: 'Papua Barat' },
  ];

  for (const prov of provinsiData) {
    await prisma.provinsi.upsert({
      where: { code: prov.code },
      update: { name: prov.name },
      create: prov,
    });
  }
  console.log(`✅ Created ${provinsiData.length} Provinsi`);

  // ==================== SETTINGS ====================
  console.log('⚙️ Creating Settings...');
  const settings = [
    { key: 'site.name', value: 'KMNMP', type: 'STRING', description: 'Nama situs' },
    { key: 'site.description', value: 'Koperasi Multipihak Nusa Merah Putih', type: 'STRING', description: 'Deskripsi situs' },
    { key: 'site.email', value: 'info@kmnmp.id', type: 'STRING', description: 'Email kontak' },
    { key: 'site.phone', value: '+62 21 12345678', type: 'STRING', description: 'Nomor telepon' },
    { key: 'site.address', value: 'Jakarta, Indonesia', type: 'STRING', description: 'Alamat' },
    { key: 'registration.enabled', value: 'true', type: 'BOOL', description: 'Status pendaftaran' },
    { key: 'registration.message', value: 'Pendaftaran anggota baru sedang dibuka', type: 'STRING', description: 'Pesan pendaftaran' },
    { key: 'payment.va_enabled', value: 'true', type: 'BOOL', description: 'Status VA payment' },
    { key: 'payment.qris_enabled', value: 'true', type: 'BOOL', description: 'Status QRIS payment' },
    { key: 'shu.distribution_month', value: '3', type: 'INT', description: 'Bulan distribusi SHU (1-12)' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`✅ Created ${settings.length} Settings`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('   Email: admin@kmnmp.id');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
