/**
 * Pendaftaran API - Public
 * POST /api/pendaftaran - Submit new registration
 * GET /api/pendaftaran - Get registration status (by email or phone)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Generate registration number
async function generateRegistrationNumber(): Promise<string> {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  
  // Get count for this month
  const count = await db.pendaftaran.count({
    where: {
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), 1),
        lt: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      },
    },
  });
  
  const sequence = (count + 1).toString().padStart(4, '0');
  return `REG-${yearMonth}-${sequence}`;
}

// POST /api/pendaftaran - Submit new registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaLengkap,
      email,
      phone,
      nik,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
      rt,
      rw,
      kelurahan,
      kecamatan,
      kabKota,
      provinsi,
      kodePos,
      fotoKtp,
      fotoDiri,
      tierId,
      kpaId,
    } = body;

    // Validation
    if (!namaLengkap || !email || !phone || !tierId) {
      return NextResponse.json(
        { success: false, error: 'Data tidak lengkap. Nama, email, telepon, dan tier harus diisi.' },
        { status: 400 }
      );
    }

    // Check if email already registered
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar. Silakan gunakan email lain.' },
        { status: 400 }
      );
    }

    // Check if there's pending registration with same email
    const existingRegistration = await db.pendaftaran.findFirst({
      where: {
        email: email.toLowerCase(),
        status: { in: ['PENDING', 'DOCUMENT_REVIEW', 'PAYMENT_PENDING'] },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'Sudah ada pendaftaran dengan email ini yang sedang diproses.' },
        { status: 400 }
      );
    }

    // Validate tier exists
    const tier = await db.tier.findUnique({
      where: { id: tierId },
    });

    if (!tier) {
      return NextResponse.json(
        { success: false, error: 'Tier tidak valid' },
        { status: 400 }
      );
    }

    // Create registration
    const nomorPendaftaran = await generateRegistrationNumber();

    const pendaftaran = await db.pendaftaran.create({
      data: {
        nomorPendaftaran,
        namaLengkap,
        email: email.toLowerCase(),
        phone,
        nik,
        tempatLahir,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        jenisKelamin,
        alamat,
        rt,
        rw,
        kelurahan,
        kecamatan,
        kabKota,
        provinsi,
        kodePos,
        fotoKtp,
        fotoDiri,
        tierId,
        kpaId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: pendaftaran.id,
        nomorPendaftaran: pendaftaran.nomorPendaftaran,
        status: pendaftaran.status,
        createdAt: pendaftaran.createdAt,
      },
      message: 'Pendaftaran berhasil dikirim. Silakan tunggu verifikasi.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}

// GET /api/pendaftaran - Check registration status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const nomorPendaftaran = searchParams.get('nomorPendaftaran');

    if (!email && !phone && !nomorPendaftaran) {
      return NextResponse.json(
        { success: false, error: 'Masukkan email, nomor telepon, atau nomor pendaftaran' },
        { status: 400 }
      );
    }

    const where: Record<string, unknown> = {};
    if (email) where.email = email.toLowerCase();
    if (phone) where.phone = phone;
    if (nomorPendaftaran) where.nomorPendaftaran = nomorPendaftaran;

    const pendaftaran = await db.pendaftaran.findFirst({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        tier: { select: { code: true, name: true, price: true } },
      },
    });

    if (!pendaftaran) {
      return NextResponse.json(
        { success: false, error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        nomorPendaftaran: pendaftaran.nomorPendaftaran,
        namaLengkap: pendaftaran.namaLengkap,
        status: pendaftaran.status,
        tier: pendaftaran.tier,
        createdAt: pendaftaran.createdAt,
        reviewedAt: pendaftaran.reviewedAt,
        approvedAt: pendaftaran.approvedAt,
        niak: pendaftaran.niak,
        rejectedReason: pendaftaran.rejectedReason,
      },
    });
  } catch (error) {
    console.error('Check registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
