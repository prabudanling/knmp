/**
 * Reject Pendaftaran API Route
 * POST /api/admin/pendaftaran/[id]/reject
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const { id } = await params;
      const body = await request.json();
      const { reason } = body;

      // Get pendaftaran
      const pendaftaran = await db.pendaftaran.findUnique({
        where: { id },
      });

      if (!pendaftaran) {
        return Response.json(
          errorResponse('Pendaftaran tidak ditemukan', 'NOT_FOUND'),
          { status: 404 }
        );
      }

      // Check if already processed
      if (pendaftaran.status === 'APPROVED' || pendaftaran.status === 'REJECTED') {
        return Response.json(
          errorResponse('Pendaftaran sudah diproses', 'ALREADY_PROCESSED'),
          { status: 400 }
        );
      }

      // Update pendaftaran
      const updatedPendaftaran = await db.pendaftaran.update({
        where: { id },
        data: {
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectedBy: adminUser.id,
          rejectedReason: reason || 'Tidak memenuhi syarat',
        },
      });

      // Update user if exists
      if (pendaftaran.userId) {
        await db.user.update({
          where: { id: pendaftaran.userId },
          data: {
            status: 'REJECTED',
            rejectedAt: new Date(),
            rejectedReason: reason || 'Tidak memenuhi syarat',
          },
        });

        // Notify user
        await createNotification({
          userId: pendaftaran.userId,
          title: 'Pendaftaran Ditolak',
          message: `Maaf, pendaftaran Anda ditolak. Alasan: ${reason || 'Tidak memenuhi syarat'}`,
          type: 'MEMBERSHIP',
        });
      }

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'REJECT',
        entity: 'Pendaftaran',
        entityId: id,
        description: `Rejected pendaftaran: ${pendaftaran.email}. Reason: ${reason}`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      return Response.json(
        successResponse({
          id: updatedPendaftaran.id,
          status: updatedPendaftaran.status,
        }, 'Pendaftaran telah ditolak')
      );
    } catch (error) {
      console.error('Reject pendaftaran error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
