/**
 * SHU Distribute API Route
 * POST /api/admin/shu/distribute - Distribute SHU to members
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

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const body = await request.json();
      const { configId, distributionIds } = body;

      // Get config
      const config = await db.sHUConfig.findUnique({
        where: { id: configId },
      });

      if (!config) {
        return Response.json(
          errorResponse('SHU config tidak ditemukan', 'NOT_FOUND'),
          { status: 404 }
        );
      }

      if (config.status !== 'DISTRIBUTING') {
        return Response.json(
          errorResponse('SHU harus dalam status DISTRIBUTING', 'INVALID_STATUS'),
          { status: 400 }
        );
      }

      // Get distributions to process
      const whereClause = distributionIds 
        ? { id: { in: distributionIds }, configId }
        : { configId, status: 'PENDING' };

      const distributions = await db.sHUDistribution.findMany({
        where: whereClause,
        include: {
          user: {
            select: { id: true, name: true, email: true, niak: true },
          },
        },
      });

      if (distributions.length === 0) {
        return Response.json(
          errorResponse('Tidak ada distribusi yang perlu diproses', 'NO_DISTRIBUTIONS'),
          { status: 400 }
        );
      }

      // Process distributions
      const results = [];
      const errors = [];

      for (const distribution of distributions) {
        try {
          // In a real app, you would integrate with payment gateway here
          // For now, we'll just mark as distributed

          await db.sHUDistribution.update({
            where: { id: distribution.id },
            data: {
              status: 'DISTRIBUTED',
              distributedAt: new Date(),
              method: 'TRANSFER',
            },
          });

          // Notify user
          await createNotification({
            userId: distribution.userId,
            title: 'SHU Telah Didistribusikan',
            message: `SHU tahun ${config.year} sebesar Rp ${distribution.total.toLocaleString('id-ID')} telah ditransfer ke rekening Anda.`,
            type: 'SHU',
          });

          results.push({
            id: distribution.id,
            userId: distribution.userId,
            name: distribution.user.name,
            total: distribution.total,
            status: 'DISTRIBUTED',
          });
        } catch (err) {
          errors.push({
            id: distribution.id,
            userId: distribution.userId,
            error: err instanceof Error ? err.message : 'Unknown error',
          });
        }
      }

      // Check if all distributions are done
      const pendingCount = await db.sHUDistribution.count({
        where: { configId, status: 'PENDING' },
      });

      if (pendingCount === 0) {
        await db.sHUConfig.update({
          where: { id: configId },
          data: {
            status: 'COMPLETED',
            distributedAt: new Date(),
          },
        });
      }

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'DISTRIBUTE',
        entity: 'SHUConfig',
        entityId: configId,
        description: `Distributed SHU to ${results.length} members`,
        metadata: { success: results.length, errors: errors.length },
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      return Response.json(
        successResponse({
          config: {
            id: config.id,
            year: config.year,
          },
          results,
          errors,
          summary: {
            total: distributions.length,
            success: results.length,
            failed: errors.length,
            pending: pendingCount,
          },
        }, `SHU berhasil didistribusikan ke ${results.length} anggota`)
      );
    } catch (error) {
      console.error('Distribute SHU error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
