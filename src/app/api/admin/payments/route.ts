/**
 * Admin Payments API Route
 * GET /api/admin/payments - List payments
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  paginatedResponse,
  logActivity,
  createNotification,
} from '@/lib/utils-server';

// GET - List payments with pagination and filters
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || '';
      const paymentType = searchParams.get('paymentType') || '';
      const startDate = searchParams.get('startDate') || '';
      const endDate = searchParams.get('endDate') || '';

      const skip = (page - 1) * limit;

      // Build where clause
      const where: Record<string, unknown> = {};
      
      if (search) {
        where.OR = [
          { orderId: { contains: search } },
          { transactionId: { contains: search } },
          { vaNumber: { contains: search } },
        ];
      }
      
      if (status) {
        where.status = status;
      }
      
      if (paymentType) {
        where.paymentType = paymentType;
      }

      if (startDate) {
        where.createdAt = { ...where.createdAt as object, gte: new Date(startDate) };
      }

      if (endDate) {
        where.createdAt = { ...where.createdAt as object, lte: new Date(endDate) };
      }

      // Get total count
      const total = await db.payment.count({ where });

      // Get payments
      const payments = await db.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          pendaftaran: {
            select: {
              id: true,
              nomorPendaftaran: true,
              namaLengkap: true,
              email: true,
              phone: true,
              tier: {
                select: { id: true, code: true, name: true },
              },
            },
          },
          user: {
            select: { id: true, name: true, email: true, niak: true },
          },
        },
      });

      return Response.json(
        paginatedResponse(payments, page, limit, total)
      );
    } catch (error) {
      console.error('List payments error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
