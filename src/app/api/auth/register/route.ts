/**
 * Registration API Route
 * POST /api/auth/register
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  isValidEmail, 
  isValidPhone,
  validatePassword,
  logActivity,
  generateOrderCode,
} from '@/lib/utils-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaLengkap,
      email,
      phone,
      password,
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
      tierId,
      kpaId,
    } = body;

    // Validate required fields
    if (!namaLengkap || !email || !phone || !password || !tierId) {
      return Response.json(
        errorResponse('Data tidak lengkap. Mohon isi semua field wajib.', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return Response.json(
        errorResponse('Format email tidak valid', 'INVALID_EMAIL'),
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return Response.json(
        errorResponse('Format nomor telepon tidak valid', 'INVALID_PHONE'),
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return Response.json(
        errorResponse(passwordValidation.errors.join('. '), 'WEAK_PASSWORD'),
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return Response.json(
        errorResponse('Email sudah terdaftar', 'EMAIL_EXISTS'),
        { status: 400 }
      );
    }

    // Check if tier exists
    const tier = await db.tier.findUnique({
      where: { id: tierId },
    });

    if (!tier) {
      return Response.json(
        errorResponse('Tier tidak ditemukan', 'TIER_NOT_FOUND'),
        { status: 400 }
      );
    }

    // Generate registration number
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const count = await db.pendaftaran.count({
      where: {
        createdAt: {
          gte: new Date(year, now.getMonth(), 1),
          lt: new Date(year, now.getMonth() + 1, 1),
        },
      },
    });
    const nomorPendaftaran = `REG-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;

    // Create pendaftaran (registration) record
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
        tierId,
        kpaId,
        status: 'PENDING',
      },
    });

    // Create user account (pending status)
    const hashedPassword = hashPassword(password);
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: namaLengkap,
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
        tierId,
        kpaId,
        status: 'PENDING',
        role: 'MEMBER',
      },
    });

    // Link user to pendaftaran
    await db.pendaftaran.update({
      where: { id: pendaftaran.id },
      data: { userId: user.id },
    });

    // Create payment record
    const payment = await db.payment.create({
      data: {
        orderId: generateOrderCode('PAY'),
        pendaftaranId: pendaftaran.id,
        userId: user.id,
        amount: tier.price,
        status: 'PENDING',
        expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Log activity
    await logActivity({
      userId: user.id,
      action: 'REGISTER',
      entity: 'Pendaftaran',
      entityId: pendaftaran.id,
      description: `New registration: ${email}`,
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    return Response.json(
      successResponse({
        pendaftaran: {
          id: pendaftaran.id,
          nomorPendaftaran: pendaftaran.nomorPendaftaran,
          status: pendaftaran.status,
        },
        payment: {
          id: payment.id,
          orderId: payment.orderId,
          amount: payment.amount,
          status: payment.status,
          expiredAt: payment.expiredAt,
        },
      }, 'Pendaftaran berhasil. Silakan lakukan pembayaran.')
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}
