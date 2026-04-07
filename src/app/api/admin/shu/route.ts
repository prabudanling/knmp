/**
 * Admin SHU API Route
 * GET /api/admin/shu - List SHU configs
 * POST /api/admin/shu - Create SHU config
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  paginatedResponse,
  logActivity,
} from '@/lib/utils-server';

// GET - List SHU configs
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      const { searchParams } = new URL(request.url);
      const year = searchParams.get('year');

      const where = year ? { year: parseInt(year) } : {};

      const configs = await db.sHUConfig.findMany({
        where,
        orderBy: { year: 'desc' },
        include: {
          _count: {
            select: { distributions: true },
          },
        },
      });

      return Response.json(
        successResponse(configs)
      );
    } catch (error) {
      console.error('List SHU configs error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}

// POST - Create SHU config
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const body = await request.json();
      const {
        year,
        totalSHU,
        danaCadangan,
        jasaModal,
        jasaUsaha,
        danaPengurus,
        danaPendidikan,
        danaSosial,
        danaTeknologi,
      } = body;

      // Validate year
      const existingConfig = await db.sHUConfig.findUnique({
        where: { year },
      });

      if (existingConfig) {
        return Response.json(
          errorResponse('SHU config untuk tahun ini sudah ada', 'YEAR_EXISTS'),
          { status: 400 }
        );
      }

      // Validate percentages total 100% (excluding danaTeknologi which is part of the total)
      const totalPercentage = 
        (danaCadangan || 20) + 
        (jasaModal || 25) + 
        (jasaUsaha || 35) + 
        (danaPengurus || 5) + 
        (danaPendidikan || 5) + 
        (danaSosial || 5) + 
        (danaTeknologi || 5);

      if (Math.abs(totalPercentage - 100) > 0.01) {
        return Response.json(
          errorResponse(`Total persentase harus 100%. Saat ini: ${totalPercentage}%`, 'INVALID_PERCENTAGE'),
          { status: 400 }
        );
      }

      // Create config
      const config = await db.sHUConfig.create({
        data: {
          year,
          totalSHU,
          danaCadangan: danaCadangan || 20,
          jasaModal: jasaModal || 25,
          jasaUsaha: jasaUsaha || 35,
          danaPengurus: danaPengurus || 5,
          danaPendidikan: danaPendidikan || 5,
          danaSosial: danaSosial || 5,
          danaTeknologi: danaTeknologi || 5,
        },
      });

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'CREATE',
        entity: 'SHUConfig',
        entityId: config.id,
        description: `Created SHU config for year ${year}`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      return Response.json(
        successResponse(config, 'SHU config berhasil dibuat')
      );
    } catch (error) {
      console.error('Create SHU config error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
