/**
 * Admin Pendaftaran [id] API
 * GET /api/admin/pendaftaran/[id] - Get registration details
 * PUT /api/admin/pendaftaran/[id] - Update registration (approve/reject)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { generateNIAK } from '@/lib/niak';
import { hashPassword } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get registration details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser(request);

    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const pendaftaran = await db.pendaftaran.findUnique({
      where: { id },
      include: {
        tier: true,
        payments: {
          orderBy: { createdAt: 'desc' },
        },
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
      data: pendaftaran,
    });
  } catch (error) {
    console.error('Get pendaftaran detail error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// PUT - Update registration (approve/reject)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser(request);

    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { action, notes, rejectedReason, provinsi, kabKota } = body;

    const pendaftaran = await db.pendaftaran.findUnique({
      where: { id },
      include: { tier: true },
    });

    if (!pendaftaran) {
      return NextResponse.json(
        { success: false, error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      // Generate NIAK
      const niak = await generateNIAK({
        provinsi: provinsi || '00',
        kabKota: kabKota || '00',
        kpaCode: pendaftaran.kpaId || 'KPA_1_PRODUCER',
        tierCode: pendaftaran.tier.code,
      });

      // Create user
      const newUser = await db.user.create({
        data: {
          niak,
          email: pendaftaran.email,
          name: pendaftaran.namaLengkap,
          phone: pendaftaran.phone,
          password: hashPassword('password123'), // Default password, should be changed
          nik: pendaftaran.nik,
          tempatLahir: pendaftaran.tempatLahir,
          tanggalLahir: pendaftaran.tanggalLahir,
          jenisKelamin: pendaftaran.jenisKelamin,
          alamat: pendaftaran.alamat,
          rt: pendaftaran.rt,
          rw: pendaftaran.rw,
          kelurahan: pendaftaran.kelurahan,
          kecamatan: pendaftaran.kecamatan,
          kabKota: pendaftaran.kabKota,
          provinsi: pendaftaran.provinsi,
          kodePos: pendaftaran.kodePos,
          fotoKtp: pendaftaran.fotoKtp,
          fotoDiri: pendaftaran.fotoDiri,
          tierId: pendaftaran.tierId,
          kpaId: pendaftaran.kpaId,
          status: 'ACTIVE',
          role: 'MEMBER',
          joinDate: new Date(),
          approvedAt: new Date(),
          approvedBy: user.id,
        },
      });

      // Update pendaftaran
      await db.pendaftaran.update({
        where: { id },
        data: {
          status: 'APPROVED',
          niak,
          userId: newUser.id,
          approvedAt: new Date(),
          approvedBy: user.id,
          notes,
        },
      });

      // Log activity
      await db.activityLog.create({
        data: {
          userId: user.id,
          action: 'APPROVE',
          entity: 'Pendaftaran',
          entityId: id,
          description: `Approved pendaftaran ${pendaftaran.nomorPendaftaran}, NIAK: ${niak}`,
        },
      });

      return NextResponse.json({
        success: true,
        data: {
          niak,
          userId: newUser.id,
        },
        message: 'Pendaftaran berhasil disetujui',
      });
    }

    if (action === 'reject') {
      await db.pendaftaran.update({
        where: { id },
        data: {
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectedBy: user.id,
          rejectedReason,
          notes,
        },
      });

      // Log activity
      await db.activityLog.create({
        data: {
          userId: user.id,
          action: 'REJECT',
          entity: 'Pendaftaran',
          entityId: id,
          description: `Rejected pendaftaran ${pendaftaran.nomorPendaftaran}: ${rejectedReason}`,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Pendaftaran ditolak',
      });
    }

    if (action === 'review') {
      await db.pendaftaran.update({
        where: { id },
        data: {
          status: 'DOCUMENT_REVIEW',
          reviewedAt: new Date(),
          reviewedBy: user.id,
          notes,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Status diubah ke Document Review',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Update pendaftaran error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
