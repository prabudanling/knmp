/**
 * Approve Pendaftaran API Route
 * POST /api/admin/pendaftaran/[id]/approve
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  logActivity,
  createNotification,
} from '@/lib/utils-server';
import { generateNIAK } from '@/lib/niak';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const { id } = await params;

      // Get pendaftaran
      const pendaftaran = await db.pendaftaran.findUnique({
        where: { id },
        include: {
          tier: true,
          payments: true,
        },
      });

      if (!pendaftaran) {
        return Response.json(
          errorResponse('Pendaftaran tidak ditemukan', 'NOT_FOUND'),
          { status: 404 }
        );
      }

      // Check if already approved
      if (pendaftaran.status === 'APPROVED') {
        return Response.json(
          errorResponse('Pendaftaran sudah disetujui', 'ALREADY_APPROVED'),
          { status: 400 }
        );
      }

      // Check payment status
      const paidPayment = pendaftaran.payments.find(p => p.status === 'PAID');
      if (!paidPayment) {
        return Response.json(
          errorResponse('Pembayaran belum selesai', 'PAYMENT_REQUIRED'),
          { status: 400 }
        );
      }

      // Get user
      const user = await db.user.findUnique({
        where: { id: pendaftaran.userId },
      });

      if (!user) {
        return Response.json(
          errorResponse('User tidak ditemukan', 'USER_NOT_FOUND'),
          { status: 404 }
        );
      }

      // Generate NIAK
      let niak = null;
      if (pendaftaran.tier?.code) {
        // Get KPA code
        let kpaCode = 'KPA_1_PRODUSEN_PEKERJA'; // default
        if (pendaftaran.kpaId) {
          const kpa = await db.kPA.findUnique({ where: { id: pendaftaran.kpaId } });
          if (kpa) kpaCode = kpa.code;
        }

        niak = await generateNIAK({
          provinsi: pendaftaran.provinsi?.slice(0, 2) || '00',
          kabKota: pendaftaran.kabKota?.slice(0, 2) || '00',
          kpaCode,
          tierCode: pendaftaran.tier.code,
        });
      }

      // Update pendaftaran
      const updatedPendaftaran = await db.pendaftaran.update({
        where: { id },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
          approvedBy: adminUser.id,
          niak,
        },
      });

      // Update user
      await db.user.update({
        where: { id: user.id },
        data: {
          status: 'ACTIVE',
          niak,
          approvedAt: new Date(),
          approvedBy: adminUser.id,
          joinDate: new Date(),
          tierId: pendaftaran.tierId,
          kpaId: pendaftaran.kpaId,
          simpananPokok: pendaftaran.tier?.price || 0,
        },
      });

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'APPROVE',
        entity: 'Pendaftaran',
        entityId: id,
        description: `Approved pendaftaran: ${pendaftaran.email}, NIAK: ${niak}`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      // Notify user
      await createNotification({
        userId: user.id,
        title: 'Pendaftaran Disetujui',
        message: `Selamat! Pendaftaran Anda telah disetujui. NIAK: ${niak}`,
        type: 'MEMBERSHIP',
        link: '/dashboard',
      });

      return Response.json(
        successResponse({
          id: updatedPendaftaran.id,
          niak,
          status: updatedPendaftaran.status,
        }, 'Pendaftaran berhasil disetujui')
      );
    } catch (error) {
      console.error('Approve pendaftaran error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
