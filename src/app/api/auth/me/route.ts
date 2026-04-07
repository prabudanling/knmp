/**
 * Get Current User API Route
 * GET /api/auth/me
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/utils-server';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return Response.json(
        errorResponse('Unauthorized', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    // Get full user info
    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        niak: true,
        nik: true,
        phone: true,
        tempatLahir: true,
        tanggalLahir: true,
        jenisKelamin: true,
        alamat: true,
        rt: true,
        rw: true,
        kelurahan: true,
        kecamatan: true,
        kabKota: true,
        provinsi: true,
        kodePos: true,
        fotoKtp: true,
        fotoDiri: true,
        tierId: true,
        tier: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        kpaId: true,
        kpa: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        simpananPokok: true,
        simpananWajib: true,
        simpananSukarela: true,
        joinDate: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!fullUser) {
      return Response.json(
        errorResponse('User tidak ditemukan', 'USER_NOT_FOUND'),
        { status: 404 }
      );
    }

    return Response.json(
      successResponse(fullUser)
    );
  } catch (error) {
    console.error('Get current user error:', error);
    return Response.json(
      errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}
