/**
 * Verify Payment API Route
 * POST /api/admin/payments/[id]/verify
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

      // Get payment
      const payment = await db.payment.findUnique({
        where: { id },
        include: {
          pendaftaran: {
            include: { tier: true },
          },
          user: true,
        },
      });

      if (!payment) {
        return Response.json(
          errorResponse('Pembayaran tidak ditemukan', 'NOT_FOUND'),
          { status: 404 }
        );
      }

      // Check if already verified
      if (payment.status === 'PAID') {
        return Response.json(
          errorResponse('Pembayaran sudah terverifikasi', 'ALREADY_PAID'),
          { status: 400 }
        );
      }

      // Update payment
      const updatedPayment = await db.payment.update({
        where: { id },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      });

      // Update pendaftaran status
      if (payment.pendaftaran) {
        await db.pendaftaran.update({
          where: { id: payment.pendaftaranId },
          data: {
            status: 'PAYMENT_PENDING', // Ready for approval
          },
        });
      }

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'VERIFY',
        entity: 'Payment',
        entityId: id,
        description: `Verified payment: ${payment.orderId}`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      // Notify user
      if (payment.user) {
        await createNotification({
          userId: payment.user.id,
          title: 'Pembayaran Terverifikasi',
          message: `Pembayaran Anda sebesar Rp ${payment.amount.toLocaleString('id-ID')} telah diverifikasi.`,
          type: 'PAYMENT',
        });
      }

      return Response.json(
        successResponse({
          id: updatedPayment.id,
          status: updatedPayment.status,
          paidAt: updatedPayment.paidAt,
        }, 'Pembayaran berhasil diverifikasi')
      );
    } catch (error) {
      console.error('Verify payment error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
