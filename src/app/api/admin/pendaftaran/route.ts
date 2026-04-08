/**
 * Admin Pendaftaran (Registration) API Route
 * GET /api/admin/pendaftaran - List registrations
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
import { generateNIAK } from '@/lib/niak';

// GET - List pendaftaran with pagination and filters
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || '';
      const tierId = searchParams.get('tierId') || '';

      const skip = (page - 1) * limit;

      // Build where clause
      const where: Record<string, unknown> = {};
      
      if (search) {
        where.OR = [
          { namaLengkap: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
          { nik: { contains: search } },
          { nomorPendaftaran: { contains: search } },
        ];
      }
      
      if (status) {
        where.status = status;
      }
      
      if (tierId) {
        where.tierId = tierId;
      }

      // Get total count
      const total = await db.pendaftaran.count({ where });

      // Get pendaftaran
      const pendaftaran = await db.pendaftaran.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          tier: {
            select: { id: true, code: true, name: true, price: true },
          },
          payments: {
            select: {
              id: true,
              orderId: true,
              amount: true,
              status: true,
              paidAt: true,
            },
          },
          user: {
            select: { id: true, niak: true, status: true },
          },
        },
      });

      return Response.json(
        paginatedResponse(pendaftaran, page, limit, total)
      );
    } catch (error) {
      console.error('List pendaftaran error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}

// GET stats - Get pendaftaran statistics
export async function getStats(request: NextRequest) {
  return withAdminAuth(request, async () => {
    try {
      const stats = await db.pendaftaran.groupBy({
        by: ['status'],
        _count: true,
      });

      const total = await db.pendaftaran.count();
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayCount = await db.pendaftaran.count({
        where: { createdAt: { gte: today } },
      });

      return Response.json(
        successResponse({
          total,
          today: todayCount,
          byStatus: stats,
        })
      );
    } catch (error) {
      console.error('Pendaftaran stats error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
