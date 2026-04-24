/**
 * SHU Calculate API Route
 * POST /api/admin/shu/calculate - Calculate SHU distribution for members
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  logActivity,
} from '@/lib/utils-server';

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const body = await request.json();
      const { configId, dryRun = true } = body;

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

      if (config.status !== 'PUBLISHED') {
        return Response.json(
          errorResponse('SHU config harus dipublikasikan terlebih dahulu', 'INVALID_STATUS'),
          { status: 400 }
        );
      }

      // Get all active members
      const members = await db.user.findMany({
        where: {
          role: 'MEMBER',
          status: 'ACTIVE',
        },
        select: {
          id: true,
          name: true,
          email: true,
          niak: true,
          simpananPokok: true,
          simpananWajib: true,
          simpananSukarela: true,
        },
      });

      if (members.length === 0) {
        return Response.json(
          errorResponse('Tidak ada anggota aktif', 'NO_MEMBERS'),
          { status: 400 }
        );
      }

      // Calculate total simpanan (modal)
      const totalSimpanan = members.reduce((sum, m) => 
        sum + m.simpananPokok + m.simpananWajib + m.simpananSukarela, 0
      );

      // Calculate jasa modal pool (percentage of total SHU)
      const jasaModalPool = Math.floor(config.totalSHU * (config.jasaModal / 100));
      
      // Calculate jasa usaha pool
      const jasaUsahaPool = Math.floor(config.totalSHU * (config.jasaUsaha / 100));

      // Calculate distribution for each member
      const distributions = members.map(member => {
        // Jasa Modal: proportion of total simpanan
        const memberSimpanan = member.simpananPokok + member.simpananWajib + member.simpananSukarela;
        const jasaModal = totalSimpanan > 0 
          ? Math.floor(jasaModalPool * (memberSimpanan / totalSimpanan))
          : 0;

        // Jasa Usaha: equal distribution (simplified - in real app, based on transaction volume)
        const jasaUsaha = Math.floor(jasaUsahaPool / members.length);

        return {
          userId: member.id,
          name: member.name,
          email: member.email,
          niak: member.niak,
          simpanan: memberSimpanan,
          jasaModal,
          jasaUsaha,
          total: jasaModal + jasaUsaha,
        };
      });

      // Sort by total SHU descending
      distributions.sort((a, b) => b.total - a.total);

      // Calculate summary
      const summary = {
        totalMembers: members.length,
        totalSHU: config.totalSHU,
        jasaModalPool,
        jasaUsahaPool,
        totalSimpanan,
        totalDistributed: distributions.reduce((sum, d) => sum + d.total, 0),
      };

      // If not dry run, save distributions
      if (!dryRun) {
        // Create distributions in database
        await db.sHUDistribution.createMany({
          data: distributions.map(d => ({
            configId,
            userId: d.userId,
            jasaUsaha: d.jasaUsaha,
            jasaModal: d.jasaModal,
            total: d.total,
            status: 'PENDING',
          })),
        });

        // Update config status
        await db.sHUConfig.update({
          where: { id: configId },
          data: { status: 'DISTRIBUTING' },
        });

        // Log activity
        await logActivity({
          userId: adminUser.id,
          action: 'CALCULATE',
          entity: 'SHUConfig',
          entityId: configId,
          description: `Calculated SHU distribution for ${members.length} members`,
          metadata: { summary },
          ipAddress: request.headers.get('x-forwarded-for') || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
        });
      }

      return Response.json(
        successResponse({
          config: {
            id: config.id,
            year: config.year,
            totalSHU: config.totalSHU,
          },
          summary,
          distributions: dryRun ? distributions.slice(0, 100) : undefined, // Limit preview
          saved: !dryRun,
        }, dryRun ? 'Kalkulasi preview berhasil' : 'Distribusi SHU berhasil disimpan')
      );
    } catch (error) {
      console.error('Calculate SHU error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
